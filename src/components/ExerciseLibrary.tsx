import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SearchBar from './search/SearchBar';

// Sample exercises
const EXERCISES = [
  { id: 1, name: 'Triangle Passing', description: 'Passing and movement without the ball.' },
  { id: 2, name: 'Shots on Goal', description: 'Drill to improve shooting accuracy and power.' },
  { id: 3, name: '1v1 Duel', description: 'Drill for dribbling and defending in one-on-one situations.' },
  { id: 4, name: 'Team Pressing', description: 'Drill to practice team defending and pressing.' },
  { id: 5, name: 'Dynamic Warmup', description: 'Warm-up routine before training.' },
];

const ExerciseLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = EXERCISES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0" style={{ background: '#f8f9fa' }}>
      <div className="px-4 pt-4">
        <h2 className="mb-4">Exercise Library</h2>
        <SearchBar value={search} onChange={setSearch} placeholder="Search exercises..." />
      </div>
  <Row xs={1} sm={2} md={3} className="g-4 flex-grow-1 px-4 pb-4" style={{ minHeight: 0 }}>
        {filtered.length === 0 ? (
          <Col><Card className="text-center"><Card.Body>Brak wyników.</Card.Body></Card></Col>
        ) : (
          filtered.map(ex => (
            <Col key={ex.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{ex.name}</Card.Title>
                  <Card.Text style={{ fontSize: 14, color: '#555' }}>{ex.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ExerciseLibrary;
