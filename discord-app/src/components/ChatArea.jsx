import { useState, useEffect, useRef, useCallback } from 'react';
import { channelTopics, currentUser } from '../data/mockMessages';
import { fetchMessages, sendMessage } from '../services/api';

const HashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z" />
  </svg>
);

const PinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15 9.87801L4.328 7.05601L2.913 8.47101L7.15 12.707L3.328 16.529L4.742 17.943L8.564 14.121L12.8 18.357L14.214 16.943L11.392 14.121L16.343 9.17001L17.757 10.585L19.172 9.17001L22 12Z" />
  </svg>
);

const MembersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 8C14.5 9.38 13.38 10.5 12 10.5C10.62 10.5 9.5 9.38 9.5 8C9.5 6.62 10.62 5.5 12 5.5C13.38 5.5 14.5 6.62 14.5 8ZM17.5 14.5C17.5 13.12 16.38 12 15 12C13.62 12 12.5 13.12 12.5 14.5C12.5 15.88 13.62 17 15 17C16.38 17 17.5 15.88 17.5 14.5ZM9 12C10.38 12 11.5 13.12 11.5 14.5C11.5 15.88 10.38 17 9 17C7.62 17 6.5 15.88 6.5 14.5C6.5 13.12 7.62 12 9 12ZM4 20C4 19 6 18 9 18C12 18 14 19 14 20V21H4V20ZM10 20C10 20 14 19 15 18C18 18 20 19 20 20V21H10V20Z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18C11.799 18 13.504 17.403 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16Z" />
  </svg>
);

const InboxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z" />
  </svg>
);

const HelpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.104 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z" />
  </svg>
);

const GiftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.97 9H16.2L17.14 3.32C17.24 2.74 16.82 2.21 16.24 2.12C15.65 2.03 15.12 2.44 15.03 3.02L13.97 9H10.03L8.97 3.02C8.88 2.44 8.35 2.03 7.76 2.12C7.18 2.21 6.76 2.74 6.86 3.32L7.8 9H2.03C1.46 9 1 9.45 1 10.01V11.99C1 12.55 1.46 13 2.03 13H8.51L9.49 18.98C9.58 19.56 10.11 19.97 10.7 19.88C11.28 19.79 11.7 19.26 11.6 18.68L10.68 13H13.32L12.4 18.68C12.3 19.26 12.72 19.79 13.3 19.88C13.89 19.97 14.42 19.56 14.51 18.98L15.49 13H21.97C22.54 13 23 12.55 23 11.99V10.01C23 9.45 22.54 9 21.97 9Z" />
  </svg>
);

const EmojiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.523 2 12 2ZM8.5 9.5C8.5 8.672 9.172 8 10 8C10.828 8 11.5 8.672 11.5 9.5C11.5 10.328 10.828 11 10 11C9.172 11 8.5 10.328 8.5 9.5ZM16.584 14.345C15.674 16.178 13.938 17.5 12 17.5C10.062 17.5 8.326 16.178 7.416 14.345C7.228 13.981 7.532 13.5 7.948 13.5H16.052C16.468 13.5 16.772 13.981 16.584 14.345ZM14 11C13.172 11 12.5 10.328 12.5 9.5C12.5 8.672 13.172 8 14 8C14.828 8 15.5 8.672 15.5 9.5C15.5 10.328 14.828 11 14 11Z" />
  </svg>
);

const StickerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.0002 0.00195312C5.3752 0.00195312 0.000195312 5.37695 0.000195312 12.002C0.000195312 18.627 5.3752 24.002 12.0002 24.002C18.6252 24.002 24.0002 18.627 24.0002 12.002C24.0002 5.37695 18.6252 0.00195312 12.0002 0.00195312ZM8.21919 7.00195C9.06919 7.00195 9.75919 7.69195 9.75919 8.54195C9.75919 9.39195 9.06919 10.082 8.21919 10.082C7.36919 10.082 6.67919 9.39195 6.67919 8.54195C6.67919 7.69195 7.36919 7.00195 8.21919 7.00195ZM18.0002 13.002C18.0002 16.317 15.3152 19.002 12.0002 19.002C8.6852 19.002 6.0002 16.317 6.0002 13.002H18.0002ZM15.7812 10.082C14.9312 10.082 14.2412 9.39195 14.2412 8.54195C14.2412 7.69195 14.9312 7.00195 15.7812 7.00195C16.6312 7.00195 17.3212 7.69195 17.3212 8.54195C17.3212 9.39195 16.6312 10.082 15.7812 10.082Z" />
  </svg>
);

const EMBED_IMG_WIDTH = 400;
const EMBED_IMG_HEIGHT = 225;

function EmbedImage({ src, onLoad }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div
      className="embed-image"
      style={{ width: EMBED_IMG_WIDTH, height: EMBED_IMG_HEIGHT, position: 'relative' }}
    >
      {!loaded && (
        <div
          className="embed-image-skeleton"
          style={{ width: EMBED_IMG_WIDTH, height: EMBED_IMG_HEIGHT }}
        />
      )}
      <img
        src={src}
        alt="embed"
        onLoad={handleLoad}
        style={{
          width: EMBED_IMG_WIDTH,
          height: EMBED_IMG_HEIGHT,
          objectFit: 'cover',
          display: loaded ? 'block' : 'none',
          borderRadius: '0 0 4px 0',
        }}
      />
    </div>
  );
}

export default function ChatArea({ activeChannel, wsMessages }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatAreaRef = useRef(null);
  const isChannelSwitch = useRef(true);

  useEffect(() => {
    let cancelled = false;
    isChannelSwitch.current = true;
    setMessages([]);
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
    if (!chatEndRef.current) return;
    if (isChannelSwitch.current) {
      requestAnimationFrame(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'instant' });
      });
      isChannelSwitch.current = false;
    } else {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleImageLoad = () => {
    if (chatAreaRef.current) {
      const el = chatAreaRef.current;
      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
      if (isNearBottom) {
        chatEndRef.current?.scrollIntoView({ behavior: 'instant' });
      }
    }
  };

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
        <div className="chat-header-channel">
          <span className="chat-header-icon"><HashIcon /></span>
          <span className="chat-header-name">{activeChannel}</span>
        </div>
        {topic && (
          <>
            <div className="chat-header-divider" />
            <span className="chat-header-topic">{topic}</span>
          </>
        )}
        <div className="chat-header-tools">
          <span className="header-tool-btn" title="Threads">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02462 16.8593L2.33267 15.1407C2.34298 15.0827 2.39359 15.04 2.45079 15.04H6.34709L7.57136 8.04H3.71418C3.63963 8.04 3.58312 7.97271 3.59607 7.89926L3.90412 6.18074C3.91442 6.12269 3.96503 6.08 4.02224 6.08H7.91854L8.60351 2.14098C8.61382 2.08294 8.66443 2.04025 8.72163 2.04025H10.4716C10.5462 2.04025 10.6027 2.10775 10.5897 2.18122L9.91854 6.08H14.8185L15.5035 2.14098C15.5138 2.08294 15.5644 2.04025 15.6216 2.04025H17.3716C17.4462 2.04025 17.5027 2.10775 17.4897 2.18122L16.8185 6.08H20.6757C20.7503 6.08 20.8068 6.14729 20.7938 6.22074L20.4858 7.93926C20.4755 7.99731 20.4249 8.04 20.3677 8.04H16.4712L15.2469 15.04H19.1041C19.1787 15.04 19.2352 15.1073 19.2222 15.1807L18.9142 16.8993C18.9039 16.9573 18.8533 17 18.7961 17H14.8996L14.2147 20.859C14.2044 20.917 14.1538 20.9598 14.0966 20.9598H12.3466C12.272 20.9598 12.2155 20.8922 12.2285 20.8188L12.8996 17H7.99958L7.31461 20.859C7.3043 20.917 7.25369 20.9598 7.19649 20.9598H5.43309V21ZM8.34709 15.04H13.2471L14.4713 8.04H9.57136L8.34709 15.04Z" /></svg>
          </span>
          <span className="header-tool-btn" title="Notification Settings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM12 22C13.657 22 15 20.657 15 19H9C9 20.657 10.343 22 12 22Z" /></svg>
          </span>
          <span className="header-tool-btn" title="Pinned Messages"><PinIcon /></span>
          <span className="header-tool-btn" title="Member List"><MembersIcon /></span>
          <div className="header-search">
            <input type="text" placeholder={`Search`} readOnly />
          </div>
          <span className="header-tool-btn" title="Inbox"><InboxIcon /></span>
          <span className="header-tool-btn" title="Help"><HelpIcon /></span>
        </div>
      </div>

      <div className="chat-area" ref={chatAreaRef}>
        <div className="welcome-section">
          <div className="welcome-hash-icon">#</div>
          <h1 className="welcome-title">Welcome to #{activeChannel}!</h1>
          <p className="welcome-description">
            This is the beginning of the #{activeChannel} channel. {topic}
          </p>
        </div>

        {loading && (
          <div className="loading-messages">Loading messages...</div>
        )}

        {messages.map((msg, idx) => {
          const prevMsg = idx > 0 ? messages[idx - 1] : null;
          const showHeader = !prevMsg || prevMsg.author !== msg.author || prevMsg.timestamp !== msg.timestamp;

          return (
            <div key={msg.id} className={`message${showHeader ? ' has-header' : ''}`}>
              {showHeader && (
                <div className="message-avatar">
                  <img src={msg.avatar} alt={msg.author} />
                </div>
              )}
              <div className="message-content">
                {showHeader && (
                  <div className="message-header">
                    <span className="message-author" style={{ color: msg.authorColor }}>
                      {msg.author}
                    </span>
                    {msg.isBot && <span className="message-bot-tag">BOT</span>}
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>
                )}
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
                      <EmbedImage src={msg.embed.image} onLoad={handleImageLoad} />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="message-input-container">
        <div className="message-input">
          <span className="input-attach-btn"><PlusCircleIcon /></span>
          <input
            className="message-input-field"
            type="text"
            placeholder={`Message #${activeChannel}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="input-tools">
            <span className="input-tool-btn"><GiftIcon /></span>
            <span className="input-tool-btn gif-btn">GIF</span>
            <span className="input-tool-btn"><StickerIcon /></span>
            <span className="input-tool-btn"><EmojiIcon /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
