import React, { useMemo, useState } from 'react';
import {
  Activity,
  ChevronRight,
  Film,
  GripVertical,
  Play,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Wand2,
  X,
  Zap,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

export type TransitionCategory = 'all' | 'zoom' | 'glitch' | 'snap' | 'motion';

export type CinematicTransitionId =
  | 'zoom_punch'
  | 'zoom_out'
  | 'rgb_glitch'
  | 'vhs_glitch'
  | 'snap_cut'
  | 'beat_snap'
  | 'whip_pan'
  | 'flash_strobe';

export interface CinematicTransitionPreset {
  id: CinematicTransitionId;
  name: string;
  shortLabel: string;
  category: Exclude<TransitionCategory, 'all'>;
  defaultDurationSec: number;
  description: string;
  sfxType: 'zoom' | 'glitch' | 'snap' | 'whoosh';
  accentClass: string;
  borderClass: string;
  bgTintClass: string;
}

export interface ClipBoundarySlot {
  id: string;
  label: string;
  timeSec: number;
  kind: 'intro' | 'cut' | 'outro';
  leftClipLabel: string;
  rightClipLabel: string;
}

export interface AppliedBoundaryTransition {
  boundaryId: string;
  transitionId: CinematicTransitionId;
  durationSec: number;
}

export const CINEMATIC_TRANSITIONS: CinematicTransitionPreset[] = [
  {
    id: 'zoom_punch',
    name: 'Zoom Punch',
    shortLabel: 'Zoom In',
    category: 'zoom',
    defaultDurationSec: 0.35,
    description: 'High-velocity 1.35x optical push into the next beat for hook transitions.',
    sfxType: 'zoom',
    accentClass: 'text-amber-300',
    borderClass: 'border-amber-500/40',
    bgTintClass: 'bg-amber-500/10'
  },
  {
    id: 'zoom_out',
    name: 'Crash Zoom Out',
    shortLabel: 'Zoom Out',
    category: 'zoom',
    defaultDurationSec: 0.35,
    description: 'Elastic pullback reveal that resets visual attention across scene cuts.',
    sfxType: 'zoom',
    accentClass: 'text-orange-300',
    borderClass: 'border-orange-500/40',
    bgTintClass: 'bg-orange-500/10'
  },
  {
    id: 'rgb_glitch',
    name: 'RGB Glitch Split',
    shortLabel: 'RGB Glitch',
    category: 'glitch',
    defaultDurationSec: 0.3,
    description: 'Chromatic channel split with digital horizontal scan-tear disruption.',
    sfxType: 'glitch',
    accentClass: 'text-cyan-300',
    borderClass: 'border-cyan-500/40',
    bgTintClass: 'bg-cyan-500/10'
  },
  {
    id: 'vhs_glitch',
    name: 'Static Glitch Tear',
    shortLabel: 'VHS Glitch',
    category: 'glitch',
    defaultDurationSec: 0.28,
    description: 'Micro frame jitter and contrast spike ideal for pattern interrupts.',
    sfxType: 'glitch',
    accentClass: 'text-sky-300',
    borderClass: 'border-sky-500/40',
    bgTintClass: 'bg-sky-500/10'
  },
  {
    id: 'snap_cut',
    name: 'Hard Snap Cut',
    shortLabel: 'Snap',
    category: 'snap',
    defaultDurationSec: 0.2,
    description: 'Crisp single-frame white flash paired with a percussive transient snap.',
    sfxType: 'snap',
    accentClass: 'text-emerald-300',
    borderClass: 'border-emerald-500/40',
    bgTintClass: 'bg-emerald-500/10'
  },
  {
    id: 'beat_snap',
    name: 'Beat Snap Freeze',
    shortLabel: 'Beat Snap',
    category: 'snap',
    defaultDurationSec: 0.25,
    description: 'Split-second micro-pop locked to audio downbeats and reveal moments.',
    sfxType: 'snap',
    accentClass: 'text-teal-300',
    borderClass: 'border-teal-500/40',
    bgTintClass: 'bg-teal-500/10'
  },
  {
    id: 'whip_pan',
    name: 'Whip Pan Blur',
    shortLabel: 'Whip Pan',
    category: 'motion',
    defaultDurationSec: 0.3,
    description: 'Directional 180-degree motion blur sweep linking rapid B-roll cuts.',
    sfxType: 'whoosh',
    accentClass: 'text-rose-300',
    borderClass: 'border-rose-500/40',
    bgTintClass: 'bg-rose-500/10'
  },
  {
    id: 'flash_strobe',
    name: 'Exposure Flash',
    shortLabel: 'Flash',
    category: 'motion',
    defaultDurationSec: 0.25,
    description: 'Clean high-key luminance bloom for seamless loop and payoff handoffs.',
    sfxType: 'snap',
    accentClass: 'text-zinc-100',
    borderClass: 'border-zinc-500/50',
    bgTintClass: 'bg-zinc-500/15'
  }
];

export const TRANSITION_DRAG_MIME = 'application/x-shortsforge-transition';

export function getTransitionById(
  id: CinematicTransitionId | string | null | undefined
): CinematicTransitionPreset | undefined {
  if (!id) return undefined;
  return CINEMATIC_TRANSITIONS.find((t) => t.id === id);
}

export function renderTransitionIcon(
  id: CinematicTransitionId,
  className = 'w-3.5 h-3.5'
): React.ReactNode {
  switch (id) {
    case 'zoom_punch':
      return <ZoomIn className={className} />;
    case 'zoom_out':
      return <ZoomOut className={className} />;
    case 'rgb_glitch':
    case 'vhs_glitch':
      return <Activity className={className} />;
    case 'snap_cut':
    case 'beat_snap':
      return <Zap className={className} />;
    case 'whip_pan':
      return <Film className={className} />;
    case 'flash_strobe':
      return <Sparkles className={className} />;
    default:
      return <Wand2 className={className} />;
  }
}

interface CinematicTransitionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  boundaries: ClipBoundarySlot[];
  appliedTransitions: Record<string, AppliedBoundaryTransition>;
  selectedBoundaryId: string | null;
  draggingTransitionId: CinematicTransitionId | null;
  onDragStartTransition: (transitionId: CinematicTransitionId) => void;
  onDragEndTransition: () => void;
  onAssignTransition: (
    boundaryId: string,
    transitionId: CinematicTransitionId,
    durationSec?: number
  ) => void;
  onApplyToAllBoundaries: (
    transitionId: CinematicTransitionId,
    durationSec?: number
  ) => void;
  onRemoveTransition: (boundaryId: string) => void;
  onClearAllTransitions: () => void;
  onPreviewTransition: (
    transitionId: CinematicTransitionId,
    durationSec?: number,
    seekTimeSec?: number
  ) => void;
}

export const CinematicTransitionsDrawer: React.FC<CinematicTransitionsDrawerProps> = ({
  isOpen,
  onClose,
  boundaries,
  appliedTransitions,
  selectedBoundaryId,
  draggingTransitionId,
  onDragStartTransition,
  onDragEndTransition,
  onAssignTransition,
  onApplyToAllBoundaries,
  onRemoveTransition,
  onClearAllTransitions,
  onPreviewTransition
}) => {
  const [category, setCategory] = useState<TransitionCategory>('all');
  const [durationScaleSec, setDurationScaleSec] = useState<number>(0.3);

  const filteredTransitions = useMemo(() => {
    if (category === 'all') return CINEMATIC_TRANSITIONS;
    return CINEMATIC_TRANSITIONS.filter((t) => t.category === category);
  }, [category]);

  const appliedCount = Object.keys(appliedTransitions).length;
  const activeTargetBoundary =
    boundaries.find((b) => b.id === selectedBoundaryId) ||
    boundaries.find((b) => b.kind === 'cut') ||
    boundaries[0] ||
    null;

  if (!isOpen) return null;

  const categories: { id: TransitionCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'zoom', label: 'Zoom' },
    { id: 'glitch', label: 'Glitch' },
    { id: 'snap', label: 'Snap' },
    { id: 'motion', label: 'Motion' }
  ];

  return (
    <div
      className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4 transition-all"
      aria-label="Cinematic Transitions Drawer"
    >
      {/* Drawer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-red-400 shrink-0" />
            <h4 className="text-sm font-semibold text-white tracking-tight">
              Cinematic Transitions Drawer
            </h4>
          </div>
          <p className="text-xs text-zinc-400">
            Drag any transition card directly onto a clip boundary on the timeline below, or click to apply to the focused cut.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono tabular-nums text-zinc-400">
            {appliedCount}/{boundaries.length} cuts active
          </span>
          {appliedCount > 0 && (
            <button
              type="button"
              onClick={onClearAllTransitions}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-red-300 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Cinematic Transitions drawer"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar & Transition Duration */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div
          className="inline-flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg w-fit"
          role="tablist"
          aria-label="Filter transitions by category"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                category === cat.id
                  ? 'bg-red-600 text-white'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
            <span>Duration</span>
          </div>
          <input
            type="range"
            min={0.15}
            max={0.6}
            step={0.05}
            value={durationScaleSec}
            onChange={(e) => setDurationScaleSec(Number(e.target.value))}
            aria-label="Transition duration in seconds"
            className="w-24 accent-red-500 cursor-pointer"
          />
          <span className="font-mono tabular-nums text-zinc-200 w-10 text-right">
            {durationScaleSec.toFixed(2)}s
          </span>
        </div>
      </div>

      {/* Draggable Transition Library Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
        {filteredTransitions.map((preset) => {
          const isBeingDragged = draggingTransitionId === preset.id;
          return (
            <div
              key={preset.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  TRANSITION_DRAG_MIME,
                  JSON.stringify({ id: preset.id, durationSec: durationScaleSec })
                );
                e.dataTransfer.setData('text/plain', preset.id);
                e.dataTransfer.effectAllowed = 'copy';
                onDragStartTransition(preset.id);
              }}
              onDragEnd={() => onDragEndTransition()}
              className={`group rounded-lg border p-3 flex flex-col justify-between gap-2.5 select-none transition-all cursor-grab active:cursor-grabbing ${
                isBeingDragged
                  ? 'bg-zinc-900 border-red-500 ring-1 ring-red-500/40 opacity-85 scale-[0.99]'
                  : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`${preset.accentClass} shrink-0`}>
                      {renderTransitionIcon(preset.id, 'w-4 h-4')}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">
                      {preset.name}
                    </span>
                  </div>
                  <GripVertical
                    className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 shrink-0 transition-colors"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono tabular-nums">
                  <span className="capitalize">{preset.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{durationScaleSec.toFixed(2)}s</span>
                  <span aria-hidden="true">·</span>
                  <span>{preset.sfxType} SFX</span>
                </div>

                <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
                  {preset.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => onPreviewTransition(preset.id, durationScaleSec)}
                  className="px-2 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-medium text-zinc-200 flex items-center gap-1 whitespace-nowrap cursor-pointer transition-colors"
                >
                  <Play className="w-3 h-3 text-red-400" />
                  Preview
                </button>

                <div className="flex items-center gap-1">
                  {activeTargetBoundary && (
                    <button
                      type="button"
                      onClick={() =>
                        onAssignTransition(
                          activeTargetBoundary.id,
                          preset.id,
                          durationScaleSec
                        )
                      }
                      title={`Assign ${preset.name} to ${activeTargetBoundary.label}`}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-red-600 text-[11px] font-medium text-zinc-100 flex items-center gap-0.5 whitespace-nowrap cursor-pointer transition-colors"
                    >
                      Apply
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onApplyToAllBoundaries(preset.id, durationScaleSec)}
                    title={`Apply ${preset.name} to all clip boundaries`}
                    className="px-2 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-medium text-zinc-400 hover:text-white whitespace-nowrap cursor-pointer transition-colors"
                  >
                    All
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Boundary Assignments Strip */}
      <div className="pt-2 border-t border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="text-zinc-400">
          {draggingTransitionId ? (
            <span className="text-amber-300 font-medium">
              Dragging {getTransitionById(draggingTransitionId)?.name} — drop onto any highlighted clip boundary below.
            </span>
          ) : activeTargetBoundary ? (
            <span>
              Focused cut target:{' '}
              <span className="text-white font-medium">{activeTargetBoundary.label}</span>{' '}
              <span className="font-mono tabular-nums text-zinc-500">
                ({activeTargetBoundary.timeSec.toFixed(1)}s)
              </span>
            </span>
          ) : (
            <span>Split the timeline to create clip boundaries.</span>
          )}
        </div>

        {appliedCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {boundaries.map((b) => {
              const assigned = appliedTransitions[b.id];
              if (!assigned) return null;
              const preset = getTransitionById(assigned.transitionId);
              if (!preset) return null;
              return (
                <div
                  key={b.id}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono tabular-nums text-zinc-300 bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5"
                >
                  <button
                    type="button"
                    onClick={() =>
                      onPreviewTransition(preset.id, assigned.durationSec, b.timeSec)
                    }
                    className="inline-flex items-center gap-1 hover:text-white cursor-pointer"
                    title={`Preview ${preset.name} at ${b.timeSec.toFixed(1)}s`}
                  >
                    <span className={preset.accentClass}>
                      {renderTransitionIcon(preset.id, 'w-3 h-3')}
                    </span>
                    <span>
                      {b.timeSec.toFixed(1)}s {preset.shortLabel}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveTransition(b.id)}
                    aria-label={`Remove ${preset.name} from ${b.label}`}
                    className="text-zinc-500 hover:text-red-400 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
