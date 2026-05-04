import React from 'react';

function Message({ message }) {
  const { type, outgoing, time, read, sender } = message;
  const direction = outgoing ? 'outgoing' : 'incoming';

  if (type === 'photo') {
    return (
      <div className={`message ${direction}`}>
        <div className="message-bubble photo-message">
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
      <div className={`message ${direction}`}>
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
      <div className={`message ${direction}`}>
        <div className="message-bubble file-message">
          <div className="file-icon"><i className="fa-solid fa-arrow-down"></i></div>
          <div className="file-info">
            <span className="file-name">{message.fileName}</span>
            <span className="file-size">{message.fileSize}</span>
          </div>
          <span className="message-time">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${direction}`}>
      <div className="message-bubble">
        {sender && <div className="message-sender">{sender}</div>}
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
