import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Sparkles, Copy, Check, TrendingUp, 
  ExternalLink, ShieldCheck, Gift, ArrowRight, BookmarkCheck, MessageSquare,
  Calculator, Layers, Target, RefreshCw, BarChart3
} from 'lucide-react';
import { MonetizationResult } from '../types';
import { ProfitProjectionTool } from './ProfitProjectionTool';
import { WisePayoutsSuite } from './WisePayoutsSuite';
import { PayoutsConfigurationModule } from './PayoutsConfigurationModule';
import { NicheProfitabilityMap } from './NicheProfitabilityMap';
import { RevenueIntelligenceModule } from './RevenueIntelligenceModule';
import { PayoutSecurityValidator } from './PayoutSecurityValidator';
import { GlobalMonetizationHeatmap } from './GlobalMonetizationHeatmap';
import { SmartRevenueBenchmarking } from './SmartRevenueBenchmarking';
import { RevenueSyncDashboard } from './RevenueSyncDashboard';

interface MonetizationTabProps {
  onSendToCopywriter?: (niche: string) => void;
  onSendToUploader?: (data: any) => void;
  onSendToPipeline?: (data: any) => void;
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToSceneGen?: () => void;
}

export const MonetizationTab: React.FC<MonetizationTabProps> = ({ 
  onSendToCopywriter,
  onSendToUploader,
  onSendToPipeline,
  onSendToClipper,
  onSendToSceneGen
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'revenue_sync' | 'revenue_intel' | 'smart_benchmarking' | 'security_validator' | 'global_heatmap' | 'payouts_config' | 'profitability_map' | 'calculator' | 'blueprints' | 'wise'
  >('revenue_sync');
  const [selectedNiche, setSelectedNiche] = useState('Finance');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MonetizationResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchBlueprint = async (nicheName: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/monetization-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: nicheName })
      });
      const resData = await res.json();
      setData(resData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlueprint(selectedNiche);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSelectNiche = (n: string) => {
    setSelectedNiche(n);
    fetchBlueprint(n);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl w-fit">
        <button
            onClick={() => setActiveSubTab('revenue_sync')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'revenue_sync'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-lg ring-1 ring-emerald-400/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${activeSubTab === 'revenue_sync' ? 'text-emerald-300' : 'text-zinc-400'}`} />
            <span>Revenue Sync</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Real-Time AdSense
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('revenue_intel')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'revenue_intel'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-indigo-300" />
            <span>Revenue Intelligence</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
              CPM Pivots
            </span>
          </button>

        <button
          onClick={() => setActiveSubTab('smart_benchmarking')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'smart_benchmarking'
              ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 text-white shadow-lg'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Target className="w-4 h-4 text-teal-300" />
          <span>Smart Revenue Benchmarking</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
            Opportunity Score
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('security_validator')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'security_validator'
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-lg'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Payout Security Validator</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            60-84-64 Regex
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('global_heatmap')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'global_heatmap'
              ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 text-white shadow-lg'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Target className="w-4 h-4 text-teal-300" />
          <span>Global Monetization Heatmap</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Batch Video
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('payouts_config')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'payouts_config'
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-lg'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Payouts &amp; Wise OAuth</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profitability_map')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'profitability_map'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Target className="w-4 h-4 text-emerald-300" />
          <span>Niche Profitability Map</span>
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'calculator'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4 text-emerald-300" />
          <span>Calculator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('blueprints')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'blueprints'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-300" />
          <span>Affiliate Matrix</span>
        </button>

        <button
          onClick={() => setActiveSubTab('wise')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'wise'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-300" />
          <span>Wise Guide</span>
        </button>
      </div>

      {/* VIEW: REVENUE SYNC DASHBOARD (REAL-TIME ADSENSE VS AUTOMATION PIPELINE OUTPUT) */}
      {activeSubTab === 'revenue_sync' && (
        <RevenueSyncDashboard
          onSendToPipeline={onSendToPipeline}
          onSendToUploader={onSendToUploader}
          onSendToClipper={onSendToClipper}
        />
      )}

      {/* VIEW: REVENUE INTELLIGENCE */}
      {activeSubTab === 'revenue_intel' && (
        <RevenueIntelligenceModule
          onSendToPipeline={onSendToPipeline}
          onSendToUploader={onSendToUploader}
          onSendToCopywriter={onSendToCopywriter}
          onSendToClipper={onSendToClipper}
          onSendToSceneGen={onSendToSceneGen}
        />
      )}

      {/* VIEW: SMART REVENUE BENCHMARKING & OPPORTUNITY SCORE */}
      {activeSubTab === 'smart_benchmarking' && (
        <SmartRevenueBenchmarking
          onSendToClipper={onSendToClipper}
          onSendToUploader={onSendToUploader}
          onSendToPipeline={onSendToPipeline}
          onSendToCopywriter={onSendToCopywriter}
        />
      )}

      {/* VIEW: PAYOUT SECURITY VALIDATOR */}
      {activeSubTab === 'security_validator' && (
        <PayoutSecurityValidator
          onSendToPipeline={onSendToPipeline}
        />
      )}

      {/* VIEW: GLOBAL MONETIZATION HEATMAP & BATCH VIDEO */}
      {activeSubTab === 'global_heatmap' && (
        <GlobalMonetizationHeatmap
          onSendToUploader={onSendToUploader}
          onSendToPipeline={onSendToPipeline}
          onSendToCopywriter={onSendToCopywriter}
        />
      )}

      {/* VIEW 0: PAYOUTS CONFIGURATION (WISE OAUTH & MULTI-LINGUAL AI) */}
      {activeSubTab === 'payouts_config' && (
        <PayoutsConfigurationModule 
          onSendToUploader={onSendToUploader}
          onSendToPipeline={onSendToPipeline}
        />
      )}

      {/* VIEW 0.5: NICHE PROFITABILITY MAP */}
      {activeSubTab === 'profitability_map' && (
        <NicheProfitabilityMap 
          onSendToCopywriter={onSendToCopywriter}
          onSendToPipeline={onSendToPipeline}
          onSendToUploader={onSendToUploader}
        />
      )}

      {/* VIEW 1: PROFIT PROJECTION CALCULATOR */}
      {activeSubTab === 'calculator' && (
        <ProfitProjectionTool onSendToCopywriter={onSendToCopywriter} />
      )}

      {/* VIEW 2: NICHE BLUEPRINTS & AFFILIATE PROGRAMS */}
      {activeSubTab === 'blueprints' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-amber-950/40 border border-emerald-500/20 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-600/30">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">Faceless YouTube Shorts Monetization Blueprint</h2>
                </div>
                <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
                  Build a faceless Shorts empire with $0 upfront costs. Master the top 5 high-CPM niches, free-to-join high-ticket affiliate programs, and high-conversion pinned comment blueprints.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Affiliate &amp; High-CPM Matrix
                </span>
              </div>
            </div>
          </div>

      {/* Top 5 High-Revenue Niches Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Top 5 High-Revenue Niches for Shorts
          </h3>
          <span className="text-xs text-zinc-400">Click a niche to load free affiliate programs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { id: 'Finance', label: 'Finance & Wealth', rpm: '$6 - $18', cpm: '$25 - $60', tag: 'Highest RPM' },
            { id: 'SaaS', label: 'SaaS & AI Software', rpm: '$4 - $12', cpm: '$20 - $45', tag: 'Recurring Rev' },
            { id: 'Health', label: 'Health & Longevity', rpm: '$3 - $10', cpm: '$18 - $40', tag: 'High Volume' },
            { id: 'Luxury', label: 'Luxury & High-Tech', rpm: '$3 - $8', cpm: '$15 - $35', tag: 'High Ticket' },
            { id: 'Career', label: 'Career & Remote Work', rpm: '$3 - $7', cpm: '$14 - $30', tag: 'Easy Entry' },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => handleSelectNiche(n.id)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                selectedNiche === n.id
                  ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono uppercase bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
                  {n.tag}
                </span>
                {selectedNiche === n.id && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                )}
              </div>
              <div className="text-xs font-bold text-white mt-1 leading-snug">{n.label}</div>
              <div className="mt-2 text-[11px] font-mono text-emerald-400 font-semibold">
                Est RPM: {n.rpm}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                Ad CPM: {n.cpm}
              </div>
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-semibold text-white">Loading Affiliate Matrix for {selectedNiche}...</p>
        </div>
      )}

      {data && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 3 Free Profitable Affiliate Programs */}
          <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-400" /> 3 Profitable Affiliate Programs (100% Free to Join)
              </h3>
            </div>
            <p className="text-xs text-zinc-400">
              Vetted programs with high conversion rates for vertical video traffic in the <strong className="text-white">{data.selectedNiche}</strong> space:
            </p>

            <div className="space-y-3.5 pt-1">
              {data.affiliatePrograms.map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/90 space-y-2.5 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{prog.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      {prog.commission}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-snug">
                    <strong className="text-zinc-300">Best for:</strong> {prog.bestFor}
                  </p>

                  <div className="bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800 text-[11px] text-zinc-300">
                    <span className="text-amber-400 font-bold block mb-0.5">Promotion Strategy:</span>
                    {prog.howToPromote}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-zinc-500 font-mono text-[10px]">Signup: {prog.joinUrl}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                      Instant Approval
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pinned Comment Blueprint & In-Video CTA */}
          <div className="lg:col-span-6 space-y-5">
            {/* Pinned Comment Blueprint */}
            <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" /> Pinned Comment Conversion Blueprint
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Framework: {data.pinnedCommentBlueprint.framework}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(data.pinnedCommentBlueprint.template, 'monetize-comment')}
                  className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  {copiedKey === 'monetize-comment' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Template</span>
                </button>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 whitespace-pre-wrap leading-relaxed font-sans shadow-inner">
                {data.pinnedCommentBlueprint.template}
              </div>

              <div className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <span className="text-emerald-400 font-bold block">🧠 Why This Converts Without Being Flagged:</span>
                <p className="text-[11px] leading-relaxed">
                  {data.pinnedCommentBlueprint.whyItConverts}
                </p>
              </div>
            </div>

            {/* In-Video Call-To-Action Scripts */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-emerald-400" /> In-Video Soft-Sell Closing Lines (Last 5s)
              </h3>
              <p className="text-xs text-zinc-400">
                Never shout &quot;BUY NOW&quot;. Use these frictionless soft-handoff scripts in the final 5 seconds before the video ends:
              </p>

              <div className="space-y-2 pt-1">
                {data.inVideoCallToActions.map((cta, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between gap-3 text-xs text-white font-medium"
                  >
                    <span>{cta}</span>
                    <button
                      onClick={() => handleCopy(cta, `cta-${idx}`)}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded border border-zinc-800 shrink-0"
                    >
                      {copiedKey === `cta-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      )}

      {/* VIEW 3: WISE & ADSENSE PAYOUTS SUITE */}
      {activeSubTab === 'wise' && (
        <WisePayoutsSuite 
          onSendToUploader={onSendToUploader}
          onSendToPipeline={onSendToPipeline}
        />
      )}
    </div>
  );
};

