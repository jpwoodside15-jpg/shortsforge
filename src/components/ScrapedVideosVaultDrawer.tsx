import React, { useState, useEffect } from 'react';
import { 
  Flame, Scissors, Sparkles, TrendingUp, Eye, DollarSign, 
  ExternalLink, Copy, Check, Play, Pause, BookmarkCheck, ArrowRight,
  Filter, Award, ShieldCheck, CheckCircle2, RefreshCw
} from 'lucide-react';
import { playSoundEffect } from '../utils/soundEffects';

export interface ScrapedVideoItem {
  id: string;
  rank: number;
  title: string;
  niche: string;
  views: string;
  likes: string;
  retentionScore: number;
  durationSec: number;
  cpm: string;
  sampleVideoUrl: string;
  hookText: string;
  transcript: string;
  inPointSec: number;
  outPointSec: number;
  psychologicalTrigger: string;
  stylePreset: string;
  sourceCitation: string;
  dataFactTicker: string;
}

interface ScrapedVideosVaultDrawerProps {
  onRipStructureAndClip: (video: ScrapedVideoItem) => void;
  onClose?: () => void;
}

export const ScrapedVideosVaultDrawer: React.FC<ScrapedVideosVaultDrawerProps> = ({
  onRipStructureAndClip,
  onClose
}) => {
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [videos, setVideos] = useState<ScrapedVideoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchScrapedVideos = async (nicheFilter = selectedNiche) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/editor/scraped-top-videos?niche=${encodeURIComponent(nicheFilter)}`);
      if (res.ok) {
        const data = await res.json();
        setVideos(data.scrapedVideos || []);
      }
    } catch (e) {
      console.error('Error fetching scraped top videos:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScrapedVideos(selectedNiche);
  }, [selectedNiche]);

  const handleRipClip = (video: ScrapedVideoItem) => {
    playSoundEffect('chime', 0.5);
    onRipStructureAndClip(video);
    showToast(`Ripped winning structure for "${video.title.slice(0, 35)}..." into Clipper!`);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
              <Flame className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Scraped Top 100 Viral Videos &amp; Winning Pacing Archive
            </h3>
            <span className="text-[10px] font-mono bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-500/30 font-bold">
              High CPM Benchmarks
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time scraped transcripts and cut-points from top YouTube Shorts with &gt;96% retention rates. 1-click load the winning hook, timing, and style directly into the editor.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
          >
            Back to Clipper
          </button>
        )}
      </div>

      {/* Niche Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Niches (Top 100)' },
          { id: 'Finance', label: 'Finance & Wealth ($14.20 CPM)' },
          { id: 'Tech', label: 'Tech & AI ($12.50 CPM)' },
          { id: 'Reddit', label: 'Reddit Suspense (19M Views)' },
          { id: 'Machinery', label: 'ASMR Machinery ($8.90 CPM)' },
          { id: 'Creator', label: 'Creator Growth ($16.40 CPM)' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => {
              setSelectedNiche(filter.id);
              playSoundEffect('pulse', 0.2);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedNiche === filter.id
                ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 space-y-4 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-red-600 text-white">
                    #{vid.rank}
                  </span>
                  <span className="text-xs font-semibold text-zinc-300 font-mono">
                    {vid.niche}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    CPM: {vid.cpm}
                  </span>
                  <span className="text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    {vid.retentionScore}% Ret.
                  </span>
                </div>
              </div>

              {/* Title & Views */}
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                  {vid.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-1">
                  <span>👁️ {vid.views} Views</span>
                  <span>❤️ {vid.likes} Likes</span>
                  <span>⏱️ {vid.durationSec}s Duration</span>
                </div>
              </div>

              {/* Hook Box */}
              <div className="p-3 bg-black/60 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                  3-Second Retention Hook:
                </span>
                <p className="text-xs font-black text-yellow-300 uppercase tracking-tight">
                  "{vid.hookText}"
                </p>
              </div>

              {/* Psychological Trigger & Source Citation */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-zinc-300">Psychology:</span>
                  <span className="text-indigo-400 font-medium">{vid.psychologicalTrigger}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-zinc-300">Style:</span>
                  <span className="text-purple-300 font-mono">{vid.stylePreset}</span>
                </div>
                <div className="text-[11px] text-zinc-500 font-mono truncate">
                  🏛️ {vid.sourceCitation}
                </div>
              </div>
            </div>

            {/* Action CTA: Rip Structure & Clip */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-zinc-500">
                Clip Interval: {vid.inPointSec}s - {vid.outPointSec}s
              </span>

              <button
                onClick={() => handleRipClip(vid)}
                className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-950/40 cursor-pointer transition-all active:scale-95 shrink-0"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Rip Structure &amp; Clip</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
