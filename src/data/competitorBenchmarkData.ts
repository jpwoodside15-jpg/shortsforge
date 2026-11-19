export interface CompetitorChannel {
  id: string;
  handle: string;
  title: string;
  avatarUrl: string;
  subscribers: string;
  subscriberCount: number;
  totalViews: string;
  shortsCount: number;
  niche: string;
  accentColor: string;
  avatarGradient: string;
  verified: boolean;
  joinedYear: number;
  summary: string;
  primaryFormula: string;
  avgDurationSec: number;
  avgRetentionPct: number;
  weeklyCadence: number;
  bestDay: string;
  bestTimeUtc: string;
  radarScores: {
    hookPower: number;
    retentionLoop: number;
    pacingVelocity: number;
    audioSfxDesign: number;
    thumbCtr: number;
    algorithmAffinity: number;
  };
  growthTimeline: {
    month: string;
    subscribersM: number;
    viewsM: number;
    shortsCount: number;
    viralMultiplier: number;
  }[];
  durationVsAvd: {
    durationBucket: string;
    videoCount: number;
    avgAvdSec: number;
    retentionPct: number;
    avgViewsM: number;
    loopRatePct: number;
    sweetSpot: boolean;
  }[];
  postingFrequency: {
    day: string;
    posts: number;
    avgViewsM: number;
    engagementPct: number;
    velocityScore: number;
  }[];
  hourlyDistribution: {
    hourLabel: string;
    uploads: number;
    viewsVelocity: number;
  }[];
  topViralShorts: {
    id: string;
    title: string;
    views: string;
    likes: string;
    durationSec: number;
    avdSec: number;
    retentionPct: number;
    hookType: string;
    hookQuote: string;
    breakdownReason: string;
    outlierMultiplier: string;
    scriptConcept: string;
    suggestedVoice: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  }[];
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  actionablePlaybook: {
    hookFormula: string;
    retentionHack: string;
    pacingSecret: string;
    cadenceRule: string;
    scriptPrompt: string;
  };
}

export const BENCHMARK_COMPETITORS: Record<string, CompetitorChannel> = {
  '@mrbeast': {
    id: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
    handle: '@mrbeast',
    title: 'MrBeast',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=160&auto=format&fit=crop&q=80',
    subscribers: '315M',
    subscriberCount: 315000000,
    totalViews: '59.8B',
    shortsCount: 480,
    niche: 'High-Stakes Entertainment & Philanthropy',
    accentColor: '#3b82f6',
    avatarGradient: 'from-blue-600 via-cyan-500 to-indigo-600',
    verified: true,
    joinedYear: 2012,
    summary: 'The world benchmark for pattern interrupts, stakes escalation, and 0-filler pacing. Every 1.5 seconds features visual change or sound impact.',
    primaryFormula: 'Extreme Stakes + Immediate Countdown + Unbelievable Payoff',
    avgDurationSec: 42,
    avgRetentionPct: 114,
    weeklyCadence: 4.5,
    bestDay: 'Saturday',
    bestTimeUtc: '17:00 UTC',
    radarScores: {
      hookPower: 99,
      retentionLoop: 94,
      pacingVelocity: 98,
      audioSfxDesign: 96,
      thumbCtr: 97,
      algorithmAffinity: 99,
    },
    growthTimeline: [
      { month: 'Nov 25', subscribersM: 280, viewsM: 2800, shortsCount: 16, viralMultiplier: 3.8 },
      { month: 'Dec 25', subscribersM: 284, viewsM: 3100, shortsCount: 20, viralMultiplier: 4.2 },
      { month: 'Jan 26', subscribersM: 289, viewsM: 3250, shortsCount: 18, viralMultiplier: 4.5 },
      { month: 'Feb 26', subscribersM: 293, viewsM: 3400, shortsCount: 17, viralMultiplier: 4.1 },
      { month: 'Mar 26', subscribersM: 298, viewsM: 3700, shortsCount: 22, viralMultiplier: 5.1 },
      { month: 'Apr 26', subscribersM: 302, viewsM: 3900, shortsCount: 19, viralMultiplier: 4.9 },
      { month: 'May 26', subscribersM: 305, viewsM: 4100, shortsCount: 21, viralMultiplier: 5.3 },
      { month: 'Jun 26', subscribersM: 308, viewsM: 4250, shortsCount: 20, viralMultiplier: 5.0 },
      { month: 'Jul 26', subscribersM: 310, viewsM: 4400, shortsCount: 19, viralMultiplier: 4.8 },
      { month: 'Aug 26', subscribersM: 312, viewsM: 4600, shortsCount: 22, viralMultiplier: 5.4 },
      { month: 'Sep 26', subscribersM: 314, viewsM: 4750, shortsCount: 18, viralMultiplier: 5.2 },
      { month: 'Oct 26', subscribersM: 315, viewsM: 4900, shortsCount: 20, viralMultiplier: 5.5 },
    ],
    durationVsAvd: [
      { durationBucket: '10-20s', videoCount: 38, avgAvdSec: 18.2, retentionPct: 121, avgViewsM: 42.5, loopRatePct: 44, sweetSpot: false },
      { durationBucket: '21-35s', videoCount: 110, avgAvdSec: 32.8, retentionPct: 117, avgViewsM: 58.2, loopRatePct: 38, sweetSpot: true },
      { durationBucket: '36-50s', videoCount: 240, avgAvdSec: 46.1, retentionPct: 112, avgViewsM: 64.9, loopRatePct: 31, sweetSpot: true },
      { durationBucket: '51-60s', videoCount: 92, avgAvdSec: 51.4, retentionPct: 98, avgViewsM: 37.1, loopRatePct: 19, sweetSpot: false },
    ],
    postingFrequency: [
      { day: 'Mon', posts: 42, avgViewsM: 34.2, engagementPct: 8.8, velocityScore: 82 },
      { day: 'Tue', posts: 38, avgViewsM: 36.1, engagementPct: 8.9, velocityScore: 84 },
      { day: 'Wed', posts: 55, avgViewsM: 48.4, engagementPct: 9.4, velocityScore: 91 },
      { day: 'Thu', posts: 49, avgViewsM: 42.0, engagementPct: 9.1, velocityScore: 87 },
      { day: 'Fri', posts: 74, avgViewsM: 59.8, engagementPct: 10.2, velocityScore: 96 },
      { day: 'Sat', posts: 86, avgViewsM: 68.4, engagementPct: 11.5, velocityScore: 99 },
      { day: 'Sun', posts: 68, avgViewsM: 54.2, engagementPct: 10.0, velocityScore: 93 },
    ],
    hourlyDistribution: [
      { hourLabel: '00:00', uploads: 6, viewsVelocity: 35 },
      { hourLabel: '04:00', uploads: 4, viewsVelocity: 28 },
      { hourLabel: '08:00', uploads: 12, viewsVelocity: 52 },
      { hourLabel: '12:00', uploads: 38, viewsVelocity: 78 },
      { hourLabel: '15:00', uploads: 88, viewsVelocity: 94 },
      { hourLabel: '17:00', uploads: 142, viewsVelocity: 99 },
      { hourLabel: '19:00', uploads: 112, viewsVelocity: 95 },
      { hourLabel: '22:00', uploads: 24, viewsVelocity: 61 },
    ],
    topViralShorts: [
      {
        id: 'mb_1',
        title: 'I Handed A Stranger $10,000 If They Beat Me In Rock Paper Scissors',
        views: '184M',
        likes: '12.4M',
        durationSec: 34,
        avdSec: 41.2,
        retentionPct: 121,
        hookType: 'Instant High Stakes + Cash Physicality',
        hookQuote: 'If you beat me right now, this suitcase with $10,000 cash is yours in 3 seconds!',
        breakdownReason: 'Zero preamble. Cash shown in frame 1. Immediate motion and high consequence.',
        outlierMultiplier: '3.1x channel average',
        scriptConcept: 'Put high value at immediate risk with a simple binary choice within 2 seconds.',
        suggestedVoice: 'Puck'
      },
      {
        id: 'mb_2',
        title: 'Last Person To Stop Touching The Lamborghini Keeps It',
        views: '142M',
        likes: '9.8M',
        durationSec: 46,
        avdSec: 51.5,
        retentionPct: 112,
        hookType: 'Endurance Challenge + Coveted Prize',
        hookQuote: 'Four best friends, one $300,000 supercar, whoever lets go first loses forever!',
        breakdownReason: 'High tension micro-cuts every 1.2 seconds, dynamic clock countdown ticking.',
        outlierMultiplier: '2.4x channel average',
        scriptConcept: 'Competitive elimination with ticking timer to maintain anticipation.',
        suggestedVoice: 'Puck'
      },
      {
        id: 'mb_3',
        title: 'Would You Drink Water From 100 Million Years Ago?',
        views: '119M',
        likes: '8.1M',
        durationSec: 28,
        avdSec: 34.1,
        retentionPct: 122,
        hookType: 'Extreme Curiosity + Disgust/Danger Hook',
        hookQuote: 'Scientists found trapped water inside this crystal from the dinosaur era. I drank it.',
        breakdownReason: 'Visual prop extreme zoom, unexpected personal jeopardy, fast resolution.',
        outlierMultiplier: '2.0x channel average',
        scriptConcept: 'Curiosity vacuum with forbidden object and physical demonstration.',
        suggestedVoice: 'Charon'
      }
    ],
    swotAnalysis: {
      strengths: ['World-class first 3-second hook conversion', 'Zero dead air', 'Infinite replay loop craft'],
      weaknesses: ['Extremely high budget required for real props', 'Format fatigue risk on cash giveaways'],
      opportunities: ['Adapt visual pacing into low-budget faceless niches with 3D drone and b-roll', 'Micro-documentary style with same rapid cuts'],
      threats: ['Viewer desensitization to large dollar figures without emotional storytelling'],
    },
    actionablePlaybook: {
      hookFormula: '[Absurd consequence] + [Specific constraint] within first 2.1 seconds.',
      retentionHack: 'Always show the climax object in Frame 1, but reveal the outcome only at the penultimate second.',
      pacingSecret: 'Cut every audio breath; add whoosh/impact sound effect at every topic transition.',
      cadenceRule: 'Publish on Friday-Saturday between 16:00 and 18:00 UTC for maximum weekend velocity.',
      scriptPrompt: 'Draft a 35-second script with a $10,000 stakes hook, 3 rapid escalations, and a circular loop ending.'
    }
  },

  '@jennyhoyos': {
    id: 'UCx-JennyHoyosRetention',
    handle: '@jennyhoyos',
    title: 'Jenny Hoyos',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    subscribers: '4.8M',
    subscriberCount: 4800000,
    totalViews: '2.4B',
    shortsCount: 310,
    niche: 'Budget Challenges, Micro-Finance & Viral Short Experiments',
    accentColor: '#ec4899',
    avatarGradient: 'from-pink-500 via-rose-500 to-amber-400',
    verified: true,
    joinedYear: 2021,
    summary: 'The queen of algorithmic retention surgery. Pioneer of the "circular sentence loop" where the end sentence finishes the start sentence.',
    primaryFormula: 'Can I do [Impossible Financial Feat] for $1? + Circular Loop',
    avgDurationSec: 32,
    avgRetentionPct: 122,
    weeklyCadence: 3.8,
    bestDay: 'Sunday',
    bestTimeUtc: '18:30 UTC',
    radarScores: {
      hookPower: 98,
      retentionLoop: 100,
      pacingVelocity: 94,
      audioSfxDesign: 91,
      thumbCtr: 95,
      algorithmAffinity: 97,
    },
    growthTimeline: [
      { month: 'Nov 25', subscribersM: 3.1, viewsM: 140, shortsCount: 14, viralMultiplier: 4.8 },
      { month: 'Dec 25', subscribersM: 3.3, viewsM: 165, shortsCount: 16, viralMultiplier: 5.1 },
      { month: 'Jan 26', subscribersM: 3.5, viewsM: 180, shortsCount: 15, viralMultiplier: 5.3 },
      { month: 'Feb 26', subscribersM: 3.7, viewsM: 195, shortsCount: 14, viralMultiplier: 4.9 },
      { month: 'Mar 26', subscribersM: 3.9, viewsM: 210, shortsCount: 17, viralMultiplier: 5.5 },
      { month: 'Apr 26', subscribersM: 4.1, viewsM: 230, shortsCount: 16, viralMultiplier: 5.8 },
      { month: 'May 26', subscribersM: 4.3, viewsM: 245, shortsCount: 15, viralMultiplier: 5.4 },
      { month: 'Jun 26', subscribersM: 4.4, viewsM: 260, shortsCount: 16, viralMultiplier: 5.6 },
      { month: 'Jul 26', subscribersM: 4.5, viewsM: 275, shortsCount: 14, viralMultiplier: 5.2 },
      { month: 'Aug 26', subscribersM: 4.6, viewsM: 290, shortsCount: 17, viralMultiplier: 5.7 },
      { month: 'Sep 26', subscribersM: 4.7, viewsM: 305, shortsCount: 15, viralMultiplier: 5.5 },
      { month: 'Oct 26', subscribersM: 4.8, viewsM: 320, shortsCount: 16, viralMultiplier: 6.0 },
    ],
    durationVsAvd: [
      { durationBucket: '10-20s', videoCount: 45, avgAvdSec: 21.4, retentionPct: 128, avgViewsM: 9.8, loopRatePct: 52, sweetSpot: true },
      { durationBucket: '21-35s', videoCount: 185, avgAvdSec: 36.8, retentionPct: 124, avgViewsM: 12.4, loopRatePct: 46, sweetSpot: true },
      { durationBucket: '36-50s', videoCount: 65, avgAvdSec: 41.2, retentionPct: 98, avgViewsM: 6.2, loopRatePct: 22, sweetSpot: false },
      { durationBucket: '51-60s', videoCount: 15, avgAvdSec: 46.5, retentionPct: 84, avgViewsM: 3.8, loopRatePct: 12, sweetSpot: false },
    ],
    postingFrequency: [
      { day: 'Mon', posts: 28, avgViewsM: 6.8, engagementPct: 11.2, velocityScore: 84 },
      { day: 'Tue', posts: 25, avgViewsM: 7.1, engagementPct: 11.4, velocityScore: 86 },
      { day: 'Wed', posts: 42, avgViewsM: 9.2, engagementPct: 12.1, velocityScore: 92 },
      { day: 'Thu', posts: 36, avgViewsM: 8.5, engagementPct: 11.8, velocityScore: 89 },
      { day: 'Fri', posts: 52, avgViewsM: 11.4, engagementPct: 13.0, velocityScore: 96 },
      { day: 'Sat', posts: 58, avgViewsM: 12.8, engagementPct: 13.5, velocityScore: 98 },
      { day: 'Sun', posts: 69, avgViewsM: 14.1, engagementPct: 14.2, velocityScore: 100 },
    ],
    hourlyDistribution: [
      { hourLabel: '00:00', uploads: 2, viewsVelocity: 20 },
      { hourLabel: '04:00', uploads: 1, viewsVelocity: 15 },
      { hourLabel: '08:00', uploads: 8, viewsVelocity: 48 },
      { hourLabel: '12:00', uploads: 24, viewsVelocity: 74 },
      { hourLabel: '15:00', uploads: 56, viewsVelocity: 88 },
      { hourLabel: '18:00', uploads: 92, viewsVelocity: 99 },
      { hourLabel: '20:00', uploads: 45, viewsVelocity: 84 },
      { hourLabel: '22:00', uploads: 14, viewsVelocity: 50 },
    ],
    topViralShorts: [
      {
        id: 'jh_1',
        title: 'I Made An iPhone For Only $1',
        views: '48M',
        likes: '3.6M',
        durationSec: 30,
        avdSec: 38.4,
        retentionPct: 128,
        hookType: 'Impossible Micro-Budget Feat + Prop Proof',
        hookQuote: 'Apple charges $1,200 for this, but I figured out how to build the exact same thing for $1.',
        breakdownReason: 'Frame 1 comparison graphic, rapid cost-breakdown steps, loop sentence connects perfectly.',
        outlierMultiplier: '3.8x channel average',
        scriptConcept: 'High-cost luxury item recreated with humorous ultra-low budget components.',
        suggestedVoice: 'Kore'
      },
      {
        id: 'jh_2',
        title: 'How To Make $100 In 1 Hour As A Kid',
        views: '36M',
        likes: '2.7M',
        durationSec: 28,
        avdSec: 34.2,
        retentionPct: 122,
        hookType: 'Relatable Aspirational Hustle + Exact Math',
        hookQuote: 'If you have $5 right now, you can turn it into $100 before dinner time.',
        breakdownReason: 'Concrete numbers in every sentence, graphic tally on screen, zero fluff.',
        outlierMultiplier: '2.9x channel average',
        scriptConcept: 'Actionable micro-hustle with specific arithmetic and immediate start step.',
        suggestedVoice: 'Kore'
      }
    ],
    swotAnalysis: {
      strengths: ['Unbeatable loop mechanics (>120% retention)', 'Relatable and accessible themes', 'Perfect 25-35s sweet spot execution'],
      weaknesses: ['Format easily copied by imitators', 'Relies on high visual prop energy'],
      opportunities: ['Expand into tech & productivity tool breakdowns using same script formulas'],
      threats: ['Audience expectation of constantly decreasing budgets'],
    },
    actionablePlaybook: {
      hookFormula: 'Start mid-action holding the problem item: "[Company] charges $X, but..."',
      retentionHack: 'Connect final 3 words to first 3 words so viewer does not notice the video restarted.',
      pacingSecret: 'Speak at 170 words per minute; drop graphics every 1.8 seconds.',
      cadenceRule: 'Batch create 4 Shorts per week; drop on Sunday evening for peak youth demographic reach.',
      scriptPrompt: 'Generate a 28-second script that loops continuously with a $1 micro-experiment theme.'
    }
  },

  '@zachking': {
    id: 'UCq8DICurnGuAAh53oWKLhnQ',
    handle: '@zachking',
    title: 'Zach King',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    subscribers: '41.2M',
    subscriberCount: 41200000,
    totalViews: '18.2B',
    shortsCount: 390,
    niche: 'Visual Illusion, Magic & Digital Sleight of Hand',
    accentColor: '#10b981',
    avatarGradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    verified: true,
    joinedYear: 2013,
    summary: 'The master of non-verbal visual pattern interrupts. His videos compel viewers to rewind immediately to spot the optical trick.',
    primaryFormula: 'Normal Routine ➔ Sudden Physics Violation ➔ "How Did He Do That?" Rewind',
    avgDurationSec: 24,
    avgRetentionPct: 132,
    weeklyCadence: 2.8,
    bestDay: 'Friday',
    bestTimeUtc: '16:00 UTC',
    radarScores: {
      hookPower: 100,
      retentionLoop: 99,
      pacingVelocity: 90,
      audioSfxDesign: 95,
      thumbCtr: 98,
      algorithmAffinity: 98,
    },
    growthTimeline: [
      { month: 'Nov 25', subscribersM: 36.2, viewsM: 920, shortsCount: 10, viralMultiplier: 5.2 },
      { month: 'Dec 25', subscribersM: 36.8, viewsM: 980, shortsCount: 12, viralMultiplier: 5.8 },
      { month: 'Jan 26', subscribersM: 37.4, viewsM: 1040, shortsCount: 11, viralMultiplier: 6.1 },
      { month: 'Feb 26', subscribersM: 38.0, viewsM: 1100, shortsCount: 10, viralMultiplier: 5.7 },
      { month: 'Mar 26', subscribersM: 38.6, viewsM: 1150, shortsCount: 13, viralMultiplier: 6.4 },
      { month: 'Apr 26', subscribersM: 39.2, viewsM: 1210, shortsCount: 11, viralMultiplier: 6.0 },
      { month: 'May 26', subscribersM: 39.7, viewsM: 1280, shortsCount: 12, viralMultiplier: 6.3 },
      { month: 'Jun 26', subscribersM: 40.1, viewsM: 1340, shortsCount: 11, viralMultiplier: 5.9 },
      { month: 'Jul 26', subscribersM: 40.4, viewsM: 1390, shortsCount: 10, viralMultiplier: 5.8 },
      { month: 'Aug 26', subscribersM: 40.7, viewsM: 1450, shortsCount: 12, viralMultiplier: 6.2 },
      { month: 'Sep 26', subscribersM: 41.0, viewsM: 1510, shortsCount: 10, viralMultiplier: 6.1 },
      { month: 'Oct 26', subscribersM: 41.2, viewsM: 1580, shortsCount: 11, viralMultiplier: 6.5 },
    ],
    durationVsAvd: [
      { durationBucket: '10-20s', videoCount: 180, avgAvdSec: 23.5, retentionPct: 142, avgViewsM: 48.6, loopRatePct: 62, sweetSpot: true },
      { durationBucket: '21-35s', videoCount: 160, avgAvdSec: 32.1, retentionPct: 124, avgViewsM: 36.2, loopRatePct: 44, sweetSpot: true },
      { durationBucket: '36-50s', videoCount: 40, avgAvdSec: 38.0, retentionPct: 92, avgViewsM: 18.4, loopRatePct: 20, sweetSpot: false },
      { durationBucket: '51-60s', videoCount: 10, avgAvdSec: 42.0, retentionPct: 78, avgViewsM: 9.1, loopRatePct: 10, sweetSpot: false },
    ],
    postingFrequency: [
      { day: 'Mon', posts: 32, avgViewsM: 26.4, engagementPct: 9.8, velocityScore: 82 },
      { day: 'Tue', posts: 35, avgViewsM: 28.1, engagementPct: 10.1, velocityScore: 85 },
      { day: 'Wed', posts: 48, avgViewsM: 34.6, engagementPct: 11.0, velocityScore: 91 },
      { day: 'Thu', posts: 52, avgViewsM: 37.2, engagementPct: 11.4, velocityScore: 93 },
      { day: 'Fri', posts: 84, avgViewsM: 52.8, engagementPct: 13.8, velocityScore: 99 },
      { day: 'Sat', posts: 78, avgViewsM: 49.1, engagementPct: 13.2, velocityScore: 97 },
      { day: 'Sun', posts: 61, avgViewsM: 41.5, engagementPct: 12.0, velocityScore: 94 },
    ],
    hourlyDistribution: [
      { hourLabel: '00:00', uploads: 4, viewsVelocity: 24 },
      { hourLabel: '04:00', uploads: 2, viewsVelocity: 18 },
      { hourLabel: '08:00', uploads: 14, viewsVelocity: 55 },
      { hourLabel: '12:00', uploads: 32, viewsVelocity: 79 },
      { hourLabel: '16:00', uploads: 110, viewsVelocity: 99 },
      { hourLabel: '18:00', uploads: 86, viewsVelocity: 94 },
      { hourLabel: '21:00', uploads: 35, viewsVelocity: 68 },
    ],
    topViralShorts: [
      {
        id: 'zk_1',
        title: 'They Said You Cannot Draw A Real Door On A Wall',
        views: '165M',
        likes: '11.8M',
        durationSec: 18,
        avdSec: 26.5,
        retentionPct: 147,
        hookType: 'Belief Violation & Physical Reality Bend',
        hookQuote: '[Silent chalk drawing ➔ Walks straight into painted wall like cartoon]',
        breakdownReason: 'Visual puzzle forces 2-3 instant rewatches. Minimal speech needed.',
        outlierMultiplier: '4.5x channel average',
        scriptConcept: 'Visual transformation with surprising physics switch that triggers instant replay.',
        suggestedVoice: 'Zephyr'
      }
    ],
    swotAnalysis: {
      strengths: ['Universal non-verbal appeal (zero language barrier)', 'Astronomical replay rates (>130%)', 'Viral across all continents'],
      weaknesses: ['Labor intensive VFX editing workflow'],
      opportunities: ['Use AI video inpainting / green screen tools to replicate optical illusions fast'],
      threats: ['AI video generators making optical tricks trivial to produce'],
    },
    actionablePlaybook: {
      hookFormula: 'Show an everyday physical expectation, then shatter it at second 1.8.',
      retentionHack: 'Hide a micro-detail in the background so viewers write comments pointing it out.',
      pacingSecret: 'Short and sweet: keep total length under 22 seconds for effortless double-loops.',
      cadenceRule: 'Publish on Friday afternoons when people seek entertaining quick visual relief.',
      scriptPrompt: 'Create a 15-second illusion concept script with camera trick directions.'
    }
  },

  '@alexhormozi': {
    id: 'UCxCg-HormoziBusiness',
    handle: '@alexhormozi',
    title: 'Alex Hormozi',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    subscribers: '3.4M',
    subscriberCount: 3400000,
    totalViews: '1.2B',
    shortsCount: 620,
    niche: 'High-Ticket Business, Wealth & Mindset Wisdom',
    accentColor: '#f59e0b',
    avatarGradient: 'from-amber-500 via-orange-500 to-red-600',
    verified: true,
    joinedYear: 2020,
    summary: 'The master of "Belief Violation" and counter-intuitive business advice. Heavy, high-contrast captions and candid mic delivery.',
    primaryFormula: 'Every Guru Is Wrong About [X] ➔ Here Is The Painful Math ➔ Action Rule',
    avgDurationSec: 52,
    avgRetentionPct: 88,
    weeklyCadence: 7.0,
    bestDay: 'Tuesday',
    bestTimeUtc: '13:00 UTC',
    radarScores: {
      hookPower: 96,
      retentionLoop: 84,
      pacingVelocity: 89,
      audioSfxDesign: 85,
      thumbCtr: 92,
      algorithmAffinity: 94,
    },
    growthTimeline: [
      { month: 'Nov 25', subscribersM: 2.4, viewsM: 70, shortsCount: 28, viralMultiplier: 3.2 },
      { month: 'Dec 25', subscribersM: 2.5, viewsM: 78, shortsCount: 30, viralMultiplier: 3.4 },
      { month: 'Jan 26', subscribersM: 2.6, viewsM: 85, shortsCount: 31, viralMultiplier: 3.6 },
      { month: 'Feb 26', subscribersM: 2.7, viewsM: 92, shortsCount: 28, viralMultiplier: 3.5 },
      { month: 'Mar 26', subscribersM: 2.9, viewsM: 104, shortsCount: 31, viralMultiplier: 3.9 },
      { month: 'Apr 26', subscribersM: 3.0, viewsM: 110, shortsCount: 30, viralMultiplier: 3.8 },
      { month: 'May 26', subscribersM: 3.1, viewsM: 118, shortsCount: 31, viralMultiplier: 4.1 },
      { month: 'Jun 26', subscribersM: 3.2, viewsM: 125, shortsCount: 30, viralMultiplier: 4.0 },
      { month: 'Jul 26', subscribersM: 3.25, viewsM: 130, shortsCount: 31, viralMultiplier: 3.9 },
      { month: 'Aug 26', subscribersM: 3.3, viewsM: 138, shortsCount: 31, viralMultiplier: 4.2 },
      { month: 'Sep 26', subscribersM: 3.35, viewsM: 144, shortsCount: 30, viralMultiplier: 4.1 },
      { month: 'Oct 26', subscribersM: 3.4, viewsM: 152, shortsCount: 31, viralMultiplier: 4.4 },
    ],
    durationVsAvd: [
      { durationBucket: '10-20s', videoCount: 30, avgAvdSec: 15.2, retentionPct: 92, avgViewsM: 1.8, loopRatePct: 18, sweetSpot: false },
      { durationBucket: '21-35s', videoCount: 95, avgAvdSec: 28.4, retentionPct: 91, avgViewsM: 2.4, loopRatePct: 22, sweetSpot: false },
      { durationBucket: '36-50s', videoCount: 280, avgAvdSec: 43.8, retentionPct: 89, avgViewsM: 3.6, loopRatePct: 24, sweetSpot: true },
      { durationBucket: '51-60s', videoCount: 215, avgAvdSec: 48.2, retentionPct: 86, avgViewsM: 4.1, loopRatePct: 21, sweetSpot: true },
    ],
    postingFrequency: [
      { day: 'Mon', posts: 88, avgViewsM: 3.8, engagementPct: 8.4, velocityScore: 92 },
      { day: 'Tue', posts: 94, avgViewsM: 4.2, engagementPct: 8.9, velocityScore: 96 },
      { day: 'Wed', posts: 90, avgViewsM: 3.9, engagementPct: 8.6, velocityScore: 94 },
      { day: 'Thu', posts: 86, avgViewsM: 3.7, engagementPct: 8.5, velocityScore: 91 },
      { day: 'Fri', posts: 82, avgViewsM: 3.5, engagementPct: 8.1, velocityScore: 88 },
      { day: 'Sat', posts: 74, avgViewsM: 3.1, engagementPct: 7.8, velocityScore: 82 },
      { day: 'Sun', posts: 78, avgViewsM: 3.3, engagementPct: 8.0, velocityScore: 85 },
    ],
    hourlyDistribution: [
      { hourLabel: '08:00', uploads: 45, viewsVelocity: 68 },
      { hourLabel: '11:00', uploads: 82, viewsVelocity: 88 },
      { hourLabel: '13:00', uploads: 120, viewsVelocity: 98 },
      { hourLabel: '16:00', uploads: 95, viewsVelocity: 90 },
      { hourLabel: '19:00', uploads: 60, viewsVelocity: 74 },
    ],
    topViralShorts: [
      {
        id: 'ah_1',
        title: 'Stop Saving Money In Your 20s. It Is Keeping You Broke.',
        views: '24M',
        likes: '2.1M',
        durationSec: 54,
        avdSec: 48.6,
        retentionPct: 90,
        hookType: 'Belief Violation & Contrarian Advice',
        hookQuote: 'Saving money in your 20s is mathematically the dumbest thing you can possibly do.',
        breakdownReason: 'Challenges common sense immediately. Makes viewer defensive, forcing them to listen for proof.',
        outlierMultiplier: '6.8x channel average',
        scriptConcept: 'Aggressively contradict an accepted societal rule, then back it up with simple arithmetic.',
        suggestedVoice: 'Fenrir'
      }
    ],
    swotAnalysis: {
      strengths: ['High CPM audience (finance/business)', 'Unmatched personal authority', 'Consistent daily volume'],
      weaknesses: ['Less loopability than novelty channels', 'Requires strong camera presence or deep voiceover'],
      opportunities: ['Use AI voiceover + bold animated kinetic typography for faceless financial channels'],
      threats: ['Oversaturation of "gym bro sitting at microphone" format'],
    },
    actionablePlaybook: {
      hookFormula: 'Say the polar opposite of what 99% of people believe in the opening 5 words.',
      retentionHack: 'Use large single-word pop captions with accent highlights (yellow/green on black).',
      pacingSecret: 'Speak with total conviction. No filler intros ("Hey guys, today I want to talk about...").',
      cadenceRule: 'Post daily between 12:00 and 14:00 UTC when business workers take lunch breaks.',
      scriptPrompt: 'Generate a contrarian 45-second business Short script with a high-friction opening hook.'
    }
  },

  '@cleoabram': {
    id: 'UCc-CleoAbramTech',
    handle: '@cleoabram',
    title: 'Cleo Abram',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    subscribers: '3.1M',
    subscriberCount: 3100000,
    totalViews: '890M',
    shortsCount: 220,
    niche: 'Optimistic Tech & Science Explainers',
    accentColor: '#06b6d4',
    avatarGradient: 'from-cyan-500 via-sky-500 to-blue-600',
    verified: true,
    joinedYear: 2021,
    summary: 'The benchmark for "Optimism + Deep Wonder". Explains cutting-edge nuclear fusion, space, and AI breakthroughs with crystal-clear graphics.',
    primaryFormula: 'Here Is Why The Future Is Going To Be Awesome + Micro-Explainer',
    avgDurationSec: 55,
    avgRetentionPct: 86,
    weeklyCadence: 3.2,
    bestDay: 'Thursday',
    bestTimeUtc: '17:00 UTC',
    radarScores: {
      hookPower: 94,
      retentionLoop: 82,
      pacingVelocity: 92,
      audioSfxDesign: 94,
      thumbCtr: 93,
      algorithmAffinity: 95,
    },
    growthTimeline: [
      { month: 'Nov 25', subscribersM: 2.1, viewsM: 45, shortsCount: 12, viralMultiplier: 3.6 },
      { month: 'Dec 25', subscribersM: 2.2, viewsM: 52, shortsCount: 14, viralMultiplier: 3.9 },
      { month: 'Jan 26', subscribersM: 2.3, viewsM: 58, shortsCount: 13, viralMultiplier: 4.1 },
      { month: 'Feb 26', subscribersM: 2.5, viewsM: 64, shortsCount: 12, viralMultiplier: 3.8 },
      { month: 'Mar 26', subscribersM: 2.6, viewsM: 71, shortsCount: 14, viralMultiplier: 4.3 },
      { month: 'Apr 26', subscribersM: 2.7, viewsM: 78, shortsCount: 13, viralMultiplier: 4.0 },
      { month: 'May 26', subscribersM: 2.8, viewsM: 85, shortsCount: 14, viralMultiplier: 4.2 },
      { month: 'Jun 26', subscribersM: 2.9, viewsM: 92, shortsCount: 13, viralMultiplier: 4.1 },
      { month: 'Jul 26', subscribersM: 2.95, viewsM: 98, shortsCount: 12, viralMultiplier: 3.9 },
      { month: 'Aug 26', subscribersM: 3.0, viewsM: 105, shortsCount: 14, viralMultiplier: 4.4 },
      { month: 'Sep 26', subscribersM: 3.05, viewsM: 112, shortsCount: 13, viralMultiplier: 4.2 },
      { month: 'Oct 26', subscribersM: 3.1, viewsM: 120, shortsCount: 13, viralMultiplier: 4.5 },
    ],
    durationVsAvd: [
      { durationBucket: '10-20s', videoCount: 12, avgAvdSec: 16.1, retentionPct: 88, avgViewsM: 1.4, loopRatePct: 15, sweetSpot: false },
      { durationBucket: '21-35s', videoCount: 45, avgAvdSec: 28.9, retentionPct: 87, avgViewsM: 2.2, loopRatePct: 18, sweetSpot: false },
      { durationBucket: '36-50s', videoCount: 95, avgAvdSec: 42.4, retentionPct: 88, avgViewsM: 3.8, loopRatePct: 22, sweetSpot: true },
      { durationBucket: '51-60s', videoCount: 68, avgAvdSec: 51.2, retentionPct: 85, avgViewsM: 4.5, loopRatePct: 20, sweetSpot: true },
    ],
    postingFrequency: [
      { day: 'Mon', posts: 24, avgViewsM: 3.1, engagementPct: 8.5, velocityScore: 82 },
      { day: 'Tue', posts: 28, avgViewsM: 3.4, engagementPct: 8.8, velocityScore: 85 },
      { day: 'Wed', posts: 35, avgViewsM: 4.0, engagementPct: 9.2, velocityScore: 89 },
      { day: 'Thu', posts: 52, avgViewsM: 5.4, engagementPct: 10.5, velocityScore: 97 },
      { day: 'Fri', posts: 45, avgViewsM: 4.8, engagementPct: 9.8, velocityScore: 92 },
      { day: 'Sat', posts: 30, avgViewsM: 3.6, engagementPct: 8.9, velocityScore: 84 },
      { day: 'Sun', posts: 26, avgViewsM: 3.2, engagementPct: 8.6, velocityScore: 83 },
    ],
    hourlyDistribution: [
      { hourLabel: '09:00', uploads: 18, viewsVelocity: 55 },
      { hourLabel: '13:00', uploads: 42, viewsVelocity: 78 },
      { hourLabel: '17:00', uploads: 98, viewsVelocity: 97 },
      { hourLabel: '20:00', uploads: 36, viewsVelocity: 70 },
    ],
    topViralShorts: [
      {
        id: 'ca_1',
        title: 'Nuclear Fusion Just Actually Worked. Here Is What Happens Next.',
        views: '29M',
        likes: '2.4M',
        durationSec: 58,
        avdSec: 50.4,
        retentionPct: 87,
        hookType: 'World-Changing Breakthrough + Clear Animation',
        hookQuote: 'For the first time in human history, scientists got more energy OUT of a fusion reaction than they put in.',
        breakdownReason: 'High historical gravitas, simple visual analogy with reactor diagram, infectious optimism.',
        outlierMultiplier: '6.4x channel average',
        scriptConcept: 'Historic scientific milestone distilled into a 60-second layperson explanation.',
        suggestedVoice: 'Kore'
      }
    ],
    swotAnalysis: {
      strengths: ['High production value with clean animations', 'High sponsor CPMs ($15-$35)', 'Extremely loyal audience'],
      weaknesses: ['Requires deep technical research per video'],
      opportunities: ['Shorter 30s quick science snippets with drone flights over research facilities'],
      threats: ['Clickbait science channels making sensationalist claims'],
    },
    actionablePlaybook: {
      hookFormula: 'Lead with the sheer wonder: "Something unbelievable just happened in [field]..."',
      retentionHack: 'Use animated diagram overlaying 3D background to anchor the viewer ocular center.',
      pacingSecret: 'Warm, clear vocal cadence. Emphasize why this matters to the viewer personally.',
      cadenceRule: 'Post on Thursday afternoons when tech audiences browse during work downtime.',
      scriptPrompt: 'Create a 55-second optimistic science short script with clear visual cue notations.'
    }
  }
};

export function generateDynamicCompetitorData(channelIdOrHandle: string, nicheOverride?: string): CompetitorChannel {
  const cleanHandle = channelIdOrHandle.trim().toLowerCase().startsWith('@') 
    ? channelIdOrHandle.trim().toLowerCase() 
    : `@${channelIdOrHandle.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')}`;

  if (BENCHMARK_COMPETITORS[cleanHandle]) {
    return BENCHMARK_COMPETITORS[cleanHandle];
  }

  // Generate an authentic synthetic competitor profile based on the entered channel
  const displayName = channelIdOrHandle.replace(/^@/, '').replace(/_/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') || 'Viral Creator';

  const niche = nicheOverride || 'High-Velocity Viral Shorts';
  const seed = channelIdOrHandle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const subsM = (2.5 + (seed % 180) / 10).toFixed(1);
  const totalViewsB = ((parseFloat(subsM) * 6.5) / 10).toFixed(1);
  const shortsCount = 180 + (seed % 400);

  const months = ['Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26', 'Jul 26', 'Aug 26', 'Sep 26', 'Oct 26'];
  const baseSub = parseFloat(subsM) * 0.7;

  const growthTimeline = months.map((m, idx) => {
    const progress = (idx + 1) / months.length;
    const currentSub = parseFloat((baseSub + (parseFloat(subsM) - baseSub) * progress).toFixed(2));
    const views = Math.round(currentSub * 22 + (seed % 20) * idx);
    return {
      month: m,
      subscribersM: currentSub,
      viewsM: views,
      shortsCount: 14 + (idx % 6),
      viralMultiplier: parseFloat((3.2 + (idx * 0.2)).toFixed(1))
    };
  });

  return {
    id: `UC_${Math.abs(seed).toString(36).toUpperCase()}_GEN`,
    handle: cleanHandle,
    title: displayName,
    avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80`,
    subscribers: `${subsM}M`,
    subscriberCount: Math.round(parseFloat(subsM) * 1000000),
    totalViews: `${totalViewsB}B`,
    shortsCount,
    niche,
    accentColor: '#ef4444',
    avatarGradient: 'from-red-500 via-purple-600 to-indigo-600',
    verified: true,
    joinedYear: 2022,
    summary: `Algorithmic analysis of ${displayName}: High retention through kinetic visual cues, concise <40s durations, and high replay circular hooks.`,
    primaryFormula: 'Shock Pattern Interrupt ➔ Micro-Escalation ➔ Infinite Loop',
    avgDurationSec: 36,
    avgRetentionPct: 108,
    weeklyCadence: 4.8,
    bestDay: 'Saturday',
    bestTimeUtc: '17:30 UTC',
    radarScores: {
      hookPower: 92,
      retentionLoop: 95,
      pacingVelocity: 91,
      audioSfxDesign: 88,
      thumbCtr: 90,
      algorithmAffinity: 93,
    },
    growthTimeline,
    durationVsAvd: [
      { durationBucket: '10-20s', videoCount: 32, avgAvdSec: 19.4, retentionPct: 122, avgViewsM: 8.4, loopRatePct: 42, sweetSpot: true },
      { durationBucket: '21-35s', videoCount: 88, avgAvdSec: 33.2, retentionPct: 114, avgViewsM: 11.2, loopRatePct: 36, sweetSpot: true },
      { durationBucket: '36-50s', videoCount: 45, avgAvdSec: 39.8, retentionPct: 94, avgViewsM: 5.6, loopRatePct: 20, sweetSpot: false },
      { durationBucket: '51-60s', videoCount: 15, avgAvdSec: 44.1, retentionPct: 82, avgViewsM: 2.8, loopRatePct: 12, sweetSpot: false },
    ],
    postingFrequency: [
      { day: 'Mon', posts: 24, avgViewsM: 4.8, engagementPct: 9.1, velocityScore: 84 },
      { day: 'Tue', posts: 26, avgViewsM: 5.2, engagementPct: 9.4, velocityScore: 86 },
      { day: 'Wed', posts: 38, avgViewsM: 7.4, engagementPct: 10.2, velocityScore: 92 },
      { day: 'Thu', posts: 34, avgViewsM: 6.8, engagementPct: 9.9, velocityScore: 89 },
      { day: 'Fri', posts: 48, avgViewsM: 9.6, engagementPct: 11.4, velocityScore: 96 },
      { day: 'Sat', posts: 56, avgViewsM: 11.2, engagementPct: 12.5, velocityScore: 99 },
      { day: 'Sun', posts: 42, avgViewsM: 8.5, engagementPct: 10.8, velocityScore: 93 },
    ],
    hourlyDistribution: [
      { hourLabel: '08:00', uploads: 12, viewsVelocity: 45 },
      { hourLabel: '12:00', uploads: 34, viewsVelocity: 72 },
      { hourLabel: '15:00', uploads: 68, viewsVelocity: 89 },
      { hourLabel: '17:30', uploads: 112, viewsVelocity: 99 },
      { hourLabel: '20:00', uploads: 54, viewsVelocity: 82 },
    ],
    topViralShorts: [
      {
        id: `gen_1_${seed}`,
        title: `The 1 Mistake Almost Everyone Makes With ${displayName}`,
        views: `${(parseFloat(subsM) * 3.4).toFixed(1)}M`,
        likes: `${(parseFloat(subsM) * 0.28).toFixed(1)}M`,
        durationSec: 32,
        avdSec: 36.8,
        retentionPct: 115,
        hookType: 'Loss Aversion & Shock Interruption',
        hookQuote: `Do NOT do this until you have watched the next 15 seconds!`,
        breakdownReason: 'High urgency visual alarm, kinetic text overlay, immediate proof delivered.',
        outlierMultiplier: '3.4x channel average',
        scriptConcept: 'Call out a painful blunder that costs time or money, then reveal the 3-second solution.',
        suggestedVoice: 'Puck'
      },
      {
        id: `gen_2_${seed}`,
        title: `I Tested What Happens If You Reverse This Algorithm Rule`,
        views: `${(parseFloat(subsM) * 2.2).toFixed(1)}M`,
        likes: `${(parseFloat(subsM) * 0.19).toFixed(1)}M`,
        durationSec: 28,
        avdSec: 32.4,
        retentionPct: 116,
        hookType: 'Curiosity Vacuum & Experimentation',
        hookQuote: `Everyone told me this was impossible, but here is what actually happened.`,
        breakdownReason: 'Fast-paced timeline demonstration with before/after visual proof.',
        outlierMultiplier: '2.5x channel average',
        scriptConcept: 'Put common belief to the test with an energetic live countdown.',
        suggestedVoice: 'Fenrir'
      }
    ],
    swotAnalysis: {
      strengths: ['High thumb-stop rate in first 2 seconds', 'Consistent 30-35s sweet spot execution', 'Strong visual branding identity'],
      weaknesses: ['Viewer fatigue on repetitive hook formulas if not refreshed quarterly'],
      opportunities: ['Incorporate 3D drone B-roll and AI voiceover narration to scale volume 3x'],
      threats: ['Algorithm shifts favoring longer narrative formats over pure looping'],
    },
    actionablePlaybook: {
      hookFormula: 'Lead with high curiosity or urgent warning within first 1.8 seconds.',
      retentionHack: 'Cut every breath and use sound riser effects leading into key milestones.',
      pacingSecret: 'Keep total length strictly between 28s and 38s for optimal 100%+ retention.',
      cadenceRule: 'Post on Wednesday and Saturday at 17:30 UTC for peak algorithmic pickup.',
      scriptPrompt: `Write a high-retention 30-second script inspired by ${displayName}'s viral format.`
    }
  };
}
