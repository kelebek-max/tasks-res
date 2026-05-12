const memberGroups = [
  {
    title: 'STAFF',
    emoji: '🔧',
    count: 1,
    members: [
      {
        name: 'Max',
        isBot: true,
        avatar: 'https://i.pravatar.cc/80?img=68',
        status: 'online',
        activity: 'Playing DM to Contact Staffs',
      },
    ],
  },
  {
    title: 'COMMUNITY HELPER',
    emoji: '❤️',
    count: 1,
    members: [
      {
        name: 'Eve',
        isBot: true,
        avatar: 'https://i.pravatar.cc/80?img=47',
        status: 'online',
        activity: '',
      },
    ],
  },
  {
    title: 'POSTGRADUATE',
    emoji: '💎',
    count: 28,
    members: [
      {
        name: '[A] Советская физик...',
        avatar: 'https://i.pravatar.cc/80?img=12',
        status: 'online',
        activity: 'sheep is life, sheep is love',
        nameColor: '#e74c3c',
      },
      {
        name: '_PeterHealy',
        flag: '🇮🇪',
        flagText: 'IE',
        avatar: 'https://i.pravatar.cc/80?img=33',
        status: 'online',
        nameColor: '#3498db',
      },
      {
        name: 'AliPal',
        flag: '🇿🇦',
        flagText: 'ZA',
        avatar: 'https://i.pravatar.cc/80?img=15',
        status: 'idle',
        activity: '✨',
        nameColor: '#e67e22',
      },
      {
        name: 'Astroman',
        flag: '🇧🇪',
        flagText: 'BE',
        avatar: 'https://i.pravatar.cc/80?img=59',
        status: 'online',
        activity: 'Babies are stored in the moust...',
        nameColor: '#e91e63',
      },
      {
        name: 'AtmosChem',
        flag: '🇺🇸',
        flagText: 'US',
        avatar: 'https://i.pravatar.cc/80?img=51',
        status: 'online',
        nameColor: '#9b59b6',
      },
      {
        name: 'blindpyro',
        flag: '🇺🇸',
        flagText: 'US',
        avatar: 'https://i.pravatar.cc/80?img=22',
        status: 'online',
        activity: '🎵',
        nameColor: '#2ecc71',
      },
      {
        name: 'Captain HIVE',
        flag: '🇨🇦',
        flagText: 'CA',
        avatar: 'https://i.pravatar.cc/80?img=60',
        status: 'online',
        activity: 'Playing Rainbow Six Siege 🎮',
        nameColor: '#e74c3c',
      },
      {
        name: 'Dusto',
        flag: '🇺🇸',
        flagText: 'US',
        avatar: 'https://i.pravatar.cc/80?img=7',
        status: 'online',
        activity: 'Bonjour',
        nameColor: '#1abc9c',
      },
      {
        name: 'encephalic',
        flag: '🇳🇴',
        flagText: 'NO',
        avatar: 'https://i.pravatar.cc/80?img=14',
        status: 'dnd',
        activity: '🔴 Now Dr. Enc',
        nameColor: '#e67e22',
      },
      {
        name: 'Euthii',
        flag: '🇺🇸',
        flagText: 'US',
        avatar: 'https://i.pravatar.cc/80?img=42',
        status: 'online',
        nameColor: '#3498db',
      },
    ],
  },
];

export default function MembersSidebar() {
  return (
    <div className="members-sidebar">
      {memberGroups.map((group) => (
        <div key={group.title} className="members-category">
          <div className="members-category-title">
            {group.title} {group.emoji} — {group.count}
          </div>
          {group.members.map((member, idx) => (
            <div key={idx} className="member-item">
              <div className="member-avatar-container">
                <div className="member-avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
                <div className={`member-status-dot ${member.status}`} />
              </div>
              <div className="member-info">
                <div className="member-name" style={{ color: member.nameColor || '#f2f3f5' }}>
                  {member.name}
                  {member.isBot && <span className="message-bot-tag" style={{ marginLeft: '4px', fontSize: '9px' }}>BOT</span>}
                  {member.flagText && (
                    <span className="flag" style={{ color: '#949ba4', fontWeight: 600, fontSize: '11px' }}>
                      {' '}- <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.flagText}</span>
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
