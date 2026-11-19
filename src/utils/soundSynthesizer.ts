// Web Audio API Procedural Sound Engine for CapCut Sonic Impact SFX Library
// Zero external asset dependencies, instant playback, cross-browser support

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSonicSfx(
  waveType: 'whoosh-air' | 'bubble-pop' | 'braam-hit' | 'riser-pitch' | 'sub-drop' | 'cash-chime' | 'glitch-buzz' | 'shutter-snap',
  volumePercent: number = 80
) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    const volumeNorm = Math.max(0.01, Math.min(1.0, (volumePercent / 100) * 0.8));
    masterGain.gain.setValueAtTime(volumeNorm, now);
    masterGain.connect(ctx.destination);

    switch (waveType) {
      case 'whoosh-air': {
        // White noise through sweeping bandpass filter
        const bufferSize = ctx.sampleRate * 0.45;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(3.5, now);
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.45);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.9, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise.start(now);
        noise.stop(now + 0.46);
        break;
      }

      case 'bubble-pop': {
        // High frequency sine drop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);

        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.13);
        break;
      }

      case 'braam-hit': {
        // Massive Hans Zimmer / Trailer Braam hit: detuned saws + sub 808
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const sub = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const hitGain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        sub.type = 'sine';

        osc1.frequency.setValueAtTime(58, now);
        osc1.detune.setValueAtTime(-14, now);
        osc2.frequency.setValueAtTime(58, now);
        osc2.detune.setValueAtTime(14, now);

        sub.frequency.setValueAtTime(65, now);
        sub.frequency.exponentialRampToValueAtTime(38, now + 1.2);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, now);
        filter.frequency.exponentialRampToValueAtTime(180, now + 1.0);
        filter.Q.setValueAtTime(5.0, now);

        hitGain.gain.setValueAtTime(0.95, now);
        hitGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc1.connect(filter);
        osc2.connect(filter);
        sub.connect(hitGain);
        filter.connect(hitGain);
        hitGain.connect(masterGain);

        osc1.start(now);
        osc2.start(now);
        sub.start(now);

        osc1.stop(now + 1.25);
        osc2.stop(now + 1.25);
        sub.stop(now + 1.25);
        break;
      }

      case 'riser-pitch': {
        // Tension build-up riser with pitch ramp & tremolo
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 1.8);

        // LFO for tension flutter
        lfo.frequency.setValueAtTime(6, now);
        lfo.frequency.linearRampToValueAtTime(24, now + 1.8);
        lfoGain.gain.setValueAtTime(30, now);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.85, now + 1.7);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.85);

        lfo.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        lfo.start(now);
        osc.stop(now + 1.85);
        lfo.stop(now + 1.85);
        break;
      }

      case 'sub-drop': {
        // 808 Sub Boom drop
        const sub = ctx.createOscillator();
        const gain = ctx.createGain();

        sub.type = 'sine';
        sub.frequency.setValueAtTime(130, now);
        sub.frequency.exponentialRampToValueAtTime(35, now + 1.0);

        gain.gain.setValueAtTime(0.99, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

        sub.connect(gain);
        gain.connect(masterGain);

        sub.start(now);
        sub.stop(now + 1.15);
        break;
      }

      case 'cash-chime': {
        // High harmonic Bell Chime (Dopamine ding)
        const chime1 = ctx.createOscillator();
        const chime2 = ctx.createOscillator();
        const gain = ctx.createGain();

        chime1.type = 'sine';
        chime2.type = 'triangle';
        chime1.frequency.setValueAtTime(2093, now); // C7
        chime2.frequency.setValueAtTime(2637, now); // E7

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        chime1.connect(gain);
        chime2.connect(gain);
        gain.connect(masterGain);

        chime1.start(now);
        chime2.start(now);
        chime1.stop(now + 0.95);
        chime2.stop(now + 0.95);
        break;
      }

      case 'glitch-buzz': {
        // Fast digital glitch flutter
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.setValueAtTime(800, now + 0.05);
        osc.frequency.setValueAtTime(220, now + 0.1);
        osc.frequency.setValueAtTime(1100, now + 0.15);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      case 'shutter-snap': {
        // Snap impulse
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.07);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }
    }
  } catch (e) {
    console.warn('Audio playback error:', e);
  }
}
