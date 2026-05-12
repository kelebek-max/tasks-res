const activityCards = [
  {
    user: 'спиркидирк',
    avatar: 'https://i.pravatar.cc/80?img=68',
    game: 'Dota 2',
    detail: '🎮 1d ago',
    gameIcon: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_184x69.jpg',
  },
  {
    user: 'спиркидирк',
    avatar: 'https://i.pravatar.cc/80?img=68',
    game: 'Deadlock',
    detail: 'Most played: 34h',
    gameIcon: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1422450/capsule_184x69.jpg',
  },
];

const memberGroups = [
  {
    title: 'котики :3',
    count: 5,
    members: [
      {
        name: 'борисжа',
        avatar: 'https://i.pravatar.cc/80?img=12',
        status: 'online',
        nameColor: '#e74c3c',
      },
      {
        name: 'paanikaameow',
        avatar: 'https://i.pravatar.cc/80?img=33',
        status: 'online',
        nameColor: '#3498db',
      },
      {
        name: 'psychopathy',
        avatar: 'https://i.pravatar.cc/80?img=15',
        status: 'online',
        nameColor: '#e67e22',
        activity: '🎵 https://www.twitch.tv/sk8sex...',
      },
      {
        name: 'Дву рожк',
        avatar: 'https://i.pravatar.cc/80?img=59',
        status: 'online',
        nameColor: '#e91e63',
        activity: '🟠 b z h y b z h a',
      },
      {
        name: 'коты',
        avatar: 'https://i.pravatar.cc/80?img=51',
        status: 'online',
        nameColor: '#9b59b6',
      },
    ],
  },
  {
    title: 'Online',
    count: 5,
    members: [
      {
        name: 'Cyberdroch',
        avatar: 'https://i.pravatar.cc/80?img=22',
        status: 'online',
        nameColor: '#dbdee1',
      },
      {
        name: 'FredBoat♪',
        avatar: 'https://i.pravatar.cc/80?img=60',
        status: 'online',
        nameColor: '#dbdee1',
        tag: 'APP',
        tagColor: '#5865f2',
        activity: 'music | /help',
      },
      {
        name: 'maexxe',
        avatar: 'https://i.pravatar.cc/80?img=7',
        status: 'online',
        nameColor: '#dbdee1',
      },
      {
        name: '♡yunochi♡',
        avatar: 'https://i.pravatar.cc/80?img=14',
        status: 'online',
        nameColor: '#dbdee1',
        tag: 'HATO',
        tagColor: '#ed4245',
      },
      {
        name: '🐱immortalfox',
        avatar: 'https://i.pravatar.cc/80?img=42',
        status: 'online',
        nameColor: '#dbdee1',
        tag: 'FOX',
        tagColor: '#e67e22',
        activity: '🎮 Escape from Tarkov •...',
      },
    ],
  },
  {
    title: 'Offline',
    count: 44,
    isOffline: true,
    members: [
      {
        name: 'Aa',
        avatar: 'https://i.pravatar.cc/80?img=1',
        status: 'offline',
        nameColor: '#949ba4',
      },
      {
        name: 'Agatha Kazar',
        avatar: 'https://i.pravatar.cc/80?img=2',
        status: 'offline',
        nameColor: '#949ba4',
      },
      {
        name: 'Astolfo',
        avatar: 'https://i.pravatar.cc/80?img=3',
        status: 'offline',
        nameColor: '#949ba4',
      },
      {
        name: 'batiks',
        avatar: 'https://i.pravatar.cc/80?img=4',
        status: 'offline',
        nameColor: '#949ba4',
      },
      {
        name: 'bleckmen',
        avatar: 'https://i.pravatar.cc/80?img=6',
        status: 'offline',
        nameColor: '#949ba4',
      },
    ],
  },
];

export default function MembersSidebar() {
  return (
    <div className="members-sidebar">
      {/* Activity section */}
      <div className="activity-section">
        <div className="activity-header">
          Activity — {activityCards.length} ⚙
        </div>
        {activityCards.map((card, idx) => (
          <div key={idx} className="activity-card">
            <div className="activity-card-icon">
              <img src={card.avatar} alt={card.user} />
            </div>
            <div className="activity-card-info">
              <div className="activity-card-user">{card.user}</div>
              <div className="activity-card-game">{card.game}</div>
              <div className="activity-card-detail">{card.detail}</div>
            </div>
            <div className="activity-card-game-icon">
              <img src={card.gameIcon} alt={card.game} />
            </div>
          </div>
        ))}
      </div>

      {/* Member groups */}
      {memberGroups.map((group) => (
        <div key={group.title} className="members-category">
          <div className="members-category-title">
            {group.title} — {group.count}
          </div>
          {group.members.map((member, idx) => (
            <div key={idx} className={`member-item${group.isOffline ? ' offline' : ''}`}>
              <div className="member-avatar-container">
                <div className="member-avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
                <div className={`member-status-dot ${member.status}`} />
              </div>
              <div className="member-info">
                <div className="member-name" style={{ color: member.nameColor }}>
                  {member.name}
                  {member.tag && (
                    <span
                      className="member-tag"
                      style={{ background: member.tagColor }}
                    >
                      ✓ {member.tag}
                    </span>
                  )}
                </div>
                {member.activity && (
                  <div className="member-activity">{member.activity}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
