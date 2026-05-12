import { useState, useEffect } from 'react'
import ServerSidebar from './components/ServerSidebar'
import ChannelSidebar from './components/ChannelSidebar'
import ChatArea from './components/ChatArea'
import MembersSidebar from './components/MembersSidebar'
import { connectWebSocket } from './services/mockWebSocket'
import './App.css'

function App() {
  const [activeChannel, setActiveChannel] = useState('trashbin')
  const [wsMessages, setWsMessages] = useState([])

  useEffect(() => {
    const disconnect = connectWebSocket((event) => {
      setWsMessages((prev) => [...prev, event])
    })
    return () => disconnect()
  }, [])

  return (
    <div className="app">
      <ServerSidebar />
      <ChannelSidebar activeChannel={activeChannel} onChannelSelect={setActiveChannel} />
      <ChatArea activeChannel={activeChannel} wsMessages={wsMessages} />
      <MembersSidebar />
    </div>
  )
}

export default App
