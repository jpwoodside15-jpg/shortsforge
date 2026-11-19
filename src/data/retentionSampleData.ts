export interface RetentionDataPoint {
  second: number;
  retention: number;
}

export interface RetentionPreset {
  id: string;
  name: string;
  description: string;
  videoTitle: string;
  videoDurationSec: number;
  niche: string;
  averageRetention: number;
  csvContent: string;
}

export const RETENTION_PRESETS: RetentionPreset[] = [
  {
    id: 'viral-hit',
    name: 'Viral Phenomenon (89.2% Avg / 118% Loop)',
    description: 'High-performing Short with instant visual hook, micro-pacing, and an infinite loop mechanism that causes viewers to re-watch.',
    videoTitle: 'The 3-Second Rule That Breaks Every Algorithm',
    videoDurationSec: 36,
    niche: 'business-wealth',
    averageRetention: 89.2,
    csvContent: `Video time,Audience retention (%)
0:00,100%
0:01,98.5%
0:02,96.8%
0:03,94.2%
0:04,93.5%
0:05,92.0%
0:06,91.2%
0:07,90.5%
0:08,89.8%
0:09,89.2%
0:10,88.9%
0:11,88.1%
0:12,87.6%
0:13,87.0%
0:14,86.5%
0:15,86.0%
0:16,85.4%
0:17,85.0%
0:18,84.6%
0:19,84.1%
0:20,83.8%
0:21,83.4%
0:22,83.0%
0:23,82.8%
0:24,82.5%
0:25,82.2%
0:26,82.0%
0:27,81.8%
0:28,81.5%
0:29,81.3%
0:30,81.0%
0:31,80.9%
0:32,80.8%
0:33,81.4%
0:34,84.2%
0:35,92.0%
0:36,118.5%`
  },
  {
    id: 'hook-cliff',
    name: 'Fatal Hook Cliff (-36% Drop in First 3s)',
    description: 'Classic creator mistake: slow verbal intro ("Hey guys, today I want to talk about..."), losing 36% before the main idea starts.',
    videoTitle: 'How to Build an AI Agent in 10 Minutes',
    videoDurationSec: 42,
    niche: 'tech-ai',
    averageRetention: 48.6,
    csvContent: `Video time,Audience retention (%)
0:00,100%
0:01,88.2%
0:02,74.5%
0:03,63.8%
0:04,59.1%
0:05,56.4%
0:06,54.8%
0:07,53.2%
0:08,52.0%
0:09,51.1%
0:10,50.3%
0:11,49.8%
0:12,49.1%
0:13,48.5%
0:14,48.0%
0:15,47.6%
0:16,47.1%
0:17,46.5%
0:18,46.0%
0:19,45.4%
0:20,44.9%
0:21,44.3%
0:22,43.8%
0:23,43.1%
0:24,42.5%
0:25,41.9%
0:26,41.2%
0:27,40.6%
0:28,39.9%
0:29,39.2%
0:30,38.5%
0:31,37.8%
0:32,37.0%
0:33,36.2%
0:34,35.4%
0:35,34.6%
0:36,33.8%
0:37,32.9%
0:38,32.0%
0:39,31.0%
0:40,29.8%
0:41,28.4%
0:42,26.9%`
  },
  {
    id: 'mid-video-sag',
    name: 'Mid-Video Attention Sag (-22% at Second 18)',
    description: 'Great hook held 91% of viewers, but an 8-second monotone explanation at second 18 caused viewers to lose interest and swipe away.',
    videoTitle: 'The Real Reason Why Rome Fell',
    videoDurationSec: 48,
    niche: 'history-mystery',
    averageRetention: 64.3,
    csvContent: `Video time,Audience retention (%)
0:00,100%
0:01,97.2%
0:02,94.5%
0:03,91.8%
0:04,90.2%
0:05,89.1%
0:06,88.4%
0:07,87.6%
0:08,86.9%
0:09,86.1%
0:10,85.4%
0:11,84.7%
0:12,84.0%
0:13,83.2%
0:14,82.5%
0:15,81.8%
0:16,79.4%
0:17,74.2%
0:18,66.8%
0:19,59.3%
0:20,55.1%
0:21,53.4%
0:22,52.2%
0:23,51.5%
0:24,50.8%
0:25,50.2%
0:26,49.6%
0:27,49.0%
0:28,48.5%
0:29,48.0%
0:30,47.5%
0:31,47.0%
0:32,46.5%
0:33,46.0%
0:34,45.5%
0:35,45.0%
0:36,44.4%
0:37,43.8%
0:38,43.2%
0:39,42.5%
0:40,41.8%
0:41,41.0%
0:42,40.2%
0:43,39.4%
0:44,38.5%
0:45,37.6%
0:46,36.5%
0:47,35.2%
0:48,34.0%`
  },
  {
    id: 'cta-cliff',
    name: 'Premature CTA Cliff (-31% at Second 34)',
    description: 'Creator said "If you enjoyed this, please like and subscribe", immediately triggering 31% of viewers to swipe away 10 seconds before the end.',
    videoTitle: '5 Secret iPhone Settings You Must Turn On',
    videoDurationSec: 45,
    niche: 'tech-ai',
    averageRetention: 67.8,
    csvContent: `Video time,Audience retention (%)
0:00,100%
0:01,98.0%
0:02,96.2%
0:03,94.5%
0:04,93.1%
0:05,92.0%
0:06,91.0%
0:07,90.2%
0:08,89.5%
0:09,88.8%
0:10,88.0%
0:11,87.4%
0:12,86.8%
0:13,86.2%
0:14,85.6%
0:15,85.0%
0:16,84.4%
0:17,83.8%
0:18,83.2%
0:19,82.5%
0:20,81.9%
0:21,81.2%
0:22,80.5%
0:23,79.8%
0:24,79.0%
0:25,78.2%
0:26,77.5%
0:27,76.8%
0:28,76.0%
0:29,75.2%
0:30,74.5%
0:31,73.8%
0:32,73.0%
0:33,72.0%
0:34,58.4%
0:35,45.2%
0:36,41.0%
0:37,39.2%
0:38,38.0%
0:39,37.1%
0:40,36.2%
0:41,35.4%
0:42,34.5%
0:43,33.5%
0:44,32.2%
0:45,30.8%`
  }
];

export function parseYouTubeAnalyticsCsv(csvString: string, videoDurationFallback = 45): {
  dataPoints: RetentionDataPoint[];
  avgRetention: number;
  hookRetention: number;
  endRetention: number;
  worstDrops: {
    secondStart: number;
    secondEnd: number;
    dropDelta: number;
    retentionStart: number;
    retentionEnd: number;
  }[];
} {
  const lines = csvString.trim().split(/\r?\n/);
  const dataPoints: RetentionDataPoint[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.toLowerCase().includes('video title') || line.toLowerCase().includes('date range')) {
      continue;
    }
    const parts = line.split(/[,\t;]/).map(p => p.trim().replace(/"/g, ''));
    if (parts.length < 2) continue;

    if (
      parts[0].toLowerCase().includes('time') || 
      parts[0].toLowerCase().includes('second') || 
      parts[0].toLowerCase().includes('percentage') || 
      parts[1].toLowerCase().includes('retention')
    ) {
      continue;
    }

    let sec = 0;
    const timePart = parts[0];
    if (timePart.includes(':')) {
      const [m, s] = timePart.split(':').map(Number);
      sec = (!isNaN(m) && !isNaN(s)) ? (m * 60 + s) : 0;
    } else if (timePart.endsWith('%')) {
      const pct = parseFloat(timePart) || 0;
      sec = Math.round((pct / 100) * videoDurationFallback);
    } else {
      sec = parseFloat(timePart) || 0;
    }

    const candidateStr = parts[parts.length - 1].replace('%', '');
    let retVal = parseFloat(candidateStr);
    if (isNaN(retVal) && parts.length > 2) {
      retVal = parseFloat(parts[1].replace('%', ''));
    }

    if (!isNaN(sec) && !isNaN(retVal)) {
      dataPoints.push({
        second: Math.round(sec * 10) / 10,
        retention: Math.max(0, Math.min(250, Math.round(retVal * 10) / 10))
      });
    }
  }

  dataPoints.sort((a, b) => a.second - b.second);

  let avgRetention = 0;
  if (dataPoints.length > 0) {
    const sum = dataPoints.reduce((acc, p) => acc + p.retention, 0);
    avgRetention = Math.round((sum / dataPoints.length) * 10) / 10;
  }

  const worstDrops: {
    secondStart: number;
    secondEnd: number;
    dropDelta: number;
    retentionStart: number;
    retentionEnd: number;
  }[] = [];

  for (let i = 0; i < dataPoints.length - 1; i++) {
    const cur = dataPoints[i];
    const next = dataPoints[i + 1];
    const delta = cur.retention - next.retention;
    if (delta > 1.2) {
      worstDrops.push({
        secondStart: cur.second,
        secondEnd: next.second,
        dropDelta: Math.round(delta * 10) / 10,
        retentionStart: cur.retention,
        retentionEnd: next.retention
      });
    }
  }

  worstDrops.sort((a, b) => b.dropDelta - a.dropDelta);

  const hookRetention = dataPoints.find(p => p.second >= 3)?.retention ?? (dataPoints[0]?.retention || 100);
  const endRetention = dataPoints[dataPoints.length - 1]?.retention ?? 50;

  return {
    dataPoints,
    avgRetention,
    hookRetention,
    endRetention,
    worstDrops: worstDrops.slice(0, 6)
  };
}
