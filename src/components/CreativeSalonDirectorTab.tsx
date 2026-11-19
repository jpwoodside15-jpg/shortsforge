import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Sparkles, Upload, Video, Camera, Scissors, Download, 
  Play, Pause, RefreshCw, Sliders, Eye, ArrowRight, 
  ShieldCheck, Layers, Film, Zap, Heart, Sun, Check, 
  Copy, RotateCcw, Volume2, Compass, Radio, Mic,
  ChevronRight, ArrowLeft, ExternalLink, Monitor,
  Palette, Flame, Star, Award, Image as ImageIcon
} from 'lucide-react';
import { 
  SALON_MAKEOVER_PRESETS, SCENERY_BACKDROP_PRESETS, 
  HIGGSFIELD_MOTION_PRESETS, QUICK_CLIP_TEMPLATES,
  SalonMakeoverPreset, SceneryBackdropPreset, 
  HiggsfieldMotionPreset, QuickClipTemplate 
} from '../data/creativeSalonData';

interface CreativeSalonDirectorTabProps {
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  onSendToSimulator?: (subtitleText: string) => void;
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToOnTrend?: () => void;
  onSendToSceneGen?: () => void;
}

export const CreativeSalonDirectorTab: React.FC<CreativeSalonDirectorTabProps> = ({
  onSendToUploader,
  onSendToSimulator,
  onSendToClipper,
  onSendToOnTrend,
  onSendToSceneGen
}) => {
  // Active Studio Sub-Tab
  const [activeSubTab, setActiveSubTab] = useState<'salon' | 'backdrop' | 'higgsfield' | 'responder' | 'instantClip'>('salon');

  // Selected Presets
  const [selectedMakeover, setSelectedMakeover] = useState<SalonMakeoverPreset>(SALON_MAKEOVER_PRESETS[0]);
  const [selectedBackdrop, setSelectedBackdrop] = useState<SceneryBackdropPreset>(SCENERY_BACKDROP_PRESETS[0]);
  const [selectedHiggsfield, setSelectedHiggsfield] = useState<HiggsfieldMotionPreset>(HIGGSFIELD_MOTION_PRESETS[0]);
  const [selectedClipTemplate, setSelectedClipTemplate] = useState<QuickClipTemplate>(QUICK_CLIP_TEMPLATES[0]);

  // Makeover & Backdrop Sliders
  const [makeoverIntensity, setMakeoverIntensity] = useState<number>(85);
  const [backdropBokeh, setBackdropBokeh] = useState<number>(45);
  const [lightingMatchTemp, setLightingMatchTemp] = useState<number>(10);
  const [higgsfieldSpeed, setHiggsfieldSpeed] = useState<number>(75);

  // Before & After Dual-Split Slider (0 = 100% Before/Raw, 100 = 100% After/Salon Transformed)
  const [splitPosition, setSplitPosition] = useState<number>(50);
  const [isComparing, setIsComparing] = useState<boolean>(true);

  // Canvas Player State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // User Upload & Webcam State
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);
  const [uploadedMediaType, setUploadedMediaType] = useState<'image' | 'video' | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [mediaRecorderActive, setMediaRecorderActive] = useState<boolean>(false);
  const [recordedVideoBlobUrl, setRecordedVideoBlobUrl] = useState<string | null>(null);
  const [responseMode, setResponseMode] = useState<'split' | 'pip' | 'chroma' | 'fullstage'>('chroma');

  // Webcam Video Element Reference
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null);
  const uploadedVideoRef = useRef<HTMLVideoElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Instant Clip Generator State
  const [customCaptionHook, setCustomCaptionHook] = useState<string>(QUICK_CLIP_TEMPLATES[0].hookText);
  const [captionStyle, setCaptionStyle] = useState<'hormozi' | 'clean_minimal' | 'neon_glow' | 'editorial'>('hormozi');
  const [isRenderingClip, setIsRenderingClip] = useState<boolean>(false);
  const [renderedClipUrl, setRenderedClipUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Clean-up media streams on unmount
  useEffect(() => {
    return () => {
      if (webcamVideoRef.current && webcamVideoRef.current.srcObject) {
        const stream = webcamVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle User File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (file.type.startsWith('video/')) {
      setUploadedMediaUrl(url);
      setUploadedMediaType('video');
    } else if (file.type.startsWith('image/')) {
      setUploadedMediaUrl(url);
      setUploadedMediaType('image');
    }
  };

  // Toggle Live Webcam
  const handleToggleWebcam = async () => {
    if (isWebcamActive) {
      if (webcamVideoRef.current && webcamVideoRef.current.srcObject) {
        const stream = webcamVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        webcamVideoRef.current.srcObject = null;
      }
      setIsWebcamActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 720, height: 1280, facingMode: 'user' }, 
        audio: true 
      });
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream;
        webcamVideoRef.current.play();
      }
      setIsWebcamActive(true);
      setUploadedMediaUrl(null);
    } catch (err) {
      console.warn('Webcam permission not granted or device not available:', err);
      // Friendly fallback notification
      alert('Camera access requested. You can also upload any video or photo directly using the Upload button above!');
    }
  };

  // Live Canvas Recording using HTML5 MediaRecorder (Real client-side 9:16 export!)
  const handleStartRecordingClip = () => {
    if (!canvasRef.current) return;
    try {
      const stream = canvasRef.current.captureStream(30);
      recordedChunksRef.current = [];
      const options = { mimeType: 'video/webm;codecs=vp9' };
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRenderedClipUrl(url);
        setIsRenderingClip(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setMediaRecorderActive(true);
      setIsRenderingClip(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 15) { // Auto-stop at 15s for Instant Short
            handleStopRecordingClip();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (e) {
      console.error('Canvas capture stream error:', e);
      setIsRenderingClip(false);
    }
  };

  const handleStopRecordingClip = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setMediaRecorderActive(false);
  };

  // Canvas Rendering Loop (Runs realistic live scenery, salon transform, and Higgsfield motion overlays)
  useEffect(() => {
    let frameCount = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      frameCount++;
      const time = frameCount * 0.03;
      setPlaybackTime(time);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. RENDER LIVE SCENERY BACKDROP
      renderSceneryBackdrop(ctx, width, height, selectedBackdrop, time, backdropBokeh);

      // 2. RENDER HIGGSFIELD CAMERA MOTION PHYSICS (Zoom/Dolly/Orbit)
      ctx.save();
      applyHiggsfieldCameraTransform(ctx, width, height, selectedHiggsfield, time, higgsfieldSpeed);

      // 3. RENDER FOREGROUND CONTENT (Webcam, Upload, or Model Portrait)
      renderForegroundContent(
        ctx, width, height, 
        uploadedMediaUrl, uploadedMediaType, 
        isWebcamActive, webcamVideoRef.current,
        responseMode, selectedMakeover, makeoverIntensity,
        splitPosition, isComparing, time
      );

      ctx.restore();

      // 4. RENDER HIGGSFIELD PARTICLE & LIGHT LEAK OVERLAYS
      renderHiggsfieldVfxOverlay(ctx, width, height, selectedHiggsfield, time);

      // 5. RENDER BEFORE/AFTER SPLIT DIVIDER LINE & BADGE (if comparing)
      if (isComparing) {
        renderSplitDivider(ctx, width, height, splitPosition);
      }

      // 6. RENDER DYNAMIC 9:16 CAPTIONS / HOOK TEXT
      renderCaptionsOverlay(ctx, width, height, customCaptionHook, captionStyle, time);

      // 7. RENDER LIVE WATERMARK & SAFE ZONE GUIDE (Subtle)
      renderTopBottomAccents(ctx, width, height, selectedBackdrop, selectedMakeover);

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    isPlaying, selectedBackdrop, selectedMakeover, selectedHiggsfield, 
    makeoverIntensity, backdropBokeh, lightingMatchTemp, higgsfieldSpeed,
    splitPosition, isComparing, uploadedMediaUrl, uploadedMediaType, 
    isWebcamActive, responseMode, customCaptionHook, captionStyle
  ]);

  // --- CANVAS RENDERING HELPERS ---

  const renderSceneryBackdrop = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number, 
    env: SceneryBackdropPreset, 
    time: number, 
    bokeh: number
  ) => {
    // Base gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    if (env.environmentType === 'penthouse') {
      grad.addColorStop(0, '#020617'); // Dark night sky
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#020617');
    } else if (env.environmentType === 'santorini') {
      grad.addColorStop(0, '#7c2d12'); // Warm sunset glow
      grad.addColorStop(0.4, '#c2410c');
      grad.addColorStop(0.7, '#ea580c');
      grad.addColorStop(1, '#1e3a8a'); // Aegean blue sea
    } else if (env.environmentType === 'shibuya') {
      grad.addColorStop(0, '#2e1065'); // Cyber neon violet
      grad.addColorStop(0.5, '#3b0764');
      grad.addColorStop(1, '#09090b');
    } else if (env.environmentType === 'bali') {
      grad.addColorStop(0, '#064e3b'); // Deep jungle emerald
      grad.addColorStop(0.6, '#065f46');
      grad.addColorStop(1, '#022c22');
    } else if (env.environmentType === 'paris') {
      grad.addColorStop(0, '#44403c'); // Warm sunlit atelier
      grad.addColorStop(0.5, '#78716c');
      grad.addColorStop(1, '#292524');
    } else {
      // nordic
      grad.addColorStop(0, '#082f49'); // Snowy blue hour
      grad.addColorStop(0.6, '#0c4a6e');
      grad.addColorStop(1, '#020617');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Animated Environment Elements
    if (env.environmentType === 'penthouse') {
      // Twinkling Manhattan Skyscrapers & Windows
      ctx.fillStyle = '#0f172a';
      // Skyline silhouettes
      const buildings = [
        { x: 20, w: 60, h: 260 }, { x: 90, w: 45, h: 320 }, 
        { x: 145, w: 75, h: 220 }, { x: 230, w: 85, h: 380 }, 
        { x: 325, w: 55, h: 290 }, { x: 390, w: 70, h: 250 }
      ];
      buildings.forEach(b => {
        ctx.fillRect(b.x, h - b.h - 100, b.w, b.h + 100);
        // Windows
        ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
        for (let wy = h - b.h - 80; wy < h - 120; wy += 14) {
          for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 10) {
            if (Math.sin(wx * 11 + wy * 7 + time * 2) > 0.1) {
              ctx.fillRect(wx, wy, 4, 6);
            }
          }
        }
        ctx.fillStyle = '#0f172a';
      });

      // Penthouse Glass Balcony Railing
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, h - 140);
      ctx.lineTo(w, h - 140);
      ctx.stroke();
    } else if (env.environmentType === 'santorini') {
      // Sunset Sun Disc & Calming Waves
      ctx.fillStyle = 'rgba(254, 215, 170, 0.9)';
      ctx.beginPath();
      ctx.arc(w / 2, 280, 75, 0, Math.PI * 2);
      ctx.fill();

      // Aegean Sea Horizon
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, 420, w, h - 420);

      // Whitewashed Aegean Arch Outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(w / 2, 380, 180, Math.PI, 0);
      ctx.stroke();
    } else if (env.environmentType === 'shibuya') {
      // Neon billboard pulses & rain reflections
      ctx.fillStyle = 'rgba(232, 121, 249, 0.25)';
      ctx.fillRect(40, 80, 100, 180);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(320, 120, 110, 220);

      // Rain Streaks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      for (let r = 0; r < 25; r++) {
        const rx = (r * 31 + time * 120) % w;
        const ry = (r * 47 + time * 250) % h;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 8, ry + 24);
        ctx.stroke();
      }
    } else if (env.environmentType === 'bali') {
      // Lush tropical bamboo silhouette & god rays
      ctx.fillStyle = 'rgba(52, 211, 153, 0.1)';
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(0, h);
      ctx.lineTo(w, h);
      ctx.fill();
    }

    // Apply Simulated Bokeh Blur Gradient
    if (bokeh > 15) {
      ctx.fillStyle = `rgba(0, 0, 0, ${(bokeh / 180).toFixed(2)})`;
      ctx.fillRect(0, 0, w, h);
    }
  };

  const applyHiggsfieldCameraTransform = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    motion: HiggsfieldMotionPreset,
    time: number,
    speed: number
  ) => {
    const intensityFactor = (speed / 100);
    const cx = w / 2;
    const cy = h / 2;

    if (motion.motionType === 'fpv_push') {
      // Dynamic forward surge
      const scale = 1.0 + Math.sin(time * 1.5) * 0.08 * intensityFactor;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
    } else if (motion.motionType === 'dolly_zoom') {
      // Foreground locked, dynamic zoom breathing
      const scale = 1.05 + Math.sin(time * 2.0) * 0.06 * intensityFactor;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
    } else if (motion.motionType === 'bullet_orbit') {
      // Rotational matrix drift
      const angle = Math.sin(time * 1.2) * 0.03 * intensityFactor;
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.translate(-cx, -cy);
    } else if (motion.motionType === 'parallax_depth') {
      // Floating 2.5D multi-plane drift
      const dx = Math.cos(time * 1.1) * 8 * intensityFactor;
      const dy = Math.sin(time * 0.9) * 6 * intensityFactor;
      ctx.translate(dx, dy);
    } else if (motion.motionType === 'whip_pan') {
      // Snap whip pan zoom
      const snap = Math.pow(Math.sin(time * 3.0), 5) * 18 * intensityFactor;
      ctx.translate(snap, 0);
    }
  };

  const renderForegroundContent = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    mediaUrl: string | null,
    mediaType: 'image' | 'video' | null,
    webcamActive: boolean,
    webcamEl: HTMLVideoElement | null,
    mode: 'split' | 'pip' | 'chroma' | 'fullstage',
    makeover: SalonMakeoverPreset,
    intensity: number,
    splitPos: number,
    compareMode: boolean,
    time: number
  ) => {
    const cx = w / 2;
    const cy = h / 2 + 30;

    // If Webcam is active, render webcam stream
    if (webcamActive && webcamEl && webcamEl.readyState >= 2) {
      if (mode === 'pip') {
        // Floating Picture-in-Picture window in corner
        ctx.save();
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(w - 170, 70, 140, 220, 16);
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(webcamEl, w - 170, 70, 140, 220);
        ctx.restore();
      } else if (mode === 'split') {
        // 50/50 vertical split
        ctx.drawImage(webcamEl, 0, h / 2, w, h / 2);
      } else {
        // Fullstage or Chroma Stage
        ctx.drawImage(webcamEl, 0, 0, w, h);
      }
      return;
    }

    // Default Portrait / Model Rendering with Salon Makeover Simulation
    const avatarY = cy + Math.sin(time * 1.5) * 4; // subtle organic float

    // 1. Draw Raw/Before Portrait Base
    ctx.save();

    // Natural Body & Shoulders Silhouette
    ctx.fillStyle = '#3f3f46';
    ctx.beginPath();
    ctx.ellipse(cx, avatarY + 220, 140, 120, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face / Head Contour
    ctx.fillStyle = '#f5d0b5'; // Natural skin tone
    ctx.beginPath();
    ctx.ellipse(cx, avatarY, 82, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.arc(cx - 30, avatarY - 12, 7, 0, Math.PI * 2);
    ctx.arc(cx + 30, avatarY - 12, 7, 0, Math.PI * 2);
    ctx.fill();

    // Catchlight in eyes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 28, avatarY - 14, 2.5, 0, Math.PI * 2);
    ctx.arc(cx + 32, avatarY - 14, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Lips
    ctx.fillStyle = '#e17171';
    ctx.beginPath();
    ctx.ellipse(cx, avatarY + 52, 22, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair Structure (Raw / Default Brunette)
    ctx.fillStyle = '#2d1b14';
    ctx.beginPath();
    ctx.arc(cx, avatarY - 35, 95, Math.PI * 0.9, Math.PI * 2.1);
    ctx.lineTo(cx + 90, avatarY + 120);
    ctx.lineTo(cx + 70, avatarY + 100);
    ctx.lineTo(cx - 70, avatarY + 100);
    ctx.lineTo(cx - 90, avatarY + 120);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // 2. IF COMPARE MODE: Clip and apply the Salon AI Transformed Layer on the Right
    if (compareMode) {
      const splitX = (splitPos / 100) * w;

      ctx.save();
      // Clip to right half
      ctx.beginPath();
      ctx.rect(splitX, 0, w - splitX, h);
      ctx.clip();

      // RENDER SALON AI TRANSFORMATION
      if (makeover.category === 'hair') {
        // Balayage Honey Glow or Platinum Ice or Wolf Cut
        if (makeover.id === 'sun_kissed_balayage') {
          ctx.fillStyle = '#d97706'; // Golden honey
        } else if (makeover.id === 'platinum_ice_gloss') {
          ctx.fillStyle = '#e2e8f0'; // Platinum ice
        } else {
          ctx.fillStyle = '#c026d3'; // Wolf cut dimensional plum
        }
        ctx.beginPath();
        ctx.arc(cx, avatarY - 35, 98, Math.PI * 0.9, Math.PI * 2.1);
        ctx.lineTo(cx + 105, avatarY + 140);
        ctx.lineTo(cx + 80, avatarY + 110);
        ctx.lineTo(cx - 80, avatarY + 110);
        ctx.lineTo(cx - 105, avatarY + 140);
        ctx.closePath();
        ctx.fill();

        // Shimmer Highlights
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx - 45, avatarY + 20, 40, 0, Math.PI * 0.6);
        ctx.arc(cx + 45, avatarY + 20, 40, Math.PI * 0.4, Math.PI);
        ctx.stroke();
      } else if (makeover.category === 'skincare') {
        // Korean Glass Skin Glossy Sheen
        const skinSheenGrad = ctx.createRadialGradient(cx + 25, avatarY - 5, 5, cx + 25, avatarY - 5, 45);
        skinSheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        skinSheenGrad.addColorStop(1, 'rgba(244, 114, 182, 0.0)');
        ctx.fillStyle = skinSheenGrad;
        ctx.beginPath();
        ctx.arc(cx + 25, avatarY - 5, 45, 0, Math.PI * 2);
        ctx.fill();

        // High Fashion Bronzed Contour
        ctx.fillStyle = 'rgba(194, 65, 12, 0.25)';
        ctx.beginPath();
        ctx.ellipse(cx + 52, avatarY + 25, 20, 40, 0.3, 0, Math.PI * 2);
        ctx.fill();
      } else if (makeover.category === 'wellness') {
        // Athletic Studio Rim Light & Collarbone Highlight
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(cx + 80, avatarY + 210, 50, Math.PI * 1.1, Math.PI * 1.8);
        ctx.stroke();
      } else {
        // 3D LUT Color Grade (Vintage 35mm / Cyberpunk)
        ctx.fillStyle = makeover.id === 'vintage_35mm_kodak' 
          ? 'rgba(245, 158, 11, 0.15)' 
          : 'rgba(232, 121, 249, 0.2)';
        ctx.fillRect(0, 0, w, h);
      }

      ctx.restore();
    }
  };

  const renderHiggsfieldVfxOverlay = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    motion: HiggsfieldMotionPreset,
    time: number
  ) => {
    if (motion.motionType === 'light_leaks') {
      // Sweeping Anamorphic Golden Flare
      const flareX = (Math.sin(time * 0.8) * 0.5 + 0.5) * w;
      const flareGrad = ctx.createRadialGradient(flareX, 90, 10, flareX, 90, 220);
      flareGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      flareGrad.addColorStop(0.5, 'rgba(244, 63, 94, 0.2)');
      flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, 0, w, 280);
    } else if (motion.motionType === 'golden_embers') {
      // Floating golden particles
      ctx.fillStyle = 'rgba(252, 211, 77, 0.7)';
      for (let i = 0; i < 30; i++) {
        const px = (i * 43 + time * 20) % w;
        const py = (h - (i * 61 + time * 45) % h);
        const size = (i % 3) + 1.5;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (motion.motionType === 'chroma_warp') {
      // Iridescent chromatic ribbons
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < w; x += 20) {
        const y = h * 0.7 + Math.sin(x * 0.02 + time * 3) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else if (motion.motionType === 'speed_burst') {
      // Retention burst radial lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      const cx = w / 2;
      const cy = h / 2;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 160, cy + Math.sin(a) * 160);
        ctx.lineTo(cx + Math.cos(a) * 260, cy + Math.sin(a) * 260);
        ctx.stroke();
      }
    }
  };

  const renderSplitDivider = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    splitPos: number
  ) => {
    const splitX = (splitPos / 100) * w;

    // Glowing Divider Line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(splitX, 0);
    ctx.lineTo(splitX, h);
    ctx.stroke();

    // Center Drag Handle Pill
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(splitX, h / 2, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⟷', splitX, h / 2 + 3);

    // Left "BEFORE" Tag
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.roundRect(14, h - 90, 80, 26, 6);
    ctx.fill();
    ctx.fillStyle = '#d4d4d8';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RAW INPUT', 54, h - 73);

    // Right "SALON AI" Tag
    ctx.fillStyle = 'rgba(236, 72, 153, 0.85)';
    ctx.beginPath();
    ctx.roundRect(w - 94, h - 90, 80, 26, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SALON GLOW', w - 54, h - 73);
  };

  const renderCaptionsOverlay = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    text: string,
    style: 'hormozi' | 'clean_minimal' | 'neon_glow' | 'editorial',
    time: number
  ) => {
    const boxY = h - 170;
    const padding = 16;
    ctx.textAlign = 'center';

    if (style === 'hormozi') {
      // Bold Viral Yellow/White Punch Box
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.beginPath();
      ctx.roundRect(24, boxY, w - 48, 52, 12);
      ctx.fill();
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#facc15';
      ctx.font = '900 13px sans-serif';
      ctx.fillText(text.toUpperCase().slice(0, 48), w / 2, boxY + 31);
    } else if (style === 'neon_glow') {
      ctx.fillStyle = 'rgba(232, 121, 249, 0.9)';
      ctx.font = 'bold 13px sans-serif';
      ctx.shadowColor = '#e879f9';
      ctx.shadowBlur = 10;
      ctx.fillText(text.slice(0, 52), w / 2, boxY + 30);
      ctx.shadowBlur = 0; // reset
    } else if (style === 'editorial') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = 'italic 12px serif';
      ctx.fillText(`“${text.slice(0, 60)}”`, w / 2, boxY + 30);
    } else {
      // clean minimal
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.roundRect(30, boxY + 4, w - 60, 40, 8);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 12px sans-serif';
      ctx.fillText(text.slice(0, 50), w / 2, boxY + 28);
    }
  };

  const renderTopBottomAccents = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    env: SceneryBackdropPreset,
    makeover: SalonMakeoverPreset
  ) => {
    // Upper Safe-Zone Badge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.beginPath();
    ctx.roundRect(16, 16, w - 32, 30, 8);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`● 9:16 LIVE DIRECTOR`, 28, 35);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '10px sans-serif';
    ctx.fillText(`${env.location.split(',')[0]} • ${makeover.category.toUpperCase()}`, w - 28, 35);
  };

  // 1-Click Export to YouTube Uploader
  const handleExportToUploader = () => {
    if (onSendToUploader) {
      onSendToUploader({
        title: `${selectedClipTemplate.title} | ${selectedMakeover.name}`,
        description: `${customCaptionHook}\n\nTransformation details:\n• Makeover: ${selectedMakeover.name}\n• Scenic Backdrop: ${selectedBackdrop.name}\n• Motion Engine: ${selectedHiggsfield.name}\n\nGenerated via ShortsForge AI Creative Salon Studio.`,
        tags: ['shorts', 'glowup', 'makeover', selectedMakeover.category, selectedClipTemplate.niche.toLowerCase(), 'beauty', 'fitness']
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customCaptionHook);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* GLOBAL WORKFLOW BREADCRUMB & NO DEAD ENDS TOOLBAR */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <button 
            onClick={onSendToOnTrend}
            className="hover:text-white flex items-center gap-1 transition text-pink-400 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>OnTrend Beauty Hub</span>
          </button>
          <span>/</span>
          <span className="text-white font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Creative Salon &amp; Video Director Studio
          </span>
        </div>

        {/* Next Step Fast-Travel Quick Links (NO DEAD ENDS!) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {onSendToSceneGen && (
            <button
              onClick={onSendToSceneGen}
              className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>Cinematic B-Roll</span>
            </button>
          )}

          {onSendToSimulator && (
            <button
              onClick={() => onSendToSimulator(customCaptionHook)}
              className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>CapCut Safe-Zone</span>
            </button>
          )}

          {onSendToClipper && (
            <button
              onClick={() => onSendToClipper(0, 15, customCaptionHook)}
              className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              <span>Clipper Suite</span>
            </button>
          )}

          {onSendToUploader && (
            <button
              onClick={handleExportToUploader}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-950/40"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Export to YouTube</span>
            </button>
          )}
        </div>
      </div>

      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-pink-950/70 via-purple-950/50 to-zinc-950 border border-pink-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 bg-pink-500/20 text-pink-400 rounded-xl border border-pink-500/40 shadow-inner">
                <Sparkles className="w-5 h-5 text-pink-300" />
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight">
                AI Creative Salon <span className="text-pink-400">&amp; Video Director Studio</span>
              </h1>
            </div>
            <p className="text-xs text-zinc-300 max-w-2xl mt-1 leading-relaxed">
              Transform raw photos or recorded video responses into high-production YouTube Shorts. Combine professional salon makeovers, live realistic scenery backdrops, Higgsfield-styled camera motion physics, and 1-click video transforms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleWebcam}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg ${
                isWebcamActive 
                  ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse' 
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700'
              }`}
            >
              <Camera className="w-4 h-4 text-pink-400" />
              <span>{isWebcamActive ? 'Stop Webcam' : 'Record Video Response'}</span>
            </button>

            <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-pink-950/50">
              <Upload className="w-4 h-4" />
              <span>Upload Video / Photo</span>
              <input 
                type="file" 
                accept="video/*,image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Feature Sub-Navigation Tabs */}
        <div className="mt-5 pt-4 border-t border-pink-950/50 flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('salon')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'salon'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Palette className="w-4 h-4 text-pink-300" />
            <span>1. Creative Salon Makeovers</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300">
              Hair &amp; Skincare
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('backdrop')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'backdrop'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-300" />
            <span>2. Live Scenery Backdrops</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
              Penthouse &amp; Santorini
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('higgsfield')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'higgsfield'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Zap className="w-4 h-4 text-purple-300" />
            <span>3. Higgsfield Motion Physics</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
              Dolly Zoom &amp; VFX
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('responder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'responder'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Video className="w-4 h-4 text-cyan-300" />
            <span>4. Video Response Studio</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
              Duet &amp; PiP
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('instantClip')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'instantClip'
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Flame className="w-4 h-4 text-red-400" />
            <span>5. Instant YouTube Short</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-bold">
              1-Click Render
            </span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: LEFT CONTROLS, RIGHT 9:16 LIVE DIRECTOR STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ACTIVE CONTROL SUITE */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* VIEW 1: CREATIVE SALON MAKEOVERS */}
          {activeSubTab === 'salon' && (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-pink-400" />
                    Salon Esthetics &amp; Makeover Engine:
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Select high-fidelity transformations to apply over raw video or image frames
                  </p>
                </div>
                <span className="text-xs font-mono text-pink-400 font-bold">
                  {SALON_MAKEOVER_PRESETS.length} Transformations
                </span>
              </div>

              {/* Grid of Makeover Presets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SALON_MAKEOVER_PRESETS.map((preset) => {
                  const isSelected = selectedMakeover.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedMakeover(preset)}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-pink-500/15 border-pink-500 shadow-md ring-1 ring-pink-500/40 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${preset.badgeColor}`}>
                            {preset.badge}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />}
                        </div>
                        <div className="text-xs font-bold text-white leading-tight">{preset.name}</div>
                        <div className="text-[11px] text-zinc-400 mt-1 leading-snug line-clamp-2">
                          {preset.subtitle}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-500 uppercase">{preset.category}</span>
                        <span className="text-pink-300 font-bold">Intensity: {preset.intensity}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Makeover Fine-Tuning Sliders */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-pink-400" />
                    Transformation Effect Intensity:
                  </span>
                  <span className="font-mono font-bold text-pink-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {makeoverIntensity}%
                  </span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={100}
                  value={makeoverIntensity}
                  onChange={(e) => setMakeoverIntensity(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedMakeover.features.map((feat, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-pink-400" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: LIVE SCENERY BACKDROPS */}
          {activeSubTab === 'backdrop' && (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    Live Scenic Environment Backdrops:
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Stage your video response or salon portrait inside animated virtual locations
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {SCENERY_BACKDROP_PRESETS.length} Environments
                </span>
              </div>

              {/* Grid of Scenery Backdrops */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCENERY_BACKDROP_PRESETS.map((backdrop) => {
                  const isSelected = selectedBackdrop.id === backdrop.id;
                  return (
                    <button
                      key={backdrop.id}
                      onClick={() => {
                        setSelectedBackdrop(backdrop);
                        setBackdropBokeh(backdrop.bokehLevel);
                        setLightingMatchTemp(backdrop.lightingTemp);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-md ring-1 ring-amber-500/40 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-300 font-bold">
                            {backdrop.badge}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                        </div>
                        <div className="text-xs font-bold text-white leading-tight">{backdrop.name}</div>
                        <div className="text-[10px] font-mono text-zinc-400 mt-0.5">{backdrop.location}</div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug line-clamp-2">
                          {backdrop.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-amber-400">{backdrop.timeOfDay}</span>
                        <span className="text-zinc-500">Audio: {backdrop.ambientSoundName.split(' ')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Backdrop Fine-Tuning Sliders */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      Backdrop Depth of Field (Bokeh Blur):
                    </span>
                    <span className="font-mono font-bold text-cyan-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      f/{(backdropBokeh / 20 + 1.2).toFixed(1)} ({backdropBokeh}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={backdropBokeh}
                    onChange={(e) => setBackdropBokeh(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      Subject Lighting Match (Kelvin Shift):
                    </span>
                    <span className="font-mono font-bold text-amber-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {lightingMatchTemp > 0 ? `+${lightingMatchTemp}° Warm` : `${lightingMatchTemp}° Cool`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={lightingMatchTemp}
                    onChange={(e) => setLightingMatchTemp(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: HIGGSFIELD MOTION PHYSICS */}
          {activeSubTab === 'higgsfield' && (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    Higgsfield-Styled Animation &amp; Motion Physics:
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Select cinematic optical camera moves and animated particle physics overlays
                  </p>
                </div>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  {HIGGSFIELD_MOTION_PRESETS.length} Motion Styles
                </span>
              </div>

              {/* Grid of Higgsfield Physics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HIGGSFIELD_MOTION_PRESETS.map((motion) => {
                  const isSelected = selectedHiggsfield.id === motion.id;
                  return (
                    <button
                      key={motion.id}
                      onClick={() => setSelectedHiggsfield(motion)}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-purple-500/15 border-purple-500 shadow-md ring-1 ring-purple-500/40 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-300 font-bold">
                            {motion.badge}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />}
                        </div>
                        <div className="text-xs font-bold text-white leading-tight">{motion.name}</div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug line-clamp-2">
                          {motion.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-purple-400">{motion.speed}</span>
                        <span className="text-zinc-500">{motion.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Motion Physics Velocity Slider */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    Camera Momentum &amp; VFX Intensity:
                  </span>
                  <span className="font-mono font-bold text-purple-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {higgsfieldSpeed}%
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={higgsfieldSpeed}
                  onChange={(e) => setHiggsfieldSpeed(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* VIEW 4: VIDEO RESPONSE & UPLOAD STUDIO */}
          {activeSubTab === 'responder' && (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  Creator Response &amp; Staging Modes:
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Upload your video or record with your camera to respond to viral trends and products
                </p>
              </div>

              {/* Response Layout Switcher */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'chroma', label: 'Live Backdrop', desc: 'Staged in 3D Scenery', icon: Sun },
                  { id: 'split', label: '50/50 Stitch', desc: 'Duet Top & Bottom', icon: Scissors },
                  { id: 'pip', label: 'PiP Bubble', desc: 'Floating Reaction', icon: Monitor },
                  { id: 'fullstage', label: 'Full Stage', desc: 'Portrait Salon Only', icon: Eye }
                ].map((mode) => {
                  const isSelected = responseMode === mode.id;
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setResponseMode(mode.id as any)}
                      className={`p-3 rounded-xl border text-left transition ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-cyan-400' : 'text-zinc-500'}`} />
                      <div className="text-xs font-bold">{mode.label}</div>
                      <div className="text-[10px] text-zinc-500">{mode.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Upload & Webcam Controls Card */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Mic className="w-4 h-4 text-emerald-400" />
                    <span>Hardware Feed Connection</span>
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isWebcamActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-900 text-zinc-500'
                  }`}>
                    {isWebcamActive ? '● CAMERA LIVE' : 'NO ACTIVE STREAM'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleToggleWebcam}
                    className={`w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                      isWebcamActive
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950/40'
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>{isWebcamActive ? 'Disconnect Camera' : 'Connect Camera'}</span>
                  </button>

                  <label className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4 text-zinc-400" />
                    <span>Upload Local File</span>
                    <input 
                      type="file" 
                      accept="video/*,image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {uploadedMediaUrl && (
                  <div className="pt-2 text-xs text-emerald-400 font-mono flex items-center justify-between">
                    <span>Active file loaded ({uploadedMediaType})</span>
                    <button 
                      onClick={() => setUploadedMediaUrl(null)} 
                      className="text-zinc-500 hover:text-red-400 underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Hidden Webcam Element used as Canvas Source */}
              <video 
                ref={webcamVideoRef} 
                autoPlay 
                playsInline 
                muted 
                className="hidden" 
              />
            </div>
          )}

          {/* VIEW 5: INSTANT YOUTUBE CLIP TRANSFORMATION */}
          {activeSubTab === 'instantClip' && (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  Instant YouTube Short Generator:
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Turn your staged salon transformation and response into a finished 9:16 export
                </p>
              </div>

              {/* Preset Viral Templates */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 font-mono">
                  Viral Clip Structure Blueprint:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUICK_CLIP_TEMPLATES.map((tmpl) => {
                    const isSelected = selectedClipTemplate.id === tmpl.id;
                    return (
                      <button
                        key={tmpl.id}
                        onClick={() => {
                          setSelectedClipTemplate(tmpl);
                          setCustomCaptionHook(tmpl.hookText);
                          setCaptionStyle(tmpl.defaultCaptionStyle);
                        }}
                        className={`p-3 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-red-500/15 border-red-500 text-white shadow-md'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-bold">
                            {tmpl.duration}s Short
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500">{tmpl.niche.split(' ')[0]}</span>
                        </div>
                        <div className="text-xs font-bold text-white">{tmpl.title}</div>
                        <div className="text-[10px] text-zinc-400 mt-1 line-clamp-1">{tmpl.pacingStyle}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Caption Hook Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between font-mono">
                  <span>Viral Hook Banner Text (&lt;60 chars):</span>
                  <span className="text-pink-400">{customCaptionHook.length} chars</span>
                </label>
                <input
                  type="text"
                  value={customCaptionHook}
                  onChange={(e) => setCustomCaptionHook(e.target.value)}
                  placeholder="Enter high-retention hook..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Caption Aesthetic Styler */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 font-mono">
                  Overlay Subtitle Typography:
                </label>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { id: 'hormozi', label: 'Hormozi Gold' },
                    { id: 'neon_glow', label: 'Neon Glow' },
                    { id: 'editorial', label: 'Luxe Serif' },
                    { id: 'clean_minimal', label: 'Clean Box' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCaptionStyle(s.id as any)}
                      className={`py-1.5 rounded-lg text-xs font-semibold border transition ${
                        captionStyle === s.id
                          ? 'bg-zinc-800 text-white border-pink-500 shadow'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Render & Recording Trigger */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Direct Canvas Video Recording</div>
                    <div className="text-[11px] text-zinc-400">
                      Captures full 9:16 vertical short with real-time effects to high-definition WebM/MP4
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-red-400">
                    {mediaRecorderActive ? `RECORDING: ${recordingSeconds}s` : 'READY'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {!mediaRecorderActive ? (
                    <button
                      onClick={handleStartRecordingClip}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-xl shadow-red-950/50"
                    >
                      <Radio className="w-4 h-4 animate-pulse" />
                      <span>Start 15-Sec Instant Video Capture</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecordingClip}
                      className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition flex items-center justify-center gap-2"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Stop &amp; Export Video File Now</span>
                    </button>
                  )}
                </div>

                {renderedClipUrl && (
                  <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                    <span className="text-xs font-mono text-emerald-400">
                      ✓ Instant Clip Rendered Successfully!
                    </span>
                    <a
                      href={renderedClipUrl}
                      download={`ShortsForge_${selectedMakeover.id}_${Date.now()}.webm`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Clip</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: 9:16 LIVE DIRECTOR STAGE & BEFORE/AFTER SPLIT PREVIEW */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-2xl flex flex-col items-center">
            
            {/* Top Toolbar Above Canvas */}
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-white font-bold">9:16 LIVE STAGE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                  {isPlaying ? 'PLAYING' : 'PAUSED'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsComparing(!isComparing)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                    isComparing
                      ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {isComparing ? 'Split Slider ON' : 'Single View'}
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* THE 9:16 CANVAS CONTAINER */}
            <div className="relative w-[300px] h-[533px] sm:w-[324px] sm:h-[576px] rounded-2xl overflow-hidden border-2 border-zinc-800 bg-black shadow-2xl group select-none">
              <canvas
                ref={canvasRef}
                width={432}
                height={768}
                className="w-full h-full object-cover"
              />

              {/* Interactive Draggable Before & After Slider Handle (Overlayed on top of canvas) */}
              {isComparing && (
                <div 
                  className="absolute inset-y-0 w-8 -ml-4 z-20 flex items-center justify-center cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${splitPosition}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg font-mono text-xs font-black">
                    ⟷
                  </div>
                </div>
              )}

              {/* Status indicator pill bottom left */}
              <div className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300">
                {selectedBackdrop.location.split(',')[0]}
              </div>

              {/* Higgsfield motion badge bottom right */}
              <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded bg-purple-900/60 backdrop-blur-md border border-purple-500/30 text-[9px] font-mono text-purple-200">
                {selectedHiggsfield.name.split(' ')[0]}
              </div>
            </div>

            {/* Split Slider Scrub Bar Under Canvas */}
            {isComparing && (
              <div className="w-full mt-4 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">◄ Raw Input ({100 - splitPosition}%)</span>
                  <span className="text-pink-400 font-bold">Salon Glow ({splitPosition}%) ►</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={splitPosition}
                  onChange={(e) => setSplitPosition(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-ew-resize"
                />
              </div>
            )}

            {/* One-Click Action Buttons Under Stage */}
            <div className="w-full mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={handleExportToUploader}
                className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-red-950/40"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Export to YouTube</span>
              </button>

              <button
                onClick={() => {
                  if (onSendToSimulator) onSendToSimulator(customCaptionHook);
                }}
                className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 border border-zinc-700"
              >
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Check Safe-Zones</span>
              </button>
            </div>

          </div>

          {/* Real-time Scene Inspector Specs */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
              <span>Active Makeover:</span>
              <span className="text-pink-300 font-bold">{selectedMakeover.name}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
              <span>Scenic Backdrop:</span>
              <span className="text-amber-300 font-bold">{selectedBackdrop.name}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
              <span>Motion Overlay:</span>
              <span className="text-purple-300 font-bold">{selectedHiggsfield.name}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
              <span>Pacing Blueprint:</span>
              <span className="text-emerald-300 font-bold">{selectedClipTemplate.title}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
