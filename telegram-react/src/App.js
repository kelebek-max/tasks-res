import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import chats from './data';
import './App.css';

function App() {
  const [activeChatId, setActiveChatId] = useState(2);

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
      />
      <ChatPanel chat={activeChat} />
    </div>
  );
}

export default App;
