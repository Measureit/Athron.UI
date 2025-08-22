import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DemoAuthProvider, useDemoAuth } from './contexts/DemoAuthContext';
import { DEMO_MODE } from './firebase/config';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AthleteRoute from './routes/AthleteRoute';
import GroupRoute from './routes/GroupRoute';
import SimulationRoute from './routes/SimulationRoute';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { Spinner, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent: React.FC = () => {
    const authHook = DEMO_MODE ? useDemoAuth() : useAuth();
    const { user, loading } = authHook;

    if (loading) {
        return (
            <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                    <div className="mt-3">
                        <h5>Loading D3 Training App...</h5>
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

    return (
        <>
            {DEMO_MODE && (
                <Alert variant="warning" className="mb-0 text-center border-0 rounded-0" style={{ fontSize: '0.85rem' }}>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <strong>Demo Mode</strong> - See FIREBASE_SETUP.md to configure real authentication
                </Alert>
            )}
            <Layout>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/athlete" component={AthleteRoute} />
                    <Route path="/group" component={GroupRoute} />
                    <Route path="/simulation" component={SimulationRoute} />
                    <Route path="/analytics" component={Analytics} />
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