import React, { useState } from 'react';
import {
  FaShoppingBasket,
  FaHandPaper,
  FaCompass,
  FaMobileAlt,
  FaCalendarCheck,
  FaBed,
} from 'react-icons/fa';
import { Approach } from '../models/approach';
import './GirlsEntry.css';

interface ApproachButton {
  type: Approach['type'];
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
  activeColor: string;
}

const APPROACH_BUTTONS: ApproachButton[] = [
  { type: 'basket',  label: 'Korb',    Icon: FaShoppingBasket    as React.ComponentType<{size?:number}>, activeColor: '#e74c3c' },
  { type: 'hand',    label: 'Hand',    Icon: FaHandPaper     as React.ComponentType<{size?:number}>, activeColor: '#f39c12' },
  { type: 'guide',   label: 'Guide',   Icon: FaCompass       as React.ComponentType<{size?:number}>, activeColor: '#3498db' },
  { type: 'number',  label: 'Nummer',  Icon: FaMobileAlt     as React.ComponentType<{size?:number}>, activeColor: '#9b59b6' },
  { type: 'date',    label: 'Date',    Icon: FaCalendarCheck as React.ComponentType<{size?:number}>, activeColor: '#e91e63' },
  { type: 'lay',     label: 'Lay',     Icon: FaBed           as React.ComponentType<{size?:number}>, activeColor: '#2ecc71' },
];

interface GirlsEntryProps {
  date: Date;
}

const GirlsEntry: React.FC<GirlsEntryProps> = ({ date }) => {
  const [selected, setSelected] = useState<Set<Approach['type']>>(new Set());

  const toggle = (type: Approach['type']) => {
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
    <div className="girls-entry-card card text-white">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">👩 Frauen</h5>
          <button
            className="btn btn-sm btn-outline-light"
            title="Einstellungen"
            aria-label="Einstellungen"
          >
            ⚙️
          </button>
        </div>

        <div className="approach-buttons d-flex justify-content-around flex-wrap gap-2">
          {APPROACH_BUTTONS.map(({ type, label, Icon, activeColor }) => {
            const isActive = selected.has(type);
            return (
              <button
                key={type}
                className={`approach-btn ${isActive ? 'active' : ''}`}
                style={isActive ? { backgroundColor: activeColor, borderColor: activeColor } : {}}
                onClick={() => toggle(type)}
                title={label}
                aria-label={label}
                aria-pressed={isActive}
              >
                <span className="approach-icon"><Icon size={22} /></span>
                <span className="approach-label">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GirlsEntry;

