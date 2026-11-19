export interface CatalogueShortItem {
  id: string;
  title: string;
  niche: 'Machinery & Tech' | 'Travel & Aerial' | 'Engineering & History' | 'Creator & Growth' | 'Craftsmanship & ASMR' | 'Beauty & Health';
  nicheCpm: number; // e.g. $7.20
  estimatedViews: number; // e.g. 450,000
  projectedEarnings: number; // views / 1000 * cpm
  retentionScore: number; // e.g. 95%
  hookType: string;
  durationSec: number;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  tags: string[];
  affiliateOffer?: {
    product: string;
    discountCode: string;
    commissionPercent: number;
    fairTradeCertified: boolean;
  };
  complianceCheck: {
    ftcPassed: boolean;
    advertiserFriendly: boolean;
    coppaCompliant: boolean;
    spamSafe: boolean;
  };
  suggestedScheduleSlot: string; // e.g. '12:15 PM'
}

export interface QueuedShortRegistryItem {
  queueId: string;
  sequenceOrder: number;
  catalogueId?: string;
  title: string;
  niche: string;
  durationSec: number;
  videoUrl: string;
  thumbnailUrl?: string;
  scheduledTime: string;
  scheduledDate: string;
  status: 'queued' | 'optimizing' | 'uploading' | 'processing' | 'live' | 'paused' | 'error';
  uploadProgress: number;
  liveVideoId?: string;
  liveShortUrl?: string;
  estimatedEarnings: number;
  cpm: number;
  retentionPredicted: number;
  affiliateDisclosureAdded: boolean;
  advertiserGreenDollar: boolean;
  tags: string[];
  description: string;
  errorMessage?: string;
  aiContentDetails?: {
    scriptSnippet: string;
    musicTrack: string;
    musicGenre: string;
    musicBpm: number;
    voiceName: string;
    animationStyle: string;
    screenMessage?: string;
    cleanUnclutteredMode: boolean;
  };
}

export interface ComplianceRule {
  id: string;
  name: string;
  platform: 'YouTube' | 'FTC' | 'AdSense' | 'COPPA';
  description: string;
  importance: 'CRITICAL' | 'HIGH' | 'RECOMMENDED';
  criteria: string;
  howToConform: string;
  earningsImpact: string;
}

export const READY_TO_UPLOAD_CATALOGUE: CatalogueShortItem[] = [
  {
    id: 'cat_titanium_drill',
    title: 'Why Drilling Grade-5 Titanium Vaporizes Standard Bits',
    niche: 'Machinery & Tech',
    nicheCpm: 7.40,
    estimatedViews: 520000,
    projectedEarnings: 3848,
    retentionScore: 96,
    hookType: 'Extreme Micro-Macro Shock',
    durationSec: 24,
    videoUrl: '/samples/sample_fun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    description: 'Inside look at 120-bar freezing oil coolant channels during industrial gun-drilling.\n\n#shorts #machining #titanium #engineering\n📌 Precision tool list in pinned comment!',
    tags: ['shorts', 'machining', 'titanium', 'engineering', 'drill', 'technology'],
    affiliateOffer: {
      product: 'Carbide End Mills Precision Kit',
      discountCode: 'FORGE20',
      commissionPercent: 18,
      fairTradeCertified: true
    },
    complianceCheck: {
      ftcPassed: true,
      advertiserFriendly: true,
      coppaCompliant: true,
      spamSafe: true
    },
    suggestedScheduleSlot: '12:15 PM (Lunch Tech Peak)'
  },
  {
    id: 'cat_fpv_tokyo',
    title: '140 KM/H 4K FPV Drone Skim Between Tokyo Spires',
    niche: 'Travel & Aerial',
    nicheCpm: 5.20,
    estimatedViews: 780000,
    projectedEarnings: 4056,
    retentionScore: 98,
    hookType: 'Instant High-Velocity Motion',
    durationSec: 18,
    videoUrl: '/samples/sample_blazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
    description: 'Flying an FPV cinematic drone through narrow architectural gaps at sunset.\n\n#shorts #drone #fpv #tokyo #4k\n🎧 Use headphones for spatial binaural sound!',
    tags: ['shorts', 'drone', 'fpv', 'tokyo', 'aerial', '4k', 'travel'],
    complianceCheck: {
      ftcPassed: true,
      advertiserFriendly: true,
      coppaCompliant: true,
      spamSafe: true
    },
    suggestedScheduleSlot: '05:45 PM (Commute Dopamine Peak)'
  },
  {
    id: 'cat_fred_dibnah',
    title: 'Fred Dibnah Felling a 250ft Chimney Without Explosives',
    niche: 'Engineering & History',
    nicheCpm: 5.90,
    estimatedViews: 640000,
    projectedEarnings: 3776,
    retentionScore: 94,
    hookType: 'Dangerous Feat & Countdown Tension',
    durationSec: 32,
    videoUrl: '/samples/sample_escapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=600&q=80',
    description: 'How Fred Dibnah replaced brick bases with timber props and set them ablaze to drop 250ft chimneys with pinpoint millimeter accuracy.\n\n#shorts #history #engineering #craftsman',
    tags: ['shorts', 'history', 'chimney', 'engineering', 'freddibnah', 'vintage'],
    complianceCheck: {
      ftcPassed: true,
      advertiserFriendly: true,
      coppaCompliant: true,
      spamSafe: true
    },
    suggestedScheduleSlot: '08:30 PM (Evening Long-Session)'
  },
  {
    id: 'cat_creator_hook',
    title: 'The 3-Second Rule That Guarantees 80%+ Retention',
    niche: 'Creator & Growth',
    nicheCpm: 9.80,
    estimatedViews: 410000,
    projectedEarnings: 4018,
    retentionScore: 92,
    hookType: 'Belief Violation & Curiosity Gap',
    durationSec: 28,
    videoUrl: '/samples/sample_joy.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    description: 'Stop using generic intros. Here is why the first frame must violate expectation to stop the thumb scroll.\n\n#shorts #growth #algorithm #creator\n📌 Script framework free in pinned comment!',
    tags: ['shorts', 'algorithm', 'retention', 'growth', 'youtube', 'creator'],
    affiliateOffer: {
      product: 'Viral Script Generator Pro',
      discountCode: 'SHORTS30',
      commissionPercent: 40,
      fairTradeCertified: true
    },
    complianceCheck: {
      ftcPassed: true,
      advertiserFriendly: true,
      coppaCompliant: true,
      spamSafe: true
    },
    suggestedScheduleSlot: '11:30 AM (Morning Productivity)'
  },
  {
    id: 'cat_damascus_knife',
    title: 'Quenching a 1,000-Layer Hand-Forged Chef Cleaver',
    niche: 'Craftsmanship & ASMR',
    nicheCpm: 5.60,
    estimatedViews: 890000,
    projectedEarnings: 4984,
    retentionScore: 97,
    hookType: 'Thermal Glow & Sonic Sizzle',
    durationSec: 22,
    videoUrl: '/samples/sample_fun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=600&q=80',
    description: 'White-hot high-carbon Damascus steel plunged into quenching oil. Listen to that thermal hiss!\n\n#shorts #blacksmith #knife #asmr #craftsman',
    tags: ['shorts', 'blacksmith', 'damascus', 'knife', 'satisfying', 'asmr'],
    complianceCheck: {
      ftcPassed: true,
      advertiserFriendly: true,
      coppaCompliant: true,
      spamSafe: true
    },
    suggestedScheduleSlot: '07:15 PM (Prime Leisure Viewing)'
  },
  {
    id: 'cat_fairtrade_beauty',
    title: 'Is Marine Collagen a Scam? The 7-Day Lab Truth',
    niche: 'Beauty & Health',
    nicheCpm: 11.50,
    estimatedViews: 340000,
    projectedEarnings: 3910,
    retentionScore: 93,
    hookType: 'Controversy & Scientific Evidence',
    durationSec: 29,
    videoUrl: '/samples/sample_escapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'We sent 5 viral collagen brands to a mass-spectrometer lab. Here are the fair-trade clean results.\n\n#ad #sponsored #beauty #skincare #collagen #health\n📌 Lab test certificate in pinned link!',
    tags: ['shorts', 'skincare', 'collagen', 'beauty', 'health', 'fairtrade'],
    affiliateOffer: {
      product: 'Nordic Marine Peptides 100% Bioavailable',
      discountCode: 'CLEAN50',
      commissionPercent: 25,
      fairTradeCertified: true
    },
    complianceCheck: {
      ftcPassed: true,
      advertiserFriendly: true,
      coppaCompliant: true,
      spamSafe: true
    },
    suggestedScheduleSlot: '01:45 PM (Afternoon Reset)'
  }
];

export const PLATFORM_COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'rule_ftc_disclosure',
    name: 'FTC & ASA Clear Endorsement Rule',
    platform: 'FTC',
    importance: 'CRITICAL',
    description: 'Must clearly disclose commercial connections, affiliate commissions, and sponsored partnerships.',
    criteria: 'Disclosures like #ad, #sponsored, or "Affiliate link" must be placed before the "Show More" fold in the first 2 lines of the description.',
    howToConform: 'Automated insertion of #ad disclosure tag and standardized affiliate transparency copy.',
    earningsImpact: 'Prevents FTC fines ($50,120 per violation) and avoids YouTube content suppression.'
  },
  {
    id: 'rule_adsense_monetization',
    name: 'Advertiser-Friendly Guidelines (Green Dollar)',
    platform: 'AdSense',
    importance: 'CRITICAL',
    description: 'Videos must comply with YouTube Partner Program advertiser suitability to earn full CPM rates.',
    criteria: 'Zero severe profanity in first 7 seconds, no dangerous activities without disclaimer, no graphic medical violence.',
    howToConform: 'Automated pre-flight vocabulary scanner filters out demonetization trigger keywords.',
    earningsImpact: 'Guarantees full Green Dollar icon (100% ad inventory) vs Yellow Dollar (90% revenue cut).'
  },
  {
    id: 'rule_spam_frequency',
    name: 'Anti-Spam Frequency & Velocity Limiter',
    platform: 'YouTube',
    importance: 'HIGH',
    description: 'Publishing too many Shorts in a rapid burst triggers algorithmic spam suppression and shadowbanning.',
    criteria: 'Minimum 3 to 4 hours spacing between consecutive Shorts; maximum 3 to 4 uploads per 24-hour cycle.',
    howToConform: 'Automated Sequential Drip-Feed queue schedules releases at peak windows (12:15 PM, 5:45 PM, 8:30 PM).',
    earningsImpact: 'Ensures each short gets a clean 4-hour window on the Shorts Feed shelf, multiplying total cumulative views by 2.8x.'
  },
  {
    id: 'rule_coppa',
    name: 'COPPA Children’s Privacy Protection',
    platform: 'COPPA',
    importance: 'HIGH',
    description: 'Must accurately designate whether content is Made for Kids or General/Adult audience.',
    criteria: 'Shorts targeting broad general or technical audiences must set selfDeclaredMadeForKids: false.',
    howToConform: 'Automated parameter lock preserves targeted advertising, comments, and end screens.',
    earningsImpact: 'Made-for-kids videos lose personalized ads, reducing CPM earnings by 65-80%.'
  },
  {
    id: 'rule_mobile_title_cutoff',
    name: 'Mobile Notification & Title Truncation Rule',
    platform: 'YouTube',
    importance: 'RECOMMENDED',
    description: 'Mobile YouTube feed cuts titles off at 50-60 characters with ellipsis (...).',
    criteria: 'Keep title under 55 characters with the primary curiosity gap or hook word in the first 4 words.',
    howToConform: 'Length counter enforces 55-character hard limit and flags low-impact endings.',
    earningsImpact: 'Increases initial Click-Through-Rate (CTR) by 22% across iOS and Android notifications.'
  }
];

export const INITIAL_QUEUED_PIPELINE: QueuedShortRegistryItem[] = [
  {
    queueId: 'q_1',
    sequenceOrder: 1,
    catalogueId: 'cat_titanium_drill',
    title: 'Why Drilling Grade-5 Titanium Vaporizes Standard Bits',
    niche: 'Machinery & Tech',
    durationSec: 24,
    videoUrl: '/samples/sample_fun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    scheduledDate: 'Today',
    scheduledTime: '12:15 PM',
    status: 'live',
    uploadProgress: 100,
    liveVideoId: 'vid_tit_992',
    liveShortUrl: 'https://youtube.com/shorts/vid_tit_992',
    estimatedEarnings: 3848,
    cpm: 7.40,
    retentionPredicted: 96,
    affiliateDisclosureAdded: true,
    advertiserGreenDollar: true,
    tags: ['shorts', 'machining', 'titanium', 'engineering'],
    description: 'Inside look at 120-bar freezing oil coolant channels during industrial gun-drilling.\n\n#shorts #machining #titanium #engineering\n📌 Precision tool list in pinned comment!\n\nPayouts: Wise UK verified (Joseph Paul Woodside 60-84-64)',
    aiContentDetails: {
      scriptSnippet: 'Standard high-speed steel drills melt within 1.2 seconds of touching titanium alloy. The secret is high-pressure internal coolant jets pumping liquid nitrogen...',
      musicTrack: 'Industrial Forge ASMR Foley (120 BPM)',
      musicGenre: 'Industrial Mechanical ASMR',
      musicBpm: 120,
      voiceName: 'Charon (Deep Authority)',
      animationStyle: 'Macro 50,000x Photogrammetry 60 FPS',
      screenMessage: '⚡ Wise Payout Cleared (Sort Code 60-84-64)',
      cleanUnclutteredMode: true
    }
  },
  {
    queueId: 'q_2',
    sequenceOrder: 2,
    catalogueId: 'cat_fpv_tokyo',
    title: '140 KM/H 4K FPV Drone Skim Between Tokyo Spires',
    niche: 'Travel & Aerial',
    durationSec: 18,
    videoUrl: '/samples/sample_blazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
    scheduledDate: 'Today',
    scheduledTime: '05:45 PM',
    status: 'uploading',
    uploadProgress: 68,
    estimatedEarnings: 4056,
    cpm: 5.20,
    retentionPredicted: 98,
    affiliateDisclosureAdded: false,
    advertiserGreenDollar: true,
    tags: ['shorts', 'drone', 'fpv', 'tokyo', 'aerial', '4k'],
    description: 'Flying an FPV cinematic drone through narrow architectural gaps at sunset.\n\n#shorts #drone #fpv #tokyo #4k',
    aiContentDetails: {
      scriptSnippet: 'Threading the needle at 140 km/h between Roppongi high-rises. Zero obstacle avoidance sensors enabled...',
      musicTrack: 'Cyber-Synth Glitch Pulse (128 BPM)',
      musicGenre: 'Cyberpunk Electronic Synth',
      musicBpm: 128,
      voiceName: 'Zephyr (High Energy)',
      animationStyle: 'Cinematic FPV High-Velocity Motion Blur',
      screenMessage: '📌 Tokyo Flight Path Blueprint in Pinned Comment',
      cleanUnclutteredMode: true
    }
  },
  {
    queueId: 'q_3',
    sequenceOrder: 3,
    catalogueId: 'cat_creator_hook',
    title: 'The 3-Second Rule That Guarantees 80%+ Retention',
    niche: 'Creator & Growth',
    durationSec: 28,
    videoUrl: '/samples/sample_joy.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    scheduledDate: 'Tomorrow',
    scheduledTime: '11:30 AM',
    status: 'error',
    uploadProgress: 42,
    errorMessage: 'Upload stream halted: Resumable chunk 2/4 timed out (Google API Error 503). Ready for instant retry.',
    estimatedEarnings: 4018,
    cpm: 9.80,
    retentionPredicted: 92,
    affiliateDisclosureAdded: true,
    advertiserGreenDollar: true,
    tags: ['shorts', 'algorithm', 'retention', 'growth'],
    description: 'Here is why the first frame must violate expectation to stop the thumb scroll.\n\n#shorts #growth #algorithm\n📌 Script framework free in pinned comment!',
    aiContentDetails: {
      scriptSnippet: 'If your Short does not break pattern in the first 0.8 seconds, 70% of viewers swipe away before your title appears...',
      musicTrack: 'Subtle Bass Drone & Hip-Hop Kick (95 BPM)',
      musicGenre: 'Minimalist Focus Beat',
      musicBpm: 95,
      voiceName: 'Kore (Warm Natural)',
      animationStyle: 'Kinetic Subtitle Text Bounce (CapCut Safe-Zone Cleared)',
      screenMessage: '🔔 Subscribe for Daily Retention Formulas',
      cleanUnclutteredMode: false
    }
  },
  {
    queueId: 'q_4',
    sequenceOrder: 4,
    catalogueId: 'cat_fred_dibnah',
    title: 'Fred Dibnah Felling a 250ft Chimney Without Explosives',
    niche: 'Engineering & History',
    durationSec: 32,
    videoUrl: '/samples/sample_escapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=600&q=80',
    scheduledDate: 'Tomorrow',
    scheduledTime: '06:00 PM',
    status: 'queued',
    uploadProgress: 0,
    estimatedEarnings: 3776,
    cpm: 5.90,
    retentionPredicted: 94,
    affiliateDisclosureAdded: false,
    advertiserGreenDollar: true,
    tags: ['shorts', 'history', 'chimney', 'engineering'],
    description: 'How Fred Dibnah dropped 250ft chimneys using timber props and fire.\n\n#shorts #history #engineering #craftsman',
    aiContentDetails: {
      scriptSnippet: 'No dynamite. No wrecking balls. Just pickaxes, timber props, and a fire that burns for 4 hours until the brick arches collapse...',
      musicTrack: 'Victorian Brass Harmonics & Pure Acoustic Foley',
      musicGenre: 'Historical Industrial Foley',
      musicBpm: 74,
      voiceName: 'Puck (British Storyteller)',
      animationStyle: 'Vintage 35mm Film Grain & Slow-Motion Brick Crumble',
      screenMessage: '🔥 Industrial Heritage Series Ep. 04',
      cleanUnclutteredMode: true
    }
  }
];
