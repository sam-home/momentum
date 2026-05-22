import React, { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaRunning,
  FaClock,
  FaRedo,
} from 'react-icons/fa';
import { Workout } from '../models/workout';
import { Exercise } from '../models/exercise';
import './WorkoutEntry.css';

// Cast-Helfer für react-icons v5 / TypeScript-Kompatibilität
type IC = React.ComponentType<{ size?: number; className?: string }>;
const Check   = FaCheck   as IC;
const Times   = FaTimes   as IC;
const Running = FaRunning as IC;
const Clock   = FaClock   as IC;
const Redo    = FaRedo    as IC;

interface WorkoutEntryProps {
  workout: Workout;
  date: Date;
}

type Status = 'done' | 'failed' | null;

const formatExercise = (ex: Exercise): string => {
  switch (ex.type) {
    case 'distance':
      return `${ex.distance} ${ex.unit}`;
    case 'time':
      return `${ex.time} ${ex.unit}`;
    case 'repetitions':
      return `${ex.repetitions}x`;
  }
};

const exerciseIcon = (ex: Exercise): React.ReactNode => {
  switch (ex.type) {
    case 'distance':    return <Running size={12} />;
    case 'time':        return <Clock   size={12} />;
    case 'repetitions': return <Redo    size={12} />;
  }
};

const WorkoutEntry: React.FC<WorkoutEntryProps> = ({ workout, date: _date }) => {
  const [status, setStatus] = useState<Status>(null);

  const setDone   = () => setStatus(prev => prev === 'done'   ? null : 'done');
  const setFailed = () => setStatus(prev => prev === 'failed' ? null : 'failed');

  return (
    <div className="workout-entry-card card text-white">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">🏋️ {workout.name}</h5>
          <button
            className="btn btn-sm btn-outline-light"
            title="Einstellungen"
            aria-label="Einstellungen"
          >
            ⚙️
          </button>
        </div>

        {/* Meta-Info */}
        <div className="workout-meta d-flex gap-3 mb-3">
          {workout.rounds && (
            <span className="workout-badge">
              <Redo size={11} className="me-1" />
              {workout.rounds} Runden
            </span>
          )}
          {workout.timeLimit && (
            <span className="workout-badge">
              <Clock size={11} className="me-1" />
              {workout.timeLimit} Min
            </span>
          )}
        </div>

        {/* Exercises */}
        <ul className="workout-exercises mb-4">
          {workout.exercises.map((ex, i) => (
            <li key={i} className="workout-exercise-item">
              <span className="exercise-icon-wrap">{exerciseIcon(ex)}</span>
              <span className="exercise-text">{formatExercise(ex)}</span>
            </li>
          ))}
        </ul>

        {/* Status-Buttons */}
        <div className="d-flex justify-content-around">
          {/* Geschafft */}
          <div className="d-flex flex-column align-items-center gap-1">
            <button
              className={`workout-btn ${status === 'done' ? 'active done' : ''}`}
              onClick={setDone}
              aria-label="Geschafft"
              aria-pressed={status === 'done'}
            >
              <Check size={24} />
            </button>
            <span className="workout-btn-label">Geschafft</span>
          </div>

          {/* Nicht geschafft */}
          <div className="d-flex flex-column align-items-center gap-1">
            <button
              className={`workout-btn ${status === 'failed' ? 'active failed' : ''}`}
              onClick={setFailed}
              aria-label="Nicht geschafft"
              aria-pressed={status === 'failed'}
            >
              <Times size={24} />
            </button>
            <span className="workout-btn-label">Nicht geschafft</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkoutEntry;

