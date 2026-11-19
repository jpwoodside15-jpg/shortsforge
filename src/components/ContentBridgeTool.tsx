import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Film, Sparkles, Video, Play, Pause, RotateCcw, Download, 
  Layers, Sliders, Camera, Eye, Wand2, Copy, Check, ArrowRight, 
  ExternalLink, Volume2, VolumeX, ShieldAlert, Award, Clock,
  Flame, Scissors, Zap, Share2, Compass, Sun, Wind, ChevronRight,
  Maximize2, Radio, CheckCircle2, RefreshCw, FileText, Upload
} from 'lucide-react';
import { 
  DirectorStylePreset, 
  StudioStylePreset, 
  MarketReadyRemixPackage, 
  FAMOUS_DIRECTOR_PRESETS, 
  STUDIO_STYLE_PRESETS, 
  FACELESS_REMIX_ANGLES,
  generateLocalContentBridgePackage 
} from '../data/contentBridgeData';
import { BENCHMARK_COMPETITORS, CompetitorChannel } from '../data/competitorBenchmarkData';

interface ContentBridgeToolProps {
  initialVideo?: {
    id: string;
    title: string;
    channelTitle: string;
    hookQuote: string;
    hookType: string;
    views: string;
    durationSec: number;
    breakdownReason: string;
    suggestedVoice?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  };
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  onSendToSimulator?: (text: string) => void;
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToVoiceover?: (scriptText: string, voiceArchetype: string) => void;
}

export const ContentBridgeTool: React.FC<ContentBridgeToolProps> = ({
  initialVideo,
  onSendToUploader,
  onSendToSimulator,
  onSendToClipper,
  onSendToVoiceover
}) => {
  // 1. Source Video Selection
  const [selectedCompetitorKey, setSelectedCompetitorKey] = useState<string>('@mrbeast');
  const [selectedShortId, setSelectedShortId] = useState<string>(
    initialVideo?.id || BENCHMARK_COMPETITORS['@mrbeast'].topViralShorts[0].id
  );

  // Active source short
  const currentCompetitor = BENCHMARK_COMPETITORS[selectedCompetitorKey] || BENCHMARK_COMPETITORS['@mrbeast'];
  const activeSourceVideo = useMemo(() => {
    if (initialVideo && initialVideo.id === selectedShortId) {
      return initialVideo;
    }
    const found = currentCompetitor.topViralShorts.find(s => s.id === selectedShortId);
    if (found) {
      return {
        id: found.id,
        title: found.title,
        channelTitle: currentCompetitor.title,
        hookQuote: found.hookQuote,
        hookType: found.hookType,
        views: found.views,
        durationSec: found.durationSec,
        breakdownReason: found.breakdownReason,
        suggestedVoice: found.suggestedVoice
      };
    }
    return {
      id: 'default',
      title: initialVideo?.title || 'What Standing on Mount Everest Actually Looks Like',
      channelTitle: initialVideo?.channelTitle || '@mrbeast',
      hookQuote: initialVideo?.hookQuote || 'If you can survive the next 30 seconds inside this circle...',
      hookType: initialVideo?.hookType || 'High Stakes Challenge',
      views: initialVideo?.views || '48.2M',
      durationSec: initialVideo?.durationSec || 32,
      breakdownReason: initialVideo?.breakdownReason || 'Extreme curiosity gap with physical proof',
      suggestedVoice: initialVideo?.suggestedVoice || 'Fenrir'
    };
  }, [initialVideo, selectedShortId, currentCompetitor]);

  // 2. Style & Engine Configuration
  const [selectedDirectorId, setSelectedDirectorId] = useState<string>('nolan');
  const [selectedStudioId, setSelectedStudioId] = useState<string>('marvel-imax');
  const [selectedAngleId, setSelectedAngleId] = useState<string>('contrarian-debunk');

  const selectedDirector = useMemo(() => 
    FAMOUS_DIRECTOR_PRESETS.find(d => d.id === selectedDirectorId) || FAMOUS_DIRECTOR_PRESETS[0],
    [selectedDirectorId]
  );
  const selectedStudio = useMemo(() => 
    STUDIO_STYLE_PRESETS.find(s => s.id === selectedStudioId) || STUDIO_STYLE_PRESETS[0],
    [selectedStudioId]
  );
  const selectedAngle = useMemo(() => 
    FACELESS_REMIX_ANGLES.find(a => a.id === selectedAngleId) || FACELESS_REMIX_ANGLES[0],
    [selectedAngleId]
  );

  // 3. Cinematic Specs
  const [resolution, setResolution] = useState<'4K UHD (2160x3840)' | '2K QHD (1440x2560)' | '1080p FHD (1080x1920)'>('4K UHD (2160x3840)');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [targetFps, setTargetFps] = useState<24 | 30 | 60>(30);
  const [grainIntensity, setGrainIntensity] = useState<number>(30);
  const [bloomIntensity, setBloomIntensity] = useState<number>(40);
  const [enableFlare, setEnableFlare] = useState<boolean>(true);
  const [enableAtmosphereParticles, setEnableAtmosphereParticles] = useState<boolean>(true);
  const [vignetteDepth, setVignetteDepth] = useState<number>(50);
  const [captionTheme, setCaptionTheme] = useState<'mrbeast' | 'hormozi' | 'cinema' | 'cyber'>('hormozi');

  // 4. Generation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [remixPackage, setRemixPackage] = useState<MarketReadyRemixPackage>(() => 
    generateLocalContentBridgePackage(
      activeSourceVideo.title,
      activeSourceVideo.channelTitle,
      activeSourceVideo.hookQuote,
      selectedDirectorId,
      selectedStudioId,
      selectedAngleId
    )
  );

  // 5. Canvas Player & Timeline State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingProgress, setRecordingProgress] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Update remix package when user generates or when requested
  const handleGenerateRemix = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/content-bridge/remix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceVideo: activeSourceVideo,
          directorStyle: selectedDirector.name,
          studioStyle: selectedStudio.name,
          remixAngle: selectedAngle.title,
          aspectRatio,
          resolution
        })
      });

      if (response.ok) {
        const data: MarketReadyRemixPackage = await response.json();
        setRemixPackage(data);
      } else {
        const fallback = generateLocalContentBridgePackage(
          activeSourceVideo.title,
          activeSourceVideo.channelTitle,
          activeSourceVideo.hookQuote,
          selectedDirectorId,
          selectedStudioId,
          selectedAngleId
        );
        setRemixPackage(fallback);
      }
    } catch {
      const fallback = generateLocalContentBridgePackage(
        activeSourceVideo.title,
        activeSourceVideo.channelTitle,
        activeSourceVideo.hookQuote,
        selectedDirectorId,
        selectedStudioId,
        selectedAngleId
      );
      setRemixPackage(fallback);
    } finally {
      setIsGenerating(false);
      setCurrentTimeSec(0);
      setIsPlaying(true);
    }
  };

  // Determine which scene is active based on currentTimeSec
  const activeSceneIndex = useMemo(() => {
    if (!remixPackage?.scenes?.length) return 0;
    const t = currentTimeSec;
    if (t < 3.2) return 0;
    if (t < 9.5) return 1;
    if (t < 20.0) return 2;
    if (t < 26.5) return 3;
    return 4;
  }, [currentTimeSec, remixPackage]);

  const activeScene = remixPackage?.scenes?.[activeSceneIndex] || remixPackage?.scenes?.[0];

  // Playback timer loop
  useEffect(() => {
    let lastTime = performance.now();
    const interval = setInterval(() => {
      if (isPlaying) {
        const now = performance.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;
        setCurrentTimeSec(prev => {
          const next = prev + delta;
          if (next >= (remixPackage.totalDurationSec || 30)) {
            return 0; // Infinite loop!
          }
          return next;
        });
      } else {
        lastTime = performance.now();
      }
    }, 33); // ~30 fps tick

    return () => clearInterval(interval);
  }, [isPlaying, remixPackage.totalDurationSec]);

  // Audio synthesis for director score
  const playDirectorAudioTick = () => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Distinct audio tone depending on director
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (selectedDirectorId === 'nolan') {
        // Ticking acoustic Shepard frequency
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110 + (currentTimeSec * 8), ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      } else if (selectedDirectorId === 'anderson') {
        // Quirky vintage harpsichord plink
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      } else if (selectedDirectorId === 'villeneuve') {
        // Deep sub-bass drone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(45, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      } else {
        // High-energy electronic click
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // AudioContext not available in some sandbox environments
    }
  };

  // Trigger audio on scene transitions or seconds tick
  useEffect(() => {
    if (isPlaying && Math.floor(currentTimeSec) % 2 === 0) {
      playDirectorAudioTick();
    }
  }, [Math.floor(currentTimeSec), isPlaying]);

  // Real-Time Canvas 4K Renderer with Director Camera & Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 720;
    let height = 1280;
    if (aspectRatio === '16:9') {
      width = 1280;
      height = 720;
    } else if (aspectRatio === '1:1') {
      width = 960;
      height = 960;
    }

    canvas.width = width;
    canvas.height = height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const progress = currentTimeSec / (remixPackage.totalDurationSec || 30);
      const sceneProg = ((currentTimeSec % 6) / 6);

      // 1. Base Director Color Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (selectedDirectorId === 'nolan') {
        grad.addColorStop(0, '#020617');
        grad.addColorStop(0.5, '#0f172a');
        grad.addColorStop(1, '#1e293b');
      } else if (selectedDirectorId === 'anderson') {
        grad.addColorStop(0, '#78350f');
        grad.addColorStop(0.5, '#9d174d');
        grad.addColorStop(1, '#fef08a');
      } else if (selectedDirectorId === 'villeneuve') {
        grad.addColorStop(0, '#1c1917');
        grad.addColorStop(0.6, '#451a03');
        grad.addColorStop(1, '#083344');
      } else if (selectedDirectorId === 'tarantino') {
        grad.addColorStop(0, '#450a0a');
        grad.addColorStop(0.5, '#18181b');
        grad.addColorStop(1, '#ca8a04');
      } else if (selectedDirectorId === 'bay') {
        grad.addColorStop(0, '#0c4a6e');
        grad.addColorStop(0.5, '#7c2d12');
        grad.addColorStop(1, '#f59e0b');
      } else {
        grad.addColorStop(0, '#09090b');
        grad.addColorStop(0.5, '#18181b');
        grad.addColorStop(1, '#27272a');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Procedural 3D Environment Geometry based on Director
      ctx.save();
      if (selectedDirectorId === 'anderson') {
        // Perfect Axial Symmetry: Centered diorama borders and geometric archways
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 4;
        ctx.strokeRect(width * 0.08, height * 0.08, width * 0.84, height * 0.84);
        ctx.strokeRect(width * 0.12, height * 0.12, width * 0.76, height * 0.76);
        // Center focal circle
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 120 + Math.sin(sceneProg * Math.PI) * 15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 114, 182, 0.25)';
        ctx.fill();
        ctx.stroke();
      } else if (selectedDirectorId === 'nolan') {
        // Monumental monolithic geometry + turning gears of time
        const clockRadius = Math.min(width, height) * 0.32;
        ctx.translate(width / 2, height / 2);
        ctx.rotate(currentTimeSec * 0.25);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, clockRadius, 0, Math.PI * 2);
        ctx.stroke();
        // Clock tick spokes
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * (clockRadius - 20), Math.sin(angle) * (clockRadius - 20));
          ctx.lineTo(Math.cos(angle) * clockRadius, Math.sin(angle) * clockRadius);
          ctx.stroke();
        }
        ctx.restore();
      } else if (selectedDirectorId === 'villeneuve') {
        // Monolithic Brutalist Stone in Sandstorm
        ctx.fillStyle = 'rgba(12, 10, 9, 0.85)';
        ctx.fillRect(width * 0.3, height * 0.25 - (currentTimeSec * 2), width * 0.4, height * 0.65);
        // Sunbeam angle
        const sunbeam = ctx.createLinearGradient(0, 0, width, height);
        sunbeam.addColorStop(0, 'rgba(251, 146, 60, 0.45)');
        sunbeam.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
        ctx.fillStyle = sunbeam;
        ctx.beginPath();
        ctx.moveTo(width * 0.1, 0);
        ctx.lineTo(width * 0.9, 0);
        ctx.lineTo(width * 0.6, height);
        ctx.lineTo(width * 0.4, height);
        ctx.fill();
      } else {
        // Dynamic Horizon Lines & Depth Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        const horizon = height * 0.6;
        for (let i = -10; i <= 10; i++) {
          ctx.beginPath();
          ctx.moveTo(width / 2 + (i * 20), horizon);
          ctx.lineTo(width / 2 + (i * 120), height);
          ctx.stroke();
        }
        for (let y = horizon; y <= height; y += 35) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // 3. Atmosphere Particles (Embers / Dust / Rain Reflections / Stardust)
      if (enableAtmosphereParticles) {
        ctx.save();
        const numParticles = selectedStudio.particleAtmosphere === 'embers' ? 65 : 45;
        for (let i = 0; i < numParticles; i++) {
          const px = ((i * 137.5 + currentTimeSec * 45) % width);
          const py = ((i * 211.3 - currentTimeSec * (35 + (i % 30))) % height + height) % height;
          const pSize = 1.5 + (i % 3.5);

          if (selectedStudio.particleAtmosphere === 'embers' || selectedDirectorId === 'bay') {
            ctx.fillStyle = `rgba(251, 191, 36, ${0.4 + (Math.sin(currentTimeSec + i) * 0.3)})`;
          } else if (selectedStudio.particleAtmosphere === 'rain-reflections') {
            ctx.fillStyle = `rgba(56, 189, 248, ${0.5 + (Math.cos(currentTimeSec + i) * 0.3)})`;
          } else if (selectedStudio.particleAtmosphere === 'stardust') {
            ctx.fillStyle = `rgba(216, 180, 254, ${0.6 + (Math.sin(currentTimeSec * 2 + i) * 0.3)})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.25 + (Math.sin(currentTimeSec + i) * 0.2)})`;
          }

          ctx.beginPath();
          ctx.arc(px, py, pSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 4. Anamorphic Lens Flare Horizontal Streak
      if (enableFlare) {
        ctx.save();
        const flareY = height * 0.35 + Math.sin(currentTimeSec * 0.8) * 30;
        const flareGrad = ctx.createLinearGradient(0, flareY, width, flareY);
        flareGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        flareGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.15)');
        flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        flareGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
        flareGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = flareGrad;
        ctx.fillRect(0, flareY - 3, width, 6);
        ctx.restore();
      }

      // 5. Film Grain Simulation
      if (grainIntensity > 0) {
        ctx.save();
        const grainCount = Math.floor((width * height) / 3200 * (grainIntensity / 50));
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        for (let g = 0; g < grainCount; g++) {
          const gx = Math.random() * width;
          const gy = Math.random() * height;
          ctx.fillRect(gx, gy, 1.2, 1.2);
        }
        ctx.restore();
      }

      // 6. Volumetric Bloom & Vignette
      if (vignetteDepth > 0) {
        ctx.save();
        const vigGrad = ctx.createRadialGradient(
          width / 2, height / 2, Math.min(width, height) * 0.35,
          width / 2, height / 2, Math.max(width, height) * 0.75
        );
        vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vigGrad.addColorStop(1, `rgba(0, 0, 0, ${vignetteDepth / 100})`);
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // 7. On-Screen Dynamic Captions & Safe-Zone Graphics
      if (activeScene) {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Scene Badge Top Indicator
        const topBadgeY = height * 0.14;
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(`SCENE ${activeScene.sceneNumber}/5 • [${activeScene.timeRange}]`, width / 2, topBadgeY);

        // Subtitle Box
        const subBoxY = height * 0.58;
        const text = activeScene.onScreenText;

        if (captionTheme === 'hormozi') {
          // Yellow High-Contrast Block Pop
          ctx.font = '900 36px "Arial Black", Impact, sans-serif';
          ctx.lineWidth = 8;
          ctx.strokeStyle = '#000000';
          ctx.strokeText(text, width / 2, subBoxY);
          ctx.fillStyle = '#FFE600'; // Neon Yellow
          ctx.fillText(text, width / 2, subBoxY);
        } else if (captionTheme === 'mrbeast') {
          // Vibrant Red & White with heavy drop-shadow
          ctx.font = '900 38px "Impact", sans-serif';
          ctx.lineWidth = 10;
          ctx.strokeStyle = '#000000';
          ctx.strokeText(text, width / 2, subBoxY);
          ctx.fillStyle = '#FF0038';
          ctx.fillText(text, width / 2, subBoxY);
        } else if (captionTheme === 'cinema') {
          // Elegant Letterspaced Cinema Type
          ctx.font = '600 24px "Cinzel", "Georgia", serif';
          ctx.fillStyle = '#f8fafc';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 12;
          ctx.fillText(text, width / 2, subBoxY);
        } else {
          // Cyberpunk Neon Cyan
          ctx.font = 'bold 32px "Courier New", monospace';
          ctx.fillStyle = '#06b6d4';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 18;
          ctx.fillText(`// ${text}`, width / 2, subBoxY);
        }

        // Spoken narration teleprompter at bottom (Safe zone clearance)
        ctx.font = '500 18px Inter, sans-serif';
        ctx.fillStyle = 'rgba(228, 228, 231, 0.95)';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 8;

        const maxWordWidth = width * 0.82;
        const words = activeScene.spokenNarration.split(' ');
        let line = '';
        let lineY = height * 0.68;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWordWidth && n > 0) {
            ctx.fillText(line, width / 2, lineY);
            line = words[n] + ' ';
            lineY += 26;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, width / 2, lineY);

        ctx.restore();
      }

      // 8. 4K Watermark & Director Overlay Stamp
      ctx.save();
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillText(`4K UHD • ${selectedDirector.name.toUpperCase()} PRESET • ${targetFps}FPS`, width / 2, height - 30);
      ctx.restore();

      // Loop animation
      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    aspectRatio, 
    currentTimeSec, 
    isPlaying, 
    selectedDirectorId, 
    selectedStudio, 
    enableAtmosphereParticles, 
    enableFlare, 
    grainIntensity, 
    vignetteDepth, 
    captionTheme, 
    activeScene,
    targetFps,
    selectedDirector.name
  ]);

  // Video Clip Recording via MediaRecorder
  const handleStartRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      recordedChunksRef.current = [];
      const stream = canvas.captureStream(targetFps);
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 10000000 // 10 Mbps ultra high-bitrate
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FacelessRemix_${selectedDirector.name.replace(/\s+/g, '')}_${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
        setRecordingProgress(0);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setCurrentTimeSec(0);
      setIsPlaying(true);

      // Record for 30 seconds
      let recordedSeconds = 0;
      const progressTimer = setInterval(() => {
        recordedSeconds += 1;
        setRecordingProgress(Math.min(100, Math.round((recordedSeconds / 30) * 100)));
        if (recordedSeconds >= 30) {
          clearInterval(progressTimer);
          if (recorder.state !== 'inactive') {
            recorder.stop();
          }
        }
      }, 1000);
    } catch (err) {
      console.error('Recording initialization failed:', err);
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Copy helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(label);
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  // 1-Click Export to YouTube Uploader
  const handleExportToUploader = () => {
    if (onSendToUploader && remixPackage) {
      onSendToUploader({
        title: remixPackage.seoPackage.viralTitles[0].title,
        description: remixPackage.seoPackage.youtubeDescription,
        tags: remixPackage.seoPackage.hashtags.map(h => h.replace('#', ''))
      });
    }
  };

  // 1-Click Send to Safe-Zone Simulator
  const handleExportToSimulator = () => {
    if (onSendToSimulator && activeScene) {
      onSendToSimulator(activeScene.onScreenText);
    }
  };

  // 1-Click Send to Voiceover Studio
  const handleExportToVoiceover = () => {
    if (onSendToVoiceover && remixPackage) {
      onSendToVoiceover(remixPackage.fullFacelessScript, remixPackage.voiceoverDirection.archetype);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. HERO BANNER & STATUS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-amber-950/40 border border-zinc-800 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg shadow-amber-950/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Content Bridge 4K™
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                Faceless 30s Remix Engine
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                Director Grade 4K
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Transform Competitor Viral Shorts into 4K Faceless Masterpieces
            </h1>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Instantly bridge high-performing Shorts from the Competitor Research suite. Automatically generates 
              30-second contrarian scripts, authentic director aesthetic presets (Nolan, Anderson, Villeneuve), 
              studio render simulations, and market-ready downloadable 4K video clips.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={handleGenerateRemix}
              disabled={isGenerating}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-red-950/40 transition disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating 30s Remix Script...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Regenerate Faceless Remix
                </>
              )}
            </button>

            {onSendToUploader && (
              <button
                onClick={handleExportToUploader}
                className="px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold flex items-center justify-center gap-2 border border-zinc-700 transition"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                Dispatch to Uploader
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Info Strip */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-zinc-300">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Unique Commentary (No copyright strikes)</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Strict 30-Second Infinite Loop Timing</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <Film className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>8 Iconic Director Style Presets</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <Download className="w-4 h-4 text-pink-400 shrink-0" />
            <span>Direct 4K WebM / MP4 Canvas Recorder</span>
          </div>
        </div>
      </div>

      {/* 2. SOURCE SHORT PICKER BAR */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              Source Video Bridge: Choose Channel Benchmark or Video
            </h3>
            <p className="text-xs text-zinc-400">
              Select which viral competitor video to deconstruct and transform into your unique faceless remix
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Channel:</span>
            <select
              value={selectedCompetitorKey}
              onChange={(e) => {
                setSelectedCompetitorKey(e.target.value);
                const nextChannel = BENCHMARK_COMPETITORS[e.target.value];
                if (nextChannel?.topViralShorts?.[0]) {
                  setSelectedShortId(nextChannel.topViralShorts[0].id);
                }
              }}
              className="bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="@mrbeast">@mrbeast (Challenge / Extreme)</option>
              <option value="@jennyhoyos">@jennyhoyos (Micro-budget / Finance)</option>
              <option value="@zachking">@zachking (Visual Illusion / Wonder)</option>
              <option value="@alexhormozi">@alexhormozi (Contrarian Business)</option>
              <option value="@cleoabram">@cleoabram (Optimistic Tech / Deep Dive)</option>
            </select>
          </div>
        </div>

        {/* Viral Video Pill Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {currentCompetitor.topViralShorts.map((short) => {
            const isSelected = selectedShortId === short.id;
            return (
              <button
                key={short.id}
                onClick={() => setSelectedShortId(short.id)}
                className={`text-left p-3.5 rounded-xl border transition flex flex-col justify-between gap-2 ${
                  isSelected 
                    ? 'bg-amber-950/20 border-amber-500/60 ring-1 ring-amber-500/40 shadow-md' 
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                    {short.views} Views
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {short.retentionPct}% Retention
                  </span>
                </div>

                <div className="text-xs font-bold text-white line-clamp-1">
                  {short.title}
                </div>

                <div className="text-[11px] text-zinc-400 italic line-clamp-1 border-l-2 border-amber-500/40 pl-2">
                  "{short.hookQuote}"
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                  <span>Type: {short.hookType}</span>
                  {isSelected && <span className="text-amber-400 font-bold flex items-center gap-1">Active Bridge <Check className="w-3 h-3" /></span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DIRECTOR & STUDIO SELECTION SUITE */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" />
              Famous Director Presets &amp; Studio Aesthetics
            </h3>
            <p className="text-xs text-zinc-400">
              Infuse your faceless remix with Hollywood cinematics, color palettes, camera movements, and audio tension
            </p>
          </div>
        </div>

        {/* Director Presets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FAMOUS_DIRECTOR_PRESETS.map((dir) => {
            const isSelected = selectedDirectorId === dir.id;
            return (
              <button
                key={dir.id}
                onClick={() => setSelectedDirectorId(dir.id)}
                className={`relative text-left p-4 rounded-2xl border transition flex flex-col justify-between gap-3 overflow-hidden ${
                  isSelected 
                    ? 'bg-gradient-to-br from-zinc-900 to-amber-950/30 border-amber-500 shadow-xl shadow-amber-950/30' 
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Director Header */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">
                      {dir.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-400 line-clamp-1 mb-2">
                    {dir.era}
                  </div>
                  <div className="text-[11px] text-amber-300 font-medium leading-snug line-clamp-2">
                    {dir.signature}
                  </div>
                </div>

                {/* Color Palette Chips */}
                <div className="pt-2 border-t border-zinc-800/60 flex items-center gap-1.5">
                  <div 
                    className="w-4 h-4 rounded-full border border-black/40 shadow-inner" 
                    style={{ backgroundColor: dir.colorPalette.primary }}
                    title="Primary Hue"
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-black/40 shadow-inner" 
                    style={{ backgroundColor: dir.colorPalette.secondary }}
                    title="Secondary Hue"
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-black/40 shadow-inner" 
                    style={{ backgroundColor: dir.colorPalette.accent }}
                    title="Accent Hue"
                  />
                  <span className="text-[9px] text-zinc-400 font-mono ml-auto">
                    {dir.pacing.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Studio Presets Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          {STUDIO_STYLE_PRESETS.map((stu) => {
            const isSelected = selectedStudioId === stu.id;
            return (
              <button
                key={stu.id}
                onClick={() => setSelectedStudioId(stu.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-zinc-800 border-cyan-500 shadow-md ring-1 ring-cyan-500/30' 
                    : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border inline-block mb-1.5 ${stu.badgeColor}`}>
                    {stu.badge}
                  </span>
                  <div className="text-xs font-bold text-white line-clamp-1">
                    {stu.name}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2 line-clamp-1 font-mono">
                  {stu.particleAtmosphere}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN WORKSPACE: 4K CANVAS STUDIO & SCRIPT STORYBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: REAL-TIME 4K CANVAS PLAYER & CONTROLS (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
            
            {/* Player Header Info */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold block">
                  4K Video Canvas Studio
                </span>
                <span className="text-xs text-zinc-400">
                  {selectedDirector.name} • {selectedStudio.name}
                </span>
              </div>

              {/* Aspect Ratio Switcher */}
              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
                {(['9:16', '16:9', '1:1'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                      aspectRatio === ratio 
                        ? 'bg-amber-500 text-black font-bold' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Canvas Container */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex items-center justify-center min-h-[440px]">
              <canvas
                ref={canvasRef}
                className="max-h-[480px] w-auto h-auto object-contain mx-auto shadow-2xl"
              />

              {/* Live Overlay Indicators */}
              <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE CANVAS
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-zinc-300 text-[10px] font-mono border border-zinc-800">
                  {resolution.split(' ')[0]}
                </span>
              </div>

              {/* Recording indicator badge */}
              {isRecording && (
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-mono font-bold animate-pulse shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  REC {recordingProgress}%
                </div>
              )}

              {/* Pause overlay button if paused */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/80 hover:bg-amber-400 text-black flex items-center justify-center shadow-2xl backdrop-blur-sm transition"
                >
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Timeline Scrubber */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-white font-bold">{currentTimeSec.toFixed(1)}s</span>
                <span className="text-amber-400">Scene {activeSceneIndex + 1} of 5</span>
                <span>{remixPackage.totalDurationSec || 30}.0s</span>
              </div>

              <input
                type="range"
                min="0"
                max={remixPackage.totalDurationSec || 30}
                step="0.1"
                value={currentTimeSec}
                onChange={(e) => {
                  setCurrentTimeSec(parseFloat(e.target.value));
                }}
                className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />

              {/* Scene Timeline Segments Visual Strip */}
              <div className="grid grid-cols-5 gap-1 pt-1">
                {remixPackage.scenes?.map((sc, i) => (
                  <button
                    key={sc.sceneNumber}
                    onClick={() => {
                      if (i === 0) setCurrentTimeSec(0);
                      else if (i === 1) setCurrentTimeSec(3.5);
                      else if (i === 2) setCurrentTimeSec(10.0);
                      else if (i === 3) setCurrentTimeSec(20.5);
                      else setCurrentTimeSec(27.0);
                    }}
                    className={`h-1.5 rounded-full transition ${
                      activeSceneIndex === i 
                        ? 'bg-amber-400 shadow-sm shadow-amber-400' 
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                    title={`Jump to Scene ${sc.sceneNumber}`}
                  />
                ))}
              </div>
            </div>

            {/* Playback Controls & Direct MediaRecorder Action */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    setCurrentTimeSec(0);
                    setIsPlaying(true);
                  }}
                  className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition"
                  title="Rewind to 0.0s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition"
                  title={isMuted ? 'Unmute Audio Score' : 'Mute Audio Score'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                </button>
              </div>

              {/* 4K Video Download / Record Button */}
              <div>
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download 4K Video Clip
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 transition animate-pulse"
                  >
                    Stop &amp; Save ({recordingProgress}%)
                  </button>
                )}
              </div>
            </div>

            {/* Quick Editing Controls Accordion */}
            <div className="pt-3 border-t border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Cinematic Post-Processing FX
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">Real-Time</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Film Grain Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Film Grain</span>
                    <span className="font-mono text-zinc-200">{grainIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={grainIntensity}
                    onChange={(e) => setGrainIntensity(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-zinc-800 rounded"
                  />
                </div>

                {/* Vignette Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Vignette Depth</span>
                    <span className="font-mono text-zinc-200">{vignetteDepth}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={vignetteDepth}
                    onChange={(e) => setVignetteDepth(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-zinc-800 rounded"
                  />
                </div>
              </div>

              {/* Caption Aesthetic Theme */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-zinc-400 text-[11px]">Subtitle Style:</span>
                <div className="flex items-center gap-1">
                  {(['hormozi', 'mrbeast', 'cinema', 'cyber'] as const).map(theme => (
                    <button
                      key={theme}
                      onClick={() => setCaptionTheme(theme)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition ${
                        captionTheme === theme 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' 
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableFlare}
                    onChange={(e) => setEnableFlare(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Anamorphic Flare</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableAtmosphereParticles}
                    onChange={(e) => setEnableAtmosphereParticles(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Atmospheric Particles</span>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: 30-SECOND FACELESS REMIX SCRIPT & MARKET-READY PACKAGE (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Script Overview Card */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  30-Second Faceless Remix Blueprint
                </span>
                <h3 className="text-lg font-bold text-white">
                  {remixPackage.seoPackage.viralTitles[0]?.title || 'Contrarian Viral Short Breakdown'}
                </h3>
                <p className="text-xs text-zinc-400">
                  Angle: <span className="text-amber-400 font-semibold">{remixPackage.remixAngle}</span> • Voice: <span className="text-cyan-400 font-semibold">{remixPackage.voiceoverDirection.archetype} ({remixPackage.voiceoverDirection.targetWpm} WPM)</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyText(remixPackage.fullFacelessScript, 'script')}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  {copiedStatus === 'script' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Script Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Narration
                    </>
                  )}
                </button>

                {onSendToVoiceover && (
                  <button
                    onClick={handleExportToVoiceover}
                    className="px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Send to Voice Studio
                  </button>
                )}
              </div>
            </div>

            {/* 5-Scene Storyboard & Shotlist Breakdown */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-400" />
                Director Shotlist &amp; Psychological Retention Cues
              </h4>

              <div className="space-y-3">
                {remixPackage.scenes?.map((scene, idx) => {
                  const isCurrent = activeSceneIndex === idx;
                  return (
                    <div
                      key={scene.sceneNumber}
                      className={`p-4 rounded-2xl border transition ${
                        isCurrent
                          ? 'bg-amber-950/20 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                          : 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-750'
                      }`}
                    >
                      {/* Scene Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                            isCurrent ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {scene.sceneNumber}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {scene.sceneType === 'hook' && '🔥 Scene 1: Thumb-Stop Hook'}
                            {scene.sceneType === 'tension' && '⚡ Scene 2: Contrarian Tension'}
                            {scene.sceneType === 'breakdown' && '💡 Scene 3: Insider Value Secret'}
                            {scene.sceneType === 'climax' && '🏆 Scene 4: Climax & Payoff'}
                            {scene.sceneType === 'loop-cta' && '🔁 Scene 5: Infinite Loop CTA'}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                            {scene.timeRange}
                          </span>
                        </div>

                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                          {scene.retentionTactic.split(' ')[0]} Focus
                        </span>
                      </div>

                      {/* Spoken Narration Box */}
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 leading-relaxed font-sans mb-2.5">
                        <span className="text-amber-400 font-bold block text-[10px] uppercase mb-1">
                          Spoken Voiceover Narration:
                        </span>
                        "{scene.spokenNarration}"
                      </div>

                      {/* 4K B-Roll Visual Prompt & Camera Direction */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                          <span className="text-cyan-400 font-semibold block text-[10px] uppercase mb-0.5">
                            🎬 4K Visual Prompt ({selectedDirector.name} Style):
                          </span>
                          <p className="text-zinc-300 line-clamp-2">
                            {scene.bRollVisualPrompt}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                          <span className="text-pink-400 font-semibold block text-[10px] uppercase mb-0.5">
                            🎥 Camera Move &amp; SFX:
                          </span>
                          <p className="text-zinc-300 line-clamp-2">
                            {scene.cameraDirection} • <span className="text-zinc-400 font-mono">{scene.audioSfxCue}</span>
                          </p>
                        </div>
                      </div>

                      {/* Action buttons on active scene */}
                      {isCurrent && (
                        <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-amber-300 font-medium">
                            Currently previewing in 4K Canvas Studio
                          </span>

                          <button
                            onClick={handleExportToSimulator}
                            className="text-[11px] text-zinc-300 hover:text-white flex items-center gap-1 font-semibold underline"
                          >
                            Check Safe Zone <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Viral YouTube / TikTok SEO Package */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500" />
                  YouTube / TikTok Publishing &amp; High-CTR Package
                </h4>

                <button
                  onClick={() => {
                    const text = `${remixPackage.seoPackage.viralTitles[0].title}\n\n${remixPackage.seoPackage.youtubeDescription}\n\n${remixPackage.seoPackage.pinnedComment}`;
                    handleCopyText(text, 'seo');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                >
                  {copiedStatus === 'seo' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Complete SEO Pack
                </button>
              </div>

              {/* Title Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {remixPackage.seoPackage.viralTitles.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs flex flex-col justify-between gap-1.5">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      CTR: {t.predictedCtr} • {t.hookType}
                    </span>
                    <span className="text-white font-bold leading-snug">
                      "{t.title}"
                    </span>
                    <button
                      onClick={() => handleCopyText(t.title, `t-${idx}`)}
                      className="text-[10px] text-zinc-400 hover:text-zinc-200 mt-1 self-start underline"
                    >
                      {copiedStatus === `t-${idx}` ? 'Copied' : 'Copy Title'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Pinned Comment Hook */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                <span className="text-amber-400 font-bold block text-[10px] uppercase tracking-wider">
                  Pinned Comment (Affiliate / Conversion Loop):
                </span>
                <p className="text-zinc-300">
                  {remixPackage.seoPackage.pinnedComment}
                </p>
              </div>
            </div>

            {/* Direct Workflow Handoff Bar */}
            <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">
                Send generated 4K remix to other studio tools:
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {onSendToUploader && (
                  <button
                    onClick={handleExportToUploader}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Send to Uploader
                  </button>
                )}

                {onSendToSimulator && (
                  <button
                    onClick={handleExportToSimulator}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                    CapCut Safe-Zone
                  </button>
                )}

                {onSendToClipper && (
                  <button
                    onClick={() => onSendToClipper(0, 30, `Faceless Remix: ${remixPackage.seoPackage.viralTitles[0].title}`)}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Scissors className="w-3.5 h-3.5 text-pink-400" />
                    Video Clipper
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
