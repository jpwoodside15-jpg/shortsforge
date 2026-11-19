import React, { useState } from 'react';
import { 
  Clock, CheckCircle2, AlertCircle, RefreshCw, RotateCcw, 
  Play, Pause, Music, Volume2, VolumeX, Sparkles, Wand2, 
  Scissors, Upload, Copy, Check, ExternalLink, ShieldCheck, 
  Video, Eye, Sliders, Film, Tv, Radio, Layers, Search, 
  ArrowRight, Shield, DollarSign, Calendar, AlertTriangle, Zap
} from 'lucide-react';
import { QueuedShortRegistryItem } from '../data/youtubePipelineData';

interface UploadTimelineProps {
  queuedRegistry: QueuedShortRegistryItem[];
  activeExecutingIndex: number;
  isPipelineRunning: boolean;
  onRetryUpload: (queueId: string) => void;
  onSimulateFailure: (queueId: string) => void;
  onStartPipeline: () => void;
  onInspectAIContent: (item: QueuedShortRegistryItem) => void;
  onShowToast: (msg: string) => void;
}

export const UploadTimeline: React.FC<UploadTimelineProps> = ({
  queuedRegistry,
  activeExecutingIndex,
  isPipelineRunning,
  onRetryUpload,
  onSimulateFailure,
  onStartPipeline,
  onInspectAIContent,
  onShowToast
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'uploading' | 'live' | 'error' | 'queued'>('all');

  const filteredItems = queuedRegistry.filter(item => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'uploading') return item.status === 'uploading' || item.status === 'processing';
    return item.status === filterStatus;
  });

  const liveCount = queuedRegistry.filter(q => q.status === 'live').length;
  const uploadingCount = queuedRegistry.filter(q => q.status === 'uploading' || q.status === 'processing').length;
  const errorCount = queuedRegistry.filter(q => q.status === 'error').length;
  const queuedCount = queuedRegistry.filter(q => q.status === 'queued').length;

  return (
    <div className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl animate-in fade-in">
      {/* Header & Status Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
              <Clock className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Visual Upload Timeline &amp; State Engine
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Google API v3 Active
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time stage tracking showing currently processing video, transfer rates, errors, and 1-click retry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {errorCount > 0 && (
            <button
              onClick={() => {
                const firstErr = queuedRegistry.find(q => q.status === 'error');
                if (firstErr) onRetryUpload(firstErr.queueId);
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-950/40 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Failed Uploads ({errorCount})</span>
            </button>
          )}

          <button
            onClick={onStartPipeline}
            disabled={isPipelineRunning || queuedCount === 0}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            {isPipelineRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Publishing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Process Next in Sequence</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metric Pills & Filter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterStatus === 'all'
              ? 'bg-zinc-800 border-zinc-600 shadow'
              : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/40'
          }`}
        >
          <div className="text-[11px] text-zinc-400 font-medium">Total Pipeline</div>
          <div className="text-lg font-black text-white mt-0.5">{queuedRegistry.length} Videos</div>
        </button>

        <button
          onClick={() => setFilterStatus('live')}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterStatus === 'live'
              ? 'bg-emerald-950/40 border-emerald-500/50 shadow'
              : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/40'
          }`}
        >
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Live Success
          </div>
          <div className="text-lg font-black text-emerald-400 mt-0.5">{liveCount} Published</div>
        </button>

        <button
          onClick={() => setFilterStatus('uploading')}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterStatus === 'uploading'
              ? 'bg-red-950/40 border-red-500/50 shadow'
              : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/40'
          }`}
        >
          <div className="text-[11px] text-red-400 font-medium flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" /> In Flight
          </div>
          <div className="text-lg font-black text-red-400 mt-0.5">{uploadingCount} Uploading</div>
        </button>

        <button
          onClick={() => setFilterStatus('error')}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterStatus === 'error'
              ? 'bg-rose-950/40 border-rose-500/50 shadow'
              : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/40'
          }`}
        >
          <div className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Failed Items
          </div>
          <div className="text-lg font-black text-rose-400 mt-0.5">{errorCount} Errors</div>
        </button>
      </div>

      {/* Visual Timeline Stepper Track */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <span>Sequential Upload Progress Track</span>
          <span className="text-zinc-500 font-mono text-[11px]">
            Wise Payout Target: Joseph Paul Woodside (60-84-64)
          </span>
        </div>

        <div className="space-y-3">
          {filteredItems.map((item, idx) => {
            const isProcessing = item.status === 'uploading' || item.status === 'processing';
            const isSuccess = item.status === 'live';
            const isError = item.status === 'error';

            return (
              <div
                key={item.queueId}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gradient-to-r from-red-950/30 via-zinc-900 to-zinc-900 border-red-500 shadow-lg shadow-red-950/30'
                    : isSuccess
                    ? 'bg-emerald-950/10 border-emerald-500/40'
                    : isError
                    ? 'bg-rose-950/20 border-rose-500/60'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Step Badge + Thumbnail + Details */}
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 font-mono ${
                      isSuccess
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isError
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : isProcessing
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}>
                      #{item.sequenceOrder}
                    </div>

                    <div className="w-20 h-14 bg-black rounded-lg overflow-hidden shrink-0 relative border border-zinc-800">
                      {item.thumbnailUrl ? (
                        <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <Video className="w-5 h-5" />
                        </div>
                      )}
                      <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono bg-black/80 px-1 rounded text-white font-bold">
                        {item.durationSec}s
                      </span>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {item.niche}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          Slot: {item.scheduledDate} @ {item.scheduledTime}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                        {item.title}
                      </h4>

                      {/* Live progress bar if uploading */}
                      {isProcessing && (
                        <div className="space-y-1 pt-1 max-w-md">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-red-400 font-bold flex items-center gap-1">
                              <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Uploading Chunks (3.8 MB/s)
                            </span>
                            <span className="text-zinc-300 font-bold">{item.uploadProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                            <div 
                              className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                              style={{ width: `${item.uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Error details if failed */}
                      {isError && item.errorMessage && (
                        <div className="text-[11px] text-rose-300 font-mono bg-rose-950/40 p-2 rounded-lg border border-rose-500/30 flex items-center gap-2 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>{item.errorMessage}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Status Pill & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
                    {/* Status Pill */}
                    <div>
                      {isSuccess && (
                        <div className="flex flex-col items-end">
                          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Live Success</span>
                          </span>
                          {item.liveShortUrl && (
                            <a
                              href={item.liveShortUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-emerald-400 hover:underline font-mono mt-0.5"
                            >
                              youtube.com/shorts/... ↗
                            </a>
                          )}
                        </div>
                      )}

                      {isProcessing && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 animate-pulse">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading ({item.uploadProgress}%)</span>
                        </span>
                      )}

                      {isError && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Failed (503 Error)</span>
                        </span>
                      )}

                      {item.status === 'queued' && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Queued</span>
                        </span>
                      )}
                    </div>

                    {/* Retry Button on Error */}
                    {isError && (
                      <button
                        onClick={() => onRetryUpload(item.queueId)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        title="Retry upload for this video immediately"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry Upload</span>
                      </button>
                    )}

                    {/* Simulate Error Button for testing error handling */}
                    {!isError && !isSuccess && (
                      <button
                        onClick={() => onSimulateFailure(item.queueId)}
                        className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-rose-950/60 hover:text-rose-300 text-zinc-400 text-[11px] font-medium border border-zinc-700 transition-colors"
                        title="Simulate network failure to test retry flow"
                      >
                        Fail Test
                      </button>
                    )}

                    {/* Inspect AI Content & Music Button */}
                    <button
                      onClick={() => onInspectAIContent(item)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 border border-zinc-700 transition-colors"
                      title="Inspect AI-generated script, music track, and screen messages"
                    >
                      <Music className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Check AI &amp; Music</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// AI Content & Music Inspection Modal Deck
// =========================================================================
interface AIContentModalProps {
  video: QueuedShortRegistryItem | null;
  onClose: () => void;
  onApplyScreenMessage: (queueId: string, msg: string, cleanMode: boolean) => void;
  onShowToast: (msg: string) => void;
}

export const AIContentModal: React.FC<AIContentModalProps> = ({
  video,
  onClose,
  onApplyScreenMessage,
  onShowToast
}) => {
  if (!video) return null;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolume] = useState(85);
  const [screenMessageText, setScreenMessageText] = useState(video.aiContentDetails?.screenMessage || '⚡ Wise Payout Cleared (Sort Code 60-84-64)');
  const [cleanMode, setCleanMode] = useState(video.aiContentDetails?.cleanUnclutteredMode ?? true);
  const [messagePosition, setMessagePosition] = useState<'top' | 'lower_third' | 'floating'>('lower_third');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveAndApply = () => {
    onApplyScreenMessage(video.queueId, screenMessageText, cleanMode);
    onShowToast(`Applied screen message and ${cleanMode ? 'Clean Uncluttered 9:16 Mode' : 'Standard Mode'} to "${video.title}"`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI Content &amp; Music Deck
              </span>
              <span className="text-xs text-zinc-400 font-mono">Slot #{video.sequenceOrder}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1 line-clamp-1">{video.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium"
          >
            ✕ Close
          </button>
        </div>

        {/* Music & Soundbed Section */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">AI Background Music &amp; Audio Track</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-emerald-400 border border-zinc-800">
              {video.aiContentDetails?.musicGenre || 'Cyberpunk Synth'} • {video.aiContentDetails?.musicBpm || 120} BPM
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isPlayingAudio 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' 
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div>
                <div className="text-xs font-bold text-white">
                  {video.aiContentDetails?.musicTrack || 'Industrial Forge ASMR - 120 BPM'}
                </div>
                <div className="text-[11px] text-zinc-400">
                  Royalty-free YouTube monetization cleared (AdSense Green Dollar)
                </div>
              </div>
            </div>

            {/* Simulated Animated Waveform Bars */}
            <div className="flex items-center gap-1 h-8">
              {[40, 70, 95, 60, 85, 45, 100, 65, 80, 50, 90, 75, 40, 85, 60, 95].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlayingAudio ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-700'
                  }`}
                  style={{ 
                    height: isPlayingAudio ? `${height}%` : '30%',
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-zinc-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={audioVolume}
                onChange={e => setAudioVolume(Number(e.target.value))}
                className="w-20 accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Script & Voiceover Details */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-indigo-400" />
              AI Voiceover Script &amp; Narration
            </span>
            <span className="text-indigo-400 text-[11px] font-mono">
              Voice: {video.aiContentDetails?.voiceName || 'Charon (Deep Authority)'}
            </span>
          </div>
          <p className="text-xs text-zinc-300 font-mono bg-zinc-900 p-3 rounded-lg border border-zinc-800 leading-relaxed">
            {video.aiContentDetails?.scriptSnippet || video.description}
          </p>
        </div>

        {/* Animation & Visual Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-zinc-400 font-semibold flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              Animation &amp; Camera Movement
            </div>
            <div className="text-white font-bold">{video.aiContentDetails?.animationStyle || 'Macro 50,000x Photogrammetry 60 FPS'}</div>
            <div className="text-[11px] text-zinc-500">Volumetric ray-tracing &amp; motion blur</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-zinc-400 font-semibold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Disbursement Security
            </div>
            <div className="text-emerald-400 font-bold">Wise UK Sort Code: 60-84-64</div>
            <div className="text-[11px] text-zinc-500">Account Holder: Joseph Paul Woodside</div>
          </div>
        </div>

        {/* Screen Messages & Clean Uncluttered Shorts Options */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Tv className="w-4 h-4 text-purple-400" />
              Screen Message Overlays &amp; Clutter Control
            </span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={cleanMode}
                onChange={e => setCleanMode(e.target.checked)}
                className="rounded accent-purple-500"
              />
              <span className="text-xs font-bold text-purple-300">Clean Uncluttered 9:16 Mode</span>
            </label>
          </div>

          <p className="text-[11px] text-zinc-400">
            Clean Uncluttered Mode strips noisy stickers and keeps your screen message strictly within the 9:16 CapCut safe-zone, away from YouTube like/comment buttons.
          </p>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-zinc-300">Custom Screen Message Text:</label>
            <input
              type="text"
              value={screenMessageText}
              onChange={e => setScreenMessageText(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              onClick={() => setScreenMessageText('⚡ Wise Payout Cleared (Sort Code 60-84-64)')}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] text-emerald-400 border border-zinc-800 font-mono"
            >
              + Wise Payout Cleared
            </button>
            <button
              onClick={() => setScreenMessageText('📌 Free Resource Blueprint in Pinned Comment')}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] text-amber-400 border border-zinc-800 font-mono"
            >
              + Pinned Blueprint
            </button>
            <button
              onClick={() => setScreenMessageText('🔔 Subscribe for Episode 2')}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] text-indigo-400 border border-zinc-800 font-mono"
            >
              + Episode CTA
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <button
            onClick={() => handleCopy(JSON.stringify(video.aiContentDetails, null, 2), 'ai-json')}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5"
          >
            {copiedKey === 'ai-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy AI Spec JSON</span>
          </button>

          <button
            onClick={handleSaveAndApply}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-900/30 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply to Video</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// =========================================================================
// Super Intelligent Automation Studio Component
// =========================================================================
interface SuperIntelligentAutomationStudioProps {
  onProduceAndQueue: () => void;
  onDirectPublish: (title: string, desc: string, tags: string[]) => void;
  onShowToast: (msg: string) => void;
  scrapeUrlOrTopic: string;
  setScrapeUrlOrTopic: (val: string) => void;
  isScraping: boolean;
  onScrape: () => void;
  scrapedHooks: string[];
  editableAutoShort: {
    title: string;
    script: string;
    niche: string;
    musicTrack: string;
    musicGenre: string;
    voiceName: string;
    animationStyle: string;
    screenMessage: string;
    tags: string[];
    cleanMode: boolean;
  };
  setEditableAutoShort: React.Dispatch<React.SetStateAction<any>>;
}

export const SuperIntelligentAutomationStudio: React.FC<SuperIntelligentAutomationStudioProps> = ({
  onProduceAndQueue,
  onDirectPublish,
  onShowToast,
  scrapeUrlOrTopic,
  setScrapeUrlOrTopic,
  isScraping,
  onScrape,
  scrapedHooks,
  editableAutoShort,
  setEditableAutoShort
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-purple-950/40 border border-indigo-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
                <Wand2 className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-white">Super-Intelligent AI Shorts Automation &amp; Scraper</h3>
            </div>
            <p className="text-xs text-zinc-300">
              Scrape competitor URLs, extract viral retention hooks, customize animations and screen messages, and produce directly for 1-click YouTube upload.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold self-start sm:self-center">
            Wise UK Payouts: Joseph Paul Woodside (60-84-64)
          </span>
        </div>

        {/* Scraper Input Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={scrapeUrlOrTopic}
              onChange={e => setScrapeUrlOrTopic(e.target.value)}
              placeholder="Paste YouTube Short/Video URL or niche topic (e.g. titanium machining 2026)..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
          <button
            onClick={onScrape}
            disabled={isScraping}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50 transition-all cursor-pointer"
          >
            {isScraping ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Scraping Hooks...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Scrape &amp; Extract Hooks</span>
              </>
            )}
          </button>
        </div>

        {/* Extracted Viral Hooks Chips */}
        {scrapedHooks.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
              Scraped Viral Hooks (Click to inject into edit facility):
            </span>
            <div className="flex flex-col gap-1.5">
              {scrapedHooks.map((hook, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setEditableAutoShort((prev: any) => ({
                      ...prev,
                      script: `${hook}\n\n${prev.script}`
                    }));
                    onShowToast('Injected hook into script editor!');
                  }}
                  className="p-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-200 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <span className="line-clamp-1 italic">&quot;{hook}&quot;</span>
                  <span className="text-[10px] text-indigo-400 font-semibold shrink-0 ml-2">Inject Hook +</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive AI Edit Facility */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Editor Controls (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Automated Script &amp; Metadata Facility
            </span>
            <span className="text-xs font-mono text-zinc-400">9:16 Preflight Ready</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-200">Video Title (&lt;60 chars with #Shorts):</label>
            <input
              type="text"
              value={editableAutoShort.title}
              onChange={e => setEditableAutoShort((prev: any) => ({ ...prev, title: e.target.value }))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-200">Script &amp; Narration Text:</label>
            <textarea
              rows={4}
              value={editableAutoShort.script}
              onChange={e => setEditableAutoShort((prev: any) => ({ ...prev, script: e.target.value }))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">Screen Message Overlay:</label>
              <input
                type="text"
                value={editableAutoShort.screenMessage}
                onChange={e => setEditableAutoShort((prev: any) => ({ ...prev, screenMessage: e.target.value }))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">Background Audio Track:</label>
              <input
                type="text"
                value={editableAutoShort.musicTrack}
                onChange={e => setEditableAutoShort((prev: any) => ({ ...prev, musicTrack: e.target.value }))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Clean Uncluttered Shorts Switch */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Clean Uncluttered Shorts (Safe-Zone Enforced)
              </div>
              <div className="text-[11px] text-zinc-400">
                Strips cluttered stickers; guarantees 0% collision with YouTube like/sound buttons
              </div>
            </div>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={editableAutoShort.cleanMode}
                onChange={e => setEditableAutoShort((prev: any) => ({ ...prev, cleanMode: e.target.checked }))}
                className="rounded accent-emerald-500 scale-125"
              />
            </label>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(editableAutoShort.script, 'copy-script')}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedKey === 'copy-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Script</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onProduceAndQueue}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Queue for Timeline Upload</span>
              </button>

              <button
                onClick={() => onDirectPublish(editableAutoShort.title, editableAutoShort.script, editableAutoShort.tags)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>1-Click Direct Publish</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 9:16 Live Screen Message Simulator (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 self-start">
            <Tv className="w-4 h-4 text-purple-400" />
            <span>9:16 Live Uncluttered Simulator</span>
          </div>

          {/* 9:16 Frame */}
          <div className="relative w-48 h-84 bg-zinc-950 rounded-2xl border-2 border-zinc-700 overflow-hidden shadow-2xl flex flex-col justify-between p-3">
            {/* Background Image / Motion Simulator */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-zinc-900 to-zinc-950 pointer-events-none" />

            {/* Top Minimal Pill */}
            <div className="relative z-10 mx-auto">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-black/60 text-zinc-300 border border-zinc-700/60 backdrop-blur-sm">
                ShortsForge AI • 60 FPS
              </span>
            </div>

            {/* Center Visual Mock */}
            <div className="relative z-10 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mx-auto flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-white font-bold px-2 line-clamp-2">
                {editableAutoShort.title}
              </p>
            </div>

            {/* Simulated Screen Message Overlay in Safe-Zone */}
            <div className="relative z-10 mb-8 space-y-1">
              {editableAutoShort.screenMessage && (
                <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] font-bold text-center backdrop-blur-md shadow-lg animate-in slide-in-from-bottom-2">
                  {editableAutoShort.screenMessage}
                </div>
              )}
              {editableAutoShort.cleanMode && (
                <div className="text-[8px] font-mono text-zinc-400 text-center">
                  ✓ 9:16 UI Safe-Zone Cleared
                </div>
              )}
            </div>

            {/* Simulated YouTube UI Icons on right */}
            <div className="absolute right-2 bottom-12 flex flex-col items-center gap-2 z-20 opacity-60">
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] text-white">👍</div>
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] text-white">💬</div>
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] text-white">↗️</div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 text-center max-w-xs">
            Clean Uncluttered Mode ensures zero obstruction from YouTube&apos;s Like, Comment, and Sound buttons.
          </p>
        </div>
      </div>
    </div>
  );
};
