import React, { useState, useEffect } from 'react';
import { 
  Users, Search, TrendingUp, Clock, Calendar, Flame, 
  Sparkles, Award, ArrowUpRight, CheckCircle2, AlertTriangle, 
  ShieldAlert, Play, Scissors, Mic, Download, RefreshCw,
  ExternalLink, BarChart3, HelpCircle, ChevronRight, Zap,
  Film, Wand2
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, ComposedChart, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { 
  BENCHMARK_COMPETITORS, 
  CompetitorChannel, 
  generateDynamicCompetitorData 
} from '../data/competitorBenchmarkData';
import { VoiceoverStudio } from './VoiceoverStudio';
import { ContentBridgeTool } from './ContentBridgeTool';

interface CompetitorResearchTabProps {
  onRemixToSlicer?: (transcript: string, context: string) => void;
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToCopywriter?: (topic: string) => void;
  onSendToContentBridge?: (video: {
    id: string;
    title: string;
    channelTitle: string;
    hookQuote: string;
    hookType: string;
    views: string;
    durationSec: number;
    breakdownReason: string;
    suggestedVoice?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  }) => void;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  onSendToSimulator?: (text: string) => void;
}

export const CompetitorResearchTab: React.FC<CompetitorResearchTabProps> = ({
  onRemixToSlicer,
  onSendToClipper,
  onSendToCopywriter,
  onSendToContentBridge,
  onSendToUploader,
  onSendToSimulator
}) => {
  const [searchInput, setSearchInput] = useState<string>('@mrbeast');
  const [activeCompetitor, setActiveCompetitor] = useState<CompetitorChannel>(BENCHMARK_COMPETITORS['@mrbeast']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'voiceover' | 'swot' | 'contentbridge'>('analytics');
  const [selectedBridgeShort, setSelectedBridgeShort] = useState<{
    id: string;
    title: string;
    channelTitle: string;
    hookQuote: string;
    hookType: string;
    views: string;
    durationSec: number;
    breakdownReason: string;
    suggestedVoice?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  } | null>(null);
  
  // Voiceover generator shared state
  const [voiceoverScript, setVoiceoverScript] = useState<string>(
    'If you can stay inside this circle for the next 30 seconds, I will literally hand you this bag with ten thousand dollars in cash. Your time starts right now!'
  );
  const [voiceoverArchetype, setVoiceoverArchetype] = useState<'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr'>('Puck');

  const benchmarkKeys = ['@mrbeast', '@jennyhoyos', '@zachking', '@alexhormozi', '@cleoabram'];

  const handleSearch = async (targetIdOrHandle: string) => {
    const query = targetIdOrHandle.trim();
    if (!query) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/competitor-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId: query })
      });

      if (res.ok) {
        const data: CompetitorChannel = await res.json();
        setActiveCompetitor(data);
        if (data.topViralShorts?.[0]) {
          setVoiceoverScript(data.topViralShorts[0].hookQuote || data.primaryFormula);
          setVoiceoverArchetype(data.topViralShorts[0].suggestedVoice || 'Puck');
        }
      } else {
        const local = generateDynamicCompetitorData(query);
        setActiveCompetitor(local);
      }
    } catch {
      const local = generateDynamicCompetitorData(query);
      setActiveCompetitor(local);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectBenchmark = (handle: string) => {
    setSearchInput(handle);
    handleSearch(handle);
  };

  const handleStealHookToVoiceover = (short: CompetitorChannel['topViralShorts'][0]) => {
    setVoiceoverScript(short.hookQuote);
    setVoiceoverArchetype(short.suggestedVoice);
    setActiveSubTab('voiceover');
  };

  const handleContentBridge = (short: CompetitorChannel['topViralShorts'][0]) => {
    const videoData = {
      id: short.id,
      title: short.title,
      channelTitle: activeCompetitor.title,
      hookQuote: short.hookQuote,
      hookType: short.hookType,
      views: short.views,
      durationSec: short.durationSec,
      breakdownReason: short.breakdownReason,
      suggestedVoice: short.suggestedVoice
    };
    setSelectedBridgeShort(videoData);
    if (onSendToContentBridge) {
      onSendToContentBridge(videoData);
    } else {
      setActiveSubTab('contentbridge');
    }
  };

  const handleSendToSlicerInternal = (short: CompetitorChannel['topViralShorts'][0]) => {
    if (onRemixToSlicer) {
      onRemixToSlicer(
        `${short.hookQuote}\n\n[Full Script Analysis for Short: ${short.title}]\n${short.breakdownReason}`,
        `Competitor Format: ${activeCompetitor.title} (${short.hookType})`
      );
    }
  };

  // Convert radar scores to array format for Recharts
  const radarData = [
    { subject: 'Hook Power (0-3s)', score: activeCompetitor.radarScores.hookPower, fullMark: 100 },
    { subject: 'Loop Retention', score: activeCompetitor.radarScores.retentionLoop, fullMark: 100 },
    { subject: 'Pacing Velocity', score: activeCompetitor.radarScores.pacingVelocity, fullMark: 100 },
    { subject: 'Audio & SFX', score: activeCompetitor.radarScores.audioSfxDesign, fullMark: 100 },
    { subject: 'Thumb CTR', score: activeCompetitor.radarScores.thumbCtr, fullMark: 100 },
    { subject: 'Algorithm Affinity', score: activeCompetitor.radarScores.algorithmAffinity, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Search & Channel Selection Header Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <div className="flex-1">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
              Analyze YouTube Competitor Channel ID or Handle
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchInput)}
                  placeholder="e.g. @mrbeast, @jennyhoyos, UCX6OQ3DkcsbYNE6H8uQQuVA, @cleoabram"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition"
                />
              </div>

              <button
                onClick={() => handleSearch(searchInput)}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-950/40 flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    Deep Research
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Benchmark Pills */}
          <div className="flex flex-col justify-end">
            <span className="text-[11px] text-zinc-500 font-medium mb-1.5">
              1-Click Benchmark Leaders:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {benchmarkKeys.map((key) => {
                const comp = BENCHMARK_COMPETITORS[key];
                const isActive = activeCompetitor.handle.toLowerCase() === key.toLowerCase();
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectBenchmark(key)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-semibold' 
                        : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: comp.accentColor }} />
                    {comp.title}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Competitor Profile Hero Card */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar and Channel Identity */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={activeCompetitor.avatarUrl}
                alt={activeCompetitor.title}
                className="w-18 h-18 rounded-2xl object-cover ring-2 ring-zinc-700/80 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-zinc-900">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {activeCompetitor.title}
                </h2>
                <span className="text-xs text-zinc-400 font-mono">{activeCompetitor.handle}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                  {activeCompetitor.niche}
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-2xl mt-1 leading-relaxed">
                {activeCompetitor.summary}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Algorithmic Hook: {activeCompetitor.primaryFormula}
                </span>
              </div>
            </div>
          </div>

          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 text-center min-w-[105px]">
              <div className="text-xs text-zinc-400">Subscribers</div>
              <div className="text-lg font-black text-white mt-0.5">{activeCompetitor.subscribers}</div>
              <div className="text-[10px] text-emerald-400 font-mono">High Velocity</div>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 text-center min-w-[105px]">
              <div className="text-xs text-zinc-400">Total Views</div>
              <div className="text-lg font-black text-white mt-0.5">{activeCompetitor.totalViews}</div>
              <div className="text-[10px] text-zinc-500 font-mono">{activeCompetitor.shortsCount} Shorts</div>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 text-center min-w-[105px]">
              <div className="text-xs text-zinc-400">Avg Retention</div>
              <div className="text-lg font-black text-amber-400 mt-0.5">{activeCompetitor.avgRetentionPct}%</div>
              <div className="text-[10px] text-emerald-400 font-mono">Looping Grade</div>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 text-center min-w-[105px]">
              <div className="text-xs text-zinc-400">Weekly Drops</div>
              <div className="text-lg font-black text-cyan-400 mt-0.5">{activeCompetitor.weeklyCadence}x</div>
              <div className="text-[10px] text-zinc-500 font-mono">Best: {activeCompetitor.bestDay}</div>
            </div>
          </div>

        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-800">
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'analytics'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Recharts Visualizations &amp; Deep Metrics
          </button>

          <button
            onClick={() => setActiveSubTab('voiceover')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'voiceover'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4 text-amber-400" />
            AI Voice Over Studio ({activeCompetitor.title} Format Dubbing)
          </button>

          <button
            onClick={() => setActiveSubTab('swot')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'swot'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Algorithmic SWOT &amp; Playbook
          </button>

          <button
            onClick={() => setActiveSubTab('contentbridge')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'contentbridge'
                ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md shadow-amber-950/40'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 text-amber-300" />
            Content Bridge 4K™ (30s Remix)
          </button>
        </div>
      </div>

      {/* SUBVIEW 1: RECHARTS ANALYTICS DASHBOARD */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Chart Grid: Channel Growth & Retention vs Duration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 1. Channel Growth Timeline (Area Chart) */}
            <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Channel Growth &amp; Viewership Velocity (12-Month Timeline)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Monthly active viewers (Millions) &amp; subscriber trajectory
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  +{(activeCompetitor.growthTimeline[activeCompetitor.growthTimeline.length - 1].subscribersM - activeCompetitor.growthTimeline[0].subscribersM).toFixed(1)}M Sub Growth
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeCompetitor.growthTimeline}>
                    <defs>
                      <linearGradient id="growthViewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                      </linearGradient>
                      <linearGradient id="growthSubsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '0.75rem', fontSize: '12px' }}
                      labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Area 
                      type="monotone" 
                      dataKey="viewsM" 
                      name="Monthly Views (M)" 
                      stroke="#ef4444" 
                      strokeWidth={2.5}
                      fillOpacity={1} 
                      fill="url(#growthViewsGrad)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="subscribersM" 
                      name="Subscribers (M)" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#growthSubsGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Peak Viral Inflection Point: Month with highest view velocity</span>
                <span className="font-mono text-white font-semibold">
                  Max Viral Multiplier: {Math.max(...activeCompetitor.growthTimeline.map(g => g.viralMultiplier))}x
                </span>
              </div>
            </div>

            {/* 2. Algorithmic DNA Radar Chart */}
            <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Channel Algorithmic DNA Radar
                  </h3>
                  <p className="text-xs text-zinc-400">
                    6-pillar algorithmic retention performance evaluation
                  </p>
                </div>
              </div>

              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#27272a" />
                    <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#3f3f46" fontSize={9} />
                    <Radar 
                      name={activeCompetitor.title} 
                      dataKey="score" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.4} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '0.75rem', fontSize: '11px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Signature Superpower:</span>
                <span className="font-semibold text-red-400">
                  {radarData.reduce((prev, curr) => (curr.score > prev.score ? curr : prev)).subject}
                </span>
              </div>
            </div>

          </div>

          {/* 3. Duration vs Average View Duration (AVD) & Looping Sweet Spot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Shorts Duration vs. Average View Duration (AVD) Retention
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Comparing audience retention % (Line) vs average views (Bars) across video lengths
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Sweet Spot: {activeCompetitor.durationVsAvd.find(d => d.sweetSpot)?.durationBucket}
                </span>
              </div>

              <div className="h-68 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={activeCompetitor.durationVsAvd}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="durationBucket" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} unit="M" />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} tickLine={false} axisLine={false} unit="%" domain={[60, 160]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '0.75rem', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar 
                      yAxisId="left" 
                      dataKey="avgViewsM" 
                      name="Average Views (Millions)" 
                      fill="#ef4444" 
                      radius={[4, 4, 0, 0]} 
                      barSize={32}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="retentionPct" 
                      name="Audience Retention (%)" 
                      stroke="#f59e0b" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#f59e0b' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-400">
                <span className="font-semibold text-white">Retention Insight: </span>
                Shorts between <span className="text-amber-400 font-bold">{activeCompetitor.durationVsAvd.find(d => d.sweetSpot)?.durationBucket}</span> yield an average of <span className="text-emerald-400 font-bold">{activeCompetitor.durationVsAvd.find(d => d.sweetSpot)?.retentionPct}%</span> retention, triggering YouTube's recommendation multiplier.
              </div>
            </div>

            {/* 4. Posting Frequency & Day of Week Heatmap */}
            <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    Posting Cadence &amp; Velocity by Day of Week
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Weekly upload density and audience engagement velocity
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Peak Day: {activeCompetitor.bestDay}
                </span>
              </div>

              <div className="h-68 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeCompetitor.postingFrequency}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="day" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '0.75rem', fontSize: '12px' }}
                    />
                    <Bar 
                      dataKey="velocityScore" 
                      name="Algorithm Velocity (0-100)" 
                      fill="#06b6d4" 
                      radius={[4, 4, 0, 0]} 
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span>Optimal Publishing Window:</span>
                <span className="font-bold text-cyan-400 font-mono">
                  {activeCompetitor.bestDay} @ {activeCompetitor.bestTimeUtc}
                </span>
              </div>
            </div>

          </div>

          {/* Top Viral Shorts Showcase & 1-Click Steal Actions */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-500" />
                  Top Viral Shorts Breakdown &amp; Replicable Formats
                </h3>
                <p className="text-xs text-zinc-400">
                  Deconstruct {activeCompetitor.title}'s highest-performing Shorts and generate high-impact voiceovers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {activeCompetitor.topViralShorts.map((short) => (
                <div
                  key={short.id}
                  className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex flex-col justify-between transition shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                        {short.views} Views
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {short.durationSec}s • {short.retentionPct}% Retention
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {short.title}
                    </h4>

                    {/* Hook Quote Box */}
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-xs">
                      <div className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Hook Type: {short.hookType}</span>
                        <span className="text-zinc-500 font-mono">{short.outlierMultiplier}</span>
                      </div>
                      <p className="text-zinc-300 italic font-serif">
                        "{short.hookQuote}"
                      </p>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2">
                      <span className="text-zinc-300 font-semibold">Why it worked:</span> {short.breakdownReason}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 mt-3 border-t border-zinc-850 flex items-center gap-1.5">
                    <button
                      onClick={() => handleContentBridge(short)}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition shadow-sm"
                      title="Instant 30s Faceless Remix with 4K Director Presets"
                    >
                      <Film className="w-3.5 h-3.5 text-amber-300" />
                      Content Bridge
                    </button>

                    <button
                      onClick={() => handleStealHookToVoiceover(short)}
                      className="py-1.5 px-2 rounded-lg bg-zinc-850 hover:bg-zinc-750 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition"
                      title="AI Voiceover Dubbing"
                    >
                      <Mic className="w-3.5 h-3.5 text-amber-400" />
                    </button>

                    <button
                      onClick={() => handleSendToSlicerInternal(short)}
                      className="py-1.5 px-2 rounded-lg bg-zinc-850 hover:bg-zinc-750 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition"
                      title="Send format to Transcript Slicer"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUBVIEW 2: EMBEDDED AI VOICEOVER STUDIO */}
      {activeSubTab === 'voiceover' && (
        <div className="space-y-4">
          <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">
                  Dubbing &amp; Voiceover Mode for {activeCompetitor.title} Format
                </div>
                <div className="text-[11px] text-zinc-400">
                  Recommended voice archetype: <span className="text-amber-400 font-semibold">{voiceoverArchetype}</span> (matches their pacing and demographic appeal)
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab('analytics')}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:text-white transition"
            >
              Back to Recharts Analytics
            </button>
          </div>

          <VoiceoverStudio
            initialScript={voiceoverScript}
            initialVoice={voiceoverArchetype}
            onSendToClipper={onSendToClipper ? (audioUrl, scriptText) => {
              onSendToClipper(0, 30, `AI Voiceover: ${scriptText?.slice(0, 40)}...`);
            } : undefined}
            onSendToCopywriter={onSendToCopywriter}
          />
        </div>
      )}

      {/* SUBVIEW 3: ALGORITHMIC SWOT & ACTIONABLE PLAYBOOK */}
      {activeSubTab === 'swot' && (
        <div className="space-y-6">
          
          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strengths */}
            <div className="bg-zinc-900/80 border border-emerald-900/40 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Strengths (What They Dominate)
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {activeCompetitor.swotAnalysis.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-zinc-900/80 border border-red-900/40 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Weaknesses &amp; Vulnerabilities (Where You Can Win)
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {activeCompetitor.swotAnalysis.weaknesses.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-zinc-900/80 border border-blue-900/40 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                Opportunities (ShortsForge Arbitrage)
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {activeCompetitor.swotAnalysis.opportunities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-zinc-900/80 border border-amber-900/40 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Threats &amp; Platform Shifts
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {activeCompetitor.swotAnalysis.threats.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Actionable Playbook Cards */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Actionable Growth Playbook to Outrank {activeCompetitor.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">
                  1. Hook Rule
                </div>
                <div className="text-xs text-zinc-300">
                  {activeCompetitor.actionablePlaybook.hookFormula}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                  2. Retention Surgery
                </div>
                <div className="text-xs text-zinc-300">
                  {activeCompetitor.actionablePlaybook.retentionHack}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  3. Pacing Secret
                </div>
                <div className="text-xs text-zinc-300">
                  {activeCompetitor.actionablePlaybook.pacingSecret}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  4. Cadence Blueprint
                </div>
                <div className="text-xs text-zinc-300">
                  {activeCompetitor.actionablePlaybook.cadenceRule}
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                Ready to generate an AI voiceover script modeled on this strategy?
              </span>

              <button
                onClick={() => {
                  setVoiceoverScript(activeCompetitor.actionablePlaybook.hookFormula);
                  setActiveSubTab('voiceover');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-950/40"
              >
                <Mic className="w-3.5 h-3.5" />
                Launch AI Voiceover Studio
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SUBVIEW 4: EMBEDDED CONTENT BRIDGE 4K FACELESS REMIX STUDIO */}
      {activeSubTab === 'contentbridge' && (
        <div className="space-y-4">
          <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">
                  Content Bridge 4K Studio — {selectedBridgeShort?.title ? `Remixing "${selectedBridgeShort.title}"` : `${activeCompetitor.title} Format`}
                </div>
                <div className="text-[11px] text-zinc-400">
                  Generate 30-second contrarian scripts, famous director styles (Nolan, Anderson, Villeneuve), and 4K video clips.
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab('analytics')}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:text-white transition"
            >
              Back to Recharts Analytics
            </button>
          </div>

          <ContentBridgeTool
            initialVideo={selectedBridgeShort || undefined}
            onSendToUploader={onSendToUploader}
            onSendToSimulator={onSendToSimulator}
            onSendToClipper={onSendToClipper}
            onSendToVoiceover={(scriptText, voiceArchetype) => {
              setVoiceoverScript(scriptText);
              setVoiceoverArchetype(voiceArchetype as 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr');
              setActiveSubTab('voiceover');
            }}
          />
        </div>
      )}

    </div>
  );
};
