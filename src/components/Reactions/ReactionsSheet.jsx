import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import './ReactionsSheet.css';

const ReactionsSheet = () => {
  const { setIsReactionOpen, setReactionsForDate, dayReactions } = useCalendar();

  const availableEmojis = ['😀', '👍', '❤️', '🥳', '🤔', '😢', '😂', '✨'];
  const dateKey = '2024-03-14';

  const handleEmojiClick = (emoji) => {
    const current = dayReactions[dateKey] || [];
    let updated;
    if (current.includes(emoji)) {
      updated = current.filter(e => e !== emoji);
    } else {
      if (current.length >= 3) return; // Ограничение: до 3 эмодзи из макета
      updated = [...current, emoji];
    }
    setReactionsForDate(dateKey, updated);
  };

  return (
    <div className="reactions-overlay" onClick={() => setIsReactionOpen(false)}>
      <div className="reactions-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header">
          <div>
            <h3>Reactions for March 14</h3>
            <p>Select up to 3 emojis</p>
          </div>
          <button className="close-sheet-btn" onClick={() => setIsReactionOpen(false)}>✕</button>
        </div>
        
        <div className="emojis-grid">
          {availableEmojis.map((emoji) => {
            const isSelected = (dayReactions[dateKey] || []).includes(emoji);
            return (
              <button 
                key={emoji} 
                className={`emoji-selection-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReactionsSheet;