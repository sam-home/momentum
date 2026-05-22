export const DB_NAME = 'momentum-db';
export const DB_VERSION = 1;

export const STORES = {
  WORKOUTS: 'workouts',
  TARGETS: 'targets',
  CALENDAR_ENTRIES: 'calendarEntries',
} as const;

let dbInstance: IDBDatabase | null = null;

/**
 * Öffnet (oder erstellt) die IndexedDB und gibt eine Promise zurück.
 * Das Ergebnis wird gecacht – wiederholte Aufrufe liefern dieselbe Instanz.
 */
export function openDatabase(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // ── workouts ──────────────────────────────────────────────────────────
      // keyPath: id (autoIncrement)
      if (!db.objectStoreNames.contains(STORES.WORKOUTS)) {
        const workoutStore = db.createObjectStore(STORES.WORKOUTS, {
          keyPath: 'id',
          autoIncrement: true,
        });
        workoutStore.createIndex('by_name', 'name', { unique: false });
      }

      // ── targets ───────────────────────────────────────────────────────────
      // keyPath: weekDay  (monday … sunday – eindeutig)
      if (!db.objectStoreNames.contains(STORES.TARGETS)) {
        db.createObjectStore(STORES.TARGETS, { keyPath: 'weekDay' });
      }

      // ── calendarEntries ───────────────────────────────────────────────────
      // keyPath: id (autoIncrement)
      // Index auf dateKey (ISO-String yyyy-MM-dd) + entryType für schnelle Abfragen
      if (!db.objectStoreNames.contains(STORES.CALENDAR_ENTRIES)) {
        const calStore = db.createObjectStore(STORES.CALENDAR_ENTRIES, {
          keyPath: 'id',
          autoIncrement: true,
        });
        calStore.createIndex('by_date',     'dateKey',              { unique: false });
        calStore.createIndex('by_date_type','dateTypeKey',          { unique: true  });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;

      // Verbindung wird extern geschlossen – Cache leeren
      dbInstance.onclose = () => { dbInstance = null; };
      dbInstance.onversionchange = () => { dbInstance?.close(); dbInstance = null; };

      resolve(dbInstance);
    };

    request.onerror = () => reject(request.error);
  });
}

/** Hilfsmethode: Date → 'yyyy-MM-dd' */
export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

