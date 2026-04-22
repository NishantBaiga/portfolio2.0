class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, HTMLAudioElement> = {};

  private constructor() {
    this.sounds = {
      click: new Audio("/sounds/click.mp3"),
      snap: new Audio("/sounds/snap.mp3"),
      success: new Audio("/sounds/success.mp3"),
      collect: new Audio("/sounds/collect.mp3"),
    };
    // Preload and set volumes
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = 0.2;
      sound.load();
    });
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public play(name: string) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore errors if user hasn't interacted yet
      });
    }
  }

  public vibrate(ms: number = 50) {
    if ("vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }
}

export const soundManager = SoundManager.getInstance();
