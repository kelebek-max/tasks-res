import { useState } from 'react'
import ServerSidebar from './components/ServerSidebar'
import ChannelSidebar from './components/ChannelSidebar'
import ChatArea from './components/ChatArea'
import MembersSidebar from './components/MembersSidebar'
import './App.css'

function App() {
  const [activeChannel, setActiveChannel] = useState('technology')

  return (
    <div className="app">
      <ServerSidebar />
      <ChannelSidebar activeChannel={activeChannel} onChannelSelect={setActiveChannel} />
      <ChatArea activeChannel={activeChannel} />
      <MembersSidebar />
    </div>
  )
}

export default App
