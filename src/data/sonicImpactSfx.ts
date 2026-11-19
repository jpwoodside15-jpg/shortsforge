import { SonicImpactSfx } from '../types';

export const SONIC_IMPACT_SFX_CATALOG: SonicImpactSfx[] = [
  // 1. Whooshes & Swishes
  {
    id: 'sfx-whoosh-fast',
    name: 'Hyper-Fast Air Whoosh',
    category: 'whoosh',
    durationSec: 0.45,
    tag: 'Transition & Swipe',
    capcutTimingCue: 'Place at cut transition between Scene 1 and Scene 2',
    recommendedVolumeDb: '-6 dB',
    audioWaveType: 'whoosh-air',
    description: 'Clean aerodynamic air displacement with high-frequency rush.',
    retentionBenefit: 'Triggers involuntary saccadic eye tracking, concealing hard video cuts.'
  },
  {
    id: 'sfx-whoosh-deep',
    name: 'Low-End Cinematic Swoosh',
    category: 'whoosh',
    durationSec: 0.5,
    tag: 'Heavy B-Roll Shift',
    capcutTimingCue: 'Trigger on full-screen text slam or camera push-in',
    recommendedVolumeDb: '-8 dB',
    audioWaveType: 'whoosh-air',
    description: 'Deep resonant sweep with atmospheric weight.',
    retentionBenefit: 'Adds physical scale and weight to digital typography.'
  },
  {
    id: 'sfx-whoosh-whip',
    name: 'Stereo Whip-Pan Swish',
    category: 'whoosh',
    durationSec: 0.4,
    tag: 'Camera Movement',
    capcutTimingCue: 'Sync with zoom-in effect or 90-degree camera spin',
    recommendedVolumeDb: '-7 dB',
    audioWaveType: 'whoosh-air',
    description: 'Brisk whip effect simulating fast physical camera repositioning.',
    retentionBenefit: 'Prevents video fatigue by resetting the vestibular attention clock.'
  },

  // 2. Pops & Bubbles
  {
    id: 'sfx-pop-dopamine',
    name: 'Dopamine Bubble Pop',
    category: 'pop',
    durationSec: 0.12,
    tag: 'Caption Pop',
    capcutTimingCue: 'Exact frame where animated caption keyword bounces',
    recommendedVolumeDb: '-5 dB',
    audioWaveType: 'bubble-pop',
    description: 'Satisfying high-contrast tactile bubble burst with sub pop.',
    retentionBenefit: 'Stimulates micro-dopamine reward loop for each read phrase.'
  },
  {
    id: 'sfx-pop-sub',
    name: 'Punchy Accent Pop',
    category: 'pop',
    durationSec: 0.15,
    tag: 'Stat / Metric Pop',
    capcutTimingCue: 'Trigger when dollar amount or % number flashes on screen',
    recommendedVolumeDb: '-6 dB',
    audioWaveType: 'bubble-pop',
    description: 'Deeper percussive pop for highlighting statistical truths.',
    retentionBenefit: 'Forces the viewer to register numerical data points.'
  },

  // 3. Cinematic Hits & Braams
  {
    id: 'sfx-braam-trailer',
    name: 'Trailer Braam Impact',
    category: 'cinematic-hit',
    durationSec: 1.2,
    tag: 'Frame-0 Hook Hit',
    capcutTimingCue: 'At 0.00s initial frame to stun scrolling viewer',
    recommendedVolumeDb: '-4 dB',
    audioWaveType: 'braam-hit',
    description: 'Massive brass-hybrid Hans Zimmer style low-frequency shockwave.',
    retentionBenefit: 'Stops thumb scrolling within 150ms of audio intake.'
  },
  {
    id: 'sfx-sub-boom',
    name: 'Deep Dungeon Sub Boom',
    category: 'cinematic-hit',
    durationSec: 1.1,
    tag: 'Myth-Buster Climax',
    capcutTimingCue: 'Trigger when delivering the contrarian punchline',
    recommendedVolumeDb: '-5 dB',
    audioWaveType: 'braam-hit',
    description: 'Sub-40Hz acoustic punch that rattles mobile earphone drivers.',
    retentionBenefit: 'Physical bass presence signals undeniable authority and finality.'
  },

  // 4. Risers & Build-ups
  {
    id: 'sfx-riser-exponential',
    name: 'Exponential Tension Riser',
    category: 'riser',
    durationSec: 1.8,
    tag: 'Anticipation Curve',
    capcutTimingCue: 'Layer underneath transcript lines right before the big reveal',
    recommendedVolumeDb: '-9 dB',
    audioWaveType: 'riser-pitch',
    description: 'Rising pitch sweep with accelerating tremolo flutter.',
    retentionBenefit: 'Creates urgent cognitive tension that forbids swiping away.'
  },

  // 5. Bass Drops
  {
    id: 'sfx-bass-drop-808',
    name: '808 Seismic Bass Drop',
    category: 'bass-drop',
    durationSec: 1.0,
    tag: 'Tension Release',
    capcutTimingCue: 'Immediately after the tension riser breaks at second 4.5',
    recommendedVolumeDb: '-5 dB',
    audioWaveType: 'sub-drop',
    description: 'Pure analog 808 frequency glide into deep sub-bass vibration.',
    retentionBenefit: 'Deep acoustic payoff produces physical satisfaction.'
  },

  // 6. Cash & Dopamine Rewards
  {
    id: 'sfx-cash-chime',
    name: 'Golden Cash Register Ding',
    category: 'dopamine-cash',
    durationSec: 0.9,
    tag: 'Monetization & Win',
    capcutTimingCue: 'Trigger when explaining profit, ROI, or financial payoff',
    recommendedVolumeDb: '-6 dB',
    audioWaveType: 'cash-chime',
    description: 'Crystal resonant double-bell chime with shimmering sustain.',
    retentionBenefit: 'Strong psychological association with wealth, saving, and profit.'
  },

  // 7. Glitches & UI Clicks
  {
    id: 'sfx-glitch-digital',
    name: 'Digital Cyber Glitch',
    category: 'glitch-ui',
    durationSec: 0.22,
    tag: 'Falsehood Callout',
    capcutTimingCue: 'Trigger when red "LIE" or "MISTAKE" text appears',
    recommendedVolumeDb: '-7 dB',
    audioWaveType: 'glitch-buzz',
    description: 'Aggressive bit-crushed electronic static glitch burst.',
    retentionBenefit: 'Warns viewer of cognitive error, priming urgent curiosity.'
  },
  {
    id: 'sfx-shutter-snap',
    name: 'DSLR Shutter Snap',
    category: 'glitch-ui',
    durationSec: 0.08,
    tag: 'Proof Screenshot',
    capcutTimingCue: 'Trigger when showing screenshot or graph overlay',
    recommendedVolumeDb: '-6 dB',
    audioWaveType: 'shutter-snap',
    description: 'Mechanical high-speed camera mirror flip click.',
    retentionBenefit: 'Subconsciously validates the shown graphic as authentic evidence.'
  }
];
