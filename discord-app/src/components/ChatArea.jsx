const channelData = {
  technology: {
    topic: '🚂 Board the train to travel to the Technology Department.',
    welcome: {
      title: 'Welcome to #technology！',
      titleEmoji: '📺',
      description:
        'This is the start of the #technology！ 📺 channel. 🚂 Board the train to travel to the Technology Department.',
    },
    messages: [
      {
        id: 1,
        author: 'Eve',
        authorColor: '#e74c3c',
        isBot: true,
        avatar: 'https://i.pravatar.cc/80?img=47',
        timestamp: '09/14/2019',
        embed: {
          color: '#23a559',
          authorIcon: '🌐',
          authorName: '',
          title: 'Department of Technology',
          description:
            'This channel provides exclusive contents for everything regarding technology.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=280&fit=crop',
        },
      },
    ],
  },
  community: {
    topic: 'Welcome to the community!',
    welcome: {
      title: 'Welcome to #community！',
      titleEmoji: '',
      description: 'This is the start of the #community channel.',
    },
    messages: [],
  },
};

const defaultChannel = {
  topic: '',
  welcome: {
    title: 'Welcome!',
    titleEmoji: '',
    description: 'This is the start of the channel.',
  },
  messages: [],
};

export default function ChatArea({ activeChannel }) {
  const data = channelData[activeChannel] || defaultChannel;

  return (
    <div className="main-content">
      {/* Header */}
      <div className="chat-header">
        <span className="chat-header-hash">#</span>
        <span className="chat-header-name">{activeChannel}</span>
        {activeChannel === 'technology' && <span className="chat-header-emoji">📺</span>}
        {data.topic && (
          <>
            <div className="chat-header-divider" />
            <span className="chat-header-topic">{data.topic}</span>
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

      {/* Chat messages */}
      <div className="chat-area">
        <div className="welcome-section">
          <div className="welcome-hash-icon">#</div>
          <h1 className="welcome-title">
            {data.welcome.title} {data.welcome.titleEmoji && <span>{data.welcome.titleEmoji}</span>}{' '}
            ！
          </h1>
          <p className="welcome-description">{data.welcome.description}</p>
        </div>

        {data.messages.map((msg) => (
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
      </div>

      {/* Message input */}
      <div className="message-input-container">
        <div className="message-input">
          <span className="input-icon-btn">⊕</span>
          <input
            className="message-input-field"
            type="text"
            placeholder={`Message #${activeChannel}！ 📺`}
            readOnly
          />
          <span className="input-icon-btn">🎁</span>
          <span className="input-icon-btn">GIF</span>
          <span className="input-icon-btn">😀</span>
        </div>
      </div>
    </div>
  );
}
