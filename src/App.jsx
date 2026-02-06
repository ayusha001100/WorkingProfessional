import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load major pages
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DocPage = lazy(() => import('./pages/DocPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const SessionAdminPage = lazy(() => import('./pages/SessionAdminPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ScorecardTest = lazy(() => import('./pages/ScorecardTest'));
const CertificatePage = lazy(() => import('./pages/CertificatePage'));
const CertificationPage = lazy(() => import('./pages/CertificationPage'));
const HardcopyPage = lazy(() => import('./pages/HardcopyPage'));
const SelectionPage = lazy(() => import('./pages/SelectionPage'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const MockInterview = lazy(() => import('./pages/MockInterview'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const WelcomeOnboarding = lazy(() => import('./pages/WelcomeOnboarding'));
const ChatOnboarding = lazy(() => import('./pages/ChatOnboarding'));
const TrackLearning = lazy(() => import('./pages/TrackLearning'));
const SubModulesPage = lazy(() => import('./pages/SubModulesPage'));
const LearningPlayerPage = lazy(() => import('./pages/LearningPlayerPage'));
const UnifiedLearningPage = lazy(() => import('./pages/UnifiedLearningPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const ModulesOverviewPage = lazy(() => import('./pages/ModulesOverviewPage'));

const PublicOnlyRoute = ({ children }) => {
  const { user, userData } = useAuth();
  if (user) {
    // Check if user has completed onboarding
    if (userData?.onboardingCompleted) {
      return <Navigate to="/track" replace />;
    } else {
      return <Navigate to="/welcome" replace />;
    }
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { userData, loading } = useAuth();
  if (loading) return null;
  if (userData?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

const LoadingFallback = () => (
  <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#1a1a1a', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: '#64748b', fontWeight: 500 }}>Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/get-started" element={<SelectionPage />} />
                <Route path="/login" element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                } />
                <Route path="/signup" element={
                  <PublicOnlyRoute>
                    <Signup />
                  </PublicOnlyRoute>
                } />

                {/* Welcome Onboarding */}
                <Route path="/welcome" element={
                  <ProtectedRoute>
                    <ChatOnboarding />
                  </ProtectedRoute>
                } />
                <Route path="/roadmap" element={
                  <ProtectedRoute>
                    <RoadmapPage />
                  </ProtectedRoute>
                } />

                {/* Career Control Center & Skill Journey has been merged into TrackLearning */}
                <Route path="/track" element={
                  <ProtectedRoute>
                    <TrackLearning />
                  </ProtectedRoute>
                } />

                {/* Modules Overview Page - shows all 8 modules */}
                <Route path="/level/:levelId/modules" element={
                  <ProtectedRoute>
                    <ModulesOverviewPage />
                  </ProtectedRoute>
                } />

                {/* Sub-Modules Page */}
                <Route path="/level/:levelId/submodules" element={
                  <ProtectedRoute>
                    <SubModulesPage />
                  </ProtectedRoute>
                } />

                {/* Focused Learning Mode Page */}
                <Route path="/level/:levelId/submodule/:subModuleId" element={
                  <ProtectedRoute>
                    <LearningPlayerPage />
                  </ProtectedRoute>
                } />

                <Route path="/level/:levelId/learn" element={
                  <ProtectedRoute>
                    <UnifiedLearningPage />
                  </ProtectedRoute>
                } />

                <Route path="/day1" element={
                  <ProtectedRoute>
                    <DocPage day="day1" />
                  </ProtectedRoute>
                } />
                <Route path="/day2" element={
                  <ProtectedRoute>
                    <DocPage day="day2" />
                  </ProtectedRoute>
                } />

                {/* Career OS Modules */}
                <Route path="/resume-builder" element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                } />
                <Route path="/mock-interviews" element={
                  <ProtectedRoute>
                    <MockInterview />
                  </ProtectedRoute>
                } />
                <Route path="/news" element={
                  <ProtectedRoute>
                    <NewsPage />
                  </ProtectedRoute>
                } />
                <Route path="/jobs" element={
                  <ProtectedRoute>
                    <JobsPage />
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={
                  <ProtectedRoute>
                    <LeaderboardPage />
                  </ProtectedRoute>
                } />

                {/* Personal & Social */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/certificate" element={
                  <ProtectedRoute>
                    <CertificatePage />
                  </ProtectedRoute>
                } />
                <Route path="/certification" element={
                  <ProtectedRoute>
                    <CertificatePage />
                  </ProtectedRoute>
                } />
                <Route path="/hardcopy" element={
                  <ProtectedRoute>
                    <HardcopyPage />
                  </ProtectedRoute>
                } />

                {/* Admin & Testing */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  </ProtectedRoute>
                } />
                <Route path="/live-admin" element={<SessionAdminPage />} />
                <Route path="/scorecard-test" element={<ScorecardTest />} />

                {/* Fallbacks */}
                <Route path="/dashboard" element={<Navigate to="/track" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
