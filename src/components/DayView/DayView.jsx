import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import './DayView.css';

const DayView = () => {
  const { events, setIsReactionOpen, dayReactions, setSelectedEvent, setIsModalOpen } = useCalendar();

  // Генерируем временную шкалу от 00:00 до 22:00 (шаг 2 часа для совпадения с макетом)
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

  const dateKey = '2024-03-14';
  const currentReactions = dayReactions[dateKey] || [];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Вычисление отступа сверху в зависимости от времени (для позиционирования на таймлайне)
  const calculateTopOffset = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    // 1 час равен примерно 60px в CSS-сетке
    return (totalMinutes / 120) * 50 + 80; 
  };

  return (
    <div className="day-view-container">
      <div className="day-header-title">
        <h2>Monday, March 14</h2>
      </div>

      {/* Блок реакций */}
      <div className="reaction-tracker-card" onClick={() => setIsReactionOpen(true)}>
        <p className="tracker-label">How do you feel today?</p>
        <div className="reactions-row">
          {currentReactions.map((emoji, idx) => (
            <span key={idx} className="emoji-bubble">{emoji}</span>
          ))}
          <span className="emoji-bubble add-more">+</span>
        </div>
      </div>

      {/* Таймлайн сетка */}
      <div className="timeline-wrapper">
        {hours.map((hour, idx) => (
          <div key={idx} className="timeline-row">
            <span className="time-label">{hour}</span>
            <div className="time-line-divider"></div>
          </div>
        ))}

        {/* Наложение событий поверх сетки */}
        {events.map((event) => {
          const top = calculateTopOffset(event.startTime);
          // Демо-высота блока
          const height = event.id === '1' ? 90 : 50; 

          return (
            <div 
              key={event.id}
              className="timeline-event-card"
              style={{ 
                top: `${top}px`, 
                height: `${height}px`,
                backgroundColor: event.color,
                borderLeft: `4px solid rgba(0,0,0,0.15)`
              }}
              onClick={() => handleEventClick(event)}
            >
              <h4 className="event-card-title">{event.title}</h4>
              <p className="event-card-time">{event.startTime} - {event.endTime}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;