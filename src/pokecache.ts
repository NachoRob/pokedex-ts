export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) {
      return undefined;
    }
    return entry.val;
  }

  #reap(): void {
    const interval = Date.now() - this.#interval;
    for (const [key, value] of this.#cache) {
      if (value.createdAt <= interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
  }
}
