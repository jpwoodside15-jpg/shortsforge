import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, Sparkles, CheckSquare, Clock, Volume2, 
  Layers, ShieldAlert, Sliders, Type, Download, Copy, Check,
  Gamepad2, Play, Pause, AlertCircle, TrendingUp, Zap,
  ExternalLink, RefreshCw, Eye, Smartphone, FileText,
  ChevronRight, Brain, Film, Flame, Shield, ArrowRight,
  Music, Radio, Wand2
} from 'lucide-react';
import { CapCutSafeZoneSimulator } from './CapCutSafeZoneSimulator';
import { SonicImpactLibrary } from './SonicImpactLibrary';
import { AiVideoStudioPreview } from './AiVideoStudioPreview';
import { 
  DirectorGuide, 
  SentimentCaptionSegment, 
  GameplayRecommendation, 
  FreeAiVideoTool, 
  AiVideoPromptPackage, 
  FreeAiVideoAdvisorResult,
  TimelineTrackItem
} from '../types';

interface CapCutDirectorTabProps {
  currentSubtitlePreview?: string;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
}

const PRESET_STORIES = [
  {
    id: 'hormozi',
    name: 'Alex Hormozi ($100M Pricing)',
    tag: 'Business & Psychology',
    transcript: "The single biggest lie about making money is that lowering your prices gets you more customers. The top 1% double it and multiply the value.",
    initialTension: 9
  },
  {
    id: 'huberman',
    name: 'Andrew Huberman (Dopamine Spike)',
    tag: 'Neuroscience',
    transcript: "Dopamine is not about pleasure, it is about the anticipation of reward. When you spike dopamine with cheap scrolling, you deplete your motivation baseline.",
    initialTension: 8
  },
  {
    id: 'goggins',
    name: 'David Goggins (40% Mind Rule)',
    tag: 'Mental Toughness',
    transcript: "Most people quit when they are only at 40% of their actual capability. The governor in your mind is lying to protect you from discomfort.",
    initialTension: 9
  },
  {
    id: 'reddit',
    name: 'Reddit Storytime (Viral Hook)',
    tag: 'Suspense & Narrative',
    transcript: "I found an old USB drive hidden inside my grandfather's antique grandfather clock. When I plugged it into my laptop, my entire world turned upside down.",
    initialTension: 10
  },
  {
    id: 'ai-automation',
    name: 'AI Productivity (High CPM)',
    tag: 'Tech / SaaS',
    transcript: "Stop spending 6 hours editing video. This free automated script crops 9:16 vertical shorts and generates viral captions in under 15 seconds.",
    initialTension: 8
  }
];

const DEFAULT_SEGMENTS: SentimentCaptionSegment[] = [
  {
    id: 1,
    text: "THE SINGLE BIGGEST LIE",
    sentiment: "urgent",
    colorHex: "#FF0038",
    emotionLabel: "Belief Violation / High-Tension Hook",
    startSec: 0.0,
    endSec: 1.8,
    highlightWord: "LIE",
    animation: "Pop Up (0.2s)",
    tensionLevel: 9,
    psychologyReason: "Violates viewer expectation immediately. Red text signals biological danger, locking thumb in place."
  },
  {
    id: 2,
    text: "ABOUT MAKING MONEY",
    sentiment: "curiosity",
    colorHex: "#FFE600",
    emotionLabel: "Curiosity Gap / Value Promise",
    startSec: 1.8,
    endSec: 3.5,
    highlightWord: "MONEY",
    animation: "Bounce In (0.2s)",
    tensionLevel: 7,
    psychologyReason: "Electric yellow has highest contrast against dark video backdrops. Opens cognitive gap."
  },
  {
    id: 3,
    text: "IS THAT LOWERING PRICES",
    sentiment: "urgent",
    colorHex: "#FF0038",
    emotionLabel: "Costly Mistake / Pain Trigger",
    startSec: 3.5,
    endSec: 5.2,
    highlightWord: "PRICES",
    animation: "Pop Up (0.2s)",
    tensionLevel: 8,
    psychologyReason: "Triggers loss aversion. People care 2.5x more about avoiding financial mistakes than making gains."
  },
  {
    id: 4,
    text: "GETS YOU MORE CUSTOMERS",
    sentiment: "neutral",
    colorHex: "#FFFFFF",
    emotionLabel: "Common Assumption / Context",
    startSec: 5.2,
    endSec: 7.0,
    highlightWord: "CUSTOMERS",
    animation: "Standard Fade",
    tensionLevel: 4,
    psychologyReason: "Neutral white allows the eye to reset before the upcoming explosive contrarian punchline."
  },
  {
    id: 5,
    text: "THE TOP 1% DOUBLE IT",
    sentiment: "growth",
    colorHex: "#00E676",
    emotionLabel: "Mastery & Positive Dopamine Payoff",
    startSec: 7.0,
    endSec: 9.0,
    highlightWord: "DOUBLE",
    animation: "Pop Up (0.2s)",
    tensionLevel: 3,
    psychologyReason: "Vibrant emerald green rewards the brain with relief and feelings of victory, boosting like rate."
  },
  {
    id: 6,
    text: "AND MULTIPLY THE VALUE",
    sentiment: "authority",
    colorHex: "#00F0FF",
    emotionLabel: "Strategic Rule & Scientific Proof",
    startSec: 9.0,
    endSec: 11.2,
    highlightWord: "VALUE",
    animation: "Word-by-Word",
    tensionLevel: 5,
    psychologyReason: "Cyber cyan blue conveys cold intellectual authority and high status, driving channel subscriptions."
  }
];

const DEFAULT_TIMELINE_SFX: TimelineTrackItem[] = [
  {
    id: 'sfx-default-1',
    sfxId: 'sfx-braam-trailer',
    name: 'Trailer Braam Impact',
    category: 'cinematic-hit',
    timestampSec: 0.0,
    volume: 90,
    durationSec: 1.2,
    linkedSegmentId: 1
  },
  {
    id: 'sfx-default-2',
    sfxId: 'sfx-pop-dopamine',
    name: 'Dopamine Bubble Pop',
    category: 'pop',
    timestampSec: 1.8,
    volume: 85,
    durationSec: 0.12,
    linkedSegmentId: 2
  },
  {
    id: 'sfx-default-3',
    sfxId: 'sfx-whoosh-fast',
    name: 'Hyper-Fast Air Whoosh',
    category: 'whoosh',
    timestampSec: 5.2,
    volume: 80,
    durationSec: 0.45,
    linkedSegmentId: 4
  },
  {
    id: 'sfx-default-4',
    sfxId: 'sfx-cash-chime',
    name: 'Golden Cash Register Ding',
    category: 'dopamine-cash',
    timestampSec: 9.0,
    volume: 85,
    durationSec: 0.9,
    linkedSegmentId: 6
  }
];

export const CapCutDirectorTab: React.FC<CapCutDirectorTabProps> = ({ 
  currentSubtitlePreview = "THE NUMBER ONE LIE ABOUT MONEY",
  onSendToUploader
}) => {
  // Topic and Guides state
  const [topic, setTopic] = useState('Personal Finance & Side Hustles');
  const [isLoadingGuide, setIsLoadingGuide] = useState(false);
  const [guide, setGuide] = useState<DirectorGuide | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1. Sentiment Storytelling State
  const [transcriptInput, setTranscriptInput] = useState(
    "The single biggest lie about making money is that lowering your prices gets you more customers. The top 1% double it and multiply the value."
  );
  const [isAnalyzingSentiment, setIsAnalyzingSentiment] = useState(false);
  const [segments, setSegments] = useState<SentimentCaptionSegment[]>(DEFAULT_SEGMENTS);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [sentimentSummary, setSentimentSummary] = useState(
    "Emotional cadence starts with sharp crimson warning, transitions through contrast tension, and resolves into high-dopamine emerald growth."
  );

  // 2. Sonic Impact Timeline State & Ref
  const [timelineSfx, setTimelineSfx] = useState<TimelineTrackItem[]>(DEFAULT_TIMELINE_SFX);
  const sonicSectionRef = useRef<HTMLDivElement | null>(null);

  const handleInsertTimelineSfx = (item: TimelineTrackItem) => {
    setTimelineSfx(prev => [...prev, item].sort((a, b) => a.timestampSec - b.timestampSec));
  };

  const handleRemoveTimelineSfx = (id: string) => {
    setTimelineSfx(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateSfxVolume = (id: string, vol: number) => {
    setTimelineSfx(prev => prev.map(item => item.id === id ? { ...item, volume: vol } : item));
  };

  const scrollToSonicSection = () => {
    if (sonicSectionRef.current) {
      sonicSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Gameplay Background Simulation State
  const [selectedGameplayBg, setSelectedGameplayBg] = useState<'gtav' | 'minecraft' | 'subway' | 'csgo' | 'sand' | 'trackmania' | 'splitscreen'>('gtav');

  // 4. Free AI Video Advisor State
  const [isGeneratingAdvisor, setIsGeneratingAdvisor] = useState(false);
  const [advisorData, setAdvisorData] = useState<FreeAiVideoAdvisorResult | null>(null);

  // Current active preview item
  const currentSegment = segments[activeSegmentIndex] || segments[0];

  // Fetch CapCut Guide on mount
  const fetchGuide = async () => {
    setIsLoadingGuide(true);
    try {
      const res = await fetch('/api/viral-director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      setGuide(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingGuide(false);
    }
  };

  // Fetch Free AI Video Advisor on mount
  const fetchFreeAiVideoAdvisor = async (targetTranscript?: string) => {
    setIsGeneratingAdvisor(true);
    try {
      const res = await fetch('/api/free-ai-video-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transcript: targetTranscript || transcriptInput,
          topic
        })
      });
      const data = await res.json();
      setAdvisorData(data);
    } catch (e) {
      console.error('Failed to load free AI video advisor:', e);
    } finally {
      setIsGeneratingAdvisor(false);
    }
  };

  useEffect(() => {
    fetchGuide();
    fetchFreeAiVideoAdvisor();
  }, []);

  // Sequence playback player loop
  useEffect(() => {
    let timer: any;
    if (isPlayingSequence) {
      timer = setInterval(() => {
        setActiveSegmentIndex(prev => (prev >= segments.length - 1 ? 0 : prev + 1));
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlayingSequence, segments.length]);

  // Execute Sentiment Analysis logic
  const handleRunSentimentAnalysis = async (customText?: string) => {
    const textToAnalyze = customText || transcriptInput;
    if (!textToAnalyze.trim()) return;
    setIsAnalyzingSentiment(true);
    try {
      const res = await fetch('/api/sentiment-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: textToAnalyze })
      });
      const data = await res.json();
      if (data && data.segments && data.segments.length > 0) {
        // Enrich with tension levels if missing
        const enriched: SentimentCaptionSegment[] = data.segments.map((s: any, idx: number) => {
          let tension = 5;
          let psych = '';
          if (s.sentiment === 'urgent') {
            tension = 9;
            psych = 'High-tension crimson triggers biological threat and loss aversion, stopping thumb scrolling instantly.';
          } else if (s.sentiment === 'curiosity') {
            tension = 7;
            psych = 'High-contrast electric yellow creates a cognitive gap that viewers must stick around to resolve.';
          } else if (s.sentiment === 'growth') {
            tension = 2;
            psych = 'Emerald green triggers dopamine reward pathways and relief, generating high save & share rates.';
          } else if (s.sentiment === 'authority') {
            tension = 5;
            psych = 'Cyber cyan provides scientific gravitas and status proof, reinforcing creator authority.';
          } else {
            tension = 4;
            psych = 'Neutral clean white ensures visual clarity during essential transitional grammar.';
          }
          return {
            ...s,
            tensionLevel: s.tensionLevel || tension,
            psychologyReason: s.psychologyReason || psych
          };
        });
        setSegments(enriched);
        setActiveSegmentIndex(0);
        if (data.summary) setSentimentSummary(data.summary);
      }
      // Also refresh the AI Video & Gameplay recommendations based on new script
      fetchFreeAiVideoAdvisor(textToAnalyze);
    } catch (err) {
      console.error('Sentiment analysis failed:', err);
    } finally {
      setIsAnalyzingSentiment(false);
    }
  };

  // Load Preset Story
  const handleSelectPreset = (preset: typeof PRESET_STORIES[0]) => {
    setTranscriptInput(preset.transcript);
    handleRunSentimentAnalysis(preset.transcript);
  };

  // Download SRT Subtitles file
  const handleDownloadSrt = () => {
    let srtContent = '';
    segments.forEach((seg, index) => {
      const formatTime = (secs: number) => {
        const date = new Date(0);
        date.setMilliseconds(secs * 1000);
        const iso = date.toISOString();
        return iso.substring(11, 23).replace('.', ',');
      };
      srtContent += `${index + 1}\n`;
      srtContent += `${formatTime(seg.startSec)} --> ${formatTime(seg.endSec)}\n`;
      srtContent += `${seg.text}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `capcut_sentiment_story_${Date.now()}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const toggleStep = (stepNum: number) => {
    setCheckedSteps(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  // Calculate sentiment distribution statistics
  const urgentCount = segments.filter(s => s.sentiment === 'urgent').length;
  const growthCount = segments.filter(s => s.sentiment === 'growth').length;
  const curiosityCount = segments.filter(s => s.sentiment === 'curiosity').length;
  const authorityCount = segments.filter(s => s.sentiment === 'authority').length;
  const neutralCount = segments.filter(s => s.sentiment === 'neutral').length;
  const total = segments.length || 1;

  return (
    <div className="space-y-8 pb-12">
      {/* 0. Top Director Command Banner */}
      <div className="bg-gradient-to-r from-red-950/60 via-zinc-900 to-amber-950/60 border border-red-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 bg-red-600/20 text-red-400 rounded-xl border border-red-600/40 shadow-inner">
                <Video className="w-6 h-6 text-red-500" />
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                CapCut Visual Storytelling Director &amp; AI Video Studio
              </h2>
            </div>
            <p className="text-zinc-300 text-sm mt-2 max-w-3xl leading-relaxed">
              Real-time transcript sentiment classification • Dynamic emotional color-coded caption blocks (Green for positive breakthrough, Red for high-tension traps) • Full AI Video Studio with live 9:16 canvas preview &amp; editing facility • Sonic Impact SFX library with timeline insert.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
            <span className="text-xs bg-red-500/15 text-red-300 px-3 py-1.5 rounded-full border border-red-500/30 flex items-center gap-1.5 font-bold">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              Thumb-Stop Engine Active
            </span>
            <span className="text-xs bg-zinc-800 text-emerald-400 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              100% Free Tools Only
            </span>
          </div>
        </div>

        {/* Quick Suite Jump Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-zinc-800/80 text-xs">
          <span className="text-zinc-400 font-mono text-[11px] mr-1">Jump to Studio:</span>
          <a href="#sentiment-studio" className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition flex items-center gap-1.5 font-semibold">
            <Brain className="w-3 h-3 text-emerald-400" /> 1. Sentiment Captions
          </a>
          <a href="#ai-video-studio" className="px-3 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-700/50 transition flex items-center gap-1.5 font-semibold">
            <Film className="w-3 h-3 text-red-400" /> 2. AI Video Studio &amp; Preview
          </a>
          <a href="#sonic-impact-library" className="px-3 py-1 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 transition flex items-center gap-1.5 font-semibold">
            <Volume2 className="w-3 h-3 text-indigo-400" /> 3. Sonic Impact SFX
          </a>
          <a href="#gameplay-matchmaker" className="px-3 py-1 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-700/50 transition flex items-center gap-1.5 font-semibold">
            <Gamepad2 className="w-3 h-3 text-amber-400" /> 4. Gameplay Matchmaker
          </a>
          <a href="#safe-zone-phone" className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition flex items-center gap-1.5 font-semibold">
            <Smartphone className="w-3 h-3 text-cyan-400" /> 6. Safe Zone Phone
          </a>
        </div>
      </div>

      {/* 1. Dynamic Sentiment Analysis & Storytelling Caption Blocks Studio */}
      <div id="sentiment-studio" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Brain className="w-4 h-4 text-emerald-400" />
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide">
                1. AI Sentiment Analysis &amp; Color-Coded Storytelling Blocks
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Color psychology directs human attention. Red elevates tension to stop the swipe; Green rewards the brain with positive dopamine payoff.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingSequence(!isPlayingSequence)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                isPlayingSequence
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700'
              }`}
            >
              {isPlayingSequence ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingSequence ? 'Pause Story' : 'Play Sequence'}</span>
            </button>

            <button
              onClick={handleDownloadSrt}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-bold border border-zinc-700 flex items-center gap-1.5 transition"
              title="Download CapCut Subtitle file (.SRT)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export .SRT</span>
            </button>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div>
          <span className="text-xs font-semibold text-zinc-400 block mb-2">
            Load Viral Storytelling Preset:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_STORIES.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-red-500/60 text-zinc-300 hover:text-white transition flex items-center gap-2 group cursor-pointer"
              >
                <span>{preset.name}</span>
                <span className="text-[10px] font-mono bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-500 group-hover:text-red-400">
                  {preset.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Transcript Input & Analyzer Trigger */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={transcriptInput}
              onChange={(e) => setTranscriptInput(e.target.value)}
              placeholder="Paste or write your short video script here to classify sentiment and auto-color caption blocks..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 transition resize-none font-mono"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0038]"></span>
                <strong className="text-red-400">Red:</strong> High-Tension
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E676]"></span>
                <strong className="text-emerald-400">Green:</strong> Positive Payoff
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600]"></span>
                <strong className="text-amber-400">Yellow:</strong> Curiosity Hook
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                <strong className="text-cyan-400">Cyan:</strong> Authority Rule
              </span>
            </div>

            <button
              onClick={() => handleRunSentimentAnalysis()}
              disabled={isAnalyzingSentiment}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              {isAnalyzingSentiment ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Emotional Cadence...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Perform Sentiment Analysis &amp; Color Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Emotional Distribution Metrics Bar */}
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" /> Emotional Cadence Distribution
            </span>
            <p className="text-xs text-zinc-400 italic">
              &quot;{sentimentSummary}&quot;
            </p>
          </div>

          {/* Color percentage progress bar */}
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${(urgentCount / total) * 100}%` }} 
              className="bg-[#FF0038] transition-all" 
              title={`Urgent/Tension: ${Math.round((urgentCount / total) * 100)}%`}
            />
            <div 
              style={{ width: `${(curiosityCount / total) * 100}%` }} 
              className="bg-[#FFE600] transition-all" 
              title={`Curiosity: ${Math.round((curiosityCount / total) * 100)}%`}
            />
            <div 
              style={{ width: `${(growthCount / total) * 100}%` }} 
              className="bg-[#00E676] transition-all" 
              title={`Positive Growth: ${Math.round((growthCount / total) * 100)}%`}
            />
            <div 
              style={{ width: `${(authorityCount / total) * 100}%` }} 
              className="bg-[#00F0FF] transition-all" 
              title={`Authority: ${Math.round((authorityCount / total) * 100)}%`}
            />
            <div 
              style={{ width: `${(neutralCount / total) * 100}%` }} 
              className="bg-white/70 transition-all" 
              title={`Neutral: ${Math.round((neutralCount / total) * 100)}%`}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-center font-mono">
            <div className="p-2 rounded-lg bg-red-950/30 border border-red-500/20">
              <span className="text-[10px] text-zinc-400 block">🔴 High Tension</span>
              <strong className="text-xs text-red-400">{Math.round((urgentCount / total) * 100)}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/20">
              <span className="text-[10px] text-zinc-400 block">🟡 Curiosity Hook</span>
              <strong className="text-xs text-amber-400">{Math.round((curiosityCount / total) * 100)}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
              <span className="text-[10px] text-zinc-400 block">🟢 Positive Payoff</span>
              <strong className="text-xs text-emerald-400">{Math.round((growthCount / total) * 100)}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
              <span className="text-[10px] text-zinc-400 block">🔵 Authority Rule</span>
              <strong className="text-xs text-cyan-400">{Math.round((authorityCount / total) * 100)}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-700">
              <span className="text-[10px] text-zinc-400 block">⚪ Context Flow</span>
              <strong className="text-xs text-white">{Math.round((neutralCount / total) * 100)}%</strong>
            </div>
          </div>
        </div>

        {/* Sequential Color-Coded Caption Blocks Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-red-400" /> Storytelling Subtitle Sequence ({segments.length} Blocks)
            </span>
            <span className="text-[11px] text-zinc-400">
              Click any block to inspect and test on the 9:16 safe-zone phone simulator below
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {segments.map((seg, idx) => {
              const isActive = activeSegmentIndex === idx;
              return (
                <div
                  key={seg.id || idx}
                  onClick={() => {
                    setActiveSegmentIndex(idx);
                    setIsPlayingSequence(false);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isActive 
                      ? 'bg-zinc-950 ring-2 shadow-xl scale-[1.01]' 
                      : 'bg-zinc-950/80 hover:bg-zinc-950 border-zinc-800'
                  }`}
                  style={{
                    borderColor: isActive ? seg.colorHex : 'rgba(39, 39, 42, 0.8)',
                    boxShadow: isActive ? `0 0 20px ${seg.colorHex}25` : undefined
                  }}
                >
                  <div className="space-y-2">
                    {/* Header badge & time */}
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
                        style={{ 
                          backgroundColor: `${seg.colorHex}20`,
                          color: seg.colorHex,
                          border: `1px solid ${seg.colorHex}40`
                        }}
                      >
                        <span>●</span>
                        <span>{seg.emotionLabel}</span>
                      </span>

                      <span className="text-[10px] font-mono text-zinc-500">
                        ⏱️ {seg.startSec.toFixed(1)}s - {seg.endSec.toFixed(1)}s
                      </span>
                    </div>

                    {/* Subtitle text */}
                    <div className="text-sm font-black text-white tracking-wide uppercase pt-1">
                      {seg.text.split(' ').map((word, wIdx) => {
                        const isHigh = seg.highlightWord && word.includes(seg.highlightWord.toUpperCase());
                        return (
                          <span 
                            key={wIdx} 
                            style={{ color: isHigh ? seg.colorHex : '#FFFFFF' }}
                            className={isHigh ? 'underline decoration-2 font-black' : ''}
                          >
                            {word}{' '}
                          </span>
                        );
                      })}
                    </div>

                    {/* Storytelling explanation */}
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {seg.psychologyReason}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-zinc-900 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 font-mono text-zinc-400">
                      <Flame className="w-3 h-3 text-red-400" />
                      <span>Tension: <strong className="text-white">{seg.tensionLevel || 7}/10</strong></span>
                    </div>

                    <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded">
                      {seg.animation || 'Pop Up (0.2s)'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Full AI Video Generation Studio With Live Preview & Editing Facility */}
      <div id="ai-video-studio">
        <AiVideoStudioPreview
          initialTranscript={transcriptInput}
          sentimentSegments={segments}
          onSendToUploader={onSendToUploader}
          timelineSfx={timelineSfx}
          onRemoveTimelineSfx={handleRemoveTimelineSfx}
          onUpdateSfxVolume={handleUpdateSfxVolume}
          onOpenSonicLibrary={scrollToSonicSection}
        />
      </div>

      {/* 3. Sonic Impact SFX Library (Searchable Categorized Free SFX with Insert Functionality) */}
      <div id="sonic-impact-library" ref={sonicSectionRef}>
        <SonicImpactLibrary
          onInsertSfx={handleInsertTimelineSfx}
          activeTimestamp={currentSegment.startSec}
          activeSegmentId={currentSegment.id}
        />
      </div>

      {/* 4. Viral Gameplay Matchmaker & Dual-Stimulation Formula */}
      <div id="gameplay-matchmaker" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <Gamepad2 className="w-4 h-4 text-amber-400" />
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide">
                4. Viral Gameplay Matchmaker &amp; Dual-Stimulation Formula
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Top YouTube Shorts creators pair narrative voiceovers with hypnotic visual game loops. Audio tells the story while motion suppresses the thumb scroll.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/20 font-mono">
              +42% Average Retention Lift
            </span>
          </div>
        </div>

        {/* Dual stimulation retention breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Volume2 className="w-4 h-4 text-indigo-400" /> 1. Auditory Cortex Feed
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your voiceover or AI TTS delivers the contrarian script with punchy pauses and zero breaths.
            </p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-amber-400" /> 2. Motion Cortex Hypnosis
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subway Surfers, GTA V ramps, or Minecraft parkour locks the eye into an infinite speed loop.
            </p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Shield className="w-4 h-4 text-emerald-400" /> 3. 50/50 Split-Screen Synergy
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Top 50% = AI Video / Avatar. Bottom 50% = Gameplay. Center = CapCut Safe Zone Captions.
            </p>
          </div>
        </div>

        {/* Gameplay Matchmaker Cards */}
        <div>
          <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3 font-mono">
            Recommended Background Gameplays Matched to Your Script:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisorData?.recommendedGameplays.map((gameplay) => {
              const isSelected = selectedGameplayBg === gameplay.previewType;
              return (
                <div
                  key={gameplay.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-950 border-amber-500 shadow-xl ring-1 ring-amber-500/40'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {gameplay.name}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {gameplay.retentionScore}% Retention
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-mono">
                        {gameplay.pacingBpm} BPM
                      </span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-amber-400 font-medium truncate">{gameplay.style}</span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      <strong className="text-white">Best for:</strong> {gameplay.bestFor}
                    </p>

                    <p className="text-[11px] text-zinc-400 italic leading-snug">
                      &quot;{gameplay.psychologicalReason}&quot;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">
                      {gameplay.splitScreenRatio}
                    </span>

                    <button
                      onClick={() => setSelectedGameplayBg(gameplay.previewType as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                        isSelected
                          ? 'bg-amber-500 text-black shadow'
                          : 'bg-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Active in Simulator' : 'Test in Simulator'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            }) || (
              <div className="col-span-3 text-center py-6 text-zinc-500 text-xs">
                Loading gameplay match recommendations...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Best Free AI Video Generation Directory & Prompt Copy Engine */}
      <div id="ai-video-directory" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-red-500/20 text-red-400 rounded-lg">
                <Film className="w-4 h-4 text-red-400" />
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide">
                5. Best Free AI Video Generation &amp; Copy Prompt Engine
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Top 100% Free &amp; Generous-Tier AI Video generators. One-click copy production-grade prompts formatted for Kling, Haiper, Luma, and CapCut.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700 font-mono">
              9:16 Vertical Ratio Ready
            </span>
          </div>
        </div>

        {/* Directory of Free AI Video Tools */}
        <div>
          <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3 font-mono">
            Ranked Free-Tier AI Video Generators:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisorData?.freeTools.map((tool, idx) => (
              <div 
                key={idx}
                className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                      {tool.rating}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400 block font-semibold">
                    {tool.tier}
                  </span>

                  <p className="text-xs text-zinc-300 leading-snug">
                    {tool.creditPolicy}
                  </p>

                  <p className="text-[11px] text-zinc-400">
                    <strong className="text-zinc-200">Best for:</strong> {tool.bestFor}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {tool.resolution}
                  </span>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                  >
                    <span>Launch Free</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy The Best Free AI Video Generation Prompts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Copy Best Free AI Video Generation Prompts (Scene-by-Scene)
            </span>
            <span className="text-[11px] text-zinc-400">
              Paste directly into Kling AI, Haiper AI, or Luma Dream Machine
            </span>
          </div>

          <div className="space-y-4">
            {advisorData?.promptPackages.map((pkg, idx) => (
              <div 
                key={idx}
                className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                      {pkg.toolTarget}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {pkg.ratio}
                    </span>
                  </div>

                  <span className="text-xs text-zinc-400 italic">
                    {pkg.cameraMotionAdvice}
                  </span>
                </div>

                {/* Scene 1 Hook Prompt */}
                <div className="space-y-1.5 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" /> Scene 1: Visual Thumb-Stop Hook (0-3s)
                    </span>
                    <button
                      onClick={() => handleCopy(pkg.hookPrompt, `hook-${idx}`)}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-mono flex items-center gap-1 transition"
                    >
                      {copiedKey === `hook-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Hook Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-200 font-mono leading-relaxed select-all">
                    {pkg.hookPrompt}
                  </p>
                </div>

                {/* Scene 2 Core Value Prompt */}
                <div className="space-y-1.5 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Scene 2: Core Value &amp; Contrast B-Roll (3-8s)
                    </span>
                    <button
                      onClick={() => handleCopy(pkg.bodyPrompt, `body-${idx}`)}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-mono flex items-center gap-1 transition"
                    >
                      {copiedKey === `body-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy B-Roll Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-200 font-mono leading-relaxed select-all">
                    {pkg.bodyPrompt}
                  </p>
                </div>

                {/* Scene 3 Climax Prompt */}
                <div className="space-y-1.5 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Scene 3: Climax Resolution &amp; Triumph (8-15s)
                    </span>
                    <button
                      onClick={() => handleCopy(pkg.climaxPrompt, `climax-${idx}`)}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-mono flex items-center gap-1 transition"
                    >
                      {copiedKey === `climax-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Climax Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-200 font-mono leading-relaxed select-all">
                    {pkg.climaxPrompt}
                  </p>
                </div>

                {/* Negative Prompts */}
                <div className="flex items-center justify-between bg-zinc-900/30 px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="text-red-400 font-bold font-mono">Negative:</span>
                    <span className="text-zinc-400 font-mono truncate">{pkg.negativePrompt}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(pkg.negativePrompt, `neg-${idx}`)}
                    className="text-[11px] text-zinc-300 hover:text-white shrink-0 font-mono flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Live 9:16 Safe Zone Simulator Component (Synchronized) */}
      <div id="safe-zone-phone" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-red-500" />
              6. Live 9:16 Safe Zone Phone Simulator
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Current Preview: <strong style={{ color: currentSegment.colorHex }}>{currentSegment.text}</strong> • Background: <strong className="text-amber-400 uppercase">{selectedGameplayBg}</strong>
            </p>
          </div>
        </div>

        <CapCutSafeZoneSimulator 
          customCaption={currentSegment.text} 
          onSendToUploader={onSendToUploader}
          externalSegments={segments}
          externalVideoBg={selectedGameplayBg}
          activeSegmentIdx={activeSegmentIndex}
          highlightColorOverride={currentSegment.colorHex}
          highlightWordOverride={currentSegment.highlightWord}
        />
      </div>

      {/* 7. CapCut Style & Pacing Guides */}
      {guide && (
        <div id="capcut-guides" className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          
          {/* Left Column: Font Style & Free CapCut Auto-Caption Setup */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-400" /> Auto-Caption Style Settings
                </h3>
                <span className="text-[11px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono">
                  High-CTR Recipe
                </span>
              </div>

              {/* Recommended Font */}
              <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block mb-1">
                    1. Recommended Fonts (CapCut Free Library):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {guide.fontConfig.recommendedFonts.map((f, i) => (
                      <span key={i} className="text-xs font-bold text-white bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block mb-1">
                    2. Text Color Palette:
                  </span>
                  <p className="text-xs text-zinc-200">
                    {guide.fontConfig.colorCombo}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block mb-1">
                    3. Stroke &amp; Shadow Legibility:
                  </span>
                  <p className="text-xs text-zinc-300">
                    <strong className="text-white">Stroke:</strong> {guide.fontConfig.stroke}
                  </p>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    <strong className="text-white">Shadow:</strong> {guide.fontConfig.shadow}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block mb-1">
                    4. Pop Animation Setting:
                  </span>
                  <p className="text-xs text-amber-300 font-mono">
                    {guide.fontConfig.animations}
                  </p>
                </div>
              </div>

              {/* Safe Zone Rules Summary */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-2">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> UI Safe-Zone Rules
                </h4>
                <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
                  {guide.safeZoneRules.map((rule, idx) => (
                    <li key={idx} className="leading-snug">{rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step-by-Step CapCut Editing Checklist */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" /> Free CapCut Step-by-Step Checklist
              </h3>
              <p className="text-xs text-zinc-400">
                Mark each step as you edit inside CapCut desktop or mobile:
              </p>

              <div className="space-y-2 pt-1">
                {guide.stepByStepChecklist.map((step) => {
                  const isDone = !!checkedSteps[step.step];
                  return (
                    <div
                      key={step.step}
                      onClick={() => toggleStep(step.step)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isDone 
                          ? 'bg-emerald-950/30 border-emerald-500/40 opacity-75' 
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => {}}
                        className="mt-0.5 accent-emerald-500 cursor-pointer"
                      />
                      <div>
                        <div className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                          {step.title}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 3-4 Second Pacing & Sound Effects Schedule */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-400" /> 3-4 Second Retention Timeline &amp; SFX Schedule
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  The human thumb swiped after 4s without visual change. Follow this exact pacing cues schedule:
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {guide.pacingChecklist.map((cue, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      ⏱️ {cue.timeRange}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Goal: {cue.retentionGoal}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white">
                    {cue.action}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/80 px-2.5 py-1.5 rounded-lg border border-zinc-800">
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Free SFX Cue: <strong className="text-indigo-300">{cue.sfx}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Free Stock B-Roll Sources */}
            <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-2 mt-4">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-red-400" /> Free Royalty-Free Visual B-Roll Stacks:
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Download vertical B-roll from <strong className="text-zinc-200">Pexels.com</strong> or <strong className="text-zinc-200">Pixabay.com</strong> (Filter: Videos &gt; Vertical). In CapCut, add as an &quot;Overlay&quot; layer, trim to 1.5 seconds, set Blend to Normal (100%), and scale to fill.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
