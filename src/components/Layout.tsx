import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { DEMO_MODE } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Use appropriate auth hook based on demo mode
  const authHook = DEMO_MODE ? useDemoAuth() : useAuth();
  const { user, logout } = authHook;

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'bi-house-door' },
    { path: '/athlete', label: 'Athlete Progress', icon: 'bi-person-circle' },
    { path: '/group', label: 'Group Sessions', icon: 'bi-people' },
    { path: '/simulation', label: 'Path Simulation', icon: 'bi-graph-up-arrow' },
    { path: '/analytics', label: 'Analytics', icon: 'bi-bar-chart' },
    { path: '/settings', label: 'Settings', icon: 'bi-gear' },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div 
        className={`bg-dark text-white d-flex flex-column transition-all ${
          sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
        style={{
          width: sidebarCollapsed ? '80px' : '280px',
          minHeight: '100vh',
          transition: 'width 0.3s ease',
          position: 'relative'
        }}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center justify-content-between">
            {!sidebarCollapsed && (
              <div className="d-flex align-items-center">
                <i className="bi bi-activity me-2 fs-4"></i>
                <span className="fw-bold">D3 Training</span>
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
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navigation Bar */}
        <Navbar bg="primary" variant="dark" className="shadow-sm">
          <Container fluid>
            <Navbar.Brand className="fw-bold">
              <i className="bi bi-activity me-2"></i>
              D3 Training App
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
                    <Dropdown.Divider />
                    <Dropdown.Item href="#profile">
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#settings">
                      <i className="bi bi-gear me-2"></i>
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Container>
        </Navbar>

        {/* Page Content */}
        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
