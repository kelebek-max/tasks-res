const users = {
  dvuRozhk: { name: 'Дву рожк', color: '#e91e63', avatar: 'https://i.pravatar.cc/80?img=59' },
  paanikaameow: { name: 'paanikaameow', color: '#3498db', avatar: 'https://i.pravatar.cc/80?img=33' },
  agathaKazar: { name: 'Agatha Kazar', color: '#e67e22', avatar: 'https://i.pravatar.cc/80?img=2' },
  psychopathy: { name: 'psychopathy', color: '#e67e22', avatar: 'https://i.pravatar.cc/80?img=15' },
  borisZha: { name: 'борисжа', color: '#e74c3c', avatar: 'https://i.pravatar.cc/80?img=12' },
  maexxe: { name: 'maexxe', color: '#dbdee1', avatar: 'https://i.pravatar.cc/80?img=7' },
  cyberdroch: { name: 'Cyberdroch', color: '#dbdee1', avatar: 'https://i.pravatar.cc/80?img=22' },
  immortalfox: { name: '🐱immortalfox', color: '#dbdee1', avatar: 'https://i.pravatar.cc/80?img=42' },
  yunochi: { name: '♡yunochi♡', color: '#dbdee1', avatar: 'https://i.pravatar.cc/80?img=14' },
  fredboat: { name: 'FredBoat♪', color: '#dbdee1', isBot: true, avatar: 'https://i.pravatar.cc/80?img=60' },
};

let nextId = 1000;

function msg(user, text, timestamp, extra = {}) {
  return {
    id: nextId++,
    author: user.name,
    authorColor: user.color,
    isBot: user.isBot || false,
    avatar: user.avatar,
    timestamp,
    text,
    ...extra,
  };
}

export const channelMessages = {
  trashbin: [
    msg(users.dvuRozhk, 'https://tg.manekineko.eu.org/#@welcome', '26.01.2026, 3:53 AM', {
      embed: {
        color: '#0088cc',
        title: 'Telegram Web',
        description: 'Telegram is a cloud-based mobile and desktop messaging app with a focus on security and speed.',
      },
    }),
    msg(users.dvuRozhk, 'моя собственная селф-хостед телега', '26.01.2026, 3:53 AM'),
    msg(users.dvuRozhk, 'на замену матриксу', '26.01.2026, 3:53 AM'),
    msg(users.dvuRozhk, '(селфхост не только веб-клиент, но и сам сервер)', '26.01.2026, 3:53 AM'),
    msg(users.paanikaameow, 'Непо нятно', '26.01.2026, 3:56 AM'),
    msg(users.dvuRozhk, 'своя телега без контроля дурова на 100%', '26.01.2026, 4:04 AM'),
    msg(users.agathaKazar, 'Вообще ничего не понятно, а еще там палочка когда мышка заходит в правую часть экрана', '29.01.2026, 12:49 AM', {
      embed: {
        color: '#ff0000',
        authorIcon: '▶️',
        authorName: 'YouTube',
        title: '無類の猫好き',
        description: 'ハレ晴レユカイ .mp4',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
      },
    }),
  ],
  'лол': [
    msg(users.borisZha, 'кто тут? 👀', '20.01.2026, 11:30 PM'),
    msg(users.psychopathy, 'лол ты серьезно', '20.01.2026, 11:32 PM'),
    msg(users.maexxe, 'что вообще тут обсуждают', '21.01.2026, 12:15 AM'),
    msg(users.dvuRozhk, 'всё лол', '21.01.2026, 1:22 AM'),
    msg(users.cyberdroch, 'ладно забейте', '21.01.2026, 2:00 AM'),
  ],
  homm: [
    msg(users.immortalfox, 'кто-нибудь еще играет в Heroes III?', '15.01.2026, 8:30 PM'),
    msg(users.dvuRozhk, 'играю на HotA каждый вечер', '15.01.2026, 8:35 PM'),
    msg(users.borisZha, 'Necropolis лучшая фракция и это не обсуждается', '15.01.2026, 9:00 PM'),
    msg(users.paanikaameow, 'Castle > всё остальное', '15.01.2026, 9:05 PM'),
    msg(users.immortalfox, 'Conflux мощнее всех, если умеешь играть', '15.01.2026, 9:10 PM'),
    msg(users.dvuRozhk, 'давайте турнир замутим на выходных', '15.01.2026, 9:15 PM'),
  ],
  newcomers: [
    msg(users.fredboat, null, '01.01.2026, 12:00 AM', {
      embed: {
        color: '#5865f2',
        authorIcon: '📢',
        title: 'Правила сервера',
        description: '1. Будьте вежливы\n2. Без спама\n3. Используйте каналы по назначению\n4. Веселитесь!',
      },
    }),
    msg(users.yunochi, 'Привет всем! только зашла 🎉', '25.01.2026, 3:00 PM'),
    msg(users.borisZha, 'добро пожаловать! осваивайся', '25.01.2026, 3:05 PM'),
    msg(users.maexxe, 'welcome!', '25.01.2026, 3:10 PM'),
    msg(users.cyberdroch, 'заходи в голосовой канал, мы тут сидим', '25.01.2026, 3:15 PM'),
  ],
  'Сракри и Ко': [
    msg(users.dvuRozhk, 'кубач сегодня?', '28.01.2026, 6:00 PM'),
    msg(users.borisZha, 'да, я в 8 буду', '28.01.2026, 6:05 PM'),
    msg(users.psychopathy, 'я тоже зайду', '28.01.2026, 6:10 PM'),
    msg(users.immortalfox, 'Соберем полную пати?', '28.01.2026, 6:15 PM'),
    msg(users.dvuRozhk, 'го го го', '28.01.2026, 6:20 PM'),
  ],
};

export const channelTopics = {
  trashbin: '',
  'лол': '',
  homm: 'Heroes of Might and Magic обсуждения',
  newcomers: 'Канал для новых участников сервера',
  'Сракри и Ко': '',
};

export const currentUser = {
  name: 'hakutaku',
  color: '#e67e22',
  avatar: 'https://i.pravatar.cc/80?img=5',
  tag: '@bzhybzha',
};

export const wsSimUsers = [
  users.dvuRozhk,
  users.paanikaameow,
  users.agathaKazar,
  users.psychopathy,
  users.borisZha,
  users.maexxe,
  users.cyberdroch,
  users.immortalfox,
  users.yunochi,
];

export const wsSimMessages = {
  trashbin: [
    'кто онлайн?',
    'опять ничего не работает',
    'зашел чисто потрешить',
    'кто-нибудь может помочь?',
    'лол',
    'проверка связи 123',
  ],
  'лол': [
    'хахаха',
    'ну вы даете',
    'лоооооол',
    'серьезно?? 😂',
  ],
  homm: [
    'кто за HotA?',
    'Dungeon рулит',
    'артефакт грааля нашел случайно',
    'давайте 1v1',
  ],
  newcomers: [
    'привет! 👋',
    'я новенький тут',
    'всем салют',
  ],
  'Сракри и Ко': [
    'го в кубач?',
    'пати собираем',
    'кто последний?',
  ],
};
