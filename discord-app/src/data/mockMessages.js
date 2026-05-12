const botUsers = {
  eve: { name: 'Eve', color: '#e74c3c', isBot: true, avatar: 'https://i.pravatar.cc/80?img=47' },
  max: { name: 'Max', color: '#3498db', isBot: true, avatar: 'https://i.pravatar.cc/80?img=68' },
};

const users = {
  crushallcakes: { name: 'Crushallcakes', color: '#e67e22', avatar: 'https://i.pravatar.cc/80?img=5' },
  peter: { name: '_PeterHealy', color: '#3498db', avatar: 'https://i.pravatar.cc/80?img=33' },
  alipal: { name: 'AliPal', color: '#e67e22', avatar: 'https://i.pravatar.cc/80?img=15' },
  astroman: { name: 'Astroman', color: '#e91e63', avatar: 'https://i.pravatar.cc/80?img=59' },
  atmoschem: { name: 'AtmosChem', color: '#9b59b6', avatar: 'https://i.pravatar.cc/80?img=51' },
  blindpyro: { name: 'blindpyro', color: '#2ecc71', avatar: 'https://i.pravatar.cc/80?img=22' },
  captain: { name: 'Captain HIVE', color: '#e74c3c', avatar: 'https://i.pravatar.cc/80?img=60' },
  dusto: { name: 'Dusto', color: '#1abc9c', avatar: 'https://i.pravatar.cc/80?img=7' },
  encephalic: { name: 'encephalic', color: '#e67e22', avatar: 'https://i.pravatar.cc/80?img=14' },
  euthii: { name: 'Euthii', color: '#3498db', avatar: 'https://i.pravatar.cc/80?img=42' },
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
  community: [
    msg(botUsers.max, null, '08/01/2019', {
      embed: {
        color: '#5865f2',
        authorIcon: '📢',
        title: 'Server Rules',
        description: '1. Be respectful to everyone\n2. No spam or self-promotion\n3. Use channels appropriately\n4. Have fun!',
      },
    }),
    msg(users.peter, 'Hey everyone! Just joined this server, looks awesome! 🎉', '08/02/2019'),
    msg(users.astroman, 'Welcome! You\'ll love it here. Check out the science channels!', '08/02/2019'),
    msg(users.dusto, 'Bonjour! Welcome aboard 👋', '08/02/2019'),
    msg(users.crushallcakes, 'This server has the best science discussions online', '08/03/2019'),
  ],
  astronomy: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#1a1a6e',
        authorIcon: '🔭',
        title: 'Department of Astronomy',
        description: 'Discuss stars, planets, galaxies, and the mysteries of the universe!',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=280&fit=crop',
      },
    }),
    msg(users.astroman, 'Did anyone see the Perseid meteor shower last night? It was incredible!', '09/15/2019'),
    msg(users.peter, 'Yes! I counted 47 meteors in about 2 hours 🌠', '09/15/2019'),
    msg(users.atmoschem, 'The ISS passed over my house at 3am, got some great photos', '09/16/2019'),
    msg(users.euthii, 'James Webb just released new images of NGC 7469. The detail is insane', '09/17/2019'),
    msg(users.blindpyro, 'Anyone have recommendations for a first telescope? Budget around $300', '09/18/2019'),
    msg(users.captain, 'Celestron NexStar 6SE is solid for beginners. Motorized tracking too', '09/18/2019'),
  ],
  biology: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#23a559',
        authorIcon: '🧬',
        title: 'Department of Biology',
        description: 'From cells to ecosystems — explore the science of life!',
      },
    }),
    msg(users.encephalic, 'New paper on CRISPR gene editing just dropped in Nature', '09/12/2019'),
    msg(users.alipal, 'The implications for genetic diseases are massive', '09/12/2019'),
    msg(users.peter, 'Has anyone done gel electrophoresis at home? Thinking about a DIY bio setup', '09/14/2019'),
    msg(users.dusto, 'I built a PCR machine from an Arduino. Happy to share the plans!', '09/14/2019'),
    msg(users.crushallcakes, 'That sounds awesome Dusto! Please share 🙏', '09/14/2019'),
  ],
  chemistry: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#f1c40f',
        authorIcon: '⚗️',
        title: 'Department of Chemistry',
        description: 'Reactions, compounds, and the elements that make up everything!',
      },
    }),
    msg(users.atmoschem, 'Just synthesized aspirin in my university lab today. Clean crystals! 💎', '09/11/2019'),
    msg(users.blindpyro, 'Nice! What yield did you get?', '09/11/2019'),
    msg(users.atmoschem, 'About 78% — not bad for a first attempt', '09/11/2019'),
    msg(users.encephalic, 'Anyone else fascinated by supramolecular chemistry? Host-guest interactions are wild', '09/13/2019'),
  ],
  economics: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#2ecc71',
        authorIcon: '📊',
        title: 'Department of Economics',
        description: 'Markets, policy, and the science of decision-making.',
      },
    }),
    msg(users.captain, 'The yield curve just inverted again. Thoughts on recession risk?', '09/15/2019'),
    msg(users.peter, 'Historically it\'s been a reliable indicator, but timing is always uncertain', '09/15/2019'),
    msg(users.dusto, 'Game theory applications in market design are fascinating', '09/16/2019'),
  ],
  engineering: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#e67e22',
        authorIcon: '⚙️',
        title: 'Department of Engineering',
        description: 'Build, design, and innovate — from bridges to microchips!',
      },
    }),
    msg(users.blindpyro, 'Working on an autonomous drone for my senior project 🤖', '09/12/2019'),
    msg(users.captain, 'What flight controller are you using?', '09/12/2019'),
    msg(users.blindpyro, 'Pixhawk 4 with ArduPilot. GPS + LIDAR for obstacle avoidance', '09/12/2019'),
    msg(users.euthii, 'Check out PX4 too — their SITL simulator is great for testing', '09/13/2019'),
    msg(users.crushallcakes, '3D printed a custom chassis for my robot arm. Took 14 hours to print!', '09/14/2019'),
  ],
  environment: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#27ae60',
        authorIcon: '🌍',
        title: 'Department of Environment',
        description: 'Climate, conservation, and our planet\'s future.',
      },
    }),
    msg(users.atmoschem, 'New IPCC report is out. Key takeaway: we need to act faster', '09/14/2019'),
    msg(users.alipal, 'South Africa is investing heavily in wind and solar. Positive trend 🇿🇦', '09/14/2019'),
    msg(users.astroman, 'Belgium just approved a new offshore wind farm. 2.3 GW capacity!', '09/15/2019'),
    msg(users.encephalic, 'Norway is leading in EV adoption — over 80% of new car sales are electric', '09/16/2019'),
  ],
  mathematics: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#9b59b6',
        authorIcon: '📐',
        title: 'Department of Mathematics',
        description: 'Numbers, proofs, and the language of the universe!',
      },
    }),
    msg(users.peter, 'Anyone working on Project Euler? Just solved problem 684', '09/13/2019'),
    msg(users.euthii, 'Nice! I\'m stuck on 700. The number theory ones are brutal', '09/13/2019'),
    msg(users.encephalic, 'Gödel\'s incompleteness theorems still blow my mind every time I think about them', '09/15/2019'),
    msg(users.dusto, 'Topology is just spicy geometry, change my mind 😄', '09/16/2019'),
  ],
  physics: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#e74c3c',
        authorIcon: '⚛️',
        title: 'Department of Physics',
        description: 'From quantum mechanics to cosmology — understand the fundamental forces!',
      },
    }),
    msg(users.astroman, 'Double-slit experiment never gets old. Watched the Veritasium video again', '09/12/2019'),
    msg(users.blindpyro, 'Quantum entanglement is basically magic and nobody can convince me otherwise', '09/12/2019'),
    msg(users.atmoschem, 'LHC just started Run 3. Hoping for some exotic particle discoveries!', '09/14/2019'),
    msg(users.peter, 'Anyone else following the muon g-2 results? Standard Model might need updating', '09/15/2019'),
    msg(users.captain, 'Fermilab\'s results were wild. 4.2 sigma deviation!', '09/15/2019'),
  ],
  psychology: [
    msg(botUsers.eve, null, '09/10/2019', {
      embed: {
        color: '#e91e63',
        authorIcon: '🧠',
        title: 'Department of Psychology',
        description: 'Understand the mind — cognition, behavior, and mental health.',
      },
    }),
    msg(users.encephalic, 'Just finished reading "Thinking, Fast and Slow" by Kahneman. Must read!', '09/13/2019'),
    msg(users.alipal, 'The dual process theory is such a useful mental model', '09/13/2019'),
    msg(users.crushallcakes, 'The Dunning-Kruger effect explains so much about social media 😅', '09/14/2019'),
    msg(users.dusto, 'Started my clinical psych rotation. Imposter syndrome is real', '09/16/2019'),
  ],
  technology: [
    msg(botUsers.eve, null, '09/14/2019', {
      embed: {
        color: '#23a559',
        authorIcon: '🌐',
        title: 'Department of Technology',
        description: 'This channel provides exclusive contents for everything regarding technology.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=280&fit=crop',
      },
    }),
    msg(users.captain, 'Just set up my homelab with Proxmox. Running 5 VMs on an old Dell server', '09/15/2019'),
    msg(users.blindpyro, 'Nice! What are you running on it?', '09/15/2019'),
    msg(users.captain, 'Plex, Pi-hole, Home Assistant, a Minecraft server, and a dev environment', '09/15/2019'),
    msg(users.euthii, 'Rust vs Go debate is heating up again on HN. Anyone here use Rust?', '09/16/2019'),
    msg(users.atmoschem, 'I switched from Python to Rust for my data pipeline. 50x speedup', '09/16/2019'),
    msg(users.peter, 'Linux 5.3 kernel just released. Better AMD GPU support!', '09/17/2019'),
    msg(users.dusto, 'TypeScript 3.7 optional chaining is a game changer', '09/18/2019'),
  ],
  lounge: [
    msg(users.dusto, 'Good morning everyone! ☕', '09/14/2019'),
    msg(users.astroman, 'Morning! Anyone watching the F1 race this weekend?', '09/14/2019'),
    msg(users.captain, 'Absolutely! Hamilton vs Verstappen is getting intense', '09/14/2019'),
    msg(users.crushallcakes, 'I just made the best pancakes of my life. Secret ingredient: vanilla extract', '09/15/2019'),
    msg(users.alipal, 'Share the recipe! 🥞', '09/15/2019'),
    msg(users.peter, 'It\'s raining cats and dogs here in Ireland 🌧️', '09/16/2019'),
    msg(users.blindpyro, 'Same here in the US east coast. Perfect gaming weather!', '09/16/2019'),
  ],
  arcade: [
    msg(users.captain, 'Anyone up for some Rainbow Six Siege tonight? 🎮', '09/12/2019'),
    msg(users.blindpyro, 'I\'m in! What time?', '09/12/2019'),
    msg(users.captain, '8 PM EST. Need 3 more for a full squad', '09/12/2019'),
    msg(users.euthii, 'Count me in!', '09/12/2019'),
    msg(users.astroman, 'Just got Borderlands 3. Co-op anyone?', '09/14/2019'),
    msg(users.dusto, 'Hollow Knight is the best metroidvania ever made, fight me', '09/15/2019'),
    msg(users.crushallcakes, 'Celeste would like a word 🍓', '09/15/2019'),
  ],
  music: [
    msg(users.blindpyro, '🎵 Currently listening to: Tool - Fear Inoculum. This album is a masterpiece', '09/13/2019'),
    msg(users.encephalic, 'Just discovered Haken. Progressive metal fans need to hear this', '09/13/2019'),
    msg(users.dusto, 'Lo-fi hip hop beats to study to is literally keeping me alive this semester', '09/14/2019'),
    msg(users.alipal, 'New Billie Eilish album dropped! Thoughts?', '09/15/2019'),
    msg(users.peter, 'Saw Muse live last week. Best concert of my life 🎸', '09/16/2019'),
  ],
  gallery: [
    msg(users.astroman, 'Just took this photo of the Milky Way from my backyard! 📸', '09/14/2019'),
    msg(users.alipal, 'Wow that\'s stunning! What camera and settings?', '09/14/2019'),
    msg(users.astroman, 'Sony A7III, 20mm f/1.8, 25sec exposure, ISO 3200', '09/14/2019'),
    msg(users.crushallcakes, 'Sharing my digital art of a cyberpunk cityscape 🌃', '09/15/2019'),
    msg(users.encephalic, 'That\'s incredible! What software do you use?', '09/15/2019'),
    msg(users.crushallcakes, 'Procreate on iPad Pro. Took about 12 hours total', '09/15/2019'),
  ],
};

export const channelTopics = {
  community: 'Welcome to the community! Say hi and introduce yourself.',
  astronomy: '🔭 Stars, planets, galaxies, and the cosmos.',
  biology: '🧬 From cells to ecosystems — the science of life.',
  chemistry: '⚗️ Reactions, compounds, and elements.',
  economics: '📊 Markets, policy, and decision-making.',
  engineering: '⚙️ Build, design, and innovate.',
  environment: '🌍 Climate, conservation, and sustainability.',
  mathematics: '📐 Numbers, proofs, and the language of the universe.',
  physics: '⚛️ Quantum mechanics to cosmology.',
  psychology: '🧠 Cognition, behavior, and mental health.',
  technology: '🚂 Board the train to travel to the Technology Department.',
  lounge: '☕ Hang out, chill, and chat about anything.',
  arcade: '🎮 Gaming discussions, LFG, and high scores.',
  music: '🎵 Share what you\'re listening to.',
  gallery: '📸 Share your art, photos, and creative works.',
};

export const currentUser = {
  name: 'Crushallcakes',
  color: '#e67e22',
  avatar: 'https://i.pravatar.cc/80?img=5',
  tag: '#8106',
};

export const wsSimUsers = [
  users.peter,
  users.astroman,
  users.atmoschem,
  users.captain,
  users.dusto,
  users.encephalic,
  users.euthii,
  users.alipal,
  users.blindpyro,
];

export const wsSimMessages = {
  technology: [
    'Has anyone tried the new VS Code update?',
    'Docker Desktop 4.0 is out — much faster on Mac',
    'I think WebAssembly is going to change everything',
    'Just deployed my first app on Kubernetes 🎉',
    'The new M1 MacBooks are insane for compilation times',
    'GraphQL vs REST — what do you prefer?',
  ],
  community: [
    'Hey everyone! 👋',
    'Happy Friday!',
    'This server is so active, love it',
    'Anyone going to the meetup this weekend?',
  ],
  astronomy: [
    'New exoplanet discovered in the habitable zone!',
    'Starlink is ruining astrophotography 😞',
    'Anyone have a dobsonian? Thinking of upgrading',
  ],
  biology: [
    'mRNA vaccines are such elegant technology',
    'Just finished a paper on epigenetics — fascinating field',
  ],
  chemistry: [
    'Organic chemistry exam tomorrow... wish me luck',
    'Just got a new fume hood for my home lab!',
  ],
  lounge: [
    'Good vibes only ✨',
    'Anyone watch the new Marvel show?',
    'Coffee or tea? This is important.',
    'It\'s 3am and I\'m still on this server lol',
  ],
  arcade: [
    'GG everyone!',
    'Anyone playing the new Zelda?',
    'Speedrunning Mario 64 — current PB is 18:32',
  ],
  physics: [
    'Quantum computing is getting closer to reality',
    'String theory or loop quantum gravity?',
  ],
  music: [
    'This beat is fire 🔥',
    'Recommended playlist for studying?',
  ],
};
