import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import './MonthView.css';

const MonthView = () => {
  const { currentDate, setCurrentDate, events, setIsModalOpen, setSelectedEvent, setCurrentView } = useCalendar();

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Для демо-версии генерируем фиксированный Март 2024 года
  const daysInMarch = Array.from({ length: 31 }, (_, i) => i + 1);
  const paddingDays = [26, 27, 28, 29]; // Февральские дни для сетки

  const handleDayClick = (day) => {
    setCurrentDate(new Date(2024, 2, day));
    setCurrentView('day');
  };

  const handleCreateClick = () => {
    setSelectedEvent(null); // Новое событие
    setIsModalOpen(true);
  };

  return (
    <div className="month-view-container">
      <div className="month-header">
        <h2>March 2024</h2>
        <div className="month-nav-arrows">
          <button className="nav-arrow">&lt;</button>
          <button className="nav-arrow">&gt;</button>
        </div>
      </div>

      <div className="weekdays-grid">
        {daysOfWeek.map(d => <div key={d} className="weekday-label">{d}</div>)}
      </div>

      <div className="days-grid">
        {paddingDays.map(d => (
          <div key={`pad-${d}`} className="day-cell muted">{d}</div>
        ))}
        
        {daysInMarch.map(d => {
          const isToday = d === 15; // Подсветка 15 марта из макета
          return (
            <div 
              key={d} 
              className={`day-cell ${isToday ? 'today' : ''}`}
              onClick={() => handleDayClick(d)}
            >
              <span>{d}</span>
              <div className="dots-container">
                {/* Рендерим индикаторы событий */}
                {d === 14 && (
                  <>
                    <span className="dot blue"></span>
                    <span className="dot green"></span>
                    <span className="dot purple"></span>
                  </>
                )}
                {d === 12 && <span className="dot green"></span>}
              </div>
            </div>
          );
        })}
      </div>

      <button className="fab-add-event" onClick={handleCreateClick}>+</button>
    </div>
  );
};

export default MonthView;