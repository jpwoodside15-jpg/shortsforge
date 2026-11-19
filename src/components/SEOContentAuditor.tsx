import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Copy, Check, 
  Search, ShieldCheck, Flame, ExternalLink, RefreshCw, BarChart3,
  Sliders, Wand2, Target, CheckCheck, ChevronRight, Zap
} from 'lucide-react';
import { SeoAuditResult, SeoImprovementAction, CompetitorBenchmarkItem } from '../types';

interface SEOContentAuditorProps {
  initialTitle?: string;
  initialDescription?: string;
  initialNiche?: string;
  initialTags?: string[];
  onSendToUploader?: (data: { title: string; description: string; tags: string[] }) => void;
  onSendToPipeline?: (data: { title: string; description: string; tags: string[] }) => void;
}

export const SEOContentAuditor: React.FC<SEOContentAuditorProps> = ({
  initialTitle = 'Why 99% Of People Fail With AI Automation',
  initialDescription = 'Here is the step by step framework to scale your workflow.\n\n#shorts #ai #automation\n📌 Free tools in pinned comment!',
  initialNiche = 'AI Automation & SaaS Tools',
  initialTags = ['shorts', 'ai', 'automation', 'productivity'],
  onSendToUploader,
  onSendToPipeline
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [targetKeyword, setTargetKeyword] = useState('AI Automation');
  const [niche, setNiche] = useState(initialNiche);
  const [tagsInput, setTagsInput] = useState(initialTags.join(', '));
  
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<SeoAuditResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [appliedFixes, setAppliedFixes] = useState<string[]>([]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runAudit = async () => {
    if (!title.trim()) return;
    setIsLoading(true);
    try {
      const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch('/api/seo-content-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          targetKeyword,
          tags: parsedTags,
          niche
        })
      });
      const data = await res.json();
      setAuditResult(data);
    } catch (e) {
      console.error('Audit run error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const applyOneClickFix = (suggestion: SeoImprovementAction) => {
    if (suggestion.fixTitle) {
      setTitle(suggestion.fixTitle);
    }
    if (suggestion.fixDescription) {
      setDescription(suggestion.fixDescription);
    }
    if (suggestion.fixTags && suggestion.fixTags.length > 0) {
      setTagsInput(suggestion.fixTags.join(', '));
    }
    setAppliedFixes(prev => [...prev, suggestion.id]);
  };

  const applyAllOptimizations = () => {
    if (!auditResult) return;
    if (auditResult.optimizedTitle) setTitle(auditResult.optimizedTitle);
    if (auditResult.optimizedDescription) setDescription(auditResult.optimizedDescription);
    if (auditResult.recommendedTags && auditResult.recommendedTags.length > 0) {
      setTagsInput(auditResult.recommendedTags.join(', '));
    }
    setAppliedFixes(auditResult.actionableSuggestions.map(s => s.id));
  };

  const titleLength = title.length;
  const isMobileSafe = titleLength <= 52;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-indigo-950/40 border border-emerald-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-600/30">
                <Target className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                SEO Content Auditor &amp; Mobile Safe-Zone Analyzer
              </h3>
            </div>
            <p className="text-zinc-400 text-xs mt-1.5 max-w-2xl leading-relaxed">
              Audits your user-written Shorts title, description, and hashtags against top-performing search result metadata to predict 
              algorithmic shelf velocity, prevent phone screen title truncation, and deliver actionable 1-click fixes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full font-mono font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              Real-Time Search Benchmarks
            </span>
          </div>
        </div>
      </div>

      {/* Editor & Metadata Input Form */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <span>YouTube Short Title</span>
                <span className="text-[10px] text-zinc-500 font-mono">(Optimal: 35-52 characters)</span>
              </label>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                isMobileSafe ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {titleLength} / 52 chars {isMobileSafe ? '✓ Safe' : '⚠ Truncation Risk'}
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
              placeholder="e.g. The 3-Second Truth About AI (Nobody Knows This)"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Target Search Keyword</label>
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. AI Tools, Passive Income"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Description, Chapters &amp; Monetization CTA</span>
              <span className="text-[10px] text-zinc-500 font-mono">{description.length} chars</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              placeholder="Explain the Short with keywords, #shorts tag, and pinned affiliate/resource link..."
            />
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Channel Niche</label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Search Tags (Comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="shorts, viral, niche"
              />
            </div>
          </div>
        </div>

        {/* Audit Trigger Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Auditing against 10M+ Shorts view indexing patterns</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runAudit}
              disabled={isLoading || !title.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 text-xs"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Auditing Metadata...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Run Live SEO Content Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Audit Output Results */}
      {auditResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Score Summary Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Score Circle / Badge */}
                <div className="relative w-24 h-24 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center p-2 text-center shadow-inner">
                  <span className={`text-3xl font-black ${
                    auditResult.overallScore >= 85 ? 'text-emerald-400' :
                    auditResult.overallScore >= 70 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {auditResult.overallScore}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">SEO Score</span>
                  <span className={`absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    auditResult.scoreGrade === 'A+' || auditResult.scoreGrade === 'A'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    Grade {auditResult.scoreGrade}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Algorithm Discovery &amp; Search Shelf Readiness</span>
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xl">
                    {auditResult.overallScore >= 85 
                      ? 'Your metadata is primed for high search CTR and YouTube Shorts recommendation shelf ingestion.'
                      : 'Improvements are detected. Apply the actionable fixes below to maximize initial 24h impression velocity.'}
                  </p>
                  <p className="text-[11px] text-amber-300/90 font-medium">
                    ⚡ {auditResult.retentionHookRecommendation}
                  </p>
                </div>
              </div>

              {/* 1-Click Fix All & Export Action */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={applyAllOptimizations}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>1-Click Apply 98-Score Fixes</span>
                </button>

                {onSendToUploader && (
                  <button
                    onClick={() => {
                      onSendToUploader({
                        title,
                        description,
                        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
                      });
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                  >
                    <span>Send to Uploader</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Metric Score Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-800">
              {Object.entries(auditResult.metrics).map(([key, metric]) => (
                <div key={key} className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-medium truncate">{metric.label}</span>
                    <span className={`text-xs font-bold font-mono ${
                      metric.score >= 80 ? 'text-emerald-400' : metric.score >= 65 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {metric.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        metric.score >= 80 ? 'bg-emerald-500' : metric.score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight pt-0.5 line-clamp-2">
                    {metric.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Improvement Suggestions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Actionable Algorithmic Improvements</span>
                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
                  {auditResult.actionableSuggestions.length} Recommendations
                </span>
              </h4>
            </div>

            <div className="space-y-3">
              {auditResult.actionableSuggestions.map((suggestion) => {
                const isApplied = appliedFixes.includes(suggestion.id);
                return (
                  <div
                    key={suggestion.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isApplied 
                        ? 'bg-emerald-950/20 border-emerald-500/40' 
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            suggestion.impact === 'Critical' 
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {suggestion.impact} Impact
                          </span>
                          <span className="text-xs font-bold text-white">{suggestion.category}</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-medium">{suggestion.issue}</p>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{suggestion.remedy}</p>
                      </div>

                      <button
                        onClick={() => applyOneClickFix(suggestion)}
                        disabled={isApplied}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                          isApplied
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 cursor-pointer'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Applied</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>Apply Fix</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top-Performing Search Result Benchmarks */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <span>Top-Performing Competitor Benchmarks in &quot;{niche}&quot;</span>
              </h4>
              <span className="text-[10px] text-zinc-400 font-mono">Live Search Volume Analysis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {auditResult.topRankingCompetitors.map((comp) => (
                <div key={comp.rank} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                        Rank #{comp.rank}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">{comp.views}</span>
                    </div>

                    <h5 className="text-xs font-bold text-white leading-snug line-clamp-2">
                      &quot;{comp.title}&quot;
                    </h5>
                    <p className="text-[10px] text-zinc-500 font-mono">{comp.channel} • {comp.uploadAge}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-zinc-900 text-[11px]">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">CTR Hook Trigger:</span>
                      <span className="text-zinc-300 font-medium">{comp.ctrHookTrigger}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Retention Pattern:</span>
                      <span className="text-indigo-300">{comp.retentionPattern}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
