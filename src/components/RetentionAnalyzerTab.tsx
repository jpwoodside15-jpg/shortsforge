import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingDown, TrendingUp, Scissors, Sparkles, AlertTriangle, 
  CheckCircle2, FileText, Upload, RefreshCw, BarChart2, 
  ArrowRight, Clock, Zap, ShieldAlert, Award, Copy, Check, Play,
  HelpCircle, Eye, Sliders, Wand2, X
} from 'lucide-react';
import { 
  RETENTION_PRESETS, 
  parseYouTubeAnalyticsCsv, 
  RetentionPreset,
  RetentionDataPoint
} from '../data/retentionSampleData';
import { VideoEngagementMap } from './VideoEngagementMap';
import type { RetentionRepairPayload } from '../utils/retentionRepair';

interface HookOptimizationVariant {
  id: number;
  hookType: string;
  openingWords: string;
  durationSec: string;
  stopRateScore: number;
  curiosityGapType?: string;
  psychologyReason: string;
  visualFrame1: string;
  sfx: string;
  safeZoneKeyword: string;
}

interface HookOptimizationResult {
  topic: string;
  diagnostic?: {
    currentIntroFlaw: string;
    retentionPowerScore: number;
    curiosityGapScore: number;
    fixRecommendation: string;
  };
  hooks: HookOptimizationVariant[];
}

function computeFirst5sChurnPct(dataPoints: RetentionDataPoint[]): number {
  if (dataPoints.length < 2) return 0;
  const startPoint = dataPoints[0];
  let pointAt5s = dataPoints[dataPoints.length - 1];
  for (const pt of dataPoints) {
    if (pt.second <= 5) {
      pointAt5s = pt;
    } else {
      if (Math.abs(pt.second - 5) < Math.abs(pointAt5s.second - 5)) {
        pointAt5s = pt;
      }
      break;
    }
  }
  return Math.max(0, Math.round((startPoint.retention - pointAt5s.retention) * 10) / 10);
}

const BENCHMARK_FIRST_5S_CHURN_PCT = (() => {
  const values = RETENTION_PRESETS.map((preset) => {
    const parsedPreset = parseYouTubeAnalyticsCsv(preset.csvContent, preset.videoDurationSec);
    return computeFirst5sChurnPct(parsedPreset.dataPoints);
  });
  const avg = values.reduce((sum, v) => sum + v, 0) / Math.max(1, values.length);
  return Math.round(avg * 10) / 10;
})();

interface RetentionAnalyzerTabProps {
  onSendToClipper?: (trimStartSec: number, trimEndSec: number, context: string) => void;
  onSendToSimulator?: (hookText: string) => void;
  onSendToThumbnail?: (frameUrl: string, title?: string) => void;
  onApplyRetentionFix?: (payload: RetentionRepairPayload) => void;
}

export const RetentionAnalyzerTab: React.FC<RetentionAnalyzerTabProps> = ({
  onSendToClipper,
  onSendToSimulator,
  onSendToThumbnail,
  onApplyRetentionFix
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'curve' | 'engagement-map'>('curve');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('hook-cliff');
  const [rawCsv, setRawCsv] = useState<string>(RETENTION_PRESETS[1].csvContent);
  const [videoTitle, setVideoTitle] = useState<string>(RETENTION_PRESETS[1].videoTitle);
  const [videoDuration, setVideoDuration] = useState<number>(RETENTION_PRESETS[1].videoDurationSec);
  const [niche, setNiche] = useState<string>(RETENTION_PRESETS[1].niche);
  
  // Interactive graph scrubber state
  const [hoveredSecond, setHoveredSecond] = useState<number | null>(null);
  const [showBenchmarkLine, setShowBenchmarkLine] = useState<boolean>(true);

  // AI analysis state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiReport, setAiReport] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // First-5s high churn alert & Auto-Optimize Hook state
  const [dismissedEarlyChurnBanner, setDismissedEarlyChurnBanner] = useState<boolean>(false);
  const [showEarlyChurnToast, setShowEarlyChurnToast] = useState<boolean>(false);
  const [isOptimizingHook, setIsOptimizingHook] = useState<boolean>(false);
  const [hookOptimizationResult, setHookOptimizationResult] = useState<HookOptimizationResult | null>(null);
  const [hookOptimizeError, setHookOptimizeError] = useState<string | null>(null);

  // Parse CSV data reactively
  const parsed = useMemo(() => {
    return parseYouTubeAnalyticsCsv(rawCsv, videoDuration);
  }, [rawCsv, videoDuration]);

  // First-5-second churn rate vs benchmark average
  const first5sChurnPct = useMemo(
    () => computeFirst5sChurnPct(parsed.dataPoints),
    [parsed.dataPoints]
  );
  const churnDeltaAboveBenchmark = useMemo(
    () => Math.round((first5sChurnPct - BENCHMARK_FIRST_5S_CHURN_PCT) * 10) / 10,
    [first5sChurnPct]
  );
  const isHighEarlyChurn =
    parsed.dataPoints.length >= 2 && first5sChurnPct > BENCHMARK_FIRST_5S_CHURN_PCT;

  // Trigger toast notification & reset banner dismissal whenever a clip with high 5s churn loads
  useEffect(() => {
    if (isHighEarlyChurn) {
      setDismissedEarlyChurnBanner(false);
      setShowEarlyChurnToast(true);
      const timer = setTimeout(() => {
        setShowEarlyChurnToast(false);
      }, 9000);
      return () => clearTimeout(timer);
    } else {
      setShowEarlyChurnToast(false);
    }
  }, [isHighEarlyChurn, selectedPresetId, videoTitle, first5sChurnPct]);

  // Auto-Optimize Hook action (calls /api/hook-optimizer)
  const handleAutoOptimizeHook = async () => {
    setIsOptimizingHook(true);
    setHookOptimizeError(null);
    setShowEarlyChurnToast(false);
    try {
      const res = await fetch('/api/hook-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicOrScript: `${videoTitle} (Lost ${first5sChurnPct}% of viewers in the first 5 seconds — rewrite opening 3s hook to stop swipe-away)`,
          niche
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as HookOptimizationResult;
      setHookOptimizationResult(data);
    } catch (err) {
      console.error('Auto-Optimize Hook failed:', err);
      setHookOptimizeError('Could not optimize the opening hook right now. Try again in a moment.');
    } finally {
      setIsOptimizingHook(false);
    }
  };

  // Load a preset
  const handleSelectPreset = (preset: RetentionPreset) => {
    setSelectedPresetId(preset.id);
    setRawCsv(preset.csvContent);
    setVideoTitle(preset.videoTitle);
    setVideoDuration(preset.videoDurationSec);
    setNiche(preset.niche);
    setAiReport(null);
    setHookOptimizationResult(null);
    setHookOptimizeError(null);
  };

  // Handle CSV file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawCsv(content);
        setSelectedPresetId('custom');
        setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
        setAiReport(null);
        setHookOptimizationResult(null);
        setHookOptimizeError(null);
      }
    };
    reader.readAsText(file);
  };

  // Run AI Retention Surgery via Backend API
  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csvData: rawCsv,
          videoTitle,
          videoDurationSec: videoDuration,
          niche
        })
      });
      const data = await res.json();
      setAiReport(data);
    } catch (err) {
      console.error('Failed to run AI retention analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Graph geometry calculations
  const maxRetentionVal = useMemo(() => {
    if (!parsed.dataPoints.length) return 100;
    const maxVal = Math.max(...parsed.dataPoints.map(p => p.retention));
    return Math.max(120, Math.ceil(maxVal / 10) * 10);
  }, [parsed]);

  const maxSecondVal = useMemo(() => {
    if (!parsed.dataPoints.length) return videoDuration;
    return Math.max(videoDuration, parsed.dataPoints[parsed.dataPoints.length - 1].second);
  }, [parsed, videoDuration]);

  // SVG path coordinates
  const graphWidth = 800;
  const graphHeight = 240;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };
  const innerWidth = graphWidth - padding.left - padding.right;
  const innerHeight = graphHeight - padding.top - padding.bottom;

  const pointsSvg = useMemo(() => {
    if (parsed.dataPoints.length < 2) return '';
    return parsed.dataPoints.map(p => {
      const x = padding.left + (p.second / maxSecondVal) * innerWidth;
      const y = padding.top + innerHeight - (p.retention / maxRetentionVal) * innerHeight;
      return `${x},${y}`;
    }).join(' ');
  }, [parsed, maxSecondVal, maxRetentionVal, innerWidth, innerHeight, padding]);

  const areaSvg = useMemo(() => {
    if (parsed.dataPoints.length < 2) return '';
    const firstX = padding.left + (parsed.dataPoints[0].second / maxSecondVal) * innerWidth;
    const lastX = padding.left + (parsed.dataPoints[parsed.dataPoints.length - 1].second / maxSecondVal) * innerWidth;
    const bottomY = padding.top + innerHeight;
    return `M ${firstX},${bottomY} L ${pointsSvg.replace(/ /g, ' L ')} L ${lastX},${bottomY} Z`;
  }, [pointsSvg, parsed, maxSecondVal, innerWidth, innerHeight, padding]);

  // Current hovered data point
  const currentHoveredPoint = useMemo(() => {
    if (hoveredSecond === null || !parsed.dataPoints.length) return null;
    let closest = parsed.dataPoints[0];
    let minDiff = Math.abs(closest.second - hoveredSecond);
    for (const p of parsed.dataPoints) {
      const diff = Math.abs(p.second - hoveredSecond);
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
    }
    return closest;
  }, [hoveredSecond, parsed]);

  // Determine drop status color
  const getRetentionColor = (val: number) => {
    if (val >= 80) return 'text-emerald-400';
    if (val >= 65) return 'text-amber-400';
    return 'text-red-400';
  };

  const getRetentionBg = (val: number) => {
    if (val >= 80) return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    if (val >= 65) return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    return 'bg-red-500/10 border-red-500/30 text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/30 border border-red-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">YouTube Shorts Retention &amp; Drop-Off Analyzer</h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-3xl">
              Paste your YouTube Studio retention CSV or upload an export file. We pinpoint the exact seconds that lose audience attention and generate frame-by-frame retention surgery fixes.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Subtab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveSubTab('curve')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSubTab === 'curve'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Retention &amp; Surgery Curve
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('engagement-map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSubTab === 'engagement-map'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Video Engagement Map
              </button>
            </div>

            {activeSubTab === 'curve' && (
              <button
                onClick={handleRunAiAnalysis}
                disabled={isAnalyzing || parsed.dataPoints.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-950/40 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Diagnosing Drop Points...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Run AI Retention Surgery
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Preset Selector Chips */}
        {activeSubTab === 'curve' && (
          <div className="mt-5 pt-4 border-t border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              1-Click Benchmark Presets:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {RETENTION_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-500/10 border-red-500/50 text-white shadow-sm shadow-red-950/50'
                      : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="font-semibold text-white truncate flex items-center justify-between">
                    <span>{preset.name}</span>
                    <span className={`text-[10px] font-mono px-1 rounded ${getRetentionBg(preset.averageRetention)}`}>
                      {preset.averageRetention}%
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        )}
      </div>

      {/* First-5-Second Higher-Than-Average Churn Alert Banner */}
      {isHighEarlyChurn && !dismissedEarlyChurnBanner && (
        <div
          role="alert"
          className="bg-red-950/35 border border-red-500/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3 min-w-0">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-semibold text-white">
                <span>Higher-Than-Average First-5s Churn Detected</span>
                <span aria-hidden="true" className="text-zinc-500">·</span>
                <span className="font-mono tabular-nums text-red-300">
                  -{first5sChurnPct}% lost in 0–5s
                </span>
                <span aria-hidden="true" className="text-zinc-500">·</span>
                <span className="font-mono tabular-nums text-xs text-zinc-400">
                  Benchmark avg: -{BENCHMARK_FIRST_5S_CHURN_PCT}% (+{churnDeltaAboveBenchmark}% above avg)
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                &ldquo;{videoTitle}&rdquo; is losing viewers faster than benchmark before second 5. Rewrite the opening hook and trim slow lead-in frames to stop early swipe-aways.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAutoOptimizeHook}
              disabled={isOptimizingHook}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isOptimizingHook ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Optimizing Hook...
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  Auto-Optimize Hook
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setDismissedEarlyChurnBanner(true)}
              aria-label="Dismiss early churn alert"
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Auto-Optimized 0-5s Hook Blueprint Result */}
      {(hookOptimizationResult || hookOptimizeError) && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <h3 className="text-sm font-bold text-white">
                  Auto-Optimized 0–5s Hook Blueprint
                </h3>
              </div>
              {hookOptimizationResult?.diagnostic && (
                <p className="text-xs text-zinc-400">
                  {hookOptimizationResult.diagnostic.fixRecommendation}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onSendToClipper && (
                <button
                  type="button"
                  onClick={() =>
                    onSendToClipper(
                      0,
                      3,
                      `Trim slow 0–3s intro (-${first5sChurnPct}% 5s churn) and apply optimized hook`
                    )
                  }
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5 text-red-400" />
                  Trim 0–3s Intro in Clipper
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setHookOptimizationResult(null);
                  setHookOptimizeError(null);
                }}
                aria-label="Close hook blueprint"
                className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {hookOptimizeError ? (
            <p className="text-xs text-red-300">{hookOptimizeError}</p>
          ) : (
            hookOptimizationResult && (
              <div className="space-y-4">
                {hookOptimizationResult.diagnostic && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5">
                    <span className="text-zinc-400">
                      Intro Flaw: <strong className="text-zinc-100 font-medium">{hookOptimizationResult.diagnostic.currentIntroFlaw}</strong>
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="font-mono tabular-nums text-amber-300">
                      Retention Power: {hookOptimizationResult.diagnostic.retentionPowerScore}/100
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="font-mono tabular-nums text-zinc-300">
                      Curiosity Gap: {hookOptimizationResult.diagnostic.curiosityGapScore}/100
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(hookOptimizationResult.hooks || []).slice(0, 3).map((hook) => (
                    <div
                      key={hook.id}
                      className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono tabular-nums text-zinc-400">
                          <span className="truncate text-amber-300 font-semibold">{hook.hookType}</span>
                          <span className="text-emerald-400 shrink-0">{hook.stopRateScore}% stop</span>
                        </div>
                        <p className="text-sm font-semibold text-white leading-snug">
                          &ldquo;{hook.openingWords}&rdquo;
                        </p>
                        <div className="text-[11px] text-zinc-400 space-y-1 pt-1 border-t border-zinc-800/80">
                          <p>
                            <span className="text-zinc-500">Frame 1:</span> {hook.visualFrame1}
                          </p>
                          <p>
                            <span className="text-zinc-500">Audio SFX:</span> {hook.sfx}
                            {hook.safeZoneKeyword ? ` · Highlight "${hook.safeZoneKeyword}"` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
                        <button
                          type="button"
                          onClick={() => handleCopy(hook.openingWords, `opt_hook_${hook.id}`)}
                          className="flex-1 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                        >
                          {copiedKey === `opt_hook_${hook.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Hook
                            </>
                          )}
                        </button>
                        {onSendToSimulator && (
                          <button
                            type="button"
                            onClick={() => onSendToSimulator(hook.openingWords)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Play className="w-3 h-3" />
                            Simulate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Floating First-5s Churn Alert Toast Notification */}
      {showEarlyChurnToast && isHighEarlyChurn && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 max-w-md bg-zinc-950 border border-red-500/50 rounded-xl p-4 shadow-2xl space-y-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-semibold text-white">
                  High 0–5s Churn Alert ({first5sChurnPct}% vs {BENCHMARK_FIRST_5S_CHURN_PCT}% avg)
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Viewers are dropping faster than average in the first 5 seconds of &ldquo;{videoTitle}&rdquo;.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowEarlyChurnToast(false)}
              aria-label="Close churn toast"
              className="text-zinc-500 hover:text-zinc-200 cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowEarlyChurnToast(false)}
              className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer whitespace-nowrap"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={handleAutoOptimizeHook}
              disabled={isOptimizingHook}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Auto-Optimize Hook
            </button>
          </div>
        </div>
      )}

      {activeSubTab === 'engagement-map' ? (
        <VideoEngagementMap
          activeClip={{
            id: selectedPresetId,
            title: videoTitle,
            niche,
            durationSec: videoDuration,
            dataPoints: parsed.dataPoints,
            avgRetention: parsed.avgRetention,
            hookRetention: parsed.hookRetention,
            endRetention: parsed.endRetention,
            worstDrops: parsed.worstDrops
          }}
          onSendToClipper={onSendToClipper}
          onSendToThumbnail={onSendToThumbnail}
          onApplyRecommendedFix={onApplyRetentionFix}
        />
      ) : (
        <>
      {/* Main Grid: Left CSV Input / Stats, Right Interactive Retention Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: CSV Input & Quick Upload */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Paste Analytics CSV</h3>
            </div>
            <label className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer bg-zinc-800/80 px-2 py-1 rounded-lg border border-zinc-700">
              <Upload className="w-3 h-3 text-red-400" /> Upload .csv
              <input type="file" accept=".csv,.txt,.tsv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Video Title</label>
            <input 
              type="text" 
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
              placeholder="e.g. The 3-Second Rule That Breaks Everything"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Video Duration (sec)</label>
              <input 
                type="number" 
                value={videoDuration}
                onChange={(e) => setVideoDuration(Number(e.target.value) || 45)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Niche Category</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-300"
              >
                <option value="tech-ai">Tech &amp; AI</option>
                <option value="business-wealth">Business &amp; Wealth</option>
                <option value="fitness-health">Fitness &amp; Health</option>
                <option value="history-mystery">History &amp; Mystery</option>
                <option value="general">General Viral</option>
              </select>
            </div>
          </div>

          {/* Raw CSV Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-zinc-400">
                Raw CSV Data ({parsed.dataPoints.length} points parsed)
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Format: Time,Retention%</span>
            </div>
            <textarea
              rows={8}
              value={rawCsv}
              onChange={(e) => {
                setRawCsv(e.target.value);
                setSelectedPresetId('custom');
              }}
              placeholder="Paste YouTube Studio export: Video time,Audience retention (%)"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-300 font-mono focus:outline-none focus:border-red-500 resize-none leading-relaxed"
            />
          </div>

          {/* Summary Metric Chips */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
            <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800/80 text-center">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">Avg Retention</span>
              <span className={`text-base font-extrabold font-mono ${getRetentionColor(parsed.avgRetention)}`}>
                {parsed.avgRetention}%
              </span>
            </div>
            <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800/80 text-center">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">3s Hook</span>
              <span className={`text-base font-extrabold font-mono ${getRetentionColor(parsed.hookRetention)}`}>
                {parsed.hookRetention}%
              </span>
            </div>
            <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800/80 text-center">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">End Loop</span>
              <span className={`text-base font-extrabold font-mono ${parsed.endRetention >= 100 ? 'text-emerald-400' : 'text-zinc-300'}`}>
                {parsed.endRetention}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Audience Retention Chart */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Audience Retention Curve
                </h3>
                <span className="text-xs text-zinc-400 font-normal">
                  ({videoDuration}s Total Duration)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBenchmarkLine}
                    onChange={(e) => setShowBenchmarkLine(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 text-red-500 focus:ring-0"
                  />
                  <span>Show 60% Benchmark</span>
                </label>

                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> &gt;80% Viral
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> 65-80%
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span> &lt;65% Drop
                  </span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="relative mt-4 bg-zinc-950 rounded-xl p-3 border border-zinc-800/80 overflow-hidden">
              {parsed.dataPoints.length > 1 ? (
                <div className="relative">
                  <svg 
                    viewBox={`0 0 ${graphWidth} ${graphHeight}`} 
                    className="w-full h-auto cursor-crosshair select-none"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const xRatio = (e.clientX - rect.left) / rect.width;
                      const rawX = xRatio * graphWidth;
                      const calcSec = Math.max(0, Math.min(maxSecondVal, ((rawX - padding.left) / innerWidth) * maxSecondVal));
                      setHoveredSecond(Math.round(calcSec * 10) / 10);
                    }}
                    onMouseLeave={() => setHoveredSecond(null)}
                  >
                    <defs>
                      {/* Gradient for Retention Curve */}
                      <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                      </linearGradient>

                      {/* Line gradient */}
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="40%" stopColor="#34d399" />
                        <stop offset="70%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor={parsed.endRetention >= 100 ? '#10b981' : '#ef4444'} />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[100, 75, 50, 25].map((lvl) => {
                      const y = padding.top + innerHeight - (lvl / maxRetentionVal) * innerHeight;
                      return (
                        <g key={lvl}>
                          <line 
                            x1={padding.left} 
                            y1={y} 
                            x2={graphWidth - padding.right} 
                            y2={y} 
                            stroke="#27272a" 
                            strokeDasharray="3,3" 
                            strokeWidth="1"
                          />
                          <text 
                            x={padding.left - 6} 
                            y={y + 3} 
                            fill="#71717a" 
                            fontSize="10" 
                            textAnchor="end"
                            fontFamily="monospace"
                          >
                            {lvl}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Benchmark 60% dashed line */}
                    {showBenchmarkLine && (
                      <g>
                        {(() => {
                          const benchY = padding.top + innerHeight - (60 / maxRetentionVal) * innerHeight;
                          return (
                            <>
                              <line 
                                x1={padding.left} 
                                y1={benchY} 
                                x2={graphWidth - padding.right} 
                                y2={benchY} 
                                stroke="#f59e0b" 
                                strokeDasharray="4,4" 
                                strokeWidth="1.5"
                                opacity="0.6"
                              />
                              <text 
                                x={graphWidth - padding.right - 5} 
                                y={benchY - 4} 
                                fill="#f59e0b" 
                                fontSize="9" 
                                textAnchor="end"
                                fontFamily="monospace"
                                opacity="0.8"
                              >
                                60% Shorts Benchmark Line
                              </text>
                            </>
                          );
                        })()}
                      </g>
                    )}

                    {/* 3-Second Hook Area Highlight */}
                    {(() => {
                      const hookWidth = (3 / maxSecondVal) * innerWidth;
                      return (
                        <rect 
                          x={padding.left} 
                          y={padding.top} 
                          width={hookWidth} 
                          height={innerHeight} 
                          fill="#3b82f6" 
                          fillOpacity="0.08" 
                        />
                      );
                    })()}

                    {/* Filled Area */}
                    <path d={areaSvg} fill="url(#retentionGradient)" />

                    {/* Line Path */}
                    <polyline 
                      fill="none" 
                      stroke="url(#lineGradient)" 
                      strokeWidth="3" 
                      points={pointsSvg} 
                    />

                    {/* Critical Drop-Off Pin Markers */}
                    {parsed.worstDrops.slice(0, 3).map((drop, idx) => {
                      const dropX = padding.left + (drop.secondStart / maxSecondVal) * innerWidth;
                      const dropY = padding.top + innerHeight - (drop.retentionStart / maxRetentionVal) * innerHeight;
                      return (
                        <g key={idx}>
                          <circle cx={dropX} cy={dropY} r="5" fill="#ef4444" className="animate-pulse" />
                          <circle cx={dropX} cy={dropY} r="8" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
                          <text 
                            x={dropX} 
                            y={dropY - 12} 
                            fill="#f87171" 
                            fontSize="10" 
                            textAnchor="middle" 
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            -{drop.dropDelta}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Interactive Scrubber line */}
                    {currentHoveredPoint && (
                      <g>
                        {(() => {
                          const scrX = padding.left + (currentHoveredPoint.second / maxSecondVal) * innerWidth;
                          const scrY = padding.top + innerHeight - (currentHoveredPoint.retention / maxRetentionVal) * innerHeight;
                          return (
                            <>
                              <line 
                                x1={scrX} 
                                y1={padding.top} 
                                x2={scrX} 
                                y2={padding.top + innerHeight} 
                                stroke="#ffffff" 
                                strokeWidth="1.5" 
                                strokeDasharray="2,2" 
                              />
                              <circle cx={scrX} cy={scrY} r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                            </>
                          );
                        })()}
                      </g>
                    )}

                    {/* Time axis ticks */}
                    {[0, 10, 20, 30, 40, 50, 60].filter(s => s <= maxSecondVal).map((sec) => {
                      const x = padding.left + (sec / maxSecondVal) * innerWidth;
                      return (
                        <g key={sec}>
                          <line x1={x} y1={padding.top + innerHeight} x2={x} y2={padding.top + innerHeight + 4} stroke="#52525b" />
                          <text 
                            x={x} 
                            y={padding.top + innerHeight + 16} 
                            fill="#71717a" 
                            fontSize="10" 
                            textAnchor="middle" 
                            fontFamily="monospace"
                          >
                            {sec}s
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Scrubber Tooltip Overlay Card */}
                  {currentHoveredPoint && (
                    <div className="absolute top-3 right-3 bg-zinc-900/95 border border-zinc-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs space-y-1">
                      <div className="flex items-center justify-between gap-4 font-mono">
                        <span className="text-zinc-400">Timestamp:</span>
                        <span className="text-white font-bold">{currentHoveredPoint.second.toFixed(1)}s</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 font-mono">
                        <span className="text-zinc-400">Audience:</span>
                        <span className={`font-bold ${getRetentionColor(currentHoveredPoint.retention)}`}>
                          {currentHoveredPoint.retention}%
                        </span>
                      </div>
                      <div className="text-[10px] text-zinc-500 pt-1 border-t border-zinc-800">
                        {currentHoveredPoint.second <= 3 
                          ? '🔵 Hook Zone: Key retention determinant'
                          : currentHoveredPoint.retention >= 80 
                          ? '🟢 High Engagement Zone'
                          : '🔴 Drop Zone: Viewers swiped here'}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-zinc-500 text-xs">
                  No valid CSV retention data parsed. Paste CSV rows or select a preset above.
                </div>
              )}
            </div>
          </div>

          {/* Quick Guidance Info */}
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>
                <strong>Algorithm Benchmark:</strong> YouTube promotes Shorts with <strong>&gt;75% average retention</strong> and <strong>&gt;100% loop rate</strong> to the main browse feed.
              </span>
            </div>
            {onSendToClipper && parsed.worstDrops.length > 0 && (
              <button
                onClick={() => {
                  const worst = parsed.worstDrops[0];
                  onSendToClipper(worst.secondStart, worst.secondEnd, `Cut out drop zone: ${worst.secondStart}s-${worst.secondEnd}s`);
                }}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Scissors className="w-3.5 h-3.5 text-red-400" />
                Clip Worst Drop in Video Suite
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Identified Exact Drop-Off Seconds (Worst Attention Killers) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Exact Seconds Losing The Most Audience Attention
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Ranked by percentage delta drop
          </span>
        </div>

        {parsed.worstDrops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {parsed.worstDrops.map((drop, idx) => {
              const severity = drop.dropDelta > 10 ? 'CRITICAL' : drop.dropDelta > 5 ? 'HIGH' : 'MODERATE';
              const isHookDrop = drop.secondStart <= 3;
              const isEndingDrop = drop.secondStart >= videoDuration - 10;
              
              let causeHint = "Monotone delivery or unstimulating visual";
              let solutionHint = "Trim dead pause, insert punch-in 115% zoom & SFX";

              if (isHookDrop) {
                causeHint = "Weak Hook: Viewers swiped within first 3 seconds";
                solutionHint = "Cut first 1.5s completely; start directly on high-stakes statement";
              } else if (isEndingDrop) {
                causeHint = "Premature CTA cliff: Saying 'subscribe' signaled end";
                solutionHint = "Remove 'In conclusion'; jump directly to looping final phrase";
              }

              return (
                <div 
                  key={idx}
                  className="bg-zinc-950/80 border border-zinc-800 hover:border-red-500/50 rounded-xl p-4 space-y-2.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      Second {drop.secondStart}s &rarr; {drop.secondEnd}s
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {severity} DROP
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-2xl font-black text-red-400 font-mono">
                      -{drop.dropDelta}%
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {drop.retentionStart}% &rarr; {drop.retentionEnd}%
                    </span>
                  </div>

                  <div className="bg-zinc-900/90 rounded-lg p-2.5 text-xs space-y-1.5 border border-zinc-800/80">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block">Why viewers left:</span>
                      <p className="text-zinc-300 text-[11px] font-medium leading-relaxed">
                        {causeHint}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase font-bold block">Surgery fix:</span>
                      <p className="text-zinc-200 text-[11px] leading-relaxed">
                        {solutionHint}
                      </p>
                    </div>
                  </div>

                  {onSendToClipper && (
                    <button
                      onClick={() => onSendToClipper(drop.secondStart, drop.secondEnd, `Cut drop point ${drop.secondStart}s-${drop.secondEnd}s`)}
                      className="w-full py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Scissors className="w-3 h-3 text-red-400" />
                      Isolate &amp; Trim in Clipper
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-zinc-950 rounded-xl text-center text-zinc-500 text-xs">
            No sharp attention drop points detected in this curve. Retention curve is steady!
          </div>
        )}
      </div>

      {/* AI Retention Surgery Diagnosis Panel */}
      {aiReport && (
        <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-6 space-y-6 shadow-xl shadow-red-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-gradient-to-r from-red-600 to-amber-600 rounded-lg text-white">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Gemini AI Retention Surgery Report
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {aiReport.summaryHeadline || 'Algorithmic diagnostics & editing blueprint.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">Grade</span>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {aiReport.retentionGrade || 'B'}
                </span>
              </div>
              <div className="bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">Viral Probability</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  {aiReport.viralProbabilityScore || 78}/100
                </span>
              </div>
              <div className="bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">Projected Boost</span>
                <span className="text-base font-extrabold text-cyan-400 font-mono">
                  +{aiReport.projectedRetentionAfterFixes ? (aiReport.projectedRetentionAfterFixes - parsed.avgRetention).toFixed(1) : '18.5'}%
                </span>
              </div>
            </div>
          </div>

          {/* Hook Surgery Card */}
          {aiReport.hookDiagnosis && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    First 3 Seconds Hook Diagnosis
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Hook Score: {aiReport.hookDiagnosis.score}/100
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {aiReport.hookDiagnosis.critique}
              </p>

              {aiReport.hookDiagnosis.recommendedHookRewrite && (
                <div className="bg-zinc-900 border border-amber-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-amber-400 uppercase font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recommended Hook Rewrite (Stop the Swipe):
                    </span>
                    <button
                      onClick={() => handleCopy(aiReport.hookDiagnosis.recommendedHookRewrite, 'hook')}
                      className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'hook' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedKey === 'hook' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="text-xs text-white font-semibold italic">
                    "{aiReport.hookDiagnosis.recommendedHookRewrite}"
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pattern Interrupts & Editing Timeline */}
          {aiReport.patternInterruptBlueprint && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Pattern Interrupt Injections (Reset Viewer Attention)
                </h4>
                <span className="text-[11px] text-zinc-400">
                  Insert at exact seconds before predicted fatigue
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {aiReport.patternInterruptBlueprint.map((item: any, i: number) => (
                  <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-xs font-bold text-amber-400">@{item.timestampSec}s</span>
                      <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-snug">
                      {item.directive}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loop Engineering Card */}
          {aiReport.loopOptimization && (
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Infinite Loop Engineering (&gt;100% Retention Secret)
                </span>
                <p className="text-xs text-zinc-300 max-w-2xl">
                  {aiReport.loopOptimization.infiniteLoopTechnique}
                </p>
                <div className="text-xs font-mono text-zinc-400 pt-1">
                  Ending line: <span className="text-emerald-300 font-semibold">"{aiReport.loopOptimization.suggestedFinalLine}"</span> connects directly to opening: <span className="text-emerald-300 font-semibold">"{aiReport.loopOptimization.suggestedFirstLine}"</span>
                </div>
              </div>

              {onSendToSimulator && (
                <button
                  onClick={() => onSendToSimulator(aiReport.hookDiagnosis?.recommendedHookRewrite || videoTitle)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5" />
                  Test in Safe-Zone Simulator
                </button>
              )}
            </div>
          )}
        </div>
      )}
        </>
      )}
    </div>
  );
};
