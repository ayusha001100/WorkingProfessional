import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

const MOCK_USER_KEY = 'genai_mock_user';
const MOCK_USER_DATA_KEY = 'genai_mock_user_data';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Mock checking auth state
        const savedUser = localStorage.getItem(MOCK_USER_KEY);
        const savedUserData = localStorage.getItem(MOCK_USER_DATA_KEY);

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }
        setLoading(false);
    }, []);

    // Helper to persist user data
    useEffect(() => {
        if (userData) {
            localStorage.setItem(MOCK_USER_DATA_KEY, JSON.stringify(userData));
        } else {
            localStorage.removeItem(MOCK_USER_DATA_KEY);
        }
    }, [userData]);

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const mockUser = {
                uid: 'mock-user-123',
                email: 'hello@letsupgrade.com',
                displayName: 'Premium Warrior',
                photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Premium'
            };

            setUser(mockUser);
            localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));

            // Default user data if none exists
            if (!userData) {
                const defaultData = {
                    uid: mockUser.uid,
                    email: mockUser.email,
                    name: mockUser.displayName,
                    createdAt: new Date().toISOString(),
                    progress: { completedSections: [] },
                    stats: { totalPoints: 0, totalCorrect: 0, totalIncorrect: 0 },
                    role: 'user'
                };
                setUserData(defaultData);
            }

            setLoading(false);
            return mockUser;
        } catch (error) {
            console.error("Login Error:", error);
            setLoading(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            setUserData(null);
            localStorage.removeItem(MOCK_USER_KEY);
            localStorage.removeItem(MOCK_USER_DATA_KEY);
            return true;
        } catch (error) {
            console.error("Logout Error:", error);
            return false;
        }
    };

    const login = async () => console.warn("Email login not implemented");
    const signup = async () => console.warn("Email signup not implemented");

    const value = {
        user,
        userData,
        loading,
        loginWithGoogle,
        logout,
        login,
        signup,
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

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};


