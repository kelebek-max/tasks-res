import React from 'react';

function MessageAvatar({ avatar, showAvatar }) {
  if (!showAvatar) return null;
  if (!avatar) return <div className="msg-avatar-spacer" />;
  return (
    <img className="msg-avatar" src={avatar} alt="" />
  );
}

function Message({ message, isGroup, members, showAvatar }) {
  const { type, outgoing, time, read, sender } = message;
  const direction = outgoing ? 'outgoing' : 'incoming';
  const memberInfo = isGroup && sender && members ? members[sender] : null;
  const senderColor = memberInfo ? memberInfo.color : '#419fd9';
  const senderAvatar = memberInfo ? memberInfo.avatar : null;

  const avatarEl = !outgoing && isGroup ? (
    <MessageAvatar avatar={showAvatar ? senderAvatar : null} showAvatar={true} />
  ) : null;

  if (type === 'photo') {
    return (
      <div className={`message ${direction} ${isGroup && !outgoing ? 'has-avatar' : ''}`}>
        {avatarEl}
        <div className="message-bubble photo-message">
          {sender && isGroup && <div className="message-sender" style={{ color: senderColor }}>{sender}</div>}
          <div className="message-photo">
            <img src={message.photoUrl} alt="" />
          </div>
          <div className="message-photo-caption">
            <span>{message.caption}</span>
            <span className="message-time">{time}</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'voice') {
    return (
      <div className={`message ${direction} ${isGroup && !outgoing ? 'has-avatar' : ''}`}>
        {avatarEl}
        <div className="message-bubble voice-message">
          <button className="voice-play"><i className="fa-solid fa-play"></i></button>
          <div className="voice-waveform">
            <div className="waveform-track"><div className="waveform-dots"></div></div>
            <span className="voice-duration">{message.duration}</span>
          </div>
          <span className="message-time">
            {time} {read && <i className="fa-solid fa-check-double read"></i>}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'file') {
    return (
      <div className={`message ${direction} ${isGroup && !outgoing ? 'has-avatar' : ''}`}>
        {avatarEl}
        <div className="message-bubble file-message">
          {sender && isGroup && <div className="message-sender" style={{ color: senderColor }}>{sender}</div>}
          <div className="file-row">
            <div className="file-icon"><i className="fa-solid fa-arrow-down"></i></div>
            <div className="file-info">
              <span className="file-name">{message.fileName}</span>
              <span className="file-size">{message.fileSize}</span>
            </div>
            <span className="message-time">{time}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${direction} ${isGroup && !outgoing ? 'has-avatar' : ''}`}>
      {avatarEl}
      <div className="message-bubble">
        {sender && isGroup && <div className="message-sender" style={{ color: senderColor }}>{sender}</div>}
        {message.reply && (
          <div className="reply-block">
            <span className="reply-name">{message.reply.name}</span>
            <span className="reply-text">{message.reply.text}</span>
          </div>
        )}
        <p>{message.text}</p>
        <span className="message-time">
          {time} {read && <i className="fa-solid fa-check-double read"></i>}
        </span>
      </div>
    </div>
  );
}

export default Message;
