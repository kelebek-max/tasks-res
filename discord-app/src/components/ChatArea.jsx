import { useState, useEffect, useRef } from 'react';
import { channelTopics, currentUser } from '../data/mockMessages';
import { fetchMessages, sendMessage } from '../services/api';

export default function ChatArea({ activeChannel, wsMessages }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchMessages(activeChannel).then(({ messages: msgs }) => {
      if (!cancelled) {
        setMessages(msgs);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [activeChannel]);

  useEffect(() => {
    if (wsMessages.length === 0) return;
    const last = wsMessages[wsMessages.length - 1];
    if (last.channel === activeChannel) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === last.message.id)) return prev;
        return [...prev, last.message];
      });
    }
  }, [wsMessages, activeChannel]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    const msg = await sendMessage(activeChannel, text, currentUser);
    setMessages((prev) => [...prev, msg]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const topic = channelTopics[activeChannel] || '';

  return (
    <div className="main-content">
      <div className="chat-header">
        <span className="chat-header-hash">#</span>
        <span className="chat-header-name">{activeChannel}</span>
        {activeChannel === 'technology' && <span className="chat-header-emoji">📺</span>}
        {topic && (
          <>
            <div className="chat-header-divider" />
            <span className="chat-header-topic">{topic}</span>
          </>
        )}
        <div className="chat-header-tools">
          <span className="header-tool-btn" title="Notification Settings">🔔</span>
          <span className="header-tool-btn" title="Pinned Messages">📌</span>
          <span className="header-tool-btn" title="Member List">👥</span>
          <div className="header-search">
            <input type="text" placeholder="Search" readOnly />
            <span className="header-search-icon">🔍</span>
          </div>
          <span className="header-tool-btn" title="Inbox">📥</span>
          <span className="header-tool-btn" title="Help">❓</span>
        </div>
      </div>

      <div className="chat-area" ref={chatAreaRef}>
        <div className="welcome-section">
          <div className="welcome-hash-icon">#</div>
          <h1 className="welcome-title">Welcome to #{activeChannel}！</h1>
          <p className="welcome-description">
            This is the start of the #{activeChannel} channel. {topic}
          </p>
        </div>

        {loading && (
          <div className="loading-messages">Loading messages...</div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <div className="message-avatar">
              <img src={msg.avatar} alt={msg.author} />
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-author" style={{ color: msg.authorColor }}>
                  {msg.author}
                </span>
                {msg.isBot && <span className="message-bot-tag">BOT</span>}
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
              {msg.text && <div className="message-text">{msg.text}</div>}
              {msg.embed && (
                <div className="embed" style={{ borderLeftColor: msg.embed.color }}>
                  <div className="embed-content">
                    {msg.embed.authorIcon && (
                      <div className="embed-author">
                        <span className="embed-author-icon">{msg.embed.authorIcon}</span>
                        <span className="embed-author-name">{msg.embed.authorName}</span>
                      </div>
                    )}
                    <div className="embed-title">{msg.embed.title}</div>
                    <div className="embed-description">{msg.embed.description}</div>
                  </div>
                  {msg.embed.image && (
                    <div className="embed-image">
                      <img src={msg.embed.image} alt="embed" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="message-input-container">
        <div className="message-input">
          <span className="input-icon-btn">⊕</span>
          <input
            className="message-input-field"
            type="text"
            placeholder={`Message #${activeChannel}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="input-icon-btn">🎁</span>
          <span className="input-icon-btn" style={{ fontWeight: 700, fontSize: '16px' }}>GIF</span>
          <span className="input-icon-btn">😀</span>
        </div>
      </div>
    </div>
  );
}
