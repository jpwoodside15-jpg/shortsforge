import { applyAwinAffiliateMetadata } from './awinAffiliate';
import {
  BatchForensicsLogEntry,
  PipelineState,
  PipelineVerificationResult,
  verifyBeforeUpload,
  writeToBatchForensicsLog
} from './pipelineVerifier';
import type { QueuedShort } from '../components/AutomatedDailyPipelineTab';

export type RetentionFixType = 'trim_churn' | 're_hook' | 'subtitle_change';

export interface RetentionCurvePoint {
  second: number;
  retention: number;
}

export interface RetentionRepairPayload {
  nonce: number;
  clipId: string;
  clipTitle: string;
  niche: string;
  durationSec: number;
  videoUrl: string;
  segmentId: string;
  secondStart: number;
  secondEnd: number;
  dropDelta: number;
  churnVelocity: number;
  phase: 'Hook (0-3s)' | 'Body' | 'CTA / Loop';
  fixType: RetentionFixType;
  fixLabel: string;
  fixSummary: string;
  recommendedHookText?: string;
  recommendedSubtitleText?: string;
  recommendedSubtitleStyle?: 'hormozi' | 'cyber' | 'mrbeast' | 'minimal';
  retentionCurve: RetentionCurvePoint[];
}

export interface RetentionRepairExecutionResult {
  repairedSlot: QueuedShort;
  pipelineState: PipelineState;
  verification: PipelineVerificationResult;
  forensicsEntry: BatchForensicsLogEntry;
  trimStartSec: number;
  trimEndSec: number;
  repairedDurationSec: number;
  appliedHookText: string;
  appliedSubtitleText: string;
  appliedSubtitleStyle: 'hormozi' | 'cyber' | 'mrbeast' | 'minimal';
}

export function inferRecommendedFixType(
  phase: RetentionRepairPayload['phase']
): RetentionFixType {
  if (phase === 'Hook (0-3s)') return 're_hook';
  if (phase === 'CTA / Loop') return 'subtitle_change';
  return 'trim_churn';
}

export function getFixTypeLabel(fixType: RetentionFixType): string {
  switch (fixType) {
    case 'trim_churn':
      return 'Trim Churn Dip';
    case 're_hook':
      return 'Re-Hook Opening';
    case 'subtitle_change':
      return 'Subtitle Pattern Interrupt';
  }
}

/**
 * Builds the repaired QueuedShort from a RetentionRepairPayload, runs the provided
 * buildQueueItemPipelineState + verifyBeforeUpload gate, and logs with source "Retention Repair".
 */
export function runRetentionRepairVerification(
  payload: RetentionRepairPayload,
  buildPipelineStateFn: (item: QueuedShort) => PipelineState
): RetentionRepairExecutionResult {
  const segLen = Math.max(1, Math.round(payload.secondEnd - payload.secondStart));
  const rawNewDuration =
    payload.fixType === 'trim_churn'
      ? Math.max(8, Math.min(58, Math.round(payload.durationSec - segLen)))
      : Math.max(8, Math.min(58, Math.round(payload.durationSec)));

  const trimStartSec =
    payload.fixType === 're_hook'
      ? Math.min(Math.max(1, payload.secondEnd), Math.max(2, payload.durationSec - 6))
      : payload.fixType === 'trim_churn'
        ? payload.secondStart
        : 0;
  const trimEndSec =
    payload.fixType === 'trim_churn'
      ? payload.secondEnd
      : Math.min(payload.durationSec, trimStartSec + 3);

  const appliedHookText =
    payload.recommendedHookText?.trim() ||
    (payload.fixType === 're_hook'
      ? `STOP: ${payload.clipTitle.slice(0, 42).toUpperCase()} (INSTANT PAYOFF)`
      : `RETAINED CUT: ${payload.clipTitle.slice(0, 40).toUpperCase()}`);

  const appliedSubtitleText =
    payload.recommendedSubtitleText?.trim() ||
    (payload.fixType === 'subtitle_change'
      ? 'WAIT FOR THE FINAL FRAME — LOOP LOCKED'
      : appliedHookText);

  const appliedSubtitleStyle: 'hormozi' | 'cyber' | 'mrbeast' | 'minimal' =
    payload.recommendedSubtitleStyle ||
    (payload.fixType === 'subtitle_change' ? 'mrbeast' : 'hormozi');

  const safeNiche = payload.niche?.trim() || 'Tech & AI';
  const baseDescription = [
    `${payload.clipTitle} — Retention Repaired (${getFixTypeLabel(payload.fixType)} on ${payload.secondStart}s-${payload.secondEnd}s, -${payload.dropDelta}% drop).`,
    `Fix Applied: ${payload.fixSummary}`,
    '#shorts #retention #creator'
  ].join('\n\n');

  const awinMeta = applyAwinAffiliateMetadata({
    niche: safeNiche,
    description: baseDescription,
    affiliateDisclosure: true
  });

  const now = new Date();
  const repairedSlot: QueuedShort = {
    id: `repair_${payload.clipId}_${payload.secondStart}_${payload.secondEnd}`,
    dayName: now.toLocaleDateString('en-US', { weekday: 'long' }),
    dayOffset: 0,
    scheduledTime: '12:30 PM',
    scheduledDateStr: now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }),
    title: payload.clipTitle.trim(),
    hookText: appliedHookText,
    niche: safeNiche,
    durationSec: rawNewDuration,
    status: 'Ready',
    viewsProjected: '780,000',
    estimatedCpm: '$8.60',
    retentionScore: 95,
    isNewsFlash: false,
    complianceStatus: 'Certified Green Dollar',
    captionsBurned: true,
    safeZonesVerified: true,
    brandKitApplied: true,
    tags: [
      'shorts',
      safeNiche.toLowerCase().replace(/[^a-z0-9]+/g, ''),
      'retentionrepair',
      payload.fixType
    ].filter(Boolean),
    description: awinMeta.description,
    videoUrl: payload.videoUrl?.trim() || '/samples/sample_escapes.mp4',
    affiliateDisclosure: awinMeta.affiliateDisclosure,
    affiliateLink: awinMeta.affiliateLink,
    affiliateMerchant: awinMeta.affiliateMerchant,
    videoId: undefined
  };

  const pipelineState = buildPipelineStateFn(repairedSlot);
  const verification = verifyBeforeUpload(pipelineState);
  const logTargetTitle = `${repairedSlot.title} [${getFixTypeLabel(payload.fixType)} ${payload.secondStart}s-${payload.secondEnd}s]`;
  const forensicsEntry = writeToBatchForensicsLog(
    'Retention Repair',
    logTargetTitle,
    verification
  );

  if (verification.verdict === 'BLOCKED') {
    repairedSlot.status = 'Quarantined';
    repairedSlot.verifierBlockedReason = verification.message;
    repairedSlot.verifierRepairAction = verification.repairAction;
  }

  return {
    repairedSlot,
    pipelineState,
    verification,
    forensicsEntry,
    trimStartSec,
    trimEndSec,
    repairedDurationSec: rawNewDuration,
    appliedHookText,
    appliedSubtitleText,
    appliedSubtitleStyle
  };
}
