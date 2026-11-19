import React, { useState } from 'react';
import { 
  Volume2, Play, Search, Plus, Check, Clock, Flame, 
  Sparkles, Layers, Sliders, Copy, Download, Zap, Radio
} from 'lucide-react';
import { SonicImpactSfx, SfxCategory, TimelineTrackItem } from '../types';
import { SONIC_IMPACT_SFX_CATALOG } from '../data/sonicImpactSfx';
import { playSonicSfx } from '../utils/soundSynthesizer';

interface SonicImpactLibraryProps {
  onInsertSfx: (item: TimelineTrackItem) => void;
  activeTimestamp?: number;
  activeSegmentId?: number;
}

const CATEGORY_TABS: { id: 'all' | SfxCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All SFX (12)', icon: '🎧' },
  { id: 'whoosh', label: 'Whooshes & Swishes', icon: '💨' },
  { id: 'pop', label: 'Pops & Bubbles', icon: '🫧' },
  { id: 'cinematic-hit', label: 'Cinematic Hits & Braams', icon: '💥' },
  { id: 'riser', label: 'Risers & Build-ups', icon: '📈' },
  { id: 'bass-drop', label: '808 Bass Drops', icon: '⚡' },
  { id: 'dopamine-cash', label: 'Cash & Dopamine', icon: '💰' },
  { id: 'glitch-ui', label: 'Glitches & UI Snaps', icon: '👾' }
];

export const SonicImpactLibrary: React.FC<SonicImpactLibraryProps> = ({
  onInsertSfx,
  activeTimestamp = 0.0,
  activeSegmentId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | SfxCategory>('all');
  const [auditionVolume, setAuditionVolume] = useState(85);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [insertedFeedbackId, setInsertedFeedbackId] = useState<string | null>(null);
  const [insertTimestamp, setInsertTimestamp] = useState<number>(activeTimestamp);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Filter Catalog based on search and category
  const filteredCatalog = SONIC_IMPACT_SFX_CATALOG.filter(sfx => {
    const matchesCat = selectedCategory === 'all' || sfx.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      sfx.name.toLowerCase().includes(q) ||
      sfx.description.toLowerCase().includes(q) ||
      sfx.tag.toLowerCase().includes(q) ||
      sfx.capcutTimingCue.toLowerCase().includes(q) ||
      sfx.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // Audition playback
  const handlePlaySound = (sfx: SonicImpactSfx) => {
    setActivePlayingId(sfx.id);
    playSonicSfx(sfx.audioWaveType, auditionVolume);
    setTimeout(() => {
      setActivePlayingId(null);
    }, Math.max(400, sfx.durationSec * 1000));
  };

  // Insert to timeline
  const handleInsert = (sfx: SonicImpactSfx) => {
    const newItem: TimelineTrackItem = {
      id: `sfx-track-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sfxId: sfx.id,
      name: sfx.name,
      category: sfx.category,
      timestampSec: insertTimestamp,
      volume: auditionVolume,
      durationSec: sfx.durationSec,
      linkedSegmentId: activeSegmentId
    };

    onInsertSfx(newItem);
    setInsertedFeedbackId(sfx.id);
    setTimeout(() => setInsertedFeedbackId(null), 2000);
  };

  const handleCopyCueSheet = () => {
    let text = "CAPCUT SONIC IMPACT CUE SHEET\n===============================\n\n";
    SONIC_IMPACT_SFX_CATALOG.forEach((sfx, i) => {
      text += `${i + 1}. [${sfx.category.toUpperCase()}] ${sfx.name} (${sfx.durationSec}s)\n`;
      text += `   - Target CapCut Level: ${sfx.recommendedVolumeDb}\n`;
      text += `   - Exact Timing Cue: ${sfx.capcutTimingCue}\n`;
      text += `   - Retention Goal: ${sfx.retentionBenefit}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedKey('cuesheet');
    setTimeout(() => setCopiedKey(null), 2200);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* 1. Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <Volume2 className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">
                Sonic Impact SFX Library
              </h3>
              <span className="text-[11px] font-mono bg-indigo-500/15 text-indigo-300 font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                100% Free &amp; Royalty-Free
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Searchable catalog of high-impact sound design cues (whooshes, pops, cinematic braams) engineered for 3-4 second retention resets.
            </p>
          </div>
        </div>

        {/* Master Audition Controls */}
        <div className="flex items-center gap-4 bg-zinc-950 p-2.5 px-4 rounded-2xl border border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-300">Audition Vol:</span>
            <span className="text-xs font-mono text-indigo-400 font-bold">{auditionVolume}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={100}
            value={auditionVolume}
            onChange={(e) => setAuditionVolume(parseInt(e.target.value))}
            className="w-20 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <button
            onClick={handleCopyCueSheet}
            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition ml-1"
            title="Copy CapCut Audio Cue Sheet"
          >
            {copiedKey === 'cuesheet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'cuesheet' ? 'Copied Sheet!' : 'Cue Sheet'}</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Category Filter Chips */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SFX by keyword (e.g. whoosh, pop, braam, cash, hook, 808)..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Insert Timestamp Offset Selector */}
          <div className="flex items-center gap-2 bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800 shrink-0 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400">Insert At:</span>
            <input
              type="number"
              step={0.1}
              min={0}
              max={60}
              value={insertTimestamp}
              onChange={(e) => setInsertTimestamp(parseFloat(e.target.value) || 0)}
              className="w-16 bg-zinc-900 border border-zinc-700 rounded px-1.5 py-0.5 text-xs text-amber-400 font-mono font-bold"
            />
            <span className="text-zinc-500">sec</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {CATEGORY_TABS.map(tab => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SFX Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCatalog.map(sfx => {
          const isPlaying = activePlayingId === sfx.id;
          const isRecentlyInserted = insertedFeedbackId === sfx.id;

          return (
            <div
              key={sfx.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                isPlaying
                  ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg'
                  : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-2">
                {/* Title & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlaySound(sfx)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition shadow cursor-pointer ${
                        isPlaying
                          ? 'bg-indigo-500 text-white animate-pulse'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-indigo-400'
                      }`}
                      title="Audition sound effect"
                    >
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight">
                        {sfx.name}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {sfx.durationSec}s • {sfx.recommendedVolumeDb}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono bg-zinc-900 text-indigo-300 px-2 py-0.5 rounded border border-zinc-800">
                    {sfx.tag}
                  </span>
                </div>

                {/* Animated Waveform Visualizer Simulation */}
                <div className="h-4 flex items-center gap-1 px-1 bg-zinc-900/60 rounded-md">
                  {[4, 12, 8, 16, 6, 14, 10, 18, 9, 15, 7, 13, 5, 11].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        height: isPlaying ? `${Math.max(3, (h * Math.random() * 1.3))}px` : `${Math.max(2, h * 0.4)}px`,
                        backgroundColor: isPlaying ? '#818cf8' : '#3f3f46'
                      }}
                      className="w-1 rounded-full transition-all duration-75"
                    />
                  ))}
                </div>

                {/* Description */}
                <p className="text-[11px] text-zinc-300 leading-snug">
                  {sfx.description}
                </p>

                {/* CapCut Timing Cue */}
                <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-amber-400" /> CapCut Timing Cue:
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono leading-snug">
                    {sfx.capcutTimingCue}
                  </p>
                </div>

                {/* Psychological retention benefit */}
                <p className="text-[10px] text-zinc-500 italic leading-snug">
                  🧠 &quot;{sfx.retentionBenefit}&quot;
                </p>
              </div>

              {/* Bottom Bar: Insert to Timeline Button */}
              <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">
                  Target: {insertTimestamp.toFixed(1)}s
                </span>

                <button
                  onClick={() => handleInsert(sfx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    isRecentlyInserted
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {isRecentlyInserted ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Inserted!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Insert to Timeline</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
