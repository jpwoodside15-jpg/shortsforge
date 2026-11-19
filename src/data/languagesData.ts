export interface SupportedLanguageMeta {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  speakersCount: string;
  cpmTier: 'Tier 1 ($10-$18+)' | 'Tier 2 ($4-$9)' | 'Tier 3 (Volume Growth)';
  cpmEstimate: string;
  speechExpansionMultiplier: number; // e.g. 1.2 = 20% more words than English
  recommendedSpeechRate: string;
  recommendedTtsVoice: string;
  topSearchHashtags: string[];
}

export const SUPPORTED_24_LANGUAGES: SupportedLanguageMeta[] = [
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español (LatAm / Neutral)',
    flag: '🇪🇸',
    region: 'Latin America & Spain',
    speakersCount: '548 Million',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$4.20 - $7.80 RPM',
    speechExpansionMultiplier: 1.20,
    recommendedSpeechRate: '1.18x speed',
    recommendedTtsVoice: 'Carlos / Sofia (Spanish Neutral Deep)',
    topSearchHashtags: ['#shorts', '#finanzas', '#curiosidades', '#dinero', '#exito']
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    region: 'Japan',
    speakersCount: '125 Million',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$10.50 - $15.80 RPM',
    speechExpansionMultiplier: 1.05,
    recommendedSpeechRate: '1.05x speed',
    recommendedTtsVoice: 'Kenji / Sakura (Keigo / Professional Tokyo)',
    topSearchHashtags: ['#Shorts', '#雑学', '#お金', '#投資', '#ビジネス']
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    region: 'DACH (Germany, Austria, Switzerland)',
    speakersCount: '135 Million',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$12.00 - $18.50 RPM',
    speechExpansionMultiplier: 1.15,
    recommendedSpeechRate: '1.12x speed',
    recommendedTtsVoice: 'Maximilian / Hannah (High German Clear)',
    topSearchHashtags: ['#shorts', '#finanzen', '#wissen', '#erfolg', '#tipps']
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    region: 'France, Canada, Belgium, West Africa',
    speakersCount: '274 Million',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$9.00 - $14.20 RPM',
    speechExpansionMultiplier: 1.18,
    recommendedSpeechRate: '1.15x speed',
    recommendedTtsVoice: 'Jean / Camille (Parisian Neutral)',
    topSearchHashtags: ['#shorts', '#argent', '#culture', '#business', '#astuces']
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português (Brasil)',
    flag: '🇧🇷',
    region: 'Brazil & Portugal',
    speakersCount: '260 Million',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$3.80 - $6.50 RPM',
    speechExpansionMultiplier: 1.22,
    recommendedSpeechRate: '1.20x speed',
    recommendedTtsVoice: 'Thiago / Larissa (São Paulo Modern)',
    topSearchHashtags: ['#shorts', '#investimentos', '#curiosidades', '#motivacao', '#viral']
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    region: 'India & South Asia',
    speakersCount: '600 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$1.20 - $2.90 RPM',
    speechExpansionMultiplier: 1.10,
    recommendedSpeechRate: '1.10x speed',
    recommendedTtsVoice: 'Aditya / Priya (Hinglish Tech / Clear Hindi)',
    topSearchHashtags: ['#shorts', '#facts', '#motivation', '#hindifacts', '#tech']
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    region: 'South Korea',
    speakersCount: '80 Million',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$9.80 - $14.00 RPM',
    speechExpansionMultiplier: 1.02,
    recommendedSpeechRate: '1.05x speed',
    recommendedTtsVoice: 'Min-jun / Seo-yeon (Seoul Broadcast Dynamic)',
    topSearchHashtags: ['#쇼츠', '#지식', '#재테크', '#꿀팁', '#자기계발']
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية (Modern Standard)',
    flag: '🇸🇦',
    region: 'Middle East & North Africa (GCC High CPM)',
    speakersCount: '422 Million',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$5.50 - $11.20 RPM (GCC)',
    speechExpansionMultiplier: 1.15,
    recommendedSpeechRate: '1.12x speed',
    recommendedTtsVoice: 'Tariq / Layla (Fusha Broadcast Classical)',
    topSearchHashtags: ['#شورتس', '#مال', '#معلومات', '#تحفيز', '#أعمال']
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    region: 'Italy & Southern Europe',
    speakersCount: '68 Million',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$6.50 - $10.50 RPM',
    speechExpansionMultiplier: 1.16,
    recommendedSpeechRate: '1.14x speed',
    recommendedTtsVoice: 'Matteo / Giulia (Milan Broadcast Standard)',
    topSearchHashtags: ['#shorts', '#curiosita', '#finanza', '#crescitapersonale', '#business']
  },
  {
    code: 'zh-CN',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    region: 'Global Chinese Diaspora & Singapore',
    speakersCount: '1.1 Billion',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$4.50 - $8.20 RPM',
    speechExpansionMultiplier: 0.85, // Chinese is more compact
    recommendedSpeechRate: '1.00x speed',
    recommendedTtsVoice: 'Bowen / Xiaoxiao (Mandarin Broadcast)',
    topSearchHashtags: ['#shorts', '#商业思维', '#财富', '#认知提升', '#知识']
  },
  {
    code: 'zh-TW',
    name: 'Chinese (Traditional)',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    region: 'Taiwan, Hong Kong, Overseas',
    speakersCount: '40 Million',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$8.20 - $13.50 RPM',
    speechExpansionMultiplier: 0.85,
    recommendedSpeechRate: '1.00x speed',
    recommendedTtsVoice: 'Zhi-Wei / Yating (Taiwanese Mandarin Clear)',
    topSearchHashtags: ['#Shorts', '#投資理財', '#商業', '#知識型YouTuber', '#個人成長']
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    region: 'Netherlands & Belgium (Flanders)',
    speakersCount: '25 Million',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$12.50 - $17.80 RPM',
    speechExpansionMultiplier: 1.10,
    recommendedSpeechRate: '1.08x speed',
    recommendedTtsVoice: 'Lars / Fenna (Standard Dutch Modern)',
    topSearchHashtags: ['#shorts', '#beleggen', '#geld', '#ondernemen', '#succes']
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    region: 'Poland & Eastern Europe',
    speakersCount: '45 Million',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$4.50 - $7.90 RPM',
    speechExpansionMultiplier: 1.14,
    recommendedSpeechRate: '1.12x speed',
    recommendedTtsVoice: 'Marek / Zofia (Warsaw Standard Neutral)',
    topSearchHashtags: ['#shorts', '#ciekawostki', '#pieniadze', '#biznes', '#motywacja']
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    flag: '🇸🇪',
    region: 'Sweden & Scandinavia',
    speakersCount: '10 Million',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$13.00 - $19.20 RPM',
    speechExpansionMultiplier: 1.08,
    recommendedSpeechRate: '1.05x speed',
    recommendedTtsVoice: 'Oskar / Astrid (Stockholm Melodic)',
    topSearchHashtags: ['#shorts', '#ekonomi', '#investering', '#framgång', '#kunskap']
  },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    region: 'Indonesia & Southeast Asia',
    speakersCount: '275 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$1.80 - $3.40 RPM',
    speechExpansionMultiplier: 1.25,
    recommendedSpeechRate: '1.20x speed',
    recommendedTtsVoice: 'Bima / Gadis (Jakarta Formal Crisp)',
    topSearchHashtags: ['#shorts', '#edukasi', '#motivasi', '#bisnis', '#faktamenarik']
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    region: 'Turkey & Eurasia',
    speakersCount: '85 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$2.40 - $4.80 RPM',
    speechExpansionMultiplier: 1.15,
    recommendedSpeechRate: '1.12x speed',
    recommendedTtsVoice: 'Emre / Selin (Istanbul Standard Radio)',
    topSearchHashtags: ['#shorts', '#bilgi', '#para', '#yatırım', '#girişimcilik']
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    region: 'Vietnam',
    speakersCount: '98 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$1.90 - $3.80 RPM',
    speechExpansionMultiplier: 1.05,
    recommendedSpeechRate: '1.08x speed',
    recommendedTtsVoice: 'Nam / Linh (Hanoi / Saigon Professional)',
    topSearchHashtags: ['#shorts', '#kienthuc', '#taichinh', '#kinhdoanh', '#phattrienbanthan']
  },
  {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    region: 'Thailand',
    speakersCount: '71 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$2.10 - $4.20 RPM',
    speechExpansionMultiplier: 1.08,
    recommendedSpeechRate: '1.06x speed',
    recommendedTtsVoice: 'Niwat / Premwadee (Bangkok Polite Standard)',
    topSearchHashtags: ['#shorts', '#ความรู้', '#การเงิน', '#ธุรกิจ', '#แรงบันดาลใจ']
  },
  {
    code: 'tl',
    name: 'Tagalog / Filipino',
    nativeName: 'Filipino / Tagalog',
    flag: '🇵🇭',
    region: 'Philippines',
    speakersCount: '110 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$2.20 - $4.50 RPM',
    speechExpansionMultiplier: 1.25,
    recommendedSpeechRate: '1.20x speed',
    recommendedTtsVoice: 'Angelo / Blessica (Manila Neutral Modern)',
    topSearchHashtags: ['#shorts', '#kaalaman', '#negosyo', '#pera', '#motibasyon']
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    region: 'Eastern Europe & Central Asia',
    speakersCount: '258 Million',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$3.50 - $6.20 RPM',
    speechExpansionMultiplier: 1.18,
    recommendedSpeechRate: '1.14x speed',
    recommendedTtsVoice: 'Dmitry / Elena (Standard Clear Narrator)',
    topSearchHashtags: ['#shorts', '#факты', '#саморазвитие', '#бизнес', '#деньги']
  },
  {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    flag: '🇺🇦',
    region: 'Ukraine & Diaspora',
    speakersCount: '40 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$2.80 - $5.10 RPM',
    speechExpansionMultiplier: 1.15,
    recommendedSpeechRate: '1.12x speed',
    recommendedTtsVoice: 'Ostap / Polina (Kyiv Clear Literary)',
    topSearchHashtags: ['#shorts', '#цікаво', '#фінанси', '#бізнес', '#саморозвиток']
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
    region: 'Bangladesh & West Bengal',
    speakersCount: '270 Million',
    cpmTier: 'Tier 3 (Volume Growth)',
    cpmEstimate: '$1.10 - $2.40 RPM',
    speechExpansionMultiplier: 1.12,
    recommendedSpeechRate: '1.10x speed',
    recommendedTtsVoice: 'Bashir / Tanisha (Kolkata / Dhaka Clear)',
    topSearchHashtags: ['#shorts', '#তথ্য', '#ব্যবসা', '#টাকা', '#শিক্ষা']
  },
  {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    flag: '🇬🇷',
    region: 'Greece & Cyprus',
    speakersCount: '13 Million',
    cpmTier: 'Tier 2 ($4-$9)',
    cpmEstimate: '$5.80 - $9.20 RPM',
    speechExpansionMultiplier: 1.16,
    recommendedSpeechRate: '1.12x speed',
    recommendedTtsVoice: 'Nestoras / Athina (Athens Classical Standard)',
    topSearchHashtags: ['#shorts', '#γνωση', '#χρημα', '#επιχειρησεις', '#αυτοβελτιωση']
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English (US / UK / Global)',
    flag: '🇺🇸',
    region: 'Global / US, UK, Canada, Australia',
    speakersCount: '1.5 Billion',
    cpmTier: 'Tier 1 ($10-$18+)',
    cpmEstimate: '$14.00 - $22.00 RPM',
    speechExpansionMultiplier: 1.00,
    recommendedSpeechRate: '1.00x speed',
    recommendedTtsVoice: 'Adam / Nova (Deep American Broadcast)',
    topSearchHashtags: ['#shorts', '#wealth', '#finance', '#viral', '#mindset']
  }
];

export const LANGUAGE_PRESET_BUNDLES = [
  {
    id: 'tier1_cpm',
    title: 'Tier-1 High CPM Pack',
    description: 'Target the highest ad-spend countries in Europe and East Asia ($10 - $19+ RPM)',
    languages: ['de', 'ja', 'nl', 'sv', 'fr', 'ko'],
    badge: '★ Max Profit ($15+ CPM)'
  },
  {
    id: 'viral_scale',
    title: 'Massive Viral Reach Pack',
    description: 'Capture hundreds of millions of views across Latin America, Brazil, and Southeast Asia',
    languages: ['es', 'pt', 'hi', 'id', 'vi', 'tl'],
    badge: '🚀 100M+ View Potential'
  },
  {
    id: 'top_10_global',
    title: 'Top 10 Global Economic Titans',
    description: 'The top 10 languages covering 78% of global GDP and YouTube ad revenue',
    languages: ['es', 'ja', 'de', 'fr', 'pt', 'ko', 'ar', 'it', 'zh-CN', 'nl'],
    badge: '🌍 Top 10 World Powers'
  },
  {
    id: 'all_24',
    title: 'Complete 24-Language World Footprint',
    description: 'Translate once, broadcast everywhere in every major continent and script',
    languages: SUPPORTED_24_LANGUAGES.map(l => l.code),
    badge: '👑 Total Global Domination'
  }
];
