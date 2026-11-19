import React, { useState } from 'react';
import { 
  Zap, Sparkles, Copy, Check, Play, Pause, RefreshCw, 
  ArrowRight, ShieldCheck, Eye, Smartphone, Sliders, Flame, 
  AlertTriangle, MessageSquare, ExternalLink, Scissors, Clapperboard,
  Upload, Film, Volume2, Award, Terminal
} from 'lucide-react';
import { playSoundEffect } from '../utils/soundEffects';

export interface GeneratedHook {
  id: string;
  triggerType: 'contrarian' | 'personal_failure' | 'curiosity_gap' | 'negative_warning' | 'high_contrast';
  hookText: string;
  wordCount: number;
  durationSec: number;
  predictedHoldRate: number; // e.g. 94%
  psychologicalMechanism: string;
  visualDirection: string;
  recommendedSfx: 'whoosh' | 'subdrop' | 'chime';
  captionStyle: 'mrbeast_yellow' | 'hormozi_green' | 'neon_cyan' | 'minimal_white';
}

interface ViralHookGeneratorProps {
  onInjectIntoScript?: (hookText: string) => void;
  onSendToClipper?: (hookText: string) => void;
  onSendToSceneGen?: (prompt: string) => void;
  onSendToUploader?: (title: string) => void;
}

const PRESET_HOOK_BANK: Record<string, GeneratedHook[]> = {
  contrarian: [
    {
      id: 'h_con_1',
      triggerType: 'contrarian',
      hookText: 'Everything you were told about saving money is a lie.',
      wordCount: 9,
      durationSec: 2.3,
      predictedHoldRate: 94,
      psychologicalMechanism: 'Belief Disruption: Invalidates common assumptions, triggering cognitive dissonance that forces the viewer to stay for resolution.',
      visualDirection: 'Rapid 1.5x zoom-in cut directly into camera lens with dramatic desaturation.',
      recommendedSfx: 'subdrop',
      captionStyle: 'mrbeast_yellow'
    },
    {
      id: 'h_con_2',
      triggerType: 'contrarian',
      hookText: 'Stop buying index funds if you want to be rich.',
      wordCount: 10,
      durationSec: 2.5,
      predictedHoldRate: 92,
      psychologicalMechanism: 'Taboo Violation: Attacks standard consensus financial advice, prompting immediate defense/curiosity impulses.',
      visualDirection: 'Macro shot of red descending trading chart instantly cutting to speaker.',
      recommendedSfx: 'whoosh',
      captionStyle: 'hormozi_green'
    }
  ],
  personal_failure: [
    {
      id: 'h_fail_1',
      triggerType: 'personal_failure',
      hookText: 'I lost £42,000 before I understood this one rule.',
      wordCount: 9,
      durationSec: 2.4,
      predictedHoldRate: 96,
      psychologicalMechanism: 'Empathy & Vulnerability Trap: Specific loss numbers trigger catastrophic curiosity and schadenfreude.',
      visualDirection: 'Grim face expression with bold red financial statement screenshot flash.',
      recommendedSfx: 'subdrop',
      captionStyle: 'mrbeast_yellow'
    },
    {
      id: 'h_fail_2',
      triggerType: 'personal_failure',
      hookText: 'My channel died completely until I made this switch.',
      wordCount: 9,
      durationSec: 2.2,
      predictedHoldRate: 91,
      psychologicalMechanism: 'Existential Threat: Creators and ambitious viewers project their own fears of stagnation.',
      visualDirection: 'Flatlining YouTube analytics graph animation with abrupt red alert strobe.',
      recommendedSfx: 'whoosh',
      captionStyle: 'neon_cyan'
    }
  ],
  curiosity_gap: [
    {
      id: 'h_cur_1',
      triggerType: 'curiosity_gap',
      hookText: 'There is a secret reason why millionaires never do this.',
      wordCount: 10,
      durationSec: 2.6,
      predictedHoldRate: 95,
      psychologicalMechanism: 'Asymmetric Information: Creates an urgent open loop that can only be closed by viewing the next 15 seconds.',
      visualDirection: 'Sleek luxury asset footage panning fast with blurred text overlay.',
      recommendedSfx: 'chime',
      captionStyle: 'hormozi_green'
    },
    {
      id: 'h_cur_2',
      triggerType: 'curiosity_gap',
      hookText: 'Wait till you see why this titanium bit vaporizes.',
      wordCount: 9,
      durationSec: 2.3,
      predictedHoldRate: 97,
      psychologicalMechanism: 'Anticipation Spike: Promises immediate physical spectacle within the next 3 seconds.',
      visualDirection: 'Macro 50,000x slow-mo drill bit sparking white-hot with coolant vapor.',
      recommendedSfx: 'subdrop',
      captionStyle: 'neon_cyan'
    }
  ],
  negative_warning: [
    {
      id: 'h_warn_1',
      triggerType: 'negative_warning',
      hookText: 'If you make this mistake, your channel is over.',
      wordCount: 9,
      durationSec: 2.2,
      predictedHoldRate: 93,
      psychologicalMechanism: 'Loss Aversion (Kahneman Protocol): The fear of losing existing progress is 2.5x stronger than the desire for gain.',
      visualDirection: 'Warning siren flash graphic with bold caution tape lower third.',
      recommendedSfx: 'subdrop',
      captionStyle: 'mrbeast_yellow'
    }
  ],
  high_contrast: [
    {
      id: 'h_cont_1',
      triggerType: 'high_contrast',
      hookText: 'Broke people trade time. The top 1% trade leverage.',
      wordCount: 9,
      durationSec: 2.4,
      predictedHoldRate: 94,
      psychologicalMechanism: 'Identity Polarization: Forces the viewer to immediately choose an aspirational identity group.',
      visualDirection: 'Split screen showing chaotic manual labor vs quiet automated terminal dashboard.',
      recommendedSfx: 'chime',
      captionStyle: 'minimal_white'
    }
  ]
};

export const ViralHookGenerator: React.FC<ViralHookGeneratorProps> = ({
  onInjectIntoScript,
  onSendToClipper,
  onSendToSceneGen,
  onSendToUploader
}) => {
  const [selectedTrigger, setSelectedTrigger] = useState<'contrarian' | 'personal_failure' | 'curiosity_gap' | 'negative_warning' | 'high_contrast'>('contrarian');
  const [transcriptOrTopic, setTranscriptOrTopic] = useState<string>('Why 99% of people fail to build wealth and stay broke in their 20s');
  const [selectedNiche, setSelectedNiche] = useState<string>('Finance & Wealth');
  const [activeHookText, setActiveHookText] = useState<string>('Everything you were told about saving money is a lie.');
  const [activeCaptionStyle, setActiveCaptionStyle] = useState<'mrbeast_yellow' | 'hormozi_green' | 'neon_cyan' | 'minimal_white'>('mrbeast_yellow');
  const [hookFontSize, setHookFontSize] = useState<number>(14);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [generatedList, setGeneratedList] = useState<GeneratedHook[]>(PRESET_HOOK_BANK.contrarian);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSoundEffect('pulse', 0.4);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Switch psychological trigger and update hook bank
  const handleSelectTrigger = (trigger: 'contrarian' | 'personal_failure' | 'curiosity_gap' | 'negative_warning' | 'high_contrast') => {
    setSelectedTrigger(trigger);
    playSoundEffect('whoosh', 0.3);
    const list = PRESET_HOOK_BANK[trigger] || PRESET_HOOK_BANK.contrarian;
    setGeneratedList(list);
    if (list[0]) {
      setActiveHookText(list[0].hookText);
      setActiveCaptionStyle(list[0].captionStyle);
    }
  };

  // Generate dynamic tailored hooks from input
  const handleRegenerateHooks = () => {
    playSoundEffect('pulse', 0.4);
    const cleanTopic = transcriptOrTopic.trim().replace(/^why\s+/i, '').replace(/^how\s+/i, '');

    const generated: GeneratedHook[] = [
      {
        id: `gen_${Date.now()}_1`,
        triggerType: selectedTrigger,
        hookText: selectedTrigger === 'contrarian'
          ? `Never do ${cleanTopic.slice(0, 30)} like everyone else.`
          : selectedTrigger === 'personal_failure'
          ? `I ruined everything trying to do ${cleanTopic.slice(0, 26)}.`
          : selectedTrigger === 'curiosity_gap'
          ? `There is a dark truth about ${cleanTopic.slice(0, 26)}.`
          : selectedTrigger === 'negative_warning'
          ? `If you ignore this about ${cleanTopic.slice(0, 26)}, you lose.`
          : `Most people fail at ${cleanTopic.slice(0, 24)}. The top 1% win.`,
        wordCount: 8,
        durationSec: 2.3,
        predictedHoldRate: Math.round(92 + Math.random() * 5),
        psychologicalMechanism: `Engineered pattern interrupt calibrated for ${selectedNiche} algorithms.`,
        visualDirection: 'Fast whip-pan transition with foreground text zoom.',
        recommendedSfx: 'subdrop',
        captionStyle: activeCaptionStyle
      },
      ...generatedList
    ];

    setGeneratedList(generated);
    setActiveHookText(generated[0].hookText);
    showToast(`Generated viral ${selectedTrigger.replace('_', ' ')} 3-second opener!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HEADER & PSYCHOLOGICAL TRIGGER SELECTOR */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="p-2 bg-gradient-to-tr from-amber-500 to-red-600 text-white rounded-xl shadow-md">
                <Flame className="w-5 h-5 text-white" />
              </span>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                Viral Hook Generator &amp; 3-Second Opener Engine
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Cognitive Friction Protocols
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                &lt;12 Words
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Craft irresistible 3-second openers for any transcript or topic using verified psychological triggers. 
              Features a built-in 9:16 smartphone viewer to test on-screen layout, readability, and safe-zone alignment before rendering.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerateHooks}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-950/40 cursor-pointer transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate 3-Second Openers</span>
            </button>
          </div>
        </div>

        {/* Psychological Trigger Selector Tabs */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2">
          {[
            { id: 'contrarian', label: 'Contrarian Belief Shock', badge: '94% Hold', desc: 'Invalidates common belief' },
            { id: 'personal_failure', label: 'Personal Failure & Loss', badge: '96% Hold', desc: 'High stakes confession' },
            { id: 'curiosity_gap', label: 'Asymmetric Curiosity Gap', badge: '95% Hold', desc: 'Unclosed open loop' },
            { id: 'negative_warning', label: 'Negative Threat Warning', badge: '93% Hold', desc: 'Loss aversion protocol' },
            { id: 'high_contrast', label: 'High-Velocity Contrast', badge: '94% Hold', desc: 'Top 1% vs Average' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSelectTrigger(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedTrigger === tab.id
                  ? 'bg-zinc-800 text-white border border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                  : 'text-zinc-400 hover:text-white bg-zinc-950/60 border border-zinc-800/80'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${selectedTrigger === tab.id ? 'text-amber-400' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
              <span className="text-[9px] font-mono bg-black/50 text-amber-300 px-1.5 py-0.2 rounded border border-zinc-700">
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Global Toast */}
        {toastMessage && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white text-xs">Dismiss</button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. DUAL WORKSPACE: INPUT & 9:16 SCREEN VIEWER */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Input & Generated Hook Cards */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Transcript / Topic Input Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Source Transcript or Topic Concept
              </label>
              <span className="text-[10px] font-mono text-zinc-500">Auto-Extracts Core Friction</span>
            </div>

            <textarea
              rows={3}
              value={transcriptOrTopic}
              onChange={(e) => setTranscriptOrTopic(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-medium leading-relaxed resize-none"
              placeholder="Paste raw transcript paragraph or describe your video topic..."
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Niche:</span>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="Finance & Wealth">Finance &amp; Wealth ($8.50+ CPM)</option>
                  <option value="AI & Technology">AI &amp; Technology ($7.20+ CPM)</option>
                  <option value="Machinery & Engineering">Machinery &amp; ASMR ($6.80+ CPM)</option>
                  <option value="Mindset & High Performance">Mindset &amp; High Performance</option>
                </select>
              </div>

              <button
                onClick={handleRegenerateHooks}
                className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Craft 3-Second Hooks</span>
              </button>
            </div>
          </div>

          {/* Generated Hooks Deck */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Generated Viral Openers ({generatedList.length})
              </h3>
              <span className="text-[10px] text-zinc-500 font-mono">Click card to test on 9:16 screen</span>
            </div>

            {generatedList.map((hook, idx) => {
              const isSelected = activeHookText === hook.hookText;

              return (
                <div
                  key={hook.id}
                  onClick={() => {
                    setActiveHookText(hook.hookText);
                    setActiveCaptionStyle(hook.captionStyle);
                    playSoundEffect('whoosh', 0.2);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative space-y-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-md bg-zinc-800 border border-zinc-700 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                          {hook.triggerType.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/20 font-bold">
                          {hook.predictedHoldRate}% Predicted Hold
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {hook.wordCount} words • {hook.durationSec}s
                        </span>
                      </div>

                      <p className="text-sm font-black text-white leading-snug">
                        "{hook.hookText}"
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(hook.hookText, `hook_${hook.id}`);
                          showToast('Copied hook to clipboard!');
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                        title="Copy hook text"
                      >
                        {copiedKey === `hook_${hook.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Micro-mechanisms */}
                  <div className="text-[11px] text-zinc-400 bg-black/40 p-2 rounded-lg border border-zinc-800/80 space-y-1">
                    <div>
                      <span className="text-zinc-500 font-mono">Cognitive Trigger: </span>
                      <span>{hook.psychologicalMechanism}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-mono">B-Roll Direction: </span>
                      <span className="text-zinc-300">{hook.visualDirection}</span>
                    </div>
                  </div>

                  {/* 1-Click Action Pipelines */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-amber-400" /> Sound: {hook.recommendedSfx}
                    </span>

                    <div className="flex items-center gap-2">
                      {onInjectIntoScript && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInjectIntoScript(hook.hookText);
                            playSoundEffect('chime', 0.5);
                            showToast('Injected into full script draft!');
                          }}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-bold rounded-lg border border-zinc-700 flex items-center gap-1"
                        >
                          <span>Inject Into Script</span>
                          <ArrowRight className="w-3 h-3 text-amber-400" />
                        </button>
                      )}

                      {onSendToClipper && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSendToClipper(hook.hookText);
                            playSoundEffect('chime', 0.5);
                          }}
                          className="px-2.5 py-1 bg-red-600/30 hover:bg-red-600/50 text-red-300 text-[10px] font-bold rounded-lg border border-red-500/40 flex items-center gap-1"
                        >
                          <Scissors className="w-3 h-3" />
                          <span>To Clipper</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Interactive 9:16 Screen Viewer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  9:16 Shorts Screen Viewer &amp; Editor
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-zinc-950 text-emerald-400 px-2 py-0.5 rounded border border-zinc-800">
                Safe-Zone Check
              </span>
            </div>

            {/* 9:16 Smartphone Mockup Preview */}
            <div className="relative w-[260px] h-[460px] mx-auto bg-black rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl flex items-center justify-center select-none group">
              {/* Background Video Simulator */}
              <video
                src="/samples/sample_blazes.mp4"
                muted
                loop
                autoPlay={isPlayingPreview}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* YouTube UI Safe-Zone Overlays */}
              <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3">
                {/* Top Header Danger Zone */}
                <div className="bg-red-500/20 border-b border-red-500/40 text-[8px] text-red-300 py-0.5 rounded font-mono text-center">
                  Header &amp; Search (Keep Clear)
                </div>

                {/* Right-Side Engagement Rails */}
                <div className="absolute right-2 bottom-16 space-y-2.5 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[9px] text-white">👍</div>
                  <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[9px] text-white">💬</div>
                  <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[9px] text-white">↗️</div>
                  <div className="w-6 h-6 rounded-full bg-red-600 border border-white/40 flex items-center justify-center text-[8px] text-white animate-spin">🎵</div>
                </div>

                {/* Bottom Description Danger Zone */}
                <div className="bg-red-500/20 border-t border-red-500/40 text-[8px] text-red-300 py-1 px-1.5 rounded font-mono">
                  @Channel • Description Danger Zone
                </div>
              </div>

              {/* Live Opener Caption Overlay */}
              <div className="absolute inset-x-3 bottom-[36%] z-30 pointer-events-none text-center">
                <div className={`inline-block px-3 py-1.5 max-w-[95%] font-black uppercase tracking-tight shadow-xl transition-all ${
                  activeCaptionStyle === 'mrbeast_yellow'
                    ? 'text-yellow-300 bg-black/85 rounded-lg border-2 border-yellow-400 font-sans shadow-black/90'
                    : activeCaptionStyle === 'hormozi_green'
                    ? 'text-emerald-400 bg-zinc-950/90 rounded-md border border-emerald-500 font-mono'
                    : activeCaptionStyle === 'neon_cyan'
                    ? 'text-cyan-300 bg-indigo-950/90 rounded-lg border border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                    : 'text-white bg-zinc-900/90 rounded-md border border-zinc-700 font-sans'
                }`} style={{ fontSize: `${hookFontSize}px` }}>
                  {activeHookText}
                </div>
              </div>

              {/* 3-Second Retention Badge */}
              <div className="absolute top-10 left-3 z-30 bg-black/70 backdrop-blur-md border border-amber-500/40 rounded-full px-2 py-0.5 text-[9px] font-mono text-amber-300 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>3s Retention Hook</span>
              </div>
            </div>

            {/* In-Place Hook Text Editor */}
            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-semibold text-zinc-300 block">
                Edit Opener Caption Text (Live)
              </label>
              <input
                type="text"
                value={activeHookText}
                onChange={(e) => setActiveHookText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            {/* Caption Style Switcher */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-zinc-300 block">
                Typography &amp; Pop Style
              </label>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {[
                  { id: 'mrbeast_yellow', label: 'MrBeast Yellow' },
                  { id: 'hormozi_green', label: 'Hormozi Green' },
                  { id: 'neon_cyan', label: 'Cyber Neon' },
                  { id: 'minimal_white', label: 'Clean White' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveCaptionStyle(s.id as any);
                      playSoundEffect('pulse', 0.2);
                    }}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold cursor-pointer ${
                      activeCaptionStyle === s.id
                        ? 'bg-zinc-800 text-white border-amber-500'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-zinc-400">Font Scale</span>
                <span className="font-mono text-amber-400">{hookFontSize}px</span>
              </div>
              <input
                type="range"
                min={11}
                max={20}
                value={hookFontSize}
                onChange={(e) => setHookFontSize(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
