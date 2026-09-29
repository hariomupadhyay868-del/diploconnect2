export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      colleges: {
        Row: {
          id: string
          name: string
          code: string
          state: string
          district: string
          city: string
          established: number | null
          type: string
          logo_url: string | null
          banner_url: string | null
          about: string | null
          website: string | null
          address: string | null
          student_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          code: string
          state?: string
          district: string
          city: string
          established?: number | null
          type?: string
          logo_url?: string | null
          banner_url?: string | null
          about?: string | null
          website?: string | null
          address?: string | null
          student_count?: number
        }
        Update: Partial<Database['public']['Tables']['colleges']['Insert']>
      }
      branches: {
        Row: {
          id: string
          code: string
          name: string
          category: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id: string
          code: string
          name: string
          category: string
          icon?: string | null
        }
        Update: Partial<Database['public']['Tables']['branches']['Insert']>
      }
      users: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          avatar_url: string | null
          banner_url: string | null
          headline: string | null
          state: string
          college_id: string | null
          branch_id: string | null
          semester: string
          start_year: number
          grad_year: number
          cgpa: string | null
          verification_status: 'Pending' | 'Verified' | 'Rejected' | 'Unverified'
          verification_badge: boolean
          connections_count: number
          role: 'student' | 'admin' | 'alumni' | 'faculty'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          headline?: string | null
          state?: string
          college_id?: string | null
          branch_id?: string | null
          semester?: string
          start_year?: number
          grad_year?: number
          cgpa?: string | null
          verification_status?: 'Pending' | 'Verified' | 'Rejected' | 'Unverified'
          verification_badge?: boolean
          connections_count?: number
          role?: 'student' | 'admin' | 'alumni' | 'faculty'
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      posts: {
        Row: {
          id: string
          author_id: string
          college_id: string | null
          branch_id: string | null
          category: string
          content: string
          media_url: string | null
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          college_id?: string | null
          branch_id?: string | null
          category?: string
          content: string
          media_url?: string | null
          likes_count?: number
        }
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          content: string
        }
        Update: Partial<Database['public']['Tables']['comments']['Insert']>
      }
      post_likes: {
        Row: {
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
        }
        Update: Partial<Database['public']['Tables']['post_likes']['Insert']>
      }
      connections: {
        Row: {
          id: string
          requester_id: string
          recipient_id: string
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          requester_id: string
          recipient_id: string
          status?: 'pending' | 'accepted' | 'rejected'
        }
        Update: Partial<Database['public']['Tables']['connections']['Insert']>
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          image_url: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          image_url?: string | null
          is_read?: boolean
        }
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          actor_id: string | null
          type: string
          title: string
          message: string
          link_url: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          actor_id?: string | null
          type: string
          title: string
          message: string
          link_url?: string | null
          is_read?: boolean
        }
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
      opportunities: {
        Row: {
          id: string
          title: string
          organization: string
          type: 'Internship' | 'Job' | 'Apprenticeship' | 'Hackathon' | 'Workshop'
          work_mode: string
          duration: string | null
          stipend: string | null
          deadline: string | null
          eligibility: string | null
          skills_required: string[] | null
          description: string
          apply_url: string | null
          posted_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          organization: string
          type: 'Internship' | 'Job' | 'Apprenticeship' | 'Hackathon' | 'Workshop'
          work_mode?: string
          duration?: string | null
          stipend?: string | null
          deadline?: string | null
          eligibility?: string | null
          skills_required?: string[] | null
          description: string
          apply_url?: string | null
          posted_by?: string | null
        }
        Update: Partial<Database['public']['Tables']['opportunities']['Insert']>
      }
      events: {
        Row: {
          id: string
          title: string
          organizer: string
          date: string
          time: string
          mode: string
          location: string | null
          banner_url: string | null
          description: string
          attendees_count: number
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          organizer: string
          date: string
          time: string
          mode: string
          location?: string | null
          banner_url?: string | null
          description: string
          attendees_count?: number
          created_by?: string | null
        }
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
    }
  }
}
