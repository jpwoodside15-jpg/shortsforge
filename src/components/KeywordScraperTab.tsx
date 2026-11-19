import React, { useState } from 'react';
import { 
  Search, Sparkles, Copy, Check, TrendingUp, 
  HelpCircle, Shuffle, ListOrdered, Video, ArrowRight, ExternalLink,
  Target, Image as ImageIcon, Sliders, ShieldCheck
} from 'lucide-react';
import { KeywordScraperResult } from '../types';
import { SEOContentAuditor } from './SEOContentAuditor';
import { BatchThumbnailStudio } from './BatchThumbnailStudio';

interface KeywordScraperTabProps {
  onSendToUploader?: (data: { title: string; description: string; tags: string[] }) => void;
  onSendToPipeline?: (data: any) => void;
  onSendToCopywriter?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const KeywordScraperTab: React.FC<KeywordScraperTabProps> = ({
  onSendToUploader,
  onSendToPipeline,
  onSendToCopywriter,
  onNavigateTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'queries' | 'auditor' | 'thumbnails'>('auditor');
  const [niche, setNiche] = useState('AI Automation & SaaS Tools');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<KeywordScraperResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<'howTo' | 'versus' | 'topTen'>('howTo');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sampleNiches = [
    'Finance & Passive Income',
    'AI Automation & SaaS Tools',
    'Health, Biohacking & Longevity',
    'Luxury Lifestyle & High-End Tech',
    'Freelancing & Remote Career Growth',
    'Psychology & Human Behavior'
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleScrape = async (targetNiche?: string) => {
    const selected = targetNiche || niche;
    if (!selected.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/scrape-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: selected })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Subtab Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/90 p-2 rounded-2xl border border-zinc-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab('auditor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'auditor'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-300" />
            <span>SEO Content Auditor</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Score &amp; Competitors
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('thumbnails')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'thumbnails'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-purple-300" />
            <span>Batch 9:16 Thumbnails</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              CapCut Safe
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('queries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'queries'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-red-300" />
            <span>Search Trend Queries (30 Queries)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 px-2 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Shorts Algorithm 2026 Engine</span>
        </div>
      </div>

      {/* VIEW 1: SEO CONTENT AUDITOR */}
      {activeSubTab === 'auditor' && (
        <SEOContentAuditor
          initialNiche={niche}
          onSendToUploader={onSendToUploader}
          onSendToPipeline={onSendToPipeline}
        />
      )}

      {/* VIEW 2: BATCH THUMBNAIL STUDIO */}
      {activeSubTab === 'thumbnails' && (
        <BatchThumbnailStudio
          initialNiche={niche}
          onSendToUploader={(prompt) => {
            if (onSendToUploader) {
              onSendToUploader({
                title: niche,
                description: `Created with Batch Thumbnail Studio: ${prompt}`,
                tags: ['shorts', 'thumbnail', 'viral']
              });
            }
          }}
        />
      )}

      {/* VIEW 3: 30 NICHE QUERIES SCRAPER */}
      {activeSubTab === 'queries' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-emerald-950/40 border border-red-500/20 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                    <Search className="w-5 h-5 text-red-500" />
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">SEO Data Scraper &amp; Search Trend Engine</h2>
                </div>
                <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
                  Uncover 30 high-volume search queries inside any niche (10 How-to, 10 VS, 10 Top 10) with exact YouTube search strings and high-retention long-form source video types to clip.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Algorithmic Demand Analysis
                </span>
              </div>
            </div>
          </div>

          {/* Input / Niche Selection */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Enter Your YouTube Channel Niche
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  placeholder="e.g. Finance, SaaS, Real Estate, Stoicism..."
                />
              </div>

              <button
                onClick={() => handleScrape()}
                disabled={isLoading || !niche.trim()}
                className="py-2.5 px-6 bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Scraping Search Queries...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>Scrape Top 30 Keyword Trends</span>
                  </>
                )}
              </button>
            </div>

            {/* Niche Presets */}
            <div>
              <span className="text-xs text-zinc-400 font-semibold block mb-2">Popular High-CPM Niches:</span>
              <div className="flex flex-wrap gap-2">
                {sampleNiches.map((n, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setNiche(n);
                      handleScrape(n);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      niche === n
                        ? 'bg-red-500/20 border-red-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          {!result && !isLoading && (
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-14 h-14 bg-zinc-800/80 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                <Search className="w-7 h-7 text-emerald-400" />
              </div>
              <h4 className="text-base font-semibold text-white">Scrape 30 High-Volume Keywords</h4>
              <p className="text-zinc-400 text-xs mt-1.5 max-w-md">
                Enter a niche or select one of the high-paying niches above to get the exact phrases viewers type into the YouTube search bar.
              </p>
              <button
                onClick={() => handleScrape()}
                className="mt-5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 border border-zinc-700 cursor-pointer"
              >
                Run Demo Scrape for &quot;{niche}&quot; <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {isLoading && (
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-semibold text-white">Analyzing YouTube Search Suggest API Patterns...</p>
              <p className="text-xs text-zinc-400 mt-1">Filtering high-intent &quot;How-to&quot;, &quot;VS&quot;, and &quot;Top 10&quot; queries.</p>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-6">
              {/* Top Categories Switcher */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
                <div className="flex gap-2 w-full sm:w-auto">
                  {[
                    { id: 'howTo', label: '10 "How-To" Queries', icon: HelpCircle },
                    { id: 'versus', label: '10 "VS / Comparison" Queries', icon: Shuffle },
                    { id: 'topTen', label: '10 "Top 10 / Ranking" Queries', icon: ListOrdered },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCategory(tab.id as any)}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border cursor-pointer ${
                          activeCategory === tab.id
                            ? 'bg-red-600 text-white border-red-500 shadow-md'
                            : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    const allQueries = [
                      ...result.categories.howTo,
                      ...result.categories.versus,
                      ...result.categories.topTen
                    ].map(item => item.exactQuery).join('\n');
                    handleCopy(allQueries, 'all-30');
                  }}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-zinc-700 shrink-0 cursor-pointer"
                >
                  {copiedKey === 'all-30' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy All 30 Search Queries</span>
                </button>
              </div>

              {/* Queries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.categories[activeCategory]?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 rounded-xl p-4 space-y-2.5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.topic}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        item.competition === 'Low'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.competition === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {item.competition} Comp
                      </span>
                    </div>

                    <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-[10px] text-zinc-500 block uppercase font-mono">Exact Search Phrase:</span>
                        <span className="text-xs font-mono text-emerald-300 font-semibold truncate block">
                          &quot;{item.exactQuery}&quot;
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(item.exactQuery, `query-${item.id}`)}
                        className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700 shrink-0 cursor-pointer"
                        title="Copy Search Phrase"
                      >
                        {copiedKey === `query-${item.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                      <span>Intent: <strong className="text-zinc-300">{item.intent}</strong></span>
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.exactQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-red-400 hover:underline flex items-center gap-1"
                      >
                        Test on YouTube <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Long-form Videos to Clip From */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Video className="w-4 h-4 text-red-400" /> Recommended Long-Form Videos to Search &amp; Clip
                </h3>
                <p className="text-xs text-zinc-400">
                  Search these video types on YouTube to find raw footage with high-energy retention segments:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {result.sourceVideoTypes?.map((source, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white leading-snug">{source.type}</h4>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{source.whyItWorks}</p>
                      </div>

                      <div className="pt-2 border-t border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Search Operator:</span>
                        <div className="flex items-center justify-between bg-zinc-900 p-1.5 rounded border border-zinc-800 text-[11px] font-mono text-amber-300">
                          <span className="truncate">{source.exampleSearchQuery}</span>
                          <button
                            onClick={() => handleCopy(source.exampleSearchQuery, `src-${idx}`)}
                            className="ml-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            {copiedKey === `src-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
