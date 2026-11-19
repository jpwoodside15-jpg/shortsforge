export interface TitleOption {
  title: string;
  charCount: number;
  angle: string;
  score?: number;
}

export interface CopywriterResult {
  titles: TitleOption[];
  description: string;
  hashtags: string[];
  pinnedComment: string;
  growthTips?: string[];
}

export interface TranscriptClip {
  clipId: number;
  title: string;
  startPhrase: string;
  endPhrase: string;
  startTime: string;
  endTime: string;
  startSeconds: number;
  endSeconds: number;
  duration: string;
  viralScore: number;
  psychologicalReason: string;
  hookAnalysis: string;
  editingDirection: string;
  ffmpegCommand: string;
}

export interface TranscriptSliceResult {
  summary: string;
  clips: TranscriptClip[];
}

export interface KeywordItem {
  id: number;
  topic: string;
  exactQuery: string;
  intent: string;
  competition: 'Low' | 'Medium' | 'High';
}

export interface KeywordCategories {
  howTo: KeywordItem[];
  versus: KeywordItem[];
  topTen: KeywordItem[];
}

export interface SourceVideoType {
  type: string;
  whyItWorks: string;
  exampleSearchQuery: string;
}

export interface KeywordScraperResult {
  niche: string;
  categories: KeywordCategories;
  sourceVideoTypes: SourceVideoType[];
}

export interface PacingItem {
  timeRange: string;
  action: string;
  sfx: string;
  retentionGoal: string;
}

export interface CapCutStep {
  step: number;
  title: string;
  description: string;
}

export interface DirectorGuide {
  fontConfig: {
    recommendedFonts: string[];
    colorCombo: string;
    stroke: string;
    shadow: string;
    animations: string;
  };
  safeZoneRules: string[];
  pacingChecklist: PacingItem[];
  stepByStepChecklist: CapCutStep[];
}

export interface AffiliateProgram {
  name: string;
  commission: string;
  joinUrl: string;
  bestFor: string;
  howToPromote: string;
}

export interface NicheMonetization {
  niche: string;
  rpm: string;
  cpm: string;
  potential: string;
  why: string;
}

export interface MonetizationResult {
  top5Niches: NicheMonetization[];
  selectedNiche: string;
  affiliatePrograms: AffiliateProgram[];
  pinnedCommentBlueprint: {
    framework: string;
    template: string;
    whyItConverts: string;
  };
  inVideoCallToActions: string[];
}

export interface SentimentCaptionSegment {
  id: number;
  text: string;
  sentiment: 'urgent' | 'curiosity' | 'growth' | 'authority' | 'neutral';
  colorHex: string;
  emotionLabel: string;
  startSec: number;
  endSec: number;
  highlightWord: string;
  animation?: string;
  tensionLevel?: number;
  psychologyReason?: string;
}

export interface GameplayRecommendation {
  id: string;
  name: string;
  game: string;
  style: string;
  retentionScore: number;
  bestFor: string;
  psychologicalReason: string;
  pacingBpm: number;
  splitScreenRatio: string;
  previewType: 'subway' | 'minecraft' | 'gtav' | 'csgo' | 'sand' | 'trackmania';
  exampleHook: string;
}

export interface FreeAiVideoTool {
  name: string;
  tier: string;
  creditPolicy: string;
  bestFor: string;
  resolution: string;
  url: string;
  rating: string;
  highlight: string;
}

export interface AiVideoPromptPackage {
  toolTarget: string;
  ratio: string;
  hookPrompt: string;
  bodyPrompt: string;
  climaxPrompt: string;
  negativePrompt: string;
  cameraMotionAdvice: string;
}

export interface FreeAiVideoAdvisorResult {
  analysis: string;
  recommendedGameplays: GameplayRecommendation[];
  freeTools: FreeAiVideoTool[];
  promptPackages: AiVideoPromptPackage[];
}

export type SfxCategory = 
  | 'whoosh' 
  | 'pop' 
  | 'cinematic-hit' 
  | 'riser' 
  | 'bass-drop' 
  | 'dopamine-cash' 
  | 'glitch-ui';

export interface SonicImpactSfx {
  id: string;
  name: string;
  category: SfxCategory;
  durationSec: number;
  tag: string;
  capcutTimingCue: string;
  recommendedVolumeDb: string;
  audioWaveType: 'whoosh-air' | 'bubble-pop' | 'braam-hit' | 'riser-pitch' | 'sub-drop' | 'cash-chime' | 'glitch-buzz' | 'shutter-snap';
  description: string;
  retentionBenefit: string;
}

export interface TimelineTrackItem {
  id: string;
  sfxId: string;
  name: string;
  category: SfxCategory;
  timestampSec: number;
  volume: number; // 0 - 100
  durationSec: number;
  linkedSegmentId?: number;
}

export interface AiVideoScene {
  id: string;
  sceneNumber: number;
  title: string;
  prompt: string;
  durationSec: number;
  style: 'hyper-realistic' | 'cyberpunk-neon' | 'cinematic-dark' | '3d-vibrant' | 'anime-speed' | 'analog-vhs';
  cameraMotion: 'zoom-in' | 'pan-left' | 'drone-orbit' | 'tilt-up' | 'subtle-drift' | 'dolly-zoom';
  visualTheme: 'city' | 'finance' | 'brain' | 'nature' | 'abstract' | 'space' | 'matrix';
  overlayCaption: string;
  colorHex: string;
}

export interface AiVideoProjectConfig {
  id: string;
  title: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  splitScreenMode: boolean;
  splitGameplayType: 'gtav' | 'minecraft' | 'subway' | 'csgo' | 'sand' | 'trackmania';
  splitRatio: number; // 20 to 80, default 50
  colorFilter: 'none' | 'teal-orange' | 'noir' | 'warm-dopamine' | 'matrix' | 'high-contrast';
  filmGrain: number; // 0 to 100
  vignette: boolean;
  speedMultiplier: number; // 0.5, 1, 1.25, 1.5, 2
  showSafeZoneOverlay: boolean;
  scenes: AiVideoScene[];
  timelineSfx: TimelineTrackItem[];
}

// SEO Content Auditor Types
export interface SeoAuditMetricScore {
  score: number; // 0 - 100
  label: string;
  status: 'good' | 'warning' | 'critical';
  feedback: string;
}

export interface CompetitorBenchmarkItem {
  rank: number;
  title: string;
  channel: string;
  views: string;
  uploadAge: string;
  ctrHookTrigger: string;
  matchedKeywords: string[];
  retentionPattern: string;
}

export interface SeoImprovementAction {
  id: string;
  category: string;
  issue: string;
  remedy: string;
  impact: 'High' | 'Medium' | 'Critical';
  applied: boolean;
  fixTitle?: string;
  fixDescription?: string;
  fixTags?: string[];
}

export interface SeoAuditResult {
  overallScore: number;
  scoreGrade: 'A+' | 'A' | 'B' | 'C' | 'Needs Work';
  titleCharCount: number;
  descCharCount: number;
  metrics: {
    keywordProminence: SeoAuditMetricScore;
    mobileTruncation: SeoAuditMetricScore;
    searchIntentFit: SeoAuditMetricScore;
    ctrCuriosityGap: SeoAuditMetricScore;
    descriptionRichness: SeoAuditMetricScore;
    tagAlignment: SeoAuditMetricScore;
    monetizationReadiness: SeoAuditMetricScore;
  };
  actionableSuggestions: SeoImprovementAction[];
  topRankingCompetitors: CompetitorBenchmarkItem[];
  optimizedTitle: string;
  optimizedDescription: string;
  recommendedTags: string[];
  retentionHookRecommendation: string;
}

// Batch Thumbnail Studio Types
export interface BatchThumbnailCard {
  id: string;
  styleName: string;
  styleCategory: 'Faceless Cash Cow' | '3D Kids Animation' | 'Cinema & Film Recap' | 'SaaS & Finance' | 'Mystery & Curiosity';
  headlineText: string;
  subHeadlineText?: string;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  badgeText: string;
  predictedCtr: string;
  ctrPercentile: number;
  safeZoneStatus: 'Passed - 100% Mobile Safe' | 'Attention - Border Buffer';
  imageDescription: string;
  promptForAi: string;
  visualElements: string[];
}

// Instant AI Generated Shorts Types
export interface InstantShortsPackage {
  id: string;
  title: string;
  niche: string;
  category: 'clipper' | 'films' | 'animations' | 'kids_animations' | 'news_flash';
  durationSec: number;
  estimatedRpm: string;
  potentialViews: string;
  projectedEarnings: string;
  hookHeadline: string;
  description: string;
  tags: string[];
  pinnedComment: string;
  scriptSegments: Array<{
    timestampRange: string;
    speaker: string;
    spokenText: string;
    bRollVisualPrompt: string;
    screenTextOverlay: string;
    sfxTrigger: string;
  }>;
  soundtrackRecommendation: {
    title: string;
    bpm: number;
    genre: string;
    mood: string;
    license: string;
  };
  capcutDirectives: string[];
  videoPreviewUrl: string;
  thumbnailPrompt: string;
}

// Wise OAuth & Automated Payout Disbursement Types
export interface WiseOAuthAccount {
  connected: boolean;
  profileId: string;
  accountHolderName: string;
  email: string;
  wiseTag: string;
  businessType: 'Personal' | 'Business / Studio Entity';
  connectedAt: string;
  tokenExpiresAt: string;
  balances: {
    currency: string;
    amount: number;
    symbol: string;
    isPrimaryReceiver: boolean;
  }[];
  localBankDetails: {
    achRouting: string;
    accountNumber: string;
    bankName: string;
    accountType: string;
  };
}

export interface YouTubeEarningsTracker {
  channelName: string;
  channelId: string;
  syncTimestamp: string;
  currentCycle: {
    period: string;
    grossEstimatedEarnings: number;
    shortsFeedAdRevenue: number;
    shortsViewsCount: number;
    shortsRpm: number;
    longFormAndAffiliateRevenue: number;
    eligibleForDisbursement: number;
    accrualStatus: 'Accumulating' | 'Clear for Disbursement' | 'Disbursed';
    nextScheduledPayDate: string;
  };
  metrics: {
    avgMonthlyEarnings: number;
    totalHistoricalDisbursed: number;
    currency: string;
    ytdEarnings: number;
  };
  recentDisbursements: PayoutDisbursementTransaction[];
}

export interface PayoutDisbursementTransaction {
  id: string;
  transactionRef: string;
  date: string;
  amount: number;
  currency: string;
  source: 'YouTube AdSense Direct';
  destination: string;
  status: 'Completed' | 'Processing' | 'Scheduled';
  exchangeRate?: string;
  feeAmount: number;
  traditionalFeeComparison: number;
  savings: number;
  receiptUrl?: string;
}

export interface AutoDisbursementRule {
  enabled: boolean;
  minThreshold: number; // e.g. 500
  frequency: 'realtime_clearance' | 'monthly_21st' | 'biweekly';
  targetCurrency: 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD';
  targetDestination: 'wise_balance' | 'local_bank_ach';
  taxReservePercent: number; // e.g. 25%
  notifyEmail: boolean;
}

// Multi-lingual AI Types
export interface MultilingualTranslationPackage {
  languageCode: string;
  languageName: string;
  flag: string;
  cpmTier: 'Tier 1 (High CPM)' | 'Tier 2 (High Volume)' | 'Tier 3';
  cpmBenchmark: string;
  localizedTitle: string;
  localizedHook: string;
  localizedDescription: string;
  localizedTags: string[];
  localizedVoiceoverScript: string;
  culturalNuanceTip: string;
  estimatedAudienceMultiplier: string;
}

export interface MultilingualAiResponse {
  sourceNiche: string;
  originalText: string;
  recommendedLanguages: MultilingualTranslationPackage[];
  globalEarningsMultiplier: string;
  actionPlan: string[];
}

// 20+ Language Localization Engine Types
export interface SubtitleCaptionCue {
  id: number;
  startTime: string;
  endTime: string;
  startSec: number;
  endSec: number;
  text: string;
}

export interface LocalizedLanguageResult {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  speakersCount: string;
  cpmTier: 'Tier 1 ($10-$18+)' | 'Tier 2 ($4-$9)' | 'Tier 3 (Volume Growth)';
  cpmEstimate: string;
  audienceMultiplier: string;
  title: string;
  hook: string;
  description: string;
  pinnedComment: string;
  tags: string[];
  voiceoverScript: string;
  captionsSrt: string;
  captionsVtt: string;
  cues: SubtitleCaptionCue[];
  culturalNuances: string[];
  recommendedSpeechRate: string;
  recommendedTtsVoice: string;
}

export interface LocalizationBatchJob {
  id: string;
  timestamp: string;
  sourceTitle: string;
  sourceDescription: string;
  sourceScript: string;
  sourceNiche: string;
  targetLanguageCodes: string[];
  results: Record<string, LocalizedLanguageResult>;
}

// Niche Profitability Map Types
export interface NicheProfitabilityGenre {
  id: string;
  name: string;
  shortName: string;
  category: 'High-Ticket & SaaS' | 'High-Volume Entertainment' | 'Specialist & Lifestyle';
  cpm: number;
  shortsRpm: number;
  affiliateConversionRate: number;
  avgOrderValue: number;
  monthlyViewsBenchmark: number;
  viralityVelocityScore: number;
  productionDifficultyHours: number;
  netProfitabilityScore: number;
  quadrant: 'Q1: Goldmine (High CPM + High Conv)' | 'Q2: Prestige (High CPM)' | 'Q3: Viral Scale (High Vol)' | 'Q4: AdSense Only';
  color: string;
  accentBg: string;
  borderColor: string;
  topAffiliateProgram: string;
  sampleHook: string;
  primaryRevenueSource: string;
  wiseMonthlyPayoutEst: number; // in GBP
}

// Payout Security Validator Types
export interface ValidationFieldCheck {
  valid: boolean;
  message: string;
  code: 'valid' | 'warning' | 'invalid' | 'incomplete';
  details?: string;
}

export interface PayoutSecurityValidationResult {
  isFullyValid: boolean;
  overallScore: number; // 0 - 100
  sortCodeCheck: ValidationFieldCheck;
  accountNumberCheck: ValidationFieldCheck;
  beneficiaryCheck: ValidationFieldCheck;
  routingCheck: ValidationFieldCheck;
  bankClearingCheck: ValidationFieldCheck;
  fraudRiskLevel: 'Zero Risk (Verified Wise Partner)' | 'Low' | 'High';
  fastPaymentsReady: boolean;
  simulatedHandshakePassed: boolean;
}

// Global Monetization Heatmap Types
export interface GlobalRegionalMonetizationData {
  regionId: string;
  countryName: string;
  countryCode: string;
  flag: string;
  continent: string;
  audienceSharePercent: number;
  averageCpm: number;
  shortsRpm: number;
  purchasingPowerTier: 'Tier 1 (High Ticket)' | 'Tier 2 (High Volume)' | 'Tier 3 (Emerging Scale)';
  recommendedAffiliateNiche: string;
  recommendedPrograms: string[];
  optimalReleaseTimeGmt: string;
  colorHeat: string;
  topBuyerDemographic: string;
}

// Batch Video Localization & Distribution Types
export interface BatchVideoItem {
  id: string;
  title: string;
  niche: string;
  originalDurationSec: number;
  targetRegions: string[];
  localizedTitles: Record<string, string>;
  regionalPinnedCtas: Record<string, string>;
  cpmProjected: number;
  scheduledTimezone: string;
  status: 'Ready' | 'Queued' | 'Published';
}

// Revenue Intelligence Types
export interface ContentPivotOpportunity {
  id: string;
  targetNiche: string;
  currentNiche: string;
  cpmLiftPercent: number; // e.g. +310%
  baseRpm: number;
  projectedRpm: number;
  difficultyScore: 'Low (1 Day)' | 'Medium (3 Days)' | 'High (1 Week)';
  pivotHeadline: string;
  strategicRationale: string;
  actionableFormat: string;
  exampleViralHooks: string[];
  pinnedAffiliateIntegration: string;
  projectedMonthlyDeltaGbp: number;
}

export interface RevenueIntelligenceAnalysis {
  channelDailyViews: number;
  channelCurrentRpm: number;
  channelCurrentMonthlyEarningsGbp: number;
  currentNiche: string;
  benchmarkNiches: {
    niche: string;
    rpm: number;
    cpm: number;
    viralMultiplier: number;
    affiliateConversionRate: number;
    monthlyEarningsAtScale: number;
  }[];
  pivots: ContentPivotOpportunity[];
  topRecommendation: ContentPivotOpportunity;
  estimatedWiseDisbursementLift: string;
}

export interface AffiliateProductRevenueItem {
  id: string;
  rank: 1 | 2 | 3;
  productName: string;
  niche: string;
  category: string;
  monthlyRevenueGbp: number;
  conversionRatePercent: number;
  totalClicks: number;
  totalConversions: number;
  commissionStructure: string;
  epcUsd: number;
  drivingShortsCount: number;
  suggestedContentPivot: {
    pivotTitle: string;
    targetFormat: string;
    projectedRpmLiftPercent: number;
    recommendedVisuals: string;
    audioTrackRecommendation: string;
    cinematicPrompt: string;
    generatedScript: string;
    fullGeneratedFilm: {
      durationSec: number;
      hookText: string;
      scene1Visual: string;
      scene2Climax: string;
      endingLoop: string;
      pinnedCta: string;
    };
  };
  sampleAffiliateShortTitle: string;
  recommendedTags: string[];
}

// Smart Revenue Benchmarking Types
export interface DetectedNicheCategory {
  nicheId: string;
  nicheName: string;
  category: string;
  confidenceScore: number;
  detectedKeywords: string[];
  industryAverageCpm: number;
  industryAverageRpm: number;
  advertiserCompetition: 'Ultra High' | 'High' | 'Medium' | 'Low';
  topAffiliateEpc: number;
  retentionBenchmark: number;
}

export interface SmartRevenueBenchmarkResult {
  detectedNiche: DetectedNicheCategory;
  analyzedMetadata: {
    videoTitlesSample: string[];
    dominantTags: string[];
    averageDurationSec: number;
    channelHandle: string;
  };
  currentChannelMetrics: {
    dailyViews: number;
    monthlyViews: number;
    currentRpm: number;
    currentMonthlyGbp: number;
  };
  benchmarks: {
    opportunityScore: number;
    opportunityTier: 'Exceptional (Critical Gap)' | 'High Untapped Revenue' | 'Moderate Gap' | 'Optimal Performance';
    cpmDifferenceUsd: number;
    rpmDifferenceUsd: number;
    estimatedMonthlyRevenueLeakageGbp: number;
    projectedMonthlyEarningsGbp: number;
    revenueMultiplier: number;
  };
  topDiscoveredVideos: {
    id: string;
    title: string;
    url: string;
    duration: string;
    viewCount: string;
    opportunityReason: string;
    suggestedClipRange: { startSec: number; endSec: number };
  }[];
}

// A/B Test Manager & Simulated Engagement Types
export interface ShortVariation {
  id: 'A' | 'B';
  name: string;
  title: string;
  hook: string;
  script: string;
  thumbnailPrompt: string;
  thumbnailPreviewUrl?: string;
  soundStyle: string;
  bpm: number;
  pinnedCta: string;
  pacing: 'Rapid (0.8s cuts)' | 'Cinematic Narrative (2s cuts)' | 'Hypnotic Loop';
  visualStyle: string;
}

export interface RetentionCurvePoint {
  second: number;
  retentionPercent: number;
  label?: string;
}

export interface ABSimulationResult {
  winnerId: 'A' | 'B';
  confidenceScore: number; // 0 - 100%
  variationA: {
    predictedRetention30s: number;
    predictedVtr: number; // View Through Rate %
    hookVelocityScore: number; // 0 - 100
    predictedCtr: number;
    shareabilityScore: number;
    retentionCurve: RetentionCurvePoint[];
    strengths: string[];
    dropoffVulnerabilities: string[];
  };
  variationB: {
    predictedRetention30s: number;
    predictedVtr: number;
    hookVelocityScore: number;
    predictedCtr: number;
    shareabilityScore: number;
    retentionCurve: RetentionCurvePoint[];
    strengths: string[];
    dropoffVulnerabilities: string[];
  };
  executiveSummary: string;
  actionablePolishes: string[];
  estimatedAlgorithmPushMultiplier: string;
}

// Short Films Generator Types
export interface ShortFilmScene {
  sceneNumber: number;
  timecode: string;
  shotType: 'Extreme Close-Up' | 'Low-Angle Tracking' | 'Macro POV' | 'Drone Orbit' | 'Dutch Tilt';
  visualDescription: string;
  characterAction: string;
  dialogueOrVoiceover: string;
  soundFx: string;
}

export interface ShortFilmPackage {
  id: string;
  title: string;
  genre: 'Suspense Thriller' | 'Sci-Fi Paradox' | 'Psychological Loop' | 'Dark Comedy' | 'Micro Drama';
  logline: string;
  runtimeSeconds: number;
  threeActBeats: {
    act1_setup: string;
    act2_escalation: string;
    act3_twistOrLoop: string;
  };
  seamlessLoopTechnique: string;
  cinematicColorGrade: string;
  soundtrackMood: string;
  scenes: ShortFilmScene[];
  scriptFullText: string;
  noClutterRecommendedSettings: {
    aspectRatio: '9:16' | '16:9' | '2.39:1 Anamorphic';
    loopBufferMs: number;
    ambientBacklightColor: string;
  };
}

// Interesting Content Spark Types
export interface InterestingContentSpark {
  id: string;
  title: string;
  hookParadox: string;
  curiosityTrigger: string;
  cliffhangerEnding: string;
  psychologicalTrick: string;
  category: 'Mind Bending' | 'Unsolved Mystery' | 'Human Nature' | 'Future Shock' | 'Forbidden Knowledge';
  estimatedReplayRate: string;
}

// Niche Library Registry Types
export type NicheConceptCategory = 
  | 'Kids Animation & 3D Fables' 
  | 'High-Tech Reviews & AI' 
  | 'Personal Finance & Wealth' 
  | 'Dark History & Psychology' 
  | 'Craftsman & Engineering Loops' 
  | 'Sci-Fi Speculative Cinema' 
  | 'Biohacking & Clean Living' 
  | 'Micro-Documentaries';

export type ContentBlockType = 
  | 'visual_prompt_pack' 
  | 'voiceover_script' 
  | 'sound_design_cues' 
  | 'b_roll_manifest' 
  | 'viral_hook_stack' 
  | 'safe_zone_caption_block';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  badge: string;
  description: string;
  content: string;
  copyPayload: string;
  metaTags?: string[];
  durationTag?: string;
}

export interface NicheConceptItem {
  id: string;
  filmTitle: string;
  niche: string;
  category: NicheConceptCategory;
  cpmBenchmark: string;
  cpmValue: number;
  avgRetention30s: number;
  viralityRating: number;
  affiliateYieldScore: string;
  logline: string;
  durationSeconds: number;
  pacing: 'Rapid (0.8s cuts)' | 'Cinematic Narrative (2.2s cuts)' | 'Hypnotic Continuous Loop' | 'Macro ASMR Rhythm';
  directorTone: string;
  soundtrackRecommendation: string;
  colorGrade: string;
  targetAudience: string;
  seamlessLoopMechanism: string;
  sampleThumbnailConcept: string;
  preSeededBlocks: ContentBlock[];
  optimizedYoutubeMetadata: {
    title: string;
    description: string;
    tags: string[];
    pinnedComment: string;
  };
}

export interface AutomationSoftwareRequirement {
  id: string;
  name: string;
  purpose: string;
  installCommand: string;
  languageOrEcosystem: 'python' | 'node' | 'system';
  isInstalled: boolean;
  version?: string;
  docUrl: string;
  sampleSnippet: string;
}

// Channel Health Audit Types
export type UploadHealthStatus = 'Critical' | 'Warning' | 'Optimal';

export type OptimizationIssueType = 
  | 'missing_metadata' 
  | 'poor_thumbnail_ctr' 
  | 'conversion_gap' 
  | 'safe_zone_violation' 
  | 'audio_retention';

export interface AuditDetectedIssue {
  type: OptimizationIssueType;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  suggestedFix: string;
}

export interface ChannelUploadAuditItem {
  id: string;
  videoId: string;
  title: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  videoType: 'short' | 'long_form';
  durationSec: number;
  thumbnailUrl: string;
  ctrPercent: number;
  retentionPercent: number;
  healthScore: number; // 0 - 100
  status: UploadHealthStatus;
  detectedIssues: AuditDetectedIssue[];
  instantClipperOpportunity?: {
    suggestedStartSec: number;
    suggestedEndSec: number;
    clipTitle: string;
    hookText: string;
    reason: string;
  };
  episodeUploadMetadata?: {
    episodeNumber: number;
    seriesTitle: string;
    optimizedTitle: string;
    optimizedDescription: string;
    tags: string[];
    pinnedComment: string;
    wiseDisbursementTag: string;
  };
}

export interface ChannelHealthAuditSummary {
  channelHandle: string;
  channelTitle: string;
  subscriberCount: number;
  totalVideosAnalyzed: number;
  overallHealthScore: number;
  criticalIssuesCount: number;
  warningCount: number;
  optimalCount: number;
  estimatedMonthlyViewsGainedWithFixes: number;
  estimatedRevenueLeakageGbp: number;
  uploads: ChannelUploadAuditItem[];
}

// Psychological Trigger Engine Types
export interface CuriosityGapBreakdown {
  loopName: string;
  description: string;
  timestampOrLine: string;
  whyItRetains: string;
}

export interface PacingAccelerantBreakdown {
  technique: string;
  description: string;
  cadenceBpm: number;
  staccatoPhrase: string;
}

export interface ViralScriptReference {
  id: string;
  title: string;
  creator: string;
  views: string;
  niche: string;
  retentionRate: string;
  fullScript: string;
  primaryPsychologicalTrigger: string;
  neuroscienceAnchor: string;
  curiosityGapsUsed: CuriosityGapBreakdown[];
  pacingAccelerantsUsed: PacingAccelerantBreakdown[];
}

export interface InjectedCuriosityGap {
  id: string;
  name: string;
  marker: string;
  originalDraftSegment: string;
  injectedScriptSegment: string;
  psychologicalMechanism: string;
  retentionImpact: string;
  timestampSecond: number;
}

export interface InjectedPacingAccelerant {
  id: string;
  technique: string;
  marker: string;
  appliedAtSecond: number;
  cadenceDescription: string;
  audioCues: string;
  originalWpm: number;
  acceleratedWpm: number;
}

export interface ScriptDiffSegment {
  type: 'original' | 'curiosity_gap' | 'pacing_accelerant' | 'hook_climax';
  text: string;
  annotation?: string;
  secondMarker?: number;
}

export interface PsychologicalTriggerEngineResult {
  analyzedViralScript: {
    title: string;
    coreThesis: string;
    psychologicalHooks: string[];
    curiosityGapDensity: string;
    pacingVelocityMap: string;
  };
  originalDraftStats: {
    wordCount: number;
    estimatedDurationSec: number;
    wpm: number;
    curiosityScore: number;
    pacingScore: number;
    overallRetentionProbability: number;
  };
  optimizedDraftStats: {
    wordCount: number;
    estimatedDurationSec: number;
    wpm: number;
    curiosityScore: number;
    pacingScore: number;
    overallRetentionProbability: number;
    predictedRetentionLiftPercent: number;
    predicted3sThumbStopRate: number;
    predicted30sCompletionRate: number;
  };
  injectedCuriosityGaps: InjectedCuriosityGap[];
  injectedPacingAccelerants: InjectedPacingAccelerant[];
  optimizedScriptFullText: string;
  annotatedScriptDiff: ScriptDiffSegment[];
  recommendedAudioCadence: {
    tempoBpm: number;
    voiceoverTone: string;
    soundEffects: string[];
  };
  oneClickShortsPackage: {
    title: string;
    description: string;
    pinnedComment: string;
  };
}

// Sync to Social & Watermark-Free Optimization Types
export type SocialPlatformId = 'tiktok' | 'instagram_reels' | 'youtube_shorts';

export interface SocialSafeZoneMargins {
  topMarginPx: number;
  bottomMarginPx: number;
  rightMarginPx: number;
  leftMarginPx: number;
  description: string;
}

export interface PlatformEncodingSpecs {
  resolution: string;
  codec: string;
  bitrate: string;
  frameRate: string;
  colorSpace: string;
  audioSpec: string;
  containerFormat: string;
}

export interface TikTokPlatformConfig {
  optimizedTitle: string;
  optimizedCaption: string;
  hashtags: string[];
  recommendedSound: {
    title: string;
    artist: string;
    bpm: number;
    boostFactor: string;
  };
  safeZone: SocialSafeZoneMargins;
  encodingSpecs: PlatformEncodingSpecs;
  ffmpegCommand: string;
  predictedReachMultiplier: number;
  maxDurationSec: number;
}

export interface InstagramReelsPlatformConfig {
  hookLine: string;
  optimizedCaption: string;
  callToAction: string;
  manyChatDmTrigger: string;
  hashtags: string[];
  safeZone: SocialSafeZoneMargins;
  encodingSpecs: PlatformEncodingSpecs;
  ffmpegCommand: string;
  saveRateStrategy: string;
  predictedReachMultiplier: number;
  maxDurationSec: number;
}

export interface WatermarkFreeAuditReport {
  cleanFramesVerified: boolean;
  watermarkStripped: boolean;
  metadataWiped: boolean;
  exifTagsRemoved: string[];
  brandLogosSuppressed: string[];
  colorSpaceTag: 'Rec.709 sRGB' | 'DCI-P3' | 'Untagged';
  audioNormalizedLufs: number;
  antiShadowbanScore: number; // 0 - 100
}

export interface RevenueCrossPlatformProjection {
  youtubeAdSenseGbp: number;
  tiktokCreatorRewardsGbp: number;
  instagramDmConversionsGbp: number;
  totalMonthlyGbp: number;
  affiliateCommissionBoostGbp: number;
}

export interface SocialSyncOptimizationResult {
  videoId: string;
  sourceTitle: string;
  sourceVideoUrl: string;
  durationSec: number;
  tiktokConfig: TikTokPlatformConfig;
  instagramReelsConfig: InstagramReelsPlatformConfig;
  watermarkAudit: WatermarkFreeAuditReport;
  revenueProjection: RevenueCrossPlatformProjection;
  monetizationActionSteps: {
    stepNumber: number;
    title: string;
    platform: 'YouTube' | 'TikTok' | 'Instagram' | 'Wise';
    action: string;
    expectedRoi: string;
  }[];
}

export interface BatchStagedShort {
  id: string;
  originalFileName: string;
  fileSizeBytes: number;
  parsedPartNumber: number;
  parsedTitle: string;
  title: string;
  description: string;
  tags: string[];
  durationSec: number;
  niche: string;
  cpm: number;
  estimatedEarnings: number;
  retentionScore: number;
  scheduledDate: string;
  scheduledTime: string;
  dayOffset: number;
  status: 'ready' | 'scheduled' | 'validating' | 'uploading' | 'published' | 'error';
  videoSrc: string;
  compliancePassed: boolean;
  greenDollarMonetized: boolean;
  affiliateDisclosure: boolean;
  isNewsFlash?: boolean;
}

export interface BulkMetadataTemplate {
  id: string;
  name: string;
  badge: string;
  description: string;
  titlePattern: string;
  descriptionTemplate: string;
  tags: string[];
  category: string;
  defaultVisibility: 'public' | 'unlisted' | 'private' | 'scheduled';
  pinnedCommentTemplate: string;
  hasAffiliateDisclosure: boolean;
  manyChatTrigger: string;
  wisePayoutMention: boolean;
}

export interface AudiencePeakTimeSlot {
  dayOfWeek: string;
  dayOffset: number;
  dateStr: string;
  slotType: 'midday_search' | 'evening_commute' | 'night_scroll';
  timeStr: string;
  audienceTrafficScore: number;
  recommendedNiches: string[];
  assignedShortId?: string;
}

export interface BatchUploadPlanSummary {
  totalShorts: number;
  cadencePerDay: number;
  startDate: string;
  endDate: string;
  totalProjectedEarnings: number;
  avgPredictedRetention: number;
  peakTimeAdherencePercent: number;
}
