import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DemoAuthProvider, useDemoAuth } from './contexts/DemoAuthContext';
import { DEMO_MODE } from './firebase/config';
import Layout from './components/Layout.tsx';
import Login from './components/Login.tsx';
import HomePage from './pages/HomePage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import ShopPage from './pages/ShopPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import SkillsPage from './pages/SkillsPage.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { Container, Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const firebaseAuth = useAuth();
  const demoAuth = useDemoAuth();
  const authHook = DEMO_MODE ? demoAuth : firebaseAuth;
  const { user, loading } = authHook;

  if (loading) {
    return (
      <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center" style={{ marginTop: '70px' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        </div>
      </Container>
    );
  }

  if (!user) {
    return <Login />;
  }

  return children;
};

const AppContent = () => {
  const firebaseAuth = useAuth();
  const demoAuth = useDemoAuth();
  const authHook = DEMO_MODE ? demoAuth : firebaseAuth;
  const { loading } = authHook;

  if (loading) {
    return (
      <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center" style={{ marginTop: '70px' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        </div>
      </Container>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/sklep" element={<ShopPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route 
          path="/umiejetnosci" 
          element={
            <ProtectedRoute>
              <SkillsPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <DemoAuthProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </DemoAuthProvider>
    </AuthProvider>
  );
}

export default App;
