import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Settings from './components/Settings';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DemoAuthProvider, useDemoAuth } from './contexts/DemoAuthContext';
import { DEMO_MODE } from './firebase/config';
import BlogPage from './pages/BlogPage';
import HomePage from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';
import SkillsDetail from './components/skills/SkillsDetail';

const AppContent: React.FC = () => {
    const authHook = DEMO_MODE ? useDemoAuth() : useAuth();
    const { user, loading } = authHook;

    if (loading) {
        return (
            <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                    <div className="mt-3">
                        <h5>Loading Athron App...</h5>
                        <small className="text-muted">Please wait while we set up your session</small>
                    </div>
                </div>
            </Container>
        );
    }

    if (!user) {
        return (
            <>
                {DEMO_MODE && (
                    <Alert variant="info" className="mb-0 text-center border-0 rounded-0">
                        <i className="bi bi-info-circle me-2"></i>
                        <strong>Demo Mode Active</strong> - Click any login button to test the authentication flow
                    </Alert>
                )}
                <Login />
            </>
        );
    }

    const userEmail = (user as any)?.email || '';
    const isCoach = userEmail === process.env.REACT_APP_COACH_EMAIL;

    return (
        <>
            <Layout>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/skills/:id" component={SkillsDetail} />
                    <Route path="/skills-library" component={SkillsPage} />
                    <Route path="/blog" component={BlogPage} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </Layout>
        </>
    );
};

const App: React.FC = () => {
    const AuthContextProvider = DEMO_MODE ? DemoAuthProvider : AuthProvider;
    
    return (
        <AuthContextProvider>
            <AppContent />
        </AuthContextProvider>
    );
};

export default App;