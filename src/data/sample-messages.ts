export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

export interface Conversation {
  id: string;
  participant: Participant;
  messages: Message[];
  lastActivity: Date;
}

export const sampleMessages: Conversation[] = [
  {
    id: "1",
    participant: {
      id: "user1",
      name: "Alice Johnson",
      avatar: `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="18" fill="#FFB5A7"/><circle cx="18" cy="15" r="7" fill="#FCD5CE"/><path d="M18 35c6 0 11-4 11-10s-5-8-11-8-11 2-11 8 5 10 11 10z" fill="#FCD5CE"/></svg>')}`,
      status: "online",
    },
    messages: [
      {
        id: "m1",
        senderId: "user1",
        content: "Hey, how's the new project coming along?",
        timestamp: new Date("2024-01-15T10:00:00"),
        read: true,
      },
      {
        id: "m2",
        senderId: "current-user",
        content: "Going well! Just finished the main dashboard implementation.",
        timestamp: new Date("2024-01-15T10:05:00"),
        read: true,
      },
    ],
    lastActivity: new Date("2024-01-15T10:05:00"),
  },
  {
    id: "2",
    participant: {
      id: "user2",
      name: "Bob Smith",
      avatar: `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="18" fill="#A8DADC"/><circle cx="18" cy="15" r="7" fill="#1D3557"/><path d="M18 35c6 0 11-4 11-10s-5-8-11-8-11 2-11 8 5 10 11 10z" fill="#1D3557"/></svg>')}`,
      status: "away",
    },
    messages: [
      {
        id: "m3",
        senderId: "user2",
        content: "Can you review my pull request when you have a moment?",
        timestamp: new Date("2024-01-14T15:30:00"),
        read: true,
      },
    ],
    lastActivity: new Date("2024-01-14T15:30:00"),
  },
];
