// src/context/CalendarContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CalendarContext = createContext();

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('month'); // 'month' | 'day'
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 14)); // Март 14, 2024 (как на макете)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  
  // Изначальные данные по событиям из ваших макетов
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Deep Work Session: Project X Design',
      startDate: '2024-03-14',
      startTime: '09:00',
      endDate: '2024-03-14',
      endTime: '12:00',
      color: '#4FA5F2', // Синий
      allDay: false,
      notify: true
    },
    {
      id: '2',
      title: 'Team Lunch',
      startDate: '2024-03-14',
      startTime: '12:00',
      endDate: '2024-03-14',
      endTime: '12:45',
      color: '#E0E0E0', // Серый
      allDay: false,
      notify: false
    },
    {
      id: '3',
      title: 'Client Review for Alpha Prototype',
      startDate: '2024-03-14',
      startTime: '13:00',
      endDate: '2024-03-14',
      endTime: '14:30',
      color: '#2ECC71', // Зеленый
      allDay: false,
      notify: true
    },
    {
      id: '4',
      title: 'Feedback Session with Engineering',
      startDate: '2024-03-14',
      startTime: '15:00',
      endDate: '2024-03-14',
      endTime: '16:00',
      color: '#BB86FC', // Фиолетовый
      allDay: false,
      notify: false
    }
  ]);

  // Реакции для дней (Ключ: YYYY-MM-DD -> Массив эмодзи)
  const [dayReactions, setDayReactions] = useState({
    '2024-03-14': ['😊', '🚀', '💡', '🎉']
  });

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  const setReactionsForDate = (dateStr, reactionsArray) => {
    setDayReactions({
      ...dayReactions,
      [dateStr]: reactionsArray
    });
  };

  return (
    <CalendarContext.Provider value={{
      currentView, setCurrentView,
      currentDate, setCurrentDate,
      events, addEvent, updateEvent, deleteEvent,
      selectedEvent, setSelectedEvent,
      isModalOpen, setIsModalOpen,
      isReactionOpen, setIsReactionOpen,
      dayReactions, setReactionsForDate
    }}>
      {children}
    </CalendarContext.Provider>
  );
};