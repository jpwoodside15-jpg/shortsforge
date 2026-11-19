import { GlobalRegionalMonetizationData, BatchVideoItem } from '../types';

export const GLOBAL_REGIONAL_MONETIZATION: GlobalRegionalMonetizationData[] = [
  {
    regionId: 'us_ca',
    countryName: 'United States & Canada',
    countryCode: 'US',
    flag: '🇺🇸',
    continent: 'North America',
    audienceSharePercent: 38,
    averageCpm: 24.50,
    shortsRpm: 14.80,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'High-Ticket SaaS, FinTech & Business Tools',
    recommendedPrograms: ['Wise Business Partner ($50/signup)', 'Shopify Creator ($150)', 'TradingView Pro (30% recurring)'],
    optimalReleaseTimeGmt: '19:00 GMT (14:00 EST / 11:00 PST)',
    colorHeat: '#10b981', // emerald
    topBuyerDemographic: 'Age 24-44, Desktop & Mobile Buyers, High Disposable Income'
  },
  {
    regionId: 'uk_ie',
    countryName: 'United Kingdom & Ireland',
    countryCode: 'GB',
    flag: '🇬🇧',
    continent: 'Europe',
    audienceSharePercent: 18,
    averageCpm: 21.20,
    shortsRpm: 12.90,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Wealth Tech, E-commerce & Wise Faster Payments',
    recommendedPrograms: ['Wise UK Faster Payments Affiliate', 'Awin Finance UK', 'Hargreaves Lansdown Partner'],
    optimalReleaseTimeGmt: '18:30 GMT (Peak evening commute & relax)',
    colorHeat: '#059669', // emerald dark
    topBuyerDemographic: 'Sort Code 60-84-64 primary banking, high card payment adoption'
  },
  {
    regionId: 'dach',
    countryName: 'Germany, Austria & Switzerland (DACH)',
    countryCode: 'DE',
    flag: '🇩🇪',
    continent: 'Europe',
    audienceSharePercent: 14,
    averageCpm: 22.80,
    shortsRpm: 13.50,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Engineering, Clean Energy & Productivity Tech',
    recommendedPrograms: ['Digistore24 High-Ticket', 'Trade Republic Partner', 'Amazon EU Partner'],
    optimalReleaseTimeGmt: '17:30 GMT (18:30 CET)',
    colorHeat: '#047857',
    topBuyerDemographic: 'High trust threshold, high basket order value ($120+ AOV)'
  },
  {
    regionId: 'jp',
    countryName: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    continent: 'Asia-Pacific',
    audienceSharePercent: 10,
    averageCpm: 19.50,
    shortsRpm: 11.80,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Mobile Gadgets, Automation Tools & Animation Tech',
    recommendedPrograms: ['Rakuten Affiliate Network', 'A8.net Gadgets', 'Amazon Japan Associates'],
    optimalReleaseTimeGmt: '11:00 GMT (20:00 JST Tokyo peak)',
    colorHeat: '#0d9488', // teal
    topBuyerDemographic: '100% mobile view completion, ultra-high engagement loop rate'
  },
  {
    regionId: 'au_nz',
    countryName: 'Australia & New Zealand',
    countryCode: 'AU',
    flag: '🇦🇺',
    continent: 'Oceania',
    audienceSharePercent: 8,
    averageCpm: 20.40,
    shortsRpm: 12.20,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'FinTech, Outdoor Gear & Remote Work SaaS',
    recommendedPrograms: ['Wise Borderless AUD', 'Commission Factory AU', 'Crypto.com AU'],
    optimalReleaseTimeGmt: '08:00 GMT (19:00 AEST Sydney peak)',
    colorHeat: '#0f766e',
    topBuyerDemographic: 'High conversion on direct link in description & pinned comments'
  },
  {
    regionId: 'latam',
    countryName: 'Latin America (Brazil, Mexico, Colombia)',
    countryCode: 'BR',
    flag: '🇧🇷',
    continent: 'Latin America',
    audienceSharePercent: 7,
    averageCpm: 6.80,
    shortsRpm: 4.20,
    purchasingPowerTier: 'Tier 2 (High Volume)',
    recommendedAffiliateNiche: 'Digital Courses, Gaming Software & Freelancing',
    recommendedPrograms: ['Hotmart Global', 'Kiwify Affiliate', 'Shopee Creator Program'],
    optimalReleaseTimeGmt: '22:00 GMT (19:00 BRT São Paulo)',
    colorHeat: '#f59e0b', // amber
    topBuyerDemographic: 'Viral sharing velocity, 4.2x comment frequency vs Tier 1'
  },
  {
    regionId: 'in_sea',
    countryName: 'India & South East Asia',
    countryCode: 'IN',
    flag: '🇮🇳',
    continent: 'Asia',
    audienceSharePercent: 5,
    averageCpm: 3.40,
    shortsRpm: 2.10,
    purchasingPowerTier: 'Tier 3 (Emerging Scale)',
    recommendedAffiliateNiche: 'EdTech, Mobile Apps & Micro-SaaS',
    recommendedPrograms: ['EarnKaro Network', 'CueLinks Affiliate', 'Hostinger India'],
    optimalReleaseTimeGmt: '14:30 GMT (20:00 IST peak)',
    colorHeat: '#6366f1', // indigo
    topBuyerDemographic: 'Massive organic algorithmic loop multiplier for channel authority'
  }
];

export const INITIAL_BATCH_VIDEOS: BatchVideoItem[] = [
  {
    id: 'batch_01',
    title: 'Top 3 Legal Tax Loopholes Used by the Top 1%',
    niche: 'Finance & Wealth',
    originalDurationSec: 54,
    targetRegions: ['us_ca', 'uk_ie', 'dach'],
    localizedTitles: {
      us_ca: 'How the Top 1% Legally Save $10,000 on Taxes',
      uk_ie: 'HMRC Legal Tax Reliefs Used by UK Millionaires',
      dach: 'Wie die reichsten 1% legal 10.000€ Steuern sparen'
    },
    regionalPinnedCtas: {
      us_ca: '👇 Get the free 2026 Tax Deduction Sheet (Pinned Link)',
      uk_ie: '👇 Claim your free ISA & Capital Allowance Blueprint (Pinned Link)',
      dach: '👇 Kostenlose Steuer-Checkliste hier herunterladen (Angepinnter Link)'
    },
    cpmProjected: 23.40,
    scheduledTimezone: '18:00 GMT',
    status: 'Ready'
  },
  {
    id: 'batch_02',
    title: 'Kids 3D Space Journey: Discovering the Diamond Planet',
    niche: 'Kids Animation & Edutainment',
    originalDurationSec: 48,
    targetRegions: ['us_ca', 'jp', 'latam'],
    localizedTitles: {
      us_ca: 'Astronaut Timmy Explores the Sparkling Diamond Planet! 💎✨',
      jp: '宇宙飛行士ティミーのダイヤモンド惑星大冒険！🚀🌟',
      latam: '¡El Astronauta Timmy y el Planeta de Diamantes Mágicos! 🌌'
    },
    regionalPinnedCtas: {
      us_ca: '👇 Get the 3D Space Coloring Book for Kids (Amazon Link)',
      jp: '👇 宇宙の絵本と学習キットをチェック！（固定コメント）',
      latam: '👇 Baixe o livro de colorir espacial infantil grátis!'
    },
    cpmProjected: 16.80,
    scheduledTimezone: '14:00 GMT',
    status: 'Ready'
  },
  {
    id: 'batch_03',
    title: 'AI Tools That Feel Illegal to Know in 2026',
    niche: 'High-Tech Reviews & SaaS',
    originalDurationSec: 58,
    targetRegions: ['us_ca', 'uk_ie', 'dach', 'jp'],
    localizedTitles: {
      us_ca: '5 Secret AI Tools That Feel 100% Illegal to Use in 2026',
      uk_ie: 'Top 5 AI Tools Saving UK Creators 20 Hours a Week',
      dach: '5 Unglaubliche KI-Tools, die sich fast illegal anfühlen',
      jp: '【2026年最新】仕事が10倍速くなる神AIツール5選'
    },
    regionalPinnedCtas: {
      us_ca: '👇 Try the #1 AI Video Tool free for 14 days (Exclusive Partner Link)',
      uk_ie: '👇 Claim your creator discount via Wise Partner Link below',
      dach: '👇 14 Tage kostenlos testen über unseren exklusiven Partnerlink',
      jp: '👇 限定プロモーションコードは固定コメントをチェック'
    },
    cpmProjected: 24.80,
    scheduledTimezone: '19:30 GMT',
    status: 'Ready'
  }
];
