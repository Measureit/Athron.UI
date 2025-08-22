import React, { useState } from 'react';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { DEMO_MODE } from '../firebase/config';

const Login: React.FC = () => {
  // Use appropriate auth hook based on demo mode
  const authHook = DEMO_MODE ? useDemoAuth() : useAuth();
  const { signInWithGoogle, signInWithFacebook } = authHook;
  
  const [loading, setLoading] = useState<'google' | 'facebook' | null>(null);
  const [error, setError] = useState<string>('');

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading('google');
      await signInWithGoogle();
    } catch (error: any) {
      setError('Failed to sign in with Google: ' + error.message);
    } finally {
      setLoading(null);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setError('');
      setLoading('facebook');
      await signInWithFacebook();
    } catch (error: any) {
      setError('Failed to sign in with Facebook: ' + error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-activity text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Welcome Back!</h2>
                  <p className="text-muted">Sign in to access your D3 Training Dashboard</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                <div className="d-grid gap-3">
                  <Button
                    variant="outline-dark"
                    size="lg"
                    onClick={handleGoogleSignIn}
                    disabled={loading !== null}
                    className="d-flex align-items-center justify-content-center py-3"
                    style={{ 
                      borderColor: '#db4437',
                      color: '#db4437',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#db4437';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#db4437';
                    }}
                  >
                    {loading === 'google' ? (
                      <Spinner animation="border" size="sm" className="me-2" />
                    ) : (
                      <svg className="me-2" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    Continue with Google
                  </Button>

                  {/* <Button
                    variant="outline-dark"
                    size="lg"
                    onClick={handleFacebookSignIn}
                    disabled={loading !== null}
                    className="d-flex align-items-center justify-content-center py-3"
                    style={{ 
                      borderColor: '#1877F2',
                      color: '#1877F2',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1877F2';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#1877F2';
                    }}
                  >
                    {loading === 'facebook' ? (
                      <Spinner animation="border" size="sm" className="me-2" />
                    ) : (
                      <i className="bi bi-facebook me-2" style={{ fontSize: '1.2rem' }}></i>
                    )}
                    Continue with Facebook
                  </Button> */}
                </div>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </small>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <div className="row text-muted">
                <div className="col-4">
                  <i className="bi bi-shield-check me-1"></i>
                  <small>Secure</small>
                </div>
                <div className="col-4">
                  <i className="bi bi-lightning me-1"></i>
                  <small>Fast</small>
                </div>
                <div className="col-4">
                  <i className="bi bi-graph-up me-1"></i>
                  <small>Analytics</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
