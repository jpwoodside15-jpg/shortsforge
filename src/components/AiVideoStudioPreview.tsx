import React, { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, RotateCcw, Sliders, Volume2, Film, Sparkles,
  Download, Eye, EyeOff, Layers, Flame, ShieldAlert,
  Copy, Check, Plus, Trash2, Clock, Camera, Zap, Music,
  Share2, ZoomIn, Move, Split, Video, Wand2
} from 'lucide-react';
import { 
  AiVideoScene, 
  AiVideoProjectConfig, 
  TimelineTrackItem, 
  SentimentCaptionSegment 
} from '../types';
import { playSonicSfx } from '../utils/soundSynthesizer';

interface AiVideoStudioPreviewProps {
  initialTranscript?: string;
  sentimentSegments?: SentimentCaptionSegment[];
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  timelineSfx: TimelineTrackItem[];
  onRemoveTimelineSfx?: (id: string) => void;
  onUpdateSfxVolume?: (id: string, vol: number) => void;
  onOpenSonicLibrary?: () => void;
}

const DEFAULT_SCENES: AiVideoScene[] = [
  {
    id: 'scene-1',
    sceneNumber: 1,
    title: 'Thumb-Stop Hook',
    prompt: 'Cinematic hyper-realistic close-up of a shattered gold vault clock ticking backwards, dramatic volumetric rim lighting, neon red highlights, 8k resolution, photorealistic, 9:16 vertical ratio',
    durationSec: 3.0,
    style: 'hyper-realistic',
    cameraMotion: 'zoom-in',
    visualTheme: 'finance',
    overlayCaption: 'THE SINGLE BIGGEST LIE',
    colorHex: '#FF0038'
  },
  {
    id: 'scene-2',
    sceneNumber: 2,
    title: 'Curiosity Contrast',
    prompt: 'Floating holographic stock market charts in dark rain cyberpunk cityscape, cyber cyan reflections, neon electric yellow data trails, dynamic drone pan, unreal engine 5 render',
    durationSec: 4.0,
    style: 'cyberpunk-neon',
    cameraMotion: 'pan-left',
    visualTheme: 'city',
    overlayCaption: 'ABOUT MAKING MONEY',
    colorHex: '#FFE600'
  },
  {
    id: 'scene-3',
    sceneNumber: 3,
    title: 'Climax & Victory',
    prompt: 'Victorious entrepreneur overlooking towering futuristic crystal skyline sunrise, golden radiant volumetric god-rays, emerald green energy particles swirling, 35mm master shot, ultra-detailed',
    durationSec: 4.5,
    style: 'cinematic-dark',
    cameraMotion: 'drone-orbit',
    visualTheme: 'finance',
    overlayCaption: 'THE TOP 1% DOUBLE IT',
    colorHex: '#00E676'
  }
];

export const AiVideoStudioPreview: React.FC<AiVideoStudioPreviewProps> = ({
  initialTranscript = "The single biggest lie about making money is that lowering your prices gets you more customers. The top 1% double it and multiply the value.",
  sentimentSegments = [],
  onSendToUploader,
  timelineSfx = [],
  onRemoveTimelineSfx,
  onUpdateSfxVolume,
  onOpenSonicLibrary
}) => {
  // 1. Studio Configuration State
  const [config, setConfig] = useState<AiVideoProjectConfig>({
    id: 'proj-1',
    title: 'Viral Contrarian Money Secret',
    aspectRatio: '9:16',
    splitScreenMode: true,
    splitGameplayType: 'gtav',
    splitRatio: 50,
    colorFilter: 'teal-orange',
    filmGrain: 35,
    vignette: true,
    speedMultiplier: 1.0,
    showSafeZoneOverlay: true,
    scenes: DEFAULT_SCENES,
    timelineSfx: timelineSfx
  });

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'scenes' | 'effects' | 'captions' | 'timeline'>('preview');

  // Video Export / Rendering state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState<string | null>(null);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const playedSfxSetRef = useRef<Set<string>>(new Set());

  // Calculate total project duration
  const totalDurationSec = config.scenes.reduce((acc, sc) => acc + sc.durationSec, 0) || 11.5;

  // Sync external timeline SFX with config
  useEffect(() => {
    setConfig(prev => ({ ...prev, timelineSfx }));
  }, [timelineSfx]);

  // Sync sentiment segments into scenes if available
  useEffect(() => {
    if (sentimentSegments && sentimentSegments.length >= 3) {
      setConfig(prev => ({
        ...prev,
        scenes: [
          {
            id: 'scene-1',
            sceneNumber: 1,
            title: 'Visual Hook',
            prompt: `Cinematic close-up portrait of intense speaker breaking fourth wall, volumetric rim lighting, dramatic tension, photorealistic, 9:16 vertical`,
            durationSec: sentimentSegments[0].endSec || 3.0,
            style: 'hyper-realistic',
            cameraMotion: 'zoom-in',
            visualTheme: 'brain',
            overlayCaption: sentimentSegments[0].text,
            colorHex: sentimentSegments[0].colorHex || '#FF0038'
          },
          {
            id: 'scene-2',
            sceneNumber: 2,
            title: 'Contrast Narrative',
            prompt: `Holographic data graphs and floating neon financial icons in dark moody studio, cyber teal highlights, hyper-detailed 8k, slow pan`,
            durationSec: (sentimentSegments[1]?.endSec || 6.5) - (sentimentSegments[0]?.endSec || 3.0),
            style: 'cyberpunk-neon',
            cameraMotion: 'pan-left',
            visualTheme: 'finance',
            overlayCaption: sentimentSegments[1]?.text || 'CONTRAST SHIFT',
            colorHex: sentimentSegments[1]?.colorHex || '#FFE600'
          },
          {
            id: 'scene-3',
            sceneNumber: 3,
            title: 'Dopamine Payoff',
            prompt: `Futuristic golden glass towers, radiant morning sunlight god rays, emerald energy particles, victorious cinematic slow motion`,
            durationSec: 4.5,
            style: 'cinematic-dark',
            cameraMotion: 'drone-orbit',
            visualTheme: 'city',
            overlayCaption: sentimentSegments[sentimentSegments.length - 1]?.text || 'MULTIPLY THE VALUE',
            colorHex: sentimentSegments[sentimentSegments.length - 1]?.colorHex || '#00E676'
          }
        ]
      }));
    }
  }, [sentimentSegments]);

  // Handle Playhead Scrubbing and Playback
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      const tick = () => {
        const now = performance.now();
        const deltaSec = ((now - lastTimeRef.current) / 1000) * config.speedMultiplier;
        lastTimeRef.current = now;

        setCurrentTimeSec(prev => {
          const next = prev + deltaSec;
          if (next >= totalDurationSec) {
            // Loop or restart
            playedSfxSetRef.current.clear();
            return 0;
          }
          return next;
        });

        animId = requestAnimationFrame(tick);
      };
      animId = requestAnimationFrame(tick);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, totalDurationSec, config.speedMultiplier]);

  // Play audio SFX triggers at exact timestamps
  useEffect(() => {
    if (!isPlaying) return;
    config.timelineSfx.forEach(item => {
      // Trigger if playhead passed the timestamp within a small window
      const diff = currentTimeSec - item.timestampSec;
      if (diff >= 0 && diff <= 0.15 && !playedSfxSetRef.current.has(item.id)) {
        playedSfxSetRef.current.add(item.id);
        const sfxTypeMap: Record<string, any> = {
          'whoosh': 'whoosh-air',
          'pop': 'bubble-pop',
          'cinematic-hit': 'braam-hit',
          'riser': 'riser-pitch',
          'bass-drop': 'sub-drop',
          'dopamine-cash': 'cash-chime',
          'glitch-ui': 'glitch-buzz'
        };
        const wave = sfxTypeMap[item.category] || 'whoosh-air';
        playSonicSfx(wave, item.volume);
      }
    });
  }, [currentTimeSec, isPlaying, config.timelineSfx]);

  // Determine current active scene based on currentTimeSec
  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < config.scenes.length; i++) {
      accumulated += config.scenes[i].durationSec;
      if (currentTimeSec <= accumulated) {
        setActiveSceneIndex(i);
        break;
      }
    }
  }, [currentTimeSec, config.scenes]);

  const activeScene = config.scenes[activeSceneIndex] || config.scenes[0];

  // Real-Time Canvas Rendering Pipeline
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localFrame = 0;
    const render = () => {
      localFrame++;
      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Determine split coordinates
      const splitY = config.splitScreenMode ? (height * config.splitRatio) / 100 : height;

      // ==========================================
      // SECTION A: AI VIDEO SCENE (TOP HALF OR FULL)
      // ==========================================
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, splitY);
      ctx.clip();

      // Background Gradient based on Style
      const sceneGrad = ctx.createLinearGradient(0, 0, width, splitY);
      if (activeScene.style === 'cyberpunk-neon') {
        sceneGrad.addColorStop(0, '#0a001a');
        sceneGrad.addColorStop(0.5, '#001a2b');
        sceneGrad.addColorStop(1, '#1b0024');
      } else if (activeScene.style === 'cinematic-dark') {
        sceneGrad.addColorStop(0, '#100c08');
        sceneGrad.addColorStop(0.5, '#080d12');
        sceneGrad.addColorStop(1, '#050508');
      } else if (activeScene.style === '3d-vibrant') {
        sceneGrad.addColorStop(0, '#1c0f38');
        sceneGrad.addColorStop(0.5, '#05222c');
        sceneGrad.addColorStop(1, '#080816');
      } else {
        sceneGrad.addColorStop(0, '#181210');
        sceneGrad.addColorStop(0.5, '#0d131a');
        sceneGrad.addColorStop(1, '#08090d');
      }
      ctx.fillStyle = sceneGrad;
      ctx.fillRect(0, 0, width, splitY);

      // Procedural Camera Motion Transform
      const sceneTime = currentTimeSec;
      let camScale = 1.0;
      let camX = 0;
      let camY = 0;

      if (activeScene.cameraMotion === 'zoom-in') {
        camScale = 1.0 + (sceneTime % 3.0) * 0.08;
      } else if (activeScene.cameraMotion === 'pan-left') {
        camX = Math.sin(sceneTime * 1.5) * 20;
      } else if (activeScene.cameraMotion === 'drone-orbit') {
        camScale = 1.05 + Math.sin(sceneTime * 2) * 0.04;
        camX = Math.cos(sceneTime * 1.2) * 15;
      } else if (activeScene.cameraMotion === 'tilt-up') {
        camY = Math.sin(sceneTime * 1.5) * 18;
      }

      ctx.save();
      ctx.translate(width / 2 + camX, splitY / 2 + camY);
      ctx.scale(camScale, camScale);
      ctx.translate(-width / 2, -splitY / 2);

      // Draw Atmospheric AI Volumetric Beams
      const beamGrad = ctx.createRadialGradient(
        width * 0.5, splitY * 0.3, 20,
        width * 0.5, splitY * 0.3, width * 0.8
      );
      beamGrad.addColorStop(0, 'rgba(255, 230, 0, 0.25)');
      beamGrad.addColorStop(0.5, activeScene.colorHex + '22');
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, width, splitY);

      // Futuristic 3D Cyber Perspective Floor / Grid
      ctx.strokeStyle = activeScene.colorHex + '33';
      ctx.lineWidth = 1.5;
      const horizonY = splitY * 0.55;
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(width / 2, horizonY);
        ctx.lineTo(width / 2 + i * (width * 0.35), splitY);
        ctx.stroke();
      }
      for (let h = 0; h < 6; h++) {
        const lineY = horizonY + Math.pow(h / 5, 2) * (splitY - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      }

      // Swirling Ambient Hologram Particles
      const particleCount = 28;
      for (let p = 0; p < particleCount; p++) {
        const px = (Math.sin(p * 99 + sceneTime * 2) * 0.5 + 0.5) * width;
        const py = ((p * 45 + sceneTime * 80) % splitY);
        const pSize = 2 + (p % 4);

        ctx.fillStyle = p % 2 === 0 ? activeScene.colorHex : '#FFFFFF';
        ctx.shadowColor = activeScene.colorHex;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Stylized Center AI Subject (Holographic Avatar Silhouette / Focus Element)
      const subCenterX = width / 2;
      const subCenterY = splitY * 0.48;

      ctx.save();
      // Glowing aura
      ctx.fillStyle = activeScene.colorHex + '18';
      ctx.beginPath();
      ctx.ellipse(subCenterX, subCenterY, 70, 110, 0, 0, Math.PI * 2);
      ctx.fill();

      // Stylized head & shoulders silhouette
      ctx.fillStyle = '#0a0d14';
      ctx.strokeStyle = activeScene.colorHex;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(subCenterX, subCenterY - 35, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(subCenterX, subCenterY + 40, 55, 45, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // AI Scanner Light Beam traversing the subject
      const scanBarY = subCenterY - 60 + ((localFrame * 3) % 150);
      ctx.fillStyle = activeScene.colorHex + '44';
      ctx.fillRect(subCenterX - 65, scanBarY, 130, 3);
      ctx.restore();

      // AI Scene Tag Badge top left
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(16, 16, 180, 28);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(16, 16, 180, 28);
      ctx.fillStyle = activeScene.colorHex;
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`SCENE ${activeScene.sceneNumber}: ${activeScene.title.toUpperCase()}`, 24, 34);

      ctx.restore(); // Restore camera motion
      ctx.restore(); // Restore top half clip

      // ==========================================
      // SECTION B: GAMEPLAY HYPNOSIS (BOTTOM HALF)
      // ==========================================
      if (config.splitScreenMode) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, splitY, width, height - splitY);
        ctx.clip();

        // 1. Split Screen Divider Line with Glowing Accent
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 12;
        ctx.fillRect(0, splitY - 2, width, 4);
        ctx.shadowBlur = 0;

        // Render chosen viral gameplay
        const bottomH = height - splitY;
        const gpTime = currentTimeSec * 1.5;

        if (config.splitGameplayType === 'gtav') {
          // GTA V Mega Ramp Simulation: Speeding orange asphalt ramp
          const rampGrad = ctx.createLinearGradient(0, splitY, 0, height);
          rampGrad.addColorStop(0, '#021526');
          rampGrad.addColorStop(0.5, '#0e2954');
          rampGrad.addColorStop(1, '#ff6b00');
          ctx.fillStyle = rampGrad;
          ctx.fillRect(0, splitY, width, bottomH);

          // Perspective mega track
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.moveTo(width * 0.42, splitY);
          ctx.lineTo(width * 0.58, splitY);
          ctx.lineTo(width * 0.88, height);
          ctx.lineTo(width * 0.12, height);
          ctx.fill();

          // Speed lines
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;
          for (let s = 0; s < 5; s++) {
            const sy = splitY + ((s * 70 + gpTime * 320) % bottomH);
            ctx.beginPath();
            ctx.moveTo(width * 0.48, sy);
            ctx.lineTo(width * 0.52, sy);
            ctx.stroke();
          }

          // Stunt Car Icon
          ctx.fillStyle = '#ef4444';
          const carY = height - 90;
          ctx.fillRect(width / 2 - 20, carY, 40, 60);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(width / 2 - 15, carY + 12, 30, 16);
          // Taillights
          ctx.fillStyle = '#fee2e2';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 15;
          ctx.fillRect(width / 2 - 18, carY + 54, 10, 5);
          ctx.fillRect(width / 2 + 8, carY + 54, 10, 5);
          ctx.shadowBlur = 0;
        } else if (config.splitGameplayType === 'subway') {
          // Subway Surfers 3-Lane Railway
          ctx.fillStyle = '#0c4a6e';
          ctx.fillRect(0, splitY, width, bottomH);

          // 3 Track lanes
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(width * 0.33, splitY);
          ctx.lineTo(width * 0.15, height);
          ctx.moveTo(width * 0.66, splitY);
          ctx.lineTo(width * 0.85, height);
          ctx.stroke();

          // Sleepers
          ctx.strokeStyle = '#64748b';
          for (let sl = 0; sl < 8; sl++) {
            const sly = splitY + ((sl * 45 + gpTime * 280) % bottomH);
            ctx.beginPath();
            ctx.moveTo(0, sly);
            ctx.lineTo(width, sly);
            ctx.stroke();
          }

          // Surfer character
          const laneX = width / 2;
          ctx.fillStyle = '#3b82f6';
          ctx.beginPath();
          ctx.arc(laneX, height - 70, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(laneX - 12, height - 52, 24, 12);
        } else {
          // Minecraft Parkour / CSGO / Sand fallback: high-speed neon blocks
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, splitY, width, bottomH);

          // Grid blocks
          for (let b = 0; b < 6; b++) {
            const by = splitY + ((b * 60 + gpTime * 190) % bottomH);
            const bx = (Math.sin(b * 3) * 0.3 + 0.5) * width;
            ctx.fillStyle = '#10b981';
            ctx.fillRect(bx - 30, by, 60, 24);
            ctx.strokeStyle = '#34d399';
            ctx.strokeRect(bx - 30, by, 60, 24);
          }
        }

        // Gameplay Label
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(16, splitY + 12, 220, 24);
        ctx.strokeStyle = '#eab308';
        ctx.strokeRect(16, splitY + 12, 220, 24);
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`🎮 HYPNOTIC LOOP: ${config.splitGameplayType.toUpperCase()} (140 BPM)`, 24, splitY + 28);

        ctx.restore();
      }

      // ==========================================
      // SECTION C: CAPTION OVERLAY (CENTER SAFE ZONE)
      // ==========================================
      ctx.save();
      const capText = activeScene.overlayCaption || 'THE SINGLE BIGGEST LIE';
      const capWords = capText.split(' ');
      const capColor = activeScene.colorHex || '#FFE600';

      ctx.font = '900 32px Impact, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Safe Center Position (around 42% or split border)
      const captionCenterY = config.splitScreenMode ? splitY - 45 : height * 0.45;

      // Draw Subtitle Background Pill
      const totalTextWidth = ctx.measureText(capText).width;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.roundRect(width / 2 - totalTextWidth / 2 - 16, captionCenterY - 26, totalTextWidth + 32, 52, 12);
      ctx.fill();
      ctx.strokeStyle = capColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Glow & Text
      ctx.shadowColor = capColor;
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#FFFFFF';
      
      // Render text with highlighted word
      let curX = width / 2 - totalTextWidth / 2;
      capWords.forEach((w, wIdx) => {
        const wWidth = ctx.measureText(w + ' ').width;
        const isHighlight = wIdx === capWords.length - 1;
        ctx.fillStyle = isHighlight ? capColor : '#FFFFFF';
        ctx.fillText(w, curX + wWidth / 2, captionCenterY);
        curX += wWidth;
      });
      ctx.shadowBlur = 0;
      ctx.restore();

      // ==========================================
      // SECTION D: POST-PROCESSING FILTERS & GRAIN
      // ==========================================
      // 1. Color Grading Overlay
      if (config.colorFilter === 'teal-orange') {
        ctx.fillStyle = 'rgba(14, 165, 233, 0.08)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(249, 115, 22, 0.08)';
        ctx.fillRect(0, 0, width, height);
      } else if (config.colorFilter === 'noir') {
        // High contrast noir overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);
      } else if (config.colorFilter === 'matrix') {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
        ctx.fillRect(0, 0, width, height);
      } else if (config.colorFilter === 'warm-dopamine') {
        ctx.fillStyle = 'rgba(234, 179, 8, 0.12)';
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Procedural Film Grain
      if (config.filmGrain > 0) {
        ctx.save();
        const grainAlpha = (config.filmGrain / 100) * 0.12;
        ctx.fillStyle = `rgba(255, 255, 255, ${grainAlpha})`;
        for (let g = 0; g < 400; g++) {
          const gx = Math.random() * width;
          const gy = Math.random() * height;
          ctx.fillRect(gx, gy, 1.5, 1.5);
        }
        ctx.restore();
      }

      // 3. Vignette Shadow
      if (config.vignette) {
        const vig = ctx.createRadialGradient(
          width / 2, height / 2, height * 0.35,
          width / 2, height / 2, height * 0.75
        );
        vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vig.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, width, height);
      }

      // ==========================================
      // SECTION E: SAFE ZONE OVERLAY GUIDE
      // ==========================================
      if (config.showSafeZoneOverlay) {
        ctx.save();
        // Top dangerous zone (Header, Search, Sound)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.fillRect(0, 0, width, 90);
        ctx.strokeStyle = '#ef4444';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(0, 0, width, 90);
        ctx.fillStyle = '#fca5a5';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('⚠️ TOP BLOCKED ZONE (Search & Title)', 16, 80);

        // Right dangerous zone (Like, Comment, Share, Remix buttons)
        ctx.fillRect(width - 70, 100, 70, height - 260);
        ctx.strokeRect(width - 70, 100, 70, height - 260);
        ctx.save();
        ctx.translate(width - 30, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('⚠️ BUTTONS RAIL', -40, 0);
        ctx.restore();

        // Bottom dangerous zone (Channel, Subscribe, Sound, Description)
        ctx.fillRect(0, height - 130, width, 130);
        ctx.strokeRect(0, height - 130, width, 130);
        ctx.fillText('⚠️ BOTTOM UI (Channel, Title, Audio tag)', 16, height - 30);

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [config, activeScene, currentTimeSec]);

  // Video Export Engine: Records Canvas to MP4/WebM Video file
  const handleExportFullVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      const stream = canvas.captureStream(30);
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      } catch {
        recorder = new MediaRecorder(stream);
      }

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const finishPromise = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          resolve(blob);
        };
      });

      recorder.start();

      // Play through video from 0 to totalDurationSec
      setCurrentTimeSec(0);
      setIsPlaying(true);

      const durationMs = totalDurationSec * 1000;
      const intervalMs = 200;
      let elapsed = 0;

      const progressTimer = setInterval(() => {
        elapsed += intervalMs;
        const pct = Math.min(99, Math.round((elapsed / durationMs) * 100));
        setExportProgress(pct);
      }, intervalMs);

      await new Promise(r => setTimeout(r, durationMs + 200));
      clearInterval(progressTimer);

      recorder.stop();
      setIsPlaying(false);
      setExportProgress(100);

      const blob = await finishPromise;
      const downloadUrl = URL.createObjectURL(blob);
      setExportedVideoUrl(downloadUrl);

      // Auto trigger download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `ai_video_short_${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('Export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDirectPushToUploader = () => {
    if (onSendToUploader) {
      onSendToUploader({
        title: `${config.title} #Shorts`,
        description: `Visual storytelling short generated with AI Director Studio.\n\nKey Insight: ${activeScene.prompt}\n\n#Shorts #Viral #Storytelling #AI`,
        tags: ['shorts', 'viral', 'storytelling', 'capcut', 'ai video']
      });
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* 1. Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600/20 text-red-500 rounded-2xl border border-red-500/30">
            <Video className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">
                AI Video Generation Studio &amp; 9:16 Editing Facility
              </h3>
              <span className="text-[11px] font-mono bg-red-500/15 text-red-400 font-bold px-2 py-0.5 rounded border border-red-500/30">
                PRO PREVIEW
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Real-time vertical video preview • Dynamic camera choreography • Dual-stimulation gameplay split-screen • Sonic timeline sync • Direct high-res video export.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportFullVideo}
            disabled={isExporting}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-900/40 flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {isExporting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Rendering {exportProgress}%...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export 9:16 Video</span>
              </>
            )}
          </button>

          <button
            onClick={handleDirectPushToUploader}
            className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-bold border border-zinc-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-red-400" />
            <span>Send to YouTube</span>
          </button>
        </div>
      </div>

      {/* 2. Main Studio Workspace: Left Canvas Preview, Right Editing Facility */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 9:16 Interactive Video Preview Screen (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div className="relative w-[320px] h-[568px] sm:w-[340px] sm:h-[604px] bg-black rounded-[40px] p-3 shadow-2xl border-4 border-zinc-800 ring-2 ring-zinc-700/50 flex flex-col items-center justify-center select-none overflow-hidden">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-4 w-28 h-4 bg-zinc-900 rounded-full z-30 border border-zinc-800 flex items-center justify-center">
              <div className="w-10 h-1.5 bg-zinc-800 rounded-full" />
            </div>

            {/* Canvas Viewport */}
            <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={360}
                height={640}
                className="w-full h-full object-cover"
              />

              {/* On-Screen Big Play Overlay when Paused */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 m-auto w-16 h-16 bg-red-600/90 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur transition transform hover:scale-110 z-20 cursor-pointer"
                >
                  <Play className="w-8 h-8 ml-1" />
                </button>
              )}
            </div>

            {/* Subtle Screen Chin Indicator */}
            <div className="absolute bottom-2 w-32 h-1 bg-zinc-700 rounded-full z-30" />
          </div>

          {/* Player Transport Bar */}
          <div className="w-[320px] sm:w-[340px] bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 space-y-3">
            {/* Scrubber Timeline Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>{currentTimeSec.toFixed(1)}s</span>
                <span className="text-zinc-500">/ {totalDurationSec.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min={0}
                max={totalDurationSec}
                step={0.1}
                value={currentTimeSec}
                onChange={(e) => {
                  setCurrentTimeSec(parseFloat(e.target.value));
                  playedSfxSetRef.current.clear();
                }}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            {/* Transport Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={() => {
                    setCurrentTimeSec(0);
                    playedSfxSetRef.current.clear();
                  }}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition cursor-pointer"
                  title="Rewind to start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Safe Zone Toggle */}
              <button
                onClick={() => setConfig(prev => ({ ...prev, showSafeZoneOverlay: !prev.showSafeZoneOverlay }))}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                  config.showSafeZoneOverlay 
                    ? 'bg-red-950/40 border-red-500/40 text-red-300' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                }`}
              >
                {config.showSafeZoneOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Safe Zone</span>
              </button>

              {/* Speed Multiplier */}
              <select
                value={config.speedMultiplier}
                onChange={(e) => setConfig(prev => ({ ...prev, speedMultiplier: parseFloat(e.target.value) }))}
                className="bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-2 py-1.5 font-mono cursor-pointer"
              >
                <option value="0.5">0.5x</option>
                <option value="1.0">1.0x (Normal)</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x (Fast)</option>
                <option value="2.0">2.0x</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Multi-Section Editing Facility (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Studio Facility Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
            {[
              { id: 'scenes', label: 'Scene Sequencer & Prompts', icon: Film },
              { id: 'effects', label: 'Visual FX & Split-Screen', icon: Sliders },
              { id: 'timeline', label: `Sonic SFX Timeline (${config.timelineSfx.length})`, icon: Music },
              { id: 'captions', label: 'Caption Styling', icon: Wand2 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: SCENE SEQUENCER & PROMPTS */}
          {activeTab === 'scenes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    AI Video Scene Prompts &amp; Camera Choreography
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Click any scene to preview it on canvas or tweak prompt parameters.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {config.scenes.map((scene, idx) => {
                  const isCurrent = activeSceneIndex === idx;
                  return (
                    <div
                      key={scene.id}
                      onClick={() => {
                        setActiveSceneIndex(idx);
                        // Jump playhead to scene start
                        let offset = 0;
                        for (let s = 0; s < idx; s++) offset += config.scenes[s].durationSec;
                        setCurrentTimeSec(offset);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isCurrent
                          ? 'bg-zinc-950 border-red-500 ring-1 ring-red-500/40 shadow-lg'
                          : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                            isCurrent ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {scene.sceneNumber}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {scene.title}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded">
                            {scene.durationSec.toFixed(1)}s
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText(scene.prompt, `scene-${scene.id}`);
                            }}
                            className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-mono flex items-center gap-1"
                          >
                            {copiedKey === `scene-${scene.id}` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>Copy Prompt</span>
                          </button>
                        </div>
                      </div>

                      {/* Scene Prompt */}
                      <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
                        {scene.prompt}
                      </p>

                      {/* Scene Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-zinc-500 block mb-1">Visual Style:</label>
                          <select
                            value={scene.style}
                            onChange={(e) => {
                              const updated = [...config.scenes];
                              updated[idx].style = e.target.value as any;
                              setConfig(prev => ({ ...prev, scenes: updated }));
                            }}
                            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-lg p-1.5"
                          >
                            <option value="hyper-realistic">Hyper-Realistic 4K</option>
                            <option value="cyberpunk-neon">Cyberpunk Neon</option>
                            <option value="cinematic-dark">Cinematic Moody</option>
                            <option value="3d-vibrant">3D Pixar / Unreal</option>
                            <option value="anime-speed">Anime Dynamic</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-zinc-500 block mb-1">Camera Motion:</label>
                          <select
                            value={scene.cameraMotion}
                            onChange={(e) => {
                              const updated = [...config.scenes];
                              updated[idx].cameraMotion = e.target.value as any;
                              setConfig(prev => ({ ...prev, scenes: updated }));
                            }}
                            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-lg p-1.5"
                          >
                            <option value="zoom-in">Zoom In (Punchy)</option>
                            <option value="pan-left">Pan Horizontal</option>
                            <option value="drone-orbit">Drone 360° Orbit</option>
                            <option value="tilt-up">Tilt Up</option>
                            <option value="subtle-drift">Subtle Drift</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-zinc-500 block mb-1">Duration (s):</label>
                          <input
                            type="number"
                            min={1}
                            max={15}
                            step={0.5}
                            value={scene.durationSec}
                            onChange={(e) => {
                              const updated = [...config.scenes];
                              updated[idx].durationSec = parseFloat(e.target.value) || 2;
                              setConfig(prev => ({ ...prev, scenes: updated }));
                            }}
                            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-lg p-1.5 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL FX & SPLIT SCREEN */}
          {activeTab === 'effects' && (
            <div className="space-y-5 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Visual Post-Processing &amp; Dual-Stimulation Split Screen
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Adjust color grading shaders, film grain, and hypnotic background gameplay pairing.
                </p>
              </div>

              {/* Split Screen Master Toggle */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Split className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      Dual-Stimulation 50/50 Split Screen Mode
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.splitScreenMode}
                    onChange={(e) => setConfig(prev => ({ ...prev, splitScreenMode: e.target.checked }))}
                    className="w-4 h-4 accent-red-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-zinc-400">
                  Combines high-fidelity AI visual storytelling (top half) with hypnotic speed gameplay (bottom half) to lock thumbs in place.
                </p>

                {config.splitScreenMode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                        Select Hypnotic Gameplay:
                      </label>
                      <select
                        value={config.splitGameplayType}
                        onChange={(e) => setConfig(prev => ({ ...prev, splitGameplayType: e.target.value as any }))}
                        className="w-full bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs rounded-lg p-2"
                      >
                        <option value="gtav">🏎️ GTA V Mega Ramp Stunts (138 BPM)</option>
                        <option value="subway">🛹 Subway Surfers 3-Lane Run</option>
                        <option value="minecraft">⛏️ Minecraft Spiral Parkour</option>
                        <option value="csgo">🎯 CS:GO Surf Infinite Loop</option>
                        <option value="sand">🧼 Satisfying Kinetic Sand Slicing</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                        Split Ratio: {config.splitRatio}% (Top) / {100 - config.splitRatio}% (Bottom)
                      </label>
                      <input
                        type="range"
                        min={30}
                        max={70}
                        value={config.splitRatio}
                        onChange={(e) => setConfig(prev => ({ ...prev, splitRatio: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Color Grading & Shaders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                    Color Grading Filter:
                  </label>
                  <select
                    value={config.colorFilter}
                    onChange={(e) => setConfig(prev => ({ ...prev, colorFilter: e.target.value as any }))}
                    className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl p-2.5"
                  >
                    <option value="none">Standard Clean</option>
                    <option value="teal-orange">Cinematic Teal &amp; Orange (High-CTR)</option>
                    <option value="noir">Moody High-Contrast Noir</option>
                    <option value="warm-dopamine">Warm Golden Dopamine</option>
                    <option value="matrix">Matrix Cyber Neon</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-zinc-300">Film Grain Intensity:</label>
                    <span className="text-xs font-mono text-zinc-400">{config.filmGrain}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={config.filmGrain}
                    onChange={(e) => setConfig(prev => ({ ...prev, filmGrain: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>

              {/* Vignette */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs font-bold text-zinc-200">
                  Focus Vignette Edge Shadow
                </span>
                <input
                  type="checkbox"
                  checked={config.vignette}
                  onChange={(e) => setConfig(prev => ({ ...prev, vignette: e.target.checked }))}
                  className="w-4 h-4 accent-red-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SONIC SFX TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Music className="w-4 h-4 text-indigo-400" />
                    Multi-Track Sonic Impact SFX Timeline
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Sound triggers attached to your project timeline. Audition or reposition cues.
                  </p>
                </div>

                {onOpenSonicLibrary && (
                  <button
                    onClick={onOpenSonicLibrary}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Browse Sonic Impact Library</span>
                  </button>
                )}
              </div>

              {/* Inserted SFX list */}
              {config.timelineSfx.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 space-y-2">
                  <Volume2 className="w-8 h-8 mx-auto text-zinc-600 opacity-60" />
                  <p className="text-xs">No SFX cues inserted in this timeline yet.</p>
                  <p className="text-[11px] text-zinc-600">
                    Browse the Sonic Impact Library below and click &quot;Insert to Timeline&quot; to attach whooshes, pops, or cinematic hits.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {config.timelineSfx.map(item => (
                    <div
                      key={item.id}
                      className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={() => {
                            const waveMap: Record<string, any> = {
                              'whoosh': 'whoosh-air',
                              'pop': 'bubble-pop',
                              'cinematic-hit': 'braam-hit',
                              'riser': 'riser-pitch',
                              'bass-drop': 'sub-drop',
                              'dopamine-cash': 'cash-chime',
                              'glitch-ui': 'glitch-buzz'
                            };
                            playSonicSfx(waveMap[item.category] || 'whoosh-air', item.volume);
                          }}
                          className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-indigo-400 rounded-lg shrink-0 transition"
                          title="Audition SFX"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <div className="truncate">
                          <div className="font-bold text-white truncate">{item.name}</div>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            Cue at {item.timestampSec.toFixed(1)}s • {item.category.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Volume slider */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-zinc-500 font-mono">{item.volume}%</span>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={item.volume}
                            onChange={(e) => {
                              if (onUpdateSfxVolume) {
                                onUpdateSfxVolume(item.id, parseInt(e.target.value));
                              }
                            }}
                            className="w-16 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                          />
                        </div>

                        {onRemoveTimelineSfx && (
                          <button
                            onClick={() => onRemoveTimelineSfx(item.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 rounded transition"
                            title="Remove from timeline"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CAPTION STYLING */}
          {activeTab === 'captions' && (
            <div className="space-y-4 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-emerald-400" />
                On-Screen Sentiment Caption Settings
              </h4>
              <p className="text-xs text-zinc-400">
                Current text for Active Scene:
              </p>

              <div>
                <input
                  type="text"
                  value={activeScene.overlayCaption}
                  onChange={(e) => {
                    const updated = [...config.scenes];
                    updated[activeSceneIndex].overlayCaption = e.target.value;
                    setConfig(prev => ({ ...prev, scenes: updated }));
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono font-bold text-sm rounded-xl p-3"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-300">Accent Color:</span>
                {['#FF0038', '#00E676', '#FFE600', '#00F0FF', '#FFFFFF'].map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      const updated = [...config.scenes];
                      updated[activeSceneIndex].colorHex = c;
                      setConfig(prev => ({ ...prev, scenes: updated }));
                    }}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 rounded-full border-2 transition transform hover:scale-110 ${
                      activeScene.colorHex === c ? 'border-white scale-110 shadow-lg' : 'border-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
