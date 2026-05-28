import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import './BottomNav.css';

const BottomNav = () => {
  const { currentView, setCurrentView } = useCalendar();

  return (
    <div className="bottom-nav">
      <button 
        className={`nav-item ${currentView === 'month' ? 'active' : ''}`}
        onClick={() => setCurrentView('month')}
      >
        <span className="icon">📅</span>
        <span className="label">Month</span>
      </button>

      <button 
        className={`nav-item ${currentView === 'week' ? 'active' : ''}`}
        onClick={() => setCurrentView('week')}
      >
        <span className="icon">🗓️</span>
        <span className="label">Week</span>
      </button>

      <button 
        className={`nav-item ${currentView === 'day' ? 'active' : ''}`}
        onClick={() => setCurrentView('day')}
      >
        <span className="icon">⏰</span>
        <span className="label">Day</span>
      </button>
    </div>
  );
};

export default BottomNav;