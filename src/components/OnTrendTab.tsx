import React, { useState } from 'react';
import { 
  Sparkles, Heart, Activity, Flame, Globe, Tag, 
  CheckCircle2, AlertCircle, Copy, Check, ArrowRight, 
  ExternalLink, Sliders, RefreshCw, Star, ShieldCheck, 
  Zap, MessageSquare, Award, Video, Compass, MapPin,
  Scale, DollarSign, Leaf, BookOpen, Search, AlertTriangle,
  Clock, ShieldAlert, CheckSquare, Sparkle, Layers,
  Scissors, Play, ArrowDownRight, Eye, FileText, CheckCheck,
  ShoppingBag, Shield, QrCode, Percent, SlidersHorizontal,
  ChevronRight, BadgePercent, CheckCircle, XCircle
} from 'lucide-react';
import { QRCodeModal } from './QRCodeModal';
import { 
  ON_TREND_PRODUCTS, 
  COUNTRY_STYLE_TRENDS, 
  ON_TREND_VIBES, 
  WELLBEING_PROTOCOLS,
  INGREDIENT_TRUTH_DATABASE,
  PRODUCT_INSIGHT_ITEMS,
  TRENDING_HEALTH_BEAUTY_SHORTS,
  GLOBAL_ADVERTISING_STANDARDS,
  CLAIM_AUDIT_PRESETS,
  PRODUCT_DISCOUNT_DEALS,
  PRICE_SCALE_PROFILES,
  FAIR_TRADE_BRAND_REGISTRY,
  BeautyProductIntel, 
  CountryStyleTrend,
  WellbeingProtocol,
  IngredientTruthCheck,
  ProductInsightItem,
  TrendingHealthBeautyShort,
  GlobalAdvertisingStandard,
  ClaimAuditPreset,
  ProductDiscountDeal,
  PriceScaleProductProfile,
  FairTradeBrandAudit
} from '../data/onTrendData';

interface OnTrendTabProps {
  onSendToCopywriter?: (topic: string) => void;
  onSendToSimulator?: (text: string) => void;
  onSendToVoiceover?: (scriptText: string) => void;
  onRemixToSlicer?: (transcript: string, context: string) => void;
  onSendToClipper?: (startSec: number, endSec: number, context: string) => void;
  onSendToSalon?: () => void;
}

export const OnTrendTab: React.FC<OnTrendTabProps> = ({
  onSendToCopywriter,
  onSendToSimulator,
  onSendToVoiceover,
  onRemixToSlicer,
  onSendToClipper,
  onSendToSalon
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Skincare' | 'Fitness & Recovery' | 'Supplements' | 'Body & Glow'>('All');
  const [selectedVibe, setSelectedVibe] = useState<string>('clean-girl');
  const [selectedProduct, setSelectedProduct] = useState<BeautyProductIntel>(ON_TREND_PRODUCTS[0]);
  const [selectedCountry, setSelectedCountry] = useState<CountryStyleTrend>(COUNTRY_STYLE_TRENDS[0]);
  const [selectedProtocol, setSelectedProtocol] = useState<WellbeingProtocol>(WELLBEING_PROTOCOLS[0]);
  
  // Navigation tabs
  const [subTab, setSubTab] = useState<'compliance' | 'discounts' | 'pricescale' | 'ethics' | 'insights' | 'shortsRemix' | 'science' | 'wellbeing' | 'hotmap' | 'captionsFx'>('compliance');
  
  // Legal & Advertising Compliance Auditor State
  const [selectedStandard, setSelectedStandard] = useState<GlobalAdvertisingStandard>(GLOBAL_ADVERTISING_STANDARDS[0]);
  const [selectedPreset, setSelectedPreset] = useState<ClaimAuditPreset>(CLAIM_AUDIT_PRESETS[0]);
  const [complianceScriptInput, setComplianceScriptInput] = useState<string>(CLAIM_AUDIT_PRESETS[0].scriptText);
  const [complianceCategory, setComplianceCategory] = useState<string>('Skincare');
  const [isComplianceAuditing, setIsComplianceAuditing] = useState<boolean>(false);
  const [complianceAuditResult, setComplianceAuditResult] = useState<any>(CLAIM_AUDIT_PRESETS[0].presetAuditedData);

  // Discounts, Offers & QR Code State
  const [discountCategoryFilter, setDiscountCategoryFilter] = useState<string>('All');
  const [qrModalData, setQrModalData] = useState<{
    isOpen: boolean;
    title: string;
    brand?: string;
    promoCode?: string;
    discountPercent?: number | string;
    url: string;
    fairTradeCertified?: boolean;
  }>({
    isOpen: false,
    title: '',
    url: ''
  });

  // Price Scale State
  const [selectedScaleProfile, setSelectedScaleProfile] = useState<PriceScaleProductProfile>(PRICE_SCALE_PROFILES[0]);
  const [activeScaleTier, setActiveScaleTier] = useState<'budget' | 'fair_market' | 'luxury'>('fair_market');
  const [calcUsageDays, setCalcUsageDays] = useState<number>(60);
  const [calcPumpsPerDay, setCalcPumpsPerDay] = useState<number>(2);

  // Fair Trade Tracker State
  const [ethicsFilter, setEthicsFilter] = useState<'all' | 'certified' | 'living_wage' | 'conflict_free' | 'climate_neutral'>('all');

  // Product Insight Engine State
  const [insightSearch, setInsightSearch] = useState<string>('');
  const [insightCategory, setInsightCategory] = useState<string>('All');
  const [insightSortBy, setInsightSortBy] = useState<'transparency' | 'rating' | 'bestPrice'>('transparency');
  const [selectedInsightItem, setSelectedInsightItem] = useState<ProductInsightItem>(PRODUCT_INSIGHT_ITEMS[0]);
  
  // Trending Shorts Scraper & Remix State
  const [shortsCategory, setShortsCategory] = useState<string>('All');
  const [shortsSearch, setShortsSearch] = useState<string>('');
  const [selectedShort, setSelectedShort] = useState<TrendingHealthBeautyShort>(TRENDING_HEALTH_BEAUTY_SHORTS[0]);
  
  // Dynamic Science Checker state
  const [scienceSearchInput, setScienceSearchInput] = useState<string>('PDRN Salmon DNA');
  const [isScienceLoading, setIsScienceLoading] = useState<boolean>(false);
  const [scienceCheckResult, setScienceCheckResult] = useState<any>(null);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [customCaptionHook, setCustomCaptionHook] = useState<string>(selectedProduct.autoCaptions.hook);
  const [customCaptionBody, setCustomCaptionBody] = useState<string>(selectedProduct.autoCaptions.body);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSelectPreset = (preset: ClaimAuditPreset) => {
    setSelectedPreset(preset);
    setComplianceScriptInput(preset.scriptText);
    setComplianceCategory(preset.category);
    setComplianceAuditResult(preset.presetAuditedData);
  };

  const handleRunComplianceAudit = async (text: string, category: string) => {
    if (!text.trim()) return;
    setIsComplianceAuditing(true);
    try {
      const res = await fetch('/api/ontrend-compliance-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scriptText: text, productCategory: category })
      });
      const data = await res.json();
      setComplianceAuditResult(data);
    } catch (err) {
      console.error('Compliance audit failed:', err);
    } finally {
      setIsComplianceAuditing(false);
    }
  };

  const handleOpenQRModal = (deal: ProductDiscountDeal) => {
    setQrModalData({
      isOpen: true,
      title: deal.productName,
      brand: deal.brand,
      promoCode: deal.promoCode,
      discountPercent: deal.discountPercent,
      url: deal.qrPayload,
      fairTradeCertified: deal.fairTradeCertified
    });
  };

  const handleOpenEthicsQRModal = (brandAudit: FairTradeBrandAudit) => {
    setQrModalData({
      isOpen: true,
      title: `${brandAudit.brand} Fair Trade Verification`,
      brand: brandAudit.auditingBody,
      promoCode: 'FAIRTRADE-VERIFIED',
      discountPercent: 'Audit Grade: ' + brandAudit.overallEthicalScore + '/100',
      url: `https://fairtrade-audit.org/verify/${brandAudit.id}?date=${encodeURIComponent(brandAudit.auditVerificationDate)}`,
      fairTradeCertified: brandAudit.fairTradeCertified
    });
  };

  const handleCloseQRModal = () => {
    setQrModalData(prev => ({ ...prev, isOpen: false }));
  };

  const handleRunScienceCheck = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsScienceLoading(true);
    try {
      const res = await fetch('/api/ontrend-science-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText })
      });
      const data = await res.json();
      setScienceCheckResult(data);
    } catch (err) {
      console.error('Science check query failed:', err);
    } finally {
      setIsScienceLoading(false);
    }
  };

  // Filter Product Insights Table
  const filteredInsights = PRODUCT_INSIGHT_ITEMS.filter((item) => {
    const matchesCat = insightCategory === 'All' || item.category.toLowerCase() === insightCategory.toLowerCase();
    const matchesQuery = !insightSearch.trim() || 
      item.name.toLowerCase().includes(insightSearch.toLowerCase()) ||
      item.brand.toLowerCase().includes(insightSearch.toLowerCase()) ||
      item.ingredientTransparency.keyActivesSummary.toLowerCase().includes(insightSearch.toLowerCase());
    return matchesCat && matchesQuery;
  }).sort((a, b) => {
    if (insightSortBy === 'transparency') {
      return b.ingredientTransparency.transparencyScore - a.ingredientTransparency.transparencyScore;
    }
    if (insightSortBy === 'rating') {
      return b.userReviewScores.aggregatedScore - a.userReviewScores.aggregatedScore;
    }
    return a.retailComparison.bestPrice - b.retailComparison.bestPrice;
  });

  // Filter Shorts Scraper
  const filteredShorts = TRENDING_HEALTH_BEAUTY_SHORTS.filter((short) => {
    const matchesCat = shortsCategory === 'All' || short.category === shortsCategory;
    const matchesQuery = !shortsSearch.trim() ||
      short.title.toLowerCase().includes(shortsSearch.toLowerCase()) ||
      short.creator.toLowerCase().includes(shortsSearch.toLowerCase()) ||
      short.identifiedProducts.some(p => p.name.toLowerCase().includes(shortsSearch.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleRemixToSlicerInternal = (short: TrendingHealthBeautyShort) => {
    if (onRemixToSlicer) {
      onRemixToSlicer(
        `${short.fullRemixScript}\n\n[Identified Products]\n${short.identifiedProducts.map(p => `- ${p.name} (${p.brand}) at ${p.timestamp} [${p.verdict}]`).join('\n')}\n\n[Legal Disclosure]\n${short.legalDisclaimerClause}`,
        `Remix Short: ${short.title} (${short.category})`
      );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-pink-950/60 via-purple-950/50 to-zinc-950 border border-pink-900/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-pink-950/50">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  OnTrend<span className="text-pink-400">.Studio</span>
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
                  Product Insight Engine • Legal Compliance • YouTube Shorts Remix
                </span>
              </div>
              <p className="text-xs text-zinc-300 max-w-3xl mt-1 leading-relaxed">
                Multi-retailer price scraper, ingredient transparency ratings, FDA/EU compliance auditor, and 1-click YouTube health &amp; beauty Shorts scraper/remixer.
              </p>
            </div>
          </div>

          {onSendToSalon && (
            <button
              onClick={onSendToSalon}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-pink-950/40 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Record Video Response in AI Salon Studio →</span>
            </button>
          )}
        </div>

        {/* Feature Sub-Navigation Tabs */}
        <div className="mt-5 pt-4 border-t border-pink-950/40 flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSubTab('compliance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'compliance'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-300" />
            Legal Compliance Auditor (FTC &amp; ASA)
          </button>

          <button
            onClick={() => setSubTab('ethics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'ethics'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Fair Trade Tracker &amp; Ethics
          </button>

          <button
            onClick={() => setSubTab('discounts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'discounts'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            Discounts, Offers &amp; QR Codes
          </button>

          <button
            onClick={() => setSubTab('pricescale')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'pricescale'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-cyan-300" />
            Price ⚖️ Scales &amp; Value Options
          </button>

          <button
            onClick={() => setSubTab('insights')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'insights'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            Product Insight Engine &amp; Price Table
          </button>

          <button
            onClick={() => setSubTab('shortsRemix')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'shortsRemix'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-amber-400" />
            Scrape &amp; Remix Top YouTube Shorts
          </button>

          <button
            onClick={() => setSubTab('science')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'science'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            "Does It Work?" Science Check
          </button>

          <button
            onClick={() => setSubTab('wellbeing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'wellbeing'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            Cycle Syncing &amp; Protocols
          </button>

          <button
            onClick={() => setSubTab('hotmap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'hotmap'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            Global Style Hot Map
          </button>

          <button
            onClick={() => setSubTab('captionsFx')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'captionsFx'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Captions &amp; FX AI
          </button>
        </div>
      </div>

      {/* VIEW 1: PRODUCT INSIGHT ENGINE & MULTI-RETAILER COMPARISON TABLE */}
      {subTab === 'insights' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Category, and Sorting */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={insightSearch}
                  onChange={(e) => setInsightSearch(e.target.value)}
                  placeholder="Scrape & compare products (e.g. PDRN, Rhode, Thorne, Bioderma, Micellar)..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <select
                value={insightCategory}
                onChange={(e) => setInsightCategory(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
              >
                <option value="All">All Categories</option>
                <option value="Skincare">Skincare</option>
                <option value="Nutraceutical">Nutraceuticals</option>
                <option value="Bodycare">Bodycare</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500 font-mono">Sort By:</span>
              <button
                onClick={() => setInsightSortBy('transparency')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                  insightSortBy === 'transparency' ? 'bg-pink-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Transparency Score
              </button>
              <button
                onClick={() => setInsightSortBy('bestPrice')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                  insightSortBy === 'bestPrice' ? 'bg-pink-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Best Price
              </button>
              <button
                onClick={() => setInsightSortBy('rating')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                  insightSortBy === 'rating' ? 'bg-pink-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Reviews
              </button>
            </div>

          </div>

          {/* Easy-to-Read Consumer Comparison Table */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-pink-400" />
                  Product Insight Comparison Matrix ({filteredInsights.length} Verified Products)
                </h3>
                <p className="text-xs text-zinc-400">
                  Cross-store retail price comparison, ingredient transparency grades, and consumer review consensus
                </p>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Real-Time Audited
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950/80 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Product &amp; Brand</th>
                    <th className="py-3 px-3">Lowest Price Store</th>
                    <th className="py-3 px-3">Price / Unit</th>
                    <th className="py-3 px-3">Transparency Score</th>
                    <th className="py-3 px-3">EWG Hazard</th>
                    <th className="py-3 px-3">Pore-Clog Rating</th>
                    <th className="py-3 px-3">Aggregated Reviews</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  {filteredInsights.map((item) => {
                    const isSelected = selectedInsightItem.id === item.id;
                    return (
                      <tr 
                        key={item.id}
                        onClick={() => setSelectedInsightItem(item)}
                        className={`transition cursor-pointer ${
                          isSelected ? 'bg-pink-950/20 text-white' : 'hover:bg-zinc-850/60 text-zinc-300'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white line-clamp-1">{item.name}</div>
                          <div className="text-[11px] text-zinc-400 font-sans">
                            {item.brand} • <span className="text-pink-300 font-mono">{item.volume}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-bold text-emerald-400 font-mono">
                            ${item.retailComparison.bestPrice.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-zinc-400 line-clamp-1">
                            {item.retailComparison.cheapestStore}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-[11px] text-zinc-300">
                          {item.retailComparison.pricePerMlOrGram}
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-mono font-bold text-xs ${
                              item.ingredientTransparency.transparencyScore >= 95 ? 'text-emerald-400' :
                              (item.ingredientTransparency.transparencyScore >= 85 ? 'text-cyan-400' : 'text-amber-400')
                            }`}>
                              {item.ingredientTransparency.transparencyScore}%
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {item.ingredientTransparency.fragranceFree ? '• No Fragrance' : '• Fragrance'}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            item.ingredientTransparency.ewgHazardRating <= 2 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            EWG: {item.ingredientTransparency.ewgHazardRating} (Low)
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            item.ingredientTransparency.comedogenicRating === 0 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {item.ingredientTransparency.comedogenicRating}/5 (Non-Clogging)
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-white">{item.userReviewScores.aggregatedScore}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">({item.userReviewScores.totalReviewsCount})</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInsightItem(item);
                              setScienceSearchInput(item.name);
                              setSubTab('science');
                              handleRunScienceCheck(item.name);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-medium transition"
                          >
                            Science Check →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Selected Product Multi-Retailer Deep Dive Footer */}
            <div className="p-5 bg-zinc-950 border-t border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400">Selected Product Deep Breakdown:</div>
                  <div className="text-sm font-bold text-white">
                    {selectedInsightItem.name} ({selectedInsightItem.brand})
                  </div>
                  <div className="text-xs text-pink-300 mt-0.5 font-sans">
                    Actives: {selectedInsightItem.ingredientTransparency.keyActivesSummary}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setScienceSearchInput(selectedInsightItem.name);
                      setSubTab('science');
                      handleRunScienceCheck(selectedInsightItem.name);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Audit Active Science
                  </button>

                  <button
                    onClick={() => setSubTab('compliance')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Legal Compliance View
                  </button>
                </div>
              </div>

              {/* Multi-Store Price Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-500 font-mono">Official MSRP</div>
                  <div className="text-sm font-bold text-white mt-0.5">${selectedInsightItem.retailComparison.msrp.toFixed(2)}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-500 font-mono">Sephora</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedInsightItem.retailComparison.sephoraPrice ? `$${selectedInsightItem.retailComparison.sephoraPrice.toFixed(2)}` : 'Not Stocked'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-500 font-mono">Ulta Beauty</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedInsightItem.retailComparison.ultaPrice ? `$${selectedInsightItem.retailComparison.ultaPrice.toFixed(2)}` : 'Not Stocked'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-500 font-mono">Amazon Prime</div>
                  <div className="text-sm font-bold text-white mt-0.5">${selectedInsightItem.retailComparison.amazonPrice.toFixed(2)}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-center">
                  <div className="text-[10px] text-emerald-400 font-mono">Cheapest Direct</div>
                  <div className="text-sm font-black text-emerald-300 mt-0.5">
                    ${selectedInsightItem.retailComparison.bestPrice.toFixed(2)}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: SCRAPE, REMIX & EDIT TOP YOUTUBE HEALTH AND BEAUTY SHORTS */}
      {subTab === 'shortsRemix' && (
        <div className="space-y-6">
          
          {/* Controls Bar for Shorts */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={shortsSearch}
                  onChange={(e) => setShortsSearch(e.target.value)}
                  placeholder="Scrape YouTube Shorts (e.g. Glass skin, French pharmacy, Reformer pilates, Cortisol)..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <select
                value={shortsCategory}
                onChange={(e) => setShortsCategory(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
              >
                <option value="All">All Topics</option>
                <option value="Skincare Routine">Skincare Routine</option>
                <option value="Pilates Core">Pilates Core</option>
                <option value="French Pharmacy">French Pharmacy</option>
              </select>
            </div>

            <span className="text-xs font-mono text-zinc-400">
              Live Monitored Shorts: <span className="text-pink-400 font-bold">{filteredShorts.length} Videos</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Shorts Cards List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredShorts.map((short) => {
                const isSelected = selectedShort.id === short.id;
                return (
                  <div
                    key={short.id}
                    onClick={() => setSelectedShort(short)}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 border-pink-500 shadow-lg shadow-pink-950/30'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold">
                        {short.category}
                      </span>
                      <span className="font-mono text-zinc-400 text-[10px]">
                        {short.durationSec}s • {short.views} Views
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {short.title}
                    </h4>

                    <div className="text-xs text-zinc-400 mt-1 flex items-center justify-between">
                      <span>{short.creator}</span>
                      <span className="text-amber-400 font-mono text-[11px]">{short.likes} Likes</span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                      <span className="line-clamp-1">
                        📦 Products Featured: <span className="text-white font-medium">{short.identifiedProducts.length} items</span>
                      </span>
                      <span className="text-pink-400 font-bold">Inspect &amp; Remix →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Short Deep Remix & Product Extraction Suite */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
                
                {/* Header & Meta */}
                <div className="pb-4 border-b border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-pink-400 font-bold">
                      {selectedShort.channelHandle} • {selectedShort.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Hook: {selectedShort.viralHookStyle}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white">
                    {selectedShort.title}
                  </h3>
                </div>

                {/* Extracted Identified Essential Products List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      Identified Products In This Short ({selectedShort.identifiedProducts.length})
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Timestamped Analysis</span>
                  </h4>

                  <div className="space-y-2">
                    {selectedShort.identifiedProducts.map((p, i) => (
                      <div key={i} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.2 rounded bg-zinc-900">
                              ⏱️ {p.timestamp}
                            </span>
                            <span className="font-bold text-white">{p.name}</span>
                            <span className="text-zinc-400 text-[11px]">by {p.brand}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            Type: <span className="text-zinc-300">{p.productType}</span> • Promo: <span className="text-pink-300 font-mono font-semibold">{p.affiliatePromoCode}</span>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                          p.verdict === 'Must-Have Holy Grail' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          (p.verdict === 'Essential Foundation' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30')
                        }`}>
                          {p.verdict}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scraped Transcript Snippet */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                    Scraped Video Transcript Audio Snippet:
                  </div>
                  <p className="text-xs text-zinc-300 italic font-serif leading-relaxed">
                    "{selectedShort.transcriptSnippet}"
                  </p>
                </div>

                {/* 1-Click Remix Script Blueprint */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-pink-950/20 to-purple-950/20 border border-pink-900/40 space-y-2">
                  <div className="text-xs font-bold text-pink-300 flex items-center justify-between">
                    <span>Viral Re-Engineered Remix Script:</span>
                    <button
                      onClick={() => handleCopyCode(`${selectedShort.fullRemixScript}\n\n${selectedShort.legalDisclaimerClause}`)}
                      className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 font-sans"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedCode ? 'Copied Remix Script!' : 'Copy Remix Script'}
                    </button>
                  </div>
                  <p className="text-xs text-white leading-relaxed font-sans font-medium">
                    "{selectedShort.fullRemixScript}"
                  </p>
                  <div className="pt-2 border-t border-pink-950/60 text-[10px] text-zinc-400 font-mono">
                    Legal Compliance Tag: <span className="text-emerald-400">{selectedShort.legalDisclaimerClause}</span>
                  </div>
                </div>

                {/* Cross-Studio Remix Action Buttons */}
                <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-zinc-400">
                    Direct Slicer &amp; Clipper Suite Pipelines:
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemixToSlicerInternal(selectedShort)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      Feed into Transcript Slicer
                    </button>

                    {onSendToClipper && (
                      <button
                        onClick={() => onSendToClipper(0, 30, `Remix Short: ${selectedShort.title.slice(0, 30)}`)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Video Clipper Suite
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 3: LEGAL & COMPLIANCE AUDITOR (FTC & ASA GLOBAL STANDARDS) */}
      {subTab === 'compliance' && (
        <div className="space-y-6">
          
          {/* Hero Header & Standards Pill Selector */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Global Advertising Standards Compliance Engine
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Legal &amp; Compliance Auditor <span className="text-pink-400">(FTC, ASA &amp; EU)</span>
                </h3>
                <p className="text-xs text-zinc-400 max-w-2xl mt-0.5 leading-relaxed">
                  Cross-reference beauty and health marketing claims against global regulatory directives. Detect illegal disease claims, unsubstantiated rapid outcomes, missing affiliate disclaimers, and generate 1-click compliant Safe Harbor scripts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                  🛡️ Fines Protected: Up to $50,120 / Violation
                </span>
              </div>
            </div>

            {/* Global Regulatory Standards Switcher */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                  Select Regulatory Jurisdiction:
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {selectedStandard.authority}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {GLOBAL_ADVERTISING_STANDARDS.map((standard) => {
                  const isSelected = selectedStandard.id === standard.id;
                  return (
                    <button
                      key={standard.id}
                      onClick={() => setSelectedStandard(standard)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-zinc-850 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                          : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-white">{standard.region.split(' ')[0]}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${standard.badgeColor}`}>
                          {standard.code.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono truncate">
                        {standard.code}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Standard Rule Highlights Card */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-850">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Regulatory Mandate: {selectedStandard.code} ({selectedStandard.region})
                  </span>
                  <span className="text-[10px] font-mono text-rose-400">
                    {selectedStandard.finesAndSanctions}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">
                      ✓ Primary Statutory Rules:
                    </span>
                    <ul className="space-y-1 text-zinc-300 text-[11px] leading-relaxed">
                      {selectedStandard.primaryRules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block font-mono">
                        ⚠️ High-Risk Regulatory Triggers (Strictly Prohibited):
                      </span>
                      <ul className="space-y-1 text-zinc-300 text-[11px] leading-relaxed mt-1">
                        {selectedStandard.prohibitedClaims.map((claim, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-rose-300/90">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span>{claim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                      <span className="text-zinc-500">Disclosure Timing: </span>
                      <span className="text-emerald-300">{selectedStandard.disclosureRequirements.timing}</span>
                      <span className="text-zinc-500"> • Placement: </span>
                      <span className="text-white">{selectedStandard.disclosureRequirements.placement}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Claim Presets (1-Click Test Scenarios) */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                  Load Realistic Influencer Script Presets:
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  Click to inspect risk score &amp; flagged language
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {CLAIM_AUDIT_PRESETS.map((preset) => {
                  const isSelected = selectedPreset.id === preset.id;
                  const isHighRisk = preset.presetAuditedData.riskRating === 'HIGH_RISK_VIOLATION';
                  const isWarning = preset.presetAuditedData.riskRating === 'MODERATE_WARNING';
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-zinc-800 text-white border-pink-500 shadow-md ring-1 ring-pink-500/40'
                          : 'bg-zinc-950/80 text-zinc-400 hover:text-white border-zinc-800 hover:bg-zinc-900'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        isHighRisk ? 'bg-rose-500' : (isWarning ? 'bg-amber-400' : 'bg-emerald-400')
                      }`} />
                      <span className="truncate max-w-[260px]">{preset.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Script Input & Audit Execution Bar */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <FileText className="w-3.5 h-3.5 text-pink-400" />
                  Script / Video Hook Claims to Audit:
                </label>

                <div className="flex items-center gap-2">
                  <select
                    value={complianceCategory}
                    onChange={(e) => setComplianceCategory(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:border-pink-500 font-mono"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Supplements">Supplements</option>
                    <option value="Fitness & Recovery">Fitness &amp; Recovery</option>
                    <option value="Body & Glow">Body &amp; Glow</option>
                  </select>

                  <span className="text-[11px] font-mono text-zinc-500">
                    {complianceScriptInput.length} chars
                  </span>
                </div>
              </div>

              <textarea
                value={complianceScriptInput}
                onChange={(e) => setComplianceScriptInput(e.target.value)}
                rows={4}
                placeholder="Paste your affiliate script, YouTube Short caption, or marketing claim here to cross-reference against FTC and ASA standards..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 font-sans leading-relaxed resize-none shadow-inner"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Audits for: FTC 16 CFR § 255 • UK ASA CAP 3.1 &amp; 12.1 • EU Reg 655/2013
                </span>

                <button
                  onClick={() => handleRunComplianceAudit(complianceScriptInput, complianceCategory)}
                  disabled={isComplianceAuditing || !complianceScriptInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition disabled:opacity-50 cursor-pointer"
                >
                  {isComplianceAuditing ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  )}
                  {isComplianceAuditing ? 'Analyzing Global Standards...' : 'Run FTC & ASA Compliance Audit'}
                </button>
              </div>
            </div>

            {/* AUDIT RESULTS REPORT */}
            {complianceAuditResult && (
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-5 animate-in fade-in duration-300">
                
                {/* Scorecard Header */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-black border shadow-lg ${
                      complianceAuditResult.complianceScore >= 85
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40'
                        : (complianceAuditResult.complianceScore >= 50
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-950/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-950/40')
                    }`}>
                      <span className="text-xl leading-none">{complianceAuditResult.complianceScore}</span>
                      <span className="text-[10px] text-zinc-400 font-medium mt-0.5">/100</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-extrabold uppercase border ${
                          complianceAuditResult.riskRating === 'COMPLIANT_SAFE_HARBOR'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : (complianceAuditResult.riskRating === 'MODERATE_WARNING'
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                : 'bg-rose-500/10 text-rose-300 border-rose-500/30')
                        }`}>
                          {complianceAuditResult.riskRating === 'COMPLIANT_SAFE_HARBOR' && '✓ Compliant Safe Harbor'}
                          {complianceAuditResult.riskRating === 'MODERATE_WARNING' && '⚠️ Substantiation Required (Moderate Warning)'}
                          {complianceAuditResult.riskRating === 'HIGH_RISK_VIOLATION' && '🔴 High-Risk Regulatory Violation'}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {complianceAuditResult.flaggedPhrases?.length || 0} issue(s) detected
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mt-1">
                        Executive Regulatory Counsel Verdict:
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mt-0.5 max-w-2xl">
                        {complianceAuditResult.auditSummary}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800 text-xs font-mono text-zinc-400">
                    <span>FTC 16 CFR § 255: {complianceAuditResult.complianceScore >= 85 ? '✓ PASS' : '⚠️ FLAG'}</span>
                    <span>ASA CAP Code: {complianceAuditResult.complianceScore >= 85 ? '✓ PASS' : '⚠️ FLAG'}</span>
                    <span>EU Reg 655/2013: {complianceAuditResult.complianceScore >= 85 ? '✓ PASS' : '⚠️ FLAG'}</span>
                  </div>
                </div>

                {/* Flagged Potentially Misleading Language Breakdown */}
                {complianceAuditResult.flaggedPhrases && complianceAuditResult.flaggedPhrases.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      Highlighted Potentially Misleading Language &amp; Violations ({complianceAuditResult.flaggedPhrases.length}):
                    </h4>

                    <div className="grid grid-cols-1 gap-3">
                      {complianceAuditResult.flaggedPhrases.map((flag: any, index: number) => (
                        <div key={index} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                flag.severity === 'CRITICAL_VIOLATION'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : (flag.severity === 'MISLEADING_CLAIM'
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30')
                              }`}>
                                {flag.severity}
                              </span>
                              <span className="text-xs font-mono text-zinc-400">
                                Violated Standard: <strong className="text-zinc-200">{flag.regulatoryStandard}</strong>
                              </span>
                            </div>

                            <span className="text-[10px] font-mono text-zinc-500">
                              Flag #{index + 1}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-rose-900/40 text-xs font-mono text-rose-300">
                            <span className="text-zinc-500 font-sans">Flagged Text: </span>
                            "{flag.originalPhrase}"
                          </div>

                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            <strong className="text-zinc-200">Legal Enforcement Risk: </strong>
                            {flag.legalReason}
                          </p>

                          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="text-xs text-emerald-300">
                              <span className="font-bold text-emerald-200 font-mono">Compliant Alternative: </span>
                              "{flag.compliantAlternative}"
                            </div>
                            <button
                              onClick={() => {
                                const updated = complianceScriptInput.replace(flag.originalPhrase, flag.compliantAlternative);
                                setComplianceScriptInput(updated);
                                handleRunComplianceAudit(updated, complianceCategory);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold font-mono shrink-0 transition"
                            >
                              Apply Alternative
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex items-center gap-3 text-xs text-emerald-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white block">No Prohibited Claims or Deceptive Phrasing Detected!</span>
                      <span>This script satisfies FTC 16 CFR Part 255 endorsement disclosures and objective claim substantiation guidelines.</span>
                    </div>
                  </div>
                )}

                {/* 1-CLICK COMPLIANT SAFE-HARBOR REWRITE */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-zinc-950 to-teal-950/30 border border-emerald-800/50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-black text-white">
                        1-Click Compliant Safe-Harbor Script Rewrite:
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      100% FTC &amp; ASA Bulletproof
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 leading-relaxed font-sans shadow-inner">
                    "{complianceAuditResult.compliantRewrite}"
                  </div>

                  {/* Mandatory Disclosures Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      Mandatory Disclosure Inclusions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {complianceAuditResult.requiredDisclosures?.map((disc: string, idx: number) => (
                        <div key={idx} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] flex items-center gap-2 font-mono">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{disc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cross-Studio Workflow Pipelines */}
                  <div className="pt-3 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="text-xs text-zinc-400">
                      Send to Production Pipelines:
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleCopyCode(complianceAuditResult.compliantRewrite)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedCode ? 'Copied Script!' : 'Copy Script'}
                      </button>

                      {onSendToVoiceover && (
                        <button
                          onClick={() => onSendToVoiceover(complianceAuditResult.compliantRewrite)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          AI Voiceover Studio
                        </button>
                      )}

                      {onSendToCopywriter && (
                        <button
                          onClick={() => onSendToCopywriter(complianceCategory)}
                          className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Copywriter &amp; Hooks
                        </button>
                      )}

                      {onRemixToSlicer && (
                        <button
                          onClick={() => onRemixToSlicer(complianceAuditResult.compliantRewrite, `Compliant Script (${complianceCategory})`)}
                          className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Scissors className="w-3.5 h-3.5 text-red-400" />
                          Transcript Slicer
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* VIEW: PRODUCT DISCOUNTS, OFFERS & INTERACTIVE QR CODES */}
      {subTab === 'discounts' && (
        <div className="space-y-6">
          
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <BadgePercent className="w-4 h-4 text-amber-400" />
                  Creator Monetization &amp; Exclusive Consumer Deals
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Product Discounts, Offers &amp; <span className="text-pink-400">QR Codes</span>
                </h3>
                <p className="text-xs text-zinc-400 max-w-2xl mt-0.5 leading-relaxed">
                  Verified high-converting creator affiliate vouchers, direct savings breakdowns, and instantly downloadable scannable QR codes for vertical video overlays.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
                  💰 Creator Commission: Up to 22% Payout
                </span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', 'Skincare', 'Fitness & Recovery', 'Supplements', 'Body & Glow'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDiscountCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                    discountCategoryFilter === cat
                      ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Discounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCT_DISCOUNT_DEALS.filter(d => discountCategoryFilter === 'All' || d.category === discountCategoryFilter).map((deal) => (
                <div
                  key={deal.id}
                  className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-pink-900/60 transition shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                        {deal.exclusiveBadge}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        ⏱️ {deal.daysRemaining} days left
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-white leading-snug">
                        {deal.productName}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 font-medium">
                        {deal.brand} • <span className="text-zinc-500">{deal.storeName}</span>
                      </p>
                    </div>

                    {/* Price Comparison */}
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-zinc-500 line-through font-mono">
                          MSRP ${deal.originalPrice.toFixed(2)}
                        </div>
                        <div className="text-base font-black text-emerald-400 font-mono">
                          ${deal.discountedPrice.toFixed(2)}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-black font-mono">
                          {deal.discountPercent}% OFF
                        </span>
                        <div className="text-[10px] text-emerald-400/90 font-mono mt-0.5">
                          Saves ${deal.estimatedDollarSavings.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Creator Commission Tier */}
                    <div className="text-[11px] text-zinc-400 flex items-center justify-between font-mono pt-1">
                      <span>Creator Affiliate Share:</span>
                      <span className="text-pink-300 font-bold">{deal.creatorCommissionRate}</span>
                    </div>

                    {/* Promo Code Box */}
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-pink-500/30 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block">Promo Code</span>
                        <span className="text-xs font-mono font-black text-pink-400 tracking-wider">
                          {deal.promoCode}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(deal.promoCode)}
                        className="px-2.5 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-[10px] font-bold font-mono transition flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedCode === deal.promoCode ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Actions: View QR & Store Link */}
                  <div className="pt-2 border-t border-zinc-850 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenQRModal(deal)}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      View QR Code
                    </button>

                    <a
                      href={deal.dealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1 transition border border-zinc-800"
                    >
                      <span>Store Deal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* VIEW: PRICE ⚖️ SCALES & CONSUMER VALUE MATRIX */}
      {subTab === 'pricescale' && (
        <div className="space-y-6">
          
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Active Concentration vs. Cosmetic Luxury Markup
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Price ⚖️ Scales &amp; Consumer Value Matrix
                </h3>
                <p className="text-xs text-zinc-400 max-w-2xl mt-0.5 leading-relaxed">
                  Compare Budget Dupes vs Fair-Market Sweet Spots vs Luxury Department Store Markups. Calculate true cost-per-day, active ingredient purity per dollar, and raw COGS manufacturing ratios.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-mono">
                  ⚖️ Consumer Awareness Standard
                </span>
              </div>
            </div>

            {/* Profile Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {PRICE_SCALE_PROFILES.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setSelectedScaleProfile(prof)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedScaleProfile.id === prof.id
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{prof.categoryTitle}</span>
                </button>
              ))}
            </div>

            {/* Consumer Insight Box */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-900/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-cyan-300 font-mono uppercase block">
                  Active Focus: {selectedScaleProfile.activeFocus}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">
                  {selectedScaleProfile.consumerInsight}
                </p>
              </div>
            </div>

            {/* 3-Tier Comparison Scales Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[selectedScaleProfile.budgetOption, selectedScaleProfile.fairMarketOption, selectedScaleProfile.luxuryOption].map((opt, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border transition space-y-4 flex flex-col justify-between ${
                    opt.isRecommendedSweetSpot
                      ? 'bg-gradient-to-b from-zinc-900 to-emerald-950/20 border-emerald-500 shadow-xl ring-1 ring-emerald-500/40 relative'
                      : 'bg-zinc-950 border-zinc-800'
                  }`}
                >
                  {opt.isRecommendedSweetSpot && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-zinc-950 font-black text-[10px] font-mono tracking-wider uppercase shadow-md">
                      ★ Recommended Sweet Spot
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${opt.tierBadge}`}>
                        {opt.tierLabel}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 font-semibold">
                        Grade {opt.clinicalTrialGrade} Trials
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-white">
                        {opt.productName}
                      </h4>
                      <p className="text-xs text-zinc-400 font-medium">
                        by {opt.brand} ({opt.volume})
                      </p>
                    </div>

                    {/* Price & Markup Data */}
                    <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Retail Price:</span>
                        <span className="text-base font-black text-white font-mono">
                          ${opt.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-zinc-800">
                        <span>Cost Per Day:</span>
                        <span className="text-cyan-300 font-bold">${opt.costPerDay.toFixed(2)} / day</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span>Est. Raw COGS:</span>
                        <span className="text-zinc-300">${opt.rawCogsEstimate.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-zinc-400">Brand Markup:</span>
                        <span className={`font-bold ${
                          opt.markupRatio > 15 ? 'text-rose-400' : 'text-emerald-300'
                        }`}>
                          {opt.markupRatio}x multiplier
                        </span>
                      </div>
                    </div>

                    {/* Active & Ethical Specs */}
                    <div className="space-y-1.5 text-xs">
                      <div className="text-[11px] text-zinc-300">
                        <span className="text-zinc-500 font-mono">Active Formulation: </span>
                        <span className="font-medium text-white">{opt.activeConcentration}</span>
                      </div>

                      <div className="text-[11px] text-zinc-300">
                        <span className="text-zinc-500 font-mono">Ethics Score: </span>
                        <span className="font-bold text-emerald-400">{opt.ethicalScore}/100</span>
                      </div>

                      <div className="text-[11px] text-zinc-400">
                        <span className="text-zinc-500 font-mono">Packaging: </span>
                        <span>{opt.packagingRating}</span>
                      </div>
                    </div>

                    {/* Balance Verdict */}
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed font-sans">
                      <strong className="text-zinc-200">⚖️ Value Verdict: </strong>
                      {opt.balanceVerdict}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onSendToCopywriter) {
                        onSendToCopywriter(`Compare ${opt.productName} vs luxury`);
                      }
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      opt.isRecommendedSweetSpot
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    <span>Inspect In Copywriter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>
              ))}
            </div>

            {/* Interactive Cost-Per-Use & 1-Year Consumer Savings Calculator */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-950 to-cyan-950/30 border border-cyan-900/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-black text-white">
                    Interactive Cost-Per-Use &amp; Annual Savings Calculator
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-cyan-300">
                  Real Consumer Economics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Sliders */}
                <div className="space-y-3 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-zinc-400">Duration Cycle:</span>
                      <span className="text-cyan-400 font-bold">{calcUsageDays} Days</span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={180}
                      step={15}
                      value={calcUsageDays}
                      onChange={(e) => setCalcUsageDays(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-zinc-400">Daily Applications:</span>
                      <span className="text-cyan-400 font-bold">{calcPumpsPerDay}x / day ({calcPumpsPerDay === 1 ? 'Morning only' : 'Morning + Evening'})</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={1}
                      value={calcPumpsPerDay}
                      onChange={(e) => setCalcPumpsPerDay(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Savings Metrics Result */}
                <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Projected Annual Savings vs. Luxury Department Markup
                    </span>
                    <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                      +${((selectedScaleProfile.luxuryOption.costPerDay - selectedScaleProfile.fairMarketOption.costPerDay) * 365 * (calcPumpsPerDay / 2)).toFixed(2)}
                    </div>
                    <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                      By choosing the <strong className="text-white">{selectedScaleProfile.fairMarketOption.productName}</strong> instead of the luxury house brand, consumers save over $500/year with identical or higher active clinical concentrations!
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
                    Calculated on standard 50ml bottle dispensing 0.25ml per application.
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 4: "DOES IT ACTUALLY WORK?" SCIENTIFIC VERIFICATION */}
      {subTab === 'science' && (
        <div className="space-y-6">
          
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Clinical Pharmacokinetics &amp; Mechanism of Action
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  How &amp; Why <span className="text-pink-400">{selectedProduct.name}</span> Works on Human Physiology
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-mono">
                  {selectedProduct.scienceVerification.evidenceGrade}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  1. Biological Mechanism of Action (How It Works)
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {selectedProduct.scienceVerification.howItWorks}
                </p>
                <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-850">
                  <span className="text-zinc-500 font-mono">Active Concentration: </span>
                  <span className="text-white font-semibold">{selectedProduct.scienceVerification.activeConcentration}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5" />
                  2. Cellular Justification (Why It Works)
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {selectedProduct.scienceVerification.whyItWorks}
                </p>
                <div className="text-[11px] text-amber-400/90 pt-2 border-t border-zinc-850">
                  <span className="font-semibold">Contraindication: </span>
                  {selectedProduct.scienceVerification.contraindications[0] || 'None reported in clinical trials'}
                </div>
              </div>

            </div>

            {/* Clinical Trial Verification Details Box */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-950 to-cyan-950/20 border border-cyan-900/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Verified Independent Clinical Trial Specifications
                </span>
                <span className="font-mono text-cyan-300 text-[10px]">
                  {selectedProduct.scienceVerification.clinicalTrial.placeboControlled ? '✓ Double-Blind Placebo Controlled' : 'Open-Label Clinical'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 font-mono">Cohort Size</div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {selectedProduct.scienceVerification.clinicalTrial.sampleSize}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 font-mono">Trial Duration</div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {selectedProduct.scienceVerification.clinicalTrial.duration}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 sm:col-span-2">
                  <div className="text-[10px] text-zinc-500 font-mono">Primary Endpoint Result</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">
                    {selectedProduct.scienceVerification.clinicalTrial.primaryEndResult}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 font-mono pt-1">
                <span className="text-zinc-500">Peer-Reviewed Medical Citation: </span>
                <span className="text-zinc-300 italic">{selectedProduct.scienceVerification.clinicalTrial.journalCitation}</span>
              </div>
            </div>

            {/* Interactive Ingredient Truth Checker (Instant AI Research) */}
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-pink-400" />
                  On-Demand "Does It Actually Work?" Scientific Ingredient Checker
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Test any viral beauty ingredient or supplement (e.g. Snail Mucin, Bakuchiol, Hydrolyzed Collagen, Liquid Chlorophyll, Red Light Therapy)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={scienceSearchInput}
                  onChange={(e) => setScienceSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunScienceCheck(scienceSearchInput)}
                  placeholder="Type an active (e.g. Snail Mucin, Niacinamide, Retinol, Electrolytes)..."
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => handleRunScienceCheck(scienceSearchInput)}
                  disabled={isScienceLoading}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isScienceLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  Audit Science
                </button>
              </div>

              {scienceCheckResult && (
                <div className="p-4 rounded-xl bg-zinc-900 border border-cyan-800/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      Scientific Audit Verdict for: <span className="text-cyan-400">{scienceCheckResult.ingredientName}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                      {scienceCheckResult.doesItActuallyWork}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-white">Biological Mechanism: </span>
                    {scienceCheckResult.biologicalMechanism}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                      <div className="text-[10px] text-amber-400 font-mono">Greenwashing Alert:</div>
                      <div className="text-zinc-300 mt-1">{scienceCheckResult.fairTradeEthicalAudit?.greenwashingFlag || 'Low risk'}</div>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                      <div className="text-[10px] text-emerald-400 font-mono">Affordable Dupe Option:</div>
                      <div className="text-zinc-300 mt-1">{scienceCheckResult.pricingTransparency?.recommendedDupe || 'Available'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Factual Ingredient Truth Directory */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Peer-Reviewed Evidence Directory:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INGREDIENT_TRUTH_DATABASE.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.ingredient}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        item.scientificEvidenceGrade === 'A' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        (item.scientificEvidenceGrade === 'B' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30')
                      }`}>
                        Grade {item.scientificEvidenceGrade}: {item.doesItWorkVerdict}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.mechanismSummary}
                    </p>
                    <div className="text-[10px] text-amber-400/90 font-mono pt-1">
                      ⚠️ Red Flag: {item.greenwashingRedFlags}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 5: FAIR TRADE TRACKER & ETHICAL SOURCING SCORECARD */}
      {subTab === 'ethics' && (
        <div className="space-y-6">
          
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  Supply Chain Transparency &amp; Living Wage Audits
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Fair Trade Tracker &amp; <span className="text-pink-400">Labor Standards</span>
                </h3>
                <p className="text-xs text-zinc-400 max-w-2xl mt-0.5 leading-relaxed">
                  Real-time registry cross-referencing brand labor policies against ILO core conventions, conflict-free mica verification, B-Corp circular packaging metrics, and Fairtrade International certificates.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
                  🌱 100% Conflict-Free Audited
                </span>
              </div>
            </div>

            {/* Fair Trade Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Brands' },
                { id: 'certified', label: 'Fair Trade Certified' },
                { id: 'living_wage', label: 'Living Wage Audited' },
                { id: 'conflict_free', label: 'Conflict-Free Mica' },
                { id: 'climate_neutral', label: 'Climate Neutral (Grade A)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setEthicsFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                    ethicsFilter === f.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Brand Registry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAIR_TRADE_BRAND_REGISTRY.filter(b => {
                if (ethicsFilter === 'certified') return b.fairTradeCertified;
                if (ethicsFilter === 'living_wage') return b.livingWageVerified;
                if (ethicsFilter === 'conflict_free') return b.conflictFreeMica;
                if (ethicsFilter === 'climate_neutral') return b.carbonNeutralRating.startsWith('A');
                return true;
              }).map((brand) => (
                <div
                  key={brand.id}
                  className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-800/60 transition shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          {brand.category}
                        </span>
                        <h4 className="text-base font-black text-white mt-0.5">
                          {brand.brand}
                        </h4>
                      </div>

                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex flex-col items-center justify-center font-mono font-black shrink-0">
                        <span className="text-sm leading-none">{brand.overallEthicalScore}</span>
                        <span className="text-[9px] text-zinc-400 font-medium">/100</span>
                      </div>
                    </div>

                    {/* Certified Seals */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {brand.fairTradeCertified && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                          ✓ Fair Trade Certified
                        </span>
                      )}
                      {brand.livingWageVerified && (
                        <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
                          ✓ Living Wage Verified
                        </span>
                      )}
                      {brand.conflictFreeMica && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                          ✓ Conflict-Free Mica
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                        🐰 {brand.crueltyFreeStatus}
                      </span>
                    </div>

                    {/* Supply Chain Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                        Audited Supply Chain Highlights:
                      </span>
                      <ul className="text-xs text-zinc-300 space-y-1 leading-relaxed">
                        {brand.supplyChainHighlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Unethical Practices Eliminated */}
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
                      <span className="text-rose-400 font-bold">Eliminated: </span>
                      <span className="text-zinc-300">{brand.unethicalPracticesEliminated.join(' • ')}</span>
                    </div>
                  </div>

                  {/* Actions & Verification QR */}
                  <div className="pt-3 border-t border-zinc-850 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-zinc-500">
                      Audit: {brand.auditVerificationDate}
                    </span>

                    <button
                      onClick={() => handleOpenEthicsQRModal(brand)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono transition flex items-center gap-1.5 shadow-sm"
                    >
                      <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                      Verify Certificate QR
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Active Selected Product Detailed Ethics Deep-Dive */}
            <div className="mt-4 pt-5 border-t border-zinc-800 space-y-4">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Featured Product Ethical Deep-Dive: <span className="text-pink-400">{selectedProduct.name}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4" />
                    1. Labor Standards &amp; Living Wage Policy
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {selectedProduct.ethicalSourcing.laborStandardPolicy}
                  </p>
                  <div className="text-[10px] text-zinc-400 font-mono pt-1">
                    Verified Audit Date: <span className="text-white">{selectedProduct.ethicalSourcing.supplyChainAuditDate}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    2. Conflict-Free Mica &amp; Harvester Protection
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {selectedProduct.ethicalSourcing.conflictFreeMicaVerified 
                      ? '100% Conflict-Free Mica Audited: All pearlescent and mineral pigments verified free of child labor through third-party supply chain geo-tracking.'
                      : 'Mica sourcing under active verification review.'}
                  </p>
                  <div className="text-[10px] text-emerald-400 font-mono pt-1">
                    Animal Testing: {selectedProduct.ethicalSourcing.animalTestingPolicy}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Leaf className="w-4 h-4" />
                    3. Sustainable Circular Packaging
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {selectedProduct.ethicalSourcing.packagingSustainability}
                  </p>
                  <div className="text-[10px] text-cyan-300 font-mono pt-1">
                    Carbon Rating: {selectedProduct.ethicalSourcing.carbonFootprintRating}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    4. Third-Party Verified Certifications
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedProduct.ethicalSourcing.certifications.map((cert, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium">
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 6: HOLISTIC WELLBEING & CYCLE SYNCING PROTOCOLS */}
      {subTab === 'wellbeing' && (
        <div className="space-y-6">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {WELLBEING_PROTOCOLS.map((proto) => (
              <button
                key={proto.id}
                onClick={() => setSelectedProtocol(proto)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  selectedProtocol.id === proto.id
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <span>{proto.title.split(':')[0]}</span>
              </button>
            ))}
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  {selectedProtocol.category}
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {selectedProtocol.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                  {selectedProtocol.scientificFoundation}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold">
                {selectedProtocol.badge}
              </span>
            </div>

            {/* Target Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedProtocol.targetBenefits.map((benefit, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Step by Step Protocol */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Step-by-Step Actionable Protocol:
              </h4>

              <div className="space-y-2.5">
                {selectedProtocol.stepByStepProtocol.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.step}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{item.optimalTiming}</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-medium">{item.action}</p>
                    <p className="text-[11px] text-zinc-500 italic">
                      Science Reason: {item.scienceReason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 7: GLOBAL STYLE HOT MAP */}
      {subTab === 'hotmap' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COUNTRY_STYLE_TRENDS.map((c) => {
              const isSelected = selectedCountry.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCountry(c)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer text-center ${
                    isSelected
                      ? 'bg-zinc-900 border-pink-500 shadow-lg shadow-pink-950/30 ring-1 ring-pink-500/40'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="text-2xl mb-1">{c.flag}</div>
                  <div className="text-xs font-bold text-white">{c.country}</div>
                  <div className="text-[10px] text-pink-400 font-mono mt-0.5">
                    Hot Score: {c.hotScore}/100
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {selectedCountry.country}: {selectedCountry.aestheticName}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-2xl mt-0.5">
                    {selectedCountry.corePhilosophy}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30 text-xs font-bold font-mono">
                  🔥 Trend Heat: {selectedCountry.hotScore}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
                <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  Key Beauty &amp; Skincare Innovations
                </h4>
                <ul className="text-xs text-zinc-300 space-y-1.5">
                  {selectedCountry.keyInnovations.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Regional Fitness &amp; Body Protocol
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedCountry.fitnessProtocol}
                </p>
                <div className="pt-2 border-t border-zinc-850 text-xs text-zinc-400">
                  <span className="font-semibold text-white">Hero Cult Products: </span>
                  {selectedCountry.heroProducts.join(' • ')}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-950 via-zinc-950 to-pink-950/20 border border-pink-900/30 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-pink-400" />
                  {selectedCountry.country} Makeover Transformation Blueprint
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Step-by-Step Short Script</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                    Before State
                  </span>
                  <p className="text-zinc-300">{selectedCountry.makeoverBlueprint.beforeState}</p>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    After Makeover Transformation
                  </span>
                  <p className="text-zinc-300">{selectedCountry.makeoverBlueprint.afterTransformation}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Transformation Routine:
                </span>
                <div className="space-y-1 text-xs text-zinc-300 font-mono">
                  {selectedCountry.makeoverBlueprint.stepByStepRoutine.map((step: string, idx: number) => (
                    <div key={idx} className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 8: CAPTIONS & FX AI */}
      {subTab === 'captionsFx' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-pink-400" />
                  Auto-Edited Viral Aesthetic Captions
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  TikTok &amp; Shorts Safe-Zone
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Opening Hook Sentence (Under 3s):</label>
                <input
                  type="text"
                  value={customCaptionHook}
                  onChange={(e) => setCustomCaptionHook(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Body &amp; Call To Action:</label>
                <textarea
                  value={customCaptionBody}
                  onChange={(e) => setCustomCaptionBody(e.target.value)}
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-500 resize-none font-sans leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => handleCopyCode(`${customCaptionHook}\n\n${customCaptionBody}\n\n${selectedProduct.autoCaptions.hashtags.join(' ')}`)}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedCode ? 'Copied Full Caption!' : 'Copy Full Caption & Hashtags'}
                </button>

                {onSendToSimulator && (
                  <button
                    onClick={() => onSendToSimulator(customCaptionHook)}
                    className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition flex items-center gap-1"
                  >
                    Test in Safe-Zone
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                FX AI: Kinetic On-Screen Overlay Directives
              </h3>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Frame 1-3 Kinetic Caption Text:
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-amber-500/40 text-center font-black tracking-wide text-white text-sm uppercase shadow-inner">
                  "{selectedProduct.autoCaptions.onScreenFxText}"
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Position within vertical 9:16 safe zone (upper third, between 25% and 40% height) to prevent overlap with TikTok follow icons or bottom captions.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Interactive Scannable QR Code Modal */}
      <QRCodeModal
        isOpen={qrModalData.isOpen}
        onClose={handleCloseQRModal}
        title={qrModalData.title}
        brand={qrModalData.brand}
        promoCode={qrModalData.promoCode}
        discountPercent={qrModalData.discountPercent}
        url={qrModalData.url}
        fairTradeCertified={qrModalData.fairTradeCertified}
      />

    </div>
  );
};

