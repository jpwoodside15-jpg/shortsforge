import { NicheProfitabilityGenre } from '../types';

export const NICHE_PROFITABILITY_GENRES: NicheProfitabilityGenre[] = [
  {
    id: 'hightech_reviews',
    name: 'High-Tech Reviews & AI Software',
    shortName: 'High-Tech Reviews',
    category: 'High-Ticket & SaaS',
    cpm: 24.50,
    shortsRpm: 0.35,
    affiliateConversionRate: 3.8, // 3.8% of viewers convert on software trials / purchases
    avgOrderValue: 85.0, // High SaaS recurring commissions ($50 - $120)
    monthlyViewsBenchmark: 2800000,
    viralityVelocityScore: 78,
    productionDifficultyHours: 2.5,
    netProfitabilityScore: 94,
    quadrant: 'Q1: Goldmine (High CPM + High Conv)',
    color: '#06b6d4', // Cyan
    accentBg: 'bg-cyan-500/15',
    borderColor: 'border-cyan-500/40',
    topAffiliateProgram: 'Notion, Make.com, Midjourney & AI Tools (30% Lifetime Recurring)',
    sampleHook: 'Stop paying $20/month for ChatGPT until you see these 3 free local AI models running on Mac...',
    primaryRevenueSource: 'Recurring SaaS Software Subscriptions + High AdSense CPM',
    wiseMonthlyPayoutEst: 18450 // £18,450 to Sort Code 60-84-64
  },
  {
    id: 'kids_animation',
    name: 'Kids 3D Animation & Moral Fables',
    shortName: 'Kids 3D Animation',
    category: 'High-Volume Entertainment',
    cpm: 5.80,
    shortsRpm: 0.85, // Kids shorts repeat loops produce very high RPM for shorts
    affiliateConversionRate: 0.4, // Lower direct impulse sales
    avgOrderValue: 24.0, // Amazon toy links, bedtime story audiobooks
    monthlyViewsBenchmark: 35000000, // Massive volume
    viralityVelocityScore: 98,
    productionDifficultyHours: 1.8,
    netProfitabilityScore: 91,
    quadrant: 'Q3: Viral Scale (High Vol)',
    color: '#f59e0b', // Amber
    accentBg: 'bg-amber-500/15',
    borderColor: 'border-amber-500/40',
    topAffiliateProgram: 'Amazon Associates (Kids Educational Toys, Plushies & Bedtime Books)',
    sampleHook: 'Barnaby the sleepy owl thought he was lost in the enchanted forest, until...',
    primaryRevenueSource: 'Sheer AdSense View Velocity (35M+ views/mo) + Kids Toy Merchandising',
    wiseMonthlyPayoutEst: 23600 // £23,600 to Sort Code 60-84-64
  },
  {
    id: 'finance_wealth',
    name: 'Finance, Crypto & Wealth Strategy',
    shortName: 'Finance & Wealth',
    category: 'High-Ticket & SaaS',
    cpm: 38.00,
    shortsRpm: 0.42,
    affiliateConversionRate: 3.2,
    avgOrderValue: 95.0,
    monthlyViewsBenchmark: 2200000,
    viralityVelocityScore: 72,
    productionDifficultyHours: 2.0,
    netProfitabilityScore: 96,
    quadrant: 'Q1: Goldmine (High CPM + High Conv)',
    color: '#10b981', // Emerald
    accentBg: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/40',
    topAffiliateProgram: 'TradingView, Interactive Brokers, Wise Referral & Tax Spreadsheets ($75 - $150 CPA)',
    sampleHook: 'How the top 1% legally save £10,000 every year using the residential lease loophole...',
    primaryRevenueSource: 'High-Ticket Financial Lead Gen + Peak CPM Advertisers',
    wiseMonthlyPayoutEst: 21500 // £21,500 to Sort Code 60-84-64
  },
  {
    id: 'films_cinema',
    name: 'Films & Cinema Plot Recaps',
    shortName: 'Cinema & Film Recaps',
    category: 'High-Volume Entertainment',
    cpm: 9.20,
    shortsRpm: 0.28,
    affiliateConversionRate: 1.1,
    avgOrderValue: 18.0,
    monthlyViewsBenchmark: 18000000,
    viralityVelocityScore: 92,
    productionDifficultyHours: 1.2,
    netProfitabilityScore: 84,
    quadrant: 'Q3: Viral Scale (High Vol)',
    color: '#a855f7', // Purple
    accentBg: 'bg-purple-500/15',
    borderColor: 'border-purple-500/40',
    topAffiliateProgram: 'ExpressVPN & Streaming Subscription Free Trials ($22 CPA)',
    sampleHook: 'Notice the ring on Cobb’s finger in Inception? In the waking world, it vanishes...',
    primaryRevenueSource: 'Binge-Watch Audience Retention + VPN / Entertainment Affiliates',
    wiseMonthlyPayoutEst: 14200 // £14,200 to Sort Code 60-84-64
  },
  {
    id: 'viral_clippers',
    name: 'Viral Clipper & Podcast Highlights',
    shortName: 'Viral Clipper',
    category: 'High-Volume Entertainment',
    cpm: 7.50,
    shortsRpm: 0.25,
    affiliateConversionRate: 1.4,
    avgOrderValue: 35.0,
    monthlyViewsBenchmark: 22000000,
    viralityVelocityScore: 95,
    productionDifficultyHours: 0.8,
    netProfitabilityScore: 82,
    quadrant: 'Q3: Viral Scale (High Vol)',
    color: '#f43f5e', // Rose
    accentBg: 'bg-rose-500/15',
    borderColor: 'border-rose-500/40',
    topAffiliateProgram: 'Audible, Blinkist & Morning Brew Newsletter Referrals ($3-$5 per signup)',
    sampleHook: 'Joe Rogan was completely stunned when this neuroscientist revealed what happens after 3 hours of doom-scrolling...',
    primaryRevenueSource: 'Rapid Multi-Post Velocity (3-5 Shorts Daily) + Newsletter Sponsor Payouts',
    wiseMonthlyPayoutEst: 13800 // £13,800 to Sort Code 60-84-64
  },
  {
    id: 'health_fitness',
    name: 'Biohacking & Peak Physical Health',
    shortName: 'Health & Biohacking',
    category: 'Specialist & Lifestyle',
    cpm: 16.50,
    shortsRpm: 0.30,
    affiliateConversionRate: 2.8,
    avgOrderValue: 65.0,
    monthlyViewsBenchmark: 4500000,
    viralityVelocityScore: 81,
    productionDifficultyHours: 1.6,
    netProfitabilityScore: 89,
    quadrant: 'Q1: Goldmine (High CPM + High Conv)',
    color: '#ec4899', // Pink
    accentBg: 'bg-pink-500/15',
    borderColor: 'border-pink-500/40',
    topAffiliateProgram: 'Athletic Greens (AG1), Whoop Band & Cold Plunge Systems ($40-$80 CPA)',
    sampleHook: 'Stop drinking morning coffee on an empty stomach. Do this 90-second routine instead...',
    primaryRevenueSource: 'High-LTV Health Supplement Subscriptions & Wearables',
    wiseMonthlyPayoutEst: 16200 // £16,200 to Sort Code 60-84-64
  },
  {
    id: 'craftsman_engineering',
    name: 'DIY Craftsman & Restoration Engineering',
    shortName: 'Craftsman & Engineering',
    category: 'Specialist & Lifestyle',
    cpm: 14.20,
    shortsRpm: 0.29,
    affiliateConversionRate: 2.1,
    avgOrderValue: 48.0,
    monthlyViewsBenchmark: 6200000,
    viralityVelocityScore: 86,
    productionDifficultyHours: 2.2,
    netProfitabilityScore: 86,
    quadrant: 'Q2: Prestige (High CPM)',
    color: '#eab308', // Yellow
    accentBg: 'bg-yellow-500/15',
    borderColor: 'border-yellow-500/40',
    topAffiliateProgram: 'Amazon Associates (Woodworking, Laser Cutters & Epoxy Toolkits)',
    sampleHook: 'Restoring a rusty 1940s watchmaker lathe found in an abandoned workshop...',
    primaryRevenueSource: 'Oddly Satisfying Long Watch-Time + High Hardware Tool Basket Sizes',
    wiseMonthlyPayoutEst: 12900 // £12,900 to Sort Code 60-84-64
  },
  {
    id: 'luxury_travel',
    name: 'Luxury Travel & 3D Drone Tours',
    shortName: 'Luxury Travel 3D',
    category: 'Specialist & Lifestyle',
    cpm: 21.00,
    shortsRpm: 0.32,
    affiliateConversionRate: 1.6,
    avgOrderValue: 120.0,
    monthlyViewsBenchmark: 3400000,
    viralityVelocityScore: 75,
    productionDifficultyHours: 2.0,
    netProfitabilityScore: 87,
    quadrant: 'Q2: Prestige (High CPM)',
    color: '#3b82f6', // Blue
    accentBg: 'bg-blue-500/15',
    borderColor: 'border-blue-500/40',
    topAffiliateProgram: 'Booking.com, Expedia & Luxury Villa Affiliate Networks (5-10% of $1,500 bookings)',
    sampleHook: 'The $50,000 per night overwater villa in Bora Bora with a private water slide into the lagoon...',
    primaryRevenueSource: 'High-Ticket Tourism Sponsorships & Luxury Booking Commissions',
    wiseMonthlyPayoutEst: 15400 // £15,400 to Sort Code 60-84-64
  }
];

export interface GenreHeadToHeadComparison {
  genreA: string;
  genreB: string;
  title: string;
  summary: string;
  metrics: Array<{
    label: string;
    valA: string;
    valB: string;
    winner: 'A' | 'B' | 'TIE';
    explanation: string;
  }>;
  strategicVerdict: string;
}

export const HEAD_TO_HEAD_KIDS_VS_HIGHTECH: GenreHeadToHeadComparison = {
  genreA: 'kids_animation',
  genreB: 'hightech_reviews',
  title: 'Kids 3D Animation vs. High-Tech Reviews & AI Software',
  summary: 'The ultimate comparison between the highest volume virality engine (Kids Animation) and the highest monetization efficiency engine (High-Tech Reviews).',
  metrics: [
    {
      label: 'Long-Form CPM / Advertiser Bid',
      valA: '$5.80 / 1,000 views',
      valB: '$24.50 / 1,000 views',
      winner: 'B',
      explanation: 'Tech advertisers bid 4.2x higher CPMs due to high enterprise budgets and purchasing intent.'
    },
    {
      label: 'Monthly View Velocity Benchmark',
      valA: '35,000,000 Views',
      valB: '2,800,000 Views',
      winner: 'A',
      explanation: 'Kids animation achieves 12.5x more views through intense auto-repeat viewing and global universal appeal.'
    },
    {
      label: 'Affiliate Conversion Rate',
      valA: '0.4% Conversion',
      valB: '3.8% Conversion',
      winner: 'B',
      explanation: 'High-tech reviews solve acute workflow pain, leading to 9.5x higher purchase conversion rates.'
    },
    {
      label: 'Average Affiliate Payout per Sale',
      valA: '$24.00 (Toys / Books)',
      valB: '$85.00 (30% Recurring SaaS)',
      winner: 'B',
      explanation: 'SaaS and tech tools pay compounding monthly recurring revenue compared to one-time physical toy sales.'
    },
    {
      label: 'Global Multi-Language Scalability',
      valA: '100% Universal (No Barrier)',
      valB: 'Requires Local Tech Context',
      winner: 'A',
      explanation: 'A cute 3D character fable works seamlessly across 24 languages with minimal cultural friction.'
    },
    {
      label: 'Estimated Net Monthly Payout (Wise GBP)',
      valA: '£23,600 / month',
      valB: '£18,450 / month',
      winner: 'A',
      explanation: 'Due to astronomical view volume (35M views), Kids Animation edges out in gross monthly payout despite lower CPM!'
    }
  ],
  strategicVerdict: 'Both niches are world-class revenue generators: High-Tech Reviews requires fewer views to generate high five-figure incomes via SaaS affiliates, while Kids Animation scales to nine-figure view totals with massive toy merchandising and family-friendly advertiser safety.'
};
