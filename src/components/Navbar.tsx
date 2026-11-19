import React, { useState, useEffect } from 'react';
import { 
  Flame, Scissors, Video, Search, DollarSign, 
  Terminal, Sparkles, Youtube, CheckCircle2, History, Upload, Globe,
  TrendingDown, Users, Clapperboard, Heart, Command, X,
  ArrowRight, ShieldCheck, Zap, Layers, Monitor, Sliders, ChevronDown,
  Film, Hammer, Database, Calendar, Radio, Languages, Split, BookOpen, Activity, Share2, Folder,
  Compass
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface TabItem {
  id: string;
  label: string;
  icon: any;
  badge: string;
  category: 'creation' | 'trends' | 'editing' | 'growth';
  description: string;
  keywords: string[];
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'creation' | 'trends' | 'editing' | 'growth'>('all');
  const [isQuickNavOpen, setIsQuickNavOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs: TabItem[] = [
    { 
      id: 'nichelibrary', 
      label: 'Niche Library Registry', 
      icon: BookOpen, 
      badge: 'Catalog & AI Blocks', 
      category: 'creation',
      description: 'Curated catalog of high-performing short film concepts, pre-seeded AI content blocks, and instant project injections with Python upload automation',
      keywords: ['niche', 'library', 'catalog', 'concepts', 'blocks', 'injection', 'short film', 'google-api-python-client', 'upload', 'kids', 'tech', 'craftsman']
    },
    { 
      id: 'scenegen', 
      label: 'AI Scene Generator', 
      icon: Clapperboard, 
      badge: 'Cinematic B-Roll', 
      category: 'creation',
      description: 'Generate 8K B-roll with prompt controls, lighting, and camera motions',
      keywords: ['b-roll', 'drone', 'cinematic', 'camera', 'mountains', 'cyberpunk', 'scene']
    },
    { 
      id: 'creativesalon', 
      label: 'AI Salon & Video Director', 
      icon: Sparkles, 
      badge: 'Live Scenery & Duets', 
      category: 'creation',
      description: 'Real creative salon hair/skin makeovers, live scenery backdrops, video response uploads, and Higgsfield motion overlays',
      keywords: ['salon', 'hair', 'skincare', 'duet', 'stitch', 'response', 'webcam', 'upload', 'higgsfield', 'backdrop', 'penthouse', 'santorini', 'before after']
    },
    { 
      id: 'contentbridge', 
      label: 'Content Bridge 4K', 
      icon: Film, 
      badge: 'Director & Remix', 
      category: 'creation',
      description: 'Transform high-performing competitor shorts into 30s faceless scripts with 4K director presets and short film generator',
      keywords: ['content bridge', 'remix', 'faceless', 'director', 'nolan', 'anderson', 'villeneuve', '4k', 'short film', 'competitor', 'script']
    },
    { 
      id: 'craftsman', 
      label: 'Craftsman & Engineering', 
      icon: Hammer, 
      badge: 'Loops & Metallurgy', 
      category: 'creation',
      description: 'Production line loops, everyday products, super drilling, Fred Dibnah chimney demolitions, ancient tools & woodworking registry',
      keywords: ['craftsman', 'machinery', 'drilling', 'metals', 'fred dibnah', 'chimney', 'victorian', 'woodworking', 'lathe', 'engineering', 'tools', 'scrape', 'metallurgy']
    },
    { 
      id: 'assetlibrary', 
      label: 'Asset Vault & AI Suite', 
      icon: Database, 
      badge: 'IndexedDB & 9:16 Testbed', 
      category: 'creation',
      description: 'Persistent local IndexedDB storage for video clips, thumbnails & brand assets, full project backup export, and 9:16 creator visual viewer',
      keywords: ['asset library', 'indexeddb', 'vault', 'backup', 'export', 'project', 'visual viewer', 'simulator', 'safe zone', 'audit', 'preflight', 'storage']
    },
    { 
      id: 'ontrend', 
      label: 'OnTrend Beauty & Health', 
      icon: Heart, 
      badge: 'Efficacy & Fair Trade', 
      category: 'trends',
      description: 'Female-focused health, fitness, beauty product insight engine, FTC legal compliance, and fair trade tracker',
      keywords: ['ontrend', 'beauty', 'fitness', 'health', 'skincare', 'ingredients', 'fair trade', 'compliance', 'ftc', 'asa', 'discounts', 'qr code']
    },
    { 
      id: 'competitors', 
      label: 'Competitor Research', 
      icon: Users, 
      badge: 'Recharts & Voice', 
      category: 'trends',
      description: 'Track competitor growth, view duration curves, and generate AI voiceovers',
      keywords: ['competitors', 'channel', 'voiceover', 'recharts', 'growth', 'benchmark']
    },
    { 
      id: 'trends', 
      label: 'Viral Trend Watcher', 
      icon: Flame, 
      badge: 'Top 100 Live', 
      category: 'trends',
      description: 'Real-time trending YouTube Shorts with instant slicer and remix integrations',
      keywords: ['trends', 'viral', 'top 100', 'remix', 'music']
    },
    { 
      id: 'workflow', 
      label: 'Workflow Tracker', 
      icon: CheckCircle2, 
      badge: 'Milestones & Badges', 
      category: 'growth',
      description: 'Channel milestones, achievement badges, and production pipeline checklist',
      keywords: ['workflow', 'checklist', 'milestones', 'badges', 'progress']
    },
    { 
      id: 'retention', 
      label: 'Retention Analyzer', 
      icon: TrendingDown, 
      badge: 'CSV Drop-offs', 
      category: 'editing',
      description: 'Upload YouTube Studio retention CSVs and pinpoint exact second-by-second drop-offs',
      keywords: ['retention', 'csv', 'dropoff', 'analytics', 'curve', 'seconds']
    },
    { 
      id: 'clipper', 
      label: 'Video Clipper & Remix', 
      icon: Scissors, 
      badge: 'Direct Upload', 
      category: 'creation',
      description: 'Multi-track video clipper with trimming, speed ramps, and waveform sync',
      keywords: ['clipper', 'trim', 'editor', 'cut', 'speed', 'video']
    },
    { 
      id: 'prostudio', 
      label: 'Pro Studio', 
      icon: Sliders, 
      badge: 'Timeline & -14 LUFS', 
      category: 'editing',
      description: 'Multi-track timeline editor with drag-and-drop trimming, beat-synced snapping, WebAudio Pro Audio chain, Pipeline Verifier gate, and Batch Forensics log',
      keywords: ['pro studio', 'timeline', 'trim', 'beat sync', 'audio', 'lufs', 'lut', 'film grade', 'forensics', 'verifier']
    },
    { 
      id: 'transcript', 
      label: 'Transcript Slicer', 
      icon: Scissors, 
      badge: 'Viral 30-50s', 
      category: 'editing',
      description: 'Slice longform transcripts into 30-50s viral Shorts clips with AI hooks',
      keywords: ['transcript', 'slicer', 'subtitles', 'text', 'hooks']
    },
    { 
      id: 'earth3d', 
      label: '3D Drone Flights & Stadiums', 
      icon: Globe, 
      badge: 'FPV & 360°', 
      category: 'creation',
      description: 'Interactive 3D Google Earth and Three.js flight paths over global landmarks and stadiums',
      keywords: ['3d', 'earth', 'stadium', 'drone', 'fpv', 'flight']
    },
    { 
      id: 'worldwonders', 
      label: 'World Wonders', 
      icon: Compass, 
      badge: '30 Landmarks', 
      category: 'creation',
      description: 'Pre-seeded 30 global landmarks with Pexels/Pixabay commercial stock sourcing, AI Auto-Edit Agent handoff, and Daily Drop 7-day scheduling',
      keywords: ['world wonders', 'scenery', 'landmarks', 'machu picchu', 'santorini', 'pexels', 'pixabay', 'travel', 'daily drop']
    },
    { 
      id: 'copywriter', 
      label: 'Copywriter & Hooks', 
      icon: Sparkles, 
      badge: '<60 Chars', 
      category: 'editing',
      description: 'High-retention viral hooks, descriptions, and pinned comment strategies',
      keywords: ['copywriter', 'hooks', 'titles', 'descriptions', 'tags']
    },
    { 
      id: 'localization', 
      label: 'Language Localization', 
      icon: Languages, 
      badge: '20+ Langs & SRT', 
      category: 'editing',
      description: 'Automatically translate scripts, titles, and timestamped captions into 20+ major languages with SRT/VTT export and native speech accents',
      keywords: ['localization', 'translate', 'languages', 'subtitles', 'srt', 'vtt', 'captions', 'multilingual', 'spanish', 'japanese', 'german', 'hindi', 'french']
    },
    { 
      id: 'viralvault', 
      label: 'Viral Vault & Dates', 
      icon: History, 
      badge: 'Historical', 
      category: 'trends',
      description: 'Historical archive of timeless viral shorts blueprints and calendar hooks',
      keywords: ['vault', 'history', 'archive', 'calendar']
    },
    { 
      id: 'abtest', 
      label: 'A/B Test & Short Films', 
      icon: Split, 
      badge: 'Engagement & Loops', 
      category: 'creation',
      description: 'Upload two variations of a Short, simulate engagement & retention modeling, generate short films, and toggle no-clutter theater loops',
      keywords: ['a/b test', 'ab testing', 'retention', 'short films', 'film loops', 'no clutter', 'theater', 'split test', 'engagement']
    },
    { 
      id: 'capcut', 
      label: 'CapCut Safe-Zone', 
      icon: Video, 
      badge: '9:16 Visual', 
      category: 'creation',
      description: 'Interactive 9:16 UI overlay simulator to avoid YouTube like buttons and sound labels',
      keywords: ['safe zone', 'capcut', 'simulator', '9:16', 'buttons', 'overlay']
    },
    { 
      id: 'channelhealth', 
      label: 'Channel Health Audit', 
      icon: Activity, 
      badge: 'Audit & Instant Clipper', 
      category: 'growth',
      description: 'Connect to YouTube Data API to analyze recent uploads, highlighting missed metadata, poor thumbnail CTR patterns, and long-form video conversion gaps with 1-click episode upload',
      keywords: ['audit', 'health', 'channel health', 'diagnostics', 'instant clipper', 'episode upload', 'ctr', 'metadata', 'conversion gap', 'youtube data api']
    },
    { 
      id: 'uploader', 
      label: 'YouTube Direct & Wise', 
      icon: Upload, 
      badge: 'Wise Payouts', 
      category: 'growth',
      description: '1-click direct publishing, sequential pipeline, and Wise multi-currency AdSense payouts for high-yield niches',
      keywords: ['uploader', 'publish', 'youtube', 'metadata', 'tags', 'wise', 'payouts', 'adsense', 'revenue']
    },
    { 
      id: 'batchuploader', 
      label: 'Batch Uploader', 
      icon: Folder, 
      badge: 'Folder & 7-Day Peak', 
      category: 'growth',
      description: 'Upload folders of pre-indexed shorts, bulk-apply viral templates, and schedule across 7-day audience peak retention windows',
      keywords: ['batch uploader', 'batch', 'folder upload', 'bulk uploader', 'schedule', 'peak times', '7 days', 'templates', 'python']
    },
    { 
      id: 'socialsync', 
      label: 'Sync to Social', 
      icon: Share2, 
      badge: 'TikTok & Reels Clean', 
      category: 'growth',
      description: 'Export finished YouTube Shorts as TikTok and Instagram Reels compatible files with watermark-free optimization, safe-zone alignment, and Rec.709 sRGB color tags',
      keywords: ['sync to social', 'social sync', 'tiktok', 'instagram reels', 'watermark free', 'export', 'shadowban', 'rec709', 'cross posting', 'clean export']
    },
    { 
      id: 'brandkit', 
      label: 'Brand Kit & Colors', 
      icon: Sparkles, 
      badge: 'Logo & Palettes', 
      category: 'editing',
      description: 'Consistent channel typography, color palettes, and lower-third watermarks',
      keywords: ['brand kit', 'palette', 'colors', 'logo', 'fonts']
    },
    { 
      id: 'keywords', 
      label: 'SEO Auditor & Scraper', 
      icon: Search, 
      badge: 'Auditor & Batch 9:16', 
      category: 'growth',
      description: 'SEO Content Auditor (score 0-100 & search benchmarks), Batch 9:16 Thumbnail Studio, and 30 niche queries',
      keywords: ['seo', 'keywords', 'search', 'scraper', 'tags', 'auditor', 'thumbnail', 'batch', 'safe zone']
    },
    { 
      id: 'monetization', 
      label: 'Payouts & Monetization', 
      icon: DollarSign, 
      badge: 'Wise OAuth & Multi-Lingual AI', 
      category: 'growth',
      description: 'Smart Revenue Benchmarking (Auto Niche & Opportunity Score), Revenue Intelligence, Wise OAuth 2.0 PKCE, automated YouTube revenue tracking, and instant disbursement',
      keywords: ['monetization', 'payouts', 'wise', 'benchmarking', 'smart revenue', 'opportunity score', 'niche detection', 'cpm', 'rpm', 'affiliate', 'calculator']
    },
    { 
      id: 'newsflash', 
      label: 'Smart Daily News Flash', 
      icon: Radio, 
      badge: '60s & A/B Suite', 
      category: 'growth',
      description: 'Scrape global trending topics, generate factual 60-second broadcast scripts with "On This Day" historical context, royalty-free soundtracks, and interactive A/B testing suite',
      keywords: ['news flash', 'news', 'daily news', 'trending', 'on this day', 'historical', 'soundtrack', 'a/b test', 'split test', '60s', 'script']
    },
    { 
      id: 'dailypipeline', 
      label: 'Automated Daily Pipeline', 
      icon: Calendar, 
      badge: '7-Day Cron', 
      category: 'growth',
      description: 'Queue 7 days of viral Shorts with scheduling calendar, automated YouTube upload trigger at optimal audience retention peaks, Smart News Flash, and setup wizards',
      keywords: ['daily pipeline', 'pipeline', 'schedule', 'calendar', 'cron', 'automated', 'queue', '7-day', 'optimal time', 'retention', 'news flash', 'wizard', 'playbook']
    },
    { 
      id: 'forensics', 
      label: 'Forensics Dashboard', 
      icon: ShieldCheck, 
      badge: 'Logs & CSV', 
      category: 'growth',
      description: 'Sortable pipeline execution log table (Timestamp, Step, Verdict, Details) backed by localStorage with CSV export for off-platform audit',
      keywords: ['forensics', 'logs', 'csv', 'audit', 'verifier', 'verdict', 'blocked', 'proceed']
    },
    { 
      id: 'automation', 
      label: 'Python & FFmpeg', 
      icon: Terminal, 
      badge: 'Automation', 
      category: 'growth',
      description: 'Ready-to-run Python and FFmpeg automated video rendering scripts',
      keywords: ['python', 'ffmpeg', 'automation', 'scripts', 'code']
    },
  ];

  // Filter tabs by category
  const filteredTabs = tabs.filter(t => selectedCategory === 'all' || t.category === selectedCategory);

  // Filter for Quick Jump modal
  const searchResults = tabs.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.label.toLowerCase().includes(q) ||
      t.badge.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickNavOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsQuickNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsQuickNavOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Top Bar */}
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-950/50">
                <Youtube className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    ShortsForge<span className="text-red-500">.AI</span>
                  </span>
                  <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.2 rounded font-mono font-bold">
                    PRO SUITE
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 hidden sm:block">
                  Complete YouTube Shorts Growth, AI Salon &amp; Automation Pipeline
                </p>
              </div>
            </div>

            {/* Quick Jump Navigator Button & Engine Badge */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsQuickNavOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-700/80 text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                title="Search any tool or feature (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-pink-400" />
                <span className="hidden sm:inline">Quick Jump...</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  ⌘K
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Engine</span>
              </div>
            </div>
          </div>

          {/* Workflow Category Filter Bar (Solves Dead Ends & Provides Clear Hierarchy) */}
          <div className="flex items-center justify-between gap-2 pt-1 pb-2 border-t border-zinc-900">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[11px] font-mono text-zinc-500 uppercase mr-1 hidden sm:inline">
                Workflows:
              </span>
              {[
                { id: 'all', label: `All Tools (${tabs.length})`, icon: Layers },
                { id: 'creation', label: '🎬 Studio & Salon', icon: Sparkles },
                { id: 'trends', label: '✨ Beauty & Trends', icon: Heart },
                { id: 'editing', label: '✂️ Editing & Audio', icon: Scissors },
                { id: 'growth', label: '💰 Growth & Monetize', icon: DollarSign }
              ].map((cat) => {
                const Icon = cat.icon;
                const isCatActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      isCatActive
                        ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${isCatActive ? 'text-pink-400' : 'text-zinc-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono text-zinc-500 hidden md:block whitespace-nowrap">
              Active: <strong className="text-zinc-300">{tabs.find(t => t.id === activeTab)?.label}</strong>
            </span>
          </div>

          {/* Horizontally Scrollable Tool Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-2 no-scrollbar border-t border-zinc-900/60">
            {filteredTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600/90 to-pink-600/90 text-white shadow-md border border-pink-500/30'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-black/30 text-white' : 'bg-zinc-900 text-zinc-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* QUICK JUMP / COMMAND PALETTE MODAL (Cmd+K) */}
      {isQuickNavOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Search Input Bar */}
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-950">
              <Search className="w-5 h-5 text-pink-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any tool, workflow, or keyword (e.g. salon, upload, response, profit, cpm, dupe)..."
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-zinc-500 font-sans"
              />
              <button 
                onClick={() => setIsQuickNavOpen(false)}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs">
                  No matching tools found for "{searchQuery}". Try "salon", "upload", "trends", or "profit".
                </div>
              ) : (
                searchResults.map((tab) => {
                  const Icon = tab.icon;
                  const isCurrent = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectTab(tab.id)}
                      className={`w-full p-3 rounded-xl text-left transition flex items-center justify-between ${
                        isCurrent 
                          ? 'bg-pink-500/15 border border-pink-500/40 text-white' 
                          : 'hover:bg-zinc-800/80 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-pink-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{tab.label}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                              {tab.badge}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                            {tab.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                        <span className="text-[10px] uppercase font-bold">{tab.category}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-850 rounded border border-zinc-700 text-zinc-300">ESC</kbd> to close</span>
              <span>{tabs.length} Production Modules Available</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
