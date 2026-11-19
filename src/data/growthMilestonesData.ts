export interface GrowthBadge {
  id: string;
  title: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'mythic';
  category: 'Creation' | 'Upload' | 'SEO' | 'Retention' | 'Viral Mastery' | 'Consistency';
  description: string;
  flavorQuote: string;
  iconName: string;
  metricType: 'clips_generated' | 'uploads_completed' | 'seo_completed' | 'retention_analyzed' | 'hooks_generated' | 'projects_completed' | 'remix_completed' | 'streak_days';
  requiredCount: number;
  xpReward: number;
  statReward: string;
  audioChime?: string;
}

export interface UserGrowthStats {
  clipsGenerated: number;
  uploadsCompleted: number;
  seoCompleted: number;
  retentionAnalyzed: number;
  hooksGenerated: number;
  projectsCompleted: number;
  remixCompleted: number;
  unlockedBadgeIds: string[];
  totalXp: number;
  currentStreakDays: number;
  lastActiveDate: string;
}

export const GROWTH_BADGES_CONFIG: GrowthBadge[] = [
  // Creation & Clips
  {
    id: 'badge-first-clip',
    title: 'First Slicer Spark',
    tier: 'bronze',
    category: 'Creation',
    description: 'Generate your first sliced short clip from any transcript or drone flight.',
    flavorQuote: 'Every 100M-view channel started with a single cut.',
    iconName: 'Scissors',
    metricType: 'clips_generated',
    requiredCount: 1,
    xpReward: 250,
    statReward: '+5% Pipeline Flow'
  },
  {
    id: 'badge-10-clips',
    title: '10 Clips Generated',
    tier: 'gold',
    category: 'Creation',
    description: 'Reach 10 total clips generated across Transcript Slicer, Drone Flights & Creative Agent.',
    flavorQuote: '10 clips = 10 lottery tickets into YouTube\'s browse algorithm.',
    iconName: 'Flame',
    metricType: 'clips_generated',
    requiredCount: 10,
    xpReward: 1200,
    statReward: '+20% Velocity Multiplier'
  },
  {
    id: 'badge-25-clips',
    title: 'Viral Centurion (25 Clips)',
    tier: 'diamond',
    category: 'Creation',
    description: 'Mass-produce 25 clips ready for vertical distribution.',
    flavorQuote: 'Volume builds intuition. Intuition builds viral empires.',
    iconName: 'Sparkles',
    metricType: 'clips_generated',
    requiredCount: 25,
    xpReward: 3000,
    statReward: '+35% Audience Magnetism'
  },

  // Uploads & Publishing
  {
    id: 'badge-first-upload',
    title: 'First Successful Upload',
    tier: 'silver',
    category: 'Upload',
    description: 'Deploy your first Short to YouTube via Direct Upload Suite or Terminal cURL publisher.',
    flavorQuote: 'You crossed the chasm from consumer to creator.',
    iconName: 'UploadCloud',
    metricType: 'uploads_completed',
    requiredCount: 1,
    xpReward: 500,
    statReward: '+15% Algorithm Visibility'
  },
  {
    id: 'badge-5-uploads',
    title: 'High-Frequency Broadcaster',
    tier: 'gold',
    category: 'Upload',
    description: 'Execute 5 successful uploads with pinned affiliate comments & tags.',
    flavorQuote: 'The algorithm now recognizes your publishing cadence.',
    iconName: 'Send',
    metricType: 'uploads_completed',
    requiredCount: 5,
    xpReward: 2000,
    statReward: '+25% Browse Shelf Velocity'
  },

  // Consistency & Daily Streaks
  {
    id: 'badge-streak-7',
    title: 'Consistency Streak: 7 Days',
    tier: 'gold',
    category: 'Consistency',
    description: 'Maintain a 7-day active production streak without missing a day on the Shorts feed.',
    flavorQuote: 'Consistency compounds faster than interest. 7 days builds unstoppable algorithmic momentum.',
    iconName: 'Flame',
    metricType: 'streak_days',
    requiredCount: 7,
    xpReward: 2500,
    statReward: '+30% Algorithmic Priority Queue'
  },
  {
    id: 'badge-streak-14',
    title: 'Consistency Streak: 14 Days',
    tier: 'diamond',
    category: 'Consistency',
    description: 'Achieve a 14-day unbroken daily check-in and clip pipeline streak.',
    flavorQuote: 'Two weeks of pure discipline. The algorithm now considers your channel high-authority.',
    iconName: 'Activity',
    metricType: 'streak_days',
    requiredCount: 14,
    xpReward: 5000,
    statReward: '+50% Feed Recommendation Shelf Life'
  },
  {
    id: 'badge-streak-30',
    title: 'Consistency Streak: 30 Days (Viral Machine)',
    tier: 'mythic',
    category: 'Consistency',
    description: 'Dominate an entire 30-day month of relentless daily video production.',
    flavorQuote: 'You are no longer an amateur. You are a content creation machine.',
    iconName: 'Crown',
    metricType: 'streak_days',
    requiredCount: 30,
    xpReward: 10000,
    statReward: '+100% Monetization RPM Velocity'
  },

  // SEO & Optimization
  {
    id: 'badge-first-seo',
    title: 'Algorithm Whisperer',
    tier: 'bronze',
    category: 'SEO',
    description: 'Complete full SEO optimization (Titles under 60 chars, 3 algorithmic tags & description).',
    flavorQuote: 'Keywords tell the robot who to give your video to.',
    iconName: 'Search',
    metricType: 'seo_completed',
    requiredCount: 1,
    xpReward: 350,
    statReward: '+10% CTR Index'
  },
  {
    id: 'badge-5-seo',
    title: 'Metadata Architect',
    tier: 'gold',
    category: 'SEO',
    description: 'Complete SEO optimization and high-converting pinned comments for 5 projects.',
    flavorQuote: 'Zero fluff, 100% indexing precision.',
    iconName: 'Hash',
    metricType: 'seo_completed',
    requiredCount: 5,
    xpReward: 1500,
    statReward: '+30% Search Discoverability'
  },

  // Retention & Drops
  {
    id: 'badge-first-retention',
    title: 'Retention Surgeon',
    tier: 'silver',
    category: 'Retention',
    description: 'Import YouTube Analytics CSV and pinpoint the exact seconds losing audience attention.',
    flavorQuote: 'Don\'t guess why viewers left. Perform surgery on the drop.',
    iconName: 'TrendingDown',
    metricType: 'retention_analyzed',
    requiredCount: 1,
    xpReward: 600,
    statReward: '+18% Average Watch Time'
  },
  {
    id: 'badge-3-retention',
    title: 'Cliff Eliminator',
    tier: 'diamond',
    category: 'Retention',
    description: 'Perform retention diagnostics across 3 distinct Shorts datasets.',
    flavorQuote: 'You now engineer videos where viewers forget how to swipe away.',
    iconName: 'Activity',
    metricType: 'retention_analyzed',
    requiredCount: 3,
    xpReward: 2200,
    statReward: '+28% APV Retention Lock'
  },

  // Hooks & Curiosity Gaps
  {
    id: 'badge-first-hooks',
    title: 'Dopamine Trigger Master',
    tier: 'bronze',
    category: 'Viral Mastery',
    description: 'Generate 3 psychological variations (Curiosity Vacuum, Belief Violation & FOMO) in Smart Hook Generator.',
    flavorQuote: 'Win the first 3 seconds and YouTube hands you the universe.',
    iconName: 'Zap',
    metricType: 'hooks_generated',
    requiredCount: 1,
    xpReward: 400,
    statReward: '+12% Thumb-Stop Rate'
  },
  {
    id: 'badge-10-hooks',
    title: 'Neural Pattern Breaker',
    tier: 'mythic',
    category: 'Viral Mastery',
    description: 'Formulate 10 high-tension curiosity hooks that stop vertical feed autopilot.',
    flavorQuote: 'Your scripts bypass conscious defenses and ignite raw curiosity.',
    iconName: 'Crown',
    metricType: 'hooks_generated',
    requiredCount: 10,
    xpReward: 5000,
    statReward: '+50% Viral Seed Surge'
  },

  // Full Pipeline Projects
  {
    id: 'badge-first-project',
    title: 'Full Pipeline Finisher',
    tier: 'silver',
    category: 'Viral Mastery',
    description: 'Complete all 4 phases (Scripting, Editing, SEO, Upload) on a project.',
    flavorQuote: 'Discipline turns ideas into automated revenue.',
    iconName: 'CheckCircle2',
    metricType: 'projects_completed',
    requiredCount: 1,
    xpReward: 1000,
    statReward: '+20% Consistency Bonus'
  },
  {
    id: 'badge-remix-master',
    title: 'Fair-Use Remix Alchemist',
    tier: 'gold',
    category: 'Creation',
    description: 'Remix a trending Short in the Video Clipper with Safe-Zone & algorithmic filters.',
    flavorQuote: 'Repurpose brilliance with transformative fair-use speed ramps.',
    iconName: 'Repeat',
    metricType: 'remix_completed',
    requiredCount: 1,
    xpReward: 1200,
    statReward: '+22% Transformative Protection'
  }
];

export const CREATOR_RANKS = [
  { level: 1, title: 'Novice Slicer', minXp: 0, maxXp: 800, badgeColor: 'from-zinc-600 to-zinc-400', border: 'border-zinc-500/40' },
  { level: 2, title: 'Hook Apprentice', minXp: 800, maxXp: 2200, badgeColor: 'from-amber-600 to-amber-400', border: 'border-amber-500/40' },
  { level: 3, title: 'Retention Surgeon', minXp: 2200, maxXp: 4500, badgeColor: 'from-emerald-600 to-emerald-400', border: 'border-emerald-500/40' },
  { level: 4, title: 'Algorithmic Vanguard', minXp: 4500, maxXp: 8500, badgeColor: 'from-cyan-600 to-indigo-500', border: 'border-cyan-500/40' },
  { level: 5, title: 'Shorts Titan', minXp: 8500, maxXp: 14000, badgeColor: 'from-purple-600 to-pink-500', border: 'border-purple-500/40' },
  { level: 6, title: 'Viral Overlord', minXp: 14000, maxXp: 99999, badgeColor: 'from-amber-400 via-red-500 to-yellow-300', border: 'border-amber-400' }
];

export function getRankForXp(xp: number) {
  for (let i = CREATOR_RANKS.length - 1; i >= 0; i--) {
    if (xp >= CREATOR_RANKS[i].minXp) {
      return CREATOR_RANKS[i];
    }
  }
  return CREATOR_RANKS[0];
}
