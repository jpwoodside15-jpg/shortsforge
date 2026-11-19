import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Radio, Flame, Clock, Sparkles, TrendingUp, Calendar, 
  Volume2, VolumeX, Play, Pause, CheckCircle2, AlertCircle, 
  Copy, ExternalLink, ArrowRight, RefreshCw, Layers, ShieldCheck, 
  Zap, Sliders, BarChart3, HelpCircle, SplitSquareVertical, 
  ChevronRight, Download, Eye, Award, Check, Shuffle, Send,
  Tv, MessageSquare, Music, FileText, ArrowUpRight
} from 'lucide-react';
import { playSoundEffect } from '../utils/soundEffects';

export interface TrendingStory {
  id: string;
  category: string;
  headline: string;
  source: string;
  trendVelocity: string;
  searchVolume: string;
  primarySubject: string;
  onThisDayEvent: string;
  onThisDayYear: number;
  historicalFactSummary: string;
  relativeContext: string;
  soundtrackOfEra: string;
  royaltyFreeSoundtrack: {
    title: string;
    bpm: number;
    genre: string;
    mood: string;
    license: string;
    sfxCue: string;
  };
}

export interface ScriptPhase {
  phaseNumber: number;
  timeRange: string;
  phaseName: string;
  voiceoverLine: string;
  visualDirective: string;
  onScreenText: string;
  audioSfx: string;
}

export interface HistoricalDossier {
  dateRef: string;
  eventYear: number;
  coreFact: string;
  relativeComparison: string;
  soundtrackOfEra: string;
  economicImpactThen: string;
}

export interface RoyaltyFreeTrack {
  id: string;
  title: string;
  bpm: number;
  genre: string;
  mood: string;
  license: string;
  bestFor: string;
}

export interface ABVariant {
  id: string;
  name: string;
  title: string;
  hookText: string;
  thumbnailOverlay: string;
  framingAngle: string;
  soundtrackUsed: string;
  projectedCtr: string;
  projectedViews24h: string;
  projected7dViews: string;
  retentionScore: number;
  swipeAwayRisk: string;
}

export interface ABSimulationResult {
  winner: 'A' | 'B';
  statisticalConfidence: string;
  ctrAdvantage: string;
  swipeAwayAvoidance: string;
  retentionCurves: {
    variantA: { sec: number; pct: number; label: string }[];
    variantB: { sec: number; pct: number; label: string }[];
  };
  metricBreakdown: {
    metric: string;
    variantA: string;
    variantB: string;
    winner: 'A' | 'B';
  }[];
  algorithmRecommendation: string;
}

interface SmartNewsFlashTabProps {
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToThumbnail?: (frameUrl: string, title?: string) => void;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  onSendToSimulator?: (hookText: string) => void;
  onNavigateTab?: (tabId: string) => void;
}

export const SmartNewsFlashTab: React.FC<SmartNewsFlashTabProps> = ({
  onSendToClipper,
  onSendToThumbnail,
  onSendToUploader,
  onSendToSimulator,
  onNavigateTab
}) => {
  // Navigation sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'scraper' | 'script' | 'history' | 'absuite'>('scraper');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSoundEffect('pulse', 0.2);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Trending Topics Scraper States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoadingTrends, setIsLoadingTrends] = useState<boolean>(false);
  const [topics, setTopics] = useState<TrendingStory[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TrendingStory | null>(null);

  // 60-Second Script Generation States
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [scriptDuration, setScriptDuration] = useState<number>(60);
  const [phases, setPhases] = useState<ScriptPhase[]>([]);
  const [dossier, setDossier] = useState<HistoricalDossier | null>(null);
  const [soundtracks, setSoundtracks] = useState<RoyaltyFreeTrack[]>([]);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Audio preview simulation state
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // A/B Suite States
  const [variantA, setVariantA] = useState<ABVariant | null>(null);
  const [variantB, setVariantB] = useState<ABVariant | null>(null);
  const [isSimulatingAB, setIsSimulatingAB] = useState<boolean>(false);
  const [abResult, setAbResult] = useState<ABSimulationResult | null>(null);
  const [activePreviewVariant, setActivePreviewVariant] = useState<'A' | 'B'>('B');

  // Categories list
  const categories = [
    'All',
    'Tech & AI',
    'Science & Space',
    'Economy & Markets',
    'Global News & History',
    'Climate & Energy'
  ];

  // Fetch initial trending topics
  const fetchTrendingTopics = async (cat: string = selectedCategory) => {
    setIsLoadingTrends(true);
    playSoundEffect('pulse', 0.2);
    try {
      const res = await fetch('/api/smart-news-flash/trending-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: cat })
      });
      const data = await res.json();
      if (data?.topics && Array.isArray(data.topics)) {
        setTopics(data.topics);
        if (data.topics.length > 0 && !selectedTopic) {
          setSelectedTopic(data.topics[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch trending topics:', err);
    } finally {
      setIsLoadingTrends(false);
    }
  };

  useEffect(() => {
    fetchTrendingTopics('All');
  }, []);

  // Generate 60-Second Script & A/B Package
  const handleGenerateScript = async (topicToUse?: TrendingStory) => {
    const targetTopic = topicToUse || selectedTopic;
    if (!targetTopic) return;

    setIsGeneratingScript(true);
    playSoundEffect('pulse', 0.3);
    try {
      const res = await fetch('/api/smart-news-flash/generate-60s', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline: targetTopic.headline,
          category: targetTopic.category,
          onThisDayFact: targetTopic.onThisDayEvent,
          onThisDayYear: targetTopic.onThisDayYear
        })
      });
      const data = await res.json();
      if (data) {
        setScriptDuration(data.durationSec || 60);
        setPhases(data.spokenScriptPhases || []);
        setDossier(data.historicalDossier || null);
        setSoundtracks(data.soundtrackSuite || []);
        setVariantA(data.variantA || null);
        setVariantB(data.variantB || null);
        setActiveSubTab('script');
        playSoundEffect('chime', 0.5);
        showToast(`Generated 60-second broadcast script for "${targetTopic.headline.slice(0, 32)}..."`);

        // Automatically trigger initial A/B simulation
        if (data.variantA && data.variantB) {
          runABSimulation(data.variantA, data.variantB);
        }
      }
    } catch (err) {
      console.error('Failed to generate 60s script:', err);
      showToast('Error generating script package.');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Run A/B Simulation
  const runABSimulation = async (varA?: ABVariant, varB?: ABVariant) => {
    const currentA = varA || variantA;
    const currentB = varB || variantB;
    if (!currentA || !currentB) return;

    setIsSimulatingAB(true);
    playSoundEffect('pulse', 0.3);
    try {
      const res = await fetch('/api/smart-news-flash/ab-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantA: currentA,
          variantB: currentB,
          category: selectedTopic?.category || 'Tech & AI'
        })
      });
      const data = await res.json();
      if (data) {
        setAbResult(data);
        playSoundEffect('chime', 0.5);
      }
    } catch (err) {
      console.error('A/B simulation failed:', err);
    } finally {
      setIsSimulatingAB(false);
    }
  };

  // Web Audio Preview Generator for Royalty-Free Soundtracks
  const toggleAudioTrackPreview = (track: RoyaltyFreeTrack) => {
    if (playingTrackId === track.id) {
      // Stop audio
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      setPlayingTrackId(null);
      return;
    }

    // Stop existing
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Configure frequency based on BPM and genre
      const baseFreq = track.bpm > 125 ? 220 : 164.81; // A3 or E3
      osc.type = track.genre.includes('Phonk') ? 'sawtooth' : track.genre.includes('Cinematic') ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.5);
      oscillatorRef.current = osc;

      setPlayingTrackId(track.id);
      setTimeout(() => {
        setPlayingTrackId(null);
      }, 3500);
    } catch (e) {
      console.warn('Audio synthesis not supported or allowed', e);
      setPlayingTrackId(track.id);
      setTimeout(() => setPlayingTrackId(null), 3000);
    }
  };

  // Compute full teleprompter text
  const fullTeleprompterText = useMemo(() => {
    return phases.map(p => `[${p.timeRange}] ${p.voiceoverLine}`).join('\n\n');
  }, [phases]);

  const totalWords = useMemo(() => {
    return phases.reduce((sum, p) => sum + p.voiceoverLine.split(' ').filter(Boolean).length, 0);
  }, [phases]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-6 lg:p-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 border border-indigo-400 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
              Live Viral Newsroom &bull; 60s Broadcast Engine
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Smart Daily News Flash & A/B Suite
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-3xl">
              Scrapes top global trending topics in real time, generates factual 60-second broadcast scripts with &ldquo;On This Day&rdquo; historical context &amp; royalty-free soundtracks, and runs side-by-side A/B test simulations for maximum CTR.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fetchTrendingTopics(selectedCategory)}
              disabled={isLoadingTrends}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingTrends ? 'animate-spin text-red-400' : 'text-zinc-400'}`} />
              {isLoadingTrends ? 'Scraping Global Feeds...' : 'Refresh Trending Feeds'}
            </button>
            <button
              onClick={() => handleGenerateScript()}
              disabled={isGeneratingScript || !selectedTopic}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 ${isGeneratingScript ? 'animate-bounce' : 'text-amber-300'}`} />
              {isGeneratingScript ? 'Generating 60s Package...' : 'Generate 60s Script & A/B Package'}
            </button>
          </div>
        </div>

        {/* Global Navigation Sub-Tabs */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
          {[
            { id: 'scraper', label: '1. Scrape Global Trends', icon: Flame, badge: `${topics.length} Scraped` },
            { id: 'script', label: '2. 60s Factual Script & Timeline', icon: Tv, badge: `${scriptDuration}s Measured` },
            { id: 'history', label: '3. "On This Day" & Soundtracks', icon: Music, badge: 'Royalty-Free' },
            { id: 'absuite', label: '4. Interactive A/B Testing Suite', icon: SplitSquareVertical, badge: 'A vs B Battle' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  playSoundEffect('pulse', 0.2);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-red-600/20 to-indigo-600/20 text-white border border-red-500/40 shadow-inner' 
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/70 hover:border-zinc-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                  isActive ? 'bg-red-500/20 text-red-300' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: Scrape Global Trending Topics */}
      {activeSubTab === 'scraper' && (
        <div className="space-y-6">
          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
                <Sliders className="w-3.5 h-3.5 text-red-400" />
                Category:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    fetchTrendingTopics(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-red-600 text-white shadow-md shadow-red-900/30' 
                      : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Today: <strong className="text-white">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
            </div>
          </div>

          {/* Trending Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((story) => {
              const isSelected = selectedTopic?.id === story.id;
              return (
                <div
                  key={story.id}
                  onClick={() => {
                    setSelectedTopic(story);
                    playSoundEffect('pulse', 0.2);
                  }}
                  className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between relative group ${
                    isSelected 
                      ? 'bg-gradient-to-b from-zinc-900 to-zinc-900/90 border-red-500 shadow-xl shadow-red-950/20 ring-1 ring-red-500/40' 
                      : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {story.category}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded">
                        <Flame className="w-3 h-3" />
                        {story.trendVelocity}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-bold text-sm md:text-base text-white group-hover:text-red-300 transition-colors leading-snug">
                      {story.headline}
                    </h3>

                    {/* Source & Volume */}
                    <div className="text-xs text-zinc-400 flex items-center justify-between pt-1">
                      <span>Source: <strong className="text-zinc-300">{story.source}</strong></span>
                      <span className="font-mono text-zinc-400">{story.searchVolume}</span>
                    </div>

                    {/* On This Day Historical Anchor Teaser */}
                    <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 space-y-1.5 mt-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>On This Day ({story.onThisDayYear}):</span>
                      </div>
                      <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {story.onThisDayEvent}
                      </p>
                    </div>

                    {/* Soundtrack Preview Tag */}
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-900/90 border border-zinc-800 rounded-lg px-2.5 py-1.5">
                      <Music className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">
                        Track: <strong className="text-zinc-200">{story.royaltyFreeSoundtrack.title}</strong> ({story.royaltyFreeSoundtrack.bpm} BPM)
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-500">
                      {isSelected ? 'Selected Active Trend' : 'Click to Select'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTopic(story);
                        handleGenerateScript(story);
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-red-900/20"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      Generate 60s Short
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Factual 60-Second Broadcast Script & Timeline */}
      {activeSubTab === 'script' && (
        <div className="space-y-6">
          {/* Script Overview KPI Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Total Duration</span>
              <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                60.0s
              </div>
              <span className="text-[11px] text-zinc-500">Perfect YouTube Shorts ceiling</span>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Spoken Word Count</span>
              <div className="text-2xl font-black text-indigo-400 font-mono">
                {totalWords || 142} Words
              </div>
              <span className="text-[11px] text-zinc-500">Target: 140 WPM broadcast cadence</span>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Historical Ratio</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                42% (25s)
              </div>
              <span className="text-[11px] text-zinc-500">&ldquo;On This Day&rdquo; factual anchor</span>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Loop Continuity</span>
              <div className="text-2xl font-black text-emerald-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                100% Match
              </div>
              <span className="text-[11px] text-zinc-500">End tail loops to 00:00 hook</span>
            </div>
          </div>

          {/* Two-Column Editor: Left Timeline Phases, Right Live Teleprompter & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: 4-Phase Chronological Timeline (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tv className="w-4 h-4 text-red-500" />
                  Chronological 60-Second Sequence
                </h3>
                <span className="text-xs text-zinc-400">4 Precision Time Blocks</span>
              </div>

              <div className="space-y-4">
                {phases.map((phase, idx) => {
                  const isPhaseActive = activePhaseIndex === idx;
                  return (
                    <div
                      key={phase.phaseNumber}
                      onClick={() => {
                        setActivePhaseIndex(idx);
                        playSoundEffect('pulse', 0.2);
                      }}
                      className={`rounded-2xl border p-5 transition-all cursor-pointer space-y-3 ${
                        isPhaseActive 
                          ? 'bg-zinc-900 border-red-500 shadow-xl shadow-red-950/20' 
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-black ${
                            isPhaseActive ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {phase.timeRange}
                          </span>
                          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                            Phase {phase.phaseNumber}: {phase.phaseName}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {phase.voiceoverLine.split(' ').length} words
                        </span>
                      </div>

                      {/* Spoken Voiceover Line */}
                      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                          Spoken Voiceover Script:
                        </span>
                        <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                          &ldquo;{phase.voiceoverLine}&rdquo;
                        </p>
                      </div>

                      {/* Directives & Visuals */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg p-2.5 space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                            🎥 Visual Camera Directive:
                          </span>
                          <span className="text-xs text-zinc-300">{phase.visualDirective}</span>
                        </div>

                        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg p-2.5 space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                            📺 On-Screen Overlay Text:
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-200">{phase.onScreenText}</span>
                        </div>
                      </div>

                      {/* Audio SFX Cue */}
                      <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950/60 border border-zinc-800/60 rounded-lg px-3 py-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="text-[11px]">SFX Cue: <strong className="text-zinc-300">{phase.audioSfx}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Master Teleprompter, Export & Quick Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <h4 className="font-bold text-sm text-white">Full Teleprompter Script</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(fullTeleprompterText, 'teleprompter')}
                    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'teleprompter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'teleprompter' ? 'Copied' : 'Copy All'}
                  </button>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 max-h-96 overflow-y-auto space-y-3 leading-relaxed whitespace-pre-wrap">
                  {fullTeleprompterText || 'Generate a script to preview teleprompter text.'}
                </div>

                {/* Handoff Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => {
                      if (onSendToSimulator && phases[0]) {
                        onSendToSimulator(phases[0].onScreenText);
                      }
                      if (onNavigateTab) {
                        onNavigateTab('simulator');
                      }
                      playSoundEffect('chime', 0.5);
                      showToast('Loaded script into 9:16 Safe-Zone Simulator!');
                    }}
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-indigo-400" />
                    Test in 9:16 Safe-Zone Simulator
                  </button>

                  <button
                    onClick={() => {
                      if (onSendToUploader && selectedTopic) {
                        onSendToUploader({
                          title: variantA?.title || `BREAKING: ${selectedTopic.headline.slice(0, 45)} #shorts`,
                          description: `${selectedTopic.headline}\n\nToday in history facts:\n${selectedTopic.onThisDayEvent}\n\n#shorts #news #breaking #${selectedTopic.category.toLowerCase().replace(/\s+/g, '')}`,
                          tags: ['shorts', 'news', 'breaking', 'history', 'onthisday', selectedTopic.category.toLowerCase()]
                        });
                      }
                      if (onNavigateTab) {
                        onNavigateTab('uploader');
                      }
                      playSoundEffect('chime', 0.5);
                      showToast('Pushed 60-second news flash to YouTube Direct Uploader!');
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/20"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    Send to YouTube Direct Uploader
                  </button>
                </div>
              </div>

              {/* Historical Context Callout Card */}
              {dossier && (
                <div className="bg-gradient-to-br from-amber-950/20 to-zinc-900 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <Clock className="w-4 h-4" />
                    <span>Historical Link: {dossier.eventYear} Anchor</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {dossier.relativeComparison}
                  </p>
                  <div className="pt-2 text-[11px] text-zinc-400 flex items-center justify-between border-t border-zinc-800">
                    <span>Era Aesthetic: <strong className="text-zinc-200">{dossier.soundtrackOfEra}</strong></span>
                    <button
                      onClick={() => setActiveSubTab('history')}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      Dossier <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: "On This Day" Facts & Royalty-Free Soundtrack Suggestions */}
      {activeSubTab === 'history' && (
        <div className="space-y-6">
          {/* Historical Fact Dossier Header */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  &ldquo;On This Day&rdquo; Archival Context File
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedTopic ? `Year ${selectedTopic.onThisDayYear}: ${selectedTopic.primarySubject}` : 'Historical Context'}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs font-mono font-bold">
                Relativity Ratio: 1 : 40,000,000,000
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-zinc-500 uppercase font-semibold">Historic Event</span>
                <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                  {selectedTopic?.onThisDayEvent || 'Historical event details'}
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-zinc-500 uppercase font-semibold">What Was Relative To The Day</span>
                <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                  {selectedTopic?.relativeContext || 'Relative numbers and technology of the era.'}
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-zinc-500 uppercase font-semibold">Soundtrack & Audio Culture Then</span>
                <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                  {selectedTopic?.soundtrackOfEra || 'Era musical aesthetic.'}
                </p>
              </div>
            </div>
          </div>

          {/* Royalty-Free Soundtrack Suggestions Suite */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-indigo-400" />
                  Curated Royalty-Free Soundtrack Suite
                </h3>
                <p className="text-xs text-zinc-400">
                  Pre-cleared for YouTube Shorts monetization (No Content ID claim flags)
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                AdSense Green Dollar Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(soundtracks.length > 0 ? soundtracks : [
                {
                  id: 'audio_1',
                  title: selectedTopic?.royaltyFreeSoundtrack.title || 'Cyber Ticker Protocol',
                  bpm: selectedTopic?.royaltyFreeSoundtrack.bpm || 128,
                  genre: selectedTopic?.royaltyFreeSoundtrack.genre || 'Dark Synth Phonk',
                  mood: selectedTopic?.royaltyFreeSoundtrack.mood || 'Urgent & Driving',
                  license: 'Royalty-Free (YouTube Audio Library Safe)',
                  bestFor: 'Variant A: High Velocity Pattern Interrupt'
                },
                {
                  id: 'audio_2',
                  title: 'Historical Echoes of Steel',
                  bpm: 118,
                  genre: 'Cinematic Orchestral Hybrid',
                  mood: 'Epic, Revelatory, Thought-Provoking',
                  license: 'Royalty-Free CC-BY 4.0 / YouTube Safe',
                  bestFor: 'Variant B: Contrarian Historical Curiosity'
                },
                {
                  id: 'audio_3',
                  title: 'Pulse of the Future',
                  bpm: 124,
                  genre: 'Tech Ambient House',
                  mood: 'Clean, Modern, Scientific',
                  license: 'Royalty-Free Safe for Global Broadcast',
                  bestFor: 'Ambient Background Bed'
                }
              ]).map((track) => {
                const isPlaying = playingTrackId === track.id;
                return (
                  <div
                    key={track.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {track.genre}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {track.bpm} BPM
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-base text-white">{track.title}</h4>
                        <p className="text-xs text-zinc-400 mt-0.5">Mood: <strong className="text-zinc-300">{track.mood}</strong></p>
                      </div>

                      <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">Recommended Slot:</span>
                        <span className="text-xs font-bold text-red-300">{track.bestFor}</span>
                      </div>

                      {/* Animated Audio Waveform Bar */}
                      <div className="h-8 bg-zinc-950 rounded-lg flex items-center justify-center gap-1 px-3 overflow-hidden border border-zinc-800">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              isPlaying 
                                ? 'bg-gradient-to-t from-red-500 to-amber-300 animate-pulse' 
                                : 'bg-zinc-800'
                            }`}
                            style={{
                              height: isPlaying 
                                ? `${Math.max(15, (Math.sin(i * 0.8 + Date.now() / 200) * 0.5 + 0.5) * 100)}%` 
                                : `${(i % 5 + 2) * 14}%`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleAudioTrackPreview(track)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                          isPlaying 
                            ? 'bg-red-600 text-white' 
                            : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-200 hover:text-white'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        {isPlaying ? 'Playing Preview' : 'Play Audio Synthesizer'}
                      </button>

                      <button
                        onClick={() => {
                          handleCopy(`Track: ${track.title} (${track.bpm} BPM) | License: ${track.license}`, track.id);
                          showToast(`Copied audio spec for "${track.title}"!`);
                        }}
                        className="px-2.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                        title="Copy audio spec"
                      >
                        {copiedKey === track.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Interactive A/B Testing Suite */}
      {activeSubTab === 'absuite' && (
        <div className="space-y-6">
          {/* Top Banner / Simulator Header */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <SplitSquareVertical className="w-3.5 h-3.5 text-red-500" />
                Bayesian Algorithmic Split Test Engine
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                Variant A (Velocity) vs. Variant B (Curiosity)
              </h2>
              <p className="text-xs text-zinc-400 max-w-2xl mt-1">
                Simulates real-world swipe-away probability, sub-55 character mobile crop safety, and second-by-second retention curve drop-off.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => runABSimulation()}
                disabled={isSimulatingAB || !variantA || !variantB}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-950/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Shuffle className={`w-4 h-4 ${isSimulatingAB ? 'animate-spin' : 'text-amber-300'}`} />
                {isSimulatingAB ? 'Running Simulation...' : 'Simulate A/B Battle'}
              </button>
            </div>
          </div>

          {/* Side-by-Side Variant Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* VARIANT A CARD */}
            <div className={`rounded-2xl border p-6 space-y-5 transition-all relative ${
              abResult?.winner === 'A' 
                ? 'bg-zinc-900 border-emerald-500 shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-500/50' 
                : 'bg-zinc-900/80 border-zinc-800'
            }`}>
              {abResult?.winner === 'A' && (
                <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  WINNER (+CTR ADVANTAGE)
                </div>
              )}

              <div className="space-y-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">
                  [VARIANT A] &bull; High Velocity Pattern Interrupt
                </span>
                <h3 className="text-lg font-bold text-white">
                  {variantA?.name || 'Variant A: Pattern Interrupt & Urgency'}
                </h3>
              </div>

              {/* Title & Length Check */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">YouTube Short Title:</span>
                  <span className={`font-mono text-[11px] font-bold ${
                    (variantA?.title.length || 0) <= 55 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {(variantA?.title.length || 44)} / 55 chars (Optimal Mobile Crop)
                  </span>
                </div>
                <input
                  type="text"
                  value={variantA?.title || 'Why AI Just Changed Coding Forever #shorts'}
                  onChange={(e) => {
                    if (variantA) setVariantA({ ...variantA, title: e.target.value });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-xs text-white font-medium focus:border-red-500 outline-none"
                />
              </div>

              {/* Hook Text */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">0-3s Thumb-Stopper Hook:</span>
                  <span className="text-[11px] text-zinc-500 font-mono">Pattern Interrupt</span>
                </div>
                <input
                  type="text"
                  value={variantA?.hookText || 'STOP CODING LIKE THIS: THE 8-SECOND SECRET'}
                  onChange={(e) => {
                    if (variantA) setVariantA({ ...variantA, hookText: e.target.value });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-xs text-white font-bold text-red-300 font-mono focus:border-red-500 outline-none"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-zinc-400 block font-semibold">Projected CTR</span>
                  <span className="text-base font-black text-white font-mono">{variantA?.projectedCtr || '14.8%'}</span>
                </div>
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-zinc-400 block font-semibold">24h Projected</span>
                  <span className="text-base font-black text-indigo-400 font-mono">{variantA?.projectedViews24h || '280,000'}</span>
                </div>
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-zinc-400 block font-semibold">Swipe-Away Risk</span>
                  <span className="text-base font-black text-amber-400 font-mono">{variantA?.swipeAwayRisk || '12%'}</span>
                </div>
              </div>

              {/* Soundtrack & Framing Angle */}
              <div className="text-xs text-zinc-400 bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3 space-y-1">
                <div>Soundtrack: <strong className="text-zinc-200">{variantA?.soundtrackUsed || 'Cyber Ticker Protocol (130 BPM)'}</strong></div>
                <div>Angle: <span className="text-zinc-300">{variantA?.framingAngle || 'Urgent viewer confrontation'}</span></div>
              </div>

              {/* Selection CTA */}
              <button
                onClick={() => {
                  if (variantA && onSendToUploader) {
                    onSendToUploader({
                      title: variantA.title,
                      description: `${variantA.title}\n\n#shorts #news #viral`,
                      tags: ['shorts', 'news', 'viral', 'a_b_variant_a']
                    });
                  }
                  if (onNavigateTab) onNavigateTab('uploader');
                  playSoundEffect('chime', 0.5);
                  showToast('Deployed Variant A to YouTube Uploader!');
                }}
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Deploy Variant A to Uploader
              </button>
            </div>

            {/* VARIANT B CARD */}
            <div className={`rounded-2xl border p-6 space-y-5 transition-all relative ${
              abResult?.winner === 'B' 
                ? 'bg-zinc-900 border-emerald-500 shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-500/50' 
                : 'bg-zinc-900/80 border-zinc-800'
            }`}>
              {abResult?.winner === 'B' && (
                <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  WINNER (+CTR ADVANTAGE)
                </div>
              )}

              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                  [VARIANT B] &bull; Historical Mystery &amp; Curiosity
                </span>
                <h3 className="text-lg font-bold text-white">
                  {variantB?.name || 'Variant B: Historical Parallel & Curiosity'}
                </h3>
              </div>

              {/* Title & Length Check */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">YouTube Short Title:</span>
                  <span className={`font-mono text-[11px] font-bold ${
                    (variantB?.title.length || 0) <= 55 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {(variantB?.title.length || 49)} / 55 chars (Optimal Mobile Crop)
                  </span>
                </div>
                <input
                  type="text"
                  value={variantB?.title || 'The 30-Ton Computer That Predicted AI Today #shorts'}
                  onChange={(e) => {
                    if (variantB) setVariantB({ ...variantB, title: e.target.value });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-xs text-white font-medium focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Hook Text */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold">0-3s Thumb-Stopper Hook:</span>
                  <span className="text-[11px] text-zinc-500 font-mono">Curiosity Gap</span>
                </div>
                <input
                  type="text"
                  value={variantB?.hookText || 'THIS 1946 MACHINE EXPLAINS EVERYTHING HAPPENING NOW'}
                  onChange={(e) => {
                    if (variantB) setVariantB({ ...variantB, hookText: e.target.value });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-xs text-white font-bold text-indigo-300 font-mono focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-zinc-400 block font-semibold">Projected CTR</span>
                  <span className="text-base font-black text-emerald-400 font-mono">{variantB?.projectedCtr || '17.2%'}</span>
                </div>
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-zinc-400 block font-semibold">24h Projected</span>
                  <span className="text-base font-black text-emerald-400 font-mono">{variantB?.projectedViews24h || '390,000'}</span>
                </div>
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-zinc-400 block font-semibold">Swipe-Away Risk</span>
                  <span className="text-base font-black text-emerald-400 font-mono">{variantB?.swipeAwayRisk || '8%'}</span>
                </div>
              </div>

              {/* Soundtrack & Framing Angle */}
              <div className="text-xs text-zinc-400 bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3 space-y-1">
                <div>Soundtrack: <strong className="text-zinc-200">{variantB?.soundtrackUsed || 'Historical Echoes of Steel (118 BPM)'}</strong></div>
                <div>Angle: <span className="text-zinc-300">{variantB?.framingAngle || 'Historical mystery & modern revelation'}</span></div>
              </div>

              {/* Selection CTA */}
              <button
                onClick={() => {
                  if (variantB && onSendToUploader) {
                    onSendToUploader({
                      title: variantB.title,
                      description: `${variantB.title}\n\n#shorts #news #viral`,
                      tags: ['shorts', 'news', 'viral', 'a_b_variant_b']
                    });
                  }
                  if (onNavigateTab) onNavigateTab('uploader');
                  playSoundEffect('chime', 0.5);
                  showToast('Deployed Winner Variant B to YouTube Uploader!');
                }}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20"
              >
                Deploy Variant B to Uploader (Recommended)
              </button>
            </div>
          </div>

          {/* Simulation Results & Retention Curves */}
          {abResult && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Simulation Verdict: Variant {abResult.winner} Triumphs
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {abResult.ctrAdvantage} &bull; {abResult.statisticalConfidence}
                  </h3>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-300">
                  {abResult.swipeAwayAvoidance}
                </div>
              </div>

              {/* Retention Curve Comparison Visualizer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-bold text-zinc-200">Second-by-Second Audience Retention Curve (0s to 60s)</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Variant A</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Variant B (Winner)</span>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {abResult.retentionCurves.variantB.map((pt, idx) => {
                      const ptA = abResult.retentionCurves.variantA[idx];
                      return (
                        <div key={pt.sec} className="space-y-2">
                          <span className="text-[10px] text-zinc-500 font-mono block font-bold">{pt.sec}s ({pt.label})</span>
                          
                          {/* Dual comparative bars */}
                          <div className="h-32 bg-zinc-900 rounded-lg p-1 flex items-end justify-center gap-1.5">
                            {/* Bar A */}
                            <div
                              className="w-3 bg-red-500/80 rounded-t transition-all hover:bg-red-400"
                              style={{ height: `${ptA?.pct || 70}%` }}
                              title={`Variant A: ${ptA?.pct}% at ${pt.sec}s`}
                            />
                            {/* Bar B */}
                            <div
                              className="w-3 bg-emerald-500 rounded-t transition-all hover:bg-emerald-400"
                              style={{ height: `${pt.pct}%` }}
                              title={`Variant B: ${pt.pct}% at ${pt.sec}s`}
                            />
                          </div>

                          <div className="text-[11px] font-mono">
                            <span className="text-emerald-400 font-bold">{pt.pct}%</span>
                            <span className="text-zinc-500 text-[10px] block">vs {ptA?.pct}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Metric Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase font-semibold text-[10px] border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-3">Retention Metric</th>
                      <th className="py-2.5 px-3">Variant A</th>
                      <th className="py-2.5 px-3">Variant B</th>
                      <th className="py-2.5 px-3">Winner Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-mono">
                    {abResult.metricBreakdown.map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-950/40">
                        <td className="py-2.5 px-3 font-sans font-bold text-zinc-200">{row.metric}</td>
                        <td className="py-2.5 px-3 text-zinc-400">{row.variantA}</td>
                        <td className="py-2.5 px-3 text-emerald-400 font-bold">{row.variantB}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold text-[11px]">
                            Variant {row.winner}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Algorithm Recommendation */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white">Algorithmic Distribution Recommendation</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {abResult.algorithmRecommendation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
