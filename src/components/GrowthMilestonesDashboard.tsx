import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, Trophy, Sparkles, Flame, CheckCircle2, TrendingUp,
  Zap, Search, UploadCloud, Scissors, Activity, Crown,
  Repeat, Star, ArrowUpRight, ShieldCheck, Lock, Unlock,
  Volume2, VolumeX, Eye, ChevronRight, Share2, Copy, Check,
  Globe, Calendar, Clock, ChevronDown, CheckCheck
} from 'lucide-react';
import { 
  GrowthBadge, GROWTH_BADGES_CONFIG, UserGrowthStats, 
  CREATOR_RANKS, getRankForXp 
} from '../data/growthMilestonesData';
import { 
  SupportedLanguage, SUPPORTED_LANGUAGES, I18N_TRANSLATIONS 
} from '../data/growthMilestonesI18n';
import { gamificationAudio } from '../utils/gamificationAudio';

interface GrowthMilestonesDashboardProps {
  stats: UserGrowthStats;
  onSimulateAction?: (metric: string, count?: number) => void;
  onResetStats?: () => void;
}

export const GrowthMilestonesDashboard: React.FC<GrowthMilestonesDashboardProps> = ({
  stats,
  onSimulateAction,
  onResetStats
}) => {
  // Multi-Language State
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('shortsforge_milestones_lang');
    return (saved as SupportedLanguage) || 'en';
  });

  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<GrowthBadge | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterTier, setFilterTier] = useState<string>('All');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copiedBadge, setCopiedBadge] = useState<string | null>(null);
  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(false);

  // Active translation dictionary
  const t = useMemo(() => {
    return I18N_TRANSLATIONS[currentLang] || I18N_TRANSLATIONS.en;
  }, [currentLang]);

  // Handle language switch
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    localStorage.setItem('shortsforge_milestones_lang', lang);
    setIsLangMenuOpen(false);
    if (soundEnabled) gamificationAudio.playXpGain();
  };

  const currentRank = getRankForXp(stats.totalXp);
  const nextRank = CREATOR_RANKS.find(r => r.level === currentRank.level + 1);
  const rankXpProgress = nextRank 
    ? Math.min(100, Math.max(0, Math.round(((stats.totalXp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100)))
    : 100;

  const totalBadges = GROWTH_BADGES_CONFIG.length;
  const unlockedBadges = GROWTH_BADGES_CONFIG.filter(b => stats.unlockedBadgeIds.includes(b.id));
  const completionPercentage = Math.round((unlockedBadges.length / totalBadges) * 100);

  const categories = ['All', 'Creation', 'Upload', 'SEO', 'Retention', 'Viral Mastery', 'Consistency'];
  const tiers = ['All', 'bronze', 'silver', 'gold', 'diamond', 'mythic'];

  // Check if today already checked in
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate === today && stats.currentStreakDays > 0) {
      setHasCheckedInToday(true);
    } else {
      setHasCheckedInToday(false);
    }
  }, [stats.lastActiveDate, stats.currentStreakDays]);

  const getMetricCurrentCount = (metricType: GrowthBadge['metricType']) => {
    switch (metricType) {
      case 'clips_generated': return stats.clipsGenerated;
      case 'uploads_completed': return stats.uploadsCompleted;
      case 'seo_completed': return stats.seoCompleted;
      case 'retention_analyzed': return stats.retentionAnalyzed;
      case 'hooks_generated': return stats.hooksGenerated;
      case 'projects_completed': return stats.projectsCompleted;
      case 'remix_completed': return stats.remixCompleted;
      case 'streak_days': return stats.currentStreakDays;
      default: return 0;
    }
  };

  const getTierVisuals = (tier: GrowthBadge['tier']) => {
    switch (tier) {
      case 'bronze':
        return {
          glow: 'shadow-amber-900/30',
          border: 'border-amber-700/50',
          bg: 'from-amber-950/40 via-zinc-900 to-amber-900/20',
          badgeText: 'text-amber-400',
          badgePill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          gradientRing: 'from-amber-700 via-yellow-600 to-amber-900',
          stars: 1
        };
      case 'silver':
        return {
          glow: 'shadow-slate-400/20',
          border: 'border-slate-400/50',
          bg: 'from-slate-800/40 via-zinc-900 to-slate-900/20',
          badgeText: 'text-slate-300',
          badgePill: 'bg-slate-400/10 text-slate-200 border-slate-400/30',
          gradientRing: 'from-slate-300 via-zinc-400 to-slate-500',
          stars: 2
        };
      case 'gold':
        return {
          glow: 'shadow-yellow-500/30',
          border: 'border-yellow-500/60',
          bg: 'from-yellow-950/40 via-zinc-900 to-amber-900/30',
          badgeText: 'text-yellow-400',
          badgePill: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
          gradientRing: 'from-amber-400 via-yellow-300 to-orange-500',
          stars: 3
        };
      case 'diamond':
        return {
          glow: 'shadow-cyan-500/40',
          border: 'border-cyan-400/70',
          bg: 'from-cyan-950/40 via-zinc-900 to-blue-950/40',
          badgeText: 'text-cyan-300',
          badgePill: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/50',
          gradientRing: 'from-cyan-300 via-blue-400 to-indigo-500',
          stars: 4
        };
      case 'mythic':
        return {
          glow: 'shadow-purple-500/50',
          border: 'border-purple-400/80',
          bg: 'from-purple-950/50 via-zinc-900 to-pink-950/40',
          badgeText: 'text-purple-300',
          badgePill: 'bg-purple-500/20 text-purple-200 border-purple-400/50',
          gradientRing: 'from-purple-400 via-pink-400 to-red-500',
          stars: 5
        };
    }
  };

  const renderBadgeIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Scissors': return <Scissors className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'UploadCloud': return <UploadCloud className={className} />;
      case 'Send': return <TrendingUp className={className} />;
      case 'Search': return <Search className={className} />;
      case 'Hash': return <TrendingUp className={className} />;
      case 'TrendingDown': return <Activity className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Crown': return <Crown className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      case 'Repeat': return <Repeat className={className} />;
      default: return <Award className={className} />;
    }
  };

  // Helper to get localized badge metadata
  const getLocalizedBadge = (badge: GrowthBadge) => {
    const badgeI18n = t.badges[badge.id];
    return {
      title: badgeI18n?.title || badge.title,
      description: badgeI18n?.description || badge.description,
      flavorQuote: badgeI18n?.flavorQuote || badge.flavorQuote
    };
  };

  // Helper to get localized rank title
  const getLocalizedRankTitle = (rankLevel: number) => {
    switch (rankLevel) {
      case 1: return t.ranks.noviceSlicer;
      case 2: return t.ranks.hookApprentice;
      case 3: return t.ranks.retentionSurgeon;
      case 4: return t.ranks.algorithmicVanguard;
      case 5: return t.ranks.shortsTitan;
      case 6: return t.ranks.viralOverlord;
      default: return currentRank.title;
    }
  };

  const handleShareBadge = (badge: GrowthBadge) => {
    const localized = getLocalizedBadge(badge);
    const text = `🏆 Unlocked Milestone on ShortsForge: "${localized.title}" (${badge.tier.toUpperCase()} TIER)!\n+${badge.xpReward} XP | ${badge.statReward}\n${localized.description}`;
    navigator.clipboard.writeText(text);
    setCopiedBadge(badge.id);
    if (soundEnabled) gamificationAudio.playXpGain();
    setTimeout(() => setCopiedBadge(null), 2500);
  };

  const filteredBadges = GROWTH_BADGES_CONFIG.filter(badge => {
    const matchCategory = filterCategory === 'All' || badge.category === filterCategory;
    const matchTier = filterTier === 'All' || badge.tier === filterTier;
    return matchCategory && matchTier;
  });

  // Calculate 7-day streak calendar days
  const streakDaysVisual = useMemo(() => {
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const activeStreak = stats.currentStreakDays;
    return dayLabels.map((day, idx) => {
      const isComplete = idx < Math.min(activeStreak, 7);
      const isCurrentTarget = idx === Math.min(activeStreak, 7);
      return { dayNumber: idx + 1, label: day, isComplete, isCurrentTarget };
    });
  }, [stats.currentStreakDays]);

  return (
    <div className="space-y-6">
      {/* AAA Top Bar: Multi-Language Selector & Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-950/40">
            <Trophy className="w-5 h-5 text-amber-200 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span>{t.dashboardTitle}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                AAA Edition
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 max-w-xl">
              {t.dashboardSubtitle}
            </p>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-xs font-bold text-zinc-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>{SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.flag}</span>
              <span>{SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] uppercase font-mono font-bold text-zinc-500 px-2 py-1">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                      currentLang === lang.code 
                        ? 'bg-red-600/20 text-red-300 font-bold' 
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {currentLang === lang.code && <CheckCheck className="w-3.5 h-3.5 text-red-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              soundEnabled ? 'bg-zinc-800 text-amber-400 border-zinc-700' : 'bg-zinc-950 text-zinc-500 border-zinc-800'
            }`}
            title={soundEnabled ? t.soundActive : t.soundMuted}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* AAA Level & Prestige Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Creator Rank Crest */}
          <div className="lg:col-span-5 flex items-center gap-5">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-500 via-red-600 to-purple-700 p-1 shadow-xl shadow-red-950/50 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 drop-shadow-md animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-extrabold mt-1">
                    {t.rankLevel} {currentRank.level}
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-red-600 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded-full border border-red-400/50 shadow-md">
                LVL {currentRank.level}
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700">
                  {t.creatorPrestige}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  {stats.currentStreakDays} {t.streakDays}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {getLocalizedRankTitle(currentRank.level)}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Unlock viral capability multipliers by hitting real creation, retention, and publishing thresholds.
              </p>
            </div>
          </div>

          {/* XP Progress Bar & Metric Counters */}
          <div className="lg:col-span-7 space-y-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/90 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-300 font-bold uppercase">{t.experiencePoints}</span>
                <span className="text-sm font-black text-white font-mono bg-zinc-950 px-2.5 py-0.5 rounded-md border border-zinc-800 text-amber-400">
                  {stats.totalXp.toLocaleString()} XP
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400">
                {nextRank ? (
                  <>{t.nextRank}: <strong className="text-white">{getLocalizedRankTitle(nextRank.level)}</strong> ({nextRank.minXp.toLocaleString()} XP)</>
                ) : (
                  <span className="text-amber-400 font-bold">{t.maxRank}</span>
                )}
              </div>
            </div>

            {/* Visual XP Bar */}
            <div className="space-y-1">
              <div className="h-3.5 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800 relative">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-red-500 to-yellow-400 shadow-lg shadow-amber-500/30 transition-all duration-700 ease-out"
                  style={{ width: `${rankXpProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>{currentRank.minXp} XP</span>
                <span className="text-zinc-300 font-bold">{rankXpProgress}% {t.toNextPrestige}</span>
                <span>{nextRank ? `${nextRank.minXp} XP` : 'Max'}</span>
              </div>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800/80">
              <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">{t.clipsCut}</span>
                <span className="text-lg font-black text-white font-mono">{stats.clipsGenerated}</span>
                <span className="text-[9px] text-zinc-500 block">{t.target10Clips}</span>
              </div>

              <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">{t.uploadsDone}</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{stats.uploadsCompleted}</span>
                <span className="text-[9px] text-zinc-500 block">{t.targetFirstLive}</span>
              </div>

              <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">{t.seoPackages}</span>
                <span className="text-lg font-black text-cyan-400 font-mono">{stats.seoCompleted}</span>
                <span className="text-[9px] text-zinc-500 block">{t.sub60Titles}</span>
              </div>

              <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">{t.badgesEarned}</span>
                <span className="text-lg font-black text-amber-400 font-mono">{unlockedBadges.length}/{totalBadges}</span>
                <span className="text-[9px] text-zinc-500 block">{completionPercentage}% {t.unlocked}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 7-DAY CONSISTENCY STREAK FLAME TRACKER COMPONENT */}
      <div className="bg-gradient-to-r from-amber-950/30 via-zinc-900 to-red-950/30 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/40">
                <Flame className="w-5 h-5 fill-orange-500 text-orange-400 animate-bounce" />
              </span>
              <h3 className="text-lg font-black text-white">{t.streakTitle}</h3>
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                {stats.currentStreakDays} {t.streakDays}
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-xl">
              {t.streakSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-zinc-950/80 border border-zinc-800 px-4 py-2 rounded-2xl text-center">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">{t.streakMultiplier}</span>
              <span className="text-sm font-black text-amber-400 font-mono">
                {Math.min(2.0, (1.0 + stats.currentStreakDays * 0.05)).toFixed(2)}x Boost
              </span>
            </div>

            <button
              onClick={() => {
                if (onSimulateAction) {
                  onSimulateAction('check_in', 1);
                }
                setHasCheckedInToday(true);
                if (soundEnabled) gamificationAudio.playLevelUp();
              }}
              disabled={hasCheckedInToday}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
                hasCheckedInToday
                  ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 cursor-default'
                  : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-950/40'
              }`}
            >
              {hasCheckedInToday ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.checkedIn}</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-amber-200 fill-amber-200 animate-pulse" />
                  <span>{t.checkInToday}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 7-Day Flame Track Visualizer */}
        <div className="grid grid-cols-7 gap-2 md:gap-4 mt-6 pt-5 border-t border-zinc-800/80">
          {streakDaysVisual.map((slot) => {
            return (
              <div
                key={slot.dayNumber}
                className={`rounded-2xl p-3 md:p-4 text-center border transition-all flex flex-col items-center justify-between gap-2 ${
                  slot.isComplete 
                    ? 'bg-gradient-to-b from-orange-950/50 to-zinc-900 border-orange-500/60 shadow-lg shadow-orange-950/30 ring-1 ring-orange-500/30' 
                    : slot.isCurrentTarget 
                      ? 'bg-zinc-900 border-amber-500/50 animate-pulse'
                      : 'bg-zinc-950/60 border-zinc-800/80 opacity-60'
                }`}
              >
                <span className="text-[10px] md:text-xs font-mono font-bold text-zinc-400">
                  {slot.label}
                </span>

                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${
                  slot.isComplete 
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' 
                    : 'bg-zinc-900 text-zinc-600'
                }`}>
                  <Flame className={`w-5 h-5 ${slot.isComplete ? 'fill-orange-500 text-orange-400' : 'text-zinc-600'}`} />
                </div>

                <span className={`text-[10px] font-mono font-bold ${
                  slot.isComplete ? 'text-amber-400' : 'text-zinc-500'
                }`}>
                  {slot.isComplete ? 'Day ' + slot.dayNumber : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gamification Action Simulator & Controls (AAA Testing Sandbox) */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            {t.simDeckTitle}
          </h4>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {t.simDeckSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onSimulateAction && (
            <>
              <button
                onClick={() => {
                  onSimulateAction('clips_generated', 1);
                  if (soundEnabled) gamificationAudio.playXpGain();
                }}
                className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="+1 Clip to progress toward 10 clips badge"
              >
                <Scissors className="w-3.5 h-3.5 text-red-400" />
                <span>{t.plusClip}</span>
              </button>

              <button
                onClick={() => {
                  onSimulateAction('clips_generated', 10);
                  if (soundEnabled) gamificationAudio.playBadgeUnlock();
                }}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Unlock '10 Clips Generated' badge instantly"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.unlock10Clips}</span>
              </button>

              <button
                onClick={() => {
                  onSimulateAction('uploads_completed', 1);
                  if (soundEnabled) gamificationAudio.playBadgeUnlock();
                }}
                className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Unlock 'First Successful Upload' badge"
              >
                <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.firstUpload}</span>
              </button>

              <button
                onClick={() => {
                  onSimulateAction('streak_days', 7);
                  if (soundEnabled) gamificationAudio.playBadgeUnlock();
                }}
                className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Unlock 'Consistency Streak: 7 Days' badge"
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Streak 7 Days</span>
              </button>

              <button
                onClick={() => {
                  onSimulateAction('streak_days', 1);
                  if (soundEnabled) gamificationAudio.playXpGain();
                }}
                className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="+1 Streak Day"
              >
                <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
                <span>{t.plusStreakDay}</span>
              </button>
            </>
          )}

          {/* Reset Stats */}
          {onResetStats && (
            <button
              onClick={onResetStats}
              className="px-2.5 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 rounded-xl border border-zinc-800 text-[11px] font-mono cursor-pointer"
              title="Reset gamification stats to test fresh unlock progression"
            >
              {t.resetStats}
            </button>
          )}
        </div>
      </div>

      {/* Filter and View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-mono text-zinc-500 mr-1 font-semibold uppercase">{t.categoryLabel}</span>
          {categories.map(cat => {
            const label = cat === 'All' ? t.all : 
                          cat === 'Creation' ? t.creation : 
                          cat === 'Upload' ? t.upload : 
                          cat === 'SEO' ? t.seo : 
                          cat === 'Retention' ? t.retention : 
                          cat === 'Viral Mastery' ? t.viralMastery : 
                          cat === 'Consistency' ? t.consistency : cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-red-600 text-white font-bold shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tier Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-zinc-500 mr-1 uppercase">{t.tierLabel}</span>
          {tiers.map(tier => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono capitalize transition-all cursor-pointer ${
                filterTier === tier
                  ? 'bg-zinc-200 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {tier === 'All' ? t.all : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Badges Grid (AAA Holographic Trophy Room) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => {
          const isUnlocked = stats.unlockedBadgeIds.includes(badge.id);
          const currentCount = getMetricCurrentCount(badge.metricType);
          const progressPct = Math.min(100, Math.round((currentCount / badge.requiredCount) * 100));
          const visuals = getTierVisuals(badge.tier);
          const localized = getLocalizedBadge(badge);

          return (
            <div
              key={badge.id}
              onClick={() => {
                setSelectedBadge(badge);
                if (soundEnabled) gamificationAudio.playXpGain();
              }}
              className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden select-none ${
                isUnlocked
                  ? `bg-gradient-to-br ${visuals.bg} ${visuals.border} shadow-lg ${visuals.glow} hover:scale-[1.02] hover:border-white/50`
                  : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 opacity-65 hover:opacity-85'
              }`}
            >
              {/* Top Row: Tier badge & Star Rating */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${visuals.badgePill}`}>
                  {badge.tier}
                </span>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: visuals.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Holographic Icon Container */}
              <div className="flex items-center gap-4 my-2">
                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center p-0.5 shrink-0 transition-transform group-hover:scale-110 ${
                  isUnlocked
                    ? `bg-gradient-to-br ${visuals.gradientRing} shadow-md`
                    : 'bg-zinc-800/60'
                }`}>
                  <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                    isUnlocked ? 'bg-zinc-900 text-white' : 'bg-zinc-950 text-zinc-600'
                  }`}>
                    {renderBadgeIcon(badge.iconName, 'w-7 h-7')}
                  </div>
                  {isUnlocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 border border-zinc-700">
                      <Lock className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className={`text-sm font-black tracking-tight truncate ${
                    isUnlocked ? 'text-white' : 'text-zinc-400'
                  }`}>
                    {localized.title}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                    {badge.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold">
                    <span>+{badge.xpReward} XP</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-emerald-400 truncate">{badge.statReward}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-zinc-400 line-clamp-2 my-2 leading-snug">
                {localized.description}
              </p>

              {/* Progress Bar & Status */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-1.5 mt-auto">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={isUnlocked ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-zinc-500'}>
                    {isUnlocked ? (
                      <>
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>{t.achieved}</span>
                      </>
                    ) : (
                      <span>{t.progress} ({currentCount}/{badge.requiredCount})</span>
                    )}
                  </span>
                  <span className="text-zinc-400 font-bold">{progressPct}%</span>
                </div>

                <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/80">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUnlocked 
                        ? 'bg-gradient-to-r from-emerald-400 to-cyan-400' 
                        : 'bg-zinc-700'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* View detail hover hint */}
              <div className="mt-2 text-right">
                <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 flex items-center justify-end gap-0.5 font-mono">
                  <span>{t.inspectDetails}</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Badge Modal (AAA Showcase) */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Ambient Backlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-red-600 p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-white">
                    {renderBadgeIcon(selectedBadge.iconName, 'w-8 h-8')}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {selectedBadge.tier} TIER
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {selectedBadge.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">
                    {getLocalizedBadge(selectedBadge).title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Flavor Quote */}
            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl italic text-xs text-zinc-300 text-center font-serif leading-relaxed">
              &quot;{getLocalizedBadge(selectedBadge).flavorQuote}&quot;
            </div>

            {/* Description & Requirement */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2 text-zinc-300">
                <strong className="text-white shrink-0">{t.objective}</strong>
                <span>{getLocalizedBadge(selectedBadge).description}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">{t.xpReward}</span>
                  <span className="text-base font-black text-amber-400 font-mono">+{selectedBadge.xpReward} XP</span>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">{t.algorithmicPerk}</span>
                  <span className="text-base font-black text-emerald-400 font-mono">{selectedBadge.statReward}</span>
                </div>
              </div>
            </div>

            {/* Current Status & CTA */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
              <div className="text-xs">
                {stats.unlockedBadgeIds.includes(selectedBadge.id) ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.unlockedActive}
                  </span>
                ) : (
                  <span className="text-zinc-400 font-mono">
                    {t.incomplete} {getMetricCurrentCount(selectedBadge.metricType)}/{selectedBadge.requiredCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {stats.unlockedBadgeIds.includes(selectedBadge.id) && (
                  <button
                    onClick={() => handleShareBadge(selectedBadge)}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedBadge === selectedBadge.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.copiedCard}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{t.shareBrag}</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  {t.done}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
