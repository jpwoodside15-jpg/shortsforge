import React, { useState, useMemo } from 'react';
import { 
  DollarSign, TrendingUp, Sparkles, PieChart as PieIcon, 
  BarChart3, ArrowUpRight, Copy, Check, Sliders, 
  Layers, Percent, Eye, ShoppingCart, HelpCircle, 
  Award, ShieldCheck, Zap, ArrowRight, Download, RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend, BarChart, Bar, Cell, 
  PieChart, Pie 
} from 'recharts';

export interface NicheBenchmark {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeColor: string;
  defaultRpm: number; // Shorts feed ad RPM per 1,000 views
  longformCpm: number; // Long-form / sponsor CPM benchmark
  defaultLinkCtr: number; // % of viewers clicking pinned comment
  defaultConversionRate: number; // % of link clickers who purchase
  defaultCommission: number; // Average affiliate commission payout per sale
  defaultSponsorFeePer100k: number; // Flat sponsor shoutout fee per 100k views
  recommendedProgram: string;
  monetizationStrategy: string;
}

export const NICHE_BENCHMARKS: NicheBenchmark[] = [
  {
    id: 'finance',
    name: 'Finance, Crypto & Wealth',
    category: 'High-Ticket Finance',
    badge: '★ Highest RPM',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    defaultRpm: 0.28,
    longformCpm: 45.0,
    defaultLinkCtr: 3.2,
    defaultConversionRate: 2.1,
    defaultCommission: 85.0,
    defaultSponsorFeePer100k: 550,
    recommendedProgram: 'TradingView & Interactive Brokers ($50 - $150 CPA)',
    monetizationStrategy: 'Pin tax-advantaged tools, budget spreadsheets, and broker sign-up bonuses.'
  },
  {
    id: 'saas',
    name: 'SaaS, Tech & AI Tools',
    category: 'Recurring SaaS',
    badge: '🔁 30% Recurring LTV',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    defaultRpm: 0.22,
    longformCpm: 34.0,
    defaultLinkCtr: 3.8,
    defaultConversionRate: 2.6,
    defaultCommission: 48.0,
    defaultSponsorFeePer100k: 450,
    recommendedProgram: 'Notion, Make.com & AI Studio Subscriptions (30% Lifetime)',
    monetizationStrategy: 'Showcase "1-click automation before/after" workflows with direct bio links.'
  },
  {
    id: 'health',
    name: 'Health, Beauty & Fitness',
    category: 'Physical & Supplements',
    badge: '🔥 Highest Conversion Volume',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    defaultRpm: 0.18,
    longformCpm: 26.0,
    defaultLinkCtr: 4.5,
    defaultConversionRate: 3.2,
    defaultCommission: 28.0,
    defaultSponsorFeePer100k: 350,
    recommendedProgram: 'K-Beauty PDRN Serums & Magnesium Glycinate Brands (20% RevShare)',
    monetizationStrategy: 'Demonstrate aesthetic transformation hooks, pin discount codes in frame 1.'
  },
  {
    id: 'luxury',
    name: 'Luxury, Gadgets & EDC',
    category: 'Consumer High-Ticket',
    badge: '💎 High Cart Value',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    defaultRpm: 0.19,
    longformCpm: 28.0,
    defaultLinkCtr: 2.8,
    defaultConversionRate: 1.8,
    defaultCommission: 65.0,
    defaultSponsorFeePer100k: 400,
    recommendedProgram: 'Bespoke Post, Ridge Wallet & Smart Home Gear (15% - 25% CPS)',
    monetizationStrategy: 'Unboxing sensory micro-cuts, unboxing EDC pocket dump setups.'
  },
  {
    id: 'career',
    name: 'Career, Remote Work & Hustles',
    category: 'Digital Courses & Info',
    badge: '🚀 High Intent Audience',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    defaultRpm: 0.16,
    longformCpm: 22.0,
    defaultLinkCtr: 3.5,
    defaultConversionRate: 2.3,
    defaultCommission: 42.0,
    defaultSponsorFeePer100k: 300,
    recommendedProgram: 'Coursera, Skillshare & Resume AI Builders ($25 - $60 CPA)',
    monetizationStrategy: 'Pain-point callouts on 9-to-5 burnout with free checklist lead magnets.'
  },
  {
    id: 'gaming',
    name: 'Gaming, Memes & Pop Culture',
    category: 'High-Volume Entertainment',
    badge: '🎮 Megaviral Reach',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    defaultRpm: 0.10,
    longformCpm: 12.0,
    defaultLinkCtr: 1.8,
    defaultConversionRate: 1.4,
    defaultCommission: 18.0,
    defaultSponsorFeePer100k: 180,
    recommendedProgram: 'GamerSupps, Secretlab Chairs & VPN Trials (10% - 20%)',
    monetizationStrategy: 'High-energy gameplay clips with pinned creator discount codes.'
  }
];

interface ProfitProjectionToolProps {
  onSendToCopywriter?: (niche: string) => void;
}

export const ProfitProjectionTool: React.FC<ProfitProjectionToolProps> = ({
  onSendToCopywriter
}) => {
  // Selected niche
  const [selectedNiche, setSelectedNiche] = useState<NicheBenchmark>(NICHE_BENCHMARKS[0]);
  
  // Interactive Slider Parameters
  const [viewsPerShort, setViewsPerShort] = useState<number>(75000);
  const [shortsPerMonth, setShortsPerMonth] = useState<number>(30); // 1 per day
  const [adRpm, setAdRpm] = useState<number>(NICHE_BENCHMARKS[0].defaultRpm);
  const [linkCtr, setLinkCtr] = useState<number>(NICHE_BENCHMARKS[0].defaultLinkCtr);
  const [conversionRate, setConversionRate] = useState<number>(NICHE_BENCHMARKS[0].defaultConversionRate);
  const [commissionPayout, setCommissionPayout] = useState<number>(NICHE_BENCHMARKS[0].defaultCommission);
  const [includeSponsors, setIncludeSponsors] = useState<boolean>(true);
  const [sponsorFeePer100k, setSponsorFeePer100k] = useState<number>(NICHE_BENCHMARKS[0].defaultSponsorFeePer100k);
  
  // Scenario toggles: 'conservative' | 'realistic' | 'viral'
  const [scenario, setScenario] = useState<'conservative' | 'realistic' | 'viral'>('realistic');

  // Copy state
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // When switching niche, auto-fill recommended benchmarks
  const handleSelectNiche = (niche: NicheBenchmark) => {
    setSelectedNiche(niche);
    setAdRpm(niche.defaultRpm);
    setLinkCtr(niche.defaultLinkCtr);
    setConversionRate(niche.defaultConversionRate);
    setCommissionPayout(niche.defaultCommission);
    setSponsorFeePer100k(niche.defaultSponsorFeePer100k);
  };

  // 1-Click Scenario adjustments
  const handleApplyScenario = (type: 'conservative' | 'realistic' | 'viral') => {
    setScenario(type);
    if (type === 'conservative') {
      setViewsPerShort(Math.max(15000, Math.round(viewsPerShort * 0.5)));
      setLinkCtr(Number((selectedNiche.defaultLinkCtr * 0.7).toFixed(1)));
      setConversionRate(Number((selectedNiche.defaultConversionRate * 0.7).toFixed(1)));
    } else if (type === 'realistic') {
      setViewsPerShort(75000);
      setLinkCtr(selectedNiche.defaultLinkCtr);
      setConversionRate(selectedNiche.defaultConversionRate);
    } else {
      // viral
      setViewsPerShort(Math.max(250000, Math.round(viewsPerShort * 2.5)));
      setLinkCtr(Number((selectedNiche.defaultLinkCtr * 1.3).toFixed(1)));
      setConversionRate(Number((selectedNiche.defaultConversionRate * 1.25).toFixed(1)));
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    const totalMonthlyViews = viewsPerShort * shortsPerMonth;
    const totalAnnualViews = totalMonthlyViews * 12;

    // 1. YouTube Shorts Feed Ad Revenue (pooled ad share)
    const monthlyAdRevenue = (totalMonthlyViews / 1000) * adRpm;
    const annualAdRevenue = monthlyAdRevenue * 12;

    // 2. Affiliate Conversion Engine
    const monthlyLinkClicks = Math.round(totalMonthlyViews * (linkCtr / 100));
    const monthlyConversions = Math.round(monthlyLinkClicks * (conversionRate / 100));
    const monthlyAffiliateRevenue = monthlyConversions * commissionPayout;
    const annualAffiliateRevenue = monthlyAffiliateRevenue * 12;

    // 3. Brand Sponsorships / Direct Integrations
    const monthlySponsorRevenue = includeSponsors 
      ? (totalMonthlyViews / 100000) * sponsorFeePer100k 
      : 0;
    const annualSponsorRevenue = monthlySponsorRevenue * 12;

    // 4. Totals
    const totalMonthlyProfit = monthlyAdRevenue + monthlyAffiliateRevenue + monthlySponsorRevenue;
    const totalAnnualProfit = totalMonthlyProfit * 12;

    // 5. Per-Unit Metrics
    const profitPerShort = shortsPerMonth > 0 ? totalMonthlyProfit / shortsPerMonth : 0;
    
    // Effective RPM (eRPM) = Total Dollars earned per 1,000 views
    const effectiveRpm = totalMonthlyViews > 0 ? (totalMonthlyProfit / totalMonthlyViews) * 1000 : 0;

    // Income Percentages
    const affiliateShare = totalMonthlyProfit > 0 ? (monthlyAffiliateRevenue / totalMonthlyProfit) * 100 : 0;
    const adShare = totalMonthlyProfit > 0 ? (monthlyAdRevenue / totalMonthlyProfit) * 100 : 0;
    const sponsorShare = totalMonthlyProfit > 0 ? (monthlySponsorRevenue / totalMonthlyProfit) * 100 : 0;

    return {
      totalMonthlyViews,
      totalAnnualViews,
      monthlyAdRevenue,
      annualAdRevenue,
      monthlyLinkClicks,
      monthlyConversions,
      monthlyAffiliateRevenue,
      annualAffiliateRevenue,
      monthlySponsorRevenue,
      annualSponsorRevenue,
      totalMonthlyProfit,
      totalAnnualProfit,
      profitPerShort,
      effectiveRpm,
      affiliateShare,
      adShare,
      sponsorShare
    };
  }, [viewsPerShort, shortsPerMonth, adRpm, linkCtr, conversionRate, commissionPayout, includeSponsors, sponsorFeePer100k]);

  // Chart Data: 6-Month Compounding Revenue Trajectory
  const timelineChartData = useMemo(() => {
    return [
      {
        month: 'Month 1',
        AdSense: Math.round(calculations.monthlyAdRevenue * 0.8),
        Affiliate: Math.round(calculations.monthlyAffiliateRevenue * 0.7),
        Sponsorships: Math.round(calculations.monthlySponsorRevenue * 0.5),
        Total: Math.round(calculations.monthlyAdRevenue * 0.8 + calculations.monthlyAffiliateRevenue * 0.7 + calculations.monthlySponsorRevenue * 0.5)
      },
      {
        month: 'Month 2',
        AdSense: Math.round(calculations.monthlyAdRevenue * 0.95),
        Affiliate: Math.round(calculations.monthlyAffiliateRevenue * 0.9),
        Sponsorships: Math.round(calculations.monthlySponsorRevenue * 0.8),
        Total: Math.round(calculations.monthlyAdRevenue * 0.95 + calculations.monthlyAffiliateRevenue * 0.9 + calculations.monthlySponsorRevenue * 0.8)
      },
      {
        month: 'Month 3',
        AdSense: Math.round(calculations.monthlyAdRevenue * 1.1),
        Affiliate: Math.round(calculations.monthlyAffiliateRevenue * 1.15),
        Sponsorships: Math.round(calculations.monthlySponsorRevenue * 1.0),
        Total: Math.round(calculations.monthlyAdRevenue * 1.1 + calculations.monthlyAffiliateRevenue * 1.15 + calculations.monthlySponsorRevenue * 1.0)
      },
      {
        month: 'Month 4',
        AdSense: Math.round(calculations.monthlyAdRevenue * 1.25),
        Affiliate: Math.round(calculations.monthlyAffiliateRevenue * 1.4),
        Sponsorships: Math.round(calculations.monthlySponsorRevenue * 1.2),
        Total: Math.round(calculations.monthlyAdRevenue * 1.25 + calculations.monthlyAffiliateRevenue * 1.4 + calculations.monthlySponsorRevenue * 1.2)
      },
      {
        month: 'Month 5',
        AdSense: Math.round(calculations.monthlyAdRevenue * 1.45),
        Affiliate: Math.round(calculations.monthlyAffiliateRevenue * 1.7),
        Sponsorships: Math.round(calculations.monthlySponsorRevenue * 1.5),
        Total: Math.round(calculations.monthlyAdRevenue * 1.45 + calculations.monthlyAffiliateRevenue * 1.7 + calculations.monthlySponsorRevenue * 1.5)
      },
      {
        month: 'Month 6',
        AdSense: Math.round(calculations.monthlyAdRevenue * 1.7),
        Affiliate: Math.round(calculations.monthlyAffiliateRevenue * 2.1),
        Sponsorships: Math.round(calculations.monthlySponsorRevenue * 1.8),
        Total: Math.round(calculations.monthlyAdRevenue * 1.7 + calculations.monthlyAffiliateRevenue * 2.1 + calculations.monthlySponsorRevenue * 1.8)
      }
    ];
  }, [calculations]);

  // Donut Share Data
  const streamDistributionData = useMemo(() => {
    return [
      { name: 'Affiliate Commissions', value: Math.round(calculations.monthlyAffiliateRevenue), color: '#f59e0b' },
      { name: 'Brand Sponsorships', value: Math.round(calculations.monthlySponsorRevenue), color: '#a855f7' },
      { name: 'YouTube AdSense', value: Math.round(calculations.monthlyAdRevenue), color: '#10b981' }
    ].filter(d => d.value > 0);
  }, [calculations]);

  // Conversion Funnel Data
  const funnelData = useMemo(() => {
    return [
      { stage: '1. Total Views', count: calculations.totalMonthlyViews, label: `${(calculations.totalMonthlyViews / 1000).toFixed(0)}k Views` },
      { stage: '2. Pinned Clicks', count: calculations.monthlyLinkClicks, label: `${calculations.monthlyLinkClicks.toLocaleString()} Clicks (${linkCtr}%)` },
      { stage: '3. Conversions', count: calculations.monthlyConversions, label: `${calculations.monthlyConversions.toLocaleString()} Sales (${conversionRate}%)` },
      { stage: '4. Monthly Profit', count: Math.round(calculations.totalMonthlyProfit), label: `$${Math.round(calculations.totalMonthlyProfit).toLocaleString()}` }
    ];
  }, [calculations, linkCtr, conversionRate]);

  const handleCopySummary = () => {
    const text = `📊 ShortsForge AI Profit Projection:
• Niche: ${selectedNiche.name} (${selectedNiche.category})
• Monthly Views: ${calculations.totalMonthlyViews.toLocaleString()} (${viewsPerShort.toLocaleString()} avg/short across ${shortsPerMonth} shorts)
• Projected Monthly Revenue: $${calculations.totalMonthlyProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
• Projected Annual Revenue: $${calculations.totalAnnualProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
• Earnings Per Short: $${calculations.profitPerShort.toFixed(2)}
• Effective RPM: $${calculations.effectiveRpm.toFixed(2)} per 1k views (vs standard YouTube $0.15)
• Affiliate Revenue (${calculations.affiliateShare.toFixed(0)}%): $${calculations.monthlyAffiliateRevenue.toLocaleString()}/mo (${calculations.monthlyConversions} sales @ $${commissionPayout}/sale)
• AdSense Revenue (${calculations.adShare.toFixed(0)}%): $${calculations.monthlyAdRevenue.toLocaleString()}/mo
• Sponsorship Revenue (${calculations.sponsorShare.toFixed(0)}%): $${calculations.monthlySponsorRevenue.toLocaleString()}/mo
Generated via ShortsForge AI`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-zinc-950 to-amber-950/50 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/40 shadow-inner">
                <DollarSign className="w-5 h-5 text-emerald-300" />
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Shorts Profit Projection <span className="text-emerald-400">&amp; ROI Engine</span>
              </h2>
            </div>
            <p className="text-xs text-zinc-300 max-w-2xl mt-1 leading-relaxed">
              Model real earnings beyond tiny 10¢ AdSense pool payouts. Calculate true profit by combining niche ad RPM, high-ticket affiliate conversion funnels, and sponsor placements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{copiedSummary ? 'Copied Projection!' : 'Export Financial Summary'}</span>
            </button>
          </div>
        </div>

        {/* 1-Click Scenario Quick Toggles */}
        <div className="mt-5 pt-4 border-t border-emerald-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Scenario Presets:
            </span>
            <div className="inline-flex rounded-xl bg-zinc-950/80 p-1 border border-zinc-800">
              <button
                onClick={() => handleApplyScenario('conservative')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  scenario === 'conservative'
                    ? 'bg-zinc-800 text-amber-300 border border-amber-500/30 shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                🛡️ Conservative
              </button>
              <button
                onClick={() => handleApplyScenario('realistic')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  scenario === 'realistic'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ⚡ Expected (Realistic)
              </button>
              <button
                onClick={() => handleApplyScenario('viral')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  scenario === 'viral'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                🚀 Viral Breakout
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
            <span>
              Monthly Output: <strong className="text-white">{shortsPerMonth} Shorts</strong>
            </span>
            <span>•</span>
            <span>
              Monthly Views: <strong className="text-emerald-400">{(calculations.totalMonthlyViews / 1000).toLocaleString()}K Views</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Results Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Projected Monthly Profit */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/40 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Projected Monthly Profit
            </span>
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-white font-mono tracking-tight">
            ${calculations.totalMonthlyProfit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            <span className="text-xs font-normal text-zinc-400 font-sans ml-1">/mo</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-mono font-medium flex items-center justify-between">
            <span>≈ ${(calculations.totalMonthlyProfit / 30).toFixed(0)} / day</span>
            <span className="text-zinc-400">100% Faceless</span>
          </div>
        </div>

        {/* KPI 2: Projected Annual Run-Rate */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Projected Annual Revenue
            </span>
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-amber-300 font-mono tracking-tight">
            ${calculations.totalAnnualProfit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            <span className="text-xs font-normal text-zinc-400 font-sans ml-1">/yr</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400 font-mono flex items-center justify-between">
            <span>Annual views: {(calculations.totalAnnualViews / 1000000).toFixed(1)}M</span>
            <span className="text-amber-400 font-bold">12-Mo Run Rate</span>
          </div>
        </div>

        {/* KPI 3: Effective RPM (eRPM) */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              Effective RPM (eRPM)
            </span>
            <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-cyan-300 font-mono tracking-tight">
            ${calculations.effectiveRpm.toFixed(2)}
            <span className="text-xs font-normal text-zinc-400 font-sans ml-1">/1k views</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400 font-mono flex items-center justify-between">
            <span>Pure AdSense: ${adRpm.toFixed(2)}</span>
            <span className="text-emerald-400 font-bold">
              +{(calculations.effectiveRpm / (adRpm || 0.1)).toFixed(0)}x Leverage
            </span>
          </div>
        </div>

        {/* KPI 4: Earnings Per Single Short */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Earnings Per Short
            </span>
            <span className="p-1 rounded-md bg-purple-500/10 text-purple-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-purple-300 font-mono tracking-tight">
            ${calculations.profitPerShort.toFixed(2)}
            <span className="text-xs font-normal text-zinc-400 font-sans ml-1">/video</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400 font-mono flex items-center justify-between">
            <span>At {viewsPerShort.toLocaleString()} views</span>
            <span className="text-purple-400 font-bold">Asset Value</span>
          </div>
        </div>

      </div>

      {/* Main Two-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Niche Selection & Parameter Sliders */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Niche Selector Grid */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                1. Select Niche &amp; Average Industry Benchmarks:
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">6 Vetted Niches</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {NICHE_BENCHMARKS.map((niche) => {
                const isSelected = selectedNiche.id === niche.id;
                return (
                  <button
                    key={niche.id}
                    onClick={() => handleSelectNiche(niche)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 shadow-md ring-1 ring-emerald-500/40 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-bold ${niche.badgeColor}`}>
                          {niche.badge.split(' ')[1] || 'PRO'}
                        </span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      </div>
                      <div className="text-xs font-bold leading-tight line-clamp-1">{niche.name}</div>
                    </div>

                    <div className="mt-2 pt-1 border-t border-zinc-800 text-[10px] font-mono text-emerald-400">
                      Ad RPM: ${niche.defaultRpm.toFixed(2)} • Comm: ${niche.defaultCommission}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Niche Blueprint Highlights */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400">Top Recommended Program:</span>
                <span className="text-emerald-300 font-semibold">{selectedNiche.recommendedProgram}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                <strong className="text-zinc-300 font-mono">Conversion Strategy:</strong> {selectedNiche.monetizationStrategy}
              </p>
            </div>
          </div>

          {/* Interactive Parameters Controls */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-amber-400" />
              2. Fine-Tune Traffic &amp; Conversion Parameters:
            </h3>

            {/* Parameter 1: Views per Short */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Estimated Views per Short:
                </span>
                <span className="font-mono font-bold text-cyan-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  {viewsPerShort.toLocaleString()} views
                </span>
              </div>

              <input
                type="range"
                min={5000}
                max={1000000}
                step={5000}
                value={viewsPerShort}
                onChange={(e) => setViewsPerShort(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <button onClick={() => setViewsPerShort(15000)} className="hover:text-zinc-300">15k</button>
                <button onClick={() => setViewsPerShort(50000)} className="hover:text-zinc-300">50k</button>
                <button onClick={() => setViewsPerShort(150000)} className="hover:text-zinc-300">150k</button>
                <button onClick={() => setViewsPerShort(500000)} className="hover:text-zinc-300">500k</button>
                <button onClick={() => setViewsPerShort(1000000)} className="hover:text-zinc-300">1M+</button>
              </div>
            </div>

            {/* Parameter 2: Shorts per Month */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Shorts Published per Month:
                </span>
                <span className="font-mono font-bold text-purple-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  {shortsPerMonth} shorts / mo ({shortsPerMonth === 30 ? '1/day' : (shortsPerMonth === 60 ? '2/day' : `${(shortsPerMonth / 4.3).toFixed(0)}/wk`)})
                </span>
              </div>

              <input
                type="range"
                min={5}
                max={90}
                step={5}
                value={shortsPerMonth}
                onChange={(e) => setShortsPerMonth(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <button onClick={() => setShortsPerMonth(15)} className="hover:text-zinc-300">15 (3/wk)</button>
                <button onClick={() => setShortsPerMonth(30)} className="hover:text-zinc-300">30 (1/day)</button>
                <button onClick={() => setShortsPerMonth(60)} className="hover:text-zinc-300">60 (2/day)</button>
                <button onClick={() => setShortsPerMonth(90)} className="hover:text-zinc-300">90 (3/day)</button>
              </div>
            </div>

            {/* Parameter 3: Pinned Comment Link CTR */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-amber-400" />
                  Pinned Comment Link Click-Through Rate (CTR):
                </span>
                <span className="font-mono font-bold text-amber-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  {linkCtr.toFixed(1)}% ({calculations.monthlyLinkClicks.toLocaleString()} clicks/mo)
                </span>
              </div>

              <input
                type="range"
                min={0.5}
                max={8.0}
                step={0.1}
                value={linkCtr}
                onChange={(e) => setLinkCtr(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>0.5% (Low)</span>
                <span>2.5% (Average)</span>
                <span>5.0% (High Retention)</span>
                <span>8.0% (Viral Pinned Hook)</span>
              </div>
            </div>

            {/* Parameter 4: Affiliate Sales Conversion Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                  Offer Sales Conversion Rate:
                </span>
                <span className="font-mono font-bold text-emerald-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  {conversionRate.toFixed(1)}% ({calculations.monthlyConversions.toLocaleString()} orders/mo)
                </span>
              </div>

              <input
                type="range"
                min={0.5}
                max={7.0}
                step={0.1}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>0.5% (Cold Traffic)</span>
                <span>2.0% (Vetted Offer)</span>
                <span>4.0% (Warm Audience)</span>
                <span>7.0% (Exclusive Coupon)</span>
              </div>
            </div>

            {/* Parameter 5: Average Commission & Ad RPM Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Avg Commission Payout:</span>
                  <span className="font-mono text-amber-400 font-bold">${commissionPayout.toFixed(0)}</span>
                </label>
                <input
                  type="number"
                  min={5}
                  max={500}
                  step={5}
                  value={commissionPayout}
                  onChange={(e) => setCommissionPayout(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Shorts Feed Ad RPM:</span>
                  <span className="font-mono text-emerald-400 font-bold">${adRpm.toFixed(2)}</span>
                </label>
                <input
                  type="number"
                  min={0.05}
                  max={2.00}
                  step={0.01}
                  value={adRpm}
                  onChange={(e) => setAdRpm(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Sponsorship Integration Toggle */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSponsors}
                    onChange={(e) => setIncludeSponsors(e.target.checked)}
                    className="rounded accent-purple-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Include Direct Brand Deal Sponsorships</span>
                </label>
                <span className="text-[10px] font-mono text-purple-400 font-bold">
                  {includeSponsors ? `$${sponsorFeePer100k} / 100k views` : 'Disabled'}
                </span>
              </div>

              {includeSponsors && (
                <div className="pt-2 text-[11px] text-zinc-400 flex items-center justify-between font-mono">
                  <span>Projected Sponsor Earnings:</span>
                  <span className="text-purple-300 font-bold">${calculations.monthlySponsorRevenue.toFixed(0)} / mo</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Column: Visual Charts & Revenue Distribution Breakdown */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Chart 1: 6-Month Compounding Revenue Growth Trajectory */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                  6-Month Compounding Revenue Trajectory:
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Modeled on evergreen catalog view compounding and repeat affiliate retention
                </p>
              </div>

              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                M6: ${timelineChartData[5].Total.toLocaleString()}/mo
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineChartData}>
                  <defs>
                    <linearGradient id="affiliateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="sponsorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="adsenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickFormatter={(val) => `$${val}`} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '11px' }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="Affiliate" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#affiliateGradient)" stackId="1" />
                  <Area type="monotone" dataKey="Sponsorships" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#sponsorGradient)" stackId="1" />
                  <Area type="monotone" dataKey="AdSense" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#adsenseGradient)" stackId="1" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Income Streams Distribution Breakdown */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <PieIcon className="w-3.5 h-3.5 text-amber-400" />
              Monthly Revenue Stream Breakdown:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Stream 1: Affiliate Commissions */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300">Affiliate Sales</span>
                  <span className="text-xs font-mono font-black text-amber-400">
                    {calculations.affiliateShare.toFixed(0)}%
                  </span>
                </div>
                <div className="text-lg font-black text-white font-mono">
                  ${calculations.monthlyAffiliateRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  <span className="text-[10px] text-zinc-400 font-sans ml-1">/mo</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  {calculations.monthlyConversions} orders @ ${commissionPayout}
                </div>
              </div>

              {/* Stream 2: Brand Deals / Sponsors */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-purple-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-300">Sponsorships</span>
                  <span className="text-xs font-mono font-black text-purple-400">
                    {calculations.sponsorShare.toFixed(0)}%
                  </span>
                </div>
                <div className="text-lg font-black text-white font-mono">
                  ${calculations.monthlySponsorRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  <span className="text-[10px] text-zinc-400 font-sans ml-1">/mo</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  Direct brand integrations
                </div>
              </div>

              {/* Stream 3: YouTube AdSense Pool */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300">Shorts AdShare</span>
                  <span className="text-xs font-mono font-black text-emerald-400">
                    {calculations.adShare.toFixed(0)}%
                  </span>
                </div>
                <div className="text-lg font-black text-white font-mono">
                  ${calculations.monthlyAdRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  <span className="text-[10px] text-zinc-400 font-sans ml-1">/mo</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  Pool RPM: ${adRpm.toFixed(2)}/1k
                </div>
              </div>

            </div>

            {/* Visual Funnel Velocity Bar */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Monthly Traffic &amp; Conversion Funnel Velocity:
              </span>
              
              <div className="space-y-1.5 text-xs font-mono">
                {funnelData.map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-between">
                    <span className="text-zinc-400">{item.stage}:</span>
                    <span className="text-white font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Revenue Optimization Takeaways */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/30 to-amber-950/20 border border-emerald-800/40 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold font-mono">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Strategic Revenue Multiplier Insight:</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                In the <strong className="text-white">{selectedNiche.name}</strong> niche, affiliate earnings account for <strong className="text-amber-300 font-mono">{calculations.affiliateShare.toFixed(0)}%</strong> of your total revenue. Increasing your pinned comment CTR by just <strong className="text-emerald-300 font-mono">+1.0%</strong> will add approximately <strong className="text-emerald-300 font-mono">+${Math.round(calculations.totalMonthlyViews * 0.01 * (conversionRate / 100) * commissionPayout).toLocaleString()}/mo</strong> in pure profit without requiring a single additional view!
              </p>
              
              {onSendToCopywriter && (
                <div className="pt-1">
                  <button
                    onClick={() => onSendToCopywriter(selectedNiche.name)}
                    className="text-xs text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 transition"
                  >
                    <span>Generate High-Converting Pinned Comment Hooks in Copywriter →</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
