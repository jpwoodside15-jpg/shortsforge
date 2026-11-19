import React, { useState, useMemo } from 'react';
import { 
  Split, Sparkles, TrendingUp, Play, Pause, Film, Maximize2, 
  Minimize2, Check, Copy, ArrowRight, ShieldCheck, Upload,
  Zap, Sliders, Award, Layers, Eye, RefreshCw, AlertCircle,
  HelpCircle, Volume2, Camera, Compass, RotateCcw
} from 'lucide-react';
import { 
  ShortVariation, ABSimulationResult, ShortFilmPackage, 
  InterestingContentSpark, RetentionCurvePoint 
} from '../types';
import { playSoundEffect } from '../utils/soundEffects';

interface ABTestManagerTabProps {
  onSendToUploader?: (data: any) => void;
  onSendToSimulator?: (data: any) => void;
  onSendToPipeline?: (data: any) => void;
}

export const ABTestManagerTab: React.FC<ABTestManagerTabProps> = ({
  onSendToUploader,
  onSendToSimulator,
  onSendToPipeline
}) => {
  // Active view: 'ab_test' | 'short_films' | 'interesting_content'
  const [activeSubTab, setActiveSubTab] = useState<'ab_test' | 'short_films' | 'interesting_content'>('ab_test');

  // No-Clutter Screen State (Zen Mode for Film Loops)
  const [isNoClutterMode, setIsNoClutterMode] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isPlayingFilm, setIsPlayingFilm] = useState(true);

  // Variation A State
  const [varA, setVarA] = useState<ShortVariation>({
    id: 'A',
    name: 'Variation A: Direct Benefit Hook',
    title: 'How I Save $1,200 Every Month with 1 Free App',
    hook: 'Stop letting banks steal your money in hidden fees.',
    script: 'Did you know standard banks charge up to 4% in hidden currency conversion markups? By using Wise with Sort Code 60-84-64, you get the exact mid-market exchange rate. Link in pinned comment.',
    thumbnailPrompt: 'Split screen of shocked creator pointing at bank balance with giant green arrow',
    thumbnailPreviewUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    soundStyle: 'Lo-Fi Chill Beat (95 BPM)',
    bpm: 95,
    pinnedCta: '👇 Check your bank fee savings calculator (Pinned Link)',
    pacing: 'Cinematic Narrative (2s cuts)',
    visualStyle: 'Clean studio lighting, screen recorded breakdown'
  });

  // Variation B State
  const [varB, setVarB] = useState<ShortVariation>({
    id: 'B',
    name: 'Variation B: Curiosity Paradox Hook (Viral)',
    title: 'The Banking Secret That Banks Pray You Never Discover',
    hook: 'If you use a normal bank card abroad, watch this immediately.',
    script: 'They take 3.8% from your hard-earned money and hope you never notice the small print. Here is the legal loophole UK and US creators use to get 0% markup and instant Faster Payments to Wise Account 88425941.',
    thumbnailPrompt: 'Close up dramatic dark lighting with redacted bank document and glowing red warning icon',
    thumbnailPreviewUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    soundStyle: 'Phonk Dark Pulse (128 BPM)',
    bpm: 128,
    pinnedCta: '👇 Claim 0% transfer fees on your first £1,000 via Wise partner link',
    pacing: 'Rapid (0.8s cuts)',
    visualStyle: 'Fast kinetic typography, red warning highlights, dramatic cuts'
  });

  // Simulation Running State
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Simulation Results
  const simulationResult: ABSimulationResult = useMemo(() => {
    // Second-by-second retention curve models
    const curveA: RetentionCurvePoint[] = [
      { second: 0, retentionPercent: 100 },
      { second: 3, retentionPercent: 72, label: 'Hook Drop' },
      { second: 10, retentionPercent: 58 },
      { second: 20, retentionPercent: 44 },
      { second: 30, retentionPercent: 36, label: 'Mid-point' },
      { second: 45, retentionPercent: 28 },
      { second: 60, retentionPercent: 22, label: 'Ending' },
    ];

    const curveB: RetentionCurvePoint[] = [
      { second: 0, retentionPercent: 100 },
      { second: 3, retentionPercent: 88, label: 'Curiosity Lock' },
      { second: 10, retentionPercent: 79 },
      { second: 20, retentionPercent: 68 },
      { second: 30, retentionPercent: 55, label: 'High Retention' },
      { second: 45, retentionPercent: 46 },
      { second: 60, retentionPercent: 39, label: 'Loop Replay' },
    ];

    return {
      winnerId: 'B',
      confidenceScore: 89,
      variationA: {
        predictedRetention30s: 36,
        predictedVtr: 54,
        hookVelocityScore: 68,
        predictedCtr: 4.8,
        shareabilityScore: 62,
        retentionCurve: curveA,
        strengths: ['Clear practical value proposition', 'Easy to follow pacing for older demographics'],
        dropoffVulnerabilities: ['First 3 seconds lacks tension or urgency', 'Direct benefit reveals the punchline too early']
      },
      variationB: {
        predictedRetention30s: 55,
        predictedVtr: 74,
        hookVelocityScore: 92,
        predictedCtr: 7.4,
        shareabilityScore: 88,
        retentionCurve: curveB,
        strengths: ['Belief violation opening creates irresistible curiosity gap', 'High BPM phonk drives 0.8s dopamine retention', 'Seamless loop ending invites second watch'],
        dropoffVulnerabilities: ['Must deliver concrete proof by second 15 to avoid clickbait bounce']
      },
      executiveSummary: 'Variation B is predicted to generate +52% higher algorithmic recommendation velocity. The combination of an open-loop curiosity title and rapid 128 BPM phonk pacing prevents early swipe-away, keeping 88% of viewers past the critical 3-second mark.',
      actionablePolishes: [
        'Add a subtle sound riser at second 2.5 right before the reveal.',
        'Place the CTA badge in the CapCut safe-zone at 60% vertical height to avoid the YouTube like button.',
        'Seamlessly repeat the first sentence in the final second for a 100%+ loop replay.'
      ],
      estimatedAlgorithmPushMultiplier: '3.4x Impressions Wave'
    };
  }, [varA, varB]);

  // Short Films Generator State & Presets
  const sampleShortFilm: ShortFilmPackage = {
    id: 'film_01',
    title: 'The Mirror Glitch',
    genre: 'Psychological Loop',
    logline: 'A man notices his reflection takes an extra second to blink, until he realizes he is the one trapped behind the glass.',
    runtimeSeconds: 52,
    threeActBeats: {
      act1_setup: '0-12s: Protagonist brushes teeth in bathroom. Notices mirror reflection smiles before he does.',
      act2_escalation: '13-35s: He tests the reflection with sudden hand movements. The reflection stops copying him and taps the glass from inside.',
      act3_twistOrLoop: '36-52s: The reflection pulls out a phone and records him. The camera pans backwards, revealing the viewer is inside the mirror, looping into second 0.'
    },
    seamlessLoopTechnique: 'The ending sound of water dripping perfectly matches the opening bathroom tap drop at 00:00.',
    cinematicColorGrade: 'Moody Teal & Orange with deep shadows (Fincher aesthetic)',
    soundtrackMood: 'Tense sub-bass drone with eerie ticking clock (110 BPM)',
    scenes: [
      {
        sceneNumber: 1,
        timecode: '00:00 - 00:06',
        shotType: 'Macro POV',
        visualDescription: 'Water droplet falling from silver bathroom faucet into dark sink. Slow motion.',
        characterAction: 'Male hand reaches in and grips the cold porcelain.',
        dialogueOrVoiceover: '(Whisper VO): "They say your reflection is always half a second behind..."',
        soundFx: 'Heavy sub-bass hit, metallic water drop echo.'
      },
      {
        sceneNumber: 2,
        timecode: '00:06 - 00:18',
        shotType: 'Extreme Close-Up',
        visualDescription: 'Protagonists eyes in the mirror. He blinks normally, but the reflection eyes remain wide open.',
        characterAction: 'He freezes. The breath fogging the mirror comes from the OTHER side of the glass.',
        dialogueOrVoiceover: '"...until tonight, when it decided to move first."',
        soundFx: 'Heartbeat accelerates to 120 BPM, high-pitched tension frequency.'
      },
      {
        sceneNumber: 3,
        timecode: '00:18 - 00:36',
        shotType: 'Dutch Tilt',
        visualDescription: 'The reflection raises both hands and presses them flat against the glass surface.',
        characterAction: 'Protagonist stumbles back, but his own hands are still by his sides.',
        dialogueOrVoiceover: '"Let me out. It is my turn."',
        soundFx: 'Muffled glass thumps, discordant violins.'
      },
      {
        sceneNumber: 4,
        timecode: '00:36 - 00:52',
        shotType: 'Low-Angle Tracking',
        visualDescription: 'Camera pulls back through the glass barrier. The room flips upside down.',
        characterAction: 'The reflection turns off the tap, resetting the scene for the next loop.',
        dialogueOrVoiceover: '"And then I realized... I wasn\'t in the room anymore."',
        soundFx: 'Water drop clicks back into sync. Loop resets seamlessly.'
      }
    ],
    scriptFullText: `[SCENE START - 9:16 VERTICAL CINEMA]
(00:00) Water droplet hits the sink. Sub-bass hum.
VO: "They say your reflection is always half a second behind..."
(00:07) A man looks up into the steam-covered mirror. He blinks. His reflection doesn't.
(00:14) The reflection tilts its head with a slow, deliberate grin.
VO: "...until tonight, when it decided to move first."
(00:22) Taps on the glass from inside. *Thump. Thump.*
VO: "Let me out. It's my turn."
(00:38) The camera inverts through the glass. The real man is now frozen behind the surface.
(00:48) The figure outside turns off the faucet. Droplet falls.
[SEAMLESS LOOP RESTART]`,
    noClutterRecommendedSettings: {
      aspectRatio: '9:16',
      loopBufferMs: 0,
      ambientBacklightColor: '#0f172a'
    }
  };

  // Interesting Content Sparks Presets
  const interestingSparks: InterestingContentSpark[] = [
    {
      id: 'spark_01',
      title: 'The Time Traveler Paradox in Classical Art',
      hookParadox: 'How did a 1920s wristwatch appear in an authentic 15th-century oil painting?',
      curiosityTrigger: 'High-resolution museum scan reveals microscopic detail historians cannot explain.',
      cliffhangerEnding: 'When researchers removed the frame, they found the artist signature dated 600 years in the future.',
      psychologicalTrick: 'Visual pattern recognition anomaly (viewer pauses to inspect screenshot).',
      category: 'Unsolved Mystery',
      estimatedReplayRate: '142% Replay Rate'
    },
    {
      id: 'spark_02',
      title: 'The Solitary Sound at the Bottom of the Mariana Trench',
      hookParadox: 'In 2024, oceanographers lowered a titanium hydrophone 36,000 feet down. It recorded this.',
      curiosityTrigger: 'Sound starts as rhythmic rhythmic tapping, then mimics human Morse code.',
      cliffhangerEnding: 'The message spelled out the exact coordinates of the research ship overhead.',
      psychologicalTrick: 'Audio frequency illusion that requires headphones for maximum immersion.',
      category: 'Mind Bending',
      estimatedReplayRate: '158% Replay Rate'
    },
    {
      id: 'spark_03',
      title: 'The Psychological Reason You Cannot Remember 99% of Dreams',
      hookParadox: 'Your brain actively erases your dreams 5 seconds after waking. Here is why it has to.',
      curiosityTrigger: 'If you remembered your dreams as clearly as reality, your nervous system would crash.',
      cliffhangerEnding: 'Tonight, try looking at your hands before you fall asleep. If they have 6 fingers, you are already awake.',
      psychologicalTrick: 'Actionable somatic suggestion (primes viewer for tonight\'s sleep).',
      category: 'Human Nature',
      estimatedReplayRate: '130% Replay Rate'
    }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playSoundEffect('pulse', 0.2);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    playSoundEffect('whoosh', 0.3);

    setTimeout(() => {
      setIsSimulating(false);
      playSoundEffect('chime', 0.5);
    }, 1200);
  };

  // =========================================================================
  // NO-CLUTTER SCREEN MODE (CINEMA ZEN THEATER FOR FILM LOOPS)
  // =========================================================================
  if (isNoClutterMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none overflow-hidden cursor-default">
        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-slate-900/60 via-black to-black pointer-events-none" />

        {/* Cinematic Film Loop Canvas */}
        <div className="relative z-10 w-full max-w-[420px] aspect-[9/16] bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/60 flex flex-col justify-between p-6">
          {/* Subtle Top Indicator (Minimalist) */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlayingFilm ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
              <span>{sampleShortFilm.title}</span>
            </span>
            <span>{sampleShortFilm.genre}</span>
          </div>

          {/* Center Visual Storyboard Ambient Mock */}
          <div className="space-y-4 my-auto text-center px-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shadow-inner">
              <Film className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">{sampleShortFilm.title}</h3>
              <p className="text-xs text-zinc-400 mt-1 italic">&quot;{sampleShortFilm.logline}&quot;</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-300 font-mono text-left leading-relaxed">
              <span className="text-indigo-400 font-bold block mb-1">▶ Loop Technique:</span>
              {sampleShortFilm.seamlessLoopTechnique}
            </div>
          </div>

          {/* Minimalist Bottom Transport Control */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsPlayingFilm(!isPlayingFilm);
                  playSoundEffect('pulse', 0.2);
                }}
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white cursor-pointer"
                title={isPlayingFilm ? 'Pause Loop' : 'Play Loop'}
              >
                {isPlayingFilm ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              </button>

              <button
                onClick={() => {
                  setIsLooping(!isLooping);
                  playSoundEffect('pulse', 0.2);
                }}
                className={`p-1.5 rounded-lg border text-[11px] font-mono flex items-center gap-1 cursor-pointer ${
                  isLooping 
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
                title="Toggle Infinite Seamless Loop"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Loop {isLooping ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Exit Clean Screen Button */}
            <button
              onClick={() => {
                setIsNoClutterMode(false);
                playSoundEffect('whoosh', 0.2);
              }}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold transition"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Exit No-Clutter Screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STANDARD A/B TEST MANAGER VIEW
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-950 via-purple-950/30 to-indigo-950/20 border border-purple-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
            <Split className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                Simulated Engagement &amp; Predictive Retention Suite
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                AI Engagement Modeling
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              A/B Test Manager, Short Films &amp; No-Clutter Loops
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              Upload two variations of a Short&apos;s metadata and creative assets to predict viewer retention dropoffs 
              before uploading to YouTube. Craft captivating short films and enjoy distraction-free theater loops.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => {
              setIsNoClutterMode(true);
              playSoundEffect('whoosh', 0.3);
            }}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-zinc-900 hover:bg-zinc-800 text-white border border-purple-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Maximize2 className="w-4 h-4 text-purple-400" />
            <span>No-Clutter Theater Mode</span>
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 hover:from-purple-400 hover:to-indigo-300 text-white transition flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Running Neural Simulation...' : 'Run Simulated A/B Test'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Switcher between Sub-Features */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveSubTab('ab_test'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'ab_test'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Split className="w-4 h-4 text-purple-300" />
            <span>A/B Variation Testing</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Retention Modeling
            </span>
          </button>

          <button
            onClick={() => { setActiveSubTab('short_films'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'short_films'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 text-indigo-300" />
            <span>Short Films Generator</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              3-Act Narrative
            </span>
          </button>

          <button
            onClick={() => { setActiveSubTab('interesting_content'); playSoundEffect('pulse', 0.2); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'interesting_content'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Interesting Content Sparks</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Curiosity Loops
            </span>
          </button>
        </div>

        <div className="text-[11px] text-zinc-400 pr-3 font-mono hidden md:block">
          Payout Linked: <strong className="text-emerald-400">Sort Code 60-84-64</strong> (Joseph Paul Woodside)
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: A/B TEST VARIATIONS & ENGAGEMENT PREDICTOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'ab_test' && (
        <div className="space-y-6">
          {/* Dual Column Variations Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* VARIATION A CARD */}
            <div className={`p-6 rounded-3xl border transition-all space-y-5 ${
              simulationResult.winnerId === 'A'
                ? 'bg-zinc-900/90 border-purple-500/60 shadow-xl'
                : 'bg-zinc-900/70 border-zinc-800'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 font-mono font-bold flex items-center justify-center text-xs">
                    A
                  </span>
                  <h3 className="text-sm font-bold text-white">Variation A: Direct Benefit Hook</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  Control Version
                </span>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 flex items-center justify-between">
                  <span>Short Title (Under 60 chars)</span>
                  <span className="text-[10px] font-mono text-zinc-500">{varA.title.length}/60</span>
                </label>
                <input
                  type="text"
                  value={varA.title}
                  onChange={(e) => setVarA({ ...varA, title: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* 3-Second Opening Hook */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400">First 3 Seconds Opening Hook</label>
                <textarea
                  rows={2}
                  value={varA.hook}
                  onChange={(e) => setVarA({ ...varA, hook: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 outline-none focus:border-purple-500 transition resize-none"
                />
              </div>

              {/* Creative Settings: Sound & Pacing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">Soundtrack &amp; BPM</span>
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>{varA.soundStyle}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">Pacing &amp; Cuts</span>
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-purple-400" />
                    <span>{varA.pacing}</span>
                  </div>
                </div>
              </div>

              {/* Predicted Metrics for A */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <span className="text-[11px] font-bold uppercase text-zinc-400 block">
                  Simulated Retention Metrics (A):
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 block">30s Retention</span>
                    <span className="text-sm font-bold text-zinc-300">{simulationResult.variationA.predictedRetention30s}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 block">View-Through Rate</span>
                    <span className="text-sm font-bold text-zinc-300">{simulationResult.variationA.predictedVtr}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 block">Hook Velocity</span>
                    <span className="text-sm font-bold text-zinc-300">{simulationResult.variationA.hookVelocityScore}/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VARIATION B CARD */}
            <div className={`p-6 rounded-3xl border transition-all space-y-5 ${
              simulationResult.winnerId === 'B'
                ? 'bg-zinc-900/90 border-emerald-500/70 shadow-2xl ring-1 ring-emerald-500/40'
                : 'bg-zinc-900/70 border-zinc-800'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500 text-zinc-950 font-mono font-black flex items-center justify-center text-xs">
                    B
                  </span>
                  <h3 className="text-sm font-bold text-white">Variation B: Curiosity Paradox (Viral)</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <Award className="w-3 h-3" /> Predicted Winner (+52% Push)
                </span>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 flex items-center justify-between">
                  <span>Short Title (Under 60 chars)</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{varB.title.length}/60</span>
                </label>
                <input
                  type="text"
                  value={varB.title}
                  onChange={(e) => setVarB({ ...varB, title: e.target.value })}
                  className="w-full bg-zinc-950 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white outline-none focus:border-emerald-500 transition"
                />
              </div>

              {/* 3-Second Opening Hook */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400">First 3 Seconds Opening Hook</label>
                <textarea
                  rows={2}
                  value={varB.hook}
                  onChange={(e) => setVarB({ ...varB, hook: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 outline-none focus:border-emerald-500 transition resize-none"
                />
              </div>

              {/* Creative Settings: Sound & Pacing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">Soundtrack &amp; BPM</span>
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{varB.soundStyle}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">Pacing &amp; Cuts</span>
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{varB.pacing}</span>
                  </div>
                </div>
              </div>

              {/* Predicted Metrics for B */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-3">
                <span className="text-[11px] font-bold uppercase text-emerald-400 block">
                  Simulated Retention Metrics (B):
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/30">
                    <span className="text-[9px] text-zinc-500 block">30s Retention</span>
                    <span className="text-sm font-black text-emerald-400">+{simulationResult.variationB.predictedRetention30s}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/30">
                    <span className="text-[9px] text-zinc-500 block">View-Through Rate</span>
                    <span className="text-sm font-black text-emerald-400">{simulationResult.variationB.predictedVtr}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-emerald-500/30">
                    <span className="text-[9px] text-zinc-500 block">Hook Velocity</span>
                    <span className="text-sm font-black text-emerald-400">{simulationResult.variationB.hookVelocityScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED RETENTION COMPARISON CANVAS & HEAD-TO-HEAD BREAKDOWN */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Second-by-Second Predicted Retention Curve Comparison
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Simulated audience attention decay curves across the 60-second vertical Shorts playback window.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-3 h-1 bg-zinc-500 rounded-full" /> Variation A (36% 30s)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-3 h-1 bg-emerald-400 rounded-full" /> Variation B (55% 30s)
                </span>
              </div>
            </div>

            {/* Retention Bar Graph Visualizer */}
            <div className="space-y-3">
              {simulationResult.variationB.retentionCurve.map((pointB, idx) => {
                const pointA = simulationResult.variationA.retentionCurve[idx];
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">
                        Second {pointB.second}s {pointB.label && `(${pointB.label})`}
                      </span>
                      <div className="flex gap-4">
                        <span className="text-zinc-500">A: {pointA?.retentionPercent}%</span>
                        <span className="text-emerald-400 font-bold">B: {pointB.retentionPercent}% (+{pointB.retentionPercent - (pointA?.retentionPercent || 0)}%)</span>
                      </div>
                    </div>

                    <div className="h-2.5 w-full bg-zinc-950 rounded-full overflow-hidden flex gap-1">
                      <div 
                        className="bg-emerald-400 h-full rounded-full transition-all"
                        style={{ width: `${pointB.retentionPercent}%` }}
                      />
                      <div 
                        className="bg-zinc-600 h-full rounded-full opacity-40 transition-all"
                        style={{ width: `${Math.max(0, (pointA?.retentionPercent || 0) - pointB.retentionPercent)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Executive Summary & Actionable Recommendations */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                🧠 Algorithmic Executive Verdict:
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {simulationResult.executiveSummary}
              </p>

              <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  3 Final High-Retention Polishes Before YouTube Upload:
                </span>
                {simulationResult.actionablePolishes.map((polish, idx) => (
                  <div key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{polish}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct 1-Click Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-zinc-400 font-mono">
                Pushing winner &quot;Variation B&quot; will configure YouTube Direct metadata &amp; Pinned CTA.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    if (onSendToSimulator) {
                      onSendToSimulator({
                        title: varB.title,
                        hook: varB.hook,
                        sound: varB.soundStyle
                      });
                    }
                    playSoundEffect('pulse', 0.2);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition flex items-center gap-1.5 cursor-pointer border border-zinc-700"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Verify in CapCut Safe-Zone</span>
                </button>

                <button
                  onClick={() => {
                    if (onSendToUploader) {
                      onSendToUploader({
                        title: varB.title,
                        description: `${varB.hook}\n\n${varB.script}\n\n${varB.pinnedCta}\n\n#shorts #finance #wise #payouts`,
                        tags: ['shorts', 'finance', 'loophole', 'money', 'wise']
                      });
                    }
                    playSoundEffect('chime', 0.5);
                  }}
                  className="px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Upload className="w-4 h-4" />
                  <span>Push Winner to YouTube Direct</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: SHORT FILMS GENERATOR & SCREENPLAY STORYBOARD */}
      {/* ========================================================================= */}
      {activeSubTab === 'short_films' && (
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {sampleShortFilm.genre}
                  </span>
                  <span className="text-xs text-zinc-500">•</span>
                  <span className="text-xs text-zinc-400">{sampleShortFilm.runtimeSeconds}s Runtime</span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">{sampleShortFilm.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 italic">
                  Logline: &quot;{sampleShortFilm.logline}&quot;
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsNoClutterMode(true);
                    playSoundEffect('whoosh', 0.3);
                  }}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Watch in No-Clutter Screen</span>
                </button>
              </div>
            </div>

            {/* 3-Act Structure Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">Act I: Setup &amp; Premise</span>
                <p className="text-xs text-zinc-300 leading-snug">{sampleShortFilm.threeActBeats.act1_setup}</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">Act II: Escalation &amp; Conflict</span>
                <p className="text-xs text-zinc-300 leading-snug">{sampleShortFilm.threeActBeats.act2_escalation}</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Act III: Climax &amp; Loop Twist</span>
                <p className="text-xs text-zinc-300 leading-snug">{sampleShortFilm.threeActBeats.act3_twistOrLoop}</p>
              </div>
            </div>

            {/* Scene-by-Scene Screenplay Directions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Scene-by-Scene Shot List &amp; Direction:
              </h4>

              <div className="space-y-3">
                {sampleShortFilm.scenes.map((scene) => (
                  <div key={scene.sceneNumber} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-2">
                        <span>Scene {scene.sceneNumber}</span>
                        <span className="text-zinc-600">•</span>
                        <span>{scene.timecode}</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {scene.shotType}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      <strong className="text-zinc-400 font-normal">Visual:</strong> {scene.visualDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                      <div className="p-2 rounded-lg bg-zinc-900 text-zinc-300">
                        <span className="text-indigo-400 font-bold block mb-0.5">Dialogue/VO:</span>
                        {scene.dialogueOrVoiceover}
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400">
                        <span className="text-purple-400 font-bold block mb-0.5">Sound FX:</span>
                        {scene.soundFx}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Screenplay Text Copy Block */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 uppercase font-mono">Full Screenplay Script</span>
                <button
                  onClick={() => handleCopy(sampleShortFilm.scriptFullText, 'script_full')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-mono flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'script_full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Script</span>
                </button>
              </div>

              <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed bg-zinc-900 p-3 rounded-xl border border-zinc-800/80">
                {sampleShortFilm.scriptFullText}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: INTERESTING CONTENT SPARKS & CURIOSITY LOOPS */}
      {/* ========================================================================= */}
      {activeSubTab === 'interesting_content' && (
        <div className="space-y-6">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Interesting Content Sparks &amp; Infinite Curiosity Loops
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Psychological hooks, paradoxes, and cliffhanger frameworks engineered for 130%+ replay rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interestingSparks.map((spark) => (
              <div
                key={spark.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 hover:border-zinc-700 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      {spark.category}
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-400">
                      {spark.estimatedReplayRate}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">{spark.title}</h4>

                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold block uppercase">The Paradox Hook:</span>
                    <p className="text-xs text-zinc-300 italic">&quot;{spark.hookParadox}&quot;</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <span className="text-[10px] text-purple-400 font-bold block uppercase">Cliffhanger Ending:</span>
                    <p className="text-xs text-zinc-300">{spark.cliffhangerEnding}</p>
                  </div>

                  <div className="text-[11px] text-zinc-500 font-mono">
                    Psychological Trigger: {spark.psychologicalTrick}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 space-y-2">
                  <button
                    onClick={() => {
                      setVarB(prev => ({
                        ...prev,
                        title: spark.title,
                        hook: spark.hookParadox,
                        script: `${spark.hookParadox} ${spark.curiosityTrigger} ${spark.cliffhangerEnding}`
                      }));
                      setActiveSubTab('ab_test');
                      playSoundEffect('chime', 0.4);
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-700"
                  >
                    <span>Load as Variation B in A/B Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
