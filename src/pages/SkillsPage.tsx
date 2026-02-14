import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SkillsPage: React.FC = () => {
  const skills = [
    {
      id: 1,
      title: 'Kontrola Piłki',
      description: 'Nauczenie się kontrolowania piłki w różnych sytuacjach na boisku',
      icon: 'bi-soccer',
      level: 'Początkujący'
    },
    {
      id: 2,
      title: 'Technika Podań',
      description: 'Opanowanie różnych rodzajów podań - krótkie, długie, diagonalne',
      icon: 'bi-arrow-left-right',
      level: 'Pośredni'
    },
    {
      id: 3,
      title: 'Strzały',
      description: 'Doskonalenie techniki strzałów i precyzji celowania',
      icon: 'bi-bullseye',
      level: 'Pośredni'
    },
    {
      id: 4,
      title: 'Pozycjonowanie',
      description: 'Zrozumienie taktyki gry i prawidłowego pozycjonowania na boisku',
      icon: 'bi-diagram-3',
      level: 'Zaawansowany'
    },
    {
      id: 5,
      title: 'Drybling',
      description: 'Zaawansowane techniki drybingu i ominięcia przeciwnika',
      icon: 'bi-arrow-down-circle',
      level: 'Zaawansowany'
    },
    {
      id: 6,
      title: 'Defensywa',
      description: 'Techniki obrony i przejęcia piłki od przeciwnika',
      icon: 'bi-shield',
      level: 'Zaawansowany'
    }
  ];

  return (
    <main style={{ marginTop: '70px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--light-navy) 100%)',
          color: 'white'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold mb-4">Umiejętności Piłkarskie</h1>
              <p className="lead mb-0">
                Rozwijaj swoje umiejętności piłkarskie poprzez strukturalny program treningowy
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="g-4">
            {skills.map((skill) => (
              <Col md={6} lg={4} key={skill.id}>
                <Card className="h-100 shadow-sm border-0 skill-card" style={{ transition: 'all 0.3s ease' }}>
                  <Card.Body className="p-4">
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '10px',
                        background: 'var(--secondary-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                      }}
                    >
                      <i
                        className={`bi ${skill.icon}`}
                        style={{ fontSize: '1.8rem', color: 'white' }}
                      ></i>
                    </div>
                    <h5 className="fw-bold mb-2">{skill.title}</h5>
                    <p className="text-muted small mb-3">{skill.description}</p>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white'
                      }}
                    >
                      {skill.level}
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <style>{`
        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </main>
  );
};

export default SkillsPage;
