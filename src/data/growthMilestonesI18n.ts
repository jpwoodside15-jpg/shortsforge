export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'pt';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' }
];

export interface TranslationDictionary {
  dashboardTitle: string;
  dashboardSubtitle: string;
  creatorPrestige: string;
  rankLevel: string;
  streakDays: string;
  experiencePoints: string;
  nextRank: string;
  maxRank: string;
  toNextPrestige: string;
  clipsCut: string;
  target10Clips: string;
  uploadsDone: string;
  targetFirstLive: string;
  seoPackages: string;
  sub60Titles: string;
  badgesEarned: string;
  unlocked: string;
  streakTitle: string;
  streakSubtitle: string;
  checkInToday: string;
  checkedIn: string;
  streakMultiplier: string;
  simDeckTitle: string;
  simDeckSubtitle: string;
  plusClip: string;
  unlock10Clips: string;
  firstUpload: string;
  plusStreakDay: string;
  soundActive: string;
  soundMuted: string;
  resetStats: string;
  categoryLabel: string;
  tierLabel: string;
  all: string;
  creation: string;
  upload: string;
  seo: string;
  retention: string;
  viralMastery: string;
  consistency: string;
  achieved: string;
  progress: string;
  inspectDetails: string;
  objective: string;
  xpReward: string;
  algorithmicPerk: string;
  incomplete: string;
  unlockedActive: string;
  shareBrag: string;
  copiedCard: string;
  done: string;
  celebrationTitle: string;
  viewBadge: string;
  ranks: {
    noviceSlicer: string;
    hookApprentice: string;
    retentionSurgeon: string;
    algorithmicVanguard: string;
    shortsTitan: string;
    viralOverlord: string;
  };
  badges: Record<string, {
    title: string;
    description: string;
    flavorQuote: string;
  }>;
}

export const I18N_TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    dashboardTitle: 'Growth Milestones & AAA Gamification Suite',
    dashboardSubtitle: 'Awarding real visual badges for video generation, uploads, and consistency streaks to accelerate your Shorts channel.',
    creatorPrestige: 'Creator Prestige',
    rankLevel: 'Rank',
    streakDays: 'Day Streak',
    experiencePoints: 'Experience Points',
    nextRank: 'Next Rank',
    maxRank: '★ MAX CREATOR RANK ACHIEVED ★',
    toNextPrestige: 'to Next Prestige',
    clipsCut: 'Clips Cut',
    target10Clips: 'Target: 10 clips',
    uploadsDone: 'Uploads Done',
    targetFirstLive: 'Target: 1st live',
    seoPackages: 'SEO Packages',
    sub60Titles: '<60 char titles',
    badgesEarned: 'Badges Earned',
    unlocked: 'unlocked',
    streakTitle: '7-Day Algorithmic Consistency Flame',
    streakSubtitle: 'YouTube prioritizes channels with uninterrupted daily momentum. Check in daily to unlock tier boosts.',
    checkInToday: 'Check In Today (+1 Day Streak)',
    checkedIn: 'Checked In For Today!',
    streakMultiplier: 'Algorithmic Multiplier',
    simDeckTitle: 'Milestone Simulation & Real-Time Trigger Deck',
    simDeckSubtitle: 'Test immediate badge unlocking, audio chimes, and XP rewards or sync your real project activity.',
    plusClip: '+1 Clip Cut',
    unlock10Clips: "Unlock '10 Clips'",
    firstUpload: "First Upload",
    plusStreakDay: "+1 Streak Day",
    soundActive: 'Procedural Sound Effects Active',
    soundMuted: 'Sound Effects Muted',
    resetStats: 'Reset',
    categoryLabel: 'Category:',
    tierLabel: 'Tier:',
    all: 'All',
    creation: 'Creation',
    upload: 'Upload',
    seo: 'SEO',
    retention: 'Retention',
    viralMastery: 'Viral Mastery',
    consistency: 'Consistency',
    achieved: 'ACHIEVED',
    progress: 'PROGRESS',
    inspectDetails: 'Inspect Details',
    objective: 'Objective:',
    xpReward: 'XP Reward',
    algorithmicPerk: 'Algorithmic Perk',
    incomplete: 'Incomplete:',
    unlockedActive: 'Unlocked & Active',
    shareBrag: 'Share Brag',
    copiedCard: 'Copied Card!',
    done: 'Done',
    celebrationTitle: '★ NEW GROWTH MILESTONE UNLOCKED! ★',
    viewBadge: 'View Badge',
    ranks: {
      noviceSlicer: 'Novice Slicer',
      hookApprentice: 'Hook Apprentice',
      retentionSurgeon: 'Retention Surgeon',
      algorithmicVanguard: 'Algorithmic Vanguard',
      shortsTitan: 'Shorts Titan',
      viralOverlord: 'Viral Overlord'
    },
    badges: {
      'badge-first-clip': {
        title: 'First Slicer Spark',
        description: 'Generate your first sliced short clip from any transcript or drone flight.',
        flavorQuote: 'Every 100M-view channel started with a single cut.'
      },
      'badge-10-clips': {
        title: '10 Clips Generated',
        description: 'Reach 10 total clips generated across Transcript Slicer, Drone Flights & Creative Agent.',
        flavorQuote: '10 clips = 10 lottery tickets into YouTube\'s browse algorithm.'
      },
      'badge-25-clips': {
        title: 'Viral Centurion (25 Clips)',
        description: 'Mass-produce 25 clips ready for vertical distribution.',
        flavorQuote: 'Volume builds intuition. Intuition builds viral empires.'
      },
      'badge-first-upload': {
        title: 'First Successful Upload',
        description: 'Deploy your first Short to YouTube via Direct Upload Suite or Terminal cURL publisher.',
        flavorQuote: 'You crossed the chasm from consumer to creator.'
      },
      'badge-5-uploads': {
        title: 'High-Frequency Broadcaster',
        description: 'Execute 5 successful uploads with pinned affiliate comments & tags.',
        flavorQuote: 'The algorithm now recognizes your publishing cadence.'
      },
      'badge-streak-7': {
        title: 'Consistency Streak: 7 Days',
        description: 'Maintain a 7-day active production streak without missing a day on the Shorts feed.',
        flavorQuote: 'Consistency compounds faster than interest. 7 days builds unstoppable algorithmic momentum.'
      },
      'badge-streak-14': {
        title: 'Consistency Streak: 14 Days',
        description: 'Achieve a 14-day unbroken daily check-in and clip pipeline streak.',
        flavorQuote: 'Two weeks of pure discipline. The algorithm now considers your channel high-authority.'
      },
      'badge-streak-30': {
        title: 'Consistency Streak: 30 Days (Viral Machine)',
        description: 'Dominate an entire 30-day month of relentless daily video production.',
        flavorQuote: 'You are no longer an amateur. You are a content creation machine.'
      },
      'badge-first-seo': {
        title: 'Algorithm Whisperer',
        description: 'Complete full SEO optimization (Titles under 60 chars, 3 algorithmic tags & description).',
        flavorQuote: 'Keywords tell the robot who to give your video to.'
      },
      'badge-5-seo': {
        title: 'Metadata Architect',
        description: 'Complete SEO optimization and high-converting pinned comments for 5 projects.',
        flavorQuote: 'Zero fluff, 100% indexing precision.'
      },
      'badge-first-retention': {
        title: 'Retention Surgeon',
        description: 'Import YouTube Analytics CSV and pinpoint the exact seconds losing audience attention.',
        flavorQuote: 'Don\'t guess why viewers left. Perform surgery on the drop.'
      },
      'badge-3-retention': {
        title: 'Cliff Eliminator',
        description: 'Perform retention diagnostics across 3 distinct Shorts datasets.',
        flavorQuote: 'You now engineer videos where viewers forget how to swipe away.'
      },
      'badge-first-hooks': {
        title: 'Dopamine Trigger Master',
        description: 'Generate 3 psychological variations (Curiosity Vacuum, Belief Violation & FOMO) in Smart Hook Generator.',
        flavorQuote: 'Win the first 3 seconds and YouTube hands you the universe.'
      },
      'badge-10-hooks': {
        title: 'Neural Pattern Breaker',
        description: 'Formulate 10 high-tension curiosity hooks that stop vertical feed autopilot.',
        flavorQuote: 'Your scripts bypass conscious defenses and ignite raw curiosity.'
      },
      'badge-first-project': {
        title: 'Full Pipeline Finisher',
        description: 'Complete all 4 phases (Scripting, Editing, SEO, Upload) on a project.',
        flavorQuote: 'Discipline turns ideas into automated revenue.'
      },
      'badge-remix-master': {
        title: 'Fair-Use Remix Alchemist',
        description: 'Remix a trending Short in the Video Clipper with Safe-Zone & algorithmic filters.',
        flavorQuote: 'Repurpose brilliance with transformative fair-use speed ramps.'
      }
    }
  },
  es: {
    dashboardTitle: 'Hitos de Crecimiento y Suite de Gamificación AAA',
    dashboardSubtitle: 'Otorga insignias visuales reales por generación de clips, subidas y rachas de constancia para acelerar tu canal de Shorts.',
    creatorPrestige: 'Prestigio de Creador',
    rankLevel: 'Rango',
    streakDays: 'Días de Racha',
    experiencePoints: 'Puntos de Experiencia',
    nextRank: 'Siguiente Rango',
    maxRank: '★ RANGO MÁXIMO DE CREADOR ALCANZADO ★',
    toNextPrestige: 'para el Siguiente Nivel',
    clipsCut: 'Clips Cortados',
    target10Clips: 'Objetivo: 10 clips',
    uploadsDone: 'Subidas Realizadas',
    targetFirstLive: 'Objetivo: 1ª en vivo',
    seoPackages: 'Paquetes SEO',
    sub60Titles: 'Títulos <60 caract.',
    badgesEarned: 'Insignias Ganadas',
    unlocked: 'desbloqueado',
    streakTitle: 'Llama Algorítmica de Constancia de 7 Días',
    streakSubtitle: 'YouTube prioriza canales con impulso diario ininterrumpido. Regístrate a diario para desbloquear bonificaciones.',
    checkInToday: 'Registrarse Hoy (+1 Día de Racha)',
    checkedIn: '¡Registrado por Hoy!',
    streakMultiplier: 'Multiplicador Algorítmico',
    simDeckTitle: 'Plataforma de Simulación y Activación en Tiempo Real',
    simDeckSubtitle: 'Prueba el desbloqueo inmediato de insignias, campanas de audio y recompensas de XP o sincroniza tu actividad real.',
    plusClip: '+1 Clip Cortado',
    unlock10Clips: "Desbloquear '10 Clips'",
    firstUpload: "Primera Subida",
    plusStreakDay: "+1 Día de Racha",
    soundActive: 'Efectos de Sonido Procedurales Activos',
    soundMuted: 'Efectos de Sonido Silenciados',
    resetStats: 'Reiniciar',
    categoryLabel: 'Categoría:',
    tierLabel: 'Nivel:',
    all: 'Todas',
    creation: 'Creación',
    upload: 'Subidas',
    seo: 'SEO',
    retention: 'Retención',
    viralMastery: 'Maestría Viral',
    consistency: 'Constancia',
    achieved: 'CONSEGUIDO',
    progress: 'PROGRESO',
    inspectDetails: 'Inspeccionar Detalles',
    objective: 'Objetivo:',
    xpReward: 'Recompensa XP',
    algorithmicPerk: 'Ventaja Algorítmica',
    incomplete: 'Incompleto:',
    unlockedActive: 'Desbloqueado y Activo',
    shareBrag: 'Compartir Logro',
    copiedCard: '¡Tarjeta Copiada!',
    done: 'Listo',
    celebrationTitle: '★ ¡NUEVO HITO DE CRECIMIENTO DESBLOQUEADO! ★',
    viewBadge: 'Ver Insignia',
    ranks: {
      noviceSlicer: 'Cortador Novato',
      hookApprentice: 'Aprendiz de Ganchos',
      retentionSurgeon: 'Cirujano de Retención',
      algorithmicVanguard: 'Vanguardia Algorítmica',
      shortsTitan: 'Titán de Shorts',
      viralOverlord: 'Señor Supremo Viral'
    },
    badges: {
      'badge-first-clip': {
        title: 'Primera Chispa del Cortador',
        description: 'Genera tu primer clip corto a partir de cualquier transcripción o vuelo de dron.',
        flavorQuote: 'Cada canal de 100M de vistas comenzó con un solo corte.'
      },
      'badge-10-clips': {
        title: '10 Clips Generados',
        description: 'Alcanza 10 clips totales generados entre Cortador, Vuelos de Dron y Agente Creativo.',
        flavorQuote: '10 clips = 10 boletos de lotería en el algoritmo de YouTube.'
      },
      'badge-25-clips': {
        title: 'Centurión Viral (25 Clips)',
        description: 'Produce en masa 25 clips listos para distribución vertical.',
        flavorQuote: 'El volumen genera intuición. La intuición construye imperios virales.'
      },
      'badge-first-upload': {
        title: 'Primera Subida Exitosa',
        description: 'Publica tu primer Short en YouTube mediante el cargador directo o script cURL.',
        flavorQuote: 'Cruzaste la brecha de consumidor a creador.'
      },
      'badge-5-uploads': {
        title: 'Emisor de Alta Frecuencia',
        description: 'Ejecuta 5 subidas exitosas con comentarios fijados y etiquetas.',
        flavorQuote: 'El algoritmo ahora reconoce tu cadencia de publicación.'
      },
      'badge-streak-7': {
        title: 'Racha de Constancia: 7 Días',
        description: 'Mantén una racha de producción activa de 7 días sin faltar ni un día en Shorts.',
        flavorQuote: 'La constancia rinde más que el interés. 7 días crean un impulso imparable.'
      },
      'badge-streak-14': {
        title: 'Racha de Constancia: 14 Días',
        description: 'Consigue 14 días ininterrumpidos de actividad y clips.',
        flavorQuote: 'Dos semanas de pura disciplina. El algoritmo ahora considera tu canal de alta autoridad.'
      },
      'badge-streak-30': {
        title: 'Racha de Constancia: 30 Días (Máquina Viral)',
        description: 'Domina un mes entero de 30 días con producción diaria imparable.',
        flavorQuote: 'Ya no eres un aficionado. Eres una máquina de contenido.'
      },
      'badge-first-seo': {
        title: 'Susurrador del Algoritmo',
        description: 'Optimización SEO completa (Títulos <60 caracteres, 3 etiquetas algorítmicas y descripción).',
        flavorQuote: 'Las palabras clave le dicen al robot a quién darle tu video.'
      },
      'badge-5-seo': {
        title: 'Arquitecto de Metadatos',
        description: 'Optimización SEO completa y comentarios fijados de alta conversión en 5 proyectos.',
        flavorQuote: 'Cero relleno, 100% precisión de indexación.'
      },
      'badge-first-retention': {
        title: 'Cirujano de Retención',
        description: 'Importa analíticas de YouTube y detecta los segundos exactos de fuga de audiencia.',
        flavorQuote: 'No adivines por qué se fueron. Haz cirugía en la caída.'
      },
      'badge-3-retention': {
        title: 'Eliminador de Precipicios',
        description: 'Diagnostica la retención en 3 conjuntos de datos de Shorts distintos.',
        flavorQuote: 'Ahora diseñas videos donde los usuarios olvidan cómo deslizar.'
      },
      'badge-first-hooks': {
        title: 'Maestro de Disparadores de Dopamina',
        description: 'Genera 3 variaciones psicológicas en el Generador de Ganchos.',
        flavorQuote: 'Gana los primeros 3 segundos y YouTube te entregará el universo.'
      },
      'badge-10-hooks': {
        title: 'Rompepatrones Neural',
        description: 'Formula 10 ganchos de alta tensión que detienen el piloto automático.',
        flavorQuote: 'Tus guiones superan las defensas y despiertan pura curiosidad.'
      },
      'badge-first-project': {
        title: 'Finalizador de Pipeline Completo',
        description: 'Completa las 4 fases (Guion, Edición, SEO, Subida) de un proyecto.',
        flavorQuote: 'La disciplina convierte las ideas en ingresos automáticos.'
      },
      'badge-remix-master': {
        title: 'Alquimista de Remix de Uso Legítimo',
        description: 'Remezcla un Short en tendencia con zona segura y filtros algorítmicos.',
        flavorQuote: 'Transforma con velocidad y protección legal fair-use.'
      }
    }
  },
  fr: {
    dashboardTitle: 'Paliers de Croissance & Suite de Gamification AAA',
    dashboardSubtitle: 'Attribution de badges visuels pour la création de clips, les téléversements et la régularité quotidienne sur Shorts.',
    creatorPrestige: 'Prestige de Créateur',
    rankLevel: 'Rang',
    streakDays: 'Jours de Série',
    experiencePoints: 'Points d\'Expérience',
    nextRank: 'Rang Suivant',
    maxRank: '★ RANG MAXIMUM ATTEINT ★',
    toNextPrestige: 'vers le Prochain Prestige',
    clipsCut: 'Clips Coupés',
    target10Clips: 'Objectif : 10 clips',
    uploadsDone: 'Téléversements',
    targetFirstLive: 'Objectif : 1er en ligne',
    seoPackages: 'Packs SEO',
    sub60Titles: 'Titres <60 car.',
    badgesEarned: 'Badges Obtenus',
    unlocked: 'débloqués',
    streakTitle: 'Flamme Algorithmique de Régularité sur 7 Jours',
    streakSubtitle: 'YouTube privilégie les chaînes régulières. Enregistrez-vous chaque jour pour booster votre chaîne.',
    checkInToday: 'S\'enregistrer Aujourd\'hui (+1 Jour)',
    checkedIn: 'Enregistré Aujourd\'hui !',
    streakMultiplier: 'Multiplicateur Algorithmique',
    simDeckTitle: 'Simulateur & Déclencheur Temps Réel',
    simDeckSubtitle: 'Testez le déblocage immédiat de badges, effets sonores et XP.',
    plusClip: '+1 Clip Coupé',
    unlock10Clips: "Débloquer '10 Clips'",
    firstUpload: "Premier Téléversement",
    plusStreakDay: "+1 Jour de Série",
    soundActive: 'Sons Procéduraux Actifs',
    soundMuted: 'Sons Muets',
    resetStats: 'Réinitialiser',
    categoryLabel: 'Catégorie :',
    tierLabel: 'Palier :',
    all: 'Tous',
    creation: 'Création',
    upload: 'Téléversement',
    seo: 'SEO',
    retention: 'Rétention',
    viralMastery: 'Maîtrise Virale',
    consistency: 'Régularité',
    achieved: 'RÉUSSI',
    progress: 'PROGRESSION',
    inspectDetails: 'Inspecter les Détails',
    objective: 'Objectif :',
    xpReward: 'Gain XP',
    algorithmicPerk: 'Bonus Algorithmique',
    incomplete: 'Incomplet :',
    unlockedActive: 'Débloqué & Actif',
    shareBrag: 'Partager le Badge',
    copiedCard: 'Carte Copiée !',
    done: 'Terminer',
    celebrationTitle: '★ NOUVEAU BADGE DÉBLOQUÉ ! ★',
    viewBadge: 'Voir le Badge',
    ranks: {
      noviceSlicer: 'Monteur Débutant',
      hookApprentice: 'Apprenti des Accroches',
      retentionSurgeon: 'Chirurgien de la Rétention',
      algorithmicVanguard: 'Avant-Garde Algorithmique',
      shortsTitan: 'Titan des Shorts',
      viralOverlord: 'Maître Suprême Viral'
    },
    badges: {
      'badge-first-clip': {
        title: 'Première Étincelle',
        description: 'Générez votre premier clip court depuis une transcription ou un survol de drone.',
        flavorQuote: 'Chaque chaîne aux 100M de vues a commencé par une seule coupe.'
      },
      'badge-10-clips': {
        title: '10 Clips Générés',
        description: 'Atteignez 10 clips créés avec nos outils de découpe et l\'Agent Créatif.',
        flavorQuote: '10 clips = 10 tickets de loto dans l\'algorithme YouTube.'
      },
      'badge-25-clips': {
        title: 'Centurion Viral (25 Clips)',
        description: 'Produisez 25 clips prêts pour la diffusion verticale.',
        flavorQuote: 'Le volume bâtit l\'intuition. L\'intuition bâtit les empires viraux.'
      },
      'badge-first-upload': {
        title: 'Premier Téléversement Réussi',
        description: 'Publiez votre premier Short sur YouTube via notre suite d\'upload direct.',
        flavorQuote: 'Vous êtes passé du statut de spectateur à celui de créateur.'
      },
      'badge-5-uploads': {
        title: 'Diffuseur Haute Fréquence',
        description: 'Effectuez 5 uploads réussis avec commentaires épinglés et tags.',
        flavorQuote: 'L\'algorithme reconnaît désormais votre cadence de publication.'
      },
      'badge-streak-7': {
        title: 'Série de Régularité : 7 Jours',
        description: 'Maintenez une cadence active de 7 jours consécutifs sur Shorts.',
        flavorQuote: 'La régularité s\'accumule plus vite que les intérêts. 7 jours créent l\'élan.'
      },
      'badge-streak-14': {
        title: 'Série de Régularité : 14 Jours',
        description: 'Deux semaines ininterrompues de présence et de création.',
        flavorQuote: 'Deux semaines de pure discipline. Votre chaîne gagne une autorité maximale.'
      },
      'badge-streak-30': {
        title: 'Série de Régularité : 30 Jours (Machine Virale)',
        description: 'Dominez un mois entier de 30 jours sans manquer une seule journée.',
        flavorQuote: 'Vous n\'êtes plus un amateur. Vous êtes une machine à contenu.'
      },
      'badge-first-seo': {
        title: 'Chuchoteur de l\'Algorithme',
        description: 'Optimisation SEO complète (Titre <60 car., tags et description).',
        flavorQuote: 'Les mots-clés indiquent au robot à qui montrer votre vidéo.'
      },
      'badge-5-seo': {
        title: 'Architecte des Métadonnées',
        description: 'Optimisation SEO et commentaires épinglés sur 5 projets.',
        flavorQuote: 'Zéro superflu, 100% précision d\'indexation.'
      },
      'badge-first-retention': {
        title: 'Chirurgien de la Rétention',
        description: 'Analysez les courbes d\'audience pour éliminer les pertes de spectateurs.',
        flavorQuote: 'Ne devinez pas pourquoi ils partent. Opérez la chute.'
      },
      'badge-3-retention': {
        title: 'Éliminateur de Falaises',
        description: 'Effectuez des diagnostics de rétention sur 3 vidéos Shorts distinctes.',
        flavorQuote: 'Vous créez désormais des vidéos que les spectateurs ne peuvent zapper.'
      },
      'badge-first-hooks': {
        title: 'Maître des Déclencheurs de Dopamine',
        description: 'Générez 3 variations psychologiques d\'accroche.',
        flavorQuote: 'Gagnez les 3 premières secondes et YouTube vous ouvre l\'univers.'
      },
      'badge-10-hooks': {
        title: 'Briseur de Schémas',
        description: 'Formulez 10 accroches percutantes qui coupent le défilement automatique.',
        flavorQuote: 'Vos scripts captent immédiatement l\'attention brute.'
      },
      'badge-first-project': {
        title: 'Finisseur de Pipeline Complet',
        description: 'Validez les 4 étapes (Script, Montage, SEO, Upload) d\'un projet.',
        flavorQuote: 'La discipline transforme les idées en revenus automatisés.'
      },
      'badge-remix-master': {
        title: 'Alchimiste du Remix Fair-Use',
        description: 'Remixez un Short tendance avec cadrage sécurisé et filtres accélérateurs.',
        flavorQuote: 'Recyclez avec brio et conformité légale.'
      }
    }
  },
  de: {
    dashboardTitle: 'Wachstums-Meilensteine & AAA Gamification Suite',
    dashboardSubtitle: 'Verleiht visuelle Abzeichen für Videoerstellung, Uploads und Beständigkeits-Serien zur Beschleunigung deines Shorts-Kanals.',
    creatorPrestige: 'Creator-Prestige',
    rankLevel: 'Rang',
    streakDays: 'Tage Serie',
    experiencePoints: 'Erfahrungspunkte',
    nextRank: 'Nächster Rang',
    maxRank: '★ MAXIMALER CREATOR-RANG ERREICHT ★',
    toNextPrestige: 'zum nächsten Prestige',
    clipsCut: 'Clips Geschnitten',
    target10Clips: 'Ziel: 10 Clips',
    uploadsDone: 'Uploads Fertig',
    targetFirstLive: 'Ziel: 1. live',
    seoPackages: 'SEO Pakete',
    sub60Titles: '<60 Zeichen Titel',
    badgesEarned: 'Abzeichen Verdient',
    unlocked: 'freigeschaltet',
    streakTitle: '7-Tage Algorithmische Beständigkeits-Flamme',
    streakSubtitle: 'YouTube bevorzugt Kanäle mit täglichem Upload-Rhythmus. Melde dich täglich an für Boni.',
    checkInToday: 'Heute Anmelden (+1 Tag Serie)',
    checkedIn: 'Für Heute Angemeldet!',
    streakMultiplier: 'Algorithmischer Multiplikator',
    simDeckTitle: 'Meilenstein-Simulation & Trigger-Deck',
    simDeckSubtitle: 'Teste sofortige Abzeichen-Freischaltungen, Sounds und XP.',
    plusClip: '+1 Clip Geschnitten',
    unlock10Clips: "Freischalten '10 Clips'",
    firstUpload: "Erster Upload",
    plusStreakDay: "+1 Serie Tag",
    soundActive: 'Soundeffekte Aktiv',
    soundMuted: 'Soundeffekte Stumm',
    resetStats: 'Zurücksetzen',
    categoryLabel: 'Kategorie:',
    tierLabel: 'Stufe:',
    all: 'Alle',
    creation: 'Erstellung',
    upload: 'Upload',
    seo: 'SEO',
    retention: 'Zuschauerbindung',
    viralMastery: 'Virale Meisterschaft',
    consistency: 'Beständigkeit',
    achieved: 'ERREICHT',
    progress: 'FORTSCHRITT',
    inspectDetails: 'Details Anzeigen',
    objective: 'Ziel:',
    xpReward: 'XP Belohnung',
    algorithmicPerk: 'Algorithmischer Bonus',
    incomplete: 'Unvollständig:',
    unlockedActive: 'Freigeschaltet & Aktiv',
    shareBrag: 'Abzeichen Teilen',
    copiedCard: 'Karte Kopiert!',
    done: 'Fertig',
    celebrationTitle: '★ NEUER MEILENSTEIN FREIGESCHALTET! ★',
    viewBadge: 'Abzeichen Ansehen',
    ranks: {
      noviceSlicer: 'Neuling-Cutter',
      hookApprentice: 'Hook-Lehrling',
      retentionSurgeon: 'Retention-Chirurg',
      algorithmicVanguard: 'Algorithmische Avantgarde',
      shortsTitan: 'Shorts-Titan',
      viralOverlord: 'Viraler Herrscher'
    },
    badges: {
      'badge-first-clip': {
        title: 'Erster Schnitt-Funke',
        description: 'Erstelle deinen ersten geschnittenen Clip aus Transkript oder Drohnenflug.',
        flavorQuote: 'Jeder 100M-Kanal begann mit einem einzigen Schnitt.'
      },
      'badge-10-clips': {
        title: '10 Clips Generiert',
        description: 'Erreiche 10 erstellte Clips über Schnitt-Tools und Creative Agent.',
        flavorQuote: '10 Clips = 10 Lottoscheine im YouTube-Algorithmus.'
      },
      'badge-25-clips': {
        title: 'Viraler Zenturio (25 Clips)',
        description: 'Produziere 25 vertikale Clips für die Distribution.',
        flavorQuote: 'Volumen schafft Intuition. Intuition baut virale Imperien.'
      },
      'badge-first-upload': {
        title: 'Erster Erfolgreicher Upload',
        description: 'Lade dein erstes Short via Direct Uploader auf YouTube hoch.',
        flavorQuote: 'Du hast die Grenze vom Konsumenten zum Creator überschritten.'
      },
      'badge-5-uploads': {
        title: 'Hochfrequenz-Broadcaster',
        description: 'Veröffentliche 5 Shorts mit angepinnten Kommentaren und Tags.',
        flavorQuote: 'Der Algorithmus erkennt nun deinen Veröffentlichungsrhythmus.'
      },
      'badge-streak-7': {
        title: 'Beständigkeits-Serie: 7 Tage',
        description: 'Halte eine 7-Tage-Aktivitätsserie auf Shorts ohne Unterbrechung.',
        flavorQuote: 'Beständigkeit zahlt sich aus. 7 Tage schaffen unaufhaltsames Momentum.'
      },
      'badge-streak-14': {
        title: 'Beständigkeits-Serie: 14 Tage',
        description: 'Zwei Wochen ununterbrochene tägliche Clip-Produktion.',
        flavorQuote: 'Zwei Wochen pure Disziplin. Dein Kanal gilt nun als hochautoritär.'
      },
      'badge-streak-30': {
        title: 'Beständigkeits-Serie: 30 Tage (Virale Maschine)',
        description: 'Beherrsche einen vollen 30-Tage-Monat täglicher Videoproduktion.',
        flavorQuote: 'Du bist kein Amateur mehr. Du bist eine Content-Maschine.'
      },
      'badge-first-seo': {
        title: 'Algorithmus-Flüsterer',
        description: 'Vollständige SEO-Optimierung (Titel <60 Zeichen, Tags, Beschreibung).',
        flavorQuote: 'Keywords verraten dem Algorithmus, wem dein Video gefällt.'
      },
      'badge-5-seo': {
        title: 'Metadaten-Architekt',
        description: 'Vollständige SEO-Optimierung für 5 Projekte.',
        flavorQuote: 'Kein Ballast, 100% Indexierungspräzision.'
      },
      'badge-first-retention': {
        title: 'Retention-Chirurg',
        description: 'Analysiere Analytics-Kurven und eliminiere Absprungstellen.',
        flavorQuote: 'Rate nicht, warum Zuschauer gingen. Operiere den Absprung.'
      },
      'badge-3-retention': {
        title: 'Klippen-Eliminator',
        description: 'Führe Retention-Analysen für 3 verschiedene Shorts durch.',
        flavorQuote: 'Du entwickelst Videos, bei denen Zuschauer das Weiterwischen vergessen.'
      },
      'badge-first-hooks': {
        title: 'Dopamin-Trigger-Meister',
        description: 'Generiere 3 psychologische Hook-Varianten.',
        flavorQuote: 'Gewinne die ersten 3 Sekunden und YouTube gehört dir.'
      },
      'badge-10-hooks': {
        title: 'Musterbrecher',
        description: 'Formuliere 10 hochspannende Neugier-Hooks.',
        flavorQuote: 'Deine Drehbücher fesseln die Neugier der Zuschauer sofort.'
      },
      'badge-first-project': {
        title: 'Pipeline-Finisher',
        description: 'Schließe alle 4 Phasen (Skript, Schnitt, SEO, Upload) ab.',
        flavorQuote: 'Disziplin verwandelt Ideen in automatisierte Einnahmen.'
      },
      'badge-remix-master': {
        title: 'Fair-Use Remix-Alchemist',
        description: 'Remixe ein Trend-Short mit Sicherheitszone und Tempofiltern.',
        flavorQuote: 'Wiederverwertung mit rechtlicher Sicherheit.'
      }
    }
  },
  ja: {
    dashboardTitle: '成長マイルストーン & AAAゲーミフィケーションスイート',
    dashboardSubtitle: 'クリップ生成、アップロード、継続ストリークに対してAAAデザインのビジュアルバッジを授与します。',
    creatorPrestige: 'クリエイタープレステージ',
    rankLevel: 'ランク',
    streakDays: '日連続ストリーク',
    experiencePoints: '経験値 (XP)',
    nextRank: '次のランク',
    maxRank: '★ 最高クリエイターランク到達 ★',
    toNextPrestige: '次のランクまで',
    clipsCut: '生成クリップ数',
    target10Clips: '目標: 10クリップ',
    uploadsDone: 'アップロード完了',
    targetFirstLive: '目標: 初回公開',
    seoPackages: 'SEOパッケージ',
    sub60Titles: '60文字以内のタイトル',
    badgesEarned: '獲得バッジ',
    unlocked: '獲得済み',
    streakTitle: '7日間アルゴリズム継続フレイム',
    streakSubtitle: 'YouTubeは毎日の継続投稿を最優先します。毎日チェックインしてボーナスを解放しましょう。',
    checkInToday: '本日チェックイン (+1日ストリーク)',
    checkedIn: '本日のチェックイン完了！',
    streakMultiplier: 'アルゴリズム乗数',
    simDeckTitle: 'マイルストーンシミュレーション & トリガーデッキ',
    simDeckSubtitle: 'バッジの即時アンロック、サウンド、XP獲得をテストできます。',
    plusClip: '+1 クリップ生成',
    unlock10Clips: "「10クリップ」解放",
    firstUpload: "初回アップロード",
    plusStreakDay: "+1日ストリーク追加",
    soundActive: '効果音有効',
    soundMuted: '効果音ミュート',
    resetStats: 'リセット',
    categoryLabel: 'カテゴリ:',
    tierLabel: 'ティア:',
    all: 'すべて',
    creation: 'クリップ生成',
    upload: 'アップロード',
    seo: 'SEO対策',
    retention: '視聴維持率',
    viralMastery: 'バイラルマスター',
    consistency: '継続性',
    achieved: '獲得完了',
    progress: '進捗',
    inspectDetails: '詳細を確認',
    objective: '達成目標:',
    xpReward: '獲得XP',
    algorithmicPerk: 'アルゴリズム特典',
    incomplete: '未達成:',
    unlockedActive: '獲得済み & 有効',
    shareBrag: '自慢をシェア',
    copiedCard: 'バッジカードをコピー！',
    done: '閉じる',
    celebrationTitle: '★ 新しい成長マイルストーンを獲得！ ★',
    viewBadge: 'バッジを見る',
    ranks: {
      noviceSlicer: 'ノービス・スライサー',
      hookApprentice: 'フック見習い',
      retentionSurgeon: 'リテンション外科医',
      algorithmicVanguard: 'アルゴリズムの前衛',
      shortsTitan: 'ショーツの巨人',
      viralOverlord: 'バイラル・覇王'
    },
    badges: {
      'badge-first-clip': {
        title: '最初の一閃',
        description: '文字起こしやドローン飛行から最初のショート動画を生成する。',
        flavorQuote: '1億回再生されるチャンネルも、たった1本のカットから始まった。'
      },
      'badge-10-clips': {
        title: '10クリップ生成完了',
        description: 'スライサーやエージェントを使って合計10本のクリップを生成する。',
        flavorQuote: '10本のクリップ＝YouTubeのアルゴリズムへの10枚の宝くじ。'
      },
      'badge-25-clips': {
        title: 'バイラルセンチュリオン (25本)',
        description: '縦型動画25本を一括量産する。',
        flavorQuote: '量が直感を生み、直感がバイラル帝国を築く。'
      },
      'badge-first-upload': {
        title: '初回アップロード成功',
        description: 'ダイレクトアップローダー経由で最初のShortsを公開する。',
        flavorQuote: '消費者の壁を越えて、クリエイターへと進化した瞬間。'
      },
      'badge-5-uploads': {
        title: '高頻度ブロードキャスター',
        description: '固定コメントとタグを完璧に設定して5本投稿する。',
        flavorQuote: 'アルゴリズムがあなたの投稿ペースを明確に認識し始めた。'
      },
      'badge-streak-7': {
        title: '7日間連続投稿ストリーク',
        description: 'Shortsフィードで1日も休まず7日間の連続投稿を維持する。',
        flavorQuote: '継続は複利で増える。7日間の継続が止まらない勢いを生み出す。'
      },
      'badge-streak-14': {
        title: '14日間連続投稿ストリーク',
        description: '2週間の途切れない日次チェックインとクリップ制作を達成する。',
        flavorQuote: '2週間の純粋な規律。アルゴリズムはチャンネルを権威あるものと認定する。'
      },
      'badge-streak-30': {
        title: '30日間連続投稿 (バイラルマシン)',
        description: '30日間毎日休むことなく動画制作を支配し続ける。',
        flavorQuote: 'もうアマチュアではない。完全なコンテンツ生成マシンだ。'
      },
      'badge-first-seo': {
        title: 'アルゴリズムの囁き手',
        description: '60文字以内のタイトル、3つのタグ、説明文を最適化する。',
        flavorQuote: 'キーワードは、誰に動画を届けるべきかをロボットに伝える。'
      },
      'badge-5-seo': {
        title: 'メタデータアーキテクト',
        description: '5つのプロジェクトでSEOと固定コメントを完全最適化する。',
        flavorQuote: '無駄をゼロにし、インデックスの精度を100%にする。'
      },
      'badge-first-retention': {
        title: 'リテンション外科医',
        description: 'アナリティクスを分析し、視聴者が離脱する正確な秒数を特定する。',
        flavorQuote: 'なぜ去ったか推測するな。急落箇所を手術せよ。'
      },
      'badge-3-retention': {
        title: '断崖絶壁エリミネーター',
        description: '3つの異なるデータセットで離脱防止診断を実施する。',
        flavorQuote: '視聴者がスワイプを忘れるほどの動画を設計する。'
      },
      'badge-first-hooks': {
        title: 'ドーパミントリガーマスター',
        description: '心理学的フックの3つのバリエーションを生成する。',
        flavorQuote: '最初の3秒を制すれば、YouTubeの世界を手中に収められる。'
      },
      'badge-10-hooks': {
        title: 'ニューラルパターンブレイカー',
        description: '無意識のスワイプを止める10個の強力なフックを作成する。',
        flavorQuote: 'あなたの台本は視聴者の防御を突破し、強烈な好奇心に火をつける。'
      },
      'badge-first-project': {
        title: 'パイプラインコンプリーター',
        description: '台本、編集、SEO、投稿の4段階すべてを完了する。',
        flavorQuote: '規律がアイデアを自動化された収益へと変貌させる。'
      },
      'badge-remix-master': {
        title: 'フェアユース・リミックス錬金術師',
        description: '安全ゾーンと速度調整を適用してトレンド動画をリミックスする。',
        flavorQuote: '優れた素材を再構築し、合法的に価値を高める。'
      }
    }
  },
  pt: {
    dashboardTitle: 'Marcos de Crescimento & Suíte de Gamificação AAA',
    dashboardSubtitle: 'Concede medalhas visuais reais para geração de clipes, uploads e sequências de constância no seu canal de Shorts.',
    creatorPrestige: 'Prestígio do Criador',
    rankLevel: 'Nível',
    streakDays: 'Dias de Sequência',
    experiencePoints: 'Pontos de Experiência',
    nextRank: 'Próximo Nível',
    maxRank: '★ NÍVEL MÁXIMO DE CRIADOR ALCANÇADO ★',
    toNextPrestige: 'para o Próximo Nível',
    clipsCut: 'Clipes Cortados',
    target10Clips: 'Meta: 10 clipes',
    uploadsDone: 'Uploads Concluídos',
    targetFirstLive: 'Meta: 1º ao vivo',
    seoPackages: 'Pacotes SEO',
    sub60Titles: 'Títulos <60 caract.',
    badgesEarned: 'Medalhas Ganhas',
    unlocked: 'desbloqueadas',
    streakTitle: 'Chama Algorítmica de Constância de 7 Dias',
    streakSubtitle: 'O YouTube prioriza canais com consistência diária ininterrupta. Faça check-in diário para bônus.',
    checkInToday: 'Fazer Check-In Hoje (+1 Dia de Sequência)',
    checkedIn: 'Check-in Feito Hoje!',
    streakMultiplier: 'Multiplicador Algorítmico',
    simDeckTitle: 'Plataforma de Simulação e Gatilhos em Tempo Real',
    simDeckSubtitle: 'Teste o desbloqueio imediato de medalhas, efeitos sonoros e XP ou sincronize sua atividade real.',
    plusClip: '+1 Clipe Cortado',
    unlock10Clips: "Desbloquear '10 Clipes'",
    firstUpload: "Primeiro Upload",
    plusStreakDay: "+1 Dia de Sequência",
    soundActive: 'Efeitos Sonoros Ativos',
    soundMuted: 'Efeitos Sonoros Silenciados',
    resetStats: 'Redefinir',
    categoryLabel: 'Categoria:',
    tierLabel: 'Nível:',
    all: 'Todas',
    creation: 'Criação',
    upload: 'Upload',
    seo: 'SEO',
    retention: 'Retenção',
    viralMastery: 'Domínio Viral',
    consistency: 'Constância',
    achieved: 'CONQUISTADO',
    progress: 'PROGRESSO',
    inspectDetails: 'Ver Detalhes',
    objective: 'Objetivo:',
    xpReward: 'Recompensa XP',
    algorithmicPerk: 'Vantagem Algorítmica',
    incomplete: 'Incompleto:',
    unlockedActive: 'Desbloqueado e Ativo',
    shareBrag: 'Compartilhar Conquista',
    copiedCard: 'Cartão Copiado!',
    done: 'Concluir',
    celebrationTitle: '★ NOVO MARCO DE CRESCIMENTO DESBLOQUEADO! ★',
    viewBadge: 'Ver Medalha',
    ranks: {
      noviceSlicer: 'Cortador Iniciante',
      hookApprentice: 'Aprendiz de Ganchos',
      retentionSurgeon: 'Cirurgião de Retenção',
      algorithmicVanguard: 'Vanguarda Algorítmica',
      shortsTitan: 'Titã dos Shorts',
      viralOverlord: 'Soberano Viral'
    },
    badges: {
      'badge-first-clip': {
        title: 'Primeira Faísca do Cortador',
        description: 'Gere seu primeiro clipe curto a partir de uma transcrição ou voo de drone.',
        flavorQuote: 'Todo canal de 100M de visualizações começou com um único corte.'
      },
      'badge-10-clips': {
        title: '10 Clipes Gerados',
        description: 'Alcance 10 clipes no total criados no Cortador e no Agente Criativo.',
        flavorQuote: '10 clipes = 10 bilhetes de loteria no algoritmo do YouTube.'
      },
      'badge-25-clips': {
        title: 'Centurião Viral (25 Clipes)',
        description: 'Produza 25 clipes prontos para distribuição vertical.',
        flavorQuote: 'Volume gera intuição. Intuição constrói impérios virais.'
      },
      'badge-first-upload': {
        title: 'Primeiro Upload Concluído',
        description: 'Publique seu primeiro Short no YouTube pelo uploader direto ou cURL.',
        flavorQuote: 'Você cruzou a linha de consumidor para criador.'
      },
      'badge-5-uploads': {
        title: 'Transmissor de Alta Frequência',
        description: 'Faça 5 uploads de sucesso com comentários fixados e tags.',
        flavorQuote: 'O algoritmo agora reconhece seu ritmo de publicação.'
      },
      'badge-streak-7': {
        title: 'Sequência de Constância: 7 Dias',
        description: 'Mantenha 7 dias ininterruptos de produção e presença no feed de Shorts.',
        flavorQuote: 'A constância rende mais do que juros. 7 dias criam um impulso imparável.'
      },
      'badge-streak-14': {
        title: 'Sequência de Constância: 14 Dias',
        description: 'Duas semanas ininterruptas de criação e check-ins diários.',
        flavorQuote: 'Duas semanas de pura disciplina. O algoritmo considera seu canal de alta autoridade.'
      },
      'badge-streak-30': {
        title: 'Sequência de Constância: 30 Dias (Máquina Viral)',
        description: 'Domine um mês inteiro de 30 dias com produção diária implacável.',
        flavorQuote: 'Você não é mais um amador. Você é uma máquina de conteúdo.'
      },
      'badge-first-seo': {
        title: 'Encantador do Algoritmo',
        description: 'Otimização SEO completa (Títulos <60 caract., tags e descrição).',
        flavorQuote: 'As palavras-chave dizem ao robô para quem entregar seu vídeo.'
      },
      'badge-5-seo': {
        title: 'Arquiteto de Metadados',
        description: 'Otimização SEO completa e comentários fixados em 5 projetos.',
        flavorQuote: 'Zero enrolação, 100% precisão de indexação.'
      },
      'badge-first-retention': {
        title: 'Cirurgião de Retenção',
        description: 'Analise o Analytics do YouTube e encontre os segundos exatos de fuga de público.',
        flavorQuote: 'Não adivinhe por que saíram. Opere a queda.'
      },
      'badge-3-retention': {
        title: 'Eliminador de Precipícios',
        description: 'Faça diagnósticos de retenção em 3 vídeos de Shorts diferentes.',
        flavorQuote: 'Agora você cria vídeos onde os espectadores esquecem como arrastar a tela.'
      },
      'badge-first-hooks': {
        title: 'Mestre dos Gatilhos de Dopamina',
        description: 'Gere 3 variações psicológicas de ganchos.',
        flavorQuote: 'Ganhe os primeiros 3 segundos e o YouTube colocará o mundo em suas mãos.'
      },
      'badge-10-hooks': {
        title: 'Quebrador de Padrões Neurais',
        description: 'Crie 10 ganchos de alta curiosidade que param o piloto automático.',
        flavorQuote: 'Seus roteiros superam defesas e despertam curiosidade imediata.'
      },
      'badge-first-project': {
        title: 'Finalizador de Pipeline Completo',
        description: 'Conclua as 4 fases (Roteiro, Edição, SEO, Upload) de um projeto.',
        flavorQuote: 'Disciplina transforma ideias em receita automatizada.'
      },
      'badge-remix-master': {
        title: 'Alquimista de Remix Fair-Use',
        description: 'Remixe um Short em alta com enquadramento de segurança e rampas de velocidade.',
        flavorQuote: 'Recicle genialidade com transformação e segurança jurídica.'
      }
    }
  }
};
