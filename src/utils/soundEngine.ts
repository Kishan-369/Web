// Web Audio API Sound Synthesizer for Cinematic Experience

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Muted by default until user interacts or enables
  private volume: number = 0.5;
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private heartbeatInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAmbientDrone();
      this.stopHeartbeat();
    } else {
      this.initContext();
      this.startAmbientDrone();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(this.volume * 0.15, this.ctx.currentTime, 0.1);
    }
  }

  // Subtle UI click tone
  public playClickTone() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

    gain.gain.setValueAtTime(this.volume * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Play crisp modern phone notification chime
  public playNotificationPing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12); // A6

    gain.gain.setValueAtTime(this.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);

    // Haptic vibration feedback if available
    this.triggerHaptic([30, 50, 30]);
  }

  // Play deep cinematic sub-bass impact (A24 / Netflix style)
  public playSubBassImpact() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now); // Low pitch A2
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

    gain.gain.setValueAtTime(this.volume * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);

    this.triggerHaptic(80);
  }

  // Play digital glitch / stutter sound
  public playGlitchSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + i * 0.04;

      osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
      osc.frequency.setValueAtTime(300 + Math.random() * 800, startTime);

      gain.gain.setValueAtTime(this.volume * 0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.03);
    }
  }

  // Dopamine Slot Machine Chime
  public playDopamineTrigger() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(this.volume * 0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.4);
    });
  }

  // Organic Heartbeat pulse
  public playSingleHeartbeat() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Lub
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(60, now);
    osc1.frequency.exponentialRampToValueAtTime(30, now + 0.15);
    gain1.gain.setValueAtTime(this.volume * 0.5, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.2);

    // Dub
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(55, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(25, now + 0.3);
    gain2.gain.setValueAtTime(this.volume * 0.4, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.35);
  }

  public startHeartbeat(bpm: number = 65) {
    this.stopHeartbeat();
    const intervalMs = (60 / bpm) * 1000;
    this.playSingleHeartbeat();
    this.heartbeatInterval = window.setInterval(() => {
      this.playSingleHeartbeat();
    }, intervalMs);
  }

  public stopHeartbeat() {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Low Dark Ambient Drone (Continuous Background)
  public startAmbientDrone() {
    if (this.isMuted || this.droneGain) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.exponentialRampToValueAtTime(this.volume * 0.12, now + 2);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc2 = this.ctx.createOscillator();

    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, now); // A1

    this.droneOsc2.type = 'sawtooth';
    this.droneOsc2.frequency.setValueAtTime(55.4, now); // Slight detune for warm drone

    // Low pass filter for dark warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
  }

  public stopAmbientDrone() {
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneGain = null;
      }, 1000);
    }
  }

  // Harmonic Calming Breathing Tones
  public playBreathingTone(phase: 'in' | 'hold' | 'out') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';

    if (phase === 'in') {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 4);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 2);
      gain.gain.linearRampToValueAtTime(this.volume * 0.15, now + 4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 4);
    } else if (phase === 'out') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 8);
      gain.gain.setValueAtTime(this.volume * 0.15, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 8);
    } else {
      // Hold tone
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(this.volume * 0.1, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.1, now + 7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 7);
    }
  }

  private triggerHaptic(pattern: number | number[]) {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignore if unsupported
      }
    }
  }
}

export const soundEngine = new SoundEngine();
