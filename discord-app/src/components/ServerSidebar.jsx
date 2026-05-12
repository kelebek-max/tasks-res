export default function ServerSidebar() {
  return (
    <div className="server-sidebar">
      {/* Discord Home */}
      <div className="server-icon discord-home">
        <svg width="28" height="20" viewBox="0 0 28 20">
          <path
            fill="currentColor"
            d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0292 1.4184C10.8251 0.934541 10.5765 0.461742 10.3416 0C8.49019 0.321373 6.68494 0.884052 4.97194 1.68377C1.14798 7.27203 0.0549516 12.7247 0.600278 18.1036C2.69483 19.6698 4.97929 20.8362 7.44217 21.5866C7.96522 20.8818 8.43372 20.1379 8.83789 19.3612C8.0893 19.0808 7.36484 18.7397 6.66069 18.3406C6.85287 18.2001 7.04058 18.0546 7.22234 17.905C11.7566 19.9992 16.7068 19.9992 21.1905 17.905C21.3749 18.0546 21.5627 18.2001 21.7501 18.3406C21.0433 18.7416 20.3187 19.0844 19.57 19.3659C19.975 20.1427 20.4434 20.8865 20.9665 21.5913C23.4323 20.8418 25.7195 19.6747 27.8141 18.1082C28.4585 11.8408 26.8766 6.4369 23.0212 1.67671Z"
          />
        </svg>
      </div>

      <div className="server-separator" />

      {/* Servers */}
      <div className="server-icon active" style={{ borderRadius: '16px' }}>
        <img src="https://i.pravatar.cc/80?img=30" alt="sporkedorkian infinity" />
      </div>

      <div className="server-icon" style={{ background: '#2b2d31' }}>
        <span style={{ fontSize: '20px' }}>R</span>
      </div>

      <div className="server-icon" style={{ background: '#7b4bb5' }}>
        <img src="https://i.pravatar.cc/80?img=35" alt="server" />
      </div>

      <div className="server-icon" style={{ background: '#313338' }}>
        <img src="https://i.pravatar.cc/80?img=48" alt="server" />
      </div>

      <div className="server-icon" style={{ background: '#e74c3c' }}>
        <img src="https://i.pravatar.cc/80?img=57" alt="server" />
      </div>

      <div className="server-icon" style={{ background: '#3498db' }}>
        <img src="https://i.pravatar.cc/80?img=65" alt="server" />
      </div>

      <div className="server-icon" style={{ background: '#313338' }}>
        <img src="https://i.pravatar.cc/80?img=44" alt="server" />
      </div>

      <div className="server-separator" />

      {/* Add server */}
      <div className="server-icon add-server">
        <span>+</span>
      </div>

      {/* Explore */}
      <div className="server-icon explore">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
          <path d="M9.036 7.884L7.894 9.018L14.938 16.116L16.079 14.98L9.036 7.884Z" />
          <path d="M14.936 7.886L7.892 14.982L9.034 16.118L16.078 9.022L14.936 7.886Z" />
        </svg>
      </div>
    </div>
  );
}
