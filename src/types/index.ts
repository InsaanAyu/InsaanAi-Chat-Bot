export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface ChatHistory {
  role: string;
  parts: { text: string }[];
}