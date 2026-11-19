import { GlobalRegionalMonetizationData } from '../types';

export const GLOBAL_REGIONAL_HEATMAP_DATA: GlobalRegionalMonetizationData[] = [
  {
    regionId: 'us',
    countryName: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    continent: 'North America',
    audienceSharePercent: 34,
    averageCpm: 24.50,
    shortsRpm: 0.38,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'High-Ticket SaaS, FinTech & Wealth Management',
    recommendedPrograms: ['Wise Transfer ($0 fee referral)', 'TradingView Pro ($120 CPA)', 'Make.com & Notion (30% Lifetime)'],
    optimalReleaseTimeGmt: '16:00 - 19:00 GMT (12 PM - 3 PM EST)',
    colorHeat: '#10b981', // High CPM Green
    topBuyerDemographic: '25-44 Tech & Knowledge Workers with disposable income'
  },
  {
    regionId: 'gb',
    countryName: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    continent: 'Europe',
    audienceSharePercent: 16,
    averageCpm: 19.80,
    shortsRpm: 0.34,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Digital Banking, ISA Investing & Remote Work Productivity',
    recommendedPrograms: ['Wise Multi-Currency Business', 'Freetrade / Interactive Brokers', 'Audible UK'],
    optimalReleaseTimeGmt: '17:30 - 20:30 GMT (Evening Peak)',
    colorHeat: '#10b981',
    topBuyerDemographic: '22-40 Mobile Banking & E-commerce Buyers'
  },
  {
    regionId: 'de',
    countryName: 'Germany & DACH',
    countryCode: 'DE',
    flag: '🇩🇪',
    continent: 'Europe',
    audienceSharePercent: 11,
    averageCpm: 18.90,
    shortsRpm: 0.32,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Engineering Hardware, Privacy Tools & Tax Optimization',
    recommendedPrograms: ['NordVPN / Proton', 'Amazon.de Hardware Baskets', 'Trade Republic (€50 CPA)'],
    optimalReleaseTimeGmt: '17:00 - 19:30 GMT',
    colorHeat: '#10b981',
    topBuyerDemographic: 'Strict legal-standard buyers who respond to factual citations'
  },
  {
    regionId: 'jp',
    countryName: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    continent: 'East Asia',
    audienceSharePercent: 8,
    averageCpm: 16.50,
    shortsRpm: 0.30,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Gadgets, Kids Animation Merch & Mobile Gaming Gacha',
    recommendedPrograms: ['Rakuten Ichiba Affiliate', 'A8.net Financial Services', 'Amazon.co.jp Prime'],
    optimalReleaseTimeGmt: '10:00 - 13:00 GMT (19:00 - 22:00 JST)',
    colorHeat: '#06b6d4', // Cyan
    topBuyerDemographic: 'High repeat mobile consumption on commuting subways'
  },
  {
    regionId: 'ca',
    countryName: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    continent: 'North America',
    audienceSharePercent: 7,
    averageCpm: 17.20,
    shortsRpm: 0.31,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Wealthsimple Investing, Real Estate & Outdoor Gear',
    recommendedPrograms: ['Wealthsimple ($100 Signup)', 'Amazon.ca Associates', 'Shopify Partners'],
    optimalReleaseTimeGmt: '18:00 - 21:00 GMT',
    colorHeat: '#10b981',
    topBuyerDemographic: 'High overlap with US buying habits and high card adoption'
  },
  {
    regionId: 'au',
    countryName: 'Australia',
    countryCode: 'AU',
    flag: '🇦🇺',
    continent: 'Oceania',
    audienceSharePercent: 6,
    averageCpm: 18.40,
    shortsRpm: 0.33,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Crypto, Property Wealth & Fitness Equipment',
    recommendedPrograms: ['CoinSpot Australia', 'Amazon.com.au Associates', 'Gymshark AU'],
    optimalReleaseTimeGmt: '08:00 - 11:00 GMT (18:00 - 21:00 AEST)',
    colorHeat: '#10b981',
    topBuyerDemographic: 'High digital banking penetration and athletic lifestyle'
  },
  {
    regionId: 'br',
    countryName: 'Brazil',
    countryCode: 'BR',
    flag: '🇧🇷',
    continent: 'Latin America',
    audienceSharePercent: 12,
    averageCpm: 4.80,
    shortsRpm: 0.16,
    purchasingPowerTier: 'Tier 2 (High Volume)',
    recommendedAffiliateNiche: 'Digital Infoproducts, Mobile Gaming & PIX Micro-Payments',
    recommendedPrograms: ['Hotmart Brasil (50% digital commission)', 'Shopee Brasil', 'Kiwify Courses'],
    optimalReleaseTimeGmt: '21:00 - 00:00 GMT (18:00 - 21:00 BRT)',
    colorHeat: '#f59e0b', // Amber
    topBuyerDemographic: 'Insane viral comment sharing and massive TikTok/Shorts looping'
  },
  {
    regionId: 'in',
    countryName: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    continent: 'South Asia',
    audienceSharePercent: 22,
    averageCpm: 2.40,
    shortsRpm: 0.12,
    purchasingPowerTier: 'Tier 3 (Emerging Scale)',
    recommendedAffiliateNiche: 'EdTech, Budget Gadgets & UPI Micro-Subscriptions',
    recommendedPrograms: ['EarnKaro / Cuelinks (Flipkart & Myntra)', 'Upstox / Zerodha Referrals', 'Hostinger India'],
    optimalReleaseTimeGmt: '13:00 - 16:30 GMT (18:30 - 22:00 IST)',
    colorHeat: '#f97316', // Orange
    topBuyerDemographic: 'Highest raw view volume in the world, eager for self-improvement'
  },
  {
    regionId: 'fr',
    countryName: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
    continent: 'Europe',
    audienceSharePercent: 5,
    averageCpm: 15.80,
    shortsRpm: 0.28,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Cinema, Cultural Documentaries & Tech Gear',
    recommendedPrograms: ['Fnac Darty Affiliate', 'Amazon.fr', 'Boursorama Banque'],
    optimalReleaseTimeGmt: '17:30 - 20:00 GMT',
    colorHeat: '#06b6d4',
    topBuyerDemographic: 'Prefers native French dubbing with high artistic standards'
  },
  {
    regionId: 'ae',
    countryName: 'United Arab Emirates & GCC',
    countryCode: 'AE',
    flag: '🇦🇪',
    continent: 'Middle East',
    audienceSharePercent: 4,
    averageCpm: 14.80,
    shortsRpm: 0.29,
    purchasingPowerTier: 'Tier 1 (High Ticket)',
    recommendedAffiliateNiche: 'Luxury Real Estate, High-End Automotive & Trading',
    recommendedPrograms: ['Noon.com Partners', 'Amazon.ae', 'AvaTrade Middle East'],
    optimalReleaseTimeGmt: '16:00 - 19:00 GMT (20:00 - 23:00 GST)',
    colorHeat: '#06b6d4',
    topBuyerDemographic: 'Extreme purchasing power and high luxury basket sizes'
  }
];

export const SMART_REVENUE_BENCHMARKS = {
  overallHealthScore: 94,
  channelShortsRpm: 0.34,
  industryShortsRpmAverage: 0.18,
  outperformancePercent: 88, // 88% higher than median
  affiliateYieldPer1kViews: '$4.20',
  industryAffiliateYieldMedian: '$1.10',
  tier1AudiencePercent: 68, // US, UK, DE, JP, CA, AU
  tier1BenchmarkMin: 50,
  actionableInsights: [
    'Your UK audience (16%) is generating 48% higher conversion on Wise & financial tool links compared to general tech.',
    'Shifting 15% of your release schedule to 17:30 GMT captures the peak London-New York overlapping attention window.',
    'Kids 3D Animation delivers the highest global volume retention, while High-Tech SaaS delivers 10x higher affiliate revenue per click.'
  ]
};
