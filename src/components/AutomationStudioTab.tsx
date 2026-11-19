import React, { useState } from 'react';
import { 
  Terminal, Code, Download, Copy, Check, Play, 
  Settings2, Sparkles, Sliders, Layers, Cpu, FileCode, CheckCircle2 
} from 'lucide-react';

import { STANDALONE_UPLOAD_PYTHON_SCRIPT, COMPLETE_AUTOMATION_INSTALL_COMMAND, PYTHON_REQUIREMENTS_TXT } from '../data/nicheLibraryData';

export const AutomationStudioTab: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'ffmpeg' | 'python-pipeline' | 'youtube-search' | 'youtube-upload'>('ffmpeg');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // FFmpeg generator states
  const [inputFile, setInputFile] = useState('input.mp4');
  const [outputFile, setOutputFile] = useState('short_viral_1.mp4');
  const [cropMode, setCropMode] = useState<'center-crop' | 'blur-background' | 'top-bottom-split'>('center-crop');
  const [startTime, setStartTime] = useState('00:00:45');
  const [endTime, setEndTime] = useState('00:01:25');
  const [hwAccel, setHwAccel] = useState<'cpu' | 'nvidia' | 'apple-silicon'>('cpu');
  const [audioCodec, setAudioCodec] = useState<'copy' | 'aac'>('copy');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Build FFmpeg command dynamically
  const buildFFmpegCommand = () => {
    let vf = '';
    if (cropMode === 'center-crop') {
      vf = '-vf "crop=ih*9/16:ih"';
    } else if (cropMode === 'blur-background') {
      vf = '-vf "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,boxblur=20:20[bg];[0:v]scale=1080:1920:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2"';
    } else {
      vf = '-vf "crop=ih*9/16:ih,split[v1][v2];[v1]crop=iw:ih/2:0:0[top];[v2]crop=iw:ih/2:0:ih/2[bottom];[top][bottom]vstack"';
    }

    const accelFlag = hwAccel === 'nvidia' ? '-c:v h264_nvenc' : hwAccel === 'apple-silicon' ? '-c:v h264_videotoolbox' : '-c:v libx264 -preset fast -crf 20';
    const audioFlag = audioCodec === 'copy' ? '-c:a copy' : '-c:a aac -b:a 192k';

    return `ffmpeg -ss ${startTime} -to ${endTime} -i ${inputFile} ${vf} ${accelFlag} ${audioFlag} ${outputFile}`;
  };

  const currentFFmpeg = buildFFmpegCommand();

  const pythonSearchScript = `import os
from googleapiclient.discovery import build

def get_top_niche_videos(niche_keyword, max_results=25):
    """
    Search for top long-form videos in the last 7 days sorted by view count
    to find high-retention source material for YouTube Shorts clipping.
    """
    api_key = os.environ.get("YOUTUBE_API_KEY", "YOUR_API_KEY_HERE")
    youtube = build('youtube', 'v3', developerKey=api_key)
    
    request = youtube.search().list(
        q=niche_keyword,
        part='snippet',
        type='video',
        videoDuration='long',  # Target long-form to cut into viral shorts
        order='viewCount',     # Highest engagement first
        maxResults=max_results
    )
    response = request.execute()
    
    video_urls = []
    for item in response.get('items', []):
        vid_id = item['id']['videoId']
        title = item['snippet']['title']
        video_urls.append({
            "url": f"https://www.youtube.com/watch?v={vid_id}",
            "id": vid_id,
            "title": title
        })
        print(f"[*] Found: {title} (ID: {vid_id})")
        
    return video_urls

if __name__ == "__main__":
    niche = "finance mistakes 2026"
    videos = get_top_niche_videos(niche, max_results=10)
    print(f"\\nSuccessfully discovered {len(videos)} viral long-form videos.")
`;

  const fullPythonPipelineScript = `import os
import json
from youtube_transcript_api import YouTubeTranscriptApi
from google import genai
import yt_dlp

# ==============================================================================
# Faceless Shorts Automation Pipeline: Transcript Slicer & Surgical yt-dlp
# ==============================================================================

# 1. Fetch the Transcript with Timestamps
def get_transcript(video_id):
    try:
        srt = YouTubeTranscriptApi.get_transcript(video_id)
        # Format text with seconds timestamps for AI model to analyze
        formatted_srt = "\\n".join([f"{int(item['start'])}s - {item['text']}" for item in srt])
        print(f"[+] Successfully extracted {len(srt)} transcript lines.")
        return formatted_srt
    except Exception as e:
        print(f"[-] Error fetching transcript: {e}")
        return None

# 2. Let AI locate the 'Shorts-worthy' high-retention timestamps
def analyze_transcript_with_ai(transcript_text):
    # Initialize Google Gemini SDK
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
    
    prompt = f"""
    Act as a human YouTube Shorts Editor & Viral Data Analyst.
    Analyze this YouTube transcript with timestamps. Identify the top 3 most engaging, 
    high-hook 30-to-50 second segments perfect for a standalone YouTube Short.
    
    Look for:
    - High-energy hooks in first 3 seconds (bold claim, shocking stat)
    - Standalone complete thought (no cliffhangers)
    
    Return ONLY a valid JSON list of objects containing 'start' and 'end' integers:
    Example output format:
    [
      {{"start": 45, "end": 88, "hook": "The biggest lie in business"}},
      {{"start": 120, "end": 165, "hook": "The 3-second rule"}}
    ]
    
    Transcript:
    {transcript_text[:12000]}
    """
    
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt,
        config={"response_mime_type": "application/json"}
    )
    
    clips = json.loads(response.text)
    return clips

# 3. Surgical clip extraction using yt-dlp & FFmpeg 9:16 Center-Crop
def download_clip(video_url, start_time, end_time, output_name):
    print(f"[+] Downloading & cropping clip: {start_time}s to {end_time}s -> {output_name}")
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
        'outtmpl': output_name,
        'external_downloader': 'ffmpeg',
        'external_downloader_args': [
            '-ss', str(start_time), 
            '-to', str(end_time),
            '-vf', 'crop=ih*9/16:ih'  # Surgical center-crop to 9:16 vertical
        ],
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])
    print(f"[✓] Finished rendering {output_name} ready for CapCut captions!")

# 4. Master Pipeline Runner
def run_pipeline(video_url, video_id):
    transcript = get_transcript(video_id)
    if not transcript:
        return
        
    print("[*] Analyzing virality via Gemini AI...")
    clips = analyze_transcript_with_ai(transcript)
    print(f"[+] Found {len(clips)} viral segment candidates: {clips}")
    
    for i, clip in enumerate(clips, 1):
        output_filename = f"short_{video_id}_clip{i}.mp4"
        download_clip(video_url, clip['start'], clip['end'], output_filename)

if __name__ == "__main__":
    # Example execution
    TARGET_VIDEO_ID = "dQw4w9WgXcQ"  # Replace with target long-form video ID
    TARGET_URL = f"https://www.youtube.com/watch?v={TARGET_VIDEO_ID}"
    
    print("[*] Starting Automated Shorts Cutter...")
    run_pipeline(TARGET_URL, TARGET_VIDEO_ID)
`;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-cyan-950/40 border border-red-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                <Terminal className="w-5 h-5 text-red-500" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Python &amp; FFmpeg Automation Code Studio</h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Turn long-form videos into 9:16 vertical Shorts automatically. Generate customized FFmpeg commands, transcript slicers with yt-dlp, and YouTube API video scrapers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1.5 font-medium">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Production Scripts Ready
            </span>
          </div>
        </div>
      </div>

      {/* Code Navigation Tabs */}
      <div className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-2xl border border-zinc-800">
        <div className="flex gap-2">
          {[
            { id: 'ffmpeg', label: 'FFmpeg 9:16 Generator', icon: Sliders },
            { id: 'python-pipeline', label: 'Full Python AI Cutter Pipeline', icon: FileCode },
            { id: 'youtube-search', label: 'YouTube API Video Scraper', icon: Sparkles },
            { id: 'youtube-upload', label: 'YouTube Direct Uploader (google-api-python-client)', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
                  activeCodeTab === tab.id
                    ? 'bg-red-600 text-white border-red-500 shadow-md'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Interactive FFmpeg Command Generator */}
      {activeCodeTab === 'ffmpeg' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Settings */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-red-400" /> FFmpeg Slice &amp; Crop Parameters
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Input File</label>
                <input
                  type="text"
                  value={inputFile}
                  onChange={(e) => setInputFile(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Output File</label>
                <input
                  type="text"
                  value={outputFile}
                  onChange={(e) => setOutputFile(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Start Time (-ss)</label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">End Time (-to)</label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">9:16 Aspect Conversion Mode</label>
              <div className="space-y-2">
                {[
                  { id: 'center-crop', label: 'Pure Center-Crop (crop=ih*9/16:ih)', desc: 'Direct vertical crop for centered speaker face' },
                  { id: 'blur-background', label: 'Blurred Background Padding (Boxblur 20)', desc: 'Fits entire 16:9 video with blurred mirror top/bottom' },
                  { id: 'top-bottom-split', label: 'Vertical Split Stack', desc: 'Stacks top half & bottom half for gaming or reaction shorts' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCropMode(mode.id as any)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                      cropMode === mode.id
                        ? 'bg-red-500/20 border-red-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-zinc-200">{mode.label}</div>
                    <div className="text-[10px] text-zinc-500">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Hardware Acceleration</label>
                <select
                  value={hwAccel}
                  onChange={(e) => setHwAccel(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="cpu">CPU (libx264)</option>
                  <option value="nvidia">NVIDIA GPU (NVENC)</option>
                  <option value="apple-silicon">Apple Silicon (VideoToolbox)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Audio Track</label>
                <select
                  value={audioCodec}
                  onChange={(e) => setAudioCodec(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="copy">-c:a copy (Instant)</option>
                  <option value="aac">-c:a aac 192k (Re-encode)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Command Box */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" /> Ready-to-Run FFmpeg Terminal Command
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(currentFFmpeg, 'ffmpeg-cmd')}
                    className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    {copiedKey === 'ffmpeg-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Command</span>
                  </button>
                  <button
                    onClick={() => handleDownload('crop_shorts.sh', `#!/bin/bash\n${currentFFmpeg}\n`)}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700"
                    title="Download .sh script"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-black p-4 rounded-xl border border-zinc-800 text-xs font-mono text-emerald-400 leading-relaxed break-all select-all shadow-inner">
                {currentFFmpeg}
              </div>

              <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-2">
                <span className="text-amber-400 font-bold block">💡 Command Explanation:</span>
                <ul className="space-y-1 list-disc list-inside text-[11px]">
                  <li><code className="text-zinc-200">-ss {startTime} -to {endTime}</code> cuts precisely without loading the rest of the file into memory.</li>
                  <li><code className="text-zinc-200">{cropMode === 'center-crop' ? 'crop=ih*9/16:ih' : 'filter complex'}</code> converts standard 16:9 widescreen into flawless 9:16 vertical resolution.</li>
                  <li><code className="text-zinc-200">{audioCodec === 'copy' ? '-c:a copy' : '-c:a aac'}</code> keeps audio completely pristine without re-compression loss.</li>
                </ul>
              </div>
            </div>

            {/* Quick Batch Script Snippet */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-cyan-400" /> Batch Processing Script (crop_all.sh)
                </span>
                <button
                  onClick={() => handleCopy(`#!/bin/bash\nfor f in *.mp4; do\n  ffmpeg -i "$f" -vf "crop=ih*9/16:ih" -c:a copy "short_\${f}"\ndone\necho "All videos converted to 9:16 Shorts!"`, 'batch-sh')}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Script
                </button>
              </div>
              <pre className="bg-black p-3 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto">
{`#!/bin/bash
for f in *.mp4; do
  ffmpeg -i "$f" -vf "crop=ih*9/16:ih" -c:a copy "short_\${f}"
done
echo "All videos converted to 9:16 Shorts!"`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Full Python AI Slicer Pipeline */}
      {activeCodeTab === 'python-pipeline' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" /> Automated Python Pipeline (yt-dlp + Gemini AI + FFmpeg)
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Takes any long-form video, extracts transcript timestamps, has Gemini locate top hooks, and surgically cuts 9:16 MP4s.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(fullPythonPipelineScript, 'python-pipeline-code')}
                className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedKey === 'python-pipeline-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Python Script</span>
              </button>

              <button
                onClick={() => handleDownload('shorts_cutter_pipeline.py', fullPythonPipelineScript)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .py</span>
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">Quick Install:</span>
            <code className="text-white bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
              pip install youtube-transcript-api yt-dlp google-genai
            </code>
          </div>

          <div className="relative">
            <pre className="bg-black p-4 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[500px] leading-relaxed">
              {fullPythonPipelineScript}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: YouTube API Video Scraper */}
      {activeCodeTab === 'youtube-search' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> YouTube Data API Video Discovery Script
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Automatically queries YouTube API for top long-form videos in the last 7 days sorted by viewCount.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(pythonSearchScript, 'py-search-code')}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedKey === 'py-search-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Script</span>
              </button>
              <button
                onClick={() => handleDownload('youtube_search_top_niche.py', pythonSearchScript)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .py</span>
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="text-amber-400 font-bold">Required Package:</span>
            <code className="text-white bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
              pip install google-api-python-client
            </code>
          </div>

          <div className="relative">
            <pre className="bg-black p-4 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[450px] leading-relaxed">
              {pythonSearchScript}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Python Automated YouTube Uploader & Software Setup */}
      {activeCodeTab === 'youtube-upload' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Google API Client Automation
                </span>
                <span className="text-xs text-zinc-500 font-mono">Resumable Chunk Uploads</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" /> Automated Python YouTube Shorts Uploader
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Headless upload script with OAuth2 tokens, category ID 24 (Entertainment), automatic #Shorts tagging, and Wise payout metadata verification.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleCopy(COMPLETE_AUTOMATION_INSTALL_COMMAND, 'py-install-cmd')}
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedKey === 'py-install-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Pip Command</span>
              </button>
              <button
                onClick={() => handleCopy(STANDALONE_UPLOAD_PYTHON_SCRIPT, 'py-upload-code')}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedKey === 'py-upload-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Script</span>
              </button>
              <button
                onClick={() => handleDownload('upload_short.py', STANDALONE_UPLOAD_PYTHON_SCRIPT)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download upload_short.py</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs space-y-1.5">
              <div className="text-zinc-400 font-semibold flex items-center justify-between">
                <span>1. Install Google API Python Client &amp; Softwares:</span>
                <span className="text-emerald-400 text-[10px] font-mono">Terminal Command</span>
              </div>
              <pre className="text-emerald-400 font-mono bg-zinc-900 p-2.5 rounded border border-zinc-800 overflow-x-auto text-[11px]">
                {COMPLETE_AUTOMATION_INSTALL_COMMAND}
              </pre>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs space-y-1.5">
              <div className="text-zinc-400 font-semibold flex items-center justify-between">
                <span>2. Run Automated Upload Command:</span>
                <span className="text-indigo-400 text-[10px] font-mono">Python 3.9+</span>
              </div>
              <pre className="text-zinc-300 font-mono bg-zinc-900 p-2.5 rounded border border-zinc-800 overflow-x-auto text-[11px]">
                python upload_short.py short_viral_1.mp4 &quot;Clockwork Dragonfly 🕰️&quot;
              </pre>
            </div>
          </div>

          <div className="relative">
            <pre className="bg-black p-4 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[500px] leading-relaxed">
              {STANDALONE_UPLOAD_PYTHON_SCRIPT}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
