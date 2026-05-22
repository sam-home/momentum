import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format, addDays, subDays } from 'date-fns';
import { de } from 'date-fns/locale';
import './App.css';
import GirlsEntry from './components/GirlsEntry';
import NutritionEntry from './components/NutritionEntry';
import WorkoutEntry from './components/WorkoutEntry';
import { Workout } from './models/workout';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  { id: 'training', name: 'Training', icon: '🏋️', color: 'primary' },
  { id: 'nutrition', name: 'Ernährung', icon: '🥗', color: 'success' },
  { id: 'work', name: 'Arbeit', icon: '💼', color: 'info' },
  { id: 'women', name: 'Frauen', icon: '👩', color: 'danger' },
];

const demoWorkout: Workout = {
  id: 1,
  name: 'Morning Grind',
  rounds: 3,
  timeLimit: 20,
  exercises: [
    { type: 'repetitions', repetitions: 20 },
    { type: 'time', time: 60, unit: 'seconds' },
    { type: 'distance', distance: 400, unit: 'meter' },
  ],
};

function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const dateHeaderRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentDate(addDays(currentDate, 1));
    } else if (isRightSwipe) {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const formattedDate = format(currentDate, 'EEEE, d. MMMM yyyy', { locale: de });
  const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  const handleBackToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="app-container">
      {/* Date Header with Swipe */}
      <div
        className="date-header"
        ref={dateHeaderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="card bg-dark text-white">
          <div className="card-body text-center py-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1">
                <h2 className="mb-0">
                  {formattedDate}
                  {isToday && <span className="badge bg-success ms-2">Heute</span>}
                </h2>
                <small className="text-muted d-block mt-2">
                  (Wische zum Wechseln)
                </small>
              </div>
              {!isToday && (
                <button
                  className="btn btn-success ms-3"
                  onClick={handleBackToToday}
                  title="Zurück zu heute"
                >
                  ← Heute
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Container - Vertical Layout */}
      <div className="categories-container">
        <div className="container-fluid p-3">
          <div className="categories-stack">
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                <div className="category-card-wrapper">
                  <div className={`card category-card bg-${category.color} text-white`}>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="category-icon">{category.icon}</span>
                        <button
                          className="btn btn-sm btn-outline-light"
                          title="Einstellungen"
                          aria-label="Einstellungen"
                        >
                          ⚙️
                        </button>
                      </div>
                      <h5 className="card-title flex-grow-1">{category.name}</h5>
                      <div className="mt-auto">
                        <small className="text-white-50">Klicke zum Bearbeiten</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WorkoutEntry direkt unter Training */}
                {category.id === 'training' && (
                  <div className="entry-card-wrapper">
                    <WorkoutEntry workout={demoWorkout} date={currentDate} />
                  </div>
                )}

                {/* NutritionEntry direkt unter Ernährung */}
                {category.id === 'nutrition' && (
                  <div className="entry-card-wrapper">
                    <NutritionEntry date={currentDate} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Girls Entry – Annäherungsarten */}
          <div className="entry-card-wrapper">
            <GirlsEntry date={currentDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
