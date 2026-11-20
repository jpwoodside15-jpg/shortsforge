import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Layers,
  ListChecks,
  Plus,
  RefreshCw,
  RotateCcw,
  Smartphone,
  Sparkles,
  Trash2,
  Wand2
} from 'lucide-react';
import {
  QueuedShort,
  createInitialWeekQueue
} from './AutomatedDailyPipelineTab';
import {
  loadPipelineQueue,
  savePipelineQueue,
  subscribePipelineQueueUpdates
} from '../utils/pipelineQueueStore';
import { applyAwinAffiliateMetadata } from '../utils/awinAffiliate';

interface TranscriptInputRow {
  id: string;
  label: string;
  niche: string;
  transcript: string;
  targetQueueId: string;
  selectedForBatch: boolean;
}

interface TitleVariation {
  title: string;
  charCount: number;
  angle: string;
  predictedCtrLift: string;
}

interface OptimizedItemResult {
  id: string;
  variations: TitleVariation[];
  recommendedHookText: string;
  recommendedDescription: string;
  recommendedTags: string[];
}

interface AppliedChangeRecord {
  queueId: string;
  dayName: string;
  previousTitle: string;
  newTitle: string;
}

interface BulkTitleOptimizerProps {
  onSendToSimulator?: (title: string) => void;
}

function createRowsFromPendingQueue(pendingShorts: QueuedShort[]): TranscriptInputRow[] {
  if (pendingShorts.length === 0) {
    return [
      {
        id: `tx_${Date.now()}_1`,
        label: 'Draft Short #1',
        niche: 'Business & Wealth',
        transcript:
          'Most creators spend 4 hours editing a Short and lose 60% of viewers in the first 2 seconds because they start with a slow greeting instead of a visual payoff.',
        targetQueueId: '',
        selectedForBatch: true
      }
    ];
  }

  return pendingShorts.slice(0, 5).map((short) => ({
    id: `tx_${short.id}`,
    label: `${short.dayName} · ${short.scheduledTime}`,
    niche: short.niche,
    transcript: `${short.hookText} ${short.description}`.trim(),
    targetQueueId: short.id,
    selectedForBatch: true
  }));
}

export const BulkTitleOptimizer: React.FC<BulkTitleOptimizerProps> = ({
  onSendToSimulator
}) => {
  const [queue, setQueue] = useState<QueuedShort[]>(() =>
    loadPipelineQueue<QueuedShort>(createInitialWeekQueue)
  );

  const pendingShorts = useMemo(
    () => queue.filter((item) => item.status !== 'Published'),
    [queue]
  );

  const [rows, setRows] = useState<TranscriptInputRow[]>(() =>
    createRowsFromPendingQueue(
      loadPipelineQueue<QueuedShort>(createInitialWeekQueue).filter(
        (item) => item.status !== 'Published'
      )
    )
  );
  const [tone, setTone] = useState<'curiosity' | 'controversial' | 'high-energy' | 'educational'>('curiosity');
  const [bulkPasteText, setBulkPasteText] = useState<string>('');
  const [showBulkPaste, setShowBulkPaste] = useState<boolean>(false);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationSource, setGenerationSource] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultsById, setResultsById] = useState<Record<string, OptimizedItemResult>>({});
  const [selectedVariationIdxById, setSelectedVariationIdxById] = useState<Record<string, number>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Batch Apply confirmation + Undo snapshot
  const [previousQueueSnapshot, setPreviousQueueSnapshot] = useState<QueuedShort[] | null>(null);
  const [appliedSummary, setAppliedSummary] = useState<AppliedChangeRecord[] | null>(null);

  // Keep queue in sync with Automated Daily Pipeline
  useEffect(() => {
    return subscribePipelineQueueUpdates<QueuedShort>(createInitialWeekQueue, setQueue);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLoadPendingQueue = () => {
    const nextRows = createRowsFromPendingQueue(pendingShorts);
    setRows(nextRows);
    setResultsById({});
    setSelectedVariationIdxById({});
    setAppliedSummary(null);
    setErrorMsg(null);
  };

  const handleAddRow = () => {
    const assignedIds = new Set(rows.map((r) => r.targetQueueId).filter(Boolean));
    const nextUnassigned = pendingShorts.find((s) => !assignedIds.has(s.id));
    setRows((prev) => [
      ...prev,
      {
        id: `tx_${Date.now()}_${prev.length + 1}`,
        label: nextUnassigned
          ? `${nextUnassigned.dayName} · ${nextUnassigned.scheduledTime}`
          : `Transcript #${prev.length + 1}`,
        niche: nextUnassigned?.niche || 'YouTube Shorts',
        transcript: '',
        targetQueueId: nextUnassigned?.id || pendingShorts[0]?.id || '',
        selectedForBatch: true
      }
    ]);
  };

  const handleRemoveRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setResultsById((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleUpdateRow = (id: string, patch: Partial<TranscriptInputRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const handleImportBulkPaste = () => {
    const blocks = bulkPasteText
      .split(/\n\s*---\s*\n|\n{2,}/)
      .map((b) => b.trim())
      .filter(Boolean);

    if (blocks.length === 0) return;

    const imported: TranscriptInputRow[] = blocks.slice(0, 12).map((text, idx) => {
      const targetShort = pendingShorts[idx];
      return {
        id: `tx_paste_${Date.now()}_${idx}`,
        label: targetShort
          ? `${targetShort.dayName} · ${targetShort.scheduledTime}`
          : `Pasted Transcript #${idx + 1}`,
        niche: targetShort?.niche || 'YouTube Shorts',
        transcript: text,
        targetQueueId: targetShort?.id || '',
        selectedForBatch: Boolean(targetShort)
      };
    });

    setRows(imported);
    setBulkPasteText('');
    setShowBulkPaste(false);
    setResultsById({});
    setSelectedVariationIdxById({});
    setAppliedSummary(null);
  };

  const handleGenerateBulk = async () => {
    const validRows = rows.filter((r) => r.transcript.trim().length > 0);
    if (validRows.length === 0) {
      setErrorMsg('Enter at least one video transcript before optimizing.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setAppliedSummary(null);

    try {
      const res = await fetch('/api/copywriter/bulk-title-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tone,
          items: validRows.map((r) => ({
            id: r.id,
            label: r.label,
            niche: r.niche,
            transcript: r.transcript
          }))
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const nextMap: Record<string, OptimizedItemResult> = {};
      const nextSel: Record<string, number> = {};

      for (const item of (data.results || []) as OptimizedItemResult[]) {
        nextMap[item.id] = item;
        nextSel[item.id] = 0;
      }

      setResultsById(nextMap);
      setSelectedVariationIdxById(nextSel);
      setGenerationSource(data.model || data.source || 'gemini-4-hydrogen');
    } catch (err) {
      console.error('Bulk title optimization failed:', err);
      setErrorMsg('Failed to generate title variations. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const eligibleBatchRows = useMemo(() => {
    return rows.filter((row) => {
      if (!row.selectedForBatch || !row.targetQueueId) return false;
      const result = resultsById[row.id];
      const targetExists = pendingShorts.some((s) => s.id === row.targetQueueId);
      return Boolean(result && result.variations.length > 0 && targetExists);
    });
  }, [rows, resultsById, pendingShorts]);

  const handleBatchApply = () => {
    if (eligibleBatchRows.length === 0) return;

    const currentQueue = loadPipelineQueue<QueuedShort>(createInitialWeekQueue);
    setPreviousQueueSnapshot(currentQueue);

    const updatesByQueueId = new Map<
      string,
      {
        title: string;
        hookText: string;
        description: string;
        tags: string[];
      }
    >();

    for (const row of eligibleBatchRows) {
      const result = resultsById[row.id];
      if (!result) continue;
      const varIdx = selectedVariationIdxById[row.id] ?? 0;
      const chosen = result.variations[varIdx] || result.variations[0];
      if (!chosen) continue;

      updatesByQueueId.set(row.targetQueueId, {
        title: chosen.title,
        hookText: result.recommendedHookText,
        description: result.recommendedDescription,
        tags: result.recommendedTags
      });
    }

    const changeLog: AppliedChangeRecord[] = [];
    const nextQueue = currentQueue.map((short) => {
      if (short.status === 'Published') return short;
      const update = updatesByQueueId.get(short.id);
      if (!update) return short;

      changeLog.push({
        queueId: short.id,
        dayName: short.dayName,
        previousTitle: short.title,
        newTitle: update.title
      });

      const nextDescBase = update.description || short.description;
      const awinMeta = applyAwinAffiliateMetadata({
        niche: short.niche,
        description: nextDescBase,
        affiliateDisclosure: short.affiliateDisclosure
      });

      return {
        ...short,
        title: update.title,
        hookText: update.hookText || short.hookText,
        description: awinMeta.description,
        affiliateLink: awinMeta.affiliateLink || short.affiliateLink,
        affiliateMerchant: awinMeta.affiliateMerchant || short.affiliateMerchant,
        affiliateDisclosure: awinMeta.affiliateDisclosure,
        tags: update.tags.length > 0 ? update.tags : short.tags
      };
    });

    savePipelineQueue(nextQueue);
    setQueue(nextQueue);
    setAppliedSummary(changeLog);
  };

  const handleUndoBatchApply = () => {
    if (!previousQueueSnapshot) return;
    savePipelineQueue(previousQueueSnapshot);
    setQueue(previousQueueSnapshot);
    setPreviousQueueSnapshot(null);
    setAppliedSummary(null);
  };

  const optimizedCount = Object.keys(resultsById).length;

  return (
    <div className="space-y-6">
      {/* Header & Primary Controls */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Bulk Title Optimizer &amp; Queue Metadata Updater
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            Paste multiple video transcripts or load your pending Shorts queue, generate 5 mobile-ready (&lt;60 char) title variations per clip via Gemini, pick the winning headline for each, and batch-update all selected pending queue metadata in one click.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as typeof tone)}
            aria-label="Title optimization tone"
            className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
          >
            <option value="curiosity">Tone: High Curiosity</option>
            <option value="controversial">Tone: Controversial / Bold</option>
            <option value="high-energy">Tone: High Energy</option>
            <option value="educational">Tone: Authority Breakdown</option>
          </select>

          <button
            type="button"
            onClick={handleLoadPendingQueue}
            className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Load Pending Queue ({pendingShorts.length})
          </button>

          <button
            type="button"
            onClick={handleGenerateBulk}
            disabled={isGenerating || rows.every((r) => !r.transcript.trim())}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Optimizing {rows.filter((r) => r.transcript.trim()).length} Transcripts...
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5" />
                Optimize All Transcripts
              </>
            )}
          </button>
        </div>
      </div>

      {/* Batch Apply Confirmation Banner */}
      {appliedSummary && appliedSummary.length > 0 && (
        <div className="bg-emerald-950/35 border border-emerald-500/40 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Updated metadata (title, hook, description &amp; tags) for {appliedSummary.length} pending Short{appliedSummary.length === 1 ? '' : 's'} in the Automated Daily Pipeline queue.
              </span>
            </div>
            {previousQueueSnapshot && (
              <button
                type="button"
                onClick={handleUndoBatchApply}
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Undo Batch Apply
              </button>
            )}
          </div>
          <div className="divide-y divide-emerald-500/15 text-xs font-mono tabular-nums">
            {appliedSummary.map((change) => (
              <div
                key={change.queueId}
                className="py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-zinc-300"
              >
                <span className="text-emerald-400 font-semibold">{change.dayName}</span>
                <span className="text-zinc-500 line-through truncate max-w-xs">
                  {change.previousTitle}
                </span>
                <span className="text-white font-semibold truncate max-w-md">
                  &rarr; {change.newTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3.5 text-xs text-red-200">
          {errorMsg}
        </div>
      )}

      {/* Transcript Input Workspace */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono tabular-nums">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold font-sans text-white">
              Video Transcripts ({rows.length})
            </span>
            <span aria-hidden="true">·</span>
            <span>{pendingShorts.length} pending queue slots available</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowBulkPaste((v) => !v)}
              className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer"
            >
              {showBulkPaste ? 'Hide Bulk Paste' : 'Paste Multiple Transcripts'}
            </button>
            <button
              type="button"
              onClick={handleAddRow}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Transcript
            </button>
          </div>
        </div>

        {/* Optional Multi-Transcript Bulk Paste Drawer */}
        {showBulkPaste && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-3">
            <label className="block text-xs font-semibold text-zinc-300">
              Paste multiple transcripts separated by a blank line or <code className="font-mono text-amber-300">---</code>
            </label>
            <textarea
              rows={5}
              value={bulkPasteText}
              onChange={(e) => setBulkPasteText(e.target.value)}
              placeholder={'Transcript 1 text here...\n\n---\n\nTranscript 2 text here...'}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-400 resize-y"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBulkPaste(false)}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportBulkPaste}
                disabled={!bulkPasteText.trim()}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                Split Into Transcript Rows
              </button>
            </div>
          </div>
        )}

        {/* Per-Transcript Rows & Generated 5-Title Variations */}
        <div className="space-y-4">
          {rows.map((row, rowIdx) => {
            const result = resultsById[row.id];
            const chosenIdx = selectedVariationIdxById[row.id] ?? 0;

            return (
              <div
                key={row.id}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4"
              >
                {/* Row Top Bar: Selection Checkbox + Target Queue Slot + Remove */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={row.selectedForBatch}
                        onChange={(e) =>
                          handleUpdateRow(row.id, { selectedForBatch: e.target.checked })
                        }
                        className="rounded border-zinc-700 bg-zinc-900 accent-emerald-500"
                      />
                      <span className="font-mono text-zinc-500">#{rowIdx + 1}</span>
                      <input
                        type="text"
                        value={row.label}
                        onChange={(e) => handleUpdateRow(row.id, { label: e.target.value })}
                        className="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-amber-400 focus:outline-none text-xs font-semibold text-white px-1 py-0.5 w-44"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <span className="text-[11px] text-zinc-500">Target Queue Slot:</span>
                    <select
                      value={row.targetQueueId}
                      onChange={(e) =>
                        handleUpdateRow(row.id, { targetQueueId: e.target.value })
                      }
                      aria-label={`Target pending short for row ${rowIdx + 1}`}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-200 max-w-[260px] truncate focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Unlinked (do not apply to queue)</option>
                      {pendingShorts.map((short) => (
                        <option key={short.id} value={short.id}>
                          {short.dayName} ({short.status}) — {short.title.slice(0, 36)}
                        </option>
                      ))}
                    </select>

                    {rows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(row.id)}
                        aria-label={`Remove transcript row ${rowIdx + 1}`}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Transcript Textarea */}
                <textarea
                  rows={2}
                  value={row.transcript}
                  onChange={(e) => handleUpdateRow(row.id, { transcript: e.target.value })}
                  placeholder="Paste the spoken transcript or script summary for this Short..."
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-amber-400 rounded-lg p-3 text-xs text-zinc-200 font-mono leading-relaxed focus:outline-none resize-y"
                />

                {/* 5 Gemini Title Variations */}
                {result && (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        5 Click-Worthy Variations (Select 1 for Batch Apply)
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        Tags: {result.recommendedTags.map((t) => `#${t}`).join(' ')}
                      </span>
                    </div>

                    <div className="divide-y divide-zinc-800/80 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
                      {result.variations.map((v, vIdx) => {
                        const isPicked = chosenIdx === vIdx;
                        const isOptimalLen = v.charCount <= 52;
                        return (
                          <div
                            key={vIdx}
                            onClick={() =>
                              setSelectedVariationIdxById((prev) => ({
                                ...prev,
                                [row.id]: vIdx
                              }))
                            }
                            className={`px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                              isPicked ? 'bg-zinc-800/80' : 'hover:bg-zinc-900'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <input
                                type="radio"
                                name={`title_choice_${row.id}`}
                                checked={isPicked}
                                onChange={() =>
                                  setSelectedVariationIdxById((prev) => ({
                                    ...prev,
                                    [row.id]: vIdx
                                  }))
                                }
                                className="mt-1 accent-emerald-500 shrink-0"
                              />
                              <div className="min-w-0 space-y-0.5">
                                <div className="text-xs font-semibold text-white">
                                  {v.title}
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400 font-mono tabular-nums">
                                  <span
                                    className={
                                      isOptimalLen ? 'text-emerald-400' : 'text-amber-400'
                                    }
                                  >
                                    {v.charCount}/60 chars
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-sans text-zinc-400">{v.angle}</span>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-emerald-300">{v.predictedCtrLift}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 pl-6 sm:pl-0">
                              {onSendToSimulator && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSendToSimulator(v.title);
                                  }}
                                  className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded text-[11px] flex items-center gap-1 whitespace-nowrap cursor-pointer"
                                >
                                  <Smartphone className="w-3 h-3 text-red-400" />
                                  Preview
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(v.title, `${row.id}_${vIdx}`);
                                }}
                                className="p-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded cursor-pointer"
                                title="Copy title"
                              >
                                {copiedKey === `${row.id}_${vIdx}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Batch Apply Footer Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-zinc-300 space-y-0.5">
          <div className="font-semibold text-white">
            Ready to Batch Apply to Pending Queue
          </div>
          <div className="text-zinc-400 font-mono tabular-nums">
            {optimizedCount} of {rows.length} transcripts optimized
            <span aria-hidden="true"> · </span>
            {eligibleBatchRows.length} selected pending short{eligibleBatchRows.length === 1 ? '' : 's'} linked
            {generationSource ? (
              <>
                <span aria-hidden="true"> · </span>
                <span>Engine: {generationSource}</span>
              </>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={handleBatchApply}
          disabled={eligibleBatchRows.length === 0}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-4 h-4" />
          Batch Apply ({eligibleBatchRows.length} Pending Short{eligibleBatchRows.length === 1 ? '' : 's'})
        </button>
      </div>
    </div>
  );
};
