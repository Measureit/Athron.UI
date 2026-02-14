import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { DEMO_MODE } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // ...existing code...
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();
  const { i18n } = useTranslation();
  
  // Use appropriate auth hook based on demo mode
  const authHook = DEMO_MODE ? useDemoAuth() : useAuth();
  const { user, logout } = authHook;

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const { t } = useTranslation();
  // navItems must be inside the component to update on language change
  const userEmail = (user as any)?.email || '';
  const isCoach = userEmail === process.env.REACT_APP_COACH_EMAIL;

  const navItems: Array<{ path: string; label: string; icon: string }> = [
    { path: '/', label: t('dashboard') || 'Dashboard', icon: 'bi-house-door' },
    { path: '/blog', label: t('blog') || 'Blog', icon: 'bi-journal-text' },
    { path: '/simulator', label: t('simulator') || 'Simulator', icon: 'bi-cpu' },
    { path: '/exercise-library', label: t('exerciseLibrary') || 'Exercise Library', icon: 'bi-book' },
    { path: '/skills-library', label: t('skillsLibrary') || 'Skills Library', icon: 'bi-bookmarks' },
  ];

  if (isCoach) {
    navItems.push(
      { path: '/builder', label: t('builder') || 'Builder', icon: 'bi-diagram-3' },
      { path: '/analytics', label: t('analytics') || 'Analytics', icon: 'bi-bar-chart' },
      { path: '/settings', label: t('settings') || 'Settings', icon: 'bi-gear' }
    );
  }

  const sidebarWidth =  sidebarCollapsed ? 52 : 280;

  return (
  <div style={{ minHeight: '100vh', display: 'flex' }}>
    {/* Sidebar */}
    <div 
      className={`bg-dark text-white d-flex flex-column transition-all ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
      style={{
        width: sidebarWidth,
        minHeight: '100vh',
        transition: 'width 0.3s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1020
      }}
    >
        {/* Sidebar Header */}
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center justify-content-between">
            {!sidebarCollapsed && (
              <div className="d-flex align-items-center">
                <i className="bi bi-activity me-2 fs-4"></i>
                <span className="fw-bold"></span>
              </div>
            )}
            <Button
              variant="outline-light"
              size="sm"
              onClick={toggleSidebar}
              className="p-1"
            >
              <i className={`bi ${sidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <Nav className="flex-column flex-grow-1 py-2">
          {navItems.map((item) => (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={`px-3 py-3 text-white d-flex align-items-center ${
                location.pathname === item.path 
                  ? 'bg-primary' 
                  : 'text-white-50'
              }`}
              style={{ textDecoration: 'none' }}
            >
              <i className={`${item.icon} ${sidebarCollapsed ? 'fs-5' : 'me-3'}`}></i>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Nav.Link>
          ))}
        </Nav>
        
        {/* Quick Stats in Sidebar */}
        {!sidebarCollapsed && (
          <div className="p-3 border-top border-secondary">
            <h6 className="text-white-50 mb-3">Quick Stats</h6>
            <div className="card bg-secondary mb-2">
              <div className="card-body py-2">
                <div className="d-flex justify-content-between text-white">
                  <small>Active Athletes</small>
                  <small className="fw-bold">12</small>
                </div>
              </div>
            </div>
            <div className="card bg-secondary mb-2">
              <div className="card-body py-2">
                <div className="d-flex justify-content-between text-white">
                  <small>Sessions Today</small>
                  <small className="fw-bold">3</small>
                </div>
              </div>
            </div>
            <div className="card bg-secondary">
              <div className="card-body py-2">
                <div className="d-flex justify-content-between text-white">
                  <small>Avg Performance</small>
                  <small className="fw-bold text-success">85%</small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


    {/* Main Content Area */}
    <div style={{ marginLeft: sidebarWidth, width: `calc(100vw - ${sidebarWidth}px)`, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Bar */}
      <Navbar
        bg="primary"
        variant="dark"
        className="shadow-sm"
        style={{
          position: 'fixed',
          top: 0,
          left: sidebarWidth,
          right: 0,
          zIndex: 1030,
          height: 56
        }}
      >
        <Container fluid>
          <Navbar.Brand className="fw-bold">
            <i className="bi bi-activity me-2"></i>
            {t('app_name', 'Athron')}
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="#notifications" className="text-light me-2">
              <i className="bi bi-bell"></i>
            </Nav.Link>
            {user && (
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="link" 
                  className="text-light text-decoration-none p-0 border-0 d-flex align-items-center"
                  id="user-dropdown"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="rounded-circle me-2"
                      style={{ width: '32px', height: '32px' }}
                    />
                  ) : (
                    <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
                  )}
                  <span className="d-none d-md-inline">{user.displayName || 'User'}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <small className="text-muted">{user.email}</small>
                  </Dropdown.Header>
                  <div className="d-flex align-items-center px-3 py-2">
                    <i className="bi bi-translate me-2"></i>
                    <select
                      id="user-language-select"
                      className="form-select form-select-sm ms-2"
                      style={{ width: 'auto', minWidth: 90 }}
                      value={i18n.language}
                      onChange={e => i18n.changeLanguage(e.target.value)}
                    >
                      <option value="pl">🇵🇱</option>
                      <option value="en-US">🇬🇧</option>
                    </select>
                  </div>
                  <Dropdown.Item href="#profile">
                    <i className="bi bi-person me-2"></i>
                    {t('profile')}
                  </Dropdown.Item>
                  <Dropdown.Item href="#settings">
                    <i className="bi bi-gear me-2"></i>
                    {t('settings')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    {t('logout', 'Sign Out')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* Page Content */}
      <div
        className="flex-grow-1"
        style={{
          backgroundColor: '#f8f9fa',
          overflowY: 'auto',
          padding: '2rem',
          paddingTop: 56,
        }}
      >
        {children}
      </div>
    </div>
</div>
  );
};

export default Layout;
