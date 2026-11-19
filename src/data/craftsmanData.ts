export interface CraftsmanFilmItem {
  id: string;
  title: string;
  subtitle: string;
  category: 
    | 'super-drilling'
    | 'everyday-products'
    | 'craftsman-action'
    | 'victorian-engineering'
    | 'chimney-demolition'
    | 'historical-ancient-tools';
  categoryLabel: string;
  durationSec: number;
  videoLoopUrl: string;
  posterUrl: string;
  thumbnailUrl: string;
  materialOrSubject: string;
  hardnessOrEra: string;
  toolUsed: string;
  powerOrRpm: string;
  viralHook: string;
  explanation: string;
  metallurgyOrEngineeringBreakdown: {
    material: string;
    properties: string;
    toolSpec: string;
    engineeringSecret: string;
    physicsFact: string;
  };
  infoPack: {
    keyFact1: string;
    keyFact2: string;
    keyFact3: string;
    historicalContext: string;
  };
  recommendedSoundtrack: {
    title: string;
    genre: string;
    tempoBpm: number;
    vibe: string;
    audioSfxKey: 'latheAsmr' | 'chimneyCrash' | 'heavyHammer' | 'steamWhistle' | 'woodPlane' | 'metalSparks';
  };
  suggestedShortTitle: string;
  suggestedHashtags: string[];
}

export const CRAFTSMAN_CATEGORIES = [
  { id: 'all', label: 'All Archives', icon: 'Hammer', count: 18 },
  { id: 'super-drilling', label: 'Super Drilling & Precious Metals', icon: 'Cog', count: 4 },
  { id: 'everyday-products', label: 'Everyday Products Production', icon: 'Factory', count: 3 },
  { id: 'craftsman-action', label: 'Master Craftsmen & Woodworking', icon: 'Wrench', count: 4 },
  { id: 'chimney-demolition', label: 'Chimney Demolishing (Fred Dibnah)', icon: 'Flame', count: 3 },
  { id: 'victorian-engineering', label: 'Victorian Feats & Architecture', icon: 'Landmark', count: 2 },
  { id: 'historical-ancient-tools', label: 'Historical & Ancient Work Skills', icon: 'Shield', count: 2 }
];

export const CRAFTSMAN_FILM_REGISTRY: CraftsmanFilmItem[] = [
  // 1. SUPER DRILLING & PRECEDING METALS
  {
    id: 'titanium-deep-gun-drill',
    title: '500mm Deep Gun-Drill Through Solid Grade-5 Titanium',
    subtitle: 'Industrial Gun-Boring with High-Pressure 100-Bar Coolant',
    category: 'super-drilling',
    categoryLabel: 'Super Drilling & Metals',
    durationSec: 28,
    videoLoopUrl: '/samples/sample_blazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Grade 5 Titanium (Ti-6Al-4V)',
    hardnessOrEra: 'Rockwell C 36 (330 HV)',
    toolUsed: 'Single-Flute Carbide Gun-Drill',
    powerOrRpm: '2,400 RPM @ 120 Bar Internal Coolant',
    viralHook: 'Why aerospace machinists panic the millisecond a drill touches solid titanium...',
    explanation: 'Titanium has low thermal conductivity (6.7 W/m·K), meaning heat does not dissipate into the metal—it concentrates 100% on the cutting edge. Without specialized high-pressure internal coolant flushing the single flute, the drill bit vaporizes in 1.4 seconds.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Ti-6Al-4V (6% Aluminum, 4% Vanadium, 90% Titanium)',
      properties: 'Tensile Strength: 950 MPa. Extreme strength-to-weight ratio; chemically reactive at 600°C+.',
      toolSpec: 'Micro-grain Tungsten Carbide tip with TiAlN (Titanium Aluminum Nitride) physical vapor deposition coating.',
      engineeringSecret: 'The kidney-shaped internal coolant channels force cutting oil through the tool body under 120 bar pressure, instantly freezing the shear zone and ejecting razor-sharp chips.',
      physicsFact: 'Work hardening occurs if the tool pauses for even 0.05 seconds, creating a diamond-hard surface layer that snaps subsequent drills.'
    },
    infoPack: {
      keyFact1: 'A single aerospace titanium spindle core takes 4 hours of non-stop micro-drilling.',
      keyFact2: 'The swarf (metal shavings) can ignite spontaneously like magnesium if coolant flow drops below 80%.',
      keyFact3: 'Tolerances inside turbine shafts are held to ±0.003 millimeters—1/25th the thickness of a human hair.',
      historicalContext: 'Discovered in Cornwall in 1791 by William Gregor, industrial machining of pure titanium was impossible until carbide cutting tools were perfected in the 1950s.'
    },
    recommendedSoundtrack: {
      title: 'Precision Resonance Machine Pulse',
      genre: 'Industrial ASMR & Heavy Synth',
      tempoBpm: 124,
      vibe: 'Rhythmic cutting vibrations with sub-bass drop on drill contact',
      audioSfxKey: 'metalSparks'
    },
    suggestedShortTitle: 'Why Drilling Titanium Terrifies Machinists 😱',
    suggestedHashtags: ['#shorts', '#machining', '#titanium', '#engineering', '#satisfying', '#metalworking']
  },
  {
    id: 'gold-bullion-cnc-carve',
    title: 'High-Speed CNC Milling on 1-Kilogram 24K Pure Gold Ingot',
    subtitle: 'Diamond-Tipped Endmill Cutting Ultra-Lustrous Gold Alloy',
    category: 'super-drilling',
    categoryLabel: 'Super Drilling & Metals',
    durationSec: 25,
    videoLoopUrl: '/samples/sample_escapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: '999.9 Fine Pure Gold (24 Karat)',
    hardnessOrEra: 'Mohs 2.5 / Vickers 25 HV',
    toolUsed: 'Monocrystalline Diamond Ball-Nose Endmill',
    powerOrRpm: '40,000 RPM Air-Bearing High-Speed Spindle',
    viralHook: 'Every second of this video produces $1,200 of microscopic golden dust...',
    explanation: 'Pure gold is so ductile and malleable that conventional steel cutters stick and gall immediately. Diamond tooling spinning at 40,000 RPM shears the metal molecules before thermal flow occurs, leaving a mirror finish straight off the machine.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Au (Gold) - Face-Centered Cubic Crystal Lattice',
      properties: 'Density: 19.32 g/cm³. Extremely malleable; 1 gram can be hammered into a 1-square-meter leaf.',
      toolSpec: 'Single-crystal natural diamond insert ground to a 10-nanometer edge radius.',
      engineeringSecret: 'Vacuum recovery suction surrounds the tool chamber to capture 99.98% of airborne gold microscopic dust for recycling.',
      physicsFact: 'Because gold is a noble metal, it forms no oxide layer; the mirror reflection you see is pure atomic photon backscatter.'
    },
    infoPack: {
      keyFact1: 'A standard 1kg gold bar being surfaced loses only 0.4 grams during engraving, fully recaptured by cyclone filters.',
      keyFact2: 'The cutting force required is less than carving cold butter, but tool deflection of 1 micron ruins the hologram pattern.',
      keyFact3: 'Swiss mints use optical laser interference sensors to measure surface flatness down to 50 nanometers.',
      historicalContext: 'Ancient Egyptian goldsmiths used burnishing stones made of hematite; modern high-frequency micro-machining accomplishes in 10 seconds what took pharaonic jewelers 3 weeks.'
    },
    recommendedSoundtrack: {
      title: 'Golden Shimmer High-Speed Glockenspiel',
      genre: 'Lofi Ambient & Precision ASMR',
      tempoBpm: 110,
      vibe: 'Crystalline pinging and silky smooth motor whine',
      audioSfxKey: 'latheAsmr'
    },
    suggestedShortTitle: 'Carving a $75,000 Gold Bar with a Real Diamond 💎',
    suggestedHashtags: ['#shorts', '#gold', '#cnc', '#luxury', '#satisfyingasmr', '#engineering']
  },
  {
    id: 'tungsten-carbide-wire-edm',
    title: 'Wire Electrical Discharge Machining Through Hardened Tungsten',
    subtitle: '0.25mm Brass Wire Slicing 68 HRC Tool Steel Submerged in Deionized Water',
    category: 'super-drilling',
    categoryLabel: 'Super Drilling & Metals',
    durationSec: 30,
    videoLoopUrl: '/samples/sample_fun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Tungsten Carbide (WC-Co Matrix)',
    hardnessOrEra: 'Rockwell C 68-72 / Mohs 9.5',
    toolUsed: '0.20mm Zinc-Coated High-Tensile Brass Wire',
    powerOrRpm: '100,000 Electrical Sparks per Second (10,000°C Plasma)',
    viralHook: 'This wire is softer than a paperclip, but it cuts the hardest metal on Earth...',
    explanation: 'Wire EDM does not physically touch the workpiece. Instead, millions of microscopic controlled electrical sparks vaporize metal particles at 10,000°C in a dielectric water bath, cutting any conductive metal regardless of hardness.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Sintered Tungsten Carbide with 6% Cobalt binder',
      properties: 'Compressive strength over 6,000 MPa; melts at 2,870°C.',
      toolSpec: 'High-purity brass wire continuously fed from a spool at 15 meters per minute.',
      engineeringSecret: 'The spark gap is maintained at exactly 0.025mm using real-time CNC voltage feedback.',
      physicsFact: 'The metal is never melted by mechanical friction; dielectric cavitation bubbles blast the vaporized atoms away.'
    },
    infoPack: {
      keyFact1: 'Produces parts so precise they create an air-tight hydraulic seal with zero mechanical friction.',
      keyFact2: 'The cut leaves no burrs, zero residual stress, and no heat-affected distortion.',
      keyFact3: 'Wire EDM can cut complex internal keyways and gears that are physically impossible to mill with rotating cutters.'
    ,
      historicalContext: 'Invented in 1943 by Soviet physicists Boris and Natalya Lazarenko during WWII experiments to prevent spark erosion on automotive distributor points.'
    },
    recommendedSoundtrack: {
      title: 'Plasma Arc Discharge Cyber Wave',
      genre: 'Industrial Electro & High-Voltage Drone',
      tempoBpm: 128,
      vibe: 'Static electrical hiss and rhythmic plasma pops',
      audioSfxKey: 'metalSparks'
    },
    suggestedShortTitle: 'Wire That Cuts Hardened Steel Like Butter ⚡',
    suggestedHashtags: ['#shorts', '#wireedm', '#satisfying', '#metalwork', '#engineering', '#physics']
  },

  // 2. CHIMNEY DEMOLITION & STEEPLEJACK FEATS (FRED DIBNAH)
  {
    id: 'fred-dibnah-chimney-felling',
    title: 'Fred Dibnah Felling a 250-Foot Factory Chimney by Fire',
    subtitle: 'Master Steeplejack Demolition Using Wooden Pit-Props & Burning Tires',
    category: 'chimney-demolition',
    categoryLabel: 'Chimney Demolition & Steeplejack',
    durationSec: 32,
    videoLoopUrl: '/samples/sample_joy.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Victorian Red Clay Brick & Lime Mortar (400 Tons)',
    hardnessOrEra: 'Victorian Industrial Era (1880-1910)',
    toolUsed: 'Hand Chisel, Sledgehammer & Seasoned Timber Props',
    powerOrRpm: 'Zero Explosives - 100% Gravity & Controlled Center of Mass Shift',
    viralHook: 'This man brought down a 400-ton brick tower with just wood props and a box of matches...',
    explanation: 'Steeplejack legend Fred Dibnah removed thousands of bricks from the base of massive Victorian chimneys, holding up 400 tons on seasoned timber pit-props. When the fire burnt the props through, the chimney pivoted precisely into the designated drop zone.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Accrington Nori Engineering Bricks (High Density, Low Porosity)',
      properties: 'Compressive strength of Accrington brick exceeds 100 N/mm².',
      toolSpec: 'Hand-forged carbon steel cold chisels, heavy 14lb iron sledgehammers, dry spruce timber balks.',
      engineeringSecret: 'Dibnah cut halfway through the diameter, inserting timber wedges as he went so the masonry never settled unexpectedly until fired.',
      physicsFact: 'As the props burn away, the chimney behaves like a falling timber tree—hinging on the un-cut rear arch before buckling under its own weight.'
    },
    infoPack: {
      keyFact1: 'Fred Dibnah dropped over 90 towering industrial chimneys across Britain without damaging a single adjacent building.',
      keyFact2: 'He climbed 250-foot chimneys using interlocking wooden ladders tied with hemp rope—with zero safety harness or ropes.',
      keyFact3: 'When asked about danger, Dibnah famously said: "If you drop off a 250-foot chimney, you don\'t bounce—you just splash."',
      historicalContext: 'Fred Dibnah MBE (1938–2004) was a celebrated English steeplejack and mechanical enthusiast from Bolton who became a beloved British television personality celebrating Industrial Revolution steam heritage.'
    },
    recommendedSoundtrack: {
      title: 'Victorian Industrial Brass & Steam Roll',
      genre: 'Dramatic Orchestral & Industrial Folk',
      tempoBpm: 118,
      vibe: 'Grand triumphant brass swelling into a colossal low-frequency rumble',
      audioSfxKey: 'chimneyCrash'
    },
    suggestedShortTitle: 'How Fred Dibnah Dropped 400-Ton Chimneys With Fire! 🔥',
    suggestedHashtags: ['#shorts', '#freddibnah', '#demolition', '#history', '#engineering', '#satisfying']
  },
  {
    id: 'fred-dibnah-laddering-spire',
    title: 'Ladders to the Clouds: Steeplejack Spire Overhaul',
    subtitle: 'Fred Dibnah Rigging 200ft Timber Ladders Without Harness or Cranes',
    category: 'chimney-demolition',
    categoryLabel: 'Chimney Demolition & Steeplejack',
    durationSec: 29,
    videoLoopUrl: '/samples/sample_blazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Church Spire Masonry & Copper Weathercock',
    hardnessOrEra: '19th Century British Architecture',
    toolUsed: 'Dog-Irons, Hemp Lashings & Swedish Spruce Ladders',
    powerOrRpm: 'Human Grip, Equilibrium & Nerve of Steel',
    viralHook: 'No crane, no scaffolding, no safety rope—just pure steeplejack nerve 200 feet in the air...',
    explanation: 'To reach the top of inaccessible church spires and chimney caps, Fred hammered iron dog-spikes into the mortar joints, lashed each ladder to the one below, and swung his body over the outer overhangs with casual mastery.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Hand-wrought iron spikes & natural hemp fiber cords',
      properties: 'Hand-wrought iron has superior fatigue resistance and bends rather than snapping suddenly.',
      toolSpec: 'Specially constructed wooden steeplejack ladders with tapered top rungs to fit narrow stonework.',
      engineeringSecret: 'The overhang ladder (the "flying ladder") relies on cantilever tension locked against the stone molding.',
      physicsFact: 'Wind speeds at 250 feet can be double ground level, introducing lateral buffeting oscillation that must be absorbed by the ladders.'
    },
    infoPack: {
      keyFact1: 'Fred would stand balanced on a single rung 250ft high to roll and smoke a cigarette in high gale winds.',
      keyFact2: 'He once restored a church clock 150 feet up by climbing outside the dial using only rope slings.',
      keyFact3: 'His techniques were passed down from 18th-century steeplejack families who repaired cathedral spires after lightning strikes.',
      historicalContext: 'During the Victorian era, steeplejacks were the daredevils of the sky before modern mobile cranes or hydraulic platforms existed.'
    },
    recommendedSoundtrack: {
      title: 'High Altitude Wind & Chimney Bell Toll',
      genre: 'Cinematic Ambient Suspense',
      tempoBpm: 95,
      vibe: 'Breath-taking wind whistling and deep church bell tolling',
      audioSfxKey: 'steamWhistle'
    },
    suggestedShortTitle: 'The Daredevil Steeplejack Who Feared Nothing 🪜',
    suggestedHashtags: ['#shorts', '#freddibnah', '#steeplejack', '#vintage', '#engineering', '#heights']
  },

  // 3. MASTER CRAFTSMEN & WOODWORKING
  {
    id: 'japanese-kumiko-wood-joinery',
    title: 'Japanese Kumiko Screen Joinery Without Nails or Screws',
    subtitle: 'Master Woodworker Chisel-Fitting 10,000 Micro-Grooved Hinoki Strips',
    category: 'craftsman-action',
    categoryLabel: 'Master Craftsmen & Woodworking',
    durationSec: 35,
    videoLoopUrl: '/samples/sample_escapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Japanese Hinoki Cypress & Sugi Cedar',
    hardnessOrEra: 'Asuka Period Traditional Joinery (600 AD to Present)',
    toolUsed: 'Kanna (Hand Plane) & Dozuki Pull Saw',
    powerOrRpm: 'Micron-Level Hand Shaving (9 Microns per Wood Ribbon)',
    viralHook: 'This Japanese woodworking joint holds 500 lbs without a single drop of glue...',
    explanation: 'Kumiko is a traditional Japanese woodworking technique where wooden lattice patterns are assembled purely by friction and interlocking notches cut at 0.1-degree precision. A single screen can contain over 5,000 interlocking cedar facets.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Chamaecyparis obtusa (Japanese Hinoki Cypress)',
      properties: 'Dimensionally stable, insect-resistant, subtle aromatic scent, tight annual growth rings.',
      toolSpec: 'Kanna hand plane blade forged from White Paper Steel (Shirogami #1) laminated to wrought soft iron.',
      engineeringSecret: 'The joints are cut with a 0.05mm interference fit so moisture changes lock the wood tighter rather than loosening it.',
      physicsFact: 'Wood expands across its grain but remains almost static along the grain length; Kumiko alternates grain directions to cancel thermal warp.'
    },
    infoPack: {
      keyFact1: 'A master craftsman spends 10 years learning how to sharpen the Kanna hand plane blade before attempting master screens.',
      keyFact2: 'The resulting shaved wood ribbons are so thin (under 10 microns) that you can clearly read a newspaper through them.',
      keyFact3: 'Ancient Japanese pagodas built with interlocking wood joinery have survived violent earthquakes for over 1,400 years.',
      historicalContext: 'Developed in Japan during the Asuka period (592–710 AD) for shoji sliding doors, Kumiko patterns symbolize prosperity, health, and cosmic geometry.'
    },
    recommendedSoundtrack: {
      title: 'Tranquil Bamboo Grove & Chisel Shaving ASMR',
      genre: 'Japanese Koto & Organic ASMR',
      tempoBpm: 90,
      vibe: 'Crisp wood shaving slices and soothing zen flute notes',
      audioSfxKey: 'woodPlane'
    },
    suggestedShortTitle: 'Secret Japanese Joint That Never Uses Glue or Screws 🪵',
    suggestedHashtags: ['#shorts', '#woodworking', '#kumiko', '#japanesecraft', '#satisfyingasmr', '#craftsman']
  },
  {
    id: 'violin-luthier-spruce-arch',
    title: 'Master Luthier Carving a Stradivarius Violin Arch by Hand',
    subtitle: 'Finger Planes & Gouges Voicing Aged Alpine Spruce Soundboard',
    category: 'craftsman-action',
    categoryLabel: 'Master Craftsmen & Woodworking',
    durationSec: 31,
    videoLoopUrl: '/samples/sample_fun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: '300-Year-Old Italian Val di Fiemme Resonance Spruce',
    hardnessOrEra: 'Cremona Master Luthier Tradition (17th Century)',
    toolUsed: 'Brass Ibex Finger Plane & Scraper Blades',
    powerOrRpm: 'Tuned by Tap-Tone Resonance & Flex Resistance',
    viralHook: 'Why this 3-millimeter piece of carved wood is worth over $10,000,000...',
    explanation: 'The soundboard of a concert violin is graduated from 4.5mm in the center down to 2.2mm at the acoustic flanks. The luthier taps the wood constantly listening for specific musical pitch modes (Chladni sand patterns) to maximize acoustic projection.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Picea abies (European Alpine Resonance Spruce)',
      properties: 'High sound velocity (over 5,000 m/s) with exceptionally low acoustic damping.',
      toolSpec: 'Miniature brass arching planes with curved soles and high-speed carbon steel blades.',
      engineeringSecret: 'The soundboard is shaped so internal tension balances the 20-kilogram string bridge downforce without collapsing.',
      physicsFact: 'The f-holes act as a Helmholtz resonator, projecting the warm fundamental frequencies between 250 Hz and 350 Hz.'
    },
    infoPack: {
      keyFact1: 'Antonio Stradivari selected his spruce from trees that grew during the "Little Ice Age", producing unusually dense, uniform rings.',
      keyFact2: 'The final thicknessing is verified using calipers accurate to one-tenth of a millimeter.',
      keyFact3: 'Traditional varnish is made of natural propolis, linseed oil, and amber resin dissolved in spirits.',
      historicalContext: 'Cremona, Italy became the epicenter of violin making under Andrea Amati, Giuseppe Guarneri del Gesù, and Antonio Stradivari.'
    },
    recommendedSoundtrack: {
      title: 'Solo Cello Arching Resonance',
      genre: 'Warm Classical & Wood Tap ASMR',
      tempoBpm: 104,
      vibe: 'Warm resonant wood taps with lush classical violin melody',
      audioSfxKey: 'woodPlane'
    },
    suggestedShortTitle: 'Carving a $10M Stradivarius Violin by Hand 🎻',
    suggestedHashtags: ['#shorts', '#violin', '#luthier', '#woodworking', '#classicalmusic', '#handmade']
  },

  // 4. EVERYDAY PRODUCTS PRODUCTION
  {
    id: 'mechanical-pencil-high-speed-assembly',
    title: 'Mesmerizing 1,200/Min Mechanical Pencil Robotic Assembly Loop',
    subtitle: 'Kinetic Cam-Driven Carousel Pressing Clutch Claws and Micro-Springs',
    category: 'everyday-products',
    categoryLabel: 'Everyday Products Production',
    durationSec: 26,
    videoLoopUrl: '/samples/sample_joy.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Brass Collet, Polyoxymethylene (POM) Barrel & Music Wire Spring',
    hardnessOrEra: 'Modern High-Throughput Precision Automation',
    toolUsed: 'Rotary Dial Indexing Machine with Optoelectronic Vision QC',
    powerOrRpm: '20 Cycles per Second (Synchronized Mechanical Cams)',
    viralHook: 'This machine makes the pencil in your pocket in exactly 0.05 seconds...',
    explanation: 'Mechanical pencil internals require inserting three miniature brass chuck jaws into a spring-loaded tapered brass sleeve. High-speed dial tables spin through 16 stations, feeding, crimping, testing, and ejecting without human hands touching a single component.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Cartridge Brass (70% Copper, 30% Zinc) & Piano Wire Grade Music Spring',
      properties: 'Superior spring recovery fatigue life exceeding 500,000 click actuations.',
      toolSpec: 'Pneumatic pick-and-place grippers with hardened steel chuck insertion mandrels.',
      engineeringSecret: 'Mechanical barrel cams drive all 16 stations from a single 5kW motor, guaranteeing permanent timing synchronization.',
      physicsFact: 'Optic laser sensors detect lead click advance of exactly 0.5mm per button press in 4 milliseconds.'
    },
    infoPack: {
      keyFact1: 'A single assembly line outputs over 60,000 flawless mechanical pencils in an 8-hour shift.',
      keyFact2: 'The tiny three-jaw clutch mechanism inside is miniature enough to pass through the eye of a needle.',
      keyFact3: 'Defective units with lead-feed deviation greater than 0.02mm are ejected with high-speed air jets.'
    ,
      historicalContext: 'Invented in 1822 in Britain by Sampson Mordan and John Isaac Hawkins, mechanical pencils transitioned to mass automation in Tokyo during the 1960s.'
    },
    recommendedSoundtrack: {
      title: 'Satisfying Kinetic Clockwork Beat',
      genre: 'Electro Swing & Industrial Tick',
      tempoBpm: 130,
      vibe: 'Snappy rhythmic clicks and pneumatic air puffs synchronized to 120bpm',
      audioSfxKey: 'latheAsmr'
    },
    suggestedShortTitle: 'How Your 0.5mm Mechanical Pencil is REALLY Made! ✏️',
    suggestedHashtags: ['#shorts', '#howitsmade', '#manufacturing', '#satisfying', '#factory', '#automation']
  },
  {
    id: 'glass-bottle-is-machine-blow',
    title: 'Individual Section (IS) Machine Glowing Red Glass Bottle Blow',
    subtitle: '1,100°C Molten Glass Gob Blown Into Beer Bottles at 600/Min',
    category: 'everyday-products',
    categoryLabel: 'Everyday Products Production',
    durationSec: 30,
    videoLoopUrl: '/samples/sample_blazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Soda-Lime Silica Glass (Molten Viscous State)',
    hardnessOrEra: '1,150°C Furnace Operation (Continuous 24/7 Production)',
    toolUsed: 'Cast-Iron Chilled Molds & Compressed Air Blow Heads',
    powerOrRpm: '10-Section Quad-Gob Machine Producing 600 Bottles per Minute',
    viralHook: 'Watch this glowing 1,100°C molten blob transform into a cold bottle in 3 seconds...',
    explanation: 'Shears snip glowing molten glass "gobs" dropping down steel delivery chutes into cast iron blank molds. A puff of compressed air forms the parison preform, then it is flipped by an invert arm into the blow mold where high-pressure air inflates it into the final bottle.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Soda-Lime Glass (70% SiO2, 15% Na2O, 9% CaO)',
      properties: 'Viscosity drops exponentially as temperature climbs; zero plastic yield phase—it shifts directly from liquid to brittle solid.',
      toolSpec: 'Spheroidal graphite iron molds coated with graphite dope lubricant.',
      engineeringSecret: 'Timing valves open and close pneumatic cylinders with microsecond accuracy via electronic camshafts.',
      physicsFact: 'The bottles must immediately enter an annealing lehr tunnel to cool slowly, otherwise thermal stress cracks them violently.'
    },
    infoPack: {
      keyFact1: 'A commercial glass furnace runs continuously for 12 to 15 years without ever turning off the gas fire.',
      keyFact2: 'Each individual bottle takes under 3.5 seconds from molten drop to rigid glowing container.',
      keyFact3: 'Recycled cullet glass melts at 200°C lower temperature than raw sand, saving immense energy.'
    ,
      historicalContext: 'Michael Owens patented the first automated bottle machine in 1903, which ended child labor in glass factories and revolutionized beverage packaging.'
    },
    recommendedSoundtrack: {
      title: 'Molten Furnace Glow Synth Ambient',
      genre: 'Cinematic Synth & Industrial Fire',
      tempoBpm: 116,
      vibe: 'Pulsing furnace bass with satisfying air whooshes and glass clinks',
      audioSfxKey: 'metalSparks'
    },
    suggestedShortTitle: 'Inside a 1,100°C Molten Glass Factory 🍾🔥',
    suggestedHashtags: ['#shorts', '#glassmaking', '#factory', '#satisfying', '#fire', '#howitsmade']
  },

  // 5. VICTORIAN FEATS & INGENIOUS ARCHITECTURE
  {
    id: 'victorian-steam-beam-engine',
    title: 'Crossness Pumping Station: Victorian Iron Cathedral & 52-Ton Beam Engine',
    subtitle: 'Sir Joseph Bazalgette\'s Ornamental Gilt Cast Iron Sewage Engine (1865)',
    category: 'victorian-engineering',
    categoryLabel: 'Victorian Feats & Architecture',
    durationSec: 33,
    videoLoopUrl: '/samples/sample_escapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Victorian Cast Iron, Gilded Brass & Steam Flywheel',
    hardnessOrEra: 'Victorian Industrial Golden Age (Opened 1865 by Prince of Wales)',
    toolUsed: 'Rotative Beam Engine with 27-Foot 52-Ton Flywheel',
    powerOrRpm: '11 RPM Pumping 6 Tons of Water per Stroke',
    viralHook: 'The Victorians built this breathtaking iron cathedral... just to pump sewage!',
    explanation: 'Following London\'s "Great Stink" of 1858, Sir Joseph Bazalgette engineered the world\'s greatest underground sewer network. To pump it out to the Thames estuary, they constructed Crossness: a temple of polychrome cast-iron foliage housing four gargantuan beam engines named after royalty.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Grey Cast Iron with hand-applied gold leaf & cobalt blue enameling',
      properties: 'Extreme compressive strength and vibration damping for heavy oscillating mechanical beams.',
      toolSpec: 'Hand-scraped 19th-century babbitt bearings and double-acting low-pressure steam cylinders.',
      engineeringSecret: 'The 52-ton flywheel smooths out the mechanical dead center, allowing the engine to idle at just 11 strokes per minute.',
      physicsFact: 'Bazalgette\'s brick sewer arches were so structurally sound that almost 100% of them remain in full daily use today, 160 years later.'
    },
    infoPack: {
      keyFact1: 'Bazalgette deliberately doubled his calculated sewer pipe diameter, famously saying: "We\'re only going to build this once."',
      keyFact2: 'The ornate cast iron arches feature carved figs, water lilies, and ivy leaves painted in vibrant 1860s jewel tones.',
      keyFact3: 'Bazalgette\'s sewer engineering wiped out cholera epidemics in London virtually overnight.',
      historicalContext: 'Sir Joseph Bazalgette (1819–1891) transformed Victorian London with the Thames Embankment, Crossness, and over 1,100 miles of underground brick tunnels.'
    },
    recommendedSoundtrack: {
      title: 'Cathedral of Steam Grand Waltz',
      genre: 'Steampunk Victorian & Pipe Organ',
      tempoBpm: 108,
      vibe: 'Majestic pipe organ chords with gentle rhythmic steam hiss',
      audioSfxKey: 'steamWhistle'
    },
    suggestedShortTitle: 'The Victorian "Cathedral" Built for Sewage?! 🏰😮',
    suggestedHashtags: ['#shorts', '#victorian', '#architecture', '#history', '#engineering', '#london']
  },

  // 6. HISTORICAL & ANCIENT WORK SKILLS
  {
    id: 'ancient-egyptian-granite-core-drill',
    title: 'Ancient Egyptian Granite Tubular Core Drilling (No Electricity)',
    subtitle: 'Copper Tube, Wet Quartz Sand Abrasive & Bow-Drill RPM Mechanics',
    category: 'historical-ancient-tools',
    categoryLabel: 'Historical & Ancient Work Skills',
    durationSec: 34,
    videoLoopUrl: '/samples/sample_fun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    materialOrSubject: 'Aswan Pink Granite (Hardness Mohs 7)',
    hardnessOrEra: 'Old Kingdom Egypt (c. 2500 BC, 4,500 Years Ago)',
    toolUsed: 'Hollow Cast Copper Tube with Quartz Slurry & Bow String',
    powerOrRpm: 'Human Reciprocating Bow Stroke (approx 150 RPM with Downward Pressure)',
    viralHook: 'How did ancient people cut holes through rock harder than iron with just copper and sand?',
    explanation: 'Archaeologists discovered circular drill cores in Aswan granite quarries dating back 4,500 years. Modern experimental archaeology proves that soft copper tubes don\'t cut granite—the quartz sand abrasive trapped beneath the copper rim crushes the granite feldspar under reciprocating rotation.',
    metallurgyOrEngineeringBreakdown: {
      material: 'Aswan Pink Granite (Quartz, Potassium Feldspar, Hornblende)',
      properties: 'Hardness 7 on the Mohs scale—far harder than bronze, copper, or unhardened iron.',
      toolSpec: 'Cold-hammered sheet copper bent into a seamless cylinder with wooden spindle top.',
      engineeringSecret: 'The soft copper rim embeds the sharp microscopic quartz crystals, acting exactly like a modern industrial diamond core drill.',
      physicsFact: 'The tapered core rings found at Giza match a downward feed rate of approximately 2 millimeters per hour of continuous drilling.'
    },
    infoPack: {
      keyFact1: 'Flinders Petrie in 1883 first recognized the circular spiral striations on granite sarcophagi as evidence of tube drilling.',
      keyFact2: 'The hollow core left inside the hole was snapped off using wooden wedges soaked in water that expanded overnight.',
      keyFact3: 'Similar tube-drilling methods were used by the Indus Valley Civilization to drill carnelian beads 0.5mm wide.',
      historicalContext: 'Demonstrated in 1999 by experimental archaeologist Denys Stocks using period-accurate tools and sand from the Nile basin.'
    },
    recommendedSoundtrack: {
      title: 'Ancient Sands & Rhythmic Stone Scrape',
      genre: 'Mystical Acoustic Percussion',
      tempoBpm: 98,
      vibe: 'Hypnotic sand grinding texture with ancient wood flute',
      audioSfxKey: 'heavyHammer'
    },
    suggestedShortTitle: 'How Ancient Egyptians Drilled Solid Granite! 🪨🔺',
    suggestedHashtags: ['#shorts', '#ancienthistory', '#egypt', '#archaeology', '#engineering', '#granite']
  }
];

export const MUSIC_SFX_PRESETS = [
  { id: 'latheAsmr', name: 'Precision Lathe & Shaving ASMR', icon: '🎧', bpm: 120, desc: 'Hypnotic high-frequency metal and wood cutting tones' },
  { id: 'chimneyCrash', name: 'Fred Dibnah Chimney Subdrop Impact', icon: '💥', bpm: 110, desc: 'Massive low-end rumble of 400-ton brick collapse' },
  { id: 'heavyHammer', name: 'Blacksmith Anvil & Heavy Forge Hit', icon: '🔨', bpm: 100, desc: 'Sharp ring of hardened high-carbon tool steel' },
  { id: 'steamWhistle', name: 'Victorian Steam Whistle & Beam Hiss', icon: '🚂', bpm: 95, desc: 'Historic boiler steam release and governor spin' },
  { id: 'woodPlane', name: 'Japanese Kanna Shaving Silk Ribbon', icon: '🪵', bpm: 90, desc: 'Silky smooth paper-thin wood slicing sound' },
  { id: 'metalSparks', name: 'Wire EDM Plasma Arc & High Voltage', icon: '⚡', bpm: 128, desc: 'Crisp electrical sparks and coolant jet rush' }
];
