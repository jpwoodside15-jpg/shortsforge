import React, { useState } from 'react';
import { 
  Zap, Sparkles, Brain, Flame, Target, ArrowRight, Check, Copy, 
  RotateCcw, Sliders, Volume2, Play, Pause, AlertTriangle, Eye, 
  ChevronRight, BookmarkCheck, Smartphone, Clock, Gauge, Compass, 
  Layers, FileText, Activity, ShieldCheck, Film, ExternalLink
} from 'lucide-react';
import { 
  ViralScriptReference, 
  PsychologicalTriggerEngineResult, 
  InjectedCuriosityGap, 
  InjectedPacingAccelerant 
} from '../types';
import { PRESET_VIRAL_SCRIPTS, STARTER_DRAFTS } from '../data/viralScriptsLibrary';

interface PsychologicalTriggerEngineProps {
  onApplyToCopywriter?: (injectedScript: string, titleSuggestion?: string) => void;
  onSendToSimulator?: (scriptOrTitle: string) => void;
}

export const PsychologicalTriggerEngine: React.FC<PsychologicalTriggerEngineProps> = ({
  onApplyToCopywriter,
  onSendToSimulator
}) => {
  // Selection states
  const [selectedScriptId, setSelectedScriptId] = useState<string>(PRESET_VIRAL_SCRIPTS[0].id);
  const [customViralScript, setCustomViralScript] = useState<string>('');
  const [showCustomScriptModal, setShowCustomScriptModal] = useState<boolean>(false);
  const [showViralXRay, setShowViralXRay] = useState<boolean>(false);

  // User draft inputs
  const [userDraft, setUserDraft] = useState<string>(STARTER_DRAFTS[0].draft);
  const [draftTopic, setDraftTopic] = useState<string>(STARTER_DRAFTS[0].topic);
  const [niche, setNiche] = useState<string>(STARTER_DRAFTS[0].niche);
  const [targetPacing, setTargetPacing] = useState<'Dopamine Staccato (Shorts 35s)' | 'Ultra-High Velocity (Shorts 30s)' | 'Narrative Suspense (Shorts 50s)'>('Dopamine Staccato (Shorts 35s)');
  const [curiosityIntensity, setCuriosityIntensity] = useState<'Extreme' | 'Balanced' | 'Subtle'>('Extreme');

  // Generation state
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [injectionResult, setInjectionResult] = useState<PsychologicalTriggerEngineResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeDiffTab, setActiveDiffTab] = useState<'annotated' | 'side-by-side' | 'raw-voiceover'>('annotated');
  
  // Audio playback simulator
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [teleprompterOpen, setTeleprompterOpen] = useState<boolean>(false);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState<number>(3);

  const activeReference = PRESET_VIRAL_SCRIPTS.find(s => s.id === selectedScriptId) || PRESET_VIRAL_SCRIPTS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleInject = async () => {
    if (!userDraft.trim()) return;
    setIsInjecting(true);
    try {
      const res = await fetch('/api/psychological-trigger-engine/inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDraft,
          referenceScriptId: selectedScriptId,
          customReferenceScript: customViralScript,
          niche,
          targetPacing,
          curiosityIntensity
        })
      });
      const data = await res.json();
      setInjectionResult(data);
    } catch (err) {
      console.error('Trigger engine injection failed:', err);
    } finally {
      setIsInjecting(false);
    }
  };

  const loadStarterPreset = (presetIndex: number) => {
    const p = STARTER_DRAFTS[presetIndex];
    if (!p) return;
    setUserDraft(p.draft);
    setDraftTopic(p.topic);
    setNiche(p.niche);
    setTargetPacing(p.targetPacing as any);
    setCuriosityIntensity(p.curiosityIntensity as any);
  };

  const toggleCadenceAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    // Simple audio tone tick simulation using web audio api
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        let beatCount = 0;
        const bpm = injectionResult?.recommendedAudioCadence?.tempoBpm || 140;
        const intervalMs = (60 / bpm) * 1000;
        
        const intervalId = setInterval(() => {
          if (beatCount >= 16) {
            clearInterval(intervalId);
            setIsPlayingAudio(false);
            return;
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = beatCount % 4 === 0 ? 320 : 220;
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.start();
          osc.stop(ctx.currentTime + 0.09);
          beatCount++;
        }, intervalMs);
      }
    } catch (e) {
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Engine Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-red-950/40 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shadow-inner">
                <Brain className="w-5 h-5 text-amber-400" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white tracking-tight">Psychological Trigger Engine</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    AI RETENTION LAB
                  </span>
                </div>
                <p className="text-zinc-400 text-xs mt-0.5 max-w-2xl">
                  Deconstructs high-performing viral scripts across neuro-triggers, then injects narrative <strong className="text-amber-300">Curiosity Gaps</strong> and <strong className="text-red-300">Pacing Accelerants</strong> into your draft to systematically stop thumb-swipes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Gemini 3.8 Flash Active
            </span>
          </div>
        </div>
      </div>

      {/* Section 1: Viral Script Reference Benchmark */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              Step 1: Select Viral Reference Script to Deconstruct
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Choose an algorithmic reference model. The engine will extract its cognitive triggers and pacing curves.
            </p>
          </div>
          <button
            onClick={() => setShowViralXRay(!showViralXRay)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>{showViralXRay ? 'Hide Psychology X-Ray' : 'View Psychology X-Ray'}</span>
          </button>
        </div>

        {/* Viral Script Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {PRESET_VIRAL_SCRIPTS.map((script) => {
            const isSelected = selectedScriptId === script.id;
            return (
              <div
                key={script.id}
                onClick={() => setSelectedScriptId(script.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-amber-950/20 border-amber-500/70 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/40' 
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 truncate">
                      {script.creator}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">
                      {script.views}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white line-clamp-2">
                    {script.title}
                  </h5>
                  <div className="text-[10px] text-zinc-400 font-medium">
                    {script.niche}
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {script.retentionRate}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-amber-500 text-black font-black' : 'text-zinc-500'
                  }`}>
                    {isSelected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Viral Script Psychology X-Ray Drawer */}
        {showViralXRay && activeReference && (
          <div className="bg-zinc-950 p-4 rounded-xl border border-amber-500/30 space-y-3 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeReference.creator} X-RAY
                </span>
                <span className="text-xs font-bold text-white">{activeReference.title}</span>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                Trigger: {activeReference.primaryPsychologicalTrigger}
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
              <strong className="text-amber-400 font-mono text-[11px] uppercase block mb-1">🧠 Neuroscience Anchor:</strong>
              {activeReference.neuroscienceAnchor}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
                  <Target className="w-3.5 h-3.5" /> Curiosity Gaps In Reference:
                </span>
                {activeReference.curiosityGapsUsed.map((g, idx) => (
                  <div key={idx} className="bg-zinc-950 p-2 rounded border border-zinc-800/80 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-200 text-[11px]">{g.loopName}</span>
                      <span className="text-[10px] font-mono text-zinc-500">{g.timestampOrLine}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{g.description}</p>
                    <p className="text-[10px] text-amber-300/80 italic font-mono">Effect: {g.whyItRetains}</p>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-red-400 flex items-center gap-1.5 uppercase font-mono">
                  <Activity className="w-3.5 h-3.5" /> Pacing Accelerants In Reference:
                </span>
                {activeReference.pacingAccelerantsUsed.map((p, idx) => (
                  <div key={idx} className="bg-zinc-950 p-2 rounded border border-zinc-800/80 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-200 text-[11px]">{p.technique}</span>
                      <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-1 rounded">{p.cadenceBpm} BPM</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{p.description}</p>
                    <p className="text-[10px] text-zinc-300 font-mono bg-zinc-900 px-1.5 py-0.5 rounded">
                      &quot;{p.staccatoPhrase}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Full Reference Script:</span>
              <p className="text-xs text-zinc-300 font-mono italic whitespace-pre-wrap leading-relaxed">
                &quot;{activeReference.fullScript}&quot;
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: User Draft & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              Step 2: User Script Draft &amp; Injection Rules
            </h4>
          </div>

          {/* Quick Starter Presets */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 uppercase font-mono">
              ⚡ Load Quick Testing Draft:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {STARTER_DRAFTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => loadStarterPreset(idx)}
                  className="px-2 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white rounded-lg transition-colors truncate text-left cursor-pointer"
                >
                  {p.niche.split('&')[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Topic / Core Argument
            </label>
            <input
              type="text"
              value={draftTopic}
              onChange={(e) => setDraftTopic(e.target.value)}
              placeholder="e.g. Stop saving money in bank accounts in 2026..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                Your Current Raw Script Draft
              </label>
              <span className="text-[10px] font-mono text-zinc-500">
                {userDraft.split(/\s+/).filter(Boolean).length} words • ~{Math.round(userDraft.split(/\s+/).filter(Boolean).length / 2.3)}s
              </span>
            </div>
            <textarea
              rows={6}
              value={userDraft}
              onChange={(e) => setUserDraft(e.target.value)}
              placeholder="Paste your unpolished script or spoken draft here..."
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-xl p-3 text-xs text-white placeholder-zinc-500 resize-none font-sans leading-relaxed"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              The engine preserves your core thesis while injecting curiosity gaps &amp; pacing spikes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Target Pacing Curve
              </label>
              <select
                value={targetPacing}
                onChange={(e) => setTargetPacing(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Dopamine Staccato (Shorts 35s)">Dopamine Staccato (35s)</option>
                <option value="Ultra-High Velocity (Shorts 30s)">Ultra-High Velocity (30s)</option>
                <option value="Narrative Suspense (Shorts 50s)">Narrative Suspense (50s)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Curiosity Gap Depth
              </label>
              <select
                value={curiosityIntensity}
                onChange={(e) => setCuriosityIntensity(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Extreme">Extreme (Loewenstein Gap)</option>
                <option value="Balanced">Balanced Open Loops</option>
                <option value="Subtle">Subtle Intrigue</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleInject}
            disabled={isInjecting || !userDraft.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 hover:from-amber-500 hover:to-red-500 text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            {isInjecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deconstructing &amp; Injecting Neuro-Triggers...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>Inject Curiosity Gaps &amp; Pacing Accelerants</span>
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-7 space-y-5">
          {!injectionResult && !isInjecting && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-4 text-amber-400">
                <Brain className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Psychological Trigger Injection Ready</h4>
              <p className="text-zinc-400 text-xs mt-1.5 max-w-md leading-relaxed">
                Click &quot;Inject Curiosity Gaps &amp; Pacing Accelerants&quot; to restructure your draft with high-retention narrative gaps, staccato syllables, and speed-surge annotations based on {activeReference.creator}&apos;s formula.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  🎯 Zero-Drop Retention
                </span>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  ⚡ Staccato WPM Surges
                </span>
              </div>
            </div>
          )}

          {isInjecting && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[420px] space-y-3">
              <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-white">Synthesizing Cognitive Open Loops...</p>
              <p className="text-xs text-zinc-400 max-w-sm">
                Measuring syllable density, inserting George Loewenstein information voids, and calibrating words-per-minute pacing.
              </p>
            </div>
          )}

          {injectionResult && !isInjecting && (
            <div className="space-y-5">
              {/* Telemetry HUD */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3 mb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                      Neural Retention Telemetry
                    </span>
                    <h5 className="text-sm font-black text-white">
                      Algorithmic Hold Comparison (Draft vs Injected)
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                      +{injectionResult.optimizedDraftStats.predictedRetentionLiftPercent}% Retention Lift
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-400">Retention Score</div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-lg font-black text-emerald-400">
                        {injectionResult.optimizedDraftStats.overallRetentionProbability}/100
                      </span>
                      <span className="text-[10px] text-zinc-500 line-through">
                        {injectionResult.originalDraftStats.overallRetentionProbability}
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-400">Curiosity Depth</div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-lg font-black text-amber-400">
                        {injectionResult.optimizedDraftStats.curiosityScore}/100
                      </span>
                      <span className="text-[10px] text-zinc-500 line-through">
                        {injectionResult.originalDraftStats.curiosityScore}
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-400">Pacing Cadence</div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-lg font-black text-indigo-400">
                        {injectionResult.optimizedDraftStats.wpm} WPM
                      </span>
                      <span className="text-[10px] text-zinc-500 line-through">
                        {injectionResult.originalDraftStats.wpm} WPM
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-400">Thumb-Stop Rate</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-lg font-black text-white">
                        {injectionResult.optimizedDraftStats.predicted3sThumbStopRate}%
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">First 3s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Injected Script View Tabs */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-zinc-950/80 p-3 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                    <button
                      onClick={() => setActiveDiffTab('annotated')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        activeDiffTab === 'annotated'
                          ? 'bg-amber-500 text-black'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Annotated Flow
                    </button>
                    <button
                      onClick={() => setActiveDiffTab('side-by-side')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        activeDiffTab === 'side-by-side'
                          ? 'bg-amber-500 text-black'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Side-by-Side Diff
                    </button>
                    <button
                      onClick={() => setActiveDiffTab('raw-voiceover')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        activeDiffTab === 'raw-voiceover'
                          ? 'bg-amber-500 text-black'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Raw Spoken Script
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleCadenceAudio}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isPlayingAudio 
                          ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                      }`}
                      title="Simulate spoken cadence with rhythm metronome"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingAudio ? 'Stop Cadence' : `${injectionResult.recommendedAudioCadence?.tempoBpm || 142} BPM Metronome`}</span>
                    </button>

                    <button
                      onClick={() => setTeleprompterOpen(true)}
                      className="px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Open teleprompter mode"
                    >
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span>Teleprompter</span>
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  {/* TAB 1: ANNOTATED FLOW */}
                  {activeDiffTab === 'annotated' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                        <span className="font-mono text-[11px]">
                          ⚡ Injected Script with Timing &amp; Psychological Cues
                        </span>
                        <button
                          onClick={() => handleCopy(injectionResult.optimizedScriptFullText, 'injected-full')}
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                        >
                          {copiedKey === 'injected-full' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'injected-full' ? 'Copied!' : 'Copy Script'}</span>
                        </button>
                      </div>

                      <div className="space-y-3 pt-2">
                        {injectionResult.annotatedScriptDiff?.map((seg, idx) => {
                          const isCuriosity = seg.type === 'curiosity_gap';
                          const isPacing = seg.type === 'pacing_accelerant';
                          const isClimax = seg.type === 'hook_climax';

                          return (
                            <div
                              key={idx}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isCuriosity 
                                  ? 'bg-amber-950/25 border-amber-500/40 text-amber-100' 
                                  : isPacing 
                                  ? 'bg-red-950/20 border-red-500/40 text-red-100'
                                  : isClimax 
                                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                                  : 'bg-zinc-950 border-zinc-800 text-zinc-200'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <div className="flex items-center gap-2">
                                  {isCuriosity && (
                                    <span className="text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                                      🔍 CURIOSITY GAP
                                    </span>
                                  )}
                                  {isPacing && (
                                    <span className="text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                                      ⚡ PACING ACCELERANT
                                    </span>
                                  )}
                                  {isClimax && (
                                    <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                                      🎯 CLIMAX &amp; RETENTION LOOP
                                    </span>
                                  )}
                                  {seg.secondMarker !== undefined && (
                                    <span className="text-[10px] font-mono text-zinc-400">
                                      ⏱ {seg.secondMarker}s
                                    </span>
                                  )}
                                </div>

                                <button
                                  onClick={() => handleCopy(seg.text, `seg-${idx}`)}
                                  className="text-zinc-500 hover:text-zinc-300 p-1"
                                >
                                  {copiedKey === `seg-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>

                              <p className="text-sm font-semibold leading-relaxed">
                                {seg.text}
                              </p>

                              {seg.annotation && (
                                <p className="text-[11px] text-zinc-400 mt-2 pt-2 border-t border-zinc-800/80 font-mono italic">
                                  💡 {seg.annotation}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SIDE-BY-SIDE DIFF */}
                  {activeDiffTab === 'side-by-side' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                          <span className="font-bold text-zinc-300">Original Unpolished Draft</span>
                          <span className="font-mono text-[10px]">{injectionResult.originalDraftStats.wordCount} words</span>
                        </div>
                        <p className="text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed font-sans">
                          {userDraft}
                        </p>
                      </div>

                      <div className="bg-amber-950/15 p-4 rounded-xl border border-amber-500/40 space-y-2">
                        <div className="flex items-center justify-between text-xs text-amber-300 border-b border-amber-500/30 pb-2">
                          <span className="font-bold">Injected High-Retention Script</span>
                          <span className="font-mono text-[10px]">{injectionResult.optimizedDraftStats.wordCount} words</span>
                        </div>
                        <p className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
                          {injectionResult.optimizedScriptFullText}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: RAW SPOKEN SCRIPT */}
                  {activeDiffTab === 'raw-voiceover' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>Clean Spoken Text (All brackets &amp; cues stripped for voice recording):</span>
                        <button
                          onClick={() => {
                            const cleanText = injectionResult.optimizedScriptFullText
                              .replace(/\[CURIOSITY GAP:.*?\]/gi, '')
                              .replace(/⚡\s*\[PACING ACCELERANT:.*?\]/gi, '')
                              .replace(/⏸\s*\[.*?\]/gi, '')
                              .replace(/\n{2,}/g, '\n\n')
                              .trim();
                            handleCopy(cleanText, 'clean-raw');
                          }}
                          className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded border border-amber-500/40 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'clean-raw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy Voiceover Text</span>
                        </button>
                      </div>

                      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm text-zinc-100 font-mono whitespace-pre-wrap leading-relaxed">
                        {injectionResult.optimizedScriptFullText
                          .replace(/\[CURIOSITY GAP:.*?\]/gi, '')
                          .replace(/⚡\s*\[PACING ACCELERANT:.*?\]/gi, '')
                          .replace(/⏸\s*\[.*?\]/gi, '')
                          .replace(/\n{2,}/g, '\n\n')
                          .trim()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Injected Gaps & Accelerants Detail Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Curiosity Gaps List */}
                <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase font-mono">
                    <Target className="w-4 h-4 text-amber-400" />
                    Injected Narrative Curiosity Gaps ({injectionResult.injectedCuriosityGaps?.length || 0})
                  </h5>
                  <div className="space-y-2.5">
                    {injectionResult.injectedCuriosityGaps?.map((gap, idx) => (
                      <div key={idx} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{gap.name}</span>
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {gap.marker}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans">
                          {gap.psychologicalMechanism}
                        </p>
                        <div className="text-[10px] font-mono text-emerald-400 pt-1">
                          ⚡ {gap.retentionImpact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pacing Accelerants List */}
                <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-bold text-red-300 flex items-center gap-1.5 uppercase font-mono">
                    <Zap className="w-4 h-4 text-red-400" />
                    Injected Pacing Accelerants ({injectionResult.injectedPacingAccelerants?.length || 0})
                  </h5>
                  <div className="space-y-2.5">
                    {injectionResult.injectedPacingAccelerants?.map((pac, idx) => (
                      <div key={idx} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{pac.technique}</span>
                          <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                            {pac.acceleratedWpm} WPM
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans">
                          {pac.cadenceDescription}
                        </p>
                        <div className="text-[10px] font-mono text-indigo-300 pt-1 flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-indigo-400" />
                          <span>Sound: {pac.audioCues}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audio Design & Sound FX Roadmap */}
              {injectionResult.recommendedAudioCadence && (
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      Director Audio Cadence &amp; Sound Design Roadmap
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Tone: {injectionResult.recommendedAudioCadence.voiceoverTone}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {injectionResult.recommendedAudioCadence.soundEffects?.map((sfx, idx) => (
                      <div key={idx} className="bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800/80 text-xs text-zinc-300 font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{sfx}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Bar: 1-Click Apply to Copywriter & Export */}
              <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-black text-white flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Ready for Algorithmic Production
                  </h5>
                  <p className="text-[11px] text-zinc-400">
                    Apply this script directly to title generation or simulate on a vertical 9:16 screen.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {onSendToSimulator && (
                    <button
                      onClick={() => onSendToSimulator(injectionResult.oneClickShortsPackage.title)}
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-red-400" />
                      <span>9:16 Safe-Zone</span>
                    </button>
                  )}

                  {onApplyToCopywriter && (
                    <button
                      onClick={() => onApplyToCopywriter(
                        injectionResult.optimizedScriptFullText, 
                        injectionResult.oneClickShortsPackage.title
                      )}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>Apply to Titles &amp; SEO Package</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Teleprompter Modal */}
      {teleprompterOpen && injectionResult && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 sm:p-12 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                <Film className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-white">Full-Screen Mobile Teleprompter</h3>
                <p className="text-xs text-zinc-400">Position your smartphone camera directly above this display for eye-contact recording.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-mono">Speed:</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={teleprompterSpeed}
                  onChange={(e) => setTeleprompterSpeed(parseInt(e.target.value))}
                  className="w-24 accent-amber-500"
                />
              </div>
              <button
                onClick={() => setTeleprompterOpen(false)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold"
              >
                Close (ESC)
              </button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full flex-1 overflow-y-auto py-10 space-y-6 text-center select-none">
            <div className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight">
              {injectionResult.optimizedScriptFullText
                .replace(/\[CURIOSITY GAP:.*?\]/gi, '')
                .replace(/⚡\s*\[PACING ACCELERANT:.*?\]/gi, '')
                .replace(/⏸\s*\[.*?\]/gi, '')
                .split('\n')
                .filter(Boolean)
                .map((line, idx) => (
                  <p key={idx} className="my-5 hover:text-amber-300 transition-colors">
                    {line}
                  </p>
                ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full border-t border-zinc-800 pt-4 flex items-center justify-between text-xs text-zinc-500">
            <span>Target Duration: ~{injectionResult.optimizedDraftStats.estimatedDurationSec}s</span>
            <span>Target WPM: {injectionResult.optimizedDraftStats.wpm} words/min</span>
            <button
              onClick={() => handleCopy(injectionResult.optimizedScriptFullText, 'teleprompter')}
              className="text-amber-400 hover:underline"
            >
              {copiedKey === 'teleprompter' ? 'Copied to clipboard' : 'Copy Full Script'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
