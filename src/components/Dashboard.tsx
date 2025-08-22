import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  const recentSessions = [
    { id: 1, athlete: "John Doe", type: "Endurance", duration: "45 min", performance: 92 },
    { id: 2, athlete: "Jane Smith", type: "Strength", duration: "60 min", performance: 88 },
    { id: 3, athlete: "Mike Johnson", type: "Speed", duration: "30 min", performance: 95 },
  ];

  const upcomingSessions = [
    { id: 1, athlete: "Sarah Wilson", time: "10:00 AM", type: "Flexibility" },
    { id: 2, athlete: "Team Alpha", time: "2:00 PM", type: "Group Training" },
    { id: 3, athlete: "David Lee", time: "4:00 PM", type: "Recovery" },
  ];

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold text-primary">
            <i className="bi bi-speedometer2 me-3"></i>
            Training Dashboard
          </h1>
          <p className="text-muted">Welcome back! Here's what's happening with your training sessions.</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-primary mb-2">
                <i className="bi bi-people-fill" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3 className="fw-bold mb-1">24</h3>
              <p className="text-muted mb-0">Active Athletes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-success mb-2">
                <i className="bi bi-calendar-check" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3 className="fw-bold mb-1">156</h3>
              <p className="text-muted mb-0">Sessions This Month</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-warning mb-2">
                <i className="bi bi-trophy" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3 className="fw-bold mb-1">89%</h3>
              <p className="text-muted mb-0">Avg Performance</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-info mb-2">
                <i className="bi bi-graph-up" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3 className="fw-bold mb-1">+12%</h3>
              <p className="text-muted mb-0">Improvement Rate</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Sessions */}
        <Col lg={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Recent Sessions
              </h5>
            </Card.Header>
            <Card.Body>
              {recentSessions.map((session) => (
                <div key={session.id} className="border-bottom py-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold mb-1">{session.athlete}</h6>
                      <Badge bg="primary" className="me-2">{session.type}</Badge>
                      <small className="text-muted">{session.duration}</small>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-success">{session.performance}%</div>
                    </div>
                  </div>
                  <ProgressBar 
                    now={session.performance} 
                    variant={session.performance >= 90 ? 'success' : session.performance >= 75 ? 'warning' : 'danger'}
                    style={{ height: '4px' }}
                  />
                </div>
              ))}
              <div className="text-center mt-3">
                <a href="/athlete" className="btn btn-outline-primary btn-sm">
                  View All Sessions
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Sessions */}
        <Col lg={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-calendar-plus me-2"></i>
                Upcoming Sessions
              </h5>
            </Card.Header>
            <Card.Body>
              {upcomingSessions.map((session) => (
                <div key={session.id} className="d-flex align-items-center py-3 border-bottom">
                  <div className="me-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-person text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{session.athlete}</h6>
                    <Badge bg="outline-secondary" className="me-2">{session.type}</Badge>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-primary">{session.time}</div>
                  </div>
                </div>
              ))}
              <div className="text-center mt-3">
                <a href="/group" className="btn btn-outline-primary btn-sm">
                  View All Scheduled
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-lightning me-2"></i>
                Quick Actions
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3} className="mb-3">
                  <div className="d-grid">
                    <a href="/athlete" className="btn btn-outline-primary">
                      <i className="bi bi-plus-circle me-2"></i>
                      Add Athlete
                    </a>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="d-grid">
                    <a href="/group" className="btn btn-outline-success">
                      <i className="bi bi-calendar-plus me-2"></i>
                      Schedule Session
                    </a>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="d-grid">
                    <a href="/simulation" className="btn btn-outline-info">
                      <i className="bi bi-graph-up-arrow me-2"></i>
                      Run Simulation
                    </a>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="d-grid">
                    <a href="/analytics" className="btn btn-outline-warning">
                      <i className="bi bi-bar-chart me-2"></i>
                      View Reports
                    </a>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
