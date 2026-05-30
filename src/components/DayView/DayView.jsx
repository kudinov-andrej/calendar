import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import './DayView.css';

const DayView = () => {
  const { currentDate, events, setIsReactionOpen, dayReactions, setSelectedEvent, setIsModalOpen } = useCalendar();

  // Генерируем временную шкалу от 00:00 до 22:00 (шаг 2 часа)
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

  // Форматируем текущую дату для ключа реакций
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const dateKey = formatDateKey(currentDate);
  const currentReactions = dayReactions[dateKey] || [];

  // Форматирование даты для заголовка
  const formatDayHeader = (date) => {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${dayOfWeek}, ${day} ${month}`;
  };

  // Фильтруем события только для текущего дня
  const todayEvents = events.filter(event => {
    return event.startDate === dateKey || event.endDate === dateKey;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Вычисление отступа сверху в зависимости от времени
  const calculateTopOffset = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / 120) * 50 + 80; 
  };

  // Вычисление высоты блока события на основе продолжительности
  const calculateEventHeight = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    const heightPerHour = 25; // 25px на час
    
    return Math.max((durationMinutes / 60) * heightPerHour, 40); // Минимальная высота 40px
  };

  return (
    <div className="day-view-container">
      <div className="day-header-title">
        <h2>{formatDayHeader(currentDate)}</h2>
      </div>

      {/* Блок реакций */}
      <div className="reaction-tracker-card" onClick={() => setIsReactionOpen(true)}>
        <p className="tracker-label">Как вы себя чувствуете сегодня?</p>
        <div className="reactions-row">
          {currentReactions.length > 0 ? (
            <>
              {currentReactions.map((emoji, idx) => (
                <span key={idx} className="emoji-bubble">{emoji}</span>
              ))}
              <span className="emoji-bubble add-more">+</span>
            </>
          ) : (
            <span className="emoji-bubble add-more" style={{ fontSize: '18px' }}>+ Добавить реакцию</span>
          )}
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
        {todayEvents.length > 0 ? (
          todayEvents.map((event) => {
            const top = calculateTopOffset(event.startTime);
            const height = calculateEventHeight(event.startTime, event.endTime);

            return (
              <div 
                key={event.id}
                className="timeline-event-card"
                style={{ 
                  top: `${top}px`, 
                  height: `${height}px`,
                  backgroundColor: event.color || '#4FA5F2',
                  borderLeft: `4px solid rgba(0,0,0,0.15)`
                }}
                onClick={() => handleEventClick(event)}
              >
                <h4 className="event-card-title">{event.title}</h4>
                <p className="event-card-time">{event.startTime} - {event.endTime}</p>
              </div>
            );
          })
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px', 
            color: '#8E8E93',
            fontSize: '16px' 
          }}>
            Нет событий на этот день
          </div>
        )}
      </div>
    </div>
  );
};

export default DayView;