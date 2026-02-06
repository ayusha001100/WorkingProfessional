/**
 * Dynamic Data Generator Utilities
 * Generates personalized content based on user data
 */

// ============================================
// USER GREETING & PERSONALIZATION
// ============================================

export const getUserGreeting = (userData) => {
    const hour = new Date().getHours();
    const name = userData?.name || userData?.displayName || 'there';

    let timeGreeting = '';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 17) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    return `${timeGreeting}, ${name}!`;
};

export const getMotivationalMessage = (userData) => {
    const streak = userData?.stats?.streak || 0;
    const xp = userData?.progress?.xp || 0;
    const completedSections = userData?.progress?.completedSections?.length || 0;

    const messages = [
        `You're on a ${streak}-day streak! Keep it going! 🔥`,
        `${xp} XP earned so far. You're making great progress! ⭐`,
        `${completedSections} sections completed. You're unstoppable! 🚀`,
        `Every expert was once a beginner. Keep learning! 💪`,
        `Your future self will thank you for learning today! 🌟`
    ];

    if (streak > 0) return messages[0];
    if (xp > 100) return messages[1];
    if (completedSections > 5) return messages[2];

    return messages[Math.floor(Math.random() * messages.length)];
};

// ============================================
// JOB RECOMMENDATIONS
// ============================================

export const generatePersonalizedJobs = (userData) => {
    const userSkills = userData?.profile?.skills || [];
    const targetRole = userData?.profile?.targetRole || userData?.onboarding?.dreamRole || 'AI Engineer';
    const city = userData?.location?.city || 'Remote';
    const minSalary = userData?.profile?.salaryExpectation?.min || 10;
    const maxSalary = userData?.profile?.salaryExpectation?.max || 30;
    const experience = userData?.profile?.experience || 0;

    // Job templates based on target role
    const jobTemplates = {
        'AI Engineer': [
            { title: 'AI Engineer', company: 'TechCorp AI', skills: ['Python', 'TensorFlow', 'PyTorch'], salaryMultiplier: 1.2 },
            { title: 'Machine Learning Engineer', company: 'DataMinds', skills: ['Python', 'Scikit-learn', 'Keras'], salaryMultiplier: 1.1 },
            { title: 'AI Research Engineer', company: 'InnovateLabs', skills: ['Python', 'Deep Learning', 'NLP'], salaryMultiplier: 1.3 }
        ],
        'Data Scientist': [
            { title: 'Data Scientist', company: 'Analytics Pro', skills: ['Python', 'R', 'SQL'], salaryMultiplier: 1.1 },
            { title: 'Senior Data Analyst', company: 'DataWorks', skills: ['Python', 'Tableau', 'Statistics'], salaryMultiplier: 1.0 },
            { title: 'ML Data Scientist', company: 'AI Solutions', skills: ['Python', 'Machine Learning', 'Statistics'], salaryMultiplier: 1.2 }
        ],
        'Full Stack Developer': [
            { title: 'Full Stack Developer', company: 'WebTech', skills: ['React', 'Node.js', 'MongoDB'], salaryMultiplier: 1.0 },
            { title: 'Senior Full Stack Engineer', company: 'DevCorp', skills: ['React', 'Python', 'PostgreSQL'], salaryMultiplier: 1.2 },
            { title: 'MERN Stack Developer', company: 'StartupHub', skills: ['React', 'Express', 'MongoDB'], salaryMultiplier: 0.9 }
        ],
        'default': [
            { title: `${targetRole}`, company: 'TechVentures', skills: ['Communication', 'Problem Solving'], salaryMultiplier: 1.0 },
            { title: `Junior ${targetRole}`, company: 'GrowthCo', skills: ['Learning', 'Adaptability'], salaryMultiplier: 0.8 },
            { title: `Senior ${targetRole}`, company: 'EliteTech', skills: ['Leadership', 'Strategy'], salaryMultiplier: 1.3 }
        ]
    };

    const templates = jobTemplates[targetRole] || jobTemplates['default'];

    return templates.map((template, index) => {
        const jobSkills = template.skills;
        const matchingSkills = userSkills.filter(skill =>
            jobSkills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
        );

        const matchScore = jobSkills.length > 0
            ? Math.min(95, Math.round((matchingSkills.length / jobSkills.length) * 100) + Math.random() * 10)
            : 75;

        const missingSkills = jobSkills.filter(skill =>
            !userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
        );

        const baseSalary = minSalary || 10;
        const salaryRange = {
            min: Math.round(baseSalary * template.salaryMultiplier),
            max: Math.round((maxSalary || baseSalary * 2) * template.salaryMultiplier)
        };

        return {
            id: `job_${Date.now()}_${index}`,
            title: template.title,
            company: template.company,
            location: city === 'Remote' ? 'Remote' : `${city}, India`,
            salary: `₹${salaryRange.min}L - ₹${salaryRange.max}L`,
            matchScore: matchScore,
            missingSkills: missingSkills.length > 0 ? missingSkills : ['None'],
            requiredSkills: jobSkills,
            experience: `${Math.max(0, experience - 1)}-${experience + 2} years`,
            type: 'Full-time',
            postedAt: `${Math.floor(Math.random() * 7) + 1} days ago`
        };
    });
};

export const calculateSkillMatch = (userSkills, jobSkills) => {
    if (!userSkills || !jobSkills || jobSkills.length === 0) return 0;

    const matchingSkills = userSkills.filter(skill =>
        jobSkills.some(jobSkill =>
            jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(jobSkill.toLowerCase())
        )
    );

    return Math.round((matchingSkills.length / jobSkills.length) * 100);
};

// ============================================
// LEADERBOARD GENERATION
// ============================================

export const generateCityLeaderboard = (userData) => {
    const userCity = userData?.location?.city || 'Mumbai';
    const userXP = userData?.progress?.xp || 0;
    const userName = userData?.name || userData?.displayName || 'You';

    // Generate realistic leaderboard data
    const names = [
        'Arjun', 'Priya', 'Rahul', 'Ananya', 'Vikram', 'Sneha', 'Rohan', 'Ishita',
        'Aditya', 'Kavya', 'Karan', 'Meera', 'Siddharth', 'Riya', 'Amit', 'Pooja'
    ];

    const leaderboard = names.slice(0, 10).map((name, index) => {
        const basePoints = 2500 - (index * 200) + Math.floor(Math.random() * 150);
        return {
            uid: `user_${index}`,
            name: name,
            points: basePoints,
            city: userCity,
            rank: index + 1
        };
    });

    // Find user's rank
    let userRank = leaderboard.findIndex(entry => entry.points < userXP) + 1;
    if (userRank === 0) userRank = leaderboard.length + 1;

    return {
        leaderboard,
        userRank,
        userEntry: {
            uid: userData?.uid,
            name: userName,
            points: userXP,
            city: userCity,
            rank: userRank
        }
    };
};

// ============================================
// COURSE RECOMMENDATIONS
// ============================================

export const getRecommendedCourses = (userData) => {
    const completedCourses = userData?.learning?.completedCourses || [];
    const interests = userData?.profile?.interests || [];
    const targetRole = userData?.profile?.targetRole || userData?.onboarding?.dreamRole || '';
    const currentTrack = userData?.learning?.currentTrack || userData?.onboarding?.track || '';

    const allCourses = [
        { id: 'gen-ai-fundamentals', title: 'Gen AI Fundamentals', category: 'AI', difficulty: 'Beginner', duration: '4 weeks', relevance: ['AI Engineer', 'Data Scientist'] },
        { id: 'advanced-ml', title: 'Advanced Machine Learning', category: 'ML', difficulty: 'Advanced', duration: '6 weeks', relevance: ['AI Engineer', 'ML Engineer'] },
        { id: 'nlp-mastery', title: 'NLP Mastery', category: 'AI', difficulty: 'Intermediate', duration: '5 weeks', relevance: ['AI Engineer', 'NLP Engineer'] },
        { id: 'react-advanced', title: 'Advanced React Patterns', category: 'Web Dev', difficulty: 'Intermediate', duration: '3 weeks', relevance: ['Full Stack Developer', 'Frontend Developer'] },
        { id: 'python-ds', title: 'Python for Data Science', category: 'Data Science', difficulty: 'Beginner', duration: '4 weeks', relevance: ['Data Scientist', 'Data Analyst'] },
        { id: 'deep-learning', title: 'Deep Learning Specialization', category: 'AI', difficulty: 'Advanced', duration: '8 weeks', relevance: ['AI Engineer', 'ML Engineer'] }
    ];

    // Filter out completed courses
    const availableCourses = allCourses.filter(course => !completedCourses.includes(course.id));

    // Score courses based on relevance
    const scoredCourses = availableCourses.map(course => {
        let score = 0;

        // Relevance to target role
        if (course.relevance.some(role => role.toLowerCase().includes(targetRole.toLowerCase()))) {
            score += 50;
        }

        // Match with interests
        if (interests.some(interest => course.category.toLowerCase().includes(interest.toLowerCase()))) {
            score += 30;
        }

        // Track alignment
        if (currentTrack && course.category.toLowerCase().includes(currentTrack.toLowerCase())) {
            score += 20;
        }

        return { ...course, score };
    });

    // Sort by score and return top 3
    return scoredCourses
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
};

// ============================================
// ACHIEVEMENT TRACKING
// ============================================

export const getAchievementProgress = (userData) => {
    const xp = userData?.progress?.xp || 0;
    const streak = userData?.stats?.streak || 0;
    const completedSections = userData?.progress?.completedSections?.length || 0;
    const mcqAccuracy = userData?.stats?.mcqsTotal > 0
        ? Math.round((userData.stats.mcqsCorrect / userData.stats.mcqsTotal) * 100)
        : 0;

    const achievements = [
        {
            id: 'first-steps',
            name: 'First Steps',
            description: 'Complete your first lesson',
            icon: '🎯',
            progress: completedSections > 0 ? 100 : 0,
            unlocked: completedSections > 0
        },
        {
            id: 'week-warrior',
            name: 'Week Warrior',
            description: 'Maintain a 7-day streak',
            icon: '🔥',
            progress: Math.min(100, (streak / 7) * 100),
            unlocked: streak >= 7
        },
        {
            id: 'xp-master',
            name: 'XP Master',
            description: 'Earn 1000 XP',
            icon: '⭐',
            progress: Math.min(100, (xp / 1000) * 100),
            unlocked: xp >= 1000
        },
        {
            id: 'quiz-ace',
            name: 'Quiz Ace',
            description: 'Achieve 90% accuracy in quizzes',
            icon: '🎓',
            progress: Math.min(100, (mcqAccuracy / 90) * 100),
            unlocked: mcqAccuracy >= 90
        },
        {
            id: 'dedicated-learner',
            name: 'Dedicated Learner',
            description: 'Complete 10 sections',
            icon: '📚',
            progress: Math.min(100, (completedSections / 10) * 100),
            unlocked: completedSections >= 10
        }
    ];

    return achievements;
};

// ============================================
// PERSONALIZED TIPS
// ============================================

export const getPersonalizedTips = (userData) => {
    const streak = userData?.stats?.streak || 0;
    const completedSections = userData?.progress?.completedSections?.length || 0;
    const mcqAccuracy = userData?.stats?.mcqsTotal > 0
        ? Math.round((userData.stats.mcqsCorrect / userData.stats.mcqsTotal) * 100)
        : 0;
    const targetRole = userData?.profile?.targetRole || userData?.onboarding?.dreamRole || '';

    const tips = [];

    if (streak === 0) {
        tips.push({
            type: 'streak',
            title: 'Start Your Learning Streak',
            message: 'Complete a lesson today to start building your learning habit!',
            action: 'Start Learning',
            priority: 'high'
        });
    } else if (streak < 7) {
        tips.push({
            type: 'streak',
            title: `${7 - streak} Days to Week Warrior`,
            message: `Keep your streak going to unlock the Week Warrior badge!`,
            action: 'Continue Learning',
            priority: 'medium'
        });
    }

    if (mcqAccuracy < 70 && userData?.stats?.mcqsTotal > 5) {
        tips.push({
            type: 'performance',
            title: 'Improve Quiz Performance',
            message: 'Review the material before taking quizzes to boost your accuracy.',
            action: 'Review Lessons',
            priority: 'high'
        });
    }

    if (completedSections < 3) {
        tips.push({
            type: 'progress',
            title: 'Build Momentum',
            message: 'Complete 3 more sections to unlock advanced features!',
            action: 'View Courses',
            priority: 'medium'
        });
    }

    if (targetRole && !userData?.profile?.skills?.length) {
        tips.push({
            type: 'profile',
            title: 'Complete Your Profile',
            message: `Add skills relevant to ${targetRole} to get better job matches!`,
            action: 'Update Profile',
            priority: 'high'
        });
    }

    // Default tip if no specific recommendations
    if (tips.length === 0) {
        tips.push({
            type: 'general',
            title: 'Keep Learning',
            message: 'Explore new courses to expand your knowledge!',
            action: 'Browse Courses',
            priority: 'low'
        });
    }

    return tips;
};

// ============================================
// DASHBOARD WIDGETS
// ============================================

export const getDashboardWidgets = (userData) => {
    const widgets = [];

    // Progress Widget
    widgets.push({
        id: 'progress',
        type: 'progress',
        title: 'Your Progress',
        data: {
            xp: userData?.progress?.xp || 0,
            level: userData?.progress?.level || 1,
            completedSections: userData?.progress?.completedSections?.length || 0,
            nextLevelXP: (userData?.progress?.level || 1) * 500
        }
    });

    // Streak Widget
    widgets.push({
        id: 'streak',
        type: 'streak',
        title: 'Learning Streak',
        data: {
            current: userData?.stats?.streak || 0,
            longest: userData?.stats?.longestStreak || 0,
            goal: 30
        }
    });

    // Recommended Courses Widget
    widgets.push({
        id: 'recommended',
        type: 'courses',
        title: 'Recommended for You',
        data: getRecommendedCourses(userData)
    });

    // Jobs Widget (if job search is active)
    if (userData?.jobSearch?.isActive) {
        widgets.push({
            id: 'jobs',
            type: 'jobs',
            title: 'Job Matches',
            data: generatePersonalizedJobs(userData).slice(0, 2)
        });
    }

    // Achievements Widget
    widgets.push({
        id: 'achievements',
        type: 'achievements',
        title: 'Next Achievements',
        data: getAchievementProgress(userData).filter(a => !a.unlocked).slice(0, 3)
    });

    return widgets;
};

// ============================================
// ACTIVITY TRACKING
// ============================================

export const trackUserActivity = (userData) => {
    const now = new Date();
    const lastLogin = userData?.activity?.lastLogin ? new Date(userData.activity.lastLogin) : now;
    const daysSinceLastLogin = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));

    const updates = {
        'activity.lastLogin': now.toISOString(),
        'activity.totalSessions': (userData?.activity?.totalSessions || 0) + 1
    };

    // Update streak
    if (daysSinceLastLogin === 1) {
        // Consecutive day
        updates['stats.streak'] = (userData?.stats?.streak || 0) + 1;
        updates['stats.longestStreak'] = Math.max(
            userData?.stats?.longestStreak || 0,
            (userData?.stats?.streak || 0) + 1
        );
    } else if (daysSinceLastLogin > 1) {
        // Streak broken
        updates['stats.streak'] = 1;
    }
    // If daysSinceLastLogin === 0, same day login, don't change streak

    // Track most active time
    const hour = now.getHours();
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17) timeOfDay = 'evening';

    updates['activity.mostActiveTime'] = timeOfDay;
    updates['activity.mostActiveDay'] = now.toLocaleDateString('en-US', { weekday: 'long' });

    return updates;
};

export default {
    getUserGreeting,
    getMotivationalMessage,
    generatePersonalizedJobs,
    calculateSkillMatch,
    generateCityLeaderboard,
    getRecommendedCourses,
    getAchievementProgress,
    getPersonalizedTips,
    getDashboardWidgets,
    trackUserActivity
};
