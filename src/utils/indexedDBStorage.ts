/**
 * ShortsForge IndexedDB Local Persistent Storage Service
 * Persists video clips, thumbnails, audio stems, brand kits, and storyboards
 * locally in the browser with zero loss between sessions.
 */

export type AssetType = 'video' | 'image' | 'audio' | 'brand' | 'storyboard' | 'template';

export interface StoredAsset {
  id: string;
  name: string;
  type: AssetType;
  category: string;
  fileUrl: string; // Object URL, Base64, or Cloud URL
  thumbnailUrl?: string;
  fileSize: number; // in bytes
  dimensions?: { width: number; height: number };
  durationSec?: number;
  mimeType: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  favorite?: boolean;
  metadata?: {
    caption?: string;
    title?: string;
    description?: string;
    paletteColors?: string[];
    fontFamily?: string;
    storyboardFrames?: any[];
    retentionScore?: number;
    safeZonePassed?: boolean;
    audioTrackName?: string;
    speedMultiplier?: number;
    notes?: string;
  };
}

export interface ProjectBackupPackage {
  appVersion: string;
  exportedAt: number;
  projectName: string;
  totalAssets: number;
  totalSizeBytes: number;
  assets: StoredAsset[];
}

const DB_NAME = 'ShortsForge_AssetVault_v1';
const DB_VERSION = 1;
const STORE_ASSETS = 'assets';
const STORE_METADATA = 'project_meta';

// Open or initialize IndexedDB instance
export function openShortsDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser environment.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Assets Object Store
      if (!db.objectStoreNames.contains(STORE_ASSETS)) {
        const assetStore = db.createObjectStore(STORE_ASSETS, { keyPath: 'id' });
        assetStore.createIndex('type', 'type', { unique: false });
        assetStore.createIndex('category', 'category', { unique: false });
        assetStore.createIndex('createdAt', 'createdAt', { unique: false });
        assetStore.createIndex('favorite', 'favorite', { unique: false });
      }

      // Project Meta Store
      if (!db.objectStoreNames.contains(STORE_METADATA)) {
        db.createObjectStore(STORE_METADATA, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Retrieve all assets from IndexedDB
export async function getAllAssets(): Promise<StoredAsset[]> {
  const db = await openShortsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_ASSETS], 'readonly');
    const store = transaction.objectStore(STORE_ASSETS);
    const request = store.getAll();

    request.onsuccess = () => {
      const results: StoredAsset[] = (request.result || []).map((asset: StoredAsset) => {
        if (asset.fileUrl && /^https?:\/\/[^/]*googleapis\.com\//i.test(asset.fileUrl)) {
          const lower = asset.fileUrl.toLowerCase();
          let localUrl = '/samples/sample_blazes.mp4';
          if (lower.includes('escapes')) localUrl = '/samples/sample_escapes.mp4';
          else if (lower.includes('joy')) localUrl = '/samples/sample_joy.mp4';
          else if (lower.includes('meltdowns')) localUrl = '/samples/sample_meltdowns.mp4';
          else if (lower.includes('fun')) localUrl = '/samples/sample_fun.mp4';
          return { ...asset, fileUrl: localUrl };
        }
        return asset;
      });
      // Sort newest first
      results.sort((a, b) => b.createdAt - a.createdAt);
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
}

// Save or update a single asset
export async function saveAsset(asset: StoredAsset): Promise<StoredAsset> {
  const db = await openShortsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_ASSETS], 'readwrite');
    const store = transaction.objectStore(STORE_ASSETS);
    const updatedAsset = {
      ...asset,
      updatedAt: Date.now()
    };
    const request = store.put(updatedAsset);

    request.onsuccess = () => resolve(updatedAsset);
    request.onerror = () => reject(request.error);
  });
}

// Save batch of assets
export async function saveBatchAssets(assets: StoredAsset[]): Promise<void> {
  const db = await openShortsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_ASSETS], 'readwrite');
    const store = transaction.objectStore(STORE_ASSETS);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);

    for (const asset of assets) {
      store.put(asset);
    }
  });
}

// Delete an asset by ID
export async function deleteAsset(id: string): Promise<void> {
  const db = await openShortsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_ASSETS], 'readwrite');
    const store = transaction.objectStore(STORE_ASSETS);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Clear all assets
export async function clearAllAssets(): Promise<void> {
  const db = await openShortsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_ASSETS], 'readwrite');
    const store = transaction.objectStore(STORE_ASSETS);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Toggle Favorite flag
export async function toggleAssetFavorite(id: string): Promise<boolean> {
  const db = await openShortsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_ASSETS], 'readwrite');
    const store = transaction.objectStore(STORE_ASSETS);
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const asset = getReq.result as StoredAsset;
      if (!asset) {
        reject(new Error(`Asset ${id} not found`));
        return;
      }
      asset.favorite = !asset.favorite;
      asset.updatedAt = Date.now();
      const putReq = store.put(asset);
      putReq.onsuccess = () => resolve(!!asset.favorite);
      putReq.onerror = () => reject(putReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

// Storage Quota & Usage Calculator
export async function getStorageMetrics(): Promise<{
  usedBytes: number;
  quotaBytes: number;
  percentage: number;
  assetCount: number;
}> {
  let usedBytes = 0;
  let quotaBytes = 500 * 1024 * 1024; // 500MB default fallback

  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      if (estimate.usage !== undefined) usedBytes = estimate.usage;
      if (estimate.quota !== undefined) quotaBytes = estimate.quota;
    } catch (e) {
      console.warn('Storage estimate failed:', e);
    }
  }

  // Count items from IndexedDB
  const assets = await getAllAssets();
  if (usedBytes === 0) {
    usedBytes = assets.reduce((acc, a) => acc + (a.fileSize || 0), 0);
  }

  const percentage = Math.min(100, Math.round((usedBytes / quotaBytes) * 100));

  return {
    usedBytes,
    quotaBytes,
    percentage,
    assetCount: assets.length
  };
}

// Full Project Export to downloadable JSON bundle
export async function exportProjectBundle(): Promise<ProjectBackupPackage> {
  const assets = await getAllAssets();
  const totalSizeBytes = assets.reduce((acc, a) => acc + (a.fileSize || 0), 0);

  const backupPackage: ProjectBackupPackage = {
    appVersion: '2.5.0',
    exportedAt: Date.now(),
    projectName: 'ShortsForge_Creator_Archive',
    totalAssets: assets.length,
    totalSizeBytes,
    assets
  };

  return backupPackage;
}

// Full Project Import from JSON bundle
export async function importProjectBundle(jsonString: string): Promise<{ importedCount: number }> {
  try {
    const parsed = JSON.parse(jsonString) as ProjectBackupPackage;
    if (!parsed || !Array.isArray(parsed.assets)) {
      throw new Error('Invalid project bundle structure: missing assets array.');
    }

    await saveBatchAssets(parsed.assets);
    return { importedCount: parsed.assets.length };
  } catch (error: any) {
    throw new Error(`Project import failed: ${error.message || 'Corrupt JSON'}`);
  }
}

// Pre-seeded high quality starter assets so the library is immediately useful and never empty
export const INITIAL_PRESET_ASSETS: StoredAsset[] = [
  {
    id: 'asset_preset_drone_4k',
    name: '4K Metropolis FPV Drone Skim (Shorts Cut)',
    type: 'video',
    category: 'Aerial & FPV',
    fileUrl: '/samples/sample_blazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
    fileSize: 14800000,
    dimensions: { width: 1080, height: 1920 },
    durationSec: 15.4,
    mimeType: 'video/mp4',
    tags: ['4k', 'drone', 'fpv', 'cinematic', 'high-retention'],
    createdAt: Date.now() - 3600000 * 24 * 2,
    updatedAt: Date.now() - 3600000 * 24 * 2,
    favorite: true,
    metadata: {
      caption: 'WHAT 140 KM/H LOOKS LIKE 5 METERS ABOVE THE STREET',
      title: 'Flying Through Tokyo Skyscraper Canyons at 140 KM/H',
      description: 'Full speed 4K FPV drone dive through high-density urban towers.\n\n#shorts #drone #fpv #tokyo',
      retentionScore: 94,
      safeZonePassed: true,
      speedMultiplier: 1.1
    }
  },
  {
    id: 'asset_preset_craftsman_titanium',
    name: 'Grade-5 Titanium 120-Bar Gun-Drilling Loop',
    type: 'video',
    category: 'Machinery & Metallurgy',
    fileUrl: '/samples/sample_fun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    fileSize: 18200000,
    dimensions: { width: 1080, height: 1920 },
    durationSec: 22.0,
    mimeType: 'video/mp4',
    tags: ['machinery', 'drilling', 'titanium', 'satisfying', 'asmr'],
    createdAt: Date.now() - 3600000 * 18,
    updatedAt: Date.now() - 3600000 * 18,
    favorite: true,
    metadata: {
      caption: 'THE REASON ORDINARY DRILLS VAPORIZE IN 2 SECONDS',
      title: 'Why Drilling Titanium Requires 120-Bar Freezing Coolant',
      description: 'Industrial deep-hole machining breakdown.\n\n#shorts #engineering #machining #titanium',
      retentionScore: 96,
      safeZonePassed: true,
      speedMultiplier: 1.15
    }
  },
  {
    id: 'asset_preset_thumb_mrbeast_shock',
    name: 'MrBeast Style 350% CTR Shock Cover',
    type: 'image',
    category: 'Thumbnails & Covers',
    fileUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1280&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    fileSize: 1840000,
    dimensions: { width: 1280, height: 720 },
    mimeType: 'image/jpeg',
    tags: ['thumbnail', 'high-ctr', 'mrbeast', 'sticker-border', 'viral'],
    createdAt: Date.now() - 3600000 * 12,
    updatedAt: Date.now() - 3600000 * 12,
    favorite: true,
    metadata: {
      title: 'THE $1,000,000 SECRET NOBODY TOLD YOU',
      retentionScore: 92,
      safeZonePassed: true,
      paletteColors: ['#FF0055', '#FFE600', '#00F0FF', '#111111']
    }
  },
  {
    id: 'asset_preset_brand_master_kit',
    name: 'ShortsForge Cyber Neon Channel Brand Kit',
    type: 'brand',
    category: 'Brand Identity',
    fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    fileSize: 420000,
    dimensions: { width: 1920, height: 1080 },
    mimeType: 'application/json',
    tags: ['brand', 'palette', 'typography', 'cyber-neon'],
    createdAt: Date.now() - 3600000 * 36,
    updatedAt: Date.now() - 3600000 * 36,
    favorite: false,
    metadata: {
      fontFamily: 'Montserrat Black 900',
      paletteColors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
    }
  },
  {
    id: 'asset_preset_audio_synth_whoosh',
    name: 'Subdrop Hook Impact & FPV Whoosh Stem',
    type: 'audio',
    category: 'Audio & SFX',
    fileUrl: 'https://cdn.freesound.org/previews/316/316847_4939433-lq.mp3',
    fileSize: 280000,
    durationSec: 4.2,
    mimeType: 'audio/mpeg',
    tags: ['audio', 'sfx', 'whoosh', 'subdrop', 'impact'],
    createdAt: Date.now() - 3600000 * 8,
    updatedAt: Date.now() - 3600000 * 8,
    favorite: false,
    metadata: {
      audioTrackName: 'Subdrop Transition Stem (Web Audio Synced)'
    }
  },
  {
    id: 'asset_preset_storyboard_titanium',
    name: '5-Frame Viral Storyboard Blueprint: Titanium Gun-Drill',
    type: 'storyboard',
    category: 'Storyboards & Scripts',
    fileUrl: '',
    fileSize: 15400,
    mimeType: 'application/json',
    tags: ['storyboard', 'viral-blueprint', 'script', '5-frame'],
    createdAt: Date.now() - 3600000 * 4,
    updatedAt: Date.now() - 3600000 * 4,
    favorite: true,
    metadata: {
      title: 'Titanium Super-Drilling: Why 99% Fail',
      storyboardFrames: [
        { frame: 1, time: '0-3s', hook: 'Extreme Macro of smoke & molten chip explosion', retention: '96%' },
        { frame: 2, time: '3-8s', hook: '120-Bar freezing coolant stream activation', retention: '93%' },
        { frame: 3, time: '8-16s', hook: 'Gun-drill internal oil channels diagram', retention: '89%' },
        { frame: 4, time: '16-24s', hook: 'Through-hole breakthrough & mirror bore finish', retention: '87%' },
        { frame: 5, time: '24-30s', hook: 'Seamless infinite loop reset question', retention: '85%' }
      ]
    }
  }
];

// Initialize with presets if user has zero assets in IndexedDB
export async function seedInitialAssetsIfEmpty(): Promise<StoredAsset[]> {
  try {
    const existing = await getAllAssets();
    if (existing.length === 0) {
      await saveBatchAssets(INITIAL_PRESET_ASSETS);
      return INITIAL_PRESET_ASSETS;
    }
    return existing;
  } catch (e) {
    console.error('Seeding initial assets failed:', e);
    return INITIAL_PRESET_ASSETS;
  }
}
