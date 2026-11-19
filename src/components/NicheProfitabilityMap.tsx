import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, DollarSign, Sparkles, Building, Check, Copy, 
  ArrowRight, ShieldCheck, Layers, Sliders, Zap, Award, 
  Info, BarChart3, PieChart as PieIcon, HelpCircle, ChevronRight,
  ExternalLink, Target, Flame, Users, Clock, Send, Calendar
} from 'lucide-react';
import { 
  NICHE_PROFITABILITY_GENRES, 
  HEAD_TO_HEAD_KIDS_VS_HIGHTECH,
  GenreHeadToHeadComparison 
} from '../data/nicheProfitabilityData';
import { NicheProfitabilityGenre } from '../types';
import { playSoundEffect } from '../utils/soundEffects';

interface NicheProfitabilityMapProps {
  onSendToCopywriter?: (niche: string) => void;
  onSendToPipeline?: (data: any) => void;
  onSendToUploader?: (data: any) => void;
}

export const NicheProfitabilityMap: React.FC<NicheProfitabilityMapProps> = ({
  onSendToCopywriter,
  onSendToPipeline,
  onSendToUploader,
}) => {
  // Selected genre in the matrix
  const [selectedGenreId, setSelectedGenreId] = useState<string>('hightech_reviews');

  // Active view tab: 'map' | 'battle' | 'simulator'
  const [activeView, setActiveView] = useState<'map' | 'battle' | 'simulator'>('map');

  // Simulator state
  const [simulatedViews, setSimulatedViews] = useState<number>(5000000); // 5 Million views
  const [simulatedGenreId, setSimulatedGenreId] = useState<string>('kids_animation');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedGenre = useMemo(() => {
    return NICHE_PROFITABILITY_GENRES.find(g => g.id === selectedGenreId) || NICHE_PROFITABILITY_GENRES[0];
  }, [selectedGenreId]);

  const simulatedGenre = useMemo(() => {
    return NICHE_PROFITABILITY_GENRES.find(g => g.id === simulatedGenreId) || NICHE_PROFITABILITY_GENRES[0];
  }, [simulatedGenreId]);

  // Calculate simulated earnings
  const simulationResults = useMemo(() => {
    // Ad revenue: Shorts RPM on 80% views + Long-form CPM on 20% views
    const shortsViews = simulatedViews * 0.85;
    const longformViews = simulatedViews * 0.15;

    const shortsAdRevenue = (shortsViews / 1000) * simulatedGenre.shortsRpm;
    const longformAdRevenue = (longformViews / 1000) * (simulatedGenre.cpm * 0.55); // YouTube 55% creator split
    const totalAdRevenue = shortsAdRevenue + longformAdRevenue;

    // Affiliate revenue: clicks from pinned link (assumed 2.5% CTR to link)
    const linkClicks = simulatedViews * 0.025;
    const affiliateConversions = linkClicks * (simulatedGenre.affiliateConversionRate / 100);
    const affiliateRevenue = affiliateConversions * simulatedGenre.avgOrderValue;

    const totalRevenueUsd = totalAdRevenue + affiliateRevenue;
    const totalRevenueGbp = totalRevenueUsd * 0.785; // Mid-market FX rate to UK GBP

    return {
      shortsAdRevenue,
      longformAdRevenue,
      totalAdRevenue,
      affiliateRevenue,
      totalRevenueUsd,
      totalRevenueGbp,
    };
  }, [simulatedViews, simulatedGenre]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playSoundEffect('pulse', 0.2);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Wise UK Account Link Verification Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-zinc-950 via-emerald-950/20 to-teal-950/20 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Wise UK Account Linked &amp; Active</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                GBP Primary
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
              <span className="text-zinc-300 font-bold">Joseph Paul Woodside</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 flex items-center gap-1 font-mono">
                Sort Code: <strong className="text-emerald-300 font-black">60-84-64</strong>
                <button
                  onClick={() => handleCopy('60-84-64', 'sc_top')}
                  className="text-zinc-500 hover:text-emerald-400 cursor-pointer ml-0.5"
                  title="Copy Sort Code"
                >
                  {copiedKey === 'sc_top' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 flex items-center gap-1 font-mono">
                Account: <strong className="text-white font-black">88425941</strong>
                <button
                  onClick={() => handleCopy('88425941', 'acc_top')}
                  className="text-zinc-500 hover:text-emerald-400 cursor-pointer ml-0.5"
                  title="Copy Account Number"
                >
                  {copiedKey === 'acc_top' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Wise Payments Ltd (London)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-[11px] text-zinc-400">Zero-Fee Domestic Payouts:</span>
          <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
            0% FX Spread • Faster Payments
          </span>
        </div>
      </div>

      {/* Main Mode Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveView('map'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'map'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4 text-emerald-300" />
            <span>2D Niche Profitability Map</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              CPM vs Affiliate
            </span>
          </button>

          <button
            onClick={() => { setActiveView('battle'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'battle'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-cyan-300" />
            <span>Kids Animation vs. High-Tech Reviews</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Head-to-Head
            </span>
          </button>

          <button
            onClick={() => { setActiveView('simulator'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'simulator'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-purple-300" />
            <span>Niche Profitability Simulator</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Interactive
            </span>
          </button>
        </div>

        <div className="text-[11px] text-zinc-400 pr-3 hidden md:block">
          Click any genre bubble to inspect unit economics
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: 2D NICHE PROFITABILITY SCATTER / QUADRANT MAP */}
      {/* ========================================================================= */}
      {activeView === 'map' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (8 cols): 2D Interactive Scatter / Quadrant Canvas */}
            <div className="lg:col-span-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      Content Genre Profitability Quadrant Matrix
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Cross-plotting Advertiser Ad CPM (Y-Axis) against Audience Affiliate Conversion Rate (X-Axis).
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> High-Tech
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-1.5" /> Kids 3D
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ml-1.5" /> Finance
                  </div>
                </div>

                {/* 2D Quadrant Canvas with SVG grid and interactive nodes */}
                <div className="relative w-full h-[400px] bg-zinc-950 rounded-2xl border border-zinc-800/80 p-6 overflow-hidden select-none">
                  {/* Quadrant Watermark Labels */}
                  <div className="absolute top-4 right-4 text-right pointer-events-none opacity-40">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">QUADRANT 1: THE GOLDMINE</span>
                    <span className="text-[10px] text-zinc-400">High CPM + High Affiliate Conv</span>
                  </div>

                  <div className="absolute top-4 left-4 text-left pointer-events-none opacity-40">
                    <span className="text-xs font-mono font-bold text-blue-400 block">QUADRANT 2: PRESTIGE SPONSORS</span>
                    <span className="text-[10px] text-zinc-400">High CPM + Moderate Conversion</span>
                  </div>

                  <div className="absolute bottom-4 right-4 text-right pointer-events-none opacity-40">
                    <span className="text-xs font-mono font-bold text-amber-400 block">QUADRANT 3: VIRAL VOLUME CASH COW</span>
                    <span className="text-[10px] text-zinc-400">Massive Scale + Repeat Loops</span>
                  </div>

                  <div className="absolute bottom-4 left-4 text-left pointer-events-none opacity-40">
                    <span className="text-xs font-mono font-bold text-zinc-500 block">QUADRANT 4: AD-ONLY SCALE</span>
                    <span className="text-[10px] text-zinc-500">Low Conversion Threshold</span>
                  </div>

                  {/* Axis Crosshairs */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 border-dashed border-r border-zinc-800" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-800 border-dashed border-b border-zinc-800" />

                  {/* Axis Legends */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] font-mono font-bold text-zinc-500 tracking-wider">
                    ↑ ADVERTISER CPM ($0 - $45)
                  </div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-zinc-500 tracking-wider">
                    AFFILIATE CONVERSION RATE (0% - 5.0%) →
                  </div>

                  {/* Render Genres as Interactive Animated Nodes */}
                  {NICHE_PROFITABILITY_GENRES.map(genre => {
                    // Map Conversion Rate (0% to 5.0%) to X% (8% to 92%)
                    const xPercent = Math.min(92, Math.max(8, (genre.affiliateConversionRate / 4.5) * 84 + 8));
                    // Map CPM ($0 to $45) to Y% (inverted: 92% to 8%)
                    const yPercent = Math.min(90, Math.max(10, 92 - (genre.cpm / 42) * 82));

                    const isSelected = selectedGenreId === genre.id;

                    return (
                      <div
                        key={genre.id}
                        onClick={() => {
                          setSelectedGenreId(genre.id);
                          playSoundEffect('pulse', 0.2);
                        }}
                        style={{
                          left: `${xPercent}%`,
                          top: `${yPercent}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-20 ${
                          isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                        }`}
                      >
                        {/* Outer Glow Halo */}
                        <div
                          style={{ borderColor: genre.color, backgroundColor: `${genre.color}25` }}
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'ring-4 ring-white/30 animate-pulse' : 'group-hover:border-white'
                          }`}
                        >
                          <span className="text-xs font-black text-white font-mono">
                            ${Math.round(genre.cpm)}
                          </span>
                        </div>

                        {/* Title Badge Label */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-lg whitespace-nowrap text-[10px] font-bold shadow-lg transition-all ${
                            isSelected
                              ? 'bg-white text-zinc-950 font-black'
                              : 'bg-zinc-900/90 text-zinc-300 border border-zinc-800 group-hover:text-white'
                          }`}
                        >
                          {genre.shortName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Quadrant Summary Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-zinc-800/80">
                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
                  <span className="text-[10px] font-bold text-emerald-400 block">Q1: Dual Engine</span>
                  <span className="text-zinc-300 font-bold block mt-0.5">High-Tech &amp; Finance</span>
                  <span className="text-[10px] text-zinc-500">$25-$38 CPM • 3.5% Conv</span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
                  <span className="text-[10px] font-bold text-blue-400 block">Q2: Prestige Brand</span>
                  <span className="text-zinc-300 font-bold block mt-0.5">Travel &amp; Craftsman</span>
                  <span className="text-[10px] text-zinc-500">$14-$21 CPM • 1.8% Conv</span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
                  <span className="text-[10px] font-bold text-amber-400 block">Q3: Viral Volume</span>
                  <span className="text-zinc-300 font-bold block mt-0.5">Kids 3D &amp; Cinema</span>
                  <span className="text-[10px] text-zinc-500">35M+ Views • Toy Merch</span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
                  <span className="text-[10px] font-bold text-rose-400 block">Q4: Fast Clipper</span>
                  <span className="text-zinc-300 font-bold block mt-0.5">Viral Podcasts</span>
                  <span className="text-[10px] text-zinc-500">Fast Daily Output</span>
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Selected Genre Deep Dive Inspector */}
            <div className="lg:col-span-4 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Genre Inspector</span>
                  <span 
                    style={{ backgroundColor: `${selectedGenre.color}20`, color: selectedGenre.color, borderColor: `${selectedGenre.color}40` }}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                  >
                    Score: {selectedGenre.netProfitabilityScore}/100
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-lg font-black text-white">{selectedGenre.name}</h4>
                  <span className="text-xs font-mono text-zinc-400 block mt-0.5">{selectedGenre.quadrant}</span>
                </div>

                {/* Core Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 my-4">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400 block">Long-form CPM</span>
                    <span className="text-base font-black text-emerald-400 font-mono">${selectedGenre.cpm.toFixed(2)}</span>
                    <span className="text-[10px] text-zinc-500 block">Shorts: ${selectedGenre.shortsRpm}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400 block">Affiliate Conv Rate</span>
                    <span className="text-base font-black text-cyan-400 font-mono">{selectedGenre.affiliateConversionRate}%</span>
                    <span className="text-[10px] text-zinc-500 block">Avg: ${selectedGenre.avgOrderValue}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400 block">Monthly Views Benchmark</span>
                    <span className="text-sm font-black text-white font-mono">
                      {(selectedGenre.monthlyViewsBenchmark / 1000000).toFixed(1)}M Views
                    </span>
                    <span className="text-[10px] text-amber-400 block">Virality: {selectedGenre.viralityVelocityScore}/100</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400 block">Est. Wise Monthly Payout</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      £{selectedGenre.wiseMonthlyPayoutEst.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">To Sort Code 60-84-64</span>
                  </div>
                </div>

                {/* Top Recommended Affiliate Program */}
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5 text-xs">
                  <span className="text-[11px] font-bold text-indigo-300 block">Recommended Monetization Funnel</span>
                  <p className="text-zinc-200 font-medium leading-snug">{selectedGenre.topAffiliateProgram}</p>
                  <span className="text-[10px] text-zinc-400 block pt-1 border-t border-zinc-800/60">
                    Primary Engine: {selectedGenre.primaryRevenueSource}
                  </span>
                </div>

                {/* Proven Hook Example */}
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 mt-2.5 text-xs space-y-1">
                  <span className="text-[11px] font-bold text-amber-300 block">High-Retention Sample Hook:</span>
                  <p className="text-zinc-300 italic text-[11px]">"{selectedGenre.sampleHook}"</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <button
                  onClick={() => {
                    if (onSendToCopywriter) {
                      onSendToCopywriter(selectedGenre.name);
                    }
                    playSoundEffect('pulse', 0.2);
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Hooks for {selectedGenre.shortName}</span>
                </button>

                <button
                  onClick={() => {
                    if (onSendToPipeline) {
                      onSendToPipeline({
                        title: selectedGenre.sampleHook,
                        niche: selectedGenre.name,
                        cpm: selectedGenre.cpm,
                      });
                    }
                    playSoundEffect('chime', 0.4);
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md font-black"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Deploy {selectedGenre.shortName} to 7-Day Pipeline</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: HEAD-TO-HEAD BATTLE: KIDS ANIMATION VS. HIGH-TECH REVIEWS */}
      {/* ========================================================================= */}
      {activeView === 'battle' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Strategic Niche Face-Off
              </span>
              <h3 className="text-xl font-black text-white">{HEAD_TO_HEAD_KIDS_VS_HIGHTECH.title}</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {HEAD_TO_HEAD_KIDS_VS_HIGHTECH.summary}
              </p>
            </div>

            {/* Side-by-Side Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Card A: Kids 3D Animation */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 to-amber-950/20 border border-amber-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🧸</span>
                    <div>
                      <h4 className="text-lg font-black text-white">Kids 3D Animation</h4>
                      <span className="text-xs text-amber-400 font-mono font-bold">The Volume Juggernaut</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    35M Views/Mo
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Long-Form CPM:</span>
                    <span className="font-mono font-bold text-white">$5.80 / 1k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Shorts Repeat Loop RPM:</span>
                    <span className="font-mono font-bold text-amber-400">$0.85 / 1k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Affiliate Conversion:</span>
                    <span className="font-mono font-bold text-zinc-300">0.4% (Toy Links)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-800">
                    <span className="text-emerald-400 font-bold">Est. Monthly Payout (Wise UK):</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">£23,600 GBP</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong>Why it scales:</strong> Children watch the same bedtime fable 15 to 30 times consecutively. This produces unbeatable audience retention rates (115%+) and massive YouTube recommendation algorithm boosts worldwide.
                </p>
              </div>

              {/* Card B: High-Tech Reviews */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 to-cyan-950/20 border border-cyan-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">⚡</span>
                    <div>
                      <h4 className="text-lg font-black text-white">High-Tech &amp; AI Software</h4>
                      <span className="text-xs text-cyan-400 font-mono font-bold">The Efficiency Titan</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    $24.50 CPM
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Long-Form CPM:</span>
                    <span className="font-mono font-bold text-cyan-400">$24.50 / 1k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Shorts RPM:</span>
                    <span className="font-mono font-bold text-white">$0.35 / 1k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Affiliate Conversion:</span>
                    <span className="font-mono font-bold text-cyan-300">3.8% (30% Lifetime SaaS)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-800">
                    <span className="text-emerald-400 font-bold">Est. Monthly Payout (Wise UK):</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">£18,450 GBP</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong>Why it scales:</strong> Viewers are actively seeking solutions to technical or business problems. A single software recommendation can pay $50–$150 recurring commissions monthly for 12–24 months per subscriber!
                </p>
              </div>
            </div>

            {/* Detailed Metric Battles Table */}
            <div className="rounded-2xl border border-zinc-800 overflow-hidden mb-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Evaluation Dimension</th>
                    <th className="py-3 px-4 font-semibold text-amber-400">Kids 3D Animation</th>
                    <th className="py-3 px-4 font-semibold text-cyan-400">High-Tech Reviews</th>
                    <th className="py-3 px-4 font-semibold text-center">Winner</th>
                    <th className="py-3 px-4 font-semibold">Strategic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/40">
                  {HEAD_TO_HEAD_KIDS_VS_HIGHTECH.metrics.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/30 transition">
                      <td className="py-3 px-4 font-bold text-white">{row.label}</td>
                      <td className="py-3 px-4 font-mono text-zinc-300">{row.valA}</td>
                      <td className="py-3 px-4 font-mono text-zinc-300">{row.valB}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.winner === 'A' 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {row.winner === 'A' ? 'Kids Animation' : 'High-Tech Reviews'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-400">{row.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Final Strategic Verdict */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
              <span className="text-zinc-400 font-bold uppercase tracking-wider block mb-1">Executive Studio Verdict:</span>
              <p className="text-zinc-200 leading-relaxed font-medium">
                {HEAD_TO_HEAD_KIDS_VS_HIGHTECH.strategicVerdict}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: INTERACTIVE NICHE PROFITABILITY SIMULATOR */}
      {/* ========================================================================= */}
      {activeView === 'simulator' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6">
            <div className="max-w-2xl mb-6">
              <h3 className="text-lg font-black text-white">Monthly Niche Revenue Simulator</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Adjust monthly views and choose any content genre to project AdSense RPM + affiliate conversion income deposited into your Wise account.
              </p>
            </div>

            {/* Genre Selector Pills */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-zinc-300 block">Select Genre to Simulate:</label>
              <div className="flex flex-wrap gap-2">
                {NICHE_PROFITABILITY_GENRES.map(g => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSimulatedGenreId(g.id);
                      playSoundEffect('pulse', 0.15);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      simulatedGenreId === g.id
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Views Slider */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Simulated Monthly Views</span>
                <span className="text-lg font-black font-mono text-purple-400">
                  {simulatedViews >= 1000000 
                    ? `${(simulatedViews / 1000000).toFixed(1)} Million Views`
                    : `${(simulatedViews / 1000).toFixed(0)}k Views`}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="50000000"
                step="500000"
                value={simulatedViews}
                onChange={(e) => setSimulatedViews(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>500k Views (Starting)</span>
                <span>10M Views</span>
                <span>25M Views</span>
                <span>50M Views (Viral Scale)</span>
              </div>
            </div>

            {/* Projected Payout Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">AdSense Ad Revenue</span>
                <span className="text-xl font-black text-white font-mono">
                  ${Math.round(simulationResults.totalAdRevenue).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1">Shorts RPM &amp; Longform split</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Affiliate / Merch Sales</span>
                <span className="text-xl font-black text-cyan-400 font-mono">
                  ${Math.round(simulationResults.affiliateRevenue).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1">
                  {simulatedGenre.affiliateConversionRate}% conversion on pinned CTA
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Total Monthly (USD)</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  ${Math.round(simulationResults.totalRevenueUsd).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1">Gross Creator Earnings</span>
              </div>

              {/* Direct Wise UK GBP Payout Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-teal-950/30 border border-emerald-500/40 shadow-lg">
                <span className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Wise UK GBP Payout</span>
                <span className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                  £{Math.round(simulationResults.totalRevenueGbp).toLocaleString()}
                  <span className="text-xs font-normal text-emerald-400 font-sans">GBP</span>
                </span>
                <span className="text-[10px] text-emerald-300 block mt-1">
                  Direct to Sort Code <strong>60-84-64</strong> (Acc 88425941)
                </span>
              </div>
            </div>

            {/* Wise Payout Call-to-Action */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400">
                Funds clear on the 21st of each month via Google AdSense ACH direct into your Wise UK multi-currency balance.
              </div>

              <button
                onClick={() => {
                  if (onSendToPipeline) {
                    onSendToPipeline({
                      niche: simulatedGenre.name,
                      projectedEarnings: `£${Math.round(simulationResults.totalRevenueGbp).toLocaleString()} GBP`,
                    });
                  }
                  playSoundEffect('chime', 0.5);
                }}
                className="px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 transition flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Queue {simulatedGenre.shortName} into Daily Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
