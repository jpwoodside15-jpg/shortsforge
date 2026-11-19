export type LocationCategory = 
  | 'all'
  | 'premier-league'
  | 'bundesliga'
  | 'serie-a'
  | 'eredivisie'
  | 'spanish-clubs'
  | 'south-american'
  | 'capital-cities'
  | 'epic-sights'
  | 'historical-monuments'
  | 'coastlines'
  | 'summits-wonders';

export interface CategoryInfo {
  id: LocationCategory;
  label: string;
  badge: string;
  icon: string;
  description: string;
}

export const CATEGORIES_CONFIG: CategoryInfo[] = [
  { id: 'all', label: 'All Sights & Stadiums', badge: 'Full Roster', icon: 'Globe', description: 'Explore all 3D drone locations worldwide' },
  { id: 'premier-league', label: 'Premier League Stadiums', badge: 'England', icon: 'Shield', description: 'Drone fly-throughs of England’s most legendary football cathedrals' },
  { id: 'bundesliga', label: 'Bundesliga Stadiums', badge: 'Germany', icon: 'Flag', description: 'From Dortmund’s Yellow Wall to the luminous Allianz Arena' },
  { id: 'serie-a', label: 'Serie A Stadiums', badge: 'Italy', icon: 'Flame', description: 'San Siro’s iconic spiral towers to Stadio Olimpico' },
  { id: 'eredivisie', label: 'Eredivisie Stadiums', badge: 'Netherlands', icon: 'Zap', description: 'Johan Cruyff Arena and the legendary De Kuip cauldron' },
  { id: 'spanish-clubs', label: 'Spanish Clubs (La Liga)', badge: 'Spain', icon: 'Trophy', description: 'Santiago Bernabéu futuristic roof, Spotify Camp Nou & Mestalla' },
  { id: 'south-american', label: 'South American Clubs', badge: 'CONMEBOL', icon: 'HeartHandshake', description: 'La Bombonera vibrating stands, El Monumental & Maracanã' },
  { id: 'capital-cities', label: 'Capital Cities Drone Flights', badge: 'World Metros', icon: 'Building2', description: 'High-altitude 4K FPV flyovers over famous capital skylines' },
  { id: 'coastlines', label: 'Dramatic Coastlines', badge: 'Ocean & Cliffs', icon: 'Waves', description: 'Vertical sea cliffs, turquoise surf and jagged headlands' },
  { id: 'historical-monuments', label: 'Historical Monuments', badge: 'Heritage', icon: 'Landmark', description: 'Ancient architectural marvels and wonder monuments' },
  { id: 'epic-sights', label: 'Epic Sights & Summits', badge: 'Nature', icon: 'Mountain', description: 'Grand Canyon chasms, Everest ridge, and natural phenomena' }
];

export interface WonderLocation {
  id: string;
  name: string;
  category: LocationCategory;
  categoryLabel: string;
  type: string;
  country: string;
  elevation: string;
  coordinates: string;
  temperature: string;
  clubOrCity?: string;
  capacity?: string;
  flightType: 'FPV Stadium Dive' | '360 Orbit' | 'Coastal Cruise' | 'City Flyover' | 'Monument Spiral';
  hookTitle: string;
  viralHookSentence: string;
  youtubeTitle: string;
  youtubeDescription: string;
  hashtags: string[];
  ambientSfx: 'wind' | 'waterfall' | 'whoosh' | 'chime' | 'drone' | 'stadiumRoar' | 'oceanWaves' | 'cityTraffic';
  skyColors: [string, string, string]; // Top, Middle, Ground
  accentColor: string;
  narrativeFacts: string[];
  // 3D Visual Rendering Profile
  meshType: 'stadium' | 'city' | 'coastline' | 'pyramid' | 'colosseum' | 'tajmahal' | 'canyon' | 'mountain';
  stadiumColors?: {
    pitch: string;
    seats: string;
    roof: string;
    floodlights: string;
    accent: string;
  };
  cityLandmark?: 'eiffel' | 'bigben' | 'tokyo' | 'capitol' | 'berlin' | 'general';
}

export const WONDERS_DATABASE: WonderLocation[] = [
  // ==========================================
  // 1. PREMIER FOOTBALL STADIUMS (PREMIER LEAGUE)
  // ==========================================
  {
    id: 'anfield',
    name: 'Anfield Stadium (Liverpool FC)',
    category: 'premier-league',
    categoryLabel: 'Premier League',
    type: 'Football Stadium',
    country: 'Liverpool, England, UK',
    elevation: '52m Altitude',
    coordinates: '53°25\'51" N, 2°57\'39" W',
    temperature: '14°C / Merseyside Gale',
    clubOrCity: 'Liverpool FC',
    capacity: '61,276 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'Why Opponents Fear The Kop Stand',
    viralHookSentence: 'When 60,000 Liverpool fans sing "You\'ll Never Walk Alone", decibel meters exceed a jet engine taking off...',
    youtubeTitle: 'FPV Drone Dive Through Anfield Stadium (4K 60FPS)',
    youtubeDescription: 'Cinematic FPV drone flight through Anfield Stadium in Liverpool. Flying directly over the Kop Stand and skimming the center pitch turf.\n\n#shorts #liverpoolfc #anfield #premierleague #dronefpv #football',
    hashtags: ['#shorts', '#anfield', '#liverpoolfc', '#premierleague', '#football'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#450a0a', '#991b1b', '#fee2e2'],
    accentColor: '#DC2626',
    narrativeFacts: [
      'The Kop stand was named after Spion Kop hill in South Africa where British soldiers fought in 1900.',
      'The newly expanded Anfield Road Stand raised capacity past 61,000 with a sweeping 300-ton roof truss.',
      'The iconic "This Is Anfield" tunnel sign was placed by Bill Shankly to remind players who they play for and opponents who they play against.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#b91c1c',
      roof: '#ffffff',
      floodlights: '#fef08a',
      accent: '#ef4444'
    }
  },
  {
    id: 'old-trafford',
    name: 'Old Trafford (Theatre of Dreams)',
    category: 'premier-league',
    categoryLabel: 'Premier League',
    type: 'Football Stadium',
    country: 'Greater Manchester, England, UK',
    elevation: '42m Altitude',
    coordinates: '53°27\'47" N, 2°17\'29" W',
    temperature: '12°C / Manchester Rain',
    clubOrCity: 'Manchester United',
    capacity: '74,310 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The Largest Club Football Stadium in England',
    viralHookSentence: 'Flying an FPV drone right down the Sir Alex Ferguson Stand at Old Trafford before 74,000 screaming fans...',
    youtubeTitle: 'Old Trafford "Theatre of Dreams" Drone Fly-Through (4K)',
    youtubeDescription: 'Spectacular drone flight over Manchester United’s historic Old Trafford. Revealing the Stretford End, Sir Alex Ferguson Stand, and pitch-level view.\n\n#shorts #manchesterunited #oldtrafford #premierleague #mufc',
    hashtags: ['#shorts', '#oldtrafford', '#manchesterunited', '#premierleague', '#mufc'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#18181b', '#7f1d1d', '#fecaca'],
    accentColor: '#DC2626',
    narrativeFacts: [
      'Nicknamed the "Theatre of Dreams" by Sir Bobby Charlton, it has been United\'s home ground since 1910.',
      'Surviving bombing runs during World War II in 1941, the club played at Maine Road for nearly a decade while rebuilding.',
      'The Stretford End is world-famous for housing Manchester United\'s most passionate hardcore supporters.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#991b1b',
      roof: '#e2e8f0',
      floodlights: '#fef9c3',
      accent: '#b91c1c'
    }
  },
  {
    id: 'emirates-stadium',
    name: 'Emirates Stadium (Arsenal FC)',
    category: 'premier-league',
    categoryLabel: 'Premier League',
    type: 'Football Stadium',
    country: 'Islington, London, UK',
    elevation: '35m Altitude',
    coordinates: '51°33\'18" N, 0°06\'31" W',
    temperature: '15°C / London Breeze',
    clubOrCity: 'Arsenal FC',
    capacity: '60,704 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The $700 Million Engineering Masterpiece in North London',
    viralHookSentence: 'This 60,000-seat bowl has four circular tiers engineered to trap stadium acoustic roar right onto the pitch...',
    youtubeTitle: 'Arsenal Emirates Stadium 360° Drone Flight (4K Cinematic)',
    youtubeDescription: 'Aerial drone flight over Arsenal\'s Emirates Stadium in North London. Flying over the Clock End, North Bank, and curved translucent canopy.\n\n#shorts #arsenal #emiratesstadium #coyg #premierleague',
    hashtags: ['#shorts', '#arsenal', '#emiratesstadium', '#gunners', '#premierleague'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#1e1b4b', '#991b1b', '#fee2e2'],
    accentColor: '#EF4444',
    narrativeFacts: [
      'Built in 2006 to replace historic Highbury, featuring an oval curved roof suspended on giant tubular steel arches.',
      'The stadium pitch utilizes subsurface hydronic heating and fiber-reinforced turf to survive harsh British winters.',
      'Houses the historic 1930s Highbury Clock above the South Stand (the Clock End).'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#dc2626',
      roof: '#ffffff',
      floodlights: '#fef08a',
      accent: '#f87171'
    }
  },
  {
    id: 'etihad-stadium',
    name: 'Etihad Stadium (Manchester City)',
    category: 'premier-league',
    categoryLabel: 'Premier League',
    type: 'Football Stadium',
    country: 'Manchester, England, UK',
    elevation: '45m Altitude',
    coordinates: '53°28\'59" N, 2°12\'01" W',
    temperature: '13°C / Overcast',
    clubOrCity: 'Manchester City',
    capacity: '53,400 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The Cable-Tied Arena of the Treble Winners',
    viralHookSentence: 'Notice those 12 massive spiral cylindrical towers holding up the entire roof with tension cables...',
    youtubeTitle: 'Etihad Stadium Drone Fly-Through | Manchester City 4K',
    youtubeDescription: 'Flying an FPV cinematic drone over Manchester City’s Etihad Stadium, showing the circular access ramps and state-of-the-art pitch.\n\n#shorts #mancity #etihad #premierleague #football',
    hashtags: ['#shorts', '#mancity', '#etihadstadium', '#premierleague'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#082f49', '#0284c7', '#e0f2fe'],
    accentColor: '#38BDF8',
    narrativeFacts: [
      'Originally constructed for the 2002 Commonwealth Games before converting to a world-class football arena.',
      'The catenary cable-net roof is suspended by 12 external pylons with tension wire rigging.',
      'Currently undergoing expansion of the North Stand to push capacity beyond 60,000 fans.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#38bdf8',
      roof: '#cbd5e1',
      floodlights: '#fef08a',
      accent: '#0284c7'
    }
  },
  {
    id: 'tottenham-stadium',
    name: 'Tottenham Hotspur Stadium',
    category: 'premier-league',
    categoryLabel: 'Premier League',
    type: 'Football Stadium',
    country: 'Tottenham, London, UK',
    elevation: '28m Altitude',
    coordinates: '51°36\'15" N, 0°03\'58" W',
    temperature: '14°C / Crisp Clear',
    clubOrCity: 'Tottenham Hotspur',
    capacity: '62,850 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The World’s First Retractable Dividing Football Pitch',
    viralHookSentence: 'Underneath this grass pitch lies an entire synthetic NFL field on 2,000 steel wheels that slides in 25 minutes...',
    youtubeTitle: 'Tottenham Hotspur Stadium Drone Tour: The $1.2B Wonder (4K)',
    youtubeDescription: '360 degree drone flight around the state-of-the-art Tottenham Hotspur Stadium. The giant 17,500-seat single-tier South Stand.\n\n#shorts #spurs #tottenham #premierleague #thfc',
    hashtags: ['#shorts', '#spurs', '#tottenhamstadium', '#premierleague'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#0f172a', '#1e293b', '#e2e8f0'],
    accentColor: '#38BDF8',
    narrativeFacts: [
      'The single-tier South Stand holds 17,500 fans and is the largest single-tier terrace in the United Kingdom.',
      'Features its own microbrewery with bottom-up dispensing taps pouring 10,000 pints per minute.',
      'A golden cockerel replica perched on the South Stand roof includes a real dent from Paul Gascoigne\'s air rifle.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#1e3a8a',
      roof: '#f8fafc',
      floodlights: '#fef9c3',
      accent: '#60a5fa'
    }
  },

  // ==========================================
  // 2. BUNDESLIGA STADIUMS
  // ==========================================
  {
    id: 'signal-iduna-park',
    name: 'Signal Iduna Park (Westfalenstadion)',
    category: 'bundesliga',
    categoryLabel: 'Bundesliga',
    type: 'Football Stadium',
    country: 'Dortmund, North Rhine-Westphalia, Germany',
    elevation: '86m Altitude',
    coordinates: '51°29\'33" N, 7°27\'06" E',
    temperature: '11°C / Autumn Wind',
    clubOrCity: 'Borussia Dortmund (BVB)',
    capacity: '81,365 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'Standing in Front of Europe’s Legendary "Yellow Wall"',
    viralHookSentence: 'This single standing terrace holds 25,000 screaming Dortmund fans jumping in complete synchronization...',
    youtubeTitle: 'Dortmund Yellow Wall Drone Dive: Signal Iduna Park (4K)',
    youtubeDescription: 'Flying an FPV drone right down into the legendary "Gelbe Wand" (Yellow Wall) at Signal Iduna Park in Dortmund.\n\n#shorts #bvb #dortmund #yellowwall #bundesliga #football',
    hashtags: ['#shorts', '#bvb', '#signalidunapark', '#bundesliga', '#dortmund'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#18181b', '#713f12', '#fef08a'],
    accentColor: '#EAB308',
    narrativeFacts: [
      'The Südtribüne ("Yellow Wall") is the largest free-standing grandstand for standing spectators in Europe with 25,000 capacity.',
      'The distinctive 62-meter-high bright yellow pylon roof trusses are visible across the entire Ruhr Valley.',
      'Consistently holds the highest average attendance of any football club in the world (>81,000 fans per match).'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#eab308',
      roof: '#18181b',
      floodlights: '#fef08a',
      accent: '#facc15'
    }
  },
  {
    id: 'allianz-arena',
    name: 'Allianz Arena (FC Bayern Munich)',
    category: 'bundesliga',
    categoryLabel: 'Bundesliga',
    type: 'Football Stadium',
    country: 'Munich, Bavaria, Germany',
    elevation: '500m Altitude',
    coordinates: '48°13\'08" N, 11°37\'29" E',
    temperature: '9°C / Alpine Chill',
    clubOrCity: 'Bayern Munich',
    capacity: '75,024 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The Glowing Inflatable Spaceship of Munich',
    viralHookSentence: 'This entire stadium facade is wrapped in 2,784 glowing diamond-shaped air cushions that light up the night sky...',
    youtubeTitle: 'Allianz Arena Glowing 360° Drone Flight | Bayern Munich (4K)',
    youtubeDescription: 'Cinematic night drone flight circling the glowing ETFE facade of the Allianz Arena in Munich, home of FC Bayern Munich.\n\n#shorts #bayernmunich #allianzarena #bundesliga #football',
    hashtags: ['#shorts', '#bayernmunich', '#allianzarena', '#bundesliga', '#fcbayern'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#0f172a', '#7f1d1d', '#fee2e2'],
    accentColor: '#EF4444',
    narrativeFacts: [
      'Wrapped in 2,784 inflated ETFE plastic panels each illuminated by 300,000 LEDs capable of changing to red, white, or blue.',
      'German motorway police require gradual lighting changes because sudden switches caused car accidents on the nearby Autobahn A9.',
      'The stadium interior features steep three-tier seating designed so even the highest tier sits close to the action.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#dc2626',
      roof: '#f8fafc',
      floodlights: '#fef9c3',
      accent: '#b91c1c'
    }
  },
  {
    id: 'deutsche-bank-park',
    name: 'Deutsche Bank Park (Waldstadion)',
    category: 'bundesliga',
    categoryLabel: 'Bundesliga',
    type: 'Football Stadium',
    country: 'Frankfurt, Hesse, Germany',
    elevation: '100m Altitude',
    coordinates: '50°04\'07" N, 8°38\'43" E',
    temperature: '13°C / Forest Breeze',
    clubOrCity: 'Eintracht Frankfurt',
    capacity: '58,000 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The Stadium Built Inside a Forest with a Convertible Roof',
    viralHookSentence: 'Watch this 30-ton video cube suspended in mid-air as a 9,000-square-meter fabric roof opens over 58,000 fans...',
    youtubeTitle: 'Eintracht Frankfurt Waldstadion Drone Flight (4K Ultra HD)',
    youtubeDescription: 'Spectacular drone flight through Frankfurt\'s Deutsche Bank Park, highlighting the central video screen and black-and-red fan terrace.\n\n#shorts #eintrachtfrankfurt #waldstadion #bundesliga',
    hashtags: ['#shorts', '#eintracht', '#frankfurt', '#bundesliga'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#18181b', '#3f3f46', '#f43f5e'],
    accentColor: '#F43F5E',
    narrativeFacts: [
      'Surrounded completely by the historic Frankfurt City Forest (Stadtwald), giving it the beloved nickname Waldstadion.',
      'Features a unique cable-supported textile roof that retracts into a central video cube like a convertible automobile.',
      'Home to one of the most passionate fan bases in Europe, famous for massive European choreographies (tifos).'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#18181b',
      roof: '#e4e4e7',
      floodlights: '#fef08a',
      accent: '#ef4444'
    }
  },

  // ==========================================
  // 3. SERIE A STADIUMS
  // ==========================================
  {
    id: 'san-siro',
    name: 'San Siro (Stadio Giuseppe Meazza)',
    category: 'serie-a',
    categoryLabel: 'Serie A',
    type: 'Football Stadium',
    country: 'Milan, Lombardy, Italy',
    elevation: '120m Altitude',
    coordinates: '45°28\'41" N, 9°07\'27" E',
    temperature: '16°C / Milan Sunset',
    clubOrCity: 'AC Milan & Inter Milan',
    capacity: '75,817 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The Brutalist Temple Shared by Two Fierce Rivals',
    viralHookSentence: 'These 11 massive concrete spiral towers look like alien architecture when 75,000 fans walk up to the third tier...',
    youtubeTitle: 'San Siro Drone Fly-Through | Milan Derby Cathedral (4K)',
    youtubeDescription: 'FPV drone flight over Stadio Giuseppe Meazza (San Siro) in Milan, shared by AC Milan and Inter Milan.\n\n#shorts #sansiro #acmilan #intermilan #seriea #calcio',
    hashtags: ['#shorts', '#sansiro', '#acmilan', '#inter', '#seriea', '#calcio'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#450a0a', '#1e1b4b', '#fee2e2'],
    accentColor: '#DC2626',
    narrativeFacts: [
      'Named Stadio Giuseppe Meazza in honor of the two-time World Cup winner who played for both Inter and AC Milan.',
      'The 11 cylindrical concrete spiral towers support the immense third tier and red steel roof framework constructed for Italia \'90.',
      'Host to four European Cup / Champions League finals, widely revered as the "Cathedral of Calcio".'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#b91c1c',
      roof: '#ef4444',
      floodlights: '#fef08a',
      accent: '#3b82f6'
    }
  },
  {
    id: 'stadio-olimpico',
    name: 'Stadio Olimpico Rome',
    category: 'serie-a',
    categoryLabel: 'Serie A',
    type: 'Football Stadium',
    country: 'Rome, Lazio, Italy',
    elevation: '20m Altitude',
    coordinates: '41°56\'02" N, 12°27\'17" E',
    temperature: '21°C / Mediterranean Sun',
    clubOrCity: 'AS Roma & SS Lazio',
    capacity: '72,698 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The Eternal City Arena of the Derby della Capitale',
    viralHookSentence: 'Flying directly over the dividing line between Curva Sud and Curva Nord on Rome matchday...',
    youtubeTitle: 'Stadio Olimpico Rome Drone Tour | Derby della Capitale (4K)',
    youtubeDescription: 'Cinematic 360 degree drone flight circling Stadio Olimpico in Rome, flanked by Monte Mario and the Tiber River.\n\n#shorts #asroma #lazio #stadioolimpico #seriea #rome',
    hashtags: ['#shorts', '#stadioolimpico', '#asroma', '#sslazio', '#seriea'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#78350f', '#991b1b', '#fef3c7'],
    accentColor: '#F59E0B',
    narrativeFacts: [
      'Located within the Foro Italico sports complex alongside classical Roman marble statues.',
      'Hosts the fiercely contested Derby della Capitale between AS Roma and SS Lazio.',
      'Covered by a massive white PTFE fiberglass membrane roof that shelters all 72,000 spectators.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#831843',
      roof: '#f8fafc',
      floodlights: '#fef9c3',
      accent: '#0284c7'
    }
  },
  {
    id: 'allianz-stadium-juventus',
    name: 'Allianz Stadium (Juventus FC)',
    category: 'serie-a',
    categoryLabel: 'Serie A',
    type: 'Football Stadium',
    country: 'Turin, Piedmont, Italy',
    elevation: '240m Altitude',
    coordinates: '45°06\'34" N, 7°38\'28" E',
    temperature: '15°C / Alpine Foothills',
    clubOrCity: 'Juventus FC',
    capacity: '41,507 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The 86-Meter Tricolor Masts of Turin',
    viralHookSentence: 'The two 86-meter steel masts supporting this roof are painted in the colors of the Italian flag...',
    youtubeTitle: 'Juventus Allianz Stadium Drone Flight | Turin Italy (4K)',
    youtubeDescription: 'Aerial drone flight showcasing the ultra-compact, high-acoustic Allianz Stadium in Turin, home of Juventus.\n\n#shorts #juventus #finoallafine #juve #seriea #turin',
    hashtags: ['#shorts', '#juventus', '#allianzstadium', '#seriea', '#juve'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#0f172a', '#18181b', '#f8fafc'],
    accentColor: '#CBD5E1',
    narrativeFacts: [
      'The first privately owned modern football stadium in Italy, eliminating running tracks for intimate 7.5-meter pitch proximity.',
      'Built using crushed concrete and recycled materials from the old Stadio delle Alpi that stood on the same ground.',
      'Features the "Cammino delle Stelle" (Walk of Fame) honoring 50 Juventus football legends.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#0f172a',
      roof: '#ffffff',
      floodlights: '#fef08a',
      accent: '#e2e8f0'
    }
  },

  // ==========================================
  // 4. EREDIVISIE STADIUMS
  // ==========================================
  {
    id: 'johan-cruyff-arena',
    name: 'Johan Cruyff Arena (AFC Ajax)',
    category: 'eredivisie',
    categoryLabel: 'Eredivisie',
    type: 'Football Stadium',
    country: 'Amsterdam, North Holland, Netherlands',
    elevation: '-2m Below Sea Level',
    coordinates: '52°18\'51" N, 4°56\'31" E',
    temperature: '14°C / Canal Breeze',
    clubOrCity: 'AFC Ajax',
    capacity: '55,865 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The Pioneer of Retractable Roof Stadiums in Europe',
    viralHookSentence: 'This entire stadium is built below sea level and powered by 4,200 solar panels and electric car batteries...',
    youtubeTitle: 'Johan Cruyff Arena FPV Drone Flight | Ajax Amsterdam (4K)',
    youtubeDescription: 'Flying an FPV drone inside Amsterdam’s Johan Cruyff Arena, paying tribute to football legend Johan Cruyff.\n\n#shorts #ajax #johancruyff #eredivisie #amsterdam #football',
    hashtags: ['#shorts', '#ajax', '#amsterdam', '#eredivisie', '#cruyff'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#7f1d1d', '#dc2626', '#fef2f2'],
    accentColor: '#DC2626',
    narrativeFacts: [
      'Renamed in 2018 in memory of football innovator and Ajax icon Johan Cruyff.',
      'Houses a mega-battery energy storage system made of recycled Nissan Leaf car batteries storing solar power.',
      'A railway tunnel and highway run directly beneath the stadium concourse.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#dc2626',
      roof: '#f8fafc',
      floodlights: '#fef9c3',
      accent: '#ffffff'
    }
  },
  {
    id: 'de-kuip',
    name: 'De Kuip (Stadion Feijenoord)',
    category: 'eredivisie',
    categoryLabel: 'Eredivisie',
    type: 'Football Stadium',
    country: 'Rotterdam, South Holland, Netherlands',
    elevation: '1m Sea Level',
    coordinates: '51°53\'38" N, 4°31\'23" E',
    temperature: '13°C / Port Mist',
    clubOrCity: 'Feyenoord Rotterdam',
    capacity: '47,500 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The "Tub" of Rotterdam That Shakes Under 50,000 Fans',
    viralHookSentence: 'Engineered entirely from exposed steel and glass in 1937, this stadium terrace visibly bends and bounces...',
    youtubeTitle: 'De Kuip Rotterdam Drone Orbit | Feyenoord Steel Cauldron (4K)',
    youtubeDescription: 'Drone flight over the legendary "De Kuip" (The Tub) in Rotterdam, one of the most acoustically intense stadiums in world football.\n\n#shorts #feyenoord #dekuip #rotterdam #eredivisie',
    hashtags: ['#shorts', '#feyenoord', '#dekuip', '#rotterdam', '#eredivisie'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#18181b', '#991b1b', '#ffffff'],
    accentColor: '#DC2626',
    narrativeFacts: [
      'Architecturally inspired the Camp Nou in Barcelona and stands as a protected national monument of Dutch modernist architecture.',
      'Has hosted a record 10 European club tournament finals, more than any other venue in UEFA history.',
      'Known as "The Tub" (De Kuip) due to its unique curved steel bowl design offering unobstructed panoramic sightlines.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#b91c1c',
      roof: '#94a3b8',
      floodlights: '#fef08a',
      accent: '#ef4444'
    }
  },
  {
    id: 'philips-stadion',
    name: 'Philips Stadion (PSV Eindhoven)',
    category: 'eredivisie',
    categoryLabel: 'Eredivisie',
    type: 'Football Stadium',
    country: 'Eindhoven, North Brabant, Netherlands',
    elevation: '18m Altitude',
    coordinates: '51°26\'30" N, 5°28\'02" E',
    temperature: '15°C / Lowland Air',
    clubOrCity: 'PSV Eindhoven',
    capacity: '35,000 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The Stadium Located Exactly Where Philips Workers Played in 1913',
    viralHookSentence: 'This corner of Eindhoven has hosted football on the exact same grass lawn for over 110 consecutive years...',
    youtubeTitle: 'Philips Stadion Drone Tour | PSV Eindhoven (4K HDR)',
    youtubeDescription: 'Low altitude drone fly-through of Philips Stadion in Eindhoven, showing the signature corner light towers.\n\n#shorts #psv #eindhoven #eredivisie #football',
    hashtags: ['#shorts', '#psv', '#eindhoven', '#eredivisie'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#7f1d1d', '#991b1b', '#ffffff'],
    accentColor: '#EF4444',
    narrativeFacts: [
      'Stands on the exact plot of land in Philipsdorp where Anton Philips founded the Philips Sport Vereniging in 1913.',
      'Seat Section D contains a permanent empty memorial seat dedicated to Frits Philips, who watched games until age 100.',
      'Known for its four dynamic acoustic corner towers and integrated LED floodlighting.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#dc2626',
      roof: '#e2e8f0',
      floodlights: '#fef9c3',
      accent: '#b91c1c'
    }
  },

  // ==========================================
  // 5. SPANISH CLUBS (LA LIGA)
  // ==========================================
  {
    id: 'santiago-bernabeu',
    name: 'Santiago Bernabéu (Real Madrid)',
    category: 'spanish-clubs',
    categoryLabel: 'Spanish Clubs',
    type: 'Football Stadium',
    country: 'Madrid, Community of Madrid, Spain',
    elevation: '667m High Plateau',
    coordinates: '40°27\'11" N, 3°41\'18" W',
    temperature: '24°C / Castellana Sun',
    clubOrCity: 'Real Madrid',
    capacity: '84,744 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The $1 Billion Metallic Spaceship in the Heart of Madrid',
    viralHookSentence: 'Underneath this pitch is a 30-meter underground greenhouse cave that stores the grass in trays like an elevator...',
    youtubeTitle: 'New Santiago Bernabéu 360° Drone Flight | Real Madrid (4K)',
    youtubeDescription: 'Drone flight over the newly transformed Santiago Bernabéu stadium in Madrid. Metallic steel slat skin, 360-degree LED screen, and retractable roof.\n\n#shorts #realmadrid #bernabeu #halamadrid #laliga #drone',
    hashtags: ['#shorts', '#realmadrid', '#bernabeu', '#halamadrid', '#laliga'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#1e1b4b', '#3b82f6', '#f8fafc'],
    accentColor: '#3B82F6',
    narrativeFacts: [
      'Wrapped in thousands of curved stainless steel louvers that reflect ambient sunlight by day and project video graphics by night.',
      'Features a subterranean hypogeum cave 30 meters deep equipped with UV lights, watering systems, and climate control to store pitch segments.',
      'Equipped with a continuous 360-degree floating halo LED screen encircling the upper stadium rim.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#1d4ed8',
      roof: '#cbd5e1',
      floodlights: '#fef08a',
      accent: '#60a5fa'
    }
  },
  {
    id: 'camp-nou',
    name: 'Spotify Camp Nou (FC Barcelona)',
    category: 'spanish-clubs',
    categoryLabel: 'Spanish Clubs',
    type: 'Football Stadium',
    country: 'Barcelona, Catalonia, Spain',
    elevation: '45m Altitude',
    coordinates: '41°22\'51" N, 2°07\'22" E',
    temperature: '22°C / Mediterranean Sun',
    clubOrCity: 'FC Barcelona',
    capacity: '105,000 Spectators (Expanded)',
    flightType: '360 Orbit',
    hookTitle: 'The Largest Club Football Stadium in Europe',
    viralHookSentence: 'Flying an FPV drone across 100,000 Blaugrana seats forming the words "MÉS QUE UN CLUB"...',
    youtubeTitle: 'Spotify Camp Nou Drone Orbit | FC Barcelona (4K Cinematic)',
    youtubeDescription: 'Aerial drone flight over FC Barcelona’s legendary Camp Nou stadium. The immense Catalan amphitheater.\n\n#shorts #barcelona #campnou #fcbarcelona #laliga #viscabarca',
    hashtags: ['#shorts', '#fcbarcelona', '#campnou', '#viscabarca', '#laliga'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#1e1b4b', '#831843', '#fee2e2'],
    accentColor: '#BE123C',
    narrativeFacts: [
      'The largest stadium in Europe, expanded to seat over 105,000 spectators under the Espai Barça redevelopment.',
      'The iconic motto "Més que un club" (More than a club) is prominently spelled out in bright yellow seats along the lateral stand.',
      'Has witnessed prime moments from Johan Cruyff, Diego Maradona, Ronaldinho, and Lionel Messi.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#831843',
      roof: '#f8fafc',
      floodlights: '#fef9c3',
      accent: '#1e3a8a'
    }
  },
  {
    id: 'civitas-metropolitano',
    name: 'Cívitas Metropolitano (Atlético Madrid)',
    category: 'spanish-clubs',
    categoryLabel: 'Spanish Clubs',
    type: 'Football Stadium',
    country: 'Madrid, Community of Madrid, Spain',
    elevation: '620m Altitude',
    coordinates: '40°26\'10" N, 3°35\'58" W',
    temperature: '25°C / Summer Warmth',
    clubOrCity: 'Atlético de Madrid',
    capacity: '70,460 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The Tension-Cable Ring Canopy of Madrid',
    viralHookSentence: 'Watch this 6,000-ton tensile cable roof flex like a bicycle wheel over 70,000 passionate Colchoneros...',
    youtubeTitle: 'Metropolitano Stadium Drone Tour | Atlético Madrid (4K)',
    youtubeDescription: 'Cinematic drone flight around Atlético Madrid\'s Cívitas Metropolitano stadium in Madrid.\n\n#shorts #atleti #metropolitano #atleticodemadrid #laliga',
    hashtags: ['#shorts', '#atleti', '#metropolitano', '#laliga'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#7f1d1d', '#991b1b', '#3b82f6'],
    accentColor: '#DC2626',
    narrativeFacts: [
      'Winner of the Best Stadium in the World award at the World Football Summit in 2018.',
      'The roof features a double tensegrity perimeter ring connected by radial cables that weigh over 6,300 tons.',
      '100% powered by renewable energy with integrated solar thermal panels and rainwater collection systems.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#b91c1c',
      roof: '#ffffff',
      floodlights: '#fef08a',
      accent: '#1d4ed8'
    }
  },

  // ==========================================
  // 6. SOUTH AMERICAN CLUBS
  // ==========================================
  {
    id: 'la-bombonera',
    name: 'La Bombonera (Estadio Alberto J. Armando)',
    category: 'south-american',
    categoryLabel: 'South American Clubs',
    type: 'Football Stadium',
    country: 'La Boca, Buenos Aires, Argentina',
    elevation: '10m Rio de la Plata',
    coordinates: '34°38\'11" S, 58°21\'53" W',
    temperature: '22°C / Tango Heat',
    clubOrCity: 'Boca Juniors',
    capacity: '54,000 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: '"La Bombonera No Tiembla, Late" (It Doesn\'t Tremble, It Beats)',
    viralHookSentence: 'This vertical concrete wall of fans literally bounces and vibrates by 4 centimeters when Boca scores...',
    youtubeTitle: 'Inside La Bombonera Drone Dive | Boca Juniors Buenos Aires (4K)',
    youtubeDescription: 'Flying an FPV drone inside the world’s most intense stadium: La Bombonera in Buenos Aires, home of Boca Juniors.\n\n#shorts #bocajuniors #labombonera #argentina #conmebol #football',
    hashtags: ['#shorts', '#bocajuniors', '#labombonera', '#argentina', '#futbol'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#1e3a8a', '#eab308', '#fef08a'],
    accentColor: '#EAB308',
    narrativeFacts: [
      'Nicknamed "The Chocolate Box" (La Bombonera) because architect Viktor Sulčič designed it like a compact box of bonbons.',
      'Due to extreme land space limits, one side is a sheer vertical stand of luxury boxes, creating an acoustic resonance cauldron.',
      'Famous worldwide for the popular Argentine proverb: "La Bombonera no tiembla, late" (The Bombonera does not shake; its heart beats).'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#1e40af',
      roof: '#eab308',
      floodlights: '#fef08a',
      accent: '#facc15'
    }
  },
  {
    id: 'el-monumental',
    name: 'Estadio Mâs Monumental (River Plate)',
    category: 'south-american',
    categoryLabel: 'South American Clubs',
    type: 'Football Stadium',
    country: 'Núñez, Buenos Aires, Argentina',
    elevation: '15m Altitude',
    coordinates: '34°32\'43" S, 58°26\'59" W',
    temperature: '23°C / Buenos Aires Sun',
    clubOrCity: 'River Plate',
    capacity: '84,567 Spectators',
    flightType: '360 Orbit',
    hookTitle: 'The Colossal 84,000-Seat Fortress of South America',
    viralHookSentence: 'The largest football stadium in South America, where Diego Maradona and Lionel Messi made football history...',
    youtubeTitle: 'Estadio Monumental River Plate 360° Drone Flight (4K)',
    youtubeDescription: 'Cinematic drone flight circling the immense Estadio Mâs Monumental in Buenos Aires, home of River Plate.\n\n#shorts #riverplate #elmonumental #argentina #conmebol',
    hashtags: ['#shorts', '#riverplate', '#monumental', '#argentina', '#futbol'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#18181b', '#991b1b', '#ffffff'],
    accentColor: '#DC2626',
    narrativeFacts: [
      'The largest stadium on the entire South American continent following the 2023 renovation that removed the athletic track.',
      'Hosted the 1978 FIFA World Cup Final where Argentina won their first World Cup against the Netherlands amidst ticker-tape showers.',
      'Home to the iconic red diagonal sash ("La Banda Roja") running across club jerseys and stadium seats.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#16a34a',
      seats: '#dc2626',
      roof: '#ffffff',
      floodlights: '#fef9c3',
      accent: '#f87171'
    }
  },
  {
    id: 'maracana',
    name: 'Maracanã (Estádio Jornalista Mário Filho)',
    category: 'south-american',
    categoryLabel: 'South American Clubs',
    type: 'Football Stadium',
    country: 'Rio de Janeiro, Brazil',
    elevation: '5m Atlantic Coast',
    coordinates: '22°54\'44" S, 43°13\'49" W',
    temperature: '28°C / Carioca Sun',
    clubOrCity: 'Flamengo & Fluminense',
    capacity: '78,838 Spectators',
    flightType: 'FPV Stadium Dive',
    hookTitle: 'The Spiritual Temple of World Football in Rio',
    viralHookSentence: 'In 1950, nearly 200,000 people squeezed inside this oval bowl for the most famous World Cup match in history...',
    youtubeTitle: 'Maracanã Stadium Drone Dive | Rio de Janeiro Brazil (4K)',
    youtubeDescription: 'Spectacular drone flight over the legendary Maracanã stadium in Rio de Janeiro, with views of Corcovado in the distance.\n\n#shorts #maracana #flamengo #fluminense #brazil #rio',
    hashtags: ['#shorts', '#maracana', '#brazil', '#flamengo', '#fluminense'],
    ambientSfx: 'stadiumRoar',
    skyColors: ['#065f46', '#eab308', '#fef08a'],
    accentColor: '#10B981',
    narrativeFacts: [
      'Held the all-time attendance record of 199,854 spectators during the infamous 1950 "Maracanaço" match between Brazil and Uruguay.',
      'Pelé scored the 1,000th goal of his professional football career (O Milésimo) at Maracanã in 1969 from a penalty kick.',
      'Hosted the final matches of two FIFA World Cups (1950 and 2014) and the opening ceremonies of the 2016 Summer Olympics.'
    ],
    meshType: 'stadium',
    stadiumColors: {
      pitch: '#15803d',
      seats: '#eab308',
      roof: '#f8fafc',
      floodlights: '#fef08a',
      accent: '#059669'
    }
  },

  // ==========================================
  // 7. CAPITAL CITIES (DRONE FLIGHTS)
  // ==========================================
  {
    id: 'city-tokyo',
    name: 'Tokyo Capital Skyline (Shibuya & Minato)',
    category: 'capital-cities',
    categoryLabel: 'Capital Cities',
    type: 'Capital City Skyline',
    country: 'Tokyo Prefecture, Japan',
    elevation: '40m Urban Plain',
    coordinates: '35°41\'22" N, 139°41\'30" E',
    temperature: '19°C / Neon Rain Mist',
    clubOrCity: 'Tokyo',
    capacity: '14 Million Residents',
    flightType: 'City Flyover',
    hookTitle: 'Flying Through the Neon Canyons of Tokyo',
    viralHookSentence: 'At 2:00 AM, the rooftop beacons and glowing neon towers of Tokyo stretch across 5,000 square kilometers...',
    youtubeTitle: 'Tokyo Japan 4K 60FPS Drone Flight | Shibuya, Shinjuku & Tokyo Tower',
    youtubeDescription: 'Midnight 4K drone flight weaving between skyscrapers of Tokyo, Japan. Showcasing Shibuya crossing, Tokyo Tower, and neon avenues.\n\n#shorts #tokyo #japan #drone4k #cyberpunk #travel',
    hashtags: ['#shorts', '#tokyo', '#japan', '#droneflight', '#cyberpunk'],
    ambientSfx: 'cityTraffic',
    skyColors: ['#020617', '#1e1b4b', '#f43f5e'],
    accentColor: '#EC4899',
    narrativeFacts: [
      'Tokyo is the world\'s most populous metropolitan area with over 37 million people across Greater Tokyo.',
      'Features Tokyo Skytree (634m), the second-tallest freestanding structure in the world after the Burj Khalifa.',
      'Shibuya Crossing sees up to 3,000 pedestrians cross in a single two-minute green light cycle during rush hour.'
    ],
    meshType: 'city',
    cityLandmark: 'tokyo'
  },
  {
    id: 'city-paris',
    name: 'Paris Capital City & Eiffel Tower Fly-Through',
    category: 'capital-cities',
    categoryLabel: 'Capital Cities',
    type: 'Capital City Skyline',
    country: 'Paris, Île-de-France, France',
    elevation: '35m Seine Basin',
    coordinates: '48°51\'24" N, 2°17\'48" E',
    temperature: '17°C / Twilight Glow',
    clubOrCity: 'Paris',
    capacity: '2.1 Million Residents',
    flightType: 'City Flyover',
    hookTitle: 'What Paris Looks Like From Above the Eiffel Tower',
    viralHookSentence: 'From 300 meters above the Seine river, all 12 grand boulevards radiate outward from the Arc de Triomphe like a star...',
    youtubeTitle: 'Paris France Golden Hour Drone Flight | Eiffel Tower 4K',
    youtubeDescription: 'Cinematic sunset drone flight over the Eiffel Tower, Seine River, Notre-Dame, and Hausmannian avenues of Paris, France.\n\n#shorts #paris #france #eiffeltower #drone #travel',
    hashtags: ['#shorts', '#paris', '#france', '#eiffeltower', '#drone'],
    ambientSfx: 'cityTraffic',
    skyColors: ['#1e1b4b', '#9a3412', '#fed7aa'],
    accentColor: '#F97316',
    narrativeFacts: [
      'The Eiffel Tower was built for the 1889 Exposition Universelle and was originally intended to be torn down after 20 years.',
      'Paris strictly prohibited skyscrapers in the historic center, keeping building heights under 37 meters to preserve uniform light.',
      'Over 20,000 light bulbs flash on the Eiffel Tower every evening for five minutes at the start of each hour.'
    ],
    meshType: 'city',
    cityLandmark: 'eiffel'
  },
  {
    id: 'city-london',
    name: 'London Capital Skyline & Big Ben Flyover',
    category: 'capital-cities',
    categoryLabel: 'Capital Cities',
    type: 'Capital City Skyline',
    country: 'London, England, UK',
    elevation: '15m River Thames',
    coordinates: '51°30\'03" N, 0°07\'29" W',
    temperature: '15°C / Thames Fog',
    clubOrCity: 'London',
    capacity: '9 Million Residents',
    flightType: 'City Flyover',
    hookTitle: 'Drone Flight Along the River Thames at Dawn',
    viralHookSentence: 'Flying past the glowing clock face of Elizabeth Tower (Big Ben) and the 310-meter spire of The Shard...',
    youtubeTitle: 'London UK 4K Cinematic Drone Flight | Tower Bridge & Big Ben',
    youtubeDescription: 'Ultra HD drone flyover along the Thames in London, United Kingdom. Big Ben, Parliament, London Eye, and the City of London skyline.\n\n#shorts #london #uk #bigben #towerbridge #drone',
    hashtags: ['#shorts', '#london', '#uk', '#bigben', '#drone4k'],
    ambientSfx: 'cityTraffic',
    skyColors: ['#0f172a', '#334155', '#93c5fd'],
    accentColor: '#38BDF8',
    narrativeFacts: [
      'The Big Ben bell inside Elizabeth Tower weighs 13.7 metric tons and has tolled across London since 1859.',
      'Tower Bridge is a combined bascule and suspension bridge that opens over 800 times every year for river ships.',
      'The City of London has unique skyscraper nicknames: The Gherkin, The Cheesegrater, The Walkie-Talkie, and The Scalpel.'
    ],
    meshType: 'city',
    cityLandmark: 'bigben'
  },
  {
    id: 'city-washington',
    name: 'Washington D.C. National Mall & Capitol Dome',
    category: 'capital-cities',
    categoryLabel: 'Capital Cities',
    type: 'Capital City Skyline',
    country: 'District of Columbia, USA',
    elevation: '25m Potomac Basin',
    coordinates: '38°53\'23" N, 77°00\'32" W',
    temperature: '21°C / Potomac Breeze',
    clubOrCity: 'Washington D.C.',
    capacity: 'Federal Capital',
    flightType: 'City Flyover',
    hookTitle: 'Flying the Restricted National Mall Corridor',
    viralHookSentence: 'The 555-foot Washington Monument casts a giant shadow straight across the Lincoln Memorial Reflecting Pool...',
    youtubeTitle: 'Washington D.C. 4K Drone Flight | US Capitol & National Mall',
    youtubeDescription: 'High-definition aerial drone flyover of the US Capitol Dome, Washington Monument, Lincoln Memorial, and Potomac River.\n\n#shorts #washingtondc #uscapitol #america #drone #history',
    hashtags: ['#shorts', '#washingtondc', '#capitol', '#usa', '#drone4k'],
    ambientSfx: 'cityTraffic',
    skyColors: ['#0c4a6e', '#0369a1', '#bae6fd'],
    accentColor: '#0EA5E9',
    narrativeFacts: [
      'By the Height of Buildings Act of 1910, no building in D.C. can exceed the width of its street plus 20 feet, keeping the skyline low.',
      'The US Capitol cast-iron dome weighs nearly 9 million pounds (4,000 metric tons) and was constructed during the Civil War.',
      'The Washington Monument is the world\'s tallest unreinforced stone masonry obelisk at 555 feet 5 inches.'
    ],
    meshType: 'city',
    cityLandmark: 'capitol'
  },
  {
    id: 'city-berlin',
    name: 'Berlin Capital Skyline & Brandenburg Gate',
    category: 'capital-cities',
    categoryLabel: 'Capital Cities',
    type: 'Capital City Skyline',
    country: 'Berlin, Germany',
    elevation: '34m Spree Valley',
    coordinates: '52°30\'59" N, 13°22\'39" E',
    temperature: '16°C / Autumn Sun',
    clubOrCity: 'Berlin',
    capacity: '3.8 Million Residents',
    flightType: 'City Flyover',
    hookTitle: 'Drone Flight Through the Divided Capital of History',
    viralHookSentence: 'Flying past the 368-meter sphere of the Fernsehturm TV Tower right through the neoclassical columns of Brandenburg Gate...',
    youtubeTitle: 'Berlin Germany 4K Drone Flight | Brandenburg Gate & TV Tower',
    youtubeDescription: 'Cinematic drone tour of Berlin, Germany. Flying over the Spree River, Reichstag glass dome, and Alexanderplatz.\n\n#shorts #berlin #germany #brandenburggate #drone',
    hashtags: ['#shorts', '#berlin', '#germany', '#drone4k', '#europe'],
    ambientSfx: 'cityTraffic',
    skyColors: ['#1e1b4b', '#475569', '#cbd5e1'],
    accentColor: '#94A3B8',
    narrativeFacts: [
      'The Berliner Fernsehturm is the tallest structure in Germany (368 meters) and has a rotating restaurant that turns every 30 minutes.',
      'The Brandenburg Gate was commissioned by Prussian King Frederick William II in 1791 and once marked the edge of the Berlin Wall.',
      'Berlin has more bridges (over 1,700) than Venice, Italy, connected by hundreds of kilometers of canals and rivers.'
    ],
    meshType: 'city',
    cityLandmark: 'berlin'
  },

  // ==========================================
  // 8. DRAMATIC COASTLINES
  // ==========================================
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast & Positano Cliffs',
    category: 'coastlines',
    categoryLabel: 'Dramatic Coastlines',
    type: 'Coastal Cliffline',
    country: 'Campania, Italy',
    elevation: '400m Vertical Sea Cliffs',
    coordinates: '40°37\'40" N, 14°29\'12" E',
    temperature: '26°C / Mediterranean Surf',
    clubOrCity: 'Positano',
    flightType: 'Coastal Cruise',
    hookTitle: 'The Pastel Villages Clinging to Vertical Ocean Cliffs',
    viralHookSentence: 'These pastel pink and orange houses look like they are about to slide directly into the turquoise Tyrrhenian Sea...',
    youtubeTitle: 'Amalfi Coast Italy 4K Drone Flight | Positano Ocean Cliffs',
    youtubeDescription: 'Cinematic drone flight along the sheer limestone cliffs of the Amalfi Coast and Positano, Italy. Turquoise surf and dramatic road curves.\n\n#shorts #amalficoast #positano #italy #coastline #travel',
    hashtags: ['#shorts', '#amalficoast', '#positano', '#italy', '#drone4k'],
    ambientSfx: 'oceanWaves',
    skyColors: ['#0369a1', '#0284c7', '#7dd3fc'],
    accentColor: '#38BDF8',
    narrativeFacts: [
      'The Amalfi Drive (Strada Statale 163) was carved directly out of the vertical sea cliffs by the Romans and modernized in 1850.',
      'Positano was a poor fishing village in the first half of the 20th century before John Steinbeck wrote about its magical beauty in 1953.',
      'Recognized as a UNESCO World Heritage site for its remarkable Mediterranean vertical terraced vineyard landscape.'
    ],
    meshType: 'coastline'
  },
  {
    id: 'big-sur',
    name: 'Big Sur & Bixby Creek Bridge',
    category: 'coastlines',
    categoryLabel: 'Dramatic Coastlines',
    type: 'Coastal Cliffline',
    country: 'California, USA',
    elevation: '280m Pacific Cliffs',
    coordinates: '36°22\'18" N, 121°54\'06" W',
    temperature: '18°C / Pacific Sea Mist',
    clubOrCity: 'Highway 1',
    flightType: 'Coastal Cruise',
    hookTitle: 'The Most Dangerous Highway in California',
    viralHookSentence: 'Flying an FPV drone right underneath the 260-foot single-span arch of Bixby Bridge into roaring Pacific waves...',
    youtubeTitle: 'Big Sur California 4K Drone Flight | Bixby Bridge Ocean Cliffs',
    youtubeDescription: 'Breathtaking 4K drone flight along Big Sur, California. Soaring past rugged sea stacks, redwood canyons, and crashing Pacific swells.\n\n#shorts #bigsur #california #bixbybridge #drone4k #ocean',
    hashtags: ['#shorts', '#bigsur', '#california', '#pacificocean', '#drone'],
    ambientSfx: 'oceanWaves',
    skyColors: ['#0f172a', '#0369a1', '#38bdf8'],
    accentColor: '#0EA5E9',
    narrativeFacts: [
      'Bixby Creek Bridge is one of the highest single-span concrete arch bridges in the world (260 feet above the creek canyon).',
      'The Santa Lucia Mountains plunge abruptly into the Pacific Ocean, creating 1,000-foot sheer vertical coastal cliffs.',
      'Home to migrating gray whales, sea otters, and the critically endangered California condor with 10-foot wingspans.'
    ],
    meshType: 'coastline'
  },
  {
    id: 'cliffs-of-moher',
    name: 'Cliffs of Moher',
    category: 'coastlines',
    categoryLabel: 'Dramatic Coastlines',
    type: 'Coastal Cliffline',
    country: 'County Clare, Ireland',
    elevation: '214m (702ft) Drop',
    coordinates: '52°58\'19" N, 9°25\'37" W',
    temperature: '12°C / Atlantic Gale',
    clubOrCity: 'Wild Atlantic Way',
    flightType: 'Coastal Cruise',
    hookTitle: 'Standing on the Edge of Europe Above the Roaring Atlantic',
    viralHookSentence: 'These sheer black shale and sandstone cliffs drop 700 feet straight down into violent Atlantic ocean breakers...',
    youtubeTitle: 'Cliffs of Moher Ireland 4K Drone Flight | Wild Atlantic Way',
    youtubeDescription: 'Epic drone flight along the 8-kilometer stretch of the Cliffs of Moher in County Clare, Ireland. Seabirds, sea stacks, and roaring surf.\n\n#shorts #cliffsofmoher #ireland #wildatlanticway #drone4k',
    hashtags: ['#shorts', '#cliffsofmoher', '#ireland', '#atlantic', '#drone'],
    ambientSfx: 'oceanWaves',
    skyColors: ['#064e3b', '#0284c7', '#e0f2fe'],
    accentColor: '#10B981',
    narrativeFacts: [
      'Stretch for 14 kilometers along the Atlantic coast, reaching their peak altitude of 214 meters just north of O\'Brien\'s Tower.',
      'Formed over 300 million years ago from river delta mud, silt, and sand deposits that compressed into banded rock layers.',
      'Home to over 30,000 pairs of nesting seabirds including Atlantic puffins, razorbills, and kittiwakes.'
    ],
    meshType: 'coastline'
  },
  {
    id: 'twelve-apostles',
    name: 'Twelve Apostles Sea Stacks',
    category: 'coastlines',
    categoryLabel: 'Dramatic Coastlines',
    type: 'Coastal Cliffline',
    country: 'Victoria, Australia',
    elevation: '45m High Pillars',
    coordinates: '38°39\'56" S, 143°06\'16" E',
    temperature: '19°C / Southern Ocean Wind',
    clubOrCity: 'Great Ocean Road',
    flightType: 'Coastal Cruise',
    hookTitle: 'The Isolated Stone Giants Carved by Southern Ocean Storms',
    viralHookSentence: 'Every year, relentless Southern Ocean swells erode 2 centimeters of limestone off these towering sea pillars...',
    youtubeTitle: 'Twelve Apostles Australia Drone Flight | Great Ocean Road 4K',
    youtubeDescription: 'Magnificent sunset drone flight circling the Twelve Apostles limestone stacks along Victoria’s Great Ocean Road in Australia.\n\n#shorts #twelveapostles #australia #greatoceanroad #drone4k',
    hashtags: ['#shorts', '#twelveapostles', '#australia', '#greatoceanroad'],
    ambientSfx: 'oceanWaves',
    skyColors: ['#7c2d12', '#ea580c', '#ffedd5'],
    accentColor: '#F97316',
    narrativeFacts: [
      'The stacks were created by constant wave erosion of the mainland limestone cliffs over 10 to 20 million years.',
      'Despite the name, there were only ever nine standing stacks; several have collapsed into the surf, including one in 2005.',
      'Located within Port Campbell National Park, renowned for spectacular golden glow at sunset.'
    ],
    meshType: 'coastline'
  },

  // ==========================================
  // 9. HISTORICALLY SIGNIFICANT MONUMENTS
  // ==========================================
  {
    id: 'giza-pyramids',
    name: 'Great Pyramids of Giza & Sphinx',
    category: 'historical-monuments',
    categoryLabel: 'Historical Monuments',
    type: 'Ancient Wonder',
    country: 'Al Giza Desert, Egypt',
    elevation: '138.8m (455ft)',
    coordinates: '29°58\'45" N, 31°08\'03" E',
    temperature: '34°C / Sahara Heat',
    clubOrCity: 'Cairo Plateau',
    flightType: 'Monument Spiral',
    hookTitle: 'The Only Surviving Ancient Wonder of the World',
    viralHookSentence: 'For 3,800 years, this was the tallest human-made structure on Earth, aligned to true north within 3/60ths of a degree...',
    youtubeTitle: 'Great Pyramid of Giza 360° Real Drone Flight (4K Ultra HD)',
    youtubeDescription: '360 degree panoramic drone flight around the Great Pyramid of Khufu in Giza, Egypt. Showing the golden capstone and vast Sahara Desert.\n\n#shorts #pyramids #egypt #giza #ancienthistory #wonders',
    hashtags: ['#shorts', '#pyramids', '#egypt', '#giza', '#history'],
    ambientSfx: 'wind',
    skyColors: ['#78350f', '#d97706', '#fef3c7'],
    accentColor: '#F59E0B',
    narrativeFacts: [
      'Built with 2.3 million stone blocks weighing an average of 2.5 tons each over roughly 27 years.',
      'Its four sides face the cardinal directions with an error of less than 0.05 degrees, predating magnetic compasses.',
      'Originally encased in polished white Tura limestone that reflected the desert sun like a massive beacon.'
    ],
    meshType: 'pyramid'
  },
  {
    id: 'colosseum',
    name: 'Flavian Amphitheater (Colosseum)',
    category: 'historical-monuments',
    categoryLabel: 'Historical Monuments',
    type: 'Ancient Monument',
    country: 'Rome, Lazio, Italy',
    elevation: '48m Height (157ft)',
    coordinates: '41°53\'25" N, 12°29\'32" E',
    temperature: '23°C / Roman Sun',
    clubOrCity: 'Rome',
    flightType: 'Monument Spiral',
    hookTitle: 'They Flooded This Arena for Real Naval Battles',
    viralHookSentence: 'Romans could flood this entire stone arena with water in 7 hours to stage real naval battles with warships...',
    youtubeTitle: 'Inside the Roman Colosseum 360° Drone Flight (4K)',
    youtubeDescription: '360 degree view inside the Roman Colosseum amphitheater, revealing the subterranean hypogeum animal cage network.\n\n#shorts #colosseum #rome #italy #gladiator #history',
    hashtags: ['#shorts', '#colosseum', '#rome', '#gladiator', '#history'],
    ambientSfx: 'whoosh',
    skyColors: ['#78350f', '#b45309', '#fef3c7'],
    accentColor: '#F59E0B',
    narrativeFacts: [
      'Could hold 50,000 to 80,000 spectators and be evacuated in less than 15 minutes through 76 numbered vomitoria.',
      'Beneath the wooden arena floor was the Hypogeum: a 2-level subterranean labyrinth of 80 vertical animal elevators.',
      'Covered by the Velarium, a massive canvas awning operated by sailors from the Roman navy.'
    ],
    meshType: 'colosseum'
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal Ivory Mausoleum',
    category: 'historical-monuments',
    categoryLabel: 'Historical Monuments',
    type: 'Mughal Wonder',
    country: 'Agra, Uttar Pradesh, India',
    elevation: '171m Complex',
    coordinates: '27°10\'30" N, 78°02\'31" E',
    temperature: '31°C / Yamuna Mist',
    clubOrCity: 'Agra',
    flightType: 'Monument Spiral',
    hookTitle: 'The Ivory Marble Optical Illusion of the Emperor',
    viralHookSentence: 'As you walk closer to this ivory gate, the monument actually appears to shrink backwards away from you...',
    youtubeTitle: 'The Optical Illusion of the Taj Mahal (360° Drone Flight)',
    youtubeDescription: '360 degree panoramic view of the Taj Mahal on the Yamuna River bank. Built by Mughal emperor Shah Jahan for his wife Mumtaz Mahal.\n\n#shorts #tajmahal #india #architecture #wonders',
    hashtags: ['#shorts', '#tajmahal', '#india', '#history', '#wonders'],
    ambientSfx: 'chime',
    skyColors: ['#1e1b4b', '#4338ca', '#e0e7ff'],
    accentColor: '#E0E7FF',
    narrativeFacts: [
      'The four surrounding minarets are tilted slightly outward by 2 degrees so they fall away from the tomb in an earthquake.',
      'Translucent white Makrana marble reflects the sky, appearing pink at dawn, milky white at noon, and golden at moonrise.',
      'Took 20,000 artisans and 1,000 elephants over 22 years to complete in 1653.'
    ],
    meshType: 'tajmahal'
  },
  {
    id: 'petra',
    name: 'Al-Khazneh Treasury of Petra',
    category: 'historical-monuments',
    categoryLabel: 'Historical Monuments',
    type: 'Rock-Cut Architecture',
    country: 'Ma\'an Governorate, Jordan',
    elevation: '810m (2,657ft)',
    coordinates: '30°19\'21" N, 35°27\'06" E',
    temperature: '29°C / Rose Sandstone',
    clubOrCity: 'Wadi Musa',
    flightType: 'Monument Spiral',
    hookTitle: 'Carved Straight Out of Solid Rose Rock Cliffs',
    viralHookSentence: 'This 130-foot temple was not built brick-by-brick, but hand-chiseled from the top of the cliff downward...',
    youtubeTitle: 'Entering the Rose City of Petra Canyon (360° Drone Flight)',
    youtubeDescription: '360 degree panoramic drone flight through the narrow Siq gorge into Al-Khazneh (The Treasury) in Petra, Jordan.\n\n#shorts #petra #jordan #archaeology #wonders',
    hashtags: ['#shorts', '#petra', '#jordan', '#wonders'],
    ambientSfx: 'whoosh',
    skyColors: ['#881337', '#be123c', '#ffe4e6'],
    accentColor: '#F43F5E',
    narrativeFacts: [
      'The Nabataeans carved it top-to-bottom so scaffolding was never needed, carving as they chipped away.',
      'The colossal urn at the very top is riddled with bullet holes from Bedouins searching for mythical pharaoh’s gold.',
      'Engineered with clay pipes and dams that captured flash floods in an arid desert supporting 30,000 citizens.'
    ],
    meshType: 'canyon'
  },

  // ==========================================
  // 10. EPIC SIGHTS & SUMMITS
  // ==========================================
  {
    id: 'grand-canyon',
    name: 'Grand Canyon & Horseshoe Bend',
    category: 'epic-sights',
    categoryLabel: 'Epic Sights',
    type: 'Geological Chasm',
    country: 'Arizona, USA',
    elevation: '2,134m Rim / 1,800m Chasm',
    coordinates: '36°06\'00" N, 112°06\'00" W',
    temperature: '28°C Rim / 41°C Floor',
    clubOrCity: 'Colorado Plateau',
    flightType: 'Coastal Cruise',
    hookTitle: 'Two Billion Years of Earth Exposed in One Cut',
    viralHookSentence: 'At the bottom of this mile-deep chasm lies Vishnu Schist rock that was formed before the first animals existed on Earth...',
    youtubeTitle: 'Diving 1 Mile Down the Grand Canyon (360° Drone Flight)',
    youtubeDescription: '360 degree panoramic flight diving over Horseshoe Bend and the mile-deep Colorado River gorge in Arizona.\n\n#shorts #grandcanyon #arizona #nature #earth #drone4k',
    hashtags: ['#shorts', '#grandcanyon', '#arizona', '#nature'],
    ambientSfx: 'wind',
    skyColors: ['#431407', '#9a3412', '#fed7aa'],
    accentColor: '#EA580C',
    narrativeFacts: [
      'The canyon is 277 miles (446 km) long, up to 18 miles (29 km) wide, and over a mile (1,800m) deep.',
      'Exposes nearly 2 billion years of Earth’s geological history in stratified red-rock layers.',
      'The temperature difference between the chilly forest rim and the desert river bottom can exceed 15°C (30°F).'
    ],
    meshType: 'canyon'
  },
  {
    id: 'everest',
    name: 'Mount Everest Summit (Sagarmatha)',
    category: 'epic-sights',
    categoryLabel: 'Epic Sights',
    type: 'Highest Mountain',
    country: 'Nepal / Tibet Border',
    elevation: '8,848.86m (29,031.7ft)',
    coordinates: '27°59\'17" N, 86°55\'31" E',
    temperature: '-36°C / 45kt Jet Stream',
    clubOrCity: 'Himalayas',
    flightType: '360 Orbit',
    hookTitle: 'The Truth About Standing on the Summit of the World',
    viralHookSentence: 'At 29,000 feet, every breath gives your lungs only 30% of normal oxygen while the curvature of the Earth bends on the horizon...',
    youtubeTitle: 'Standing on Mount Everest Summit (360° Real Drone View)',
    youtubeDescription: '360 degree panoramic drone flight from the summit of Mount Everest (8,848m). Notice the curvature of the Earth along the horizon.\n\n#shorts #everest #himalayas #adventure #drone',
    hashtags: ['#shorts', '#everest', '#mountains', '#himalayas'],
    ambientSfx: 'wind',
    skyColors: ['#030712', '#1e1b4b', '#e0f2fe'],
    accentColor: '#38BDF8',
    narrativeFacts: [
      'The summit ridge is so narrow that only a handful of climbers can stand on top at once.',
      'Air pressure is one-third of sea level; without supplemental oxygen, brain cells die rapidly.',
      'The summit rock is marine limestone, proving it was once at the bottom of the ancient Tethys Ocean.'
    ],
    meshType: 'mountain'
  },
  {
    id: 'victoria-falls',
    name: 'Victoria Falls (Mosi-oa-Tunya)',
    category: 'epic-sights',
    categoryLabel: 'Epic Sights',
    type: 'Waterfall Curtain',
    country: 'Zambia / Zimbabwe Border',
    elevation: '108m Drop (1,708m Wide)',
    coordinates: '17°55\'28" S, 25°51\'24" E',
    temperature: '27°C / Raincloud Spray',
    clubOrCity: 'Zambezi River',
    flightType: '360 Orbit',
    hookTitle: 'The Smoke That Thunders (Visible from 30 Miles Away)',
    viralHookSentence: 'This is the world\'s largest sheet of falling water, plunging 1 million liters per second into a zig-zag basalt gorge...',
    youtubeTitle: 'Victoria Falls Devil\'s Pool 360° Drone Flight (4K)',
    youtubeDescription: 'Aerial drone flight over Victoria Falls (Mosi-oa-Tunya) along the Zambezi River. Showcasing the rainbow spray rising 400 meters high.\n\n#shorts #victoriafalls #africa #nature #drone',
    hashtags: ['#shorts', '#victoriafalls', '#africa', '#nature'],
    ambientSfx: 'waterfall',
    skyColors: ['#065f46', '#0284c7', '#ecfdf5'],
    accentColor: '#10B981',
    narrativeFacts: [
      'The single largest sheet of falling water on the planet, stretching over 1.7 kilometers (1 mile) wide.',
      'The spray column rises over 400 meters high and can be seen from over 50 kilometers (30 miles) away.',
      'At the top of the falls lies Devil\'s Pool, a natural rock pool where swimmers peer over the 100m sheer drop.'
    ],
    meshType: 'mountain'
  }
];
