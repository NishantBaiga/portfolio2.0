class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, HTMLAudioElement> = {};

  private constructor() {
    // Using generic UI sounds from a public CDN
    this.sounds = {
      click: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),
      snap: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
      success: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'),
      collect: new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'),
    };

    // Preload and set volumes
    Object.values(this.sounds).forEach(sound => {
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
    if ('vibrate' in navigator) {
      navigator.vibrate(ms);
    }
  }
}

export const soundManager = SoundManager.getInstance();
