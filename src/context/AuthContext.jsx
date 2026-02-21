import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';

const AuthContext = createContext(null);

const INITIAL_USER_DATA = {
    // User Identity
    uid: '',
    email: '',
    displayName: '',
    name: '',
    photoURL: '',
    createdAt: new Date().toISOString(),
    isPremium: false, // Default to false, manually updated in DB

    // Profile Information
    profile: {
        bio: '',
        skills: [],
        interests: [],
        experience: 0, // years
        education: '',
        currentRole: '',
        targetRole: '',
        salaryExpectation: { min: 0, max: 0, currency: 'INR' },
        availability: 'full-time',
        portfolio: '',
        linkedin: '',
        github: '',
        phone: '',
        dateOfBirth: ''
    },

    // Location Data
    location: {
        country: '',
        state: '',
        city: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },

    // User Preferences
    preferences: {
        theme: 'dark',
        language: 'en',
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        privacy: {
            profileVisibility: 'public',
            showOnLeaderboard: true
        },
        dashboardLayout: 'default'
    },

    // Learning Data
    learning: {
        currentTrack: '',
        completedCourses: [],
        inProgressCourses: [],
        savedCourses: [],
        learningGoals: [],
        weeklyTarget: 10, // hours
        preferredLearningTime: 'evening',
        learningStyle: 'visual' // visual, auditory, kinesthetic
    },

    // Progress & Stats
    progress: {
        completedSections: [],
        xp: 0,
        level: 1,
        subModuleProgress: {},
        moduleProgress: {},
        totalLearningHours: 0,
        coursesCompleted: 0
    },

    stats: {
        mcqsTotal: 0,
        mcqsCorrect: 0,
        mcqsWrong: 0,
        streak: 0,
        longestStreak: 0,
        totalActiveDays: 0,
        consistency: "0%",
        certificates: 0,
        milestones: 0,
        personalBest: 0,
        communityRank: null
    },

    // Achievements
    achievements: {
        badges: [],
        certificates: [],
        milestones: []
    },

    // Activity Tracking
    activity: {
        lastLogin: new Date().toISOString(),
        loginStreak: 0,
        totalSessions: 0,
        averageSessionTime: 0,
        mostActiveDay: '',
        mostActiveTime: '',
        loginHistory: []
    },

    // Job Search
    jobSearch: {
        isActive: false,
        savedJobs: [],
        appliedJobs: [],
        interviewsScheduled: []
    },

    // Onboarding
    onboarding: {
        completed: false,
        isComplete: false,
        currentStep: 0,
        completedSteps: [],
        dreamRole: '',
        track: '',
        experienceLevel: '',
        motivation: ''
    },

    // Interview History
    interviewHistory: [],

    // Custom Data
    customFields: {}
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Reference to user document in Firestore
                const userDocRef = doc(db, 'users', currentUser.uid);

                // Listen for real-time updates to user data
                const unsubscribeSnapshot = onSnapshot(userDocRef, async (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        // Create new user document if it doesn't leave
                        const newUserData = {
                            ...INITIAL_USER_DATA,
                            uid: currentUser.uid,
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            name: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            createdAt: new Date().toISOString(),
                            activity: {
                                ...INITIAL_USER_DATA.activity,
                                lastLogin: new Date().toISOString()
                            }
                        };
                        await setDoc(userDocRef, newUserData);
                        setUserData(newUserData);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                });

                return () => unsubscribeSnapshot();
            } else {
                setUser(null);
                setUserData(null);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error("Error logging in with Google:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserData(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Helper to flatten nested objects for Firestore updates (e.g. "progress.xp": 10)
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k]) && !(obj[k] instanceof Date)) {
                Object.assign(acc, flattenObject(obj[k], pre + k));
            } else {
                acc[pre + k] = obj[k];
            }
            return acc;
        }, {});
    };

    const updateUserData = async (updates) => {
        if (!user) return;

        try {
            const userDocRef = doc(db, 'users', user.uid);
            // If keys contain dots, they are treated as nested fields by updateDoc
            // If the user passes an object structure, we might need to flatten it or just use setDoc with merge
            // For now, let's assume 'updates' follows Firestore patterns or key-value pairs
            await updateDoc(userDocRef, updates);
        } catch (error) {
            console.error("Error updating user data:", error);
            try {
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, updates, { merge: true });
            } catch (retryError) {
                console.error("Retry failed:", retryError);
            }
        }
    };

    const saveProgress = async (sectionId, type = 'section', points = 10, quizData = null) => {
        if (!user || !userData) return;

        const completedSections = userData.progress?.completedSections || [];

        if (completedSections.includes(sectionId)) return;

        let updates = {
            'progress.completedSections': [...completedSections, sectionId],
            'progress.xp': (userData.progress?.xp || 0) + points
        };

        if (quizData) {
            updates = {
                ...updates,
                'stats.mcqsTotal': (userData.stats?.mcqsTotal || 0) + quizData.total,
                'stats.mcqsCorrect': (userData.stats?.mcqsCorrect || 0) + quizData.correct,
                'stats.mcqsWrong': (userData.stats?.mcqsWrong || 0) + (quizData.total - quizData.correct)
            };
        }

        await updateUserData(updates);
    };

    const value = {
        user,
        userData,
        loading,
        loginWithGoogle,
        logout,
        updateUserData,
        saveProgress,
        setUserData // Note: Direct usage of this should be minimized in favor of updateUserData
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};
