import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Hammer, Cog, Factory, Wrench, Flame, Landmark, Shield,
  Play, Pause, Volume2, VolumeX, Sparkles, Download, Copy, Check,
  Search, ExternalLink, ArrowRight, Music, Sliders, Smartphone,
  Layers, Info, Award, RefreshCw, Zap, Eye, CheckCircle2
} from 'lucide-react';
import { 
  CRAFTSMAN_FILM_REGISTRY, 
  CRAFTSMAN_CATEGORIES, 
  MUSIC_SFX_PRESETS,
  CraftsmanFilmItem 
} from '../data/craftsmanData';
import { playSoundEffect } from '../utils/soundEffects';

interface CraftsmanEngineeringStudioTabProps {
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToThumbnail?: (frameUrl: string, title?: string) => void;
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  onSendToSimulator?: (hookText: string) => void;
}

export const CraftsmanEngineeringStudioTab: React.FC<CraftsmanEngineeringStudioTabProps> = ({
  onSendToClipper,
  onSendToThumbnail,
  onSendToUploader,
  onSendToSimulator
}) => {
  // Active Registry & Selection State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilmId, setSelectedFilmId] = useState<string>('titanium-deep-gun-drill');

  // Video Playback & Loop State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.1);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Audio & Soundtrack State
  const [selectedMusicKey, setSelectedMusicKey] = useState<string>('latheAsmr');
  const [sfxVolume, setSfxVolume] = useState<number>(0.7);
  const [isPlayingAudioPreview, setIsPlayingAudioPreview] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Explainer Tabs: Metallurgy / Engineering / Historical Info Pack
  const [explainerTab, setExplainerTab] = useState<'metallurgy' | 'infopack' | 'soundtrack'>('metallurgy');

  // Filtered Registry List
  const filteredFilms = useMemo(() => {
    return CRAFTSMAN_FILM_REGISTRY.filter((film) => {
      const matchCat = selectedCategoryId === 'all' || film.category === selectedCategoryId;
      const matchQuery = !searchQuery || 
        film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.materialOrSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.toolUsed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategoryId, searchQuery]);

  // Currently Selected Film Item
  const currentFilm = useMemo(() => {
    const found = CRAFTSMAN_FILM_REGISTRY.find(f => f.id === selectedFilmId);
    if (found) return found;
    return filteredFilms[0] || CRAFTSMAN_FILM_REGISTRY[0];
  }, [selectedFilmId, filteredFilms]);

  // Sync Video source when selection changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
    // Update default sound track for the item
    setSelectedMusicKey(currentFilm.recommendedSoundtrack.audioSfxKey);
  }, [currentFilm, playbackSpeed]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handlePlaySfxTrack = (key: any) => {
    setSelectedMusicKey(key);
    setIsPlayingAudioPreview(true);
    playSoundEffect(key as any, sfxVolume);
    setTimeout(() => setIsPlayingAudioPreview(false), 2000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendToVideoClipper = () => {
    if (onSendToClipper) {
      onSendToClipper(0, Math.min(currentFilm.durationSec, 30), currentFilm.title);
    }
  };

  const handleSendToThumbnailStudio = () => {
    if (onSendToThumbnail) {
      onSendToThumbnail(currentFilm.posterUrl, currentFilm.suggestedShortTitle);
    }
  };

  const handleSendToUploaderTab = () => {
    if (onSendToUploader) {
      onSendToUploader({
        title: currentFilm.suggestedShortTitle,
        description: `${currentFilm.explanation}\n\nKey Material: ${currentFilm.materialOrSubject}\nTool Used: ${currentFilm.toolUsed}\n\n${currentFilm.suggestedHashtags.join(' ')}\n📌 Detailed metallurgical blueprint in pinned comment!`,
        tags: currentFilm.suggestedHashtags.map(t => t.replace('#', ''))
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-red-950/40 border border-amber-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-600/20 text-amber-400 rounded-lg border border-amber-600/30">
                <Hammer className="w-5 h-5 text-amber-500" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Craftsman &amp; Industrial Engineering Film Registry
              </h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-3xl">
              Curated satisfying production line loops, high-pressure super drilling through precious metals (Titanium, 24K Gold, Tungsten), Fred Dibnah steeplejack chimney demolitions, Victorian architectural wonders, Japanese Kumiko wood joinery, and interactive metallurgy explainers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/10 text-amber-300 px-3 py-1.5 rounded-full border border-amber-500/20 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              18 Production Archives • Metallurgy Packs • 4K Loops
            </span>
          </div>
        </div>
      </div>

      {/* Scraper / Search & Category Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-3">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search metals (Titanium, Gold), tools (Gun-drill, Kanna), Fred Dibnah, Victorian..."
              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Active Target Count */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Showing: <strong className="text-white font-bold">{filteredFilms.length} Loops</strong></span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-red-400 hover:text-red-300 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CRAFTSMAN_CATEGORIES.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  isActive ? 'bg-black/30 text-white' : 'bg-zinc-950 text-zinc-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 Cols): 9:16 Interactive Shorts Video Player */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div className="relative w-[310px] sm:w-[340px] aspect-[9/16] bg-black rounded-[38px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-[5px] border-zinc-800 ring-1 ring-zinc-700/60 overflow-hidden group">
            
            {/* Phone Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-full z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
            </div>

            {/* Video Container */}
            <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-zinc-950">
              <video
                ref={videoRef}
                src={currentFilm.videoLoopUrl}
                poster={currentFilm.posterUrl}
                loop
                muted={isMuted}
                playsInline
                autoPlay
                className="w-full h-full object-cover select-none"
              />

              {/* Dark Gradient Backdrop for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none z-10" />

              {/* Safe-Zone Framing Overlay */}
              {showSafeZone && (
                <div className="absolute inset-x-4 top-20 bottom-20 border border-dashed border-amber-500/50 rounded-xl pointer-events-none z-20 flex flex-col justify-between p-2">
                  <span className="text-[9px] font-mono text-amber-400 bg-black/80 px-1.5 py-0.5 rounded w-fit">
                    CapCut 9:16 Safe Frame
                  </span>
                  <span className="text-[9px] font-mono text-amber-400 bg-black/80 px-1.5 py-0.5 rounded w-fit self-end">
                    No Buttons Zone
                  </span>
                </div>
              )}

              {/* Top HUD Bar */}
              <div className="absolute top-7 inset-x-4 z-20 flex items-center justify-between text-[10px] font-mono">
                <span className="bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                  {currentFilm.categoryLabel.toUpperCase()}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 px-2 py-0.5 rounded-full">
                  ⏱️ {currentFilm.durationSec}s LOOP
                </span>
              </div>

              {/* Lower Overlay: Spoken Viral Hook Headline Subtitle */}
              {showCaptions && (
                <div className="absolute bottom-16 inset-x-3 z-20 space-y-1.5 text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                  <div className="inline-block bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-md">
                    ⚡ {currentFilm.materialOrSubject}
                  </div>
                  <div 
                    className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-tight px-1"
                    style={{
                      textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 10px rgba(0,0,0,0.9)'
                    }}
                  >
                    {currentFilm.viralHook}
                  </div>
                  <div className="text-[10px] text-zinc-300 font-mono">
                    Tool: <strong className="text-amber-300">{currentFilm.toolUsed}</strong> • {currentFilm.powerOrRpm}
                  </div>
                </div>
              )}

              {/* Video Play / Pause Tap Overlay */}
              <button
                onClick={handleTogglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
              >
                <div className="p-3 rounded-full bg-black/60 text-white border border-white/20">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 text-amber-400" />}
                </div>
              </button>
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-xs w-[310px] sm:w-[340px] justify-between">
            <button
              onClick={handleTogglePlay}
              className="p-1.5 bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Playback speed sweet spot */}
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {[1.0, 1.1, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded transition ${
                    playbackSpeed === spd ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                showCaptions ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
              }`}
            >
              Subtitles
            </button>

            <button
              onClick={() => setShowSafeZone(!showSafeZone)}
              className={`p-1.5 rounded-lg border text-xs transition ${
                showSafeZone ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
              }`}
              title="CapCut Safe Zone"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1-Click Transformation Buttons */}
          <div className="w-[310px] sm:w-[340px] space-y-2">
            <button
              onClick={handleSendToVideoClipper}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
            >
              <span>Cut &amp; Remix in Video Clipper Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSendToThumbnailStudio}
                className="py-2 px-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-800 flex items-center justify-center gap-1.5 transition"
              >
                <span>Send to Thumbnail</span>
                <ArrowRight className="w-3 h-3 text-amber-400" />
              </button>

              <button
                onClick={handleSendToUploaderTab}
                className="py-2 px-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-800 flex items-center justify-center gap-1.5 transition"
              >
                <span>Send to Uploader</span>
                <ArrowRight className="w-3 h-3 text-red-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Metallurgical Explainers, Fred Dibnah Tribute, Info Pack & Music */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Active Film Header Overview */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-bold">
                  {currentFilm.categoryLabel}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
                  {currentFilm.title}
                </h3>
                <p className="text-xs text-zinc-400">
                  {currentFilm.subtitle}
                </p>
              </div>

              <div className="flex sm:flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] text-zinc-400 font-mono">Hardness / Era:</span>
                <span className="text-xs font-bold text-emerald-400 font-mono bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  {currentFilm.hardnessOrEra}
                </span>
              </div>
            </div>

            {/* Core Explanation Quote */}
            <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-amber-500/20 text-xs text-zinc-200 leading-relaxed">
              <strong className="text-amber-400">Why It Goes Viral: </strong>
              {currentFilm.explanation}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800 text-xs font-mono">
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 block">Workpiece Material</span>
                <span className="text-white font-bold truncate block">{currentFilm.materialOrSubject}</span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 block">Cutting Tool Spec</span>
                <span className="text-white font-bold truncate block">{currentFilm.toolUsed}</span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 block">Operational Power</span>
                <span className="text-white font-bold truncate block">{currentFilm.powerOrRpm}</span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 block">Est. Short Duration</span>
                <span className="text-amber-400 font-bold">{currentFilm.durationSec}s Optimized</span>
              </div>
            </div>
          </div>

          {/* Subtabs for Explainer Deep Dives: Metallurgy vs Info Pack vs Music Soundtrack */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setExplainerTab('metallurgy')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    explainerTab === 'metallurgy'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Cog className="w-3.5 h-3.5" />
                  <span>Metallurgy &amp; Physics Spec</span>
                </button>
                <button
                  onClick={() => setExplainerTab('infopack')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    explainerTab === 'infopack'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>History &amp; Viral Info Pack</span>
                </button>
                <button
                  onClick={() => setExplainerTab('soundtrack')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    explainerTab === 'soundtrack'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Music &amp; ASMR Library</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                ShortsForge Educational Registry
              </span>
            </div>

            {/* TAB 1: METALLURGICAL & TOOL EXPLAINER */}
            {explainerTab === 'metallurgy' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
                      🔬 Material Crystal Lattice &amp; Mechanical Properties
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      {currentFilm.metallurgyOrEngineeringBreakdown.properties}
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1">
                      ⚙️ Tool Geometry &amp; Coating Specs
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      {currentFilm.metallurgyOrEngineeringBreakdown.toolSpec}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                    💡 The Engineering Secret (Why Conventional Methods Fail)
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {currentFilm.metallurgyOrEngineeringBreakdown.engineeringSecret}
                  </p>
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                    ⚡ Physical Law / Thermodynamics Fact
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {currentFilm.metallurgyOrEngineeringBreakdown.physicsFact}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: HISTORICAL INFO PACK & FRED DIBNAH TRIBUTE */}
            {explainerTab === 'infopack' && (
              <div className="space-y-3">
                <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                      📜 3 Shocking Historical &amp; Technical Trivia Facts
                    </span>
                    <button
                      onClick={() => handleCopy(
                        `1. ${currentFilm.infoPack.keyFact1}\n2. ${currentFilm.infoPack.keyFact2}\n3. ${currentFilm.infoPack.keyFact3}`,
                        'trivia'
                      )}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedKey === 'trivia' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Facts</span>
                    </button>
                  </div>

                  <ul className="space-y-1.5 text-zinc-300 list-disc list-inside">
                    <li>{currentFilm.infoPack.keyFact1}</li>
                    <li>{currentFilm.infoPack.keyFact2}</li>
                    <li>{currentFilm.infoPack.keyFact3}</li>
                  </ul>
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                    🏛️ Historical Evolution &amp; Inventor Background
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {currentFilm.infoPack.historicalContext}
                  </p>
                </div>

                {/* Fred Dibnah Special Callout if relevant */}
                {currentFilm.category === 'chimney-demolition' && (
                  <div className="p-3.5 bg-gradient-to-r from-red-950/30 to-amber-950/30 rounded-xl border border-red-500/30 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="font-bold text-white">Fred Dibnah MBE Steeplejack Tribute (1938–2004)</span>
                    </div>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">
                      Fred was famous for dropping giant Victorian factory chimneys using only pit-props, chisels, and fires—never dynamite. He was also celebrated for climbing 300-foot church spires using dog-irons and timber ladders without ropes or safety gear.
                    </p>
                    <div className="p-2 bg-black/60 rounded text-[11px] font-serif italic text-amber-200">
                      "I've always had a feeling that if you make a mistake on a high chimney, you don't need an ambulance—you just need a mop and bucket." — Fred Dibnah
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: VIRAL MUSIC & SFX LIBRARY */}
            {explainerTab === 'soundtrack' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-300">
                    Recommended Sound &amp; ASMR Library for High-Retention Shorts
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Web Audio Synthesizer Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MUSIC_SFX_PRESETS.map((sfx) => {
                    const isSelected = selectedMusicKey === sfx.id;
                    return (
                      <div
                        key={sfx.id}
                        className={`p-3 rounded-xl border text-xs transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-white'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{sfx.icon}</span>
                          <div>
                            <div className="font-bold text-white text-[11px]">{sfx.name}</div>
                            <div className="text-[9px] text-zinc-400">{sfx.desc} • {sfx.bpm} BPM</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handlePlaySfxTrack(sfx.id)}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700 cursor-pointer"
                          title="Preview Audio"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                  <span>SFX Master Volume: {Math.round(sfxVolume * 100)}%</span>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={Math.round(sfxVolume * 100)}
                    onChange={(e) => setSfxVolume(parseInt(e.target.value, 10) / 100)}
                    className="w-40 accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Film Loops Archive Carousel (Browse All) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
              <Factory className="w-4 h-4 text-amber-400" /> Browse Satisfying Industrial Production Reels
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredFilms.map((film) => {
                const isSelected = film.id === currentFilm.id;
                return (
                  <button
                    key={film.id}
                    onClick={() => setSelectedFilmId(film.id)}
                    className={`rounded-xl overflow-hidden border-2 text-left p-1 transition cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-500/30 bg-zinc-950'
                        : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                    }`}
                  >
                    <img 
                      src={film.thumbnailUrl} 
                      alt={film.title} 
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <div className="mt-1 px-1">
                      <span className="text-[10px] font-bold text-white block truncate">{film.title}</span>
                      <span className="text-[9px] text-amber-400 font-mono block truncate">{film.materialOrSubject}</span>
                      <span className="text-[8px] text-zinc-500 font-mono">{film.durationSec}s Loop</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
