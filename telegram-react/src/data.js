const chats = [
  {
    id: 1,
    name: 'Death Star 3.0',
    avatar: null,
    initials: 'DS',
    initialsColor: '#5c6bc0',
    isGroup: true,
    time: '7:15 PM',
    preview: "I'll trust you. For now.",
    senderName: 'Darth',
    pinned: true,
    members: {
      'Vader': { avatar: 'https://ui-avatars.com/api/?name=DV&background=d32f2f&color=fff&size=36', color: '#d32f2f' },
      'Darth': { avatar: 'https://ui-avatars.com/api/?name=DS&background=424242&color=fff&size=36', color: '#e53935' },
      'Palpatine': { avatar: 'https://ui-avatars.com/api/?name=EP&background=6a1b9a&color=fff&size=36', color: '#8e24aa' },
    },
    messages: [
      { id: 1, type: 'text', text: 'The plans are ready, my lord.', time: '7:10 PM', outgoing: false, sender: 'Vader' },
      { id: 2, type: 'text', text: 'Excellent. Begin construction immediately.', time: '7:12 PM', outgoing: true },
      { id: 3, type: 'text', text: "I'll trust you. For now.", time: '7:15 PM', outgoing: false, sender: 'Darth' },
    ]
  },
  {
    id: 2,
    name: 'Eva Summer',
    avatar: null,
    initials: 'ES',
    initialsColor: '#4caf50',
    isGroup: false,
    time: '11:28 PM',
    preview: 'Reminds me of a Chinese prove...',
    messages: [
      {
        id: 1, type: 'photo', time: '11:23 PM', outgoing: false,
        photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop',
        caption: 'I finally visited Earth.. The nature here is fantastic!'
      },
      { id: 2, type: 'voice', time: '11:24 PM', outgoing: true, duration: '00:07', read: true },
      { id: 3, type: 'file', time: '11:27 PM', outgoing: false, fileName: 'First Impression.pdf', fileSize: '11.2 KB' },
      {
        id: 4, type: 'text', time: '11:28 PM', outgoing: true, read: true,
        text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails."
      },
      { id: 5, type: 'text', time: '11:28 PM', outgoing: true, read: true, text: 'Mark Twain said that ☝' },
      {
        id: 6, type: 'text', time: '11:28 PM', outgoing: false,
        text: 'Reminds me of a Chinese proverb: the best time to plant a tree was 20 years ago. The second best time is now.',
        reply: { name: 'Mary Sue', text: 'Twenty years from now you will be more disappointed by t...' }
      },
    ]
  },
  {
    id: 3,
    name: 'Lena Oxton',
    avatar: 'https://ui-avatars.com/api/?name=LO&background=e91e63&color=fff&size=50',
    isGroup: false,
    time: '9:17 PM',
    preview: 'Sticker',
    previewEmoji: '😊',
    previewIsMedia: true,
    read: true,
    messages: [
      { id: 1, type: 'text', text: 'Hey! Check out this new sticker pack!', time: '9:10 PM', outgoing: false },
      { id: 2, type: 'text', text: "That's awesome! 😄", time: '9:12 PM', outgoing: true, read: true },
      { id: 3, type: 'text', text: '😊', time: '9:17 PM', outgoing: true, read: true },
    ]
  },
  {
    id: 4,
    name: 'Mom',
    avatar: 'https://ui-avatars.com/api/?name=Mom&background=ff9800&color=fff&size=50',
    isGroup: false,
    time: '8:02 PM',
    preview: "Don't forget your blaster and helmet",
    messages: [
      { id: 1, type: 'text', text: 'Are you coming for dinner today?', time: '7:55 PM', outgoing: false },
      { id: 2, type: 'text', text: "Yes mom, I'll be there at 7!", time: '7:58 PM', outgoing: true, read: true },
      { id: 3, type: 'text', text: "Don't forget your blaster and helmet", time: '8:02 PM', outgoing: false },
    ]
  },
  {
    id: 5,
    name: 'Pandas HQ',
    avatar: 'https://ui-avatars.com/api/?name=PH&background=009688&color=fff&size=50',
    isGroup: true,
    time: '1:14 AM',
    preview: 'Photo',
    senderName: 'Eva',
    previewIsMedia: true,
    members: {
      'Mike': { avatar: 'https://ui-avatars.com/api/?name=MK&background=1565c0&color=fff&size=36', color: '#1565c0' },
      'Eva': { avatar: 'https://ui-avatars.com/api/?name=EV&background=2e7d32&color=fff&size=36', color: '#2e7d32' },
      'Sarah': { avatar: 'https://ui-avatars.com/api/?name=SR&background=c62828&color=fff&size=36', color: '#c62828' },
    },
    messages: [
      { id: 1, type: 'text', text: 'Team meeting at 3 PM today', time: '12:30 AM', outgoing: false, sender: 'Mike' },
      { id: 2, type: 'text', text: 'Got it, thanks!', time: '12:45 AM', outgoing: true, read: true },
      {
        id: 3, type: 'photo', time: '1:14 AM', outgoing: false, sender: 'Eva',
        photoUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=250&fit=crop',
        caption: 'Look at this cute panda!'
      },
    ]
  },
  {
    id: 6,
    name: 'Old Pirates',
    avatar: 'https://ui-avatars.com/api/?name=OP&background=795548&color=fff&size=50',
    isGroup: true,
    time: '0:02 AM',
    preview: 'Yo-ho-ho, all aboard!',
    senderName: 'Jack',
    members: {
      'Captain': { avatar: 'https://ui-avatars.com/api/?name=CP&background=4e342e&color=fff&size=36', color: '#4e342e' },
      'Jack': { avatar: 'https://ui-avatars.com/api/?name=JK&background=bf360c&color=fff&size=36', color: '#bf360c' },
      'Will': { avatar: 'https://ui-avatars.com/api/?name=WT&background=0d47a1&color=fff&size=36', color: '#0d47a1' },
    },
    messages: [
      { id: 1, type: 'text', text: 'Set sail at dawn!', time: '11:50 PM', outgoing: false, sender: 'Captain' },
      { id: 2, type: 'text', text: 'Aye aye!', time: '11:55 PM', outgoing: true, read: true },
      { id: 3, type: 'text', text: 'Yo-ho-ho, all aboard!', time: '0:02 AM', outgoing: false, sender: 'Jack' },
    ]
  },
  {
    id: 10,
    name: 'Dev Team',
    avatar: null,
    initials: 'DT',
    initialsColor: '#1976d2',
    isGroup: true,
    time: '6:45 PM',
    preview: 'Alex: I can review it now',
    senderName: 'Alex',
    members: {
      'Alex': { avatar: 'https://ui-avatars.com/api/?name=AX&background=1976d2&color=fff&size=36', color: '#1976d2' },
      'Nina': { avatar: 'https://ui-avatars.com/api/?name=NI&background=ad1457&color=fff&size=36', color: '#ad1457' },
      'Tom': { avatar: 'https://ui-avatars.com/api/?name=TM&background=00695c&color=fff&size=36', color: '#00695c' },
      'Kate': { avatar: 'https://ui-avatars.com/api/?name=KT&background=e65100&color=fff&size=36', color: '#e65100' },
    },
    messages: [
      { id: 1, type: 'text', text: 'Hey team, the new build is ready for testing', time: '5:30 PM', outgoing: false, sender: 'Alex' },
      { id: 2, type: 'text', text: 'Awesome! I found a bug in the login flow though', time: '5:35 PM', outgoing: false, sender: 'Nina' },
      { id: 3, type: 'text', text: "Can you create a ticket for it?", time: '5:40 PM', outgoing: true, read: true },
      { id: 4, type: 'text', text: 'Already done! JIRA-2048', time: '5:42 PM', outgoing: false, sender: 'Nina' },
      { id: 5, type: 'text', text: 'I pushed a hotfix to the staging branch', time: '6:00 PM', outgoing: false, sender: 'Tom' },
      { id: 6, type: 'file', time: '6:15 PM', outgoing: false, sender: 'Tom', fileName: 'bugfix-report.pdf', fileSize: '3.4 KB' },
      { id: 7, type: 'text', text: 'Nice work Tom! 🎉', time: '6:20 PM', outgoing: true, read: true },
      { id: 8, type: 'text', text: 'Should we deploy to production today?', time: '6:30 PM', outgoing: false, sender: 'Kate' },
      { id: 9, type: 'text', text: "Let's wait for the PR review first", time: '6:35 PM', outgoing: true, read: true },
      { id: 10, type: 'text', text: 'I can review it now', time: '6:45 PM', outgoing: false, sender: 'Alex' },
    ]
  },
  {
    id: 7,
    name: 'Max Bright',
    avatar: null,
    initials: 'MB',
    initialsColor: '#4caf50',
    isGroup: false,
    time: 'Mon',
    preview: 'Coffee time? ☕',
    read: true,
    messages: [
      { id: 1, type: 'text', text: 'How was your weekend?', time: 'Mon 9:00 AM', outgoing: false },
      { id: 2, type: 'text', text: 'Pretty good! Went hiking.', time: 'Mon 9:15 AM', outgoing: true, read: true },
      { id: 3, type: 'text', text: 'Coffee time? ☕', time: 'Mon 10:00 AM', outgoing: true, read: true },
    ]
  },
  {
    id: 8,
    name: 'Lee',
    avatar: 'https://ui-avatars.com/api/?name=Lee&background=3f51b5&color=fff&size=50',
    isGroup: false,
    time: 'Mon',
    preview: 'We can call it Galaxy Star 7 ;)',
    messages: [
      { id: 1, type: 'text', text: 'Have you seen the new phone specs?', time: 'Mon 2:00 PM', outgoing: false },
      { id: 2, type: 'text', text: 'Yeah, looks amazing!', time: 'Mon 2:15 PM', outgoing: true },
      { id: 3, type: 'text', text: 'We can call it Galaxy Star 7 ;)', time: 'Mon 3:00 PM', outgoing: false },
    ]
  },
  {
    id: 9,
    name: 'Alexandra Z',
    avatar: 'https://ui-avatars.com/api/?name=AZ&background=9c27b0&color=fff&size=50',
    isGroup: false,
    time: 'Mon',
    preview: 'Workout_Shedule.pdf',
    previewIsMedia: true,
    messages: [
      { id: 1, type: 'text', text: 'Here is the workout plan for this week', time: 'Mon 8:00 AM', outgoing: false },
      { id: 2, type: 'file', time: 'Mon 8:01 AM', outgoing: false, fileName: 'Workout_Shedule.pdf', fileSize: '24.5 KB' },
      { id: 3, type: 'text', text: 'Thanks! Will check it out', time: 'Mon 8:30 AM', outgoing: true, read: true },
    ]
  },
];

export default chats;
