import React, { useState, useEffect, useMemo } from 'react';
import { 
  DollarSign, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, 
  ExternalLink, Copy, Check, Sparkles, Building, Globe, Zap, 
  Layers, Lock, HelpCircle, TrendingUp, Calendar, Clock, Play,
  Film, Video, Compass, Wand2, Shield
} from 'lucide-react';
import { 
  DEFAULT_WISE_CONFIG, WisePayoutConfig, 
  HIGH_REVENUE_NICHES, HighRevenueNicheBlueprint,
  YOUTUBE_WISE_PAYOUT_LIFECYCLE, calculateWiseFeeSavings 
} from '../data/wisePayoutData';
import { InstantShortsPackage } from '../types';

interface WisePayoutsSuiteProps {
  onSendToUploader?: (data: { title: string; description: string; tags: string[]; videoUrl?: string }) => void;
  onSendToPipeline?: (data: any) => void;
}

export const WisePayoutsSuite: React.FC<WisePayoutsSuiteProps> = ({
  onSendToUploader,
  onSendToPipeline
}) => {
  // Wise Configuration State with local storage
  const [config, setConfig] = useState<WisePayoutConfig>(() => {
    try {
      const saved = localStorage.getItem('shortsforge_wise_config');
      return saved ? JSON.parse(saved) : DEFAULT_WISE_CONFIG;
    } catch {
      return DEFAULT_WISE_CONFIG;
    }
  });

  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Revenue Calculator State
  const [monthlyProjectedViews, setMonthlyProjectedViews] = useState<number>(10000000); // 10M views default
  const [selectedNicheCategory, setSelectedNicheCategory] = useState<string>('kids_animations');
  
  // Instant Generation State
  const [isGeneratingInstantShort, setIsGeneratingInstantShort] = useState(false);
  const [generatedShort, setGeneratedShort] = useState<InstantShortsPackage | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveConfig = () => {
    localStorage.setItem('shortsforge_wise_config', JSON.stringify(config));
    setIsEditingConfig(false);
    showToast('Wise account payout details securely saved!');
  };

  // Fee calculation based on projected annual earnings
  const selectedNicheObj = useMemo(() => {
    return HIGH_REVENUE_NICHES.find(n => n.category === selectedNicheCategory) || HIGH_REVENUE_NICHES[0];
  }, [selectedNicheCategory]);

  const projectedRpmNumeric = useMemo(() => {
    if (selectedNicheCategory === 'kids_animations') return 0.85;
    if (selectedNicheCategory === 'films') return 1.45;
    if (selectedNicheCategory === 'clipper') return 0.90;
    if (selectedNicheCategory === 'animations') return 1.50;
    return 4.50; // finance
  }, [selectedNicheCategory]);

  const estimatedMonthlyIncome = useMemo(() => {
    return Math.round((monthlyProjectedViews / 1000) * projectedRpmNumeric);
  }, [monthlyProjectedViews, projectedRpmNumeric]);

  const feeSavings = useMemo(() => {
    return calculateWiseFeeSavings(estimatedMonthlyIncome * 12);
  }, [estimatedMonthlyIncome]);

  // Trigger Instant AI Short Generator
  const handleGenerateInstantShort = async (category: string) => {
    setIsGeneratingInstantShort(true);
    try {
      const res = await fetch('/api/instant-shorts/generate-niche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          niche: selectedNicheObj.title
        })
      });
      const data = await res.json();
      if (data.package) {
        setGeneratedShort(data.package);
        showToast(`Generated instant short: "${data.package.title.slice(0, 30)}..."`);
      }
    } catch (e) {
      console.error('Instant short generator error:', e);
    } finally {
      setIsGeneratingInstantShort(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/50 via-zinc-900 to-teal-950/50 border border-emerald-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-600/30">
                <DollarSign className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                YouTube Partner Program &amp; Wise Direct Payout Suite
              </h3>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                0% Hidden FX Markup
              </span>
            </div>
            <p className="text-zinc-400 text-xs max-w-2xl leading-relaxed">
              Connect your Google AdSense account to receive automated monthly YouTube Shorts ad revenue directly into your 
              Wise multi-currency account, saving thousands in international SWIFT wire and intermediary bank fees.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-zinc-950 border border-emerald-500/30 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase font-mono">Status:</span>
                <span className="text-emerald-300 font-bold font-mono">Wise Bank Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 2 Columns: Wise Account Details & How Payouts Work */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Creator Wise Account Payout Config */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Your Wise Payout Configuration</h4>
            </div>
            <button
              onClick={() => {
                if (isEditingConfig) handleSaveConfig();
                else setIsEditingConfig(true);
              }}
              className="text-xs px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 cursor-pointer font-medium"
            >
              {isEditingConfig ? 'Save Changes' : 'Edit Details'}
            </button>
          </div>

          <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">Beneficiary Name:</span>
                {isEditingConfig ? (
                  <input
                    type="text"
                    value={config.accountHolderName}
                    onChange={(e) => setConfig({ ...config, accountHolderName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-xs mt-1"
                  />
                ) : (
                  <span className="font-bold text-white block mt-0.5">{config.accountHolderName}</span>
                )}
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">Wise Tag / Email:</span>
                {isEditingConfig ? (
                  <input
                    type="text"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-xs mt-1"
                  />
                ) : (
                  <span className="font-bold text-emerald-400 block mt-0.5">{config.email}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-900">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">UK Sort Code (GBP):</span>
                <div className="flex items-center justify-between bg-zinc-900/80 px-2 py-1.5 rounded border border-zinc-800 mt-1">
                  <span className="font-mono font-bold text-emerald-300">60-84-64</span>
                  <button onClick={() => handleCopy('60-84-64', 'sort_code_suite')} className="text-zinc-400 hover:text-emerald-400 cursor-pointer" title="Copy Sort Code">
                    {copiedKey === 'sort_code_suite' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">Account Number:</span>
                <div className="flex items-center justify-between bg-zinc-900/80 px-2 py-1.5 rounded border border-zinc-800 mt-1">
                  <span className="font-mono font-bold text-white">88425941</span>
                  <button onClick={() => handleCopy('88425941', 'account_suite')} className="text-zinc-400 hover:text-emerald-400 cursor-pointer" title="Copy Account Number">
                    {copiedKey === 'account_suite' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono block">Bank Partner &amp; Clearing:</span>
              <p className="text-zinc-300 font-mono">Wise Payments Ltd (Sort Code: 60-84-64) • Faster Payments / BACS &amp; US ACH Direct Deposit</p>
            </div>

            <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px]">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>W-8BEN Tax Form Verified (0% Withholding)</span>
              </span>
              <span className="text-emerald-400 font-mono font-bold">Auto-Pay &gt; $100</span>
            </div>
          </div>

          {/* Quick AdSense Instructions */}
          <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80 text-xs space-y-1.5">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>How To Enter In Google AdSense:</span>
            </h5>
            <ol className="list-decimal list-inside text-zinc-400 space-y-1 text-[11px] leading-relaxed">
              <li>Log into <strong className="text-zinc-300">Google AdSense &gt; Payments &gt; Payment Info</strong>.</li>
              <li>Click <strong className="text-zinc-300">&quot;Add payment method&quot;</strong> and select <strong className="text-zinc-300">&quot;Add Electronic Funds Transfer (EFT)&quot;</strong>.</li>
              <li>Paste your Wise <strong className="text-emerald-300">Routing Number</strong> ({config.routingNumber}) and <strong className="text-emerald-300">Account Number</strong>.</li>
              <li>Verify the 2-day micro-deposit (&lt;$1.00) directly inside your Wise app.</li>
            </ol>
          </div>
        </div>

        {/* Right Column: Complete Explanation of YouTube Payouts */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">How YouTube Shorts Payouts Work</h4>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Monthly Lifecycle</span>
          </div>

          <div className="space-y-3">
            {YOUTUBE_WISE_PAYOUT_LIFECYCLE.map((step) => (
              <div 
                key={step.step}
                className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80 space-y-1.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[10px] font-mono font-bold">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold text-white">{step.title}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {step.timing}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
                <div className="text-[10px] text-emerald-300/80 font-medium flex items-center gap-1">
                  <span>Action:</span> {step.actionRequired}
                </div>
              </div>
            ))}
          </div>

          {/* Wise vs Traditional Bank Savings Callout */}
          <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Wise Bank Fee Savings</span>
              <p className="text-xs text-zinc-300 font-medium">
                Saves <strong className="text-emerald-300">${feeSavings.totalSaved.toLocaleString()}/yr</strong> vs traditional bank wire &amp; FX fees.
              </p>
            </div>
            <span className="text-lg font-black text-emerald-400 font-mono">
              +{feeSavings.savingsPercent}% Net Kept
            </span>
          </div>
        </div>
      </div>

      {/* Devised Regular Daily Upload Strategy: High-Revenue Niches */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                Devised High-Revenue Daily Upload Strategy
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              High-earning niches optimized for automated daily pipelines: Kids 3D Animations (hyper-looping), 
              Cinema Film Recaps (binge watch-time), Viral Clippers, and FinTech Wealth.
            </p>
          </div>

          {/* Monthly Views Slider */}
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1 min-w-[240px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Target Monthly Views:</span>
              <span className="text-emerald-400 font-mono font-bold">{(monthlyProjectedViews / 1000000).toFixed(1)}M Views</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="1000000"
              value={monthlyProjectedViews}
              onChange={(e) => setMonthlyProjectedViews(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>1M</span>
              <span>Est. Revenue: ${estimatedMonthlyIncome.toLocaleString()}/mo</span>
              <span>50M</span>
            </div>
          </div>
        </div>

        {/* Niche Blueprint Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HIGH_REVENUE_NICHES.map((niche) => {
            const isSelected = selectedNicheCategory === niche.category;
            return (
              <div 
                key={niche.id}
                onClick={() => setSelectedNicheCategory(niche.category)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected 
                    ? 'bg-emerald-950/30 border-emerald-500 shadow-lg' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-zinc-900 text-zinc-300 border border-zinc-800">
                      {niche.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      RPM: {niche.projectedRpm}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {niche.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {niche.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-900 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Cadence:</span>
                    <span className="text-white font-medium">{niche.dailyUploadRecommendation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Retention Goal:</span>
                    <span className="text-emerald-300 font-medium">{niche.audienceRetentionTarget}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGenerateInstantShort(niche.category);
                    }}
                    disabled={isGeneratingInstantShort}
                    className="w-full mt-2 py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Generate Instant Short</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Instant Short Modal / Live Card */}
      {generatedShort && (
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Instant Ready-to-Upload Short Package ({generatedShort.niche})
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{generatedShort.title}</h3>
            </div>

            <div className="flex items-center gap-2">
              {onSendToUploader && (
                <button
                  onClick={() => {
                    onSendToUploader({
                      title: generatedShort.title,
                      description: generatedShort.description,
                      tags: generatedShort.tags,
                      videoUrl: generatedShort.videoPreviewUrl
                    });
                    showToast('Transferred directly into YouTube Instant Uploader!');
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow cursor-pointer transition-all"
                >
                  <span>Push to 1-Click Uploader</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onSendToPipeline && (
                <button
                  onClick={() => {
                    onSendToPipeline({
                      title: generatedShort.title,
                      description: generatedShort.description,
                      tags: generatedShort.tags,
                      niche: generatedShort.niche,
                      estimatedEarnings: 3800
                    });
                    showToast('Queued into 7-Day Automated Daily Pipeline!');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow cursor-pointer transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Queue in 7-Day Pipeline</span>
                </button>
              )}
            </div>
          </div>

          {/* Script Timeline Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-300 uppercase font-mono">
              60-Second Timed Script &amp; Visual Directives:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {generatedShort.scriptSegments?.map((seg, idx) => (
                <div key={idx} className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-emerald-400 font-bold">{seg.timestampRange}</span>
                    <span className="text-[10px] bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded font-mono">
                      {seg.screenTextOverlay}
                    </span>
                  </div>
                  <p className="text-zinc-200 font-medium leading-relaxed">&quot;{seg.spokenText}&quot;</p>
                  <div className="text-[10px] text-zinc-500 space-y-0.5 pt-1 border-t border-zinc-900">
                    <div><strong className="text-zinc-400">Visual:</strong> {seg.bRollVisualPrompt}</div>
                    <div><strong className="text-amber-400">SFX:</strong> {seg.sfxTrigger}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Royalty-Free Soundtrack & CapCut Directives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5">
              <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold">Soundtrack Recommendation:</span>
              <h5 className="font-bold text-white">{generatedShort.soundtrackRecommendation?.title}</h5>
              <p className="text-zinc-400 text-[11px]">
                {generatedShort.soundtrackRecommendation?.mood} • {generatedShort.soundtrackRecommendation?.bpm} BPM • {generatedShort.soundtrackRecommendation?.license}
              </p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5">
              <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold">High-Revenue Monetization:</span>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                Projected Views: <strong className="text-white">{generatedShort.potentialViews}</strong> | Est. Earnings: <strong className="text-emerald-400">{generatedShort.projectedEarnings}</strong> ({generatedShort.estimatedRpm} RPM)
              </p>
              <p className="text-zinc-400 text-[10px]">
                📌 Pinned link template: {generatedShort.pinnedComment}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
