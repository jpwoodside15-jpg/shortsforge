import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
  Activity,
  AlertTriangle,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Flame,
  Layers,
  RefreshCw,
  Scissors,
  Sliders,
  Sparkles,
  TrendingDown,
  Wand2
} from 'lucide-react';
import {
  RETENTION_PRESETS,
  RetentionDataPoint,
  parseYouTubeAnalyticsCsv
} from '../data/retentionSampleData';

export interface ActiveClipInput {
  id: string;
  title: string;
  niche: string;
  durationSec: number;
  dataPoints: RetentionDataPoint[];
  avgRetention: number;
  hookRetention: number;
  endRetention: number;
  worstDrops: {
    secondStart: number;
    secondEnd: number;
    dropDelta: number;
    retentionStart: number;
    retentionEnd: number;
  }[];
}

interface TimelineCell {
  second: number;
  nextSecond: number;
  retention: number;
  nextRetention: number;
  dropDelta: number;
  churnVelocity: number; // % drop per second (>= 0)
  phase: 'Hook (0-3s)' | 'Body' | 'CTA / Loop';
  severity: 'critical' | 'high' | 'moderate' | 'stable' | 'loop-gain';
}

interface ChurnSegment {
  id: string;
  secondStart: number;
  secondEnd: number;
  retentionStart: number;
  retentionEnd: number;
  dropDelta: number;
  churnVelocity: number;
  phase: 'Hook (0-3s)' | 'Body' | 'CTA / Loop';
  severity: 'Critical' | 'High' | 'Moderate';
  cause: string;
  fix: string;
}

interface ClipEngagementProfile {
  id: string;
  title: string;
  label: string;
  niche: string;
  durationSec: number;
  avgRetention: number;
  hookRetention: number;
  endRetention: number;
  peakRetentionSec: number;
  dataPoints: RetentionDataPoint[];
  cells: TimelineCell[];
  churnSegments: ChurnSegment[];
  maxChurnVelocity: number;
}

interface OptimizedThumbnailPlan {
  source: string;
  optimizedHeadline: string;
  subHeadline: string;
  contrastTheme: {
    id: string;
    name: string;
    bgPrimary: string;
    bgSecondary: string;
    accentColor: string;
    textColor: string;
    badgeBg: string;
  };
  peakFrameSec: number;
  avoidFrameSec: number;
  ctrBeforePct: number;
  ctrAfterPct: number;
  safeZoneScore: number;
  hookMismatchDiagnosis: string;
  optimizationFixes: string[];
  abVariantB: {
    headline: string;
    subHeadline: string;
    accentColor: string;
    predictedCtrPct: number;
  };
}

interface VideoEngagementMapProps {
  activeClip: ActiveClipInput;
  onSendToClipper?: (trimStartSec: number, trimEndSec: number, context: string) => void;
  onSendToThumbnail?: (frameUrl: string, title?: string) => void;
}

function buildClipEngagementProfile(
  id: string,
  label: string,
  title: string,
  niche: string,
  durationSec: number,
  parsed: ReturnType<typeof parseYouTubeAnalyticsCsv>
): ClipEngagementProfile {
  const pts = parsed.dataPoints;
  const effectiveDuration = Math.max(
    10,
    durationSec || (pts.length ? pts[pts.length - 1].second : 45)
  );

  const cells: TimelineCell[] = [];
  let maxChurnVelocity = 0;

  for (let i = 0; i < pts.length - 1; i++) {
    const cur = pts[i];
    const next = pts[i + 1];
    const dt = Math.max(0.5, next.second - cur.second);
    const rawDelta = cur.retention - next.retention; // positive means drop
    const dropDelta = Math.round(rawDelta * 10) / 10;
    const churnVelocity = Math.max(0, Math.round((rawDelta / dt) * 10) / 10);
    if (churnVelocity > maxChurnVelocity) maxChurnVelocity = churnVelocity;

    const phase: TimelineCell['phase'] =
      cur.second < 3
        ? 'Hook (0-3s)'
        : cur.second >= effectiveDuration - 10
          ? 'CTA / Loop'
          : 'Body';

    let severity: TimelineCell['severity'] = 'stable';
    if (rawDelta < -0.5) {
      severity = 'loop-gain';
    } else if (churnVelocity >= 7) {
      severity = 'critical';
    } else if (churnVelocity >= 3.2) {
      severity = 'high';
    } else if (churnVelocity >= 1.4) {
      severity = 'moderate';
    }

    cells.push({
      second: cur.second,
      nextSecond: next.second,
      retention: cur.retention,
      nextRetention: next.retention,
      dropDelta,
      churnVelocity,
      phase,
      severity
    });
  }

  // Group contiguous elevated churn cells into distinct churn segments
  const churnSegments: ChurnSegment[] = [];
  let currentGroup: TimelineCell[] = [];

  const flushGroup = () => {
    if (currentGroup.length === 0) return;
    const first = currentGroup[0];
    const last = currentGroup[currentGroup.length - 1];
    const totalDrop = Math.round((first.retention - last.nextRetention) * 10) / 10;
    const totalDt = Math.max(1, last.nextSecond - first.second);
    const avgVelocity = Math.round((totalDrop / totalDt) * 10) / 10;

    if (totalDrop >= 2.2) {
      const severity: ChurnSegment['severity'] =
        totalDrop >= 12 || avgVelocity >= 6
          ? 'Critical'
          : totalDrop >= 6 || avgVelocity >= 3
            ? 'High'
            : 'Moderate';

      const phase = first.phase;
      let cause = 'Mid-roll pacing drag or unillustrated explanation';
      let fix = 'Trim stagnant pause, insert B-roll cutaway & 112% punch-in';
      if (phase === 'Hook (0-3s)') {
        cause = 'Expectation gap between cover promise and opening 3 seconds';
        fix = 'Cut preamble frames, open directly on visual payoff & re-align thumbnail';
      } else if (phase === 'CTA / Loop') {
        cause = 'Outro phrasing signaled ending before loop hook';
        fix = 'Strip verbal sign-off and bridge final word into opening second';
      }

      churnSegments.push({
        id: `${id}_seg_${first.second}_${last.nextSecond}`,
        secondStart: first.second,
        secondEnd: last.nextSecond,
        retentionStart: first.retention,
        retentionEnd: last.nextRetention,
        dropDelta: totalDrop,
        churnVelocity: avgVelocity,
        phase,
        severity,
        cause,
        fix
      });
    }
    currentGroup = [];
  };

  for (const cell of cells) {
    if (cell.churnVelocity >= 1.8) {
      currentGroup.push(cell);
    } else {
      flushGroup();
    }
  }
  flushGroup();

  churnSegments.sort((a, b) => b.dropDelta - a.dropDelta);

  // Determine peak engagement timestamp outside heavy hook churn (best thumbnail candidate)
  let peakRetentionSec = 2;
  let bestScore = -Infinity;
  for (const cell of cells) {
    const stabilityScore = cell.retention - cell.churnVelocity * 8;
    if (cell.second >= 1 && cell.second <= Math.max(4, effectiveDuration * 0.75) && stabilityScore > bestScore) {
      bestScore = stabilityScore;
      peakRetentionSec = Math.round(cell.second);
    }
  }

  return {
    id,
    title,
    label,
    niche,
    durationSec: effectiveDuration,
    avgRetention: parsed.avgRetention,
    hookRetention: parsed.hookRetention,
    endRetention: parsed.endRetention,
    peakRetentionSec,
    dataPoints: pts,
    cells,
    churnSegments,
    maxChurnVelocity: Math.max(8, maxChurnVelocity)
  };
}

function drawThumbnailCanvas(
  canvas: HTMLCanvasElement,
  options: {
    mode: 'before' | 'after';
    clip: ClipEngagementProfile;
    plan?: OptimizedThumbnailPlan | null;
    variant: 'A' | 'B';
    showSafeZones: boolean;
  }
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const { mode, clip, plan, variant, showSafeZones } = options;

  ctx.clearRect(0, 0, w, h);

  const theme =
    mode === 'after' && plan
      ? plan.contrastTheme
      : {
          id: 'raw-frame',
          name: 'Unoptimized Frame',
          bgPrimary: '#18181b',
          bgSecondary: '#27272a',
          accentColor: '#a1a1aa',
          textColor: '#e4e4e7',
          badgeBg: '#52525b'
        };

  const activeAccent =
    mode === 'after' && plan && variant === 'B' ? plan.abVariantB.accentColor : theme.accentColor;

  // 1. Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, theme.bgPrimary);
  grad.addColorStop(0.55, theme.bgSecondary);
  grad.addColorStop(1, '#09090b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 2. Spotlight & depth geometry (procedural non-external backdrop)
  if (mode === 'after') {
    const radial = ctx.createRadialGradient(w * 0.48, h * 0.44, 24, w * 0.48, h * 0.44, w * 0.72);
    radial.addColorStop(0, `${activeAccent}44`);
    radial.addColorStop(0.55, `${activeAccent}14`);
    radial.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);

    // Subtle retention trajectory silhouette in background
    if (clip.dataPoints.length > 2) {
      ctx.save();
      ctx.beginPath();
      const chartTop = h * 0.56;
      const chartH = h * 0.22;
      clip.dataPoints.forEach((p, idx) => {
        const px = (idx / (clip.dataPoints.length - 1)) * w;
        const py = chartTop + chartH - (Math.min(120, p.retention) / 120) * chartH;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = `${activeAccent}55`;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    }
  } else {
    // Dull ungraded wash for Before preview
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(w * 0.08, h * 0.2, w * 0.84, h * 0.52);
  }

  // Subtle architectural grid lines
  ctx.save();
  ctx.strokeStyle = mode === 'after' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < w; gx += 45) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, h);
    ctx.stroke();
  }
  for (let gy = 0; gy < h; gy += 45) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(w, gy);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Center visual subject silhouette card
  const frameSec = mode === 'after' && plan ? plan.peakFrameSec : Math.round(clip.churnSegments[0]?.secondStart ?? 0);
  ctx.save();
  ctx.fillStyle = mode === 'after' ? 'rgba(15, 23, 42, 0.78)' : 'rgba(39, 39, 42, 0.75)';
  ctx.strokeStyle = mode === 'after' ? `${activeAccent}88` : 'rgba(161, 161, 170, 0.25)';
  ctx.lineWidth = mode === 'after' ? 3 : 1.5;
  const cardX = w * 0.1;
  const cardY = h * 0.28;
  const cardW = mode === 'after' ? w * 0.68 : w * 0.8;
  const cardH = h * 0.42;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 18);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 4. Headline & Subheadline typography
  const headline =
    mode === 'after' && plan
      ? variant === 'B'
        ? plan.abVariantB.headline
        : plan.optimizedHeadline
      : clip.title.toUpperCase();
  const subline =
    mode === 'after' && plan
      ? variant === 'B'
        ? plan.abVariantB.subHeadline
        : plan.subHeadline
      : `Raw Frame · ${frameSec}s`;

  const textCenterX = mode === 'after' ? w * 0.44 : w * 0.5;
  const textMaxW = mode === 'after' ? w * 0.62 : w * 0.78;

  // Word-wrap headline
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = mode === 'after' ? 48 : 30;
  ctx.font = `900 ${fontSize}px "Plus Jakarta Sans", system-ui, sans-serif`;

  const words = headline.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > textMaxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);

  const visibleLines = lines.slice(0, 3);
  const lineHeight = fontSize * 1.12;
  const startY = h * 0.45 - ((visibleLines.length - 1) * lineHeight) / 2;

  visibleLines.forEach((ln, i) => {
    const ly = startY + i * lineHeight;
    if (mode === 'after') {
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#09090b';
      ctx.strokeText(ln, textCenterX, ly);
      ctx.fillStyle = i === 0 ? activeAccent : theme.textColor;
      ctx.fillText(ln, textCenterX, ly);
    } else {
      ctx.fillStyle = '#d4d4d8';
      ctx.fillText(ln, textCenterX, ly);
    }
  });

  // Subline
  ctx.font = `700 ${mode === 'after' ? 20 : 16}px "JetBrains Mono", monospace`;
  ctx.fillStyle = mode === 'after' ? '#f8fafc' : '#a1a1aa';
  ctx.fillText(subline, textCenterX, startY + visibleLines.length * lineHeight + 18);

  // Frame Lock Stamp inside Safe Zone
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillStyle = mode === 'after' ? activeAccent : '#71717a';
  ctx.fillText(
    mode === 'after' ? `PEAK FRAME LOCK @ ${frameSec}s` : `UNVERIFIED COVER @ ${frameSec}s`,
    textCenterX,
    cardY + 30
  );
  ctx.restore();

  // 5. Safe Zone Overlay Guides (if enabled)
  if (showSafeZones) {
    ctx.save();
    // Top 12%
    ctx.fillStyle = 'rgba(220, 38, 38, 0.14)';
    ctx.fillRect(0, 0, w, h * 0.12);
    // Right 18% action buttons
    ctx.fillStyle = 'rgba(217, 119, 6, 0.14)';
    ctx.fillRect(w * 0.82, h * 0.12, w * 0.18, h * 0.7);
    // Bottom 18% title / audio rail
    ctx.fillStyle = 'rgba(37, 99, 235, 0.14)';
    ctx.fillRect(0, h * 0.82, w, h * 0.18);

    // Clear focal box
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = 'rgba(22, 163, 74, 0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.06, h * 0.15, w * 0.74, h * 0.64);
    ctx.restore();
  }
}

export const VideoEngagementMap: React.FC<VideoEngagementMapProps> = ({
  activeClip,
  onSendToClipper,
  onSendToThumbnail
}) => {
  // Build unified clip catalog: current active workspace clip + sample presets
  const clips = useMemo<ClipEngagementProfile[]>(() => {
    const activeParsed = {
      dataPoints: activeClip.dataPoints,
      avgRetention: activeClip.avgRetention,
      hookRetention: activeClip.hookRetention,
      endRetention: activeClip.endRetention,
      worstDrops: activeClip.worstDrops
    };

    const workspaceProfile = buildClipEngagementProfile(
      'workspace-active',
      'Active Workspace',
      activeClip.title || 'Current Workspace Short',
      activeClip.niche,
      activeClip.durationSec,
      activeParsed
    );

    const presetProfiles = RETENTION_PRESETS.map((preset) => {
      const parsed = parseYouTubeAnalyticsCsv(preset.csvContent, preset.videoDurationSec);
      return buildClipEngagementProfile(
        preset.id,
        preset.name,
        preset.videoTitle,
        preset.niche,
        preset.videoDurationSec,
        parsed
      );
    }).filter((p) => p.title.trim().toLowerCase() !== workspaceProfile.title.trim().toLowerCase());

    return [workspaceProfile, ...presetProfiles];
  }, [activeClip]);

  const [selectedClipId, setSelectedClipId] = useState<string>('workspace-active');
  const selectedClip = useMemo(
    () => clips.find((c) => c.id === selectedClipId) || clips[0],
    [clips, selectedClipId]
  );

  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<TimelineCell | null>(null);
  const [showCurveOverlay, setShowCurveOverlay] = useState<boolean>(true);

  // Auto-Optimize Thumbnails state per clip ID
  const [optimizedPlans, setOptimizedPlans] = useState<Record<string, OptimizedThumbnailPlan>>({});
  const [isOptimizingSingle, setIsOptimizingSingle] = useState<boolean>(false);
  const [isOptimizingBatch, setIsOptimizingBatch] = useState<boolean>(false);
  const [thumbnailVariant, setThumbnailVariant] = useState<'A' | 'B'>('A');
  const [showSafeZones, setShowSafeZones] = useState<boolean>(true);
  const [downloadedClipId, setDownloadedClipId] = useState<string | null>(null);

  const d3TimelineRef = useRef<SVGSVGElement | null>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync selected segment when switching clips
  useEffect(() => {
    setSelectedSegmentId(selectedClip?.churnSegments[0]?.id ?? null);
    setHoveredCell(null);
  }, [selectedClip?.id]);

  const activeSegment = useMemo(() => {
    if (!selectedClip || selectedClip.churnSegments.length === 0) return null;
    return (
      selectedClip.churnSegments.find((s) => s.id === selectedSegmentId) ||
      selectedClip.churnSegments[0]
    );
  }, [selectedClip, selectedSegmentId]);

  const selectedPlan = selectedClip ? optimizedPlans[selectedClip.id] ?? null : null;

  // D3 Color Scale for Churn Velocity
  const churnColorScale = useMemo(() => {
    return d3
      .scaleSequential<string>()
      .domain([0, Math.max(8, selectedClip?.maxChurnVelocity ?? 10)])
      .interpolator(
        d3.interpolateRgbBasis(['#0F172A', '#1E293B', '#B45309', '#DC2626', '#991B1B'])
      )
      .clamp(true);
  }, [selectedClip?.maxChurnVelocity]);

  // Render D3 Interactive Timeline + Heatmap Overlay via real d3 scales & selection
  useEffect(() => {
    const svgEl = d3TimelineRef.current;
    if (!svgEl || !selectedClip || selectedClip.cells.length === 0) return;

    const width = 920;
    const height = 270;
    const margin = { top: 28, right: 24, bottom: 38, left: 48 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const defs = svg.append('defs');
    const areaGrad = defs
      .append('linearGradient')
      .attr('id', 'd3-retention-area-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    areaGrad.append('stop').attr('offset', '0%').attr('stop-color', '#F8FAFC').attr('stop-opacity', 0.22);
    areaGrad.append('stop').attr('offset', '100%').attr('stop-color', '#0F172A').attr('stop-opacity', 0.02);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const maxSec = Math.max(selectedClip.durationSec, selectedClip.dataPoints[selectedClip.dataPoints.length - 1]?.second || 30);
    const maxRet = Math.max(115, Math.ceil((d3.max(selectedClip.dataPoints, (d) => d.retention) ?? 100) / 10) * 10);

    const xScale = d3.scaleLinear().domain([0, maxSec]).range([0, innerW]);
    const yScale = d3.scaleLinear().domain([0, maxRet]).range([innerH, 0]);

    // Track Layout: Full background D3 heatmap cells spanning timeline height
    const heatmapGroup = g.append('g').attr('class', 'd3-heatmap-cells');

    heatmapGroup
      .selectAll<SVGRectElement, TimelineCell>('rect.heatmap-cell')
      .data(selectedClip.cells)
      .enter()
      .append('rect')
      .attr('class', 'heatmap-cell')
      .attr('x', (d) => xScale(d.second))
      .attr('y', 0)
      .attr('width', (d) => Math.max(2, xScale(d.nextSecond) - xScale(d.second) - 0.5))
      .attr('height', innerH)
      .attr('rx', 1.5)
      .attr('fill', (d) =>
        d.severity === 'loop-gain' ? '#065F46' : churnColorScale(d.churnVelocity)
      )
      .attr('fill-opacity', (d) => (d.churnVelocity >= 1.8 || d.severity === 'loop-gain' ? 0.88 : 0.45))
      .attr('stroke', (d) =>
        hoveredCell?.second === d.second ? '#F8FAFC' : 'rgba(255,255,255,0.04)'
      )
      .attr('stroke-width', (d) => (hoveredCell?.second === d.second ? 1.5 : 0.5))
      .style('cursor', 'crosshair')
      .on('mouseenter', (_, d) => {
        setHoveredCell(d);
      });

    // Bottom Heatmap Intensity Strip (dedicated condensed timeline track bar)
    const stripHeight = 16;
    const stripY = innerH - stripHeight;
    g.append('g')
      .attr('class', 'd3-bottom-strip')
      .selectAll<SVGRectElement, TimelineCell>('rect.strip-cell')
      .data(selectedClip.cells)
      .enter()
      .append('rect')
      .attr('class', 'strip-cell')
      .attr('x', (d) => xScale(d.second))
      .attr('y', stripY)
      .attr('width', (d) => Math.max(2, xScale(d.nextSecond) - xScale(d.second) - 0.5))
      .attr('height', stripHeight)
      .attr('fill', (d) =>
        d.severity === 'loop-gain' ? '#16A34A' : churnColorScale(d.churnVelocity)
      );

    // Horizontal retention reference grid
    const yTicks = [25, 50, 75, 100];
    g.append('g')
      .selectAll('line.grid-y')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerW)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255,255,255,0.08)')
      .attr('stroke-dasharray', '3,3');

    // Left Y-axis labels
    const yAxis = d3
      .axisLeft(yScale)
      .tickValues(yTicks)
      .tickFormat((d) => `${d}%`)
      .tickSize(0);

    g.append('g')
      .call(yAxis)
      .call((axisG) => axisG.select('.domain').remove())
      .selectAll('text')
      .attr('fill', '#94A3B8')
      .attr('font-size', '10px')
      .attr('font-family', 'ui-monospace, SFMono-Regular, monospace');

    // 3-Second Hook Boundary Line
    if (maxSec >= 3) {
      const hookX = xScale(3);
      g.append('line')
        .attr('x1', hookX)
        .attr('x2', hookX)
        .attr('y1', 0)
        .attr('y2', innerH)
        .attr('stroke', '#38BDF8')
        .attr('stroke-width', 1.25)
        .attr('stroke-dasharray', '4,3')
        .attr('opacity', 0.8);

      g.append('text')
        .attr('x', hookX + 4)
        .attr('y', 12)
        .attr('fill', '#7DD3FC')
        .attr('font-size', '10px')
        .attr('font-family', 'ui-monospace, SFMono-Regular, monospace')
        .text('3s Hook Cutoff');
    }

    // Highlight Peak Churn Segments as interactive D3 overlays
    const segGroup = g.append('g').attr('class', 'd3-churn-segments');
    selectedClip.churnSegments.slice(0, 4).forEach((seg, idx) => {
      const sx = xScale(seg.secondStart);
      const sw = Math.max(10, xScale(seg.secondEnd) - sx);
      const isSelected = activeSegment?.id === seg.id;

      const sg = segGroup
        .append('g')
        .style('cursor', 'pointer')
        .on('click', () => setSelectedSegmentId(seg.id));

      sg.append('rect')
        .attr('x', sx)
        .attr('y', 0)
        .attr('width', sw)
        .attr('height', innerH)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? '#FFFFFF' : '#F87171')
        .attr('stroke-width', isSelected ? 2 : 1)
        .attr('stroke-dasharray', isSelected ? 'none' : '4,2')
        .attr('opacity', isSelected ? 1 : 0.75);

      // Peak label badge above segment
      const labelX = Math.min(innerW - 40, Math.max(28, sx + sw / 2));
      sg.append('text')
        .attr('x', labelX)
        .attr('y', -8 - (idx % 2) * 10)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected ? '#FDE68A' : '#FCA5A5')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('font-family', 'ui-monospace, SFMono-Regular, monospace')
        .text(`-${seg.dropDelta}% (${seg.secondStart}-${seg.secondEnd}s)`);
    });

    // Retention Curve Overlay on top of Heatmap
    if (showCurveOverlay && selectedClip.dataPoints.length > 1) {
      const areaGen = d3
        .area<RetentionDataPoint>()
        .x((d) => xScale(d.second))
        .y0(innerH - stripHeight)
        .y1((d) => yScale(d.retention))
        .curve(d3.curveMonotoneX);

      const lineGen = d3
        .line<RetentionDataPoint>()
        .x((d) => xScale(d.second))
        .y((d) => yScale(d.retention))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(selectedClip.dataPoints)
        .attr('d', areaGen)
        .attr('fill', 'url(#d3-retention-area-grad)')
        .style('pointer-events', 'none');

      g.append('path')
        .datum(selectedClip.dataPoints)
        .attr('d', lineGen)
        .attr('fill', 'none')
        .attr('stroke', '#F8FAFC')
        .attr('stroke-width', 2.25)
        .style('pointer-events', 'none');
    }

    // Hover crosshair indicator
    if (hoveredCell) {
      const hx = xScale(hoveredCell.second);
      const hy = yScale(hoveredCell.retention);

      g.append('line')
        .attr('x1', hx)
        .attr('x2', hx)
        .attr('y1', 0)
        .attr('y2', innerH)
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2')
        .style('pointer-events', 'none');

      g.append('circle')
        .attr('cx', hx)
        .attr('cy', hy)
        .attr('r', 4.5)
        .attr('fill', '#FFFFFF')
        .attr('stroke', '#DC2626')
        .attr('stroke-width', 2)
        .style('pointer-events', 'none');
    }

    // Bottom Time Axis via d3.axisBottom
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(Math.min(10, Math.max(5, Math.floor(maxSec / 5))))
      .tickFormat((d) => `${d}s`);

    g.append('g')
      .attr('transform', `translate(0,${innerH})`)
      .call(xAxis)
      .call((axisG) => axisG.select('.domain').attr('stroke', '#334155'))
      .call((axisG) => axisG.selectAll('.tick line').attr('stroke', '#475569'))
      .selectAll('text')
      .attr('fill', '#94A3B8')
      .attr('font-size', '10px')
      .attr('font-family', 'ui-monospace, SFMono-Regular, monospace');
  }, [selectedClip, hoveredCell, activeSegment, showCurveOverlay, churnColorScale]);

  // Draw Before & After 9:16 Canvases whenever clip/plan/variant/safeZone changes
  useEffect(() => {
    if (!selectedClip) return;
    if (beforeCanvasRef.current) {
      drawThumbnailCanvas(beforeCanvasRef.current, {
        mode: 'before',
        clip: selectedClip,
        plan: selectedPlan,
        variant: 'A',
        showSafeZones
      });
    }
    if (afterCanvasRef.current) {
      drawThumbnailCanvas(afterCanvasRef.current, {
        mode: 'after',
        clip: selectedClip,
        plan: selectedPlan,
        variant: thumbnailVariant,
        showSafeZones
      });
    }
  }, [selectedClip, selectedPlan, thumbnailVariant, showSafeZones]);

  // Call backend /api/retention/auto-optimize-thumbnail
  const optimizeSingleClip = async (clip: ClipEngagementProfile): Promise<OptimizedThumbnailPlan> => {
    const worst = clip.churnSegments[0];
    const res = await fetch('/api/retention/auto-optimize-thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoTitle: clip.title,
        niche: clip.niche,
        videoDurationSec: clip.durationSec,
        avgRetention: clip.avgRetention,
        hookRetention: clip.hookRetention,
        endRetention: clip.endRetention,
        worstDropStart: worst?.secondStart ?? 0,
        worstDropEnd: worst?.secondEnd ?? 3,
        worstDropDelta: worst?.dropDelta ?? 5,
        peakFrameSec: clip.peakRetentionSec
      })
    });
    const data = (await res.json()) as OptimizedThumbnailPlan;
    return data;
  };

  const handleAutoOptimizeSelected = async () => {
    if (!selectedClip) return;
    setIsOptimizingSingle(true);
    try {
      const plan = await optimizeSingleClip(selectedClip);
      setOptimizedPlans((prev) => ({ ...prev, [selectedClip.id]: plan }));
    } catch (err) {
      console.error('Failed to auto-optimize thumbnail:', err);
    } finally {
      setIsOptimizingSingle(false);
    }
  };

  const handleAutoOptimizeAll = async () => {
    setIsOptimizingBatch(true);
    try {
      const entries = await Promise.all(
        clips.map(async (clip) => {
          const plan = await optimizeSingleClip(clip);
          return [clip.id, plan] as const;
        })
      );
      const nextMap: Record<string, OptimizedThumbnailPlan> = {};
      entries.forEach(([id, plan]) => {
        nextMap[id] = plan;
      });
      setOptimizedPlans((prev) => ({ ...prev, ...nextMap }));
    } catch (err) {
      console.error('Batch thumbnail optimization failed:', err);
    } finally {
      setIsOptimizingBatch(false);
    }
  };

  // Auto-generate initial thumbnail optimization for the active clip on first visit
  useEffect(() => {
    if (selectedClip && !optimizedPlans[selectedClip.id] && !isOptimizingSingle) {
      handleAutoOptimizeSelected();
    }
  }, [selectedClip?.id]);

  const handleDownloadOptimizedPng = () => {
    if (!afterCanvasRef.current || !selectedClip) return;
    const dataUrl = afterCanvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    const slug = selectedClip.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 32);
    a.href = dataUrl;
    a.download = `${slug || 'short'}-optimized-9x16.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadedClipId(selectedClip.id);
    setTimeout(() => setDownloadedClipId(null), 2200);
  };

  const handleOpenInThumbnailStudio = () => {
    if (!onSendToThumbnail || !afterCanvasRef.current || !selectedClip) return;
    const dataUrl = afterCanvasRef.current.toDataURL('image/png');
    const headline =
      selectedPlan
        ? thumbnailVariant === 'B'
          ? selectedPlan.abVariantB.headline
          : selectedPlan.optimizedHeadline
        : selectedClip.title;
    onSendToThumbnail(dataUrl, headline);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Subtab Primary Actions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-400 shrink-0" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Video Engagement Map &amp; Thumbnail Auto-Optimizer
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
            Inspect second-by-second churn intensity across all tracked Shorts using D3 timeline heatmap overlays, isolate exact drop-off windows, and auto-optimize 9:16 cover thumbnails to eliminate early hook abandonment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleAutoOptimizeAll}
            disabled={isOptimizingBatch}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isOptimizingBatch ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Optimizing {clips.length} Covers...
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Auto-Optimize All Clip Thumbnails
              </>
            )}
          </button>

          <button
            onClick={handleAutoOptimizeSelected}
            disabled={isOptimizingSingle}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isOptimizingSingle ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Optimizing Cover...
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5" />
                Auto-Optimize Selected Thumbnail
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Multi-Clip D3 Heatmap Overview Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">
              All Clips Timeline Churn Heatmap Matrix
            </h3>
            <p className="text-xs text-zinc-400">
              Select any clip row to inspect exact churn segments on the D3 timeline below.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono tabular-nums text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2.5 rounded-sm bg-[#0F172A] border border-zinc-700 inline-block" />
              Hold
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2.5 rounded-sm bg-[#B45309] inline-block" />
              Friction
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2.5 rounded-sm bg-[#DC2626] inline-block" />
              Peak Churn
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2.5 rounded-sm bg-[#16A34A] inline-block" />
              Rewatch Loop
            </span>
          </div>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {clips.map((clip) => {
            const isSelected = clip.id === selectedClip?.id;
            const topChurn = clip.churnSegments[0];
            const clipPlan = optimizedPlans[clip.id];
            const matrixScale = d3
              .scaleSequential<string>()
              .domain([0, Math.max(8, clip.maxChurnVelocity)])
              .interpolator(
                d3.interpolateRgbBasis(['#0F172A', '#1E293B', '#B45309', '#DC2626', '#991B1B'])
              )
              .clamp(true);

            return (
              <button
                key={clip.id}
                type="button"
                onClick={() => setSelectedClipId(clip.id)}
                className={`w-full text-left py-3 px-3 rounded-lg transition-colors flex flex-col lg:flex-row lg:items-center gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-800/70 ring-1 ring-zinc-600'
                    : 'hover:bg-zinc-950/70'
                }`}
              >
                {/* Clip Info Column */}
                <div className="lg:w-80 shrink-0 space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white truncate">
                      {clip.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono tabular-nums truncate">
                    <span>{clip.label === 'Active Workspace' ? 'Active CSV' : clip.niche}</span>
                    <span aria-hidden="true">·</span>
                    <span>{clip.durationSec}s</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        clip.avgRetention >= 75
                          ? 'text-emerald-400'
                          : clip.avgRetention >= 55
                            ? 'text-amber-400'
                            : 'text-red-400'
                      }
                    >
                      {clip.avgRetention}% avg
                    </span>
                  </div>
                </div>

                {/* Normalized D3 Color-Encoded Timeline Strip */}
                <div className="flex-1 min-w-0">
                  <div className="relative h-7 rounded bg-zinc-950 border border-zinc-800 overflow-hidden flex items-stretch">
                    {clip.cells.map((cell, idx) => {
                      const widthPct =
                        ((cell.nextSecond - cell.second) / Math.max(1, clip.durationSec)) * 100;
                      const fill =
                        cell.severity === 'loop-gain'
                          ? '#16A34A'
                          : matrixScale(cell.churnVelocity);
                      return (
                        <div
                          key={idx}
                          style={{
                            width: `${Math.max(1, widthPct)}%`,
                            backgroundColor: fill
                          }}
                          className="h-full border-r border-black/15 last:border-r-0"
                          title={`${cell.second}s–${cell.nextSecond}s: -${cell.dropDelta}% (${cell.churnVelocity}%/s)`}
                        />
                      );
                    })}
                    {/* 3s Hook Marker */}
                    <div
                      style={{ left: `${Math.min(25, (3 / Math.max(1, clip.durationSec)) * 100)}%` }}
                      className="absolute top-0 bottom-0 w-px bg-sky-400/75"
                    />
                  </div>
                </div>

                {/* Peak Drop & Thumbnail CTR Summary */}
                <div className="lg:w-64 shrink-0 flex items-center justify-between lg:justify-end gap-4 text-[11px] font-mono tabular-nums">
                  <div className="text-right">
                    <span className="text-zinc-500 block text-[10px]">Peak Churn</span>
                    {topChurn ? (
                      <span className="text-red-400 font-semibold">
                        {topChurn.secondStart}–{topChurn.secondEnd}s (-{topChurn.dropDelta}%)
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-semibold">No severe churn</span>
                    )}
                  </div>
                  <div className="text-right min-w-[78px]">
                    <span className="text-zinc-500 block text-[10px]">Cover CTR</span>
                    {clipPlan ? (
                      <span className="text-emerald-400 font-semibold">
                        {clipPlan.ctrAfterPct}% Opt.
                      </span>
                    ) : (
                      <span className="text-zinc-400">Baseline</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Clip Focal View: D3 Timeline Heatmap Overlay + Segment Churn Table */}
      {selectedClip && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Columns: D3 Heatmap Timeline Canvas */}
          <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  D3 Timeline Churn Heatmap — {selectedClip.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono tabular-nums mt-0.5">
                  <span>{selectedClip.durationSec}s total</span>
                  <span aria-hidden="true">·</span>
                  <span>3s hook: {selectedClip.hookRetention}%</span>
                  <span aria-hidden="true">·</span>
                  <span>End retention: {selectedClip.endRetention}%</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedClip.churnSegments.length} churn segments</span>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer whitespace-nowrap shrink-0">
                <input
                  type="checkbox"
                  checked={showCurveOverlay}
                  onChange={(e) => setShowCurveOverlay(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-950 text-red-500"
                />
                <span>Overlay Retention Curve</span>
              </label>
            </div>

            {/* D3 SVG Container */}
            <div
              className="relative bg-zinc-950 border border-zinc-800 rounded-lg p-3"
              onMouseLeave={() => setHoveredCell(null)}
            >
              <svg ref={d3TimelineRef} className="w-full h-auto block select-none" />

              {/* Live Hovered Cell Readout Strip */}
              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono tabular-nums">
                {hoveredCell ? (
                  <>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-white font-semibold">
                        Window: {hoveredCell.second.toFixed(1)}s – {hoveredCell.nextSecond.toFixed(1)}s
                      </span>
                      <span className="text-zinc-300">
                        Retention: {hoveredCell.retention}% &rarr; {hoveredCell.nextRetention}%
                      </span>
                      <span
                        className={
                          hoveredCell.churnVelocity >= 3.2
                            ? 'text-red-400 font-semibold'
                            : hoveredCell.severity === 'loop-gain'
                              ? 'text-emerald-400 font-semibold'
                              : 'text-amber-300'
                        }
                      >
                        Churn Rate: {hoveredCell.churnVelocity > 0 ? `-${hoveredCell.churnVelocity}%/s` : `+${Math.abs(hoveredCell.dropDelta)}% loop`}
                      </span>
                    </div>
                    <span className="text-zinc-400">{hoveredCell.phase}</span>
                  </>
                ) : (
                  <span className="text-zinc-500">
                    Hover any second on the D3 heatmap to inspect churn velocity, or click a dashed red segment bracket to isolate it.
                  </span>
                )}
              </div>
            </div>

            {/* Churn Segments Table */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-zinc-200">
                  Identified Churn Segments
                </h4>
                <span className="text-[11px] font-mono tabular-nums text-zinc-500">
                  Ordered by audience loss
                </span>
              </div>

              {selectedClip.churnSegments.length > 0 ? (
                <div className="border border-zinc-800 rounded-lg overflow-hidden divide-y divide-zinc-800 bg-zinc-950">
                  {selectedClip.churnSegments.map((seg) => {
                    const isFocused = activeSegment?.id === seg.id;
                    return (
                      <div
                        key={seg.id}
                        onClick={() => setSelectedSegmentId(seg.id)}
                        className={`px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs cursor-pointer transition-colors ${
                          isFocused ? 'bg-zinc-800/70' : 'hover:bg-zinc-900/70'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`font-mono font-semibold tabular-nums whitespace-nowrap ${
                              seg.severity === 'Critical'
                                ? 'text-red-400'
                                : seg.severity === 'High'
                                  ? 'text-amber-400'
                                  : 'text-zinc-300'
                            }`}
                          >
                            {seg.secondStart}s – {seg.secondEnd}s
                          </span>
                          <span aria-hidden="true" className="text-zinc-600">·</span>
                          <span className="text-zinc-200 font-medium truncate">
                            {seg.phase} — {seg.severity} Churn
                          </span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 font-mono tabular-nums shrink-0">
                          <span className="text-red-400 font-semibold">
                            -{seg.dropDelta}% (-{seg.churnVelocity}%/s)
                          </span>
                          {onSendToClipper && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSendToClipper(
                                  seg.secondStart,
                                  seg.secondEnd,
                                  `Trim churn segment ${seg.secondStart}s-${seg.secondEnd}s (-${seg.dropDelta}%)`
                                );
                              }}
                              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 rounded text-[11px] font-sans font-medium flex items-center gap-1 whitespace-nowrap cursor-pointer"
                            >
                              <Scissors className="w-3 h-3 text-red-400" />
                              Trim Churn
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>This clip holds audience steady without sudden drop-off spikes.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right 4 Columns: Focused Churn Segment Surgery Inspector */}
          <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-semibold text-white">
                  Focused Churn Segment Inspector
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Root-cause breakdown for the selected timeline window.
                </p>
              </div>

              {activeSegment ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 font-mono tabular-nums">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[11px] text-zinc-400 block">Time Window</span>
                      <span className="text-base font-bold text-white">
                        {activeSegment.secondStart}s – {activeSegment.secondEnd}s
                      </span>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[11px] text-zinc-400 block">Audience Lost</span>
                      <span className="text-base font-bold text-red-400">
                        -{activeSegment.dropDelta}%
                      </span>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[11px] text-zinc-400 block">Drop Velocity</span>
                      <span className="text-sm font-semibold text-amber-400">
                        -{activeSegment.churnVelocity}% / sec
                      </span>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[11px] text-zinc-400 block">Retention Shift</span>
                      <span className="text-sm font-semibold text-zinc-200">
                        {activeSegment.retentionStart}% &rarr; {activeSegment.retentionEnd}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1">
                        Detected Churn Cause ({activeSegment.phase})
                      </span>
                      <p className="text-zinc-200 leading-relaxed">{activeSegment.cause}</p>
                    </div>
                    <div className="pt-2.5 border-t border-zinc-800/80">
                      <span className="text-[11px] font-semibold text-emerald-400 block mb-1">
                        Recommended Timeline Fix
                      </span>
                      <p className="text-zinc-200 leading-relaxed">{activeSegment.fix}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                  No major churn segments detected for this clip. Focus on thumbnail contrast and loop optimization.
                </div>
              )}
            </div>

            {activeSegment && onSendToClipper && (
              <button
                type="button"
                onClick={() =>
                  onSendToClipper(
                    activeSegment.secondStart,
                    activeSegment.secondEnd,
                    `Cut ${activeSegment.phase} churn (${activeSegment.secondStart}s-${activeSegment.secondEnd}s)`
                  )
                }
                className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Scissors className="w-3.5 h-3.5 text-red-400" />
                Open {activeSegment.secondStart}s–{activeSegment.secondEnd}s in Video Clipper
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Auto-Optimize Thumbnails Workbench */}
      {selectedClip && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Auto-Optimize Thumbnails — Hook &amp; Safe-Zone Alignment
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Repairs click-to-hook expectation mismatch caused by churn frames, locks the best cover frame at peak retention ({selectedPlan?.peakFrameSec ?? selectedClip.peakRetentionSec}s), and renders an exportable 9:16 cover.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setThumbnailVariant('A')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    thumbnailVariant === 'A'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Variant A
                </button>
                <button
                  type="button"
                  onClick={() => setThumbnailVariant('B')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    thumbnailVariant === 'B'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Variant B
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowSafeZones((v) => !v)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  showSafeZones
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {showSafeZones ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                Safe Zones
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Before vs After 9:16 Canvases */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {/* Before Canvas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="text-zinc-400 font-semibold">Before (Unoptimized)</span>
                  <span className="text-red-400">
                    {selectedPlan ? `${selectedPlan.ctrBeforePct}% CTR` : 'Low Contrast'}
                  </span>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2">
                  <canvas
                    ref={beforeCanvasRef}
                    width={360}
                    height={640}
                    className="w-full h-auto aspect-[9/16] rounded block"
                  />
                </div>
              </div>

              {/* After Auto-Optimized Canvas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="text-emerald-400 font-semibold">
                    After (Auto-Optimized {thumbnailVariant})
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {selectedPlan
                      ? `${thumbnailVariant === 'B' ? selectedPlan.abVariantB.predictedCtrPct : selectedPlan.ctrAfterPct}% CTR`
                      : 'Pending...'}
                  </span>
                </div>
                <div className="bg-zinc-950 border border-emerald-500/40 rounded-lg p-2">
                  <canvas
                    ref={afterCanvasRef}
                    width={360}
                    height={640}
                    className="w-full h-auto aspect-[9/16] rounded block"
                  />
                </div>
              </div>
            </div>

            {/* Optimization Diffs, Metrics & Export Actions */}
            <div className="lg:col-span-6 space-y-4">
              {selectedPlan ? (
                <>
                  {/* KPI Comparison Strip */}
                  <div className="grid grid-cols-3 gap-3 font-mono tabular-nums">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[11px] text-zinc-400 block">Projected CTR Lift</span>
                      <span className="text-base font-bold text-emerald-400">
                        +{(
                          (thumbnailVariant === 'B'
                            ? selectedPlan.abVariantB.predictedCtrPct
                            : selectedPlan.ctrAfterPct) - selectedPlan.ctrBeforePct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[11px] text-zinc-400 block">Peak Cover Frame</span>
                      <span className="text-base font-bold text-white">
                        {selectedPlan.peakFrameSec}s
                      </span>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                      <span className="text-[11px] text-zinc-400 block">Safe-Zone Score</span>
                      <span className="text-base font-bold text-emerald-400">
                        {selectedPlan.safeZoneScore}%
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis & Applied Fixes */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-3 text-xs">
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1">
                        Churn-to-Thumbnail Alignment Diagnosis
                      </span>
                      <p className="text-zinc-200 leading-relaxed">
                        {selectedPlan.hookMismatchDiagnosis}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800 space-y-2">
                      <span className="text-[11px] font-semibold text-zinc-400 block">
                        Applied Cover Optimizations ({selectedPlan.contrastTheme.name})
                      </span>
                      <ul className="space-y-1.5 text-zinc-300">
                        {selectedPlan.optimizationFixes.map((fix, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{fix}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleDownloadOptimizedPng}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {downloadedClipId === selectedClip.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Downloaded 9:16 PNG
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Optimized PNG
                        </>
                      )}
                    </button>

                    {onSendToThumbnail && (
                      <button
                        type="button"
                        onClick={handleOpenInThumbnailStudio}
                        className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                        Refine in Thumbnail Studio
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleAutoOptimizeSelected}
                      disabled={isOptimizingSingle}
                      className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isOptimizingSingle ? 'animate-spin' : ''}`} />
                      Regenerate
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-lg text-center space-y-3">
                  <p className="text-xs text-zinc-400">
                    Click &ldquo;Auto-Optimize Selected Thumbnail&rdquo; to generate a churn-aligned 9:16 cover for this clip.
                  </p>
                  <button
                    type="button"
                    onClick={handleAutoOptimizeSelected}
                    disabled={isOptimizingSingle}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Auto-Optimize Thumbnail
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
