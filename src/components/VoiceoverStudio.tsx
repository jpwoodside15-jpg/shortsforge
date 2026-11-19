import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, Play, Pause, RotateCcw, Download, Sparkles, Volume2, 
  VolumeX, ArrowRight, Check, AlertCircle, Radio, Clock,
  Sliders, Music, Zap, Layers, RefreshCw
} from 'lucide-react';

export interface VoiceOption {
  id: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  name: string;
  archetype: string;
  tagline: string;
  tone: string;
  recommendedFor: string;
  avatarBg: string;
  color: string;
  gender: 'Male' | 'Female' | 'Neutral';
  accent: string;
}

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: 'Puck',
    name: 'Puck',
    archetype: 'High-Energy Viral Host',
    tagline: 'MrBeast & challenge video style',
    tone: 'Rapid, enthusiastic, punchy',
    recommendedFor: 'Giveaways, stunts, fast curiosities, street interviews',
    avatarBg: 'from-blue-600 to-cyan-500',
    color: '#3b82f6',
    gender: 'Male',
    accent: 'US Modern'
  },
  {
    id: 'Charon',
    name: 'Charon',
    archetype: 'Deep Cinematic Narrator',
    tagline: 'True crime, space & mystery',
    tone: 'Resonant, authoritative, suspenseful',
    recommendedFor: 'Historical mysteries, ocean depths, horror, dark psychology',
    avatarBg: 'from-purple-700 to-indigo-900',
    color: '#a855f7',
    gender: 'Male',
    accent: 'Deep Bass'
  },
  {
    id: 'Kore',
    name: 'Kore',
    archetype: 'Articulate Tech & Science Explainer',
    tagline: 'Veritasium & Cleo Abram style',
    tone: 'Crystal-clear, warm, highly intelligent',
    recommendedFor: 'AI tools, science breakthroughs, budget experiments, money tips',
    avatarBg: 'from-emerald-600 to-teal-500',
    color: '#10b981',
    gender: 'Female',
    accent: 'Polished Pro'
  },
  {
    id: 'Fenrir',
    name: 'Fenrir',
    archetype: 'Commanding Alpha Authority',
    tagline: 'Alex Hormozi & fitness discipline',
    tone: 'Direct, candid, high-stakes',
    recommendedFor: 'Business advice, hard truths, fitness motivation, contrarian facts',
    avatarBg: 'from-amber-600 to-red-600',
    color: '#f59e0b',
    gender: 'Male',
    accent: 'Grounded Baritone'
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    archetype: 'Charismatic Storyteller',
    tagline: 'Zach King & lifestyle comedy',
    tone: 'Friendly, playful, expressive',
    recommendedFor: 'Daily vlogs, life hacks, humor, visual magic, travel',
    avatarBg: 'from-sky-500 to-indigo-500',
    color: '#38bdf8',
    gender: 'Female',
    accent: 'Conversational'
  }
];

const PRESET_SCRIPTS = [
  {
    label: 'High-Stakes Cash Hook',
    text: 'If you can stay inside this circle for the next 30 seconds, I will literally hand you this bag with ten thousand dollars in cash. Your time starts right now!'
  },
  {
    label: 'Contrarian Business Truth',
    text: 'Saving money in your twenties is mathematically the worst mistake you can make. The real wealth equation is investing exclusively in your own earning velocity.'
  },
  {
    label: 'Sci-Fi Future Explainer',
    text: 'Scientists just achieved net positive energy inside a nuclear fusion reactor. This means in our lifetime, limitless clean energy is no longer science fiction.'
  },
  {
    label: 'Circular Loop Hook',
    text: 'The biggest secret to beating the YouTube algorithm is not your thumbnail or tags. It is keeping the viewer mesmerized until they realize the real trick is...'
  }
];

interface VoiceoverStudioProps {
  initialScript?: string;
  initialVoice?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  onSendToClipper?: (audioUrl?: string, scriptText?: string) => void;
  onSendToCopywriter?: (scriptText: string) => void;
}

export const VoiceoverStudio: React.FC<VoiceoverStudioProps> = ({
  initialScript = 'If you think you know how viral videos actually work, you are in for a massive shock. Watch what happens in the next 3 seconds!',
  initialVoice = 'Puck',
  onSendToClipper,
  onSendToCopywriter
}) => {
  const [script, setScript] = useState<string>(initialScript);
  const [selectedVoice, setSelectedVoice] = useState<'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr'>(initialVoice);
  const [speed, setSpeed] = useState<number>(1.0);
  const [emotion, setEmotion] = useState<string>('high-energy');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [generationEngine, setGenerationEngine] = useState<'gemini' | 'browser' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sync when initialScript changes
  useEffect(() => {
    if (initialScript) {
      setScript(initialScript);
    }
  }, [initialScript]);

  useEffect(() => {
    if (initialVoice) {
      setSelectedVoice(initialVoice);
    }
  }, [initialVoice]);

  // Estimate speech duration based on ~150 words per minute at 1.0x
  const wordCount = script.trim().split(/\s+/).filter(Boolean).length;
  const charCount = script.length;
  const estimatedSeconds = Math.max(1, Math.round((wordCount / (150 * speed)) * 60));
  const isShortsOptimized = estimatedSeconds <= 58;

  // Cleanup audio url on unmount
  useEffect(() => {
    return () => {
      if (audioUrl && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioUrl]);

  // Audio waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const renderWave = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 36;
      const barWidth = canvas.width / bars - 2;

      for (let i = 0; i < bars; i++) {
        let height = 6;
        if (isPlaying) {
          const waveFactor = Math.sin((i * 0.4) + (frame * 0.15)) * 0.5 + 0.5;
          const randomJitter = Math.sin((i * 1.2) + (frame * 0.2)) * 0.3;
          height = Math.max(6, Math.min(canvas.height - 4, (canvas.height * 0.8) * (waveFactor + randomJitter)));
        } else if (audioUrl) {
          height = Math.max(6, Math.sin(i * 0.5) * 16 + 18);
        }

        const x = i * (barWidth + 2);
        const y = (canvas.height - height) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + height);
        grad.addColorStop(0, '#ef4444');
        grad.addColorStop(0.5, '#f59e0b');
        grad.addColorStop(1, '#3b82f6');

        ctx.fillStyle = isPlaying ? grad : '#52525b';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, audioUrl]);

  const handleGenerateVoiceover = async () => {
    if (!script.trim()) return;
    setIsGenerating(true);
    setErrorMsg(null);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    try {
      const res = await fetch('/api/generate-voiceover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: script,
          voice: selectedVoice,
          speed,
          emotion
        })
      });

      const data = await res.json();

      if (data.success && data.audioBase64) {
        // High fidelity WAV from Gemini TTS!
        const binaryStr = atob(data.audioBase64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setGenerationEngine('gemini');
      } else {
        // Use browser speech synthesis engine
        triggerBrowserSpeechFallback();
      }
    } catch (err: any) {
      console.warn('Backend TTS failed, using browser speech engine:', err);
      triggerBrowserSpeechFallback();
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerBrowserSpeechFallback = () => {
    if (!('speechSynthesis' in window)) {
      setErrorMsg('Speech synthesis not supported in this environment.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = speed;
    
    // Choose closest available browser voice based on gender / name
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const isFemale = selectedVoice === 'Kore' || selectedVoice === 'Zephyr';
      const matched = voices.find(v => isFemale ? (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha')) : (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Alex')));
      if (matched) utterance.voice = matched;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setGenerationEngine('browser');
    };
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setAudioUrl('browser-tts');
    setDuration(estimatedSeconds);
  };

  const togglePlayback = () => {
    if (audioUrl === 'browser-tts') {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          setIsPlaying(true);
        } else {
          triggerBrowserSpeechFallback();
        }
      }
      return;
    }

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error(e));
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current && audioUrl !== 'browser-tts') {
      audioRef.current.currentTime = val;
    }
  };

  const handleDownload = () => {
    if (!audioUrl || audioUrl === 'browser-tts') {
      // Create quick WAV synthesis fallback download or prompt
      alert('High-fidelity audio rendered directly via stream. Copying voiceover script text to clipboard.');
      navigator.clipboard.writeText(script);
      return;
    }
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `voiceover_${selectedVoice.toLowerCase()}_${Date.now()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyScriptText = () => {
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background ambient flare */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden audio element for WAV playback */}
      {audioUrl && audioUrl !== 'browser-tts' && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
        />
      )}

      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-950/40">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                AI Voice Over Studio &amp; Script Narration
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Gemini TTS &amp; Browser Engine
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Generate studio-grade voiceovers for competitor response scripts, 3-second hooks, and full Shorts narrations
              </p>
            </div>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] font-medium text-zinc-500 whitespace-nowrap mr-1">
            Presets:
          </span>
          {PRESET_SCRIPTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setScript(preset.text)}
              className="px-2.5 py-1 text-[11px] rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/60 transition whitespace-nowrap"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left Column: Voice Archetype Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-400" />
              1. Select AI Voice Archetype
            </label>
            <span className="text-[11px] text-zinc-500 font-mono">5 Voices Available</span>
          </div>

          <div className="space-y-2.5">
            {VOICE_OPTIONS.map((v) => {
              const isSelected = selectedVoice === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-zinc-800/90 border-red-500/70 shadow-md shadow-red-950/20'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-850'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${v.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow`}>
                      {v.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{v.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 font-mono">
                            {v.gender} • {v.accent}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>
                      <div className="text-xs font-medium text-red-400/90 mt-0.5">{v.archetype}</div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{v.tagline}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Tone & Speed Settings */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3">
            <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Delivery Pace &amp; Emotional Stance
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-zinc-400 mb-1 block">Emotional Pacing</label>
                <select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="high-energy">🔥 High-Energy / Viral Hype</option>
                  <option value="suspenseful">🕵️ Suspenseful Mystery</option>
                  <option value="authoritative">💼 Direct Authority</option>
                  <option value="conversational">☕ Casual &amp; Relatable</option>
                  <option value="dramatic">⚡ Dramatic Stakes</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                  <span>Playback Speed</span>
                  <span className="font-mono text-amber-400">{speed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.05"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Script Narration Editor & Waveform Player */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-red-400" />
                2. Narration Script (<span className="text-white">{wordCount} words</span>)
              </label>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                  isShortsOptimized
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  Est: ~{estimatedSeconds}s {isShortsOptimized ? '(Shorts Safe <60s)' : '(Exceeds 60s)'}
                </span>

                <button
                  onClick={copyScriptText}
                  className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition"
                  title="Copy Script"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Layers className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Type or paste the Shorts narration script here..."
              rows={6}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30 transition resize-none leading-relaxed font-sans"
            />
          </div>

          {/* Action Trigger Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleGenerateVoiceover}
              disabled={isGenerating || !script.trim()}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating AI Voice with {selectedVoice}...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  Generate Voiceover with {selectedVoice}
                </>
              )}
            </button>

            <button
              onClick={triggerBrowserSpeechFallback}
              className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold border border-zinc-700 flex items-center gap-1.5 transition cursor-pointer"
              title="Instant test with local browser TTS"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Instant Browser Preview
            </button>
          </div>

          {/* Player & Waveform Visualizer Display */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${audioUrl ? (isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400') : 'bg-zinc-600'}`} />
                <span className="font-semibold text-white">
                  {audioUrl 
                    ? (generationEngine === 'gemini' ? 'Gemini 24kHz High-Res Voice' : 'Browser Synthesis Audio')
                    : 'Awaiting Voiceover Generation'}
                </span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400">
                {Math.floor(currentTime)}s / {Math.floor(duration || estimatedSeconds)}s
              </span>
            </div>

            {/* Canvas Animated Waveform */}
            <div className="h-12 bg-zinc-900/90 rounded-lg p-1.5 border border-zinc-800 flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={500}
                height={40}
                className="w-full h-full"
              />
            </div>

            {/* Audio Scrubber */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayback}
                disabled={!audioUrl}
                className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition shadow-md shadow-red-950/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <input
                type="range"
                min="0"
                max={duration || estimatedSeconds || 10}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                disabled={!audioUrl || audioUrl === 'browser-tts'}
                className="flex-1 accent-red-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />

              <button
                onClick={handleDownload}
                disabled={!audioUrl}
                className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition disabled:opacity-40"
                title="Download Audio (.WAV)"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Cross-Studio Workflow Connectors */}
            <div className="pt-2 border-t border-zinc-850 flex items-center justify-between">
              <div className="text-[11px] text-zinc-500">
                ShortsForge Cross-Module Suite Actions:
              </div>

              <div className="flex items-center gap-2">
                {onSendToClipper && (
                  <button
                    onClick={() => onSendToClipper(audioUrl || undefined, script)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold flex items-center gap-1 transition"
                  >
                    Send to Video Clipper
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {onSendToCopywriter && (
                  <button
                    onClick={() => onSendToCopywriter(script)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold flex items-center gap-1 transition"
                  >
                    Send to Copywriter
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
