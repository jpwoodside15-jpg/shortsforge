import React, { useState } from 'react';
import { 
  Sparkles, Image as ImageIcon, Download, Copy, Check, Eye, EyeOff, 
  Layers, ArrowRight, RefreshCw, Wand2, ShieldCheck, Sliders, Play,
  Palette, Flame, Tag, CheckCheck, ExternalLink
} from 'lucide-react';
import { BatchThumbnailCard } from '../types';

interface BatchThumbnailStudioProps {
  initialTopic?: string;
  initialNiche?: string;
  onSendToUploader?: (thumbnailPromptOrUrl: string) => void;
}

export const BatchThumbnailStudio: React.FC<BatchThumbnailStudioProps> = ({
  initialTopic = 'Stop Doing This In AI (The 2026 Secret)',
  initialNiche = 'AI Automation & SaaS Tools',
  onSendToUploader
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [niche, setNiche] = useState(initialNiche);
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [showSafeZoneOverlay, setShowSafeZoneOverlay] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thumbnails, setThumbnails] = useState<BatchThumbnailCard[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const stylePresets = [
    { id: 'all', label: 'All High-Yield Styles' },
    { id: 'Faceless Cash Cow', label: '⚡ Faceless Cash Cow' },
    { id: '3D Kids Animation', label: '🎨 3D Kids Animation' },
    { id: 'Cinema & Film Recap', label: '🎬 Cinema & Film Recap' },
    { id: 'SaaS & Finance', label: '💰 SaaS & FinTech' }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateBatch = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/batch-thumbnails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          niche,
          count: 4
        })
      });
      const data = await res.json();
      if (data.thumbnails) {
        setThumbnails(data.thumbnails);
      }
    } catch (e) {
      console.error('Batch thumbnail error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  React.useEffect(() => {
    handleGenerateBatch();
  }, []);

  const filteredThumbnails = selectedStyle === 'all' 
    ? thumbnails 
    : thumbnails.filter(t => t.styleCategory === selectedStyle);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-zinc-900 to-pink-950/40 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-600/30">
                <ImageIcon className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Batch 9:16 Thumbnail Studio &amp; CTR Predictor
              </h3>
            </div>
            <p className="text-zinc-400 text-xs mt-1 max-w-2xl">
              Generates high-converting vertical thumbnail cards with CapCut safe-zone guidelines, bold psychological 
              contrast text overlays, and AI visual prompts across kids animations, film recaps, clippers, and cash cows.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSafeZoneOverlay(!showSafeZoneOverlay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                showSafeZoneOverlay 
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/40' 
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}
            >
              {showSafeZoneOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>CapCut Safe Zone: {showSafeZoneOverlay ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Short Video Topic or Core Concept</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. He opened the hatch after 40 years... or Cute Baby Dragon Fable"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Target Niche</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Style Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-800">
          <div className="flex flex-wrap gap-2">
            {stylePresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => setSelectedStyle(preset.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedStyle === preset.id
                    ? 'bg-purple-600 text-white border-purple-500 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerateBatch}
            disabled={isLoading || !topic.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 text-xs shrink-0"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Batch Presets...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Batch Thumbnails</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Batch Cards Grid (9:16 Aspect Ratio) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredThumbnails.map((card, idx) => (
          <div 
            key={card.id || idx}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-purple-500/50 transition-all"
          >
            {/* Visual Canvas (9:16 Aspect Ratio Card) */}
            <div 
              className="relative aspect-[9/16] w-full overflow-hidden flex flex-col justify-between p-4"
              style={{ backgroundColor: card.bgColor }}
            >
              {/* Subtle background visual pattern */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
              
              {/* CapCut Safe-Zone Simulation Guide */}
              {showSafeZoneOverlay && (
                <div className="absolute inset-0 pointer-events-none border border-emerald-500/30">
                  {/* Top Header Exclusion (Shorts Search & Camera) */}
                  <div className="absolute top-0 left-0 right-0 h-[12%] bg-red-500/10 border-b border-red-500/30 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-red-300 font-bold uppercase tracking-wider">Top UI Safe Zone (12%)</span>
                  </div>

                  {/* Right Side Shorts Buttons (Like, Comment, Share, Sound disk) */}
                  <div className="absolute top-[12%] right-0 bottom-[18%] w-[18%] bg-amber-500/10 border-l border-amber-500/30 flex flex-col items-center justify-center gap-2 p-1">
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                    <span className="text-[7px] font-mono text-amber-300 uppercase text-center font-bold">Buttons Zone</span>
                  </div>

                  {/* Bottom UI Title & Audio Pill */}
                  <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-blue-500/10 border-t border-blue-500/30 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-blue-300 font-bold uppercase tracking-wider">Bottom Title &amp; Audio Disk</span>
                  </div>

                  {/* Optimal Center Focal Area */}
                  <div className="absolute top-[18%] left-[8%] right-[22%] bottom-[22%] border-2 border-dashed border-emerald-400/50 rounded-lg flex items-center justify-center">
                    <span className="text-[8px] font-mono text-emerald-300/80 uppercase font-bold">Center Focus (Unobstructed)</span>
                  </div>
                </div>
              )}

              {/* Top Card Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span 
                  className="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded shadow"
                  style={{ backgroundColor: card.primaryColor, color: '#000000' }}
                >
                  {card.badgeText}
                </span>

                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white border border-white/20 backdrop-blur">
                  9:16 4K
                </span>
              </div>

              {/* Bold Center / Top Headline */}
              <div className="relative z-10 space-y-1 text-center my-auto py-4">
                <h4 
                  className="text-xl font-black uppercase tracking-tight leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
                  style={{ color: card.primaryColor }}
                >
                  {card.headlineText}
                </h4>
                {card.subHeadlineText && (
                  <p 
                    className="text-xs font-bold uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    style={{ color: card.secondaryColor }}
                  >
                    {card.subHeadlineText}
                  </p>
                )}
              </div>

              {/* Bottom Visual Description Summary */}
              <div className="relative z-10 bg-black/75 backdrop-blur-md p-2 rounded-xl border border-white/10 space-y-1">
                <p className="text-[10px] text-zinc-300 font-medium line-clamp-2 leading-tight">
                  {card.imageDescription}
                </p>
              </div>
            </div>

            {/* Card Footer Controls & Performance Meta */}
            <div className="p-4 space-y-3 bg-zinc-950 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">{card.styleCategory}</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-400">{card.predictedCtr}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {card.visualElements?.map((el, i) => (
                    <span key={i} className="text-[9px] bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800">
                      {el}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-zinc-900">
                <button
                  onClick={() => handleCopy(card.promptForAi, `prompt-${card.id || idx}`)}
                  className="w-full py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-zinc-800 cursor-pointer transition-colors"
                >
                  {copiedKey === `prompt-${card.id || idx}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AI Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy AI Image Prompt</span>
                    </>
                  )}
                </button>

                {onSendToUploader && (
                  <button
                    onClick={() => onSendToUploader(card.promptForAi)}
                    className="w-full py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all"
                  >
                    <span>Use for Short Upload</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
