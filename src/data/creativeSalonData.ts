export interface SalonMakeoverPreset {
  id: string;
  name: string;
  category: 'hair' | 'skincare' | 'wellness' | 'luts';
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  intensity: number; // 0 to 100
  previewColor: string;
  beforePrompt: string;
  afterPrompt: string;
  features: string[];
}

export interface SceneryBackdropPreset {
  id: string;
  name: string;
  location: string;
  timeOfDay: string;
  description: string;
  badge: string;
  gradient: string;
  lightingTemp: number; // Kelvin adjustment: -50 (cool) to +50 (warm)
  bokehLevel: number; // 0 to 100
  ambientSoundName: string;
  environmentType: 'penthouse' | 'santorini' | 'shibuya' | 'bali' | 'paris' | 'nordic';
  accentColor: string;
}

export interface HiggsfieldMotionPreset {
  id: string;
  name: string;
  category: 'camera' | 'particle' | 'alive';
  description: string;
  badge: string;
  intensity: number;
  motionType: 'fpv_push' | 'dolly_zoom' | 'bullet_orbit' | 'parallax_depth' | 'whip_pan' | 'light_leaks' | 'chroma_warp' | 'golden_embers' | 'speed_burst' | 'breathing_alive';
  speed: string;
  tag: string;
}

export interface QuickClipTemplate {
  id: string;
  title: string;
  duration: number; // seconds (e.g. 15, 30, 45)
  hookText: string;
  pacingStyle: string;
  description: string;
  niche: string;
  badge: string;
  defaultCaptionStyle: 'hormozi' | 'clean_minimal' | 'neon_glow' | 'editorial';
}

export const SALON_MAKEOVER_PRESETS: SalonMakeoverPreset[] = [
  {
    id: 'korean_glass_skin',
    name: 'Korean Glass Skin & Dewy Sheen',
    category: 'skincare',
    subtitle: 'High hydration translucent pore refinement',
    description: 'Replicates 10-step K-Beauty essence glow with natural micro-texture preservation and diffused cheekbone catchlights.',
    badge: '★ #1 Viral Skincare',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    intensity: 85,
    previewColor: 'from-pink-500/30 via-rose-500/20 to-amber-500/20',
    beforePrompt: 'Natural skin without studio diffusion, uneven indoor halogen lighting',
    afterPrompt: 'Hyper-hydrated glass skin, soft-focus pore blur, glossy temple highlights, healthy flush',
    features: ['Micro-texture preservation', 'Cheekbone specular highlight', 'Redness neutralization', 'Youthful dewy bounce']
  },
  {
    id: 'sun_kissed_balayage',
    name: 'Dimensional Balayage & Beach Waves',
    category: 'hair',
    subtitle: 'Warm honey ribbon highlights & volumetric wave',
    description: 'Simulates salon master colorist hand-painted balayage with flowing dynamic volume and multi-tonal shine.',
    badge: '💇 Trend Makeover',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    intensity: 90,
    previewColor: 'from-amber-500/30 via-yellow-500/20 to-orange-500/20',
    beforePrompt: 'Flat single-tone brunette hair, lack of dimension and texture',
    afterPrompt: 'Luminous honey-gold dimensional balayage, bouncy curtain framing waves, high gloss finish',
    features: ['Multi-tonal highlights', 'Dynamic wave flow', 'Frizz elimination', 'Root shadow blending']
  },
  {
    id: 'golden_hour_bronze',
    name: 'Sunset Bronzed Editorial Contour',
    category: 'skincare',
    subtitle: 'Sculpted cheekbones & warm terracotta warmth',
    description: 'Rich sunset terracotta tones with high-fashion jawline sculpting, luminous bronzer, and velvet lips.',
    badge: '🌅 Golden Glow',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    intensity: 80,
    previewColor: 'from-orange-500/30 via-amber-500/20 to-red-500/20',
    beforePrompt: 'Neutral indoor camera profile, flat wash of light',
    afterPrompt: 'Golden hour sunlight glow, high precision warm contouring, warm amber catchlights in eyes',
    features: ['3D cheekbone shadow sculpture', 'Warm amber iris glow', 'Terracotta dewy blush', 'Reflective collarbone rim']
  },
  {
    id: 'wolf_cut_volume',
    name: 'Wolf Cut & Butterfly Layering',
    category: 'hair',
    subtitle: 'Volumetric shag with dynamic curtain bangs',
    description: 'Effortless textured layers with modern piece-y separation, movement responsiveness, and face-framing softness.',
    badge: '✂️ Gen-Z Viral Cut',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    intensity: 85,
    previewColor: 'from-purple-500/30 via-fuchsia-500/20 to-pink-500/20',
    beforePrompt: 'Heavy unlayered hair sitting flat on crown',
    afterPrompt: 'Airy layered wolf cut with wind-blown volume, feathery curtain bangs, piece-y texture definition',
    features: ['Crown volume lift', 'Feathered curtain bangs', 'Wind-blown motion simulation', 'Soft face-slimming edges']
  },
  {
    id: 'athletic_tone_lighting',
    name: 'Athletic Sculpt & Studio Rim Lighting',
    category: 'wellness',
    subtitle: 'High-definition muscle definition & post-workout dew',
    description: 'Precision physical studio three-point lighting that accentuates shoulder lines, collarbones, and athletic tone.',
    badge: '⚡ Fitness Studio',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    intensity: 75,
    previewColor: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/20',
    beforePrompt: 'Flat gym fluorescent lights with wash-out shadows',
    afterPrompt: 'Crisp studio rim lighting, athletic muscular definition, healthy post-HIIT endorphin glow',
    features: ['Cross-directional shadow contour', 'Collarbone highlight', 'Endorphin natural flush', 'Postural elongation']
  },
  {
    id: 'platinum_ice_gloss',
    name: 'Platinum Ice Blonde & Glass Finish',
    category: 'hair',
    subtitle: 'Ultra-cool Scandinavian blonde with mirror shine',
    description: 'Pure anti-brass platinum tone with ultra-glossy cuticle seal and iridescent silver highlights.',
    badge: '💎 High Luxe',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    intensity: 95,
    previewColor: 'from-cyan-500/30 via-blue-500/20 to-slate-500/20',
    beforePrompt: 'Warm brassy yellow undertones with dull surface reflectance',
    afterPrompt: 'Pure icy white-blonde with silver iridescent shimmer, liquid glass cuticle reflection',
    features: ['Yellow brass neutralization', 'Liquid glass sheen', 'Cool tone pearl highlights', 'Sharp perimeter lines']
  },
  {
    id: 'vintage_35mm_kodak',
    name: '1990s Kodak Portra 400 35mm LUT',
    category: 'luts',
    subtitle: 'Nostalgic analog film grain, creamy skin tones & halation',
    description: 'Authentic 35mm motion picture film simulation with warm creamy highlights, gentle shadow roll-off, and subtle red halation.',
    badge: '🎞️ Cinematic Film',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    intensity: 80,
    previewColor: 'from-yellow-500/30 via-red-500/20 to-amber-500/20',
    beforePrompt: 'Sharp clinical digital smartphone camera look',
    afterPrompt: 'Organic analog film grain, warm skin tones, soft red halation on edge highlights',
    features: ['Organic 35mm film grain', 'Red highlight halation', 'Creamy Kodak pastel tones', 'Gentle shadow roll-off']
  },
  {
    id: 'cyberpunk_neo_tokyo',
    name: 'Cyberpunk Neo-Tokyo Color Grade',
    category: 'luts',
    subtitle: 'Hyper-stylized cyan shadows with magenta neon rim glow',
    description: 'Electrifying futuristic color grade with contrasting cyan deep tones, intense magenta hair rims, and anamorphic flare streaks.',
    badge: '⚡ Futuristic VFX',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    intensity: 90,
    previewColor: 'from-fuchsia-500/30 via-purple-500/20 to-cyan-500/20',
    beforePrompt: 'Standard natural indoor ambient illumination',
    afterPrompt: 'Vibrant neon reflections, high-contrast cyan shadows, glowing magenta edge illumination',
    features: ['Dual-tone chromatic lighting', 'Reflective neon skin sheen', 'Dark obsidian contrast', 'High-energy retention']
  }
];

export const SCENERY_BACKDROP_PRESETS: SceneryBackdropPreset[] = [
  {
    id: 'manhattan_penthouse',
    name: 'Manhattan Sky Penthouse Loft',
    location: 'New York City, 68th Floor',
    timeOfDay: 'Midnight Skyline',
    description: 'Floor-to-ceiling glass panoramic view of twinkling Manhattan skyscrapers, Empire State spire, and moody ambient interior lighting.',
    badge: '🏙️ Luxury City',
    gradient: 'from-slate-950 via-indigo-950/60 to-zinc-950',
    lightingTemp: -15,
    bokehLevel: 45,
    ambientSoundName: 'Lo-Fi City Rain & Distant Siren',
    environmentType: 'penthouse',
    accentColor: '#38bdf8'
  },
  {
    id: 'santorini_sunset',
    name: 'Santorini Sunset Infinity Terrace',
    location: 'Oia, Greece (Caldera Cliff)',
    timeOfDay: 'Golden Hour (7:45 PM)',
    description: 'Warm Mediterranean sunset overlooking the deep blue Aegean sea, whitewashed volcanic stone arches, and bougainvillea petals.',
    badge: '🌅 Golden Hour',
    gradient: 'from-amber-950 via-orange-950/60 to-rose-950',
    lightingTemp: 35,
    bokehLevel: 30,
    ambientSoundName: 'Mediterranean Sea Breeze & Soft Gulls',
    environmentType: 'santorini',
    accentColor: '#fb923c'
  },
  {
    id: 'shibuya_cyber_rain',
    name: 'Shibuya Crossing Neo-Neon Rain',
    location: 'Tokyo, Japan',
    timeOfDay: 'Night Rain Mist',
    description: 'Iconic glowing Japanese billboard reflections, rain-slicked asphalt, holographic signage, and cyberpunk atmospheric humidity.',
    badge: '🏮 Cyberpunk Tokyo',
    gradient: 'from-fuchsia-950 via-purple-950/70 to-cyan-950',
    lightingTemp: -10,
    bokehLevel: 60,
    ambientSoundName: 'Tokyo Street Ambience & Gentle Raindrops',
    environmentType: 'shibuya',
    accentColor: '#e879f9'
  },
  {
    id: 'bali_rainforest_sanctuary',
    name: 'Bali Jungle Wellness Sanctuary',
    location: 'Ubud Rainforest Retreat',
    timeOfDay: 'Morning Mist Sunbeams',
    description: 'Lush tropical bamboo sanctuary, cascading distant jungle waterfall, floating green monstera leaves, and tranquil morning god rays.',
    badge: '🌿 Eco Sanctuary',
    gradient: 'from-emerald-950 via-teal-950/70 to-zinc-950',
    lightingTemp: 20,
    bokehLevel: 40,
    ambientSoundName: 'Tropical Birds, Waterfall & Bamboo Windchimes',
    environmentType: 'bali',
    accentColor: '#34d399'
  },
  {
    id: 'paris_sunlit_atelier',
    name: 'Parisian Sunlit Haussmann Atelier',
    location: 'Le Marais, Paris, France',
    timeOfDay: 'Mid-Afternoon Sunbeams',
    description: 'High-ceiling classical Parisian salon with intricate white crown molding, herringbone parquet floors, and soft golden window sunbeams.',
    badge: '✨ Chic Editorial',
    gradient: 'from-stone-900 via-amber-950/40 to-zinc-950',
    lightingTemp: 18,
    bokehLevel: 35,
    ambientSoundName: 'Acoustic French Café Guitar & Street Murmur',
    environmentType: 'paris',
    accentColor: '#facc15'
  },
  {
    id: 'nordic_glass_spa',
    name: 'Nordic Forest Geothermal Spa',
    location: 'Lapland Pine Forest, Finland',
    timeOfDay: 'Blue Hour Dusk & Steam',
    description: 'Panoramic glass sauna looking out onto snow-capped pine trees, rising mineral hot spring steam, and warm cedar wood interior.',
    badge: '❄️ Wellness Oasis',
    gradient: 'from-slate-950 via-cyan-950/50 to-blue-950',
    lightingTemp: -25,
    bokehLevel: 50,
    ambientSoundName: 'Pine Wind Whispers & Gentle Water Bubbling',
    environmentType: 'nordic',
    accentColor: '#22d3ee'
  }
];

export const HIGGSFIELD_MOTION_PRESETS: HiggsfieldMotionPreset[] = [
  {
    id: 'hg_fpv_push',
    name: 'Higgsfield FPV Cinematic Push',
    category: 'camera',
    description: 'Rapid forward momentum with subtle peripheral optical lens distortion that pulls the viewer directly into the subject.',
    badge: '🚀 Retention Lock',
    intensity: 80,
    motionType: 'fpv_push',
    speed: 'High Momentum',
    tag: '3-Sec Hook'
  },
  {
    id: 'hg_dolly_zoom',
    name: 'Vertigo Dolly Zoom (Hitchcock Effect)',
    category: 'camera',
    description: 'Foreground subject stays precisely locked in scale while the scenic background dynamically expands and warps perspective.',
    badge: '🎯 Mind-Bending',
    intensity: 90,
    motionType: 'dolly_zoom',
    speed: 'Dynamic Smooth',
    tag: 'Dramatic Reveal'
  },
  {
    id: 'hg_bullet_orbit',
    name: '360° Matrix Bullet Time Orbit',
    category: 'camera',
    description: 'Smooth arc rotation around the creator freezing motion mid-action to showcase hairstyle, makeup shimmer, or outfit details.',
    badge: '🔄 360 Showcase',
    intensity: 85,
    motionType: 'bullet_orbit',
    speed: 'Cinematic Slow',
    tag: 'Salon Showcase'
  },
  {
    id: 'hg_parallax_depth',
    name: '2.5D Volumetric Parallax Drift',
    category: 'camera',
    description: 'Subtle multi-plane float where subject, hair strands, and background elements move at independent depth speeds.',
    badge: '🌊 Organic Float',
    intensity: 70,
    motionType: 'parallax_depth',
    speed: 'Subtle Ambient',
    tag: 'Aesthetic B-Roll'
  },
  {
    id: 'hg_whip_pan',
    name: 'Kinetic Whip Pan Snap Zoom',
    category: 'camera',
    description: 'Ultra-fast directional camera whip that cuts directly from raw input into the finished salon transformation.',
    badge: '⚡ Instant Snap',
    intensity: 95,
    motionType: 'whip_pan',
    speed: 'Instant Shockwave',
    tag: 'Before/After Cut'
  },
  {
    id: 'hg_light_leaks',
    name: 'Anamorphic Ethereal Light Leaks',
    category: 'particle',
    description: 'Dreamy horizontal golden lens flares and soft chromatic light sweeps across the upper screen margin.',
    badge: '✨ Dream Glow',
    intensity: 75,
    motionType: 'light_leaks',
    speed: 'Sweeping Ambient',
    tag: 'Warm Atmosphere'
  },
  {
    id: 'hg_chroma_warp',
    name: 'Liquid Chromatic Iridescent Flow',
    category: 'particle',
    description: 'Fluorescent energy ribbons that undulate along the contours of the subject creating a mesmerizing tactile aura.',
    badge: '🔮 Cyber Flow',
    intensity: 85,
    motionType: 'chroma_warp',
    speed: 'Hypnotic Wave',
    tag: 'Viral Energy'
  },
  {
    id: 'hg_golden_embers',
    name: 'Cinematic Golden Dust & Floating Embers',
    category: 'particle',
    description: 'Volumetric golden specks and ember particles drifting through the air with depth-of-field bokeh blur.',
    badge: '🌟 Luxury Sparks',
    intensity: 70,
    motionType: 'golden_embers',
    speed: 'Gentle Updraft',
    tag: 'Luxe Finish'
  },
  {
    id: 'hg_speed_burst',
    name: 'Hyper-Speed Kinetic Blur Lines',
    category: 'particle',
    description: 'Radial anime-style speed lines that flare out on key phrase delivery or high-energy sound effects.',
    badge: '💥 Adrenaline Spike',
    intensity: 90,
    motionType: 'speed_burst',
    speed: 'Explosive Burst',
    tag: 'Sound Beat Drop'
  },
  {
    id: 'hg_breathing_alive',
    name: 'Higgsfield Character "Alive" Pulse',
    category: 'alive',
    description: 'Subtle micro-breathing chest expansion, natural hair strand wind responsiveness, and catchlight eye shimmer.',
    badge: '🧬 Living Motion',
    intensity: 65,
    motionType: 'breathing_alive',
    speed: 'Natural Heartbeat',
    tag: 'Photo-to-Video'
  }
];

export const QUICK_CLIP_TEMPLATES: QuickClipTemplate[] = [
  {
    id: 'viral_reveal_hook',
    title: 'The 3-Second Salon Makeover Snap',
    duration: 15,
    hookText: 'Stop paying $400 at the salon—look at this 2-second transformation...',
    pacingStyle: 'Rapid cut: 0-2s Raw → 2s Whip Pan → Reveal with Higgsfield Orbit',
    description: 'Maximizes viewer retention by teasing the final transformation within the first 1.8 seconds before showing step-by-step.',
    niche: 'Beauty & Hair Transformations',
    badge: '🔥 Highest Completion Rate',
    defaultCaptionStyle: 'hormozi'
  },
  {
    id: 'expert_duet_reaction',
    title: 'Expert Stitch & Myth-Buster Reaction',
    duration: 30,
    hookText: 'POV: A cosmetic chemist watching people ruin their skin barrier...',
    pacingStyle: 'Top/Bottom split: Top plays viral claim, Bottom delivers authoritative breakdown',
    description: 'Perfect for video response uploads. Positions creator as the high-trust voice calling out dangerous beauty trends.',
    niche: 'Health, Wellness & Dermatology',
    badge: '🎓 High-Authority Viral',
    defaultCaptionStyle: 'clean_minimal'
  },
  {
    id: 'aesthetic_broll_showcase',
    title: 'Luxury Aesthetic Glow & Scenery B-Roll',
    duration: 20,
    hookText: 'Entering my villain era in a Manhattan sky loft at 2 AM...',
    pacingStyle: 'Cinematic Dolly Zoom with Golden Embers & Paris/Manhattan Backdrop',
    description: 'Sleek aspirational lifestyle video designed to drive pinned affiliate product clicks and comments.',
    niche: 'Luxury Lifestyle & Glow-Up',
    badge: '💎 Premium CPM',
    defaultCaptionStyle: 'editorial'
  },
  {
    id: 'ingredient_dupe_breakdown',
    title: 'High-Ticket vs $14 Drugstore Dupe Test',
    duration: 45,
    hookText: 'They don’t want you to know both these bottles are made in the exact same lab...',
    pacingStyle: 'Split test: Formula rating scorecard + interactive price scale callout',
    description: 'Connects directly to the OnTrend Product Insight Engine with scannable fair-trade and discount QR codes.',
    niche: 'Consumer Awareness & Dupes',
    badge: '⚖️ High Affiliate CVR',
    defaultCaptionStyle: 'neon_glow'
  }
];
