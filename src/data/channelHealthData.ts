import { ChannelHealthAuditSummary } from '../types';

export const DEFAULT_CHANNEL_HEALTH_AUDIT: ChannelHealthAuditSummary = {
  channelHandle: '@ShortsForge',
  channelTitle: 'ShortsForge Studio - Viral Automation',
  subscriberCount: 248500,
  totalVideosAnalyzed: 14,
  overallHealthScore: 68,
  criticalIssuesCount: 4,
  warningCount: 5,
  optimalCount: 5,
  estimatedMonthlyViewsGainedWithFixes: 420000,
  estimatedRevenueLeakageGbp: 1840,
  uploads: [
    {
      id: 'audit_vid_01',
      videoId: 'LF_TAX_9921',
      title: 'Complete 28-Minute Masterclass on International Creator Taxes & Wise Accounts',
      publishedAt: '3 days ago',
      viewCount: 48200,
      likeCount: 3120,
      commentCount: 488,
      videoType: 'long_form',
      durationSec: 1680, // 28 minutes
      thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
      ctrPercent: 8.4,
      retentionPercent: 52.1,
      healthScore: 52,
      status: 'Critical',
      detectedIssues: [
        {
          type: 'conversion_gap',
          severity: 'high',
          title: 'Unexploited Long-Form Conversion Gap (48.2k Views)',
          description: 'This video generated 48.2k views but has 0 corresponding vertical Shorts. You are missing an estimated 280,000+ top-of-funnel mobile views.',
          suggestedFix: 'Slice the viral 44-second segment at 04:12 ("The 30% Foreign Withholding Trap") into an episodic vertical Short.'
        },
        {
          type: 'missing_metadata',
          severity: 'medium',
          title: 'Missing Pinned Comment Lead Magnet',
          description: 'The top pinned comment is blank, forfeiting affiliate conversions and automated Wise registration referrals.',
          suggestedFix: 'Inject pinned comment with verified Wise account referral link (Account Holder: Joseph Paul Woodside).'
        }
      ],
      instantClipperOpportunity: {
        suggestedStartSec: 252, // 04:12
        suggestedEndSec: 298,   // 04:58
        clipTitle: 'The 30% Foreign Tax Trap for Creators 💸 #Shorts',
        hookText: 'If you earn AdSense outside your home country, you might be losing 30% right at the border.',
        reason: 'Peak retention inflection spike at 04:12 with 88% audience hold'
      },
      episodeUploadMetadata: {
        episodeNumber: 1,
        seriesTitle: 'Creator Tax & Wealth Architecture',
        optimizedTitle: 'The 30% Foreign Tax Trap for Creators 💸 (Ep. 1) #Shorts',
        optimizedDescription: 'How international creators legally stop 30% foreign withholding tax using multi-currency accounts.\n\nPayouts verified via Wise UK (Sort code 60-84-64, Joseph Paul Woodside).\n\n#Shorts #PersonalFinance #Taxes #CreatorEconomy #Wise',
        tags: ['shorts', 'creator taxes', 'wise payouts', 'international finance', 'digital nomad', 'adsense earnings'],
        pinnedComment: '💼 Pinned Guide: Check description for our verified multi-currency banking rails. Where is your channel based?',
        wiseDisbursementTag: 'Wise Verified - Sort Code: 60-84-64'
      }
    },
    {
      id: 'audit_vid_02',
      videoId: 'SH_CHIP_1102',
      title: 'Why 2nm Chips Melt (Must Watch Before Upgrading)',
      publishedAt: 'Yesterday',
      viewCount: 14200,
      likeCount: 890,
      commentCount: 134,
      videoType: 'short',
      durationSec: 42,
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      ctrPercent: 3.2,
      retentionPercent: 78.4,
      healthScore: 58,
      status: 'Critical',
      detectedIssues: [
        {
          type: 'missing_metadata',
          severity: 'high',
          title: 'Missing #Shorts Tag in Title & Description',
          description: 'YouTube recommendation algorithm fails to classify this video into the vertical Shorts shelf feed without the "#Shorts" token.',
          suggestedFix: 'Append "#Shorts" to the video title and first 3 lines of description.'
        },
        {
          type: 'poor_thumbnail_ctr',
          severity: 'high',
          title: 'Low Thumbnail CTR Pattern (3.2% vs 9.5% Benchmark)',
          description: 'Dark, low-contrast silicon die render with text font under 28pt renders illegibly on smartphone search feeds.',
          suggestedFix: 'Switch to neon cyan/white split contrast thumbnail with bold 64pt question: "2nm LIE?"'
        },
        {
          type: 'safe_zone_violation',
          severity: 'medium',
          title: 'UI Button Collision in Bottom Right',
          description: 'Key technical infographic is positioned at X:85% Y:82%, directly underneath the YouTube Like, Comment, and Share buttons.',
          suggestedFix: 'Shift technical callout box 120px to the left into the 9:16 CapCut safe-zone.'
        }
      ],
      instantClipperOpportunity: {
        suggestedStartSec: 0,
        suggestedEndSec: 42,
        clipTitle: 'What Chipmakers Hide Inside 2nm Silicon ⚡ #Shorts',
        hookText: 'Chipmakers want you to believe 2-nanometer processors are getting faster. They are lying.',
        reason: 'Remix with safe-zone clearance and high-CTR thumbnail'
      },
      episodeUploadMetadata: {
        episodeNumber: 2,
        seriesTitle: 'Tech Secrets Teardown',
        optimizedTitle: 'What Chipmakers Hide Inside 2nm Silicon ⚡ (Ep. 2) #Shorts',
        optimizedDescription: 'Electron microscope teardown reveals quantum tunneling leakage inside modern flagship chips.\n\nPayouts: Wise UK verified (Joseph Paul Woodside 60-84-64).\n\n#Shorts #Tech #Engineering #Microchips #Hardware #AI',
        tags: ['shorts', 'tech teardown', 'microchips', '2nm silicon', 'quantum computing', 'hardware'],
        pinnedComment: '⚡ Question for engineers: Would you pay 2x for photonic optical interconnects or stick to silicon?',
        wiseDisbursementTag: 'Wise Verified - Sort Code: 60-84-64'
      }
    },
    {
      id: 'audit_vid_03',
      videoId: 'LF_CRAFT_4419',
      title: 'Restoring a 1914 Victorian Steam Boiler & Foundry Rails',
      publishedAt: '5 days ago',
      viewCount: 89400,
      likeCount: 7840,
      commentCount: 912,
      videoType: 'long_form',
      durationSec: 1420, // 23 mins
      thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      ctrPercent: 11.2,
      retentionPercent: 64.8,
      healthScore: 61,
      status: 'Warning',
      detectedIssues: [
        {
          type: 'conversion_gap',
          severity: 'high',
          title: 'High-Virality ASMR Slicing Opportunity (89.4k Views)',
          description: 'The hydraulic press and oxy-torch cutting segment at 08:34 has a massive viral replay curve but is locked inside a 23-minute video.',
          suggestedFix: 'Deploy Instant Clipper to harvest a 50-second continuous ASMR forging loop.'
        },
        {
          type: 'missing_metadata',
          severity: 'medium',
          title: 'Low Tag Density (Only 3 tags found)',
          description: 'Missing crucial category tags like "fred dibnah", "blacksmith", "industrial heritage", reducing discoverability.',
          suggestedFix: 'Add 12 curated industrial heritage and metalworking tags.'
        }
      ],
      instantClipperOpportunity: {
        suggestedStartSec: 514, // 08:34
        suggestedEndSec: 564,   // 09:24
        clipTitle: '100-Year-Old Train Rail into Blacksmith Anvil 🔨🔥 (ASMR Loop) #Shorts',
        hookText: 'Turning 1914 heavy industrial rail steel into a razor-sharp precision anvil.',
        reason: 'Peak retention audio moment with pneumatic hammer clangs and zero speech'
      },
      episodeUploadMetadata: {
        episodeNumber: 3,
        seriesTitle: 'Victorian Craftsman & Metallurgy',
        optimizedTitle: 'Turning a 110-Year-Old Train Track into an Anvil 🔨🔥 (Ep. 3) #Shorts',
        optimizedDescription: 'Hypnotic hydraulic forge and pneumatic hammer transformation. Fred Dibnah industrial heritage.\n\n#Shorts #Blacksmith #Forging #Satisfying #ASMR #Industrial',
        tags: ['shorts', 'blacksmith', 'forging', 'train rail anvil', 'asmr', 'satisfying', 'fred dibnah', 'metalwork'],
        pinnedComment: '🔨 What heavy vintage tool should we forge next out of 100-year-old steel? Tell us below!',
        wiseDisbursementTag: 'Wise Verified - Sort Code: 60-84-64'
      }
    },
    {
      id: 'audit_vid_04',
      videoId: 'SH_KIDS_7721',
      title: 'Bedtime 3D Story - The Dragonfly and Bug',
      publishedAt: '4 days ago',
      viewCount: 6200,
      likeCount: 310,
      commentCount: 28,
      videoType: 'short',
      durationSec: 48,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      ctrPercent: 2.4,
      retentionPercent: 86.2,
      healthScore: 64,
      status: 'Warning',
      detectedIssues: [
        {
          type: 'poor_thumbnail_ctr',
          severity: 'high',
          title: 'Unappealing Pastel Thumbnail (2.4% CTR vs 12% Goal)',
          description: 'Muted watercolor background blends in with YouTube feed. Characters have low eye contrast and zero glow.',
          suggestedFix: 'Re-render with glowing iridescent neon dragonfly wings and volumetric amber night lamp catchlight.'
        },
        {
          type: 'missing_metadata',
          severity: 'medium',
          title: 'Weak Hook Keyword Placement in Title',
          description: 'Title lacks bedtime parent trigger keywords like "Calming", "Sleep Loop", or "Pixar Style".',
          suggestedFix: 'Update title to: "The Clockwork Dragonfly 🕰️✨ (Bedtime 3D Short Film Loop) #Shorts"'
        }
      ],
      instantClipperOpportunity: {
        suggestedStartSec: 0,
        suggestedEndSec: 48,
        clipTitle: 'The Clockwork Dragonfly 🕰️✨ (Calming Bedtime Loop) #Shorts',
        hookText: 'Deep inside the quietest attic in Willow Creek, something tiny was waking up.',
        reason: 'Exceptional 86.2% retention curve - only needs CTR and metadata facelift'
      },
      episodeUploadMetadata: {
        episodeNumber: 4,
        seriesTitle: 'Bedtime Fables 3D',
        optimizedTitle: 'The Clockwork Dragonfly 🕰️✨ (Bedtime 3D Short Film Loop) #Shorts',
        optimizedDescription: 'Magical 3D animated bedtime short film about a brave clockwork dragonfly.\n\n#Shorts #Animation #BedtimeStory #3DAnimation #PixarStyle #SatisfyingLoops',
        tags: ['shorts', '3d animation', 'bedtime story', 'pixar style', 'kids animation', 'calming loop', 'fairy tale'],
        pinnedComment: '🌟 Parents: Did you spot the hidden brass key at second 24? Leave a comment for Ep. 2!',
        wiseDisbursementTag: 'Wise Verified - Sort Code: 60-84-64'
      }
    },
    {
      id: 'audit_vid_05',
      videoId: 'SH_STOIC_8819',
      title: 'The Eye Contact Paradox 👁️ #Shorts',
      publishedAt: '2 days ago',
      viewCount: 68400,
      likeCount: 5420,
      commentCount: 640,
      videoType: 'short',
      durationSec: 44,
      thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      ctrPercent: 13.8,
      retentionPercent: 89.8,
      healthScore: 95,
      status: 'Optimal',
      detectedIssues: [],
      instantClipperOpportunity: undefined,
      episodeUploadMetadata: {
        episodeNumber: 5,
        seriesTitle: 'Dark Psychology Secrets',
        optimizedTitle: 'The Eye Contact Paradox 👁️ (Ep. 5) #Shorts',
        optimizedDescription: 'Why dangerous negotiators never blink first. The triangular gaze lock technique.\n\n#Shorts #Psychology #DarkPsychology #BodyLanguage #Mindset',
        tags: ['shorts', 'dark psychology', 'body language', 'eye contact', 'stoicism'],
        pinnedComment: '👁️ Have you ever encountered someone who uses this on you? How did your heart respond?',
        wiseDisbursementTag: 'Wise Verified - Sort Code: 60-84-64'
      }
    }
  ]
};
