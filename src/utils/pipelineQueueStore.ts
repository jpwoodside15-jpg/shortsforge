export const PIPELINE_QUEUE_STORAGE_KEY = 'shortsforge_automated_pipeline_queue_v1';
export const PIPELINE_QUEUE_UPDATED_EVENT = 'shortsforge_pipeline_queue_updated';

export function loadPipelineQueue<T>(fallbackFactory: () => T[]): T[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(PIPELINE_QUEUE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as T[];
        }
      }
    }
  } catch {
    // Ignore storage parse errors
  }
  return fallbackFactory();
}

export function savePipelineQueue<T>(queue: T[]): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(PIPELINE_QUEUE_STORAGE_KEY, JSON.stringify(queue));
      window.dispatchEvent(
        new CustomEvent(PIPELINE_QUEUE_UPDATED_EVENT, {
          detail: { updatedAt: Date.now() },
        })
      );
    }
  } catch {
    // Ignore storage write errors
  }
}

export function subscribePipelineQueueUpdates<T>(
  fallbackFactory: () => T[],
  onUpdate: (nextQueue: T[]) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleSync = () => {
    onUpdate(loadPipelineQueue(fallbackFactory));
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === PIPELINE_QUEUE_STORAGE_KEY) {
      handleSync();
    }
  };

  window.addEventListener(PIPELINE_QUEUE_UPDATED_EVENT, handleSync);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(PIPELINE_QUEUE_UPDATED_EVENT, handleSync);
    window.removeEventListener('storage', handleStorage);
  };
}
