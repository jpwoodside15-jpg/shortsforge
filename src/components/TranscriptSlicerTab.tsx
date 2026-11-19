import React, { useState } from 'react';
import { 
  Scissors, Sparkles, Copy, Check, Terminal, Play, 
  HelpCircle, Eye, ShieldAlert, Award, FileText, ArrowRight, Video 
} from 'lucide-react';
import { SAMPLE_TRANSCRIPTS } from '../data/sampleTranscripts';
import { TranscriptClip, TranscriptSliceResult } from '../types';

interface TranscriptSlicerTabProps {
  onSendToSimulator?: (hookText: string) => void;
  incomingTranscript?: string;
  incomingContext?: string;
}

export const TranscriptSlicerTab: React.FC<TranscriptSlicerTabProps> = ({ 
  onSendToSimulator,
  incomingTranscript,
  incomingContext
}) => {
  const [transcriptText, setTranscriptText] = useState(incomingTranscript || SAMPLE_TRANSCRIPTS[0].text);
  const [selectedPresetId, setSelectedPresetId] = useState(SAMPLE_TRANSCRIPTS[0].id);
  const [videoContext, setVideoContext] = useState(incomingContext || 'Alex Hormozi podcast breakdown on pricing psychology');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranscriptSliceResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  React.useEffect(() => {
    if (incomingTranscript) {
      setTranscriptText(incomingTranscript);
      if (incomingContext) {
        setVideoContext(incomingContext);
      }
    }
  }, [incomingTranscript, incomingContext]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSelectPreset = (id: string) => {
    const found = SAMPLE_TRANSCRIPTS.find((t) => t.id === id);
    if (found) {
      setSelectedPresetId(id);
      setTranscriptText(found.text);
      setVideoContext(`${found.speaker} - ${found.title}`);
    }
  };

  const handleSlice = async () => {
    if (!transcriptText.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/slice-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcriptText, videoContext })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-indigo-950/40 border border-red-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                <Scissors className="w-5 h-5 text-red-500" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">AI Transcript Slicer &amp; Viral Data Analyst</h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Acts as an expert YouTube Shorts editor to discover the top 3 standalone 30-50s clips from long-form video transcripts. Identifies the exact starting &amp; ending phrases, 3-second retention hooks, and psychological reasons for virality.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Gemini 3.8 Flash Analysis
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Transcript */}
        <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-400" /> Paste Video Transcript
            </h3>
            <span className="text-xs text-zinc-400">
              {transcriptText.length} characters
            </span>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
              Load Verified Viral Long-Form Transcript:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_TRANSCRIPTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`px-2.5 py-2 rounded-xl text-left text-xs transition-all border ${
                    selectedPresetId === preset.id
                      ? 'bg-red-500/15 border-red-500/80 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="truncate font-semibold">{preset.speaker}</div>
                  <div className="text-[10px] text-zinc-500 truncate">{preset.category}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Transcript Text (With or without timestamps)
            </label>
            <textarea
              rows={11}
              value={transcriptText}
              onChange={(e) => {
                setTranscriptText(e.target.value);
                setSelectedPresetId('');
              }}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-300 font-mono focus:outline-none focus:border-red-500 placeholder-zinc-600 resize-none leading-relaxed"
              placeholder="Paste your downloaded YouTube transcript text here..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Video Context / Source Info
            </label>
            <input
              type="text"
              value={videoContext}
              onChange={(e) => setVideoContext(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
              placeholder="e.g. Lex Fridman podcast interview with Sam Altman"
            />
          </div>

          <button
            onClick={handleSlice}
            disabled={isLoading || !transcriptText.trim()}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Scanning 30-50s Retention Hooks...</span>
              </>
            ) : (
              <>
                <Scissors className="w-4 h-4 text-white" />
                <span>Locate Top 3 Viral Shorts Clips</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Detected Viral Clips */}
        <div className="lg:col-span-7 space-y-5">
          {!result && !isLoading && (
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[440px]">
              <div className="w-14 h-14 bg-zinc-800/80 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                <Scissors className="w-7 h-7 text-red-400" />
              </div>
              <h4 className="text-base font-semibold text-white">Surgical Clip Detector Ready</h4>
              <p className="text-zinc-400 text-xs mt-1.5 max-w-md">
                Our AI analyzes transcripts like a human retention director. It locates 30-50s standalone segments with high-energy first-3-second hooks, complete thoughts, and shocking claims.
              </p>
              <button
                onClick={handleSlice}
                className="mt-5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 border border-zinc-700"
              >
                Analyze Selected Transcript <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {isLoading && (
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[440px]">
              <div className="w-12 h-12 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-semibold text-white">Parsing Audio Transcript Timestamps &amp; Cadence...</p>
              <p className="text-xs text-zinc-400 mt-1">Filtering out incomplete thoughts and pinpointing psychological hooks.</p>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Top {result.clips?.length || 3} High-Retention Segments Extracted
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{result.summary}</p>
                </div>
              </div>

              {/* Clips List */}
              {result.clips?.map((clip, idx) => (
                <div
                  key={clip.clipId || idx}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl p-5 space-y-4 transition-all"
                >
                  {/* Clip Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center text-xs font-mono font-bold">
                        #{clip.clipId || idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{clip.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                          <span className="font-mono text-amber-400 font-bold">⏱️ Duration: {clip.duration}</span>
                          <span>•</span>
                          <span className="font-mono text-zinc-300">
                            Timestamps: {clip.startTime} ➔ {clip.endTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                        Viral Score: {clip.viralScore || 92}/100
                      </span>
                    </div>
                  </div>

                  {/* 1. Exact Starting and Ending Phrases */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                        🟢 Exact Starting Phrase (Cut IN)
                      </span>
                      <p className="text-xs text-white font-medium bg-zinc-900/80 p-2 rounded border border-zinc-800">
                        &quot;{clip.startPhrase}&quot;
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block mb-1">
                        🔴 Exact Ending Phrase (Cut OUT)
                      </span>
                      <p className="text-xs text-white font-medium bg-zinc-900/80 p-2 rounded border border-zinc-800">
                        &quot;{clip.endPhrase}&quot;
                      </p>
                    </div>
                  </div>

                  {/* 2. Psychological Reason & Hook Analysis */}
                  <div className="space-y-2">
                    <div className="text-xs text-zinc-300 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 flex items-start gap-2.5">
                      <span className="p-1 bg-amber-500/10 text-amber-400 rounded shrink-0 font-bold text-[10px] uppercase">
                        Psychology Hook
                      </span>
                      <div className="text-xs leading-relaxed">
                        <span className="font-semibold text-white">Why viewers won&apos;t swipe: </span>
                        {clip.psychologicalReason}
                      </div>
                    </div>

                    {clip.editingDirection && (
                      <div className="text-xs text-zinc-400 bg-zinc-950/30 p-2.5 rounded-lg border border-zinc-800/50 flex items-start gap-2">
                        <span className="text-indigo-400 font-bold shrink-0 text-[11px]">🎬 CapCut Tip:</span>
                        <span>{clip.editingDirection}</span>
                      </div>
                    )}
                  </div>

                  {/* 3. Ready-To-Run FFmpeg Cut Command */}
                  <div className="bg-black/90 p-3 rounded-xl border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-red-400" /> Surgical FFmpeg Crop Command
                      </span>
                      <button
                        onClick={() => handleCopy(clip.ffmpegCommand, `ffmpeg-${idx}`)}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1"
                      >
                        {copiedKey === `ffmpeg-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>
                    <code className="text-xs font-mono text-emerald-400 block break-all select-all">
                      {clip.ffmpegCommand}
                    </code>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    {onSendToSimulator && (
                      <button
                        onClick={() => onSendToSimulator(clip.title)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-zinc-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Preview Hook in 9:16 Safe-Zone</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
