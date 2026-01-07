
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  handle: string;
  isOnline: boolean;
  followers?: number;
  clipsSold?: number;
  endorsements?: number;
  bio?: string;
  socials?: { twitter?: string; youtube?: string; website?: string };
  gear?: string[];
  skills?: string[];
  location?: string;
  availableForWork?: boolean;
  profileThemeColor?: 'indigo' | 'red' | 'green' | 'yellow';
  subscriptionPrice?: number;
  mentorshipRate?: number;
  role?: 'Producer' | 'Editor' | 'Performer' | 'Viewer' | 'Host' | 'Co-Host' | 'Guest' | 'Director' | 'Assistant' | 'Broadcast Engineer';
  isHost?: boolean;
}

export interface LicenseTier {
  name: 'Standard' | 'Extended' | 'Exclusive';
  price: number;
  description: string;
}

export interface VideoClip {
  id: string;
  title: string;
  description:string;
  creator: User;
  thumbnailUrl: string;
  videoUrl: string;
  price: number;
  tags: string[];
  duration: number;
  resolution: string;
  licenseTiers?: LicenseTier[];
}

export interface ProjectRequest {
  id: string;
  title: string;
  client: User;
  description: string;
  budget: number;
  deadline: string;
  tags: string[];
  bidsCount: number;
}

export interface Bid {
  id: string;
  creator: User;
  amount: number;
  proposal: string;
  timestamp: string;
}

export interface Collaboration {
  id: string;
  title: string;
  creator: User;
  description: string;
  rolesNeeded: string[];
  compensation: 'Paid' | 'Revenue Share' | 'For Credit';
}

export interface MentorshipSlot {
  id: string;
  mentor: User;
  date: string;
  time: string;
  duration: number;
  isBooked: boolean;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: 'To-Do' | 'In Progress' | 'Done';
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  assignees?: User[];
  dueDate: string; // ISO format or YYYY-MM-DD
  estimatedHours?: number;
  queuePosition?: number;
}

export interface Goal {
  id: string;
  title: string;
  currentValue: number;
  targetValue: number;
  metric: string;
}

export interface ServiceListing {
  id: string;
  creator: User;
  title: string;
  description: string;
  rate: number;
  rateType: 'per hour' | 'per project' | 'per day';
  skills: string[];
  thumbnailUrl: string;
}

export interface SplitParticipant {
  user: User;
  share: number;
}

export interface SplitContract {
  id: string;
  name: string;
  totalEarnings: number;
  participants: SplitParticipant[];
  status: 'Active' | 'Completed' | 'Archived';
}
