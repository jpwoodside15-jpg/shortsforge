export interface DirectorStylePreset {
  id: string;
  name: string;
  director: string;
  era: string;
  signature: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    description: string;
  };
  cameraMovement: string;
  lightingSetup: string;
  soundDesign: string;
  pacing: string;
  aspectRatioDefault: '9:16' | '16:9';
  visualPromptKeywords: string[];
  sampleVisualTitle: string;
  previewBgGradient: string;
}

export interface StudioStylePreset {
  id: string;
  name: string;
  studio: string;
  badge: string;
  badgeColor: string;
  renderEngine: string;
  textureQuality: string;
  particleAtmosphere: 'embers' | 'dust-motes' | 'rain-reflections' | 'stardust' | 'sparks' | 'none';
  lensDistortion: string;
  promptEnhancers: string[];
  bannerGradient: string;
}

export interface FacelessRemixScene {
  sceneNumber: number;
  timeRange: string;
  sceneType: 'hook' | 'tension' | 'breakdown' | 'climax' | 'loop-cta';
  spokenNarration: string;
  onScreenText: string;
  bRollVisualPrompt: string;
  cameraDirection: string;
  audioSfxCue: string;
  retentionTactic: string;
}

export interface MarketReadyRemixPackage {
  id: string;
  sourceCompetitorTitle: string;
  sourceCompetitorHandle: string;
  sourceOriginalViews: string;
  remixAngle: string;
  directorStyle: string;
  studioStyle: string;
  totalDurationSec: number;
  estWordCount: number;
  fullFacelessScript: string;
  scenes: FacelessRemixScene[];
  voiceoverDirection: {
    archetype: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
    cadence: string;
    mood: string;
    targetWpm: number;
  };
  seoPackage: {
    viralTitles: { title: string; hookType: string; predictedCtr: string }[];
    youtubeDescription: string;
    hashtags: string[];
    pinnedComment: string;
    recommendedSoundtrack: string;
  };
  cinematicSpecs: {
    resolution: '4K UHD (2160x3840)' | '2K QHD (1440x2560)' | '1080p FHD (1080x1920)';
    targetFps: 24 | 30 | 60;
    lutName: string;
    grainIntensity: number;
    bloomIntensity: number;
    flareType: string;
  };
}

export const FAMOUS_DIRECTOR_PRESETS: DirectorStylePreset[] = [
  {
    id: 'nolan',
    name: 'Christopher Nolan',
    director: 'Christopher Nolan',
    era: 'Dark Knight / Oppenheimer / Interstellar',
    signature: '70mm IMAX Practical Scale & Cold Ticking Tension',
    colorPalette: {
      primary: '#0e1726',
      secondary: '#475569',
      accent: '#f59e0b',
      description: 'Cold slate-blues, desaturated steel tones with high-contrast warm amber tungsten accents'
    },
    cameraMovement: 'Expansive IMAX Wide Pan into Rapid Vertigo Push',
    lightingSetup: 'High-contrast naturalistic side lighting with volumetric cold atmospheric haze',
    soundDesign: 'Ludwig Göransson / Hans Zimmer style escalating Shepard tone ticking clock + brass Braam',
    pacing: 'Relentless cross-cutting momentum with zero wasted frames',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['70mm IMAX film stock', 'heavy authentic grain', 'volumetric cold mist', 'practical lighting', 'monumental scale', 'tactile realism', 'photorealistic 8k'],
    sampleVisualTitle: 'IMAX Monolithic Scale & Practical Clockwork',
    previewBgGradient: 'from-slate-950 via-zinc-900 to-amber-950/40'
  },
  {
    id: 'anderson',
    name: 'Wes Anderson',
    director: 'Wes Anderson',
    era: 'Grand Budapest / Asteroid City / French Dispatch',
    signature: 'Meticulous Center-Point Symmetry & Pastel Nostalgia',
    colorPalette: {
      primary: '#fef08a',
      secondary: '#f472b6',
      accent: '#38bdf8',
      description: 'Warm pastel yellow, vintage blush pink, robin-egg cyan, meticulously coordinated flat hues'
    },
    cameraMovement: 'Exact 90-degree whip-pan and perfectly locked horizontal lateral tracking dolly',
    lightingSetup: 'Soft flat high-key storybook illumination without harsh shadows',
    soundDesign: 'Alexandre Desplat cheerful harpsichord, vintage xylophone plucks, and dry vinyl snare',
    pacing: 'Quirky deadpan rhythm, instantaneous geometric cuts',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['perfect axial symmetry', 'storybook pastel palette', 'diorama miniature aesthetic', 'Futura Bold titling aesthetic', 'vintage 1970s Kodak print', 'flat perspective'],
    sampleVisualTitle: 'Geometric Pastel Diorama & Axial Symmetry',
    previewBgGradient: 'from-amber-950/60 via-pink-950/40 to-yellow-950/50'
  },
  {
    id: 'villeneuve',
    name: 'Denis Villeneuve',
    director: 'Denis Villeneuve',
    era: 'Dune: Part Two / Blade Runner 2049 / Arrival',
    signature: 'Monolithic Brutalism & Ominous Desert Scale',
    colorPalette: {
      primary: '#78350f',
      secondary: '#1c1917',
      accent: '#06b6d4',
      description: 'Deep scorched sand ochre, obsidian black, minimalist monolithic stone with piercing cyan accents'
    },
    cameraMovement: 'Ultra-slow hypnotic push-in establishing intimidating architectural scale',
    lightingSetup: 'Harsh celestial sunbeam through dense sandstorms, silhouetted monumental geometry',
    soundDesign: 'Sub-bass planetary hum, ancient vocal chanting, and visceral sand distortion',
    pacing: 'Awe-inspiring deliberate dread building into overwhelming sensory crescendo',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['colossal scale brutalism', 'desert atmospheric dust', 'harsh rim sunlight', 'cinematic minimalism', 'Roger Deakins framing', 'obsidian monolith', '8k photoreal'],
    sampleVisualTitle: 'Monolithic Brutalist Dune & Atmospheric Sub-Bass',
    previewBgGradient: 'from-amber-950 via-stone-950 to-orange-950/50'
  },
  {
    id: 'tarantino',
    name: 'Quentin Tarantino',
    director: 'Quentin Tarantino',
    era: 'Pulp Fiction / Kill Bill / Django Unchained',
    signature: 'Hyper-Saturated 35mm Technicolor & Punchy Snap Zooms',
    colorPalette: {
      primary: '#991b1b',
      secondary: '#eab308',
      accent: '#ffffff',
      description: 'Blood-red crimson, retro mustard yellow, high-contrast jet black and stark white'
    },
    cameraMovement: 'Violent rapid crash zoom and classic low-angle trunk shot looking upward',
    lightingSetup: 'Punchy 1970s drive-in cinema tungsten with stark rim separation',
    soundDesign: 'Crackling vinyl needle-drop surf rock riff followed by dramatic silence and sudden gunshot whoosh',
    pacing: 'Tense verbal standoff followed by explosive visual ignition',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['35mm Technicolor film grain', 'vintage retro grain', 'low-angle hero shot', 'crash zoom dynamics', 'saturated color', 'cinematic grindhouse texture'],
    sampleVisualTitle: '35mm Grindhouse Technicolor & Crash-Zoom Energy',
    previewBgGradient: 'from-red-950 via-zinc-950 to-yellow-950/40'
  },
  {
    id: 'fincher',
    name: 'David Fincher',
    director: 'David Fincher',
    era: 'Fight Club / The Social Network / Se7en',
    signature: 'Clinical Precision, Moody Tungsten & Desaturated Green-Cyan',
    colorPalette: {
      primary: '#064e3b',
      secondary: '#18181b',
      accent: '#ca8a04',
      description: 'Squalid sickly green-cyan shadows, institutional fluorescent amber, clinical dark graphite'
    },
    cameraMovement: 'Robotic fluid camera tracking perfectly locked to subject velocity without vibration',
    lightingSetup: 'Low-key chipped paint practicals, sickly computer monitor bounce, moody rim silhouette',
    soundDesign: 'Trent Reznor ambient distorted industrial pulses and crisp mechanical key clicks',
    pacing: 'Obsessive psychological momentum, relentless intellectual dissection',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['Fincher clinical camera motion', 'sickly green-yellow LUT', 'low-key moody chiaroscuro', 'desaturated cyan', 'precision smooth tracking', 'hyper-sharp 8k'],
    sampleVisualTitle: 'Clinical Psychological Noir & Fluorescent Shadow',
    previewBgGradient: 'from-emerald-950 via-zinc-950 to-teal-950/50'
  },
  {
    id: 'deltoro',
    name: 'Guillermo del Toro',
    director: 'Guillermo del Toro',
    era: 'Pan\'s Labyrinth / Shape of Water / Crimson Peak',
    signature: 'Gothic Dark Fairy Tale & Bioluminescent Amber-Cobalt',
    colorPalette: {
      primary: '#1e3a8a',
      secondary: '#854d0e',
      accent: '#10b981',
      description: 'Subterranean cobalt blue, antique clockwork brass amber, and spectral emerald glow'
    },
    cameraMovement: 'Gentle arching crane sweep revealing ornate layered backgrounds and hidden mechanisms',
    lightingSetup: 'Ethereal volumetric moonlight filtering through rusted gothic archways and aquatic haze',
    soundDesign: 'Whispering wind, ticking antique brass gears, and haunting music box melody',
    pacing: 'Enchanting macabre wonder turning into spine-tingling revelation',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['gothic dark fantasy', 'bioluminescent spores', 'clockwork brass filigree', 'cobalt and amber contrast', 'ethereal volumetric fog', 'del Toro aesthetic'],
    sampleVisualTitle: 'Gothic Dark Fairy Tale & Clockwork Bioluminescence',
    previewBgGradient: 'from-blue-950 via-amber-950/60 to-emerald-950/40'
  },
  {
    id: 'bay',
    name: 'Michael Bay',
    director: 'Michael Bay',
    era: 'Transformers / Bad Boys / Armageddon',
    signature: 'Sun-Drenched Golden Hour Hero Spin & Anamorphic Explosions',
    colorPalette: {
      primary: '#ea580c',
      secondary: '#0284c7',
      accent: '#fbbf24',
      description: 'Ultra-saturated Miami sunset orange and electric sky blue with explosive golden embers'
    },
    cameraMovement: 'Low-angle 360-degree orbital hero spin while camera tilts up towards the blinding sun',
    lightingSetup: 'Blinding golden-hour sunset backlighting with blazing horizontal blue anamorphic streaks',
    soundDesign: 'High-velocity jet engine flyby, sub-bass whoosh, and metallic transformer gear clank',
    pacing: 'Adrenaline-fueled sensory overload with micro-cuts every 0.8 seconds',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['Michael Bay 360 hero spin', 'golden hour sun flare', 'anamorphic blue streak', 'debris particles', 'hyper-saturated teal and orange', 'maximum adrenaline'],
    sampleVisualTitle: 'Golden-Hour Hero Orbit & Anamorphic Flares',
    previewBgGradient: 'from-orange-950 via-zinc-950 to-sky-950/50'
  },
  {
    id: 'kubrick',
    name: 'Stanley Kubrick',
    director: 'Stanley Kubrick',
    era: '2001: A Space Odyssey / The Shining / Eyes Wide Shut',
    signature: 'One-Point Perspective Corridor & Hypnotic Steadicam Tracking',
    colorPalette: {
      primary: '#991b1b',
      secondary: '#f8fafc',
      accent: '#0284c7',
      description: 'Sterile surgical white, terrifying geometric crimson red carpet, and deep infinite void'
    },
    cameraMovement: 'Hypnotic slow push-in down a symmetrical corridor that feels mathematically infinite',
    lightingSetup: 'Evenly diffused translucent ceiling panels creating uncanny shadowless hyper-clarity',
    soundDesign: 'Eerie classical waltz orchestra slowly distorting into high-pitched monolithic dissonance',
    pacing: 'Hypnotic, chillingly calm pacing that commands total psychological surrender',
    aspectRatioDefault: '9:16',
    visualPromptKeywords: ['one-point perspective', 'infinite symmetrical corridor', 'surgical stark lighting', 'Kubrickian geometric framing', 'clinical perfection', 'surreal dread'],
    sampleVisualTitle: 'One-Point Infinite Perspective & Chilling Symmetry',
    previewBgGradient: 'from-red-950 via-zinc-900 to-slate-950'
  }
];

export const STUDIO_STYLE_PRESETS: StudioStylePreset[] = [
  {
    id: 'a24',
    name: 'A24 Indie Art-House',
    studio: 'A24',
    badge: '16mm Analog Noir',
    badgeColor: 'border-stone-500/30 text-stone-300 bg-stone-500/10',
    renderEngine: '16mm Kodak Film Simulation',
    textureQuality: 'Visible organic grain, soft highlights, heavy contrast roll-off',
    particleAtmosphere: 'dust-motes',
    lensDistortion: 'Vintage 1968 Cooke Panchro spherical distortion',
    promptEnhancers: ['16mm Kodak film scan', 'natural moody chiaroscuro', 'A24 minimalist framing', 'raw documentary texture', 'unsettling negative space'],
    bannerGradient: 'from-stone-900 to-zinc-950'
  },
  {
    id: 'pixar-3d',
    name: 'Pixar & DreamWorks 3D',
    studio: 'Pixar / DreamWorks',
    badge: 'Stylized 3D CGI',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
    renderEngine: 'RenderMan Subsurface Scattering',
    textureQuality: 'Velvety skin shaders, vibrant tactile materials, rich specular bounce',
    particleAtmosphere: 'stardust',
    lensDistortion: 'Clean virtual 35mm prime with creamy spherical bokeh balls',
    promptEnhancers: ['Pixar animation studio quality', 'subsurface scattering', 'warm volumetric bounce light', 'stylized high-end 3D CGI', 'ultra-tactile details'],
    bannerGradient: 'from-blue-900/60 to-purple-950'
  },
  {
    id: 'marvel-imax',
    name: 'Marvel / IMAX Blockbuster',
    studio: 'Marvel Studios / IMAX',
    badge: 'Epic 8K VFX',
    badgeColor: 'border-red-500/30 text-red-300 bg-red-500/10',
    renderEngine: 'Industrial Light & Magic CGI Suite',
    textureQuality: 'Hyper-detailed nanotech textures, explosive energy particles, dynamic smoke sims',
    particleAtmosphere: 'sparks',
    lensDistortion: 'Arri Alexa 65 anamorphic streak with corner vignette',
    promptEnhancers: ['Marvel blockbuster VFX', 'unreal engine 5.4 render', 'hyper-detailed cinematic composition', 'volumetric energy discharge', '8k IMAX clarity'],
    bannerGradient: 'from-red-900/60 to-zinc-950'
  },
  {
    id: 'ghibli-anime',
    name: 'Studio Ghibli Anime',
    studio: 'Studio Ghibli',
    badge: 'Hand-Painted Cel',
    badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    renderEngine: 'Hand-Crafted Watercolor Cel Rendering',
    textureQuality: 'Lush painterly brushwork, billowy cumulus clouds, dappled sunlight on moss',
    particleAtmosphere: 'stardust',
    lensDistortion: 'Clean Japanese anime projection with soft ethereal glow filters',
    promptEnhancers: ['Hayao Miyazaki style', 'Studio Ghibli hand-painted watercolor background', 'nostalgic Japanese anime aesthetic', 'whimsical atmospheric lighting'],
    bannerGradient: 'from-emerald-900/60 to-teal-950'
  },
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077 & Blade Runner',
    studio: 'CD Projekt RED / Alcon Ent',
    badge: 'Ray-Traced Neo-Tokyo',
    badgeColor: 'border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/10',
    renderEngine: 'Full Path-Tracing Cyber Overdrive',
    textureQuality: 'Wet pavement reflections, iridescent chrome armor, holographic HUD glitch',
    particleAtmosphere: 'rain-reflections',
    lensDistortion: 'Anamorphic flare with chromatic aberration edge splitting',
    promptEnhancers: ['Cyberpunk 2077 overdrive mode', 'rain-slicked neon street', 'holographic advertising HUD', 'volumetric pink and cyan fog', 'Blade Runner 2049 aesthetic'],
    bannerGradient: 'from-fuchsia-950 to-indigo-950'
  },
  {
    id: 'natgeo-8k',
    name: 'National Geographic 8K Master',
    studio: 'National Geographic Wild',
    badge: 'Hyper-Real 8K HDR',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    renderEngine: 'Red V-Raptor 8K VV Real-World Sensor',
    textureQuality: 'Microscopic water droplet refraction, feather texture, pristine mountain granite',
    particleAtmosphere: 'dust-motes',
    lensDistortion: 'Leica Summilux-C ultra-sharp corner-to-corner fidelity',
    promptEnhancers: ['National Geographic wildlife master shot', 'natural 8k HDR sunlight', 'extreme macro texture', 'unreal photorealism', 'sharp focus depth of field'],
    bannerGradient: 'from-yellow-950 to-stone-950'
  }
];

export const FACELESS_REMIX_ANGLES = [
  {
    id: 'contrarian-debunk',
    title: 'The Contrarian Truth Debunk',
    hookPattern: '“Everything you were taught about [Premise] is a complete mathematical lie.”',
    description: 'Flips the competitor video on its head by revealing what they didn’t tell the audience, creating instant moral/financial curiosity.',
    viralityMultiplier: '4.8x Outlier Velocity',
    badge: 'Highest Retention',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30'
  },
  {
    id: 'behind-the-curtain',
    title: 'The $0 vs $10,000 Forensic Breakdown',
    hookPattern: '“This creator generated 42 million views, but here is the 1 trick they hid in plain sight.”',
    description: 'Deconstructs the competitor’s video as an insider case study, teaching viewers the hidden psychological trick.',
    viralityMultiplier: '3.9x Outlier Velocity',
    badge: 'High Value / Saves',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'dark-psychology',
    title: 'Forensic Dark Psychology & Dopamine Loop',
    hookPattern: '“There is a reason you couldn’t scroll away from this video. Look closely at second 4.”',
    description: 'Breaks down the neurological retention trigger used in the competitor’s video, keeping the viewer hooked on their own screen.',
    viralityMultiplier: '4.4x Outlier Velocity',
    badge: 'Curiosity Spike',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'algorithmic-glitch',
    title: 'The Algorithmic Cheat Code',
    hookPattern: '“YouTube just pushed this to 10M people because of one 3-second pacing loophole.”',
    description: 'Frames the competitor’s success as a repeatable technical loophole that faceless creators can copy today.',
    viralityMultiplier: '3.6x Outlier Velocity',
    badge: 'Creator Growth',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'cinematic-reimagining',
    title: 'The Cinematic 4K Storytelling Reimagining',
    hookPattern: '“Imagine if [Topic] was directed by Christopher Nolan. Here is what actually happened.”',
    description: 'Transforms the competitor’s simple premise into a high-octane 30-second cinematic experience with epic visual scale.',
    viralityMultiplier: '5.2x Outlier Velocity',
    badge: 'Visual Masterpiece',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  }
];

export function generateLocalContentBridgePackage(
  videoTitle: string,
  competitorHandle: string,
  hookQuote: string,
  directorId: string = 'nolan',
  studioId: string = 'marvel-imax',
  angleId: string = 'contrarian-debunk'
): MarketReadyRemixPackage {
  const director = FAMOUS_DIRECTOR_PRESETS.find(d => d.id === directorId) || FAMOUS_DIRECTOR_PRESETS[0];
  const studio = STUDIO_STYLE_PRESETS.find(s => s.id === studioId) || STUDIO_STYLE_PRESETS[0];
  const angle = FACELESS_REMIX_ANGLES.find(a => a.id === angleId) || FACELESS_REMIX_ANGLES[0];

  const cleanTitle = videoTitle.replace(/[#@]/g, '').slice(0, 45);

  const scenes: FacelessRemixScene[] = [
    {
      sceneNumber: 1,
      timeRange: '0.0s - 3.2s',
      sceneType: 'hook',
      spokenNarration: `Everyone fell for ${competitorHandle}'s viral hook: "${hookQuote.slice(0, 48)}..." But here is what they didn't show you.`,
      onScreenText: 'THE LIE BEHIND THIS VIRAL SHORT',
      bRollVisualPrompt: `${director.name} style extreme close-up of an ornate ticking golden timepiece shattering in slow motion, cold volumetric rim lighting, ${studio.promptEnhancers[0]}, 8k resolution, vertical 9:16`,
      cameraDirection: 'Rapid 120fps crash zoom with micro camera shake on audio drop',
      audioSfxCue: 'Sub-bass impact boom + sharp metallic clock reverse tick',
      retentionTactic: 'Belief violation + immediate visual contrast against standard competitor video'
    },
    {
      sceneNumber: 2,
      timeRange: '3.2s - 9.5s',
      sceneType: 'tension',
      spokenNarration: `Notice how in the first four seconds, your brain was locked by an open curiosity gap. They aren't selling the result; they are weaponizing loss aversion.`,
      onScreenText: 'WEAPONIZED LOSS AVERSION',
      bRollVisualPrompt: `Atmospheric ${director.name} wide shot of a solitary silhouette standing inside a massive monolithic chamber, beam of celestial sunbeam, ${studio.promptEnhancers[1]}, hyper-detailed texture`,
      cameraDirection: `${director.cameraMovement}, smooth gimbal velocity`,
      audioSfxCue: 'Low frequency drone swell (35Hz) + vinyl tape stop',
      retentionTactic: 'Explaining viewer\'s own internal sensation keeps them hooked past the 5-second drop-off curve'
    },
    {
      sceneNumber: 3,
      timeRange: '9.5s - 20.0s',
      sceneType: 'breakdown',
      spokenNarration: `If you want to pull 10 million views without showing your face: duplicate their 3-frame pacing rule. Cut your scene every 1.4 seconds, swap your B-roll angle, and pitch-shift your ambient SFX.`,
      onScreenText: 'THE 3-FRAME PACING SECRET',
      bRollVisualPrompt: `Holographic glowing algorithmic data streams swirling in dark rain-slicked city reflection, ${director.visualPromptKeywords.slice(0, 2).join(', ')}, ${studio.renderEngine}, ultra crisp 4k`,
      cameraDirection: 'Orbital 180-degree sweep around glowing kinetic typography',
      audioSfxCue: 'Rapid whoosh transitions at each sentence clause + heart pulse riser',
      retentionTactic: 'High-density actionable tactical value prompts viewers to rewatch and save the short'
    },
    {
      sceneNumber: 4,
      timeRange: '20.0s - 26.5s',
      sceneType: 'climax',
      spokenNarration: `Top faceless channels use this exact blueprint to print six figures in affiliate commissions while basic creators get zero views.`,
      onScreenText: 'HOW FACELESS CREATORS PRINT $10K/MO',
      bRollVisualPrompt: `Heroic cinematic master shot of towering crystal metropolis sunrise, golden radiant god rays bursting through clouds, ${director.lightingSetup}, ${studio.promptEnhancers[2]}`,
      cameraDirection: 'Expansive vertical tilt upward into blinding lens flare',
      audioSfxCue: 'Orchestral brass braam crescendo + sparkling cinematic chime',
      retentionTactic: 'Financial leverage payoff satisfies the curiosity loop opened in scene 1'
    },
    {
      sceneNumber: 5,
      timeRange: '26.5s - 30.0s',
      sceneType: 'loop-cta',
      spokenNarration: `Save this before the algorithm buries it, because if you missed the first second...`,
      onScreenText: 'SAVE & REWATCH 🔁',
      bRollVisualPrompt: `Infinite geometric corridor with pulsing amber neon doorway snapping shut, ${director.visualPromptKeywords[0]}, seamless visual loop point`,
      cameraDirection: 'Fast forward pull-out that snaps seamlessly back into Scene 1 frame 1',
      audioSfxCue: 'Heartbeat cut + match-cut woosh into Scene 1',
      retentionTactic: 'Seamless infinite audio/video sentence loop inflates average view duration past 100%'
    }
  ];

  const fullScript = scenes.map(s => `[${s.timeRange}] ${s.spokenNarration}`).join('\n\n');

  return {
    id: `bridge-${Date.now()}`,
    sourceCompetitorTitle: videoTitle,
    sourceCompetitorHandle: competitorHandle,
    sourceOriginalViews: '42.8M Views',
    remixAngle: angle.title,
    directorStyle: director.name,
    studioStyle: studio.name,
    totalDurationSec: 30,
    estWordCount: 74,
    fullFacelessScript: fullScript,
    scenes,
    voiceoverDirection: {
      archetype: 'Fenrir',
      cadence: 'Cold, authoritative, unhurried cadence with punchy micro-pauses at key takeaways',
      mood: 'Forensic Investigative & High-Status',
      targetWpm: 148
    },
    seoPackage: {
      viralTitles: [
        { title: `The Lie Behind ${competitorHandle}'s 40M View Short`, hookType: 'Contrarian Curiosity', predictedCtr: '12.4%' },
        { title: `Why You Can't Scroll Past ${cleanTitle.slice(0, 30)}`, hookType: 'Psychological Open Loop', predictedCtr: '14.1%' },
        { title: `Faceless Channels Are Stealing This Exact Trick`, hookType: 'Insider Wealth Glitch', predictedCtr: '11.8%' }
      ],
      youtubeDescription: `We analyzed how ${competitorHandle} pulled millions of views on "${cleanTitle}" and reverse-engineered the entire 30-second pacing blueprint for faceless channels.\n\nFree creator blueprint: link in pinned comment!\n\n#shorts #facelesschannel #contentcreator #algorithm #growth`,
      hashtags: ['#shorts', '#facelesschannel', '#algorithmhacks', '#creatorgrowth'],
      pinnedComment: `Want the exact 5-step checklist to produce this in under 10 minutes? Grab our free Faceless Short Blueprint below! 👇`,
      recommendedSoundtrack: `${director.soundDesign} (95 BPM, E-Minor)`
    },
    cinematicSpecs: {
      resolution: '4K UHD (2160x3840)',
      targetFps: 30,
      lutName: director.colorPalette.description.slice(0, 24),
      grainIntensity: 35,
      bloomIntensity: 45,
      flareType: 'Anamorphic Blue Streak'
    }
  };
}
