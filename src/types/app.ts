import { Database } from './database.types';

export type UserRow = Database['public']['Tables']['users']['Row'];
export type PostRow = Database['public']['Tables']['posts']['Row'];
export type CollegeRow = Database['public']['Tables']['colleges']['Row'];
export type BranchRow = Database['public']['Tables']['branches']['Row'];
export type OpportunityRow = Database['public']['Tables']['opportunities']['Row'];
export type EventRow = Database['public']['Tables']['events']['Row'];
export type NotificationRow = Database['public']['Tables']['notifications']['Row'];
export type MessageRow = Database['public']['Tables']['messages']['Row'];

export interface ProfileWithDetails extends UserRow {
  collegeName?: string;
  branchName?: string;
  about?: string;
  skills?: string[];
  projects?: Array<{
    id: string;
    title: string;
    description: string;
    tech?: string[];
    github?: string;
    demo?: string;
    image?: string;
  }>;
  certifications?: Array<{
    id: string;
    title: string;
    org: string;
    issueDate: string;
    credentialId?: string;
  }>;
  internships?: Array<{
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
}

export interface PostWithAuthor extends PostRow {
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  collegeName: string;
  branchCode: string;
  likedByMe?: boolean;
  savedByMe?: boolean;
  commentsCount?: number;
}
