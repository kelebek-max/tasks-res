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
    messages: [
      { id: 1, type: 'text', text: 'Set sail at dawn!', time: '11:50 PM', outgoing: false, sender: 'Captain' },
      { id: 2, type: 'text', text: 'Aye aye!', time: '11:55 PM', outgoing: true, read: true },
      { id: 3, type: 'text', text: 'Yo-ho-ho, all aboard!', time: '0:02 AM', outgoing: false, sender: 'Jack' },
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
