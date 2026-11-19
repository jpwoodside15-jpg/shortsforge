import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, TrendingUp, Scissors, Sparkles, Copy, Check, Play, 
  RefreshCw, Search, Eye, Filter, Zap, ArrowRight, Video, 
  FileText, Music, Clock, ShieldCheck, ChevronRight, Layers, 
  Volume2, Download, AlertCircle, Trophy, BarChart3, Radio, 
  Sparkle, Terminal, ShieldAlert, Cpu, DollarSign, Dumbbell, 
  Smile, Gamepad2, FlaskConical, History, Car, Brain, X, Info
} from 'lucide-react';
import { TOP_100_TRENDING_SHORTS, TRENDING_NICHES, TrendingShortItem } from '../data/trendingShortsData';
import { playSoundEffect } from '../utils/soundEffects';

interface ViralTrendWatcherTabProps {
  onRemixToSlicer: (transcript: string, context: string) => void;
  onSendToSimulator: (hookText: string) => void;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
}

interface SmartHookResult {
  summary: string;
  recommendedNiche: string;
  hooks: Array<{
    id: number;
    archetype: string;
    hookText: string;
    wordCount: number;
    predictedRetention: number;
    psychologicalMechanism: string;
    onScreenSubtitleStyle: string;
    sfxCue: string;
    visualHookDirection: string;
  }>;
}

interface ScrapeCopyResult {
  sourceTitle: string;
  scrapedAnalysis: {
    detectedNiche: string;
    estimatedPacingWpm: number;
    hookBreakdown: {
      spokenHook: string;
      visualBeat: string;
      psychologicalReason: string;
      retentionRiskScore: number;
    };
    narrativeSpine: Array<{
      timestamp: string;
      beatName: string;
      dopamineTrigger: string;
    }>;
    infiniteLoopMechanism: string;
  };
  uniqueFacelessRemix: {
    titleOptions: Array<{ title: string; hookType: string }>;
    scriptFull: string;
    spokenWordCount: number;
    estimatedDurationSec: number;
  };
  visualBrollBlueprint: Array<{
    timeRange: string;
    scene: string;
    aiVideoPrompt: string;
    cameraMotion: string;
    overlayText: string;
    sfxCue: string;
  }>;
  capCutProductionGuide: {
    fontRecommendation: string;
    primaryColor: string;
    highlightColor: string;
    keywordAnimation: string;
    soundtrackMood: string;
    safeZoneNotes: string;
  };
  youtubeMetadata: {
    title: string;
    description: string;
    hashtags: string[];
    pinnedComment: string;
  };
}

export const ViralTrendWatcherTab: React.FC<ViralTrendWatcherTabProps> = ({
  onRemixToSlicer,
  onSendToSimulator,
  onSendToUploader
}) => {
  // Navigation & Filtering
  const [activeSubTab, setActiveSubTab] = useState<'monitor' | 'hook-generator' | 'scrape-cloner'>('monitor');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'velocity' | 'views' | 'virality' | 'rank'>('velocity');
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Modal / Drawer inspect states
  const [inspectShort, setInspectShort] = useState<TrendingShortItem | null>(null);

  // Smart Hook Generator States
  const [hookTopic, setHookTopic] = useState('This New Humanoid Robot Just Broke The World Record');
  const [hookNiche, setHookNiche] = useState('tech-ai');
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);
  const [smartHookResult, setSmartHookResult] = useState<SmartHookResult | null>(null);

  // Full Video Scraper & Script Cloner States
  const [scrapeUrlInput, setScrapeUrlInput] = useState('https://www.youtube.com/shorts/UnitreeG2RobotRecord');
  const [scrapeTitleInput, setScrapeTitleInput] = useState('This New Humanoid Robot Just Broke The World Record');
  const [scrapeTranscriptInput, setScrapeTranscriptInput] = useState(TOP_100_TRENDING_SHORTS[0].viralTranscript);
  const [scrapeNicheInput, setScrapeNicheInput] = useState('tech-ai');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<ScrapeCopyResult | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filtered & Sorted Shorts
  const filteredShorts = useMemo(() => {
    let list = [...TOP_100_TRENDING_SHORTS];

    if (selectedNiche !== 'all') {
      list = list.filter((s) => s.niche === selectedNiche);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => 
        s.title.toLowerCase().includes(q) ||
        s.channel.toLowerCase().includes(q) ||
        s.viralTranscript.toLowerCase().includes(q) ||
        s.soundTrack.toLowerCase().includes(q) ||
        s.hookFormula.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'velocity') {
      list.sort((a, b) => {
        const velA = parseFloat(a.velocityPerHour.replace(/[^0-9.]/g, '')) || 0;
        const velB = parseFloat(b.velocityPerHour.replace(/[^0-9.]/g, '')) || 0;
        return velB - velA;
      });
    } else if (sortBy === 'views') {
      list.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'virality') {
      list.sort((a, b) => b.viralityScore - a.viralityScore);
    } else if (sortBy === 'rank') {
      list.sort((a, b) => a.rank - b.rank);
    }

    return list;
  }, [selectedNiche, searchQuery, sortBy]);

  // Quick Stats
  const topRising = filteredShorts[0] || TOP_100_TRENDING_SHORTS[0];
  const avgVirality = Math.round(filteredShorts.reduce((acc, s) => acc + s.viralityScore, 0) / (filteredShorts.length || 1));
  const avgRetention = Math.round(filteredShorts.reduce((acc, s) => acc + s.retentionRating, 0) / (filteredShorts.length || 1));

  // Trigger Smart Hook Generation
  const handleGenerateHooks = async (topicToUse?: string, nicheToUse?: string) => {
    const targetTopic = topicToUse || hookTopic;
    const targetNiche = nicheToUse || hookNiche;
    setIsGeneratingHooks(true);
    playSoundEffect('whoosh', 0.4);
    try {
      const res = await fetch('/api/smart-hook-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicOrScript: targetTopic,
          niche: targetNiche
        })
      });
      const data = await res.json();
      setSmartHookResult(data);
      playSoundEffect('chime', 0.5);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingHooks(false);
    }
  };

  // Trigger Video Scrape & Script Cloning
  const handleScrapeAndCopy = async (url?: string, title?: string, transcript?: string, niche?: string) => {
    const targetUrl = url || scrapeUrlInput;
    const targetTitle = title || scrapeTitleInput;
    const targetTranscript = transcript || scrapeTranscriptInput;
    const targetNiche = niche || scrapeNicheInput;

    setIsScraping(true);
    playSoundEffect('pulse', 0.4);
    try {
      const res = await fetch('/api/scrape-and-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urlOrTitle: targetTitle || targetUrl,
          rawTranscript: targetTranscript,
          niche: targetNiche,
          targetLengthSec: 40
        })
      });
      const data = await res.json();
      setScrapeResult(data);
      playSoundEffect('chime', 0.5);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScraping(false);
    }
  };

  // Open Hook Generator with item
  const openHookGeneratorForItem = (item: TrendingShortItem) => {
    setHookTopic(item.title);
    setHookNiche(item.niche);
    setActiveSubTab('hook-generator');
    handleGenerateHooks(item.title, item.niche);
  };

  // Open Scraper with item
  const openScraperForItem = (item: TrendingShortItem) => {
    setScrapeTitleInput(item.title);
    setScrapeUrlInput(`https://www.youtube.com/shorts/${item.id}`);
    setScrapeTranscriptInput(item.viralTranscript);
    setScrapeNicheInput(item.niche);
    setActiveSubTab('scrape-cloner');
    handleScrapeAndCopy(`https://www.youtube.com/shorts/${item.id}`, item.title, item.viralTranscript, item.niche);
  };

  // 1-Click Remix into Slicer
  const handleRemixToSlicerDirect = (item: TrendingShortItem) => {
    playSoundEffect('whoosh', 0.5);
    onRemixToSlicer(item.viralTranscript, `${item.channel} - ${item.title}`);
  };

  const getNicheIcon = (nicheId: string) => {
    switch (nicheId) {
      case 'tech-ai': return <Cpu className="w-3.5 h-3.5" />;
      case 'business-wealth': return <DollarSign className="w-3.5 h-3.5" />;
      case 'fitness-health': return <Dumbbell className="w-3.5 h-3.5" />;
      case 'comedy-skits': return <Smile className="w-3.5 h-3.5" />;
      case 'gaming-esports': return <Gamepad2 className="w-3.5 h-3.5" />;
      case 'science-engineering': return <FlaskConical className="w-3.5 h-3.5" />;
      case 'history-mystery': return <History className="w-3.5 h-3.5" />;
      case 'sports-football': return <Trophy className="w-3.5 h-3.5" />;
      case 'luxury-cars': return <Car className="w-3.5 h-3.5" />;
      case 'psychology-mindset': return <Brain className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="bg-gradient-to-r from-red-950/50 via-zinc-900 to-indigo-950/50 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-950/60">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-white tracking-tight">
                    Viral Trend Watcher
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    LIVE TOP 100 SHORTS
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Real-time algorithmic monitoring across 10 niches with instant 1-click Remixing into the Slicer.
                </p>
              </div>
            </div>
          </div>

          {/* Sub Navigation Modes */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSubTab('monitor')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'monitor'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 border border-red-500'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Top 100 Monitor</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/40 font-mono">100</span>
            </button>

            <button
              onClick={() => {
                setActiveSubTab('hook-generator');
                if (!smartHookResult) handleGenerateHooks();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'hook-generator'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50 border border-amber-500'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Hook Generator</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono">AI 3.8</span>
            </button>

            <button
              onClick={() => {
                setActiveSubTab('scrape-cloner');
                if (!scrapeResult) handleScrapeAndCopy();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'scrape-cloner'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50 border border-indigo-500'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Full Video Scrape &amp; Copy</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-mono">PRO</span>
            </button>
          </div>
        </div>

        {/* Real-time Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-zinc-800/80 text-xs">
          <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400">#1 Rising Velocity</div>
              <div className="font-bold text-white font-mono text-xs">{topRising.velocityPerHour}</div>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400">Avg Virality Score</div>
              <div className="font-bold text-amber-400 font-mono text-xs">{avgVirality}/100</div>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400">Avg 3s Retention</div>
              <div className="font-bold text-emerald-400 font-mono text-xs">{avgRetention}% Keep Rate</div>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Music className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-zinc-400">Trending Audio Track</div>
              <div className="font-bold text-cyan-300 text-xs truncate">Hans Zimmer / Montagem</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== TAB 1: TOP 100 MONITOR ===================== */}
      {activeSubTab === 'monitor' && (
        <div className="space-y-6">
          {/* Niche Filter Ribbon */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                <Filter className="w-3.5 h-3.5 text-red-400" />
                <span>Filter by Niche ({TRENDING_NICHES.length} Active Categories)</span>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, hooks, creators..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500 w-48 sm:w-64"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg text-xs px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-red-500"
                >
                  <option value="velocity">Sort by: Velocity (Fastest /hr)</option>
                  <option value="views">Sort by: Total Views</option>
                  <option value="virality">Sort by: Virality Score</option>
                  <option value="rank">Sort by: Official Rank</option>
                </select>

                <button
                  onClick={() => {
                    playSoundEffect('whoosh', 0.3);
                    setLastRefreshedTime('Just now');
                  }}
                  title="Simulate Realtime Refresh"
                  className="p-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Niche Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700">
              {TRENDING_NICHES.map((niche) => {
                const isSelected = selectedNiche === niche.id;
                return (
                  <button
                    key={niche.id}
                    onClick={() => {
                      setSelectedNiche(niche.id);
                      playSoundEffect('chime', 0.2);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-sm shadow-red-950 font-bold'
                        : 'bg-zinc-950/80 hover:bg-zinc-800 text-zinc-400 border border-zinc-800/80'
                    }`}
                  >
                    {getNicheIcon(niche.id)}
                    <span>{niche.label}</span>
                    <span className="text-[10px] opacity-60 font-mono">({niche.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count Banner */}
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{filteredShorts.length}</span>
              <span>viral Shorts monitoring in real-time</span>
              {selectedNiche !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                  Niche: {selectedNiche}
                </span>
              )}
            </div>
            <div className="text-[11px] text-zinc-500">
              Refreshed: <span className="text-zinc-400 font-mono">{lastRefreshedTime}</span>
            </div>
          </div>

          {/* Top 100 Shorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredShorts.map((short) => {
              const rankColor = 
                short.rank === 1 ? 'from-amber-500 to-yellow-600 text-black' :
                short.rank === 2 ? 'from-zinc-300 to-zinc-400 text-black' :
                short.rank === 3 ? 'from-amber-700 to-orange-800 text-white' :
                'bg-zinc-800 text-zinc-300';

              return (
                <div
                  key={short.id}
                  className="bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 transition-all hover:shadow-lg hover:shadow-black/40 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Top Header: Rank, Velocity, Virality */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-xs font-mono bg-gradient-to-tr ${rankColor}`}>
                          #{short.rank}
                        </span>
                        <span className="text-xs font-bold text-zinc-300 truncate max-w-[140px] flex items-center gap-1">
                          {short.channel}
                          {short.channelVerified && (
                            <ShieldCheck className="w-3 h-3 text-cyan-400 inline" />
                          )}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 font-mono">
                          {short.uploadAge}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                          <Flame className="w-3 h-3 fill-red-400" />
                          {short.velocityPerHour}
                        </span>
                      </div>
                    </div>

                    {/* Short Title */}
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                        {short.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400 font-mono">
                        <span className="text-zinc-200 font-bold">{short.views} views</span>
                        <span>•</span>
                        <span>{short.durationSeconds}s duration</span>
                        <span>•</span>
                        <span className="text-amber-400">Score {short.viralityScore}/100</span>
                      </div>
                    </div>

                    {/* Hook Formula Pill */}
                    <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-2.5">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                        <span className="font-semibold text-zinc-300 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" />
                          Hook Formula
                        </span>
                        <span className="text-emerald-400 font-bold font-mono">
                          {short.retentionRating}% 3s Retention
                        </span>
                      </div>
                      <p className="text-xs text-amber-200/90 font-medium line-clamp-1 italic">
                        "{short.hookFormula}"
                      </p>
                    </div>

                    {/* Audio track */}
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 truncate">
                      <Music className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{short.soundTrack}</span>
                    </div>
                  </div>

                  {/* Action Buttons Deck */}
                  <div className="pt-4 mt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Remix Direct to Slicer */}
                      <button
                        onClick={() => handleRemixToSlicerDirect(short)}
                        className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm shadow-red-950/50"
                        title="Feed this video transcript directly to Transcript Slicer"
                      >
                        <Scissors className="w-3 h-3" />
                        <span>Remix to Slicer</span>
                      </button>

                      {/* Smart Hook Generator */}
                      <button
                        onClick={() => openHookGeneratorForItem(short)}
                        className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                        title="Generate 5 high-converting hook variations with AI"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Smart Hooks</span>
                      </button>

                      {/* Video Scraper & Script Cloner */}
                      <button
                        onClick={() => openScraperForItem(short)}
                        className="px-2.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                        title="Perform full scrape breakdown & original faceless script rewrite"
                      >
                        <Terminal className="w-3 h-3 text-indigo-400" />
                        <span>Scrape Copy</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setInspectShort(short)}
                      className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 rounded-lg text-xs"
                      title="Inspect full transcript & timestamps"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================== TAB 2: SMART HOOK GENERATOR ===================== */}
      {activeSubTab === 'hook-generator' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-white">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Smart Hook Generator Engine</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Engineered with Gemini 3.8 Flash to beat the ruthless 3-second drop-off curve across 5 psychological archetypes.
                </p>
              </div>

              {/* Sample Topic Fast Pre-fills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] text-zinc-500 whitespace-nowrap">Quick Pre-fill:</span>
                <button
                  onClick={() => {
                    setHookTopic('Unitree G2 Humanoid Robot Backflip World Record');
                    setHookNiche('tech-ai');
                  }}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap text-[11px]"
                >
                  Unitree Robot
                </button>
                <button
                  onClick={() => {
                    setHookTopic('Alex Hormozi 100M Pricing Rule: Why Cheap Prices Kill Gyms');
                    setHookNiche('business-wealth');
                  }}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap text-[11px]"
                >
                  Hormozi Pricing
                </button>
                <button
                  onClick={() => {
                    setHookTopic('Bugatti Tourbillon 1,800 HP V16 Engine Cold Start Sound');
                    setHookNiche('luxury-cars');
                  }}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap text-[11px]"
                >
                  Bugatti V16
                </button>
              </div>
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Video Topic, Premise, or Script Intro
                </label>
                <textarea
                  value={hookTopic}
                  onChange={(e) => setHookTopic(e.target.value)}
                  rows={2}
                  placeholder="Enter your video concept or hook to optimize..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Target Niche
                </label>
                <select
                  value={hookNiche}
                  onChange={(e) => setHookNiche(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 mb-3"
                >
                  {TRENDING_NICHES.filter(n => n.id !== 'all').map((n) => (
                    <option key={n.id} value={n.id}>{n.label}</option>
                  ))}
                </select>

                <button
                  onClick={() => handleGenerateHooks()}
                  disabled={isGeneratingHooks || !hookTopic.trim()}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingHooks ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate 5 Smart Hooks</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Hook Results */}
          {smartHookResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <span className="font-semibold text-white">
                  5 Algorithmic Archetypes Generated for "{smartHookResult.recommendedNiche}"
                </span>
                <span className="text-[11px] text-zinc-500 italic">
                  {smartHookResult.summary}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {smartHookResult.hooks.map((hook) => (
                  <div
                    key={hook.id}
                    className="bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-5 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                          #{hook.id} {hook.archetype}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {hook.wordCount} words (fast pacing)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                          {hook.predictedRetention}% Retention Score
                        </span>
                      </div>
                    </div>

                    {/* The Spoken Hook Text */}
                    <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-4">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">
                        Spoken Opening Hook Line:
                      </div>
                      <p className="text-base font-extrabold text-white leading-relaxed">
                        "{hook.hookText}"
                      </p>
                    </div>

                    {/* Breakdown & Production Blueprint */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-3">
                        <div className="text-[10px] text-zinc-400 font-semibold mb-1">🧠 Cognitive Mechanism</div>
                        <p className="text-zinc-300 text-[11px] leading-relaxed">
                          {hook.psychologicalMechanism}
                        </p>
                      </div>

                      <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-3">
                        <div className="text-[10px] text-zinc-400 font-semibold mb-1">🎨 Subtitle Animation Style</div>
                        <p className="text-amber-300 text-[11px] font-mono leading-relaxed">
                          {hook.onScreenSubtitleStyle}
                        </p>
                      </div>

                      <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-3">
                        <div className="text-[10px] text-zinc-400 font-semibold mb-1">🔊 SFX &amp; Visual Angle</div>
                        <p className="text-cyan-300 text-[11px] font-mono leading-relaxed">
                          {hook.sfxCue}
                        </p>
                        <button
                          onClick={() => playSoundEffect('whoosh', 0.5)}
                          className="mt-1 text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 underline"
                        >
                          <Volume2 className="w-3 h-3 text-cyan-400" />
                          Test SFX Cue
                        </button>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(hook.hookText, `hook-${hook.id}`)}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                        >
                          {copiedKey === `hook-${hook.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Hook</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            playSoundEffect('whoosh', 0.4);
                            onSendToSimulator(hook.hookText);
                          }}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Send to CapCut Safe-Zone</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          playSoundEffect('chime', 0.4);
                          onRemixToSlicer(
                            `[0:00 - 0:03] ${hook.hookText}\n[0:03 - 0:15] Let me explain why this changes everything you thought you knew...\n[0:15 - 0:35] The empirical facts show that 99% of people miss this.\n[0:35 - 0:42] Save this video and share it with someone who needs this breakthrough.`,
                            `${hook.archetype} Hook - ${hookTopic}`
                          );
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-indigo-950"
                      >
                        <Scissors className="w-3.5 h-3.5" />
                        <span>⚡ Remix to Slicer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== TAB 3: FULL VIDEO SCRAPER & SCRIPT CLONER ===================== */}
      {activeSubTab === 'scrape-cloner' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-white">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span>Full Video Scrape &amp; Copy Generation Power</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Reverse-engineers any viral YouTube Short’s narrative cadence and produces 100% unique, copyright-safe faceless scripts and AI B-roll prompts.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] text-zinc-500 whitespace-nowrap">Load Preset:</span>
                <button
                  onClick={() => {
                    const item = TOP_100_TRENDING_SHORTS[0];
                    setScrapeTitleInput(item.title);
                    setScrapeTranscriptInput(item.viralTranscript);
                    setScrapeNicheInput(item.niche);
                  }}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap text-[11px]"
                >
                  Trend #1 Robot
                </button>
                <button
                  onClick={() => {
                    const item = TOP_100_TRENDING_SHORTS[10];
                    setScrapeTitleInput(item.title);
                    setScrapeTranscriptInput(item.viralTranscript);
                    setScrapeNicheInput(item.niche);
                  }}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap text-[11px]"
                >
                  Trend #11 Hormozi
                </button>
                <button
                  onClick={() => {
                    const item = TOP_100_TRENDING_SHORTS[80];
                    setScrapeTitleInput(item.title);
                    setScrapeTranscriptInput(item.viralTranscript);
                    setScrapeNicheInput(item.niche);
                  }}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap text-[11px]"
                >
                  Trend #81 Bugatti
                </button>
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    YouTube URL or Source Title
                  </label>
                  <input
                    type="text"
                    value={scrapeTitleInput}
                    onChange={(e) => setScrapeTitleInput(e.target.value)}
                    placeholder="e.g. This New Humanoid Robot Just Broke The World Record"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Niche Classification
                  </label>
                  <select
                    value={scrapeNicheInput}
                    onChange={(e) => setScrapeNicheInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  >
                    {TRENDING_NICHES.filter(n => n.id !== 'all').map((n) => (
                      <option key={n.id} value={n.id}>{n.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Spoken Transcript or Narrative Premise
                </label>
                <textarea
                  value={scrapeTranscriptInput}
                  onChange={(e) => setScrapeTranscriptInput(e.target.value)}
                  rows={4}
                  placeholder="Paste video transcript with timestamps or raw text..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleScrapeAndCopy()}
                  disabled={isScraping || !scrapeTitleInput.trim()}
                  className="py-2.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-950/50 flex items-center gap-2 disabled:opacity-50"
                >
                  {isScraping ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Reverse-Engineering &amp; Rewriting...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Run Full Video Scrape &amp; Copy Generation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Scrape & Copy Results */}
          {scrapeResult && (
            <div className="space-y-6">
              {/* 1. Scraped Retention Architecture */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h3 className="text-sm font-bold text-white">
                      1. Algorithmic Reverse-Engineering Breakdown
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-zinc-400">Pacing:</span>
                    <span className="text-cyan-300 font-bold">{scrapeResult.scrapedAnalysis.estimatedPacingWpm} WPM</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">First 3 Seconds Hook Breakdown</div>
                    <p className="text-amber-200 font-semibold italic">
                      "{scrapeResult.scrapedAnalysis.hookBreakdown.spokenHook}"
                    </p>
                    <p className="text-zinc-400 text-[11px]">
                      {scrapeResult.scrapedAnalysis.hookBreakdown.psychologicalReason}
                    </p>
                  </div>

                  <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Infinite Replay Loop Architecture</div>
                    <p className="text-zinc-300 text-[11px]">
                      {scrapeResult.scrapedAnalysis.infiniteLoopMechanism}
                    </p>
                  </div>
                </div>

                {/* Narrative Spine */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-zinc-400">Retention Spine Milestones:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {scrapeResult.scrapedAnalysis.narrativeSpine.map((beat, i) => (
                      <div key={i} className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-2.5 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mb-1">
                          <span>{beat.timestamp}</span>
                          <span className="text-red-400 font-bold">{beat.beatName}</span>
                        </div>
                        <p className="text-zinc-300 text-[11px]">{beat.dopamineTrigger}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. 100% Unique Faceless Script Remix */}
              <div className="bg-zinc-900/80 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                    <h3 className="text-sm font-bold text-white">
                      2. 100% Unique Faceless Script (0% Copyright Risk)
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(scrapeResult.uniqueFacelessRemix.scriptFull, 'remix-script')}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      {copiedKey === 'remix-script' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        playSoundEffect('whoosh', 0.5);
                        onRemixToSlicer(
                          scrapeResult.uniqueFacelessRemix.scriptFull,
                          `Remix of ${scrapeResult.sourceTitle}`
                        );
                      }}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm shadow-indigo-950"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>⚡ Feed to Slicer</span>
                    </button>
                  </div>
                </div>

                {/* Title Options */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-zinc-400">High-CTR Title Alternatives (&lt;60 chars):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {scrapeResult.uniqueFacelessRemix.titleOptions.map((opt, i) => (
                      <div
                        key={i}
                        onClick={() => handleCopy(opt.title, `title-${i}`)}
                        className="p-2.5 bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 rounded-xl cursor-pointer text-xs group"
                      >
                        <div className="text-[10px] text-amber-400 font-mono mb-0.5">{opt.hookType}</div>
                        <div className="font-bold text-zinc-200 group-hover:text-white truncate">{opt.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formatted Script Body */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                  <pre className="text-xs text-zinc-200 font-mono whitespace-pre-wrap leading-relaxed">
                    {scrapeResult.uniqueFacelessRemix.scriptFull}
                  </pre>
                </div>
              </div>

              {/* 3. AI B-Roll & Visual Prompt Plan */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">
                      3. AI B-Roll &amp; Visual Generation Blueprint (Midjourney / Kling / Veo)
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">9:16 Vertical Ratio</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scrapeResult.visualBrollBlueprint.map((scene, i) => (
                    <div key={i} className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="text-cyan-400 font-bold">{scene.timeRange}</span>
                        <span>{scene.scene}</span>
                      </div>

                      <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                        <div className="text-[10px] text-zinc-500 font-semibold mb-0.5">Prompt:</div>
                        <p className="text-zinc-300 text-[11px] font-mono leading-normal">
                          {scene.aiVideoPrompt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono pt-1">
                        <span>🎥 {scene.cameraMotion}</span>
                        <span className="text-amber-400">🔊 {scene.sfxCue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. CapCut Production Guide & Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Sparkle className="w-4 h-4 text-amber-400" />
                    <span>CapCut Caption Styling &amp; Sound Rules</span>
                  </div>
                  <div className="space-y-1.5 text-zinc-300 pt-1 text-[11px]">
                    <div><span className="text-zinc-500">Font:</span> <span className="font-mono">{scrapeResult.capCutProductionGuide.fontRecommendation}</span></div>
                    <div><span className="text-zinc-500">Colors:</span> <span className="text-white font-mono">{scrapeResult.capCutProductionGuide.primaryColor}</span> with <span className="text-amber-400 font-mono">{scrapeResult.capCutProductionGuide.highlightColor}</span></div>
                    <div><span className="text-zinc-500">Animation:</span> <span className="font-mono">{scrapeResult.capCutProductionGuide.keywordAnimation}</span></div>
                    <div><span className="text-zinc-500">Safe-Zone:</span> <span className="text-zinc-400">{scrapeResult.capCutProductionGuide.safeZoneNotes}</span></div>
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>YouTube Metadata &amp; Pinned Comment</span>
                  </div>
                  <div className="space-y-1.5 text-zinc-300 pt-1 text-[11px]">
                    <div className="truncate"><span className="text-zinc-500">Title:</span> <span className="font-semibold text-white">{scrapeResult.youtubeMetadata.title}</span></div>
                    <div className="truncate"><span className="text-zinc-500">Hashtags:</span> <span className="text-indigo-400 font-mono">{scrapeResult.youtubeMetadata.hashtags.join(' ')}</span></div>
                    <div className="truncate"><span className="text-zinc-500">Pinned:</span> <span className="text-zinc-400 italic">{scrapeResult.youtubeMetadata.pinnedComment}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== INSPECT SHORT MODAL / DRAWER ===================== */}
      {inspectShort && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black font-mono text-xs">
                  #{inspectShort.rank}
                </span>
                <h3 className="text-sm font-bold text-white truncate max-w-md">
                  {inspectShort.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectShort(null)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                <div className="text-[10px] text-zinc-500">Channel</div>
                <div className="font-bold text-zinc-200">{inspectShort.channel}</div>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                <div className="text-[10px] text-zinc-500">Velocity</div>
                <div className="font-bold text-red-400 font-mono">{inspectShort.velocityPerHour}</div>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                <div className="text-[10px] text-zinc-500">Virality Score</div>
                <div className="font-bold text-amber-400 font-mono">{inspectShort.viralityScore}/100</div>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                <div className="text-[10px] text-zinc-500">Retention</div>
                <div className="font-bold text-emerald-400 font-mono">{inspectShort.retentionRating}%</div>
              </div>
            </div>

            {/* Transcript Area */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1.5">
                <span>Spoken Transcript with Timestamps:</span>
                <button
                  onClick={() => handleCopy(inspectShort.viralTranscript, 'inspect-transcript')}
                  className="text-xs text-red-400 hover:underline flex items-center gap-1"
                >
                  {copiedKey === 'inspect-transcript' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'inspect-transcript' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 max-h-56 overflow-y-auto">
                <pre className="text-xs text-zinc-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {inspectShort.viralTranscript}
                </pre>
              </div>
            </div>

            {/* Remix / Copy Advice */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs space-y-1">
              <div className="font-bold text-red-400">💡 Faceless Remix Recommendation:</div>
              <p className="text-zinc-300 text-[11px]">
                {inspectShort.remixRecommendation}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => {
                  setInspectShort(null);
                  openHookGeneratorForItem(inspectShort);
                }}
                className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold"
              >
                Generate Smart Hooks
              </button>

              <button
                onClick={() => {
                  setInspectShort(null);
                  openScraperForItem(inspectShort);
                }}
                className="px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold"
              >
                Run Scrape Copy Engine
              </button>

              <button
                onClick={() => {
                  setInspectShort(null);
                  handleRemixToSlicerDirect(inspectShort);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-950"
              >
                ⚡ Remix to Slicer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
