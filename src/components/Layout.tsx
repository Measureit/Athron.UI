import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PawLogo from './PawLogo.tsx';
import { APP_CONFIG } from '../config/app.config';
import { useAuth } from '../contexts/AuthContext';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { DEMO_MODE } from '../firebase/config';
import { useI18n } from '../hooks/useI18n';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth < 768
  );
  const location = useLocation();
  const { t, lang, setLanguage } = useI18n();
  
  // Always call both hooks - React rule (never conditionally)
  const firebaseAuth = useAuth();
  const demoAuth = useDemoAuth();
  const authHook = DEMO_MODE ? demoAuth : firebaseAuth;
  const { user, loading, logout } = authHook;
  const [loggingOut, setLoggingOut] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleLogin = async () => {
    try {
      await authHook.signInWithGoogle();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const navItems = [
    { path: "/", label: t("nav.home"), icon: "bi-house-door" },
    { path: "/blog", label: t("nav.blog"), icon: "bi-journal-text" },
    { path: "/sklep", label: t("nav.shop"), icon: "bi-shop" },
    { path: "/kontakt", label: t("nav.contact"), icon: "bi-envelope" },
    ...(user ? [{ path: "/umiejetnosci", label: t("nav.skills"), icon: "bi-star" }] : []),
  ];

  const sidebarWidth = sidebarCollapsed ? 70 : 280;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div 
        className="bg-white shadow-sm d-flex align-items-center justify-content-between"
        style={{ 
          height: "70px",
          borderBottom: "2px solid var(--secondary-color)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1030,
          paddingLeft: "1rem",
          paddingRight: "1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button
            variant="link"
            className="text-dark"
            onClick={toggleSidebar}
            style={{ border: "none", fontSize: "1.5rem", padding: 0 }}
          >
            <i className="bi bi-list"></i>
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PawLogo size={30} animated={true} />
            <h5 className="mb-0" style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
              {APP_CONFIG.APP_NAME}
            </h5>
          </div>
        </div>

        {/* Language & Auth Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Dropdown>
            <Dropdown.Toggle 
              variant="link" 
              size="sm"
              className="text-dark"
              style={{ textDecoration: "none" }}
            >
              <i className="bi bi-globe"></i> {lang.toUpperCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={() => setLanguage('pl')} active={lang === 'pl'}>
                <i className="bi bi-check-lg me-2"></i> Polski
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setLanguage('en')} active={lang === 'en'}>
                <i className="bi bi-check-lg me-2"></i> English
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          {loading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : user ? (
            <Dropdown>
              <Dropdown.Toggle 
                variant="outline-primary" 
                size="sm"
                className="d-flex align-items-center gap-2"
              >
                <i className="bi bi-person-circle"></i>
                <span style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {(user as any)?.displayName || ((user as any)?.email as string)?.split('@')[0]}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item disabled>
                  <small className="text-muted">{(user as any)?.email}</small>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  {loggingOut ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      {t("auth.loggingOut")}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      {t("auth.logout")}
                    </>
                  )}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleLogin}
              className="d-flex align-items-center gap-2"
            >
              <i className="bi bi-box-arrow-in-right"></i>
              Zaloguj się
            </Button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "70px", minHeight: "calc(100vh - 70px)" }}>
        {/* Sidebar */}
        <div
          className="d-flex flex-column"
          style={{
            width: sidebarWidth,
            minHeight: "calc(100vh - 70px)",
            transition: "width 0.3s ease",
            position: "fixed",
            left: 0,
            top: "70px",
            overflowY: "auto",
            zIndex: 1020,
            background: "linear-gradient(180deg, var(--primary-color) 0%, #0a2a4d 100%)",
            color: "white",
          }}
        >
          <nav className="flex-1" style={{ paddingTop: "1rem" }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item d-flex align-items-center px-3 py-3 text-decoration-none text-white transition-all`}
                style={{
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(242, 38, 34, 0.2)"
                      : "transparent",
                  color: "white",
                  borderLeft:
                    location.pathname === item.path
                      ? "4px solid var(--secondary-color)"
                      : "4px solid transparent",
                  transition: "all 0.3s ease",
                  whiteSpace: sidebarCollapsed ? "nowrap" : "normal",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = "rgba(242, 38, 34, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <i
                  className={`bi ${item.icon}`}
                  style={{
                    fontSize: "1.3rem",
                    minWidth: "30px",
                  }}
                ></i>
                {!sidebarCollapsed && (
                  <span className="ms-3" style={{ fontSize: "0.95rem" }}>
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer Info */}
          {!sidebarCollapsed && (
            <div className="p-3" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
              <small className="text-white d-block mb-2" style={{ opacity: 0.8 }}>
                v{APP_CONFIG.VERSION}
              </small>
              <div className="mb-2">
                <PawLogo size={40} animated={true} />
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <main
          style={{
            marginLeft: sidebarWidth,
            flex: 1,
            transition: "margin-left 0.3s ease",
            width: `calc(100% - ${sidebarWidth}px)`,
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
