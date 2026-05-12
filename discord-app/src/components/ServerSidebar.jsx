const servers = [
  { id: 'home', type: 'home' },
  { id: 'sep1', type: 'separator' },
  { id: 'sci-tech', name: 'Science and Technology', color: '#2b2d31', emoji: '⚗️', active: true, img: null, text: '' },
  { id: 'popsci', name: 'Pop Sci', color: '#e74c3c', img: null, text: 'POP\nSCI', textColor: '#fff', fontSize: '10px', fontWeight: 800 },
  { id: 'ps', name: 'PS', color: '#3498db', img: null, text: 'PS', textColor: '#fff', fontSize: '18px', fontWeight: 700 },
  { id: 'green', name: 'Green Server', color: '#23a559', img: null, text: '', emoji: '🧑‍🔬' },
  { id: 'sep2', type: 'separator' },
  { id: 'add', type: 'add' },
  { id: 'explore', type: 'explore' },
];

export default function ServerSidebar() {
  return (
    <div className="server-sidebar">
      {servers.map((server) => {
        if (server.type === 'separator') {
          return <div key={server.id} className="server-separator" />;
        }
        if (server.type === 'home') {
          return (
            <div key={server.id} className="server-icon discord-home">
              <svg width="28" height="20" viewBox="0 0 28 20">
                <path
                  fill="currentColor"
                  d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0292 1.4184C10.8251 0.934541 10.5765 0.461742 10.3416 0C8.49019 0.321373 6.68494 0.884052 4.97194 1.68377C1.14798 7.27203 0.0549516 12.7247 0.600278 18.1036C2.69483 19.6698 4.97929 20.8362 7.44217 21.5866C7.96522 20.8818 8.43372 20.1379 8.83789 19.3612C8.0893 19.0808 7.36484 18.7397 6.66069 18.3406C6.85287 18.2001 7.04058 18.0546 7.22234 17.905C11.7566 19.9992 16.7068 19.9992 21.1905 17.905C21.3749 18.0546 21.5627 18.2001 21.7501 18.3406C21.0433 18.7416 20.3187 19.0844 19.57 19.3659C19.975 20.1427 20.4434 20.8865 20.9665 21.5913C23.4323 20.8418 25.7195 19.6747 27.8141 18.1082C28.4585 11.8408 26.8766 6.4369 23.0212 1.67671Z"
                />
              </svg>
            </div>
          );
        }
        if (server.type === 'add') {
          return (
            <div key={server.id} className="server-icon add-server">
              <span>+</span>
            </div>
          );
        }
        if (server.type === 'explore') {
          return (
            <div key={server.id} className="server-icon explore">
              <span>🧭</span>
            </div>
          );
        }
        return (
          <div
            key={server.id}
            className={`server-icon${server.active ? ' active' : ''}`}
            style={{ background: server.color }}
            title={server.name}
          >
            {server.emoji && <span style={{ fontSize: '24px' }}>{server.emoji}</span>}
            {server.text && (
              <span
                style={{
                  color: server.textColor || '#fff',
                  fontSize: server.fontSize || '14px',
                  fontWeight: server.fontWeight || 700,
                  lineHeight: 1.1,
                  textAlign: 'center',
                  whiteSpace: 'pre',
                }}
              >
                {server.text}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
