import React from 'react';

function Sidebar({ chats, activeChatId, onSelectChat }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="hamburger"><i className="fa-solid fa-bars"></i></button>
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item${chat.id === activeChatId ? ' active' : ''}`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="chat-avatar">
              {chat.avatar ? (
                <img src={chat.avatar} alt={chat.name} />
              ) : (
                <div className="avatar-initials" style={{ background: chat.initialsColor }}>
                  {chat.initials}
                </div>
              )}
            </div>
            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-name">
                  {chat.isGroup && <i className="fa-solid fa-users fa-xs"></i>}
                  {chat.name}
                </span>
                <span className="chat-time">
                  {chat.read && <i className="fa-solid fa-check-double read"></i>}
                  {chat.time}
                </span>
              </div>
              <div className="chat-bottom">
                <span className="chat-preview">
                  {chat.senderName && <span className="sender-name">{chat.senderName}:</span>}
                  {chat.previewEmoji && <span> {chat.previewEmoji} </span>}
                  {chat.previewIsMedia ? (
                    <span className="preview-media">{chat.preview}</span>
                  ) : (
                    chat.preview
                  )}
                </span>
                {chat.pinned && <i className="fa-solid fa-thumbtack chat-pin"></i>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
