import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, ExternalLink, Flame, MessageSquare, 
  Hash, FileText, Smartphone, ArrowRight, Zap, Target, BookmarkCheck,
  AlertTriangle, HelpCircle, Eye, RefreshCw, Layers, Brain, ListChecks
} from 'lucide-react';
import { CopywriterResult } from '../types';
import { PsychologicalTriggerEngine } from './PsychologicalTriggerEngine';
import { BulkTitleOptimizer } from './BulkTitleOptimizer';

interface CopywriterTabProps {
  onSendToSimulator?: (title: string) => void;
}

export const CopywriterTab: React.FC<CopywriterTabProps> = ({ onSendToSimulator }) => {
  const [activeSubTab, setActiveSubTab] = useState<'psychological_engine' | 'ctr_copywriter' | 'bulk_title_optimizer'>('psychological_engine');
  const [topic, setTopic] = useState('Why 99% of people stay poor (and how to fix it)');
  const [scriptIntro, setScriptIntro] = useState('Hey guys! In this video today I wanted to talk about why most people fail in business and stay broke...');
  const [affiliateLink, setAffiliateLink] = useState('https://notion.so/join/freeproductivity');
  const [audience, setAudience] = useState('ambitious creators & side hustlers');
  const [tone, setTone] = useState<'high-energy' | 'curiosity' | 'controversial' | 'educational'>('curiosity');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CopywriterResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hooks, setHooks] = useState<any[] | null>(null);
  const [hookDiagnostic, setHookDiagnostic] = useState<any | null>(null);
  const [isOptimizingHooks, setIsOptimizingHooks] = useState(false);
  const [activeHookMode, setActiveHookMode] = useState<'both' | 'script-only'>('both');

  const samplePresets = [
    { 
      topic: "The 3-second dopamine rule that cures laziness", 
      intro: "Today I'm going to explain a neuroscience hack from Huberman about fixing your dopamine reset...",
      affiliate: "https://hubermanlab.com/tools", 
      tone: "curiosity" 
    },
    { 
      topic: "Why lowering your price ruins your business", 
      intro: "A lot of people ask me if they should discount their products to get more clients fast...",
      affiliate: "https://acquisition.com/books", 
      tone: "controversial" 
    },
    { 
      topic: "How to automate YouTube Shorts with free AI tools", 
      intro: "So I tested all the free AI video generators online to see if you can make money on YouTube...",
      affiliate: "https://elevenlabs.io/free-signup", 
      tone: "high-energy" 
    },
    { 
      topic: "Stop saving money in high-yield accounts in 2026", 
      intro: "If you have cash sitting in a bank account right now, you might want to reconsider what inflation is doing...",
      affiliate: "https://webull.com/free-stocks", 
      tone: "controversial" 
    }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleFetchHooks = async (introText: string) => {
    setIsOptimizingHooks(true);
    try {
      const res = await fetch('/api/hook-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          scriptIntro: introText || scriptIntro, 
          topicOrScript: topic, 
          niche: audience || 'General' 
        })
      });
      const data = await res.json();
      if (data?.hooks) {
        setHooks(data.hooks);
      }
      if (data?.diagnostic) {
        setHookDiagnostic(data.diagnostic);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsOptimizingHooks(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      // Fire both copy generation and hook optimizer in parallel
      const [copyRes, hookRes] = await Promise.all([
        fetch('/api/generate-copy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, affiliateLink, audience, tone })
        }),
        fetch('/api/hook-optimizer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            scriptIntro: scriptIntro || topic, 
            topicOrScript: topic, 
            niche: audience 
          })
        })
      ]);

      const copyData = await copyRes.json();
      const hookData = await hookRes.json();

      setResult(copyData);
      if (hookData?.hooks) {
        setHooks(hookData.hooks);
      }
      if (hookData?.diagnostic) {
        setHookDiagnostic(hookData.diagnostic);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFromEngine = (injectedScript: string, titleSuggestion?: string) => {
    setScriptIntro(injectedScript);
    if (titleSuggestion) {
      setTopic(titleSuggestion.replace(/#Shorts/gi, '').replace(/⚡/g, '').trim());
    }
    setActiveSubTab('ctr_copywriter');
    setTimeout(() => {
      handleGenerate();
    }, 150);
  };

  const copyFullUploadBundle = () => {
    if (!result) return;
    const bestTitle = result.titles?.[0]?.title || '';
    const bestHook = hooks?.[0]?.openingWords ? `OPENING 3s HOOK:\n"${hooks[0].openingWords}"\n\n` : '';
    const fullText = `=== YOUTUBE SHORTS UPLOAD BUNDLE ===\n\n${bestHook}TITLE:\n${bestTitle}\n\nDESCRIPTION:\n${result.description}\n\nTAGS:\n${result.hashtags?.join(' ')}\n\nPINNED COMMENT:\n${result.pinnedComment}`;
    handleCopy(fullText, 'full-bundle');
  };

  return (
    <div className="space-y-6">
      {/* Subtab Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/90 border border-zinc-800 p-2 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('psychological_engine')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'psychological_engine'
                ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Brain className="w-4 h-4 text-amber-300" />
            <span>Psychological Trigger Engine</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-amber-200 border border-amber-300/30">
              VIRAL AI
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('ctr_copywriter')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeSubTab === 'ctr_copywriter'
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Flame className="w-4 h-4 text-red-500" />
            <span>Mobile CTR Titles &amp; SEO Package</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('bulk_title_optimizer')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeSubTab === 'bulk_title_optimizer'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            <span>Bulk Title Optimizer</span>
          </button>
        </div>

        <div className="text-xs text-zinc-400 font-mono hidden sm:flex items-center gap-2 pr-2">
          <span>
            {activeSubTab === 'psychological_engine'
              ? 'Curiosity Gaps & Pacing Accelerants'
              : activeSubTab === 'bulk_title_optimizer'
                ? 'Batch Transcripts & Queue Metadata Sync'
                : 'Mobile Limits & Conversion Comments'}
          </span>
        </div>
      </div>

      {/* VIEW 1: PSYCHOLOGICAL TRIGGER ENGINE */}
      {activeSubTab === 'psychological_engine' && (
        <PsychologicalTriggerEngine 
          onApplyToCopywriter={handleApplyFromEngine}
          onSendToSimulator={onSendToSimulator}
        />
      )}

      {/* VIEW 3: BULK TITLE OPTIMIZER */}
      {activeSubTab === 'bulk_title_optimizer' && (
        <BulkTitleOptimizer onSendToSimulator={onSendToSimulator} />
      )}

      {/* VIEW 2: CTR TITLES & COPYWRITER */}
      {activeSubTab === 'ctr_copywriter' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/30 border border-red-500/20 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                    <Flame className="w-5 h-5 text-red-500" />
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">YouTube Copywriter &amp; Growth Hacker</h2>
                </div>
                <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
                  Engineered for mobile click-through rates. Generate 5 titles strictly under 60 characters, algorithmic SEO descriptions, and an organic, high-converting pinned comment for your affiliate link.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Powered by Gemini 3.8 Flash
                </span>
              </div>
            </div>
          </div>

          {/* Quick Trigger Engine Suggestion Banner */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <Brain className="w-4 h-4" />
              </span>
              <p className="text-xs text-zinc-300">
                Want to inject psychological curiosity loops and pacing accelerants into this draft first?
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('psychological_engine')}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Launch Psychological Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Input Form & Presets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" /> Input Video Parameters
              </h3>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center justify-between">
              <span>Short Clip Topic / Core Thesis <span className="text-red-400">*</span></span>
              <span className="text-[10px] text-zinc-500 font-mono">Algorithm Theme</span>
            </label>
            <textarea
              rows={2}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-500 placeholder-zinc-500 resize-none"
              placeholder="e.g. Why most people fail in entrepreneurship because of low pricing..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Script Intro to Optimize (First 5-10s)
              </span>
              <span className="text-[10px] text-amber-400/80 font-mono">Curiosity Gap Engine</span>
            </label>
            <textarea
              rows={3}
              value={scriptIntro}
              onChange={(e) => setScriptIntro(e.target.value)}
              className="w-full bg-zinc-950 border border-amber-500/40 focus:border-amber-400 rounded-xl p-3 text-xs text-white placeholder-zinc-500 resize-none font-mono"
              placeholder="Paste your current spoken script opening line here (e.g. 'Hey guys, in this video I will teach you...')"
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-[11px] text-zinc-400">
                AI analyzes retention leaks and crafts 3 curiosity-gap hooks.
              </p>
              <button
                type="button"
                onClick={() => handleFetchHooks(scriptIntro)}
                disabled={isOptimizingHooks || !scriptIntro.trim()}
                className="text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-1 rounded border border-amber-500/40 font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                {isOptimizingHooks ? 'Analyzing...' : 'Analyze Intro Only'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Affiliate / Promotion Link (Free Offer)
            </label>
            <input
              type="text"
              value={affiliateLink}
              onChange={(e) => setAffiliateLink(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-400"
              placeholder="e.g. https://your-free-tool-link.com"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Will be woven naturally into the high-retention pinned comment template.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Target Audience
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                placeholder="e.g. beginners, traders"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Hook Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
              >
                <option value="curiosity">High Curiosity</option>
                <option value="controversial">Controversial / Bold</option>
                <option value="high-energy">High Energy</option>
                <option value="educational">Authority Breakdown</option>
              </select>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-2">
              ⚡ Quick Presets to Test:
            </label>
            <div className="space-y-1.5">
              {samplePresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(p.topic);
                    setScriptIntro(p.intro);
                    setAffiliateLink(p.affiliate);
                    setTone(p.tone as any);
                  }}
                  className="w-full text-left text-xs bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors truncate block"
                >
                  &quot;{p.topic}&quot;
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating High-CTR Package...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Generate Click-Worthy Titles &amp; Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-5">
          {/* Always display Hook Optimizer if hooks exist or if user analyzed intro */}
          {hooks && (
            <div className="bg-zinc-900 border border-amber-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="p-1 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                      <Zap className="w-4 h-4" />
                    </span>
                    AI Hook Optimizer (3 High-Retention Curiosity Gap Variations)
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Engineered for high retention, curiosity gaps, and scroll-stopping tension under 12 spoken words.
                  </p>
                </div>
                <button
                  onClick={() => handleFetchHooks(scriptIntro || topic)}
                  disabled={isOptimizingHooks}
                  className="px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{isOptimizingHooks ? 'Re-optimizing...' : 'Regenerate Hooks'}</span>
                </button>
              </div>

              {/* Script Intro Retention Diagnostic Report */}
              {hookDiagnostic && (
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Script Intro Retention Diagnostic
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-zinc-900 px-2 py-0.5 rounded text-amber-300 border border-amber-500/20 font-bold">
                        Retention Power: {hookDiagnostic.retentionPowerScore || 44}/100
                      </span>
                      <span className="text-[10px] font-mono bg-zinc-900 px-2 py-0.5 rounded text-indigo-300 border border-indigo-500/20 font-bold">
                        Curiosity Gap: {hookDiagnostic.curiosityGapScore || 38}/100
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300">
                    <strong className="text-red-400">Retention Leak: </strong>
                    {hookDiagnostic.currentIntroFlaw}
                  </p>
                  <div className="text-[11px] text-emerald-400 bg-zinc-950/70 p-2 rounded border border-emerald-500/20 flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Fix Applied: </strong>{hookDiagnostic.fixRecommendation}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {hooks.map((h: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/90 hover:border-zinc-700 transition-all space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                          Variation #{idx + 1}: {h.hookType}
                        </span>
                        {h.curiosityGapType && (
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            🔍 {h.curiosityGapType}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-500">{h.durationSec}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Thumb-Stop: {h.stopRateScore}%
                      </span>
                    </div>

                    {/* Spoken Hook Sentence */}
                    <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 flex items-center justify-between gap-3">
                      <div className="text-sm font-black text-white italic tracking-tight">
                        &quot;{h.openingWords}&quot;
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {onSendToSimulator && (
                          <button
                            onClick={() => onSendToSimulator(h.openingWords)}
                            className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] rounded border border-zinc-700 flex items-center gap-1 transition-colors"
                            title="Test in 9:16 Safe-Zone Simulator"
                          >
                            <Smartphone className="w-3 h-3 text-red-400" />
                            <span>Preview</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleCopy(h.openingWords, `hook-${idx}`)}
                          className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 cursor-pointer"
                          title="Copy Hook"
                        >
                          {copiedKey === `hook-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Psychological Reason & Frame 1 Guidance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1">
                      <div className="bg-zinc-900/40 p-2 rounded border border-zinc-800/60">
                        <strong className="text-amber-400 block mb-0.5 font-mono text-[10px] uppercase">🧠 Curiosity Gap &amp; Brain Trigger:</strong>
                        {h.psychologyReason}
                      </div>
                      <div className="bg-zinc-900/40 p-2 rounded border border-zinc-800/60">
                        <strong className="text-indigo-400 block mb-0.5 font-mono text-[10px] uppercase">🎬 Frame 1 Visual Cue &amp; SFX:</strong>
                        {h.visualFrame1} <span className="text-zinc-500 font-mono font-semibold">({h.sfx})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && !isLoading && !hooks && (
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-14 h-14 bg-zinc-800/80 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                <Sparkles className="w-7 h-7 text-amber-400" />
              </div>
              <h4 className="text-base font-semibold text-white">Ready to Generate Viral Copy &amp; Hooks</h4>
              <p className="text-zinc-400 text-xs mt-1.5 max-w-md">
                Click &quot;Generate Click-Worthy Titles &amp; Copy&quot; to produce mobile titles (&lt;60 chars), algorithmic SEO descriptions, high-conversion affiliate comments, and 3 curiosity-gap hooks.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 border border-zinc-700 cursor-pointer"
                >
                  Run Full Package Generation <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleFetchHooks(scriptIntro)}
                  className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-2 border border-amber-500/40 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Analyze Hook Intro Only
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-12 h-12 border-3 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-semibold text-white">Analyzing Viral Psychology &amp; Curiosity Gaps...</p>
              <p className="text-xs text-zinc-400 mt-1">Measuring title lengths against YouTube mobile character limits.</p>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-5">
              {/* Action Toolbar */}
              <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                <span className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                  <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  Generated Viral Package &amp; Optimized Hooks
                </span>
                <button
                  onClick={copyFullUploadBundle}
                  className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'full-bundle' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Full Bundle!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Upload Bundle</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1. 5 Click-Worthy Titles under 60 chars */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">
                        1
                      </span>
                      5 Click-Worthy Titles (Strictly &lt; 60 Chars for Mobile)
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      YouTube cuts titles off at ~55-60 characters on mobile screens. These are pre-verified.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {result.titles?.map((t, idx) => {
                    const charCount = t.charCount || t.title.length;
                    const isPerfect = charCount <= 50;
                    return (
                      <div
                        key={idx}
                        className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-zinc-500">#{idx + 1}</span>
                            <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                              {t.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className={`font-mono px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              isPerfect 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {charCount}/60 chars ({isPerfect ? 'Optimal Mobile' : 'Near Limit'})
                            </span>
                            <span className="text-zinc-400 italic">Angle: {t.angle}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {onSendToSimulator && (
                            <button
                              onClick={() => onSendToSimulator(t.title)}
                              className="px-2.5 py-1 text-[11px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700 flex items-center gap-1 transition-colors"
                              title="Preview on 9:16 safe-zone screen"
                            >
                              <Smartphone className="w-3 h-3 text-red-400" />
                              <span className="hidden sm:inline">Preview</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleCopy(t.title, `title-${idx}`)}
                            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700 transition-colors"
                            title="Copy Title"
                          >
                            {copiedKey === `title-${idx}` ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. SEO Description + 3 Hashtags */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">
                      2
                    </span>
                    Algorithm SEO Description &amp; 3 Trending Hashtags
                  </h4>
                  <button
                    onClick={() => handleCopy(`${result.description}\n\n${result.hashtags?.join(' ')}`, 'desc')}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700"
                    title="Copy Description"
                  >
                    {copiedKey === 'desc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80 text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {result.description}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {result.hashtags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono font-medium flex items-center gap-1"
                    >
                      <Hash className="w-3 h-3 text-red-400" />
                      {tag.replace(/^#/, '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Pinned Comment Template (Subtle Affiliate Conversion) */}
              <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                        3
                      </span>
                      Compelling &quot;Pinned Comment&quot; Affiliate Template
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Subtly pushes clicks by sounding helpful rather than spammy.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(result.pinnedComment, 'pinned')}
                    className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    {copiedKey === 'pinned' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Comment</span>
                  </button>
                </div>

                <div className="bg-zinc-950 p-4 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 whitespace-pre-wrap leading-relaxed font-sans shadow-inner">
                  {result.pinnedComment}
                </div>

                <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">💡 Conversion Psychology:</span>
                  <span>
                    Pin this comment within 30 seconds of publishing. Never use words like &quot;CLICK MY AFFILIATE LINK!&quot;. Instead, state: &quot;For everyone asking where to get the free tool I used...&quot; This taps into social proof and customer service expectation.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</div>
  );
};
