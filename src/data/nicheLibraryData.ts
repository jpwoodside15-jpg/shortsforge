import { NicheConceptItem, AutomationSoftwareRequirement } from '../types';

export const NICHE_LIBRARY_CATALOG: NicheConceptItem[] = [
  {
    id: 'niche_kids_anim_01',
    filmTitle: 'The Clockwork Dragonfly of Willow Creek',
    niche: 'Kids Animation & 3D Fables',
    category: 'Kids Animation & 3D Fables',
    cpmBenchmark: '$18.50 - $24.80 CPM',
    cpmValue: 21.65,
    avgRetention30s: 86.4,
    viralityRating: 94,
    affiliateYieldScore: 'High (Toy licensing & bedtime audio apps)',
    logline: 'A tiny brass dragonfly awakens at twilight inside an abandoned dollhouse to save a lost lightning bug, looping back to the chime of an antique grandfather clock.',
    durationSeconds: 48,
    pacing: 'Hypnotic Continuous Loop',
    directorTone: 'Studio Ghibli meets Pixar / Warm Nocturnal Whimsy',
    soundtrackRecommendation: 'Warm orchestral celesta, gentle music box chime, muted woodwinds (72 BPM)',
    colorGrade: 'Deep twilight indigo shadows with warm golden amber bioluminescence',
    targetAudience: 'Parents & young children (Ages 3-9), global bedtime playlist audiences',
    seamlessLoopMechanism: 'The grandfather clock chimes at second 47; the dragonfly lands precisely back in its brass cradle as the opening clock tick sounds.',
    sampleThumbnailConcept: 'Glowing golden dragonfly with iridescent wings perched on an oversized Victorian cog, neon firefly reflection in its eyes',
    optimizedYoutubeMetadata: {
      title: 'The Clockwork Dragonfly 🕰️✨ (Bedtime 3D Short Film Loop) #Shorts',
      description: 'A magical 3D animated bedtime short film about a brave clockwork dragonfly discovering the secret of the twilight forest.\n\nCreated with ShortsForge AI 3D Animation Suite.\nSoundtrack: Peaceful Music Box Lullaby\nLoop for infinite calming sleep cycles.\n\n#Animation #ShortFilm #BedtimeStory #3DAnimation #PixarStyle #SatisfyingLoops',
      tags: ['3d animation', 'bedtime story', 'short film', 'pixar style', 'kids animation', 'calming loop', 'wholesome', 'hypnotic', 'fairy tale'],
      pinnedComment: '🌟 Parents & Dreamers: Did you catch the hidden brass key at second 24? Leave a comment if you want Episode 2!'
    },
    preSeededBlocks: [
      {
        id: 'block_kids_vis_01',
        type: 'visual_prompt_pack',
        title: '3D Pixar-Style Visual Prompts',
        badge: 'Unreal Engine 5 / Midjourney v6',
        description: 'Complete sequential scene prompts with volumetric twilight lighting and micro-texture brass details.',
        content: `Scene 1 (0-12s): Macro low-angle camera push through dusty Victorian attic floorboards. A miniature brass clockwork dragonfly with filigree clock-gear wings rests under an antique velvet music box. Volumetric dust motes floating in twilight window rays. 8k, Pixar octane render style.
Scene 2 (12-28s): The dragonfly's emerald crystal eyes illuminate. Tiny brass gears turn with audible clicks. It lifts into a spiraling hover, darting between oversized vintage books and silver thimbles.
Scene 3 (28-40s): Outside the arched window, a lost blue lightning bug is trapped beneath an overturned tea cup. The clockwork dragonfly wedges its needle nose under the porcelain rim and lifts it, unleashing a burst of blue sparkle.
Scene 4 (40-48s): Both creatures orbit in a joyous double-helix glow. As the antique grandfather clock begins its deep chime, the dragonfly glides back through the window, folding its wings into the cradle just as the pendulum swings.`,
        copyPayload: `/imagine prompt: a miniature brass clockwork dragonfly with filigree clock-gear wings resting under an antique velvet music box, volumetric dust motes in twilight window rays, 8k octane render, pixar character style --ar 9:16 --v 6.0`
      },
      {
        id: 'block_kids_vo_01',
        type: 'voiceover_script',
        title: 'Bedtime Nursery Narration Script',
        badge: 'British Warm Storyteller / 115 WPM',
        description: 'Paced for calming bedtime retention with rhythmic cadence and whisper-tone conclusion.',
        content: `[00:00 - 00:08 | Warm Whispered Tone]
Deep inside the quietest attic in Willow Creek, where the dust dreams in golden light... something tiny was waking up.

[00:08 - 00:22 | Playful Wonder]
Click. Whirr. Tick. Barnaby wasn't made of feathers or fur. He was wound from grandfather clock springs and three drops of starlight.

[00:22 - 00:36 | Gentle Heroic Rise]
And tonight, a little lost friend was trapped outside in the dark. Barnaby knew: clockwork hearts never fear the night.

[00:36 - 00:48 | Soft Soothing Loop Closure]
One little push... and freedom danced in blue light. Sleep now, little one. The clock is ticking... exactly on time.`,
        copyPayload: `Deep inside the quietest attic in Willow Creek, where the dust dreams in golden light... something tiny was waking up. Click. Whirr. Tick. Barnaby wasn't made of feathers or fur. He was wound from grandfather clock springs and three drops of starlight. And tonight, a little lost friend was trapped outside in the dark. Barnaby knew: clockwork hearts never fear the night. One little push... and freedom danced in blue light. Sleep now, little one. The clock is ticking... exactly on time.`
      },
      {
        id: 'block_kids_sfx_01',
        type: 'sound_design_cues',
        title: 'Hypnotic Foley & Sound Design Stems',
        badge: '3D Spatial Audio / ASMR',
        description: 'Timecode-accurate sound stems to trigger instant sleep hypnosis and high watch time.',
        content: `00:00 - 00:04: Distant 19th-century grandfather clock pendulum tick (L-to-R stereo sweep, 60 BPM).
00:08 - 00:14: Micro brass gear ratchets, miniature click-spring unwind, soft metallic hum.
00:20 - 00:26: Whoosh of filigree brass wings fluttering at high frequency, soft wind chime trail.
00:34 - 00:38: Porcelain cup clink on wooden windowsill, followed by ethereal glass chime resonance.
00:44 - 00:48: Deep warm cello drone resolve on C-Major, final pendulum strike matching loop seam.`,
        copyPayload: `Audio Stems: [Pendulum_Tick_60bpm.wav] [Brass_Gears_MicroFoley.wav] [Celesta_Lullaby_Bed.mp3] [Porcelain_Clink_Resonance.wav] [Sub_Warm_Drone_C.wav]`
      }
    ]
  },
  {
    id: 'niche_tech_ai_02',
    filmTitle: 'Silicon Secrets: The 1.8nm Quantum Leak',
    niche: 'High-Tech Reviews & AI',
    category: 'High-Tech Reviews & AI',
    cpmBenchmark: '$36.00 - $48.50 CPM',
    cpmValue: 42.20,
    avgRetention30s: 82.1,
    viralityRating: 91,
    affiliateYieldScore: 'Very High ($480/10k views - Cloud GPU & VPN affiliates)',
    logline: 'An optical microscope zooms 50,000x into a modern neural processing die to expose the physical sub-atomic barrier that chipmakers refuse to publish.',
    durationSeconds: 42,
    pacing: 'Rapid (0.8s cuts)',
    directorTone: 'Tech Noir / Blade Runner 2049 meets Marques Brownlee Studio',
    soundtrackRecommendation: 'Industrial cyber-synth pulse with glitch bass drops (128 BPM)',
    colorGrade: 'High contrast matte black, neon cyan trace lines, holographic copper reflections',
    targetAudience: 'Software engineers, hardware enthusiasts, crypto investors, tech buyers (Ages 18-45)',
    seamlessLoopMechanism: 'The final line "And that is why the real compute wars just began..." seamlessly connects back to the opening question "Why are chipmakers hiding this microscopic flaw?"',
    sampleThumbnailConcept: 'Split microscopic cross-section of a burning silicon wafer with a giant question mark and glowing red voltage meter labeled "UNSTABLE"',
    optimizedYoutubeMetadata: {
      title: 'What Chipmakers Are Hiding Inside 1.8nm Silicon ⚡ (Macro Teardown) #Shorts',
      description: 'We zoomed 50,000x inside a sub-2nm neural processing unit to see quantum electron tunneling in real time. Here is what they cannot fix.\n\n⚙️ Tools Used: ShortsForge AI Tech Teardown Suite\n💻 Hardware Sponsored by Developer Cloud & Clean Compute\n\n#Tech #AI #Microchip #Engineering #Hardware #Futurism #ComputerScience',
      tags: ['microchips', 'semiconductor', 'hardware teardown', 'nvidia', 'quantum computing', 'ai chip', 'tech review', 'computer science'],
      pinnedComment: '⚡ Question for engineers: Would you pay 2x for photonic optical interconnects or stick to copper? Best answer wins cloud GPU credits.'
    },
    preSeededBlocks: [
      {
        id: 'block_tech_vis_02',
        type: 'visual_prompt_pack',
        title: 'Sub-Atomic Die Macro Visual Prompts',
        badge: 'Macro Photogrammetry / Cyberpunk',
        description: 'Ultra-close macro camera moves showing semiconductor architecture and thermal dissipation.',
        content: `Scene 1 (0-6s): Rapid zoom from a smartphone motherboard down through the ceramic lid into raw patterned silicon die. Cleanroom robot tweezers pulling away thermal paste.
Scene 2 (6-18s): Electron microscope render of gate-all-around (GAA) nanosheet transistors. Neon cyan electrical pulses jumping across gate channels.
Scene 3 (18-32s): Thermal camera false-color gradient switching to boiling white-hot hotspots where quantum leakage occurs. Diagrammatic overlay HUD showing leakage wattage.
Scene 4 (32-42s): An optical laser wafer cutter firing a green coherent beam across the wafer surface, creating a mirror reflection that wipes back to Scene 1.`,
        copyPayload: `/imagine prompt: extreme macro electron microscope shot of 2nm semiconductor silicon die with glowing neon cyan gate circuits and quantum electron sparks, technical HUD readout overlays, 8k raytracing --ar 9:16 --v 6.0`
      },
      {
        id: 'block_tech_vo_02',
        type: 'voiceover_script',
        title: 'High-Retention Technical Hook & Breakdown',
        badge: 'Fast Authoritative / 165 WPM',
        description: 'Designed to stop doom-scrolling instantly with a counter-intuitive industry revelation.',
        content: `[00:00 - 00:04 | Sharp Punchy Hook]
Chipmakers want you to believe 2-nanometer processors are getting faster. They are lying.

[00:04 - 00:16 | Fast Escalation]
When transistors get this small, electrons stop obeying classical physics. They literally vanish through insulating walls—a phenomenon known as quantum tunneling.

[00:16 - 00:30 | Technical Core]
To stop your phone from melting, engineers had to redesign the entire architecture into GAA ribbons surrounded by suspended dielectric gas. But here is the dirty secret:

[00:30 - 00:42 | Climax & Loop Seam]
Nearly forty percent of the energy inside your flagship phone is wasted just keeping stray electrons from corrupting RAM addresses! Which means... the real compute wars just began.`,
        copyPayload: `Chipmakers want you to believe 2-nanometer processors are getting faster. They are lying. When transistors get this small, electrons stop obeying classical physics. They literally vanish through insulating walls—a phenomenon known as quantum tunneling. To stop your phone from melting, engineers had to redesign the entire architecture into GAA ribbons surrounded by suspended dielectric gas. But here is the dirty secret: Nearly forty percent of the energy inside your flagship phone is wasted just keeping stray electrons from corrupting RAM addresses! Which means... the real compute wars just began.`
      },
      {
        id: 'block_tech_hook_02',
        type: 'viral_hook_stack',
        title: 'A/B Testable High-CTR Hook Variations',
        badge: 'CTR Tested > 14.8%',
        description: 'Five alternative 3-second openers to test with A/B Simulation modeling.',
        content: `Option A: "The 2-nanometer lie nobody in Silicon Valley will talk about."
Option B: "Why modern phones are physically incapable of getting faster on silicon."
Option C: "We put a $2,000 flagship under an electron microscope... and found this."
Option D: "Quantum leakage just hit the hardware ceiling. Here is proof."
Option E: "Stop buying new phones until you see what happens inside this chip."`,
        copyPayload: `Hook Stack: [2nm Lie] [Hardware Ceiling] [Microscope Proof] [Silicon Limit]`
      }
    ]
  },
  {
    id: 'niche_finance_wealth_03',
    filmTitle: 'The 72-Hour Offshore Entity Blueprint',
    niche: 'Personal Finance & Wealth',
    category: 'Personal Finance & Wealth',
    cpmBenchmark: '$42.00 - $55.00 CPM',
    cpmValue: 48.90,
    avgRetention30s: 88.2,
    viralityRating: 96,
    affiliateYieldScore: 'Maximum ($650/10k views - Wise, Stripe Atlas & Legal Corp)',
    logline: 'How digital creators legally structure international royalties through multi-currency banking to avoid 30% foreign withholding tax.',
    durationSeconds: 50,
    pacing: 'Cinematic Narrative (2.2s cuts)',
    directorTone: 'Wall Street Confidential / Clean Minimalist Luxury',
    soundtrackRecommendation: 'Minimalist low-frequency bass with crisp acoustic finger clicks and cello undertones (84 BPM)',
    colorGrade: 'Desaturated corporate navy, matte stone grey, crisp emerald cash accents',
    targetAudience: 'Content creators, agency owners, digital nomads, business operators (Ages 22-50)',
    seamlessLoopMechanism: 'The ending line "Before you touch another foreign dollar, verify your banking rails..." leads straight into the opening question.',
    sampleThumbnailConcept: 'Black matte business card with metallic gold embossing next to a passport and a tax reduction gauge showing "-30% DEDUCTION"',
    optimizedYoutubeMetadata: {
      title: 'How Global Creators Legally Keep 100% of International Earnings 🌐 (Tax Rails) #Shorts',
      description: 'If you earn AdSense, brand sponsorships, or digital product royalties outside your home country, you might be forfeiting 30% to unnecessary withholding. Here is the legal corporate framework.\n\n💳 Payouts Banking: Wise Business Multi-Currency Accounts\n🔒 Security Validator: Real-time sort code & IBAN routing verification\n\n#PersonalFinance #Wise #Taxes #DigitalNomad #CreatorEconomy #WealthBuilding',
      tags: ['personal finance', 'wise payouts', 'creator taxes', 'international banking', 'foreign withholding', 'tax legal', 'wealth building', 'adsense earnings'],
      pinnedComment: '💼 Pinned Resource: Check the description for our vetted multi-currency banking guide. Which country is your channel registered in?'
    },
    preSeededBlocks: [
      {
        id: 'block_fin_script_03',
        type: 'voiceover_script',
        title: 'Compliant High-Yield Finance Script',
        badge: 'Calculated Professional / 138 WPM',
        description: 'Clear step-by-step breakdown with built-in Wise banking compliance callouts.',
        content: `[00:00 - 00:06 | Cold Direct Opening]
If your YouTube channel or digital store makes money from viewers in other countries, you might be losing 30% right at the border.

[00:06 - 00:20 | The Problem]
Without a certified W-8BEN tax treaty declaration and a designated multi-currency routing entity, international payment processors default to statutory withholding. That is thousands of dollars gone before payout.

[00:20 - 00:36 | The 3-Step Structure]
Step one: Register your operating entity with double-taxation treaty jurisdiction.
Step two: Connect an authenticated multi-currency account like Wise to collect local domestic clearing (like BACS in the UK or ACH in the US).
Step three: Automated automated disbursement with zero wire intermediary fees.

[00:36 - 00:50 | Call to Action & Loop Seam]
Joseph Paul Woodside and top independent studio heads use this exact routing architecture. Before you touch another foreign dollar... verify your banking rails.`,
        copyPayload: `If your YouTube channel or digital store makes money from viewers in other countries, you might be losing 30% right at the border. Without a certified W-8BEN tax treaty declaration and a designated multi-currency routing entity, international payment processors default to statutory withholding. That is thousands of dollars gone before payout. Step one: Register your operating entity with double-taxation treaty jurisdiction. Step two: Connect an authenticated multi-currency account like Wise to collect local domestic clearing (like BACS in the UK or ACH in the US). Step three: Automated automated disbursement with zero wire intermediary fees. Joseph Paul Woodside and top independent studio heads use this exact routing architecture. Before you touch another foreign dollar... verify your banking rails.`
      },
      {
        id: 'block_fin_vis_03',
        type: 'b_roll_manifest',
        title: 'Minimalist Financial B-Roll Manifest',
        badge: '4K Clean Minimalist Motion',
        description: 'Exact visual cues for high authority feel and zero clutter.',
        content: `00:00 - 00:06: Sleek top-down flat lay of an obsidian black desk, fountain pen, and embossed legal document stamped "TREATY COMPLIANT".
00:06 - 00:20: Smooth animated motion graphic of a dollar bill passing through a scanner border where 30% dissolves into smoke.
00:20 - 00:36: Animated 3D digital globe showing encrypted green routing lines connecting London (BACS 60-84-64), New York, and Frankfurt with Wise API verified badge.
00:36 - 00:50: Split screen showing verified payment notification on a minimalist smartphone screen and smooth camera pull-back.`,
        copyPayload: `B-Roll Shots: [Obsidian_Flatlay_Treaty.mp4] [Tax_Withholding_Dissolve_Anim.mp4] [3D_Globe_Banking_Routing.mp4] [Wise_Disbursement_Phone_HUD.mp4]`
      }
    ]
  },
  {
    id: 'niche_craftsman_steel_04',
    filmTitle: 'The 100-Year Rail Anvil Forging',
    niche: 'Craftsman & Engineering Loops',
    category: 'Craftsman & Engineering Loops',
    cpmBenchmark: '$18.00 - $25.50 CPM',
    cpmValue: 22.40,
    avgRetention30s: 91.5,
    viralityRating: 98,
    affiliateYieldScore: 'Medium-High (Machinery tools, tungsten abrasives, workshop safety)',
    logline: 'An oxidized 1914 Victorian train rail is cut, heated to 1,250°C glowing cherry red, and pounded into an heirloom blacksmith anvil with hypnotic steam quenches.',
    durationSeconds: 52,
    pacing: 'Macro ASMR Rhythm',
    directorTone: 'Fred Dibnah Heritage / Industrial Poetry / Pure ASMR',
    soundtrackRecommendation: 'No background music! 100% crisp high-fidelity industrial binaural Foley and anvil harmonics (44.1kHz / 24-bit)',
    colorGrade: 'Industrial iron greys, glowing incandescent tungsten orange, steam highlights',
    targetAudience: 'Machinists, woodworking buffs, industrial history fans, ASMR loop watchers (Ages 16-65)',
    seamlessLoopMechanism: 'The final heavy blow of the 500-ton pneumatic hammer strikes the glowing steel, creating the exact spark burst and sound that opens the video at second 0.',
    sampleThumbnailConcept: 'Glowing 1,200°C molten-orange train rail being split by a massive hydraulic wedge with orange sparks frozen in mid-air',
    optimizedYoutubeMetadata: {
      title: 'Turning a 110-Year-Old Train Track into an Anvil 🔨🔥 (Pure ASMR Loop) #Shorts',
      description: 'Watch 1914 heavy industrial rail steel get transformed into a razor-sharp precision bench anvil. No music, pure mechanical workshop sounds.\n\nHonor to the industrial heritage of Fred Dibnah and Victorian ironworks.\n\n#Blacksmith #Forging #Satisfying #ASMR #Industrial #Metalworking #Engineering',
      tags: ['blacksmith', 'forging', 'train rail anvil', 'asmr', 'satisfying', 'fred dibnah', 'industrial heritage', 'metalwork', 'hydraulic press'],
      pinnedComment: '🔨 What should we forge next out of 100-year-old steel? Tell us in the comments below!'
    },
    preSeededBlocks: [
      {
        id: 'block_craft_vis_04',
        type: 'visual_prompt_pack',
        title: 'Industrial Forge Macro Visual Prompts',
        badge: '8K Ultra-Slow-Motion 1000 FPS',
        description: 'Cinematic slow-motion prompts emphasizing scale, heat shimmer, and hydraulic power.',
        content: `Scene 1 (0-10s): Extreme close-up of a torch cutting through 100-year-old railway steel. Blue oxyacetylene flame throwing cascading showers of white-hot slag.
Scene 2 (10-24s): Steel rail placed into a gas forge. Surface temperature rises from rust brown to glowing crimson, then incandescent lemon yellow with heat mirage waves.
Scene 3 (24-40s): A massive 5-hundredweight power hammer dropping with rhythmic heavy impacts. Scale flaking off like black parchment with each thunderous strike.
Scene 4 (40-52s): The finished anvil plunged into a deep barrel of oil. Towering column of flame erupting, instantly dying down to leave a glass-black polished face.`,
        copyPayload: `/imagine prompt: extreme close up 1000fps slow motion shot of glowing molten 1200C railway steel rail being struck by heavy industrial blacksmith hammer, exploding sparks, volumetric furnace smoke, dark workshop background --ar 9:16 --v 6.0`
      },
      {
        id: 'block_craft_sfx_04',
        type: 'sound_design_cues',
        title: 'Pure Mechanical ASMR Foley Map',
        badge: 'Zero Music / 100% Acoustic Foley',
        description: 'Binaural sound effects with calibrated bass thump (40Hz) for phone speaker impact.',
        content: `00:00 - 00:08: Hiss of high-pressure oxygen torch, sharp crackle of molten slag pellets hitting concrete.
00:08 - 00:20: Deep low-frequency hum of gas furnace chamber, tongs rattling against steel plate.
00:20 - 00:38: Rhythmic pneumatic hammer strikes: THUMP-CLANG, THUMP-CLANG. Crisp high-end iron ring lasting 2.4 seconds per strike.
00:38 - 00:46: Intense oil quench hiss: violent bubbling sub-bass whoosh followed by steam crackle.
00:46 - 00:52: Wire brush scraping the anvil horn with rhythmic strokes, building to the synchronized hammer drop that restarts the loop.`,
        copyPayload: `Foley Library: [Oxy_Torch_Cut_Hiss.wav] [Furnace_Rumble_40Hz.wav] [Pneumatic_Hammer_Clang.wav] [Oil_Quench_Explosion.wav] [Steel_Wire_Brush_ASMR.wav]`
      }
    ]
  },
  {
    id: 'niche_psych_stoic_05',
    filmTitle: 'The Eye Contact Paradox',
    niche: 'Dark History & Psychology',
    category: 'Dark History & Psychology',
    cpmBenchmark: '$24.00 - $34.00 CPM',
    cpmValue: 28.50,
    avgRetention30s: 89.8,
    viralityRating: 95,
    affiliateYieldScore: 'High (Audible books, psychology courses, body language masterclasses)',
    logline: 'Why historical conquerors never blinked during negotiation: The micro-stare technique that disarms high-pressure dominance in under 4 seconds.',
    durationSeconds: 44,
    pacing: 'Cinematic Narrative (2.2s cuts)',
    directorTone: 'Mindhunter meets Oppenheimer / Clinical Psychological Drama',
    soundtrackRecommendation: 'Subtle high-tension heartbeat with low sub-bass pulse and muted violin glissando (60 BPM)',
    colorGrade: 'Muted 35mm film grain, sepia monochrome with piercing amber iris highlights',
    targetAudience: 'Self-improvement enthusiasts, business negotiators, psychology lovers (Ages 18-40)',
    seamlessLoopMechanism: 'The ending line "And once you master this silence, they will always wonder who is really in control..." links into the opening sentence.',
    sampleThumbnailConcept: 'Silhouette of a stoic Roman bust with one glowing eye staring directly into the viewer with bold text: "DON\'T BLINK"',
    optimizedYoutubeMetadata: {
      title: 'Why Dangerous People Never Blink First 👁️ (Dark Psychology) #Shorts',
      description: 'Historical records show Roman senators and tactical commanders used a specific 4-second ocular stillness technique to reverse social hierarchies. Here is the neuroscience behind it.\n\n🧠 Psychology & Communication Architecture\n\n#Psychology #DarkPsychology #BodyLanguage #Mindset #Stoicism #HumanBehavior #Shorts',
      tags: ['dark psychology', 'body language', 'eye contact', 'human behavior', 'stoicism', 'negotiation', 'psychological tricks', 'mindset'],
      pinnedComment: '👁️ Have you ever encountered someone who uses this on you? How did your heart rate respond?'
    },
    preSeededBlocks: [
      {
        id: 'block_psych_script_05',
        type: 'voiceover_script',
        title: 'Micro-Pause Retention Locked Narration',
        badge: 'Deep Baritone / 122 WPM',
        description: 'Engineered with intentional 1.2-second pauses that prevent viewers from swiping away.',
        content: `[00:00 - 00:05 | Direct Hypnotic Hook]
In any room with powerful people... watch who blinks first. It is almost never the person in charge.

[00:05 - 00:18 | The Neuroscience]
When human beings experience social threat, the amygdala triggers rapid micro-blinks to scan for peripheral escape routes. It is an involuntary survival mechanism.

[00:18 - 00:32 | The Technique]
Top negotiators practice what forensic psychologists call the 'triangular gaze lock'. You do not glare aggressively. You hold steady focus on the bridge of the nose. [1.2s silence]

[00:32 - 00:44 | The Paradox & Loop]
To their subconscious brain, your calmness signals absolute predator confidence. And once you master this silence... they will always wonder who is really in control.`,
        copyPayload: `In any room with powerful people... watch who blinks first. It is almost never the person in charge. When human beings experience social threat, the amygdala triggers rapid micro-blinks to scan for peripheral escape routes. It is an involuntary survival mechanism. Top negotiators practice what forensic psychologists call the 'triangular gaze lock'. You do not glare aggressively. You hold steady focus on the bridge of the nose. To their subconscious brain, your calmness signals absolute predator confidence. And once you master this silence... they will always wonder who is really in control.`
      },
      {
        id: 'block_psych_vis_05',
        type: 'visual_prompt_pack',
        title: 'Cinematic Noir Psychological Prompts',
        badge: 'Anamorphic 35mm Film Noir',
        description: 'High-contrast portrait lighting with dramatic rim shadows and eye glints.',
        content: `Scene 1 (0-8s): Extreme macro close-up of a human eye. The pupil dilates in slow motion. Reflected in the cornea is an ornate wooden boardroom table.
Scene 2 (8-22s): Dramatic low-angle profile of a stoic speaker in a tailored coat. Soft smoke curls through a single beam of spotlight.
Scene 3 (22-34s): Split screen diagram showing brain scan MRI showing the amygdala firing red, contrasted with calm blue cerebral cortex.
Scene 4 (34-44s): Slow camera push directly towards the subject's face as the background falls away into pure pitch black.`,
        copyPayload: `/imagine prompt: dramatic low angle cinematic portrait of a sharp dressed stoic man in a dark moody room, single spotlight creating dramatic catchlight in his eyes, 35mm film grain, oppenheimer cinematography --ar 9:16 --v 6.0`
      }
    ]
  },
  {
    id: 'niche_scifi_cinema_06',
    filmTitle: 'The Dyson Shroud: Year 2189',
    niche: 'Sci-Fi Speculative Cinema',
    category: 'Sci-Fi Speculative Cinema',
    cpmBenchmark: '$30.00 - $44.00 CPM',
    cpmValue: 37.00,
    avgRetention30s: 87.9,
    viralityRating: 93,
    affiliateYieldScore: 'High (Sci-fi games, VR headsets, VFX software subscriptions)',
    logline: 'An orbital maintenance tether detects an uncataloged heartbeat emanating from the solar collector surrounding the dead star Proxima Centauri.',
    durationSeconds: 56,
    pacing: 'Cinematic Narrative (2.2s cuts)',
    directorTone: 'Denis Villeneuve (Dune / Arrival) meets Interstellar',
    soundtrackRecommendation: 'Massive Hans Zimmer-style brass horn swell and resonant sub-bass rumble (50 BPM)',
    colorGrade: 'Monolithic deep space black, cold titanium grey, blinding solar flare gold',
    targetAudience: 'Sci-fi cinema fans, futurism geeks, VFX creators, gamers (Ages 16-45)',
    seamlessLoopMechanism: 'The final radar ping sound at 00:55 is the exact frequency of the automated distress call that triggers the intro.',
    sampleThumbnailConcept: 'Gigantic dark geometric megastructure blotting out a dying star with a tiny lone astronaut tethered in the foreground',
    optimizedYoutubeMetadata: {
      title: 'They Found Something Living Inside the Dyson Sphere 🛸 (Sci-Fi Short Film) #Shorts',
      description: 'In 2189, solar maintenance drone 7 intercepted an acoustic pulse deep inside the megastructure framework. It was not a mechanical failure.\n\nRendered with ShortsForge AI Cinematic Sci-Fi Engine.\nSoundtrack: Monolith Awakening (Dolby Atmos Stems)\n\n#SciFi #ShortFilm #Cinematic #Interstellar #SpaceExploration #VFX #Futurism',
      tags: ['sci fi short film', 'dyson sphere', 'space horror', 'interstellar', 'denis villeneuve style', 'vfx breakdown', 'alien signal', 'megastructure'],
      pinnedComment: '🛸 If you were the astronaut, would you cut the tether or pull the seal open? Comment your survival plan.'
    },
    preSeededBlocks: [
      {
        id: 'block_scifi_vis_06',
        type: 'visual_prompt_pack',
        title: 'Villeneuve Scale Sci-Fi Visual Prompts',
        badge: 'IMAX 70mm Aspect / Monolithic',
        description: 'Vast cosmic scale contrasts between fragile human astronaut and incomprehensible megastructures.',
        content: `Scene 1 (0-14s): Immense scale shot of a matte-black geometric Dyson panel drifting before a blinding red supergiant star. A single microscopic gold-foil astronaut tethered by a hairline cable.
Scene 2 (14-28s): Helmet camera POV looking down into a cavernous hexagonal maintenance shaft disappearing 100 kilometers into the core.
Scene 3 (28-44s): Acoustic sensor display flashing erratic organic wave patterns. The metal seams of the shaft pulse with faint bioluminescent veins.
Scene 4 (44-56s): A massive sound wave ripples through the vacuum dust, shaking the astronaut's visor. The iris of the shaft begins to contract.`,
        copyPayload: `/imagine prompt: vast cosmic scale wide shot of a monolithic black dyson sphere segment eclipsing a dying red sun, lone astronaut suspended in space, denis villeneuve dune cinematography, imax 70mm, hyper-realistic --ar 9:16 --v 6.0`
      },
      {
        id: 'block_scifi_vo_06',
        type: 'voiceover_script',
        title: 'Cosmic Dread Radio Transmission',
        badge: 'Distorted Comms Filter / 120 WPM',
        description: 'Authentic helmet microphone radio frequency response with NASA-grade jargon.',
        content: `[00:00 - 00:10 | Radio Static & Heavy Breathing]
Station Control... this is Tether Seven. I am at panel junction forty-eight. The seismic tremors are not orbital decay.

[00:10 - 00:26 | Rising Dread]
I placed the acoustic contact mic against the titanium bulkhead. There is no atmosphere in this conduit... but something is vibrating through the alloy.

[00:26 - 00:42 | The Revelation]
Forty-four beats per minute. Regular. Deliberate. Control, whatever built this shroud didn't build it to harvest solar energy.

[00:42 - 00:56 | Climax & Loop]
They built it to keep whatever is inside... from looking out. Sensor sweep re-initializing now.`,
        copyPayload: `Station Control... this is Tether Seven. I am at panel junction forty-eight. The seismic tremors are not orbital decay. I placed the acoustic contact mic against the titanium bulkhead. There is no atmosphere in this conduit... but something is vibrating through the alloy. Forty-four beats per minute. Regular. Deliberate. Control, whatever built this shroud didn't build it to harvest solar energy. They built it to keep whatever is inside... from looking out. Sensor sweep re-initializing now.`
      }
    ]
  },
  {
    id: 'niche_biohack_health_07',
    filmTitle: 'The 10-Minute Morning Red Light Protocol',
    niche: 'Biohacking & Clean Living',
    category: 'Biohacking & Clean Living',
    cpmBenchmark: '$28.00 - $39.00 CPM',
    cpmValue: 33.50,
    avgRetention30s: 84.7,
    viralityRating: 89,
    affiliateYieldScore: 'Very High ($520/10k views - Red light panels, electrolytes, sleep rings)',
    logline: 'Why Nobel-prize winning photobiomodulation research proves taking red light at 670nm within 30 minutes of waking resets ATP mitochondrial production for 16 hours.',
    durationSeconds: 46,
    pacing: 'Rapid (0.8s cuts)',
    directorTone: 'Andrew Huberman Laboratory / Clean Modern Medical Aesthetic',
    soundtrackRecommendation: 'Crisp ambient electronic soundbed with pulsing synth arpeggios (110 BPM)',
    colorGrade: 'Clean clinical daylight whites, deep crimson 670nm infrared accents',
    targetAudience: 'Health enthusiasts, athletes, high-performance executives, wellness seekers (Ages 20-55)',
    seamlessLoopMechanism: 'The ending line "Do this tomorrow morning before you drink coffee, and see how your brain wakes up..." loops back into the opening hook.',
    sampleThumbnailConcept: 'Split screen of a tired grey face vs glowing energized face under a red light device with text: "670nm PROTOCOL"',
    optimizedYoutubeMetadata: {
      title: 'Stop Drinking Coffee First Thing: Do This for 10 Mins 🔴 (Mitochondrial Reset) #Shorts',
      description: 'The peer-reviewed science behind morning photobiomodulation. How 670nm photons activate Cytochrome C Oxidase to produce cellular energy without caffeine crashes.\n\n🧬 Daily Wellness & Biohacking Architecture\n\n#Health #Biohacking #Huberman #SleepProtocol #Mitochondria #Longevity #Wellness',
      tags: ['biohacking', 'red light therapy', 'mitochondria', 'morning routine', 'huberman lab', 'photobiomodulation', 'sleep optimization', 'caffeine crash'],
      pinnedComment: '🔴 How many minutes after waking do you usually have your first coffee? Let us know below!'
    },
    preSeededBlocks: [
      {
        id: 'block_bio_script_07',
        type: 'voiceover_script',
        title: 'High-Conversion Wellness Script',
        badge: 'Engaging Scientific / 145 WPM',
        description: 'Structured to drive high affiliate trust and clear actionable habits.',
        content: `[00:00 - 00:05 | Pattern Interrupt Hook]
If you drink coffee within sixty minutes of waking up, you are virtually guaranteeing an afternoon energy crash. Here is why:

[00:05 - 00:18 | Scientific Mechanism]
Caffeine does not give you energy. It only blocks adenosine receptors while sleep debt accumulates behind the wall. The real biological switch is light.

[00:18 - 00:32 | The Protocol]
Specifically, 660 to 670-nanometer deep red photons. When sunlight or photobiomodulation strikes retinal ganglion cells, it triggers Cytochrome C Oxidase inside your mitochondria to dump ATP.

[00:32 - 00:46 | Actionable Close & Loop]
Ten minutes of morning red spectrum exposure raises baseline dopamine for sixteen hours straight. Do this tomorrow morning before you touch coffee... and feel the difference.`,
        copyPayload: `If you drink coffee within sixty minutes of waking up, you are virtually guaranteeing an afternoon energy crash. Here is why: Caffeine does not give you energy. It only blocks adenosine receptors while sleep debt accumulates behind the wall. The real biological switch is light. Specifically, 660 to 670-nanometer deep red photons. When sunlight or photobiomodulation strikes retinal ganglion cells, it triggers Cytochrome C Oxidase inside your mitochondria to dump ATP. Ten minutes of morning red spectrum exposure raises baseline dopamine for sixteen hours straight. Do this tomorrow morning before you touch coffee... and feel the difference.`
      }
    ]
  },
  {
    id: 'niche_docu_history_08',
    filmTitle: 'The Day Moscow Lost Nuclear Key 11',
    niche: 'Micro-Documentaries',
    category: 'Micro-Documentaries',
    cpmBenchmark: '$26.00 - $36.50 CPM',
    cpmValue: 31.00,
    avgRetention30s: 88.5,
    viralityRating: 94,
    affiliateYieldScore: 'Medium-High (History streaming services, VPNs, military history books)',
    logline: 'During the 1983 autumn exercises, a junior Soviet cipher clerk dropped the titanium launch key behind an iron radiator—triggering 48 hours of high-command panic.',
    durationSeconds: 54,
    pacing: 'Cinematic Narrative (2.2s cuts)',
    directorTone: 'Chernobyl (HBO) meets Bridge of Spies / Tense Historical Thriller',
    soundtrackRecommendation: 'Low cello tension, muffled Geiger counter clicks, distant siren hum (64 BPM)',
    colorGrade: 'Bleached Soviet teal, mustard ochre, harsh incandescent desk lamp shadows',
    targetAudience: 'History buffs, military enthusiasts, geopolitical news watchers (Ages 18-65)',
    seamlessLoopMechanism: 'The final sentence "And to this day, historians still debate whether world peace was saved by pure luck..." flows back into the opening hook.',
    sampleThumbnailConcept: 'Authentic 1980s Soviet cipher terminal with a red emergency telephone and bold Cyrillic warning stamp: "CLASSIFIED"',
    optimizedYoutubeMetadata: {
      title: 'The Time a Soviet Clerk Dropped the Nuclear Launch Key 🔑 (Declassified) #Shorts',
      description: 'Declassified military logs from October 1983 reveal the heart-stopping panic inside Serpukhov-15 when emergency launch key 11 went missing.\n\n📜 Historical Source: Soviet Strategic Rocket Forces Archive\n\n#History #ColdWar #Declassified #Documentary #HistoricalFacts #MilitaryHistory #Shorts',
      tags: ['history', 'cold war', 'declassified', 'documentary', 'soviet history', 'military', 'chernobyl style', 'historical mystery'],
      pinnedComment: '📜 If you like declassified Cold War history, hit subscribe! What historical mystery should we cover next?'
    },
    preSeededBlocks: [
      {
        id: 'block_docu_vis_08',
        type: 'visual_prompt_pack',
        title: 'Cold War Declassified Visual Prompts',
        badge: 'HBO Chernobyl 35mm Grain',
        description: 'Heavy atmospheric vintage textures, declassified dossiers, and analog military terminals.',
        content: `Scene 1 (0-12s): Dimly lit concrete bunker office in 1983 Moscow. CRT monitors flickering green phosphor text. Heavy rotary bakelite telephone ringing unanswered.
Scene 2 (12-26s): Close up of a brass key ring slipping between trembling fingers, falling down between cast-iron steam radiator fins into dark floorboards.
Scene 3 (26-42s): Generals in heavy wool greatcoats pacing over red wax-sealed envelopes and classified maps of the North Atlantic.
Scene 4 (42-54s): Slow tracking shot down a silent missile silo as the emergency red siren lamp revolves without sound.`,
        copyPayload: `/imagine prompt: authentic 1983 cold war soviet underground bunker, crt computer monitors glowing green, heavy wool military coats, dramatic hbo chernobyl cinematography, atmospheric haze, 35mm film --ar 9:16 --v 6.0`
      }
    ]
  }
];

export const AUTOMATION_SOFTWARES_LIST: AutomationSoftwareRequirement[] = [
  {
    id: 'google_api_python_client',
    name: 'google-api-python-client',
    purpose: 'Official Google APIs Python client for YouTube Data API v3 automation, metadata upload, and automated publishing.',
    installCommand: 'pip install google-api-python-client',
    languageOrEcosystem: 'python',
    isInstalled: true,
    version: '2.140.0',
    docUrl: 'https://developers.google.com/youtube/v3/quickstart/python',
    sampleSnippet: `from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

youtube = build('youtube', 'v3', credentials=credentials)
media = MediaFileUpload('viral_short.mp4', mimetype='video/mp4', resumable=True)
request = youtube.videos().insert(
    part='snippet,status',
    body={
        'snippet': {
            'title': 'The Clockwork Dragonfly 🕰️ #Shorts',
            'description': 'Automated upload via ShortsForge AI',
            'tags': ['Shorts', 'Animation', 'Pixar'],
            'categoryId': '24'
        },
        'status': {'privacyStatus': 'public', 'selfDeclaredMadeForKids': False}
    },
    media_body=media
)
response = request.execute()`
  },
  {
    id: 'google_auth_oauthlib',
    name: 'google-auth-oauthlib',
    purpose: 'OAuth 2.0 PKCE browser authorization and token persistence for headless automated YouTube uploads.',
    installCommand: 'pip install google-auth-oauthlib google-auth-httplib2 google-auth',
    languageOrEcosystem: 'python',
    isInstalled: true,
    version: '1.2.0',
    docUrl: 'https://google-auth-oauthlib.readthedocs.io/',
    sampleSnippet: `from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
flow = InstalledAppFlow.from_client_secrets_file('client_secrets.json', SCOPES)
credentials = flow.run_local_server(port=8080)`
  },
  {
    id: 'youtube_transcript_api',
    name: 'youtube-transcript-api',
    purpose: 'Extracts timestamped captions from viral competitor shorts to identify optimal 30-50s retention drop-off cuts.',
    installCommand: 'pip install youtube-transcript-api',
    languageOrEcosystem: 'python',
    isInstalled: true,
    version: '0.6.2',
    docUrl: 'https://pypi.org/project/youtube-transcript-api/',
    sampleSnippet: `from youtube_transcript_api import YouTubeTranscriptApi

transcript = YouTubeTranscriptApi.get_transcript(video_id='dQw4w9WgXcQ')
viral_hooks = [t['text'] for t in transcript if t['start'] < 6.0]`
  },
  {
    id: 'ffmpeg_python',
    name: 'ffmpeg-python',
    purpose: 'Programmatic video processing for 9:16 vertical cropping, dynamic motion blur backgrounds, and audio normalization.',
    installCommand: 'pip install ffmpeg-python',
    languageOrEcosystem: 'python',
    isInstalled: true,
    version: '0.2.0',
    docUrl: 'https://github.com/kkroening/ffmpeg-python',
    sampleSnippet: `import ffmpeg

(
    ffmpeg
    .input('input_horizontal.mp4')
    .filter('crop', 'ih*9/16', 'ih')
    .output('short_9_16.mp4', vcodec='libx264', crf=20, acodec='aac')
    .run()
)`
  },
  {
    id: 'googleapis_node',
    name: 'googleapis (Node.js SDK)',
    purpose: 'Official Google APIs Node.js/TypeScript SDK installed in package.json for backend uploads and Wise revenue sync.',
    installCommand: 'npm install googleapis',
    languageOrEcosystem: 'node',
    isInstalled: true,
    version: '144.0.0',
    docUrl: 'https://github.com/googleapis/google-api-nodejs-client',
    sampleSnippet: `import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
});
const res = await youtube.videos.insert({
  part: ['snippet', 'status'],
  requestBody: { ... }
});`
  },
  {
    id: 'requests_webhook',
    name: 'requests (Python HTTP)',
    purpose: 'Executes automated webhooks to Wise API for automatic payout reconciliation and AdSense tracking.',
    installCommand: 'pip install requests',
    languageOrEcosystem: 'python',
    isInstalled: true,
    version: '2.31.0',
    docUrl: 'https://requests.readthedocs.io/',
    sampleSnippet: `import requests

res = requests.post(
    'https://api.wise.com/v3/profiles/profile_id/transfers',
    headers={'Authorization': f'Bearer {wise_token}'},
    json={'targetAccount': '88425941', 'sortCode': '60-84-64', 'name': 'Joseph Paul Woodside'}
)`
  }
];

export const COMPLETE_AUTOMATION_INSTALL_COMMAND = `pip install google-api-python-client google-auth-oauthlib google-auth-httplib2 google-auth youtube-transcript-api ffmpeg-python requests`;

export const PYTHON_REQUIREMENTS_TXT = `# ShortsForge AI - YouTube Shorts Automated Upload & Rendering Suite
google-api-python-client>=2.140.0
google-auth>=2.28.0
google-auth-oauthlib>=1.2.0
google-auth-httplib2>=0.2.0
youtube-transcript-api>=0.6.2
ffmpeg-python>=0.2.0
requests>=2.31.0
tqdm>=4.66.0
`;

export const STANDALONE_UPLOAD_PYTHON_SCRIPT = `#!/usr/bin/env python3
"""
ShortsForge AI - Automated YouTube Shorts Uploader with Resumable Chunks & Wise Tagging
Install dependencies:
  pip install google-api-python-client google-auth-oauthlib requests
"""

import os
import sys
import time
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import pickle

SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

def authenticate_youtube(client_secrets_file='client_secrets.json', token_pickle='token.pickle'):
    creds = None
    if os.path.exists(token_pickle):
        with open(token_pickle, 'rb') as token:
            creds = pickle.load(token)
            
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(client_secrets_file):
                print(f"[!] Please download your OAuth 2.0 client_secrets.json from Google Cloud Console.")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(client_secrets_file, SCOPES)
            creds = flow.run_local_server(port=8080)
            
        with open(token_pickle, 'wb') as token:
            pickle.dump(creds, token)
            
    return build('youtube', 'v3', credentials=creds)

def upload_short(youtube, file_path, title, description, tags, category_id="24", privacy="public"):
    print(f"[*] Preparing upload for: {file_path}")
    print(f"[*] Title: {title}")
    
    # Ensure #Shorts is in title or description for YouTube algorithmic recognition
    if '#Shorts' not in title and '#Shorts' not in description:
        title = f"{title} #Shorts"
        
    body = {
        'snippet': {
            'title': title,
            'description': description + "\\n\\n---\\nPowered by ShortsForge AI (Payouts: Wise verified Joseph Paul Woodside)",
            'tags': tags,
            'categoryId': category_id
        },
        'status': {
            'privacyStatus': privacy,
            'selfDeclaredMadeForKids': False
        }
    }
    
    media = MediaFileUpload(file_path, chunksize=1024*1024*5, resumable=True, mimetype='video/mp4')
    request = youtube.videos().insert(part=','.join(body.keys()), body=body, media_body=media)
    
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"[>] Upload Progress: {int(status.progress() * 100)}%")
            
    print(f"[SUCCESS] Video uploaded successfully! Video ID: {response.get('id')}")
    print(f"[LINK] https://youtube.com/shorts/{response.get('id')}")
    return response

if __name__ == '__main__':
    video_file = sys.argv[1] if len(sys.argv) > 1 else 'sample_short.mp4'
    title = sys.argv[2] if len(sys.argv) > 2 else 'The Clockwork Dragonfly 🕰️ #Shorts'
    
    yt = authenticate_youtube()
    upload_short(
        yt,
        file_path=video_file,
        title=title,
        description="Bedtime 3D Short Film Loop created via ShortsForge Niche Library.",
        tags=["Shorts", "Animation", "Pixar", "Loop", "Bedtime"]
    )
`;
