import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

const MOCK_USER = {
    uid: 'mock-user-123',
    email: 'ayush.aryan@example.com',
    displayName: 'Ayush Aryan',
    name: 'Ayush Aryan',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush',
};

const INITIAL_USER_DATA = {
    uid: 'mock-user-123',
    email: 'ayush.aryan@example.com',
    displayName: 'Ayush Aryan',
    name: 'Ayush Aryan',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush',
    createdAt: new Date().toISOString(),
    progress: { completedSections: [], xp: 0 },
    stats: {
        mcqsTotal: 0, mcqsCorrect: 0, mcqsWrong: 0,
        streak: 1, totalActiveDays: 1, consistency: "100%"
    },
    onboarding: { completed: false }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock authentication check
        const storedUser = localStorage.getItem('mock_user');
        const storedData = localStorage.getItem('mock_user_data');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Legacy fix: Update old mock data to new mock data
            if (parsedUser.name === 'Mock Learner') {
                setUser(MOCK_USER);
                setUserData(INITIAL_USER_DATA);
                localStorage.setItem('mock_user', JSON.stringify(MOCK_USER));
                localStorage.setItem('mock_user_data', JSON.stringify(INITIAL_USER_DATA));
            } else {
                setUser(parsedUser);
                if (storedData) {
                    setUserData(JSON.parse(storedData));
                } else {
                    setUserData(INITIAL_USER_DATA);
                    localStorage.setItem('mock_user_data', JSON.stringify(INITIAL_USER_DATA));
                }
            }
        }
        setLoading(false);
    }, []);

    const calculateConsistency = (uData, activeToday = false) => {
        const joinDate = new Date(uData.createdAt).getTime();
        const daysSinceJoin = Math.max(1, Math.ceil((Date.now() - joinDate) / (24 * 60 * 60 * 1000)));
        const totalActiveDays = (uData.stats?.totalActiveDays || 0) + (activeToday ? 1 : 0);
        return Math.min(100, Math.round((totalActiveDays / daysSinceJoin) * 100)) + "%";
    };

    const loginWithGoogle = async () => {
        // Mock login
        const mockUser = MOCK_USER;
        setUser(mockUser);
        localStorage.setItem('mock_user', JSON.stringify(mockUser));

        const storedData = localStorage.getItem('mock_user_data');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        } else {
            setUserData(INITIAL_USER_DATA);
            localStorage.setItem('mock_user_data', JSON.stringify(INITIAL_USER_DATA));
        }
        return mockUser;
    };

    const updateUserData = async (updates) => {
        setUserData(prev => {
            const newData = { ...prev, ...updates };
            // Handle deeper updates if updates key is a path (e.g. 'progress.xp')
            // This is a simplified version of what Firestore's updateDoc does
            Object.keys(updates).forEach(key => {
                if (key.includes('.')) {
                    const parts = key.split('.');
                    let current = newData;
                    for (let i = 0; i < parts.length - 1; i++) {
                        if (!current[parts[i]]) current[parts[i]] = {};
                        current = current[parts[i]];
                    }
                    current[parts[parts.length - 1]] = updates[key];
                    // Also delete the flat key if it was accidentally added
                    delete newData[key];
                }
            });

            localStorage.setItem('mock_user_data', JSON.stringify(newData));
            return newData;
        });
    };

    const saveProgress = async (sectionId, type = 'section', points = 10, quizData = null) => {
        setUserData(prev => {
            const completedSections = prev.progress?.completedSections || [];
            if (completedSections.includes(sectionId)) return prev;

            const newState = {
                ...prev,
                progress: {
                    ...prev.progress,
                    completedSections: [...completedSections, sectionId],
                    xp: (prev.progress?.xp || 0) + points
                }
            };
            if (quizData) {
                newState.stats = {
                    ...newState.stats,
                    mcqsTotal: (newState.stats?.mcqsTotal || 0) + quizData.total,
                    mcqsCorrect: (newState.stats?.mcqsCorrect || 0) + quizData.correct,
                    mcqsWrong: (newState.stats?.mcqsWrong || 0) + (quizData.total - quizData.correct)
                };
            }
            localStorage.setItem('mock_user_data', JSON.stringify(newState));
            return newState;
        });
    };

    const logout = async () => {
        setUser(null);
        setUserData(null);
        localStorage.removeItem('mock_user');
    };

    const value = {
        user,
        userData,
        loading,
        loginWithGoogle,
        logout,
        updateUserData,
        saveProgress,
        setUserData
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

    if (loading) return null;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};


