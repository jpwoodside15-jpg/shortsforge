export type PipelineStep =
  | 'TREND_PICK'
  | 'SCRIPT'
  | 'RENDER'
  | 'EDIT_CHECK'
  | 'METADATA'
  | 'UPLOAD'
  | 'PAYOUT_LOG';

export type PipelineStateValue = boolean | string;

export interface PipelineState {
  trend_selected: PipelineStateValue;
  script_ready: PipelineStateValue;
  video_file_exists: PipelineStateValue;
  duration_ok: PipelineStateValue;
  captions_burned: PipelineStateValue;
  safe_zones_verified: PipelineStateValue;
  brand_kit_applied: PipelineStateValue;
  affiliate_links_present: PipelineStateValue;
  metadata_complete: PipelineStateValue;
  upload_confirmed: PipelineStateValue;
  ledger_updated: PipelineStateValue;
}

export type PipelineStateField = keyof PipelineState;

export const PIPELINE_STATE_FIELDS: PipelineStateField[] = [
  'trend_selected',
  'script_ready',
  'video_file_exists',
  'duration_ok',
  'captions_burned',
  'safe_zones_verified',
  'brand_kit_applied',
  'affiliate_links_present',
  'metadata_complete',
  'upload_confirmed',
  'ledger_updated',
];

export const PRECONDITIONS_FOR_ACTION: Record<PipelineStep, PipelineStateField[]> = {
  TREND_PICK: [],
  SCRIPT: ['trend_selected'],
  RENDER: ['script_ready'],
  EDIT_CHECK: ['video_file_exists', 'duration_ok'],
  METADATA: ['captions_burned', 'safe_zones_verified', 'brand_kit_applied'],
  UPLOAD: ['metadata_complete', 'affiliate_links_present'],
  PAYOUT_LOG: ['upload_confirmed'],
};

const REPAIR_ACTION_FOR_FIELD: Record<PipelineStateField, PipelineStep> = {
  trend_selected: 'TREND_PICK',
  script_ready: 'SCRIPT',
  video_file_exists: 'RENDER',
  duration_ok: 'RENDER',
  captions_burned: 'EDIT_CHECK',
  safe_zones_verified: 'EDIT_CHECK',
  brand_kit_applied: 'EDIT_CHECK',
  affiliate_links_present: 'METADATA',
  metadata_complete: 'METADATA',
  upload_confirmed: 'UPLOAD',
  ledger_updated: 'PAYOUT_LOG',
};

export interface PipelineVerificationResult {
  verdict: 'PROCEED' | 'BLOCKED';
  proposedAction: PipelineStep;
  checkedFields: PipelineStateField[];
  passedPreconditions: PipelineStateField[];
  failedPreconditions: PipelineStateField[];
  repairAction: PipelineStep | null;
  reason: string;
  message: string;
  nextState: PipelineState;
}

function hasUnfilledPlaceholder(state: Record<string, unknown>): boolean {
  return Object.values(state).some(
    (val) => typeof val === 'string' && /\{[^}]+\}/.test(val)
  );
}

function isFieldSatisfied(val: unknown): boolean {
  if (val === true) return true;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed || /\{[^}]+\}/.test(trimmed)) return false;
    return /^yes\b/i.test(trimmed);
  }
  return false;
}

function normalizeStateBooleans(state: Partial<PipelineState> | null | undefined): PipelineState {
  const safe = state && typeof state === 'object' ? state : {};
  return {
    trend_selected: isFieldSatisfied(safe.trend_selected),
    script_ready: isFieldSatisfied(safe.script_ready),
    video_file_exists: isFieldSatisfied(safe.video_file_exists),
    duration_ok: isFieldSatisfied(safe.duration_ok),
    captions_burned: isFieldSatisfied(safe.captions_burned),
    safe_zones_verified: isFieldSatisfied(safe.safe_zones_verified),
    brand_kit_applied: isFieldSatisfied(safe.brand_kit_applied),
    affiliate_links_present: isFieldSatisfied(safe.affiliate_links_present),
    metadata_complete: isFieldSatisfied(safe.metadata_complete),
    upload_confirmed: isFieldSatisfied(safe.upload_confirmed),
    ledger_updated: isFieldSatisfied(safe.ledger_updated),
  };
}

function applyEffects(state: PipelineState, action: PipelineStep): PipelineState {
  const base = normalizeStateBooleans(state);
  switch (action) {
    case 'TREND_PICK':
      return {
        trend_selected: true,
        script_ready: false,
        video_file_exists: false,
        duration_ok: false,
        captions_burned: false,
        safe_zones_verified: false,
        brand_kit_applied: false,
        affiliate_links_present: false,
        metadata_complete: false,
        upload_confirmed: false,
        ledger_updated: false,
      };
    case 'SCRIPT':
      return { ...base, script_ready: true };
    case 'RENDER':
      return {
        ...base,
        video_file_exists: true,
        duration_ok: true,
        captions_burned: false,
        safe_zones_verified: false,
        brand_kit_applied: false,
      };
    case 'EDIT_CHECK':
      return {
        ...base,
        captions_burned: true,
        safe_zones_verified: true,
        brand_kit_applied: true,
      };
    case 'METADATA':
      return {
        ...base,
        metadata_complete: true,
        affiliate_links_present: true,
      };
    case 'UPLOAD':
      return { ...base, upload_confirmed: true };
    case 'PAYOUT_LOG':
      return { ...base, ledger_updated: true };
  }
}

/**
 * Deterministic, offline pipeline step verifier for ShortsForge.AI.
 * Checks PRECONDITIONS_FOR_ACTION against the provided PipelineState and
 * returns PROCEED or BLOCKED with the single repair action.
 */
export function pipelineVerifier(
  state: PipelineState,
  proposedAction: PipelineStep
): PipelineVerificationResult {
  const checkedFields = PRECONDITIONS_FOR_ACTION[proposedAction];
  const normalizedState = normalizeStateBooleans(state);

  if (!checkedFields) {
    const reason = `Unknown pipeline action "${String(proposedAction)}"`;
    return {
      verdict: 'BLOCKED',
      proposedAction,
      checkedFields: [],
      passedPreconditions: [],
      failedPreconditions: [],
      repairAction: 'TREND_PICK',
      reason,
      message: `BLOCKED: ${String(proposedAction)} - ${reason}. Start at TREND_PICK.`,
      nextState: normalizedState,
    };
  }

  if (!state || typeof state !== 'object' || hasUnfilledPlaceholder(state as unknown as Record<string, unknown>)) {
    const reason = 'CURRENT STATE contains unfilled {placeholders}';
    return {
      verdict: 'BLOCKED',
      proposedAction,
      checkedFields,
      passedPreconditions: [],
      failedPreconditions: checkedFields,
      repairAction: 'TREND_PICK',
      reason,
      message: `BLOCKED: ${proposedAction} - ${reason}. Start at TREND_PICK with concrete values.`,
      nextState: normalizedState,
    };
  }

  const passedPreconditions: PipelineStateField[] = [];
  const failedPreconditions: PipelineStateField[] = [];

  for (const field of checkedFields) {
    if (isFieldSatisfied(state[field])) {
      passedPreconditions.push(field);
    } else {
      failedPreconditions.push(field);
    }
  }

  if (failedPreconditions.length > 0) {
    const firstFailed = failedPreconditions[0];
    const repairAction = REPAIR_ACTION_FOR_FIELD[firstFailed];
    const failedList = failedPreconditions.join(', ');
    const reason = `${failedList} ${failedPreconditions.length === 1 ? 'is' : 'are'} not satisfied`;
    return {
      verdict: 'BLOCKED',
      proposedAction,
      checkedFields,
      passedPreconditions,
      failedPreconditions,
      repairAction,
      reason,
      message: `BLOCKED: ${proposedAction} - precondition [${failedList}] not met because ${reason}. Repair via ${repairAction}.`,
      nextState: normalizedState,
    };
  }

  return {
    verdict: 'PROCEED',
    proposedAction,
    checkedFields,
    passedPreconditions,
    failedPreconditions: [],
    repairAction: null,
    reason: 'All preconditions satisfied',
    message: `PROCEED: ${proposedAction} preconditions satisfied.`,
    nextState: applyEffects(normalizedState, proposedAction),
  };
}

export interface BatchForensicsLogEntry {
  id: string;
  timestamp: string;
  source:
    | 'Batch Uploader'
    | '1-Click Upload'
    | 'Sequential Pipeline'
    | 'Automated Daily Pipeline'
    | 'World Wonders'
    | 'Pro Studio'
    | 'Retention Repair';
  targetTitle: string;
  proposedAction: PipelineStep;
  verdict: 'PROCEED' | 'BLOCKED';
  repairAction: PipelineStep | null;
  failedPreconditions: PipelineStateField[];
  line: string;
}

export function createForensicsLogEntry(
  source: BatchForensicsLogEntry['source'],
  targetTitle: string,
  result: PipelineVerificationResult
): BatchForensicsLogEntry {
  const timestamp = new Date().toISOString();
  const line =
    result.verdict === 'BLOCKED'
      ? `[${timestamp}] [${source}] BLOCKED: ${result.proposedAction} on "${targetTitle}" — failed [${result.failedPreconditions.join(', ')}] -> REPAIR via ${result.repairAction}`
      : `[${timestamp}] [${source}] PROCEED: ${result.proposedAction} on "${targetTitle}" — verified [${result.checkedFields.join(', ')}]`;

  return {
    id: `forensic_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp,
    source,
    targetTitle,
    proposedAction: result.proposedAction,
    verdict: result.verdict,
    repairAction: result.repairAction,
    failedPreconditions: result.failedPreconditions,
    line,
  };
}

/**
 * Runs the deterministic pipelineVerifier before an UPLOAD action.
 * Checks upstream render/edit-check preconditions if missing, then runs
 * pipelineVerifier(state, 'UPLOAD'). Returns the blocking result or PROCEED.
 */
export function verifyBeforeUpload(
  state: PipelineState
): PipelineVerificationResult {
  if (!state || typeof state !== 'object' || hasUnfilledPlaceholder(state as unknown as Record<string, unknown>)) {
    return pipelineVerifier(state, 'UPLOAD');
  }
  if (!isFieldSatisfied(state.trend_selected)) {
    return pipelineVerifier(state, 'SCRIPT');
  }
  if (!isFieldSatisfied(state.script_ready)) {
    return pipelineVerifier(state, 'RENDER');
  }
  if (!isFieldSatisfied(state.video_file_exists) || !isFieldSatisfied(state.duration_ok)) {
    return pipelineVerifier(state, 'EDIT_CHECK');
  }
  if (
    !isFieldSatisfied(state.captions_burned) ||
    !isFieldSatisfied(state.safe_zones_verified) ||
    !isFieldSatisfied(state.brand_kit_applied)
  ) {
    return pipelineVerifier(state, 'METADATA');
  }
  return pipelineVerifier(state, 'UPLOAD');
}

const FORENSICS_STORAGE_KEY = 'shortsforge_batch_forensics_log_v1';
let forensicsLogCache: BatchForensicsLogEntry[] = (() => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(FORENSICS_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as BatchForensicsLogEntry[];
    }
  } catch {
    // Ignore storage read errors
  }
  return [];
})();

const forensicsListeners = new Set<(entries: BatchForensicsLogEntry[]) => void>();

export function getBatchForensicsLog(): BatchForensicsLogEntry[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(FORENSICS_STORAGE_KEY);
      if (raw) {
        forensicsLogCache = JSON.parse(raw) as BatchForensicsLogEntry[];
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return forensicsLogCache;
}

export function writeToBatchForensicsLog(
  source: BatchForensicsLogEntry['source'],
  targetTitle: string,
  result: PipelineVerificationResult
): BatchForensicsLogEntry {
  const entry = createForensicsLogEntry(source, targetTitle, result);
  forensicsLogCache = [entry, ...forensicsLogCache].slice(0, 100);
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(
        FORENSICS_STORAGE_KEY,
        JSON.stringify(forensicsLogCache)
      );
    }
  } catch {
    // Ignore storage write errors
  }
  forensicsListeners.forEach((listener) => listener(forensicsLogCache));
  return entry;
}

export function subscribeBatchForensicsLog(
  listener: (entries: BatchForensicsLogEntry[]) => void
): () => void {
  forensicsListeners.add(listener);

  const handleStorage = (e: StorageEvent) => {
    if (e.key === FORENSICS_STORAGE_KEY) {
      listener(getBatchForensicsLog());
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  return () => {
    forensicsListeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

export function clearBatchForensicsLog(): void {
  forensicsLogCache = [];
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(FORENSICS_STORAGE_KEY);
    }
  } catch {
    // Ignore storage clear errors
  }
  forensicsListeners.forEach((listener) => listener(forensicsLogCache));
}
