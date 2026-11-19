export interface WisePayoutConfig {
  accountHolderName: string;
  email: string;
  wiseTag: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD';
  sortCode?: string; // UK Sort Code (e.g., 60-84-64)
  routingNumber: string; // ACH / ABA routing number
  accountNumber: string; // e.g., 88425941
  bankName: string; // E.g. "Wise Payments Ltd / Community Federal Savings Bank"
  accountType: 'checking' | 'savings';
  country: string;
  autoWithdrawThreshold: number; // e.g. $100
  isVerified: boolean;
  lastVerifiedDate?: string;
  w8BenCompleted: boolean;
  monthlyTargetEarnings: number;
}

export const DEFAULT_WISE_CONFIG: WisePayoutConfig = {
  accountHolderName: 'Joseph Paul Woodside',
  email: 'jpwoodside15@gmail.com',
  wiseTag: '@jpwoodside15',
  currency: 'GBP',
  sortCode: '60-84-64',
  routingNumber: '026073150', // Wise US ACH Routing
  accountNumber: '88425941',
  bankName: 'Wise Payments Ltd (UK Sort Code: 60-84-64)',
  accountType: 'checking',
  country: 'United Kingdom / Global Multi-Currency',
  autoWithdrawThreshold: 100,
  isVerified: true,
  lastVerifiedDate: '2026-10-12',
  w8BenCompleted: true,
  monthlyTargetEarnings: 5000
};

export interface HighRevenueNicheBlueprint {
  id: string;
  title: string;
  category: 'clipper' | 'films' | 'animations' | 'kids_animations' | 'finance_saas';
  badge: string;
  projectedMonthlyViews: string;
  projectedRpm: string;
  estimatedMonthlyEarnings: string;
  audienceRetentionTarget: string;
  monetizationStrategies: string[];
  coppaStatus: 'Family Safe (COPPA Clean)' | 'General Audience' | 'Advertiser Friendly 18+';
  growthVelocityScore: number; // 0-100
  description: string;
  sampleHook: string;
  dailyUploadRecommendation: string;
}

export const HIGH_REVENUE_NICHES: HighRevenueNicheBlueprint[] = [
  {
    id: 'niche_kids_animations',
    title: 'Kids 3D Animations & Moral Fables',
    category: 'kids_animations',
    badge: 'Massive Volume & High RPM',
    projectedMonthlyViews: '15,000,000 - 40,000,000',
    projectedRpm: '$0.45 - $1.20',
    estimatedMonthlyEarnings: '$6,750 - $48,000',
    audienceRetentionTarget: '94% - 110% (Children Loop Viewing)',
    monetizationStrategies: [
      'YouTube Shorts Creator Revenue Pool (High Watch-Time Multiplier)',
      'Kids Toy & Educational App Affiliate Links (Pinned Comment for Parents)',
      'Brand Sponsorships with Family-Friendly Learning Games',
      'Merchandise & Character Plushies'
    ],
    coppaStatus: 'Family Safe (COPPA Clean)',
    growthVelocityScore: 98,
    description: 'Vibrant 3D animated animal stories, bedtime learning adventures, and color lessons. Children re-watch Shorts multiple times, driving loop rates well past 100% which triggers massive algorithmic push.',
    sampleHook: 'The little baby dragon was scared of fire, until this happened...',
    dailyUploadRecommendation: '2 - 3 Shorts per day (Morning 8 AM & Afternoon 4 PM)'
  },
  {
    id: 'niche_films_recaps',
    title: 'Cinema Cliffhangers & Film Recaps',
    category: 'films',
    badge: 'High Binge Watch Time',
    projectedMonthlyViews: '8,000,000 - 25,000,000',
    projectedRpm: '$0.60 - $1.80',
    estimatedMonthlyEarnings: '$4,800 - $35,000',
    audienceRetentionTarget: '88% - 96%',
    monetizationStrategies: [
      'AdSense Shorts Ads Sharing',
      'Streaming Platform Affiliates (Prime Video, Hulu, Disney+)',
      'Cinema Merch & Collector Box Subscriptions',
      'Audiobook & Novel Affiliates'
    ],
    coppaStatus: 'General Audience',
    growthVelocityScore: 94,
    description: 'Fast-paced storytelling dissecting intense sci-fi, psychological thriller, and true survival movie moments with deep synthetic voiceovers and suspenseful cliffhangers.',
    sampleHook: 'He spent 40 years inside this bunker, unaware that the war ended on day two.',
    dailyUploadRecommendation: '1 - 2 Shorts per day (Evening 6:30 PM & 9:00 PM)'
  },
  {
    id: 'niche_viral_clipper',
    title: 'Viral Podcast & Celebrity Interview Clipper',
    category: 'clipper',
    badge: 'Fast Production Velocity',
    projectedMonthlyViews: '12,000,000 - 30,000,000',
    projectedRpm: '$0.35 - $0.95',
    estimatedMonthlyEarnings: '$4,200 - $28,500',
    audienceRetentionTarget: '82% - 92%',
    monetizationStrategies: [
      'AdSense Creator Pool Revenue',
      'Host Book / Podcast Affiliates & Amazon Associates',
      'SaaS & Productivity Tool Pinned Comments',
      'Brand Sponsorships'
    ],
    coppaStatus: 'Advertiser Friendly 18+',
    growthVelocityScore: 96,
    description: 'Extracting mind-bending quotes, controversial debates, and actionable life lessons from long-form video podcasts with dynamic bouncing captions and kinetic zooms.',
    sampleHook: 'Elon Musk was asked why he sleeps on the factory floor. His answer shocked everyone.',
    dailyUploadRecommendation: '3 Shorts per day (11:30 AM, 3:30 PM, 8:00 PM)'
  },
  {
    id: 'niche_3d_animations',
    title: 'Sci-Fi & Cyberpunk 3D Visual Loops',
    category: 'animations',
    badge: 'Premium Visual Quality',
    projectedMonthlyViews: '6,000,000 - 18,000,000',
    projectedRpm: '$0.80 - $2.20',
    estimatedMonthlyEarnings: '$4,800 - $39,600',
    audienceRetentionTarget: '90% - 105% (Hypnotic Visuals)',
    monetizationStrategies: [
      'High-CPM Tech & Gaming Advertisers',
      'Digital Asset & 3D Model Marketplace Affiliates (Blender, Unreal)',
      'Wall Art & Canvas Print on Demand',
      'Patreon 4K Wallpaper & Asset Downloads'
    ],
    coppaStatus: 'General Audience',
    growthVelocityScore: 91,
    description: 'Mesmerizing 3D simulations of futuristic cities, black holes, time travel paradoxes, and mechanical engineering puzzles that keep viewers transfixed.',
    sampleHook: 'This is what happens when a Dyson Sphere collapses into a neutron star.',
    dailyUploadRecommendation: '1 Short per day (Optimal timing: 7:45 PM)'
  },
  {
    id: 'niche_finance_saas',
    title: 'FinTech, Wealth & AI Automation Tools',
    category: 'finance_saas',
    badge: 'Highest CPM in the World',
    projectedMonthlyViews: '2,500,000 - 8,000,000',
    projectedRpm: '$2.50 - $6.80',
    estimatedMonthlyEarnings: '$6,250 - $45,000',
    audienceRetentionTarget: '78% - 88%',
    monetizationStrategies: [
      'Top-Tier High-Ticket Financial & Broker Affiliates ($100-$300 per signup)',
      'Enterprise SaaS Software Affiliates (20-40% recurring monthly commission)',
      'Premium Course & Community Memberships',
      'Direct FinTech Sponsorships ($1,500+ per Short)'
    ],
    coppaStatus: 'Advertiser Friendly 18+',
    growthVelocityScore: 89,
    description: 'Breakdowns of passive income systems, software automations, credit card travel hacking, and wealth-building mechanics.',
    sampleHook: 'Banks don’t want you to know about this secret wire transfer loophole.',
    dailyUploadRecommendation: '1 - 2 Shorts per day (12:00 PM & 6:00 PM)'
  }
];

export interface PayoutLifecycleStep {
  step: number;
  title: string;
  timing: string;
  status: 'completed' | 'active' | 'upcoming';
  description: string;
  actionRequired: string;
}

export const YOUTUBE_WISE_PAYOUT_LIFECYCLE: PayoutLifecycleStep[] = [
  {
    step: 1,
    title: 'Views & Ad Impressions Accrue',
    timing: 'Day 1 - 30 of Month',
    status: 'completed',
    description: 'YouTube algorithm serves Shorts to viewers in feed. Views generate ad revenue pool shares (45% creator split) and pinned comment affiliate clicks generate instant affiliate balances.',
    actionRequired: 'Maintain daily upload cadence (1-3 Shorts/day) to sustain view velocity.'
  },
  {
    step: 2,
    title: 'AdSense Finalizes Month Earnings',
    timing: '7th - 12th of Following Month',
    status: 'completed',
    description: 'Google AdSense audits invalid traffic and finalizes your net creator earnings. The total balance updates on your AdSense homepage.',
    actionRequired: 'Check that balance exceeds the minimum withdrawal threshold ($100 / £60 / €70).'
  },
  {
    step: 3,
    title: 'Automated Wire / EFT Initiated',
    timing: '21st - 26th of Month',
    status: 'active',
    description: 'Google initiates an automated Electronic Funds Transfer (ACH in US, SEPA in EU, or BACS in UK) directly to your Wise routing & account number.',
    actionRequired: 'Ensure Wise account details are verified and W-8BEN tax certification is on file.'
  },
  {
    step: 4,
    title: 'Wise Instant Deposit & Currency Hold',
    timing: 'Within 2 - 24 Hours of Dispatch',
    status: 'upcoming',
    description: 'Funds land directly in your Wise USD/EUR/GBP balance with 0% intermediate receiving fee and zero hidden bank wire deductions.',
    actionRequired: 'Spend directly via Wise Visa debit card or convert to 40+ local currencies at the mid-market rate.'
  }
];

export function calculateWiseFeeSavings(annualEarnings: number) {
  // Traditional Bank SWIFT wire fee: ~$35 per payout (12 payouts/year = $420) + 3.5% hidden foreign exchange markup
  const traditionalWireFees = 12 * 35;
  const traditionalFxMarkup = annualEarnings * 0.035;
  const totalTraditionalCost = traditionalWireFees + traditionalFxMarkup;

  // Wise ACH / Local direct deposit fee: $0 receiving fee + ~0.35% transparent conversion fee if converting currency
  const wiseReceivingFee = 0;
  const wiseFxMarkup = annualEarnings * 0.0035;
  const totalWiseCost = wiseReceivingFee + wiseFxMarkup;

  const totalSaved = totalTraditionalCost - totalWiseCost;
  const savingsPercent = Math.round((totalSaved / totalTraditionalCost) * 100);

  return {
    traditionalWireFees,
    traditionalFxMarkup,
    totalTraditionalCost,
    wiseReceivingFee,
    wiseFxMarkup,
    totalWiseCost,
    totalSaved,
    savingsPercent
  };
}

// Aggregated Wise + YouTube Analytics Revenue Intelligence Data
export const AGGREGATED_REVENUE_METRICS = {
  accountHolder: 'Joseph Paul Woodside',
  sortCode: '60-84-64',
  accountNumber: '88425941',
  bankName: 'Wise Payments Ltd (London)',
  lastSyncedTimestamp: '2026-10-14 12:00:00 UTC',
  syncStatus: 'Active & Verified (OAuth 2.0 PKCE)',
  totalMonthlyViews: 1950000,
  averageRpmUsd: 2.80,
  adsenseGrossMonthlyGbp: 4280.00,
  affiliateGrossMonthlyGbp: 11140.00,
  totalConsolidatedMonthlyGbp: 15420.00,
  totalClicksTracked: 8840,
  totalConversions: 500,
  averageConversionRate: 5.65,
  averageEpcUsd: 1.62,
  activeAffiliatePartnersCount: 14,
  disbursementsClearedThisMonthGbp: 14860.40
};

export const TOP_3_AFFILIATE_PRODUCTS = [
  {
    id: 'aff_wise_creator',
    rank: 1 as const,
    productName: 'Wise Multi-Currency Business & Creator Account',
    niche: 'International Creator Finance & Tax Optimization',
    category: 'Financial Infrastructure',
    monthlyRevenueGbp: 4820.00,
    conversionRatePercent: 6.4,
    totalClicks: 3840,
    totalConversions: 246,
    commissionStructure: '£50 Activation Bounty + 30% Lifetime FX Margin Share',
    epcUsd: 1.61,
    drivingShortsCount: 6,
    suggestedContentPivot: {
      pivotTitle: 'Tax-Free Creator Rails & Zero-Fee Multi-Currency Disbursements',
      targetFormat: 'Kinetic Typography & Dual-Currency Split Comparison',
      projectedRpmLiftPercent: 380,
      recommendedVisuals: 'Macro 4K Banknote Counting with Wise Live App Push Notification',
      audioTrackRecommendation: 'Deep Sub-bass Tension into Chime Resolution (118 BPM)',
      cinematicPrompt: 'Photorealistic macro lens close-up of sleek obsidian debit card with holographic Wise emblem, digital HUD overlay displaying real-time currency conversion rates GBP USD EUR, volumetric neon lighting 8k octane render.',
      generatedScript: 'Most creators lose 30% of their YouTube earnings without realizing it. When Google pays you in USD to a traditional UK high street bank, they secretly shave off 3.5% in FX markup plus wire fees. By routing your YouTube AdSense disbursement through a Wise multi-currency account with UK sort code 60-84-64, your money lands instantly with zero conversion penalties. Pinned comment below shows how to claim your first free £500 transfer.',
      fullGeneratedFilm: {
        durationSec: 44,
        hookText: 'Stop letting traditional banks steal £4,000 from your YouTube AdSense.',
        scene1Visual: 'Split-screen audit showing £380 hidden bank deductions vs Wise £0 fee receipt.',
        scene2Climax: 'Phone screen demo: Instant push notification "£4,820 cleared into Sort Code 60-84-64".',
        endingLoop: '...which is why top creators refuse to use standard bank wires...',
        pinnedCta: '📌 Set up your Wise Multi-Currency Creator Account with zero transfer fees on your first £500: [Link in Pinned Comment] #Ad'
      }
    },
    sampleAffiliateShortTitle: 'How to Stop YouTube From Stealing 30% of Your Earnings ⚡ #Shorts',
    recommendedTags: ['wise', 'monetization', 'creatoreconomy', 'youtubeadsense', 'finance']
  },
  {
    id: 'aff_octane_3d',
    rank: 2 as const,
    productName: 'Octane 3D Studio & Cloud GPU Workstation',
    niche: 'Kids 3D Animations & Bedtime CGI Fables',
    category: '3D CGI & Creative AI Tools',
    monthlyRevenueGbp: 3450.00,
    conversionRatePercent: 5.2,
    totalClicks: 2900,
    totalConversions: 151,
    commissionStructure: '40% Recurring Monthly Subscription (£28/month per active user)',
    epcUsd: 1.52,
    drivingShortsCount: 4,
    suggestedContentPivot: {
      pivotTitle: 'Hypnotic 3D Character Fables & Infinite Algorithmic CGI Loops',
      targetFormat: '3D Procedural Character Loop with Split-Screen Wireframe',
      projectedRpmLiftPercent: 490,
      recommendedVisuals: 'Vibrant Pixar-style celestial character exploring glowing crystal caverns',
      audioTrackRecommendation: 'Whimsical Orchestral Bed with Lo-Fi Chime Loops (105 BPM)',
      cinematicPrompt: 'Whimsical 3D animated fable character, fluffy celestial puppy exploring glowing crystal caverns, subsurface scattering fur texture, Pixar RenderMan style, vibrant cinematic golden hour lighting 60 FPS.',
      generatedScript: 'How did a solo creator make 40 million views on YouTube Shorts last month? They did not animate frame-by-frame. They loaded pre-rigged 3D procedural loops in Octane Cloud, generated the voiceover with AI audio models, and rendered in 10 seconds. Kids watch this 4 times in a row, multiplying your view retention to 140%. Tap the link in the pinned comment to claim your 14-day free Cloud GPU rendering tier.',
      fullGeneratedFilm: {
        durationSec: 48,
        hookText: 'This 10-second 3D animation loop made £3,400 on YouTube Shorts.',
        scene1Visual: 'Wireframe mesh transforming into photorealistic glowing character in real-time.',
        scene2Climax: 'Retention graph soaring to 138% average percentage viewed on mobile.',
        endingLoop: '...and that is the real reason 3D kids animation is dominating Shorts...',
        pinnedCta: '🎨 Start rendering 60 FPS 3D short films with Octane Cloud GPU (14-Day Free Access): [Pinned Comment] #CGI #Ad'
      }
    },
    sampleAffiliateShortTitle: 'The 3D Animation Loop That Broke The YouTube Algorithm 🚀 #Shorts',
    recommendedTags: ['3danimation', 'kidsfable', 'blender', 'octanerender', 'algorithm']
  },
  {
    id: 'aff_titanium_tooling',
    rank: 3 as const,
    productName: 'Titanium Precision Machining & Tooling MasterKit',
    niche: 'Craftsman & Satisfying Engineering Foley',
    category: 'Industrial Hardware & CNC Tooling',
    monthlyRevenueGbp: 2870.00,
    conversionRatePercent: 4.9,
    totalClicks: 2100,
    totalConversions: 103,
    commissionStructure: '12% High-Ticket Affiliate Payout on £850-£2,400 Tooling Packages',
    epcUsd: 1.74,
    drivingShortsCount: 5,
    suggestedContentPivot: {
      pivotTitle: 'High-Retention Satisfying Precision Machining & Cryogenic ASMR',
      targetFormat: 'Ultra-Macro 50,000 FPS Slow-Motion with Crisp Acoustic Foley',
      projectedRpmLiftPercent: 520,
      recommendedVisuals: 'Macro microscope view of tungsten cutter vaporizing metal with cryogenic vapor plume',
      audioTrackRecommendation: 'Pure Industrial Acoustic Foley (Crisp Cutting Transients, No Music)',
      cinematicPrompt: 'Ultra-macro 50,000 FPS slow motion of tungsten carbide endmill cutting Grade 5 titanium, liquid nitrogen coolant jet forming vapor crystals, orange heat glow at contact tip, industrial cinematic lighting 4k.',
      generatedScript: 'Standard steel drill bits disintegrate in 1.4 seconds against grade-5 titanium alloy. To penetrate without welding the metal, precision aerospace machinists inject minus-196-degree liquid nitrogen directly through the hollow spindle. The thermal shock creates micro-fractures, letting the diamond cutter slice like warm butter. MasterKit tooling stations offer 12% affiliate commissions for precision enthusiasts.',
      fullGeneratedFilm: {
        durationSec: 52,
        hookText: 'Watch what happens when minus-196 degree liquid nitrogen hits molten titanium.',
        scene1Visual: 'Drill bit smoking and turning red hot before nitrogen jets erupt.',
        scene2Climax: 'Spiral titanium ribbon peeling off with crisp metallic ASMR click.',
        endingLoop: '...meaning standard high-speed steel could never withstand this...',
        pinnedCta: '🛠️ Aerospace Grade Tooling & Cryogenic Bits (Official Engineering Discount): [Pinned Comment] #Engineering #Ad'
      }
    },
    sampleAffiliateShortTitle: 'Why Standard Steel Drill Bits Vaporize Against Titanium ⚡ #Shorts',
    recommendedTags: ['machining', 'titanium', 'satisfying', 'engineering', 'asmr']
  }
];

