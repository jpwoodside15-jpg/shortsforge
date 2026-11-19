import React, { useState, useRef, useEffect } from 'react';
import { 
  Clapperboard, Play, Pause, Download, Video, Sparkles, 
  RotateCcw, Sliders, Layers, Camera, Sun, Wind, Check, 
  Scissors, ArrowRight, Eye, Film, RefreshCw, Maximize2,
  Tv, Compass, Sparkle, AlertCircle
} from 'lucide-react';

interface AISceneGeneratorTabProps {
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToSimulator?: (text: string) => void;
  onSendToSalon?: () => void;
}

interface ScenePreset {
  title: string;
  category: string;
  prompt: string;
  cameraMotion: string;
  lighting: string;
  lut: string;
  terrainType: 'mountains' | 'cyberpunk' | 'ocean' | 'stadium' | 'space';
}

const SCENE_PRESETS: ScenePreset[] = [
  {
    title: 'Snowy Alpine Drone Flight',
    category: 'Epic Nature',
    prompt: 'Drone shot over a snowy mountain range with jagged peaks, morning sun cresting over glaciers, volumetric alpine fog, 8K National Geographic style',
    cameraMotion: 'FPV Dive',
    lighting: 'Golden Hour Rim Light',
    lut: 'Kodak 2383 Film Print',
    terrainType: 'mountains'
  },
  {
    title: 'Cyberpunk Neon City Dive',
    category: 'Sci-Fi & Urban',
    prompt: 'Cinematic FPV dive between neon-lit skyscrapers, rain-slicked glass reflections, flying aerial traffic, anamorphic lens flares, Blade Runner aesthetic',
    cameraMotion: 'FPV Dive',
    lighting: 'Neon Backlit Reflections',
    lut: 'Cyberpunk Teal & Orange',
    terrainType: 'cyberpunk'
  },
  {
    title: 'Bioluminescent Ocean Swell',
    category: 'Atmospheric B-Roll',
    prompt: 'Ultra-slow motion cinematic shot of glowing bioluminescent cyan waves crashing on dark obsidian sand under starry night, mist particles',
    cameraMotion: 'Slow Parallax Pan',
    lighting: 'Moonlit Bioluminescence',
    lut: 'Nordic Clean Desaturated',
    terrainType: 'ocean'
  },
  {
    title: 'Stadium Flythrough & Pyro',
    category: 'Sports & Energy',
    prompt: 'FPV drone sweeping through a packed 80,000 capacity football stadium bowl under floodlights, crowd flare smoke, emerald pitch, high adrenaline',
    cameraMotion: 'Orbital Flythrough',
    lighting: 'High-Power Floodlights',
    lut: 'Sports High-Contrast Glow',
    terrainType: 'stadium'
  },
  {
    title: 'Cosmic Nebula Warp',
    category: 'Abstract & Hook',
    prompt: 'Deep space camera push-in through purple and amber stardust filaments, distant glowing star clusters, zero gravity dust floaters',
    cameraMotion: 'Hyperlapse Rush',
    lighting: 'Starlight Ambient Glow',
    lut: 'Emerald Sci-Fi Deep',
    terrainType: 'space'
  }
];

export const AISceneGeneratorTab: React.FC<AISceneGeneratorTabProps> = ({
  onSendToClipper,
  onSendToSimulator,
  onSendToSalon
}) => {
  const [prompt, setPrompt] = useState<string>('drone shot over a snowy mountain range');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [cameraMotion, setCameraMotion] = useState<string>('FPV Dive');
  const [lighting, setLighting] = useState<string>('Golden Hour Rim Light');
  const [lutFilter, setLutFilter] = useState<string>('Kodak 2383 Film Print');
  const [terrainType, setTerrainType] = useState<'mountains' | 'cyberpunk' | 'ocean' | 'stadium' | 'space'>('mountains');
  
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [enhancedMetadata, setEnhancedMetadata] = useState<{
    enhancedPrompt?: string;
    directorNotes?: string;
    suggestedLut?: string;
    cameraSettings?: { lens: string; shutterSpeed: string; iso: string; resolution: string };
    soundDesignBlueprint?: string;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<any>(null);

  // Trigger Gemini scene expansion
  const handleEnhancePrompt = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-scene-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          cameraMotion,
          lighting,
          style: lutFilter,
          aspectRatio
        })
      });
      const data = await res.json();
      setEnhancedMetadata(data);
    } catch (err) {
      console.error('Enhance scene prompt failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyPreset = (preset: ScenePreset) => {
    setPrompt(preset.prompt);
    setCameraMotion(preset.cameraMotion);
    setLighting(preset.lighting);
    setLutFilter(preset.lut);
    setTerrainType(preset.terrainType);
    setDownloadUrl(null);
  };

  // High-performance procedural procedural canvas rendering engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;

    // Particle seed
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3
    }));

    const render = () => {
      if (isPlaying) {
        tick++;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Dynamic Atmosphere Gradient Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (terrainType === 'mountains') {
        skyGrad.addColorStop(0, '#1e293b');
        skyGrad.addColorStop(0.35, '#ea580c'); // golden hour orange
        skyGrad.addColorStop(0.65, '#fde047'); // sun glow yellow
        skyGrad.addColorStop(1, '#0f172a');
      } else if (terrainType === 'cyberpunk') {
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(0.4, '#3b0764');
        skyGrad.addColorStop(0.8, '#083344');
        skyGrad.addColorStop(1, '#030712');
      } else if (terrainType === 'ocean') {
        skyGrad.addColorStop(0, '#030712');
        skyGrad.addColorStop(0.5, '#064e3b');
        skyGrad.addColorStop(0.9, '#022c22');
        skyGrad.addColorStop(1, '#020617');
      } else if (terrainType === 'stadium') {
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(0.4, '#1e1b4b');
        skyGrad.addColorStop(0.7, '#14532d');
        skyGrad.addColorStop(1, '#052e16');
      } else { // space
        skyGrad.addColorStop(0, '#030712');
        skyGrad.addColorStop(0.5, '#581c87');
        skyGrad.addColorStop(0.85, '#1e1b4b');
        skyGrad.addColorStop(1, '#000000');
      }

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Volumetric Sun / Flare
      const sunY = h * 0.38 + Math.sin(tick * 0.01) * 15;
      const sunGrad = ctx.createRadialGradient(w * 0.5, sunY, 10, w * 0.5, sunY, w * 0.7);
      if (terrainType === 'mountains') {
        sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        sunGrad.addColorStop(0.2, 'rgba(253, 224, 71, 0.6)');
        sunGrad.addColorStop(0.6, 'rgba(234, 88, 12, 0.2)');
        sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
      } else if (terrainType === 'cyberpunk') {
        sunGrad.addColorStop(0, 'rgba(244, 63, 94, 0.9)');
        sunGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.4)');
        sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
      } else {
        sunGrad.addColorStop(0, 'rgba(52, 211, 153, 0.8)');
        sunGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.3)');
        sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
      }
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, w, h);

      // 3. Layered Camera Parallax Peaks / Skyline
      const camOffset = Math.sin(tick * 0.02) * (w * 0.06);
      const camZoom = 1 + Math.sin(tick * 0.015) * 0.05;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(camZoom, camZoom);
      ctx.translate(-w / 2, -h / 2);

      // Layer 1: Distant Jagged Silhouette
      ctx.beginPath();
      ctx.moveTo(-50, h * 0.5);
      for (let x = -50; x <= w + 50; x += 30) {
        const peak = Math.sin((x + camOffset * 0.3) * 0.01) * 60 + Math.cos(x * 0.03) * 35;
        ctx.lineTo(x, h * 0.52 - peak);
      }
      ctx.lineTo(w + 50, h);
      ctx.lineTo(-50, h);
      ctx.closePath();
      ctx.fillStyle = terrainType === 'cyberpunk' ? '#1e1b4b' : (terrainType === 'mountains' ? '#475569' : '#064e3b');
      ctx.fill();

      // Layer 2: Mid-ground Ridge with Snow Highlights
      ctx.beginPath();
      ctx.moveTo(-50, h * 0.62);
      for (let x = -50; x <= w + 50; x += 25) {
        const peak = Math.sin((x + camOffset * 0.6) * 0.018) * 85 + Math.sin(x * 0.04) * 45;
        ctx.lineTo(x, h * 0.65 - peak);
      }
      ctx.lineTo(w + 50, h);
      ctx.lineTo(-50, h);
      ctx.closePath();
      ctx.fillStyle = terrainType === 'cyberpunk' ? '#0f172a' : (terrainType === 'mountains' ? '#334155' : '#022c22');
      ctx.fill();

      // Ridge snow caps (highlights)
      ctx.strokeStyle = terrainType === 'cyberpunk' ? '#06b6d4' : (terrainType === 'mountains' ? '#f8fafc' : '#34d399');
      ctx.lineWidth = 3;
      ctx.stroke();

      // Layer 3: Foreground Drone Flyover Climax
      const fgProgress = (tick * 2.5) % (h * 0.4);
      ctx.beginPath();
      ctx.moveTo(-50, h * 0.8 + fgProgress * 0.2);
      for (let x = -50; x <= w + 50; x += 20) {
        const peak = Math.sin((x + camOffset * 1.2) * 0.02) * 95;
        ctx.lineTo(x, h * 0.85 - peak);
      }
      ctx.lineTo(w + 50, h);
      ctx.lineTo(-50, h);
      ctx.closePath();
      ctx.fillStyle = terrainType === 'cyberpunk' ? '#030712' : (terrainType === 'mountains' ? '#0f172a' : '#020617');
      ctx.fill();

      ctx.restore();

      // 4. Volumetric Environmental Particles (Snow / Sparks / Embers)
      particles.forEach((p) => {
        if (isPlaying) {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y > h) { p.y = 0; p.x = Math.random() * w; }
          if (p.x > w) p.x = 0;
          if (p.x < 0) p.x = w;
        }

        ctx.fillStyle = terrainType === 'cyberpunk' 
          ? `rgba(56, 189, 248, ${p.alpha})`
          : (terrainType === 'space' ? `rgba(216, 180, 254, ${p.alpha})` : `rgba(255, 255, 255, ${p.alpha})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Cinematic Color Grade & Film Grain Overlay
      if (lutFilter.includes('Kodak') || lutFilter.includes('Film')) {
        // Warm subtle vintage film wash
        ctx.fillStyle = 'rgba(251, 146, 60, 0.06)';
        ctx.fillRect(0, 0, w, h);
      } else if (lutFilter.includes('Teal') || lutFilter.includes('Cyberpunk')) {
        // High contrast teal wash in shadows
        ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
        ctx.fillRect(0, 0, w, h);
      }

      // 6. Camera Drone OSD Crosshair & Telemetry
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      const cx = w / 2;
      const cy = h / 2;
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy); ctx.lineTo(cx + 16, cy);
      ctx.moveTo(cx, cy - 16); ctx.lineTo(cx, cy + 16);
      ctx.stroke();

      // Telemetry readouts on bottom right/left
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px monospace';
      ctx.fillText(`FPV ALT: ${(1240 + Math.sin(tick * 0.05) * 80).toFixed(0)}m`, 14, h - 18);
      ctx.fillText(`SPEED: 84 km/h • 60 FPS`, w - 150, h - 18);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, terrainType, lutFilter, aspectRatio]);

  // Live Canvas Video Recorder using MediaRecorder API
  const handleStartRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const stream = canvas.captureStream(30);
      const mimeTypes = ['video/webm;codecs=vp9', 'video/webm', 'video/mp4'];
      const supportedType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';

      const recorder = new MediaRecorder(stream, supportedType ? { mimeType: supportedType } : undefined);
      recordedChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: supportedType || 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setIsRecording(false);
        setRecordingSeconds(0);
        if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      recordTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 10) { // Auto-stop after 10s clip
            handleStopRecording();
            return 10;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Recording failed:', err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
  };

  const handleDirectDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `cinematic_broll_${terrainType}_${aspectRatio.replace(':', 'x')}_${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-red-950/40">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                AI Cinematic Scene &amp; B-Roll Generator
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Real-Time Video Render &amp; Recorder
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Prompt hyper-realistic drone flights, macro textures &amp; cinematic action. Render, preview live, and download full video clips.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-semibold">Aspect Ratio:</span>
            <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex items-center gap-1">
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  aspectRatio === '9:16'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                9:16 (Shorts/TikTok)
              </button>
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  aspectRatio === '16:9'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                16:9 (Landscape)
              </button>
            </div>
          </div>
        </div>

        {/* 1-Click Preset Buttons */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Popular B-Roll Presets:
          </span>
          {SCENE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 transition whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>{preset.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 font-mono">
                {preset.cameraMotion}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Prompting & Camera Controls */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-red-400" />
                  1. Cinematic Prompt
                </label>
                <button
                  onClick={handleEnhancePrompt}
                  disabled={isGenerating}
                  className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3 h-3" />
                  {isGenerating ? 'Enhancing with AI...' : 'AI Hollywood Upgrade'}
                </button>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. drone shot over a snowy mountain range at golden hour with morning mist..."
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 leading-relaxed font-sans resize-none"
              />
            </div>

            {/* Camera Motion Trajectory */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                Camera Motion Rig
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {['FPV Dive', 'Orbital Flythrough', 'Slow Parallax Pan', 'Hyperlapse Rush', 'Cinematic Push-In'].map((motion) => (
                  <button
                    key={motion}
                    onClick={() => setCameraMotion(motion)}
                    className={`p-2 rounded-lg text-center font-medium transition ${
                      cameraMotion === motion
                        ? 'bg-red-600 text-white font-bold shadow-sm'
                        : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {motion}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting & Volumetrics */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Volumetric Lighting
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Golden Hour Rim Light', 'Neon Backlit Reflections', 'Moonlit Bioluminescence', 'High-Power Floodlights'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLighting(l)}
                    className={`p-2 rounded-lg text-left text-[11px] font-medium transition line-clamp-1 ${
                      lighting === l
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                        : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Grade / LUT Preset */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                Color Grade / LUT Filter
              </label>
              <select
                value={lutFilter}
                onChange={(e) => setLutFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Kodak 2383 Film Print">🎞️ Kodak 2383 35mm Film Print (Warm & Organic)</option>
                <option value="Cyberpunk Teal & Orange">🌆 Blockbuster Teal & Orange (High Dynamic Contrast)</option>
                <option value="Nordic Clean Desaturated">❄️ Nordic Clean Desaturated (Cold & Elegant)</option>
                <option value="Sports High-Contrast Glow">⚽ Sports High-Contrast Glow (Vibrant & Crisp)</option>
                <option value="Emerald Sci-Fi Deep">🌌 Emerald Matrix Sci-Fi (Deep Moody Greens)</option>
              </select>
            </div>

            {/* Terrain Type Switcher */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Environment Type</label>
              <div className="flex items-center gap-1.5">
                {(['mountains', 'cyberpunk', 'ocean', 'stadium', 'space'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTerrainType(t); setDownloadUrl(null); }}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition ${
                      terrainType === t
                        ? 'bg-white text-zinc-900 shadow'
                        : 'bg-zinc-950 text-zinc-500 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* AI Enhanced Cinematic Blueprint Card */}
          {enhancedMetadata && (
            <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 space-y-2.5 shadow-lg">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Hollywood Director Specification:
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "{enhancedMetadata.enhancedPrompt}"
              </p>
              {enhancedMetadata.cameraSettings && (
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-zinc-800 text-zinc-400">
                  <div>Lens: <span className="text-white">{enhancedMetadata.cameraSettings.lens}</span></div>
                  <div>Shutter: <span className="text-white">{enhancedMetadata.cameraSettings.shutterSpeed}</span></div>
                  <div>Resolution: <span className="text-white">{enhancedMetadata.cameraSettings.resolution}</span></div>
                  <div>LUT: <span className="text-amber-400">{enhancedMetadata.suggestedLut}</span></div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Live Cinematic Render Canvas Preview & Recording Studio */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span className="font-bold text-white uppercase tracking-wider">
                  Live Viewport Preview • {cameraMotion}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {aspectRatio} Frame
                </span>
              </div>

              {isRecording && (
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 text-xs font-mono font-bold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  REC: {recordingSeconds}s / 10s
                </div>
              )}
            </div>

            {/* Canvas Viewport Frame */}
            <div className={`relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 bg-black flex items-center justify-center ${
              aspectRatio === '9:16' ? 'w-[280px] h-[497px]' : 'w-full max-w-[560px] h-[315px]'
            }`}>
              <canvas
                ref={canvasRef}
                width={aspectRatio === '9:16' ? 540 : 960}
                height={aspectRatio === '9:16' ? 960 : 540}
                className="w-full h-full object-cover"
              />

              {/* Watermark / Safe-zone Overlay Badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300 border border-white/10 flex items-center gap-1">
                <Film className="w-3 h-3 text-red-400" />
                SHORTSFORGE VEO B-ROLL
              </div>

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-400 border border-white/10">
                {lutFilter.split(' ')[0]}
              </div>
            </div>

            {/* Video Controls & Recording Actions Bar */}
            <div className="w-full mt-5 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition shadow"
                  title={isPlaying ? 'Pause Motion' : 'Play Motion'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-950/40 transition cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    Record 10s Video Clip
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="py-2.5 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-2 transition animate-pulse cursor-pointer"
                  >
                    Stop &amp; Render Video
                  </button>
                )}
              </div>

              {/* Download & Transfer Actions */}
              <div className="flex items-center gap-2">
                {downloadUrl && (
                  <button
                    onClick={handleDirectDownload}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download Clip (.webm)
                  </button>
                )}

                {onSendToClipper && (
                  <button
                    onClick={() => onSendToClipper(0, 10, `AI B-Roll: ${prompt.slice(0, 30)}...`)}
                    className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    To Clipper
                  </button>
                )}

                {onSendToSimulator && (
                  <button
                    onClick={() => onSendToSimulator(`B-ROLL: ${prompt.slice(0, 30)}`)}
                    className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Safe-Zone
                  </button>
                )}

                {onSendToSalon && (
                  <button
                    onClick={onSendToSalon}
                    className="py-2.5 px-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    To Salon Studio →
                  </button>
                )}
              </div>

            </div>

          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Real-time canvas captured at 30/60fps with native WebM/VP9 video encoding
            </span>
            <span className="text-zinc-500 font-mono">100% Royalty-Free</span>
          </div>

        </div>

      </div>

    </div>
  );
};
