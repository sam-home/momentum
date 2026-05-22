import { openDatabase, STORES, toDateKey } from './database';
import { CalendarEntry } from '../models/calendar-entry';

/**
 * CalendarEntry wie es in der DB liegt.
 * Zusätzliche Felder:
 *  – id          : autoIncrement-Primärschlüssel
 *  – dateKey     : 'yyyy-MM-dd'  → Index für Date-Abfragen
 *  – dateTypeKey : 'yyyy-MM-dd_entryType' → eindeutiger Composite-Index
 *  – entryType   : 'workout' | 'work' | 'nutrition' | 'girl'
 */
export type StoredCalendarEntry = Omit<CalendarEntry, 'date'> & {
  id?: number;
  date: string;      // ISO-String statt Date-Objekt (IndexedDB-kompatibel)
  dateKey: string;
  entryType: EntryType;
  dateTypeKey: string;
};

export type EntryType = 'workout' | 'work' | 'nutrition' | 'girl';

/** Leitet den EntryType aus dem entry-Objekt ab */
function detectEntryType(entry: CalendarEntry['entry']): EntryType {
  if ('done'       in entry) return 'workout';
  if ('todos'      in entry) return 'work';
  if ('foods'      in entry) return 'nutrition';
  if ('approaches' in entry) return 'girl';
  throw new Error('Unbekannter Entry-Typ');
}

/** CalendarEntry → StoredCalendarEntry (für das Speichern) */
function toStored(entry: CalendarEntry, id?: number): StoredCalendarEntry {
  const dateKey  = toDateKey(entry.date instanceof Date ? entry.date : new Date(entry.date));
  const entryType = detectEntryType(entry.entry);
  return {
    ...(id !== undefined ? { id } : {}),
    date:         dateKey,
    entry:        entry.entry,
    dateKey,
    entryType,
    dateTypeKey: `${dateKey}_${entryType}`,
  };
}

/** StoredCalendarEntry → CalendarEntry (für das Laden) */
function fromStored(stored: StoredCalendarEntry): CalendarEntry & { id: number } {
  return {
    id:    stored.id as number,
    date:  new Date(stored.date),
    entry: stored.entry,
  } as CalendarEntry & { id: number };
}

export const CalendarEntryRepository = {

  /** Alle Einträge laden */
  async getAll(): Promise<Array<CalendarEntry & { id: number }>> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction(STORES.CALENDAR_ENTRIES, 'readonly');
      const req = tx.objectStore(STORES.CALENDAR_ENTRIES).getAll();
      req.onsuccess = () => resolve((req.result as StoredCalendarEntry[]).map(fromStored));
      req.onerror  = () => reject(req.error);
    });
  },

  /** Alle Einträge für ein bestimmtes Datum laden */
  async getByDate(date: Date): Promise<Array<CalendarEntry & { id: number }>> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(STORES.CALENDAR_ENTRIES, 'readonly');
      const index = tx.objectStore(STORES.CALENDAR_ENTRIES).index('by_date');
      const req   = index.getAll(toDateKey(date));
      req.onsuccess = () => resolve((req.result as StoredCalendarEntry[]).map(fromStored));
      req.onerror  = () => reject(req.error);
    });
  },

  /** Einen bestimmten Eintrag per Datum + Typ laden (max. 1 pro Tag & Typ) */
  async getByDateAndType(
    date: Date,
    type: EntryType,
  ): Promise<(CalendarEntry & { id: number }) | undefined> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const key   = `${toDateKey(date)}_${type}`;
      const tx    = db.transaction(STORES.CALENDAR_ENTRIES, 'readonly');
      const index = tx.objectStore(STORES.CALENDAR_ENTRIES).index('by_date_type');
      const req   = index.get(key);
      req.onsuccess = () =>
        resolve(req.result ? fromStored(req.result as StoredCalendarEntry) : undefined);
      req.onerror = () => reject(req.error);
    });
  },

  /** Eintrag per ID laden */
  async getById(id: number): Promise<(CalendarEntry & { id: number }) | undefined> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction(STORES.CALENDAR_ENTRIES, 'readonly');
      const req = tx.objectStore(STORES.CALENDAR_ENTRIES).get(id);
      req.onsuccess = () =>
        resolve(req.result ? fromStored(req.result as StoredCalendarEntry) : undefined);
      req.onerror = () => reject(req.error);
    });
  },

  /**
   * Eintrag speichern oder aktualisieren.
   * – Ohne id → neuer Eintrag (id wird zurückgegeben)
   * – Mit id  → bestehender Eintrag wird überschrieben
   * Pro Datum + Typ ist nur ein Eintrag erlaubt (unique-Index by_date_type).
   */
  async save(entry: CalendarEntry & { id?: number }): Promise<number> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const stored = toStored(entry, entry.id);
      const tx  = db.transaction(STORES.CALENDAR_ENTRIES, 'readwrite');
      const req = tx.objectStore(STORES.CALENDAR_ENTRIES).put(stored);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror  = () => reject(req.error);
    });
  },

  /** Eintrag per ID löschen */
  async delete(id: number): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction(STORES.CALENDAR_ENTRIES, 'readwrite');
      const req = tx.objectStore(STORES.CALENDAR_ENTRIES).delete(id);
      req.onsuccess = () => resolve();
      req.onerror  = () => reject(req.error);
    });
  },

  /** Alle Einträge eines Datums löschen */
  async deleteByDate(date: Date): Promise<void> {
    const entries = await this.getByDate(date);
    await Promise.all(entries.map(e => this.delete(e.id)));
  },

  /** Alle Einträge löschen */
  async clear(): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction(STORES.CALENDAR_ENTRIES, 'readwrite');
      const req = tx.objectStore(STORES.CALENDAR_ENTRIES).clear();
      req.onsuccess = () => resolve();
      req.onerror  = () => reject(req.error);
    });
  },
};

