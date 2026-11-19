import React, { useState, useMemo } from 'react';
import { 
  RotateCcw, Sparkles, TrendingUp, CheckCircle2, AlertCircle, 
  Copy, Check, ExternalLink, ArrowRight, BarChart3, Target, 
  DollarSign, Percent, MousePointer, ShieldCheck, Play, Award, 
  Layers, RefreshCw, Sliders, MessageSquare, Tag, Eye
} from 'lucide-react';
import { playSoundEffect } from '../utils/soundEffects';

export interface AffiliateVariant {
  id: string;
  name: string;
  angle: 'direct_discount' | 'curiosity_resource' | 'social_proof' | 'free_checklist';
  linkUrl: string;
  ctaCopy: string;
  pinnedCommentTemplate: string;
  trafficWeight: number; // e.g. 25%
  impressions: number;
  clicks: number;
  conversions: number;
  cpaCommissionGbp: number;
  active: boolean;
  isWinner?: boolean;
}

interface SmartAffiliateLinkRotatorProps {
  onSendToUploader?: (data: { pinnedComment: string; affiliateDisclosure: boolean }) => void;
  onSendToPipeline?: (data: any) => void;
}

const INITIAL_VARIANTS: AffiliateVariant[] = [
  {
    id: 'var_a',
    name: 'Variant A: Direct Discount Angle',
    angle: 'direct_discount',
    linkUrl: 'https://wise.com/invite/u/josephw?c=discount40',
    ctaCopy: '⚡ 40% OFF Creator FX Bundle: Use code "SCALE2026"',
    pinnedCommentTemplate: '📌 EXCLUSIVE DISCOUNT: Claim your 40% fee rebate on all cross-border YouTube payouts here 👉 https://wise.com/invite/u/josephw (Use code SCALE2026 at checkout! 🚀)',
    trafficWeight: 25,
    impressions: 48200,
    clicks: 2980,
    conversions: 84,
    cpaCommissionGbp: 45.0,
    active: true
  },
  {
    id: 'var_b',
    name: 'Variant B: Curiosity & Secret Tool',
    angle: 'curiosity_resource',
    linkUrl: 'https://wise.com/invite/u/josephw?c=secret_engine',
    ctaCopy: '💡 The exact multi-currency engine used to keep 100% AdSense',
    pinnedCommentTemplate: '📌 THE SECRET TOOL: Stop losing 4% to bank exchange rates. Here is the exact routing tool I use for all channel revenue 👉 https://wise.com/invite/u/josephw (Free setup link)',
    trafficWeight: 25,
    impressions: 51400,
    clicks: 4420,
    conversions: 142,
    cpaCommissionGbp: 45.0,
    active: true,
    isWinner: true
  },
  {
    id: 'var_c',
    name: 'Variant C: Proof & Case Study',
    angle: 'social_proof',
    linkUrl: 'https://wise.com/invite/u/josephw?c=proof_8k',
    ctaCopy: '📊 How this one protocol saved £8,400 in hidden FX wire fees',
    pinnedCommentTemplate: '📌 FINANCIAL BREAKDOWN: Read the full case study on how we saved £8,400 in cross-border wire penalties 👉 https://wise.com/invite/u/josephw (Verified UK Sort Code 60-84-64)',
    trafficWeight: 25,
    impressions: 46100,
    clicks: 3120,
    conversions: 96,
    cpaCommissionGbp: 45.0,
    active: true
  },
  {
    id: 'var_d',
    name: 'Variant D: Free Checklist & Lead Magnet',
    angle: 'free_checklist',
    linkUrl: 'https://wise.com/invite/u/josephw?c=free_checklist',
    ctaCopy: '🎁 Download the Free 2026 YouTube Monetization Checklist',
    pinnedCommentTemplate: '📌 FREE CHECKLIST: Download the exact 4-phase production checklist mentioned in the video 👉 https://wise.com/invite/u/josephw (Instant PDF download)',
    trafficWeight: 25,
    impressions: 44900,
    clicks: 3580,
    conversions: 110,
    cpaCommissionGbp: 45.0,
    active: true
  }
];

export const SmartAffiliateLinkRotator: React.FC<SmartAffiliateLinkRotatorProps> = ({
  onSendToUploader,
  onSendToPipeline
}) => {
  const [variants, setVariants] = useState<AffiliateVariant[]>(INITIAL_VARIANTS);
  const [rotationMode, setRotationMode] = useState<'smart_auto_winner' | 'equal_split' | 'manual'>('smart_auto_winner');
  const [ctaTimestampSec, setCtaTimestampSec] = useState<number>(32); // 32s is algorithmic sweet spot
  const [shortDurationSec, setShortDurationSec] = useState<number>(50);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('var_b');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSoundEffect('pulse', 0.4);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Calculations for each variant
  const stats = useMemo(() => {
    return variants.map(v => {
      const ctr = v.impressions > 0 ? (v.clicks / v.impressions) * 100 : 0;
      const convRate = v.clicks > 0 ? (v.conversions / v.clicks) * 100 : 0;
      const totalRevenueGbp = v.conversions * v.cpaCommissionGbp;
      const epc = v.clicks > 0 ? totalRevenueGbp / v.clicks : 0;
      return {
        ...v,
        ctr,
        convRate,
        totalRevenueGbp,
        epc
      };
    });
  }, [variants]);

  // Determine current top-performing variant
  const winningVariant = useMemo(() => {
    const activeStats = stats.filter(s => s.active);
    if (activeStats.length === 0) return stats[0];
    return activeStats.reduce((prev, curr) => (curr.ctr > prev.ctr ? curr : prev));
  }, [stats]);

  // Aggregate totals
  const totalImpressions = stats.reduce((acc, v) => acc + v.impressions, 0);
  const totalClicks = stats.reduce((acc, v) => acc + v.clicks, 0);
  const totalConversions = stats.reduce((acc, v) => acc + v.conversions, 0);
  const totalRevenue = stats.reduce((acc, v) => acc + v.totalRevenueGbp, 0);
  const overallCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  // Simulate traffic surge to demonstrate live A/B winner detection
  const handleSimulateTraffic = () => {
    setIsSimulatingTraffic(true);
    playSoundEffect('whoosh', 0.3);

    setTimeout(() => {
      setVariants(prev => prev.map(v => {
        const addedImpressions = Math.round(5000 + Math.random() * 8000);
        // Variant B has highest conversion probability in financial psychology
        const clickMultiplier = v.id === 'var_b' ? 0.088 : v.id === 'var_d' ? 0.076 : 0.062;
        const addedClicks = Math.round(addedImpressions * (clickMultiplier + (Math.random() * 0.01 - 0.005)));
        const addedConversions = Math.round(addedClicks * (0.028 + Math.random() * 0.015));

        return {
          ...v,
          impressions: v.impressions + addedImpressions,
          clicks: v.clicks + addedClicks,
          conversions: v.conversions + addedConversions
        };
      }));

      setIsSimulatingTraffic(false);
      playSoundEffect('chime', 0.6);
      showToast('Simulated 25,000 traffic visits across link variations!');
    }, 600);
  };

  // Retention Visualizer Calculations:
  // Models retention drop curve vs. CTA placement timestamp
  const retentionCurvePoints = useMemo(() => {
    const points: { sec: number; retentionPct: number; ctaConversionProb: number; label: string }[] = [];
    const totalSec = shortDurationSec;

    for (let s = 0; s <= totalSec; s += 2) {
      // Retention baseline: exponential decay with loop bounce at the end
      let retention = 100 * Math.exp(-0.016 * s);
      if (s <= 3) retention = 100 - (100 - 84) * (s / 3); // 3-second hook test
      if (s > totalSec - 6) {
        // Loop perfection bounce
        retention += ((s - (totalSec - 6)) / 6) * 14;
      }
      retention = Math.min(100, Math.max(35, Math.round(retention)));

      // Conversion probability curve (peaking between 28s - 38s after value is delivered)
      let ctaProb = 0;
      if (s >= 10 && s <= 45) {
        // Bell-curve peak around 32s
        ctaProb = Math.max(0, 10 - Math.abs(s - 32) * 0.45);
      }

      let label = '';
      if (s === 0) label = 'Hook (0s)';
      else if (s === 16) label = 'Value Buildup';
      else if (s === 32) label = 'Optimal CTA (32s)';
      else if (s === totalSec) label = 'Infinite Loop';

      points.push({
        sec: s,
        retentionPct: retention,
        ctaConversionProb: Math.round(ctaProb * 10) / 10,
        label
      });
    }
    return points;
  }, [shortDurationSec]);

  // Current retention at user's selected CTA timestamp
  const selectedCtaMetrics = useMemo(() => {
    const closest = retentionCurvePoints.reduce((prev, curr) => 
      Math.abs(curr.sec - ctaTimestampSec) < Math.abs(prev.sec - ctaTimestampSec) ? curr : prev
    );

    const isOptimalZone = ctaTimestampSec >= 26 && ctaTimestampSec <= 38;
    const isTooEarly = ctaTimestampSec < 15;
    const isTooLate = ctaTimestampSec > 44;

    return {
      retentionAtCta: closest.retentionPct,
      conversionLift: isOptimalZone ? '+42% (Optimal Retention Hold)' : isTooEarly ? '-28% (Viewer Not Hooked Yet)' : '-19% (Drop-off Before CTA)',
      statusColor: isOptimalZone ? 'text-emerald-400' : isTooEarly ? 'text-amber-400' : 'text-rose-400',
      badge: isOptimalZone ? 'Optimal Sweet Spot' : isTooEarly ? 'Too Early (Drop Risk)' : 'Late (Viewer Lost)'
    };
  }, [ctaTimestampSec, retentionCurvePoints]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HEADER & HIGH-LEVEL METRICS */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-teal-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="p-2 bg-gradient-to-tr from-teal-600 to-emerald-600 text-white rounded-xl shadow-md">
                <RotateCcw className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                Smart Affiliate Link Rotator &amp; Retentions Visualizer
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                A/B/C/D Traffic Split
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Auto-Pinned Comment
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Automatically split-test affiliate link angles across your shorts to discover the highest Click-Through Rate (CTR). 
              The algorithm locks onto the winning variation and synchronizes your YouTube pinned comment for maximum EPC.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Total Clicks</span>
              <span className="text-xl font-black text-white">{totalClicks.toLocaleString()}</span>
              <span className="text-[10px] text-teal-400 block mt-0.5">{overallCtr.toFixed(2)}% avg CTR</span>
            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Conversions</span>
              <span className="text-xl font-black text-emerald-400">{totalConversions}</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">£45.00 CPA</span>
            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Gross Revenue</span>
              <span className="text-xl font-black text-amber-400">£{totalRevenue.toLocaleString()}</span>
              <span className="text-[10px] text-amber-400 block mt-0.5">0% Wise FX Loss</span>
            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Winning CTR</span>
              <span className="text-xl font-black text-purple-400">{winningVariant.ctr.toFixed(2)}%</span>
              <span className="text-[10px] text-purple-400 block mt-0.5">{winningVariant.angle.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Rotation Strategy:</span>
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              {[
                { id: 'smart_auto_winner', label: 'Auto-Lock Winner' },
                { id: 'equal_split', label: 'Equal 25% Split' },
                { id: 'manual', label: 'Manual Weights' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setRotationMode(mode.id as any);
                    playSoundEffect('pulse', 0.3);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    rotationMode === mode.id
                      ? 'bg-teal-600 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateTraffic}
              disabled={isSimulatingTraffic}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-teal-300 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-teal-500/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingTraffic ? 'animate-spin' : ''}`} />
              <span>Simulate Live Traffic Surge</span>
            </button>

            <button
              onClick={() => {
                if (onSendToUploader) {
                  onSendToUploader({
                    pinnedComment: winningVariant.pinnedCommentTemplate,
                    affiliateDisclosure: true
                  });
                }
                playSoundEffect('chime', 0.6);
                showToast('Synchronized winning pinned comment with YouTube Uploader!');
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply Winning Pinned Comment</span>
            </button>
          </div>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white text-xs">Dismiss</button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. RETENTIONS VISUALIZER & OPTIMAL CTA TIMING CURVE */}
      {/* ========================================================================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Retentions Visualizer: CTA Placement vs. Audience Drop-Off Curve
              </h3>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                Retention Correlation Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Viewer retention changes dynamically over 60 seconds. Mentioning your pinned comment at the exact psychological moment maximizes conversions without triggering a viewer swipe-away.
            </p>
          </div>

          {/* Interactive CTA Slider */}
          <div className="bg-black/60 border border-zinc-800 p-3 rounded-xl flex items-center gap-4 min-w-[280px]">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 font-semibold">Test CTA Time:</span>
                <span className="font-mono text-amber-400 font-bold">00:{ctaTimestampSec < 10 ? `0${ctaTimestampSec}` : ctaTimestampSec}s</span>
              </div>
              <input
                type="range"
                min={4}
                max={shortDurationSec - 2}
                value={ctaTimestampSec}
                onChange={(e) => setCtaTimestampSec(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Retention Hold</span>
              <span className={`text-xs font-mono font-bold ${selectedCtaMetrics.statusColor}`}>
                {selectedCtaMetrics.retentionAtCta}%
              </span>
            </div>
          </div>
        </div>

        {/* Visual Graph / Bar Chart */}
        <div className="space-y-2">
          <div className="h-44 w-full bg-zinc-950/90 border border-zinc-800 rounded-xl p-4 flex items-end justify-between gap-1 relative overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-10">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>

            {/* Optimal Range Highlight Zone (26s - 38s) */}
            <div 
              className="absolute top-0 bottom-0 bg-teal-500/10 border-x border-teal-500/30 pointer-events-none z-0"
              style={{
                left: `${(26 / shortDurationSec) * 100}%`,
                width: `${((38 - 26) / shortDurationSec) * 100}%`
              }}
            >
              <span className="absolute top-2 left-2 text-[9px] font-mono text-teal-400 font-bold bg-black/60 px-1.5 py-0.5 rounded border border-teal-500/30">
                👑 Golden Retention Window (26s - 38s)
              </span>
            </div>

            {/* Selected CTA Marker Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 pointer-events-none transition-all duration-150"
              style={{ left: `${(ctaTimestampSec / shortDurationSec) * 100}%` }}
            >
              <div className="absolute -top-1 -translate-x-1/2 bg-amber-500 text-black text-[9px] font-mono font-bold px-1.5 rounded-full shadow-lg">
                CTA
              </div>
            </div>

            {/* Data Columns */}
            {retentionCurvePoints.map((pt, idx) => {
              const isSelected = Math.abs(pt.sec - ctaTimestampSec) <= 1;
              const isGolden = pt.sec >= 26 && pt.sec <= 38;

              return (
                <div
                  key={idx}
                  onClick={() => setCtaTimestampSec(pt.sec)}
                  className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer relative z-10"
                >
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-black border border-zinc-700 text-white text-[9px] font-mono p-1 rounded pointer-events-none whitespace-nowrap z-30">
                    {pt.sec}s • {pt.retentionPct}% Viewers • {pt.ctaConversionProb}% Conv
                  </div>

                  {/* Retention Bar */}
                  <div
                    className={`w-full rounded-t transition-all ${
                      isSelected
                        ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                        : isGolden
                        ? 'bg-gradient-to-t from-teal-700 to-teal-400'
                        : 'bg-zinc-700 group-hover:bg-zinc-500'
                    }`}
                    style={{ height: `${pt.retentionPct}%` }}
                  />
                  <span className="text-[8px] font-mono text-zinc-500 mt-1 hidden sm:inline">
                    {pt.sec % 10 === 0 ? `${pt.sec}s` : ''}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Retention Diagnostic Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Active CTA Timing</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Timestamp: {ctaTimestampSec} Seconds</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  selectedCtaMetrics.badge.includes('Optimal') 
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                }`}>
                  {selectedCtaMetrics.badge}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Audience retention at this moment: <strong className="text-white">{selectedCtaMetrics.retentionAtCta}%</strong>.
              </p>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Projected CTR Lift</span>
              <div className="text-sm font-bold text-emerald-400">{selectedCtaMetrics.conversionLift}</div>
              <p className="text-[11px] text-zinc-400">
                Placing your verbal CTA at 00:32s delivers maximum viewer trust after the core value has landed.
              </p>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Verbal Audio Hook Script</span>
              <p className="text-[11px] text-zinc-300 font-mono italic">
                "📌 Drop a comment and check the top pinned resource for the exact tools mentioned!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. A/B/C/D LINK ROTATION MATRIX */}
      {/* ========================================================================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                <Target className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Active Affiliate Link Variations &amp; Statistical Performance
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Comparing click velocity, conversion rates, and gross commissions across 4 distinct psychological angles.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            Current Winning Copy: <span className="text-emerald-400 font-bold">{winningVariant.name}</span>
          </div>
        </div>

        {/* Variant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((v) => {
            const isWinner = v.id === winningVariant.id;

            return (
              <div
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative space-y-4 ${
                  isWinner
                    ? 'bg-gradient-to-b from-teal-950/40 via-zinc-900 to-zinc-900 border-teal-500/60 shadow-lg shadow-teal-950/40 ring-1 ring-teal-500/40'
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {v.name}
                      </h4>
                      {isWinner && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold flex items-center gap-1">
                          👑 Highest CTR
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono block mt-0.5">
                      Target Link: <code className="text-teal-400">{v.linkUrl}</code>
                    </span>
                  </div>

                  <span className="text-[11px] font-mono bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800 text-zinc-300">
                    {v.trafficWeight}% Traffic
                  </span>
                </div>

                {/* Performance Metrics Bar */}
                <div className="grid grid-cols-4 gap-2 bg-black/50 p-2.5 rounded-xl border border-zinc-800/80 text-center text-xs">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Impressions</span>
                    <span className="font-bold text-zinc-300">{v.impressions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Clicks</span>
                    <span className="font-bold text-teal-400">{v.clicks.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">CTR</span>
                    <span className="font-bold text-purple-400 font-mono">{v.ctr.toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Revenue</span>
                    <span className="font-bold text-emerald-400 font-mono">£{v.totalRevenueGbp.toLocaleString()}</span>
                  </div>
                </div>

                {/* Pinned Comment Preview Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-400 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                      Pinned Comment Copy
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(v.pinnedCommentTemplate, `comment_${v.id}`);
                        showToast(`Copied ${v.name} pinned comment!`);
                      }}
                      className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-mono text-[10px] cursor-pointer"
                    >
                      {copiedKey === `comment_${v.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === `comment_${v.id}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-300 bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800/90 font-mono leading-relaxed">
                    {v.pinnedCommentTemplate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
