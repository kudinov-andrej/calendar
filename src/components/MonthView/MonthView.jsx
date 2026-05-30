import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import './MonthView.css';

const MonthView = () => {
  const { currentDate, setCurrentDate, events, setIsModalOpen, setSelectedEvent, setCurrentView } = useCalendar();

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Получаем текущий месяц и год
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Первый день месяца
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  // Последний день месяца
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
  // День недели первого дня (0 = воскресенье, 1 = понедельник, ...)
  let startDayOfWeek = firstDayOfMonth.getDay();
  // Преобразуем в формат где 0 = понедельник
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  // Количество дней в месяце
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Предыдущий месяц для заполнения пустых ячеек
  const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  const paddingDays = [];
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    paddingDays.push(lastDayOfPrevMonth - i);
  }

  // Все дни текущего месяца
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Сегодняшняя дата для подсветки
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  const handleDayClick = (day) => {
    setCurrentDate(new Date(currentYear, currentMonth, day));
    setCurrentView('day');
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleCreateClick = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  // Функция для получения событий на определенный день
  const getEventsForDay = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentYear && 
             eventDate.getMonth() === currentMonth && 
             eventDate.getDate() === day;
    });
  };

  // Функция для получения цветов точек событий
  const getEventDots = (day) => {
    const dayEvents = getEventsForDay(day);
    const colors = dayEvents.map(event => event.color || 'blue');
    // Убираем дубликаты цветов
    return [...new Set(colors)].slice(0, 3); // Максимум 3 точки
  };

  const colorMap = {
    blue: 'blue',
    green: 'green',
    red: 'red',
    purple: 'purple',
    orange: 'orange',
    yellow: 'yellow',
  };

  return (
    <div className="month-view-container">
      <div className="month-header">
        <h2>{months[currentMonth]} {currentYear}</h2>
        <div className="month-nav-arrows">
          <button className="nav-arrow" onClick={handlePrevMonth}>&lt;</button>
          <button className="nav-arrow" onClick={handleNextMonth}>&gt;</button>
        </div>
      </div>

      <div className="weekdays-grid">
        {daysOfWeek.map(d => <div key={d} className="weekday-label">{d}</div>)}
      </div>

      <div className="days-grid">
        {paddingDays.map(d => (
          <div key={`pad-${d}`} className="day-cell muted">{d}</div>
        ))}
        
        {currentMonthDays.map(d => {
          const isToday = isCurrentMonth && d === today.getDate();
          const eventDots = getEventDots(d);
          
          return (
            <div 
              key={d} 
              className={`day-cell ${isToday ? 'today' : ''}`}
              onClick={() => handleDayClick(d)}
            >
              <span>{d}</span>
              {eventDots.length > 0 && (
                <div className="dots-container">
                  {eventDots.map((color, index) => (
                    <span key={index} className={`dot ${colorMap[color] || 'blue'}`}></span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="fab-add-event" onClick={handleCreateClick}>+</button>
    </div>
  );
};

export default MonthView;