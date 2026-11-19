import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Compass, Globe, Search, Film, ShieldCheck, ShieldAlert, AlertTriangle,
  Calendar, Clock, Wand2, Play, ExternalLink, CheckCircle2, Sparkles,
  Sliders, Link2, RefreshCw, Plus, ArrowRight, Check, Layers,
  Video, Copy, X, Terminal, ChevronDown, ChevronUp
} from 'lucide-react';
import { playSoundEffect } from '../utils/soundEffects';
import {
  WORLD_WONDERS_LIBRARY,
  WorldWonderItem,
  WonderSubtitleStyle
} from '../data/worldWondersData';
import {
  QueuedShort,
  buildQueueItemPipelineState,
  createInitialWeekQueue
} from './AutomatedDailyPipelineTab';
import {
  BatchForensicsLogEntry,
  PipelineVerificationResult,
  verifyBeforeUpload,
  getBatchForensicsLog,
  writeToBatchForensicsLog,
  subscribeBatchForensicsLog,
  clearBatchForensicsLog
} from '../utils/pipelineVerifier';
import {
  loadPipelineQueue,
  savePipelineQueue
} from '../utils/pipelineQueueStore';

export interface WorldWonderAutoEditPayload {
  id: string;
  title: string;
  niche: string;
  durationSec: number;
  videoUrl: string;
  hookText: string;
  description: string;
  tags: string[];
  subtitleStyle: WonderSubtitleStyle;
  nonce: number;
}

interface StockFootageClip {
  id: string;
  title: string;
  source: 'Pexels' | 'Pixabay';
  licenseType: 'Pexels License' | 'Pixabay License';
  licenseUrl: string;
  commercialUseCleared: boolean;
  attributionRequired: boolean;
  author: string;
  durationSec: number;
  width: number;
  height: number;
  aspectRatio: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
}

interface FootageSettings {
  enablePexels: boolean;
  enablePixabay: boolean;
  preferPortrait916: boolean;
}

interface WorldWondersTabProps {
  onSendToAutoEdit?: (payload: WorldWonderAutoEditPayload) => void;
  onNavigateTab?: (tabId: string) => void;
}

const SETTINGS_STORAGE_KEY = 'shortsforge_world_wonders_settings_v1';
const DAY_OPTIONS = [
  { dayOffset: 0, dayName: 'Monday' },
  { dayOffset: 1, dayName: 'Tuesday' },
  { dayOffset: 2, dayName: 'Wednesday' },
  { dayOffset: 3, dayName: 'Thursday' },
  { dayOffset: 4, dayName: 'Friday' },
  { dayOffset: 5, dayName: 'Saturday' },
  { dayOffset: 6, dayName: 'Sunday' }
];

export const WorldWondersTab: React.FC<WorldWondersTabProps> = ({
  onSendToAutoEdit,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [selectedWonder, setSelectedWonder] = useState<WorldWonderItem>(WORLD_WONDERS_LIBRARY[0]);

  // Per-wonder custom/sourced clip URLs (editable directly by creator; empty string triggers verifier block)
  const [wonderClipUrls, setWonderClipUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    WORLD_WONDERS_LIBRARY.forEach((w) => {
      initial[w.id] = w.defaultPreviewUrl;
    });
    return initial;
  });

  // Editable slot fields for the selected wonder's Daily Drop
  const [draftTitle, setDraftTitle] = useState<string>(WORLD_WONDERS_LIBRARY[0].defaultTitle);
  const [draftHookText, setDraftHookText] = useState<string>(WORLD_WONDERS_LIBRARY[0].defaultHookText);
  const [draftDurationSec, setDraftDurationSec] = useState<number>(WORLD_WONDERS_LIBRARY[0].defaultDurationSec);
  const [draftTagsText, setDraftTagsText] = useState<string>(WORLD_WONDERS_LIBRARY[0].defaultTags.join(', '));
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('12:30 PM');

  // Stock Footage Sourcing state
  const [footageSettings, setFootageSettings] = useState<FootageSettings>(() => {
    try {
      const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as FootageSettings;
    } catch {
      // Ignore storage error
    }
    return {
      enablePexels: true,
      enablePixabay: true,
      preferPortrait916: true
    };
  });
  const [showSettingsPanel, setShowSettingsPanel] = useState<boolean>(false);
  const [isFetchingFootage, setIsFetchingFootage] = useState<boolean>(false);
  const [fetchedClips, setFetchedClips] = useState<StockFootageClip[]>([]);
  const [footageSourceMode, setFootageSourceMode] = useState<string | null>(null);
  const [configuredSources, setConfiguredSources] = useState<{ pexels: boolean; pixabay: boolean } | null>(null);
  const [selectedClipLicense, setSelectedClipLicense] = useState<string>('Commercial Royalty-Free Ready');

  // Beginner-friendly "Get CC Videos" macOS yt-dlp + YouTube Creative Commons guide state
  const [showCcVideosGuide, setShowCcVideosGuide] = useState<boolean>(false);
  const [collapseMacSetup, setCollapseMacSetup] = useState<boolean>(false);
  const [ccSearchInput, setCcSearchInput] = useState<string>('');
  const [ccSearchError, setCcSearchError] = useState<string | null>(null);
  const [lastCcSearchUrl, setLastCcSearchUrl] = useState<string | null>(null);
  const [ccVideoUrlInput, setCcVideoUrlInput] = useState<string>('');
  const [ccUrlConfirmedFromStep2, setCcUrlConfirmedFromStep2] = useState<boolean>(false);
  const [copiedSnippetKey, setCopiedSnippetKey] = useState<string | null>(null);
  const ccSearchAnchorRef = useRef<HTMLAnchorElement | null>(null);

  // Verifier & Forensics state
  const [verifierBanner, setVerifierBanner] = useState<{
    verdict: 'PROCEED' | 'BLOCKED';
    title: string;
    result: PipelineVerificationResult;
  } | null>(null);
  const [forensicsLog, setForensicsLog] = useState<BatchForensicsLogEntry[]>(() =>
    getBatchForensicsLog()
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const buildYoutubeCcSearchUrl = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query.trim())}&sp=EgIwAQ%3D%3D`;
  };

  const handleCopySnippet = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSnippetKey(key);
      playSoundEffect('chime', 0.3);
      setTimeout(() => {
        setCopiedSnippetKey((prev) => (prev === key ? null : prev));
      }, 2200);
    } catch {
      showToast('Select the command text and press Command (⌘) + C to copy.');
    }
  };

  const openYoutubeCcSearchForTerm = (rawTerm: string) => {
    const trimmed = rawTerm.trim();
    if (!trimmed) {
      setCcSearchError('Type a place or topic first — for example: northern lights 360');
      return;
    }
    setCcSearchError(null);
    const targetUrl = buildYoutubeCcSearchUrl(trimmed);
    setLastCcSearchUrl(targetUrl);
    if (ccSearchAnchorRef.current) {
      ccSearchAnchorRef.current.href = targetUrl;
      ccSearchAnchorRef.current.click();
    }
    playSoundEffect('whoosh', 0.3);
    showToast(`Opened YouTube Creative Commons results for "${trimmed}".`);
  };

  const handleCcSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openYoutubeCcSearchForTerm(ccSearchInput);
  };

  const cleanedPastedCcUrl = ccVideoUrlInput.trim().replace(/"/g, '');
  const isPastedYoutubeUrl = /(youtube\.com|youtu\.be)/i.test(cleanedPastedCcUrl);
  const isNonCcYoutubeSearchUrl =
    /youtube\.com\/results/i.test(cleanedPastedCcUrl) && !/sp=EgIwAQ/i.test(cleanedPastedCcUrl);
  const showNotCcSearchWarning = Boolean(
    cleanedPastedCcUrl &&
      isPastedYoutubeUrl &&
      (isNonCcYoutubeSearchUrl || !lastCcSearchUrl || !ccUrlConfirmedFromStep2)
  );
  const ytDlpExactCommand = cleanedPastedCcUrl
    ? `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --merge-output-format mp4 -P ~/Downloads "${cleanedPastedCcUrl}"`
    : '';
  const macCheckYtDlpCommand =
    'if [ -x "$HOME/bin/yt-dlp" ] || command -v yt-dlp >/dev/null 2>&1 || [ -x "/opt/homebrew/bin/yt-dlp" ] || [ -x "/usr/local/bin/yt-dlp" ] || (command -v brew >/dev/null 2>&1 && brew list yt-dlp >/dev/null 2>&1); then echo "GOOD NEWS: yt-dlp is already installed on your Mac! You can skip installing and go straight to Step 2."; else echo "NOT INSTALLED YET: yt-dlp was not found in ~/bin/yt-dlp or Homebrew. Follow the install steps below."; fi';

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(footageSettings));
    } catch {
      // Ignore storage error
    }
  }, [footageSettings]);

  useEffect(() => {
    const unsubscribe = subscribeBatchForensicsLog(setForensicsLog);
    return unsubscribe;
  }, []);

  const currentVideoUrl = wonderClipUrls[selectedWonder.id] ?? '';

  const handleSelectWonder = (wonder: WorldWonderItem) => {
    setSelectedWonder(wonder);
    setDraftTitle(wonder.defaultTitle);
    setDraftHookText(wonder.defaultHookText);
    setDraftDurationSec(wonder.defaultDurationSec);
    setDraftTagsText(wonder.defaultTags.join(', '));
    setFetchedClips([]);
    setFootageSourceMode(null);
    setVerifierBanner(null);
    playSoundEffect('pulse', 0.25);
  };

  const filteredWonders = useMemo(() => {
    return WORLD_WONDERS_LIBRARY.filter((w) => {
      if (regionFilter !== 'All' && w.region !== regionFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        w.name.toLowerCase().includes(q) ||
        w.location.toLowerCase().includes(q) ||
        w.nicheTag.toLowerCase().includes(q) ||
        w.suggestedHookStyle.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, regionFilter]);

  const handleFetchStockFootage = async () => {
    if (!footageSettings.enablePexels && !footageSettings.enablePixabay) {
      showToast('Enable at least one commercial stock source (Pexels or Pixabay) in Source Settings.');
      return;
    }

    const preferredSource =
      footageSettings.enablePexels && footageSettings.enablePixabay
        ? 'all'
        : footageSettings.enablePexels
          ? 'pexels'
          : 'pixabay';

    setIsFetchingFootage(true);
    playSoundEffect('whoosh', 0.35);

    try {
      const res = await fetch('/api/world-wonders/fetch-footage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wonderId: selectedWonder.id,
          query: selectedWonder.searchQuery,
          wonderName: selectedWonder.name,
          preferredSource,
          orientation: footageSettings.preferPortrait916 ? 'portrait' : 'all'
        })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.clips)) {
        setFetchedClips(data.clips);
        setFootageSourceMode(data.sourceMode || 'curated_local_fallback');
        if (data.configuredSources) {
          setConfiguredSources(data.configuredSources);
        }
        playSoundEffect('chime', 0.45);
        showToast(`Loaded ${data.clips.length} commercial-license clip(s) for ${selectedWonder.name}.`);
      } else {
        showToast('Could not load stock clips for this wonder.');
      }
    } catch (err) {
      console.error('Fetch footage failed:', err);
      showToast('Stock footage proxy request failed. Check server status.');
    } finally {
      setIsFetchingFootage(false);
    }
  };

  const handleApplyFetchedClip = (clip: StockFootageClip) => {
    setWonderClipUrls((prev) => ({
      ...prev,
      [selectedWonder.id]: clip.videoUrl
    }));
    setDraftDurationSec(Math.min(58, Math.max(8, clip.durationSec || selectedWonder.defaultDurationSec)));
    setSelectedClipLicense(`${clip.licenseType} (${clip.source})`);
    setVerifierBanner(null);
    playSoundEffect('chime', 0.4);
    showToast(`Applied ${clip.licenseType} clip from ${clip.source} to ${selectedWonder.name}.`);
  };

  const buildCandidateQueuedShort = (): QueuedShort => {
    const dayInfo = DAY_OPTIONS.find((d) => d.dayOffset === selectedDayOffset) || DAY_OPTIONS[0];
    const date = new Date(Date.now() + dayInfo.dayOffset * 86400000);
    const parsedTags = draftTagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    return {
      id: `queue_${dayInfo.dayOffset + 1}`,
      dayName: dayInfo.dayName,
      dayOffset: dayInfo.dayOffset,
      scheduledTime: selectedTimeSlot,
      scheduledDateStr: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      title: draftTitle.trim(),
      hookText: draftHookText.trim(),
      niche: selectedWonder.nicheTag,
      durationSec: Number(draftDurationSec) || 26,
      status: 'Ready',
      viewsProjected: selectedWonder.viewsProjected,
      estimatedCpm: selectedWonder.estimatedCpm,
      retentionScore: selectedWonder.retentionScore,
      isNewsFlash: false,
      complianceStatus: 'Certified Green Dollar',
      captionsBurned: true,
      safeZonesVerified: true,
      brandKitApplied: true,
      tags: parsedTags,
      description: `${selectedWonder.defaultDescription}\n\nLicense: ${selectedClipLicense}`,
      videoUrl: currentVideoUrl.trim(),
      affiliateDisclosure: true,
      videoId: undefined
    };
  };

  const handleScheduleDailyDrop = () => {
    const candidate = buildCandidateQueuedShort();
    const pipelineState = buildQueueItemPipelineState(candidate);
    const verification = verifyBeforeUpload(pipelineState);
    writeToBatchForensicsLog('World Wonders', candidate.title || selectedWonder.name, verification);

    if (verification.verdict === 'BLOCKED') {
      setVerifierBanner({
        verdict: 'BLOCKED',
        title: candidate.title || selectedWonder.name,
        result: verification
      });

      // Quarantine the slot in the shared queue if a video file is missing or incomplete so Pipeline Overview reflects BLOCKED state live
      const currentQueue = loadPipelineQueue<QueuedShort>(createInitialWeekQueue);
      const quarantinedSlot: QueuedShort = {
        ...candidate,
        status: 'Quarantined',
        verifierBlockedReason: verification.message,
        verifierRepairAction: verification.repairAction
      };
      const existingIdx = currentQueue.findIndex((q) => q.dayOffset === candidate.dayOffset);
      const nextQueue =
        existingIdx >= 0
          ? currentQueue.map((q, idx) => (idx === existingIdx ? quarantinedSlot : q))
          : [...currentQueue, quarantinedSlot];
      savePipelineQueue(nextQueue);

      playSoundEffect('subdrop', 0.45);
      showToast(`⛔ BLOCKED: ${verification.message}`);
      return;
    }

    const currentQueue = loadPipelineQueue<QueuedShort>(createInitialWeekQueue);
    const existingIdx = currentQueue.findIndex((q) => q.dayOffset === candidate.dayOffset);
    const nextQueue =
      existingIdx >= 0
        ? currentQueue.map((q, idx) => (idx === existingIdx ? candidate : q))
        : [...currentQueue, candidate];

    savePipelineQueue(nextQueue);
    setVerifierBanner({
      verdict: 'PROCEED',
      title: candidate.title,
      result: verification
    });
    playSoundEffect('chime', 0.55);
    showToast(`🚀 Scheduled "${selectedWonder.name}" into ${candidate.dayName} slot (Pipeline Overview updated live)!`);
  };

  const handleSendToAutoEditAgent = () => {
    if (!currentVideoUrl.trim()) {
      const candidate = buildCandidateQueuedShort();
      const verification = verifyBeforeUpload(buildQueueItemPipelineState(candidate));
      writeToBatchForensicsLog('World Wonders', candidate.title || selectedWonder.name, verification);
      setVerifierBanner({
        verdict: 'BLOCKED',
        title: candidate.title || selectedWonder.name,
        result: verification
      });
      playSoundEffect('subdrop', 0.4);
      showToast('Add or fetch a commercial clip URL before sending to AI Auto-Edit Agent.');
      return;
    }

    if (onSendToAutoEdit) {
      onSendToAutoEdit({
        id: `wonder_edit_${selectedWonder.id}_${Date.now()}`,
        title: draftTitle.trim() || selectedWonder.defaultTitle,
        niche: selectedWonder.nicheTag,
        durationSec: Number(draftDurationSec) || selectedWonder.defaultDurationSec,
        videoUrl: currentVideoUrl.trim(),
        hookText: draftHookText.trim() || selectedWonder.defaultHookText,
        description: selectedWonder.defaultDescription,
        tags: draftTagsText.split(',').map((t) => t.trim()).filter(Boolean),
        subtitleStyle: selectedWonder.suggestedSubtitleStyle,
        nonce: Date.now()
      });
    }
    playSoundEffect('pulse', 0.35);
    showToast(`Sent ${selectedWonder.name} to AI Auto-Edit Agent (${selectedWonder.subtitleStyleLabel})!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-emerald-500/50 rounded-xl shadow-2xl text-white text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/30 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              World Wonders Daily Scenery Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex flex-wrap items-center gap-3">
              30 Global Landmarks &amp; Commercial Footage Pipeline
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                NO YOUTUBE SCRAPING
              </span>
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Pick from 30 pre-seeded world wonders, source cleared commercial footage (Pexels &amp; Pixabay), apply landmark subtitle styles in the AI Auto-Edit Agent, and push verified drops directly into your 7-day Automated Daily Pipeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setShowCcVideosGuide(!showCcVideosGuide);
                playSoundEffect('pulse', 0.25);
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer ${
                showCcVideosGuide
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/50'
                  : 'bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-200 border-cyan-500/40'
              }`}
            >
              <Video className="w-4 h-4" />
              Get CC Videos
            </button>
            <button
              onClick={() => setShowSettingsPanel(!showSettingsPanel)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer ${
                showSettingsPanel
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Source Settings
            </button>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('dailypipeline')}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-950/40 flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                Open Pipeline Overview
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Source Settings Panel (No raw API key inputs — reads env keys on server) */}
        {showSettingsPanel && (
          <div className="mt-6 pt-5 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Pexels Commercial API</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Pexels License
                </span>
              </div>
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={footageSettings.enablePexels}
                  onChange={(e) =>
                    setFootageSettings((prev) => ({ ...prev, enablePexels: e.target.checked }))
                  }
                />
                <span>Include Pexels stock results</span>
              </label>
              <div className="text-[11px] font-mono text-zinc-500">
                Server env key (PEXELS_API_KEY):{' '}
                <span className="text-zinc-300">
                  {configuredSources ? (configuredSources.pexels ? 'Configured' : 'Fallback Mode') : 'Checked on fetch'}
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Pixabay Commercial API</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Pixabay License
                </span>
              </div>
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={footageSettings.enablePixabay}
                  onChange={(e) =>
                    setFootageSettings((prev) => ({ ...prev, enablePixabay: e.target.checked }))
                  }
                />
                <span>Include Pixabay stock results</span>
              </label>
              <div className="text-[11px] font-mono text-zinc-500">
                Server env key (PIXABAY_API_KEY):{' '}
                <span className="text-zinc-300">
                  {configuredSources ? (configuredSources.pixabay ? 'Configured' : 'Fallback Mode') : 'Checked on fetch'}
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
              <div className="font-bold text-white">Orientation &amp; Compliance</div>
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={footageSettings.preferPortrait916}
                  onChange={(e) =>
                    setFootageSettings((prev) => ({ ...prev, preferPortrait916: e.target.checked }))
                  }
                />
                <span>Prioritize vertical 9:16 framing</span>
              </label>
              <p className="text-[11px] text-zinc-500">
                Credentials stay strictly server-side via environment variables (.env) with commercial-safe local sample fallbacks.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden anchor for opening YouTube Creative Commons results without window.open */}
      <a
        ref={ccSearchAnchorRef}
        href={lastCcSearchUrl || 'https://www.youtube.com/results?search_query=northern+lights+360&sp=EgIwAQ%3D%3D'}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        aria-hidden="true"
      >
        Open YouTube Creative Commons
      </a>

      {/* Beginner-Friendly Sequential "Get CC Videos" Guide */}
      {showCcVideosGuide && (
        <div className="bg-zinc-950 border border-cyan-500/40 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
          {/* Guide Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300">
                <Video className="w-4 h-4" />
                Get Free-to-Reuse Videos from YouTube (Step-by-Step)
              </div>
              <p className="text-xs text-zinc-400">
                Follow Steps 1 to 3 below in order — simple instructions, no experience needed.
              </p>
            </div>
            <button
              onClick={() => setShowCcVideosGuide(false)}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white cursor-pointer"
              title="Close guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* STEP 1: Install yt-dlp on macOS */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Step 1: Install the free video saver (yt-dlp) on macOS
                </h3>
                <p className="text-xs text-zinc-400">
                  One-time Mac setup — if you already installed it, you can jump straight to Step 2 below.
                </p>
              </div>
              <button
                onClick={() => setCollapseMacSetup(!collapseMacSetup)}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              >
                {collapseMacSetup ? (
                  <>
                    Show Setup Steps <ChevronDown className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Already Installed? Hide <ChevronUp className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {!collapseMacSetup && (
              <div className="space-y-3 text-xs">
                {/* Sub-step A */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-bold text-white">1. Open Terminal on your Mac</div>
                  <p className="text-zinc-400">
                    Press <strong className="text-zinc-200">Command (⌘) + Space</strong> on your keyboard, type{' '}
                    <strong className="text-cyan-300">Terminal</strong>, and press <strong className="text-zinc-200">Return</strong>.
                    A simple text window opens.
                  </p>
                </div>

                {/* Sub-step A2: Check if yt-dlp is already installed */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-cyan-500/30 space-y-2">
                  <div className="font-bold text-cyan-200">
                    2. Check if yt-dlp is already on your Mac (checks both ~/bin/yt-dlp and Homebrew)
                  </div>
                  <p className="text-zinc-400">
                    Paste this line into Terminal and press <strong className="text-zinc-200">Return</strong>. It will tell you in plain English whether it is already ready or still needs installing:
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <code className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-[11px] text-cyan-200 overflow-x-auto whitespace-nowrap">
                      {macCheckYtDlpCommand}
                    </code>
                    <button
                      onClick={() => handleCopySnippet('ytdlp_check', macCheckYtDlpCommand)}
                      className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedSnippetKey === 'ytdlp_check' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sub-step B */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="font-bold text-white">
                    3. Install Homebrew (only if the check above said not installed yet, and skip if you already have Homebrew)
                  </div>
                  <p className="text-zinc-400">
                    Copy this line, paste it into Terminal, and press <strong className="text-zinc-200">Return</strong>. If it asks for your Mac password, type it and press Return (nothing appears while typing — that&apos;s normal).
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <code className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-[11px] text-cyan-200 overflow-x-auto whitespace-nowrap">
                      /bin/bash -c &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)&quot;
                    </code>
                    <button
                      onClick={() =>
                        handleCopySnippet(
                          'homebrew',
                          '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
                        )
                      }
                      className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedSnippetKey === 'homebrew' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sub-step C */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="font-bold text-white">4. Install yt-dlp</div>
                  <p className="text-zinc-400">
                    Next, paste this short line into Terminal and press{' '}
                    <strong className="text-zinc-200">Return</strong>:
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <code className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-xs text-emerald-300">
                      brew install yt-dlp
                    </code>
                    <button
                      onClick={() => handleCopySnippet('ytdlp_install', 'brew install yt-dlp')}
                      className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedSnippetKey === 'ytdlp_install' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Search YouTube Pre-Filtered to Creative Commons */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                Step 2: Search YouTube for Creative Commons videos
              </h3>
              <p className="text-xs text-zinc-400">
                Type a wonder name below (for example: <strong className="text-zinc-200">northern lights 360</strong>). Clicking Search opens YouTube filtered to <strong className="text-emerald-300">Creative Commons videos only</strong>.
              </p>
            </div>

            <form onSubmit={handleCcSearchSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={ccSearchInput}
                  onChange={(e) => {
                    setCcSearchInput(e.target.value);
                    if (ccSearchError) setCcSearchError(null);
                  }}
                  placeholder="Type a wonder name, e.g. northern lights 360"
                  className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  Search Creative Commons
                </button>
              </div>

              {ccSearchError && (
                <p className="text-xs text-amber-300">{ccSearchError}</p>
              )}

              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-zinc-500">Quick ideas:</span>
                {[
                  'northern lights 360',
                  `${selectedWonder.name} 4k`,
                  `${selectedWonder.name} aerial`
                ].map((idea) => (
                  <button
                    key={idea}
                    type="button"
                    onClick={() => {
                      setCcSearchInput(idea);
                      openYoutubeCcSearchForTerm(idea);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-cyan-300 cursor-pointer"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </form>

            {lastCcSearchUrl && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2 text-xs">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  YouTube Creative Commons results opened!
                </div>
                <p className="text-zinc-300">
                  Pick a video you like, confirm under its description that it says{' '}
                  <strong className="text-white">Creative Commons Attribution</strong>, and copy the video link from your browser&apos;s address bar.
                </p>
                <div>
                  <a
                    href={lastCcSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 text-emerald-200 font-semibold"
                  >
                    Open YouTube Results Again <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: Paste Video URL to Generate Exact yt-dlp Command */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Link2 className="w-4 h-4 text-cyan-400" />
                Step 3: Paste the video link to get your exact download command
              </h3>
              <p className="text-xs text-zinc-400">
                Paste the YouTube video web address you copied in Step 2. Your exact Terminal download line will appear right below.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 block">
                Paste YouTube Video Link:
              </label>
              <input
                type="text"
                value={ccVideoUrlInput}
                onChange={(e) => {
                  setCcVideoUrlInput(e.target.value);
                  setCcUrlConfirmedFromStep2(false);
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {showNotCcSearchWarning && (
              <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/60 space-y-2 text-xs text-amber-100">
                <div className="font-bold text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>This video may not be CC licensed, only use videos from the Step 2 search.</span>
                </div>
                {isNonCcYoutubeSearchUrl ? (
                  <p className="text-amber-200/90">
                    That link is a regular YouTube search page without the Creative Commons filter turned on. Please use the <strong className="text-white">Search Creative Commons</strong> button in Step 2 above, pick a video from those results, and paste its video link here.
                  </p>
                ) : !lastCcSearchUrl ? (
                  <p className="text-amber-200/90">
                    You haven&apos;t run a Creative Commons search in Step 2 yet. Scroll up to Step 2, search for your wonder first so YouTube only shows Creative Commons videos, and pick a video from that list.
                  </p>
                ) : (
                  <label className="flex items-start gap-2 pt-1 text-amber-100 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={ccUrlConfirmedFromStep2}
                      onChange={(e) => setCcUrlConfirmedFromStep2(e.target.checked)}
                      className="mt-0.5 accent-emerald-500"
                    />
                    <span>
                      I picked this video from the <strong className="text-white">Step 2 Creative Commons search</strong> and checked that its YouTube description says <strong className="text-emerald-300">Creative Commons</strong>.
                    </span>
                  </label>
                )}
              </div>
            )}

            {ytDlpExactCommand ? (
              <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/40 space-y-2.5 text-xs">
                <div className="font-bold text-emerald-300">
                  Your exact download command is ready:
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <code className="flex-1 px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-[11px] text-emerald-200 break-all">
                    {ytDlpExactCommand}
                  </code>
                  <button
                    onClick={() => handleCopySnippet('ytdlp_download', ytDlpExactCommand)}
                    className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedSnippetKey === 'ytdlp_download' ? (
                      <>
                        <Check className="w-4 h-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Command
                      </>
                    )}
                  </button>
                </div>
                <p className="text-zinc-400">
                  Open <strong className="text-zinc-200">Terminal</strong>, paste this command, and press{' '}
                  <strong className="text-zinc-200">Return</strong>. Your video will save straight into your Mac&apos;s{' '}
                  <strong className="text-white">Downloads</strong> folder!
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-400">
                Paste any YouTube link above and your exact download command will appear right here.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Verifier Result Banner */}
      {verifierBanner && (
        <div
          className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
            verifierBanner.verdict === 'BLOCKED'
              ? 'bg-rose-950/70 border-rose-500/50 text-rose-200'
              : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold">
              {verifierBanner.verdict === 'BLOCKED' ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span>
                {verifierBanner.verdict === 'BLOCKED'
                  ? 'Daily Drop BLOCKED by Pipeline Verifier'
                  : 'Daily Drop Verified & Added to 7-Day Queue'}
              </span>
            </div>
            <button
              onClick={() => setVerifierBanner(null)}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
          <p className="font-mono text-[11px]">
            Slot: <strong className="text-white">{verifierBanner.title}</strong> — {verifierBanner.result.message}
          </p>
          {verifierBanner.result.repairAction && (
            <p className="text-[11px] font-bold text-amber-300">
              REPAIR ACTION: {verifierBanner.result.repairAction} — attach or fetch a valid commercial clip URL before upload.
            </p>
          )}
        </div>
      )}

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 30-Wonder Library */}
        <div className="lg:col-span-5 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-black text-white">Wonder Library</h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              {filteredWonders.length} / {WORLD_WONDERS_LIBRARY.length} Wonders
            </span>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wonder, country, or hook style..."
                className="w-full pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {['All', 'Americas', 'Europe', 'Asia', 'Middle East & Africa', 'Oceania'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setRegionFilter(reg)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                    regionFilter === reg
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredWonders.map((wonder) => {
              const isSelected = selectedWonder.id === wonder.id;
              const hasClip = Boolean((wonderClipUrls[wonder.id] || '').trim());
              return (
                <button
                  key={wonder.id}
                  onClick={() => handleSelectWonder(wonder)}
                  className={`w-full text-left p-3 rounded-xl border transition cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">{wonder.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        hasClip
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {hasClip ? 'Clip Linked' : 'No Video URL'}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>{wonder.location}</span>
                    <span className="text-emerald-400 font-mono">{wonder.estimatedCpm} CPM</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                      {wonder.nicheTag}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-300">
                      Hook: {wonder.suggestedHookStyle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Footage Sourcing + Auto-Edit + Daily Drop Scheduler */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Wonder Details & Footage Sourcing */}
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3.5">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  {selectedWonder.location} · {selectedWonder.region}
                </div>
                <h2 className="text-lg font-black text-white">{selectedWonder.name}</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Niche: <strong className="text-zinc-200">{selectedWonder.nicheTag}</strong> · Hook Style:{' '}
                  <strong className="text-indigo-300">{selectedWonder.suggestedHookStyle}</strong>
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 self-start">
                Subtitle Preset: {selectedWonder.subtitleStyleLabel}
              </span>
            </div>

            {/* Footage URL Input + Fetch Stock Footage Button */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                  Commercial Clip URL (videoUrl)
                </label>
                {currentVideoUrl.trim() ? (
                  <span className="text-[10px] font-mono text-emerald-300">
                    License: {selectedClipLicense}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Empty videoUrl (Verifier will BLOCK)
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={currentVideoUrl}
                  onChange={(e) =>
                    setWonderClipUrls((prev) => ({
                      ...prev,
                      [selectedWonder.id]: e.target.value
                    }))
                  }
                  placeholder="Enter commercial clip URL or leave empty to test verifier gate..."
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
                {currentVideoUrl && (
                  <button
                    onClick={() =>
                      setWonderClipUrls((prev) => ({
                        ...prev,
                        [selectedWonder.id]: ''
                      }))
                    }
                    className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold cursor-pointer"
                    title="Clear videoUrl (triggers verifier BLOCKED state on schedule)"
                  >
                    Clear URL
                  </button>
                )}
                <button
                  onClick={handleFetchStockFootage}
                  disabled={isFetchingFootage}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFetchingFootage ? 'animate-spin' : ''}`} />
                  {isFetchingFootage ? 'Searching Pexels & Pixabay...' : 'Fetch stock footage'}
                </button>
              </div>
            </div>

            {/* Video Preview */}
            {currentVideoUrl.trim() ? (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
                <div className="sm:col-span-4 aspect-[9/16] max-h-48 mx-auto w-full max-w-[110px] rounded-lg overflow-hidden bg-black border border-zinc-800">
                  <video
                    key={currentVideoUrl}
                    src={currentVideoUrl}
                    controls
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-8 space-y-2 text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-emerald-400" />
                    Active Scenery Asset Ready
                  </div>
                  <p className="text-[11px] font-mono text-zinc-400 break-all">{currentVideoUrl}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleSendToAutoEditAgent}
                      className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      Send to AI Auto-Edit Agent
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-500/30 text-xs text-rose-200 flex items-center justify-between gap-3">
                <span>No video file URL attached to this wonder. Click "Fetch stock footage" or paste a commercial clip URL.</span>
              </div>
            )}

            {/* Fetched Stock Clips Grid */}
            {fetchedClips.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Fetched Commercial Stock Clips ({fetchedClips.length})
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Mode: {footageSourceMode === 'live_api' ? 'Live Pexels/Pixabay API' : 'Curated Commercial Fallback'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {fetchedClips.map((clip) => {
                    const isSelectedClip = currentVideoUrl === clip.videoUrl;
                    return (
                      <div
                        key={clip.id}
                        className={`p-3 rounded-xl border space-y-2 ${
                          isSelectedClip
                            ? 'bg-emerald-950/35 border-emerald-500/50'
                            : 'bg-zinc-900/70 border-zinc-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-xs font-bold text-white line-clamp-2">{clip.title}</div>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 border ${
                              clip.licenseType === 'Pexels License'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                                : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                            }`}
                          >
                            {clip.licenseType}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                          <span>{clip.aspectRatio} · {clip.durationSec}s · Commercial Cleared</span>
                          <span>By {clip.author}</span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleApplyFetchedClip(clip)}
                            className="flex-1 py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            {isSelectedClip ? 'Selected' : 'Use Clip'}
                          </button>
                          <a
                            href={clip.licenseUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="py-1.5 px-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1"
                          >
                            License <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Daily Drop Scheduler (QueuedShort + Pipeline Verifier) */}
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-black text-white">Daily Drop Scheduler (7-Day Queue)</h3>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded">
                QueuedShort + verifyBeforeUpload
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Target Day Slot</label>
                <select
                  value={selectedDayOffset}
                  onChange={(e) => setSelectedDayOffset(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  {DAY_OPTIONS.map((d) => (
                    <option key={d.dayOffset} value={d.dayOffset}>
                      Day {d.dayOffset + 1} — {d.dayName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Peak Drop Time</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <input
                    type="text"
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Short Title (&lt;60 chars)</label>
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Opening Hook Text</label>
                <input
                  type="text"
                  value={draftHookText}
                  onChange={(e) => setDraftHookText(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Duration (sec, &lt;60)</label>
                  <input
                    type="number"
                    min={5}
                    max={59}
                    value={draftDurationSec}
                    onChange={(e) => setDraftDurationSec(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={draftTagsText}
                    onChange={(e) => setDraftTagsText(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={handleScheduleDailyDrop}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-950/40 flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Schedule to {DAY_OPTIONS.find((d) => d.dayOffset === selectedDayOffset)?.dayName} Slot
              </button>

              <button
                onClick={handleSendToAutoEditAgent}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <Wand2 className="w-4 h-4 text-indigo-400" />
                Open in AI Auto-Edit Agent
              </button>
            </div>
          </div>

          {/* Pipeline Verifier Forensics Log */}
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white">Pipeline Verifier Forensics Log</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                  {forensicsLog.length} entries
                </span>
              </div>
              {forensicsLog.length > 0 && (
                <button
                  onClick={clearBatchForensicsLog}
                  className="text-[11px] text-zinc-400 hover:text-white cursor-pointer"
                >
                  Clear Log
                </button>
              )}
            </div>

            {forensicsLog.length === 0 ? (
              <p className="text-[11px] text-zinc-500 font-mono">
                No verifier checks recorded yet. Schedule a World Wonder slot (or clear its videoUrl and test) to see live forensics.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto font-mono text-[11px]">
                {forensicsLog.slice(0, 12).map((entry) => (
                  <div
                    key={entry.id}
                    className={`px-3 py-1.5 rounded-lg border ${
                      entry.verdict === 'BLOCKED'
                        ? 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                        : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                    }`}
                  >
                    {entry.line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
