import React, { useState, useEffect, useRef } from 'react';
import { 
  Sliders, Sparkles, Film, Music, Clock, Camera, Sun, 
  Palette, Play, Pause, Save, Plus, Trash2, Download, 
  Upload, Check, Copy, ExternalLink, Zap, Flame, Compass, 
  Volume2, VolumeX, RefreshCw, Eye, CheckCircle2, AlertCircle,
  FolderPlus, ArrowRight
} from 'lucide-react';
import { playSoundEffect } from '../utils/soundEffects';

export interface ShotDurationPoint {
  shotIndex: number;
  durationSec: number;
  stageName: string;
  pacingIntensity: 'rapid' | 'moderate' | 'cinematic';
}

export interface DirectorialStyleProfile {
  id: string;
  name: string;
  category: 'nature' | 'noir' | 'scifi' | 'documentary' | 'luxury' | 'historical' | 'contrarian' | 'custom';
  description: string;
  isBuiltIn: boolean;
  
  // Prompt Configuration
  promptPrefix: string;
  promptSuffix: string;
  negativePrompt: string;
  cameraLens: string;
  lightingStyle: string;
  lutColorGrade: string;
  cameraMotionPreset: string;
  terrainRecommendation: 'mountains' | 'cyberpunk' | 'ocean' | 'stadium' | 'space';
  aspectRatio: '9:16' | '16:9';

  // Shot Duration Curve
  curveType: 'exponential-acceleration' | 'wave-pacing' | 'steady-rhythm' | 'contrarian-punch';
  shotDurationCurve: ShotDurationPoint[];
  avgCutDurationSec: number;
  totalDurationSec: number;
  visualRhythmWpm: number;

  // Music Pacing & Audio Design
  targetBpm: number;
  musicGenre: string;
  tensionProfile: 'rising_climax' | 'sustained_pulse' | 'drop_and_recover' | 'ambient_suspense';
  stingerTimestampsSec: number[];
  audioDuckingDb: number;
  sfxAtmosphere: string;
}

export const BUILT_IN_STYLE_PROFILES: DirectorialStyleProfile[] = [
  {
    id: 'bbc-nature',
    name: 'BBC Nature Documentary',
    category: 'nature',
    description: 'Breathtaking high-definition wildlife & landscape cinematography with natural breathing room and noble orchestral pacing.',
    isBuiltIn: true,
    promptPrefix: 'Ultra-high definition 8K macro wildlife capture, BBC Planet Earth cinematography, natural anamorphic lens, shallow depth of field',
    promptSuffix: 'volumetric golden hour rim light, airborne natural particulate mist, photorealistic biological fur & foliage textures, raw realism, Masterpiece',
    negativePrompt: 'CGI, oversaturated, cartoon, plastic, distorted anatomy, text, watermark, low shutter speed, strobe',
    cameraLens: '100mm f/2.8 Macro Lens',
    lightingStyle: 'Golden Hour Rim Light',
    lutColorGrade: 'Kodak 2383 Film Print',
    cameraMotionPreset: 'Slow Parallax Pan',
    terrainRecommendation: 'mountains',
    aspectRatio: '9:16',
    curveType: 'steady-rhythm',
    shotDurationCurve: [
      { shotIndex: 1, durationSec: 3.2, stageName: 'Atmospheric Hook', pacingIntensity: 'cinematic' },
      { shotIndex: 2, durationSec: 2.8, stageName: 'Subject Reveal', pacingIntensity: 'cinematic' },
      { shotIndex: 3, durationSec: 3.5, stageName: 'Macro Behavior', pacingIntensity: 'moderate' },
      { shotIndex: 4, durationSec: 2.4, stageName: 'Tension Shift', pacingIntensity: 'rapid' },
      { shotIndex: 5, durationSec: 3.8, stageName: 'Climax Flight', pacingIntensity: 'cinematic' },
      { shotIndex: 6, durationSec: 3.1, stageName: 'Wide Resolution', pacingIntensity: 'cinematic' }
    ],
    avgCutDurationSec: 3.1,
    totalDurationSec: 18.8,
    visualRhythmWpm: 145,
    targetBpm: 78,
    musicGenre: 'Orchestral Strings & Woodwinds',
    tensionProfile: 'ambient_suspense',
    stingerTimestampsSec: [0.0, 3.2, 11.9],
    audioDuckingDb: -18,
    sfxAtmosphere: 'Organic mountain wind, bird calls & distant thunder'
  },
  {
    id: 'neo-noir',
    name: 'Neo-Noir Crime Mystery',
    category: 'noir',
    description: 'High-contrast chiaroscuro shadows, rainy neon reflections, moody jazz trumpet, and sudden stinger tension cuts.',
    isBuiltIn: true,
    promptPrefix: 'High-contrast chiaroscuro cinematic 35mm film still, neo-noir mystery, hard shadow Venetian blinds, cigarette haze',
    promptSuffix: 'wet asphalt sodium vapor reflections, deep obsidian blacks, grain structure 800 ISO, Roger Deakins lighting, photoreal',
    negativePrompt: 'flat lighting, bright pastel colors, anime, sunny, plastic skin, 3D render look, washed out shadows',
    cameraLens: '35mm Anamorphic T1.4',
    lightingStyle: 'High-Contrast Chiaroscuro & Neon Backlit',
    lutColorGrade: 'Nordic Clean Desaturated',
    cameraMotionPreset: 'Dolly Zoom (Vertigo Effect)',
    terrainRecommendation: 'cyberpunk',
    aspectRatio: '9:16',
    curveType: 'wave-pacing',
    shotDurationCurve: [
      { shotIndex: 1, durationSec: 2.0, stageName: 'Crime Scene Hook', pacingIntensity: 'rapid' },
      { shotIndex: 2, durationSec: 1.8, stageName: 'Shadowed Clue', pacingIntensity: 'rapid' },
      { shotIndex: 3, durationSec: 2.8, stageName: 'Internal Monologue', pacingIntensity: 'cinematic' },
      { shotIndex: 4, durationSec: 1.4, stageName: 'Sudden Gunshot Stinger', pacingIntensity: 'rapid' },
      { shotIndex: 5, durationSec: 3.2, stageName: 'Rainy Alley Escape', pacingIntensity: 'moderate' },
      { shotIndex: 6, durationSec: 2.2, stageName: 'Dark Cigarette Close-Up', pacingIntensity: 'moderate' }
    ],
    avgCutDurationSec: 2.2,
    totalDurationSec: 13.4,
    visualRhythmWpm: 155,
    targetBpm: 92,
    musicGenre: 'Muted Jazz Trumpet & Dark Sub-Bass',
    tensionProfile: 'rising_climax',
    stingerTimestampsSec: [0.0, 2.0, 6.6],
    audioDuckingDb: -20,
    sfxAtmosphere: 'Heavy rain on fire escapes, distant sirens & vinyl crackle'
  },
  {
    id: 'cyberpunk-high-octane',
    name: 'Cyberpunk High-Octane',
    category: 'scifi',
    description: 'Adrenaline-fueled FPV camera dives through neon megacities, 142 BPM dark synthwave, and rapid 1.2-second retention cuts.',
    isBuiltIn: true,
    promptPrefix: 'High-speed kinetic FPV dive between multi-level neon mega-structures, rain-slicked cyber metropolis, aerial traffic',
    promptSuffix: 'cyan and magenta anamorphic flares, volumetric smog, octane render 8K photorealism, Blade Runner 2049 aesthetic, hyper-detailed',
    negativePrompt: 'daylight, clean corporate, low poly, oversaturated green, blurry motion, watercolor, cartoon',
    cameraLens: '18mm Ultra-Wide Anamorphic',
    lightingStyle: 'Neon Backlit Reflections',
    lutColorGrade: 'Cyberpunk Teal & Orange',
    cameraMotionPreset: 'FPV Dive',
    terrainRecommendation: 'cyberpunk',
    aspectRatio: '9:16',
    curveType: 'exponential-acceleration',
    shotDurationCurve: [
      { shotIndex: 1, durationSec: 1.2, stageName: 'Shockwave Hook', pacingIntensity: 'rapid' },
      { shotIndex: 2, durationSec: 1.4, stageName: 'Speed Skim', pacingIntensity: 'rapid' },
      { shotIndex: 3, durationSec: 1.8, stageName: 'Hologram Neon Burst', pacingIntensity: 'rapid' },
      { shotIndex: 4, durationSec: 1.1, stageName: 'Vehicle Drift', pacingIntensity: 'rapid' },
      { shotIndex: 5, durationSec: 1.3, stageName: 'Micro-Chip Zoom', pacingIntensity: 'rapid' },
      { shotIndex: 6, durationSec: 2.0, stageName: 'Hyper-Speed Exit', pacingIntensity: 'moderate' }
    ],
    avgCutDurationSec: 1.4,
    totalDurationSec: 8.8,
    visualRhythmWpm: 190,
    targetBpm: 142,
    musicGenre: 'Heavy Darkwave Phonk & 808 Bass',
    tensionProfile: 'sustained_pulse',
    stingerTimestampsSec: [0.0, 1.2, 2.6, 5.5],
    audioDuckingDb: -16,
    sfxAtmosphere: 'Turbine whooshes, electrical arc snaps & heavy subdrops'
  },
  {
    id: 'vox-data-journalism',
    name: 'Vox High-Info Documentary',
    category: 'documentary',
    description: 'Clean architectural visualization, infographic overlays, minimalist acoustic marimba, and consistent informative cadence.',
    isBuiltIn: true,
    promptPrefix: 'Isometric minimalist architectural scale model, clean graphic geometric layout, studio lighting, infographic framing',
    promptSuffix: 'soft neutral studio shadow, high-end motion design, Bloomberg documentary aesthetic, 4K crisp, pristine detail',
    negativePrompt: 'dark gritty, grunge, chaotic, neon blur, messy textures, cinematic blur, film grain',
    cameraLens: '50mm Tilt-Shift Architectural',
    lightingStyle: 'Diffused Studio Softbox',
    lutColorGrade: 'Nordic Clean Desaturated',
    cameraMotionPreset: 'Orbital Flythrough',
    terrainRecommendation: 'stadium',
    aspectRatio: '9:16',
    curveType: 'steady-rhythm',
    shotDurationCurve: [
      { shotIndex: 1, durationSec: 2.1, stageName: 'Core Stat Hook', pacingIntensity: 'moderate' },
      { shotIndex: 2, durationSec: 2.4, stageName: 'Chart Breakdown', pacingIntensity: 'moderate' },
      { shotIndex: 3, durationSec: 2.0, stageName: 'Historical Comparison', pacingIntensity: 'moderate' },
      { shotIndex: 4, durationSec: 2.5, stageName: 'Statutory Proof', pacingIntensity: 'moderate' },
      { shotIndex: 5, durationSec: 2.2, stageName: 'Future Projection', pacingIntensity: 'moderate' },
      { shotIndex: 6, durationSec: 2.8, stageName: 'Key Takeaway CTA', pacingIntensity: 'moderate' }
    ],
    avgCutDurationSec: 2.3,
    totalDurationSec: 14.0,
    visualRhythmWpm: 172,
    targetBpm: 112,
    musicGenre: 'Minimalist Marimba & Felt Piano',
    tensionProfile: 'sustained_pulse',
    stingerTimestampsSec: [0.0, 2.1, 8.5],
    audioDuckingDb: -22,
    sfxAtmosphere: 'Subtle paper rustles, UI tick sounds & light clock chimes'
  },
  {
    id: 'wes-anderson-symmetry',
    name: 'Wes Anderson Symmetry',
    category: 'luxury',
    description: 'Perfect 1-point perspective symmetry, pastel vintage color palettes, 120 BPM harpsichord rhythm, and deadpan charm.',
    isBuiltIn: true,
    promptPrefix: 'Strict symmetrical one-point perspective tableau, pastel color palette, vintage storybook framing, deadpan composition',
    promptSuffix: 'warm pastel yellow and turquoise tones, 16mm Bolex film texture, immaculate prop arrangement, Roald Dahl storybook style, 4K',
    negativePrompt: 'canted angle, dark shadows, gritty realism, shaky handheld, modern digital sharpness, oversaturated neon',
    cameraLens: '40mm Prime Flat Field',
    lightingStyle: 'Golden Hour Rim Light',
    lutColorGrade: 'Kodak 2383 Film Print',
    cameraMotionPreset: 'Slow Parallax Pan',
    terrainRecommendation: 'mountains',
    aspectRatio: '9:16',
    curveType: 'steady-rhythm',
    shotDurationCurve: [
      { shotIndex: 1, durationSec: 2.5, stageName: 'Centered Character Hook', pacingIntensity: 'moderate' },
      { shotIndex: 2, durationSec: 2.5, stageName: 'Artifact Display Table', pacingIntensity: 'moderate' },
      { shotIndex: 3, durationSec: 2.5, stageName: '90-Degree Pan Left', pacingIntensity: 'moderate' },
      { shotIndex: 4, durationSec: 2.5, stageName: 'Centered Letter Reading', pacingIntensity: 'moderate' },
      { shotIndex: 5, durationSec: 2.5, stageName: 'Immaculate Room Table', pacingIntensity: 'moderate' },
      { shotIndex: 6, durationSec: 3.0, stageName: 'Ensemble Freeze Frame', pacingIntensity: 'cinematic' }
    ],
    avgCutDurationSec: 2.6,
    totalDurationSec: 15.5,
    visualRhythmWpm: 150,
    targetBpm: 120,
    musicGenre: 'Pizzicato Strings, Harpsichord & Accordion',
    tensionProfile: 'sustained_pulse',
    stingerTimestampsSec: [0.0, 5.0, 10.0],
    audioDuckingDb: -16,
    sfxAtmosphere: 'Typewriter clacks, bicycle bell dings & crisp footsteps'
  },
  {
    id: 'hormozi-punch',
    name: 'Alex Hormozi Authority Punch',
    category: 'contrarian',
    description: 'Bold charcoal studio backdrops, aggressive 1.15x camera punches, punchy 128 BPM bassline, and contrarian psychological triggers.',
    isBuiltIn: true,
    promptPrefix: 'High-contrast dynamic macro studio portrait, bold lighting, intense gaze, punchy depth of field, high status entrepreneurial backdrop',
    promptSuffix: 'sharp rim light accentuating jawline, dark charcoal studio, 8K ultra-detailed skin textures, commercial grade, crisp lighting',
    negativePrompt: 'soft focus, smiling portrait, generic stock photo, corporate cheesy, washed out colors, flat blur',
    cameraLens: '85mm f/1.4 Portrait Prime',
    lightingStyle: 'High-Power Floodlights',
    lutColorGrade: 'Sports High-Contrast Glow',
    cameraMotionPreset: 'FPV Dive',
    terrainRecommendation: 'stadium',
    aspectRatio: '9:16',
    curveType: 'contrarian-punch',
    shotDurationCurve: [
      { shotIndex: 1, durationSec: 1.5, stageName: 'Belief Violation Hook', pacingIntensity: 'rapid' },
      { shotIndex: 2, durationSec: 1.8, stageName: 'Common Mistake Callout', pacingIntensity: 'rapid' },
      { shotIndex: 3, durationSec: 1.4, stageName: 'Pain Amplifier', pacingIntensity: 'rapid' },
      { shotIndex: 4, durationSec: 2.2, stageName: 'Top 1% Counter-Intuition', pacingIntensity: 'moderate' },
      { shotIndex: 5, durationSec: 1.6, stageName: 'Actionable Leverage Formula', pacingIntensity: 'rapid' },
      { shotIndex: 6, durationSec: 2.0, stageName: 'Hard CTA to Comment', pacingIntensity: 'moderate' }
    ],
    avgCutDurationSec: 1.7,
    totalDurationSec: 10.5,
    visualRhythmWpm: 185,
    targetBpm: 128,
    musicGenre: 'Punchy Kick & Bassline with Brass Stabs',
    tensionProfile: 'drop_and_recover',
    stingerTimestampsSec: [0.0, 1.5, 6.9],
    audioDuckingDb: -18,
    sfxAtmosphere: 'Deep braam impact, cash register ding & kinetic whoosh'
  }
];

interface StyleProfileManagerProps {
  currentProfileId?: string;
  onApplyToSceneGenerator: (profile: DirectorialStyleProfile) => void;
  onClose?: () => void;
}

export const StyleProfileManager: React.FC<StyleProfileManagerProps> = ({
  currentProfileId = 'bbc-nature',
  onApplyToSceneGenerator,
  onClose
}) => {
  // Profiles State
  const [profiles, setProfiles] = useState<DirectorialStyleProfile[]>(() => {
    try {
      const saved = localStorage.getItem('shortsforge_style_profiles_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load custom profiles:', e);
    }
    return BUILT_IN_STYLE_PROFILES;
  });

  const [selectedProfileId, setSelectedProfileId] = useState<string>(currentProfileId);
  const [activeTab, setActiveTab] = useState<'profiles' | 'editor' | 'curve' | 'audio'>('profiles');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Metronome / Rhythm Generator State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioIntervalRef = useRef<any>(null);

  // Profile being edited
  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];
  const [editingProfile, setEditingProfile] = useState<DirectorialStyleProfile>(selectedProfile);

  // Sync editing profile on selection change
  useEffect(() => {
    if (selectedProfile) {
      setEditingProfile(selectedProfile);
    }
  }, [selectedProfileId]);

  // Persist custom profiles to localStorage
  const saveProfilesToStorage = (updatedList: DirectorialStyleProfile[]) => {
    try {
      localStorage.setItem('shortsforge_style_profiles_v1', JSON.stringify(updatedList));
      setProfiles(updatedList);
    } catch (e) {
      console.error('Failed to save profiles to localStorage:', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1-Click Apply to Scene Generator
  const handleApply = (profile: DirectorialStyleProfile) => {
    playSoundEffect('chime', 0.6);
    onApplyToSceneGenerator(profile);
    showToast(`✓ Applied "${profile.name}" style profile to AI Scene Generator!`);
  };

  // Start new profile from scratch or template
  const handleCreateNew = () => {
    const newProfile: DirectorialStyleProfile = {
      id: `custom-profile-${Date.now()}`,
      name: 'My Custom Directorial Preset',
      category: 'custom',
      description: 'Customized prompt templates, shot duration curve, and audio pacing.',
      isBuiltIn: false,
      promptPrefix: 'Cinematic 8K camera shot, commercial grade lighting, depth of field',
      promptSuffix: 'sharp focus, photorealistic 8K textures, award winning cinematography',
      negativePrompt: 'blurry, low quality, CGI cartoon, watermark, noisy, bad anatomy',
      cameraLens: '50mm Prime T1.8',
      lightingStyle: 'Golden Hour Rim Light',
      lutColorGrade: 'Kodak 2383 Film Print',
      cameraMotionPreset: 'Slow Parallax Pan',
      terrainRecommendation: 'mountains',
      aspectRatio: '9:16',
      curveType: 'steady-rhythm',
      shotDurationCurve: [
        { shotIndex: 1, durationSec: 2.0, stageName: 'Hook Cut', pacingIntensity: 'rapid' },
        { shotIndex: 2, durationSec: 2.5, stageName: 'Context Detail', pacingIntensity: 'moderate' },
        { shotIndex: 3, durationSec: 2.2, stageName: 'Action Point', pacingIntensity: 'moderate' },
        { shotIndex: 4, durationSec: 3.0, stageName: 'Resolution', pacingIntensity: 'cinematic' }
      ],
      avgCutDurationSec: 2.4,
      totalDurationSec: 9.7,
      visualRhythmWpm: 165,
      targetBpm: 120,
      musicGenre: 'Punchy Electronic & Synth Bass',
      tensionProfile: 'rising_climax',
      stingerTimestampsSec: [0.0, 2.0],
      audioDuckingDb: -18,
      sfxAtmosphere: 'Subtle riser, snap zoom impact & atmospheric wind'
    };

    const updated = [newProfile, ...profiles];
    saveProfilesToStorage(updated);
    setSelectedProfileId(newProfile.id);
    setEditingProfile(newProfile);
    setIsCreatingNew(true);
    setActiveTab('editor');
    playSoundEffect('pulse', 0.3);
    showToast('Created new directorial preset. Edit the values below.');
  };

  // Save changes to current editing profile
  const handleSaveProfileChanges = () => {
    const updated = profiles.map(p => p.id === editingProfile.id ? editingProfile : p);
    saveProfilesToStorage(updated);
    playSoundEffect('chime', 0.5);
    showToast(`Saved changes to "${editingProfile.name}"!`);
  };

  // Delete profile (only if not built-in)
  const handleDeleteProfile = (id: string) => {
    if (profiles.find(p => p.id === id)?.isBuiltIn) {
      showToast('Cannot delete default system presets.');
      return;
    }
    const updated = profiles.filter(p => p.id !== id);
    saveProfilesToStorage(updated);
    if (selectedProfileId === id) {
      setSelectedProfileId(updated[0]?.id || BUILT_IN_STYLE_PROFILES[0].id);
    }
    playSoundEffect('subdrop', 0.3);
    showToast('Profile deleted.');
  };

  // Reset to Built-In Defaults
  const handleResetDefaults = () => {
    localStorage.removeItem('shortsforge_style_profiles_v1');
    setProfiles(BUILT_IN_STYLE_PROFILES);
    setSelectedProfileId(BUILT_IN_STYLE_PROFILES[0].id);
    playSoundEffect('chime', 0.4);
    showToast('Reset all style profiles to default system presets.');
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `shortsforge_directorial_profiles_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported style profiles to JSON!');
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          saveProfilesToStorage(parsed);
          setSelectedProfileId(parsed[0].id);
          playSoundEffect('chime', 0.5);
          showToast(`Successfully imported ${parsed.length} directorial profiles!`);
        }
      } catch (err) {
        console.error('Import error:', err);
        showToast('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  // Web Audio Metronome Rhythm Generator
  const togglePlayAudioRhythm = () => {
    if (isPlayingAudio) {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (e) {}
        audioContextRef.current = null;
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const bpm = editingProfile.targetBpm || 120;
      const intervalMs = (60 / bpm) * 1000;
      let beatCount = 0;

      const playBeat = () => {
        if (!audioContextRef.current) return;
        const now = audioContextRef.current.currentTime;
        const isDownbeat = beatCount % 4 === 0;

        // Kick / Beat Oscillator
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();

        osc.type = isDownbeat ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(isDownbeat ? 160 : 280, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + (isDownbeat ? 0.22 : 0.08));

        gain.gain.setValueAtTime(isDownbeat ? 0.35 : 0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (isDownbeat ? 0.22 : 0.08));

        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);

        osc.start(now);
        osc.stop(now + 0.25);

        // Ambient Pad harmonic
        if (isDownbeat) {
          const padOsc = audioContextRef.current.createOscillator();
          const padGain = audioContextRef.current.createGain();
          padOsc.type = 'sawtooth';
          padOsc.frequency.setValueAtTime(editingProfile.category === 'noir' ? 110 : (editingProfile.category === 'nature' ? 146 : 220), now);
          padGain.gain.setValueAtTime(0.05, now);
          padGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
          padOsc.connect(padGain);
          padGain.connect(audioContextRef.current.destination);
          padOsc.start(now);
          padOsc.stop(now + 0.85);
        }

        beatCount++;
      };

      playBeat();
      audioIntervalRef.current = setInterval(playBeat, intervalMs);
      setIsPlayingAudio(true);
    } catch (e) {
      console.warn('Web Audio error:', e);
      setIsPlayingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="bg-zinc-950/95 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-xl shadow-md">
              <Sliders className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              Style Profile Manager &amp; Directorial Presets
            </h2>
            <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">
              AI Scene Generator Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Create, save, and audition directorial profiles (BBC Nature, Neo-Noir, Cyberpunk, Vox). Automatically configures prompt suffixes, camera motions, shot-duration pacing curves, and music tempos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNew}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-950/40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Profile</span>
          </button>

          <button
            onClick={handleExportJson}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition"
            title="Export Presets to JSON"
          >
            <Download className="w-4 h-4" />
          </button>

          <label 
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition cursor-pointer"
            title="Import Presets from JSON"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Global Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white text-xs">Dismiss</button>
        </div>
      )}

      {/* Profile Selector Cards Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] font-mono">
            Directorial Presets ({profiles.length})
          </span>
          <button
            onClick={handleResetDefaults}
            className="text-[10px] text-zinc-500 hover:text-zinc-300 transition"
          >
            Restore Default Presets
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {profiles.map((prof) => {
            const isSelected = prof.id === selectedProfileId;
            return (
              <div
                key={prof.id}
                onClick={() => {
                  setSelectedProfileId(prof.id);
                  playSoundEffect('pulse', 0.2);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-zinc-900 border-indigo-500 shadow-lg ring-1 ring-indigo-500/50'
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      prof.category === 'nature' ? 'bg-emerald-400' :
                      prof.category === 'noir' ? 'bg-slate-400' :
                      prof.category === 'scifi' ? 'bg-cyan-400' :
                      prof.category === 'documentary' ? 'bg-amber-400' :
                      prof.category === 'luxury' ? 'bg-pink-400' :
                      prof.category === 'contrarian' ? 'bg-red-400' : 'bg-purple-400'
                    }`} />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">{prof.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition line-clamp-1">
                    {prof.name}
                  </h4>
                  <div className="text-[10px] font-mono text-zinc-400 mt-1 flex items-center gap-1.5">
                    <Music className="w-2.5 h-2.5 text-indigo-400" />
                    <span>{prof.targetBpm} BPM</span>
                    <span>•</span>
                    <span>{prof.shotDurationCurve.length} Cuts</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(prof);
                    }}
                    className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
                    title="Apply to Scene Generator"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                  {!prof.isBuiltIn && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProfile(prof.id);
                      }}
                      className="text-zinc-600 hover:text-red-400 p-0.5"
                      title="Delete Preset"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Profile Tabs Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          {[
            { id: 'profiles', label: 'Preset Overview & Apply', icon: Film },
            { id: 'editor', label: 'Prompt & Camera Config', icon: Camera },
            { id: 'curve', label: 'Shot-Duration Curve', icon: Clock },
            { id: 'audio', label: 'Music & Rhythm Pace', icon: Music }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  playSoundEffect('pulse', 0.2);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleApply(editingProfile)}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Apply to AI Scene Generator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRESET OVERVIEW */}
      {activeTab === 'profiles' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeIn">
          
          {/* Left Column: Directorial Breakdown */}
          <div className="lg:col-span-2 space-y-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{editingProfile.name}</span>
                  <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                    {editingProfile.curveType.replace('-', ' ').toUpperCase()}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">{editingProfile.description}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Visual Cadence</span>
                <span className="text-sm font-black text-indigo-400">{editingProfile.visualRhythmWpm} WPM</span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-zinc-500 block uppercase">Lens Selection</span>
                <span className="font-bold text-white truncate block">{editingProfile.cameraLens}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-zinc-500 block uppercase">Lighting Formula</span>
                <span className="font-bold text-amber-300 truncate block">{editingProfile.lightingStyle}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-zinc-500 block uppercase">Color LUT Filter</span>
                <span className="font-bold text-cyan-300 truncate block">{editingProfile.lutColorGrade}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-zinc-500 block uppercase">Camera Motion</span>
                <span className="font-bold text-emerald-300 truncate block">{editingProfile.cameraMotionPreset}</span>
              </div>
            </div>

            {/* Prompt Assembly Preview */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-zinc-400 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-indigo-400" />
                Prompt Expansion Architecture:
              </span>
              <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 text-xs font-mono text-zinc-300 space-y-1">
                <p><span className="text-indigo-400 font-bold">[PREFIX]:</span> {editingProfile.promptPrefix}</p>
                <p><span className="text-emerald-400 font-bold">[USER PROMPT]:</span> &lt;Subject / Core Action Input&gt;</p>
                <p><span className="text-purple-400 font-bold">[SUFFIX]:</span> {editingProfile.promptSuffix}</p>
                <p><span className="text-red-400 font-bold">[NEGATIVE]:</span> {editingProfile.negativePrompt}</p>
              </div>
            </div>

            {/* Shot Curve Mini-Timeline Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Shot Pacing Rhythm ({editingProfile.shotDurationCurve.length} Cuts • Total: {editingProfile.totalDurationSec}s)
                </span>
                <span className="font-mono text-[10px] text-zinc-400">Avg Cut: {editingProfile.avgCutDurationSec}s</span>
              </div>

              <div className="flex h-10 bg-zinc-950 rounded-xl p-1 gap-1 border border-zinc-800">
                {editingProfile.shotDurationCurve.map((cut, idx) => {
                  const widthPct = (cut.durationSec / editingProfile.totalDurationSec) * 100;
                  return (
                    <div
                      key={idx}
                      style={{ width: `${widthPct}%` }}
                      className={`h-full rounded-lg flex flex-col items-center justify-center text-[10px] font-mono font-bold transition-all ${
                        cut.pacingIntensity === 'rapid' 
                          ? 'bg-red-600/30 text-red-200 border border-red-500/40' 
                          : cut.pacingIntensity === 'moderate'
                            ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                            : 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                      }`}
                      title={`${cut.stageName}: ${cut.durationSec}s`}
                    >
                      <span className="truncate px-1">{cut.durationSec}s</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Audio & Pacing Module */}
          <div className="space-y-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-purple-400" />
                  Sound Design &amp; Music Pacing
                </h3>
                <button
                  onClick={togglePlayAudioRhythm}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudio ? 'Stop Metronome' : 'Test BPM'}</span>
                </button>
              </div>

              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Target Tempo:</span>
                  <span className="text-lg font-black text-purple-400 font-mono">{editingProfile.targetBpm} BPM</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Score Genre:</span>
                  <span className="font-bold text-white text-right">{editingProfile.musicGenre}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Tension Curve:</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono text-[10px] uppercase font-bold">
                    {editingProfile.tensionProfile.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Voice Ducking:</span>
                  <span className="font-mono text-zinc-300 font-bold">{editingProfile.audioDuckingDb} dB</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
                <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold block">Atmospheric SFX</span>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {editingProfile.sfxAtmosphere}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-zinc-800 space-y-2">
              <button
                onClick={() => handleApply(editingProfile)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950/50 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Apply This Preset to Scene Generator</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PROMPT & CAMERA CONFIG EDITOR */}
      {activeTab === 'editor' && (
        <div className="space-y-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-400" />
              Configure Prompts, Optics &amp; Color Grading
            </h3>
            <button
              onClick={handleSaveProfileChanges}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Name & Category */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Preset Name</label>
              <input
                type="text"
                value={editingProfile.name}
                onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Description / Rationale</label>
              <input
                type="text"
                value={editingProfile.description}
                onChange={(e) => setEditingProfile({ ...editingProfile, description: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prompt Prefix */}
            <div>
              <label className="block text-[11px] font-semibold text-indigo-400 mb-1">
                Aesthetic Prompt Prefix (Auto-Prepended)
              </label>
              <textarea
                rows={3}
                value={editingProfile.promptPrefix}
                onChange={(e) => setEditingProfile({ ...editingProfile, promptPrefix: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            {/* Prompt Suffix */}
            <div>
              <label className="block text-[11px] font-semibold text-purple-400 mb-1">
                Cinematic Prompt Suffix (Lighting &amp; Rendering Details)
              </label>
              <textarea
                rows={3}
                value={editingProfile.promptSuffix}
                onChange={(e) => setEditingProfile({ ...editingProfile, promptSuffix: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Negative Prompt */}
            <div>
              <label className="block text-[11px] font-semibold text-red-400 mb-1">
                Negative Prompt (Artifacts to Exclude)
              </label>
              <textarea
                rows={2}
                value={editingProfile.negativePrompt}
                onChange={(e) => setEditingProfile({ ...editingProfile, negativePrompt: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-300 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            {/* Camera Motion & Lens Settings */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Camera Lens</label>
                <select
                  value={editingProfile.cameraLens}
                  onChange={(e) => setEditingProfile({ ...editingProfile, cameraLens: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2 text-xs text-white"
                >
                  <option value="100mm f/2.8 Macro Lens">100mm f/2.8 Macro</option>
                  <option value="35mm Anamorphic T1.4">35mm Anamorphic T1.4</option>
                  <option value="18mm Ultra-Wide Anamorphic">18mm Ultra-Wide</option>
                  <option value="50mm Tilt-Shift Architectural">50mm Tilt-Shift</option>
                  <option value="40mm Prime Flat Field">40mm Prime Flat Field</option>
                  <option value="85mm f/1.4 Portrait Prime">85mm f/1.4 Portrait</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Camera Motion</label>
                <select
                  value={editingProfile.cameraMotionPreset}
                  onChange={(e) => setEditingProfile({ ...editingProfile, cameraMotionPreset: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2 text-xs text-white"
                >
                  <option value="Slow Parallax Pan">Slow Parallax Pan</option>
                  <option value="FPV Dive">FPV Dive &amp; Warp</option>
                  <option value="Orbital Flythrough">Orbital Flythrough</option>
                  <option value="Hyperlapse Rush">Hyperlapse Rush</option>
                  <option value="Dolly Zoom (Vertigo Effect)">Dolly Zoom (Vertigo)</option>
                  <option value="Push Punch (1.15x)">Push Punch (1.15x)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-800">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Lighting Preset</label>
              <select
                value={editingProfile.lightingStyle}
                onChange={(e) => setEditingProfile({ ...editingProfile, lightingStyle: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2 text-xs text-white"
              >
                <option value="Golden Hour Rim Light">Golden Hour Rim Light</option>
                <option value="Neon Backlit Reflections">Neon Backlit Reflections</option>
                <option value="Moonlit Bioluminescence">Moonlit Bioluminescence</option>
                <option value="High-Power Floodlights">High-Power Floodlights</option>
                <option value="Starlight Ambient Glow">Starlight Ambient Glow</option>
                <option value="Diffused Studio Softbox">Diffused Studio Softbox</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Color LUT</label>
              <select
                value={editingProfile.lutColorGrade}
                onChange={(e) => setEditingProfile({ ...editingProfile, lutColorGrade: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2 text-xs text-white"
              >
                <option value="Kodak 2383 Film Print">Kodak 2383 Film Print</option>
                <option value="Cyberpunk Teal & Orange">Cyberpunk Teal &amp; Orange</option>
                <option value="Nordic Clean Desaturated">Nordic Clean Desaturated</option>
                <option value="Sports High-Contrast Glow">Sports High-Contrast Glow</option>
                <option value="Emerald Sci-Fi Deep">Emerald Sci-Fi Deep</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Canvas Terrain Base</label>
              <select
                value={editingProfile.terrainRecommendation}
                onChange={(e) => setEditingProfile({ ...editingProfile, terrainRecommendation: e.target.value as any })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2 text-xs text-white"
              >
                <option value="mountains">Alpine Mountain Peaks</option>
                <option value="cyberpunk">Cyberpunk Neon Metropolis</option>
                <option value="ocean">Bioluminescent Ocean</option>
                <option value="stadium">Sports Stadium Bowl</option>
                <option value="space">Deep Space Nebula</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SHOT-DURATION CURVE PACING */}
      {activeTab === 'curve' && (
        <div className="space-y-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Directorial Shot-Duration Pacing Curve
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Control the exact second-by-second cuts of the video. Algorithmic retention peaks when hook duration stays under 2.2 seconds.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newCut: ShotDurationPoint = {
                    shotIndex: editingProfile.shotDurationCurve.length + 1,
                    durationSec: 2.0,
                    stageName: `Shot ${editingProfile.shotDurationCurve.length + 1}`,
                    pacingIntensity: 'moderate'
                  };
                  const updatedCurve = [...editingProfile.shotDurationCurve, newCut];
                  const newTotal = updatedCurve.reduce((acc, c) => acc + c.durationSec, 0);
                  setEditingProfile({
                    ...editingProfile,
                    shotDurationCurve: updatedCurve,
                    totalDurationSec: Math.round(newTotal * 10) / 10,
                    avgCutDurationSec: Math.round((newTotal / updatedCurve.length) * 10) / 10
                  });
                }}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Cut
              </button>

              <button
                onClick={handleSaveProfileChanges}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow"
              >
                <Save className="w-3.5 h-3.5" />
                Save Curve
              </button>
            </div>
          </div>

          {/* Timeline Bar Visualizer */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-400">Total Duration: <strong className="text-white">{editingProfile.totalDurationSec}s</strong></span>
              <span className="font-mono text-zinc-400">Target Rhythm: <strong className="text-indigo-400">{editingProfile.visualRhythmWpm} Words / Min</strong></span>
            </div>

            <div className="flex h-14 bg-zinc-900 rounded-xl p-1 gap-1.5 border border-zinc-800 items-center">
              {editingProfile.shotDurationCurve.map((cut, idx) => {
                const widthPct = (cut.durationSec / editingProfile.totalDurationSec) * 100;
                return (
                  <div
                    key={idx}
                    style={{ width: `${Math.max(10, widthPct)}%` }}
                    className={`h-full rounded-lg flex flex-col items-center justify-center text-xs font-mono font-bold transition-all p-1 group relative ${
                      cut.pacingIntensity === 'rapid' 
                        ? 'bg-red-600/30 text-red-200 border border-red-500/40' 
                        : cut.pacingIntensity === 'moderate'
                          ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                          : 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                    }`}
                  >
                    <span className="text-[10px] truncate max-w-full">{cut.stageName}</span>
                    <span className="text-xs font-black text-white">{cut.durationSec}s</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cuts Editor Table */}
          <div className="space-y-2">
            {editingProfile.shotDurationCurve.map((cut, idx) => (
              <div 
                key={idx}
                className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-400">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={cut.stageName}
                    onChange={(e) => {
                      const updated = [...editingProfile.shotDurationCurve];
                      updated[idx].stageName = e.target.value;
                      setEditingProfile({ ...editingProfile, shotDurationCurve: updated });
                    }}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white font-bold w-48"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-[11px]">Duration:</span>
                    <input
                      type="number"
                      step={0.1}
                      min={0.5}
                      max={10}
                      value={cut.durationSec}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 1.0;
                        const updated = [...editingProfile.shotDurationCurve];
                        updated[idx].durationSec = val;
                        const newTotal = updated.reduce((acc, c) => acc + c.durationSec, 0);
                        setEditingProfile({
                          ...editingProfile,
                          shotDurationCurve: updated,
                          totalDurationSec: Math.round(newTotal * 10) / 10,
                          avgCutDurationSec: Math.round((newTotal / updated.length) * 10) / 10
                        });
                      }}
                      className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
                    />
                    <span className="text-zinc-500 font-mono">s</span>
                  </div>

                  <select
                    value={cut.pacingIntensity}
                    onChange={(e) => {
                      const updated = [...editingProfile.shotDurationCurve];
                      updated[idx].pacingIntensity = e.target.value as any;
                      setEditingProfile({ ...editingProfile, shotDurationCurve: updated });
                    }}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-300"
                  >
                    <option value="rapid">Rapid (&lt;2s)</option>
                    <option value="moderate">Moderate (2-3s)</option>
                    <option value="cinematic">Cinematic (3s+)</option>
                  </select>

                  {editingProfile.shotDurationCurve.length > 2 && (
                    <button
                      onClick={() => {
                        const updated = editingProfile.shotDurationCurve.filter((_, i) => i !== idx);
                        const newTotal = updated.reduce((acc, c) => acc + c.durationSec, 0);
                        setEditingProfile({
                          ...editingProfile,
                          shotDurationCurve: updated,
                          totalDurationSec: Math.round(newTotal * 10) / 10,
                          avgCutDurationSec: Math.round((newTotal / updated.length) * 10) / 10
                        });
                      }}
                      className="text-zinc-500 hover:text-red-400 p-1"
                      title="Remove Shot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MUSIC & RHYTHM PACE */}
      {activeTab === 'audio' && (
        <div className="space-y-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-400" />
              Music Pacing, BPM &amp; Audio Ducking Engine
            </h3>
            <button
              onClick={handleSaveProfileChanges}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Audio Config</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BPM Slider */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-200">Music BPM (Tempo)</label>
                <span className="font-mono text-base font-black text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  {editingProfile.targetBpm} BPM
                </span>
              </div>
              <input
                type="range"
                min={60}
                max={160}
                step={2}
                value={editingProfile.targetBpm}
                onChange={(e) => setEditingProfile({ ...editingProfile, targetBpm: Number(e.target.value) })}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>60 (Calm / Ambient)</span>
                <span>110 (Documentary)</span>
                <span>145+ (High-Octane Phonk)</span>
              </div>
            </div>

            {/* Tension Profile */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
              <label className="block text-xs font-bold text-zinc-200">Algorithmic Tension Curve</label>
              <select
                value={editingProfile.tensionProfile}
                onChange={(e) => setEditingProfile({ ...editingProfile, tensionProfile: e.target.value as any })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="rising_climax">Rising Climax (Continuous Acceleration)</option>
                <option value="sustained_pulse">Sustained Pulse (Constant High-Energy Hook)</option>
                <option value="drop_and_recover">Drop &amp; Recover (Beat Drop on Punchline)</option>
                <option value="ambient_suspense">Ambient Suspense (Understated Tension)</option>
              </select>
              <span className="text-[10px] text-zinc-500 block">
                Dictates automatic volume ramps and sonic risers leading into climax frames.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Music Genre &amp; Instrumentation</label>
              <input
                type="text"
                value={editingProfile.musicGenre}
                onChange={(e) => setEditingProfile({ ...editingProfile, musicGenre: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Voiceover Ducking (dB)</label>
              <input
                type="number"
                min={-30}
                max={-6}
                value={editingProfile.audioDuckingDb}
                onChange={(e) => setEditingProfile({ ...editingProfile, audioDuckingDb: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-300 mb-1">SFX &amp; Environmental Ambience</label>
            <input
              type="text"
              value={editingProfile.sfxAtmosphere}
              onChange={(e) => setEditingProfile({ ...editingProfile, sfxAtmosphere: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      )}

    </div>
  );
};
