export interface TrendingShortItem {
  id: string;
  rank: number;
  title: string;
  channel: string;
  channelVerified: boolean;
  niche: 
    | 'tech-ai'
    | 'business-wealth'
    | 'fitness-health'
    | 'comedy-skits'
    | 'gaming-esports'
    | 'science-engineering'
    | 'history-mystery'
    | 'sports-football'
    | 'luxury-cars'
    | 'psychology-mindset';
  nicheLabel: string;
  views: string;
  viewCount: number;
  velocityPerHour: string;
  viralityScore: number;
  retentionRating: number;
  durationSeconds: number;
  uploadAge: string;
  soundTrack: string;
  thumbnailColor: string;
  hookFormula: string;
  viralTranscript: string;
  targetAudience: string;
  remixRecommendation: string;
  brollKeywords: string[];
}

export const TRENDING_NICHES = [
  { id: 'all', label: 'All Niches', icon: 'Sparkles', count: 100 },
  { id: 'tech-ai', label: 'Tech & AI', icon: 'Cpu', count: 10 },
  { id: 'business-wealth', label: 'Business & Wealth', icon: 'DollarSign', count: 10 },
  { id: 'fitness-health', label: 'Fitness & Health', icon: 'Dumbbell', count: 10 },
  { id: 'comedy-skits', label: 'Comedy & Skits', icon: 'Smile', count: 10 },
  { id: 'gaming-esports', label: 'Gaming & Esports', icon: 'Gamepad2', count: 10 },
  { id: 'science-engineering', label: 'Science & Engineering', icon: 'FlaskConical', count: 10 },
  { id: 'history-mystery', label: 'History & Mystery', icon: 'History', count: 10 },
  { id: 'sports-football', label: 'Sports & Football', icon: 'Trophy', count: 10 },
  { id: 'luxury-cars', label: 'Luxury & Supercars', icon: 'Car', count: 10 },
  { id: 'psychology-mindset', label: 'Psychology & Mindset', icon: 'Brain', count: 10 },
] as const;

export const TOP_100_TRENDING_SHORTS: TrendingShortItem[] = [
  // =================== 1. TECH & AI (10 Items) ===================
  {
    id: 'tr-01',
    rank: 1,
    title: 'This New Humanoid Robot Just Broke The World Record',
    channel: 'TechMatrix AI',
    channelVerified: true,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '18.4M',
    viewCount: 18400000,
    velocityPerHour: '+124.2K/hr',
    viralityScore: 99,
    retentionRating: 96,
    durationSeconds: 38,
    uploadAge: '6 hours ago',
    soundTrack: 'Interstellar - Hans Zimmer (CYRIL Remix)',
    thumbnailColor: 'from-cyan-900 to-blue-900',
    hookFormula: 'Visual Pattern Interrupt + Instant Stakes',
    viralTranscript: `[0:00 - 0:03] Do NOT blink right now. This robot is moving faster than an Olympic sprinter.
[0:03 - 0:12] Engineers in Boston just unveiled Unitree G2, and instead of walking like a human, its AI neural net learned how to backflip over concrete barriers at 14 miles per hour.
[0:12 - 0:24] Unlike Tesla Optimus which runs on scripted balance algorithms, this machine is 100% reinforcement learning. If you push it down a flight of stairs, it recalibrates in 12 milliseconds and lands on its feet like a cat.
[0:24 - 0:34] The craziest part? The bill of materials costs under $16,000. In less than three years, these will be delivering your packages.
[0:34 - 0:38] Would you trust this walking into your living room? Drop your take below.`,
    targetAudience: 'Futurists, tech enthusiasts, engineering students',
    remixRecommendation: 'Focus on the $16k price disruption compared to standard car prices to trigger debate in comments.',
    brollKeywords: ['humanoid robot backflip', 'boston dynamics agility', 'neural net robotics lidar']
  },
  {
    id: 'tr-02',
    rank: 2,
    title: 'Apple Hidden iPhone Setting You Must Turn Off Today',
    channel: 'iHacks Daily',
    channelVerified: true,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '12.8M',
    viewCount: 12800000,
    velocityPerHour: '+91.4K/hr',
    viralityScore: 97,
    retentionRating: 94,
    durationSeconds: 34,
    uploadAge: '11 hours ago',
    soundTrack: 'Blade Runner 2049 Memory Synth',
    thumbnailColor: 'from-blue-900 to-indigo-900',
    hookFormula: 'Negative Consequence / Immediate Privacy Threat',
    viralTranscript: `[0:00 - 0:03] If you own an iPhone, you need to turn off this exact switch before tonight.
[0:03 - 0:11] Go into Settings, tap Privacy & Security, scroll down to Analytics & Improvements.
[0:11 - 0:22] See this toggle named 'Significant Locations'? Apple has been logging every coffee shop, home address, and workplace you visited with exact GPS timestamps.
[0:22 - 0:30] Toggle this off, tap Clear History, and restart your device. Your battery life will instantly jump by 18%.
[0:30 - 0:34] Send this to someone who charges their iPhone twice a day.`,
    targetAudience: 'Every iPhone user worldwide',
    remixRecommendation: 'Re-record the screen tap navigation with bold red circle highlights and whoosh SFX.',
    brollKeywords: ['iphone settings menu', 'privacy toggle off', 'battery percentage meter']
  },
  {
    id: 'tr-03',
    rank: 3,
    title: 'The AI Tool That Just Killed 10,000 Software Jobs',
    channel: 'CodeCrush',
    channelVerified: false,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '9.5M',
    viewCount: 9500000,
    velocityPerHour: '+74.0K/hr',
    viralityScore: 96,
    retentionRating: 92,
    durationSeconds: 42,
    uploadAge: '18 hours ago',
    soundTrack: 'Hyperdrive Cyber Synth Wave',
    thumbnailColor: 'from-purple-900 to-cyan-900',
    hookFormula: 'High Stakes Industry Disruption + Urgent FOMO',
    viralTranscript: `[0:00 - 0:03] Silicon Valley executives are quietly banning their staff from discussing this tool.
[0:03 - 0:14] It's an autonomous AI dev team called Devin 2.0. You give it one Figma design link and a Stripe checkout key, and it writes 14,000 lines of bug-free production code in 8 minutes.
[0:14 - 0:27] It even opens its own terminal, installs npm packages, runs unit tests, and fixes its own syntax errors without any human touching the keyboard.
[0:27 - 0:38] Senior software engineers making $300k are now using it to do their full week's work in 45 minutes on Monday morning.
[0:38 - 0:42] Is junior coding officially dead? Comment your thoughts.`,
    targetAudience: 'Software devs, tech founders, college CS majors',
    remixRecommendation: 'Show side-by-side timer comparison: Human dev (3 weeks) vs AI Agent (8 minutes).',
    brollKeywords: ['terminal coding matrix', 'autonomous agent screen', 'silicon valley tech office']
  },
  {
    id: 'tr-04',
    rank: 4,
    title: 'The Bizarre Reason Quantum Computers Must Be Colder Than Space',
    channel: 'Veritasium Shorts',
    channelVerified: true,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '8.2M',
    viewCount: 8200000,
    velocityPerHour: '+58.7K/hr',
    viralityScore: 94,
    retentionRating: 91,
    durationSeconds: 45,
    uploadAge: '1 day ago',
    soundTrack: 'Cosmic Ambient Sub Drone',
    thumbnailColor: 'from-sky-950 to-blue-900',
    hookFormula: 'Paradoxical Fact / Cosmic Scale Contrast',
    viralTranscript: `[0:00 - 0:03] Deep space is minus 455 degrees Fahrenheit. But this golden chandelier is colder.
[0:03 - 0:15] Inside IBM's quantum research lab, this dilution refrigerator chills qubits to 15 millikelvin. That's colder than the vacuum of the entire known universe.
[0:15 - 0:28] Why? Because a single stray thermal photon from your body heat would destroy the delicate quantum superposition instantly, causing decoherence.
[0:28 - 0:40] At this temperature, atoms practically stop vibrating, allowing light particles to exist in two places at the exact same fraction of a second.
[0:40 - 0:45] Science is officially weirder than magic. Subscribe for more deep science.`,
    targetAudience: 'Science lovers, physics students, curious minds',
    remixRecommendation: 'Use golden chandelier visual as thumbnail hook with text: "COLDER THAN THE UNIVERSE".',
    brollKeywords: ['quantum computer gold chandelier', 'cryogenic nitrogen vapor', 'qubit superposition graphic']
  },
  {
    id: 'tr-05',
    rank: 5,
    title: 'They Built A Microchip With Living Human Brain Cells',
    channel: 'BioTech Frontiers',
    channelVerified: false,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '7.9M',
    viewCount: 7900000,
    velocityPerHour: '+63.1K/hr',
    viralityScore: 95,
    retentionRating: 93,
    durationSeconds: 39,
    uploadAge: '14 hours ago',
    soundTrack: 'Dark Cyberpunk Pulse 140BPM',
    thumbnailColor: 'from-emerald-950 to-teal-900',
    hookFormula: 'Ethical Frontier Shocker + Sci-Fi Reality',
    viralTranscript: `[0:00 - 0:03] This isn't silicon. These are real, living human neurons growing on an electrode array.
[0:03 - 0:13] An Australian lab called Cortical Labs merged 800,000 lab-grown brain cells onto a computer chip named DishBrain.
[0:13 - 0:26] In under 5 minutes, without any pre-programming, the living cells figured out how to play the video game Pong by receiving electrical feedback pulses.
[0:26 - 0:35] They use only a fraction of a watt of power, compared to an Nvidia GPU that draws 700 watts.
[0:35 - 0:39] The future of AI might not be artificial at all. Would you use biological computers?`,
    targetAudience: 'Neuroscience geeks, AI researchers, sci-fi fans',
    remixRecommendation: 'Contrast the power consumption of biological cells (0.01W) vs Nvidia H100 GPU (700W).',
    brollKeywords: ['dishbrain neuron petri dish', 'pong arcade simulation', 'microscopic neuron firing']
  },
  {
    id: 'tr-06',
    rank: 6,
    title: 'Why Mark Zuckerberg Spends Millions Buying High-End Bunkers',
    channel: 'Elite Uncovered',
    channelVerified: true,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '6.4M',
    viewCount: 6400000,
    velocityPerHour: '+47.8K/hr',
    viralityScore: 92,
    retentionRating: 90,
    durationSeconds: 36,
    uploadAge: '1 day ago',
    soundTrack: 'Conspiracy Deep Bassline',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Billionaire Secret / Mystery Conspiracy',
    viralTranscript: `[0:00 - 0:03] What does Mark Zuckerberg know about 2027 that nobody is talking about?
[0:03 - 0:12] On the island of Kauai, Hawaii, Zuckerberg is quietly completing a $270 million compound named Koolau Ranch.
[0:12 - 0:24] Hidden beneath the surface is a 5,000-square-foot blast-proof underground bunker with blast-resistant steel doors and its own autonomous water desalination grid.
[0:24 - 0:32] Over 14 tech billionaires have built identical underground survival complexes in New Zealand and Idaho this year.
[0:32 - 0:36] Are they preparing for AI superintelligence or an economic reset?`,
    targetAudience: 'Conspiracy buffs, wealth watchers, tech culture followers',
    remixRecommendation: 'Show architectural blueprint renders with high-contrast red warning pins.',
    brollKeywords: ['hawaii compound aerial drone', 'blast door underground bunker', 'zuckerberg metaverse keynote']
  },
  {
    id: 'tr-07',
    rank: 7,
    title: 'Nvidia New GPU Does The Work Of 100,000 Servers',
    channel: 'Chip Architecture',
    channelVerified: true,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '5.8M',
    viewCount: 5800000,
    velocityPerHour: '+42.5K/hr',
    viralityScore: 91,
    retentionRating: 89,
    durationSeconds: 40,
    uploadAge: '2 days ago',
    soundTrack: 'Industrial Future Bass',
    thumbnailColor: 'from-green-950 to-zinc-950',
    hookFormula: 'Mind-Boggling Numbers / Hardware Supremacy',
    viralTranscript: `[0:00 - 0:03] Jensen Huang just held up a $3 million chip that weighs more than a gold bar.
[0:03 - 0:13] This is the Nvidia GB200 NVL72. It holds 208 billion transistors crammed together with liquid cooling running at 2 liters per second.
[0:13 - 0:25] Ten years ago, training a frontier LLM required a warehouse filled with 100,000 server racks that consumed as much electricity as a small town.
[0:25 - 0:35] Today, one single rack of these chips accomplishes the exact same computing power while cutting energy consumption by 25 times.
[0:35 - 0:40] This is why Nvidia is worth more than the entire German stock exchange combined.`,
    targetAudience: 'Hardware geeks, stock investors, tech fans',
    remixRecommendation: 'Highlight the leather jacket CEO quote and the stock market valuation comparison.',
    brollKeywords: ['jensen huang nvidia keynote', 'liquid cooled gpu rack', 'transistor wafer manufacturing']
  },
  {
    id: 'tr-08',
    rank: 8,
    title: 'How Hackers Can Steal Your Passwords From Audio Typing Sounds',
    channel: 'CyberSecurity Lab',
    channelVerified: false,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '5.1M',
    viewCount: 5100000,
    velocityPerHour: '+39.2K/hr',
    viralityScore: 90,
    retentionRating: 88,
    durationSeconds: 32,
    uploadAge: '1 day ago',
    soundTrack: 'Tense Cinematic Clock Ticking',
    thumbnailColor: 'from-red-950 to-zinc-950',
    hookFormula: 'Immediate Personal Threat / Acoustic Hack Demonstration',
    viralTranscript: `[0:00 - 0:03] If you type your banking password on Zoom calls, you are already compromised.
[0:03 - 0:11] Researchers trained an AI model on the acoustic waveforms of mechanical and laptop keyboard clicks.
[0:11 - 0:21] Just by recording the microphone audio during a remote conference call, the AI can reconstruct your keystrokes with 95% accuracy.
[0:21 - 0:29] Every key produces a slightly distinct resonance frequency depending on its distance from the microphone chassis.
[0:29 - 0:32] Always mute your microphone before typing sensitive data. Share this immediately!`,
    targetAudience: 'Remote workers, privacy conscious professionals, gamer typists',
    remixRecommendation: 'Include actual mechanical keyboard typing sound effects in the audio track for visceral demonstration.',
    brollKeywords: ['mechanical keyboard macro', 'audio spectrogram waveform', 'zoom conference screen']
  },
  {
    id: 'tr-09',
    rank: 9,
    title: 'Secret NASA Space Engine That Doesn’t Need Any Fuel',
    channel: 'AstroPhysics Pro',
    channelVerified: true,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '4.7M',
    viewCount: 4700000,
    velocityPerHour: '+35.1K/hr',
    viralityScore: 89,
    retentionRating: 87,
    durationSeconds: 44,
    uploadAge: '2 days ago',
    soundTrack: 'Deep Cosmos Harmonic Synth',
    thumbnailColor: 'from-blue-950 to-purple-950',
    hookFormula: 'Physics Defying Breakthrough / Interstellar Travel',
    viralTranscript: `[0:00 - 0:03] Newton said this engine was impossible. NASA scientists just tested it in orbit.
[0:03 - 0:14] Traditional rockets need millions of gallons of explosive liquid propellant. But the new Helicon Plasma thruster uses magnetic confinement to accelerate ionized particles.
[0:14 - 0:28] Even wilder: the quantum vacuum thruster produces forward thrust by reflecting microwave radiation inside an asymmetric copper cavity.
[0:28 - 0:39] If scaled up, a spacecraft equipped with this could reach Mars in 39 days instead of 9 months, with zero heavy rocket fuel tanks.
[0:39 - 0:44] Humanity is finally leaving the solar system. Follow for daily space breakthroughs.`,
    targetAudience: 'Space nerds, sci-fi fans, physics buffs',
    remixRecommendation: 'Show Mars travel time comparison: 270 days vs 39 days with glowing speed lines.',
    brollKeywords: ['plasma thruster blue exhaust', 'spacex starship interplanetary', 'mars planetary orbital entry']
  },
  {
    id: 'tr-10',
    rank: 10,
    title: 'The Free Google AI Search Trick 99% Of People Never Heard Of',
    channel: 'PromptEngineer',
    channelVerified: true,
    niche: 'tech-ai',
    nicheLabel: 'Tech & AI',
    views: '4.3M',
    viewCount: 4300000,
    velocityPerHour: '+32.8K/hr',
    viralityScore: 88,
    retentionRating: 86,
    durationSeconds: 29,
    uploadAge: '2 days ago',
    soundTrack: 'Lo-Fi Chill Beat 85BPM',
    thumbnailColor: 'from-emerald-950 to-zinc-900',
    hookFormula: 'Actionable Free Hack / Hidden Superpower',
    viralTranscript: `[0:00 - 0:03] Stop Googling things like an amateur. Use this operator instead.
[0:03 - 0:10] Type your search query, then add: filetype:pdf followed by site:edu.
[0:10 - 0:20] Google will bypass all SEO blog spam, affiliate landing pages, and AI generated fluff, giving you master’s degree textbooks, MIT research papers, and Harvard lecture slides for free.
[0:20 - 0:26] You can also add ‘before:2022’ to see the internet before AI content flooded every search result.
[0:26 - 0:29] Save this video before Google restricts advanced search operators.`,
    targetAudience: 'Students, researchers, self-taught entrepreneurs',
    remixRecommendation: 'Fast screen recording showing real search bar autocomplete and instant free PDF download.',
    brollKeywords: ['google search bar query', 'mit research pdf document', 'student library studying']
  },

  // =================== 2. BUSINESS & WEALTH (10 Items) ===================
  {
    id: 'tr-11',
    rank: 11,
    title: 'Alex Hormozi 100M Pricing Rule: Why Cheap Prices Kill Your Business',
    channel: 'Acquisition Insights',
    channelVerified: true,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '15.6M',
    viewCount: 15600000,
    velocityPerHour: '+112.5K/hr',
    viralityScore: 98,
    retentionRating: 95,
    durationSeconds: 41,
    uploadAge: '8 hours ago',
    soundTrack: 'Aggressive Drill Trap Instrumental',
    thumbnailColor: 'from-amber-900 to-red-950',
    hookFormula: 'Counter-Intuitive Truth / Wealth Psychology',
    viralTranscript: `[0:00 - 0:03] If you double your prices today, you will literally get BETTER customers who complain less.
[0:03 - 0:12] When Alex Hormozi consulted a gym owner charging $50 a month, the gym had 40% refunds and constant churn.
[0:12 - 0:24] He forced the owner to bundle nutrition, accountability, and personalized coaching, then raised the price to $600 for six weeks upfront.
[0:24 - 0:34] Guess what happened? The refund rate dropped to zero. Because when people pay a lot, they actually show up, do the work, and get results.
[0:34 - 0:41] Price implies value. Stop discounting your work. Drop a 100 if you need to raise your rates this week.`,
    targetAudience: 'Agency owners, freelancers, small business founders',
    remixRecommendation: 'Show visual scale: $50 customer (complaining) vs $600 customer (disciplined execution).',
    brollKeywords: ['alex hormozi speaking podcast', 'money transaction register', 'gym workout coaching session']
  },
  {
    id: 'tr-12',
    rank: 12,
    title: 'Warren Buffett $1,000,000 Bet That Humiliated Wall Street Hedge Funds',
    channel: 'Wealth Vault',
    channelVerified: true,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '11.2M',
    viewCount: 11200000,
    velocityPerHour: '+81.2K/hr',
    viralityScore: 96,
    retentionRating: 93,
    durationSeconds: 45,
    uploadAge: '15 hours ago',
    soundTrack: 'Cinematic Orchestral Strings Rise',
    thumbnailColor: 'from-emerald-950 to-green-900',
    hookFormula: 'David vs Goliath / Million Dollar Wager',
    viralTranscript: `[0:00 - 0:03] Warren Buffett wagered $1,000,000 that elite Wall Street hedge fund managers were scamming their clients.
[0:03 - 0:14] In 2007, Buffett challenged Protege Partners to pick 5 top hedge funds. Buffett picked one single boring thing: the S&P 500 index fund.
[0:14 - 0:27] For ten years, the hedge funds charged 2% management fees and 20% profits, trading stocks all day with supercomputers.
[0:27 - 0:39] By 2017, the hedge funds returned an average of 36%. The boring S&P 500 returned 125.8%. Buffett won by a landslide and donated the million dollars to charity.
[0:39 - 0:45] Stop overthinking investing. Buy low-cost index funds and compound. Follow for real financial wisdom.`,
    targetAudience: 'Retail investors, beginner savers, retirement planners',
    remixRecommendation: 'Display split comparison chart showing 36% vs 125.8% return lines divergent.',
    brollKeywords: ['warren buffett berkshire meeting', 'wall street stock trading floor', 'compound interest growth graph']
  },
  {
    id: 'tr-13',
    rank: 13,
    title: 'The Dark Psychology Of Grocery Stores: Why Milk Is Always At The Back',
    channel: 'Consumer Mind',
    channelVerified: false,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '8.7M',
    viewCount: 8700000,
    velocityPerHour: '+62.4K/hr',
    viralityScore: 93,
    retentionRating: 91,
    durationSeconds: 35,
    uploadAge: '1 day ago',
    soundTrack: 'Mystery Detective Theme',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Exposing Everyday Architecture Trap',
    viralTranscript: `[0:00 - 0:03] Supermarket architects spend millions designing stores so you can NEVER just buy what you need.
[0:03 - 0:12] Notice how milk, bread, and eggs are placed at the furthest possible corner from the entrance?
[0:12 - 0:23] To get a $3 gallon of milk, you are forced to walk past $400 worth of eye-level impulse snacks and end-cap promotions.
[0:23 - 0:31] Eye-level shelves are sold to cereal brands for tens of thousands in slotting fees. The cheapest items are always hidden on the bottom shelf.
[0:31 - 0:35] Look down next time you shop. Share this to save someone $50 this weekend!`,
    targetAudience: 'Everyday shoppers, psychology enthusiasts',
    remixRecommendation: 'Use a bird-eye store map blueprint animation showing the forced maze path.',
    brollKeywords: ['supermarket aisle walking cart', 'grocery store milk fridge back', 'cereal shelf eye level slotting']
  },
  {
    id: 'tr-14',
    rank: 14,
    title: 'How To Reach An 800 Credit Score In 90 Days Without Paying Off All Debt',
    channel: 'Credit Blueprint',
    channelVerified: true,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '7.8M',
    viewCount: 7800000,
    velocityPerHour: '+55.8K/hr',
    viralityScore: 92,
    retentionRating: 90,
    durationSeconds: 37,
    uploadAge: '1 day ago',
    soundTrack: 'Modern Trap Beat Smooth Bass',
    thumbnailColor: 'from-blue-950 to-indigo-950',
    hookFormula: 'Cheat Code / Legal Financial Loophole',
    viralTranscript: `[0:00 - 0:03] Banks hide this credit card loop because it costs them interest payments.
[0:03 - 0:12] Credit bureaus don’t look at your balance on your due date. They look at your statement closing date.
[0:12 - 0:24] If you have a $1,000 balance on a $2,000 credit limit, your credit utilization is 50%, which tanks your score by 40 points.
[0:24 - 0:33] But if you pay off the balance 3 days BEFORE the statement closing date, your reported utilization is 1%. Your score shoots straight into the 780s.
[0:33 - 0:37] Set up an automated reminder on your phone right now. Follow for more credit secrets.`,
    targetAudience: 'Young adults, homebuyers, credit card users',
    remixRecommendation: 'Show a clear calendar highlight: Due Date vs Statement Closing Date.',
    brollKeywords: ['black titanium credit card', 'credit score meter green needle', 'mobile banking app notification']
  },
  {
    id: 'tr-15',
    rank: 15,
    title: 'Airbnb Arbitrage: How 23-Year-Olds Make $10k/Month Without Owning Property',
    channel: 'PassiveIncome Hub',
    channelVerified: false,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '6.9M',
    viewCount: 6900000,
    velocityPerHour: '+49.1K/hr',
    viralityScore: 91,
    retentionRating: 89,
    durationSeconds: 43,
    uploadAge: '2 days ago',
    soundTrack: 'Chill Electronic Sunset Vibes',
    thumbnailColor: 'from-rose-950 to-zinc-900',
    hookFormula: 'Unbelievable Income Claim + Step-by-Step Proof',
    viralTranscript: `[0:00 - 0:03] You don’t need $100,000 for a down payment to make money in real estate.
[0:03 - 0:13] It’s called rental arbitrage. You find a landlord struggling to fill a luxury apartment in a tourist hub.
[0:13 - 0:25] You sign a corporate corporate lease with permission to sublet. You furnish the apartment using 0% APR business credit cards with trendy modern furniture.
[0:25 - 0:37] Rent is $2,200 a month. But by booking it out as an Airbnb at $180 a night for 24 days, you make $4,320. After cleaning fees, you pocket $1,500 net profit per door.
[0:37 - 0:43] Multiply that by 7 units and you have a six-figure remote business. Comment ‘REALTY’ for the contract template.`,
    targetAudience: 'Aspiring side hustlers, real estate beginners',
    remixRecommendation: 'Break down math on screen with cash flow subtraction animation.',
    brollKeywords: ['luxury apartment modern interior', 'airbnb app booking notification', 'keys handed landlord handshake']
  },
  {
    id: 'tr-16',
    rank: 16,
    title: 'The Real Reason Rich People Never Keep Cash In Checking Accounts',
    channel: 'Financial Architect',
    channelVerified: true,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '6.1M',
    viewCount: 6100000,
    velocityPerHour: '+44.3K/hr',
    viralityScore: 90,
    retentionRating: 88,
    durationSeconds: 36,
    uploadAge: '2 days ago',
    soundTrack: 'Lofi Piano Minor Key Melancholy',
    thumbnailColor: 'from-emerald-950 to-zinc-900',
    hookFormula: 'Inflation Warning / Wealth Preservation Secret',
    viralTranscript: `[0:00 - 0:03] If you have more than $5,000 sitting in a big bank checking account, you are literally burning money.
[0:03 - 0:12] Traditional checking accounts pay 0.01% annual interest. With 3.5% inflation, your purchasing power drops every single morning.
[0:12 - 0:24] Wealthy families keep emergency cash in Treasury bills or high-yield money market accounts yielding 5.1% backed by the US Government.
[0:24 - 0:32] On $50,000, that’s $2,550 of free passive cash every year, while standard bank accounts pay you $5.
[0:32 - 0:36] Stop giving your bank free interest. Move your cash today.`,
    targetAudience: 'Middle class savers, young professionals',
    remixRecommendation: 'Show side-by-side comparison: Big Bank ($5 interest) vs HYSA ($2,550 interest).',
    brollKeywords: ['hundred dollar bill stack counting', 'bank vault gold bullion', 'mobile banking deposit screen']
  },
  {
    id: 'tr-17',
    rank: 17,
    title: 'Why Rolex Keeps Its Showroom Displays Completely Empty',
    channel: 'Luxury Economics',
    channelVerified: true,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '5.5M',
    viewCount: 5500000,
    velocityPerHour: '+38.7K/hr',
    viralityScore: 89,
    retentionRating: 87,
    durationSeconds: 38,
    uploadAge: '2 days ago',
    soundTrack: 'Sophisticated Classical Cello & Bass',
    thumbnailColor: 'from-green-950 to-amber-950',
    hookFormula: 'Artificial Scarcity / Luxury Marketing Playbook',
    viralTranscript: `[0:00 - 0:03] You can walk into a Rolex boutique with $20,000 in cash, and they will refuse to sell you a watch.
[0:03 - 0:13] Rolex produces over 1.2 million timepieces every single year. They are not scarce. They are artificially rationed.
[0:13 - 0:25] By keeping display cases empty with signs reading ‘For Exhibition Only’, they create extreme psychological desire and status FOMO.
[0:25 - 0:34] You have to buy $30,000 worth of unwanted jewelry just to be placed on a 3-year waitlist for a Submariner.
[0:34 - 0:38] It’s not horology; it’s the greatest luxury cartel in human history. Do you think it’s worth the wait?`,
    targetAudience: 'Watch collectors, status seekers, marketing students',
    remixRecommendation: 'Show empty velvet watch display cases with contrasting retail price vs secondary market price.',
    brollKeywords: ['rolex submariner exhibition glass', 'luxury jewelry boutique interior', 'swiss watchmaker precision gears']
  },
  {
    id: 'tr-18',
    rank: 18,
    title: 'How To Negotiate A 30% Salary Raise Using One Psychological Anchor',
    channel: 'Career Accelerator',
    channelVerified: false,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '4.9M',
    viewCount: 4900000,
    velocityPerHour: '+34.2K/hr',
    viralityScore: 88,
    retentionRating: 86,
    durationSeconds: 33,
    uploadAge: '3 days ago',
    soundTrack: 'Upbeat Tech House Bassline',
    thumbnailColor: 'from-blue-950 to-zinc-900',
    hookFormula: 'Direct Actionable Career Script / Psychological Anchor',
    viralTranscript: `[0:00 - 0:03] Never say the word ‘between’ when giving a salary expectation.
[0:03 - 0:11] If you tell a recruiter: ‘I am looking for between $90k and $110k’, the employer will immediately anchor at $90k.
[0:11 - 0:22] Instead, say an odd, hyper-specific number: ‘Based on market data for this senior tier, my target is $107,500.’
[0:22 - 0:30] Psychologists at Columbia proved precise numbers signal that you completed rigorous empirical research. They negotiate down 60% less.
[0:30 - 0:33] Use this in your next annual performance review. Subscribe for corporate cheat codes!`,
    targetAudience: 'Corporate employees, job seekers, career transitioners',
    remixRecommendation: 'Show mock interview dialogue on screen with red text "DON\'T SAY" vs green "SAY THIS".',
    brollKeywords: ['corporate office boardroom meeting', 'salary contract negotiation paper', 'handshake professional executive']
  },
  {
    id: 'tr-19',
    rank: 19,
    title: 'The Infinite Money Glitch Of Costco $1.50 Hot Dog Explained',
    channel: 'Business Maverick',
    channelVerified: true,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '4.6M',
    viewCount: 4600000,
    velocityPerHour: '+31.9K/hr',
    viralityScore: 87,
    retentionRating: 85,
    durationSeconds: 35,
    uploadAge: '3 days ago',
    soundTrack: 'Upbeat Funky Brass Groove',
    thumbnailColor: 'from-red-950 to-blue-950',
    hookFormula: 'Loss Leader Economics / Iconic Founder Threat',
    viralTranscript: `[0:00 - 0:03] The founder of Costco once threatened to kill the CEO if he ever raised the price of the hot dog.
[0:03 - 0:12] Since 1985, the hot dog and soda combo has remained exactly $1.50, despite 180% cumulative inflation.
[0:12 - 0:23] Costco loses tens of millions of dollars on the hot dog every year. It’s the most famous ‘Loss Leader’ in retail history.
[0:23 - 0:31] Why? Because you pay $65 a year for a membership card and walk out with a $400 cart of bulk paper towels and steak.
[0:31 - 0:35] The hot dog makes you feel like you won. Costco wins the war. Brilliant marketing.`,
    targetAudience: 'Costco members, retail business nerds, general public',
    remixRecommendation: 'Overlay the actual quote: "If you raise the effing hot dog, I will kill you."',
    brollKeywords: ['costco warehouse wholesale cart', 'costco food court hot dog soda', 'costco gold star membership card']
  },
  {
    id: 'tr-20',
    rank: 20,
    title: 'How To Make $500 A Day With Faceless YouTube Automation in 2026',
    channel: 'TubeEmpire AI',
    channelVerified: true,
    niche: 'business-wealth',
    nicheLabel: 'Business & Wealth',
    views: '4.2M',
    viewCount: 4200000,
    velocityPerHour: '+29.8K/hr',
    viralityScore: 86,
    retentionRating: 84,
    durationSeconds: 46,
    uploadAge: '3 days ago',
    soundTrack: 'Synthwave Neon Drive 120BPM',
    thumbnailColor: 'from-purple-950 to-indigo-950',
    hookFormula: 'Step-by-Step Monetization Blueprint',
    viralTranscript: `[0:00 - 0:03] You do not need a camera, a studio microphone, or your real face to print money on YouTube.
[0:03 - 0:14] Step one: Find viral long-form podcasts from Huberman or Rogan. Feed the raw transcripts into an AI slicer to extract the top 45-second curiosity hooks.
[0:14 - 0:26] Step two: Generate 4K AI B-roll using Midjourney or Veo. Apply dynamic CapCut subtitle animations with bounce effects and bold yellow keywords.
[0:26 - 0:38] Step three: Post 3 Shorts a day during peak algorithm engagement windows. Once you hit 10k subscribers, add high-paying affiliate links in the pinned comment.
[0:38 - 0:46] Faceless channels in the luxury and finance niches earn up to $8 CPM. Stop watching shorts, start producing them. Follow for the exact tech stack!`,
    targetAudience: 'Content creators, digital nomads, passive income seekers',
    remixRecommendation: 'Show timeline flow diagram: Slicer -> CapCut -> Pinned Affiliate Link.',
    brollKeywords: ['youtube studio dashboard analytics', 'faceless automated channel setup', 'capcut timeline video editing']
  },

  // =================== 3. FITNESS & HEALTH (10 Items) ===================
  {
    id: 'tr-21',
    rank: 21,
    title: 'Sam Sulek High-Intensity Arm Protocol: 1 Set To Absolute Failure',
    channel: 'Iron Anabolic',
    channelVerified: true,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '14.1M',
    viewCount: 14100000,
    velocityPerHour: '+105.3K/hr',
    viralityScore: 98,
    retentionRating: 95,
    durationSeconds: 37,
    uploadAge: '9 hours ago',
    soundTrack: 'Phonk Gym Aggressive Hardstyle',
    thumbnailColor: 'from-red-950 to-zinc-950',
    hookFormula: 'Extreme Intensity Shock / Muscle Science',
    viralTranscript: `[0:00 - 0:03] Stop doing 4 sets of 12. You are wasting 80% of your energy in the gym.
[0:03 - 0:12] Look at Sam Sulek’s bicep curl mechanics. He takes a single warmup set, then piles on maximum load for one all-out working set.
[0:12 - 0:24] When the bar stops moving at rep 8, he doesn’t rack it. He uses controlled body momentum for 3 partial reps, fighting the eccentric for 4 agonizing seconds.
[0:24 - 0:33] Hypertrophy isn’t triggered by volume. It’s triggered by mechanical tension in the final 2 reps before true muscular failure.
[0:33 - 0:37] Try this on your next arm day. Drop a barbell emoji if you train to failure!`,
    targetAudience: 'Gym bros, bodybuilders, fitness enthusiasts',
    remixRecommendation: 'Slow-motion replay of the final 2 agonizing partial reps with red muscle fibers overlay.',
    brollKeywords: ['sam sulek heavy barbell curl', 'bicep vascularity pump', 'gym weight plates clanking']
  },
  {
    id: 'tr-22',
    rank: 22,
    title: 'What Actually Happens To Your Brain When You Take A 3-Minute Cold Plunge',
    channel: 'Huberman Protocol',
    channelVerified: true,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '10.8M',
    viewCount: 10800000,
    velocityPerHour: '+78.6K/hr',
    viralityScore: 96,
    retentionRating: 93,
    durationSeconds: 42,
    uploadAge: '16 hours ago',
    soundTrack: 'Atmospheric Ambient Cold Breath',
    thumbnailColor: 'from-cyan-950 to-blue-950',
    hookFormula: 'Neuroscience Neurotransmitter Surge',
    viralTranscript: `[0:00 - 0:03] The second your neck hits 48-degree water, your brain initiates a full survival response.
[0:03 - 0:13] Your peripheral capillaries constrict, forcing oxygen-rich blood into your vital organs. But the real miracle is in your dopamine receptors.
[0:13 - 0:26] Dr. Andrew Huberman proved that deliberate cold exposure causes a 250% sustained increase in baseline dopamine and norepinephrine.
[0:26 - 0:37] Unlike nicotine or caffeine, which spike and crash violently, cold plunge dopamine stays elevated for up to 6 hours without any crash.
[0:37 - 0:42] You don’t need an expensive ice tub. 2 minutes on full cold shower will trigger the exact same neurochemical surge. Are you brave enough?`,
    targetAudience: 'Biohackers, athletes, mental clarity seekers',
    remixRecommendation: 'Show line graph: Caffeine spike-and-crash vs Cold Plunge sustained dopamine plateau.',
    brollKeywords: ['ice bath plunge submerged face', 'neurotransmitter dopamine surge 3d', 'cold shower water droplets']
  },
  {
    id: 'tr-23',
    rank: 23,
    title: 'I Did 100 Pushups Every Day For 30 Days: The Unfiltered Transformation',
    channel: 'FitJourney Uncut',
    channelVerified: false,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '8.4M',
    viewCount: 8400000,
    velocityPerHour: '+61.0K/hr',
    viralityScore: 94,
    retentionRating: 91,
    durationSeconds: 38,
    uploadAge: '1 day ago',
    soundTrack: 'Motivational Cinematic Brass Heroic',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Realistic Personal Experiment + Surprising Warning',
    viralTranscript: `[0:00 - 0:03] Here is what fitness influencers don’t tell you about doing 100 pushups every single day.
[0:03 - 0:12] By day 7, my chest and triceps had a crazy pump, but by day 14, my anterior deltoids were screaming from overuse syndrome.
[0:14 - 0:26] Because I wasn’t doing any pulling exercises, my shoulders rounded forward, destroying my posture.
[0:26 - 0:34] Once I added 50 pull-ups and banded face-pulls to balance the posterior chain, my posture straightened out and my upper chest exploded.
[0:34 - 0:38] Never train only push. Balance your back. Save this for your home workout routine!`,
    targetAudience: 'Calisthenics beginners, home workout enthusiasts',
    remixRecommendation: 'Show posture side-profile: Rounded shoulders (bad) vs Pulled-back shoulders (corrected).',
    brollKeywords: ['pushups floor workout sweat', 'pull up bar calisthenics back', 'before after body transformation calendar']
  },
  {
    id: 'tr-24',
    rank: 24,
    title: 'The Single Most Dangerous Compound Exercise For Your Spine',
    channel: 'Biomechanics Lab',
    channelVerified: true,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '7.1M',
    viewCount: 7100000,
    velocityPerHour: '+51.3K/hr',
    viralityScore: 92,
    retentionRating: 89,
    durationSeconds: 34,
    uploadAge: '1 day ago',
    soundTrack: 'Dark Threat Tense Synth',
    thumbnailColor: 'from-rose-950 to-zinc-950',
    hookFormula: 'Injury Prevention Shock / Biomechanical Anatomy',
    viralTranscript: `[0:00 - 0:03] If your lower back rounds like a fishing rod on deadlifts, you are one rep away from a herniated disc.
[0:03 - 0:11] When your lumbar spine enters flexion under heavy axial loading, the gelatinous nucleus pulposus pushes backward against the spinal nerve root.
[0:11 - 0:22] To bulletproof your spine: engage your lats before pulling, brace your intra-abdominal wall like getting punched in the gut, and push the floor away through your heels.
[0:22 - 0:30] If you can’t maintain a neutral pelvis, drop the weight or switch to trap bar deadlifts.
[0:30 - 0:34] Protect your back today so you can lift when you are 70. Tag a friend who needs form checks!`,
    targetAudience: 'Powerlifters, crossfitters, gym beginners',
    remixRecommendation: 'Use 3D spine skeleton animation highlighting lumbar L4-L5 disc pressure.',
    brollKeywords: ['deadlift heavy barbell chalk', 'spine lumbar herniation 3d', 'intra abdominal bracing cue']
  },
  {
    id: 'tr-25',
    rank: 25,
    title: 'Zone 2 Cardio: How Olympic Endurance Athletes Burn Pure Fat',
    channel: 'Endurance Science',
    channelVerified: false,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '6.3M',
    viewCount: 6300000,
    velocityPerHour: '+45.6K/hr',
    viralityScore: 90,
    retentionRating: 88,
    durationSeconds: 39,
    uploadAge: '2 days ago',
    soundTrack: 'Fast Tempo Running EDM 128BPM',
    thumbnailColor: 'from-emerald-950 to-teal-950',
    hookFormula: 'Mitochondrial Health / Effortless Fat Oxidation',
    viralTranscript: `[0:00 - 0:03] Running until you are out of breath is actually preventing you from burning belly fat.
[0:03 - 0:12] When your heart rate shoots into Zone 4 and 5, your body relies primarily on glycogen and anaerobic glycolysis.
[0:12 - 0:25] But in Zone 2, your mitochondrial density increases exponentially, training your cells to oxidize fatty acids for fuel.
[0:25 - 0:35] The test is simple: you should be able to hold a full conversation through your nose without gasping for air. 45 minutes, 3 times a week.
[0:35 - 0:39] Slow down to speed up your fat loss. Follow for scientific fitness protocols!`,
    targetAudience: 'Marathon runners, weight loss seekers, cardio athletes',
    remixRecommendation: 'Demonstrate the conversational breathing test on a treadmill with heart rate monitor.',
    brollKeywords: ['treadmill zone 2 running', 'heart rate apple watch zone', 'cellular mitochondria fat burn']
  },
  {
    id: 'tr-26',
    rank: 26,
    title: 'The Truth About Creatine Monohydrate: Does It Actually Cause Hair Loss?',
    channel: 'Supplement Truth',
    channelVerified: true,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '5.9M',
    viewCount: 5900000,
    velocityPerHour: '+41.8K/hr',
    viralityScore: 89,
    retentionRating: 87,
    durationSeconds: 36,
    uploadAge: '2 days ago',
    soundTrack: 'Smooth Hip Hop Beat Instrumental',
    thumbnailColor: 'from-blue-950 to-zinc-900',
    hookFormula: 'Myth Busting / Fear Elimination',
    viralTranscript: `[0:00 - 0:03] Every guy avoids creatine because of one flawed rugby study from 2009. Here is the actual truth.
[0:03 - 0:12] The study claimed creatine increased DHT levels, which accelerates male pattern baldness if you have the genetic hair loss gene.
[0:12 - 0:24] But over 12 follow-up clinical trials with hundreds of athletes have failed to replicate this result. Zero hair loss correlation found.
[0:24 - 0:32] Creatine monohydrate is the most researched supplement on Earth. It increases intracellular water retention, ATP recycling, and brain function.
[0:32 - 0:36] 5 grams every single day with water. Stop overpaying for fancy variants.`,
    targetAudience: 'Athletes, young men, supplement shoppers',
    remixRecommendation: 'Show scoop of white creatine powder dissolving in water with study headline debunk.',
    brollKeywords: ['creatine monohydrate scoop shaker', 'atp energy cycle muscle cell', 'hair follicles microscope']
  },
  {
    id: 'tr-27',
    rank: 27,
    title: 'Why Sitting For 8 Hours Destroys Your Hip Flexors and Glutes',
    channel: 'Physio Rehab Guide',
    channelVerified: false,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '5.2M',
    viewCount: 5200000,
    velocityPerHour: '+37.4K/hr',
    viralityScore: 88,
    retentionRating: 86,
    durationSeconds: 35,
    uploadAge: '2 days ago',
    soundTrack: 'Relaxing Ambient Yoga Drone',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Office Worker Syndrome / Instant Physical Relief',
    viralTranscript: `[0:00 - 0:03] If you sit at a desk all day, your glutes are literally turned off right now.
[0:03 - 0:11] It’s called reciprocal inhibition. When your psoas and hip flexors stay shortened for hours, your brain down-regulates neural firing to your gluteus maximus.
[0:11 - 0:22] This causes anterior pelvic tilt, tight hamstrings, and chronic lower back pain.
[0:22 - 0:31] Do this 60-second couch stretch: knee against the wall, chest up, squeeze your butt cheek. Feel that intense opening in the front of your hip.
[0:31 - 0:35] Stand up right now and try it. Your back will thank you!`,
    targetAudience: 'Office workers, software engineers, gamers',
    remixRecommendation: 'Live demonstration of couch stretch against the wall with timer countdown.',
    brollKeywords: ['desk worker slouching chair', 'couch stretch hip flexor mobility', 'glute activation band exercise']
  },
  {
    id: 'tr-28',
    rank: 28,
    title: 'The Sleep Stage That Washes Toxic Plaques Out Of Your Brain',
    channel: 'NeuroSleep',
    channelVerified: true,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '4.8M',
    viewCount: 4800000,
    velocityPerHour: '+34.5K/hr',
    viralityScore: 87,
    retentionRating: 85,
    durationSeconds: 40,
    uploadAge: '3 days ago',
    soundTrack: 'Deep Delta Waves Sleep Frequency',
    thumbnailColor: 'from-indigo-950 to-purple-950',
    hookFormula: 'Brain Cleansing Mechanism / Alzheimer Prevention',
    viralTranscript: `[0:00 - 0:03] While you are in deep slow-wave sleep, your brain literally takes a bath.
[0:03 - 0:13] Scientists discovered the glymphatic system: cerebrospinal fluid rushes through brain tissue, flushing out beta-amyloid and tau proteins.
[0:13 - 0:26] These are the exact toxic protein plaques directly linked to dementia and Alzheimer’s disease.
[0:26 - 0:36] But if you drink alcohol before bed or stare at blue screens, you suppress slow-wave deep sleep by up to 60%, trapping toxins in your cerebral cortex.
[0:36 - 0:40] Keep your bedroom at 66 degrees and blackout dark. Prioritize your brain health.`,
    targetAudience: 'Sleep biohackers, health conscious adults',
    remixRecommendation: 'Show 3D brain MRI animation with blue cerebrospinal fluid flushing through neural pathways.',
    brollKeywords: ['cerebrospinal fluid brain scan', 'deep sleep delta eeg waves', 'dark bedroom sleep mask']
  },
  {
    id: 'tr-29',
    rank: 29,
    title: '3 Eggs A Day For 6 Months: What Happened To My Cholesterol',
    channel: 'Dr. Nutrition Lab',
    channelVerified: true,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '4.4M',
    viewCount: 4400000,
    velocityPerHour: '+31.2K/hr',
    viralityScore: 86,
    retentionRating: 84,
    durationSeconds: 38,
    uploadAge: '3 days ago',
    soundTrack: 'Acoustic Guitar Bright Strumming',
    thumbnailColor: 'from-amber-950 to-yellow-950',
    hookFormula: 'Dietary Paradigm Shift / Bloodwork Reveal',
    viralTranscript: `[0:00 - 0:03] Doctors used to tell us egg yolks cause heart attacks. My recent bloodwork proved the exact opposite.
[0:03 - 0:12] For 180 days, I ate 3 whole pasture-raised eggs every morning. That’s over 500 eggs.
[0:12 - 0:24] When my lipid panel came back: my total LDL didn’t skyrocket. Instead, my HDL good cholesterol jumped 22%, and my triglycerides plummeted.
[0:24 - 0:34] Dietary cholesterol does not automatically equal arterial serum cholesterol. The yolk is nature’s multivitamin: packed with choline, lutein, and zinc.
[0:34 - 0:38] Stop throwing away the yolk! How many eggs do you eat a day?`,
    targetAudience: 'Keto fans, breakfast eaters, general health seekers',
    remixRecommendation: 'Show blood test lab PDF with green checks on HDL and triglycerides.',
    brollKeywords: ['frying pasture raised eggs skillet', 'blood test lipid panel results', 'egg yolk golden yellow macro']
  },
  {
    id: 'tr-30',
    rank: 30,
    title: 'The Military 2-Minute Breathing Trick That Stops Anxiety Attacks',
    channel: 'Combat Resilience',
    channelVerified: false,
    niche: 'fitness-health',
    nicheLabel: 'Fitness & Health',
    views: '4.1M',
    viewCount: 4100000,
    velocityPerHour: '+29.1K/hr',
    viralityScore: 85,
    retentionRating: 83,
    durationSeconds: 33,
    uploadAge: '3 days ago',
    soundTrack: 'Slow Heartbeat Deep Drone',
    thumbnailColor: 'from-teal-950 to-zinc-950',
    hookFormula: 'Instant Nervous System Reset / Navy SEAL Protocol',
    viralTranscript: `[0:00 - 0:03] When your chest tightens and your heart races, do NOT try to take one giant breath.
[0:03 - 0:11] Use the Physiological Sigh used by elite combat pilots: take two sharp inhales through your nose... and one long, slow exhale through your mouth.
[0:11 - 0:22] The double inhale pops open collapsed alveoli air sacs in your lungs, expelling maximum carbon dioxide on the extended exhale.
[0:22 - 0:29] This activates the vagus nerve, immediately dropping your heart rate by 15 beats in under 30 seconds.
[0:29 - 0:33] Try it right now. Breathe in, breathe in again, let it all out. Follow for more life protocols!`,
    targetAudience: 'Stressed students, corporate workers, anxiety sufferers',
    remixRecommendation: 'Visual breath circle: expanding twice, then slow contraction with exhale timer.',
    brollKeywords: ['box breathing graphic lungs', 'navy seal tactical focus', 'vagus nerve heart rate drop']
  },

  // =================== 4. COMEDY & SKITS (10 Items) ===================
  {
    id: 'tr-31',
    rank: 31,
    title: 'Corporate Email Translation: What Your Boss Actually Means',
    channel: 'Cubicle Comedy',
    channelVerified: true,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '16.9M',
    viewCount: 16900000,
    velocityPerHour: '+118.4K/hr',
    viralityScore: 99,
    retentionRating: 96,
    durationSeconds: 32,
    uploadAge: '7 hours ago',
    soundTrack: 'Quirky Pizzicato Strings Comedy',
    thumbnailColor: 'from-blue-950 to-zinc-900',
    hookFormula: 'Relatable Corporate Pain / Rapid-Fire Punchlines',
    viralTranscript: `[0:00 - 0:03] Corporate email translations part 4: What your boss is ACTUALLY saying to you.
[0:03 - 0:10] ‘Per my last email’ means: Can you read? Because I already answered this yesterday you idiot.
[0:10 - 0:17] ‘Let’s circle back on this next quarter’ means: This is the worst idea I have ever heard and I hope you forget you ever asked.
[0:17 - 0:24] ‘Thanks in advance’ means: You have no choice, this is your problem now, good luck suffering alone.
[0:24 - 0:29] And ‘Hope this email finds you well’ means: I hope this email finds you before you clock out so you suffer with me.
[0:29 - 0:32] Tag a coworker who uses all four of these daily!`,
    targetAudience: 'Office workers, 9-to-5 corporate employees, remote workers',
    remixRecommendation: 'Split screen with corporate polite voice vs aggressive inner monologue subtitles.',
    brollKeywords: ['office cubicle keyboard slamming', 'corporate email outlook notification', 'boss sipping coffee looking annoyed']
  },
  {
    id: 'tr-32',
    rank: 32,
    title: 'Gen Z Employee Vs Millennial Manager On A Friday At 4:59 PM',
    channel: 'Workplace POV',
    channelVerified: false,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '13.4M',
    viewCount: 13400000,
    velocityPerHour: '+94.1K/hr',
    viralityScore: 97,
    retentionRating: 94,
    durationSeconds: 36,
    uploadAge: '12 hours ago',
    soundTrack: 'Fast Lo-Fi Hip Hop Beat',
    thumbnailColor: 'from-purple-950 to-pink-950',
    hookFormula: 'Generational Contrast / Work Culture Clash',
    viralTranscript: `[0:00 - 0:03] Millennial manager: ‘Hey Tyler! Super quick emergency slide deck needed before Monday!’
[0:03 - 0:11] Gen Z Tyler: ‘Respectfully Greg, my shift boundary concludes in 42 seconds and my mental wellness is not billable.’
[0:11 - 0:20] Millennial: ‘Tyler, I stayed till 9 PM every night for 5 years to prove my dedication to the mission!’
[0:20 - 0:29] Tyler: ‘And now you have a herniated disc, 2 cats, and a company pizza voucher. We are not the same Greg. I am logging off.’
[0:29 - 0:36] Millennial standing alone in the breakroom staring into an empty coffee mug. Which one are you?`,
    targetAudience: 'Gen Z, Millennials, HR managers',
    remixRecommendation: 'Exaggerated facial acting with AirPods in one ear and laptop closing sound.',
    brollKeywords: ['closing laptop screen aggressively', 'slack message notification bell', 'office breakroom coffee machine']
  },
  {
    id: 'tr-33',
    rank: 33,
    title: 'When You Ask For The Wi-Fi Password At Your Grandparents’ House',
    channel: 'Family Dynamics',
    channelVerified: true,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '9.8M',
    viewCount: 9800000,
    velocityPerHour: '+71.2K/hr',
    viralityScore: 95,
    retentionRating: 92,
    durationSeconds: 30,
    uploadAge: '19 hours ago',
    soundTrack: 'Classic Sitcom Bass Slap',
    thumbnailColor: 'from-amber-950 to-orange-950',
    hookFormula: 'Universal Family Experience / Physical Prop Humor',
    viralTranscript: `[0:00 - 0:03] ‘Grandma, what’s the Wi-Fi password?’
[0:03 - 0:11] Grandma reaches into a floral cookie tin, pulls out a wrinkled sticky note from 2004 that has a recipe for meatloaf on the front.
[0:11 - 0:20] ‘Okay honey, it’s all lowercase: FLUFFY-CAT-1998-EXCLAMATION-POINT-CAPITAL-Q.’
[0:20 - 0:26] You type it in: ‘Incorrect password’.
[0:26 - 0:30] Grandpa yells from the recliner: ‘DON’T TOUCH THAT! THE ROUTER EMITS GAMMA RAYS!’ Every single time!`,
    targetAudience: 'Teens, young adults, anyone with grandparents',
    remixRecommendation: 'Show ancient dusty router with 1 blinking yellow light and thick coaxial cables.',
    brollKeywords: ['floral cookie tin sewing kit', 'sticky note faded cursive handwriting', 'dusty router blinking lights']
  },
  {
    id: 'tr-34',
    rank: 34,
    title: 'The Waiter At An Expensive Restaurant Waiting For You To Try The Wine',
    channel: 'Bistro Chronicles',
    channelVerified: false,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '8.1M',
    viewCount: 8100000,
    velocityPerHour: '+59.3K/hr',
    viralityScore: 93,
    retentionRating: 90,
    durationSeconds: 28,
    uploadAge: '1 day ago',
    soundTrack: 'Formal French Accordion Waltz',
    thumbnailColor: 'from-rose-950 to-zinc-900',
    hookFormula: 'Social Awkwardness / Staring Contest',
    viralTranscript: `[0:00 - 0:03] The most stressful 10 seconds of any adult’s life:
[0:03 - 0:10] The waiter pours two tablespoons of red wine into your glass and stands 6 inches away staring directly into your soul.
[0:10 - 0:18] You swirl it around pretending you know what oak tannins are. You sniff it. It smells like grapes and alcohol.
[0:18 - 0:24] You take a tiny sip: ‘Yes... exquisite... notes of damp cellar and crushed dreams.’
[0:24 - 0:28] As if anyone ever had the courage to say: ‘No, take it back, this tastes like vinegar.’`,
    targetAudience: 'Date night couples, restaurant goers',
    remixRecommendation: 'Exaggerated slow-motion wine swirling with dramatic classical violin crescendo.',
    brollKeywords: ['expensive wine bottle pour', 'sommelier staring intensely', 'candlelit restaurant dinner table']
  },
  {
    id: 'tr-35',
    rank: 35,
    title: 'Introverts In Public When They Accidentally Make Eye Contact',
    channel: 'Social Battery Zero',
    channelVerified: true,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '7.5M',
    viewCount: 7500000,
    velocityPerHour: '+53.8K/hr',
    viralityScore: 92,
    retentionRating: 89,
    durationSeconds: 26,
    uploadAge: '1 day ago',
    soundTrack: 'Cartoon Sneaking Tip Toe SFX',
    thumbnailColor: 'from-zinc-950 to-slate-900',
    hookFormula: 'Introvert Survival Tactics / Micro-Expressions',
    viralTranscript: `[0:00 - 0:03] When you accidentally make eye contact with someone you went to middle school with in aisle 4:
[0:03 - 0:10] Immediate defense protocol activated: pull out phone with zero notifications, stare at the lock screen intensely.
[0:10 - 0:18] Pick up an organic gluten-free butternut squash and inspect the barcode like you are a certified USDA inspector.
[0:18 - 0:23] Turn your cart around 180 degrees and speed-walk into the frozen seafood section.
[0:23 - 0:26] Crisis averted. Battery restored to 4%.`,
    targetAudience: 'Introverts, socially anxious youth',
    remixRecommendation: 'Add an on-screen HUD showing "Social Battery: 2% - CRITICAL EMERGENCY ESCAPE".',
    brollKeywords: ['supermarket aisle looking away', 'blank phone lock screen staring', 'speed walking shopping cart']
  },
  {
    id: 'tr-36',
    rank: 36,
    title: 'Every Barber In The World When You Ask For Just A Slight Trim',
    channel: 'Fade Disasters',
    channelVerified: false,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '6.8M',
    viewCount: 6800000,
    velocityPerHour: '+48.2K/hr',
    viralityScore: 91,
    retentionRating: 88,
    durationSeconds: 31,
    uploadAge: '2 days ago',
    soundTrack: 'Loud Electric Hair Clipper Whirr',
    thumbnailColor: 'from-blue-950 to-zinc-950',
    hookFormula: 'Barber Betrayal / Forced Acceptance',
    viralTranscript: `[0:00 - 0:03] You: ‘Just half an inch off the top please, keep the length.’
[0:03 - 0:09] The barber: ‘Say no more bro, I got you.’
[0:09 - 0:17] Pulls out the clippers with zero guard, takes one swipe right across your forehead down to the skull.
[0:17 - 0:24] Spins your chair around to face the mirror: ‘Look fresh right bro?’
[0:24 - 0:28] You holding back tears with a completely bald patch: ‘Yeah man... fire... thanks...’
[0:28 - 0:31] Gives him a 25% tip and goes straight to buy 4 beanies.`,
    targetAudience: 'Guys getting haircuts, teens',
    remixRecommendation: 'Show mirror spin reveal with tragic sad violin meme music drop.',
    brollKeywords: ['barber chair spin mirror reveal', 'hair clipper buzzing close up', 'guy wearing beanie looking depressed']
  },
  {
    id: 'tr-37',
    rank: 37,
    title: 'Trying To Watch A Movie With Your Parents: The Unwritten Rules',
    channel: 'Couch Potato POV',
    channelVerified: true,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '6.2M',
    viewCount: 6200000,
    velocityPerHour: '+43.9K/hr',
    viralityScore: 90,
    retentionRating: 87,
    durationSeconds: 33,
    uploadAge: '2 days ago',
    soundTrack: 'Suspenseful Thriller Movie Score',
    thumbnailColor: 'from-slate-950 to-zinc-900',
    hookFormula: 'Parent Interrogation Trope',
    viralTranscript: `[0:00 - 0:03] Movie starts. 12 seconds in:
[0:03 - 0:10] Mom: ‘Who is that guy? Is he the bad guy? Why is he walking like that?’
[0:10 - 0:17] You: ‘Mom, the movie started 10 seconds ago, I am watching the exact same screen you are.’
[0:17 - 0:25] Dad from the kitchen: ‘Hey pause it! I need to microwave soup!’ 35 minutes later he comes back, sits down, and falls asleep in 90 seconds.
[0:25 - 0:30] You hit unpause. Dad snaps awake: ‘HEY! I WAS WATCHING THAT!’ Every single family!`,
    targetAudience: 'Teens, young adults, families',
    remixRecommendation: 'Dad snoring loud audio cut with sudden wake-up line.',
    brollKeywords: ['living room sofa tv watching', 'dad sleeping on recliner tv on', 'microwave beep living room']
  },
  {
    id: 'tr-38',
    rank: 38,
    title: 'The Flight Attendant Watching You Struggle With The Overhead Bin',
    channel: 'SkyHigh Laughs',
    channelVerified: false,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '5.6M',
    viewCount: 5600000,
    velocityPerHour: '+39.7K/hr',
    viralityScore: 89,
    retentionRating: 86,
    durationSeconds: 29,
    uploadAge: '2 days ago',
    soundTrack: 'Airplane Boarding Chime SFX',
    thumbnailColor: 'from-sky-950 to-zinc-900',
    hookFormula: 'Airplane Boarding Stress / Awkward Eye Contact',
    viralTranscript: `[0:00 - 0:03] You trying to cram a suitcase that is clearly 4 inches too wide into the Boeing 737 overhead bin.
[0:03 - 0:11] 45 people behind you in the aisle breathing down your neck waiting to reach their seats.
[0:11 - 0:19] The flight attendant standing 2 feet away with crossed arms watching you jump up and down sweating like a marathon runner.
[0:19 - 0:25] She steps in with one finger, turns the suitcase sideways, clicks the latch shut effortlessly.
[0:25 - 0:29] You sit down in 24B and stare at the safety card for 4 hours out of sheer shame.`,
    targetAudience: 'Frequent flyers, vacationers, travelers',
    remixRecommendation: 'Show intense slow-motion suitcase pushing with sweat droplets cartoon overlay.',
    brollKeywords: ['airplane overhead bin carry on', 'airplane aisle boarding line', 'flight attendant crossed arms']
  },
  {
    id: 'tr-39',
    rank: 39,
    title: 'How Every True Crime Podcast Host Describes The Murder Victim',
    channel: 'Crime Parody',
    channelVerified: true,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '5.0M',
    viewCount: 5000000,
    velocityPerHour: '+35.3K/hr',
    viralityScore: 88,
    retentionRating: 85,
    durationSeconds: 34,
    uploadAge: '3 days ago',
    soundTrack: 'Eerie Minor Piano True Crime',
    thumbnailColor: 'from-zinc-950 to-red-950',
    hookFormula: 'Over-Dramatized Podcast Tropes',
    viralTranscript: `[0:00 - 0:03] True Crime podcast hosts describing the victim in episode 1:
[0:03 - 0:12] ‘Jessica didn’t just enter a room... her smile literally generated 4,000 megawatts of clean solar electricity.’
[0:12 - 0:22] ‘She volunteered at 6 orphanages while rescuing three-legged raccoons in torrential blizzards. She was beloved by all 8 billion people on Earth.’
[0:22 - 0:30] ‘Until that fateful rainy Tuesday evening... when she decided to walk down Dark Murder Alley at 3:14 AM alone while wearing meat shoes.’
[0:30 - 0:34] Every single podcast intro. Am I wrong?`,
    targetAudience: 'True crime junkies, podcast listeners',
    remixRecommendation: 'Dramatic whisper voiceover into high-end studio microphone with blue pop filter.',
    brollKeywords: ['true crime podcast studio mic', 'rain on dark alley cobblestones', 'eerie police tape crime scene']
  },
  {
    id: 'tr-40',
    rank: 40,
    title: 'The Gym Bro Trying To Ask If You Have Many Sets Left',
    channel: 'Gym Bro Chronicles',
    channelVerified: false,
    niche: 'comedy-skits',
    nicheLabel: 'Comedy & Skits',
    views: '4.5M',
    viewCount: 4500000,
    velocityPerHour: '+31.8K/hr',
    viralityScore: 87,
    retentionRating: 84,
    durationSeconds: 27,
    uploadAge: '3 days ago',
    soundTrack: 'Loud Heavy EDM Gym Drop',
    thumbnailColor: 'from-red-950 to-amber-950',
    hookFormula: 'Gym Etiquette Awkwardness / Hovering Pressure',
    viralTranscript: `[0:00 - 0:03] You sit down on the flat bench press. You adjust the seat height for 4 seconds.
[0:03 - 0:10] A guy with a 1-gallon water jug and oversized stringer appears 18 inches behind your head.
[0:10 - 0:17] Doesn’t say a word. Just paces back and forth adjusting his wrist wraps staring at your 25lb plates.
[0:17 - 0:23] Finally taps your shoulder: ‘How many sets you got left bro?’
[0:23 - 0:27] You: ‘I literally just sat down.’ Him: ‘Cool mind if I work in?’`,
    targetAudience: 'Gym members, fitness hobbyists',
    remixRecommendation: 'Hovering shadow behind the bench press POV shot.',
    brollKeywords: ['bench press gym station', 'gallon water jug gym bro', 'wrist wraps tightening gym']
  },

  // =================== 5. GAMING & ESPORTS (10 Items) ===================
  {
    id: 'tr-41',
    rank: 41,
    title: 'GTA 6 Hidden Water Physics Detail Rockstar Spent Millions Building',
    channel: 'Rockstar Insider',
    channelVerified: true,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '17.8M',
    viewCount: 17800000,
    velocityPerHour: '+121.6K/hr',
    viralityScore: 99,
    retentionRating: 97,
    durationSeconds: 39,
    uploadAge: '5 hours ago',
    soundTrack: 'Synthwave Miami 80s Retrowave',
    thumbnailColor: 'from-pink-950 to-purple-950',
    hookFormula: 'Hype Engine / Micro-Detail Inspection',
    viralTranscript: `[0:00 - 0:03] Look at this 3-second frame from the official GTA 6 leak. Do you notice what the waves are doing?
[0:03 - 0:12] Rockstar patented a brand new fluid dynamics system that doesn’t use repetitive wave animations.
[0:12 - 0:24] When speedboats accelerate across Biscayne Bay, the wake bounces off sea walls, generating real secondary refraction swells that dynamically tip other watercraft.
[0:24 - 0:34] Even crazier: wet sand changes tensile resistance in real-time. If you sprint through receding tide water, your sneaker leaves wet suction footprints that fill with foam.
[0:34 - 0:39] Rockstar is playing in 2030 while other studios are stuck in 2020. Are you buying on day one?`,
    targetAudience: 'GTA fans, console gamers, PC gamers',
    remixRecommendation: 'Zoom in 800% on sand foam textures with slow-motion highlight circles.',
    brollKeywords: ['gta 6 vice city ocean wake', 'speed boat water spray physics', 'rockstar games logo neon']
  },
  {
    id: 'tr-42',
    rank: 42,
    title: 'The Impossible Minecraft Clutch That Broke Twitch World Record',
    channel: 'BlockClutch Kings',
    channelVerified: true,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '12.5M',
    viewCount: 12500000,
    velocityPerHour: '+89.4K/hr',
    viralityScore: 97,
    retentionRating: 94,
    durationSeconds: 35,
    uploadAge: '10 hours ago',
    soundTrack: 'Intense Speedrun Orchestral Chase',
    thumbnailColor: 'from-emerald-950 to-green-950',
    hookFormula: 'Imminent Death / 1-in-a-Million Precision',
    viralTranscript: `[0:00 - 0:03] He was falling into the void at 70 blocks per second with half a heart in Hardcore mode.
[0:03 - 0:11] His Elytra broke mid-flight in the End dimension. 3,000 hours of hardcore survival on the line.
[0:11 - 0:21] He switches hotbars in 0.08 seconds, throws an Ender Pearl straight into the void fog, and eats a chorus fruit mid-air.
[0:21 - 0:30] The teleportation mechanics recalculate on frame 14, snapping his hitbox onto a 1-block obsidian pillar right as the dragon dives.
[0:30 - 0:35] Look at his hands shaking on the webcam. Gaming will never top this clutch.`,
    targetAudience: 'Minecraft players, speedrunners, Twitch viewers',
    remixRecommendation: 'Heartbeat audio pulsing louder with every falling block till the snap-teleport.',
    brollKeywords: ['minecraft hardcore void falling', 'ender pearl clutch frame', 'streamer webcam shaking reaction']
  },
  {
    id: 'tr-43',
    rank: 43,
    title: 'Valorant 1v5 Radiant Clutch Using Sound Bait IQ 200 Mind Games',
    channel: 'TacticalFPS Lab',
    channelVerified: false,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '8.9M',
    viewCount: 8900000,
    velocityPerHour: '+64.2K/hr',
    viralityScore: 94,
    retentionRating: 91,
    durationSeconds: 41,
    uploadAge: '17 hours ago',
    soundTrack: 'Trap Drum Fast Hi-Hats 150BPM',
    thumbnailColor: 'from-rose-950 to-red-950',
    hookFormula: 'Mastermind Outplay / Psychological Warfare',
    viralTranscript: `[0:00 - 0:03] Watch how this Omen player manipulates all five enemy players using just one single fake step.
[0:03 - 0:12] It’s 11-12 match point in Radiant rank. The enemy team has spike planted on Ascent A site with crossfire angles.
[0:12 - 0:24] Instead of peeking, he taps the rope on Heaven to create audio, casts a shrouded step teleport to the exact opposite corner, and drops a one-way smoke.
[0:24 - 0:36] All five defenders turn toward Heaven expecting the push. He walks up behind them from wine and drops four instant headshots with one Vandal magazine.
[0:36 - 0:41] Gun skill gets you to Diamond. Audio deception gets you to Radiant. Follow for pro mechanics!`,
    targetAudience: 'Valorant players, CS2 fans, tactical shooter gamers',
    remixRecommendation: 'Minimap overhead view with animated red line sight lines turning the wrong way.',
    brollKeywords: ['valorant omen teleport shadow', 'ascent a site crossfire', 'vandal one tap headshot sound']
  },
  {
    id: 'tr-44',
    rank: 44,
    title: 'The Secret Boss In Elden Ring 90% Of Players Missed On First Playthrough',
    channel: 'SoulsLore Vault',
    channelVerified: true,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '7.6M',
    viewCount: 7600000,
    velocityPerHour: '+54.7K/hr',
    viralityScore: 92,
    retentionRating: 90,
    durationSeconds: 38,
    uploadAge: '1 day ago',
    soundTrack: 'Dark Souls Choral Boss Theme',
    thumbnailColor: 'from-amber-950 to-yellow-950',
    hookFormula: 'Hidden Gaming Secret / Lore Mystery',
    viralTranscript: `[0:00 - 0:03] You walked past this crumbling cliff in Farum Azula without looking down.
[0:03 - 0:11] If you jump down these floating platforms and lie down in this specific gravestone pocket, time literally rewinds.
[0:11 - 0:23] You enter the eye of an eternal storm to fight Dragonlord Placidusax: a two-headed ancient dragon that can teleport through golden lightning clouds.
[0:23 - 0:33] When he flies into the sky and fires ruin laser beams across the arena, the game’s soundtrack cuts to dead silence right before the blast wave.
[0:33 - 0:38] FromSoftware’s boss design is unmatched. Did you defeat him without summoning?`,
    targetAudience: 'Elden Ring players, Soulsborne community',
    remixRecommendation: 'Use the dramatic audio cut to dead silence before the golden laser detonation.',
    brollKeywords: ['elden ring dragonlord placidusax', 'farum azula crumbling gravity', 'red lightning storm sky']
  },
  {
    id: 'tr-45',
    rank: 45,
    title: 'Why Nintendo Never Lost A Single Lawsuit in 40 Years',
    channel: 'Gaming Law Insider',
    channelVerified: true,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '6.7M',
    viewCount: 6700000,
    velocityPerHour: '+47.9K/hr',
    viralityScore: 91,
    retentionRating: 88,
    durationSeconds: 36,
    uploadAge: '1 day ago',
    soundTrack: 'Playful Upbeat 8-Bit Chiptune',
    thumbnailColor: 'from-red-950 to-zinc-900',
    hookFormula: 'Corporate Legal Domination / Ruthless IP War',
    viralTranscript: `[0:00 - 0:03] Universal Studios tried to sue Nintendo for $100 million over Donkey Kong. Here is how Nintendo destroyed them.
[0:03 - 0:12] Universal claimed Donkey Kong copied King Kong. Nintendo’s lawyer, John Kirby, did something legendary.
[0:12 - 0:24] He dug up a case from 1975 where Universal had already argued in court that King Kong was in the public domain to avoid paying royalties.
[0:24 - 0:32] Nintendo presented Universal’s own words back to the judge. The case was dismissed and Universal had to pay Nintendo millions.
[0:32 - 0:36] In gratitude, Nintendo named their pink puffball character ‘Kirby’ after the lawyer. Subscribe for crazy gaming history!`,
    targetAudience: 'Nintendo fans, retro gamers, business & legal nerds',
    remixRecommendation: 'Show side by side of lawyer John Kirby and pink Kirby with sword.',
    brollKeywords: ['donkey kong arcade cabinet 1981', 'nintendo switch logo red', 'kirby pink floating character']
  },
  {
    id: 'tr-46',
    rank: 46,
    title: 'The Most Terrifying Subnautica Leviathan Roar Encounter Caught On Stream',
    channel: 'DeepSea Gaming',
    channelVerified: false,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '6.0M',
    viewCount: 6000000,
    velocityPerHour: '+42.8K/hr',
    viralityScore: 90,
    retentionRating: 87,
    durationSeconds: 32,
    uploadAge: '2 days ago',
    soundTrack: 'Subnautica Deep Abyss Hydrophone Drone',
    thumbnailColor: 'from-cyan-950 to-zinc-950',
    hookFormula: 'Thalassophobia Shock / Jump Scare Climax',
    viralTranscript: `[0:00 - 0:03] He ignored the automated PDA warning: ‘Entering ecological dead zone. Adding report to databank.’
[0:03 - 0:10] He took his Seamoth sub 500 meters beyond the crater edge into pitch black ocean void.
[0:10 - 0:19] His headlights cut out. Suddenly, this bone-chilling 120-decibel echolocation shriek rips through his headphones.
[0:19 - 0:27] A glowing Ghost Leviathan lunges out of the black water, crushing his submarine hull to 0% in one bite.
[0:27 - 0:32] Look at him ripping his headset off. Never go into the void alone.`,
    targetAudience: 'Survival gamers, horror stream fans, Subnautica players',
    remixRecommendation: 'Build low underwater rumbling before sudden bioluminescent jaw attack.',
    brollKeywords: ['subnautica ghost leviathan void', 'seamoth submarine depth headlights', 'streamer jump scare reaction']
  },
  {
    id: 'tr-47',
    rank: 47,
    title: 'How Unfair Matchmaking In Modern FPS Games Is Designed Like A Casino Slot',
    channel: 'Game Mechanics Unmasked',
    channelVerified: true,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '5.4M',
    viewCount: 5400000,
    velocityPerHour: '+38.5K/hr',
    viralityScore: 89,
    retentionRating: 86,
    durationSeconds: 37,
    uploadAge: '2 days ago',
    soundTrack: 'Dark Industrial Techno Beat',
    thumbnailColor: 'from-zinc-950 to-red-950',
    hookFormula: 'Exposing Addictive Game Patents',
    viralTranscript: `[0:00 - 0:03] You are not having a bad gaming day. The algorithm planned your 5-game loss streak on purpose.
[0:03 - 0:12] Electronic Arts and Activision patented EOBM: Engagement Optimized Matchmaking.
[0:12 - 0:24] Pure skill-based matchmaking causes player fatigue. So the AI purposefully places you in unwinnable sweat lobbies for 3 games to induce frustration.
[0:24 - 0:33] Then, right before you are about to quit the game, it gives you one bot lobby where you drop 30 kills and feel like a god.
[0:33 - 0:37] It’s variable ratio dopamine conditioning: the exact same mechanism used by Las Vegas slot machines. Stop letting games play you!`,
    targetAudience: 'Call of Duty, Apex Legends, Fortnite players',
    remixRecommendation: 'Show patent document screenshots with highlight lines on "Churn Risk Prediction".',
    brollKeywords: ['call of duty warzone lobby', 'slot machine reels spinning casino', 'gamer angry controller smash']
  },
  {
    id: 'tr-48',
    rank: 48,
    title: 'The Player Who Spent 10 Years Walking To The Minecraft Far Lands',
    channel: 'Gaming Legends',
    channelVerified: true,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '4.9M',
    viewCount: 4900000,
    velocityPerHour: '+34.7K/hr',
    viralityScore: 88,
    retentionRating: 85,
    durationSeconds: 43,
    uploadAge: '2 days ago',
    soundTrack: 'Nostalgic Minecraft Piano C418 Remix',
    thumbnailColor: 'from-emerald-950 to-zinc-900',
    hookFormula: 'Epic Human Endurance / Legendary Journey',
    viralTranscript: `[0:00 - 0:03] In 2011, KurtJMac started walking west in Minecraft Beta 1.7.3. He still hasn’t stopped.
[0:03 - 0:13] In early versions of Minecraft, floating-point math breaks down at 12,550,821 blocks from world spawn, generating warped, glitching landmasses known as the Far Lands.
[0:13 - 0:26] Instead of teleporting, Kurt decided to walk the entire 12.5 million blocks on foot, raising over $500,000 for charity along the way.
[0:26 - 0:38] After 13 years of walking, his world coordinates are over 5 million blocks out. The physics are so distorted that torches float and gravel falls upward.
[0:38 - 0:43] Pure dedication. Follow for more legendary internet lore.`,
    targetAudience: 'Minecraft veterans, internet culture followers',
    remixRecommendation: 'Show coordinates scrolling endlessly from 0 to 5,000,000 on the F3 screen.',
    brollKeywords: ['minecraft far lands terrain glitch', 'f3 coordinate screen running', 'c418 minecraft sunset world']
  },
  {
    id: 'tr-49',
    rank: 49,
    title: 'Why GTA 5 Cop AI Is Still More Advanced Than Most 2026 Games',
    channel: 'AI Game Lab',
    channelVerified: false,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '4.5M',
    viewCount: 4500000,
    velocityPerHour: '+31.9K/hr',
    viralityScore: 87,
    retentionRating: 84,
    durationSeconds: 34,
    uploadAge: '3 days ago',
    soundTrack: 'L.A. Noire Jazz Noir Saxophone',
    thumbnailColor: 'from-blue-950 to-amber-950',
    hookFormula: 'Unexpected Tech Detail / Tactical AI Behavior',
    viralTranscript: `[0:00 - 0:03] Next time you get 3 stars in GTA 5, shoot one police officer in the leg and watch what happens.
[0:03 - 0:11] The second cop will not shoot you. He will sprint forward, drag his wounded partner behind cover, and provide suppressing fire.
[0:11 - 0:21] If you take out their squad car tires, they won’t chase on rims: they coordinate a flanking perimeter with approaching cruiser backup.
[0:21 - 0:30] Rockstar built over 150 tactical squad routines in 2013 that modern developers still can’t replicate in Unreal Engine 5.
[0:30 - 0:34] Did you know cops had this wounded rescue animation? Comment below!`,
    targetAudience: 'Open world gamers, game designers, GTA players',
    remixRecommendation: 'Slow-motion clip of the officer dragging his partner behind the cruiser door.',
    brollKeywords: ['gta 5 police cruiser shootout', 'cop dragging partner behind cover', 'los santos downtown night sirens']
  },
  {
    id: 'tr-50',
    rank: 50,
    title: 'The CS2 Smokes Physics Update That Changed Tactical Gaming Forever',
    channel: 'CounterStrike Central',
    channelVerified: true,
    niche: 'gaming-esports',
    nicheLabel: 'Gaming & Esports',
    views: '4.2M',
    viewCount: 4200000,
    velocityPerHour: '+29.6K/hr',
    viralityScore: 86,
    retentionRating: 83,
    durationSeconds: 31,
    uploadAge: '3 days ago',
    soundTrack: 'Bass Heavy Trap Kick Bomb Defusal',
    thumbnailColor: 'from-amber-950 to-zinc-950',
    hookFormula: 'Volumetric Physics Breakthrough',
    viralTranscript: `[0:00 - 0:03] In every shooter for 20 years, smoke grenades were just static gray clouds. Valve changed that forever.
[0:03 - 0:10] In Counter-Strike 2, smokes are dynamic volumetric 3D objects that react to the physical environment.
[0:10 - 0:19] They fill doorways, drape down staircases, and expand through broken windows.
[0:19 - 0:26] But the craziest part: throwing an HE grenade or firing bullets punches physical holes straight through the smoke cloud, revealing enemy positions for 3 seconds.
[0:26 - 0:31] This is what true next-gen physics looks like. Valve remains undefeated.`,
    targetAudience: 'CS2 fans, competitive esports followers',
    remixRecommendation: 'Show side-by-side: CS:GO static smoke vs CS2 grenade blast clearing smoke hole.',
    brollKeywords: ['cs2 volumetric smoke explosion', 'he grenade blowing smoke open', 'mirage a site bomb defusal']
  },

  // =================== 6. SCIENCE & ENGINEERING (10 Items) ===================
  {
    id: 'tr-51',
    rank: 51,
    title: 'Hydraulic Press Vs Solid Tungsten Cube: The Indestructible Metal',
    channel: 'Crush Lab HQ',
    channelVerified: true,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '16.4M',
    viewCount: 16400000,
    velocityPerHour: '+114.7K/hr',
    viralityScore: 99,
    retentionRating: 96,
    durationSeconds: 34,
    uploadAge: '8 hours ago',
    soundTrack: 'Heavy Metal Industrial Grinder 140BPM',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Extreme Force Clash / Defying Physics',
    viralTranscript: `[0:00 - 0:03] This 500-ton hydraulic press has crushed bowling balls, engine blocks, and diamonds. But today it met tungsten.
[0:03 - 0:11] Tungsten has the highest melting point of any metal on Earth at 6,192 degrees Fahrenheit, and nearly the density of gold.
[0:11 - 0:22] As the hardened steel press ram reaches 400 tons of downward force, listen to the steel groan.
[0:22 - 0:30] The tungsten cube didn’t shatter. It literally pressed itself into the press ram, denting the tool steel like soft butter!
[0:30 - 0:34] Tungsten is officially the closest thing to real-life vibranium. Subscribe for more crazy crushing tests!`,
    targetAudience: 'Machinists, science nerds, satisfying video lovers',
    remixRecommendation: 'Audio focus on the deep mechanical groan of hydraulic pressure gauge spiking to red.',
    brollKeywords: ['hydraulic press tungsten cube', 'metal deformation pressure gauge', 'slow motion spark burst anvil']
  },
  {
    id: 'tr-52',
    rank: 52,
    title: 'What Happens When You Pour Liquid Nitrogen Into Boiling Water',
    channel: 'Crazy Russian Science',
    channelVerified: true,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '12.1M',
    viewCount: 12100000,
    velocityPerHour: '+86.5K/hr',
    viralityScore: 97,
    retentionRating: 94,
    durationSeconds: 32,
    uploadAge: '13 hours ago',
    soundTrack: 'Dramatic Orchestral Timpani Blast',
    thumbnailColor: 'from-cyan-950 to-blue-900',
    hookFormula: 'Instant Giant Cloud Explosion / Thermal Shock',
    viralTranscript: `[0:00 - 0:03] Minus 320 degrees meets plus 212 degrees. Here is what happens in 0.1 seconds.
[0:03 - 0:10] When you dump 10 liters of cryogenic liquid nitrogen into a bucket of boiling water, it doesn’t boil slowly.
[0:10 - 0:21] The rapid heat transfer causes instant explosive Leidenfrost vaporization: nitrogen expands 700 times its liquid volume in a fraction of a second.
[0:21 - 0:28] BOOM! A 30-foot mushroom cloud of dense condensed water vapor blasts into the ceiling, blanketing the entire courtyard in fog.
[0:28 - 0:32] Never try this at home without blast shields. Follow for high-voltage science!`,
    targetAudience: 'Chemistry fans, curious kids, science teachers',
    remixRecommendation: 'Super slow-motion 1,000 FPS shot of the mushroom fog eruption.',
    brollKeywords: ['liquid nitrogen boiling water mushroom cloud', 'cryogenic vapor explosion slow motion', 'safety goggles lab courtyard']
  },
  {
    id: 'tr-53',
    rank: 53,
    title: 'James Webb Telescope Discovered Giant Structures That Shouldn’t Exist',
    channel: 'CosmoScope',
    channelVerified: true,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '9.2M',
    viewCount: 9200000,
    velocityPerHour: '+66.1K/hr',
    viralityScore: 95,
    retentionRating: 92,
    durationSeconds: 41,
    uploadAge: '18 hours ago',
    soundTrack: 'Interstellar Organ Theme Epic Synth',
    thumbnailColor: 'from-purple-950 to-zinc-950',
    hookFormula: 'Breaking the Big Bang Model / Cosmic Anomaly',
    viralTranscript: `[0:00 - 0:03] Astrophysicists are having emergency meetings because this deep-field image breaks standard physics.
[0:03 - 0:13] The James Webb Space Telescope peered 13.4 billion years into the past, looking at the dawn of the universe just 300 million years after the Big Bang.
[0:13 - 0:25] According to cosmology models, galaxies back then should be tiny, chaotic baby clusters of primordial gas.
[0:25 - 0:36] Instead, JWST found six mature, colossal spiral galaxies as massive as our Milky Way, containing hundreds of billions of stars.
[0:36 - 0:41] Either the universe is twice as old as we thought, or our entire theory of galaxy formation is wrong. What do you think?`,
    targetAudience: 'Astronomy enthusiasts, physics nerds, space exploration fans',
    remixRecommendation: 'Zoom into the tiny red speck in deep space that resolves into a giant spiral galaxy.',
    brollKeywords: ['james webb deep field galaxies', 'cosmic spiral galaxy infrared', 'big bang timeline graphic']
  },
  {
    id: 'tr-54',
    rank: 54,
    title: 'Aerogel: The Material That Protects A Flower From A 2,000 Degree Blowtorch',
    channel: 'Material Science Daily',
    channelVerified: false,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '8.0M',
    viewCount: 8000000,
    velocityPerHour: '+57.3K/hr',
    viralityScore: 93,
    retentionRating: 90,
    durationSeconds: 36,
    uploadAge: '1 day ago',
    soundTrack: 'Minimal Ambient Glitch Beat',
    thumbnailColor: 'from-sky-950 to-cyan-900',
    hookFormula: 'Impossible Thermal Insulation Demonstration',
    viralTranscript: `[0:00 - 0:03] A delicate fresh rose on top of a 2,000-degree propane torch flame. The petals aren’t even wilting.
[0:03 - 0:11] Between the flame and the flower is a 2-millimeter wafer of silica aerogel, known as ‘Frozen Smoke’.
[0:11 - 0:22] Aerogel is 99.8% air, made by extracting the liquid from a silica gel matrix using supercritical carbon dioxide drying.
[0:22 - 0:31] Its nano-pores are smaller than the mean free path of air molecules, meaning heat literally cannot conduct through it.
[0:31 - 0:36] NASA uses this to insulate Mars rovers during -150 degree Martian nights. Engineering is pure magic!`,
    targetAudience: 'Makers, engineers, physics students',
    remixRecommendation: 'Macro lens view of the blue translucent aerogel with blue flame licking underneath.',
    brollKeywords: ['silica aerogel frozen smoke rose blowtorch', 'thermal insulation experiment', 'mars rover curiosity heat shield']
  },
  {
    id: 'tr-55',
    rank: 55,
    title: 'Why Boeing Jet Engines Have That Little White Spiral Painted In The Center',
    channel: 'AeroEngineering',
    channelVerified: true,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '7.3M',
    viewCount: 7300000,
    velocityPerHour: '+52.1K/hr',
    viralityScore: 92,
    retentionRating: 89,
    durationSeconds: 30,
    uploadAge: '1 day ago',
    soundTrack: 'Aviation Jet Turbine Whoosh',
    thumbnailColor: 'from-slate-950 to-blue-950',
    hookFormula: 'Hidden Safety Engineering Detail',
    viralTranscript: `[0:00 - 0:03] Next time you board an airplane, look at the jet engine spinner. Notice that little white comma spiral?
[0:03 - 0:10] It’s not decoration. It saves dozens of airport ramp workers’ lives every single year.
[0:10 - 0:20] When a GE90 turbine engine runs at idle on the tarmac, the titanium fan blades spin so fast they become completely invisible to the human eye.
[0:20 - 0:26] The spiral creates a hypnotic visual strobe so ground crew instantly know whether the hazard suction zone is active.
[0:26 - 0:30] Second reason: birds see the flashing spiral and steer clear, preventing bird strikes. Simple, life-saving design!`,
    targetAudience: 'Travelers, aviation geeks, pilots',
    remixRecommendation: 'Show optical illusion of invisible fan blades turning into a white spinning hypnotic blur.',
    brollKeywords: ['boeing 777 jet engine spiral', 'ge90 titanium fan blades spinning', 'airport tarmac ramp marshal']
  },
  {
    id: 'tr-56',
    rank: 56,
    title: 'The Terrifying Physics Of The Mariana Trench 36,000 Feet Below Sea Level',
    channel: 'Ocean Abyssal',
    channelVerified: true,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '6.6M',
    viewCount: 6600000,
    velocityPerHour: '+47.2K/hr',
    viralityScore: 91,
    retentionRating: 88,
    durationSeconds: 39,
    uploadAge: '2 days ago',
    soundTrack: 'Sub-Bass Creaking Deep Ocean Drone',
    thumbnailColor: 'from-blue-950 to-black',
    hookFormula: 'Crushing Atmosphere Statistics / Abyssal Horror',
    viralTranscript: `[0:00 - 0:03] If you dropped a solid iron cannonball into the Challenger Deep, it would take over 4 hours just to hit the bottom.
[0:03 - 0:13] At nearly 7 miles down, the hydrostatic pressure is 1,086 bar. That’s 16,000 pounds per square inch.
[0:13 - 0:25] It’s equivalent to balancing an adult African elephant on top of your thumb.
[0:25 - 0:34] If a standard submarine hull developed a hairline fracture here, the incoming water jet would cut through titanium armor plates like a laser.
[0:34 - 0:39] Yet, ghost amphipods and translucent snailfish thrive here in pitch black darkness. Nature is terrifying.`,
    targetAudience: 'Marine biology lovers, deep sea explorers',
    remixRecommendation: 'Show a styrofoam coffee cup shrinking to the size of a thimble under 1,000 bar pressure.',
    brollKeywords: ['mariana trench challenger deep submarine', 'snailfish deep sea bioluminescence', 'titanium submarine hull creak']
  },
  {
    id: 'tr-57',
    rank: 57,
    title: 'How Prince Rupert’s Drop Can Withstand A Bullet But Shatters From A Finger',
    channel: 'Physics Toys',
    channelVerified: false,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '5.9M',
    viewCount: 5900000,
    velocityPerHour: '+42.0K/hr',
    viralityScore: 90,
    retentionRating: 87,
    durationSeconds: 35,
    uploadAge: '2 days ago',
    soundTrack: 'Sharp Glass Clinking Sound Effects',
    thumbnailColor: 'from-amber-950 to-emerald-950',
    hookFormula: 'Paradoxical Material Phenomenon',
    viralTranscript: `[0:00 - 0:03] You can shoot a .22 caliber bullet directly at the bulbous head of this glass tadpole, and the bullet will literally shatter on impact.
[0:03 - 0:12] This is Prince Rupert’s Drop, created by dropping molten glass into ice-cold water.
[0:12 - 0:23] The outer surface cools instantly while the molten interior slowly contracts, creating immense compressive stress of over 100,000 PSI on the outside.
[0:23 - 0:31] But look at the fragile tail: if you snip the tiniest fraction of a millimeter off the tip with pliers...
[0:31 - 0:35] Explosive chain reaction! The entire glass structure disintegrates into dust at 4,000 miles per hour. Absolutely wild!`,
    targetAudience: 'Physics fans, slow motion lovers',
    remixRecommendation: 'Super high-speed camera footage (100,000 FPS) showing crack propagation wave.',
    brollKeywords: ['prince ruperts drop bullet shatter', 'molten glass cooling water drop', 'high speed camera glass explosion']
  },
  {
    id: 'tr-58',
    rank: 58,
    title: 'Why Bridges Have Those Weird Metal Teeth Expansion Joints',
    channel: 'CivilEngineering Lab',
    channelVerified: true,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '5.3M',
    viewCount: 5300000,
    velocityPerHour: '+37.8K/hr',
    viralityScore: 89,
    retentionRating: 86,
    durationSeconds: 31,
    uploadAge: '2 days ago',
    soundTrack: 'Industrial Rhythm Percussion',
    thumbnailColor: 'from-zinc-900 to-slate-900',
    hookFormula: 'Everyday Highway Infrastructure Mystery',
    viralTranscript: `[0:00 - 0:03] Every time your car goes ‘thump-thump’ over these interlocking metal teeth on a highway bridge:
[0:03 - 0:10] Those are bridge expansion joints, and without them, the bridge would tear itself apart every summer.
[0:10 - 0:20] A two-mile steel suspension bridge expands by up to 5 full feet between freezing winter blizzards and 100-degree summer heatwaves.
[0:20 - 0:27] The interlocking finger joints slide in and out like accordion pleats, absorbing thermal expansion forces that could buckle concrete pillars.
[0:27 - 0:31] Civil engineering keeps the modern world moving without you ever noticing. Share with a driver!`,
    targetAudience: 'Commuters, road trip drivers, civil engineers',
    remixRecommendation: 'Show summer vs winter time-lapse of the finger joints sliding 4 inches.',
    brollKeywords: ['bridge expansion joint metal teeth', 'highway suspension bridge traffic', 'concrete thermal expansion crack']
  },
  {
    id: 'tr-59',
    rank: 59,
    title: 'The Superconducting Train That Floats In Mid-Air Using Quantum Levitation',
    channel: 'Future Transit',
    channelVerified: false,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '4.7M',
    viewCount: 4700000,
    velocityPerHour: '+33.5K/hr',
    viralityScore: 88,
    retentionRating: 85,
    durationSeconds: 37,
    uploadAge: '3 days ago',
    soundTrack: 'Electronic High Speed Glide 130BPM',
    thumbnailColor: 'from-blue-950 to-cyan-950',
    hookFormula: 'Zero Friction High-Speed Transit',
    viralTranscript: `[0:00 - 0:03] This train has no wheels, no engine friction, and floats 4 inches above the concrete track at 375 miles per hour.
[0:03 - 0:13] Japan’s L0 Series Shinkansen uses the Meissner effect: niobium-titanium superconducting electromagnets cooled by liquid helium to minus 452 degrees.
[0:13 - 0:25] The magnets induce repulsive magnetic fields in track coils that naturally lift the 300-ton train body off the ground.
[0:25 - 0:33] Because there is zero rolling resistance, it travels from Tokyo to Nagoya in 40 minutes, using 30% less energy than a commercial jetliner.
[0:33 - 0:37] This is the future of human travel. Would you ride this bullet train?`,
    targetAudience: 'Train geeks, travelers, transit engineers',
    remixRecommendation: 'POV shot looking down at track showing clear 4-inch air gap while cruising at 603 km/h.',
    brollKeywords: ['shinkansen l0 maglev japan', 'superconducting magnetic levitation', 'tokyo bullet train speed pass']
  },
  {
    id: 'tr-60',
    rank: 60,
    title: 'What Happens If You Put A Nuclear Submarine In The Dead Sea',
    channel: 'Naval Engineering',
    channelVerified: true,
    niche: 'science-engineering',
    nicheLabel: 'Science & Engineering',
    views: '4.3M',
    viewCount: 4300000,
    velocityPerHour: '+30.4K/hr',
    viralityScore: 87,
    retentionRating: 84,
    durationSeconds: 38,
    uploadAge: '3 days ago',
    soundTrack: 'Submarine Sonar Ping Echo Ambient',
    thumbnailColor: 'from-teal-950 to-slate-950',
    hookFormula: 'Bizarre Scientific Thought Experiment',
    viralTranscript: `[0:00 - 0:03] What would happen if a $3 billion Ohio-class nuclear submarine tried to dive in the Dead Sea?
[0:03 - 0:11] The Dead Sea has a salt salinity of 34%, making its water 24% denser than normal ocean brine.
[0:11 - 0:23] Submarines dive by flooding their ballast tanks with seawater until their overall buoyancy equals the surrounding medium.
[0:23 - 0:33] Because of the hyper-saline density, the sub’s ballast tanks literally wouldn’t hold enough water weight to submerge. It would float like a cork.
[0:33 - 0:38] Plus, the hypersaline brine would corrode the reactor cooling intakes in 48 hours. Physics always wins!`,
    targetAudience: 'Military history fans, physics hobbyists',
    remixRecommendation: '3D CAD render of ballast tank water levels vs buoyancy vector arrows.',
    brollKeywords: ['nuclear submarine periscope water surface', 'dead sea salt crystals shoreline', 'ballast tank flooding animation']
  },

  // =================== 7. HISTORY & MYSTERY (10 Items) ===================
  {
    id: 'tr-61',
    rank: 61,
    title: 'The Great Pyramid Acoustic Levitation Secret Scientists Can’t Explain',
    channel: 'Ancient Mysteries Unveiled',
    channelVerified: true,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '17.2M',
    viewCount: 17200000,
    velocityPerHour: '+120.3K/hr',
    viralityScore: 99,
    retentionRating: 96,
    durationSeconds: 43,
    uploadAge: '6 hours ago',
    soundTrack: 'Deep Egyptian Drone Ambient Oud',
    thumbnailColor: 'from-amber-950 to-yellow-950',
    hookFormula: 'Forbidden Archeology / Granite Resonance Frequency',
    viralTranscript: `[0:00 - 0:03] Why did the builders of the Great Pyramid hoist 70-ton rose granite beams 150 feet in the air?
[0:03 - 0:13] The King’s Chamber isn’t a tomb. Zero mummies, zero hieroglyphics, zero burial artifacts were ever found inside.
[0:13 - 0:26] The chamber is constructed from red Aswan granite containing high concentrations of quartz crystal.
[0:26 - 0:37] Acoustic tests reveal the room resonates at 438 Hertz: the exact harmonic frequency of low musical F-sharp. When chanted in, the quartz generates piezoelectric micro-currents.
[0:37 - 0:43] Was it a tomb, or an ancient acoustic energy oscillator? Drop your theory in the comments!`,
    targetAudience: 'Ancient history lovers, pyramid researchers, alternative archaeology',
    remixRecommendation: 'Play 438Hz resonant drone hum while showing LiDAR scan of King\'s Chamber.',
    brollKeywords: ['great pyramid giza king chamber', 'rose granite aswan quarry', 'acoustic resonance frequency waveform']
  },
  {
    id: 'tr-62',
    rank: 62,
    title: 'What Cleopatra Actually Looked Like According To Ancient Coin Scans',
    channel: 'History Revealed',
    channelVerified: true,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '13.0M',
    viewCount: 13000000,
    velocityPerHour: '+92.7K/hr',
    viralityScore: 97,
    retentionRating: 94,
    durationSeconds: 35,
    uploadAge: '11 hours ago',
    soundTrack: 'Mystical Desert Wind Strings',
    thumbnailColor: 'from-yellow-950 to-zinc-950',
    hookFormula: 'Debunking Hollywood / 3D Forensic Facial Reconstruction',
    viralTranscript: `[0:00 - 0:03] Hollywood made you think Cleopatra looked like Elizabeth Taylor. Archaeology tells a completely different story.
[0:03 - 0:11] Cleopatra VII was of Macedonian Greek Ptolemaic lineage, the result of multiple generations of intense royal inbreeding.
[0:11 - 0:22] Silver denarius coins minted during her reign in Alexandria show a prominent hooked aquiline nose, a sharp protruding chin, and a sloping forehead.
[0:22 - 0:31] Contemporary Roman historians wrote that her power wasn’t physical supermodel beauty, but hypnotic charisma, speaking over 9 languages fluently.
[0:31 - 0:35] Brains over beauty conquered both Julius Caesar and Mark Antony. Follow for real history!`,
    targetAudience: 'Roman & Egyptian history fans, forensic reconstruction watchers',
    remixRecommendation: 'Morph coin relief profile into 3D photorealistic textured facial reconstruction.',
    brollKeywords: ['cleopatra silver coin denarius alexandria', 'forensic 3d facial reconstruction', 'roman bust julius caesar']
  },
  {
    id: 'tr-63',
    rank: 63,
    title: 'The Self-Healing Roman Concrete That Scientists Finally Decoded In 2023',
    channel: 'Ancient Engineering',
    channelVerified: false,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '9.6M',
    viewCount: 9600000,
    velocityPerHour: '+68.4K/hr',
    viralityScore: 95,
    retentionRating: 92,
    durationSeconds: 37,
    uploadAge: '17 hours ago',
    soundTrack: 'Roman Legion Battle Drums Heavy',
    thumbnailColor: 'from-slate-900 to-amber-950',
    hookFormula: 'Lost Ancient Technology / Modern Solution',
    viralTranscript: `[0:00 - 0:03] Modern concrete crumbles after 50 years. The Roman Pantheon dome is 2,000 years old and still pristine.
[0:03 - 0:12] For centuries, historians thought white mineral chunks in Roman seawalls were just sloppy mixing mistakes.
[0:12 - 0:24] In 2023, MIT researchers discovered they used ‘hot mixing’ with quicklime.
[0:24 - 0:33] When cracks form and rainwater seeps in, the lime clasts dissolve, recrystallizing as calcium carbonate to chemically seal the fracture shut automatically!
[0:33 - 0:37] The Romans literally invented self-healing materials. Why aren’t we using this on our bridges?`,
    targetAudience: 'Engineers, architecture lovers, history nerds',
    remixRecommendation: 'Microscope zoom showing crack filling with white calcium crystals over time.',
    brollKeywords: ['pantheon dome oculus rome', 'roman seawall breakwater waves', 'mit lab microscope concrete crack']
  },
  {
    id: 'tr-64',
    rank: 64,
    title: 'The Titanic Iceberg Warning Telegram That Was Stuffed Into An Officer’s Pocket',
    channel: 'Maritime Lore',
    channelVerified: true,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '8.3M',
    viewCount: 8300000,
    velocityPerHour: '+59.8K/hr',
    viralityScore: 94,
    retentionRating: 91,
    durationSeconds: 40,
    uploadAge: '1 day ago',
    soundTrack: 'Titanic Sad Irish Whistle Slow',
    thumbnailColor: 'from-blue-950 to-slate-950',
    hookFormula: 'Chilling Historical What-If / Human Hubris',
    viralTranscript: `[0:00 - 0:03] At 9:40 PM on April 14, 1912, this exact Morse code dispatch reached the Titanic’s wireless room.
[0:03 - 0:12] The steamer Mesaba warned: ‘Heavy pack ice and numerous large icebergs right along your coordinates.’
[0:12 - 0:24] The telegraph operators were swamped sending wealthy passengers’ trivial holiday greeting messages to New York.
[0:24 - 0:35] The operator replied: ‘Shut up, shut up, I am busy.’ The ice warning was never delivered to Captain Smith on the bridge.
[0:35 - 0:40] Two hours later, 1,500 people perished in freezing waters. Hubris always costs lives.`,
    targetAudience: 'Titanic historians, maritime disaster fans',
    remixRecommendation: 'Overlay actual historical telegraph paper with Morse code beeps playing underneath.',
    brollKeywords: ['titanic ship ocean night bow', 'morse code telegraph key tapping', 'iceberg north atlantic twilight']
  },
  {
    id: 'tr-65',
    rank: 65,
    title: 'The Terrifying Voynich Manuscript: A 600-Year-Old Book Nobody Can Read',
    channel: 'CodeBreakers Archive',
    channelVerified: false,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '7.4M',
    viewCount: 7400000,
    velocityPerHour: '+53.2K/hr',
    viralityScore: 92,
    retentionRating: 89,
    durationSeconds: 38,
    uploadAge: '1 day ago',
    soundTrack: 'Dark Gregorian Chant Choir Drone',
    thumbnailColor: 'from-amber-950 to-emerald-950',
    hookFormula: 'Unbreakable Cipher / Alien Herbalism',
    viralTranscript: `[0:00 - 0:03] Alan Turing broke the Nazi Enigma code. But he couldn’t decode a single word of this medieval book.
[0:03 - 0:12] Carbon-dated to 1420, the Voynich Manuscript contains 240 vellum pages of unknown script and illustrations.
[0:12 - 0:24] It depicts bizarre botanical plants that do not exist anywhere on planet Earth, cosmic zodiac charts with unmapped constellations, and strange nude figures in green baths.
[0:24 - 0:34] Even the NSA and modern AI neural networks analyzing character entropy confirm it follows real linguistic syntax, but with zero known language roots.
[0:34 - 0:38] Is it a master hoax, a lost civilization, or medieval alchemy? What’s your take?`,
    targetAudience: 'Cryptographers, medieval historians, mystery lovers',
    remixRecommendation: 'High-res scans of the alien flora drawings with highlighted strange script glyphs.',
    brollKeywords: ['voynich manuscript vellum parchment', 'strange botanical illustrations', 'medieval monk writing script']
  },
  {
    id: 'tr-66',
    rank: 66,
    title: 'The Real Reason Napoleon Always Kept His Hand Inside His Coat',
    channel: 'Napoleonic Chronicles',
    channelVerified: true,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '6.5M',
    viewCount: 6500000,
    velocityPerHour: '+46.8K/hr',
    viralityScore: 91,
    retentionRating: 88,
    durationSeconds: 33,
    uploadAge: '2 days ago',
    soundTrack: 'French Imperial March Snare Drum',
    thumbnailColor: 'from-blue-950 to-red-950',
    hookFormula: 'Busting a 200-Year Myth / Aristocratic Etiquette',
    viralTranscript: `[0:00 - 0:03] No, Napoleon wasn’t clutching a painful stomach ulcer. Here is the actual reason.
[0:03 - 0:11] In 18th-century Europe, having your hands dangling loosely at your sides in public was considered common, uncouth, and peasant-like.
[0:11 - 0:21] French etiquette guides by Jean-Baptiste de La Salle explicitly instructed gentlemen that resting the right hand inside the waistcoat symbolized aristocratic composure.
[0:21 - 0:29] Classical painters used it to evoke ancient Roman senators who tucked their hands into their togas during speeches.
[0:29 - 0:33] Napoleon was simply following the ultimate high-society power pose. Share this historical fact!`,
    targetAudience: 'History buffs, European culture enthusiasts',
    remixRecommendation: 'Show famous oil paintings side by side: Washington, Napoleon, and Mozart all doing the pose.',
    brollKeywords: ['napoleon bonaparte portrait hand coat', 'david painter coronation napoleon', 'french imperial military uniform']
  },
  {
    id: 'tr-67',
    rank: 67,
    title: 'The Lost City Of Heracleion: Egypt’s Atlantis Found Under The Mediterranean',
    channel: 'Sunken World',
    channelVerified: false,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '5.8M',
    viewCount: 5800000,
    velocityPerHour: '+41.3K/hr',
    viralityScore: 90,
    retentionRating: 87,
    durationSeconds: 42,
    uploadAge: '2 days ago',
    soundTrack: 'Underwater Muffled Harp Ambient',
    thumbnailColor: 'from-teal-950 to-blue-950',
    hookFormula: 'Underwater Archaeological Discovery',
    viralTranscript: `[0:00 - 0:03] For 2,000 years, historians believed the legendary port of Thonis-Heracleion was just a mythological Greek fairy tale.
[0:03 - 0:13] Then in the year 2000, French marine archaeologist Franck Goddio scanned Abu Qir Bay, 4 miles off the coast of Alexandria.
[0:13 - 0:26] Beneath 30 feet of murky seawater lay an entire sunken metropolis: colossal 16-foot granite statues of pharaohs, 64 ancient shipwrecks, and temples dedicated to Amun.
[0:26 - 0:37] Around the 8th century AD, soil liquefaction triggered by earthquakes turned the clay ground into liquid, swallowing the city into the sea overnight.
[0:37 - 0:42] How many more lost civilizations are hiding on the ocean floor? Subscribe for more underwater mysteries!`,
    targetAudience: 'Scuba divers, archaeology geeks, Atlantis seekers',
    remixRecommendation: 'Scuba diver brush revealing 16-foot granite face of god Hapi covered in barnacles.',
    brollKeywords: ['sunken city heracleion scuba divers', 'colossal granite statue underwater', 'ancient shipwreck amphorae seafloor']
  },
  {
    id: 'tr-68',
    rank: 68,
    title: 'Why The Mongol Cavalry Could Conquer 10,000 Miles In One Season',
    channel: 'Khan Tactics',
    channelVerified: true,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '5.1M',
    viewCount: 5100000,
    velocityPerHour: '+36.2K/hr',
    viralityScore: 89,
    retentionRating: 86,
    durationSeconds: 36,
    uploadAge: '2 days ago',
    soundTrack: 'Throat Singing Mongol Battle Beats',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Military Logistics Masterclass',
    viralTranscript: `[0:00 - 0:03] Genghis Khan’s warriors had zero supply lines, zero baggage trains, and out-marched modern motorized infantry.
[0:03 - 0:11] Every single Mongol rider maintained a remount string of 4 to 5 sturdy steppe ponies.
[0:11 - 0:21] When one horse tired, the rider leapt onto the saddle of the fresh horse at full gallop without stopping the march.
[0:21 - 0:31] For nutrition: dried curd curds dissolved in saddle flasks, and if starved in winter, tapping a horse’s vein for a cup of nutrient-rich blood before cauterizing it.
[0:31 - 0:36] They could travel 100 miles in 24 hours across freezing mountains. Unstoppable horse warfare.`,
    targetAudience: 'Military strategists, Asian history buffs',
    remixRecommendation: 'Fast horse gallop sound effects synched with traditional Tuvan throat singing beat.',
    brollKeywords: ['mongol horse archers steppe gallop', 'composite bow arrow release', 'genghis khan empire map expansion']
  },
  {
    id: 'tr-69',
    rank: 69,
    title: 'The Dancing Plague Of 1518: When 400 People Literally Danced Until Death',
    channel: 'Bizarre Chronicles',
    channelVerified: false,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '4.6M',
    viewCount: 4600000,
    velocityPerHour: '+32.8K/hr',
    viralityScore: 88,
    retentionRating: 85,
    durationSeconds: 34,
    uploadAge: '3 days ago',
    soundTrack: 'Creepy Medieval Hurdy Gurdy Drone',
    thumbnailColor: 'from-red-950 to-zinc-950',
    hookFormula: 'Mass Hysteria Horror Story',
    viralTranscript: `[0:00 - 0:03] In July 1518, a woman stepped into the street in Strasbourg and began dancing. She couldn’t stop.
[0:03 - 0:11] Within a week, 34 people joined her. Within a month, over 400 citizens were frantically dancing in the town square.
[0:11 - 0:21] Their feet were bleeding, their clothes torn to shreds, screaming in agony yet unable to stop moving their limbs.
[0:21 - 0:29] Up to 15 people a day collapsed and died from heart attacks and physical exhaustion.
[0:29 - 0:34] Was it ergot fungus poisoning from rye bread, or extreme mass psychogenic hysteria? History’s strangest tragedy.`,
    targetAudience: 'Medical mystery fans, dark history lovers',
    remixRecommendation: 'Show historic woodcut illustrations of Strasbourg dancers with haunting violin music.',
    brollKeywords: ['strasbourg medieval town square woodcut', 'dancing plague 1518 engraving', 'rye wheat ergot fungus']
  },
  {
    id: 'tr-70',
    rank: 70,
    title: 'The Secret Underground City In Cappadocia That Housed 20,000 People',
    channel: 'Underground Civilizations',
    channelVerified: true,
    niche: 'history-mystery',
    nicheLabel: 'History & Mystery',
    views: '4.2M',
    viewCount: 4200000,
    velocityPerHour: '+29.9K/hr',
    viralityScore: 87,
    retentionRating: 84,
    durationSeconds: 38,
    uploadAge: '3 days ago',
    soundTrack: 'Subterranean Cavern Reverb Drone',
    thumbnailColor: 'from-amber-950 to-stone-900',
    hookFormula: 'Hidden Subterranean World / Accidental Discovery',
    viralTranscript: `[0:00 - 0:03] In 1963, a Turkish man knocked down a basement wall while renovating his house and discovered this.
[0:03 - 0:12] Behind the plaster was a stone tunnel leading to Derinkuyu: an 18-story deep subterranean fortress carved into volcanic tuff.
[0:12 - 0:24] Over 20,000 early Christians could live here for months during foreign invasions without ever seeing sunlight.
[0:24 - 0:33] It had 15,000 ventilation shafts, wineries, stables, schools, and 1,000-pound stone rolling doors that could only be closed from the inside.
[0:33 - 0:38] An engineering masterpiece carved with hand chisels. Would you sleep 280 feet underground?`,
    targetAudience: 'Travelers, survivalists, ancient engineering buffs',
    remixRecommendation: 'Cutaway 3D architectural diagram of the 18 subterranean underground levels.',
    brollKeywords: ['derinkuyu underground city cappadocia', 'volcanic tuff stone rolling door', 'torchlit subterranean tunnel stairs']
  },

  // =================== 8. SPORTS & FOOTBALL (10 Items) ===================
  {
    id: 'tr-71',
    rank: 71,
    title: 'Lionel Messi Physics-Defying Free Kick: How The Ball Curved Around The Wall',
    channel: 'Futbol Physics',
    channelVerified: true,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '19.2M',
    viewCount: 19200000,
    velocityPerHour: '+132.8K/hr',
    viralityScore: 99,
    retentionRating: 98,
    durationSeconds: 33,
    uploadAge: '4 hours ago',
    soundTrack: 'Stadium Roar Chants Echo 128BPM',
    thumbnailColor: 'from-blue-950 to-sky-900',
    hookFormula: 'Slow-Motion Vector Trajectory / Magnus Effect',
    viralTranscript: `[0:00 - 0:03] Watch Messi’s plant foot closely. Human biomechanics say your ankle should snap here.
[0:03 - 0:11] His left ankle is cocked at a 50-degree outward angle, making contact with the bottom outside seam of the ball.
[0:11 - 0:21] He imparts 600 revolutions per minute of lateral spin. The Magnus effect creates high air pressure on the left, bending the trajectory around the 6-man wall.
[0:21 - 0:29] Right as the goalkeeper dives, turbulent airflow drops the ball 14 inches straight into the top right postage stamp corner.
[0:29 - 0:33] Absolute football perfection. The greatest left foot in human history!`,
    targetAudience: 'Football fans, soccer players, sports science buffs',
    remixRecommendation: 'Overlay 3D aerodynamic airflow vectors showing the high/low pressure differential.',
    brollKeywords: ['messi free kick top corner curve', 'magnus effect airflow football 3d', 'camp nou crowd stadium roar']
  },
  {
    id: 'tr-72',
    rank: 72,
    title: 'Jude Bellingham 95th Minute El Clasico Winner: The Aura Is Unreal',
    channel: 'Madridista TV',
    channelVerified: true,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '14.8M',
    viewCount: 14800000,
    velocityPerHour: '+108.5K/hr',
    viralityScore: 98,
    retentionRating: 95,
    durationSeconds: 31,
    uploadAge: '7 hours ago',
    soundTrack: 'Hey Jude Stadium Choral Remix Phonk',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Clutch Champion Mentality / Iconic Celebration',
    viralTranscript: `[0:00 - 0:03] 94 minutes and 30 seconds on the Santiago Bernabeu clock. 2-2 against Barcelona.
[0:03 - 0:10] Lucas Vazquez crosses to the back post. Bellingham doesn’t wait: he anticipates the deflection 2 steps ahead.
[0:10 - 0:19] Smashes the ball into the roof of the net past Ter Stegen with pure venom.
[0:19 - 0:27] Runs to the corner flag, spreads his arms wide, and stands motionless as 85,000 Madrid fans scream his name in unison.
[0:27 - 0:31] Jude Bellingham is only 21 years old. Generational aura. Is he winning the Ballon d’Or?`,
    targetAudience: 'Real Madrid fans, La Liga watchers, football enthusiasts',
    remixRecommendation: 'Freeze frame on arms-wide open celebration with stadium roar reverberation.',
    brollKeywords: ['jude bellingham bernabeu celebration arms', 'el clasico 95th minute winner goal', 'real madrid fans singing']
  },
  {
    id: 'tr-73',
    rank: 73,
    title: 'Erling Haaland Sprint Speed: The 6-Foot-4 Viking Running at 36 km/h',
    channel: 'Premier League Central',
    channelVerified: true,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '11.5M',
    viewCount: 11500000,
    velocityPerHour: '+82.6K/hr',
    viralityScore: 96,
    retentionRating: 93,
    durationSeconds: 35,
    uploadAge: '12 hours ago',
    soundTrack: 'Heavy Industrial Viking War Drums',
    thumbnailColor: 'from-sky-950 to-blue-950',
    hookFormula: 'Superhuman Athlete Specs / Pure Acceleration',
    viralTranscript: `[0:00 - 0:03] Center backs with a 10-yard head start look terrified. Here is why.
[0:03 - 0:11] Erling Haaland weighs 195 pounds of lean muscle and stands 6-foot-4, yet clocks a top speed of 36.2 kilometers per hour.
[0:11 - 0:22] That’s only 1.5 seconds slower than Usain Bolt’s peak split times.
[0:22 - 0:30] His stride length covers nearly 8 feet per step. When Kevin De Bruyne lofts a 40-yard through ball, Haaland covers half the pitch in 5 strides.
[0:30 - 0:35] Defending against this man is an absolute nightmare. Who can stop Manchester City?`,
    targetAudience: 'Premier League fans, fantasy football managers',
    remixRecommendation: 'Show top speed speedometer graphic climbing from 0 to 36.2 km/h in real-time.',
    brollKeywords: ['erling haaland sprint speed burst', 'manchester city counter attack goal', 'kevin de bruyne through pass']
  },
  {
    id: 'tr-74',
    rank: 74,
    title: 'The Insane Penalty Technique That Goalkeepers Cannot Stop In 2026',
    channel: 'Goalkeeper Union',
    channelVerified: false,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '8.8M',
    viewCount: 8800000,
    velocityPerHour: '+63.9K/hr',
    viralityScore: 94,
    retentionRating: 91,
    durationSeconds: 29,
    uploadAge: '16 hours ago',
    soundTrack: 'Tense Clock Tick Before Whistle',
    thumbnailColor: 'from-emerald-950 to-zinc-950',
    hookFormula: 'Penalty Mind Games / The Hop Technique',
    viralTranscript: `[0:00 - 0:03] Jorginho and Bruno Fernandes mastered this penalty hop. Why does it make goalkeepers look foolish?
[0:03 - 0:10] In a standard run-up, the keeper commits to a dive based on the kicker’s plant foot angle.
[0:10 - 0:19] But with the mid-stride skip, the kicker delays contact by 0.2 seconds while looking at the goalkeeper’s knees.
[0:19 - 0:25] The moment the keeper’s weight shifts even 2 inches to the right, the kicker rolls the ball gently into the open left corner.
[0:25 - 0:29] It’s not a shot; it’s a psychological waiting game. Should this hop be banned?`,
    targetAudience: 'Football players, goalkeepers, tactics nerds',
    remixRecommendation: 'Slow-motion close up on goalkeeper’s shifting knees at the exact moment of the hop.',
    brollKeywords: ['penalty kick hop run up', 'goalkeeper diving wrong way net', 'referee whistle penalty spot']
  },
  {
    id: 'tr-75',
    rank: 75,
    title: 'Ronaldinho Joga Bonito: When Real Madrid Fans Stood Up To Applaud Him',
    channel: 'Classic Footy Vault',
    channelVerified: true,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '7.9M',
    viewCount: 7900000,
    velocityPerHour: '+56.4K/hr',
    viralityScore: 93,
    retentionRating: 90,
    durationSeconds: 37,
    uploadAge: '1 day ago',
    soundTrack: 'Samba Brazilian Batucada Drums',
    thumbnailColor: 'from-red-950 to-blue-950',
    hookFormula: 'Historic Sports Respect / Unmatched Magic',
    viralTranscript: `[0:00 - 0:03] Only two Barcelona players in history ever received a standing ovation inside the Santiago Bernabeu.
[0:03 - 0:11] On November 19, 2005, Ronaldinho put on the most joyful display of pure football wizardry ever witnessed.
[0:11 - 0:22] He picked up the ball on the halfway line, danced past Sergio Ramos like he wasn’t there, and slotted past Iker Casillas with a smile on his face.
[0:22 - 0:32] After his second solo masterclass, die-hard Madrid fans wearing white jerseys stood up and clapped with tears in their eyes.
[0:32 - 0:37] Pure respect above rivalry. Football will never see another Ronaldinho. Agree or disagree?`,
    targetAudience: 'Nostalgic soccer fans, Brazilian football lovers',
    remixRecommendation: 'Contrast the fierce rivalry atmosphere with the standing ovation clapping shots.',
    brollKeywords: ['ronaldinho bernabeu standing ovation', 'barcelona el clasico 2005 dribble', 'sergio ramos beaten solo run']
  },
  {
    id: 'tr-76',
    rank: 76,
    title: 'Why NFL Punters Are Secretly The Most Accurate Kickers On Planet Earth',
    channel: 'Gridiron Science',
    channelVerified: false,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '6.4M',
    viewCount: 6400000,
    velocityPerHour: '+45.8K/hr',
    viralityScore: 91,
    retentionRating: 88,
    durationSeconds: 32,
    uploadAge: '1 day ago',
    soundTrack: 'Stadium Brass Marching Band Hype',
    thumbnailColor: 'from-amber-950 to-green-950',
    hookFormula: 'Hidden Athletic Mastermind / Coffin Corner Kicks',
    viralTranscript: `[0:00 - 0:03] Everyone ignores punters until you see them drop a leather football onto a 1-yard line from 65 yards away.
[0:03 - 0:10] An NFL ‘coffin corner’ punt requires kicking an oblong leather ball with backwards spiral aerodynamics.
[0:10 - 0:20] When the ball bounces, the backspin causes it to check up like a golf ball on a putting green, dying at the 1-inch line before the endzone.
[0:20 - 0:28] This forces the opposing team’s quarterback to start their drive backed up against their own goalpost.
[0:28 - 0:32] Field position wins championships. Respect the specialists!`,
    targetAudience: 'NFL fans, college football lovers, kicking specialists',
    remixRecommendation: 'Super slow-motion of the oblong ball hitting turf and spinning backwards dead on the 1-yard line.',
    brollKeywords: ['nfl punter spiral kick hangtime', 'football bouncing coffin corner 1 yard', 'special teams coverage tackle']
  },
  {
    id: 'tr-77',
    rank: 77,
    title: 'The Yellow Wall At Signal Iduna Park: 25,000 Fans Jumping In Synchronization',
    channel: 'Ultras Europe',
    channelVerified: true,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '5.7M',
    viewCount: 5700000,
    velocityPerHour: '+40.6K/hr',
    viralityScore: 90,
    retentionRating: 87,
    durationSeconds: 34,
    uploadAge: '2 days ago',
    soundTrack: 'Borussia Dortmund Stadium Chants Loud',
    thumbnailColor: 'from-yellow-950 to-zinc-950',
    hookFormula: 'Terrifying Stadium Atmosphere / Structural Resonance',
    viralTranscript: `[0:00 - 0:03] Opposing players say walking out of the tunnel at Dortmund feels like entering an earthquake epicenter.
[0:03 - 0:11] The Südtribüne at Signal Iduna Park is the largest free-standing grandstand terrace in Europe: 25,000 standing supporters packed wall-to-wall.
[0:11 - 0:22] When the entire terrace bounces in unison to the drums, structural sensors register seismic tremors up to 1.5 on the Richter scale.
[0:22 - 0:30] The noise decibel level reaches 130 dB: louder than a military jet engine takeoff.
[0:30 - 0:34] Real football culture lives in the terraces. Have you ever experienced the Yellow Wall?`,
    targetAudience: 'Bundesliga fans, European football tourists, groundhoppers',
    remixRecommendation: 'Camera shaking in rhythm with the jumping yellow sea of Dortmund flags.',
    brollKeywords: ['dortmund yellow wall sudtribune jumping', 'signal iduna park tifos smoke', 'champions league anthem dortmund']
  },
  {
    id: 'tr-78',
    rank: 78,
    title: 'How Stephen Curry Changed The Entire Game Of Basketball In 5 Years',
    channel: 'Hoop Breakdown',
    channelVerified: true,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '5.2M',
    viewCount: 5200000,
    velocityPerHour: '+37.1K/hr',
    viralityScore: 89,
    retentionRating: 86,
    durationSeconds: 38,
    uploadAge: '2 days ago',
    soundTrack: 'Fast Trap Beat Swish Sound FX',
    thumbnailColor: 'from-blue-950 to-amber-950',
    hookFormula: 'Sport Evolution Paradigm Shift / 3-Point Revolution',
    viralTranscript: `[0:00 - 0:03] Before 2015, if you pulled up for a 35-foot three-pointer on a fast break, your coach would bench you for the entire season.
[0:03 - 0:12] Then Steph Curry proved that 3 points on 43% shooting beats 2 points at 50% shooting every single game mathematically.
[0:12 - 0:24] In 2004, NBA teams averaged twelve 3-point attempts per game. Today, teams take over forty-two.
[0:24 - 0:34] Centers who couldn’t shoot outside the paint were forced out of the league, while 7-footers now train step-back corner threes like guards.
[0:34 - 0:38] One man permanently stretched the 94-foot court. Steph Curry is a basketball revolutionary!`,
    targetAudience: 'NBA fans, basketball players, sports analytics buffs',
    remixRecommendation: 'Shot chart graphic expanding outward beyond the arc from 2004 to 2026.',
    brollKeywords: ['stephen curry deep 3 point swish', 'golden state warriors chase center', 'nba shot chart analytics evolution']
  },
  {
    id: 'tr-79',
    rank: 79,
    title: 'The Boxing Counter-Punch That Knocked Out Prime Mike Tyson',
    channel: 'Sweet Science Vault',
    channelVerified: false,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '4.8M',
    viewCount: 4800000,
    velocityPerHour: '+34.3K/hr',
    viralityScore: 88,
    retentionRating: 85,
    durationSeconds: 35,
    uploadAge: '3 days ago',
    soundTrack: 'Heavy Boxing Glove Thud Reverb',
    thumbnailColor: 'from-red-950 to-zinc-950',
    hookFormula: 'Tokyo 1990 Upset / The Buster Douglas Combination',
    viralTranscript: `[0:00 - 0:03] Mike Tyson was 37-0 with 33 knockouts. Vegas bookmakers had Buster Douglas at 42-to-1 odds.
[0:03 - 0:11] In Tokyo in 1990, Douglas didn’t back down from Tyson’s peek-a-boo bob-and-weave aggression.
[0:11 - 0:22] In round 10, Tyson lunged forward with a reckless left hook. Douglas slipped 3 inches to his right, loading his hips.
[0:22 - 0:30] He unleashed a devastating 4-punch combination capped by a flush right uppercut that sent Tyson’s mouthpiece flying into row 3.
[0:30 - 0:35] Tyson scrambling on his knees trying to find his mouthpiece. The greatest upset in boxing history!`,
    targetAudience: 'Boxing fans, combat sports lovers, underdog story fans',
    remixRecommendation: 'Slow-motion impact of the uppercut with the flying mouthpiece.',
    brollKeywords: ['mike tyson buster douglas tokyo 1990', 'heavyweight boxing uppercut knockout', 'referee ten count canvas']
  },
  {
    id: 'tr-80',
    rank: 80,
    title: 'Why Penalty Shootouts Should Be Replaced By The 1996 MLS 35-Yard Run-Up',
    channel: 'Retro Football Nostalgia',
    channelVerified: true,
    niche: 'sports-football',
    nicheLabel: 'Sports & Football',
    views: '4.3M',
    viewCount: 4300000,
    velocityPerHour: '+30.8K/hr',
    viralityScore: 87,
    retentionRating: 84,
    durationSeconds: 31,
    uploadAge: '3 days ago',
    soundTrack: '90s Funky Electronic Synth Groove',
    thumbnailColor: 'from-indigo-950 to-zinc-900',
    hookFormula: 'Radical Rule Innovation / High Octane Action',
    viralTranscript: `[0:00 - 0:03] Penalty shootouts from 12 yards are a coin flip. The 1996 MLS shootout was 100 times better.
[0:03 - 0:10] The player started with the ball on the 35-yard line and had exactly 5 seconds to beat the goalkeeper 1-on-1.
[0:10 - 0:20] The keeper could charge off his line, slide tackle, or cut down the shooting angle. The attacker could chip, step-over, or round the keeper.
[0:20 - 0:27] It tested real football skill, reflexes, and composure under pressure instead of a pure guessing game.
[0:27 - 0:31] Should FIFA bring back the 35-yard shootout? Drop a YES or NO below!`,
    targetAudience: 'MLS fans, soccer reform enthusiasts, casual viewers',
    remixRecommendation: 'Show dramatic clips of keepers lunging for the ball while the clock ticks 5-4-3-2-1.',
    brollKeywords: ['mls 1996 35 yard shootout 1v1', 'goalkeeper slide tackle breakaway', '5 second countdown buzzer']
  },

  // =================== 9. LUXURY & SUPERCARS (10 Items) ===================
  {
    id: 'tr-81',
    rank: 81,
    title: 'Bugatti Tourbillon 1,800 HP V16 Engine Startup Sound: Pure Mechanical Masterpiece',
    channel: 'Hypercar Sound Lab',
    channelVerified: true,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '18.1M',
    viewCount: 18100000,
    velocityPerHour: '+126.1K/hr',
    viralityScore: 99,
    retentionRating: 97,
    durationSeconds: 36,
    uploadAge: '5 hours ago',
    soundTrack: 'Naturally Aspirated V16 Exhaust Screamer',
    thumbnailColor: 'from-blue-950 to-zinc-900',
    hookFormula: 'Unfiltered Audio Orgasm / Swiss Horology Dashboard',
    viralTranscript: `[0:00 - 0:03] Turn your volume all the way up right now. This is a naturally aspirated 8.3-liter V16 engine.
[0:03 - 0:12] Mate Rimac didn’t put turbochargers on Bugatti’s new $4.1 million hypercar. It revs to 9,000 RPM developed alongside Cosworth.
[0:12 - 0:24] Listen to that violent metallic cold start exhaust note. Combined with 3 electric motors, it pushes 1,800 horsepower and launches 0 to 60 in 2.0 seconds flat.
[0:24 - 0:32] Look at the instrument cluster: zero digital screens. It is constructed by Swiss watchmakers with over 600 titanium and sapphire gears.
[0:32 - 0:36] Pure rolling art in an era of boring iPads on wheels. Is this the greatest car of the decade?`,
    targetAudience: 'Supercar enthusiasts, car collectors, luxury lifestyle followers',
    remixRecommendation: 'Let the raw V16 rev sound play isolated for 3 seconds without background music.',
    brollKeywords: ['bugatti tourbillon v16 engine rev', 'swiss horology skeleton instrument cluster', 'hypercar acceleration launch']
  },
  {
    id: 'tr-82',
    rank: 82,
    title: 'The Koenigsegg Jesko Gearbox That Shifts In Zero Milliseconds',
    channel: 'AeroSupercars',
    channelVerified: true,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '13.7M',
    viewCount: 13700000,
    velocityPerHour: '+96.2K/hr',
    viralityScore: 97,
    retentionRating: 95,
    durationSeconds: 34,
    uploadAge: '9 hours ago',
    soundTrack: 'Pneumatic Gear Shift Click Rapid',
    thumbnailColor: 'from-emerald-950 to-zinc-900',
    hookFormula: 'Engineering Supremacy / Light Speed Transmission',
    viralTranscript: `[0:00 - 0:03] Christian von Koenigsegg threw out the dual-clutch transmission because it was too slow.
[0:03 - 0:11] In the Jesko, he engineered the LST: Light Speed Transmission. It uses nine forward gears and seven wet multi-disc clutches.
[0:11 - 0:22] In standard gearboxes, shifting from 7th to 4th gear requires cycling through 6th and 5th first.
[0:22 - 0:30] The Jesko’s algorithm can drop straight from 7th to 4th gear in virtually zero milliseconds, with zero lag and zero torque interruption.
[0:30 - 0:34] Koenigsegg isn’t building cars; they are engineering aerospace fighter jets for the road. Respect!`,
    targetAudience: 'Mechanical engineers, Koenigsegg fans, track day drivers',
    remixRecommendation: 'Show transparent 3D animation of the 7 clutches engaging simultaneously.',
    brollKeywords: ['koenigsegg jesko light speed transmission', 'carbon fiber hypercar interior shifting', 'top speed runway 300mph']
  },
  {
    id: 'tr-83',
    rank: 83,
    title: 'Inside A $150,000,000 Superyacht With A Submarine Hangar',
    channel: 'Billionaire Toys',
    channelVerified: true,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '10.2M',
    viewCount: 10200000,
    velocityPerHour: '+73.5K/hr',
    viralityScore: 95,
    retentionRating: 92,
    durationSeconds: 40,
    uploadAge: '14 hours ago',
    soundTrack: 'Sophisticated Luxury Lounge Beat',
    thumbnailColor: 'from-sky-950 to-blue-900',
    hookFormula: 'Insane Ultra-Wealth Flex / James Bond Tech',
    viralTranscript: `[0:00 - 0:03] This 300-foot mega yacht burns $12,000 in diesel fuel every single day at anchor.
[0:03 - 0:13] The master stateroom has fold-out hydraulic teak sea balconies and a king-sized mattress padded with real Mongolian cashmere.
[0:13 - 0:25] But the craziest feature is beneath the aft deck: a submerged floodable tender bay housing a 3-person Triton personal submarine.
[0:25 - 0:35] The owner can board the sub inside the air-conditioned yacht garage, submerge 1,000 feet deep into Caribbean coral reefs, and return without getting wet.
[0:35 - 0:40] Real James Bond villain lifestyle. Would you spend your millions on this?`,
    targetAudience: 'Luxury seekers, yachting fans, wealth aspirers',
    remixRecommendation: 'Show the hydraulic tender garage doors opening underwater as the sub departs.',
    brollKeywords: ['mega yacht floodable tender garage', 'triton personal submarine underwater', 'helipad ocean sunset yacht deck']
  },
  {
    id: 'tr-84',
    rank: 84,
    title: 'Rolls Royce Starlight Headliner: The 1,600 Hand-Woven Fiber Optic Stars',
    channel: 'Craftsmanship Daily',
    channelVerified: false,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '8.5M',
    viewCount: 8500000,
    velocityPerHour: '+60.8K/hr',
    viralityScore: 93,
    retentionRating: 90,
    durationSeconds: 32,
    uploadAge: '1 day ago',
    soundTrack: 'Ethereal Ambient Chimes Crystal Clear',
    thumbnailColor: 'from-purple-950 to-zinc-950',
    hookFormula: 'Obsessive Luxury Handcraft / Shooting Star Option',
    viralTranscript: `[0:00 - 0:03] This single option on a Rolls-Royce Phantom costs more than a brand-new Honda Civic.
[0:03 - 0:10] The Starlight Headliner takes two master craftsmen over 17 hours of meticulous hand-assembly in Goodwood.
[0:10 - 0:20] They punch up to 1,600 individual holes through premium perforated leather and weave fiber optic cables by hand at varying angles.
[0:20 - 0:28] The light reflects at different depths to replicate the exact constellation of the night sky over your birthplace on your birthday.
[0:28 - 0:32] It even has randomized shooting stars that streak across the ceiling every few minutes. Unmatched luxury.`,
    targetAudience: 'Luxury connoisseurs, Rolls-Royce fans, detail perfectionists',
    remixRecommendation: 'Close-up slow motion of a fiber optic shooting star streaking across black leather ceiling.',
    brollKeywords: ['rolls royce starlight headliner shooting star', 'goodwood craftsmanship leather perforation', 'phantom luxury back seat champagne']
  },
  {
    id: 'tr-85',
    rank: 85,
    title: 'Why Ferrari Will Literally Sue You If You Modify Their Supercars',
    channel: 'Car Culture Legal',
    channelVerified: true,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '7.8M',
    viewCount: 7800000,
    velocityPerHour: '+55.1K/hr',
    viralityScore: 92,
    retentionRating: 89,
    durationSeconds: 37,
    uploadAge: '1 day ago',
    soundTrack: 'Aggressive Cyberpunk Trap Beat',
    thumbnailColor: 'from-red-950 to-zinc-900',
    hookFormula: 'Corporate Cease & Desist Drama / Billionaire Blacklist',
    viralTranscript: `[0:00 - 0:03] Even if you pay $400,000 in cash, Ferrari does NOT consider you the true owner of their car.
[0:03 - 0:11] When DJ Deadmau5 wrapped his 458 Italia in a baby-blue Nyan Cat theme named the ‘Purrari’ with custom cat floor mats:
[0:11 - 0:22] Ferrari North America’s legal team sent a formal cease-and-desist letter threatening trademark lawsuits unless he removed all custom badges.
[0:22 - 0:31] Celebrity fashion designer Philipp Plein also got sued for posing his shoes on his own 812 Superfast on Instagram.
[0:31 - 0:37] Ferrari blacklists owners who violate their strict brand image rules. Is this extreme arrogance or brand protection?`,
    targetAudience: 'Car guys, tuner community, trademark lawyers',
    remixRecommendation: 'Show side-by-side: Deadmau5 Purrari vs the angry Ferrari legal letter header.',
    brollKeywords: ['ferrari 458 italia custom wrap', 'deadmau5 purrari badge', 'ferrari prancing horse logo chrome']
  },
  {
    id: 'tr-86',
    rank: 86,
    title: 'The Armored Mercedes-Maybach S680 That Can Survive 15kg Of TNT',
    channel: 'Armored Fleet',
    channelVerified: false,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '6.7M',
    viewCount: 6700000,
    velocityPerHour: '+47.6K/hr',
    viralityScore: 91,
    retentionRating: 88,
    durationSeconds: 35,
    uploadAge: '2 days ago',
    soundTrack: 'Tense Action Movie Bass Pulse',
    thumbnailColor: 'from-zinc-950 to-slate-900',
    hookFormula: 'Presidential Armored Fortress Specs',
    viralTranscript: `[0:00 - 0:03] This looks like an ordinary luxury limousine, but it weighs nearly 11,000 pounds.
[0:03 - 0:11] The Maybach S680 Guard is VR10 certified: the highest ballistic protection rating achievable in a civilian vehicle.
[0:11 - 0:21] The multi-layer polycarbonate glass is 4 inches thick. It can withstand point-blank armor-piercing rounds from an AK-47 assault rifle.
[0:21 - 0:30] Its underbody armor deflects a simultaneous blast from two DM51 hand grenades and 15 kilos of TNT detonated directly beneath the floor.
[0:30 - 0:35] It even has onboard oxygen tanks to withstand chemical gas attacks. The ultimate VIP shield.`,
    targetAudience: 'Bodyguards, security specialists, luxury car buffs',
    remixRecommendation: 'Show bullet impacts bouncing off 4-inch thick glass with zero penetration.',
    brollKeywords: ['mercedes maybach guard ballistic glass', 'bulletproof armored door heavy hinge', 'tnt blast floor defense test']
  },
  {
    id: 'tr-87',
    rank: 87,
    title: 'Pagani Huayra Active Aerodynamics: Flaps Moving Like Airplane Wings',
    channel: 'AeroDynamics Lab',
    channelVerified: true,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '6.0M',
    viewCount: 6000000,
    velocityPerHour: '+42.5K/hr',
    viralityScore: 90,
    retentionRating: 87,
    durationSeconds: 31,
    uploadAge: '2 days ago',
    soundTrack: 'Fast Sweeping Synth Whoosh',
    thumbnailColor: 'from-amber-950 to-zinc-950',
    hookFormula: 'Horacio Pagani Sculpture in Motion',
    viralTranscript: `[0:00 - 0:03] Notice the four independent carbon fiber flaps on the front and rear of the Pagani Huayra?
[0:03 - 0:10] Horacio Pagani designed them after the wing flaps of a supersonic jet.
[0:10 - 0:19] A dedicated ECU constantly reads steering angle, yaw rate, lateral G-forces, and throttle position.
[0:19 - 0:26] When you turn hard into a sharp left hairpin corner, the inside flaps raise up to create asymmetric downforce, keeping the car dead flat.
[0:26 - 0:31] Under emergency braking from 180 mph, all four flaps pop vertical like airbrakes. Pure kinetic sculpture!`,
    targetAudience: 'Track drivers, hypercar fans, aerodynamicists',
    remixRecommendation: 'Slow-motion rear view of flaps dynamically dancing during hard braking.',
    brollKeywords: ['pagani huayra active aero flaps moving', 'carbon titanium weave chassis', 'horacio pagani art studio modena']
  },
  {
    id: 'tr-88',
    rank: 88,
    title: 'Why The McLaren F1 Center Driving Position Will Never Be Replaced',
    channel: 'Iconic Supercars',
    channelVerified: false,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '5.3M',
    viewCount: 5300000,
    velocityPerHour: '+37.9K/hr',
    viralityScore: 89,
    retentionRating: 86,
    durationSeconds: 33,
    uploadAge: '2 days ago',
    soundTrack: 'BMW V12 Naturally Aspirated Screamer',
    thumbnailColor: 'from-orange-950 to-zinc-950',
    hookFormula: 'Gordon Murray Genius / Pure Fighter Cockpit',
    viralTranscript: `[0:00 - 0:03] In 1992, Gordon Murray designed a supercar with gold foil in the engine bay and a steering wheel dead in the center.
[0:03 - 0:11] By placing the driver in the exact middle of the chassis, your sightlines to both apexes are 100% symmetrical.
[0:11 - 0:21] There is zero pedal offset, zero blind spot distortion, and passenger seats are tucked behind your shoulders like fighter jet navigators.
[0:21 - 0:29] With a naturally aspirated BMW V12, a manual 6-speed shifter, and zero driver aids, it hit 240 mph with no turbochargers.
[0:29 - 0:33] Today, one is worth over $22 million. The greatest driver’s car in human history!`,
    targetAudience: 'Purist car collectors, Gordon Murray fans, manual enthusiasts',
    remixRecommendation: 'Show POV cockpit view looking forward with symmetrical visibility out the windshield.',
    brollKeywords: ['mclaren f1 center seat cockpit', 'gold leaf heat shield engine bay', 'gordon murray analog supercar']
  },
  {
    id: 'tr-89',
    rank: 89,
    title: 'Inside The Most Expensive Private Jet Cabin In The World: Bombardier Global 7500',
    channel: 'PrivateAviation VIP',
    channelVerified: true,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '4.7M',
    viewCount: 4700000,
    velocityPerHour: '+33.6K/hr',
    viralityScore: 88,
    retentionRating: 85,
    durationSeconds: 38,
    uploadAge: '3 days ago',
    soundTrack: 'Smooth Jazz Saxophone First Class',
    thumbnailColor: 'from-slate-950 to-amber-950',
    hookFormula: 'Billionaire Aviation Luxury / Ultra-Long Range',
    viralTranscript: `[0:00 - 0:03] Flying commercial first class is for tourists. This is how sovereign wealth heads travel.
[0:03 - 0:12] The Bombardier Global 7500 has a range of 7,700 nautical miles, flying non-stop from New York to Hong Kong without refueling.
[0:12 - 0:24] The cabin is divided into four true living zones, including a master suite with a permanent king bed and stand-up stand shower.
[0:24 - 0:33] Its patented Nuage seating tilts seamlessly into a zero-gravity posture to eliminate deep-vein thrombosis during 16-hour transoceanic flights.
[0:33 - 0:38] Price tag: $78 million before custom diamond stitch leather. Worth every penny?`,
    targetAudience: 'Private jet flyers, luxury lifestyle watchers',
    remixRecommendation: 'Walkthrough from the private chef galley into the master stateroom shower suite.',
    brollKeywords: ['bombardier global 7500 private jet cabin', 'zero gravity nuage seat recline', 'transoceanic flight sunset clouds']
  },
  {
    id: 'tr-90',
    rank: 90,
    title: 'Why Watch Enthusiasts Spend $250,000 On A Richard Mille Made Of Carbon',
    channel: 'Horology Unlocked',
    channelVerified: true,
    niche: 'luxury-cars',
    nicheLabel: 'Luxury & Supercars',
    views: '4.3M',
    viewCount: 4300000,
    velocityPerHour: '+30.5K/hr',
    viralityScore: 87,
    retentionRating: 84,
    durationSeconds: 34,
    uploadAge: '3 days ago',
    soundTrack: 'Modern Trap Percussion Metallic Snare',
    thumbnailColor: 'from-red-950 to-black',
    hookFormula: 'Billionaire Wrist Badge / Extreme G-Force Shock Test',
    viralTranscript: `[0:00 - 0:03] It looks like a plastic toy from a vending machine, but rappers and F1 drivers pay $300,000 for it.
[0:03 - 0:11] Richard Mille timepieces aren’t precious metal gold or platinum. They are crafted from Carbon TPT and grade 5 titanium.
[0:11 - 0:22] Rafael Nadal wears his RM 27-04 during Grand Slam finals while hitting 130 mph forehands.
[0:22 - 0:29] The entire tourbillon movement is suspended on microscopic braided steel cables capable of withstanding 12,000 Gs of shock force.
[0:29 - 0:34] It weighs only 30 grams including the strap. It’s not a watch; it’s a billionaire membership badge!`,
    targetAudience: 'Watch collectors, tennis fans, hip-hop culture followers',
    remixRecommendation: 'Show Rafael Nadal sweating while crushing a forehand with the tourbillon ticking on his wrist.',
    brollKeywords: ['richard mille nadal tourbillon suspended', 'carbon tpt case high torque', 'f1 driver wrist timekeeper']
  },

  // =================== 10. PSYCHOLOGY & MINDSET (10 Items) ===================
  {
    id: 'tr-91',
    rank: 91,
    title: '3 Psychological Cues That Instantly Expose A Liar In 5 Seconds',
    channel: 'Behavioral Profiler',
    channelVerified: true,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '16.7M',
    viewCount: 16700000,
    velocityPerHour: '+117.2K/hr',
    viralityScore: 99,
    retentionRating: 96,
    durationSeconds: 36,
    uploadAge: '6 hours ago',
    soundTrack: 'Dark Mystery Suspense Piano Ticking',
    thumbnailColor: 'from-indigo-950 to-zinc-950',
    hookFormula: 'FBI Interrogation Secrets / Micro-Expressions',
    viralTranscript: `[0:00 - 0:03] FBI interrogation officers look for these 3 involuntary micro-expressions. Keep this in mind during hard conversations.
[0:03 - 0:12] One: The blink rate freeze. When people construct an elaborate false story, cognitive load spikes. Their blink rate drops to zero, followed by a rapid flutter of blinks once the lie is delivered.
[0:12 - 0:23] Two: Chronological rigidity. Liars practice their narrative forward: ‘I woke up, went to the gym, then ate lunch.’ If you ask them to recite events in reverse, their story disintegrates.
[0:23 - 0:31] Three: Incongruent head shake. If someone says ‘I would never do that’ while making a subtle microscopic nod, believe the body, not the vocal cords.
[0:31 - 0:36] Human psychology never lies. Have you noticed these before?`,
    targetAudience: 'Psychology enthusiasts, negotiators, everyday communicators',
    remixRecommendation: 'Demonstrate each cue with an actor in split-screen zoom on eyes and head tilt.',
    brollKeywords: ['fbi interrogation room one way mirror', 'eye pupil dilation micro expression', 'lie detector polygraph test pen']
  },
  {
    id: 'tr-92',
    rank: 92,
    title: 'The 2-Minute Dopamine Reset: How To Kill Procrastination Instantly',
    channel: 'NeuroHacker Lab',
    channelVerified: true,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '12.9M',
    viewCount: 12900000,
    velocityPerHour: '+91.5K/hr',
    viralityScore: 97,
    retentionRating: 94,
    durationSeconds: 34,
    uploadAge: '10 hours ago',
    soundTrack: 'Deep Focus Alpha Waves 10Hz Binaural',
    thumbnailColor: 'from-purple-950 to-blue-950',
    hookFormula: 'Friction Reduction Protocol / Cognitive Momentum',
    viralTranscript: `[0:00 - 0:03] You are not lazy. Your brain is trapped in a dopamine gradient loop. Here is the escape hatch.
[0:03 - 0:11] Procrastination isn’t a character flaw; it’s your prefrontal cortex avoiding an emotional threat of friction or perfectionism.
[0:11 - 0:22] Use the 2-Minute Micro-Commitment: tell yourself you only have to open the document and write 1 single sentence. After 120 seconds, you are legally allowed to quit.
[0:22 - 0:30] 90% of the time, overcoming activation energy triggers psychological momentum, and you stay focused for the next 45 minutes effortlessly.
[0:30 - 0:34] Stop fighting the whole mountain. Just lace up your shoes. Follow for focus hacks!`,
    targetAudience: 'Students, entrepreneurs, remote workers with ADHD tendencies',
    remixRecommendation: 'Show a visual friction threshold diagram: huge spike at start, then flat cruising line.',
    brollKeywords: ['laptop screen empty blank cursor', 'dopamine brain reward pathway 3d', 'stopwatch 2 minute timer focus']
  },
  {
    id: 'tr-93',
    rank: 93,
    title: 'Dark Psychology: How Toxic People Use Triangulation To Control You',
    channel: 'Mind Shield',
    channelVerified: false,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '9.4M',
    viewCount: 9400000,
    velocityPerHour: '+67.3K/hr',
    viralityScore: 95,
    retentionRating: 92,
    durationSeconds: 38,
    uploadAge: '15 hours ago',
    soundTrack: 'Ominous Drone Eerie Cello',
    thumbnailColor: 'from-red-950 to-zinc-950',
    hookFormula: 'Manipulative Dynamic Exposure / Self-Defense',
    viralTranscript: `[0:00 - 0:03] If someone constantly brings a third person into your private arguments, you are being manipulated.
[0:03 - 0:12] It’s called psychological triangulation. Instead of addressing the conflict directly, a narcissist manufactures an insecure dynamic:
[0:12 - 0:24] ‘Even my coworker thinks you overreact’, or ‘My ex never made an issue out of this.’
[0:24 - 0:33] This forces you to compete for their approval against an imaginary rival, diverting focus away from their accountability.
[0:33 - 0:38] Do not engage with the third party. State clearly: ‘This conversation is only between you and me.’ Protect your peace!`,
    targetAudience: 'People dealing with toxic relationships, psychology students',
    remixRecommendation: 'Diagram the toxic triangle of victim, manipulator, and fabricated rival.',
    brollKeywords: ['two people arguing distance shadow', 'toxic text messages notification', 'psychological chess pieces board']
  },
  {
    id: 'tr-94',
    rank: 94,
    title: 'The Charisma Rule: How High-Status People Never Finish Other People’s Sentences',
    channel: 'Charisma Blueprint',
    channelVerified: true,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '8.1M',
    viewCount: 8100000,
    velocityPerHour: '+57.8K/hr',
    viralityScore: 93,
    retentionRating: 90,
    durationSeconds: 31,
    uploadAge: '1 day ago',
    soundTrack: 'Smooth Lo-Fi Hip Hop Chill Instrumental',
    thumbnailColor: 'from-amber-950 to-zinc-900',
    hookFormula: 'Social Status Subtleties / Conversational Power',
    viralTranscript: `[0:00 - 0:03] Eager, nervous people jump in to finish other people’s sentences. High-status people do the exact opposite.
[0:03 - 0:10] When someone stops talking, wait two full seconds before you begin your response.
[0:10 - 0:20] This 2-second pause communicates 3 unconscious things: you are comfortable with silence, you actually listened instead of waiting to speak, and you are not desperate for social validation.
[0:20 - 0:27] It immediately shifts conversational gravity toward you, making your words carry twice the weight.
[0:27 - 0:31] Master the pause. Share this with someone preparing for an interview!`,
    targetAudience: 'Introverts, public speakers, corporate executives',
    remixRecommendation: 'Demonstrate the difference with a 2-second on-screen pause timer during conversation.',
    brollKeywords: ['confident executive speaking podium', 'conversational eye contact pause', 'coffee meeting two businessmen']
  },
  {
    id: 'tr-95',
    rank: 95,
    title: 'Why Highly Intelligent People Feel So Lonely: The Dunning-Kruger Inversion',
    channel: 'Deep Thinker Lab',
    channelVerified: true,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '7.3M',
    viewCount: 7300000,
    velocityPerHour: '+52.2K/hr',
    viralityScore: 92,
    retentionRating: 89,
    durationSeconds: 41,
    uploadAge: '1 day ago',
    soundTrack: 'Melancholic Ambient Piano Solo',
    thumbnailColor: 'from-blue-950 to-slate-900',
    hookFormula: 'Validating Intellectual Isolation / Psychological Reality',
    viralTranscript: `[0:00 - 0:03] If you constantly feel disconnected from people around you, this is the psychological reason why.
[0:03 - 0:13] The average conversation revolves around gossip, immediate consumer drama, and surface-level small talk.
[0:13 - 0:26] But hyper-analytical brains crave abstract pattern recognition: macro-economics, the nature of consciousness, and existential philosophy.
[0:26 - 0:36] When you try to share deep ideas, people look at you like you are speaking Latin. You start filtering yourself, living behind a polite social mask.
[0:36 - 0:41] You are not weird or broken. You just haven’t found your tribe yet. You are not alone!`,
    targetAudience: 'Deep thinkers, introverts, overthinkers',
    remixRecommendation: 'Visual of a silhouette walking through a busy crowd with contrasting floating constellations.',
    brollKeywords: ['lone figure walking busy subway', 'abstract neural patterns glowing', 'night window rain reflection thoughtful']
  },
  {
    id: 'tr-96',
    rank: 96,
    title: 'The Psychological Reason You Can’t Say No: The Fawn Trauma Response',
    channel: 'Therapy Essentials',
    channelVerified: false,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '6.6M',
    viewCount: 6600000,
    velocityPerHour: '+47.1K/hr',
    viralityScore: 91,
    retentionRating: 88,
    durationSeconds: 35,
    uploadAge: '2 days ago',
    soundTrack: 'Warm Reassuring Acoustic Fingerpicking',
    thumbnailColor: 'from-teal-950 to-zinc-900',
    hookFormula: 'Compassionate Trauma Breakthrough / People-Pleasing',
    viralTranscript: `[0:00 - 0:03] You are not ‘too nice’. You have an unconscious nervous system survival program called Fawning.
[0:03 - 0:11] Everyone knows Fight, Flight, and Freeze. But Pete Walker identified the fourth response: Fawn.
[0:11 - 0:22] If you grew up in an unpredictable household, your subconscious learned that the only way to avoid anger or abandonment was to anticipate everyone’s emotional needs before your own.
[0:22 - 0:31] You say ‘sorry’ when someone bumps into you. You burn out doing favors you secretly despise.
[0:31 - 0:35] Saying ‘No’ isn’t selfish; it’s setting a boundary so you can finally be yourself. Save this reminder!`,
    targetAudience: 'People-pleasers, empaths, mental health advocates',
    remixRecommendation: 'Show person holding overflowing plates of favors, dropping them to take a deep calm breath.',
    brollKeywords: ['exhausted person holding coffee cup', 'boundaries therapeutic journal writing', 'peaceful forest walk mindful breathing']
  },
  {
    id: 'tr-97',
    rank: 97,
    title: 'Cognitive Dissonance Trap: Why People Defend Beliefs Even When Proven Wrong',
    channel: 'Mental Frameworks',
    channelVerified: true,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '5.9M',
    viewCount: 5900000,
    velocityPerHour: '+41.9K/hr',
    viralityScore: 90,
    retentionRating: 87,
    durationSeconds: 37,
    uploadAge: '2 days ago',
    soundTrack: 'Eerie Glitch Electronic Beat',
    thumbnailColor: 'from-amber-950 to-red-950',
    hookFormula: 'Leon Festinger’s Cult Paradox',
    viralTranscript: `[0:00 - 0:03] When you show someone undeniable facts that prove their political hero or guru lied, why do they double down?
[0:03 - 0:12] In 1956, psychologist Leon Festinger infiltrated a doomsday cult that prophesied a flying saucer would rescue them from a world-ending flood on December 21.
[0:12 - 0:24] When midnight arrived and nothing happened, did they admit they were wrong? No.
[0:24 - 0:32] The leader claimed their collective faith had saved the entire planet, and the cult became ten times more fanatical!
[0:32 - 0:37] When reality threatens our identity, the human brain would rather deny reality than feel stupid. Fascinating psychology!`,
    targetAudience: 'Skeptics, psychology students, debate enthusiasts',
    remixRecommendation: 'Show calendar ticking past midnight to 12:01 AM with cult followers suddenly rejoicing.',
    brollKeywords: ['doomsday cult waiting night sky', 'newspaper headline hoax debunked', 'cognitive dissonance brain clash graphic']
  },
  {
    id: 'tr-98',
    rank: 98,
    title: 'The Spot-Light Effect: Nobody Is Actually Looking At Your Imperfections',
    channel: 'Confidence Code',
    channelVerified: false,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '5.1M',
    viewCount: 5100000,
    velocityPerHour: '+36.4K/hr',
    viralityScore: 89,
    retentionRating: 86,
    durationSeconds: 30,
    uploadAge: '2 days ago',
    soundTrack: 'Upbeat Indie Pop Acoustic',
    thumbnailColor: 'from-yellow-950 to-zinc-900',
    hookFormula: 'Liberating Social Truth / Cornell University T-Shirt Test',
    viralTranscript: `[0:00 - 0:03] You spent 20 minutes worrying about a tiny coffee stain on your shirt. Here is the reality.
[0:03 - 0:10] In a famous Cornell study, students were forced to wear an embarrassing Barry Manilow t-shirt into a crowded lecture hall.
[0:10 - 0:19] The wearers estimated that at least 50% of the room noticed and judged them.
[0:19 - 0:26] The actual number when surveyed afterward? Less than 23% had any recollection of what shirt they were wearing.
[0:26 - 0:30] Everyone is too busy worrying about their own spotlight to care about yours. Relax and be yourself!`,
    targetAudience: 'Self-conscious teens, socially anxious adults',
    remixRecommendation: 'Show a bright yellow spotlight beam following a person, which suddenly fades to normal sunlight.',
    brollKeywords: ['crowded college lecture hall entrance', 'embarrassing t shirt close up', 'confident smile walking campus']
  },
  {
    id: 'tr-99',
    rank: 99,
    title: 'How To Overcome Hyperfocus Burnout: The Ultradian Rhythm Rule',
    channel: 'ADHD Mastery',
    channelVerified: true,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '4.6M',
    viewCount: 4600000,
    velocityPerHour: '+32.9K/hr',
    viralityScore: 88,
    retentionRating: 85,
    durationSeconds: 38,
    uploadAge: '3 days ago',
    soundTrack: 'Ambient Chill Synthwave Wave',
    thumbnailColor: 'from-emerald-950 to-blue-950',
    hookFormula: 'Bio-Rhythm Science / 90-Minute Mental Peak',
    viralTranscript: `[0:00 - 0:03] Working 6 hours in a row without looking away from your computer isn’t dedication. It’s neuro-toxicity.
[0:03 - 0:12] Just like sleep cycles operate on 90-minute REM phases, your waking brain follows Ultradian Rhythms:
[0:12 - 0:23] 90 minutes of peak alertness and synaptic firing, followed by a 20-minute refractory trough where your brain needs to clear metabolic waste.
[0:23 - 0:33] If you force yourself through the trough with caffeine and scrolling, your prefrontal cortex burns out by 2 PM.
[0:33 - 0:38] Work hard for 90 minutes, walk for 15 minutes with no phone. Multiply your output effortlessly!`,
    targetAudience: 'Creatives, coders, writers, ADHD professionals',
    remixRecommendation: 'Graph showing sine-wave Ultradian peaks and 20-minute restorative valleys.',
    brollKeywords: ['ultradian rhythm sine wave graphic', 'walking outdoors in park green trees', 'desk worker stretching arms refreshed']
  },
  {
    id: 'tr-100',
    rank: 100,
    title: 'The Stoic Dichotomy Of Control: Marcus Aurelius Secret To Inner Peace',
    channel: 'Stoic Wisdom Daily',
    channelVerified: true,
    niche: 'psychology-mindset',
    nicheLabel: 'Psychology & Mindset',
    views: '4.1M',
    viewCount: 4100000,
    velocityPerHour: '+29.4K/hr',
    viralityScore: 87,
    retentionRating: 84,
    durationSeconds: 34,
    uploadAge: '3 days ago',
    soundTrack: 'Deep Roman Cinematic Strings Low Bass',
    thumbnailColor: 'from-stone-900 to-amber-950',
    hookFormula: 'Ancient Wisdom for Modern Anxiety / Roman Emperor Mental Fortress',
    viralTranscript: `[0:00 - 0:03] When you feel overwhelmed today, ask yourself this one question from Roman Emperor Marcus Aurelius.
[0:03 - 0:11] ‘Is this circumstance within my direct control, or outside of it?’
[0:11 - 0:20] Traffic jams, flight cancellations, stock market crashes, and other people’s opinions of you are 100% outside your control.
[0:20 - 0:29] Worrying about them changes nothing except destroying your mental health.
[0:29 - 0:34] The only thing you control is your own character, your preparation, and your reaction. Master yourself!`,
    targetAudience: 'Stoics, stressed workers, philosophy lovers',
    remixRecommendation: 'Show Roman marble bust of Marcus Aurelius in dramatic chiaroscuro lighting.',
    brollKeywords: ['marcus aurelius roman marble bust', 'meditations ancient leather journal', 'man standing calm in bustling city']
  }
];
