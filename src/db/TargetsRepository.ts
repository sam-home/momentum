import { openDatabase, STORES } from './database';
import { Targets } from '../models/targets';
import { WeekDay } from '../models/units';

export const TargetsRepository = {

  /** Alle Targets (alle Wochentage) laden */
  async getAll(): Promise<Targets[]> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.TARGETS, 'readonly');
      const req = tx.objectStore(STORES.TARGETS).getAll();
      req.onsuccess = () => resolve(req.result as Targets[]);
      req.onerror  = () => reject(req.error);
    });
  },

  /** Targets für einen bestimmten Wochentag laden */
  async getByWeekDay(weekDay: WeekDay): Promise<Targets | undefined> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.TARGETS, 'readonly');
      const req = tx.objectStore(STORES.TARGETS).get(weekDay);
      req.onsuccess = () => resolve(req.result as Targets | undefined);
      req.onerror  = () => reject(req.error);
    });
  },

  /**
   * Targets speichern oder aktualisieren.
   * Der weekDay-Schlüssel ist eindeutig – vorhandener Eintrag wird überschrieben.
   */
  async save(targets: Targets): Promise<WeekDay> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.TARGETS, 'readwrite');
      const req = tx.objectStore(STORES.TARGETS).put(targets);
      req.onsuccess = () => resolve(req.result as WeekDay);
      req.onerror  = () => reject(req.error);
    });
  },

  /** Targets für einen Wochentag löschen */
  async delete(weekDay: WeekDay): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.TARGETS, 'readwrite');
      const req = tx.objectStore(STORES.TARGETS).delete(weekDay);
      req.onsuccess = () => resolve();
      req.onerror  = () => reject(req.error);
    });
  },

  /** Alle Targets löschen */
  async clear(): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.TARGETS, 'readwrite');
      const req = tx.objectStore(STORES.TARGETS).clear();
      req.onsuccess = () => resolve();
      req.onerror  = () => reject(req.error);
    });
  },
};

