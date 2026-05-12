import { wsSimUsers, wsSimMessages } from '../data/mockMessages';
import { addMessageToStore } from './api';

let nextWsId = 50000;
let intervalId = null;
let listeners = [];

function formatTimestamp() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `Today at ${h}:${m}`;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMessage(channel) {
  const pool = wsSimMessages[channel] || wsSimMessages.technology;
  const user = randomItem(wsSimUsers);
  const text = randomItem(pool);
  return {
    id: nextWsId++,
    author: user.name,
    authorColor: user.color,
    isBot: false,
    avatar: user.avatar,
    timestamp: formatTimestamp(),
    text,
  };
}

export function connectWebSocket(onMessage) {
  listeners.push(onMessage);

  if (intervalId !== null) {
    return () => {
      listeners = listeners.filter((l) => l !== onMessage);
    };
  }

  const channels = Object.keys(wsSimMessages);

  intervalId = setInterval(() => {
    const channel = randomItem(channels);
    const message = generateMessage(channel);
    addMessageToStore(channel, message);
    listeners.forEach((cb) => cb({ channel, message }));
  }, 8000 + Math.random() * 12000);

  return () => {
    listeners = listeners.filter((l) => l !== onMessage);
    if (listeners.length === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}
