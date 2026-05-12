import { channelMessages, channelTopics } from '../data/mockMessages';

const store = {};

Object.keys(channelMessages).forEach((ch) => {
  store[ch] = [...channelMessages[ch]];
});

let nextId = 9000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatTimestamp() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `Today at ${h}:${m}`;
}

export async function fetchMessages(channel) {
  await delay(200 + Math.random() * 300);
  if (!store[channel]) {
    store[channel] = [];
  }
  return { messages: [...store[channel]], topic: channelTopics[channel] || '' };
}

export async function sendMessage(channel, text, user) {
  await delay(100 + Math.random() * 200);
  const message = {
    id: nextId++,
    author: user.name,
    authorColor: user.color,
    isBot: false,
    avatar: user.avatar,
    timestamp: formatTimestamp(),
    text,
  };
  if (!store[channel]) {
    store[channel] = [];
  }
  store[channel].push(message);
  return message;
}

export function addMessageToStore(channel, message) {
  if (!store[channel]) {
    store[channel] = [];
  }
  store[channel].push(message);
}
