import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Scissors, Video, Sparkles, Upload, Play, Pause, Volume2, 
  VolumeX, RefreshCw, Check, Copy, AlertTriangle, ShieldCheck, 
  Terminal, Youtube, Sliders, Layers, Eye, Smartphone, Download, 
  ArrowRight, Maximize2, Zap, Flame, ExternalLink, Calendar, Lock, Globe, EyeOff,
  CheckCircle2, Film, Clapperboard, Camera, Image as ImageIcon, Share2,
  Shield, DollarSign, Award, ChevronDown, ChevronUp, Info, Hash, MessageSquare,
  Plus, Wand2, X
} from 'lucide-react';

import { ScrapedVideosVaultDrawer, ScrapedVideoItem } from './ScrapedVideosVaultDrawer';
import { RedditProductionModule } from './RedditProductionModule';
import {
  AppliedBoundaryTransition,
  CinematicTransitionId,
  CinematicTransitionsDrawer,
  ClipBoundarySlot,
  TRANSITION_DRAG_MIME,
  getTransitionById,
  renderTransitionIcon
} from './CinematicTransitionsDrawer';

interface VideoClipperSuiteTabProps {
  initialTrimStart?: number;
  initialTrimEnd?: number;
  initialContext?: string;
  onSendToSimulator?: (hookText: string) => void;
  onSendToThumbnail?: (frameUrl: string, title?: string) => void;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  onSendToPipeline?: (data: any) => void;
  onSendToAssets?: (data: any) => void;
}

interface SampleVideoPreset {
  id: string;
  name: string;
  category: string;
  duration: number;
  videoUrl: string;
  posterUrl?: string;
  description: string;
}

const SAMPLE_VIDEOS: SampleVideoPreset[] = [
  {
    id: 'drone-city',
    name: '4K FPV Drone City Skim',
    category: 'Aerial & FPV',
    duration: 38,
    videoUrl: '/samples/sample_meltdowns.mp4',
    description: 'High-speed cinematic low-altitude flight through metropolis architecture.'
  },
  {
    id: 'nature-wonder',
    name: 'Epic Coastline 360° Flight',
    category: 'World Wonders',
    duration: 45,
    videoUrl: '/samples/sample_escapes.mp4',
    description: 'Dramatic ocean cliffs, turquoise waves, and sunset lighting.'
  },
  {
    id: 'tech-reveal',
    name: 'Cyber Tech Hardware Macro',
    category: 'Tech & Gadgets',
    duration: 32,
    videoUrl: '/samples/sample_fun.mp4',
    description: 'Sleek macro camera movements, LED lighting reflections, and hardware details.'
  },
  {
    id: 'action-speed',
    name: 'High-Dopamine Kinetic Action',
    category: 'Viral Action',
    duration: 40,
    videoUrl: '/samples/sample_joy.mp4',
    description: 'Rapid pace action cuts engineered for maximum first-3-second retention.'
  }
];

export const VideoClipperSuiteTab: React.FC<VideoClipperSuiteTabProps> = ({
  initialTrimStart = 0,
  initialTrimEnd = 30,
  initialContext = '',
  onSendToSimulator,
  onSendToThumbnail,
  onSendToUploader,
  onSendToPipeline,
  onSendToAssets
}) => {
  // Video Source & Playback State
  const [selectedPresetId, setSelectedPresetId] = useState<string>('drone-city');
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>(SAMPLE_VIDEOS[0].videoUrl);
  const [videoDuration, setVideoDuration] = useState<number>(38);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Clipping Range Handles (Sub-second)
  const [inPointSec, setInPointSec] = useState<number>(initialTrimStart);
  const [outPointSec, setOutPointSec] = useState<number>(Math.min(initialTrimEnd, 38));

  // Cinematic Transitions Drawer & Clip Boundaries State
  const [showTransitionsDrawer, setShowTransitionsDrawer] = useState<boolean>(false);
  const [cutPoints, setCutPoints] = useState<Array<{ id: string; sec: number }>>([
    { id: 'cut_hook', sec: 9 },
    { id: 'cut_payoff', sec: 20 }
  ]);
  const [appliedTransitions, setAppliedTransitions] = useState<
    Record<string, AppliedBoundaryTransition>
  >({
    cut_hook: {
      boundaryId: 'cut_hook',
      transitionId: 'zoom_punch',
      durationSec: 0.35
    }
  });
  const [selectedBoundaryId, setSelectedBoundaryId] = useState<string | null>('cut_hook');
  const [draggingTransitionId, setDraggingTransitionId] =
    useState<CinematicTransitionId | null>(null);
  const [dragOverBoundaryId, setDragOverBoundaryId] = useState<string | null>(null);
  const [activeTransitionFx, setActiveTransitionFx] = useState<{
    transitionId: CinematicTransitionId;
    durationSec: number;
  } | null>(null);
  const transitionFxTimerRef = useRef<number | null>(null);
  const lastTriggeredBoundaryRef = useRef<{ id: string; triggeredAt: number } | null>(null);

  // Editing & Framing Controls
  const [framingMode, setFramingMode] = useState<'9-16-crop' | 'split-screen' | 'blurred-pillar'>('9-16-crop');
  const [panXOffset, setPanXOffset] = useState<number>(0); // -50 to 50%
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.1); // Algorithm sweet spot
  const [colorFilter, setColorFilter] = useState<'none' | 'dopamine' | 'cinematic' | 'cyber' | 'noir'>('dopamine');

  // Captions & Subtitles
  const [captionPreset, setCaptionPreset] = useState<'mrbeast' | 'hormozi' | 'minimal' | 'neon'>('mrbeast');
  const [captionText, setCaptionText] = useState<string>('THE 3-SECOND RULE THAT CHANGES EVERYTHING');
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  // Informational Overlays & Directorial Elements
  const [showInfoTicker, setShowInfoTicker] = useState<boolean>(true);
  const [infoTickerText, setInfoTickerText] = useState<string>('Tax: 37% vs 0% | Probate Avoided: 100% | $14.8M Cap');
  const [showSourceCitation, setShowSourceCitation] = useState<boolean>(true);
  const [sourceCitationText, setSourceCitationText] = useState<string>('Source: Internal Revenue Code §671-679 Statutory Trusts');
  const [showRedditCard, setShowRedditCard] = useState<boolean>(false);
  const [redditCardData, setRedditCardData] = useState<{
    subreddit: string;
    title: string;
    author: string;
    upvotes: string;
    comments: string;
  }>({
    subreddit: 'r/AskReddit',
    title: 'What is a secret in your industry that ordinary people would be terrified to know?',
    author: 'u/AnonymousWhistleblower',
    upvotes: '48.9K',
    comments: '3,842'
  });
  const [directorialEffect, setDirectorialEffect] = useState<'none' | 'whip_pan' | 'push_punch' | 'dutch_tilt' | 'speed_ramp'>('none');
  const [activeAutomatedStyle, setActiveAutomatedStyle] = useState<'mrbeast' | 'hormozi' | 'vox' | 'reddit' | 'cinematic' | 'minimalist'>('mrbeast');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Remix Modes
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [isLoopPerfected, setIsLoopPerfected] = useState<boolean>(true);
  const [showSafeZoneOverlay, setShowSafeZoneOverlay] = useState<boolean>(true);

  // Brand Protection & Revenue Safety State
  const [brandProtectionEnabled, setBrandProtectionEnabled] = useState<boolean>(true);
  const [brandLogoType, setBrandLogoType] = useState<'preset' | 'custom'>('preset');
  const [selectedBrandPreset, setSelectedBrandPreset] = useState<'shield' | 'wealth' | 'cyber' | 'craft'>('shield');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [channelHandle, setChannelHandle] = useState<string>('@ViralGrowthPro');
  const [watermarkPosition, setWatermarkPosition] = useState<'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' | 'diagonal-tile'>('top-right');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(65); // 10% - 100%
  const [watermarkScale, setWatermarkScale] = useState<number>(36); // 24px - 64px
  const [watermarkStyle, setWatermarkStyle] = useState<'pill' | 'minimal-icon' | 'anti-theft-tile' | 'timecode-stamp'>('pill');
  const [revenueSafetyActive, setRevenueSafetyActive] = useState<boolean>(true);
  const [showStrategicBlueprint, setShowStrategicBlueprint] = useState<boolean>(false);
  const [activeBlueprintPhase, setActiveBlueprintPhase] = useState<1 | 2 | 3 | 4>(1);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  // Direct Upload Metadata & Status
  const [title, setTitle] = useState<string>('The 3-Second Rule That Breaks Every Algorithm');
  const [description, setDescription] = useState<string>('Here is the truth about high retention curves.\n\n#shorts #viral #growth\n📌 Blueprint in pinned comment!');
  const [tags, setTags] = useState<string>('shorts, viral, retention, algorithm, youtube');
  const [privacy, setPrivacy] = useState<'public' | 'unlisted' | 'private'>('public');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'published'>('idle');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [publishedShortId, setPublishedShortId] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeExportCode, setActiveExportCode] = useState<'python' | 'curl'>('python');

  // Active Suite Mode: Precision Clipper, Scraped Vault, Reddit Production, AI Storyboard
  const [activeSuiteMode, setActiveSuiteMode] = useState<'clipper' | 'scraped_vault' | 'reddit_production' | 'storyboard'>('clipper');

  // AI Storyboard Generator State
  const [storyboardTopic, setStoryboardTopic] = useState<string>(initialContext || 'Titanium Super-Drilling');
  const [storyboardTranscript, setStoryboardTranscript] = useState<string>(
    `In this workshop breakdown, we reveal how industrial gun-drills bore through 500mm of solid Grade-5 Titanium without burning the cutting edge. Most engineers fail because titanium concentrates 100% of the friction heat into the cutting tool edge. To overcome this, 120-bar internal coolant channels blast cutting oil directly into the shear interface, freezing the temperature and instantly clearing razor-sharp chips.`
  );
  const [isGeneratingStoryboard, setIsGeneratingStoryboard] = useState<boolean>(false);
  const [storyboardResult, setStoryboardResult] = useState<any | null>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Storyboard Generation Method
  const handleGenerateStoryboard = async () => {
    setIsGeneratingStoryboard(true);
    try {
      const res = await fetch('/api/storyboard/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: storyboardTranscript,
          videoContext: storyboardTopic,
          targetDuration: 30
        })
      });
      const data = await res.json();
      setStoryboardResult(data);
    } catch (err) {
      console.error('Failed to generate storyboard:', err);
    } finally {
      setIsGeneratingStoryboard(false);
    }
  };

  const handleApplyFrameToClipper = (frame: any) => {
    setInPointSec(frame.startSec || 0);
    setOutPointSec(frame.endSec || 3);
    setCaptionText(frame.spokenNarration || frame.subtitleWordHighlight || 'HIGH-RETENTION HOOK');
    setTitle(`${storyboardTopic} - ${frame.stage}`);
    setActiveSuiteMode('clipper');
    if (videoRef.current) {
      videoRef.current.currentTime = frame.startSec || 0;
    }
  };

  const handleSendFrameToThumbnailStudio = (frame: any) => {
    if (onSendToThumbnail) {
      onSendToThumbnail(SAMPLE_VIDEOS[0].videoUrl, frame.spokenNarration || storyboardTopic);
    }
  };

  // Sync initialTrim props when provided
  useEffect(() => {
    if (initialTrimStart !== undefined) setInPointSec(initialTrimStart);
    if (initialTrimEnd !== undefined) setOutPointSec(initialTrimEnd);
  }, [initialTrimStart, initialTrimEnd]);

  // Active cut points clamped strictly inside [inPointSec + 1, outPointSec - 1]
  const validCutPoints = useMemo(() => {
    const minCut = inPointSec + 1;
    const maxCut = outPointSec - 1;
    if (maxCut <= minCut) return [];
    const seen = new Set<number>();
    return cutPoints
      .map((cp) => ({ id: cp.id, sec: Math.round(cp.sec * 10) / 10 }))
      .filter((cp) => {
        if (cp.sec < minCut || cp.sec > maxCut || seen.has(cp.sec)) return false;
        seen.add(cp.sec);
        return true;
      })
      .sort((a, b) => a.sec - b.sec);
  }, [cutPoints, inPointSec, outPointSec]);

  const clipSegments = useMemo(() => {
    const edges = [inPointSec, ...validCutPoints.map((c) => c.sec), outPointSec];
    const roleNames = ['Hook', 'Build', 'Twist', 'Payoff', 'Loop'];
    return edges.slice(0, -1).map((startSec, idx) => {
      const endSec = edges[idx + 1];
      const role = roleNames[idx] || `Beat ${idx + 1}`;
      return {
        id: `seg_${idx}`,
        index: idx,
        label: `Clip ${idx + 1} · ${role}`,
        shortLabel: `Clip ${idx + 1}`,
        startSec,
        endSec,
        durationSec: Math.max(0.5, Math.round((endSec - startSec) * 10) / 10)
      };
    });
  }, [inPointSec, outPointSec, validCutPoints]);

  const clipBoundaries = useMemo<ClipBoundarySlot[]>(() => {
    const slots: ClipBoundarySlot[] = [
      {
        id: 'intro',
        label: 'Intro Boundary',
        timeSec: inPointSec,
        kind: 'intro',
        leftClipLabel: 'Start',
        rightClipLabel: clipSegments[0]?.shortLabel || 'Clip 1'
      }
    ];

    validCutPoints.forEach((cp, idx) => {
      slots.push({
        id: cp.id,
        label: `Cut #${idx + 1} (${clipSegments[idx]?.shortLabel || `Clip ${idx + 1}`} → ${clipSegments[idx + 1]?.shortLabel || `Clip ${idx + 2}`})`,
        timeSec: cp.sec,
        kind: 'cut',
        leftClipLabel: clipSegments[idx]?.shortLabel || `Clip ${idx + 1}`,
        rightClipLabel: clipSegments[idx + 1]?.shortLabel || `Clip ${idx + 2}`
      });
    });

    slots.push({
      id: 'outro',
      label: 'Loop / Out Boundary',
      timeSec: outPointSec,
      kind: 'outro',
      leftClipLabel: clipSegments[clipSegments.length - 1]?.shortLabel || 'Clip 1',
      rightClipLabel: 'Loop'
    });

    return slots;
  }, [clipSegments, inPointSec, outPointSec, validCutPoints]);

  const triggerTransitionPreview = (
    transitionId: CinematicTransitionId,
    durationSec?: number,
    seekTimeSec?: number
  ) => {
    const preset = getTransitionById(transitionId);
    const effectiveDur = durationSec ?? preset?.defaultDurationSec ?? 0.3;

    if (transitionFxTimerRef.current !== null) {
      window.clearTimeout(transitionFxTimerRef.current);
    }

    if (seekTimeSec !== undefined && videoRef.current) {
      const clampedSeek = Math.max(
        inPointSec,
        Math.min(outPointSec - 0.1, seekTimeSec)
      );
      videoRef.current.currentTime = clampedSeek;
      setCurrentTime(clampedSeek);
    }

    setActiveTransitionFx({ transitionId, durationSec: effectiveDur });
    playSynthesizedSfx(preset?.sfxType || 'whoosh');

    transitionFxTimerRef.current = window.setTimeout(() => {
      setActiveTransitionFx(null);
      transitionFxTimerRef.current = null;
    }, Math.max(280, Math.round(effectiveDur * 1000)));
  };

  useEffect(() => {
    return () => {
      if (transitionFxTimerRef.current !== null) {
        window.clearTimeout(transitionFxTimerRef.current);
      }
    };
  }, []);

  const handleAssignTransitionToBoundary = (
    boundaryId: string,
    transitionId: CinematicTransitionId,
    durationSec?: number
  ) => {
    const preset = getTransitionById(transitionId);
    if (!preset) return;
    const effectiveDur = durationSec ?? preset.defaultDurationSec;
    const boundary = clipBoundaries.find((b) => b.id === boundaryId);

    setAppliedTransitions((prev) => ({
      ...prev,
      [boundaryId]: {
        boundaryId,
        transitionId,
        durationSec: effectiveDur
      }
    }));
    setSelectedBoundaryId(boundaryId);
    triggerTransitionPreview(transitionId, effectiveDur, boundary?.timeSec);
    showToast(
      `Applied ${preset.name} (${effectiveDur.toFixed(2)}s) to ${boundary?.label || boundaryId}.`
    );
  };

  const handleApplyTransitionToAllBoundaries = (
    transitionId: CinematicTransitionId,
    durationSec?: number
  ) => {
    const preset = getTransitionById(transitionId);
    if (!preset) return;
    const effectiveDur = durationSec ?? preset.defaultDurationSec;
    const nextMap: Record<string, AppliedBoundaryTransition> = {};
    clipBoundaries.forEach((b) => {
      nextMap[b.id] = {
        boundaryId: b.id,
        transitionId,
        durationSec: effectiveDur
      };
    });
    setAppliedTransitions(nextMap);
    triggerTransitionPreview(transitionId, effectiveDur);
    showToast(
      `Applied ${preset.name} (${effectiveDur.toFixed(2)}s) across all ${clipBoundaries.length} clip boundaries.`
    );
  };

  const handleRemoveTransitionFromBoundary = (boundaryId: string) => {
    setAppliedTransitions((prev) => {
      const next = { ...prev };
      delete next[boundaryId];
      return next;
    });
  };

  const handleClearAllTransitions = () => {
    setAppliedTransitions({});
    showToast('Cleared all clip boundary transitions.');
  };

  const handleSplitClipAtPlayhead = () => {
    const candidate =
      currentTime > inPointSec + 1.2 && currentTime < outPointSec - 1.2
        ? Math.round(currentTime * 10) / 10
        : (() => {
            const longest = [...clipSegments].sort(
              (a, b) => b.durationSec - a.durationSec
            )[0];
            if (!longest || longest.durationSec < 2.2) return null;
            return Math.round(((longest.startSec + longest.endSec) / 2) * 10) / 10;
          })();

    if (candidate === null) {
      showToast('Move the playhead or extend the clip range to add another cut boundary.');
      return;
    }
    if (validCutPoints.some((c) => Math.abs(c.sec - candidate) < 1)) {
      showToast('A clip boundary already exists within 1s of that timestamp.');
      return;
    }
    const newId = `cut_${Date.now()}`;
    setCutPoints((prev) =>
      [...prev, { id: newId, sec: candidate }].sort((a, b) => a.sec - b.sec)
    );
    setSelectedBoundaryId(newId);
    playSynthesizedSfx('snap');
    showToast(`Added clip boundary at ${candidate.toFixed(1)}s. Drag a transition onto it.`);
  };

  const handleRemoveCutPoint = (cutId: string) => {
    setCutPoints((prev) => prev.filter((cp) => cp.id !== cutId));
    setAppliedTransitions((prev) => {
      const next = { ...prev };
      delete next[cutId];
      return next;
    });
  };

  const handleBoundaryDragOver = (e: React.DragEvent, boundaryId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (dragOverBoundaryId !== boundaryId) {
      setDragOverBoundaryId(boundaryId);
    }
  };

  const handleBoundaryDrop = (e: React.DragEvent, boundary: ClipBoundarySlot) => {
    e.preventDefault();
    setDragOverBoundaryId(null);
    const mimeRaw = e.dataTransfer.getData(TRANSITION_DRAG_MIME);
    let transitionIdCandidate = '';
    let customDuration: number | undefined;

    if (mimeRaw) {
      try {
        const parsed = JSON.parse(mimeRaw);
        transitionIdCandidate = String(parsed?.id || '');
        if (typeof parsed?.durationSec === 'number' && Number.isFinite(parsed.durationSec)) {
          customDuration = parsed.durationSec;
        }
      } catch {
        transitionIdCandidate = mimeRaw;
      }
    }
    if (!transitionIdCandidate) {
      transitionIdCandidate =
        e.dataTransfer.getData('text/plain') || draggingTransitionId || '';
    }

    const preset = getTransitionById(transitionIdCandidate);
    setDraggingTransitionId(null);
    if (!preset) return;
    handleAssignTransitionToBoundary(
      boundary.id,
      preset.id,
      customDuration ?? preset.defaultDurationSec
    );
  };

  // Video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Fire assigned boundary transition FX as playhead crosses cut seams
    if (isPlaying) {
      const now = Date.now();
      for (const boundary of clipBoundaries) {
        const assigned = appliedTransitions[boundary.id];
        if (!assigned) continue;
        const triggerWindow = Math.max(0.22, assigned.durationSec * 0.6);
        if (Math.abs(time - boundary.timeSec) <= triggerWindow) {
          const last = lastTriggeredBoundaryRef.current;
          if (!last || last.id !== boundary.id || now - last.triggeredAt > 1200) {
            lastTriggeredBoundaryRef.current = { id: boundary.id, triggeredAt: now };
            triggerTransitionPreview(assigned.transitionId, assigned.durationSec);
          }
          break;
        }
      }
    }

    // Loop bounds constraint
    if (time >= outPointSec) {
      if (isLoopPerfected) {
        videoRef.current.currentTime = inPointSec;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (!isNaN(dur) && dur > 0) {
      setVideoDuration(Math.round(dur * 10) / 10);
      if (outPointSec > dur || outPointSec === 38) {
        const nextOut = Math.min(dur, Math.max(15, dur));
        setOutPointSec(nextOut);
        setCutPoints([
          { id: 'cut_hook', sec: Math.round(nextOut * 0.33 * 10) / 10 },
          { id: 'cut_payoff', sec: Math.round(nextOut * 0.66 * 10) / 10 }
        ]);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (videoRef.current.currentTime < inPointSec || videoRef.current.currentTime >= outPointSec) {
        videoRef.current.currentTime = inPointSec;
      }
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSelectPreset = (preset: SampleVideoPreset) => {
    setSelectedPresetId(preset.id);
    setCustomFile(null);
    setVideoSrc(preset.videoUrl);
    setVideoDuration(preset.duration);
    setInPointSec(0);
    setOutPointSec(Math.min(30, preset.duration));
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomFile(file);
    setSelectedPresetId('custom');
    const localUrl = URL.createObjectURL(file);
    setVideoSrc(localUrl);
    setInPointSec(0);
    setTitle(file.name.replace(/\.[^/.]+$/, '').slice(0, 55));
  };

  // SFX Synth via Web Audio API
  const playSynthesizedSfx = (type: 'whoosh' | 'boom' | 'ding' | 'zoom' | 'glitch' | 'snap') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'whoosh') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'zoom') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(980, ctx.currentTime + 0.16);
        osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.32);
        gain.gain.setValueAtTime(0.28, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.32);
        osc.start();
        osc.stop(ctx.currentTime + 0.32);
      } else if (type === 'glitch') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.setValueAtTime(140, ctx.currentTime + 0.05);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(210, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.24);
        osc.start();
        osc.stop(ctx.currentTime + 0.24);
      } else if (type === 'snap') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.45, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.11);
        osc.start();
        osc.stop(ctx.currentTime + 0.11);
      } else if (type === 'boom') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === 'ding') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1760, ctx.currentTime);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.log('Web audio not allowed or failed:', e);
    }
  };

  // Custom Logo Upload Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogoUrl(url);
      setBrandLogoType('custom');
      playSynthesizedSfx('ding');
    }
  };

  // Render Brand Logo Icon for Overlay
  const renderBrandLogoIcon = (size: number) => {
    if (brandLogoType === 'custom' && customLogoUrl) {
      return (
        <img
          src={customLogoUrl}
          alt="Brand Logo"
          className="rounded-full object-cover shrink-0 border border-white/30"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      );
    }

    if (selectedBrandPreset === 'wealth') {
      return (
        <div 
          className="rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 flex items-center justify-center text-white font-black shadow-md shrink-0 border border-emerald-300/40"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <DollarSign className="w-full h-full text-white" />
        </div>
      );
    }

    if (selectedBrandPreset === 'cyber') {
      return (
        <div 
          className="rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-1 flex items-center justify-center text-white font-black shadow-md shrink-0 border border-cyan-300/40"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <Zap className="w-full h-full text-white" />
        </div>
      );
    }

    if (selectedBrandPreset === 'craft') {
      return (
        <div 
          className="rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 p-1 flex items-center justify-center text-white font-black shadow-md shrink-0 border border-amber-300/40"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <Award className="w-full h-full text-white" />
        </div>
      );
    }

    // Default 'shield'
    return (
      <div 
        className="rounded-full bg-gradient-to-tr from-amber-500 to-red-500 p-1 flex items-center justify-center text-white font-black shadow-md shrink-0 border border-amber-300/40"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <ShieldCheck className="w-full h-full text-white" />
      </div>
    );
  };

  // 1-Click Algorithmic Remix Modes
  const handleApplyRemixMode = (mode: 'faceless' | 'loop' | 'dopamine-speed') => {
    if (mode === 'faceless') {
      setIsMirrored(prev => !prev);
      setPlaybackSpeed(1.04);
      setColorFilter('dopamine');
      if (videoRef.current) videoRef.current.playbackRate = 1.04;
      playSynthesizedSfx('whoosh');
    } else if (mode === 'loop') {
      setIsLoopPerfected(true);
      // Align outPoint to avoid empty silence
      setOutPointSec(prev => Math.max(inPointSec + 5, prev - 0.5));
      playSynthesizedSfx('ding');
    } else if (mode === 'dopamine-speed') {
      setPlaybackSpeed(1.25);
      setColorFilter('dopamine');
      if (videoRef.current) videoRef.current.playbackRate = 1.25;
      playSynthesizedSfx('boom');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1-Click Automated Style Application
  const handleApplyAutomatedStyle = (style: 'mrbeast' | 'hormozi' | 'vox' | 'reddit' | 'cinematic' | 'minimalist') => {
    setActiveAutomatedStyle(style);
    if (style === 'mrbeast') {
      setCaptionPreset('mrbeast');
      setColorFilter('dopamine');
      setPlaybackSpeed(1.2);
      setDirectorialEffect('push_punch');
      setShowInfoTicker(true);
      setShowSourceCitation(false);
      setShowRedditCard(false);
      playSynthesizedSfx('whoosh');
      showToast('Applied MrBeast High-Contrast Viral Style (1.2x Speed, Dopamine Saturate)');
    } else if (style === 'hormozi') {
      setCaptionPreset('hormozi');
      setColorFilter('dopamine');
      setPlaybackSpeed(1.15);
      setDirectorialEffect('speed_ramp');
      setShowInfoTicker(true);
      setShowSourceCitation(false);
      setShowRedditCard(false);
      playSynthesizedSfx('boom');
      showToast('Applied Alex Hormozi Authority Punch Style (Bold Caps, Green Contrast)');
    } else if (style === 'vox') {
      setCaptionPreset('minimal');
      setColorFilter('cinematic');
      setPlaybackSpeed(1.05);
      setDirectorialEffect('none');
      setShowInfoTicker(true);
      setShowSourceCitation(true);
      setShowRedditCard(false);
      playSynthesizedSfx('ding');
      showToast('Applied Vox / Bloomberg Data Journalism Style (Verified Citations & Stats Ticker)');
    } else if (style === 'reddit') {
      setCaptionPreset('mrbeast');
      setColorFilter('none');
      setPlaybackSpeed(1.1);
      setDirectorialEffect('none');
      setShowRedditCard(true);
      setShowInfoTicker(false);
      setShowSourceCitation(true);
      setSourceCitationText(`${redditCardData.subreddit} Top Thread`);
      playSynthesizedSfx('ding');
      showToast('Applied Reddit Suspense Storytime Style (Reddit Post Card & Narration Sync)');
    } else if (style === 'cinematic') {
      setCaptionPreset('neon');
      setColorFilter('cinematic');
      setPlaybackSpeed(1.08);
      setDirectorialEffect('dutch_tilt');
      setShowInfoTicker(false);
      setShowSourceCitation(true);
      setShowRedditCard(false);
      playSynthesizedSfx('whoosh');
      showToast('Applied Cinematic Directorial Master Style (Dutch Angle, Anamorphic Framing)');
    } else if (style === 'minimalist') {
      setCaptionPreset('minimal');
      setColorFilter('none');
      setPlaybackSpeed(1.0);
      setDirectorialEffect('none');
      setShowInfoTicker(true);
      setShowSourceCitation(true);
      setShowRedditCard(false);
      playSynthesizedSfx('ding');
      showToast('Applied Minimalist Tech Breakdown Style (Monospace Badges)');
    }
  };

  const handleRipStructureAndClip = (scraped: ScrapedVideoItem) => {
    setVideoSrc(scraped.sampleVideoUrl);
    setInPointSec(scraped.inPointSec);
    setOutPointSec(scraped.outPointSec);
    setTitle(`${scraped.title.slice(0, 55)} #Shorts`);
    setCaptionText(scraped.hookText);
    setDescription(`${scraped.transcript}\n\n#shorts #viral #growth\n📌 Blueprint in pinned comment!`);
    setSourceCitationText(scraped.sourceCitation);
    setInfoTickerText(scraped.dataFactTicker);
    setShowInfoTicker(true);
    setShowSourceCitation(true);
    setShowRedditCard(false);
    setActiveSuiteMode('clipper');
    playSynthesizedSfx('ding');
    showToast(`Loaded winning structure for "${scraped.title.slice(0, 30)}..." into Precision Clipper!`);
  };

  const handleLoadRedditIntoClipper = (config: any) => {
    setVideoSrc(config.videoUrl);
    setCaptionText(config.hookText);
    setTitle(config.title);
    setDescription(config.description);
    setTags(config.tags);
    setCaptionPreset(config.captionPreset);
    setSourceCitationText(config.sourceCitation);
    setInfoTickerText(config.dataFactTicker);
    setRedditCardData(config.redditPostCard);
    setShowRedditCard(true);
    setShowInfoTicker(false);
    setShowSourceCitation(true);
    setActiveSuiteMode('clipper');
    playSynthesizedSfx('ding');
    showToast('Loaded Reddit Story and Card overlay into Precision Clipper!');
  };

  const handleQueueClippedToPipeline = () => {
    const pipelineItem = {
      queueId: `q_clipped_${Date.now()}`,
      sequenceOrder: 1,
      title,
      niche: 'High-Retention Short',
      durationSec: clipDuration,
      videoUrl: videoSrc,
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '12:00 PM',
      status: 'queued',
      uploadProgress: 0,
      estimatedEarnings: Number((clipDuration * 1.85).toFixed(2)),
      cpm: '$12.50',
      retentionPredicted: 96.8,
      affiliateDisclosureAdded: true,
      advertiserGreenDollar: true,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      description,
      transitions: Object.values(appliedTransitions)
    };
    if (onSendToPipeline) {
      onSendToPipeline(pipelineItem);
    }
    playSynthesizedSfx('ding');
    showToast('Queued clipped short into Sequential Pipeline Registry for automated revenue!');
  };

  const handleSaveToAssetArchive = () => {
    if (onSendToAssets) {
      onSendToAssets({
        title,
        videoUrl: videoSrc,
        duration: clipDuration,
        tags: tags.split(',').map(t => t.trim()),
        description,
        sourceCitation: sourceCitationText,
        transitions: Object.values(appliedTransitions)
      });
    }
    playSynthesizedSfx('ding');
    showToast('Saved clipped short with metadata into Asset Library Archive!');
  };

  // Direct YouTube Upload Action
  const handleLaunchDirectUpload = () => {
    setUploadStatus('uploading');
    setUploadProgress(15);

    setTimeout(() => setUploadProgress(45), 700);
    setTimeout(() => setUploadProgress(80), 1400);
    setTimeout(() => {
      setUploadProgress(100);
      setUploadStatus('processing');
    }, 2000);
    setTimeout(() => {
      const vidId = 'ys_' + Math.random().toString(36).substring(2, 9);
      setPublishedShortId(vidId);
      setUploadStatus('published');
      playSynthesizedSfx('ding');
    }, 2800);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const clipDuration = Math.max(0, Math.round((outPointSec - inPointSec) * 10) / 10);
  const isShortsCompliant = clipDuration > 0 && clipDuration <= 60;

  // CSS Filter string based on color preset + live transition preview FX
  const getFilterStyle = () => {
    let base = '';
    if (colorFilter === 'dopamine') base += 'saturate(1.4) contrast(1.15) brightness(1.05) ';
    if (colorFilter === 'cinematic') base += 'contrast(1.2) sepia(0.15) saturate(1.1) ';
    if (colorFilter === 'cyber') base += 'hue-rotate(200deg) contrast(1.3) saturate(1.5) ';
    if (colorFilter === 'noir') base += 'grayscale(1) contrast(1.4) brightness(0.95) ';

    if (activeTransitionFx) {
      switch (activeTransitionFx.transitionId) {
        case 'rgb_glitch':
          base += 'contrast(1.65) saturate(2.2) hue-rotate(42deg) ';
          break;
        case 'vhs_glitch':
          base += 'contrast(1.85) saturate(0.45) brightness(1.15) ';
          break;
        case 'snap_cut':
          base += 'brightness(1.7) contrast(1.3) ';
          break;
        case 'flash_strobe':
          base += 'brightness(2.1) contrast(1.1) ';
          break;
        case 'whip_pan':
          base += 'blur(3px) contrast(1.15) ';
          break;
        case 'zoom_punch':
        case 'zoom_out':
        case 'beat_snap':
          base += 'contrast(1.2) saturate(1.15) ';
          break;
      }
    }
    return base.trim();
  };

  const getTransitionTransform = () => {
    if (!activeTransitionFx) return '';
    switch (activeTransitionFx.transitionId) {
      case 'zoom_punch':
        return 'scale(1.32)';
      case 'zoom_out':
        return 'scale(0.86)';
      case 'rgb_glitch':
        return 'translateX(5px) skewX(3deg) scale(1.04)';
      case 'vhs_glitch':
        return 'translateX(-6px) skewX(-5deg) scale(1.03)';
      case 'snap_cut':
        return 'scale(1.14)';
      case 'beat_snap':
        return 'scale(1.22) rotate(1.2deg)';
      case 'whip_pan':
        return 'translateX(-18%) scale(1.12)';
      case 'flash_strobe':
        return 'scale(1.05)';
      default:
        return '';
    }
  };

  // Python and curl scripts for Developer API Exporter
  const pythonScript = `# YouTube Data API v3 Direct Short Publishing Script
import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.http

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]

def publish_remixed_short():
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file("client_secrets.json", SCOPES)
    credentials = flow.run_local_server(port=0)
    youtube = googleapiclient.discovery.build("youtube", "v3", credentials=credentials)

    body = {
        "snippet": {
            "title": """${title.replace(/"/g, '\\"')}""",
            "description": """${description.replace(/"/g, '\\"')}\\n\\n#shorts #viral #algorithm""",
            "tags": [${tags.split(',').map(t => `"${t.trim()}"`).join(', ')}],
            "categoryId": "27"
        },
        "status": {
            "privacyStatus": "${privacy}",
            "selfDeclaredMadeForKids": False
        }
    }

    media = googleapiclient.http.MediaFileUpload("clipped_short_${clipDuration}s.mp4", chunksize=-1, resumable=True, mimetype="video/mp4")
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)
    response = request.execute()
    print(f"[✓] Published Short to YouTube: https://youtube.com/shorts/{response['id']}")

if __name__ == "__main__":
    publish_remixed_short()
`;

  const curlCommand = `curl -X POST \\
  "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status" \\
  -H "Authorization: Bearer YOUR_OAUTH_ACCESS_TOKEN" \\
  -H "Content-Type: application/json; charset=UTF-8" \\
  -H "X-Upload-Content-Type: video/mp4" \\
  -d '{
    "snippet": {
      "title": "${title.replace(/"/g, '\\"')}",
      "description": "${description.replace(/\n/g, '\\n').replace(/"/g, '\\"')}",
      "tags": [${tags.split(',').map(t => `"${t.trim()}"`).join(', ')}],
      "categoryId": "27"
    },
    "status": {
      "privacyStatus": "${privacy}"
    }
  }'`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-indigo-950/40 border border-red-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                <Scissors className="w-5 h-5 text-red-500" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Shorts Video Clipper, Remix &amp; AI Storyboard Suite
              </h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-3xl">
              Precision sub-second video clipper, 9:16 vertical framer, AI Storyboard generator breaking long-form videos into sequential high-retention frames, and direct YouTube Data API uploader.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-wrap bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 gap-1">
              <button
                onClick={() => setActiveSuiteMode('clipper')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSuiteMode === 'clipper'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Precision Clipper</span>
              </button>

              <button
                onClick={() => setActiveSuiteMode('scraped_vault')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSuiteMode === 'scraped_vault'
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Scraped Top Videos</span>
                <span className="text-[9px] font-mono bg-black/50 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/20">
                  Top 100
                </span>
              </button>

              <button
                onClick={() => setActiveSuiteMode('reddit_production')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSuiteMode === 'reddit_production'
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                <span>Reddit Production</span>
                <span className="text-[9px] font-mono bg-black/50 text-orange-300 px-1.5 py-0.2 rounded border border-orange-500/20">
                  98% Ret
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveSuiteMode('storyboard');
                  if (!storyboardResult) handleGenerateStoryboard();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSuiteMode === 'storyboard'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Clapperboard className="w-3.5 h-3.5 text-indigo-300" />
                <span>AI Storyboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Toast */}
        {toastMessage && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white text-xs">Dismiss</button>
          </div>
        )}

        {/* Video Source Preset Selector (Only in Clipper Mode) */}
        {activeSuiteMode === 'clipper' && (
          <div className="mt-5 pt-4 border-t border-zinc-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Select Video Source or Upload:
              </span>
              <label className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer font-semibold">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Your Video (.mp4 / .mov)</span>
                <input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {SAMPLE_VIDEOS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-500/10 border-red-500/50 text-white shadow-sm shadow-red-950/50'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span className="truncate">{preset.name}</span>
                      <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded font-mono">
                        {preset.duration}s
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {activeSuiteMode === 'clipper' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 9:16 Vertical Video Monitor & Safe Zone Simulation */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-red-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                9:16 Shorts Monitor
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSafeZoneOverlay(!showSafeZoneOverlay)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors cursor-pointer font-medium ${
                  showSafeZoneOverlay 
                    ? 'bg-red-500/20 border-red-500/40 text-red-300' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                }`}
              >
                <Eye className="w-3 h-3" />
                Safe Zones
              </button>
            </div>
          </div>

          {/* 9:16 Smartphone Mockup Preview Screen */}
          <div className="relative w-[280px] h-[498px] bg-black rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl flex items-center justify-center select-none group">
            
            {/* Background Split Screen or Blurred Fill */}
            {framingMode === 'split-screen' && (
              <div className="absolute inset-0 flex flex-col">
                <div className="h-1/2 w-full overflow-hidden bg-black">
                  <video 
                    src={videoSrc}
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ filter: getFilterStyle() }}
                  />
                </div>
                <div className="h-1/2 w-full bg-zinc-900 overflow-hidden relative border-t border-zinc-700">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950 via-zinc-900 to-indigo-950 flex items-center justify-center p-4 text-center">
                    <span className="text-[11px] text-zinc-400 font-mono">
                      Satisfying Dynamic B-Roll Layer (Subway / Minecraft / 3D Turf)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Main Video Element */}
            {framingMode !== 'split-screen' && (
              <video
                ref={videoRef}
                src={videoSrc}
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-cover"
                style={{
                  filter: getFilterStyle(),
                  transform: `translateX(${panXOffset}%) ${isMirrored ? 'scaleX(-1)' : ''} ${
                    directorialEffect === 'push_punch' ? 'scale(1.15)' :
                    directorialEffect === 'dutch_tilt' ? 'rotate(-3.5deg) scale(1.08)' :
                    directorialEffect === 'speed_ramp' ? 'scale(1.06)' :
                    directorialEffect === 'whip_pan' ? 'translateX(14px)' : ''
                  } ${getTransitionTransform()}`,
                  transition: activeTransitionFx
                    ? 'transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), filter 0.12s ease-out'
                    : 'transform 0.15s ease-out'
                }}
              />
            )}

            {/* Live Cinematic Transition Visual FX Overlay */}
            {activeTransitionFx && (
              <div className="absolute inset-0 pointer-events-none z-28 overflow-hidden">
                {(activeTransitionFx.transitionId === 'rgb_glitch' ||
                  activeTransitionFx.transitionId === 'vhs_glitch') && (
                  <>
                    <div className="absolute inset-x-0 top-[22%] h-6 bg-cyan-400/25 mix-blend-screen translate-x-2" />
                    <div className="absolute inset-x-0 top-[54%] h-4 bg-red-500/30 mix-blend-screen -translate-x-2" />
                    <div className="absolute inset-x-0 bottom-[18%] h-3 bg-white/20 mix-blend-overlay translate-x-1" />
                  </>
                )}
                {(activeTransitionFx.transitionId === 'snap_cut' ||
                  activeTransitionFx.transitionId === 'flash_strobe') && (
                  <div className="absolute inset-0 bg-white/45 transition-opacity duration-150" />
                )}
                {(activeTransitionFx.transitionId === 'zoom_punch' ||
                  activeTransitionFx.transitionId === 'zoom_out' ||
                  activeTransitionFx.transitionId === 'whip_pan' ||
                  activeTransitionFx.transitionId === 'beat_snap') && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.65)_100%)]" />
                )}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/85 border border-zinc-700 rounded-md px-2.5 py-1 text-[10px] font-mono text-white whitespace-nowrap flex items-center gap-1.5">
                  <Wand2 className="w-3 h-3 text-red-400" />
                  <span>
                    {getTransitionById(activeTransitionFx.transitionId)?.name} ({activeTransitionFx.durationSec.toFixed(2)}s)
                  </span>
                </div>
              </div>
            )}

            {/* Dynamic Statistics / Data Ticker Overlay */}
            {showInfoTicker && (
              <div className="absolute top-12 inset-x-2.5 pointer-events-none z-22">
                <div className="bg-black/85 backdrop-blur-md border border-emerald-500/50 rounded-lg px-2 py-1 flex items-center justify-between text-[8px] font-mono shadow-lg">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-emerald-300 font-bold truncate">{infoTickerText}</span>
                  </div>
                  <span className="text-[7px] text-zinc-400 font-bold ml-1 shrink-0 uppercase tracking-wider">LIVE DATA</span>
                </div>
              </div>
            )}

            {/* Verified Fact Stamp / Source Citation Banner */}
            {showSourceCitation && (
              <div className="absolute top-[72px] inset-x-2.5 pointer-events-none z-22">
                <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-700/80 rounded-md px-2 py-0.5 flex items-center gap-1 text-[8px] font-mono text-zinc-300 shadow">
                  <ShieldCheck className="w-2.5 h-2.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{sourceCitationText}</span>
                </div>
              </div>
            )}

            {/* Authentic Reddit Post Card Mockup Overlay */}
            {showRedditCard && (
              <div className="absolute top-14 inset-x-2.5 pointer-events-none z-24 animate-fadeIn">
                <div className="bg-[#1a1a1b]/95 backdrop-blur-md border border-[#343536] rounded-xl p-2.5 shadow-2xl text-left space-y-1 font-sans">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-[8px]">
                        r/
                      </div>
                      <span className="text-[9px] font-bold text-white">{redditCardData.subreddit}</span>
                      <span className="text-[8px] text-zinc-400">• {redditCardData.author}</span>
                    </div>
                    <span className="text-[8px] font-mono text-orange-400 font-bold bg-[#272729] px-1.5 py-0.2 rounded">
                      🔥 Viral
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                    {redditCardData.title}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 text-[8px] text-zinc-400 font-mono">
                    <span className="text-orange-500 font-bold">⬆️ {redditCardData.upvotes}</span>
                    <span>💬 {redditCardData.comments}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Captions Overlay */}
            {showCaptions && (
              <div className="absolute bottom-[32%] inset-x-4 pointer-events-none text-center z-20">
                <div className={`inline-block px-3 py-1.5 max-w-[90%] font-black uppercase tracking-tight transition-all ${
                  captionPreset === 'mrbeast' 
                    ? 'text-yellow-300 bg-black/85 rounded-lg border-2 border-yellow-400 text-sm shadow-lg shadow-black/80 font-sans' :
                  captionPreset === 'hormozi'
                    ? 'text-emerald-400 bg-zinc-950/90 rounded-md text-xs tracking-wider border border-emerald-500 font-mono' :
                  captionPreset === 'neon'
                    ? 'text-cyan-300 bg-indigo-950/90 text-xs rounded-lg border border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]' :
                    'text-white bg-zinc-900/80 text-xs rounded-md px-2 py-1 font-sans'
                }`}>
                  {captionText}
                </div>
              </div>
            )}

            {/* BRAND PROTECTION & ANTI-THEFT WATERMARK LAYER */}
            {brandProtectionEnabled && (
              <div 
                className={`absolute z-25 pointer-events-none transition-all ${
                  watermarkPosition === 'top-right' ? 'top-14 right-3' :
                  watermarkPosition === 'top-left' ? 'top-14 left-3' :
                  watermarkPosition === 'bottom-left' ? 'bottom-20 left-3' :
                  watermarkPosition === 'bottom-right' ? 'bottom-40 right-3' :
                  'inset-0 flex items-center justify-center overflow-hidden'
                }`}
                style={{ opacity: watermarkOpacity / 100 }}
              >
                {watermarkPosition === 'diagonal-tile' ? (
                  <div className="rotate-[-32deg] select-none text-center space-y-4 whitespace-nowrap">
                    <div className="text-[10px] font-mono font-black text-white/50 tracking-widest uppercase">
                      {channelHandle} • ORIGINAL CREATOR RIGHTS RESERVED
                    </div>
                    <div className="text-[9px] font-mono text-white/40 tracking-wider">
                      LICENSED BY SHORTSFORGE • DO NOT RE-UPLOAD
                    </div>
                  </div>
                ) : watermarkStyle === 'pill' ? (
                  <div className="bg-black/75 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-lg shadow-black/80">
                    {renderBrandLogoIcon(Math.max(16, Math.min(24, Math.round(watermarkScale * 0.5))))}
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold text-white font-mono leading-none">
                        {channelHandle}
                      </span>
                      <span className="text-[7px] text-emerald-400 font-mono font-bold leading-tight mt-0.5">
                        ✓ Verified IP
                      </span>
                    </div>
                  </div>
                ) : watermarkStyle === 'timecode-stamp' ? (
                  <div className="bg-black/80 backdrop-blur-sm border border-red-500/40 rounded-lg px-2 py-1 flex items-center gap-1.5 font-mono shadow-md">
                    {renderBrandLogoIcon(16)}
                    <div className="text-[9px] text-white">
                      <span className="font-bold text-red-400">REC </span>
                      <span>[{currentTime.toFixed(1)}s] </span>
                      <span className="text-zinc-400">{channelHandle}</span>
                    </div>
                  </div>
                ) : (
                  <div className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {renderBrandLogoIcon(Math.round(watermarkScale * 0.7))}
                  </div>
                )}
              </div>
            )}

            {/* YouTube Shorts UI Safe-Zone Overlay */}
            {showSafeZoneOverlay && (
              <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 border border-red-500/30">
                {/* Top Header Safe Zone Boundary */}
                <div className="bg-red-500/10 border-b border-red-500/30 text-[9px] text-red-300 py-1 px-2 rounded font-mono text-center">
                  ⚠️ Danger Zone: YouTube Search &amp; Header (Keep clear)
                </div>

                {/* Right Side UI Buttons (Like, Dislike, Comment, Share, Sound Disk) */}
                <div className="absolute right-2 bottom-16 space-y-3 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-zinc-900/80 border border-zinc-700/60 flex items-center justify-center text-[9px] text-zinc-300 font-bold">
                    👍
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-900/80 border border-zinc-700/60 flex items-center justify-center text-[9px] text-zinc-300 font-bold">
                    💬
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-900/80 border border-zinc-700/60 flex items-center justify-center text-[9px] text-zinc-300 font-bold">
                    ↗️
                  </div>
                  <div className="w-7 h-7 rounded-full bg-red-600 border border-zinc-600 animate-spin flex items-center justify-center text-[8px] text-white">
                    🎵
                  </div>
                </div>

                {/* Bottom Title & Channel Safe Zone Boundary */}
                <div className="bg-red-500/10 border-t border-red-500/30 text-[9px] text-red-300 py-2 px-2 rounded font-mono">
                  <div className="font-bold">⚠️ Danger Zone: Channel Name &amp; Description</div>
                  <div className="text-[8px] text-zinc-400 truncate">@ShortsForgeChannel • Original Sound</div>
                </div>
              </div>
            )}

            {/* Center Play Button Overlay on hover */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-40 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl shadow-red-950/60 transform hover:scale-105 transition-transform">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </div>
            </button>
          </div>

          {/* Player controls toolbar */}
          <div className="w-full mt-4 flex items-center justify-between text-xs text-zinc-400 bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <span className="font-mono text-[11px] text-zinc-300">
                {currentTime.toFixed(1)}s / {videoDuration.toFixed(1)}s
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Speed:</span>
              {[1.0, 1.1, 1.25, 1.5].map(s => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                    playbackSpeed === s ? 'bg-red-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline Clipper, Editing Suite & YouTube Uploader */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* SECTION 1: TIMELINE CLIPPER (Mark In & Mark Out + Clip Boundaries & Cinematic Transitions) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-red-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Video Timeline Clipper
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransitionsDrawer((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors border ${
                    showTransitionsDrawer
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-100 border-zinc-700'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Cinematic Transitions</span>
                  <span className="font-mono tabular-nums text-[11px] opacity-85">
                    ({Object.keys(appliedTransitions).length})
                  </span>
                </button>

                <span className={`text-xs font-mono tabular-nums font-semibold ${
                  isShortsCompliant ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {clipDuration}s {isShortsCompliant ? '· Shorts OK' : '· Exceeds 60s'}
                </span>
              </div>
            </div>

            {/* Collapsible Cinematic Transitions Drawer (Docked non-blocking for direct drag-and-drop onto timeline boundaries) */}
            <CinematicTransitionsDrawer
              isOpen={showTransitionsDrawer}
              onClose={() => setShowTransitionsDrawer(false)}
              boundaries={clipBoundaries}
              appliedTransitions={appliedTransitions}
              selectedBoundaryId={selectedBoundaryId}
              draggingTransitionId={draggingTransitionId}
              onDragStartTransition={(id) => setDraggingTransitionId(id)}
              onDragEndTransition={() => {
                setDraggingTransitionId(null);
                setDragOverBoundaryId(null);
              }}
              onAssignTransition={handleAssignTransitionToBoundary}
              onApplyToAllBoundaries={handleApplyTransitionToAllBoundaries}
              onRemoveTransition={handleRemoveTransitionFromBoundary}
              onClearAllTransitions={handleClearAllTransitions}
              onPreviewTransition={triggerTransitionPreview}
            />

            {/* Quick Trim & Split Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-zinc-400 font-semibold">Quick Trim:</span>
                <button
                  type="button"
                  onClick={() => {
                    setInPointSec(0);
                    setOutPointSec(Math.min(15, videoDuration));
                  }}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer"
                >
                  15s (Max Retention)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInPointSec(0);
                    setOutPointSec(Math.min(30, videoDuration));
                  }}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer"
                >
                  30s (Story Hook)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInPointSec(0);
                    setOutPointSec(Math.min(50, videoDuration));
                  }}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer"
                >
                  50s (Deep Value)
                </button>
              </div>

              <button
                type="button"
                onClick={handleSplitClipAtPlayhead}
                className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg text-xs font-medium flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-red-400" />
                Split Cut
              </button>
            </div>

            {/* Visual Scrubber Timeline Bar with Interactive Drop-Target Cut Markers */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-4">
              <div className="relative h-14 bg-zinc-900 rounded-lg overflow-visible border border-zinc-800 flex items-center">
                
                {/* Filmstrip faux thumbnails */}
                <div className="absolute inset-0 flex opacity-20 divide-x divide-zinc-700 rounded-lg overflow-hidden">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex-1 bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-400 font-mono tabular-nums">
                      {Math.round((i / 8) * videoDuration)}s
                    </div>
                  ))}
                </div>

                {/* Selected Active Trim Interval (Highlighted in Red) */}
                {(() => {
                  const leftPct = (inPointSec / Math.max(1, videoDuration)) * 100;
                  const widthPct = ((outPointSec - inPointSec) / Math.max(1, videoDuration)) * 100;
                  return (
                    <div 
                      className="absolute top-0 bottom-0 bg-red-600/20 border-x-2 border-red-500 z-10 flex items-start justify-between p-1 pointer-events-none"
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    >
                      <span className="text-[10px] font-mono tabular-nums font-bold text-red-200 bg-red-950/90 px-1 rounded">
                        IN {inPointSec}s
                      </span>
                      <span className="text-[10px] font-mono tabular-nums font-bold text-red-200 bg-red-950/90 px-1 rounded">
                        OUT {outPointSec}s
                      </span>
                    </div>
                  );
                })()}

                {/* Drop-Target Clip Boundary Markers Directly on the Timeline */}
                {clipBoundaries.map((boundary) => {
                  const pct = Math.max(
                    1,
                    Math.min(99, (boundary.timeSec / Math.max(1, videoDuration)) * 100)
                  );
                  const assigned = appliedTransitions[boundary.id];
                  const preset = assigned ? getTransitionById(assigned.transitionId) : undefined;
                  const isDragHover = dragOverBoundaryId === boundary.id;
                  const isSelected = selectedBoundaryId === boundary.id;

                  return (
                    <div
                      key={boundary.id}
                      onDragOver={(e) => handleBoundaryDragOver(e, boundary.id)}
                      onDragEnter={(e) => handleBoundaryDragOver(e, boundary.id)}
                      onDragLeave={() => {
                        if (dragOverBoundaryId === boundary.id) setDragOverBoundaryId(null);
                      }}
                      onDrop={(e) => handleBoundaryDrop(e, boundary)}
                      onClick={() => {
                        setSelectedBoundaryId(boundary.id);
                        if (preset && assigned) {
                          triggerTransitionPreview(preset.id, assigned.durationSec, boundary.timeSec);
                        } else if (videoRef.current) {
                          videoRef.current.currentTime = boundary.timeSec;
                          setCurrentTime(boundary.timeSec);
                        }
                      }}
                      style={{ left: `${pct}%` }}
                      title={`${boundary.label} (${boundary.timeSec.toFixed(1)}s) — ${preset ? `${preset.name} (${assigned.durationSec.toFixed(2)}s)` : 'Drop transition here'}`}
                      className={`absolute top-0 bottom-0 -translate-x-1/2 z-20 flex flex-col items-center justify-center cursor-pointer transition-transform ${
                        isDragHover ? 'scale-125 z-30' : ''
                      }`}
                    >
                      <div
                        className={`w-0.5 h-full ${
                          isDragHover
                            ? 'bg-amber-400'
                            : preset
                              ? 'bg-emerald-400/80'
                              : draggingTransitionId
                                ? 'bg-amber-400/70'
                                : 'bg-zinc-500/60'
                        }`}
                      />
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                          isDragHover
                            ? 'bg-amber-500 border-amber-200 text-zinc-950 shadow-lg'
                            : preset
                              ? `bg-zinc-950 ${preset.borderClass} ${preset.accentClass}`
                              : draggingTransitionId
                                ? 'bg-zinc-950 border-dashed border-amber-400 text-amber-300'
                                : isSelected
                                  ? 'bg-zinc-900 border-red-400 text-white'
                                  : 'bg-zinc-950 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        {preset ? (
                          renderTransitionIcon(preset.id, 'w-3 h-3')
                        ) : (
                          <Wand2 className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Current Playhead indicator */}
                {(() => {
                  const playPct = (currentTime / Math.max(1, videoDuration)) * 100;
                  return (
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white z-25 pointer-events-none"
                      style={{ left: `${playPct}%` }}
                    />
                  );
                })()}
              </div>

              {/* Clip Segments & Explicit Drag-and-Drop Boundary Seams */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-zinc-300 font-semibold">
                    Clip Boundaries ({clipSegments.length} segments · {clipBoundaries.length} transition seams)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowTransitionsDrawer(true)}
                    className="text-red-400 hover:text-red-300 font-medium cursor-pointer"
                  >
                    {showTransitionsDrawer
                      ? 'Drag Zoom, Glitch, or Snap onto any seam below'
                      : 'Open Cinematic Transitions Drawer'}
                  </button>
                </div>

                <div className="flex items-stretch gap-1.5 overflow-x-auto pb-1">
                  {clipBoundaries.map((boundary, bIdx) => {
                    const assigned = appliedTransitions[boundary.id];
                    const preset = assigned ? getTransitionById(assigned.transitionId) : undefined;
                    const isDragHover = dragOverBoundaryId === boundary.id;
                    const isSelected = selectedBoundaryId === boundary.id;
                    const segmentAfter = bIdx < clipSegments.length ? clipSegments[bIdx] : null;
                    const cutIdx = boundary.kind === 'cut' ? bIdx - 1 : -1;

                    return (
                      <React.Fragment key={boundary.id}>
                        {/* Boundary Drop Zone */}
                        <div
                          onDragOver={(e) => handleBoundaryDragOver(e, boundary.id)}
                          onDragEnter={(e) => handleBoundaryDragOver(e, boundary.id)}
                          onDragLeave={() => {
                            if (dragOverBoundaryId === boundary.id) setDragOverBoundaryId(null);
                          }}
                          onDrop={(e) => handleBoundaryDrop(e, boundary)}
                          onClick={() => {
                            setSelectedBoundaryId(boundary.id);
                            if (preset && assigned) {
                              triggerTransitionPreview(
                                preset.id,
                                assigned.durationSec,
                                boundary.timeSec
                              );
                            } else if (!showTransitionsDrawer) {
                              setShowTransitionsDrawer(true);
                            }
                          }}
                          className={`min-w-[96px] shrink-0 rounded-lg border px-2 py-2 flex flex-col justify-between gap-1 cursor-pointer transition-all ${
                            isDragHover
                              ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400/50 scale-[1.03]'
                              : preset
                                ? `${preset.bgTintClass} ${preset.borderClass}`
                                : draggingTransitionId
                                  ? 'bg-zinc-900 border-dashed border-amber-400/80'
                                  : isSelected
                                    ? 'bg-zinc-900 border-red-500/60'
                                    : 'bg-zinc-900/70 border-dashed border-zinc-700 hover:border-zinc-500'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-mono tabular-nums text-zinc-400">
                              {boundary.timeSec.toFixed(1)}s
                            </span>
                            <div className="flex items-center gap-0.5">
                              {preset && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveTransitionFromBoundary(boundary.id);
                                  }}
                                  aria-label={`Remove transition from ${boundary.label}`}
                                  className="text-zinc-500 hover:text-red-400 cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                              {!preset && boundary.kind === 'cut' && validCutPoints.length > 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveCutPoint(boundary.id);
                                  }}
                                  aria-label={`Remove cut at ${boundary.timeSec.toFixed(1)}s`}
                                  title="Remove cut boundary"
                                  className="text-zinc-600 hover:text-red-400 cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {preset ? (
                            <div className="flex items-center gap-1 min-w-0">
                              <span className={`${preset.accentClass} shrink-0`}>
                                {renderTransitionIcon(preset.id, 'w-3 h-3')}
                              </span>
                              <span className="text-[11px] font-semibold text-white truncate">
                                {preset.shortLabel}
                              </span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-zinc-400 leading-tight">
                              {isDragHover
                                ? 'Drop here'
                                : draggingTransitionId
                                  ? 'Drop FX'
                                  : boundary.kind === 'intro'
                                    ? 'Intro seam'
                                    : boundary.kind === 'outro'
                                      ? 'Loop seam'
                                      : `Cut #${cutIdx + 1}`}
                            </div>
                          )}
                        </div>

                        {/* Clip Segment Block */}
                        {segmentAfter && (
                          <button
                            type="button"
                            onClick={() => {
                              if (videoRef.current) {
                                videoRef.current.currentTime = segmentAfter.startSec;
                                setCurrentTime(segmentAfter.startSec);
                              }
                            }}
                            className="flex-1 min-w-[92px] rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2.5 py-2 text-left flex flex-col justify-between cursor-pointer transition-colors"
                          >
                            <span className="text-[11px] font-semibold text-zinc-200 truncate">
                              {segmentAfter.label}
                            </span>
                            <span className="text-[10px] font-mono tabular-nums text-zinc-500">
                              {segmentAfter.startSec.toFixed(1)}s–{segmentAfter.endSec.toFixed(1)}s ({segmentAfter.durationSec}s)
                            </span>
                          </button>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Sliders for In-Point and Out-Point */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-zinc-300">Mark In (Start)</label>
                    <span className="text-[11px] font-mono tabular-nums text-red-400 font-bold">{inPointSec}s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, outPointSec - 1)}
                    step={0.5}
                    value={inPointSec}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setInPointSec(val);
                      if (videoRef.current) videoRef.current.currentTime = val;
                    }}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-zinc-300">Mark Out (End)</label>
                    <span className="text-[11px] font-mono tabular-nums text-red-400 font-bold">{outPointSec}s</span>
                  </div>
                  <input
                    type="range"
                    min={Math.min(videoDuration, inPointSec + 1)}
                    max={videoDuration}
                    step={0.5}
                    value={outPointSec}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setOutPointSec(val);
                      if (videoRef.current) videoRef.current.currentTime = val;
                    }}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: EDITING, FRAMING & REMIX ENGINE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Styling &amp; Fair-Use Remix Engine
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">1-Click Transformation</span>
            </div>

            {/* AUTOMATED STYLES ENGINE */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                ⚡ 6 Instant Automated Styles (1-Click Pacing, Grading &amp; SFX):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'mrbeast', name: 'MrBeast High-Contrast', badge: '1.2x Speed', color: 'from-yellow-600 to-amber-600' },
                  { id: 'hormozi', name: 'Alex Hormozi Punch', badge: 'Impact Caps', color: 'from-emerald-600 to-teal-600' },
                  { id: 'vox', name: 'Vox / Bloomberg Data', badge: 'Stats Ticker', color: 'from-blue-600 to-indigo-600' },
                  { id: 'reddit', name: 'Reddit Suspense Story', badge: 'Card Overlay', color: 'from-orange-600 to-amber-600' },
                  { id: 'cinematic', name: 'Cinematic Directorial', badge: 'Dutch 2.35:1', color: 'from-purple-600 to-pink-600' },
                  { id: 'minimalist', name: 'Minimalist Tech', badge: 'Clean Mono', color: 'from-zinc-700 to-zinc-600' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleApplyAutomatedStyle(st.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeAutomatedStyle === st.id
                        ? 'bg-zinc-800 border-red-500 shadow-md ring-1 ring-red-500/40'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
                    }`}
                  >
                    <span className="text-xs font-bold text-white truncate">{st.name}</span>
                    <span className="text-[9px] font-mono text-zinc-400 mt-1">{st.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* DIRECTORIAL CAMERA ELEMENTS */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  🎬 Directorial Camera Motion:
                </span>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase">
                  {directorialEffect}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
                {[
                  { id: 'none', label: 'Static Lock' },
                  { id: 'push_punch', label: 'Push Punch (1.15x)' },
                  { id: 'dutch_tilt', label: 'Dutch Tilt (-3°)' },
                  { id: 'speed_ramp', label: 'Speed Ramp (1.06x)' },
                  { id: 'whip_pan', label: 'Whip Pan' }
                ].map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => {
                      setDirectorialEffect(eff.id as any);
                      playSynthesizedSfx('whoosh');
                    }}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      directorialEffect === eff.id
                        ? 'bg-red-600 text-white border-red-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {eff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* INFORMATIONAL OVERLAYS EDITORS */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                📊 Informational Overlays &amp; Citations:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Stats Ticker */}
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Dynamic Data Ticker Overlay
                    </label>
                    <input
                      type="checkbox"
                      checked={showInfoTicker}
                      onChange={(e) => setShowInfoTicker(e.target.checked)}
                      className="accent-emerald-500 cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={infoTickerText}
                    onChange={(e) => setInfoTickerText(e.target.value)}
                    disabled={!showInfoTicker}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono disabled:opacity-40"
                    placeholder="Stats metrics..."
                  />
                </div>

                {/* Source Citation */}
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      Verified Source Citation Banner
                    </label>
                    <input
                      type="checkbox"
                      checked={showSourceCitation}
                      onChange={(e) => setShowSourceCitation(e.target.checked)}
                      className="accent-indigo-500 cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={sourceCitationText}
                    onChange={(e) => setSourceCitationText(e.target.value)}
                    disabled={!showSourceCitation}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono disabled:opacity-40"
                    placeholder="Source citation..."
                  />
                </div>
              </div>
            </div>

            {/* Quick Algorithmic Remix Triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80">
              <button
                onClick={() => handleApplyRemixMode('faceless')}
                className="p-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Faceless Content ID Bypass
              </button>
              <button
                onClick={() => handleApplyRemixMode('loop')}
                className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Seamless Infinite Loop
              </button>
              <button
                onClick={() => handleApplyRemixMode('dopamine-speed')}
                className="p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                Dopamine Boost (1.25x)
              </button>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Aspect Ratio / Layout</label>
                <select
                  value={framingMode}
                  onChange={(e) => setFramingMode(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-white"
                >
                  <option value="9-16-crop">9:16 Vertical Crop</option>
                  <option value="split-screen">Split-Screen (Subway B-Roll)</option>
                  <option value="blurred-pillar">Blur Background</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Color Grading Filter</label>
                <select
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-white"
                >
                  <option value="none">Raw / Original</option>
                  <option value="dopamine">Dopamine Saturate (+35%)</option>
                  <option value="cinematic">Cinematic Teal &amp; Orange</option>
                  <option value="cyber">Cyber Synth Neon</option>
                  <option value="noir">High Contrast Noir</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Subtitles Preset</label>
                <select
                  value={captionPreset}
                  onChange={(e) => setCaptionPreset(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-white"
                >
                  <option value="mrbeast">MrBeast Yellow Bold</option>
                  <option value="hormozi">Alex Hormozi Green Pop</option>
                  <option value="minimal">Minimal Sleek Pill</option>
                  <option value="neon">Cyber Neon Glow</option>
                </select>
              </div>
            </div>

            {/* Pan & Scan horizontal slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-zinc-400">Pan &amp; Scan Horizontal Framing</label>
                <span className="text-[10px] font-mono text-zinc-400">{panXOffset}% Offset</span>
              </div>
              <input
                type="range"
                min={-40}
                max={40}
                value={panXOffset}
                onChange={(e) => setPanXOffset(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Live Caption Text Editor */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                On-Screen Subtitle Hook Text
              </label>
              <input
                type="text"
                value={captionText}
                onChange={(e) => setCaptionText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
                placeholder="High-energy hook keywords..."
              />
            </div>

            {/* Sound FX Triggers */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-zinc-400">Layer Instant SFX:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playSynthesizedSfx('whoosh')}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-mono cursor-pointer"
                >
                  🔊 Whoosh
                </button>
                <button
                  onClick={() => playSynthesizedSfx('boom')}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-mono cursor-pointer"
                >
                  💥 Sub-Bass Boom
                </button>
                <button
                  onClick={() => playSynthesizedSfx('ding')}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-mono cursor-pointer"
                >
                  🔔 Cash Ding
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 2.5: BRAND PROTECTION & REVENUE SAFETY SHIELD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
            {/* Header & Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-gradient-to-tr from-amber-500/20 to-red-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Brand Protection &amp; Anti-Theft Overlay
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Revenue Safe
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Anti-Crop Theft
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Embed your channel logo as an opacity-controlled overlay to prevent AI scrapers &amp; re-uploaders from stealing your viral shorts.
                  </p>
                </div>
              </div>

              {/* Master Enable Toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setBrandProtectionEnabled(!brandProtectionEnabled);
                    playSynthesizedSfx('ding');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    brandProtectionEnabled
                      ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md shadow-amber-950/40'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{brandProtectionEnabled ? 'Protection Active' : 'Enable Protection'}</span>
                </button>
              </div>
            </div>

            {brandProtectionEnabled && (
              <div className="space-y-4 animate-fadeIn">
                {/* Channel Handle & Logo Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Channel Handle / Signature */}
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                      Channel Name / Creator Handle
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={channelHandle}
                        onChange={(e) => setChannelHandle(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                        placeholder="@YourChannelHandle"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] text-zinc-500 font-mono">Watermark Label</span>
                    </div>
                  </div>

                  {/* Logo Source Preset vs Custom Upload */}
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                      Channel Logo Emblem
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Presets */}
                      {[
                        { id: 'shield', label: 'Shield', color: 'from-amber-500 to-red-500' },
                        { id: 'wealth', label: 'Wealth', color: 'from-emerald-500 to-teal-400' },
                        { id: 'cyber', label: 'Cyber', color: 'from-cyan-500 to-indigo-600' },
                        { id: 'craft', label: 'Craft', color: 'from-amber-600 to-orange-500' }
                      ].map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSelectedBrandPreset(p.id as any);
                            setBrandLogoType('preset');
                            playSynthesizedSfx('whoosh');
                          }}
                          className={`flex-1 p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            brandLogoType === 'preset' && selectedBrandPreset === p.id
                              ? 'bg-zinc-800 border-amber-500 text-white shadow-sm'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${p.color}`} />
                          <span className="text-[10px]">{p.label}</span>
                        </button>
                      ))}

                      {/* Custom Upload Button */}
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                          brandLogoType === 'custom'
                            ? 'bg-indigo-600/30 border-indigo-400 text-indigo-300'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                        title="Upload transparent PNG/SVG logo"
                      >
                        <Upload className="w-3 h-3" />
                        <span className="text-[10px]">{customLogoUrl ? 'Custom' : 'Upload'}</span>
                      </button>
                      <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleLogoUpload}
                        accept="image/png,image/svg+xml,image/jpeg,image/webp"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Watermark Styling, Position & Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  {/* Style */}
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                      Watermark Badge Style
                    </label>
                    <select
                      value={watermarkStyle}
                      onChange={(e) => {
                        setWatermarkStyle(e.target.value as any);
                        playSynthesizedSfx('whoosh');
                      }}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-white"
                    >
                      <option value="pill">Glassmorphism Pill (Logo + Handle)</option>
                      <option value="minimal-icon">Minimal Logo Icon Only</option>
                      <option value="timecode-stamp">Live REC Timecode Stamp</option>
                      <option value="anti-theft-tile">Anti-Bot Translucent Diagonal Band</option>
                    </select>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                      Safe-Zone Position
                    </label>
                    <select
                      value={watermarkPosition}
                      onChange={(e) => {
                        setWatermarkPosition(e.target.value as any);
                        playSynthesizedSfx('whoosh');
                      }}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-white"
                    >
                      <option value="top-right">Top-Right (Safe Zone Recommended)</option>
                      <option value="top-left">Top-Left (Below Header)</option>
                      <option value="bottom-left">Bottom-Left (Above Description)</option>
                      <option value="bottom-right">Bottom-Right (Above Sound Disc)</option>
                      <option value="diagonal-tile">Center Diagonal (Maximum Anti-Theft)</option>
                    </select>
                  </div>

                  {/* Opacity Control */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-zinc-300">
                        Overlay Opacity
                      </label>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {watermarkOpacity}% {watermarkOpacity >= 45 && watermarkOpacity <= 75 ? '(Optimal)' : ''}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={100}
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <span className="text-[9px] text-zinc-500 block">45%–75% protects IP without hurting viewer hold rate.</span>
                  </div>
                </div>

                {/* REVENUE SAFETY SHIELD AUDIT */}
                <div className="bg-black/50 border border-emerald-500/20 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Revenue Safety Shield: Pre-Flight Protection Verification
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      100% Monetization Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[10px]">
                    <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Safe Zone: Clear of UI Rails</span>
                    </div>

                    <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Content ID: Attribution Locked</span>
                    </div>

                    <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Anti-Scraper: Watermark Burned</span>
                    </div>

                    <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Green Dollar: AdSense Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STRATEGIC NEXT STEPS: FULL UPLOADING & REVENUE GENERATION OPERATIONAL HUB */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div 
              onClick={() => {
                setShowStrategicBlueprint(!showStrategicBlueprint);
                playSynthesizedSfx('ding');
              }}
              className="p-4 bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 flex items-center justify-between cursor-pointer border-b border-zinc-800 hover:bg-zinc-850/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    Strategic Next Steps: Full Uploading &amp; Revenue Generation Operational Hub
                    <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                      4-Phase Masterplan
                    </span>
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    Tri-platform syndication, 3-pronged revenue model, Wise 0% FX protection, and automated 2–3 daily uploads.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
                  {showStrategicBlueprint ? 'Hide Blueprint' : 'Expand Blueprint'}
                </span>
                {showStrategicBlueprint ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {showStrategicBlueprint && (
              <div className="p-5 space-y-4 animate-fadeIn">
                {/* 4 Phase Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
                  {[
                    { phase: 1, label: '1. Tri-Platform Syndication', badge: '4h Anti-Cannibalism', icon: Share2 },
                    { phase: 2, label: '2. Three-Pronged Revenue Model', badge: 'YPP + TikTok + ManyChat', icon: DollarSign },
                    { phase: 3, label: '3. Wise FX Protection', badge: 'Sort Code 60-84-64', icon: ShieldCheck },
                    { phase: 4, label: '4. Automated Daily Cadence', badge: '2-3 Uploads/Day', icon: Calendar }
                  ].map((tab) => {
                    const IconComp = tab.icon;
                    return (
                      <button
                        key={tab.phase}
                        type="button"
                        onClick={() => {
                          setActiveBlueprintPhase(tab.phase as any);
                          playSynthesizedSfx('whoosh');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeBlueprintPhase === tab.phase
                            ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                            : 'text-zinc-400 hover:text-white bg-zinc-950/60'
                        }`}
                      >
                        <IconComp className="w-3 h-3 text-amber-400" />
                        <span>{tab.label}</span>
                        <span className="text-[8px] font-mono bg-black/50 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/20">
                          {tab.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Phase 1 View */}
                {activeBlueprintPhase === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-red-400">1. YouTube Shorts</span>
                        <span className="font-mono text-[10px] text-white bg-red-950 px-1.5 py-0.5 rounded border border-red-500/30">12:00 PM</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Lunch-break browse, subscriber feeds, and search browse recommendations.</p>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400">2. TikTok (4h Delay)</span>
                        <span className="font-mono text-[10px] text-white bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">04:30 PM</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Late-afternoon For You Page (FYP) discovery without cross-platform algorithmic cannibalism.</p>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-pink-400">3. Instagram Reels (4h Delay)</span>
                        <span className="font-mono text-[10px] text-white bg-pink-950 px-1.5 py-0.5 rounded border border-pink-500/30">08:15 PM</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Peak evening explore page engagement, saves, and ManyChat automated DM trigger conversions.</p>
                    </div>
                  </div>
                )}

                {/* Phase 2 View */}
                {activeBlueprintPhase === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">YouTube YPP + Shopping</span>
                        <span className="font-mono text-[10px] text-emerald-400">£0.08–£0.18 RPM</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Shorts AdSense once eligible (1k subs + 10M views in 90d) + £45 CPA pinned comment affiliate links.</p>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">TikTok CRP &amp; Shop</span>
                        <span className="font-mono text-[10px] text-cyan-400">£0.35–£0.85 RPM</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Creator Rewards Program for videos 60+ seconds + trending TikTok Shop products at 10%–25% commission.</p>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Instagram ManyChat Funnel</span>
                        <span className="font-mono text-[10px] text-purple-400">£12.50–£45.00 EPC</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Highest EPC: CTA "Comment SCALE" sends automated DM within 5 seconds with Gumroad/Stripe link.</p>
                    </div>
                  </div>
                )}

                {/* Phase 3 View */}
                {activeBlueprintPhase === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-zinc-950 rounded-xl border border-emerald-500/20 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-400">Wise UK GBP Sort Code</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('60-84-64', 'sc_clip')}
                          className="font-mono text-[10px] text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          60-84-64 {copiedKey === 'sc_clip' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                        </button>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Zero foreign exchange penalty on domestic UK platform transfers.</p>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-xl border border-indigo-500/20 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-400">Wise US USD Routing</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('026073150', 'rt_clip')}
                          className="font-mono text-[10px] text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          026073150 {copiedKey === 'rt_clip' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                        </button>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Direct ACH deposit for USD AdSense and Meta Reels payouts saving 3.5%–4.2% in FX cuts.</p>
                    </div>
                  </div>
                )}

                {/* Phase 4 View */}
                {activeBlueprintPhase === 4 && (
                  <div className="p-3 bg-zinc-950 rounded-xl border border-purple-500/20 space-y-2 text-xs">
                    <span className="font-bold text-purple-300">Automated Daily Production &amp; Python Cadence:</span>
                    <p className="text-zinc-400 text-[11px]">
                      Batch-produce 15–20 high-retention shorts over the weekend using the Psychological Trigger Engine and Precision Clipper. Queue into the Sequential Pipeline Registry set to 2–3 uploads per day and run the hands-free Python script with your stored OAuth2 refresh token.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 3: DIRECT YOUTUBE SHORTS UPLOAD & PUBLISHING SUITE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Direct YouTube Shorts Upload Suite
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">YouTube Data API v3</span>
            </div>

            {/* Title with 60-character mobile cutoff gauge */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Video Title <span className="text-red-400">*</span>
                </label>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  title.length <= 50 ? 'bg-emerald-500/10 text-emerald-400' :
                  title.length <= 60 ? 'bg-amber-500/10 text-amber-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {title.length}/60 chars (Mobile Cutoff)
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-medium"
                placeholder="Under 60 chars for mobile feed click-through..."
              />
            </div>

            {/* Description & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Description &amp; Pinned Links
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 font-mono focus:outline-none focus:border-red-500 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Tags &amp; SEO Keywords
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Visibility Status</label>
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  >
                    <option value="public">Public (Immediate Feed Push)</option>
                    <option value="unlisted">Unlisted (Shareable Link)</option>
                    <option value="private">Private (Draft)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Direct Upload Action Button & Status Bar */}
            <div className="pt-2 border-t border-zinc-800">
              {uploadStatus === 'idle' && (
                <div className="space-y-2">
                  <button
                    onClick={handleLaunchDirectUpload}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/40 cursor-pointer"
                  >
                    <Youtube className="w-4 h-4 fill-white" />
                    Publish Clipped Short Directly to YouTube ({clipDuration}s)
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleQueueClippedToPipeline}
                      className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer transition-all active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Queue to Pipeline Registry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveToAssetArchive}
                      className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Save to Asset Library</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSendToUploader) {
                        onSendToUploader({ 
                          title, 
                          description, 
                          tags: tags.split(',').map(t => t.trim()).filter(Boolean) 
                        });
                      }
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-pink-950/70 via-purple-950/70 to-indigo-950/70 hover:from-pink-900/70 hover:to-indigo-900/70 text-pink-200 border border-pink-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <Share2 className="w-4 h-4 text-pink-400" />
                    <span>Sync to Social: Export as Clean TikTok &amp; Reels MP4</span>
                  </button>
                </div>
              )}

              {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 text-red-500 animate-spin" />
                      {uploadStatus === 'uploading' ? 'Streaming 1080x1920 MP4 to YouTube Data API...' : 'Processing HD Transcode & Content Verification...'}
                    </span>
                    <span className="font-mono text-red-400 font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {uploadStatus === 'published' && (
                <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Successfully Published to YouTube Shorts!
                    </div>
                    <button
                      onClick={() => setUploadStatus('idle')}
                      className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Upload Another
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800 text-xs">
                    <span className="font-mono text-zinc-300">
                      https://youtube.com/shorts/{publishedShortId}
                    </span>
                    <a
                      href={`https://youtube.com/shorts/${publishedShortId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                    >
                      Open Live Short <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Developer API Exporter (Python / curl / Node.js) */}
            <div className="pt-3 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  Developer API Code Exporter
                </span>

                <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
                  <button
                    onClick={() => setActiveExportCode('python')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                      activeExportCode === 'python' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setActiveExportCode('curl')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                      activeExportCode === 'curl' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    cURL
                  </button>
                </div>
              </div>

              <div className="relative bg-zinc-950 rounded-xl p-3 border border-zinc-800">
                <button
                  onClick={() => handleCopy(activeExportCode === 'python' ? pythonScript : curlCommand, 'api')}
                  className="absolute top-2.5 right-2.5 px-2 py-1 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'api' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'api' ? 'Copied' : 'Copy'}
                </button>
                <pre className="text-[11px] text-zinc-300 font-mono overflow-x-auto max-h-36 leading-relaxed">
                  {activeExportCode === 'python' ? pythonScript : curlCommand}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* SUBVIEW 2: AI STORYBOARD GENERATOR VIEW */}
      {activeSuiteMode === 'storyboard' && (
        <div className="space-y-6">
          {/* Storyboard Generator Input Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Clapperboard className="w-4 h-4 text-amber-400" /> AI Storyboard Generator (Long-Form to Sequential Viral Frames)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Analyze long-form video scripts, transcripts, or production footage and automatically break them down into 5 sequential 30-second frames with retention cues and B-roll directions.
                </p>
              </div>

              <button
                onClick={handleGenerateStoryboard}
                disabled={isGeneratingStoryboard}
                className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className={`w-4 h-4 ${isGeneratingStoryboard ? 'animate-spin' : 'text-amber-300'}`} />
                <span>{isGeneratingStoryboard ? 'Analyzing & Generating 5 Frames...' : 'Generate 5-Frame Storyboard'}</span>
              </button>
            </div>

            {/* Topic & Preset Seeds */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-zinc-300">Long-Form Topic / Title Premise:</label>
              <input
                type="text"
                value={storyboardTopic}
                onChange={(e) => setStoryboardTopic(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-amber-500"
                placeholder="e.g. 500mm Deep Gun-Drill Through Solid Grade-5 Titanium"
              />

              {/* Sample Quick-Fill Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-zinc-500 font-mono">Quick Samples:</span>
                {[
                  { topic: 'Titanium Super-Drilling', text: 'In this 45-minute workshop masterclass, we examine how industrial gun-drills bore through 500mm of solid Grade-5 Titanium without burning the cutting edge. Most engineers fail because titanium concentrates 100% of the friction heat into the cutting tool edge. To overcome this, 120-bar internal coolant channels blast cutting oil directly into the shear interface, freezing the temperature and instantly clearing chips.' },
                  { topic: 'Fred Dibnah 400-Ton Chimney Drop', text: 'Legendary steeplejack Fred Dibnah took down 250-foot industrial factory chimneys without a single stick of dynamite. He knocked out thousands of bricks by hand, put up seasoned pit props, and then set them on fire. When the props burnt through, 400 tons of brick collapsed with pinpoint accuracy into the drop zone.' },
                  { topic: 'Japanese Kumiko Nail-Free Wood Joinery', text: 'This traditional Japanese woodworking technique locks together 10,000 hand-shaved Hinoki cypress lattice strips using pure friction and interlocking miters cut to 0.1-degree precision. Not a single nail, screw, or drop of glue is ever used, yet it withstands massive structural loads.' },
                  { topic: 'Bernabéu & Anfield 4K Drone Flight', text: 'High-speed FPV drone flyover soaring over Liverpool’s Kop Stand and the metallic retractable roof of Real Madrid’s Santiago Bernabéu. Skimming the pitch turf at 120 km/h with 4K HDR camera angles.' }
                ].map((s) => (
                  <button
                    key={s.topic}
                    onClick={() => {
                      setStoryboardTopic(s.topic);
                      setStoryboardTranscript(s.text);
                    }}
                    className="text-[10px] px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 transition cursor-pointer"
                  >
                    {s.topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Transcript Textarea */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-300">Long-Form Transcript / Video Content to Slice:</label>
              <textarea
                value={storyboardTranscript}
                onChange={(e) => setStoryboardTranscript(e.target.value)}
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-mono leading-relaxed"
                placeholder="Paste transcript or raw content notes here..."
              />
            </div>
          </div>

          {/* Sequential 5-Frame Storyboard Deck */}
          {storyboardResult && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    Target Completion: {storyboardResult.hookHookRetentionTarget || '92.4%'}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {storyboardResult.projectTitle} (30s Viral Short)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Pacing: {storyboardResult.overallPacing} • 5 Sequential Storyboard Beats
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(storyboardResult.fullScript, 'fullScript')}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedKey === 'fullScript' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'fullScript' ? 'Copied Full Script' : 'Copy 30s Script'}</span>
                  </button>
                </div>
              </div>

              {/* 5 Frames Horizontal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {(storyboardResult.frames || []).map((frame: any, idx: number) => {
                  const isSelected = activeFrameIndex === idx;
                  return (
                    <div
                      key={frame.frameNumber || idx}
                      onClick={() => setActiveFrameIndex(idx)}
                      className={`p-3.5 rounded-2xl border transition flex flex-col justify-between space-y-3 cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-900 border-amber-500 ring-2 ring-amber-500/30 shadow-xl'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {/* Frame Top Header */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                            Frame {frame.frameNumber} ({frame.timeRange})
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            {frame.estimatedRetentionPercent}% RET
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{frame.stage}</h4>
                      </div>

                      {/* Visual Canvas Mockup Representation */}
                      <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black border border-zinc-800 p-2 flex flex-col justify-between shadow-inner">
                        <div className="text-[9px] font-mono text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded w-fit">
                          {frame.shotType}
                        </div>

                        {/* Bold Subtitle Word Overlay */}
                        <div className="text-center py-2">
                          <span 
                            className="text-xs sm:text-sm font-black uppercase tracking-tight text-[#FFE600] leading-tight block"
                            style={{
                              textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                            }}
                          >
                            {frame.subtitleWordHighlight || 'RETENTION'}
                          </span>
                        </div>

                        {/* Sound Effect Cue Pill */}
                        <div className="text-[8px] font-mono text-cyan-300 bg-cyan-950/80 px-1 py-0.5 rounded text-center truncate border border-cyan-500/30">
                          🔊 {frame.soundEffect}
                        </div>
                      </div>

                      {/* Narration Script Beat */}
                      <p className="text-[11px] text-zinc-300 font-medium leading-snug line-clamp-3 italic">
                        "{frame.spokenNarration}"
                      </p>

                      {/* Actions */}
                      <div className="space-y-1.5 pt-1 border-t border-zinc-800/80">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyFrameToClipper(frame);
                          }}
                          className="w-full py-1.5 px-2 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold rounded-lg transition flex items-center justify-center gap-1 shadow cursor-pointer"
                        >
                          <Scissors className="w-3 h-3" />
                          <span>Apply to Clipper</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendFrameToThumbnailStudio(frame);
                          }}
                          className="w-full py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-bold rounded-lg border border-zinc-700 transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ImageIcon className="w-3 h-3 text-amber-400" />
                          <span>To Thumbnail Studio</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Storyboard B-Roll & Pinned Comment Blueprint */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2 text-xs">
                  <span className="font-mono text-amber-400 uppercase font-bold text-[10px]">
                    🎬 Recommended Overlay B-Roll Clips:
                  </span>
                  <ul className="space-y-1 text-zinc-300 list-disc list-inside">
                    {(storyboardResult.recommendedBroll || []).map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2 text-xs">
                  <span className="font-mono text-cyan-400 uppercase font-bold text-[10px]">
                    📌 Algorithm Pinned Comment:
                  </span>
                  <p className="text-zinc-200 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 font-mono">
                    {storyboardResult.pinnedComment}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE: SCRAPED TOP 100 VIRAL VIDEOS ARCHIVE */}
      {activeSuiteMode === 'scraped_vault' && (
        <ScrapedVideosVaultDrawer
          onRipStructureAndClip={handleRipStructureAndClip}
          onClose={() => setActiveSuiteMode('clipper')}
        />
      )}

      {/* MODE: VIRAL REDDIT STORYTIME PRODUCTION STUDIO */}
      {activeSuiteMode === 'reddit_production' && (
        <RedditProductionModule
          onLoadIntoClipper={handleLoadRedditIntoClipper}
          onClose={() => setActiveSuiteMode('clipper')}
        />
      )}
    </div>
  );
};

