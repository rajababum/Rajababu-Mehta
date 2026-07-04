/**
 * Types for Rajababu Mehta's Personal Portfolio
 */

export interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
  category: 'Portrait' | 'Nature' | 'Travel' | 'Other';
  isUserAdded?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'Web Development' | 'Design' | 'Open Source' | 'AI Integration';
  isUserAdded?: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
