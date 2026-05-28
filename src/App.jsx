import React from 'react';
import { CalendarProvider, useCalendar } from './context/CalendarContext';
import MonthView from './components/MonthView/MonthView';
import DayView from './components/DayView/DayView';
import BottomNav from './components/Navigation/BottomNav';
import EventModal from './components/EventModal/EventModal';
import ReactionsSheet from './components/Reactions/ReactionsSheet';
import './App.css';

const MainLayout = () => {
  const { currentView, isModalOpen, isReactionOpen } = useCalendar();

  return (
    <div className="app-container">
      {/* Имитация статус-бара iOS */}
      <div className="ios-status-bar">
        <span className="time">9:41</span>
        <div className="status-icons">📶 🔋</div>
      </div>

      {/* Переключение контента в зависимости от выбранного таба */}
      <main className="app-content">
        {currentView === 'month' && <MonthView />}
        {currentView === 'day' && <DayView />}
        {currentView === 'week' && <div style={{ padding: 20 }}>Week View (В разработке)</div>}
      </main>

      {/* Навигация */}
      <BottomNav />

      {/* Модальные окна */}
      {isModalOpen && <EventModal />}
      {isReactionOpen && <ReactionsSheet />}
    </div>
  );
};

function App() {
  return (
    <CalendarProvider>
      <MainLayout />
    </CalendarProvider>
  );
}

export default App;