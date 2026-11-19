import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Sparkles, Flame, Play, Pause, ArrowRight, 
  Check, Copy, RefreshCw, Scissors, Volume2, ShieldCheck, DollarSign,
  TrendingUp, Award, Layers, CheckCircle2
} from 'lucide-react';
import { playSoundEffect } from '../utils/soundEffects';

interface RedditStoryPayload {
  title: string;
  author: string;
  upvotes: string;
  comments: string;
  timeAgo: string;
  hook: string;
  dialogue: { speaker: string; text: string }[];
  gameplayBackground: string;
  suggestedAudioTrack: string;
  retentionPredicted: number;
  cpmEstimate: string;
}

interface RedditProductionModuleProps {
  onLoadIntoClipper: (config: {
    videoUrl: string;
    hookText: string;
    title: string;
    description: string;
    tags: string;
    captionPreset: 'mrbeast' | 'hormozi' | 'neon';
    sourceCitation: string;
    dataFactTicker: string;
    redditPostCard: {
      subreddit: string;
      title: string;
      author: string;
      upvotes: string;
      comments: string;
    };
  }) => void;
  onClose?: () => void;
}

export const RedditProductionModule: React.FC<RedditProductionModuleProps> = ({
  onLoadIntoClipper,
  onClose
}) => {
  const [selectedSubreddit, setSelectedSubreddit] = useState<'r/AskReddit' | 'r/PersonalFinance' | 'r/TIFU' | 'r/Confession'>('r/AskReddit');
  const [storyTopic, setStoryTopic] = useState<string>('Forbidden Industry Secret');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentStory, setCurrentStory] = useState<RedditStoryPayload | null>(null);
  const [selectedBackgroundVideo, setSelectedBackgroundVideo] = useState<string>(
    '/samples/sample_blazes.mp4'
  );
  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerateStory = async (sub = selectedSubreddit, topic = storyTopic) => {
    setIsGenerating(true);
    playSoundEffect('pulse', 0.3);
    try {
      const res = await fetch('/api/editor/reddit-story-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subreddit: sub, topic })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentStory(data.story);
        if (data.story.gameplayBackground) {
          setSelectedBackgroundVideo(data.story.gameplayBackground);
        }
        playSoundEffect('chime', 0.5);
        showToast(`Generated high-retention story for ${sub}!`);
      }
    } catch (e) {
      console.error('Failed to generate Reddit story:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    handleGenerateStory(selectedSubreddit, storyTopic);
  }, [selectedSubreddit]);

  const handleTransferToClipper = () => {
    if (!currentStory) return;
    playSoundEffect('whoosh', 0.4);
    onLoadIntoClipper({
      videoUrl: selectedBackgroundVideo,
      hookText: currentStory.hook.slice(0, 70).toUpperCase(),
      title: `${currentStory.title.slice(0, 55)} #Shorts`,
      description: `${currentStory.hook}\n\n💬 Full thread from ${selectedSubreddit}.\n\n📌 Part 2 pinned in comments!\n#reddit #storytime #truestory #shorts #viral`,
      tags: 'reddit, storytime, truestory, askreddit, viral, shorts, mystery',
      captionPreset: 'mrbeast',
      sourceCitation: `${selectedSubreddit} Viral Thread (${currentStory.upvotes} Upvotes)`,
      dataFactTicker: `${selectedSubreddit} | ${currentStory.upvotes} Upvotes | ${currentStory.comments} Comments`,
      redditPostCard: {
        subreddit: selectedSubreddit,
        title: currentStory.title,
        author: currentStory.author,
        upvotes: currentStory.upvotes,
        comments: currentStory.comments
      }
    });
    showToast('Loaded Reddit Story and Card overlay into Precision Clipper!');
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Viral Reddit Storytime Production Engine
            </h3>
            <span className="text-[10px] font-mono bg-orange-950/80 text-orange-300 px-2 py-0.5 rounded border border-orange-500/30 font-bold">
              High Watch-Time Formula
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Engineered for 98%+ completion rates using authentic Reddit header cards, dual-voice alternating dialogue, and satisfying gameplay video tracks.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
          >
            Back to Clipper
          </button>
        )}
      </div>

      {/* Subreddit Selector & Topic Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-zinc-300 block mb-1">
            Select Subreddit Formula:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['r/AskReddit', 'r/PersonalFinance', 'r/TIFU', 'r/Confession'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubreddit(sub);
                  playSoundEffect('pulse', 0.2);
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                  selectedSubreddit === sub
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-md'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>{sub}</span>
                <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-zinc-400">
                  {sub === 'r/PersonalFinance' ? '$14.50 CPM' : 'Viral FYP'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-300 block mb-1">
            Story Theme / Custom Prompt:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={storyTopic}
              onChange={(e) => setStoryTopic(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              placeholder="e.g. Accidental Wire Transfer, Secret Room, Heist..."
            />
            <button
              onClick={() => handleGenerateStory(selectedSubreddit, storyTopic)}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Story Preview & Reddit Post Card Display */}
      {currentStory && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Authentic Reddit Post Card Mockup */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Live Reddit Card Preview (Burned as Video Overlay):
            </span>

            {/* Reddit UI Card */}
            <div className="bg-[#1a1a1b] border border-[#343536] rounded-2xl p-4 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                    r/
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white leading-tight">
                      {selectedSubreddit}
                    </span>
                    <span className="text-[10px] text-zinc-400 leading-tight">
                      Posted by {currentStory.author} • {currentStory.timeAgo}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#272729] text-orange-400 border border-orange-500/30">
                  Join
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-white leading-snug">
                {currentStory.title}
              </h4>

              {/* Hook snippet */}
              <div className="p-2.5 bg-[#272729] rounded-xl border border-zinc-700/60 text-xs text-zinc-200 leading-relaxed italic">
                "{currentStory.hook}"
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center gap-3 pt-2 text-xs font-bold text-zinc-400">
                <div className="flex items-center gap-1.5 bg-[#272729] px-2.5 py-1 rounded-full text-orange-500">
                  <span>⬆️</span>
                  <span className="text-white font-mono">{currentStory.upvotes}</span>
                  <span>⬇️</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#272729] px-2.5 py-1 rounded-full text-zinc-300">
                  <span>💬</span>
                  <span className="font-mono">{currentStory.comments} Comments</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">Predicted Retention:</span>
                <span className="text-amber-400 font-mono font-bold text-sm">
                  {currentStory.retentionPredicted}% Completion
                </span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">Estimated RPM:</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  {currentStory.cpmEstimate} CPM
                </span>
              </div>
            </div>
          </div>

          {/* Dialogue & Background Selector */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Two-Voice Alternating Audio Narration Script:
              </span>

              <div className="space-y-2.5">
                {currentStory.dialogue.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all ${
                      item.speaker === 'Narrator'
                        ? 'bg-zinc-950/80 border-indigo-500/30'
                        : 'bg-zinc-950/80 border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        item.speaker === 'Narrator' ? 'bg-indigo-950 text-indigo-300' : 'bg-cyan-950 text-cyan-300'
                      }`}>
                        Speaker: {item.speaker}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">0{idx + 1}</span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                      "{item.text}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Background Video Selector */}
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Satisfying Background Footage Track:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { name: '4K FPV Drone', url: '/samples/sample_blazes.mp4' },
                    { name: 'Satisfying Kinetic Drift', url: '/samples/sample_escapes.mp4' },
                    { name: 'Tech Hardware Macro', url: '/samples/sample_fun.mp4' }
                  ].map((bg) => (
                    <button
                      key={bg.name}
                      onClick={() => {
                        setSelectedBackgroundVideo(bg.url);
                        playSoundEffect('pulse', 0.2);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                        selectedBackgroundVideo === bg.url
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transfer to Clipper Button */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">
                Ready to clip, watermark &amp; schedule
              </span>

              <button
                onClick={handleTransferToClipper}
                className="px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xl shadow-orange-950/50 cursor-pointer transition-all active:scale-95"
              >
                <Scissors className="w-4 h-4" />
                <span>Load Reddit Production into Clipper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
