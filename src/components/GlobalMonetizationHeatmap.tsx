import React, { useState, useMemo } from 'react';
import { 
  Globe, TrendingUp, DollarSign, Target, Gift, Sparkles, 
  Layers, Check, Copy, ExternalLink, Calendar, ArrowRight,
  Clock, Users, Award, Play, CheckCircle2, ChevronRight
} from 'lucide-react';
import { GLOBAL_REGIONAL_MONETIZATION, INITIAL_BATCH_VIDEOS } from '../data/globalMonetizationData';
import { GlobalRegionalMonetizationData, BatchVideoItem } from '../types';
import { playSoundEffect } from '../utils/soundEffects';

interface GlobalMonetizationHeatmapProps {
  onSendToUploader?: (data: any) => void;
  onSendToPipeline?: (data: any) => void;
  onSendToCopywriter?: (niche: string) => void;
}

export const GlobalMonetizationHeatmap: React.FC<GlobalMonetizationHeatmapProps> = ({
  onSendToUploader,
  onSendToPipeline,
  onSendToCopywriter
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('us_ca');
  const [activeSubView, setActiveSubView] = useState<'heatmap' | 'batch_video'>('heatmap');
  const [batchVideos, setBatchVideos] = useState<BatchVideoItem[]>(INITIAL_BATCH_VIDEOS);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [filterContinent, setFilterContinent] = useState<string>('all');
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);

  const selectedRegion = useMemo(() => {
    return GLOBAL_REGIONAL_MONETIZATION.find(r => r.regionId === selectedRegionId) || GLOBAL_REGIONAL_MONETIZATION[0];
  }, [selectedRegionId]);

  const filteredRegions = useMemo(() => {
    if (filterContinent === 'all') return GLOBAL_REGIONAL_MONETIZATION;
    return GLOBAL_REGIONAL_MONETIZATION.filter(r => r.continent.toLowerCase() === filterContinent.toLowerCase());
  }, [filterContinent]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playSoundEffect('pulse', 0.2);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddBatchVideo = () => {
    setIsGeneratingBatch(true);
    playSoundEffect('whoosh', 0.3);

    setTimeout(() => {
      const newVideo: BatchVideoItem = {
        id: `batch_${Date.now()}`,
        title: 'Instant Viral Short: The 3-Second Retention Paradox',
        niche: 'High-Tech & SaaS Reviews',
        originalDurationSec: 42,
        targetRegions: ['us_ca', 'uk_ie', 'dach', 'jp'],
        localizedTitles: {
          us_ca: 'Why 99% of People Fail the 3-Second Hook Rule',
          uk_ie: 'The 3-Second YouTube Hook Secret Used by Top Creators',
          dach: 'Die 3-Sekunden-Regel für maximale virale Retention',
          jp: '【衝撃】視聴維持率が激増する3秒の心理学'
        },
        regionalPinnedCtas: {
          us_ca: '👇 Free Hook Checklist & Analytics in Pinned Comment',
          uk_ie: '👇 Grab the Creator Toolkit via Wise link in comments',
          dach: '👇 Kostenlose Vorlage im angepinnten Kommentar',
          jp: '👇 固定コメントで限定チェックリストを配布中'
        },
        cpmProjected: 22.90,
        scheduledTimezone: '19:00 GMT',
        status: 'Ready'
      };

      setBatchVideos(prev => [newVideo, ...prev]);
      setIsGeneratingBatch(false);
      playSoundEffect('chime', 0.5);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-950 via-teal-950/30 to-emerald-950/20 border border-teal-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0 shadow-inner">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-teal-400">
                Global Geo-Targeting &amp; Affiliate Yield Optimizer
              </span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Tier-1 CPM Dominance
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              Global Monetization Heatmap &amp; Batch Video Distributor
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              Cross-correlate viewer concentration with regional advertiser CPMs to target high-income geographies, 
              match regional affiliate programs, and schedule localized batch video releases.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActiveSubView('heatmap')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubView === 'heatmap'
                ? 'bg-teal-500 text-zinc-950 shadow-lg'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Monetization Heatmap</span>
          </button>

          <button
            onClick={() => setActiveSubView('batch_video')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubView === 'batch_video'
                ? 'bg-teal-500 text-zinc-950 shadow-lg'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Batch Video ({batchVideos.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: GLOBAL MONETIZATION HEATMAP */}
      {/* ========================================================================= */}
      {activeSubView === 'heatmap' && (
        <div className="space-y-6">
          {/* Quick Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-zinc-500 pl-2 pr-1 font-medium">Filter Continent:</span>
              {['all', 'North America', 'Europe', 'Asia-Pacific', 'Latin America'].map(c => (
                <button
                  key={c}
                  onClick={() => setFilterContinent(c)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                    filterContinent === c
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {c === 'all' ? 'All Continents (Global)' : c}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-zinc-400 pr-3 font-mono">
              Wise Domestic Payout: <strong className="text-emerald-400">Sort Code 60-84-64</strong> (Joseph Paul Woodside)
            </div>
          </div>

          {/* Regional Cards Grid (Interactive Heatmap Canvas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredRegions.map((region) => {
              const isSelected = region.regionId === selectedRegionId;
              return (
                <div
                  key={region.regionId}
                  onClick={() => {
                    setSelectedRegionId(region.regionId);
                    playSoundEffect('pulse', 0.2);
                  }}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-teal-950/40 via-zinc-900 to-zinc-950 border-teal-400 shadow-xl ring-1 ring-teal-400'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  {/* Heat indicator bar on top */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: region.colorHeat }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{region.flag}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        region.purchasingPowerTier.startsWith('Tier 1')
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {region.purchasingPowerTier.split(' ')[0]}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{region.countryName}</h4>
                    <span className="text-[11px] text-zinc-500 block mt-0.5">{region.continent}</span>

                    <div className="mt-4 grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Average CPM</span>
                        <span className="text-base font-black text-emerald-400 font-mono">
                          ${region.averageCpm.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Shorts RPM</span>
                        <span className="text-base font-black text-white font-mono">
                          ${region.shortsRpm.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Audience Share:</span>
                    <span className="font-mono font-bold text-teal-300">{region.audienceSharePercent}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector for Selected Region */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (7 cols): Regional Demographics & Affiliate Recommendations */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedRegion.flag}</span>
                  <div>
                    <h3 className="text-lg font-black text-white">{selectedRegion.countryName} Regional Profile</h3>
                    <span className="text-xs text-zinc-400">
                      {selectedRegion.continent} • {selectedRegion.purchasingPowerTier}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-zinc-500 block uppercase">Benchmark CPM</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">${selectedRegion.averageCpm.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Audience Characteristics */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Audience Profile &amp; Buyer Behavior:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedRegion.topBuyerDemographic}
                </p>
              </div>

              {/* Affiliate Programs Handpicked for this Region */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Gift className="w-4 h-4" />
                  Recommended Affiliate Match &amp; Offers:
                </span>
                <p className="text-xs text-zinc-400">
                  Target Niche: <strong className="text-white">{selectedRegion.recommendedAffiliateNiche}</strong>
                </p>

                <div className="space-y-2">
                  {selectedRegion.recommendedPrograms.map((prog, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-white font-semibold">{prog}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(prog, `prog_${idx}`)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === `prog_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Program</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Timing & Direct Action Bridge */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-400" /> Optimal Publishing Window
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Algorithmic Peak
                    </span>
                  </div>
                  <div className="text-base font-black text-white font-mono">
                    {selectedRegion.optimalReleaseTimeGmt}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-snug">
                    Schedule your Shorts 30-45 minutes prior to this window so the YouTube recommendation engine indexes frames before audience peak.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-teal-950/20 border border-emerald-500/30 space-y-2">
                  <span className="text-xs font-bold text-emerald-300 block">Direct Wise UK Disbursement:</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Earnings generated from {selectedRegion.countryName} viewers flow into your Google AdSense balance and clear directly into Wise UK Account <strong className="text-white font-mono">60-84-64 / 88425941</strong> (Joseph Paul Woodside) with zero conversion penalties.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (onSendToCopywriter) onSendToCopywriter(selectedRegion.recommendedAffiliateNiche);
                    playSoundEffect('pulse', 0.2);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-white transition flex items-center justify-center gap-2 cursor-pointer border border-zinc-700"
                >
                  <span>Generate Affiliate Copy for {selectedRegion.countryName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setActiveSubView('batch_video');
                    playSoundEffect('pulse', 0.2);
                  }}
                  className="w-full py-3 rounded-xl font-black text-xs bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-zinc-950 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Layers className="w-4 h-4" />
                  <span>Create Batch Video for Top CPM Regions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: BATCH VIDEO LOCALIZATION & MULTI-REGION DISTRIBUTION */}
      {/* ========================================================================= */}
      {activeSubView === 'batch_video' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                Multi-Region Batch Video Queue
              </h3>
              <p className="text-xs text-zinc-400">
                1-Click generate and schedule multi-regional Shorts packages tailored to top Tier-1 CPM markets.
              </p>
            </div>

            <button
              onClick={handleAddBatchVideo}
              disabled={isGeneratingBatch}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-zinc-950 transition flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGeneratingBatch ? 'animate-spin' : ''}`} />
              <span>{isGeneratingBatch ? 'Generating Batch Video...' : '+ Create New Batch Video'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {batchVideos.map((video) => (
              <div 
                key={video.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 hover:border-zinc-700 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {video.niche}
                      </span>
                      <span className="text-xs text-zinc-500">•</span>
                      <span className="text-xs text-zinc-400">{video.originalDurationSec}s Duration</span>
                    </div>
                    <h4 className="text-base font-black text-white mt-1">{video.title}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 uppercase block">Est Combined CPM</span>
                      <span className="text-base font-black text-emerald-400 font-mono">${video.cpmProjected.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (onSendToPipeline) {
                          onSendToPipeline({
                            title: video.title,
                            niche: video.niche,
                            durationSec: video.originalDurationSec
                          });
                        }
                        playSoundEffect('chime', 0.5);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition flex items-center gap-1.5 cursor-pointer border border-zinc-700"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Queue in Pipeline</span>
                    </button>
                  </div>
                </div>

                {/* Regional Variations Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(video.localizedTitles).map(([rKey, locTitle]) => {
                    const regMeta = GLOBAL_REGIONAL_MONETIZATION.find(r => r.regionId === rKey);
                    const cta = video.regionalPinnedCtas[rKey];
                    return (
                      <div key={rKey} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                            <span>{regMeta?.flag || '🌐'}</span>
                            <span>{regMeta?.countryName.split(' ')[0] || rKey.toUpperCase()}</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            ${regMeta?.averageCpm.toFixed(1)} CPM
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white leading-snug line-clamp-2">
                          {locTitle}
                        </div>
                        <div className="text-[11px] text-zinc-400 bg-zinc-900 p-2 rounded-lg border border-zinc-800/80 leading-relaxed font-mono">
                          {cta}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
