import React, { useState } from 'react';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { DEMO_MODE } from '../firebase/config';
import PawLogo from './PawLogo';
import { APP_CONFIG } from '../config/app.config';

const Login: React.FC = () => {
  const authHook = DEMO_MODE ? useDemoAuth() : useAuth();
  const { signInWithGoogle } = authHook;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      setError('Failed to sign in with Google: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ 
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--light-navy) 50%, var(--secondary-color) 100%)',
        paddingTop: '70px'
      }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <PawLogo size={80} animated={true} />
                  </div>
                  <h2 className="fw-bold text-dark mb-2">{APP_CONFIG.APP_NAME}</h2>
                  <p className="text-muted">
                    Zaloguj się, aby uzyskać dostęp do naszych treści
                  </p>
                </div>

                {DEMO_MODE && (
                  <Alert variant="info" className="mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Demo Mode</strong> - Kliknij przycisk aby przetestować logowanie
                  </Alert>
                )}

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
                    disabled={loading}
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
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                          style={{ width: '1rem', height: '1rem' }}
                        />
                        Zalogowywanie...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-google me-2"></i>
                        Zaloguj się z Google
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-top text-center">
                  <p className="text-muted small">
                    <i className="bi bi-shield-check me-1"></i>
                    Twoje dane są bezpieczne i szyfrowane
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
