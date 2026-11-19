export interface ReviewQueueItem {
  id: string;
  title: string;
  niche: string;
  durationSec: number;
  videoUrl: string;
  styleProfile: string;
  originalityScore: number;
  originalityBreakdown: {
    scriptUniqueness: number;
    narrativeOriginality: number;
    hookNovelty: number;
    visualCoherence: number;
    inauthenticRisk: 'Low' | 'Medium' | 'High';
  };
  safeZoneCleared: boolean;
  alteredContentDisclosed: boolean;
  commercialLicenseVerified: boolean;
  hookText: string;
  description: string;
  tags: string[];
  status: 'pending_review' | 'approved' | 'publishing' | 'published' | 'flagged';
  publishedUrl?: string;
  createdAt: string;
}

const STORAGE_KEY = 'shortsforge_review_queue_v1';
const AUTO_PUBLISH_KEY = 'shortsforge_autopublish_active_v1';

export const INITIAL_REVIEW_QUEUE: ReviewQueueItem[] = [
  {
    id: 'rev-001',
    title: 'Why Drilling Grade-5 Titanium Vaporizes Standard Bits in 2s',
    niche: 'Machinery & Tech',
    durationSec: 28,
    videoUrl: '/samples/sample_blazes.mp4',
    styleProfile: 'Vox High-Info Documentary',
    originalityScore: 94,
    originalityBreakdown: {
      scriptUniqueness: 96,
      narrativeOriginality: 93,
      hookNovelty: 95,
      visualCoherence: 92,
      inauthenticRisk: 'Low'
    },
    safeZoneCleared: true,
    alteredContentDisclosed: true,
    commercialLicenseVerified: true,
    hookText: 'THE REASON ORDINARY GUN DRILLS VAPORIZE IN 2 SECONDS',
    description: 'Internal 120-bar cutting fluid interface freezes shear temperatures.\n\n#shorts #machining #engineering #satisfying\n📌 Complete engineering blueprint pinned!',
    tags: ['machining', 'titanium', 'engineering', 'satisfying', 'shorts'],
    status: 'pending_review',
    createdAt: 'Today, 08:30 AM'
  },
  {
    id: 'rev-002',
    title: 'The Dopamine Baseline Crash Most High Achievers Ignore',
    niche: 'Neuroscience & Health',
    durationSec: 34,
    videoUrl: '/samples/sample_escapes.mp4',
    styleProfile: 'Alex Hormozi Authority Punch',
    originalityScore: 91,
    originalityBreakdown: {
      scriptUniqueness: 92,
      narrativeOriginality: 90,
      hookNovelty: 94,
      visualCoherence: 88,
      inauthenticRisk: 'Low'
    },
    safeZoneCleared: true,
    alteredContentDisclosed: true,
    commercialLicenseVerified: true,
    hookText: 'DOPAMINE IS NOT PLEASURE. IT IS ANTICIPATION.',
    description: 'Spiking cheap dopamine depletes your motivational drive.\n\n#shorts #neuroscience #habits #focus\n📌 Reset protocol pinned in comment!',
    tags: ['dopamine', 'neuroscience', 'productivity', 'habits', 'shorts'],
    status: 'pending_review',
    createdAt: 'Today, 09:15 AM'
  },
  {
    id: 'rev-003',
    title: 'Deep Ocean Bioluminescence: Midnight Obsidian Sand',
    niche: 'Nature & Wildlife',
    durationSec: 32,
    videoUrl: '/samples/sample_fun.mp4',
    styleProfile: 'BBC Nature Documentary',
    originalityScore: 96,
    originalityBreakdown: {
      scriptUniqueness: 98,
      narrativeOriginality: 97,
      hookNovelty: 95,
      visualCoherence: 96,
      inauthenticRisk: 'Low'
    },
    safeZoneCleared: true,
    alteredContentDisclosed: true,
    commercialLicenseVerified: true,
    hookText: 'WHAT TURNS THIS VOLCANIC SHORE ELECTRIC CYAN AT 3 AM?',
    description: 'Bioluminescent dinoflagellates reacting to wave shear stress.\n\n#shorts #nature #ocean #science\n📌 Full documentary link in pinned comment!',
    tags: ['nature', 'ocean', 'wildlife', 'science', 'shorts'],
    status: 'approved',
    publishedUrl: 'https://youtube.com/shorts/nat_bio_391',
    createdAt: 'Yesterday, 04:10 PM'
  }
];

const normalizeLocalSampleUrl = (url: string): string => {
  if (!url || !/^https?:\/\/[^/]*googleapis\.com\//i.test(url)) return url;
  const lower = url.toLowerCase();
  if (lower.includes('escapes')) return '/samples/sample_escapes.mp4';
  if (lower.includes('joy')) return '/samples/sample_joy.mp4';
  if (lower.includes('meltdowns')) return '/samples/sample_meltdowns.mp4';
  if (lower.includes('fun')) return '/samples/sample_fun.mp4';
  return '/samples/sample_blazes.mp4';
};

export const getReviewQueue = (): ReviewQueueItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item: ReviewQueueItem) => ({
          ...item,
          videoUrl: normalizeLocalSampleUrl(item.videoUrl),
        }));
      }
    }
  } catch (e) {
    console.warn('Error reading review queue from storage:', e);
  }
  return INITIAL_REVIEW_QUEUE;
};

export const saveReviewQueue = (items: ReviewQueueItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('shortsforge_review_queue_updated'));
  } catch (e) {
    console.error('Error saving review queue:', e);
  }
};

export const pushToReviewQueue = (newItems: ReviewQueueItem[]) => {
  const current = getReviewQueue();
  // Filter out any duplicates
  const existingIds = new Set(current.map(i => i.id));
  const uniqueNew = newItems.filter(i => !existingIds.has(i.id));
  const updated = [...uniqueNew, ...current];
  saveReviewQueue(updated);
  return updated;
};

export const getAutoPublishActive = (): boolean => {
  try {
    return localStorage.getItem(AUTO_PUBLISH_KEY) === 'true';
  } catch (e) {
    return false;
  }
};

export const setAutoPublishActive = (active: boolean) => {
  try {
    localStorage.setItem(AUTO_PUBLISH_KEY, active ? 'true' : 'false');
    window.dispatchEvent(new Event('shortsforge_autopublish_updated'));
  } catch (e) {
    console.error('Error saving auto publish setting:', e);
  }
};
