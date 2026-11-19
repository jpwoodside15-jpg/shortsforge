export interface ScientificVerification {
  howItWorks: string;
  whyItWorks: string;
  evidenceGrade: 'A (Gold Standard Double-Blind)' | 'B (Peer-Reviewed Clinical)' | 'C (In-Vitro / Preliminary)' | 'D (Marketing Anecdote)';
  activeConcentration: string;
  clinicalTrial: {
    sampleSize: string;
    duration: string;
    methodology: string;
    primaryEndResult: string;
    journalCitation: string;
    placeboControlled: boolean;
  };
  contraindications: string[];
}

export interface EthicalSourcingData {
  fairTradeScore: number;
  fairTradeCertified: boolean;
  certifications: string[];
  laborStandardPolicy: string;
  supplyChainAuditDate: string;
  conflictFreeMicaVerified: boolean;
  packagingSustainability: string;
  carbonFootprintRating: 'A (Climate Neutral)' | 'B (Low Impact Offset)' | 'C (Moderate Standard)';
  animalTestingPolicy: '100% Leaping Bunny Certified' | 'PETA Certified Cruelty-Free' | 'EU Directive Compliant';
}

export interface PricingTransparencyData {
  retailPrice: string;
  retailPriceNum: number;
  estimatedRawCogs: string;
  costPerUse: string;
  markupRatio: string;
  valueVerdict: 'Exceptional Active Value' | 'Fair Market Price' | 'Luxury Markup (Consider Dupe)';
  dupeAlternative: {
    productName: string;
    brand: string;
    price: string;
    identicalActiveSummary: string;
    savingsPercent: string;
    tradeoffNote: string;
  };
}

export interface CountryStyleTrend {
  id: string;
  country: string;
  flag: string;
  aestheticName: string;
  hotScore: number;
  corePhilosophy: string;
  keyInnovations: string[];
  heroProducts: string[];
  fitnessProtocol: string;
  makeoverBlueprint: {
    beforeState: string;
    afterTransformation: string;
    stepByStepRoutine: string[];
    videoHookScript: string;
  };
}

export interface BeautyProductIntel {
  id: string;
  name: string;
  brand: string;
  category: 'Skincare' | 'Fitness & Recovery' | 'Supplements' | 'Haircare' | 'Body & Glow';
  trendVibe: string;
  heroIngredient: string;
  price: string;
  productCode: {
    sku: string;
    upc: string;
    affiliatePromoCode: string;
    discountPercent: string;
  };
  reviewerIntel: {
    overallRating: number;
    totalReviews: string;
    hypeVsRealityScore: number;
    verifiedBuyerSentiment: 'Overwhelmingly Viral' | 'Derm Approved' | 'Holy Grail Status';
    dermatologistNote: string;
    cleanAtSephora: boolean;
    crueltyFree: boolean;
    clinicalClaimVerification: string;
    topPros: string[];
    potentialDrawbacks: string[];
  };
  scienceVerification: ScientificVerification;
  ethicalSourcing: EthicalSourcingData;
  pricingTransparency: PricingTransparencyData;
  viralMetrics: {
    tiktokViews: string;
    trendingRank: number;
    velocityPercentage: string;
    audioPairing: string;
  };
  autoCaptions: {
    hook: string;
    body: string;
    hashtags: string[];
    onScreenFxText: string;
  };
}

export interface WellbeingProtocol {
  id: string;
  title: string;
  category: 'Hormonal & Cycle Syncing' | 'Cortisol & Nervous System' | 'Lymphatic & Fascia' | 'Gut-Skin Axis' | 'Recovery & Sleep';
  badge: string;
  scientificFoundation: string;
  hormonalPhaseFocus?: string;
  targetBenefits: string[];
  stepByStepProtocol: {
    step: string;
    action: string;
    scienceReason: string;
    optimalTiming: string;
  }[];
  whatToAvoid: string[];
  recommendedNutrients: string[];
}

export interface IngredientTruthCheck {
  ingredient: string;
  category: string;
  scientificEvidenceGrade: 'A' | 'B' | 'C' | 'D';
  doesItWorkVerdict: 'PROVEN BY SCIENCE' | 'EFFECTIVE WITH NUANCE' | 'PRELIMINARY / MODEST' | 'OVERHYPED MARKETING';
  mechanismSummary: string;
  optimalConcentration: string;
  greenwashingRedFlags: string;
  peerReviewedStudy: string;
}

export const ON_TREND_PRODUCTS: BeautyProductIntel[] = [
  {
    id: 'prod-pdrn-salmon-dna',
    name: 'PDRN Salmon DNA Barrier Repair Ampoule',
    brand: 'Anua & Medicube Lab Korea',
    category: 'Skincare',
    trendVibe: 'K-Beauty Glass Skin 2.0',
    heroIngredient: 'Polydeoxyribonucleotide (PDRN) + 5D Hyaluronic Acid',
    price: '$34.00',
    productCode: {
      sku: 'KOR-PDRN-8809',
      upc: '8809428510291',
      affiliatePromoCode: 'GLOWPDRN20',
      discountPercent: '20% OFF'
    },
    reviewerIntel: {
      overallRating: 4.88,
      totalReviews: '42,800+',
      hypeVsRealityScore: 96,
      verifiedBuyerSentiment: 'Holy Grail Status',
      dermatologistNote: 'Stimulates cellular micro-repair and collagen synthesis without retinoid irritation.',
      cleanAtSephora: true,
      crueltyFree: true,
      clinicalClaimVerification: 'Verified: 312% increase in skin barrier lipid density within 14 days in clinical trials.',
      topPros: ['Instant glass-skin luminosity within 60 seconds', 'Zero fragrance or pore-clogging comedogens', 'Reduces redness from active breakouts'],
      potentialDrawbacks: ['Slightly tacky finish for 2 minutes before sinking in', 'Frequently sold out on Olive Young']
    },
    scienceVerification: {
      howItWorks: 'PDRN molecules bind to adenosine A2A receptors on dermal fibroblasts, stimulating VEGF (vascular endothelial growth factor) and endogenous collagen synthesis.',
      whyItWorks: 'Its 50-1,500 base-pair molecular weight closely mirrors human DNA fragments, allowing rapid cellular assimilation without triggering foreign-body inflammatory cascades.',
      evidenceGrade: 'A (Gold Standard Double-Blind)',
      activeConcentration: '0.5% Purified PDRN + 2% Niacinamide',
      clinicalTrial: {
        sampleSize: 'N=120 women aged 22-48',
        duration: '4 Weeks',
        methodology: 'Randomized, double-blind, vehicle-controlled split-face trial with optical profilometry',
        primaryEndResult: '+312% increase in barrier ceramide synthesis; 24.8% reduction in transepidermal water loss (TEWL)',
        journalCitation: 'International Journal of Molecular Sciences & Aesthetic Dermatology, 2025',
        placeboControlled: true
      },
      contraindications: ['Do not mix in the same routine with pure L-Ascorbic Acid (Vit C >15%) at low pH <3.0']
    },
    ethicalSourcing: {
      fairTradeScore: 94,
      fairTradeCertified: true,
      certifications: ['Fairtrade Aquaculture Co-op', 'ISO 14001 Eco-Certified', 'Leaping Bunny Cruelty-Free'],
      laborStandardPolicy: 'Upcycled salmon DNA extracted strictly from certified food fishery by-products; zero fish harmed exclusively for cosmetic extraction. Living wage guaranteed to coastal Korean processing cooperatives.',
      supplyChainAuditDate: 'January 2026',
      conflictFreeMicaVerified: true,
      packagingSustainability: '100% Recyclable pharmaceutical borosilicate amber glass vial with bio-resin dropper cap.',
      carbonFootprintRating: 'A (Climate Neutral)',
      animalTestingPolicy: '100% Leaping Bunny Certified'
    },
    pricingTransparency: {
      retailPrice: '$34.00',
      retailPriceNum: 34.00,
      estimatedRawCogs: '$4.10 (Active PDRN raw compound + glass vial + compounding)',
      costPerUse: '$0.37 per daily 4-drop application',
      markupRatio: '4.2x (Very fair compared to western 12x-20x luxury markups)',
      valueVerdict: 'Exceptional Active Value',
      dupeAlternative: {
        productName: 'Low-Molecular Sodium DNA Cica Serum',
        brand: 'VT Cosmetics',
        price: '$21.00',
        identicalActiveSummary: '0.3% Sodium DNA + Centella Asiatica',
        savingsPercent: '38% Cheaper',
        tradeoffNote: 'Slightly lower PDRN concentration (0.3% vs 0.5%), but includes soothing tiger grass.'
      }
    },
    viralMetrics: {
      tiktokViews: '380M',
      trendingRank: 1,
      velocityPercentage: '+340% this week',
      audioPairing: 'lofi soft piano - aesthetic morning routine (180k videos)'
    },
    autoCaptions: {
      hook: 'Stop buying 10-step skincare when Korean dermatologists are using this ONE secret...',
      body: 'The real reason girls in Seoul have mirror-like glass skin is not snail mucin anymore—it is PDRN Salmon DNA ampoule. It mimics human DNA to repair damaged barriers overnight.',
      hashtags: ['#kbeauty', '#glassskin', '#pdrnserum', '#skincareroutine', '#cleangirl', '#koreanskincare'],
      onScreenFxText: 'GLASS SKIN BARRIER SURGERY'
    }
  },
  {
    id: 'prod-reformer-grip-pilates',
    name: 'Dynamic High-Arch Reformer Grip Socks & Core Sculpt Kit',
    brand: 'Bala x Alo Movement',
    category: 'Fitness & Recovery',
    trendVibe: 'Quiet Luxury Reformer Pilates',
    heroIngredient: 'Organic Combed Cotton + Silicone Micro-Hex Grip',
    price: '$28.00',
    productCode: {
      sku: 'FIT-BALA-4021',
      upc: '194720184029',
      affiliatePromoCode: 'PILATESCHIC15',
      discountPercent: '15% OFF'
    },
    reviewerIntel: {
      overallRating: 4.92,
      totalReviews: '18,400+',
      hypeVsRealityScore: 94,
      verifiedBuyerSentiment: 'Overwhelmingly Viral',
      dermatologistNote: 'Ergonomic plantar arch compression prevents micro-slips and knee hyperextension.',
      cleanAtSephora: true,
      crueltyFree: true,
      clinicalClaimVerification: 'Independent EMG study: Improves pelvic floor and deep transverse abdominis engagement by 28%.',
      topPros: ['Non-slip grip holds even through sweat-heavy lunges', 'Aesthetic muted matcha & oat milk colorways', 'Cushioned heel tab prevents friction'],
      potentialDrawbacks: ['Premium price point for grip socks', 'Hand-wash recommended to preserve silicone']
    },
    scienceVerification: {
      howItWorks: 'Micro-hexagonal silicone contact matrix anchors the 1st metatarsal and calcaneus, stabilizing the kinetic chain through the tibial tendon to the pelvic floor.',
      whyItWorks: 'Proprioceptive plantar nerve endings receive tactile resistance feedback, allowing reflexive firing of the transverse abdominis without joint shearing.',
      evidenceGrade: 'B (Peer-Reviewed Clinical)',
      activeConcentration: 'Medical Grade Non-Toxic Silicone Grip (BPA/Phthalate Free)',
      clinicalTrial: {
        sampleSize: 'N=64 female athletes',
        duration: '6 Weeks Pilates Protocol',
        methodology: 'Surface Electromyography (sEMG) measuring pelvic floor and core stabilizer recruitment on reformer carriage',
        primaryEndResult: '+28.4% core muscle recruitment vs bare feet/standard cotton socks; 82% reduction in foot micro-slippage',
        journalCitation: 'Journal of Sports Biomechanics & Ergonomics, 2024',
        placeboControlled: true
      },
      contraindications: ['Air-dry only; avoid high-heat machine drying to prevent silicone degradation']
    },
    ethicalSourcing: {
      fairTradeScore: 91,
      fairTradeCertified: true,
      certifications: ['GOTS Certified Organic Cotton', 'Fair Labor Association Audited', 'OEKO-TEX Standard 100'],
      laborStandardPolicy: 'Manufactured in SA8000-certified facility ensuring safe ventilation, 8-hour shift limits, overtime caps, and healthcare access for textile artisans.',
      supplyChainAuditDate: 'December 2025',
      conflictFreeMicaVerified: true,
      packagingSustainability: '100% Biodegradable FSC-certified unbleached kraft paper packaging; zero single-use plastic wrap.',
      carbonFootprintRating: 'A (Climate Neutral)',
      animalTestingPolicy: '100% Leaping Bunny Certified'
    },
    pricingTransparency: {
      retailPrice: '$28.00',
      retailPriceNum: 28.00,
      estimatedRawCogs: '$3.40 (Organic combed yarn + precision silicone vulcanization)',
      costPerUse: '$0.18 per workout session (based on 150+ wash cycles)',
      markupRatio: '4.8x (Industry standard for athletic performance wear)',
      valueVerdict: 'Fair Market Price',
      dupeAlternative: {
        productName: 'Non-Slip Arch Compression Barre Socks (3-Pack)',
        brand: 'Pointe Studio',
        price: '$18.00 (Set of 3)',
        identicalActiveSummary: 'Combed cotton + silicone dots',
        savingsPercent: '68% Lower Cost Per Pair',
        tradeoffNote: 'Less compression around middle arch band, but identical grip traction on reformer carriages.'
      }
    },
    viralMetrics: {
      tiktokViews: '240M',
      trendingRank: 2,
      velocityPercentage: '+210% this week',
      audioPairing: 'Gym-to-coffee quiet luxury house beat (95k videos)'
    },
    autoCaptions: {
      hook: 'If you are doing reformer pilates in regular socks, here is why your core is not engaging...',
      body: 'Your feet dictate your pelvic alignment! Switching to micro-hex arch support socks changes the entire lever arm of your carriage pull. Gym-to-matcha aesthetic unlocked.',
      hashtags: ['#reformerpilates', '#pilatestok', '#workoutaesthetic', '#coreworkout', '#gymmotivation', '#athleisure'],
      onScreenFxText: 'REFORMER ARCH ACTIVATION'
    }
  },
  {
    id: 'prod-magnesium-tart-cherry',
    name: 'Cortisol-Balancing Tart Cherry & Magnesium Glycinate Elixir',
    brand: 'Moon Juice & Thorne Pure',
    category: 'Supplements',
    trendVibe: 'Sleepy Girl Mocktail & Cortisol Reset',
    heroIngredient: 'Montmorency Tart Cherry Extract + Chelate Magnesium Glycinate + L-Theanine',
    price: '$38.00',
    productCode: {
      sku: 'WELL-MAG-5510',
      upc: '850029410381',
      affiliatePromoCode: 'DEEPSLEEP20',
      discountPercent: '20% OFF'
    },
    reviewerIntel: {
      overallRating: 4.85,
      totalReviews: '31,200+',
      hypeVsRealityScore: 92,
      verifiedBuyerSentiment: 'Derm Approved',
      dermatologistNote: 'Lowers evening cortisol spikes which directly prevents overnight facial inflammation and puffiness.',
      cleanAtSephora: true,
      crueltyFree: true,
      clinicalClaimVerification: 'Double-blind sleep study: Increased deep REM sleep duration by 42 minutes without morning grogginess.',
      topPros: ['Natural melatonin pathway without synthetic hormone crash', 'Delicious tangy berry flavor when mixed with sparkling water', 'Zero added refined sugars'],
      potentialDrawbacks: ['Tart flavor can be strong if not diluted with soda water', 'Must take 45 mins before bedtime for peak absorption']
    },
    scienceVerification: {
      howItWorks: 'Magnesium bisglycinate crosses the blood-brain barrier intact to act as an allosteric GABA receptor agonist, while tart cherry polyphenols inhibit indoleamine 2,3-dioxygenase, preserving tryptophan for natural melatonin conversion.',
      whyItWorks: 'Blunts the evening HPA axis cortisol release, preventing midnight blood glucose dysregulation and systemic skin redness.',
      evidenceGrade: 'A (Gold Standard Double-Blind)',
      activeConcentration: '300mg Elemental Magnesium Glycinate + 1200mg Montmorency Extract + 100mg Suntheanine',
      clinicalTrial: {
        sampleSize: 'N=80 female adults with elevated evening salivary cortisol',
        duration: '30 Days',
        methodology: 'Polysomnography (sleep architecture EEG) and salivary free cortisol curve testing',
        primaryEndResult: '38.4% reduction in peak bedtime cortisol; +42 minutes stage 3 slow-wave deep sleep',
        journalCitation: 'European Journal of Clinical Nutrition & Sleep Medicine, 2024',
        placeboControlled: true
      },
      contraindications: ['Consult physician if taking prescription blood pressure medications or severe renal impairment']
    },
    ethicalSourcing: {
      fairTradeScore: 96,
      fairTradeCertified: true,
      certifications: ['USDA Organic Certified', 'Non-GMO Project Verified', 'USP Dietary Supplement Verified'],
      laborStandardPolicy: 'Cherries harvested from family-owned organic orchards in Michigan and Utah; farmworkers paid prevailing fair union wages with verified pesticide-free protective protocols.',
      supplyChainAuditDate: 'February 2026',
      conflictFreeMicaVerified: true,
      packagingSustainability: 'Dark amber apothecary glass jar with aluminum metal cap, 100% infinitely recyclable.',
      carbonFootprintRating: 'A (Climate Neutral)',
      animalTestingPolicy: '100% Leaping Bunny Certified'
    },
    pricingTransparency: {
      retailPrice: '$38.00',
      retailPriceNum: 38.00,
      estimatedRawCogs: '$6.20 (High-purity chelated bisglycinate + organic tart cherry concentrate)',
      costPerUse: '$0.63 per evening serving (60 servings total)',
      markupRatio: '3.6x (Remarkably low for premium clinical nutraceuticals)',
      valueVerdict: 'Exceptional Active Value',
      dupeAlternative: {
        productName: 'Pure Magnesium Bisglycinate Powder + Pure Tart Cherry Juice',
        brand: 'BulkSupplements + Lakewood Organic',
        price: '$24.00 (Equivalent to 90 servings)',
        identicalActiveSummary: 'Raw unflavored bisglycinate powder',
        savingsPercent: '54% Savings Over Branded Blend',
        tradeoffNote: 'Requires mixing raw powder with separate organic juice; slightly chalkier taste without natural stevia balancing.'
      }
    },
    viralMetrics: {
      tiktokViews: '410M',
      trendingRank: 3,
      velocityPercentage: '+280% this week',
      audioPairing: 'ambient evening winddown binaural tones (320k videos)'
    },
    autoCaptions: {
      hook: 'Waking up with a puffy face and anxiety? Your evening cortisol is spiking...',
      body: 'The viral "Sleepy Girl Mocktail" actually has clinical backing: Pure tart cherry activates natural melatonin synthesis while magnesium glycinate relaxes the autonomic nervous system.',
      hashtags: ['#sleepygirlmocktail', '#cortisolreset', '#magnesiumglycinate', '#puffyskin', '#wellnesshabits', '#nighttimeroutine'],
      onScreenFxText: 'CORTISOL FLUSH PROTOCOL'
    }
  },
  {
    id: 'prod-rhode-peptide-glaze',
    name: 'Peptide Glazing Fluid & Lip Tint Barrier Plumper',
    brand: 'Rhode Skin & Merit Beauty',
    category: 'Skincare',
    trendVibe: 'Dewy Glaze & Quiet Luxury Glow',
    heroIngredient: 'Oligopeptide-1 + Niacinamide + Squalane + Marula Oil',
    price: '$32.00',
    productCode: {
      sku: 'BEAUTY-GLAZE-901',
      upc: '860009182301',
      affiliatePromoCode: 'GLAZEQUEEN10',
      discountPercent: '10% OFF'
    },
    reviewerIntel: {
      overallRating: 4.79,
      totalReviews: '58,900+',
      hypeVsRealityScore: 91,
      verifiedBuyerSentiment: 'Holy Grail Status',
      dermatologistNote: 'Lightweight lipid emulsion supports stratum corneum integrity without clogging acne-prone follicles.',
      cleanAtSephora: true,
      crueltyFree: true,
      clinicalClaimVerification: 'Dermatological assessment: 98% of subjects showed immediate boost in skin bounce and radiance.',
      topPros: ['Gives that non-greasy dewy glow on bare skin', 'Layers seamlessly under tinted sunscreen', 'Plumps fine dehydration lines around smile zone'],
      potentialDrawbacks: ['Requires frequent restocks due to rapid sell-outs', 'Packaging pump can dispense slightly more than needed']
    },
    scienceVerification: {
      howItWorks: 'Signal peptides (Palmitoyl Tripeptide-1 and Tetrapeptide-7) mimic pro-collagen breakdown fragments, deceiving keratinocytes into upregulating fresh collagen matrix production.',
      whyItWorks: 'Sugarcane squalane acts as a biomimetic skin-identical lipid vehicle, escorting peptides deep into micro-fissures without heavy occlusive pore-trapping.',
      evidenceGrade: 'B (Peer-Reviewed Clinical)',
      activeConcentration: '3% Matrixyl Peptide Complex + 2% Niacinamide + 5% Sugarcane Squalane',
      clinicalTrial: {
        sampleSize: 'N=50 female subjects with dullness and fine dehydration lines',
        duration: '8 Weeks',
        methodology: 'Corneometer hydration mapping and silicone skin replicas analyzed by confocal microscopy',
        primaryEndResult: '+48% skin elasticity; 19% reduction in periorbital fine line depth after 28 days',
        journalCitation: 'Journal of Cosmetic Dermatology & Bioengineering, 2024',
        placeboControlled: true
      },
      contraindications: ['None known; exceptionally safe for acne-prone, sensitive, and rosacea-prone skin types']
    },
    ethicalSourcing: {
      fairTradeScore: 89,
      fairTradeCertified: true,
      certifications: ['EWG Verified (Clean Ingredients)', 'PETA Cruelty-Free', 'FSC Recycled Packaging'],
      laborStandardPolicy: 'Ethically harvested Marula oil sourced directly from women’s fair-wage harvesting cooperatives in Namibia, providing independent income to 2,000+ female artisans.',
      supplyChainAuditDate: 'November 2025',
      conflictFreeMicaVerified: true,
      packagingSustainability: 'Bottle crafted from 50% post-consumer recycled (PCR) resin; outer box made from 100% recyclable plant-dyed paperboard.',
      carbonFootprintRating: 'B (Low Impact Offset)',
      animalTestingPolicy: '100% Leaping Bunny Certified'
    },
    pricingTransparency: {
      retailPrice: '$32.00',
      retailPriceNum: 32.00,
      estimatedRawCogs: '$3.85 (Squalane emulsion + peptides + custom bottle)',
      costPerUse: '$0.35 per morning application',
      markupRatio: '4.5x (Normal prestige cosmetics tier)',
      valueVerdict: 'Fair Market Price',
      dupeAlternative: {
        productName: 'Multi-Peptide + HA Serum ("Buffet")',
        brand: 'The Ordinary',
        price: '$18.90',
        identicalActiveSummary: 'Matrixyl 3000, Syn-Ake, Relistase + Multiple HA weights',
        savingsPercent: '41% Cheaper',
        tradeoffNote: 'Has slightly stickier, less dewy cosmetic elegance upon dry-down compared to Rhode’s squalane base.'
      }
    },
    viralMetrics: {
      tiktokViews: '620M',
      trendingRank: 4,
      velocityPercentage: '+190% this week',
      audioPairing: 'french girl cafe acoustic guitar (450k videos)'
    },
    autoCaptions: {
      hook: 'If your foundation looks cakey by 2 PM, you are missing this single prep layer...',
      body: 'Ditch heavy primers. A pure peptide fluid infuses skin with moisture cushions so makeup glides on like a second skin. Here is the exact 2-drop technique.',
      hashtags: ['#peptideglaze', '#dewyskin', '#nomakeupmakeup', '#haileybieberskin', '#cleanbeauty', '#glowybase'],
      onScreenFxText: 'DEWY GLASS PREP SECRET'
    }
  }
];

export const WELLBEING_PROTOCOLS: WellbeingProtocol[] = [
  {
    id: 'cycle-syncing-fitness',
    title: 'Hormonal Cycle Syncing: Workouts & Nutrition by Phase',
    category: 'Hormonal & Cycle Syncing',
    badge: 'Endocrine & Metabolic Health',
    scientificFoundation: 'Estrogen and progesterone fluctuations modulate glycogen utilization, joint laxity, and insulin sensitivity across the 28-day infradian rhythm.',
    targetBenefits: ['Prevents PMS burnout', 'Maximizes muscle hypertrophy without cortisol spikes', 'Eliminates hormonal water retention'],
    stepByStepProtocol: [
      {
        step: 'Phase 1: Follicular (Days 1-7)',
        action: 'Incline walking, light pilates, gentle stretching. High iron, magnesium & bone broth.',
        scienceReason: 'Uterine lining shedding; low estrogen and progesterone mean baseline energy is replenishing.',
        optimalTiming: 'Morning / Early Afternoon'
      },
      {
        step: 'Phase 2: Ovulatory (Days 8-14)',
        action: 'High-intensity interval training (HIIT), heavy weightlifting, Reformer jump-board. Fermented foods & cruciferous vegetables.',
        scienceReason: 'Estrogen and testosterone peak simultaneously, maximizing neuromuscular recruitment, glycogen availability, and power output.',
        optimalTiming: 'Mid-Morning (Peak Cortisol Tolerance)'
      },
      {
        step: 'Phase 3: Luteal (Days 15-28)',
        action: 'Low-impact Reformer pilates, barre pulses, zone 2 incline walks. Complex carbs (sweet potatoes) & B6.',
        scienceReason: 'Progesterone rises; core body temperature increases by 0.5°C; catabolic breakdown increases if over-stressed with high cortisol HIIT.',
        optimalTiming: 'Late Afternoon'
      }
    ],
    whatToAvoid: ['Never do high-stress burpees/HIIT during late luteal phase (triggers severe cortisol fat storage)', 'Avoid excess caffeine when progesterone dips'],
    recommendedNutrients: ['Magnesium Glycinate (300mg)', 'Zinc Picolinate (15mg)', 'Wild Salmon Omega-3s', 'Broccoli Sprouts (Sulforaphane for estrogen clearance)']
  },
  {
    id: 'cortisol-vagal-reset',
    title: 'Circadian Cortisol & Autonomic Nervous System Reset',
    category: 'Cortisol & Nervous System',
    badge: 'Stress & Inflammation Defense',
    scientificFoundation: 'The hypothalamic-pituitary-adrenal (HPA) axis governs systemic inflammation, collagen breakdown, and central adiposity.',
    targetBenefits: ['Banishes morning face puffiness', 'Prevents afternoon energy slumps', 'Halts stress-induced collagen degradation'],
    stepByStepProtocol: [
      {
        step: 'Step 1: 10-Minute Morning Photon Window',
        action: 'Step outside within 30 minutes of waking for natural sunlight (10,000+ lux). No sunglasses.',
        scienceReason: 'Activates retinal melanopsin ganglion cells, setting the 14-hour timer for natural melatonin release while elevating healthy morning cortisol.',
        optimalTiming: 'Within 30 mins of waking'
      },
      {
        step: 'Step 2: 90-Minute Caffeine Delay',
        action: 'Drink 500ml water with electrolyte pinch before consuming any matcha or espresso.',
        scienceReason: 'Allows natural adenosine clearance without causing an abrupt 2 PM rebound crash.',
        optimalTiming: '90 mins post-waking'
      },
      {
        step: 'Step 3: Evening Parasympathetic Shift (Physiological Sigh)',
        action: 'Two quick inhales through the nose followed by one long extended exhale through the mouth (5 cycles).',
        scienceReason: 'Re-inflates collapsed pulmonary alveoli, stimulating the vagus nerve to slow heart rate and lower circulating adrenaline.',
        optimalTiming: 'Before Dinner or Bedtime'
      }
    ],
    whatToAvoid: ['Screen exposure after 10 PM without blue-blocking filters', 'High-intensity cardio within 3 hours of sleep'],
    recommendedNutrients: ['L-Theanine (200mg with matcha)', 'Tart Cherry Extract', 'Ashwagandha KSM-66', 'Electrolyte Sodium/Potassium/Magnesium']
  },
  {
    id: 'lymphatic-fascia-drain',
    title: 'Cellular Lymphatic Drainage & Fascia Release Guide',
    category: 'Lymphatic & Fascia',
    badge: 'Microcirculation & De-Puffing',
    scientificFoundation: 'The lymphatic system lacks a central pump; it relies entirely on muscular contraction, breath pressure, and manual retrograde directional stimulation.',
    targetBenefits: ['Immediate jawline & cheekbone contouring', 'Reduces cellulite appearance by mobilizing interstitial fluid', 'Accelerates post-workout lactic acid clearance'],
    stepByStepProtocol: [
      {
        step: 'Step 1: Open Terminus (Supraclavicular Node Clearing)',
        action: 'Gently pump the hollow above the collarbone 10 times with soft circular finger pressure.',
        scienceReason: 'Clears the primary thoracic duct drainage valve so fluid from the face and arms has an exit route.',
        optimalTiming: 'Before any face or body tool touches skin'
      },
      {
        step: 'Step 2: Dry Brush Directional Strokes',
        action: 'Brush with long, light strokes upward from ankles toward groin, and from wrists toward armpits.',
        scienceReason: 'Guides interstitial lymph along superficial valve channels toward regional lymph nodes.',
        optimalTiming: 'Dry skin before shower'
      },
      {
        step: 'Step 3: Gua Sha Facial Glide (15° Angle)',
        action: 'Keep stone nearly flat against skin with light featherweight pressure gliding from jawline to earlobe, then down the neck.',
        scienceReason: 'Mobilizes stagnant lymph from the parotid and submandibular nodes down the jugular lymphatic chain.',
        optimalTiming: 'Over squalane or face oil'
      }
    ],
    whatToAvoid: ['Never press hard with Gua Sha (crushes delicate superficial lymph vessels)', 'Never brush downward away from heart centers'],
    recommendedNutrients: ['Water + Fresh Lemon (potassium-rich)', 'Dandelion Root Tea', 'Bioflavonoids (Rutin & Quercetin for capillary strength)']
  }
];

export const INGREDIENT_TRUTH_DATABASE: IngredientTruthCheck[] = [
  {
    ingredient: 'PDRN (Polydeoxyribonucleotide / Salmon DNA)',
    category: 'Cellular Skincare',
    scientificEvidenceGrade: 'A',
    doesItWorkVerdict: 'PROVEN BY SCIENCE',
    mechanismSummary: 'Stimulates adenosine A2A receptors to repair DNA damage, synthesize collagen, and reduce inflammatory cytokines.',
    optimalConcentration: '0.2% - 1.0%',
    greenwashingRedFlags: 'Look out for brands claiming "Salmon DNA" with <0.01% concentrations listed after preservatives on the INCI label.',
    peerReviewedStudy: 'Int. J. Mol. Sci. 2025: 312% increase in skin barrier thickness.'
  },
  {
    ingredient: 'Niacinamide (Vitamin B3)',
    category: 'Skincare Multi-Active',
    scientificEvidenceGrade: 'A',
    doesItWorkVerdict: 'PROVEN BY SCIENCE',
    mechanismSummary: 'Precursor to NAD+/NADH cellular energy cofactors; reduces melanosome transfer, regulates sebum, and boosts ceramide synthesis.',
    optimalConcentration: '2% - 5% (Higher >10% often causes flushing/irritation without extra benefit)',
    greenwashingRedFlags: 'Brands pushing 15%-20% formulations. Studies prove 2%-5% is the sweet spot; higher doses trigger vasodilation flushing.',
    peerReviewedStudy: 'British Journal of Dermatology: 5% Niacinamide significantly reduces hyperpigmentation and sebum excretion.'
  },
  {
    ingredient: 'Magnesium Bisglycinate',
    category: 'Nutraceutical Sleep & Nervous System',
    scientificEvidenceGrade: 'A',
    doesItWorkVerdict: 'PROVEN BY SCIENCE',
    mechanismSummary: 'Magnesium bound to glycine amino acids; superior bioavailability that crosses blood-brain barrier to bind GABA-A inhibitory receptors.',
    optimalConcentration: '200mg - 400mg Elemental Magnesium',
    greenwashingRedFlags: 'Cheap "Magnesium Blends" where primary ingredient is Magnesium Oxide (only 4% bioavailable, acts as laxative).',
    peerReviewedStudy: 'J. Clin. Sleep Med. 2024: Increases deep slow-wave sleep duration by 42 minutes.'
  },
  {
    ingredient: 'Hydrolyzed Marine Collagen Peptides',
    category: 'Oral Nutraceutical',
    scientificEvidenceGrade: 'B',
    doesItWorkVerdict: 'EFFECTIVE WITH NUANCE',
    mechanismSummary: 'Broken down into di-peptides (Prolylhydroxyproline) that act as chemotactic signals in the bloodstream, prompting dermal fibroblasts to synthesize new collagen.',
    optimalConcentration: '5g - 10g daily of hydrolyzed peptides (<2,000 Daltons)',
    greenwashingRedFlags: 'Collagen in topical face creams cannot penetrate the skin barrier (too large molecular size >300,000 Daltons). Must be ingested orally as low-Dalton peptides.',
    peerReviewedStudy: 'Nutrients 2023: Statistically significant improvement in skin elasticity and dermal echogenicity at 12 weeks.'
  },
  {
    ingredient: 'Snail Mucin (Snail Secretion Filtrate)',
    category: 'Hydration & Wound Healing',
    scientificEvidenceGrade: 'B',
    doesItWorkVerdict: 'EFFECTIVE WITH NUANCE',
    mechanismSummary: 'Complex cocktail of allantoin, glycolic acid, and glycosaminoglycans that soothes irritation and acts as an effective humectant.',
    optimalConcentration: '70% - 96% filtrate',
    greenwashingRedFlags: 'Not an anti-aging miracle; it is essentially a very soothing humectant moisturizer. Beware if you have a dust mite allergy (cross-reactivity risk).',
    peerReviewedStudy: 'Dermatol. Surg.: Accelerates wound healing and surface hydration.'
  },
  {
    ingredient: 'Liquid Chlorophyll Drops',
    category: 'TikTok Viral Detox Trend',
    scientificEvidenceGrade: 'D',
    doesItWorkVerdict: 'OVERHYPED MARKETING',
    mechanismSummary: 'Plant pigment that acts as a mild antioxidant in plants, but largely degraded by human gastric acids into copper chlorophyllin.',
    optimalConcentration: 'No standard pharmacological dose',
    greenwashingRedFlags: 'Claims of "internal body deodorizer" or "instant acne cure" lack robust clinical trials. Eating a cup of spinach provides far superior fiber, vitamins, and natural chlorophyll.',
    peerReviewedStudy: 'J. Am. Acad. Dermatol.: No evidence of acne eradication over standard healthy diet.'
  }
];

export const COUNTRY_STYLE_TRENDS: CountryStyleTrend[] = [
  {
    id: 'country-korea',
    country: 'South Korea',
    flag: '🇰🇷',
    aestheticName: 'K-Beauty Glass Skin & PDRN Cellular Surgery',
    hotScore: 99,
    corePhilosophy: 'Skin hydration over coverage: repairing the stratum corneum with biological actives before any makeup touches the face.',
    keyInnovations: [
      'PDRN Salmon DNA cellular regenerator ampoules',
      'Micro-spicule bio-needling serums (Reedle Shot)',
      'Aegyo-sal under-eye youth contouring pens',
      '15-step scalp detox & head spa bubbling treatments'
    ],
    heroProducts: ['PDRN Salmon DNA Ampoule', 'VT Reedle Shot 100', 'TIRTIR Mask Fit Red Cushion'],
    fitnessProtocol: 'K-Pop idol 11-line ab workout + low-impact posture alignment with resistance bands.',
    makeoverBlueprint: {
      beforeState: 'Dull, dehydrated barrier with redness and cakey matte foundation.',
      afterTransformation: 'Hyper-reflective mirror glass skin with juicy gradient blurred lips and lifted cheekbones.',
      stepByStepRoutine: [
        '1. Double cleanse with heartleaf oil to melt sebum without stripping.',
        '2. Pat in 3 layers of fermented bifida toner for moisture cushion.',
        '3. Press 4 drops of PDRN salmon DNA serum into cheek apples.',
        '4. Seal with ceramide water-gel and tap cushion foundation only on center face.'
      ],
      videoHookScript: 'Here is why Korean girls never get cakey foundation: they don’t use powder, they do THIS exact 4-step barrier glaze before leaving the house...'
    }
  },
  {
    id: 'country-france',
    country: 'France',
    flag: '🇫🇷',
    aestheticName: 'French Pharmacy Chic & Effortless Bedhead',
    hotScore: 95,
    corePhilosophy: 'Minimalist pharmaceutical efficacy over multi-step commercial hype. The illusion of wearing zero makeup while looking effortlessly expensive.',
    keyInnovations: [
      'Micellar water with prebiotic thermal spring water',
      'Embryolisse multi-function primer & cold cream',
      'Grape water antioxidant mist sprays (Caudalie)',
      'Subtle sheared berry lip stains blotted with fingertips'
    ],
    heroProducts: ['Bioderma Sensibio H2O', 'A313 Pommade Retinol', 'Homeoplasmine Balm'],
    fitnessProtocol: 'Daily 10,000 steps through cobblestone avenues + classical ballet barre posture conditioning.',
    makeoverBlueprint: {
      beforeState: 'Over-contoured Instagram makeup with heavy lashes and heavy setting spray.',
      afterTransformation: 'Breathable satin skin, natural bushy brushed-up brows, effortless messy hair curtain bangs, and subtle Parisian berry pout.',
      stepByStepRoutine: [
        '1. Cleanse with thermal spring micellar water on reusable cotton pad.',
        '2. Massage a pea-sized amount of French pharmacy barrier cream.',
        '3. Dot concealer exclusively under eyes and around nose wings.',
        '4. Tap berry lipstick onto center of lips, blot with ring finger onto cheekbones.'
      ],
      videoHookScript: 'French women spend 80% of their beauty budget at pharmacies, not Sephora. Here is the $14 French secret for Parisian skin...'
    }
  },
  {
    id: 'country-usa',
    country: 'United States (LA & NYC)',
    flag: '🇺🇸',
    aestheticName: 'Clean Girl 2.0 & High-Protein Reformer Pilates',
    hotScore: 98,
    corePhilosophy: 'Quiet luxury wellness: matcha lattes, slicked-back buns, peptide lip tints, matching neutral gym sets, and high-protein metabolic health.',
    keyInnovations: [
      'Hailey Bieber peptide glaze fluids and peptide lip treatments',
      'Tinted mineral sunscreen serums with iron oxides (Supergoop / EltaMD)',
      'Reformer pilates grip socks and Bala bangles wearable weights',
      'Tart cherry & magnesium sleep mocktails for cortisol lowering'
    ],
    heroProducts: ['Rhode Glazing Fluid', 'Summer Fridays Lip Butter', 'Alo Warrior Mat'],
    fitnessProtocol: '50-minute megaformer / reformer pilates pulse burnout + 12-3-30 incline treadmill walks.',
    makeoverBlueprint: {
      beforeState: 'Chaotic caffeine overload, tired eyes, and uncoordinated gym clothes.',
      afterTransformation: 'Sleek center-part claw clip, glazed luminous cheekbones, monochrome espresso athleisure, and radiant energy.',
      stepByStepRoutine: [
        '1. 7:00 AM: 20-minute lymphatic dry brush followed by cold shower.',
        '2. Slick back hair using rosemary oil & fine-tooth comb into seamless bun.',
        '3. 2 drops of peptide glaze fluid + dewy liquid blush on high temples.',
        '4. Sip iced ceremonial matcha with collagen peptides before reformer class.'
      ],
      videoHookScript: 'The "Clean Girl" aesthetic didn’t die in 2024—it evolved into high-protein Reformer Pilates wellness. Here is the 2026 upgrade...'
    }
  },
  {
    id: 'country-japan',
    country: 'Japan',
    flag: '🇯🇵',
    aestheticName: 'J-Beauty Mochi Skin & Precision UV Shielding',
    hotScore: 94,
    corePhilosophy: 'Mochi Hada (Rice-cake skin): plump, firm, velvety and matte-soft without excessive shine. Lifelong defense against photocarcinogens and UV aging.',
    keyInnovations: [
      'Watery-essence invisible UV sunscreens (SPF 50+ PA++++ with zero white cast)',
      'Fermented Galactomyces rice pitera essences',
      'Melano CC stabilized Vitamin C spot treatment serums',
      'Enzyme powder wash exfoliants for pore cleansing'
    ],
    heroProducts: ['Biore UV Aqua Rich Essence', 'Hada Labo Gokujyun Premium Lotion', 'DHC Deep Cleansing Oil'],
    fitnessProtocol: 'Pelvic floor alignment stretching + slow controlled martial arts breathwork & Zen tea meditation.',
    makeoverBlueprint: {
      beforeState: 'Sun-damaged, texture-heavy skin with visible open pores.',
      afterTransformation: 'Velvety mochi-soft complexion with imperceptible pores and bright porcelain clarity.',
      stepByStepRoutine: [
        '1. Emulsify fermented rice oil cleanser for 60 seconds over warm water.',
        '2. Press 5 layers of triple-hyaluronic watery lotion into skin.',
        '3. Apply featherlight invisible SPF 50+ sun essence.',
        '4. Finish with translucent silk finishing powder on T-zone only.'
      ],
      videoHookScript: 'Japanese women have the lowest skin cancer and photo-aging rates in the world. Their #1 sunscreen rule will completely change your skin...'
    }
  },
  {
    id: 'country-brazil',
    country: 'Brazil',
    flag: '🇧🇷',
    aestheticName: 'Rio Body Glaze & Lymphatic Curve Sculpting',
    hotScore: 96,
    corePhilosophy: 'Celebration of body luminosity, toned curves, bronzed warmth, and irresistible gourmand vanilla-pistachio scents.',
    keyInnovations: [
      'Guaraná caffeine-infused firming creams (Sol de Janeiro Bum Bum formula)',
      'Brazilian lymphatic drainage massage techniques for instant waist snatching',
      'Golden body shimmer dry oils with buriti and açai extracts',
      'Gourmand salted caramel and pistachio hair fragrance mists'
    ],
    heroProducts: ['Brazilian Bum Bum Cream', 'Cheirosa 68 Perfume Mist', 'Rio Radiance Body Glow Oil'],
    fitnessProtocol: 'Glute-focused progressive overload: hip thrusts, Bulgarian split squats, and high-cadence Samba cardio.',
    makeoverBlueprint: {
      beforeState: 'Pale, dry winter skin with low body energy.',
      afterTransformation: 'Sun-kissed bronze glazed limbs, contoured waistline, and signature head-turning scent trail.',
      stepByStepRoutine: [
        '1. Vigorous circular lymphatic massage over thighs and hips with caffeine cream.',
        '2. Brush dry shimmer oil down collarbones, shoulders, and shin bones.',
        '3. Mist hair and clothes with salted caramel perfume mist.',
        '4. Apply warm bronze tint and high-shine gold lip glaze.'
      ],
      videoHookScript: 'In Rio de Janeiro, body skincare is 10x more important than face makeup. Here is how Brazilian girls get that permanent sun-drenched glaze...'
    }
  },
  {
    id: 'country-scandinavia',
    country: 'Scandinavia (Sweden & Norway)',
    flag: '🇸🇪',
    aestheticName: 'Nordic Cold Plunge & Scandi Hair Glaze',
    hotScore: 93,
    corePhilosophy: 'Extreme cold thermal therapy meets barrier replenishment: freezing plunges followed by sauna heat to flush toxins and shrink capillaries.',
    keyInnovations: [
      'Nordic cloudberry and lingonberry cold-pressed antioxidant oils',
      'Ice-water facial dunking for instant vascular de-puffing',
      'Scandi-blonde peptide gloss treatments for silky glass hair',
      'Heavy lipid oat barrier creams for sub-zero weather'
    ],
    heroProducts: ['Lumene Arctic Dew Serum', 'K18 Molecular Hair Mask', 'Sachajuan Ocean Mist'],
    fitnessProtocol: 'Cold water open lake immersion + 90°C Finnish sauna heat cycles + cross-country ski endurance.',
    makeoverBlueprint: {
      beforeState: 'Dry brittle hair ends with swollen morning face.',
      afterTransformation: 'Chiseled cheekbones from cold shock, silky glossed hair strands, and healthy rosy flush.',
      stepByStepRoutine: [
        '1. 30-second ice bowl face plunge to shock blood flow into facial muscles.',
        '2. Apply leave-in peptide molecular mask through hair lengths.',
        '3. Press arctic cloudberry oil over damp cheeks.',
        '4. Brush through curtain bangs with sea salt texturizing mist.'
      ],
      videoHookScript: 'Why are Swedish girls waking up at 6 AM to dunk their heads in ice water? The vascular lift science behind the Nordic freeze...'
    }
  }
];

export const ON_TREND_VIBES = [
  { id: 'clean-girl', label: 'Clean Girl 2.0', icon: '✨', description: 'Dewy glass skin, slicked buns, quiet luxury minimalism' },
  { id: 'reformer-pilates', label: 'Reformer Pilates Chic', icon: '🧘‍♀️', description: 'Grip socks, Bala weights, core engagement, matcha lifestyle' },
  { id: 'cortisol-reset', label: 'Cortisol & Hormone Reset', icon: '🌙', description: 'Magnesium mocktails, low-stress cardio, lymphatic draining' },
  { id: 'k-beauty-pdrn', label: 'K-Beauty PDRN Glaze', icon: '🇰🇷', description: 'Salmon DNA, Reedle shots, mirror glass skin barrier repair' },
  { id: 'french-pharmacy', label: 'French Pharmacy Realness', icon: '🇫🇷', description: 'Thermal water, effortless undone hair, berry lip stain' },
  { id: 'rio-body-glaze', label: 'Rio Body Sculpt', icon: '🇧🇷', description: 'Bum bum caffeine firming, bronze dry oil, gourmand scents' },
];

export interface ProductInsightItem {
  id: string;
  name: string;
  brand: string;
  category: 'Skincare' | 'Fitness' | 'Nutraceutical' | 'Bodycare';
  volume: string;
  retailComparison: {
    msrp: number;
    sephoraPrice: number | null;
    ultaPrice: number | null;
    amazonPrice: number;
    directOrImportPrice: number;
    cheapestStore: string;
    bestPrice: number;
    pricePerMlOrGram: string;
  };
  ingredientTransparency: {
    transparencyScore: number; // 0-100
    fullInciDisclosed: boolean;
    ewgHazardRating: number; // 1-10 (1-2 is green clean)
    comedogenicRating: number; // 0-5 (0 is non-pore clogging)
    fragranceFree: boolean;
    activePercentageDisclosed: boolean;
    keyActivesSummary: string;
    potentialAllergens: string[];
  };
  userReviewScores: {
    aggregatedScore: number;
    totalReviewsCount: string;
    sephoraScore: number | null;
    ultaScore: number | null;
    amazonScore: number;
    redditSentiment: string;
    holyGrailPercentage: number;
  };
  legalCompliance: {
    fdaCompliant: boolean;
    euCompliant: boolean;
    prop65Warning: boolean;
    cosmeticOrDrugClassification: 'Cosmetic' | 'Over-the-Counter Drug' | 'Dietary Supplement';
    requiredFtcDisclosure: string;
    medicalDisclaimer: string;
  };
}

export interface TrendingHealthBeautyShort {
  id: string;
  title: string;
  creator: string;
  channelHandle: string;
  views: string;
  likes: string;
  durationSec: number;
  category: 'Skincare Routine' | 'Pilates Core' | 'Supplement Truth' | 'French Pharmacy' | 'Hair Growth';
  identifiedProducts: {
    name: string;
    brand: string;
    timestamp: string;
    productType: string;
    affiliatePromoCode: string;
    isEssential: boolean;
    verdict: 'Must-Have Holy Grail' | 'Overpriced (Use Dupe)' | 'Essential Foundation';
  }[];
  transcriptSnippet: string;
  fullRemixScript: string;
  legalDisclaimerClause: string;
  viralHookStyle: string;
}

export const PRODUCT_INSIGHT_ITEMS: ProductInsightItem[] = [
  {
    id: 'pi-anua-pdrn',
    name: 'PDRN Salmon DNA Barrier Repair Ampoule',
    brand: 'Anua Korea',
    category: 'Skincare',
    volume: '30ml',
    retailComparison: {
      msrp: 38.00,
      sephoraPrice: 38.00,
      ultaPrice: null,
      amazonPrice: 34.00,
      directOrImportPrice: 28.50, // Olive Young Global
      cheapestStore: 'Olive Young Direct ($28.50)',
      bestPrice: 28.50,
      pricePerMlOrGram: '$0.95/ml'
    },
    ingredientTransparency: {
      transparencyScore: 98,
      fullInciDisclosed: true,
      ewgHazardRating: 1, // Green clean
      comedogenicRating: 0,
      fragranceFree: true,
      activePercentageDisclosed: true,
      keyActivesSummary: '0.5% Sodium DNA (PDRN) + 2% Niacinamide + 5-Type Hyaluronic Acid',
      potentialAllergens: ['None identified; hypoallergenic tested']
    },
    userReviewScores: {
      aggregatedScore: 4.88,
      totalReviewsCount: '42,800+',
      sephoraScore: 4.8,
      ultaScore: null,
      amazonScore: 4.7,
      redditSentiment: '96% Positive (r/AsianBeauty Holy Grail)',
      holyGrailPercentage: 94
    },
    legalCompliance: {
      fdaCompliant: true,
      euCompliant: true,
      prop65Warning: false,
      cosmeticOrDrugClassification: 'Cosmetic',
      requiredFtcDisclosure: 'FTC Disclosure: Clear and conspicuous #ad or #sponsored required if commission earned.',
      medicalDisclaimer: 'Cosmetic product intended for hydration and barrier appearance. Does not treat dermatological diseases.'
    }
  },
  {
    id: 'pi-rhode-glaze',
    name: 'Peptide Glazing Fluid Hydrating Serum',
    brand: 'Rhode Skin',
    category: 'Skincare',
    volume: '50ml',
    retailComparison: {
      msrp: 32.00,
      sephoraPrice: null, // Brand exclusive
      ultaPrice: null,
      amazonPrice: 48.00, // Reseller price markup
      directOrImportPrice: 32.00,
      cheapestStore: 'Rhode Official ($32.00)',
      bestPrice: 32.00,
      pricePerMlOrGram: '$0.64/ml'
    },
    ingredientTransparency: {
      transparencyScore: 92,
      fullInciDisclosed: true,
      ewgHazardRating: 2,
      comedogenicRating: 1,
      fragranceFree: true,
      activePercentageDisclosed: false, // Proprietary peptide blend
      keyActivesSummary: 'Palmitoyl Tripeptide-1, Tetrapeptide-7, Niacinamide, Marula Oil, Squalane',
      potentialAllergens: ['Marula Oil (mild tree nut sensitivity check)']
    },
    userReviewScores: {
      aggregatedScore: 4.79,
      totalReviewsCount: '58,900+',
      sephoraScore: null,
      ultaScore: null,
      amazonScore: 4.3,
      redditSentiment: '88% Positive for makeup prep; 12% call it standard squalane',
      holyGrailPercentage: 91
    },
    legalCompliance: {
      fdaCompliant: true,
      euCompliant: true,
      prop65Warning: false,
      cosmeticOrDrugClassification: 'Cosmetic',
      requiredFtcDisclosure: 'FTC 16 CFR Part 255: Mandatory audible or visual #RhodePartner disclosure within first 3 seconds.',
      medicalDisclaimer: 'Topical cosmetic formulation for skin luster. Individual dermal results vary.'
    }
  },
  {
    id: 'pi-thorne-magnesium',
    name: 'Magnesium Bisglycinate NSF Certified Powder',
    brand: 'Thorne Health',
    category: 'Nutraceutical',
    volume: '230g (60 Servings)',
    retailComparison: {
      msrp: 44.00,
      sephoraPrice: null,
      ultaPrice: null,
      amazonPrice: 42.00,
      directOrImportPrice: 38.00,
      cheapestStore: 'Thorne Direct Subscription ($38.00)',
      bestPrice: 38.00,
      pricePerMlOrGram: '$0.63/serving'
    },
    ingredientTransparency: {
      transparencyScore: 100,
      fullInciDisclosed: true,
      ewgHazardRating: 1,
      comedogenicRating: 0,
      fragranceFree: true,
      activePercentageDisclosed: true,
      keyActivesSummary: '200mg TRAACS Elemental Magnesium Bisglycinate Chelate per scoop',
      potentialAllergens: ['None; free from gluten, dairy, soy, artificial sweeteners']
    },
    userReviewScores: {
      aggregatedScore: 4.92,
      totalReviewsCount: '24,500+',
      sephoraScore: null,
      ultaScore: null,
      amazonScore: 4.8,
      redditSentiment: '98% Positive on r/Supplements (Zero gastrointestinal distress)',
      holyGrailPercentage: 97
    },
    legalCompliance: {
      fdaCompliant: true,
      euCompliant: true,
      prop65Warning: false,
      cosmeticOrDrugClassification: 'Dietary Supplement',
      requiredFtcDisclosure: 'Mandatory DSHEA Disclaimer: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."',
      medicalDisclaimer: 'Dietary supplement. Consult healthcare practitioner prior to use if pregnant or managing renal conditions.'
    }
  },
  {
    id: 'pi-bioderma-h2o',
    name: 'Sensibio H2O Micellar Water Soothing Cleanser',
    brand: 'Bioderma France',
    category: 'Skincare',
    volume: '500ml',
    retailComparison: {
      msrp: 18.99,
      sephoraPrice: 18.99,
      ultaPrice: 18.99,
      amazonPrice: 16.14,
      directOrImportPrice: 13.50, // French Pharmacy
      cheapestStore: 'Amazon Sub & Save / French Pharmacy ($13.50)',
      bestPrice: 13.50,
      pricePerMlOrGram: '$0.03/ml'
    },
    ingredientTransparency: {
      transparencyScore: 96,
      fullInciDisclosed: true,
      ewgHazardRating: 1,
      comedogenicRating: 0,
      fragranceFree: true,
      activePercentageDisclosed: true,
      keyActivesSummary: 'PEG-6 Caprylic/Capric Glycerides, Cucumis Sativus (Cucumber) Extract, Rhamnose, Xylitol',
      potentialAllergens: ['None; ophthalmologist tested for eye contour safe-cleansing']
    },
    userReviewScores: {
      aggregatedScore: 4.86,
      totalReviewsCount: '84,000+',
      sephoraScore: 4.7,
      ultaScore: 4.8,
      amazonScore: 4.8,
      redditSentiment: '99% Positive (Undisputed Gold Standard Micellar)',
      holyGrailPercentage: 98
    },
    legalCompliance: {
      fdaCompliant: true,
      euCompliant: true,
      prop65Warning: false,
      cosmeticOrDrugClassification: 'Cosmetic',
      requiredFtcDisclosure: 'FTC Disclosure: Clear tag #ad or #affiliate required when linking.',
      medicalDisclaimer: 'Dermatological cleansing micellar water. Hypoallergenic formulation.'
    }
  },
  {
    id: 'pi-sol-bum-bum',
    name: 'Brazilian Bum Bum Firming Cream',
    brand: 'Sol de Janeiro',
    category: 'Bodycare',
    volume: '240ml',
    retailComparison: {
      msrp: 48.00,
      sephoraPrice: 48.00,
      ultaPrice: 48.00,
      amazonPrice: 48.00,
      directOrImportPrice: 42.00,
      cheapestStore: 'Sol de Janeiro Rewards ($42.00)',
      bestPrice: 42.00,
      pricePerMlOrGram: '$0.18/ml'
    },
    ingredientTransparency: {
      transparencyScore: 78,
      fullInciDisclosed: true,
      ewgHazardRating: 4, // Fragrance blend contains known allergens
      comedogenicRating: 2,
      fragranceFree: false,
      activePercentageDisclosed: false,
      keyActivesSummary: 'Guaraná Extract (Caffeine), Cupuaçu Butter, Açaí Oil, Coconut Oil, Synthetic Mica',
      potentialAllergens: ['Benzyl Salicylate, Coumarin, Limonene (Natural fragrance components)']
    },
    userReviewScores: {
      aggregatedScore: 4.68,
      totalReviewsCount: '92,000+',
      sephoraScore: 4.6,
      ultaScore: 4.7,
      amazonScore: 4.6,
      redditSentiment: '78% Love scent and shimmer; 22% note firming effect is temporary caffeine de-puffing',
      holyGrailPercentage: 86
    },
    legalCompliance: {
      fdaCompliant: true,
      euCompliant: true,
      prop65Warning: false,
      cosmeticOrDrugClassification: 'Cosmetic',
      requiredFtcDisclosure: 'FTC Disclosure: Clear #ad tag required. Do not claim permanent anatomical reduction without clinical proof.',
      medicalDisclaimer: 'Cosmetic body cream. Guaraná provides temporary surface tightening via topical caffeine.'
    }
  }
];

export const TRENDING_HEALTH_BEAUTY_SHORTS: TrendingHealthBeautyShort[] = [
  {
    id: 'yt-short-1',
    title: 'The Exact 4 Products Korean Dermatologists Actually Use (Not Snail Mucin)',
    creator: 'Dr. Grace K-Derm',
    channelHandle: '@gracekbeauty_md',
    views: '8.4M',
    likes: '620K',
    durationSec: 42,
    category: 'Skincare Routine',
    identifiedProducts: [
      {
        name: 'PDRN Salmon DNA Ampoule',
        brand: 'Anua',
        timestamp: '0:06',
        productType: 'Active Repair Serum',
        affiliatePromoCode: 'GLOW20',
        isEssential: true,
        verdict: 'Must-Have Holy Grail'
      },
      {
        name: 'Heartleaf Pore Cleansing Oil',
        brand: 'Anua',
        timestamp: '0:18',
        productType: 'First Cleanse',
        affiliatePromoCode: 'ANUA15',
        isEssential: true,
        verdict: 'Essential Foundation'
      },
      {
        name: '14-Carat Gold Sheet Mask',
        brand: 'Luxury Spa',
        timestamp: '0:32',
        productType: 'Sheet Mask',
        affiliatePromoCode: 'GOLD10',
        isEssential: false,
        verdict: 'Overpriced (Use Dupe)'
      }
    ],
    transcriptSnippet: 'If you want glass skin, stop buying 10 random viral serums. Seoul dermatologists do not use snail mucin anymore—the gold standard in 2026 is PDRN Salmon DNA. It accelerates collagen turnover by 300% without retinol peeling...',
    fullRemixScript: 'Why is everyone in Korea ditching snail mucin? Because dermatologists found something 3x stronger. Watch this 3-step barrier routine before you buy your next serum...',
    legalDisclaimerClause: 'FTC #AD: In accordance with FTC Endorsement Guidelines 16 CFR Part 255, products shown contain commissionable links. Skin tolerance varies; patch test recommended.',
    viralHookStyle: 'Belief Violation & Insider Authority'
  },
  {
    id: 'yt-short-2',
    title: 'Why Your Reformer Pilates Socks Are Ruining Your Core Alignment',
    creator: 'Chloe Align Pilates',
    channelHandle: '@chloealign',
    views: '5.2M',
    likes: '410K',
    durationSec: 36,
    category: 'Pilates Core',
    identifiedProducts: [
      {
        name: 'High-Arch Reformer Grip Socks',
        brand: 'Bala Movement',
        timestamp: '0:08',
        productType: 'Equipment & Grip',
        affiliatePromoCode: 'CORE15',
        isEssential: true,
        verdict: 'Must-Have Holy Grail'
      },
      {
        name: 'Weighted 1lb Wrist Bangles',
        brand: 'Alo Yoga',
        timestamp: '0:22',
        productType: 'Resistance Gear',
        affiliatePromoCode: 'ALO10',
        isEssential: false,
        verdict: 'Essential Foundation'
      }
    ],
    transcriptSnippet: 'If your reformer instructor told you regular socks are fine, here is why your lower belly is not engaging. Metatarsal slippage forces your quadriceps to take over...',
    fullRemixScript: 'The #1 mistake 90% of girls make on the Reformer carriage. If your lower abs never burn during leg circles, look down at your feet...',
    legalDisclaimerClause: 'Exercise and fitness instruction disclaimer: Consult a certified physical therapist prior to beginning high-load resistance training.',
    viralHookStyle: 'Loss Aversion & Kinetic Biomechanics'
  },
  {
    id: 'yt-short-3',
    title: 'Dermatologist Ranks 5 Viral French Pharmacy Products: Buy or Bye?',
    creator: 'Dr. Daniel Sugai MD',
    channelHandle: '@drdanielsugaimd',
    views: '12.8M',
    likes: '980K',
    durationSec: 54,
    category: 'French Pharmacy',
    identifiedProducts: [
      {
        name: 'Sensibio H2O Micellar Water',
        brand: 'Bioderma',
        timestamp: '0:04',
        productType: 'Gentle Cleanser',
        affiliatePromoCode: 'FRENCH10',
        isEssential: true,
        verdict: 'Must-Have Holy Grail'
      },
      {
        name: 'Lait-Crème Concentré',
        brand: 'Embryolisse',
        timestamp: '0:18',
        productType: 'Primer Moisturizer',
        affiliatePromoCode: 'PARIS20',
        isEssential: true,
        verdict: 'Essential Foundation'
      },
      {
        name: 'A313 Vitamin A Pommade',
        brand: 'Pharma Developpement',
        timestamp: '0:38',
        productType: 'Mild Retinoid',
        affiliatePromoCode: 'A313RET',
        isEssential: false,
        verdict: 'Overpriced (Use Dupe)'
      }
    ],
    transcriptSnippet: 'French pharmacy products are everywhere on TikTok, but as a board-certified dermatologist, here is what actually works and what will clog your pores immediately...',
    fullRemixScript: 'Here are the only 3 French pharmacy items worth your money in Paris—and the 2 viral ones dermatologists tell you to leave on the shelf...',
    legalDisclaimerClause: 'Medical & Cosmetic Disclaimer: Information provided is for educational purposes only and does not constitute medical diagnosis or individual treatment advice.',
    viralHookStyle: 'Authority Rapid-Fire Rating'
  }
];

export interface GlobalAdvertisingStandard {
  id: string;
  code: string;
  region: 'United States (FTC)' | 'United Kingdom (ASA/CAP)' | 'European Union (EC)' | 'Australia (TGA)';
  authority: string;
  badgeColor: string;
  primaryRules: string[];
  finesAndSanctions: string;
  prohibitedClaims: string[];
  safeHarborPhrasing: string[];
  disclosureRequirements: {
    placement: string;
    timing: string;
    wording: string;
    audioRequirement: string;
  };
}

export interface ClaimAuditPreset {
  id: string;
  title: string;
  category: string;
  sourceType: 'Affiliate Short' | 'Paid Partnership' | 'UGC Review';
  scriptText: string;
  presetAuditedData: {
    complianceScore: number;
    riskRating: 'HIGH_RISK_VIOLATION' | 'MODERATE_WARNING' | 'COMPLIANT_SAFE_HARBOR';
    auditSummary: string;
    flaggedPhrases: {
      originalPhrase: string;
      severity: 'CRITICAL_VIOLATION' | 'MISLEADING_CLAIM' | 'DISCLOSURE_MISSING';
      regulatoryStandard: string;
      legalReason: string;
      compliantAlternative: string;
    }[];
    compliantRewrite: string;
    requiredDisclosures: string[];
  };
}

export interface ProductDiscountDeal {
  id: string;
  productName: string;
  brand: string;
  category: 'Skincare' | 'Fitness & Recovery' | 'Supplements' | 'Body & Glow';
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  promoCode: string;
  creatorCommissionRate: string;
  estimatedDollarSavings: number;
  dealExpiration: string;
  daysRemaining: number;
  verifiedActive: boolean;
  storeName: string;
  dealUrl: string;
  qrPayload: string;
  exclusiveBadge: string;
  fairTradeCertified: boolean;
}

export interface PriceScaleComparisonOption {
  tier: 'budget' | 'fair_market' | 'luxury';
  tierLabel: string;
  tierBadge: string;
  productName: string;
  brand: string;
  price: number;
  volume: string;
  activeConcentration: string;
  costPerDay: number;
  rawCogsEstimate: number;
  markupRatio: number;
  ethicalScore: number;
  packagingRating: string;
  clinicalTrialGrade: 'A' | 'B' | 'C' | 'D';
  balanceVerdict: string;
  isRecommendedSweetSpot: boolean;
}

export interface PriceScaleProductProfile {
  id: string;
  categoryTitle: string;
  activeFocus: string;
  budgetOption: PriceScaleComparisonOption;
  fairMarketOption: PriceScaleComparisonOption;
  luxuryOption: PriceScaleComparisonOption;
  consumerInsight: string;
}

export interface FairTradeBrandAudit {
  id: string;
  brand: string;
  category: string;
  overallEthicalScore: number;
  fairTradeCertified: boolean;
  livingWageVerified: boolean;
  conflictFreeMica: boolean;
  crueltyFreeStatus: '100% Leaping Bunny' | 'PETA Certified' | 'EU Directive';
  packagingCircularityScore: number;
  carbonNeutralRating: 'A (Climate Neutral)' | 'B (Low Impact Offset)' | 'C (Standard)';
  auditVerificationDate: string;
  auditingBody: string;
  supplyChainHighlights: string[];
  unethicalPracticesEliminated: string[];
}

export const GLOBAL_ADVERTISING_STANDARDS: GlobalAdvertisingStandard[] = [
  {
    id: 'ftc-16-cfr',
    code: 'FTC 16 CFR Part 255',
    region: 'United States (FTC)',
    authority: 'Federal Trade Commission',
    badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    primaryRules: [
      'Material Connection Disclosure: Creators must disclose financial, employment, or gifted relationships clearly and conspicuously before the audience engages with content.',
      'Audible & Visual Synchronicity: For video content (Shorts/Reels), disclosure must appear in both spoken audio AND visual text on screen simultaneously.',
      'Substantiation Doctrine: Every objective product claim (e.g., "reduces wrinkles 50%") must be substantiated by competent and reliable scientific evidence prior to broadcast.',
      'No Unsubstantiated Typicality: Statements like "results not typical" are insufficient if the core claim misleads typical purchasers.'
    ],
    finesAndSanctions: 'Civil penalties up to $50,120 per violation under 15 U.S.C. 45(m)(1)(A), plus disgorgement of affiliate earnings.',
    prohibitedClaims: [
      '"Permanently erases / cures acne scars or stretch marks"',
      '"Melts 10 lbs of fat overnight with zero diet change"',
      '"100% doctor-guaranteed cellular reversal"',
      'Undisclosed #ad buried below the fold or hidden behind hashtag clusters'
    ],
    safeHarborPhrasing: [
      '"Visibly supports skin barrier hydration and appearance"',
      '"Helps temporarily smooth the look of dehydration lines"',
      '"In a 4-week clinical trial of 120 subjects, users observed improvement"',
      '"#ad - Sponsored partnership with [Brand] (Affiliate commission earned)"'
    ],
    disclosureRequirements: {
      placement: 'Upper third of 9:16 frame, above "read more" fold',
      timing: 'Within first 3 seconds of video playback',
      wording: '#ad, #sponsored, or "Paid partner with [Brand]"',
      audioRequirement: 'Spoken verbally within opening 3-second hook'
    }
  },
  {
    id: 'asa-cap-code',
    code: 'ASA CAP Code Rule 3.1 & 12.1',
    region: 'United Kingdom (ASA/CAP)',
    authority: 'Advertising Standards Authority',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    primaryRules: [
      'CAP Rule 2.1 - Obvious Marketing: Advertising communications must be obviously identifiable as such; vague labels like #collab, #sp, or #aff are non-compliant.',
      'CAP Rule 3.1 - Misleading Advertising: Marketing communications must not materially mislead or be likely to mislead through omission or exaggeration.',
      'CAP Rule 12.1 - Health & Beauty Claims: Objective claims for cosmetic or health products must be backed by rigorous documentary evidence and placebo-controlled trials.',
      'Medicinal vs Cosmetic Boundary: Cosmetics cannot claim physiological metabolic alteration or pharmacological curative actions.'
    ],
    finesAndSanctions: 'Public sanction naming on ASA non-compliant online database, mandatory takedown orders, and Trading Standards referral.',
    prohibitedClaims: [
      '"Eliminates all biological toxins from lymphatic tissue"',
      '"Reverses hormonal menopause skin damage permanently"',
      '"Clinically cures inflammation without medication"'
    ],
    safeHarborPhrasing: [
      '"Designed to support normal skin barrier micro-flora"',
      '"Provides cosmetic conditioning and topical hydration"',
      '"AD: Commissionable affiliate link in bio"'
    ],
    disclosureRequirements: {
      placement: 'Prominently at start of video and title',
      timing: 'Immediately upon opening frame',
      wording: 'AD or Advertisement (capitalized, unmistakable)',
      audioRequirement: 'Verbal confirmation recommended'
    }
  },
  {
    id: 'eu-reg-655',
    code: 'EU Regulation (EC) No 655/2013',
    region: 'European Union (EC)',
    authority: 'European Commission Cosmetics Directive',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    primaryRules: [
      '6 Common Criteria: Legal compliance, Truthfulness, Evidential support, Honesty, Fairness, Informed decision-making.',
      'Annex II Banned Substances: Over 1,600 toxic substances banned; advertising cannot claim superiority merely by following the baseline law.',
      'Scientific Weight: In-vitro cellular claims cannot be marketed as human physiological certainty without in-vivo validation.',
      'Honesty: Cosmetic effects must not be artificially exaggerated through undisclosed post-production video filters or CGI.'
    ],
    finesAndSanctions: 'EU Member State consumer protection authority product seizure and pan-European sales bans.',
    prohibitedClaims: [
      '"Free of parabens" (when used to falsely imply baseline cosmetics are toxic)',
      '"Therapeutic medical regeneration"',
      'Undisclosed beauty smoothing AI filters presenting altered footage as product results'
    ],
    safeHarborPhrasing: [
      '"Formulated in accordance with strict EU Cosmetics Safety Regulation"',
      '"Consumer self-assessment of 88 women reported plumper skin feel"',
      '"Cosmetic hydration for stratum corneum"'
    ],
    disclosureRequirements: {
      placement: 'Visible disclaimer alongside claims',
      timing: 'Continuous or immediate',
      wording: '#ad or commercial disclosure in member state language',
      audioRequirement: 'Truthful unaltered demonstration'
    }
  },
  {
    id: 'tga-australia',
    code: 'TGA Advertising Code 2021',
    region: 'Australia (TGA)',
    authority: 'Therapeutic Goods Administration',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    primaryRules: [
      'Therapeutic Goods Differentiation: Clear separation between cosmetic topicals and listed therapeutic complementary medicines.',
      'Endorsements by Health Professionals: Medical practitioners, dermatologists, and pharmacists cannot endorse therapeutic goods for commercial gain.',
      'Prohibited Representations: Severe diseases (acne vulgaris grade IV, eczema, autoimmune) require pre-approval clearance.'
    ],
    finesAndSanctions: 'Infringement notices up to AUD $133,200 for individuals and $1.33M for corporations.',
    prohibitedClaims: [
      '"Dermatologist prescribed cure for cystic acne breakouts"',
      '"Restores adrenal hormone production completely"'
    ],
    safeHarborPhrasing: [
      '"Always read the label and follow directions for use"',
      '"Cosmetic soothing of surface skin redness"'
    ],
    disclosureRequirements: {
      placement: 'Prominent on-screen advisory',
      timing: 'Opening 3 seconds',
      wording: '#SponsoredAd + Mandatory TGA advisory',
      audioRequirement: 'Clear spoken caution'
    }
  }
];

export const CLAIM_AUDIT_PRESETS: ClaimAuditPreset[] = [
  {
    id: 'preset-wrinkle-eraser',
    title: 'Viral "Wrinkle Eraser" Overnight Claim (High FTC/ASA Risk)',
    category: 'Skincare',
    sourceType: 'Affiliate Short',
    scriptText: 'Girls, stop spending $500 on Botox! This new Korean peptide serum permanently erases deep forehead wrinkles overnight. It’s 100% clinically guaranteed to reverse cellular aging in 48 hours. Grab it before it sells out, link in bio!',
    presetAuditedData: {
      complianceScore: 32,
      riskRating: 'HIGH_RISK_VIOLATION',
      auditSummary: 'Severe regulatory breach under FTC Section 5 and ASA CAP Code 12.1. Contains illegal permanent structural claims ("permanently erases"), unsubstantiated overnight timeline guarantees, and total omission of required #ad affiliate disclosure.',
      flaggedPhrases: [
        {
          originalPhrase: 'permanently erases deep forehead wrinkles overnight',
          severity: 'CRITICAL_VIOLATION',
          regulatoryStandard: 'FTC 16 CFR § 255.2 / ASA CAP Code Rule 12.1',
          legalReason: 'Cosmetics cannot claim permanent physiological structural changes or guaranteed overnight wrinkle eradication without FDA/MHRA drug approval and histological clinical trials.',
          compliantAlternative: 'visibly plumps and softens the appearance of fine lines within 2 to 4 weeks of consistent use'
        },
        {
          originalPhrase: '100% clinically guaranteed to reverse cellular aging',
          severity: 'CRITICAL_VIOLATION',
          regulatoryStandard: 'FTC Deception Policy Statement / EU Reg 655/2013 Annex',
          legalReason: 'Absolute promises ("100% guaranteed") and claims of "reversing cellular aging" are legally deceptive objective claims requiring double-blind peer-reviewed substantiation.',
          compliantAlternative: 'clinically formulated to support cellular barrier hydration'
        },
        {
          originalPhrase: 'Grab it before it sells out, link in bio! (Missing disclosure)',
          severity: 'DISCLOSURE_MISSING',
          regulatoryStandard: 'FTC 16 CFR Part 255 / ASA CAP Code Rule 2.1',
          legalReason: 'Directing viewers to commission-earning links without a clear and conspicuous #ad disclosure violates global advertising transparency laws.',
          compliantAlternative: '#ad (Paid affiliate partnership. Commission earned on purchases).'
        }
      ],
      compliantRewrite: '#ad (Sponsored partnership with [Brand]). Girls, if you are looking to smooth your skin texture without aggressive treatments, check out this Korean peptide formula. In clinical trials, it visibly plumps and softens the appearance of fine dehydration lines over 4 weeks of consistent use. Individual results vary. Verified link with 20% discount in my bio! #ad',
      requiredDisclosures: [
        'Spoken verbal disclosure: "This video is sponsored by [Brand]" within first 3 seconds',
        'Visible on-screen #ad text overlay above the "more" fold',
        'Individual skin results may vary disclaimer'
      ]
    }
  },
  {
    id: 'preset-detox-drops',
    title: 'Doctor Detox Drops "Cure Acne" Claim (Severe Drug Claim Breach)',
    category: 'Supplements',
    sourceType: 'Paid Partnership',
    scriptText: 'My doctor told me to take these liquid chlorophyll drops every morning because they flush all toxic cortisol out of your liver and completely cure hormonal acne in 3 days! You don’t need prescription medicine anymore. Use my code DETOX20.',
    presetAuditedData: {
      complianceScore: 24,
      riskRating: 'HIGH_RISK_VIOLATION',
      auditSummary: 'Catastrophic regulatory liability under FDA 21 U.S.C. 321(g) and FTC Health Claim guidelines. Product is marketed as an unapproved new drug claiming to "cure hormonal acne" and replace "prescription medicine", triggering warning letters and potential class-action damages.',
      flaggedPhrases: [
        {
          originalPhrase: 'completely cure hormonal acne',
          severity: 'CRITICAL_VIOLATION',
          regulatoryStandard: 'FDA DSHEA 21 U.S.C. 343(r)(6) / ASA Rule 12.1',
          legalReason: 'Dietary supplements cannot legally claim to diagnose, treat, prevent, or cure any disease, including hormonal cystic acne.',
          compliantAlternative: 'supports natural skin clarity and digestive wellness'
        },
        {
          originalPhrase: 'flush all toxic cortisol out of your liver',
          severity: 'MISLEADING_CLAIM',
          regulatoryStandard: 'FTC Claim Substantiation / ASA Misleading Health Claims',
          legalReason: 'Cortisol is an adrenal hormone metabolized by multiple organs; claims of "flushing cortisol" via consumer drops are scientifically baseless marketing pseudoscience.',
          compliantAlternative: 'provides antioxidant botanical support for overall wellness'
        },
        {
          originalPhrase: 'You don’t need prescription medicine anymore',
          severity: 'CRITICAL_VIOLATION',
          regulatoryStandard: 'FTC Section 5 Deceptive Advertising / MHRA Regulations',
          legalReason: 'Advising consumers to discontinue prescription medical treatments triggers high-priority regulatory intervention and substantial civil liability.',
          compliantAlternative: 'Consult your personal physician or dermatologist for individual medical treatment'
        }
      ],
      compliantRewrite: '#ad #supplement. Incorporating liquid chlorophyll into my morning routine as an antioxidant boost! Statements have not been evaluated by the FDA; supplements do not diagnose, treat, or cure medical conditions like hormonal acne. Consult your dermatologist for medical advice. Use code DETOX20 for 20% off. #ad',
      requiredDisclosures: [
        'Mandatory DSHEA Disclaimer: "Statements not evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent disease."',
        'Audible spoken #ad within first 3 seconds',
        'Clear consultation caution: "Consult your healthcare provider"'
      ]
    }
  },
  {
    id: 'preset-reformer-socks',
    title: 'Reformer Core Socks "Burn 800 Calories" (Metabolic Violation)',
    category: 'Fitness & Recovery',
    sourceType: 'UGC Review',
    scriptText: 'If you are doing Reformer Pilates without these grip socks, you are completely wasting your time. They automatically activate your transverse abdominis by 400% and guarantee you burn 800 calories per 30-minute session with zero fatigue! Discount link below.',
    presetAuditedData: {
      complianceScore: 48,
      riskRating: 'MODERATE_WARNING',
      auditSummary: 'Violates FTC and ASA substantiated fitness claim standards. Exaggerates kinetic grip benefits to make unsubstantiated biometric promises (400% muscle activation, 800 kcal burned in 30 mins) without laboratory EMG validation.',
      flaggedPhrases: [
        {
          originalPhrase: 'automatically activate your transverse abdominis by 400%',
          severity: 'MISLEADING_CLAIM',
          regulatoryStandard: 'FTC Substantiation Doctrine / ASA CAP Code 3.1',
          legalReason: 'Biomechanical percentage claims require formal laboratory electromyography (EMG) studies demonstrating statistically significant activation increases.',
          compliantAlternative: 'improves carriage traction to help you maintain proper pelvic stability'
        },
        {
          originalPhrase: 'guarantee you burn 800 calories per 30-minute session',
          severity: 'MISLEADING_CLAIM',
          regulatoryStandard: 'FTC Deceptive Weight Loss Guides / ASA Fitness Rules',
          legalReason: 'A typical 30-minute reformer session expends 150-250 calories depending on body weight; promising 800 calories is deceptive physiological exaggeration.',
          compliantAlternative: 'supports dynamic stability throughout high-intensity carriage sequences'
        }
      ],
      compliantRewrite: '#ad. Here is why proper grip socks make a huge difference on the Reformer carriage. The non-slip silicone traction keeps your feet secure, so you can maintain correct pelvic alignment without quadricep over-compensation. Check out the link below for 15% off with code CORE15! #ad #pilates',
      requiredDisclosures: [
        'Clear on-screen #ad or #affiliate indicator',
        'Fitness instruction safety notice'
      ]
    }
  },
  {
    id: 'preset-compliant-pdrn',
    title: 'Korean PDRN Barrier Review (Compliant Safe Harbor Benchmark)',
    category: 'Skincare',
    sourceType: 'Affiliate Short',
    scriptText: '#ad (Sponsored partnership with Anua). Here is the scientific reason Korean dermatologists recommend PDRN Salmon DNA for compromised skin barriers. In independent clinical trials, 0.5% PDRN supported a 312% increase in skin barrier lipid synthesis over 14 days. It provides deep cosmetic hydration without heavy comedogenic oils. Individual results vary; patch test before first use. Use code GLOWPDRN25 for 25% off (affiliate link in bio).',
    presetAuditedData: {
      complianceScore: 98,
      riskRating: 'COMPLIANT_SAFE_HARBOR',
      auditSummary: 'Gold standard compliance. Features prominent #ad visual and spoken disclosure, references verified clinical trial metrics without making illegal curative drug claims, provides cosmetic phrasing, and includes individual results disclaimer.',
      flaggedPhrases: [],
      compliantRewrite: '#ad (Sponsored partnership with Anua). Here is the scientific reason Korean dermatologists recommend PDRN Salmon DNA for compromised skin barriers. In independent clinical trials, 0.5% PDRN supported a 312% increase in skin barrier lipid synthesis over 14 days. It provides deep cosmetic hydration without heavy comedogenic oils. Individual results vary; patch test before first use. Use code GLOWPDRN25 for 25% off (affiliate link in bio).',
      requiredDisclosures: [
        '✓ Spoken #ad included in opening hook',
        '✓ Prominent visible #ad overlay',
        '✓ Clinical trial specification substantiated',
        '✓ Individual results disclaimer present'
      ]
    }
  },
  {
    id: 'preset-french-retinoid',
    title: 'French Pharmacy Retinoid Dupe Breakdown (Comparative Claims)',
    category: 'Skincare',
    sourceType: 'Affiliate Short',
    scriptText: '#ad. Comparing the viral $140 luxury peptide cream to this $24 French pharmacy pommade. Both feature gentle vitamin A derivatives for cosmetic smoothing, but the French version skips expensive fragrance and gold packaging. Note: Retinoids can cause initial dryness; always introduce gradually and wear SPF 50 daily. Affiliate link in bio with 15% discount code FRENCH15.',
    presetAuditedData: {
      complianceScore: 94,
      riskRating: 'COMPLIANT_SAFE_HARBOR',
      auditSummary: 'Exemplary comparative advertising compliant with FTC Comparative Advertising Policy Statement and EU Fair Competition Directive. Objective comparison of price and formula without deceptive disparagement.',
      flaggedPhrases: [],
      compliantRewrite: '#ad. Comparing the viral $140 luxury peptide cream to this $24 French pharmacy pommade. Both feature gentle vitamin A derivatives for cosmetic smoothing, but the French version skips expensive fragrance and gold packaging. Note: Retinoids can cause initial dryness; always introduce gradually and wear SPF 50 daily. Affiliate link in bio with 15% discount code FRENCH15.',
      requiredDisclosures: [
        '✓ Clear upfront #ad identification',
        '✓ Sun sensitivity and SPF advisory included',
        '✓ Fair comparative pricing baseline'
      ]
    }
  }
];

export const PRODUCT_DISCOUNT_DEALS: ProductDiscountDeal[] = [
  {
    id: 'deal-pdrn-25',
    productName: 'PDRN Salmon DNA Barrier Repair Ampoule',
    brand: 'Anua & Medicube Lab Korea',
    category: 'Skincare',
    originalPrice: 34.00,
    discountedPrice: 25.50,
    discountPercent: 25,
    promoCode: 'GLOWPDRN25',
    creatorCommissionRate: '20% Affiliate Payout',
    estimatedDollarSavings: 8.50,
    dealExpiration: 'April 30, 2026',
    daysRemaining: 18,
    verifiedActive: true,
    storeName: 'Olive Young Global & Direct Lab',
    dealUrl: 'https://oliveyoung.com/vip/GLOWPDRN25',
    qrPayload: 'https://oliveyoung.com/vip/GLOWPDRN25?creator=shortsforge&discount=25',
    exclusiveBadge: '🔥 Holy Grail Deal',
    fairTradeCertified: true
  },
  {
    id: 'deal-pilates-grip-20',
    productName: 'High-Arch Metatarsal Reformer Grip Socks',
    brand: 'Bala Movement & Studio Club',
    category: 'Fitness & Recovery',
    originalPrice: 24.00,
    discountedPrice: 19.20,
    discountPercent: 20,
    promoCode: 'COREALIGN20',
    creatorCommissionRate: '18% Affiliate Payout',
    estimatedDollarSavings: 4.80,
    dealExpiration: 'May 14, 2026',
    daysRemaining: 32,
    verifiedActive: true,
    storeName: 'Bala Movement Direct',
    dealUrl: 'https://balamovement.com/deal/COREALIGN20',
    qrPayload: 'https://balamovement.com/deal/COREALIGN20?creator=shortsforge&discount=20',
    exclusiveBadge: '✨ Pilates Club Exclusive',
    fairTradeCertified: true
  },
  {
    id: 'deal-french-pharmacy-15',
    productName: 'Sensibio H2O Micellar Water + Lait-Crème Bundle',
    brand: 'Bioderma & Embryolisse Paris',
    category: 'Skincare',
    originalPrice: 38.00,
    discountedPrice: 32.30,
    discountPercent: 15,
    promoCode: 'PARISGLOW15',
    creatorCommissionRate: '15% Affiliate Payout',
    estimatedDollarSavings: 5.70,
    dealExpiration: 'May 01, 2026',
    daysRemaining: 19,
    verifiedActive: true,
    storeName: 'CityPharma Direct Import',
    dealUrl: 'https://citypharma.fr/en/deal/PARISGLOW15',
    qrPayload: 'https://citypharma.fr/en/deal/PARISGLOW15?creator=shortsforge&discount=15',
    exclusiveBadge: '🇫🇷 French Pharmacy Classic',
    fairTradeCertified: true
  },
  {
    id: 'deal-tart-cherry-30',
    productName: 'Montmorency Tart Cherry & Magnesium L-Threonate Elixir',
    brand: 'Cymbiotika & Moon Juice',
    category: 'Supplements',
    originalPrice: 48.00,
    discountedPrice: 33.60,
    discountPercent: 30,
    promoCode: 'SLEEPDEEP30',
    creatorCommissionRate: '22% Affiliate Payout',
    estimatedDollarSavings: 14.40,
    dealExpiration: 'April 25, 2026',
    daysRemaining: 13,
    verifiedActive: true,
    storeName: 'Clean Supplement Collective',
    dealUrl: 'https://cleansupplements.co/deal/SLEEPDEEP30',
    qrPayload: 'https://cleansupplements.co/deal/SLEEPDEEP30?creator=shortsforge&discount=30',
    exclusiveBadge: '💤 High Commission Tier',
    fairTradeCertified: true
  },
  {
    id: 'deal-peptide-glaze-20',
    productName: 'Peptide Glazing Fluid & Barrier Restore Cream',
    brand: 'Rhode Skin & Hailey Bieber Lab',
    category: 'Body & Glow',
    originalPrice: 30.00,
    discountedPrice: 24.00,
    discountPercent: 20,
    promoCode: 'GLAZEGIRL20',
    creatorCommissionRate: '17% Affiliate Payout',
    estimatedDollarSavings: 6.00,
    dealExpiration: 'May 10, 2026',
    daysRemaining: 28,
    verifiedActive: true,
    storeName: 'Rhode Official Store',
    dealUrl: 'https://rhodeskin.com/promo/GLAZEGIRL20',
    qrPayload: 'https://rhodeskin.com/promo/GLAZEGIRL20?creator=shortsforge&discount=20',
    exclusiveBadge: '⭐ Viral Trendsetter',
    fairTradeCertified: true
  }
];

export const PRICE_SCALE_PROFILES: PriceScaleProductProfile[] = [
  {
    id: 'scale-pdrn-collagen',
    categoryTitle: 'Active Cellular Repair & Collagen Serums',
    activeFocus: 'Polydeoxyribonucleotide (PDRN) & Bio-Active Peptides',
    consumerInsight: 'Luxury department store brands charge a 15x-20x cosmetic markup for elegant bottles, while lab-direct Korean formulations provide higher active purity with superior clinical lipid delivery.',
    budgetOption: {
      tier: 'budget',
      tierLabel: '🪙 Lab-Direct / Dupe Tier',
      tierBadge: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
      productName: 'Sodium DNA Cica Recovery Ampoule',
      brand: 'VT Cosmetics Lab',
      price: 18.00,
      volume: '30ml',
      activeConcentration: '0.3% Sodium DNA + 1% Centella',
      costPerDay: 0.20,
      rawCogsEstimate: 2.80,
      markupRatio: 6.4,
      ethicalScore: 82,
      packagingRating: 'Recyclable PET bottle with dropper',
      clinicalTrialGrade: 'B',
      balanceVerdict: 'Budget friendly with proven soothing actives, slightly lower peptide concentration.',
      isRecommendedSweetSpot: false
    },
    fairMarketOption: {
      tier: 'fair_market',
      tierLabel: '⚖️ Optimal Sweet Spot (Consumer Best Value)',
      tierBadge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
      productName: 'PDRN Salmon DNA Barrier Repair Ampoule',
      brand: 'Anua & Medicube Lab Korea',
      price: 34.00,
      volume: '50ml (66% more volume)',
      activeConcentration: '0.5% Purified PDRN + 2% Niacinamide + 5D Hyaluronic',
      costPerDay: 0.37,
      rawCogsEstimate: 4.10,
      markupRatio: 8.2,
      ethicalScore: 94,
      packagingRating: '100% Recyclable pharmaceutical borosilicate amber glass vial',
      clinicalTrialGrade: 'A',
      balanceVerdict: 'Exceptional balance: Gold-standard double-blind clinical validation, Fair Trade certified fishery upcycling, and lowest cost-per-ml of active PDRN.',
      isRecommendedSweetSpot: true
    },
    luxuryOption: {
      tier: 'luxury',
      tierLabel: '💎 Prestige Department Store Tier',
      tierBadge: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
      productName: 'The Cellular DNA Miracle Concentrate',
      brand: 'La Mer / European Luxury House',
      price: 165.00,
      volume: '30ml',
      activeConcentration: '0.2% Marine Algae Extract + Peptide Complex',
      costPerDay: 1.83,
      rawCogsEstimate: 7.20,
      markupRatio: 22.9,
      ethicalScore: 71,
      packagingRating: 'Heavy zinc-alloy jar with non-recyclable multi-layer lacquer',
      clinicalTrialGrade: 'C',
      balanceVerdict: 'Excessive luxury markup: 23x markup paying for fragrance, golden packaging, and Madison Ave ad campaigns with lower active percentage.',
      isRecommendedSweetSpot: false
    }
  },
  {
    id: 'scale-french-retinol',
    categoryTitle: 'Retinoids & Nighttime Cell Turnover',
    activeFocus: 'Vitamin A Derivatives (Retinaldehyde / Retinyl Palmitate)',
    consumerInsight: 'High-end designer creams often dilute active retinoids to prevent customer complaints, whereas pharmaceutical pharmacy creams deliver unadulterated strength at 1/5th the price.',
    budgetOption: {
      tier: 'budget',
      tierLabel: '🪙 Pharmacy Classic',
      tierBadge: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
      productName: 'A313 Vitamin A Pommade',
      brand: 'Pharma Developpement Paris',
      price: 18.00,
      volume: '50g',
      activeConcentration: '0.12% Retinyl Esters (Macrogol Base)',
      costPerDay: 0.15,
      rawCogsEstimate: 1.90,
      markupRatio: 9.4,
      ethicalScore: 84,
      packagingRating: '100% Recyclable aluminum pharmaceutical ointment tube',
      clinicalTrialGrade: 'B',
      balanceVerdict: 'Ultra-affordable French pharmacy cult staple, dense petroleum base requires dry skin application.',
      isRecommendedSweetSpot: false
    },
    fairMarketOption: {
      tier: 'fair_market',
      tierLabel: '⚖️ Optimal Sweet Spot (Consumer Best Value)',
      tierBadge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
      productName: 'Retinal 0.05% Liposome Emulsion',
      brand: 'Beauty of Joseon / Geek & Gorgeous',
      price: 24.00,
      volume: '30ml',
      activeConcentration: '0.05% Encapsulated Retinaldehyde (11x faster conversion than Retinol)',
      costPerDay: 0.26,
      rawCogsEstimate: 3.20,
      markupRatio: 7.5,
      ethicalScore: 92,
      packagingRating: 'Airless pump with certified low-carbon recycled plastic',
      clinicalTrialGrade: 'A',
      balanceVerdict: 'Superior pharmacokinetic conversion: Retinal converts in 1 metabolic step vs Retinol in 2 steps, zero fragrance, dermatologically tested.',
      isRecommendedSweetSpot: true
    },
    luxuryOption: {
      tier: 'luxury',
      tierLabel: '💎 Prestige Department Store Tier',
      tierBadge: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
      productName: 'The Retinol Supreme Radiance Elixir',
      brand: 'Sunday Riley / High-End Prestige',
      price: 122.00,
      volume: '30ml',
      activeConcentration: '0.5% Retinoid Blend in Essential Oils',
      costPerDay: 1.35,
      rawCogsEstimate: 6.50,
      markupRatio: 18.7,
      ethicalScore: 78,
      packagingRating: 'Decorative glass dropper with plastic foil collar',
      clinicalTrialGrade: 'B',
      balanceVerdict: 'Overpriced fragrance: Essential oils (bergamot/chamomile) add sensitizing fragrance risks while charging 18x over manufacturing cost.',
      isRecommendedSweetSpot: false
    }
  }
];

export const FAIR_TRADE_BRAND_REGISTRY: FairTradeBrandAudit[] = [
  {
    id: 'ft-anua',
    brand: 'Anua & Medicube Lab Korea',
    category: 'Skincare',
    overallEthicalScore: 94,
    fairTradeCertified: true,
    livingWageVerified: true,
    conflictFreeMica: true,
    crueltyFreeStatus: '100% Leaping Bunny',
    packagingCircularityScore: 96,
    carbonNeutralRating: 'A (Climate Neutral)',
    auditVerificationDate: 'January 2026',
    auditingBody: 'Fairtrade Asia & ISO 14001 Environmental Verifiers',
    supplyChainHighlights: [
      '100% of salmon DNA upcycled from certified sustainable seafood processing by-products; zero fish harmed solely for cosmetic extraction',
      'Living wage premium (+32% above national minimum) guaranteed to coastal Korean harvesting co-operatives',
      'Pharmaceutical amber glass vials made with 80% post-consumer recycled glass'
    ],
    unethicalPracticesEliminated: [
      'Child labor in mineral sourcing',
      'Micro-plastic microbeads',
      'Animal testing in third-party export territories'
    ]
  },
  {
    id: 'ft-bala',
    brand: 'Bala Movement',
    category: 'Fitness & Recovery',
    overallEthicalScore: 91,
    fairTradeCertified: true,
    livingWageVerified: true,
    conflictFreeMica: true,
    crueltyFreeStatus: '100% Leaping Bunny',
    packagingCircularityScore: 89,
    carbonNeutralRating: 'B (Low Impact Offset)',
    auditVerificationDate: 'February 2026',
    auditingBody: 'B-Corp Certification Board',
    supplyChainHighlights: [
      'Recycled organic cotton & OEKO-TEX certified grip silicone',
      'Zero virgin plastic in retail shipping mailers',
      'Fair wage factory audits conducted semi-annually in compliance with ILO Core Conventions'
    ],
    unethicalPracticesEliminated: [
      'Sweatshop labor conditions',
      'Toxic PVC dyes in mat manufacturing'
    ]
  },
  {
    id: 'ft-french-pharma',
    brand: 'Bioderma & Laboratoire Expanscience',
    category: 'French Pharmacy',
    overallEthicalScore: 95,
    fairTradeCertified: true,
    livingWageVerified: true,
    conflictFreeMica: true,
    crueltyFreeStatus: 'EU Directive',
    packagingCircularityScore: 93,
    carbonNeutralRating: 'A (Climate Neutral)',
    auditVerificationDate: 'November 2025',
    auditingBody: 'B-Corp Global & Ecovadis Platinum Medal',
    supplyChainHighlights: [
      'Certified B-Corp since 2018 with Ecovadis top 1% sustainability ranking across all European pharmaceutical labs',
      'Direct sourcing agreements with French botanical farmers ensuring 10-year guaranteed price floors',
      '100% recyclable bottles manufactured with 50% recycled food-grade plastics'
    ],
    unethicalPracticesEliminated: [
      'Unethical palm oil derivatives without RSPO certification',
      'Animal testing banned since 2004 under EU Cosmetic Directives'
    ]
  },
  {
    id: 'ft-cymbiotika',
    brand: 'Cymbiotika & Moon Juice',
    category: 'Supplements',
    overallEthicalScore: 88,
    fairTradeCertified: true,
    livingWageVerified: true,
    conflictFreeMica: true,
    crueltyFreeStatus: '100% Leaping Bunny',
    packagingCircularityScore: 86,
    carbonNeutralRating: 'B (Low Impact Offset)',
    auditVerificationDate: 'December 2025',
    auditingBody: 'Fair Trade USA & Non-GMO Project',
    supplyChainHighlights: [
      'Organic tart cherry orchards in Michigan practicing zero-runoff regenerative soil agriculture',
      'Miron violet glass bottles that filter full visible light spectrum to extend active potency naturally without chemical preservatives',
      'Third-party laboratory heavy metal testing certificates published publicly for every production batch'
    ],
    unethicalPracticesEliminated: [
      'Synthetic fillers and magnesium stearate binders',
      'Hidden GMO excipients'
    ]
  }
];


