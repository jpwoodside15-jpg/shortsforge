import React, { useState } from 'react';
import { 
  Globe, Languages, Sparkles, Copy, Check, Download, 
  Send, Calendar, Play, Pause, RefreshCw, Layers, 
  CheckCheck, Volume2, ShieldCheck, ArrowRight, 
  Sliders, ChevronRight, FileText, ExternalLink, Zap
} from 'lucide-react';
import { 
  SUPPORTED_24_LANGUAGES, LANGUAGE_PRESET_BUNDLES, 
  SupportedLanguageMeta 
} from '../data/languagesData';
import { LocalizedLanguageResult } from '../types';
import { playSoundEffect } from '../utils/soundEffects';

interface LanguageLocalizationModuleProps {
  onSendToUploader?: (data: { title: string; description: string; tags: string[] }) => void;
  onSendToPipeline?: (data: any) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialScript?: string;
}

export const LanguageLocalizationModule: React.FC<LanguageLocalizationModuleProps> = ({
  onSendToUploader,
  onSendToPipeline,
  initialTitle,
  initialDescription,
  initialScript,
}) => {
  // Input fields
  const [sourceTitle, setSourceTitle] = useState(initialTitle || 'How Top 1% Secretly Save $10,000 in Taxes (Legal Loophole)');
  const [sourceDescription, setSourceDescription] = useState(initialDescription || 'Stop overpaying taxes. In this 60s breakdown, learn the top legal deductions used by millionaires. Pinned link for the free worksheet.');
  const [sourceScript, setSourceScript] = useState(initialScript || 'Did you know the average citizen overpays 30% on taxes? Here are 3 legal loopholes the top 1% use that your accountant never told you. Number one: The Augusta Rule. Number two: Accelerated depreciation. Number three: Entity structuring.');
  const [sourceNiche, setSourceNiche] = useState('Finance & Wealth');

  // Selected language codes for batch localization
  const [selectedLangs, setSelectedLangs] = useState<string[]>([
    'es', 'ja', 'de', 'fr', 'pt', 'hi', 'ko', 'ar', 'it', 'zh-CN', 'nl', 'sv'
  ]);

  // Loading and results state
  const [isTranslating, setIsTranslating] = useState(false);
  const [resultsMap, setResultsMap] = useState<Record<string, LocalizedLanguageResult> | null>(null);
  const [activeLangCode, setActiveLangCode] = useState<string>('es');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Active view inside results: 'overview' | 'subtitles' | 'script'
  const [resultSubTab, setResultSubTab] = useState<'overview' | 'subtitles' | 'script'>('overview');

  // Audio speech preview state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Handle Preset Selection
  const handleSelectPreset = (presetLangs: string[]) => {
    setSelectedLangs(presetLangs);
    playSoundEffect('pulse', 0.2);
  };

  // Toggle single language selection
  const handleToggleLang = (code: string) => {
    if (selectedLangs.includes(code)) {
      if (selectedLangs.length > 1) {
        setSelectedLangs(selectedLangs.filter(c => c !== code));
      }
    } else {
      setSelectedLangs([...selectedLangs, code]);
    }
    playSoundEffect('pulse', 0.15);
  };

  const handleSelectAll = () => {
    setSelectedLangs(SUPPORTED_24_LANGUAGES.map(l => l.code));
    playSoundEffect('whoosh', 0.3);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playSoundEffect('pulse', 0.25);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Execute full localization
  const handleRunLocalization = async () => {
    setIsTranslating(true);
    playSoundEffect('whoosh', 0.4);
    try {
      const res = await fetch('/api/localization/translate-full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceTitle,
          sourceDescription,
          sourceScript,
          sourceNiche,
          targetLanguageCodes: selectedLangs,
        }),
      });
      const data = await res.json();
      if (data.results) {
        setResultsMap(data.results);
        const firstCode = selectedLangs.find(c => data.results[c]) || Object.keys(data.results)[0];
        if (firstCode) setActiveLangCode(firstCode);
        playSoundEffect('chime', 0.5);
      }
    } catch (err) {
      console.error('Localization error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  // Download single subtitle file (.srt or .vtt)
  const handleDownloadSubtitle = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    playSoundEffect('pulse', 0.2);
  };

  // Browser Text-To-Speech accent preview
  const handleToggleSpeech = (text: string, langCode: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 1.05;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    playSoundEffect('pulse', 0.2);
  };

  const activeResult = resultsMap ? resultsMap[activeLangCode] : null;

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 via-indigo-950/40 to-purple-950/30 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Globe className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Language Localization Engine
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  20+ Global Languages &amp; SRT
                </span>
              </h1>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              Automatically translate and culturally localize YouTube Shorts titles, scripts, hooks, and timestamped captions into 20+ major languages. Scale your channel into Tier-1 high CPM markets (Germany, Japan, France) and capture hundreds of millions of views across Latin America and Asia.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <div className="text-center px-3 py-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Global Reach</span>
              <span className="text-sm font-black text-indigo-400 font-mono">4.8B+</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-center px-3 py-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Ad Revenue Scale</span>
              <span className="text-sm font-black text-emerald-400 font-mono">Up to 4.2x</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-center px-3 py-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Subtitle Formats</span>
              <span className="text-sm font-black text-white font-mono">SRT / VTT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Input Hub & Preset Selector */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Source Short Metadata &amp; Script</h2>
          </div>

          {/* Sample Niche Fillers */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-zinc-500 text-[11px] mr-1">Load Preset:</span>
            {[
              {
                label: 'Finance',
                title: 'How Top 1% Secretly Save $10,000 in Taxes (Legal Loophole)',
                niche: 'Finance & Wealth',
                script: 'Did you know the average citizen overpays 30% in taxes? Here are 3 legal loopholes the top 1% use that your accountant never told you. Number one: The Augusta Rule. Number two: Accelerated depreciation. Number three: Entity structuring.'
              },
              {
                label: 'Kids 3D',
                title: 'The Brave Little Star Who Saved the Night Sky 🌟',
                niche: 'Kids Animations & Bedtime Fables',
                script: 'Once upon a time in a sleepy cloud forest, a tiny star fell into the whispering pond. All the nighttime creatures had lost their way until Barnaby the gentle owl showed him how to shine!'
              },
              {
                label: 'Cinema',
                title: 'Why No Movie In 2026 Can Match Inception’s Secret Ending 🎬',
                niche: 'Films & Cinema Recaps',
                script: 'Look closely at Cobb’s wedding ring throughout Inception. When he is awake in the real world, the ring is gone. But in every dream level, it appears on his finger. That changes the entire ending.'
              }
            ].map(preset => (
              <button
                key={preset.label}
                onClick={() => {
                  setSourceTitle(preset.title);
                  setSourceNiche(preset.niche);
                  setSourceScript(preset.script);
                  playSoundEffect('pulse', 0.2);
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">English / Source Title</label>
            <input
              type="text"
              value={sourceTitle}
              onChange={(e) => setSourceTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter your source English title..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Niche Category</label>
            <select
              value={sourceNiche}
              onChange={(e) => setSourceNiche(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Finance & Wealth">Finance &amp; Wealth ($14 - $28 CPM)</option>
              <option value="Kids Animations & Bedtime Fables">Kids 3D Animations ($5.50 - $8.20 RPM)</option>
              <option value="Films & Cinema Recaps">Films &amp; Cinema Recaps ($7.50 - $11.00 RPM)</option>
              <option value="Viral Clipper & Podcast Highlights">Viral Clipper &amp; Podcasts ($6.00 - $9.50 RPM)</option>
              <option value="SaaS & AI Productivity">SaaS &amp; AI Productivity ($12.00 - $18.50 RPM)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Description &amp; Pinned CTA</label>
            <textarea
              rows={2}
              value={sourceDescription}
              onChange={(e) => setSourceDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Full 45-60s Script (for Voiceover &amp; Captions)</label>
            <textarea
              rows={2}
              value={sourceScript}
              onChange={(e) => setSourceScript(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Preset Bundles Selector */}
        <div className="pt-2">
          <label className="text-xs font-bold text-zinc-400 block mb-2">Quick Target Language Bundles:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {LANGUAGE_PRESET_BUNDLES.map(bundle => (
              <button
                key={bundle.id}
                onClick={() => handleSelectPreset(bundle.languages)}
                className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-indigo-500/40 text-left transition cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                    {bundle.title}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {bundle.languages.length} Langs
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 line-clamp-1">{bundle.description}</p>
                <span className="text-[10px] font-bold text-emerald-400 mt-1.5 block">
                  {bundle.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 24-Language Selection Multi-Grid */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold text-zinc-300">
                Selected Target Languages ({selectedLangs.length} of 24)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAll}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer"
              >
                Select All 24
              </button>
              <span className="text-zinc-600">|</span>
              <button
                onClick={() => setSelectedLangs(['es', 'ja', 'de'])}
                className="text-[11px] text-zinc-400 hover:text-white cursor-pointer"
              >
                Reset to Top 3
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {SUPPORTED_24_LANGUAGES.map((lang: SupportedLanguageMeta) => {
              const active = selectedLangs.includes(lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => handleToggleLang(lang.code)}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-indigo-600/15 border-indigo-500/50 text-white shadow-sm'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="truncate">
                      <span className="text-xs font-bold block truncate">{lang.name}</span>
                      <span className="text-[10px] text-zinc-500 block truncate">{lang.speakersCount}</span>
                    </div>
                  </div>
                  {active ? (
                    <CheckCheck className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 ml-1" />
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-zinc-700 flex-shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Trigger */}
        <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            AI generates: Culturally adapted title, retention hook, localized voiceover script, and SRT captions.
          </div>

          <button
            onClick={handleRunLocalization}
            disabled={isTranslating || selectedLangs.length === 0}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-black text-xs bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
            <span>{isTranslating ? `Localizing into ${selectedLangs.length} Languages...` : `Translate & Localize (${selectedLangs.length} Languages)`}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LOCALIZATION RESULTS VIEW & SUBTITLE EXPLORER */}
      {/* ========================================================================= */}
      {resultsMap && (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-6">
          {/* Header & Language Navigation Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                Localized Global Packages
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {Object.keys(resultsMap).length} Ready
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Select any language to inspect native hooks, localized scripts, and export timestamped SRT / VTT subtitle files.
              </p>
            </div>

            {/* Language Selector Carousel / Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl">
              {Object.keys(resultsMap).map(code => {
                const res = resultsMap[code];
                const isSelected = activeLangCode === code;
                return (
                  <button
                    key={code}
                    onClick={() => {
                      setActiveLangCode(code);
                      playSoundEffect('pulse', 0.15);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>{res.flag}</span>
                    <span>{res.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Language Detailed Card */}
          {activeResult && (
            <div className="space-y-6">
              {/* Language Metrics Summary Strip */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeResult.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-white">{activeResult.name}</h4>
                      <span className="text-xs text-zinc-400 font-mono">({activeResult.nativeName})</span>
                    </div>
                    <span className="text-xs text-zinc-500">{activeResult.region} • {activeResult.speakersCount} Native Speakers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-medium">Estimated Ad RPM</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      {activeResult.cpmEstimate}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-medium">Reach Multiplier</span>
                    <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                      {activeResult.audienceMultiplier}
                    </span>
                  </div>

                  {/* Audio Accent Synthesizer Preview */}
                  <button
                    onClick={() => handleToggleSpeech(activeResult.voiceoverScript, activeResult.code)}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer text-xs font-bold"
                    title="Preview speech audio"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4 text-amber-400" />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                        <span>Hear Accent Preview</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Subtabs for Active Language: Overview, Subtitles (.SRT/.VTT), Script */}
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <button
                  onClick={() => { setResultSubTab('overview'); playSoundEffect('pulse', 0.15); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    resultSubTab === 'overview'
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-800/40'
                  }`}
                >
                  Metadata &amp; Hook
                </button>

                <button
                  onClick={() => { setResultSubTab('subtitles'); playSoundEffect('pulse', 0.15); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    resultSubTab === 'subtitles'
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-800/40'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Captions &amp; Subtitles (SRT / VTT)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                    {activeResult.cues?.length || 0} Cues
                  </span>
                </button>

                <button
                  onClick={() => { setResultSubTab('script'); playSoundEffect('pulse', 0.15); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    resultSubTab === 'script'
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-800/40'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Voiceover Script &amp; TTS Directives</span>
                </button>
              </div>

              {/* SUBTAB 1: METADATA & HOOK */}
              {resultSubTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Culturally Adapted Title */}
                    <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-300">Culturally Adapted Title</span>
                        <button
                          onClick={() => handleCopy(activeResult.title, 'active_title')}
                          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'active_title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'active_title' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-bold text-white bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 leading-snug">
                        {activeResult.title}
                      </p>
                    </div>

                    {/* 3-Second Retention Hook */}
                    <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300">3-Second Opening Hook</span>
                        <button
                          onClick={() => handleCopy(activeResult.hook, 'active_hook')}
                          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'active_hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'active_hook' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-zinc-200 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 italic">
                        "{activeResult.hook}"
                      </p>
                    </div>
                  </div>

                  {/* Localized Description & Pinned Comment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-300">Localized YouTube Description</span>
                        <button
                          onClick={() => handleCopy(activeResult.description, 'active_desc')}
                          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'active_desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'active_desc' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-zinc-300 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 whitespace-pre-line max-h-36 overflow-y-auto">
                        {activeResult.description}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-300">High-Conversion Pinned Comment</span>
                        <button
                          onClick={() => handleCopy(activeResult.pinnedComment, 'active_pinned')}
                          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'active_pinned' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'active_pinned' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-zinc-300 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                        {activeResult.pinnedComment}
                      </p>

                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-zinc-400 block mb-1">Localized Hashtags:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeResult.tags.map((tag, idx) => (
                            <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-indigo-400 border border-zinc-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: CAPTIONS & SUBTITLES (SRT / VTT) */}
              {resultSubTab === 'subtitles' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div>
                      <span className="text-xs font-bold text-white block">Timestamped Subtitle Files</span>
                      <span className="text-[11px] text-zinc-400">
                        Ready for 1-click import into YouTube Studio Subtitles or CapCut / Premiere Pro.
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadSubtitle(activeResult.captionsSrt, `${sourceTitle.slice(0, 30)}_${activeResult.code}.srt`)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .SRT</span>
                      </button>
                      <button
                        onClick={() => handleDownloadSubtitle(activeResult.captionsVtt, `${sourceTitle.slice(0, 30)}_${activeResult.code}.vtt`)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .VTT</span>
                      </button>
                      <button
                        onClick={() => handleCopy(activeResult.captionsSrt, 'all_srt')}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'all_srt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy SRT</span>
                      </button>
                    </div>
                  </div>

                  {/* Subtitle Cue List Table */}
                  <div className="overflow-hidden rounded-2xl border border-zinc-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-2.5 px-4 font-semibold w-16">#</th>
                          <th className="py-2.5 px-4 font-semibold w-48">Timestamp Range</th>
                          <th className="py-2.5 px-4 font-semibold">Localized Caption Text</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/40">
                        {activeResult.cues?.map((cue) => (
                          <tr key={cue.id} className="hover:bg-zinc-800/40 transition">
                            <td className="py-3 px-4 font-mono text-zinc-500">{cue.id}</td>
                            <td className="py-3 px-4 font-mono text-indigo-400 text-[11px] whitespace-nowrap">
                              {cue.startTime} → {cue.endTime}
                            </td>
                            <td className="py-3 px-4 text-zinc-200 font-medium">{cue.text}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUBTAB 3: VOICEOVER SCRIPT & TTS DIRECTIVES */}
              {resultSubTab === 'script' && (
                <div className="space-y-4">
                  {/* Voice Guidelines Banner */}
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Recommended TTS Voice</span>
                      <span className="text-white font-bold">{activeResult.recommendedTtsVoice}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Pacing / Speech Rate</span>
                      <span className="text-amber-400 font-mono font-bold">{activeResult.recommendedSpeechRate}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">CapCut / ElevenLabs Ready</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCheck className="w-3.5 h-3.5" /> 100% Native Cadence
                      </span>
                    </div>
                  </div>

                  {/* Full Script Text Area with Copy */}
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">Complete Localized Voiceover Script</span>
                      <button
                        onClick={() => handleCopy(activeResult.voiceoverScript, 'active_script')}
                        className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'active_script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'active_script' ? 'Copied' : 'Copy Full Script'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 whitespace-pre-line font-sans">
                      {activeResult.voiceoverScript}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Pipeline Bridge Actions */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-zinc-400">
                  Ready to deploy localized Short to YouTube?
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (onSendToUploader) {
                        onSendToUploader({
                          title: activeResult.title,
                          description: activeResult.description,
                          tags: activeResult.tags,
                        });
                      }
                      playSoundEffect('chime', 0.5);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition flex items-center gap-2 cursor-pointer shadow-md font-black"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send [{activeResult.name}] to YouTube Uploader</span>
                  </button>

                  {onSendToPipeline && (
                    <button
                      onClick={() => {
                        onSendToPipeline({
                          title: activeResult.title,
                          description: activeResult.description,
                          tags: activeResult.tags,
                          language: activeResult.name,
                        });
                        playSoundEffect('pulse', 0.2);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span>Queue in 7-Day Pipeline</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
