import { useState } from 'react';

const categories = [
  {
    name: 'SCIENCE',
    emoji: '🟩',
    channels: [
      { name: 'astronomy', emoji: '' },
      { name: 'biology', emoji: '' },
      { name: 'chemistry', emoji: '' },
      { name: 'economics', emoji: '' },
      { name: 'engineering', emoji: '' },
      { name: 'environment', emoji: '' },
      { name: 'mathematics', emoji: '📺' },
      { name: 'physics', emoji: '' },
      { name: 'psychology', emoji: '' },
      { name: 'technology', emoji: '📺', active: true },
    ],
  },
  {
    name: 'SOCIAL',
    emoji: '👥',
    channels: [
      { name: 'lounge', emoji: '' },
      { name: 'arcade', emoji: '' },
      { name: 'music', emoji: '' },
      { name: 'gallery', emoji: '' },
    ],
  },
];

export default function ChannelSidebar({ activeChannel, onChannelSelect }) {
  const [collapsed, setCollapsed] = useState({});

  const toggleCategory = (name) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="channel-sidebar">
      <div className="server-header">
        <span className="server-header-name">
          <span className="verified">⚗️</span>
          Science and Technology
        </span>
        <span className="dropdown-arrow">▼</span>
      </div>

      <div className="channel-list">
        {/* Community channel (no category) */}
        <div style={{ padding: '8px 0 0' }}>
          <div
            className={`channel-item${activeChannel === 'community' ? ' active' : ''}`}
            onClick={() => onChannelSelect('community')}
          >
            <span className="channel-hash">#</span>
            <span className="channel-name">community</span>
          </div>
        </div>

        {categories.map((cat) => (
          <div key={cat.name} className="channel-category">
            <div className="category-header" onClick={() => toggleCategory(cat.name)}>
              <span
                className="category-arrow"
                style={{ transform: collapsed[cat.name] ? 'rotate(-90deg)' : 'rotate(0)' }}
              >
                ▼
              </span>
              <span className="category-name">{cat.name}</span>
              <span className="category-emoji">{cat.emoji}</span>
            </div>
            {!collapsed[cat.name] &&
              cat.channels.map((ch) => (
                <div
                  key={ch.name}
                  className={`channel-item${activeChannel === ch.name ? ' active' : ''}`}
                  onClick={() => onChannelSelect(ch.name)}
                >
                  <span className="channel-hash">#</span>
                  <span className="channel-name">{ch.name}</span>
                  {ch.emoji && <span className="channel-emoji">{ch.emoji}</span>}
                  {activeChannel === ch.name && (
                    <div className="channel-icons">
                      <span className="channel-icon-btn" title="Create Invite">👤</span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="user-panel">
        <div className="user-avatar-container">
          <div className="user-avatar" style={{ background: '#747f8d' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <div className="user-status-dot" style={{ background: '#23a559' }} />
        </div>
        <div className="user-info">
          <div className="user-name">Crushallcakes</div>
          <div className="user-tag">#8106</div>
        </div>
        <div className="user-controls">
          <button className="user-control-btn" title="Mute">🎤</button>
          <button className="user-control-btn" title="Deafen">🎧</button>
          <button className="user-control-btn" title="Settings">⚙️</button>
        </div>
      </div>
    </div>
  );
}
