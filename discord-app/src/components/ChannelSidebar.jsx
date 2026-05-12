import { useState } from 'react';

const HashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z" />
  </svg>
);

const VoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6.586 7.00304H3C2.45 7.00304 2 7.45304 2 8.00304V16.003C2 16.553 2.45 17.003 3 17.003H6.586L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.003V4.00304C12 3.59904 11.757 3.23404 11.383 3.07904Z" />
    <path d="M20.363 4.29304C20.168 4.09804 19.852 4.09804 19.657 4.29304L18.95 5.00004C21.05 7.10004 22 9.90004 22 12C22 14.1 21.05 16.9 18.95 19L19.657 19.707C19.852 19.902 20.168 19.902 20.363 19.707C22.913 17.157 23.5 14.5 23.5 12C23.5 9.50004 22.913 6.84304 20.363 4.29304Z" />
    <path d="M17.535 7.12204C17.34 6.92704 17.024 6.92704 16.829 7.12204L16.122 7.82904C17.636 9.34304 18 10.9 18 12C18 13.1 17.636 14.657 16.122 16.171L16.829 16.878C17.024 17.073 17.34 17.073 17.535 16.878C19.435 14.978 19.5 13.1 19.5 12C19.5 10.9 19.435 9.02204 17.535 7.12204Z" />
  </svg>
);

const InviteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M14 2H16V3H14V5H13V3H11V2H13V0H14V2Z" />
    <path d="M6.5 8.00667C7.88 8.00667 9 6.88667 9 5.50667C9 4.12667 7.88 3.00667 6.5 3.00667C5.12 3.00667 4 4.12667 4 5.50667C4 6.88667 5.12 8.00667 6.5 8.00667Z" />
    <path d="M0 14.0067C0 11.7967 4.66 10.5067 6.5 10.5067C8.34 10.5067 13 11.7967 13 14.0067V16.0067H0V14.0067Z" />
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z" />
  </svg>
);

const HeadphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.00305C6.486 2.00305 2 6.48905 2 12.003V20.003C2 21.107 2.895 22.003 4 22.003H6C7.104 22.003 8 21.107 8 20.003V17.003C8 15.899 7.104 15.003 6 15.003H4V12.003C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.003V15.003H18C16.896 15.003 16 15.899 16 17.003V20.003C16 21.107 16.896 22.003 18 22.003H20C21.104 22.003 22 21.107 22 20.003V12.003C22 6.48905 17.514 2.00305 12 2.00305Z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
  </svg>
);

const categories = [
  {
    name: 'Текстовые каналы',
    channels: [
      { name: 'trashbin', type: 'text', active: true },
      { name: 'лол', type: 'text' },
      { name: 'homm', type: 'text' },
      { name: 'newcomers', type: 'text' },
    ],
  },
  {
    name: 'Кубач',
    channels: [
      { name: 'Сракри и Ко', type: 'text' },
    ],
  },
  {
    name: 'Голосовые каналы',
    channels: [
      { name: 'смотрительная', type: 'voice' },
      { name: 'Основной', type: 'voice' },
      { name: 'afk', type: 'voice' },
      { name: 'Дотарды', type: 'voice' },
    ],
  },
  {
    name: 'Music-lul',
    channels: [
      { name: '1', type: 'text' },
      { name: '2', type: 'voice' },
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
          sporkedorkian infinity
          <span className="dropdown-arrow">▾</span>
        </span>
      </div>

      <div className="channel-list">
        {categories.map((cat) => (
          <div key={cat.name} className="channel-category">
            <div className="category-header" onClick={() => toggleCategory(cat.name)}>
              <span
                className="category-arrow"
                style={{ transform: collapsed[cat.name] ? 'rotate(-90deg)' : 'rotate(0)' }}
              >
                ▾
              </span>
              <span className="category-name">{cat.name}</span>
            </div>
            {!collapsed[cat.name] &&
              cat.channels.map((ch) => (
                <div
                  key={ch.name}
                  className={`channel-item${activeChannel === ch.name ? ' active' : ''}`}
                  onClick={() => ch.type === 'text' && onChannelSelect(ch.name)}
                >
                  <span className="channel-icon">
                    {ch.type === 'voice' ? <VoiceIcon /> : <HashIcon />}
                  </span>
                  <span className="channel-name">{ch.name}</span>
                  {activeChannel === ch.name && (
                    <div className="channel-actions">
                      <span className="channel-action-btn"><InviteIcon /></span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="user-panel">
        <div className="user-avatar-container">
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/80?img=5" alt="avatar" />
          </div>
          <div className="user-status-dot" style={{ background: '#23a559' }} />
        </div>
        <div className="user-info">
          <div className="user-name">hakutaku</div>
          <div className="user-tag">@bzhybzha</div>
        </div>
        <div className="user-controls">
          <button className="user-control-btn" title="Mute"><MicIcon /></button>
          <button className="user-control-btn" title="Deafen"><HeadphoneIcon /></button>
          <button className="user-control-btn" title="Settings"><SettingsIcon /></button>
        </div>
      </div>
    </div>
  );
}
