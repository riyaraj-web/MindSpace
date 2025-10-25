import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import AuthPage from './components/AuthPage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import Meditation from './pages/Meditation';
import Journal from './pages/Journal';
import BreathingPage from './pages/BreathingPage';
import HabitTracker from './pages/HabitTracker';
import RecoveryStoriesPage from './pages/RecoveryStoriesPage';
import AIAssistantPage from './pages/AIAssistantPage';
import AICompanion from './components/AICompanion';
import './midnight-theme.css';

const AppContent = () => {
    const { isAuthenticated, loading } = useAuth();

    console.log('AppContent render:', { isAuthenticated, loading });

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AuthPage />;
    }

    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/mood" element={<MoodTracker />} />
                    <Route path="/meditation" element={<Meditation />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/breathing" element={<BreathingPage />} />
                    <Route path="/habits" element={<HabitTracker />} />
                    <Route path="/recovery-stories" element={<RecoveryStoriesPage />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />
                </Routes>
            </main>
            <AICompanion />
        </div>
    );
};

function App() {
    console.log('App: Component rendering');
    
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;