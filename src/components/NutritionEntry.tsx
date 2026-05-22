import React, { useState } from 'react';
import {
  FaCandyCane,    // sweets   – Süßigkeiten
  FaUtensils,     // cooked   – Gekochtes
  FaHamburger,    // fastfood – Fast Food
  FaDumbbell,     // protein  – Protein / Fitness-Food
} from 'react-icons/fa';
import { FoodType } from '../models/units';
import './NutritionEntry.css';

interface FoodButton {
  type: FoodType;
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
  activeColor: string;
}

const FOOD_BUTTONS: FoodButton[] = [
  { type: 'sweets',   label: 'Süßes',    Icon: FaCandyCane as React.ComponentType<{size?:number}>, activeColor: '#e91e63' },
  { type: 'cooked',   label: 'Gekocht',  Icon: FaUtensils  as React.ComponentType<{size?:number}>, activeColor: '#4caf50' },
  { type: 'fastfood', label: 'Fastfood', Icon: FaHamburger as React.ComponentType<{size?:number}>, activeColor: '#ff5722' },
  { type: 'protein',  label: 'Protein',  Icon: FaDumbbell  as React.ComponentType<{size?:number}>, activeColor: '#2196f3' },
];

interface NutritionEntryProps {
  date: Date;
}

const NutritionEntry: React.FC<NutritionEntryProps> = ({ date: _date }) => {
  const [selected, setSelected] = useState<Set<FoodType>>(new Set());

  const toggle = (type: FoodType) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  return (
    <div className="nutrition-entry-card card text-white">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">🥗 Ernährung – Was gegessen?</h5>
          <button
            className="btn btn-sm btn-outline-light"
            title="Einstellungen"
            aria-label="Einstellungen"
          >
            ⚙️
          </button>
        </div>

        <div className="nutrition-buttons d-flex justify-content-around flex-wrap gap-2">
          {FOOD_BUTTONS.map(({ type, label, Icon, activeColor }) => {
            const isActive = selected.has(type);
            return (
              <button
                key={type}
                className={`nutrition-btn ${isActive ? 'active' : ''}`}
                style={isActive ? { backgroundColor: activeColor, borderColor: activeColor } : {}}
                onClick={() => toggle(type)}
                title={label}
                aria-label={label}
                aria-pressed={isActive}
              >
                <span className="nutrition-icon"><Icon size={22} /></span>
                <span className="nutrition-label">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NutritionEntry;

