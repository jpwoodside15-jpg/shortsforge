import React, { useState } from 'react';
import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import {
  ArrowRight,
  GripVertical,
  Layers,
  Lock,
  ShieldAlert,
  ShieldCheck,
  UploadCloud,
  X
} from 'lucide-react';
import type { QueuedShort } from './AutomatedDailyPipelineTab';

export type KanbanColumnKey = 'pending' | 'quarantined' | 'uploaded';

export interface KanbanRevalidationFeedback {
  itemId: string;
  itemTitle: string;
  fromColumn: KanbanColumnKey;
  toColumn: KanbanColumnKey;
  verdict: 'PROCEED' | 'BLOCKED';
  summary: string;
  repairAction?: string | null;
  timestamp: string;
}

export interface KanbanColumnConfig {
  key: KanbanColumnKey;
  label: string;
  items: QueuedShort[];
  countClass: string;
  borderClass: string;
  activeDropBorderClass: string;
  accentBarClass: string;
  emptyText: string;
  droppable: boolean;
  dropHint: string;
}

interface PipelineKanbanBoardProps {
  queue: QueuedShort[];
  lastPipelineSyncAt: string;
  onDropBetweenColumns: (
    item: QueuedShort,
    fromColumn: KanbanColumnKey,
    toColumn: KanbanColumnKey
  ) => void | Promise<void>;
  onAutoRepairAwinMetadata: (itemId: string) => void;
  lastRevalidation?: KanbanRevalidationFeedback | null;
  onDismissRevalidation?: () => void;
  validatingItemId?: string | null;
}

const COLUMN_LABELS: Record<KanbanColumnKey, string> = {
  pending: 'Pending',
  quarantined: 'Quarantined',
  uploaded: 'Uploaded'
};

const kanbanCollisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }
  return closestCorners(args);
};

interface DraggableKanbanCardProps {
  item: QueuedShort;
  colKey: KanbanColumnKey;
  isValidating: boolean;
  onAutoRepairAwinMetadata: (itemId: string) => void;
}

const DraggableKanbanCard: React.FC<DraggableKanbanCardProps> = ({
  item,
  colKey,
  isValidating,
  onAutoRepairAwinMetadata
}) => {
  const isDraggable = (colKey === 'pending' || colKey === 'quarantined') && !isValidating;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: {
      item,
      fromColumn: colKey
    },
    disabled: !isDraggable
  });

  return (
    <motion.div
      ref={setNodeRef}
      layout
      layoutId={`kanban-card-${item.id}`}
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      animate={{ opacity: isDragging ? 0.35 : 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{
        layout: { type: 'spring', stiffness: 420, damping: 32 },
        opacity: { duration: 0.16 }
      }}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
      className={`p-2.5 rounded-lg bg-zinc-950/90 border space-y-1 transition-colors select-none ${
        isDraggable
          ? 'border-zinc-800/90 hover:border-zinc-600 cursor-grab active:cursor-grabbing touch-none'
          : 'border-zinc-800/70'
      } ${isDragging ? 'border-dashed border-indigo-400/70' : ''} ${
        isValidating ? 'border-emerald-500/60 opacity-80' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 text-[10px] font-mono tabular-nums text-zinc-400">
        <div className="flex items-center gap-1.5 min-w-0">
          {isDraggable ? (
            <GripVertical className="w-3 h-3 text-zinc-500 shrink-0" aria-hidden="true" />
          ) : (
            <Lock className="w-3 h-3 text-emerald-500/70 shrink-0" aria-hidden="true" />
          )}
          <span className="truncate">
            {item.dayName} · {item.scheduledTime}
          </span>
        </div>
        <span className="text-zinc-500 shrink-0">{item.niche}</span>
      </div>

      <div className="text-xs font-semibold text-white line-clamp-1">
        {item.title}
      </div>

      {isValidating && (
        <div className="text-[10px] font-mono text-emerald-300">
          Re-validating preconditions &amp; dispatching...
        </div>
      )}

      {!isValidating && colKey === 'quarantined' && (
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <span className="text-[10px] font-mono text-rose-300 truncate">
            {item.verifierRepairAction
              ? `REPAIR via ${item.verifierRepairAction}`
              : 'Drop in Pending to re-validate'}
          </span>
          {item.verifierRepairAction === 'METADATA' && (
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onAutoRepairAwinMetadata(item.id);
              }}
              className="text-[10px] font-mono font-semibold text-amber-300 hover:text-white underline cursor-pointer shrink-0"
            >
              Auto-Insert Awin Link
            </button>
          )}
        </div>
      )}

      {!isValidating && colKey === 'uploaded' && item.videoId && (
        <div className="text-[10px] font-mono tabular-nums text-emerald-400">
          ID: {item.videoId}
        </div>
      )}
    </motion.div>
  );
};

interface DroppableKanbanColumnProps {
  col: KanbanColumnConfig;
  activeDragSource: KanbanColumnKey | null;
  validatingItemId?: string | null;
  onAutoRepairAwinMetadata: (itemId: string) => void;
}

const DroppableKanbanColumn: React.FC<DroppableKanbanColumnProps> = ({
  col,
  activeDragSource,
  validatingItemId,
  onAutoRepairAwinMetadata
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: col.key,
    disabled: !col.droppable
  });

  const isEligibleTarget =
    Boolean(activeDragSource) && col.droppable && activeDragSource !== col.key;

  const dropBannerActiveClass =
    col.key === 'pending'
      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
      : col.key === 'quarantined'
        ? 'bg-rose-500/20 border-rose-400 text-rose-200'
        : 'bg-emerald-500/20 border-emerald-400 text-emerald-200';

  return (
    <motion.div
      ref={setNodeRef}
      layout
      transition={{ layout: { type: 'spring', stiffness: 420, damping: 32 } }}
      className={`bg-zinc-900/60 border rounded-xl p-3 space-y-2.5 transition-colors ${
        isOver && isEligibleTarget
          ? `${col.activeDropBorderClass} bg-zinc-900/95 ring-1 ring-inset ring-white/15`
          : isEligibleTarget
            ? `${col.activeDropBorderClass} border-dashed`
            : col.borderClass
      }`}
    >
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-3.5 rounded-xs ${col.accentBarClass}`} aria-hidden="true" />
          <span className="text-xs font-bold text-white">{col.label}</span>
        </div>
        <motion.span
          key={`${col.key}-count-${col.items.length}`}
          initial={{ scale: 0.88, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.16 }}
          className={`text-xs font-mono tabular-nums font-bold ${col.countClass}`}
        >
          {col.items.length}
        </motion.span>
      </div>

      {isEligibleTarget && (
        <div
          className={`px-2.5 py-1.5 rounded-lg border border-dashed text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
            isOver
              ? dropBannerActiveClass
              : 'bg-zinc-950/70 border-zinc-700 text-zinc-400'
          }`}
        >
          {col.key === 'pending' ? (
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          ) : col.key === 'quarantined' ? (
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          ) : (
            <UploadCloud className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          )}
          <span className="truncate">{col.dropHint}</span>
        </div>
      )}

      {col.items.length === 0 ? (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] text-zinc-500 font-mono py-4 text-center"
        >
          {col.emptyText}
        </motion.div>
      ) : (
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout" initial={false}>
            {col.items.map((item) => (
              <DraggableKanbanCard
                key={item.id}
                item={item}
                colKey={col.key}
                isValidating={validatingItemId === item.id}
                onAutoRepairAwinMetadata={onAutoRepairAwinMetadata}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export const PipelineKanbanBoard: React.FC<PipelineKanbanBoardProps> = ({
  queue,
  lastPipelineSyncAt,
  onDropBetweenColumns,
  onAutoRepairAwinMetadata,
  lastRevalidation,
  onDismissRevalidation,
  validatingItemId
}) => {
  const [activeDrag, setActiveDrag] = useState<{
    item: QueuedShort;
    fromColumn: KanbanColumnKey;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 6
      }
    }),
    useSensor(KeyboardSensor)
  );

  const pendingItems = queue.filter(
    (q) => q.status === 'Scheduled' || q.status === 'Ready' || q.status === 'Uploading'
  );
  const quarantinedItems = queue.filter((q) => q.status === 'Quarantined');
  const uploadedItems = queue.filter((q) => q.status === 'Published');

  const columns: KanbanColumnConfig[] = [
    {
      key: 'pending',
      label: 'Pending',
      items: pendingItems,
      countClass: 'text-indigo-300',
      borderClass: 'border-indigo-500/30',
      activeDropBorderClass: 'border-indigo-400',
      accentBarClass: 'bg-indigo-400',
      emptyText: 'No pending slots in queue.',
      droppable: true,
      dropHint: 'Drop here to re-validate & move to Pending'
    },
    {
      key: 'quarantined',
      label: 'Quarantined',
      items: quarantinedItems,
      countClass: 'text-rose-300',
      borderClass: 'border-rose-500/30',
      activeDropBorderClass: 'border-rose-400',
      accentBarClass: 'bg-rose-400',
      emptyText: 'No quarantined slots.',
      droppable: true,
      dropHint: 'Drop here to quarantine & audit preconditions'
    },
    {
      key: 'uploaded',
      label: 'Uploaded',
      items: uploadedItems,
      countClass: 'text-emerald-300',
      borderClass: 'border-emerald-500/30',
      activeDropBorderClass: 'border-emerald-400',
      accentBarClass: 'bg-emerald-400',
      emptyText: 'No slots uploaded yet.',
      droppable: true,
      dropHint: 'Drop here to re-validate & trigger upload'
    }
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as
      | { item?: QueuedShort; fromColumn?: KanbanColumnKey }
      | undefined;
    if (data?.item && data.fromColumn) {
      setActiveDrag({ item: data.item, fromColumn: data.fromColumn });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const currentDrag = activeDrag;
    setActiveDrag(null);
    const overId = event.over?.id as KanbanColumnKey | undefined;
    if (!currentDrag || !overId) return;
    if (overId !== 'pending' && overId !== 'quarantined' && overId !== 'uploaded') return;
    if (overId === currentDrag.fromColumn) return;

    void onDropBetweenColumns(currentDrag.item, currentDrag.fromColumn, overId);
  };

  const handleDragCancel = () => {
    setActiveDrag(null);
  };

  return (
    <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-black text-white tracking-tight">Pipeline Overview</h2>
          <span className="text-[11px] font-mono tabular-nums text-zinc-400">
            {queue.length} total slots · synced {lastPipelineSyncAt}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono tabular-nums text-zinc-400">
          <span className="text-zinc-300">
            Drag cards across Pending, Quarantined &amp; Uploaded to re-validate
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-indigo-300">Pending {pendingItems.length}</span>
          <span aria-hidden="true">·</span>
          <span className="text-rose-300">Quarantined {quarantinedItems.length}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-300">Uploaded {uploadedItems.length}</span>
        </div>
      </div>

      {lastRevalidation && (
        <div
          className={`flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg border text-[11px] font-mono ${
            lastRevalidation.verdict === 'PROCEED'
              ? 'bg-emerald-950/35 border-emerald-500/35 text-emerald-100'
              : 'bg-rose-950/35 border-rose-500/35 text-rose-100'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            {lastRevalidation.verdict === 'PROCEED' ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            )}
            <span
              className={`font-bold ${
                lastRevalidation.verdict === 'PROCEED' ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              {lastRevalidation.verdict}
            </span>
            <span className="text-zinc-400 inline-flex items-center gap-1">
              {COLUMN_LABELS[lastRevalidation.fromColumn]}
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
              {COLUMN_LABELS[lastRevalidation.toColumn]}
            </span>
            <span className="text-white font-sans font-semibold truncate max-w-[240px]">
              {lastRevalidation.itemTitle}
            </span>
            <span className="text-zinc-300 truncate">{lastRevalidation.summary}</span>
            {lastRevalidation.repairAction && (
              <span className="text-amber-300 font-semibold">
                REPAIR: {lastRevalidation.repairAction}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-zinc-400 tabular-nums">{lastRevalidation.timestamp}</span>
            {onDismissRevalidation && (
              <button
                type="button"
                onClick={onDismissRevalidation}
                aria-label="Dismiss re-validation status"
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={kanbanCollisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <LayoutGroup id="pipeline-kanban-board">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {columns.map((col) => (
              <DroppableKanbanColumn
                key={col.key}
                col={col}
                activeDragSource={activeDrag?.fromColumn ?? null}
                validatingItemId={validatingItemId}
                onAutoRepairAwinMetadata={onAutoRepairAwinMetadata}
              />
            ))}
          </div>
        </LayoutGroup>

        <DragOverlay dropAnimation={{ duration: 160, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {activeDrag ? (
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-indigo-400 shadow-2xl space-y-1 cursor-grabbing">
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono tabular-nums text-zinc-300">
                <div className="flex items-center gap-1.5 min-w-0">
                  <GripVertical className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span className="truncate">
                    {activeDrag.item.dayName} · {activeDrag.item.scheduledTime}
                  </span>
                </div>
                <span className="text-zinc-400 shrink-0">{activeDrag.item.niche}</span>
              </div>
              <div className="text-xs font-semibold text-white line-clamp-1">
                {activeDrag.item.title}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
