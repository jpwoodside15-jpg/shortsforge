import React, { useState, useMemo } from 'react';
import {
  Trophy, Award, Eye, Video, DollarSign, RefreshCw, X, CheckCircle2,
  Lock, Sparkles, Flame, Calendar, TrendingUp, Layers
} from 'lucide-react';
import {
  EvaluatedPipelineAchievement,
  RevenueLedgerState
} from '../utils/revenueLedgerStore';

interface PipelineAchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ledger: RevenueLedgerState;
  achievements: EvaluatedPipelineAchievement[];
  newlyUnlockedIds: string[];
  isSyncingDaily: boolean;
  onRunDailySync: () => void;
}

const TIER_STYLES: Record<
  EvaluatedPipelineAchievement['tier'],
  { pill: string; border: string; glow: string; bar: string }
> = {
  bronze: {
    pill: 'bg-amber-500/15 text-amber-300 border-amber-600/40',
    border: 'border-amber-600/45',
    glow: 'from-amber-950/35 via-zinc-950 to-zinc-950',
    bar: 'bg-amber-500'
  },
  silver: {
    pill: 'bg-slate-400/15 text-slate-200 border-slate-400/40',
    border: 'border-slate-400/45',
    glow: 'from-slate-800/35 via-zinc-950 to-zinc-950',
    bar: 'bg-slate-300'
  },
  gold: {
    pill: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50',
    border: 'border-yellow-500/55',
    glow: 'from-yellow-950/40 via-zinc-950 to-zinc-950',
    bar: 'bg-yellow-400'
  },
  diamond: {
    pill: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/50',
    border: 'border-cyan-400/60',
    glow: 'from-cyan-950/45 via-zinc-950 to-zinc-950',
    bar: 'bg-cyan-400'
  },
  mythic: {
    pill: 'bg-purple-500/20 text-purple-200 border-purple-400/50',
    border: 'border-purple-400/60',
    glow: 'from-purple-950/45 via-zinc-950 to-zinc-950',
    bar: 'bg-gradient-to-r from-purple-400 to-pink-400'
  }
};

function formatMetricCount(metric: EvaluatedPipelineAchievement['metric'], val: number): string {
  if (metric === 'total_revenue_usd') {
    return `$${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  if (metric === 'total_views') {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
    return String(val);
  }
  return val.toLocaleString('en-US');
}

export const PipelineAchievementsModal: React.FC<PipelineAchievementsModalProps> = ({
  isOpen,
  onClose,
  ledger,
  achievements,
  newlyUnlockedIds,
  isSyncingDaily,
  onRunDailySync
}) => {
  const [modalTab, setModalTab] = useState<'badges' | 'ledger'>('badges');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'in_progress'>('all');

  const unlockedCount = useMemo(
    () => achievements.filter((a) => a.unlocked).length,
    [achievements]
  );

  const filteredAchievements = useMemo(() => {
    return achievements.filter((a) => {
      if (badgeFilter === 'unlocked') return a.unlocked;
      if (badgeFilter === 'in_progress') return !a.unlocked;
      return true;
    });
  }, [achievements, badgeFilter]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Pipeline Achievements"
    >
      <div className="w-full max-w-5xl max-h-[90vh] bg-zinc-950 border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-amber-950/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-tight">
                  Pipeline Achievements
                </h2>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {unlockedCount} / {achievements.length} Badges Unlocked
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Live milestone badges and channel stats driven by your Revenue Ledger &amp; Daily Analytics Sync.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onRunDailySync}
              disabled={isSyncingDaily}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingDaily ? 'animate-spin' : ''}`} />
              <span>{isSyncingDaily ? 'Syncing Daily Analytics...' : 'Sync Daily Analytics'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Newly Unlocked Banner */}
          {newlyUnlockedIds.length > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/15 to-indigo-500/20 border border-amber-400/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                <div className="text-xs">
                  <span className="font-black text-amber-300 uppercase tracking-wider block">
                    Milestone Unlocked!
                  </span>
                  <span className="text-white font-semibold">
                    {achievements
                      .filter((a) => newlyUnlockedIds.includes(a.id))
                      .map((a) => a.title)
                      .join(', ')}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                REVENUE LEDGER VERIFIED
              </span>
            </div>
          )}

          {/* Revenue Ledger Summary KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-900/75 border border-zinc-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-indigo-400" />
                Videos Published
              </div>
              <div className="text-xl font-black text-white font-mono">
                {ledger.totalVideosPublished.toLocaleString('en-US')}
              </div>
              <div className="text-[10px] text-zinc-500">
                Next milestone: {ledger.totalVideosPublished >= 100 ? '250 Videos' : '100 Videos Published'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/75 border border-zinc-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Total Views
              </div>
              <div className="text-xl font-black text-white font-mono">
                {ledger.totalViews.toLocaleString('en-US')}
              </div>
              <div className="text-[10px] text-zinc-500">
                Blended RPM: ${ledger.blendedRpmUsd.toFixed(2)}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/75 border border-zinc-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Revenue Ledger Total
              </div>
              <div className="text-xl font-black text-emerald-300 font-mono">
                ${ledger.totalRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-zinc-500">
                AdSense ${ledger.totalAdSenseUsd.toLocaleString()} · Aff ${ledger.totalAffiliateUsd.toLocaleString()}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/75 border border-zinc-800 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Daily Sync Streak
              </div>
              <div className="text-xl font-black text-amber-300 font-mono">
                {ledger.dailySyncStreakDays} Days
              </div>
              <div className="text-[10px] text-zinc-500 truncate">
                Last Sync: {new Date(ledger.lastDailySyncAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Modal Sub-Tabs & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setModalTab('badges')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
                  modalTab === 'badges'
                    ? 'bg-amber-500 text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                Achievements &amp; Badges ({unlockedCount}/{achievements.length})
              </button>
              <button
                onClick={() => setModalTab('ledger')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
                  modalTab === 'ledger'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Revenue Ledger ({ledger.entries.length} entries)
              </button>
            </div>

            {modalTab === 'badges' && (
              <div className="flex items-center gap-1.5 text-[11px]">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
                  { id: 'in_progress', label: `In Progress (${achievements.length - unlockedCount})` }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setBadgeFilter(f.id as any)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer border ${
                      badgeFilter === f.id
                        ? 'bg-zinc-800 text-white border-zinc-600'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* VIEW 1: ACHIEVEMENTS & BADGES */}
          {modalTab === 'badges' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredAchievements.map((ach) => {
                const style = TIER_STYLES[ach.tier];
                const isNew = newlyUnlockedIds.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-2xl border bg-gradient-to-br transition space-y-3 ${
                      ach.unlocked
                        ? `${style.glow} ${style.border}`
                        : 'from-zinc-900/50 to-zinc-950 border-zinc-800/80 opacity-85'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                            ach.unlocked ? style.pill : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                          }`}
                        >
                          {ach.unlocked ? (
                            <Trophy className="w-5 h-5" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-black text-white">{ach.title}</h4>
                            {isNew && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-black uppercase">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{ach.description}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border shrink-0 font-bold ${
                          ach.unlocked ? style.pill : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                        }`}
                      >
                        {ach.tier}
                      </span>
                    </div>

                    {/* Progress Bar toward Milestone */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className={ach.unlocked ? 'text-emerald-300 font-bold' : 'text-zinc-400'}>
                          {ach.unlocked ? (
                            <span className="inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                            </span>
                          ) : (
                            'Progress'
                          )}
                        </span>
                        <span className="text-zinc-200">
                          {formatMetricCount(ach.metric, ach.currentCount)} /{' '}
                          {formatMetricCount(ach.metric, ach.requiredCount)} ({ach.progressPct}%)
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                        <div
                          style={{ width: `${ach.progressPct}%` }}
                          className={`h-full transition-all duration-300 ${
                            ach.unlocked ? style.bar : 'bg-zinc-600'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/70">
                      <span className="text-indigo-300 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {ach.statReward}
                      </span>
                      <span>Source: Revenue Ledger</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW 2: REVENUE LEDGER & DAILY ANALYTICS SYNC HISTORY */}
          {modalTab === 'ledger' && (
            <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-900/90 border-b border-zinc-800 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    <th className="p-3">Date</th>
                    <th className="p-3">Event / Video Title</th>
                    <th className="p-3">Source</th>
                    <th className="p-3 text-right">Videos</th>
                    <th className="p-3 text-right">Views</th>
                    <th className="p-3 text-right">Total USD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {ledger.entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-zinc-900/50">
                      <td className="p-3 font-mono text-[11px] text-zinc-400 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-500" />
                          {entry.dateIso}
                        </span>
                      </td>
                      <td className="p-3 text-white font-semibold">
                        <div>{entry.title}</div>
                        <div className="text-[10px] font-mono text-zinc-500">{entry.niche}</div>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-cyan-300 whitespace-nowrap">
                          {entry.source}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-right text-indigo-300">
                        +{entry.videosPublishedDelta}
                      </td>
                      <td className="p-3 font-mono text-right text-zinc-200">
                        +{entry.viewsDelta.toLocaleString('en-US')}
                      </td>
                      <td className="p-3 font-mono text-right font-bold text-emerald-300">
                        +${entry.totalRevenueUsd.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PipelineAchievementsModal;
