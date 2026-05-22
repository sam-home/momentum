import { openDatabase, STORES } from './database';
import { Workout } from '../models/workout';

/** Workout wie es in der DB liegt (id wird von IndexedDB vergeben) */
export type StoredWorkout = Workout & { id: number };

export const WorkoutRepository = {

  /** Alle Workouts laden */
  async getAll(): Promise<StoredWorkout[]> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.WORKOUTS, 'readonly');
      const req = tx.objectStore(STORES.WORKOUTS).getAll();
      req.onsuccess = () => resolve(req.result as StoredWorkout[]);
      req.onerror  = () => reject(req.error);
    });
  },

  /** Einzelnes Workout per ID laden */
  async getById(id: number): Promise<StoredWorkout | undefined> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.WORKOUTS, 'readonly');
      const req = tx.objectStore(STORES.WORKOUTS).get(id);
      req.onsuccess = () => resolve(req.result as StoredWorkout | undefined);
      req.onerror  = () => reject(req.error);
    });
  },

  /**
   * Workout speichern oder aktualisieren.
   * – Ohne id → neuer Eintrag (id wird zurückgegeben)
   * – Mit id  → bestehender Eintrag wird überschrieben
   */
  async save(workout: Omit<Workout, 'id'> & { id?: number }): Promise<number> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.WORKOUTS, 'readwrite');
      const req = tx.objectStore(STORES.WORKOUTS).put(workout);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror  = () => reject(req.error);
    });
  },

  /** Workout löschen */
  async delete(id: number): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.WORKOUTS, 'readwrite');
      const req = tx.objectStore(STORES.WORKOUTS).delete(id);
      req.onsuccess = () => resolve();
      req.onerror  = () => reject(req.error);
    });
  },

  /** Alle Workouts löschen */
  async clear(): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.WORKOUTS, 'readwrite');
      const req = tx.objectStore(STORES.WORKOUTS).clear();
      req.onsuccess = () => resolve();
      req.onerror  = () => reject(req.error);
    });
  },
};

