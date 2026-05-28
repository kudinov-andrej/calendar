import React, { useState, useEffect } from 'react';
import { useCalendar } from '../../context/CalendarContext';
import './EventModal.css';

const EventModal = () => {
  const { selectedEvent, setIsModalOpen, addEvent, updateEvent, deleteEvent } = useCalendar();

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('2024-06-15');
  const [startTime, setStartTime] = useState('10:00');
  const [endDate, setEndDate] = useState('2024-06-15');
  const [endTime, setEndTime] = useState('11:00');
  const [allDay, setAllDay] = useState(false);
  const [notify, setNotify] = useState(true);
  const [color, setColor] = useState('#2F80ED');

  const colorPalette = ['#2F80ED', '#2ECC71', '#E84393', '#F1C40F', '#9B59B6'];

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setStartDate(selectedEvent.startDate);
      setStartTime(selectedEvent.startTime);
      setEndDate(event => selectedEvent.endDate || event);
      setEndTime(selectedEvent.endTime);
      setAllDay(selectedEvent.allDay);
      setNotify(selectedEvent.notify);
      setColor(selectedEvent.color);
    }
  }, [selectedEvent]);

  const handleSave = () => {
    const eventData = {
      id: selectedEvent?.id,
      title, startDate, startTime, endDate, endTime, allDay, notify, color
    };

    if (selectedEvent) {
      updateEvent(eventData);
    } else {
      addEvent(eventData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-screen">
        {/* Шапка */}
        <div className="modal-header">
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
          <h3>{selectedEvent ? 'Edit Event' : 'Create Event'}</h3>
          <div className="header-actions">
            {selectedEvent && (
              <button className="trash-btn" onClick={handleDelete}>🗑️</button>
            )}
            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>

        {/* Форма */}
        <div className="modal-body">
          <div className="form-group">
            <label>Event Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Project Kickoff Meeting"
            />
          </div>

          <div className="form-group">
            <label>Start Date & Time</label>
            <div className="datetime-row">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>End Date & Time</label>
            <div className="datetime-row">
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="options-section">
            <p className="section-label">Options</p>
            <div className="toggle-row">
              <span>All Day Event</span>
              <label className="switch">
                <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="toggle-row">
              <span>Notify at start</span>
              <label className="switch">
                <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="color-section">
            <p className="section-label">Event Color</p>
            <div className="colors-row">
              {colorPalette.map((c) => (
                <div 
                  key={c} 
                  className={`color-sphere ${color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;