import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck, ShieldAlert, Download, ArrowUpDown, ArrowUp, ArrowDown,
  Trash2, RefreshCw, Sparkles, Filter, FileText, Calendar, Upload, Wrench, AlertOctagon
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import {
  BatchForensicsLogEntry,
  PipelineStep,
  getBatchForensicsLog,
  subscribeBatchForensicsLog,
  clearBatchForensicsLog
} from '../utils/pipelineVerifier';
import { PIPELINE_QUEUE_STORAGE_KEY } from '../utils/pipelineQueueStore';

const FORENSICS_STORAGE_KEY = 'shortsforge_batch_forensics_log_v1';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export interface WeeklyForensicsDigest {
  windowStartIso: string;
  windowEndIso: string;
  totalAudited7d: number;
  totalUploads7d: number;
  totalBlocks7d: number;
  blocksByPrecondition: Array<{ precondition: string; count: number }>;
  mostCommonRepairAction: { action: PipelineStep | null; count: number };
  quarantinedCount: number;
  quarantinedQueueSlots: number;
  uniqueBlockedTargets7d: number;
}

function readQuarantinedQueueSlotCount(): number {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(PIPELINE_QUEUE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter((item: any) => item?.status === 'Quarantined').length;
        }
      }
    }
  } catch {
    // Ignore storage parse errors
  }
  return 0;
}

export function computeWeeklyForensicsDigest(
  entries: BatchForensicsLogEntry[],
  nowMs: number = Date.now(),
  quarantinedQueueSlots: number = readQuarantinedQueueSlotCount()
): WeeklyForensicsDigest {
  const cutoffMs = nowMs - SEVEN_DAYS_MS;
  const recentEntries = entries.filter((entry) => {
    const ts = new Date(entry.timestamp).getTime();
    return Number.isFinite(ts) && ts >= cutoffMs && ts <= nowMs + 60_000;
  });

  const totalUploads7d = recentEntries.filter(
    (e) => e.verdict === 'PROCEED' && e.proposedAction === 'UPLOAD'
  ).length;

  const blocked7d = recentEntries.filter((e) => e.verdict === 'BLOCKED');

  const preconditionCounts = new Map<string, number>();
  const repairCounts = new Map<PipelineStep, number>();
  const blockedTargets = new Set<string>();

  for (const entry of blocked7d) {
    if (entry.targetTitle) {
      blockedTargets.add(entry.targetTitle);
    }
    const failedList =
      entry.failedPreconditions && entry.failedPreconditions.length > 0
        ? entry.failedPreconditions
        : ['unspecified_precondition'];
    for (const field of failedList) {
      preconditionCounts.set(field, (preconditionCounts.get(field) || 0) + 1);
    }
    if (entry.repairAction) {
      repairCounts.set(entry.repairAction, (repairCounts.get(entry.repairAction) || 0) + 1);
    }
  }

  const blocksByPrecondition = Array.from(preconditionCounts.entries())
    .map(([precondition, count]) => ({ precondition, count }))
    .sort((a, b) => b.count - a.count || a.precondition.localeCompare(b.precondition));

  let topRepairAction: PipelineStep | null = null;
  let topRepairCount = 0;
  repairCounts.forEach((count, action) => {
    if (count > topRepairCount) {
      topRepairAction = action;
      topRepairCount = count;
    }
  });

  const uniqueBlockedTargets7d = blockedTargets.size;
  const quarantinedCount = Math.max(quarantinedQueueSlots, uniqueBlockedTargets7d);

  return {
    windowStartIso: new Date(cutoffMs).toISOString(),
    windowEndIso: new Date(nowMs).toISOString(),
    totalAudited7d: recentEntries.length,
    totalUploads7d,
    totalBlocks7d: blocked7d.length,
    blocksByPrecondition,
    mostCommonRepairAction: {
      action: topRepairAction,
      count: topRepairCount
    },
    quarantinedCount,
    quarantinedQueueSlots,
    uniqueBlockedTargets7d
  };
}

export type ForensicsSortField = 'timestamp' | 'proposedAction' | 'verdict' | 'details';
export type ForensicsSortDirection = 'asc' | 'desc';

const SIMULATED_SEED_LOGS: BatchForensicsLogEntry[] = [
  {
    id: 'sim_forensic_1',
    timestamp: new Date(Date.now() - 240000).toISOString(),
    source: 'World Wonders',
    targetTitle: 'Aurora Borealis Dancing Over Frozen Fjords in 4K Real-Time',
    proposedAction: 'EDIT_CHECK',
    verdict: 'PROCEED',
    repairAction: null,
    failedPreconditions: [],
    line: `[${new Date(Date.now() - 240000).toISOString()}] [World Wonders] PROCEED: EDIT_CHECK on "Aurora Borealis Dancing Over Frozen Fjords in 4K Real-Time" — verified [video_file_exists, duration_ok]`
  },
  {
    id: 'sim_forensic_2',
    timestamp: new Date(Date.now() - 180000).toISOString(),
    source: 'World Wonders',
    targetTitle: 'Aurora Borealis Dancing Over Frozen Fjords in 4K Real-Time',
    proposedAction: 'METADATA',
    verdict: 'PROCEED',
    repairAction: null,
    failedPreconditions: [],
    line: `[${new Date(Date.now() - 180000).toISOString()}] [World Wonders] PROCEED: METADATA on "Aurora Borealis Dancing Over Frozen Fjords in 4K Real-Time" — verified [captions_burned, safe_zones_verified, brand_kit_applied]`
  },
  {
    id: 'sim_forensic_3',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    source: 'Automated Daily Pipeline',
    targetTitle: 'Draft Wonder Slot Missing Clip URL',
    proposedAction: 'EDIT_CHECK',
    verdict: 'BLOCKED',
    repairAction: 'RENDER',
    failedPreconditions: ['video_file_exists'],
    line: `[${new Date(Date.now() - 120000).toISOString()}] [Automated Daily Pipeline] BLOCKED: EDIT_CHECK on "Draft Wonder Slot Missing Clip URL" — failed [video_file_exists] -> REPAIR via RENDER`
  },
  {
    id: 'sim_forensic_4',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    source: 'Automated Daily Pipeline',
    targetTitle: 'Aurora Borealis Dancing Over Frozen Fjords in 4K Real-Time',
    proposedAction: 'UPLOAD',
    verdict: 'PROCEED',
    repairAction: null,
    failedPreconditions: [],
    line: `[${new Date(Date.now() - 60000).toISOString()}] [Automated Daily Pipeline] PROCEED: UPLOAD on "Aurora Borealis Dancing Over Frozen Fjords in 4K Real-Time" — verified [metadata_complete, affiliate_links_present]`
  }
];

function readLogsFromLocalStorage(): BatchForensicsLogEntry[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(FORENSICS_STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed as BatchForensicsLogEntry[];
        }
      }
      // First-time initialization with simulated forensics log in localStorage
      window.localStorage.setItem(FORENSICS_STORAGE_KEY, JSON.stringify(SIMULATED_SEED_LOGS));
      return SIMULATED_SEED_LOGS;
    }
  } catch {
    // Ignore storage read errors
  }
  return getBatchForensicsLog();
}

function escapeCsvCell(value: string): string {
  const safe = String(value ?? '').replace(/"/g, '""');
  return `"${safe}"`;
}

function buildDetailsText(entry: BatchForensicsLogEntry): string {
  if (entry.verdict === 'BLOCKED') {
    const failed = entry.failedPreconditions?.length
      ? `Failed: [${entry.failedPreconditions.join(', ')}]`
      : 'Precondition check failed';
    const repair = entry.repairAction ? ` -> REPAIR via ${entry.repairAction}` : '';
    return `[${entry.source}] ${entry.targetTitle} — ${failed}${repair}`;
  }
  return `[${entry.source}] ${entry.targetTitle} — ${entry.line.split('—')[1]?.trim() || 'All preconditions verified'}`;
}

export const ForensicsDashboard: React.FC = () => {
  const [entries, setEntries] = useState<BatchForensicsLogEntry[]>(() =>
    readLogsFromLocalStorage()
  );
  const [quarantinedQueueSlots, setQuarantinedQueueSlots] = useState<number>(() =>
    readQuarantinedQueueSlotCount()
  );
  const [sortField, setSortField] = useState<ForensicsSortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<ForensicsSortDirection>('desc');
  const [verdictFilter, setVerdictFilter] = useState<'ALL' | 'PROCEED' | 'BLOCKED'>('ALL');
  const [stepFilter, setStepFilter] = useState<'ALL' | PipelineStep>('ALL');

  const refreshFromStorage = () => {
    setEntries(readLogsFromLocalStorage());
    setQuarantinedQueueSlots(readQuarantinedQueueSlotCount());
  };

  useEffect(() => {
    const unsubscribe = subscribeBatchForensicsLog((updated) => {
      setEntries(updated);
    });

    const handleStorage = (e: StorageEvent) => {
      if (e.key === FORENSICS_STORAGE_KEY || e.key === PIPELINE_QUEUE_STORAGE_KEY) {
        refreshFromStorage();
      }
    };
    window.addEventListener('storage', handleStorage);

    const pollId = window.setInterval(() => {
      try {
        const raw = window.localStorage.getItem(FORENSICS_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as BatchForensicsLogEntry[];
          setEntries((prev) => {
            if (prev.length === parsed.length && prev[0]?.id === parsed[0]?.id) {
              return prev;
            }
            return parsed;
          });
        }
        setQuarantinedQueueSlots(readQuarantinedQueueSlotCount());
      } catch {
        // Ignore poll parse errors
      }
    }, 2500);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorage);
      window.clearInterval(pollId);
    };
  }, []);

  const handleSort = (field: ForensicsSortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection(field === 'timestamp' ? 'desc' : 'asc');
    }
  };

  const handleSeedSimulatedLogs = () => {
    try {
      window.localStorage.setItem(FORENSICS_STORAGE_KEY, JSON.stringify(SIMULATED_SEED_LOGS));
    } catch {
      // Ignore storage write error
    }
    setEntries(SIMULATED_SEED_LOGS);
  };

  const handleClear = () => {
    clearBatchForensicsLog();
    try {
      window.localStorage.setItem(FORENSICS_STORAGE_KEY, JSON.stringify([]));
    } catch {
      // Ignore storage write error
    }
    setEntries([]);
  };

  const filteredAndSorted = useMemo(() => {
    const filtered = entries.filter((entry) => {
      if (verdictFilter !== 'ALL' && entry.verdict !== verdictFilter) return false;
      if (stepFilter !== 'ALL' && entry.proposedAction !== stepFilter) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'timestamp':
          cmp = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'proposedAction':
          cmp = a.proposedAction.localeCompare(b.proposedAction);
          break;
        case 'verdict':
          cmp = a.verdict.localeCompare(b.verdict);
          break;
        case 'details':
          cmp = buildDetailsText(a).localeCompare(buildDetailsText(b));
          break;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [entries, sortField, sortDirection, verdictFilter, stepFilter]);

  const weeklyDigest = useMemo(
    () => computeWeeklyForensicsDigest(entries, Date.now(), quarantinedQueueSlots),
    [entries, quarantinedQueueSlots]
  );

  const handleExportCsv = () => {
    const digestRows = [
      ['WEEKLY FORENSICS DIGEST (LAST 7 DAYS)', `${new Date(weeklyDigest.windowStartIso).toLocaleDateString()} - ${new Date(weeklyDigest.windowEndIso).toLocaleDateString()}`],
      ['Total Uploads (7d PROCEED)', String(weeklyDigest.totalUploads7d)],
      ['Total Audited Events (7d)', String(weeklyDigest.totalAudited7d)],
      ['Total Blocked Events (7d)', String(weeklyDigest.totalBlocks7d)],
      [
        'Most Common Repair Action (7d)',
        weeklyDigest.mostCommonRepairAction.action
          ? `${weeklyDigest.mostCommonRepairAction.action} (${weeklyDigest.mostCommonRepairAction.count})`
          : 'NONE (0)'
      ],
      ['Quarantined Count', String(weeklyDigest.quarantinedCount)],
      [
        'Blocks Grouped by Failed Precondition (7d)',
        weeklyDigest.blocksByPrecondition.length > 0
          ? weeklyDigest.blocksByPrecondition.map((b) => `${b.precondition}: ${b.count}`).join(' | ')
          : 'None'
      ]
    ].map((r) => r.map(escapeCsvCell).join(','));

    const headers = ['Timestamp', 'Step', 'Status (Verdict)', 'Source', 'Target', 'Repair Action', 'Details'];
    const rows = filteredAndSorted.map((entry) => [
      escapeCsvCell(entry.timestamp),
      escapeCsvCell(entry.proposedAction),
      escapeCsvCell(entry.verdict),
      escapeCsvCell(entry.source),
      escapeCsvCell(entry.targetTitle),
      escapeCsvCell(entry.repairAction || 'NONE'),
      escapeCsvCell(buildDetailsText(entry))
    ]);

    const csvContent = [
      ...digestRows,
      '',
      headers.map(escapeCsvCell).join(','),
      ...rows.map((r) => r.join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pipeline_forensics_logs_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sanitizePdfText = (input: string) =>
    String(input ?? '')
      .replace(/\u2192/g, '->')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/[^\x20-\x7E\xA0-\xFF]/g, ' ');

  const handleExportPdf = () => {
    if (filteredAndSorted.length === 0) return;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 12;
    const contentWidth = pageWidth - margin * 2;

    const totalCount = filteredAndSorted.length;
    const successCount = filteredAndSorted.filter((e) => e.verdict === 'PROCEED').length;
    const failureCount = filteredAndSorted.filter((e) => e.verdict === 'BLOCKED').length;
    const passRate = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;

    // Header Banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 26, 'F');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 24, pageWidth, 2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('ShortsForge.AI - Pipeline Forensics Audit Report', margin, 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225);
    doc.text(
      sanitizePdfText(
        `Generated: ${new Date().toLocaleString()}   |   Filters: Verdict = ${verdictFilter}, Step = ${stepFilter}`
      ),
      margin,
      18
    );

    // Weekly Forensics Digest (Last 7 Days) Executive Section
    let y = 31;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(
      sanitizePdfText(
        `WEEKLY FORENSICS DIGEST (LAST 7 DAYS: ${new Date(weeklyDigest.windowStartIso).toLocaleDateString()} - ${new Date(weeklyDigest.windowEndIso).toLocaleDateString()})`
      ),
      margin,
      y
    );
    y += 3;

    const cardGap = 4;
    const cardWidth = (contentWidth - cardGap * 3) / 4;
    const topRepairLabel = weeklyDigest.mostCommonRepairAction.action
      ? `${weeklyDigest.mostCommonRepairAction.action} (${weeklyDigest.mostCommonRepairAction.count})`
      : 'NONE';

    const digestCards = [
      {
        label: 'TOTAL UPLOADS (7D)',
        value: String(weeklyDigest.totalUploads7d),
        sub: `${passRate}% pass (${successCount}/${totalCount} shown)`,
        rgb: [6, 95, 70] as const
      },
      {
        label: 'BLOCKS (7D)',
        value: String(weeklyDigest.totalBlocks7d),
        sub: `${weeklyDigest.blocksByPrecondition.length} precondition type(s)`,
        rgb: [159, 18, 57] as const
      },
      {
        label: 'MOST COMMON REPAIR',
        value: topRepairLabel,
        sub: 'Primary remediation step',
        rgb: [67, 56, 202] as const
      },
      {
        label: 'QUARANTINED COUNT',
        value: String(weeklyDigest.quarantinedCount),
        sub: `${weeklyDigest.quarantinedQueueSlots} active queue slot(s)`,
        rgb: [180, 83, 9] as const
      }
    ];

    digestCards.forEach((card, idx) => {
      const cx = margin + idx * (cardWidth + cardGap);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(cx, y, cardWidth, 18, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      doc.setTextColor(100, 116, 139);
      doc.text(card.label, cx + 3.5, y + 5);

      doc.setFontSize(11.5);
      doc.setTextColor(card.rgb[0], card.rgb[1], card.rgb[2]);
      doc.text(sanitizePdfText(card.value), cx + 3.5, y + 11.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(100, 116, 139);
      doc.text(sanitizePdfText(card.sub), cx + 3.5, y + 15.8);
    });

    y += 22;

    // Blocks grouped by failed precondition summary bar
    const preconditionSummary =
      weeklyDigest.blocksByPrecondition.length > 0
        ? weeklyDigest.blocksByPrecondition
            .map((item) => `${item.precondition}: ${item.count}`)
            .join('   |   ')
        : 'No failed preconditions recorded in the last 7 days.';

    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text('7D BLOCKS BY PRECONDITION:', margin + 3, y + 5.7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(sanitizePdfText(preconditionSummary).slice(0, 145), margin + 48, y + 5.7);

    y += 13;

    // Table Columns
    const colWidths = {
      timestamp: 38,
      step: 26,
      verdict: 24,
      sourceTarget: 62,
      details: contentWidth - (38 + 26 + 24 + 62)
    };

    const drawTableHeader = (startY: number) => {
      doc.setFillColor(30, 41, 59);
      doc.rect(margin, startY, contentWidth, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);

      let x = margin + 2;
      doc.text('TIMESTAMP', x, startY + 5.3);
      x += colWidths.timestamp;
      doc.text('STEP', x, startY + 5.3);
      x += colWidths.step;
      doc.text('VERDICT', x, startY + 5.3);
      x += colWidths.verdict;
      doc.text('SOURCE / TARGET', x, startY + 5.3);
      x += colWidths.sourceTarget;
      doc.text('FORENSICS DETAILS & REPAIR', x, startY + 5.3);

      return startY + 8;
    };

    y = drawTableHeader(y);

    filteredAndSorted.forEach((entry, index) => {
      const timeStr = sanitizePdfText(new Date(entry.timestamp).toLocaleString());
      const sourceTargetStr = sanitizePdfText(`[${entry.source}] ${entry.targetTitle}`);
      const detailsStr = sanitizePdfText(
        entry.verdict === 'BLOCKED'
          ? `${entry.failedPreconditions?.length ? `Failed: [${entry.failedPreconditions.join(', ')}]` : 'Verification failed'}${entry.repairAction ? ` -> REPAIR via ${entry.repairAction}` : ''}`
          : entry.line.split('—')[1]?.trim() || 'All preconditions verified'
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);

      const timeLines = doc.splitTextToSize(timeStr, colWidths.timestamp - 3) as string[];
      const targetLines = doc.splitTextToSize(sourceTargetStr, colWidths.sourceTarget - 3) as string[];
      const detailLines = doc.splitTextToSize(detailsStr, colWidths.details - 3) as string[];

      const maxLines = Math.max(timeLines.length, targetLines.length, detailLines.length, 1);
      const rowHeight = Math.max(8, maxLines * 3.8 + 3.5);

      if (y + rowHeight > pageHeight - 14) {
        doc.addPage();
        y = 14;
        y = drawTableHeader(y);
      }

      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, rowHeight, 'FD');

      let x = margin + 2;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(timeLines, x, y + 4.5);

      x += colWidths.timestamp;
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(55, 48, 163);
      doc.text(entry.proposedAction, x, y + 4.5);

      x += colWidths.step;
      if (entry.verdict === 'BLOCKED') {
        doc.setTextColor(190, 18, 60);
      } else {
        doc.setTextColor(5, 150, 105);
      }
      doc.text(entry.verdict, x, y + 4.5);

      x += colWidths.verdict;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(targetLines, x, y + 4.5);

      x += colWidths.sourceTarget;
      doc.setTextColor(51, 65, 85);
      doc.text(detailLines, x, y + 4.5);

      y += rowHeight;
    });

    // Footer page numbers
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(
        `ShortsForge.AI Pipeline Forensics   •   Page ${p} of ${totalPages}`,
        margin,
        pageHeight - 6
      );
    }

    doc.save(`pipeline_forensics_report_${Date.now()}.pdf`);
  };

  const renderSortIcon = (field: ForensicsSortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-zinc-500" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-indigo-400" />
    ) : (
      <ArrowDown className="w-3 h-3 text-indigo-400" />
    );
  };

  const proceedCount = entries.filter((e) => e.verdict === 'PROCEED').length;
  const blockedCount = entries.filter((e) => e.verdict === 'BLOCKED').length;

  return (
    <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-black text-white tracking-tight">Forensics Dashboard</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
              {entries.length} entries
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="text-emerald-400">PROCEED: {proceedCount}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-rose-400">BLOCKED: {blockedCount}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">Source: localStorage ({FORENSICS_STORAGE_KEY})</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={refreshFromStorage}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Reload forensics log from localStorage"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync
          </button>

          {entries.length === 0 && (
            <button
              onClick={handleSeedSimulatedLogs}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Seed Sample Logs
            </button>
          )}

          {entries.length > 0 && (
            <button
              onClick={handleClear}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}

          <button
            onClick={handleExportCsv}
            disabled={filteredAndSorted.length === 0}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Download className="w-3.5 h-3.5" />
            Download CSV
          </button>

          <button
            onClick={handleExportPdf}
            disabled={filteredAndSorted.length === 0}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <FileText className="w-3.5 h-3.5" />
            Export to PDF
          </button>
        </div>
      </div>

      {/* Weekly Forensics Digest (Last 7 Days) */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
              Weekly Forensics Digest · Last 7 Days
            </h4>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
            {new Date(weeklyDigest.windowStartIso).toLocaleDateString()} – {new Date(weeklyDigest.windowEndIso).toLocaleDateString()} · {weeklyDigest.totalAudited7d} verified events
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Total Uploads (7d) */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Total Uploads (7d)</span>
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
              {weeklyDigest.totalUploads7d}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              UPLOAD verdicts cleared (PROCEED)
            </div>
          </div>

          {/* Card 2: Blocks Grouped by Failed Precondition */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Blocks by Precondition</span>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            </div>
            {weeklyDigest.blocksByPrecondition.length === 0 ? (
              <div className="space-y-1">
                <div className="text-2xl font-black text-zinc-200 font-mono tabular-nums">0</div>
                <div className="text-[11px] text-emerald-400/90 font-mono">No failed preconditions</div>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                {weeklyDigest.blocksByPrecondition.slice(0, 4).map((item) => {
                  const pct = Math.max(
                    12,
                    Math.round((item.count / Math.max(1, weeklyDigest.totalBlocks7d)) * 100)
                  );
                  return (
                    <div key={item.precondition} className="space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-200 truncate pr-2">{item.precondition}</span>
                        <span className="text-rose-400 font-bold tabular-nums">{item.count}</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500/80" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Card 3: Most Common Repair Action */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Most Common Repair</span>
              <Wrench className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-black text-indigo-300 font-mono truncate">
              {weeklyDigest.mostCommonRepairAction.action || 'NONE'}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono tabular-nums">
              {weeklyDigest.mostCommonRepairAction.action
                ? `Triggered ${weeklyDigest.mostCommonRepairAction.count} time(s) in 7d`
                : 'No repairs needed in last 7d'}
            </div>
          </div>

          {/* Card 4: Quarantined Count */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Quarantined Count</span>
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono tabular-nums">
              {weeklyDigest.quarantinedCount}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono tabular-nums">
              {weeklyDigest.quarantinedQueueSlots} queue slot(s) · {weeklyDigest.uniqueBlockedTargets7d} blocked clip(s)
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-400 font-semibold">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        <select
          value={verdictFilter}
          onChange={(e) => setVerdictFilter(e.target.value as 'ALL' | 'PROCEED' | 'BLOCKED')}
          className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="ALL">All Verdicts</option>
          <option value="PROCEED">PROCEED Only</option>
          <option value="BLOCKED">BLOCKED Only</option>
        </select>

        <select
          value={stepFilter}
          onChange={(e) => setStepFilter(e.target.value as 'ALL' | PipelineStep)}
          className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="ALL">All Pipeline Steps</option>
          <option value="TREND_PICK">TREND_PICK</option>
          <option value="SCRIPT">SCRIPT</option>
          <option value="RENDER">RENDER</option>
          <option value="EDIT_CHECK">EDIT_CHECK</option>
          <option value="METADATA">METADATA</option>
          <option value="UPLOAD">UPLOAD</option>
          <option value="PAYOUT_LOG">PAYOUT_LOG</option>
        </select>
      </div>

      {/* Sortable Forensics Table */}
      <div className="overflow-x-auto border border-zinc-800 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <th className="p-3">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="inline-flex items-center gap-1.5 hover:text-white cursor-pointer"
                >
                  <span>Timestamp</span>
                  {renderSortIcon('timestamp')}
                </button>
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort('proposedAction')}
                  className="inline-flex items-center gap-1.5 hover:text-white cursor-pointer"
                >
                  <span>Step</span>
                  {renderSortIcon('proposedAction')}
                </button>
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort('verdict')}
                  className="inline-flex items-center gap-1.5 hover:text-white cursor-pointer"
                >
                  <span>Verdict</span>
                  {renderSortIcon('verdict')}
                </button>
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort('details')}
                  className="inline-flex items-center gap-1.5 hover:text-white cursor-pointer"
                >
                  <span>Details</span>
                  {renderSortIcon('details')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/70">
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-zinc-500 font-mono text-xs">
                  No forensics log entries match the current filter.
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-zinc-900/50 transition-colors align-top"
                >
                  <td className="p-3 font-mono text-[11px] text-zinc-400 whitespace-nowrap">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3 font-mono text-[11px] font-bold text-indigo-300 whitespace-nowrap">
                    {entry.proposedAction}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        entry.verdict === 'BLOCKED'
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {entry.verdict === 'BLOCKED' ? (
                        <ShieldAlert className="w-3 h-3" />
                      ) : (
                        <ShieldCheck className="w-3 h-3" />
                      )}
                      {entry.verdict}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-zinc-200 leading-relaxed">
                    {buildDetailsText(entry)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForensicsDashboard;
