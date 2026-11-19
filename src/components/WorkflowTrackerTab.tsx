import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Sparkles, Zap, ArrowRight, Play, 
  RotateCcw, Plus, Trash2, Award, Clock, TrendingUp, ShieldCheck, 
  Layers, Video, Search, MessageSquare, DollarSign, Bookmark, Copy, Check,
  Trophy, Flame, Scissors, UploadCloud, Crown, RefreshCw
} from 'lucide-react';
import { GrowthMilestonesDashboard } from './GrowthMilestonesDashboard';
import { ReviewQueue } from './ReviewQueue';
import { PipelineAchievementsModal } from './PipelineAchievementsModal';
import { 
  GROWTH_BADGES_CONFIG, UserGrowthStats, GrowthBadge, 
  getRankForXp 
} from '../data/growthMilestonesData';
import {
  RevenueLedgerState,
  EvaluatedPipelineAchievement,
  loadRevenueLedger,
  subscribeRevenueLedger,
  evaluatePipelineAchievements,
  runDailyAnalyticsSync
} from '../utils/revenueLedgerStore';
import { gamificationAudio } from '../utils/gamificationAudio';

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  category: 'Scripting' | 'Editing' | 'SEO' | 'Upload';
  completed: boolean;
  toolHint?: string;
}

export interface VideoProject {
  id: string;
  name: string;
  niche: string;
  lastUpdated: string;
  steps: WorkflowStep[];
  creativePackage?: {
    superHook: string;
    viralFormula: string;
    scriptBeats: Array<{
      timeRange: string;
      spokenWords: string;
      visualDirection: string;
      soundEffect: string;
      retentionGoal: string;
    }>;
    title: string;
    description: string;
    hashtags: string[];
    pinnedComment: string;
    estimatedDuration?: string;
    algorithmScore: {
      predictedCtr: string;
      predictedRetention: string;
      loopRating: string;
    };
    editingChecklist: string[];
  };
}

const DEFAULT_STEPS: WorkflowStep[] = [
  // Phase 1: Scripting
  {
    id: 's1',
    category: 'Scripting',
    title: 'Generate High-Hook Concept with Creative Agent',
    description: 'Use the AI Creative Agent to formulate a 3-second hook that challenges the viewer\'s belief.',
    completed: false,
    toolHint: 'Run Creative Agent Prompt Engine below'
  },
  {
    id: 's2',
    category: 'Scripting',
    title: 'Validate First 3-Second Retention Loop',
    description: 'Ensure opening line contains zero filler ("Hey guys") and immediately opens an unresolved loop.',
    completed: false
  },
  {
    id: 's3',
    category: 'Scripting',
    title: 'Enforce Under 140 Words (35-45s Target)',
    description: 'Keep verbal pace crisp at ~150 words per minute so pacing feels urgent without sounding rushed.',
    completed: false
  },

  // Phase 2: Editing
  {
    id: 'e1',
    category: 'Editing',
    title: 'Center-Crop Video to 9:16 (FFmpeg or CapCut)',
    description: 'Cut footage to 1080x1920 using center-crop or blurred background padding.',
    completed: false,
    toolHint: 'Use Python & FFmpeg tab'
  },
  {
    id: 'e2',
    category: 'Editing',
    title: 'Check YouTube Shorts UI Safe-Zone Clearance',
    description: 'Position subtitles strictly in the 45-65% vertical center to clear like buttons and sound disc.',
    completed: false,
    toolHint: 'Use CapCut Safe-Zone tab'
  },
  {
    id: 'e3',
    category: 'Editing',
    title: 'Style Dynamic Captions (Yellow/White Pop)',
    description: 'Set font to The Bold Font or Montserrat Black with #FFE600 yellow keyword emphasis.',
    completed: false
  },
  {
    id: 'e4',
    category: 'Editing',
    title: 'Apply 3-4s Pattern Interrupts & Sound Effects',
    description: 'Add a punch-in zoom (115%), b-roll overlay, or whoosh sound effect every 3.5 seconds.',
    completed: false
  },

  // Phase 3: SEO
  {
    id: 'seo1',
    category: 'SEO',
    title: 'Craft Mobile Title Under 60 Characters',
    description: 'Ensure title never gets truncated on mobile screens with high curiosity angle.',
    completed: false,
    toolHint: 'Use Copywriter tab'
  },
  {
    id: 'seo2',
    category: 'SEO',
    title: 'Select 3 Algorithmic Trending Hashtags',
    description: 'Include #shorts plus 2 targeted niche tags to assist YouTube indexing.',
    completed: false
  },
  {
    id: 'seo3',
    category: 'SEO',
    title: 'Thumbnail & Frame 1 Contrast Verification',
    description: 'Verify frame 1 has maximum visual pop and matches the thumbnail promise.',
    completed: false,
    toolHint: 'Use Brand Kit tab'
  },

  // Phase 4: Upload & Monetization
  {
    id: 'u1',
    category: 'Upload',
    title: 'Prepare Helpful Pinned Comment (Free Affiliate Link)',
    description: 'Frame the affiliate link as answering viewer questions rather than a sales pitch.',
    completed: false,
    toolHint: 'Use Monetization tab'
  },
  {
    id: 'u2',
    category: 'Upload',
    title: 'Publish Video & Pin Comment within 30 Seconds',
    description: 'Pin the comment immediately after upload to anchor early high-intent clicks.',
    completed: false
  },
  {
    id: 'u3',
    category: 'Upload',
    title: 'Execute First 30-Minute Engagement Sprint',
    description: 'Reply to the first 5 user comments with a question to boost algorithm velocity.',
    completed: false
  }
];

export const WorkflowTrackerTab: React.FC = () => {
  const [projects, setProjects] = useState<VideoProject[]>(() => {
    const saved = localStorage.getItem('shortsforge_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 'proj-1',
        name: 'The $10M Pricing Mistake (Short #1)',
        niche: 'Finance & Business',
        lastUpdated: new Date().toLocaleDateString(),
        steps: DEFAULT_STEPS.map(s => ({ ...s }))
      }
    ];
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'proj-1');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectNiche, setNewProjectNiche] = useState('Finance');
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Creative Agent input states
  const [agentPrompt, setAgentPrompt] = useState('Why 99% of people fail with side hustles in 2026');
  const [agentFormula, setAgentFormula] = useState('Dopamine Loop & Pattern Interrupt');
  const [isAgentLoading, setIsAgentLoading] = useState(false);
  const [activeTabSubView, setActiveTabSubView] = useState<'tracker' | 'review_queue' | 'milestones' | 'agent' | 'highway'>('tracker');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Gamification & Growth Milestones State
  const [growthStats, setGrowthStats] = useState<UserGrowthStats>(() => {
    const saved = localStorage.getItem('shortsforge_growth_stats');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      clipsGenerated: 3,
      uploadsCompleted: 0,
      seoCompleted: 1,
      retentionAnalyzed: 1,
      hooksGenerated: 2,
      projectsCompleted: 0,
      remixCompleted: 0,
      unlockedBadgeIds: ['badge-first-clip', 'badge-first-seo', 'badge-first-retention'],
      totalXp: 1200,
      currentStreakDays: 3,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
  });

  const [recentlyUnlockedBadge, setRecentlyUnlockedBadge] = useState<GrowthBadge | null>(null);

  // Revenue Ledger, Daily Analytics Sync & Pipeline Achievements Modal State
  const [revenueLedger, setRevenueLedger] = useState<RevenueLedgerState>(() => loadRevenueLedger());
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState<boolean>(false);
  const [isSyncingDailyAnalytics, setIsSyncingDailyAnalytics] = useState<boolean>(false);
  const [newlyUnlockedAchievementIds, setNewlyUnlockedAchievementIds] = useState<string[]>([]);
  const [dailySyncToast, setDailySyncToast] = useState<string | null>(null);

  const pipelineAchievements: EvaluatedPipelineAchievement[] = evaluatePipelineAchievements(revenueLedger);
  const unlockedPipelineAchievementsCount = pipelineAchievements.filter((a) => a.unlocked).length;

  const triggerDailyAnalyticsSync = async (isAuto = false) => {
    if (isSyncingDailyAnalytics) return;
    setIsSyncingDailyAnalytics(true);
    try {
      const { ledger, newlyUnlocked, batchSummary } = await runDailyAnalyticsSync();
      setRevenueLedger(ledger);
      if (newlyUnlocked.length > 0) {
        gamificationAudio.playBadgeUnlock();
        setNewlyUnlockedAchievementIds(newlyUnlocked.map((b) => b.id));
        setDailySyncToast(
          `Daily Analytics Sync complete (+${batchSummary.viewsDelta.toLocaleString()} views, +${batchSummary.videosDelta} videos) — Unlocked: ${newlyUnlocked.map((b) => b.title).join(', ')}!`
        );
      } else if (!isAuto) {
        gamificationAudio.playXpGain();
        setDailySyncToast(
          `Daily Analytics Sync complete: +${batchSummary.videosDelta} videos, +${batchSummary.viewsDelta.toLocaleString()} views, +$${batchSummary.revenueDeltaUsd.toFixed(2)} USD.`
        );
      }
      setTimeout(() => setDailySyncToast(null), 5000);
    } finally {
      setIsSyncingDailyAnalytics(false);
    }
  };

  // Subscribe to real-time Revenue Ledger updates & run automatic once-per-day analytics sync
  useEffect(() => {
    const unsubscribe = subscribeRevenueLedger(setRevenueLedger);
    const todayIso = new Date().toISOString().split('T')[0];
    const current = loadRevenueLedger();
    if (current.lastDailySyncDateIso !== todayIso) {
      triggerDailyAnalyticsSync(true);
    }
    return unsubscribe;
  }, []);

  // Sync growth stats to localStorage
  useEffect(() => {
    localStorage.setItem('shortsforge_growth_stats', JSON.stringify(growthStats));
  }, [growthStats]);

  // Function to evaluate milestone requirements and award badges
  const evaluateAndAwardBadges = (updatedStats: UserGrowthStats) => {
    let xpToAdd = 0;
    const newBadgeIds: string[] = [];
    let latestBadge: GrowthBadge | null = null;

    GROWTH_BADGES_CONFIG.forEach(badge => {
      if (!updatedStats.unlockedBadgeIds.includes(badge.id)) {
        let currentCount = 0;
        switch (badge.metricType) {
          case 'clips_generated': currentCount = updatedStats.clipsGenerated; break;
          case 'uploads_completed': currentCount = updatedStats.uploadsCompleted; break;
          case 'seo_completed': currentCount = updatedStats.seoCompleted; break;
          case 'retention_analyzed': currentCount = updatedStats.retentionAnalyzed; break;
          case 'hooks_generated': currentCount = updatedStats.hooksGenerated; break;
          case 'projects_completed': currentCount = updatedStats.projectsCompleted; break;
          case 'remix_completed': currentCount = updatedStats.remixCompleted; break;
          case 'streak_days': currentCount = updatedStats.currentStreakDays; break;
        }

        if (currentCount >= badge.requiredCount) {
          newBadgeIds.push(badge.id);
          xpToAdd += badge.xpReward;
          latestBadge = badge;
        }
      }
    });

    if (newBadgeIds.length > 0) {
      gamificationAudio.playBadgeUnlock();
      const finalStats: UserGrowthStats = {
        ...updatedStats,
        unlockedBadgeIds: [...updatedStats.unlockedBadgeIds, ...newBadgeIds],
        totalXp: updatedStats.totalXp + xpToAdd
      };
      setGrowthStats(finalStats);
      if (latestBadge) {
        setRecentlyUnlockedBadge(latestBadge);
        setTimeout(() => setRecentlyUnlockedBadge(null), 5000);
      }
      return finalStats;
    }
    setGrowthStats(updatedStats);
    return updatedStats;
  };

  const handleSimulateAction = (metric: string, count = 1) => {
    setGrowthStats(prev => {
      const nextStats = { ...prev };
      if (metric === 'clips_generated') nextStats.clipsGenerated += count;
      if (metric === 'uploads_completed') nextStats.uploadsCompleted += count;
      if (metric === 'seo_completed') nextStats.seoCompleted += count;
      if (metric === 'retention_analyzed') nextStats.retentionAnalyzed += count;
      if (metric === 'hooks_generated') nextStats.hooksGenerated += count;
      if (metric === 'projects_completed') nextStats.projectsCompleted += count;
      if (metric === 'remix_completed') nextStats.remixCompleted += count;
      if (metric === 'streak_days') nextStats.currentStreakDays += count;
      if (metric === 'check_in') {
        nextStats.currentStreakDays += 1;
        nextStats.lastActiveDate = new Date().toISOString().split('T')[0];
      }
      nextStats.totalXp += 50 * count; // Base action XP

      return evaluateAndAwardBadges(nextStats);
    });
  };

  const handleResetStats = () => {
    const fresh: UserGrowthStats = {
      clipsGenerated: 0,
      uploadsCompleted: 0,
      seoCompleted: 0,
      retentionAnalyzed: 0,
      hooksGenerated: 0,
      projectsCompleted: 0,
      remixCompleted: 0,
      unlockedBadgeIds: [],
      totalXp: 0,
      currentStreakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    setGrowthStats(fresh);
  };

  const currentProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const toggleStep = (stepId: string) => {
    gamificationAudio.playXpGain();
    setProjects(prev => prev.map(proj => {
      if (proj.id !== activeProjectId) return proj;
      const updatedSteps = proj.steps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s);
      
      // Check if this step completion triggers specific metrics
      const toggled = updatedSteps.find(s => s.id === stepId);
      if (toggled && toggled.completed) {
        if (toggled.category === 'SEO') {
          handleSimulateAction('seo_completed', 1);
        } else if (toggled.category === 'Upload') {
          handleSimulateAction('uploads_completed', 1);
        } else if (toggled.category === 'Editing') {
          handleSimulateAction('clips_generated', 1);
        }
      }

      // Check if entire project completed
      const allDone = updatedSteps.every(s => s.completed);
      if (allDone && !proj.steps.every(s => s.completed)) {
        gamificationAudio.playLevelUp();
        handleSimulateAction('projects_completed', 1);
      }

      return { ...proj, steps: updatedSteps, lastUpdated: new Date().toLocaleDateString() };
    }));
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    const newProj: VideoProject = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      niche: newProjectNiche,
      lastUpdated: new Date().toLocaleDateString(),
      steps: DEFAULT_STEPS.map(s => ({ ...s }))
    };
    setProjects(prev => [newProj, ...prev]);
    setActiveProjectId(newProj.id);
    setNewProjectName('');
    setIsCreatingProject(false);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (projects.length <= 1) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) {
      setActiveProjectId(projects.find(p => p.id !== id)?.id || '');
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Run Creative Agent to auto-generate & populate
  const handleRunCreativeAgent = async () => {
    if (!agentPrompt.trim()) return;
    setIsAgentLoading(true);
    try {
      const res = await fetch('/api/creative-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: agentPrompt,
          niche: currentProject.niche,
          formula: agentFormula
        })
      });
      const data = await res.json();
      
      // Update active project with the creative package and mark Scripting steps as complete!
      setProjects(prev => prev.map(proj => {
        if (proj.id !== activeProjectId) return proj;
        const updatedSteps = proj.steps.map(s => {
          if (s.id === 's1' || s.id === 's2' || s.id === 's3') {
            return { ...s, completed: true };
          }
          return s;
        });
        return {
          ...proj,
          creativePackage: data,
          steps: updatedSteps,
          lastUpdated: new Date().toLocaleDateString()
        };
      }));

      setActiveTabSubView('tracker');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAgentLoading(false);
    }
  };

  // Calculate completion percentage
  const completedCount = currentProject?.steps.filter(s => s.completed).length || 0;
  const totalCount = currentProject?.steps.length || DEFAULT_STEPS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Group steps by category
  const categories: Array<'Scripting' | 'Editing' | 'SEO' | 'Upload'> = ['Scripting', 'Editing', 'SEO', 'Upload'];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-indigo-950/40 border border-red-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                <CheckCircle2 className="w-5 h-5 text-red-500" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Interactive Workflow Tracker &amp; Creative Agent</h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Track your video creation pipeline from prompt to viral upload. Check off Scripting, Editing, SEO, and Monetization milestones with AI auto-generation.
            </p>
          </div>

          {/* Sub-view switcher */}
          <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTabSubView('tracker')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTabSubView === 'tracker' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Pipeline Tracker
            </button>
            <button
              onClick={() => setActiveTabSubView('review_queue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTabSubView === 'review_queue' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md font-bold' 
                  : 'text-indigo-400 hover:text-indigo-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Review Queue</span>
              <span className="text-[10px] bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 px-1.5 py-0.2 rounded font-mono font-bold">
                Auto-Publish
              </span>
            </button>
            <button
              onClick={() => setActiveTabSubView('milestones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTabSubView === 'milestones' ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/20' : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 fill-current" /> Growth Milestones
              <span className="text-[10px] bg-black/40 text-current px-1.5 py-0.2 rounded font-mono font-bold">
                {growthStats.unlockedBadgeIds.length}/{GROWTH_BADGES_CONFIG.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTabSubView('agent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTabSubView === 'agent' ? 'bg-red-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" /> Creative Agent
            </button>
            <button
              onClick={() => setActiveTabSubView('highway')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTabSubView === 'highway' ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Success Highway
            </button>
          </div>
        </div>

        {/* Pipeline Achievements & Daily Analytics Sync Action Strip */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-300">
            <span className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800">
              Ledger Videos: <strong className="text-white">{revenueLedger.totalVideosPublished.toLocaleString()}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800">
              Total Views: <strong className="text-cyan-300">{revenueLedger.totalViews.toLocaleString()}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800">
              Revenue Ledger: <strong className="text-emerald-300">${revenueLedger.totalRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </span>
            <span className="text-[11px] text-zinc-400">
              Last Sync: {new Date(revenueLedger.lastDailySyncAt).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerDailyAnalyticsSync(false)}
              disabled={isSyncingDailyAnalytics}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingDailyAnalytics ? 'animate-spin' : ''}`} />
              <span>{isSyncingDailyAnalytics ? 'Syncing Daily Analytics...' : 'Sync Daily Analytics'}</span>
            </button>

            <button
              onClick={() => setIsAchievementsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-950/40 cursor-pointer transition"
            >
              <Award className="w-4 h-4" />
              <span>Pipeline Achievements</span>
              <span className="px-1.5 py-0.5 rounded bg-black/20 font-mono text-[10px]">
                {unlockedPipelineAchievementsCount}/{pipelineAchievements.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Analytics Sync / Achievement Unlock Notification */}
      {dailySyncToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{dailySyncToast}</span>
          </div>
          <button
            onClick={() => setIsAchievementsModalOpen(true)}
            className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-[11px] cursor-pointer shrink-0"
          >
            Open Achievements
          </button>
        </div>
      )}

      {/* Real-Time Badge Unlock Celebration Toast */}
      {recentlyUnlockedBadge && (
        <div className="bg-gradient-to-r from-amber-500 via-red-600 to-purple-600 p-0.5 rounded-2xl shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="bg-zinc-950 rounded-[14px] p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                <Trophy className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-extrabold tracking-wider block">
                  ★ NEW GROWTH MILESTONE UNLOCKED! ★
                </span>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  {recentlyUnlockedBadge.title}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    +{recentlyUnlockedBadge.xpReward} XP
                  </span>
                </h4>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {recentlyUnlockedBadge.description} • <strong className="text-emerald-400">{recentlyUnlockedBadge.statReward}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTabSubView('milestones')}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black rounded-xl cursor-pointer transition-colors shrink-0 shadow-md"
            >
              View Badge
            </button>
          </div>
        </div>
      )}

      {/* Project Switcher Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider shrink-0 font-mono">
            Active Projects:
          </span>
          {projects.map((proj) => {
            const isSelected = proj.id === activeProjectId;
            const projDone = proj.steps.filter(s => s.completed).length;
            const projPct = Math.round((projDone / proj.steps.length) * 100);
            return (
              <div
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer border flex items-center gap-2.5 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-red-500/20 border-red-500 text-white font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>{proj.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  projPct === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {projPct}%
                </span>
                {projects.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteProject(proj.id, e)}
                    className="text-zinc-600 hover:text-red-400 transition-colors p-0.5"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isCreatingProject ? (
            <button
              onClick={() => setIsCreatingProject(true)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> New Short Project
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project title..."
                className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-red-500"
              />
              <button
                onClick={handleCreateProject}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsCreatingProject(false)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Subviews */}

      {/* 1. PIPELINE TRACKER VIEW */}
      {activeTabSubView === 'tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Progress Meter & Category Breakdown */}
          <div className="lg:col-span-4 space-y-5">
            {/* Visual Completion Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 uppercase font-mono tracking-wider">
                  Project Readiness
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Updated: {currentProject?.lastUpdated}
                </span>
              </div>

              {/* Big Progress Gauge */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="#1c1917"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke={progressPercent === 100 ? '#10B981' : progressPercent >= 50 ? '#F59E0B' : '#EF4444'}
                    strokeWidth="12"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * progressPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-white">{progressPercent}%</span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
                    {progressPercent === 100 ? 'Viral Ready' : `${completedCount}/${totalCount} Done`}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-bold text-white">{currentProject?.name}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Niche: <strong className="text-zinc-200">{currentProject?.niche}</strong></p>
              </div>

              {/* Reset / Complete All buttons */}
              <div className="flex gap-2 pt-2 border-t border-zinc-800">
                <button
                  onClick={() => {
                    setProjects(prev => prev.map(p => p.id === activeProjectId ? {
                      ...p,
                      steps: p.steps.map(s => ({ ...s, completed: true }))
                    } : p));
                  }}
                  className="flex-1 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold transition-colors"
                >
                  Mark All Done
                </button>
                <button
                  onClick={() => {
                    setProjects(prev => prev.map(p => p.id === activeProjectId ? {
                      ...p,
                      steps: p.steps.map(s => ({ ...s, completed: false }))
                    } : p));
                  }}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
                  title="Reset Steps"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Creative Package Preview if Available */}
            {currentProject?.creativePackage && (
              <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase font-mono flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Creative Agent Attached
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Est CTR: {currentProject.creativePackage.algorithmScore?.predictedCtr}
                  </span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">3s Super Hook:</span>
                  <p className="text-white font-bold mt-0.5 text-xs italic">
                    &quot;{currentProject.creativePackage.superHook}&quot;
                  </p>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Formula Used:</span>
                  <p className="text-amber-300 font-mono text-[11px] mt-0.5">
                    {currentProject.creativePackage.viralFormula}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTabSubView('agent')}
                  className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Full Second-by-Second Beats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Step-by-Step Interactive Checklist */}
          <div className="lg:col-span-8 space-y-6">
            {categories.map((cat) => {
              const catSteps = currentProject?.steps.filter(s => s.category === cat) || [];
              const catDone = catSteps.filter(s => s.completed).length;
              const isCatComplete = catDone === catSteps.length && catSteps.length > 0;

              return (
                <div
                  key={cat}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                        isCatComplete 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {cat === 'Scripting' ? '1' : cat === 'Editing' ? '2' : cat === 'SEO' ? '3' : '4'}
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Phase {cat === 'Scripting' ? 'I' : cat === 'Editing' ? 'II' : cat === 'SEO' ? 'III' : 'IV'}: {cat}
                      </h3>
                    </div>

                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-bold ${
                      isCatComplete 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                    }`}>
                      {catDone}/{catSteps.length} Steps
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {catSteps.map((step) => (
                      <div
                        key={step.id}
                        onClick={() => toggleStep(step.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                          step.completed
                            ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="mt-0.5">
                          {step.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-600 shrink-0 hover:text-zinc-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className={`text-xs font-bold leading-snug ${
                            step.completed ? 'line-through text-zinc-400' : 'text-white'
                          }`}>
                            {step.title}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                            {step.description}
                          </p>
                          {step.toolHint && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-amber-400 font-mono">
                              <Sparkles className="w-3 h-3" />
                              <span>Shortcut: {step.toolHint}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 2. HUMAN REVIEW QUEUE & ORIGINALITY GATE VIEW (WITH AUTO-PUBLISH TOGGLE) */}
      {activeTabSubView === 'review_queue' && (
        <ReviewQueue />
      )}

      {/* 3. GROWTH MILESTONES & AAA GAMIFICATION DASHBOARD VIEW */}
      {activeTabSubView === 'milestones' && (
        <GrowthMilestonesDashboard 
          stats={growthStats}
          onSimulateAction={handleSimulateAction}
          onResetStats={handleResetStats}
        />
      )}

      {/* 3. CREATIVE AGENT & PROMPT GENERATOR VIEW */}
      {activeTabSubView === 'agent' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Prompt-to-Shorts Creative Agent
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Type any one-line concept. The Creative Agent will architect the 3-second hook, pacing beats, SFX cues, and load it directly into your project checklist!
              </p>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Your Idea / Video Topic Prompt <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={agentPrompt}
                  onChange={(e) => setAgentPrompt(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-500 placeholder-zinc-500 resize-none"
                  placeholder="e.g. Why 99% of people stay poor with investing, or the 3-second dopamine protocol..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Select Viral Algorithm Formula
                </label>
                <select
                  value={agentFormula}
                  onChange={(e) => setAgentFormula(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Dopamine Loop & Pattern Interrupt">1. Dopamine Loop &amp; Pattern Interrupt (Highest Loop Rate)</option>
                  <option value="The $100M Contrast Engine">2. The $100M Contrast Engine (Belief Violation ➔ Proof)</option>
                  <option value="Curiosity Vacuum">3. Curiosity Vacuum (Shocking Result First ➔ The Secret)</option>
                  <option value="Status Threat & FOMO">4. Status Threat &amp; FOMO (Costly Mistake ➔ Safe Fix)</option>
                </select>
              </div>

              {/* Sample Prompts */}
              <div>
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">⚡ Instant Prompt Seeds:</span>
                <div className="space-y-1.5">
                  {[
                    "The single biggest lie people believe about saving money",
                    "How to automate YouTube Shorts with free AI tools",
                    "The 3-second dopamine friction rule that cures laziness",
                    "Stop buying real estate like this in 2026"
                  ].map((seed, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAgentPrompt(seed)}
                      className="w-full text-left text-xs bg-zinc-950/70 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-zinc-800/80 truncate block transition-colors"
                    >
                      &quot;{seed}&quot;
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRunCreativeAgent}
                disabled={isAgentLoading || !agentPrompt.trim()}
                className="w-full py-3 bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAgentLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Architecting Viral Beats...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Generate Short Package &amp; Populate Tracker</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Package Output */}
            <div className="lg:col-span-7 space-y-5">
              {!currentProject?.creativePackage && !isAgentLoading && (
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[420px]">
                  <div className="w-14 h-14 bg-zinc-800/80 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                    <Zap className="w-7 h-7 text-amber-400" />
                  </div>
                  <h4 className="text-base font-semibold text-white">Creative Agent Ready</h4>
                  <p className="text-zinc-400 text-xs mt-1.5 max-w-md">
                    Enter your prompt on the left to generate the second-by-second timeline, spoken words, visual directions, SFX cues, and title for <strong>{currentProject?.name}</strong>.
                  </p>
                </div>
              )}

              {isAgentLoading && (
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
                  <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-sm font-semibold text-white">Crafting 3-Second Belief-Violating Hook...</p>
                  <p className="text-xs text-zinc-400 mt-1">Calibrating B-roll visual cues and seamless audio loop ending.</p>
                </div>
              )}

              {currentProject?.creativePackage && !isAgentLoading && (
                <div className="space-y-4">
                  {/* Algorithmic Score Card */}
                  <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" /> Algorithmic Virality Score
                      </span>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Predicted metrics based on 100M+ Shorts retention patterns:
                      </p>
                    </div>
                    <div className="flex gap-2 text-xs font-mono">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold">
                        CTR: {currentProject.creativePackage.algorithmScore?.predictedCtr}
                      </span>
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold">
                        Retention: {currentProject.creativePackage.algorithmScore?.predictedRetention}
                      </span>
                    </div>
                  </div>

                  {/* Second-by-Second Beats */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-bold text-zinc-300 uppercase font-mono tracking-wider">
                      🎬 Second-by-Second Production Timeline ({currentProject.creativePackage.estimatedDuration})
                    </h4>

                    <div className="space-y-3 pt-1">
                      {currentProject.creativePackage.scriptBeats?.map((beat, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              ⏱️ {beat.timeRange}
                            </span>
                            <span className="text-[11px] text-emerald-400 font-mono">
                              Goal: {beat.retentionGoal}
                            </span>
                          </div>

                          <div className="text-xs text-white font-medium bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                            <span className="text-[10px] text-zinc-500 uppercase block font-mono">Spoken Script:</span>
                            &quot;{beat.spokenWords}&quot;
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1">
                            <div>
                              <strong className="text-zinc-300">Visual Cue:</strong> {beat.visualDirection}
                            </div>
                            <div>
                              <strong className="text-indigo-400">SFX / Audio:</strong> {beat.soundEffect}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ready Copy Bundle */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase font-mono">
                        Generated Metadata Bundle
                      </span>
                      <button
                        onClick={() => {
                          const bundle = `TITLE:\n${currentProject.creativePackage?.title}\n\nDESCRIPTION:\n${currentProject.creativePackage?.description}\n\nTAGS:\n${currentProject.creativePackage?.hashtags?.join(' ')}\n\nPINNED COMMENT:\n${currentProject.creativePackage?.pinnedComment}`;
                          handleCopy(bundle, 'agent-bundle');
                        }}
                        className="px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 flex items-center gap-1"
                      >
                        {copiedKey === 'agent-bundle' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Meta Bundle</span>
                      </button>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-xs text-zinc-200 font-mono">
                      <strong className="text-white block mb-0.5">Title (&lt;60 chars):</strong>
                      {currentProject.creativePackage.title}
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-xs text-amber-300/90 font-mono whitespace-pre-wrap">
                      <strong className="text-white block mb-0.5">Pinned Comment:</strong>
                      {currentProject.creativePackage.pinnedComment}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. SUPER SUCCESS HIGHWAY VIEW */}
      {activeTabSubView === 'highway' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/20">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">The YouTube Shorts Super Success Highway</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                The algorithmic telemetry that controls distribution on the Shorts feed. Every viral Short passes through these 4 threshold gates:
              </p>
            </div>

            {/* 4 Highway Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                {
                  level: 'Level 1',
                  name: 'The 1K Seed Test',
                  range: '0 ➔ 1,000 Views',
                  color: 'border-blue-500/30 bg-blue-950/20 text-blue-400',
                  thresholds: ['CTR > 12% in first 200 impressions', 'APV (Average % Viewed) > 70%', 'Swipe-away rate under 35%'],
                  action: 'First 3 seconds must contain a bold hook and zero greeting filler.'
                },
                {
                  level: 'Level 2',
                  name: 'The 10K Inflection Point',
                  range: '1K ➔ 10,000 Views',
                  color: 'border-amber-500/30 bg-amber-950/20 text-amber-400',
                  thresholds: ['APV sustains > 85%', 'Second loop watch rate > 15%', 'Swipe-away drops below 25%'],
                  action: 'Add visual zooms every 3.5s and sound effect interrupts.'
                },
                {
                  level: 'Level 3',
                  name: 'Algorithmic Browse Surge',
                  range: '10K ➔ 100,000 Views',
                  color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400',
                  thresholds: ['Share rate > 1.8% of views', 'Comment velocity within first 30m', 'External search indexing active'],
                  action: 'Pinned comment must engage users with a direct question or high-value free resource.'
                },
                {
                  level: 'Level 4',
                  name: 'Super Highway Domination',
                  range: '100K ➔ 1,000,000+ Views',
                  color: 'border-purple-500/30 bg-purple-950/20 text-purple-400',
                  thresholds: ['APV > 110% (looping multiple times)', 'Channel subscriber conversion > 1%', 'Algorithm recommendation lock'],
                  action: 'Seamless audio loop ending: the closing word flows directly into second 0.'
                }
              ].map((gate, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${gate.color} space-y-3 flex flex-col justify-between`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded">
                        {gate.level}
                      </span>
                      <span className="text-[11px] font-mono font-semibold">{gate.range}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{gate.name}</h4>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase block font-semibold">
                        Algorithm Thresholds:
                      </span>
                      {gate.thresholds.map((t, i) => (
                        <div key={i} className="text-xs text-zinc-300 flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[11px] text-zinc-400">
                    <strong className="text-white">Required Focus:</strong> {gate.action}
                  </div>
                </div>
              ))}
            </div>

            {/* 4 Proven Algorithmic Formulas Matrix */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" /> The 4 Core Algorithmic Retention Formulas
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: 'Formula 1: The Dopamine Loop & Pattern Interrupt',
                    flow: '1. Shocking Hook (0-3s) ➔ 2. Pain Agitation (3-8s) ➔ 3. The Unfair Advantage (8-25s) ➔ 4. Loop to 0:00',
                    why: 'Highest loop rate. The last sentence naturally chains into the first sentence, forcing 110%+ APV.'
                  },
                  {
                    name: 'Formula 2: The $100M Contrast Engine',
                    flow: '1. Common Myth (0-3s) ➔ 2. Brutal Reality (3-10s) ➔ 3. Case Study Proof (10-25s) ➔ 4. Next Step',
                    why: 'Creates cognitive dissonance. The human brain cannot swipe until the contradiction is resolved.'
                  },
                  {
                    name: 'Formula 3: The Curiosity Vacuum',
                    flow: '1. The Impossible Result (0-3s) ➔ 2. "How I Did It" (3-7s) ➔ 3. The 3 Hidden Steps (7-30s) ➔ 4. Resource Plug',
                    why: 'Shows the summit first. Viewer watches the entire breakdown to discover the mechanism.'
                  },
                  {
                    name: 'Formula 4: Status Threat & Loss Aversion',
                    flow: '1. "If you do X in 2026, you lose..." (0-3s) ➔ 2. Cost Analysis (3-10s) ➔ 3. The Safe Alternative ➔ 4. CTA',
                    why: 'Loss aversion is 2.5x more psychologically powerful than the desire for gain.'
                  }
                ].map((f, i) => (
                  <div key={i} className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80 space-y-1.5">
                    <h5 className="text-xs font-bold text-amber-300">{f.name}</h5>
                    <p className="text-[11px] font-mono text-zinc-300 bg-zinc-900/60 p-2 rounded border border-zinc-800">
                      {f.flow}
                    </p>
                    <p className="text-[11px] text-zinc-400 leading-snug">{f.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline Achievements Modal (Revenue Ledger & Daily Analytics Sync Driven) */}
      <PipelineAchievementsModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        ledger={revenueLedger}
        achievements={pipelineAchievements}
        newlyUnlockedIds={newlyUnlockedAchievementIds}
        isSyncingDaily={isSyncingDailyAnalytics}
        onRunDailySync={() => triggerDailyAnalyticsSync(false)}
      />
    </div>
  );
};
