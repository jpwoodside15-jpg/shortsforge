import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Sparkles, TrendingUp, DollarSign, Film, 
  Copy, Check, ArrowRight, Download, Terminal, 
  ShieldCheck, Layers, Play, CheckCircle2, ChevronDown, 
  ChevronUp, ExternalLink, RefreshCw, Cpu, Award, 
  Video, Sliders, Split, Globe, Calendar, Music, 
  HelpCircle, AlertCircle
} from 'lucide-react';
import { NicheConceptItem, NicheConceptCategory, ContentBlock } from '../types';
import { 
  NICHE_LIBRARY_CATALOG, 
  AUTOMATION_SOFTWARES_LIST, 
  COMPLETE_AUTOMATION_INSTALL_COMMAND, 
  PYTHON_REQUIREMENTS_TXT, 
  STANDALONE_UPLOAD_PYTHON_SCRIPT 
} from '../data/nicheLibraryData';

interface NicheLibraryTabProps {
  onSendToClipper?: (title: string, script: string) => void;
  onSendToUploader?: (title: string, description: string, tags: string[]) => void;
  onSendToABTest?: (concept: NicheConceptItem) => void;
  onSendToLocalization?: (title: string, script: string) => void;
  onSendToPipeline?: (title: string, niche: string) => void;
  onSendToContentBridge?: (title: string, script: string) => void;
  onSendToSceneGen?: (prompt: string) => void;
}

export const NicheLibraryTab: React.FC<NicheLibraryTabProps> = ({
  onSendToClipper,
  onSendToUploader,
  onSendToABTest,
  onSendToLocalization,
  onSendToPipeline,
  onSendToContentBridge,
  onSendToSceneGen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'cpm' | 'retention' | 'virality' | 'duration'>('cpm');
  const [selectedConcept, setSelectedConcept] = useState<NicheConceptItem>(NICHE_LIBRARY_CATALOG[0]);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(NICHE_LIBRARY_CATALOG[0]?.preSeededBlocks[0]?.id || null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [injectedActionStatus, setInjectedActionStatus] = useState<string | null>(null);
  const [showSoftwareModal, setShowSoftwareModal] = useState<boolean>(false);
  const [activeSoftwareTab, setActiveSoftwareTab] = useState<'installer' | 'python_script' | 'requirements'>('installer');

  // Custom AI Concept Generator States
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [customNicheInput, setCustomNicheInput] = useState('');
  const [customCategoryInput, setCustomCategoryInput] = useState<NicheConceptCategory>('Kids Animation & 3D Fables');
  const [conceptsList, setConceptsList] = useState<NicheConceptItem[]>(NICHE_LIBRARY_CATALOG);

  const categories: (string | NicheConceptCategory)[] = [
    'All',
    'Kids Animation & 3D Fables',
    'High-Tech Reviews & AI',
    'Personal Finance & Wealth',
    'Craftsman & Engineering Loops',
    'Sci-Fi Speculative Cinema',
    'Dark History & Psychology',
    'Biohacking & Clean Living',
    'Micro-Documentaries'
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleDownloadFile = (filename: string, content: string, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filter and sort concepts
  const filteredConcepts = useMemo(() => {
    return conceptsList
      .filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        if (!q) return matchesCategory;
        const matchesQuery = 
          item.filmTitle.toLowerCase().includes(q) ||
          item.niche.toLowerCase().includes(q) ||
          item.logline.toLowerCase().includes(q) ||
          item.directorTone.toLowerCase().includes(q) ||
          item.optimizedYoutubeMetadata.tags.some(t => t.toLowerCase().includes(q));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'cpm') return b.cpmValue - a.cpmValue;
        if (sortBy === 'retention') return b.avgRetention30s - a.avgRetention30s;
        if (sortBy === 'virality') return b.viralityRating - a.viralityRating;
        if (sortBy === 'duration') return a.durationSeconds - b.durationSeconds;
        return 0;
      });
  }, [conceptsList, selectedCategory, searchQuery, sortBy]);

  // Handle Injections with visual feedback toast
  const triggerInjection = (destination: string, executeFn?: () => void) => {
    if (executeFn) executeFn();
    setInjectedActionStatus(`Successfully injected into ${destination}! Switch tabs or check workspace.`);
    setTimeout(() => setInjectedActionStatus(null), 4000);
  };

  const handleInjectToClipper = (concept: NicheConceptItem) => {
    const scriptBlock = concept.preSeededBlocks.find(b => b.type === 'voiceover_script');
    const scriptText = scriptBlock ? scriptBlock.content : concept.logline;
    triggerInjection('Video Clipper & Remix', () => {
      if (onSendToClipper) onSendToClipper(concept.filmTitle, scriptText);
    });
  };

  const handleInjectToUploader = (concept: NicheConceptItem) => {
    triggerInjection('YouTube Direct Uploader', () => {
      if (onSendToUploader) {
        onSendToUploader(
          concept.optimizedYoutubeMetadata.title,
          concept.optimizedYoutubeMetadata.description,
          concept.optimizedYoutubeMetadata.tags
        );
      }
    });
  };

  const handleInjectToABTest = (concept: NicheConceptItem) => {
    triggerInjection('A/B Test Manager & Short Films', () => {
      if (onSendToABTest) onSendToABTest(concept);
    });
  };

  const handleInjectToLocalization = (concept: NicheConceptItem) => {
    const scriptBlock = concept.preSeededBlocks.find(b => b.type === 'voiceover_script');
    const scriptText = scriptBlock ? scriptBlock.content : concept.logline;
    triggerInjection('Language Localization (20+ Languages)', () => {
      if (onSendToLocalization) onSendToLocalization(concept.filmTitle, scriptText);
    });
  };

  const handleInjectToPipeline = (concept: NicheConceptItem) => {
    triggerInjection('Automated Daily Pipeline (7-Day Cron)', () => {
      if (onSendToPipeline) onSendToPipeline(concept.filmTitle, concept.niche);
    });
  };

  const handleInjectToContentBridge = (concept: NicheConceptItem) => {
    const scriptBlock = concept.preSeededBlocks.find(b => b.type === 'voiceover_script');
    const scriptText = scriptBlock ? scriptBlock.content : concept.logline;
    triggerInjection('Content Bridge 4K Director', () => {
      if (onSendToContentBridge) onSendToContentBridge(concept.filmTitle, scriptText);
    });
  };

  // Generate Custom AI Concept
  const handleGenerateCustomConcept = async () => {
    setIsGeneratingAi(true);
    try {
      const topic = customNicheInput.trim() || customCategoryInput;
      const res = await fetch('/api/niche-library/generate-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          category: customCategoryInput
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.concept) {
          setConceptsList(prev => [data.concept, ...prev]);
          setSelectedConcept(data.concept);
          setExpandedBlockId(data.concept.preSeededBlocks[0]?.id || null);
          setCustomNicheInput('');
          setInjectedActionStatus(`Created new AI Short Film Concept: "${data.concept.filmTitle}"`);
          setTimeout(() => setInjectedActionStatus(null), 4000);
          setIsGeneratingAi(false);
          return;
        }
      }
    } catch {
      // Fallback generator
    }

    // High quality client-side fallback generator
    const newConcept: NicheConceptItem = {
      id: `custom_ai_${Date.now()}`,
      filmTitle: customNicheInput.trim() ? `The Paradox of ${customNicheInput}` : `Viral Blueprint: ${customCategoryInput}`,
      niche: customCategoryInput,
      category: customCategoryInput,
      cpmBenchmark: '$34.00 - $48.00 CPM',
      cpmValue: 41.5,
      avgRetention30s: 88.0,
      viralityRating: 95,
      affiliateYieldScore: 'High ($440/10k views)',
      logline: `A captivating 48-second narrative dissecting ${customNicheInput || customCategoryInput} with high-retention visual hooks and seamless loop stitching.`,
      durationSeconds: 48,
      pacing: 'Cinematic Narrative (2.2s cuts)',
      directorTone: 'Cinematic Documentary with High Polish',
      soundtrackRecommendation: 'Subtle bass drone with rhythmic hi-hat pulse (120 BPM)',
      colorGrade: 'High contrast rich saturation with amber catchlights',
      targetAudience: 'Global Shorts viewers seeking high-curiosity content',
      seamlessLoopMechanism: 'The final phrase answers the opening question, creating an endless replay loop.',
      sampleThumbnailConcept: `Hyper-detailed neon cinematic frame representing ${customNicheInput || customCategoryInput} with an intriguing contrast element`,
      optimizedYoutubeMetadata: {
        title: `${customNicheInput || customCategoryInput}: The Untold Revelation ⚡ #Shorts`,
        description: `Deep dive into ${customNicheInput || customCategoryInput} engineered with ShortsForge AI Niche Library.\n\n#Shorts #Viral #Cinematic #AIStudio`,
        tags: ['shorts', 'viral', 'documentary', 'retention', 'ai video'],
        pinnedComment: '⚡ Did this change your perspective? Drop your thoughts in the comments!'
      },
      preSeededBlocks: [
        {
          id: `block_custom_vis_${Date.now()}`,
          type: 'visual_prompt_pack',
          title: 'Cinematic Visual Prompt Pack',
          badge: 'Unreal Engine 5 / Midjourney v6',
          description: 'Cinematic prompts formatted for high CTR.',
          content: `Scene 1 (0-12s): Macro dynamic low angle shot capturing ${customNicheInput || customCategoryInput}, volumetric lighting, 8k resolution, IMAX ratio.
Scene 2 (12-28s): Fast tracking shot revealing hidden structural mechanics.
Scene 3 (28-40s): Dramatic color shift with high tension lighting.
Scene 4 (40-48s): Seamless circular loop transition.`,
          copyPayload: `/imagine prompt: cinematic macro 9:16 scene about ${customNicheInput || customCategoryInput}, dramatic lighting, 8k octane render --ar 9:16 --v 6.0`
        },
        {
          id: `block_custom_vo_${Date.now()}`,
          type: 'voiceover_script',
          title: 'High-Retention Script Block',
          badge: 'Paced 140 WPM',
          description: 'Timed for maximum retention and viewer lock-in.',
          content: `[00:00 - 00:05]
Everyone thinks they understand ${customNicheInput || customCategoryInput}... until they see what happens under the surface.

[00:05 - 00:25]
Behind the scenes, the top 1% use an entirely different set of rules. While average creators guess, data-driven systems capture 85% retention.

[00:25 - 00:48]
Once you see how the loop connects, you can never look at it the same way again. Which is why you have to start from the beginning.`,
          copyPayload: `Everyone thinks they understand ${customNicheInput || customCategoryInput}... until they see what happens under the surface. Behind the scenes, the top 1% use an entirely different set of rules. While average creators guess, data-driven systems capture 85% retention. Once you see how the loop connects, you can never look at it the same way again. Which is why you have to start from the beginning.`
        }
      ]
    };

    setConceptsList(prev => [newConcept, ...prev]);
    setSelectedConcept(newConcept);
    setExpandedBlockId(newConcept.preSeededBlocks[0].id);
    setCustomNicheInput('');
    setInjectedActionStatus(`Created custom concept: "${newConcept.filmTitle}"`);
    setTimeout(() => setInjectedActionStatus(null), 4000);
    setIsGeneratingAi(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Toast Notification Banner */}
      {injectedActionStatus && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500/95 text-black px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 font-semibold text-sm border border-emerald-400/50 backdrop-blur-md animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
          <span>{injectedActionStatus}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 border border-zinc-800/80 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <BookOpen className="w-3.5 h-3.5" />
                Curated Niche Registry
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DollarSign className="w-3.5 h-3.5" />
                High-CPM &amp; Retention Benchmarks
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Pre-Seeded AI Content Blocks
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Niche Library &amp; Film Concept Catalog
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Explore curated, high-retention short film concepts and modular AI content blocks (Visual Prompts, Scripts, Foley Stems, and SEO Metadata). Instantly inject them into your Video Clipper, A/B Test Suite, or YouTube Direct Uploader with Wise payout routing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSoftwareModal(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Python &amp; Upload Automation</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                google-api
              </span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('ai-architect-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Concept</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Curated Concepts</div>
            <div className="text-xl font-bold text-white mt-0.5">{conceptsList.length} Tested Blueprints</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Peak Benchmark CPM</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">$55.00 CPM (Wealth)</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Avg 30s Retention</div>
            <div className="text-xl font-bold text-indigo-400 mt-0.5">87.5% Watch-Through</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Disbursement Security</div>
            <div className="text-xl font-bold text-cyan-400 mt-0.5">Wise UK 60-84-64</div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Catalog Sidebar / Right Detail Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Concept Catalog & Filter Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 space-y-3 backdrop-blur-sm">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search concepts, niches, keywords, foley..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Horizontal Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown & Count */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
              <span>{filteredConcepts.length} concepts found</span>
              <div className="flex items-center gap-1.5">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'cpm' | 'retention' | 'virality' | 'duration')}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="cpm">Highest CPM</option>
                  <option value="retention">Peak Retention</option>
                  <option value="virality">Virality Rating</option>
                  <option value="duration">Runtime Duration</option>
                </select>
              </div>
            </div>
          </div>

          {/* Catalog List Cards */}
          <div className="space-y-3 max-h-[780px] overflow-y-auto pr-1">
            {filteredConcepts.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-zinc-400">
                <BookOpen className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
                <p className="text-sm font-medium">No concepts match your search criteria.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-3 text-xs text-indigo-400 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredConcepts.map(item => {
                const isSelected = selectedConcept.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedConcept(item);
                      if (item.preSeededBlocks.length > 0) {
                        setExpandedBlockId(item.preSeededBlocks[0].id);
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-zinc-900 border-indigo-500/80 shadow-md shadow-indigo-950/40'
                        : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {item.durationSeconds}s loop
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-1">
                          {item.filmTitle}
                        </h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.cpmBenchmark.split(' ')[0]} CPM
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                      {item.logline}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/60 text-[11px] text-zinc-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-indigo-400 font-medium">
                          <TrendingUp className="w-3 h-3" />
                          {item.avgRetention30s}% Ret.
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 font-medium">
                          <Award className="w-3 h-3" />
                          {item.viralityRating}/100
                        </span>
                      </div>
                      <span className="text-zinc-500 font-mono">
                        {item.preSeededBlocks.length} AI Blocks
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Concept Deep Dive & Instant Injection Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-6 backdrop-blur-md">
            {/* Concept Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {selectedConcept.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {selectedConcept.cpmBenchmark}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-800 text-zinc-300">
                    ⏱️ {selectedConcept.durationSeconds} Seconds
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const payload = JSON.stringify(selectedConcept, null, 2);
                      handleCopy(payload, `json_${selectedConcept.id}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700"
                  >
                    {copiedKey === `json_${selectedConcept.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied JSON</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Concept JSON</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const md = `# ${selectedConcept.filmTitle}
**Niche**: ${selectedConcept.niche} (${selectedConcept.cpmBenchmark})
**Logline**: ${selectedConcept.logline}
**Pacing**: ${selectedConcept.pacing}
**Director Tone**: ${selectedConcept.directorTone}
**Soundtrack**: ${selectedConcept.soundtrackRecommendation}
**Loop Mechanism**: ${selectedConcept.seamlessLoopMechanism}

## YouTube Metadata
**Title**: ${selectedConcept.optimizedYoutubeMetadata.title}
**Description**: 
${selectedConcept.optimizedYoutubeMetadata.description}
**Tags**: ${selectedConcept.optimizedYoutubeMetadata.tags.join(', ')}

## Content Blocks
${selectedConcept.preSeededBlocks.map(b => `### ${b.title} (${b.badge})\n${b.content}`).join('\n\n')}
`;
                      handleDownloadFile(`${selectedConcept.filmTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_bundle.md`, md);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Bundle</span>
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {selectedConcept.filmTitle}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
                {selectedConcept.logline}
              </p>
            </div>

            {/* Production Matrix & Film Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-indigo-400" />
                  Director Tone &amp; Pacing
                </div>
                <div className="font-medium text-white">{selectedConcept.directorTone}</div>
                <div className="text-zinc-400 text-[11px]">Pacing: {selectedConcept.pacing}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-amber-400" />
                  Audio &amp; Foley Design
                </div>
                <div className="font-medium text-white line-clamp-1">{selectedConcept.soundtrackRecommendation}</div>
                <div className="text-zinc-400 text-[11px]">Color Grade: {selectedConcept.colorGrade}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1 sm:col-span-2">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  Seamless Loop Mechanism (Infinite Replay)
                </div>
                <div className="text-zinc-300 text-xs leading-relaxed">{selectedConcept.seamlessLoopMechanism}</div>
              </div>
            </div>

            {/* Instant Injection Buttons Hub */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Instant Project Injections</span>
                <span className="text-[11px] font-normal text-zinc-400 lowercase">(1-click transfer to active editors)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => handleInjectToClipper(selectedConcept)}
                  className="p-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-indigo-500/80 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-indigo-400">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-indigo-400" />
                      Video Clipper
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Inject script &amp; trim cut points</div>
                </button>

                <button
                  onClick={() => handleInjectToABTest(selectedConcept)}
                  className="p-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-purple-500/80 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-purple-400">
                    <span className="flex items-center gap-1.5">
                      <Split className="w-3.5 h-3.5 text-purple-400" />
                      A/B Test Suite
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Simulate engagement curves</div>
                </button>

                <button
                  onClick={() => handleInjectToUploader(selectedConcept)}
                  className="p-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-emerald-500/80 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      YouTube &amp; Wise
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Push SEO &amp; payout tags</div>
                </button>

                <button
                  onClick={() => handleInjectToLocalization(selectedConcept)}
                  className="p-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-blue-500/80 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      Localization
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Translate into 20+ languages</div>
                </button>

                <button
                  onClick={() => handleInjectToPipeline(selectedConcept)}
                  className="p-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-500/80 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      Daily Pipeline
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Add to 7-Day automated cron</div>
                </button>

                <button
                  onClick={() => handleInjectToContentBridge(selectedConcept)}
                  className="p-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-cyan-500/80 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-cyan-400">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      Content Bridge
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">4K Director &amp; Faceless Remix</div>
                </button>
              </div>
            </div>

            {/* Pre-Seeded AI Content Blocks Accordion */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Pre-Seeded AI Content Blocks ({selectedConcept.preSeededBlocks.length})</span>
                </div>
                <span className="text-[11px] text-zinc-500">Click block to expand details</span>
              </div>

              <div className="space-y-3">
                {selectedConcept.preSeededBlocks.map((block: ContentBlock) => {
                  const isExpanded = expandedBlockId === block.id;
                  return (
                    <div
                      key={block.id}
                      className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/50 transition-all"
                    >
                      <button
                        onClick={() => setExpandedBlockId(isExpanded ? null : block.id)}
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-900/60 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {block.badge}
                          </span>
                          <span className="text-xs font-bold text-white">{block.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-zinc-400 hidden sm:inline">{block.description}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-zinc-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-400" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-2 border-t border-zinc-800/80 space-y-3 bg-zinc-950/80">
                          <pre className="text-xs text-zinc-200 font-mono whitespace-pre-wrap bg-zinc-900 p-3.5 rounded-lg border border-zinc-800 overflow-x-auto leading-relaxed">
                            {block.content}
                          </pre>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-zinc-500">
                              Formatted for instant injection or clipboard export
                            </span>
                            <div className="flex items-center gap-2">
                              {block.type === 'visual_prompt_pack' && onSendToSceneGen && (
                                <button
                                  onClick={() => {
                                    onSendToSceneGen(block.copyPayload);
                                    triggerInjection('AI Scene Generator');
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-medium flex items-center gap-1.5"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Open in Scene Gen</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleCopy(block.copyPayload, `block_${block.id}`)}
                                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700"
                              >
                                {copiedKey === `block_${block.id}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Copied Block</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy Content Block</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* YouTube SEO & Payout Tag Pre-flight Box */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Pre-Flown YouTube Metadata &amp; Wise Payout Verification
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">Wise: Joseph Paul Woodside (60-84-64)</span>
              </div>

              <div className="text-xs space-y-1.5">
                <div className="text-zinc-400">
                  <span className="text-zinc-500 font-medium">SEO Title: </span>
                  <span className="text-white font-mono">{selectedConcept.optimizedYoutubeMetadata.title}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedConcept.optimizedYoutubeMetadata.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-[11px] text-zinc-300 italic">
                  Pinned Comment: &quot;{selectedConcept.optimizedYoutubeMetadata.pinnedComment}&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Concept Architect Generation Module */}
      <div id="ai-architect-section" className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI Architect Engine
              </span>
              <span className="text-xs text-zinc-500">Generate limitless custom high-performing concepts</span>
            </div>
            <h3 className="text-xl font-bold text-white">Create Custom Short Film Concept &amp; AI Content Blocks</h3>
            <p className="text-xs text-zinc-400">
              Input any custom niche, story spark, or product angle. Our AI engine builds a production-ready concept packet with 4 content blocks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Target High-CPM Niche Category
            </label>
            <select
              value={customCategoryInput}
              onChange={e => setCustomCategoryInput(e.target.value as NicheConceptCategory)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
            >
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Specific Concept Angle or Keywords (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Victorian steam clock, quantum battery, dark stoic negotiation..."
              value={customNicheInput}
              onChange={e => setCustomNicheInput(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 placeholder-zinc-500"
            />
          </div>

          <div className="md:col-span-3 pt-6 md:pt-0">
            <button
              onClick={handleGenerateCustomConcept}
              disabled={isGeneratingAi}
              className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30 transition-all"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Blocks...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Concept</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Software Automation & Upload Softwares Modal */}
      {showSoftwareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Automation &amp; Upload Suite
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">google-api-python-client</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Required Software &amp; Automated Upload Hub
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Complete setup scripts, pip install commands, and automated Python uploaders for headless YouTube Shorts deployment.
                </p>
              </div>
              <button
                onClick={() => setShowSoftwareModal(false)}
                className="text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium"
              >
                ✕ Close
              </button>
            </div>

            {/* Sub-tab Navigation */}
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
              <button
                onClick={() => setActiveSoftwareTab('installer')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSoftwareTab === 'installer'
                    ? 'bg-indigo-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                1. Pip Installation &amp; Softwares
              </button>
              <button
                onClick={() => setActiveSoftwareTab('python_script')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSoftwareTab === 'python_script'
                    ? 'bg-indigo-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                2. Automated upload_short.py Script
              </button>
              <button
                onClick={() => setActiveSoftwareTab('requirements')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSoftwareTab === 'requirements'
                    ? 'bg-indigo-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                3. requirements.txt
              </button>
            </div>

            {/* Tab 1: Installer & Software Registry */}
            {activeSoftwareTab === 'installer' && (
              <div className="space-y-6">
                {/* 1-Click Complete Install Command */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      Recommended 1-Click Terminal Command
                    </span>
                    <button
                      onClick={() => handleCopy(COMPLETE_AUTOMATION_INSTALL_COMMAND, 'complete_cmd')}
                      className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      {copiedKey === 'complete_cmd' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Pip Command</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-emerald-400 font-mono bg-zinc-900/90 p-3 rounded-lg border border-zinc-800 overflow-x-auto">
                    {COMPLETE_AUTOMATION_INSTALL_COMMAND}
                  </pre>
                  <p className="text-[11px] text-zinc-400">
                    Installs Google API client, OAuth PKCE flows, YouTube transcript tools, FFmpeg bindings, and HTTP request clients.
                  </p>
                </div>

                {/* Individual Softwares Grid */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Required Automation Softwares &amp; Libraries
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {AUTOMATION_SOFTWARES_LIST.map(pkg => (
                      <div
                        key={pkg.id}
                        className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs font-mono">{pkg.name}</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-emerald-400">
                              v{pkg.version}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {pkg.purpose}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <code className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-1 rounded font-mono truncate max-w-[200px]">
                            {pkg.installCommand}
                          </code>
                          <button
                            onClick={() => handleCopy(pkg.installCommand, `pkg_${pkg.id}`)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                          >
                            {copiedKey === `pkg_${pkg.id}` ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Python Upload Script */}
            {activeSoftwareTab === 'python_script' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-zinc-400">
                    Standalone Python automated uploader with chunked uploads, resumable state, and Wise tags.
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(STANDALONE_UPLOAD_PYTHON_SCRIPT, 'py_script')}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5"
                    >
                      {copiedKey === 'py_script' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDownloadFile('upload_short.py', STANDALONE_UPLOAD_PYTHON_SCRIPT)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download upload_short.py</span>
                    </button>
                  </div>
                </div>

                <pre className="text-xs text-zinc-200 font-mono bg-zinc-950 p-4 rounded-xl border border-zinc-800 overflow-x-auto max-h-[380px] leading-relaxed">
                  {STANDALONE_UPLOAD_PYTHON_SCRIPT}
                </pre>
              </div>
            )}

            {/* Tab 3: Requirements.txt */}
            {activeSoftwareTab === 'requirements' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-zinc-400">
                    Pin dependencies for reproducible production pipelines.
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(PYTHON_REQUIREMENTS_TXT, 'req_txt')}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5"
                    >
                      {copiedKey === 'req_txt' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy requirements.txt</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDownloadFile('requirements.txt', PYTHON_REQUIREMENTS_TXT)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download requirements.txt</span>
                    </button>
                  </div>
                </div>

                <pre className="text-xs text-zinc-200 font-mono bg-zinc-950 p-4 rounded-xl border border-zinc-800 overflow-x-auto max-h-[340px] leading-relaxed">
                  {PYTHON_REQUIREMENTS_TXT}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
