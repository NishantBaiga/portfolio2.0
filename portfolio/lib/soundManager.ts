class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, HTMLAudioElement> = {};
  private isClient = typeof window !== "undefined";

  private constructor() {
    if (!this.isClient) return; // 🚀 prevent server execution

    this.sounds = {
      click: new Audio("/sounds/click.mp3"),
      snap: new Audio("/sounds/snap.mp3"),
      success: new Audio("/sounds/success.mp3"),
      collect: new Audio("/sounds/collect.mp3"),
    };

    Object.values(this.sounds).forEach(sound => {
      sound.volume = 0.2;
      sound.preload = "auto";
    });
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public play(name: string) {
    if (!this.isClient) return; // 🚫 server safety

    const sound = this.sounds[name];
    if (sound) {
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.volume = sound.volume;
      clone.play().catch(() => {});
    }
  }

  public vibrate(ms: number = 50) {
    if (this.isClient && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }
}

export const soundManager = SoundManager.getInstance();