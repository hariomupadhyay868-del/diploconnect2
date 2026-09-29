-- DiplomaConnect Complete PostgreSQL Database DDL Migration Schema
-- Covers all 23+ normalized entities with RLS policies, foreign keys, triggers, and indexes.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COLLEGES TABLE
CREATE TABLE IF NOT EXISTS public.colleges (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    state VARCHAR(50) NOT NULL DEFAULT 'BR',
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    established INT,
    type VARCHAR(100) NOT NULL DEFAULT 'Government',
    logo_url TEXT,
    banner_url TEXT,
    about TEXT,
    website TEXT,
    address TEXT,
    student_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BRANCHES TABLE
CREATE TABLE IF NOT EXISTS public.branches (
    id TEXT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. COLLEGE_BRANCHES (M:N Relationship)
CREATE TABLE IF NOT EXISTS public.college_branches (
    college_id TEXT REFERENCES public.colleges(id) ON DELETE CASCADE,
    branch_id TEXT REFERENCES public.branches(id) ON DELETE CASCADE,
    PRIMARY KEY (college_id, branch_id)
);

-- 4. USERS TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    avatar_url TEXT,
    banner_url TEXT,
    headline TEXT,
    state VARCHAR(50) DEFAULT 'BR',
    college_id TEXT REFERENCES public.colleges(id) ON DELETE SET NULL,
    branch_id TEXT REFERENCES public.branches(id) ON DELETE SET NULL,
    semester VARCHAR(50) NOT NULL DEFAULT '1st Semester',
    start_year INT DEFAULT 2023,
    grad_year INT DEFAULT 2026,
    cgpa VARCHAR(20),
    verification_status VARCHAR(50) DEFAULT 'Pending' CHECK (verification_status IN ('Pending', 'Verified', 'Rejected', 'Unverified')),
    verification_badge BOOLEAN DEFAULT FALSE,
    connections_count INT DEFAULT 0,
    role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'admin', 'alumni', 'faculty')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROFILES TABLE (Detailed About summary & settings)
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    about TEXT,
    cgpa VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    college_id TEXT REFERENCES public.colleges(id) ON DELETE SET NULL,
    branch_id TEXT REFERENCES public.branches(id) ON DELETE SET NULL,
    start_year INT NOT NULL,
    end_year INT NOT NULL,
    semester VARCHAR(50),
    cgpa_percentage VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. USER_SKILLS (M:N Relationship)
CREATE TABLE IF NOT EXISTS public.user_skills (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, skill_id)
);

-- 9. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    tech_stack TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date VARCHAR(100) NOT NULL,
    credential_id VARCHAR(255),
    credential_url TEXT,
    certificate_file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    date VARCHAR(100),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    college_id TEXT REFERENCES public.colleges(id) ON DELETE CASCADE,
    branch_id TEXT REFERENCES public.branches(id) ON DELETE CASCADE,
    category VARCHAR(100) DEFAULT 'General',
    content TEXT NOT NULL,
    media_url TEXT,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. POST_LIKES TABLE
CREATE TABLE IF NOT EXISTS public.post_likes (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

-- 15. POST_BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.post_bookmarks (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

-- 16. CONNECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_connection UNIQUE (requester_id, recipient_id)
);

-- 17. FOLLOWERS TABLE
CREATE TABLE IF NOT EXISTS public.followers (
    follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- 18. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_a UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    participant_b UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_participants UNIQUE (participant_a, participant_b)
);

-- 19. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    organizer VARCHAR(255) NOT NULL,
    date VARCHAR(100) NOT NULL,
    time VARCHAR(100) NOT NULL,
    mode VARCHAR(100) NOT NULL,
    location TEXT,
    banner_url TEXT,
    description TEXT NOT NULL,
    attendees_count INT DEFAULT 0,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. EVENT_REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.event_registrations (
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

-- 23. OPPORTUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL DEFAULT 'Internship' CHECK (type IN ('Internship', 'Job', 'Apprenticeship', 'Hackathon', 'Workshop')),
    work_mode VARCHAR(100) DEFAULT 'On-site',
    duration VARCHAR(100),
    stipend VARCHAR(100),
    deadline VARCHAR(100),
    eligibility TEXT,
    skills_required TEXT[],
    description TEXT NOT NULL,
    apply_url TEXT,
    posted_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. OPPORTUNITY_APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.opportunity_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    cover_note TEXT,
    status VARCHAR(50) DEFAULT 'applied' CHECK (status IN ('applied', 'under_review', 'shortlisted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. COMMUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.communities (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT,
    members_count INT DEFAULT 0,
    banner_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. COMMUNITY_MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.community_members (
    community_id TEXT REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (community_id, user_id)
);

-- 27. REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    target_type VARCHAR(50) NOT NULL CHECK (target_type IN ('post', 'user', 'comment')),
    target_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR OPTIMAL QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_users_college ON public.users(college_id);
CREATE INDEX IF NOT EXISTS idx_users_branch ON public.users(branch_id);
CREATE INDEX IF NOT EXISTS idx_posts_college ON public.posts(college_id);
CREATE INDEX IF NOT EXISTS idx_posts_branch ON public.posts(branch_id);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_connections_requester ON public.connections(requester_id);
CREATE INDEX IF NOT EXISTS idx_connections_recipient ON public.connections(recipient_id);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
-- Public Read Access
CREATE POLICY "Public colleges readable" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Public branches readable" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Public users readable" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public posts readable" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public comments readable" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Public opportunities readable" ON public.opportunities FOR SELECT USING (true);
CREATE POLICY "Public events readable" ON public.events FOR SELECT USING (true);

-- Authenticated User Writes
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users update own posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users delete own posts" ON public.posts FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Users create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users toggle likes" ON public.post_likes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Messages accessible by participants" ON public.messages FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.conversations c 
        WHERE c.id = conversation_id AND (c.participant_a = auth.uid() OR c.participant_b = auth.uid())
    )
);

CREATE POLICY "Notifications read by owner" ON public.notifications FOR ALL USING (auth.uid() = user_id);
