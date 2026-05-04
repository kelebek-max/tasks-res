import React, { useEffect, useRef } from 'react';
import Message from './Message';

function ChatPanel({ chat }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat?.id]);

  if (!chat) return <main className="chat-panel"><div className="no-chat">Select a chat to start messaging</div></main>;

  return (
    <main className="chat-panel">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-header-name">{chat.name}</div>
          <div className="chat-header-status">
            {chat.isGroup ? `${chat.messages.length} messages` : 'online'}
          </div>
        </div>
        <div className="chat-header-actions">
          <button><i className="fa-solid fa-magnifying-glass"></i></button>
          <button><i className="fa-solid fa-ellipsis-vertical"></i></button>
        </div>
      </div>

      <div className="chat-messages" ref={messagesRef}>
        {chat.messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>

      <div className="chat-input">
        <button className="input-action"><i className="fa-solid fa-paperclip"></i></button>
        <input type="text" placeholder="Write a message..." />
        <button className="input-action"><i className="fa-regular fa-face-smile"></i></button>
        <button className="input-action"><i className="fa-solid fa-microphone"></i></button>
      </div>
    </main>
  );
}

export default ChatPanel;
