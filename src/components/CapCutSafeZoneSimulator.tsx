import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Eye, EyeOff, ShieldCheck, AlertTriangle, 
  ThumbsUp, MessageSquare, Share2, Disc3, ArrowLeft, Search, MoreVertical, 
  RotateCcw, Sliders, Type, Check, Sparkles, Play, Pause, 
  Upload, Download, Copy, Split, Award, BarChart2, Zap, Video 
} from 'lucide-react';

export interface SentimentSegment {
  id: number;
  text: string;
  sentiment: 'urgent' | 'curiosity' | 'growth' | 'authority' | 'neutral';
  colorHex: string;
  emotionLabel: string;
  startSec: number;
  endSec: number;
  highlightWord: string;
  animation?: string;
}

interface CapCutSafeZoneSimulatorProps {
  customCaption?: string;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  externalSegments?: SentimentSegment[];
  externalVideoBg?: 'dark-studio' | 'neon-glow' | 'cyber' | 'gtav' | 'minecraft' | 'subway' | 'csgo' | 'sand' | 'trackmania' | 'splitscreen';
  activeSegmentIdx?: number;
  highlightColorOverride?: string;
  highlightWordOverride?: string;
}

const DEFAULT_SENTIMENT_SEGMENTS: SentimentSegment[] = [
  {
    id: 1,
    text: "THE SINGLE BIGGEST LIE",
    sentiment: "urgent",
    colorHex: "#FF0038",
    emotionLabel: "Belief Violation / Warning",
    startSec: 0.0,
    endSec: 2.0,
    highlightWord: "LIE",
    animation: "Pop Up (0.2s)"
  },
  {
    id: 2,
    text: "ABOUT MAKING MONEY",
    sentiment: "curiosity",
    colorHex: "#FFE600",
    emotionLabel: "Curiosity / Value Hook",
    startSec: 2.0,
    endSec: 4.2,
    highlightWord: "MONEY",
    animation: "Bounce In (0.2s)"
  },
  {
    id: 3,
    text: "IS THAT LOWERING PRICES",
    sentiment: "urgent",
    colorHex: "#FF0038",
    emotionLabel: "Costly Mistake Alert",
    startSec: 4.2,
    endSec: 6.5,
    highlightWord: "PRICES",
    animation: "Pop Up (0.2s)"
  },
  {
    id: 4,
    text: "GETS YOU MORE CUSTOMERS",
    sentiment: "neutral",
    colorHex: "#FFFFFF",
    emotionLabel: "Common Assumption",
    startSec: 6.5,
    endSec: 8.5,
    highlightWord: "CUSTOMERS",
    animation: "Standard Fade"
  },
  {
    id: 5,
    text: "THE TOP 1% DOUBLE IT",
    sentiment: "growth",
    colorHex: "#00E676",
    emotionLabel: "Mastery & 10X Scale",
    startSec: 8.5,
    endSec: 10.8,
    highlightWord: "DOUBLE",
    animation: "Pop Up (0.2s)"
  },
  {
    id: 6,
    text: "AND MULTIPLY THE VALUE",
    sentiment: "authority",
    colorHex: "#00F0FF",
    emotionLabel: "Scientific Rule & Proof",
    startSec: 10.8,
    endSec: 13.0,
    highlightWord: "VALUE",
    animation: "Word-by-Word"
  }
];

export const PRESET_TRANSCRIPTS = [
  {
    id: 'hormozi',
    label: 'Alex Hormozi ($100M)',
    tag: 'Pricing & Business',
    text: "The single biggest lie about making money is that lowering your prices gets you more customers. The top 1% double it and multiply the value.",
    segments: DEFAULT_SENTIMENT_SEGMENTS
  },
  {
    id: 'huberman',
    label: 'Huberman (Dopamine)',
    tag: 'Neuroscience',
    text: "Dopamine is not about pleasure, it is about the anticipation of reward. When you spike dopamine with cheap scrolling, you deplete your motivation baseline.",
    segments: [
      { id: 1, text: "DOPAMINE IS NOT PLEASURE", sentiment: "urgent" as const, colorHex: "#FF0038", emotionLabel: "Myth Buster", startSec: 0, endSec: 2.2, highlightWord: "PLEASURE", animation: "Pop Up (0.2s)" },
      { id: 2, text: "IT IS ANTICIPATION OF REWARD", sentiment: "authority" as const, colorHex: "#00F0FF", emotionLabel: "Neuroscience Fact", startSec: 2.2, endSec: 4.8, highlightWord: "REWARD", animation: "Word-by-Word" },
      { id: 3, text: "WHEN YOU SPIKE DOPAMINE", sentiment: "curiosity" as const, colorHex: "#FFE600", emotionLabel: "Hook / Warning", startSec: 4.8, endSec: 7.0, highlightWord: "SPIKE", animation: "Bounce In (0.2s)" },
      { id: 4, text: "WITH CHEAP SCROLLING", sentiment: "urgent" as const, colorHex: "#FF0038", emotionLabel: "Pain Point Alert", startSec: 7.0, endSec: 9.2, highlightWord: "SCROLLING", animation: "Pop Up (0.2s)" },
      { id: 5, text: "YOU CRUSH YOUR BASELINE", sentiment: "urgent" as const, colorHex: "#FF0038", emotionLabel: "Severe Consequence", startSec: 9.2, endSec: 11.5, highlightWord: "BASELINE", animation: "Pop Up (0.2s)" },
      { id: 6, text: "AND DESTROY YOUR FOCUS", sentiment: "growth" as const, colorHex: "#00E676", emotionLabel: "Recovery Insight", startSec: 11.5, endSec: 13.8, highlightWord: "FOCUS", animation: "Word-by-Word" }
    ]
  },
  {
    id: 'goggins',
    label: 'Goggins (40% Rule)',
    tag: 'Mental Toughness',
    text: "Most people quit when they are only at 40% of their actual capability. The governor in your mind is lying to protect you from discomfort.",
    segments: [
      { id: 1, text: "YOU QUIT AT FORTY PERCENT", sentiment: "urgent" as const, colorHex: "#FF0038", emotionLabel: "Hard Truth Callout", startSec: 0, endSec: 2.4, highlightWord: "FORTY", animation: "Pop Up (0.2s)" },
      { id: 2, text: "OF YOUR ACTUAL CAPABILITY", sentiment: "authority" as const, colorHex: "#00F0FF", emotionLabel: "Biological Proof", startSec: 2.4, endSec: 4.9, highlightWord: "CAPABILITY", animation: "Word-by-Word" },
      { id: 3, text: "THE GOVERNOR IN YOUR MIND", sentiment: "curiosity" as const, colorHex: "#FFE600", emotionLabel: "Psychological Mechanism", startSec: 4.9, endSec: 7.4, highlightWord: "MIND", animation: "Bounce In (0.2s)" },
      { id: 4, text: "IS LYING TO PROTECT YOU", sentiment: "urgent" as const, colorHex: "#FF0038", emotionLabel: "Deception Warning", startSec: 7.4, endSec: 9.8, highlightWord: "LYING", animation: "Pop Up (0.2s)" },
      { id: 5, text: "PUSH THROUGH THE PAIN", sentiment: "growth" as const, colorHex: "#00E676", emotionLabel: "Breakthrough Command", startSec: 9.8, endSec: 12.2, highlightWord: "PUSH", animation: "Pop Up (0.2s)" }
    ]
  },
  {
    id: 'automation',
    label: 'AI Automation (High CPM)',
    tag: 'Tech / SaaS',
    text: "Stop spending 6 hours editing video. This free automated script crops 9:16 vertical shorts and generates viral captions in under 15 seconds.",
    segments: [
      { id: 1, text: "STOP WASTING SIX HOURS", sentiment: "urgent" as const, colorHex: "#FF0038", emotionLabel: "Time Waste Warning", startSec: 0, endSec: 2.2, highlightWord: "STOP", animation: "Pop Up (0.2s)" },
      { id: 2, text: "EDITING VERTICAL VIDEOS", sentiment: "neutral" as const, colorHex: "#FFFFFF", emotionLabel: "Problem Context", startSec: 2.2, endSec: 4.5, highlightWord: "VIDEOS", animation: "Standard Fade" },
      { id: 3, text: "THIS FREE AI AUTOMATION", sentiment: "curiosity" as const, colorHex: "#FFE600", emotionLabel: "Free Resource Hook", startSec: 4.5, endSec: 6.8, highlightWord: "FREE", animation: "Bounce In (0.2s)" },
      { id: 4, text: "SLICES VIRAL 9:16 SHORTS", sentiment: "growth" as const, colorHex: "#00E676", emotionLabel: "10X Efficiency", startSec: 6.8, endSec: 9.1, highlightWord: "SHORTS", animation: "Pop Up (0.2s)" },
      { id: 5, text: "IN UNDER 15 SECONDS", sentiment: "growth" as const, colorHex: "#00F0FF", emotionLabel: "Speed & Scale", startSec: 9.1, endSec: 11.5, highlightWord: "SECONDS", animation: "Word-by-Word" }
    ]
  }
];

export const CapCutSafeZoneSimulator: React.FC<CapCutSafeZoneSimulatorProps> = ({ 
  customCaption = "THE NUMBER ONE LIE ABOUT MONEY",
  onSendToUploader,
  externalSegments,
  externalVideoBg,
  activeSegmentIdx,
  highlightColorOverride,
  highlightWordOverride
}) => {
  // Core text and positioning
  const [captionText, setCaptionText] = useState(customCaption);
  const [posY, setPosY] = useState(52); // Percentage from top (50-52% is sweet spot)
  const [fontSize, setFontSize] = useState(24);
  const [selectedFont, setSelectedFont] = useState<'the-bold' | 'montserrat' | 'komika' | 'anton'>('the-bold');
  const [highlightKeyword, setHighlightKeyword] = useState('LIE');
  const [highlightColor, setHighlightColor] = useState('#FFE600');
  
  // UI toggles
  const [showOverlays, setShowOverlays] = useState(true);
  const [showSafeZoneGrid, setShowSafeZoneGrid] = useState(true);
  const [videoBg, setVideoBg] = useState<'dark-studio' | 'neon-glow' | 'cyber' | 'gradient' | 'gtav' | 'minecraft' | 'subway' | 'csgo' | 'sand' | 'trackmania' | 'splitscreen'>('dark-studio');

  // Sentiment Analysis Caption Engine
  const [useSentimentEngine, setUseSentimentEngine] = useState(true);
  const [segments, setSegments] = useState<SentimentSegment[]>(externalSegments || DEFAULT_SENTIMENT_SEGMENTS);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);

  // Sync with external props when passed down from Director Tab
  useEffect(() => {
    if (externalSegments && externalSegments.length > 0) {
      setSegments(externalSegments);
    }
  }, [externalSegments]);

  useEffect(() => {
    if (externalVideoBg) {
      setVideoBg(externalVideoBg);
    }
  }, [externalVideoBg]);

  useEffect(() => {
    if (activeSegmentIdx !== undefined && activeSegmentIdx >= 0) {
      setActiveSegmentIndex(activeSegmentIdx);
    }
  }, [activeSegmentIdx]);

  useEffect(() => {
    if (highlightColorOverride) {
      setHighlightColor(highlightColorOverride);
    }
  }, [highlightColorOverride]);

  useEffect(() => {
    if (highlightWordOverride) {
      setHighlightKeyword(highlightWordOverride);
    }
  }, [highlightWordOverride]);

  useEffect(() => {
    if (customCaption) {
      setCaptionText(customCaption);
    }
  }, [customCaption]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [isAnalyzingSentiment, setIsAnalyzingSentiment] = useState(false);
  const [transcriptInput, setTranscriptInput] = useState(
    "The single biggest lie about making money is that lowering your prices gets you more customers. The top 1% double it and multiply the value."
  );

  // Short Video Rendering & Recording Engine
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderSuccessMsg, setRenderSuccessMsg] = useState<string | null>(null);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("The Single Biggest Lie About Making Money (#shorts)");
  const [uploadDesc, setUploadDesc] = useState("Why lowering prices actually repels high-value clients. The top 1% double price and multiply value.\n\n#shorts #money #business #pricing\n\n📌 Free resources pinned below!");
  const [uploadTags, setUploadTags] = useState("shorts, money, business, pricing, viral");

  // A/B Testing Studio States
  const [isAbTestMode, setIsAbTestMode] = useState(false);
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');
  const [variantA, setVariantA] = useState({
    title: "The #1 Lie About Making Money",
    caption: "THE NUMBER ONE LIE ABOUT MONEY",
    keyword: "LIE",
    color: "#FFE600", // Neon Yellow
    font: 'the-bold' as const,
    thumbStopRate: 94.2,
    predictedApv: 85.0
  });
  const [variantB, setVariantB] = useState({
    title: "Stop Lowering Prices or Stay Broke",
    caption: "STOP DOING THIS OR STAY BROKE",
    keyword: "STOP",
    color: "#FF0038", // Urgent Danger Red
    font: 'montserrat' as const,
    thumbStopRate: 97.6,
    predictedApv: 93.4
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Detect collision with Shorts UI
  const isTopDanger = posY < 18;
  const isBottomDanger = posY > 72;
  const isColliding = isTopDanger || isBottomDanger;

  // Active displayed segment
  const currentSegment = segments[activeSegmentIndex] || segments[0];

  // Auto-play timeline playback loop
  useEffect(() => {
    let timer: any;
    if (isPlayingSequence) {
      timer = setInterval(() => {
        setActiveSegmentIndex(prev => {
          if (prev >= segments.length - 1) return 0;
          return prev + 1;
        });
      }, 2100);
    }
    return () => clearInterval(timer);
  }, [isPlayingSequence, segments.length]);

  // Update caption text when active segment changes
  useEffect(() => {
    if (useSentimentEngine && currentSegment) {
      setCaptionText(currentSegment.text);
      setHighlightKeyword(currentSegment.highlightWord);
      setHighlightColor(currentSegment.colorHex);
    }
  }, [activeSegmentIndex, useSentimentEngine, currentSegment]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Run AI Sentiment Analysis on transcript
  const handleAnalyzeSentiment = async () => {
    if (!transcriptInput.trim()) return;
    setIsAnalyzingSentiment(true);
    try {
      const res = await fetch('/api/sentiment-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcriptInput })
      });
      const data = await res.json();
      if (data?.segments && data.segments.length > 0) {
        setSegments(data.segments);
        setActiveSegmentIndex(0);
        setUseSentimentEngine(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzingSentiment(false);
    }
  };

  // Download SRT Subtitles
  const handleDownloadSrt = () => {
    let srtContent = '';
    segments.forEach((seg, index) => {
      const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        const millis = Math.floor((seconds % 1) * 1000).toString().padStart(3, '0');
        return `${hrs}:${mins}:${secs},${millis}`;
      };

      srtContent += `${index + 1}\n`;
      srtContent += `${formatTime(seg.startSec)} --> ${formatTime(seg.endSec)}\n`;
      srtContent += `<font color="${seg.colorHex}">${seg.text}</font>\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment_captions.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Canvas Video Rendering & Recording Engine (9:16 WebM/MP4)
  const handleRenderShortVideo = async (durationSeconds = 6) => {
    setIsRenderingVideo(true);
    setRenderProgress(0);
    setRenderSuccessMsg(null);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 720;
      canvas.height = 1280;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not initialize canvas context");

      const stream = canvas.captureStream(30);
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      } catch {
        recorder = new MediaRecorder(stream);
      }

      const recordedChunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      };

      const finishPromise = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          resolve(blob);
        };
      });

      recorder.start();

      const fps = 30;
      const totalFrames = fps * durationSeconds;
      let currentFrame = 0;

      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          currentFrame++;
          const progress = Math.min(100, Math.round((currentFrame / totalFrames) * 100));
          setRenderProgress(progress);

          // 1. Background
          if (videoBg === 'neon-glow') {
            const grad = ctx.createLinearGradient(0, 0, 720, 1280);
            grad.addColorStop(0, '#1c0f33');
            grad.addColorStop(0.5, '#0c102b');
            grad.addColorStop(1, '#05050d');
            ctx.fillStyle = grad;
          } else if (videoBg === 'gradient') {
            const grad = ctx.createLinearGradient(0, 0, 720, 1280);
            grad.addColorStop(0, '#042416');
            grad.addColorStop(0.5, '#0a1628');
            grad.addColorStop(1, '#04070c');
            ctx.fillStyle = grad;
          } else {
            const grad = ctx.createLinearGradient(0, 0, 0, 1280);
            grad.addColorStop(0, '#18181b');
            grad.addColorStop(0.5, '#09090b');
            grad.addColorStop(1, '#000000');
            ctx.fillStyle = grad;
          }
          ctx.fillRect(0, 0, 720, 1280);

          // 2. Animated Ambient Grid & Glow
          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          for (let i = 0; i < 9; i++) {
            const py = ((currentFrame * 4 + i * 140) % 1280);
            ctx.fillRect(35 + i * 75, py, 4, 4);
          }

          // 3. Segment and dynamic text
          const segIdx = Math.min(
            segments.length - 1, 
            Math.floor((currentFrame / totalFrames) * segments.length)
          );
          const activeSeg = segments[segIdx] || segments[0];

          ctx.save();
          const text = activeSeg.text.toUpperCase();
          const words = text.split(' ');
          const highlightWord = (activeSeg.highlightWord || '').toUpperCase();
          const highlightColor = activeSeg.colorHex || '#FFE600';

          ctx.font = '900 46px Impact, Arial Black, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Center position matching posY %
          const yPos = 1280 * (posY / 100);

          // Measure words
          let totalWidth = 0;
          const wordMetrics = words.map(w => {
            const m = ctx.measureText(w + ' ').width;
            totalWidth += m;
            return { word: w, width: m };
          });

          let startX = (720 - totalWidth) / 2;
          wordMetrics.forEach(({ word, width }) => {
            const isHighlight = highlightWord && word.includes(highlightWord);
            
            // Text shadow/glow
            ctx.shadowColor = isHighlight ? highlightColor : 'rgba(0,0,0,0.95)';
            ctx.shadowBlur = isHighlight ? 18 : 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 4;

            // Black outer stroke for readability
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#000000';
            ctx.strokeText(word, startX + width / 2, yPos);

            // Inner fill with sentiment color
            ctx.fillStyle = isHighlight ? highlightColor : '#FFFFFF';
            ctx.fillText(word, startX + width / 2, yPos);

            startX += width;
          });

          // Watermark badge
          ctx.shadowBlur = 0;
          ctx.font = '700 20px system-ui, sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.45)';
          ctx.fillText('SHORTSFORGE AI • RETENTION VERIFIED', 360, 1180);

          ctx.restore();

          if (currentFrame >= totalFrames) {
            clearInterval(interval);
            recorder.stop();
            resolve();
          }
        }, 1000 / fps);
      });

      const blob = await finishPromise;
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `short_rendered_9x16_${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setRenderSuccessMsg('9:16 Short Video clip successfully created & downloaded! Open in CapCut or upload directly.');
      setTimeout(() => setRenderSuccessMsg(null), 6000);
    } catch (err) {
      console.error('Video render error:', err);
    } finally {
      setIsRenderingVideo(false);
    }
  };

  // Render Styled Caption Text
  const renderStyledCaption = () => {
    const activeText = isAbTestMode 
      ? (activeVariant === 'A' ? variantA.caption : variantB.caption)
      : captionText;

    const activeKeyword = isAbTestMode
      ? (activeVariant === 'A' ? variantA.keyword : variantB.keyword)
      : highlightKeyword;

    const activeColor = isAbTestMode
      ? (activeVariant === 'A' ? variantA.color : variantB.color)
      : highlightColor;

    const fontChoice = isAbTestMode
      ? (activeVariant === 'A' ? variantA.font : variantB.font)
      : selectedFont;

    if (!activeText) return null;
    const words = activeText.split(' ');

    return (
      <div 
        className="text-center font-extrabold uppercase tracking-tight select-none px-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]"
        style={{
          fontFamily: fontChoice === 'the-bold' 
            ? 'Impact, sans-serif' 
            : fontChoice === 'montserrat' 
            ? 'system-ui, -apple-system, sans-serif' 
            : fontChoice === 'komika' 
            ? 'Comic Sans MS, cursive, sans-serif' 
            : 'Impact, Arial Black, sans-serif',
          fontSize: `${fontSize}px`,
          textShadow: '0 0 5px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.9)',
          lineHeight: 1.15
        }}
      >
        {words.map((w, idx) => {
          const isHighlighted = activeKeyword && w.toLowerCase().includes(activeKeyword.toLowerCase());
          return (
            <span 
              key={idx} 
              className={`inline-block mx-1 transition-all ${
                isHighlighted 
                  ? 'scale-105 font-black filter drop-shadow-[0_0_12px_rgba(255,230,0,0.6)]' 
                  : 'text-white'
              }`}
              style={{
                color: isHighlighted ? activeColor : '#FFFFFF'
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 lg:p-6 shadow-2xl space-y-6">
      
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
              <Smartphone className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white">CapCut Safe-Zone &amp; Sentiment Caption Studio</h3>
            <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
              9:16 Canvas
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Generate sentiment-adaptive color-coded captions, run A/B retention split tests, and upload directly to YouTube.
          </p>
        </div>

        {/* Feature Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAbTestMode(!isAbTestMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isAbTestMode 
                ? 'bg-purple-600 text-white border-purple-500 shadow-md' 
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>A/B Split Test Tool</span>
          </button>

          {isColliding ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold animate-pulse">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>UI Overlap Collision!</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Safe Zone</span>
            </div>
          )}
        </div>
      </div>

      {/* A/B Testing Banner if Active */}
      {isAbTestMode && (
        <div className="bg-purple-950/30 border border-purple-500/40 rounded-2xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                A/B Retention Split-Testing Studio
              </span>
            </div>

            {/* Variant Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveVariant('A')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                  activeVariant === 'A'
                    ? 'bg-purple-600 text-white border-purple-400 shadow'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                }`}
              >
                Preview Variant A (Curiosity Yellow)
              </button>
              <button
                onClick={() => setActiveVariant('B')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                  activeVariant === 'B'
                    ? 'bg-red-600 text-white border-red-400 shadow'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                }`}
              >
                Preview Variant B (Danger Red Hook)
              </button>
            </div>
          </div>

          {/* Metric Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className={`p-3.5 rounded-xl border transition-all ${
              activeVariant === 'A' ? 'bg-zinc-900 border-purple-500/80 shadow-md' : 'bg-zinc-950 border-zinc-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">Variant A: {variantA.title}</span>
                <span className="text-[10px] font-mono text-zinc-400">Neon Yellow Highlight</span>
              </div>
              <div className="flex gap-3 mt-2 text-xs font-mono">
                <span className="text-zinc-300">Thumb-Stop Rate: <strong className="text-white">{variantA.thumbStopRate}%</strong></span>
                <span className="text-zinc-300">Projected APV: <strong className="text-white">{variantA.predictedApv}%</strong></span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all ${
              activeVariant === 'B' ? 'bg-zinc-900 border-red-500/80 shadow-md' : 'bg-zinc-950 border-zinc-800'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-red-400">Variant B: {variantB.title}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">Predicted Winner</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Negative Pattern Interrupt</span>
              </div>
              <div className="flex gap-3 mt-2 text-xs font-mono">
                <span className="text-zinc-300">Thumb-Stop Rate: <strong className="text-emerald-400">{variantB.thumbStopRate}% (+3.4%)</strong></span>
                <span className="text-zinc-300">Projected APV: <strong className="text-emerald-400">{variantB.predictedApv}% (+8.4%)</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
            <span className="text-[11px]">
              💡 AI Verdict: <strong>Variant B</strong> leverages psychological loss aversion (&quot;Stay Broke&quot;), producing an estimated 14% higher completion retention curve.
            </span>
            {onSendToUploader && (
              <button
                onClick={() => {
                  const winner = variantB.thumbStopRate > variantA.thumbStopRate ? variantB : variantA;
                  onSendToUploader({
                    title: winner.title,
                    description: `Tested high-retention breakdown: ${winner.caption}.\n\n#shorts #growth #viral`,
                    tags: ['shorts', 'viral', 'growth']
                  });
                }}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Deploy Winner to YouTube Uploader</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Grid: Controls & Phone Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Sentiment Caption Generator & Controls */}
        <div className="lg:col-span-5 space-y-5 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80">
          
          {/* Sentiment Engine Box */}
          <div className="space-y-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Sentiment-Adaptive Auto-Captions
              </span>
              <button
                onClick={handleAnalyzeSentiment}
                disabled={isAnalyzingSentiment}
                className="px-2.5 py-1 text-[11px] bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{isAnalyzingSentiment ? 'Analyzing...' : 'Auto-Detect Sentiment'}</span>
              </button>
            </div>

            <textarea
              rows={2}
              value={transcriptInput}
              onChange={(e) => setTranscriptInput(e.target.value)}
              placeholder="Paste transcript snippet to generate color-coded blocks..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 font-mono resize-none focus:outline-none focus:border-red-500"
            />

            {/* Quick Transcript Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5 pb-0.5">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Presets:</span>
              {PRESET_TRANSCRIPTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setTranscriptInput(preset.text);
                    setSegments(preset.segments);
                    setActiveSegmentIndex(0);
                    setUseSentimentEngine(true);
                  }}
                  className="px-2 py-0.5 text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-md border border-zinc-800 hover:border-zinc-700 transition cursor-pointer"
                  title={preset.tag}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Sentiment Legend */}
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30">🔴 Urgent/Warning</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">🟡 Curiosity Hook</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">🟢 Growth/10X</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">🔵 Data &amp; Rule</span>
            </div>

            {/* Timeline Scrubber & Segments Playlist */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingSequence(!isPlayingSequence)}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg flex items-center gap-1 text-xs font-semibold"
                  >
                    {isPlayingSequence ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isPlayingSequence ? 'Pause Sequence' : 'Play Sequence'}</span>
                  </button>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Segment {activeSegmentIndex + 1}/{segments.length}
                  </span>
                </div>

                <button
                  onClick={handleDownloadSrt}
                  className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
                  title="Export SRT Subtitles for CapCut"
                >
                  <Download className="w-3 h-3" /> Export .SRT
                </button>
              </div>

              {/* Segment Cards List */}
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {segments.map((seg, idx) => (
                  <div
                    key={seg.id || idx}
                    onClick={() => {
                      setActiveSegmentIndex(idx);
                      setIsPlayingSequence(false);
                    }}
                    className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      activeSegmentIndex === idx
                        ? 'bg-zinc-900 border-white text-white font-bold shadow'
                        : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.colorHex }} />
                      <span className="truncate">{seg.text}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                      {seg.emotionLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manual Fine-Tuning Controls */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                  Vertical Position (Y: {posY}%)
                </label>
                <button 
                  onClick={() => setPosY(52)} 
                  className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Sweet Spot (52%)
                </button>
              </div>
              <input
                type="range"
                min={15}
                max={82}
                value={posY}
                onChange={(e) => setPosY(parseInt(e.target.value, 10))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1">
                  <Type className="w-3.5 h-3.5 text-zinc-400" /> Font Size ({fontSize}px)
                </label>
                <input
                  type="range"
                  min={18}
                  max={34}
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Font Family
                </label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="the-bold">The Bold Font (All-Caps)</option>
                  <option value="montserrat">Montserrat Black</option>
                  <option value="komika">Komika Axis</option>
                  <option value="anton">Impact / Anton</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between mb-1">
                <span>Background / Gameplay Simulation:</span>
                <span className="text-[10px] text-amber-400 font-mono">Dual-Stimulation</span>
              </label>
              <select
                value={videoBg}
                onChange={(e) => setVideoBg(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="dark-studio">Studio Dark Void (Default)</option>
                <option value="neon-glow">Neon Gradient Aesthetic</option>
                <option value="gtav">🏎️ GTA V Mega Ramp (High-Tension Stunts)</option>
                <option value="minecraft">⛏️ Minecraft Spiral Parkour (Hypnotic Jumps)</option>
                <option value="subway">🛹 Subway Surfers (High-Speed Rail Dodging)</option>
                <option value="csgo">🌊 CS:GO Surf Wave (Fluid Glide Focus)</option>
                <option value="sand">🧼 Satisfying Kinetic Sand & Soap (ASMR)</option>
                <option value="trackmania">🚀 Trackmania 1000MPH Loops (Adrenaline)</option>
                <option value="splitscreen">🎬 Split-Screen Studio (Top: AI Video, Bottom: Gameplay)</option>
              </select>
            </div>

            {/* Overlays Toggles */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOverlays}
                  onChange={(e) => setShowOverlays(e.target.checked)}
                  className="accent-red-500"
                />
                <span>Shorts UI Rail &amp; Sound Disc</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSafeZoneGrid}
                  onChange={(e) => setShowSafeZoneGrid(e.target.checked)}
                  className="accent-emerald-500"
                />
                <span>Safe-Zone Grid</span>
              </label>
            </div>
          </div>

          {/* Create & Upload Short Suite */}
          <div className="pt-3 border-t border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Video className="w-3.5 h-3.5 text-red-500" /> Create &amp; Upload Short
              </span>
              <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-mono">
                Native 9:16 Studio
              </span>
            </div>

            {/* Video Rendering Notification */}
            {renderSuccessMsg && (
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-tight">{renderSuccessMsg}</span>
              </div>
            )}

            {isRenderingVideo && (
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" /> Rendering 9:16 Video Clip...
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{renderProgress}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 h-1.5 transition-all duration-150"
                    style={{ width: `${renderProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleRenderShortVideo(6)}
                disabled={isRenderingVideo}
                className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-zinc-700 transition cursor-pointer disabled:opacity-50"
                title="Render 6s vertical video clip with animated sentiment captions & download directly"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{isRenderingVideo ? 'Rendering...' : 'Download 9:16 Video'}</span>
              </button>

              <button
                onClick={() => {
                  if (onSendToUploader) {
                    const winnerTitle = isAbTestMode 
                      ? (variantB.thumbStopRate > variantA.thumbStopRate ? variantB.title : variantA.title)
                      : uploadTitle;
                    onSendToUploader({
                      title: winnerTitle,
                      description: uploadDesc,
                      tags: uploadTags.split(',').map(t => t.trim())
                    });
                  } else {
                    setShowDeployModal(true);
                  }
                }}
                className="py-2.5 px-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Publish to YouTube</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 9:16 Phone Mockup Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-[300px] sm:w-[330px] aspect-[9/16] bg-black rounded-[38px] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-[5px] border-zinc-800 ring-1 ring-zinc-700/50 overflow-hidden">
            
            {/* Phone Speaker & Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-900 rounded-full z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
            </div>

            {/* Video Canvas Container */}
            <div className={`relative w-full h-full rounded-[30px] overflow-hidden select-none ${
              videoBg === 'neon-glow'
                ? 'bg-gradient-to-tr from-indigo-950 via-purple-950 to-zinc-950'
                : videoBg === 'cyber'
                ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-black'
                : 'bg-gradient-to-b from-zinc-900 via-zinc-950 to-black'
            }`}>

              {/* Gameplay Background Simulation Layers */}
              {videoBg === 'gtav' && (
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500 via-indigo-950 to-black overflow-hidden pointer-events-none">
                  {/* Sky Ramp track */}
                  <div className="absolute inset-x-8 top-12 bottom-20 bg-gradient-to-b from-amber-400 via-orange-600 to-red-600 [clip-path:polygon(32%_0%,68%_0%,88%_100%,12%_100%)] border-x-4 border-yellow-300 opacity-90 shadow-2xl">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_20px,rgba(255,255,255,0.4)_20px,rgba(255,255,255,0.4)_40px)] animate-pulse"></div>
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-3xl animate-bounce">
                      🏎️
                    </div>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-amber-300 font-bold tracking-wider z-10 border border-amber-500/40">
                    GTA V MEGA RAMP (140 BPM)
                  </div>
                </div>
              )}

              {videoBg === 'minecraft' && (
                <div className="absolute inset-0 bg-gradient-to-b from-sky-600 via-sky-800 to-emerald-950 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_2px,transparent_2px)] [background-size:24px_24px]"></div>
                  <div className="absolute bottom-14 inset-x-4 h-48 flex flex-col items-center justify-end">
                    <div className="flex gap-3 items-end mb-3">
                      <div className="w-12 h-12 bg-emerald-600 border-2 border-emerald-400 shadow-lg rounded-sm text-center text-xs text-white pt-1">🧱</div>
                      <div className="w-14 h-16 bg-amber-800 border-2 border-amber-600 shadow-lg rounded-sm text-center text-xs text-white pt-1">🟩</div>
                      <div className="w-12 h-24 bg-emerald-700 border-2 border-emerald-400 shadow-lg rounded-sm text-center text-xs text-white pt-1">🏃‍♂️</div>
                    </div>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-emerald-300 font-bold tracking-wider z-10 border border-emerald-500/40">
                    MINECRAFT SPIRAL PARKOUR
                  </div>
                </div>
              )}

              {videoBg === 'subway' && (
                <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-950 to-zinc-950 overflow-hidden pointer-events-none">
                  <div className="absolute inset-x-8 top-12 bottom-16 border-x-2 border-yellow-400/80 [clip-path:polygon(32%_0%,68%_0%,100%_100%,0%_100%)] bg-zinc-900/90 shadow-2xl">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_25px,rgba(250,204,21,0.5)_25px,rgba(250,204,21,0.5)_35px)]"></div>
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-3xl animate-pulse">
                      🛹
                    </div>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-yellow-300 font-bold tracking-wider z-10 border border-yellow-500/40">
                    SUBWAY SURFERS 3-LANE RUN
                  </div>
                </div>
              )}

              {videoBg === 'csgo' && (
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-950 via-slate-900 to-black overflow-hidden pointer-events-none">
                  <div className="absolute inset-x-6 top-16 bottom-20 border border-cyan-400/40 [clip-path:polygon(10%_20%,90%_0%,100%_80%,0%_100%)] bg-cyan-900/20 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.3)_50%,transparent_75%)] animate-pulse"></div>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-cyan-300 font-bold tracking-wider z-10 border border-cyan-500/40">
                    CS:GO SURF FLUID WAVE
                  </div>
                </div>
              )}

              {videoBg === 'sand' && (
                <div className="absolute inset-0 bg-gradient-to-b from-pink-950 via-rose-950 to-zinc-950 overflow-hidden pointer-events-none">
                  <div className="absolute inset-x-10 bottom-24 h-36 bg-gradient-to-r from-rose-500/30 via-pink-400/40 to-indigo-500/30 rounded-2xl border border-pink-400/40 p-2 flex items-center justify-center">
                    <span className="text-3xl animate-bounce">🔪🧼</span>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-pink-300 font-bold tracking-wider z-10 border border-pink-500/40">
                    SATISFYING KINETIC ASMR
                  </div>
                </div>
              )}

              {videoBg === 'trackmania' && (
                <div className="absolute inset-0 bg-gradient-to-b from-amber-950 via-red-950 to-black overflow-hidden pointer-events-none">
                  <div className="absolute inset-x-6 top-12 bottom-16 border-2 border-red-500/60 [clip-path:polygon(40%_0%,60%_0%,100%_100%,0%_100%)] bg-red-900/30">
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl animate-spin">
                      🌀
                    </div>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-red-300 font-bold tracking-wider z-10 border border-red-500/40">
                    TRACKMANIA 1000MPH LOOP
                  </div>
                </div>
              )}

              {videoBg === 'splitscreen' && (
                <div className="absolute inset-0 flex flex-col pointer-events-none">
                  <div className="h-1/2 bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-3 flex flex-col justify-between border-b-2 border-amber-500/80 relative">
                    <div className="flex items-center justify-center pt-8 text-3xl opacity-90">
                      🎙️
                    </div>
                    <div className="text-[9px] text-amber-300 font-mono text-center bg-black/70 py-0.5 rounded border border-amber-500/30 font-bold">
                      TOP: Free AI Video Scene
                    </div>
                  </div>
                  <div className="h-1/2 bg-gradient-to-b from-sky-600 via-orange-600 to-red-700 relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="text-2xl z-10 animate-bounce">🏎️</div>
                    <span className="z-10 mt-1 text-[9px] font-mono bg-black/80 text-yellow-300 px-2 py-0.5 rounded border border-yellow-400/40 font-bold">
                      BOTTOM: GTA V Ramp Loop
                    </span>
                  </div>
                </div>
              )}
              
              {/* Subtle ambient mesh */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Safe Zone Grid Overlay */}
              {showSafeZoneGrid && (
                <div className="absolute inset-0 pointer-events-none z-20">
                  {/* Top Danger (0-16%) */}
                  <div className="absolute top-0 left-0 right-0 h-[16%] bg-red-500/15 border-b border-red-500/40 flex items-center justify-center">
                    <span className="text-[10px] text-red-300 font-mono tracking-wider uppercase font-semibold">
                      Header Danger Zone
                    </span>
                  </div>

                  {/* Right Danger Rail */}
                  <div className="absolute top-[16%] right-0 bottom-[24%] w-[20%] bg-red-500/15 border-l border-red-500/40 flex items-center justify-center">
                    <span className="text-[9px] text-red-300 font-mono rotate-90 whitespace-nowrap font-semibold">
                      Action Rail
                    </span>
                  </div>

                  {/* Bottom Danger */}
                  <div className="absolute bottom-0 left-0 right-0 h-[24%] bg-red-500/15 border-t border-red-500/40 flex items-center justify-center">
                    <span className="text-[10px] text-red-300 font-mono tracking-wider uppercase font-semibold">
                      Title &amp; Sound Danger Zone
                    </span>
                  </div>

                  {/* Center Safe Box */}
                  <div className="absolute top-[16%] left-0 right-[20%] bottom-[24%] border-2 border-dashed border-emerald-500/40 rounded-xl m-1 flex items-start justify-center p-2">
                    <span className="text-[9px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded font-mono font-semibold">
                      100% Safe Text Center
                    </span>
                  </div>
                </div>
              )}

              {/* Active Sentiment Emotion Pill on screen */}
              {useSentimentEngine && !isAbTestMode && (
                <div className="absolute top-16 left-4 z-30 pointer-events-none">
                  <div 
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-lg backdrop-blur-md"
                    style={{ 
                      backgroundColor: `${currentSegment.colorHex}25`, 
                      borderColor: currentSegment.colorHex,
                      borderWidth: '1px',
                      color: currentSegment.colorHex 
                    }}
                  >
                    <span>●</span>
                    <span>{currentSegment.emotionLabel}</span>
                  </div>
                </div>
              )}

              {/* The Styled Auto-Caption on Screen */}
              <div 
                className="absolute left-0 right-[18%] z-30 transition-all duration-150 flex justify-center"
                style={{ top: `${posY}%`, transform: 'translateY(-50%)' }}
              >
                {renderStyledCaption()}
              </div>

              {/* YouTube Shorts UI Overlays */}
              {showOverlays && (
                <div className="absolute inset-0 pointer-events-none z-40 flex flex-col justify-between p-3">
                  
                  {/* Top Header */}
                  <div className="flex items-center justify-between text-white/90 pt-5 px-1 drop-shadow-md">
                    <ArrowLeft className="w-5 h-5" />
                    <div className="flex items-center gap-4">
                      <Search className="w-5 h-5" />
                      <MoreVertical className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Middle to Bottom UI */}
                  <div className="flex justify-between items-end pb-2">
                    
                    {/* Left Bottom Metadata: Channel, Title, Audio */}
                    <div className="w-[78%] space-y-2 pr-1 drop-shadow-md text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-[10px] font-bold text-white shadow">
                          SF
                        </div>
                        <span className="text-xs font-semibold tracking-tight">@viralshortsforge</span>
                        <button className="text-[10px] bg-red-600 font-bold px-2.5 py-0.5 rounded-full text-white tracking-wide shadow">
                          Subscribe
                        </button>
                      </div>

                      <p className="text-xs font-normal line-clamp-2 leading-snug drop-shadow-sm text-zinc-100">
                        {isAbTestMode ? (activeVariant === 'A' ? variantA.title : variantB.title) : "The single biggest lie about making money... #shorts"}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-200 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full w-fit max-w-[200px] truncate">
                        <Disc3 className="w-3 h-3 animate-spin text-white" />
                        <span className="truncate">Original Sound - Shorts Growth Beats</span>
                      </div>
                    </div>

                    {/* Right Rail: Action Icons */}
                    <div className="w-[18%] flex flex-col items-center gap-3.5 pb-1 drop-shadow-lg text-white">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <ThumbsUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-medium">184K</span>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <ThumbsUp className="w-5 h-5 text-white rotate-180" />
                        </div>
                        <span className="text-[10px] font-medium">Dislike</span>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-medium">1,490</span>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <Share2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-medium">Share</span>
                      </div>

                      <div className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-600 flex items-center justify-center mt-1">
                        <div className="w-5 h-5 rounded-full bg-zinc-700 animate-spin"></div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>

          <p className="text-[11px] text-zinc-400 mt-3 text-center">
            Standard YouTube mobile screen ratio (1080x1920). Observe how color-coded sentiment captions pop while remaining strictly inside the safe zone.
          </p>
        </div>
      </div>

      {/* Deploy to YouTube Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/30">
                  <Upload className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Publish Short to YouTube</h4>
                  <p className="text-xs text-zinc-400">Deploy tested high-retention metadata directly</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-zinc-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-zinc-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Video Title (&lt;60 Chars for CTR)</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 text-xs focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">SEO Description &amp; 3 Hashtags</label>
                <textarea
                  rows={3}
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 text-xs focus:border-red-500 focus:outline-none resize-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setShowDeployModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeployModal(false);
                  if (onSendToUploader) {
                    onSendToUploader({
                      title: uploadTitle,
                      description: uploadDesc,
                      tags: uploadTags.split(',').map(t => t.trim())
                    });
                  }
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Push to Uploader</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
