import React, { useState } from 'react';
import { Container, Form, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

// Przykładowe ćwiczenia
const EXERCISES = [
  { id: 1, name: 'Podania w trójkącie', description: 'Ćwiczenie na podania i ruch bez piłki.' },
  { id: 2, name: 'Strzały na bramkę', description: 'Ćwiczenie na doskonalenie strzałów.' },
  { id: 3, name: 'Gra 1 na 1', description: 'Ćwiczenie na drybling i obronę.' },
  { id: 4, name: 'Pressing zespołowy', description: 'Ćwiczenie na współpracę w obronie.' },
  { id: 5, name: 'Rozgrzewka dynamiczna', description: 'Ćwiczenie na rozgrzewkę przed treningiem.' },
];

const ExerciseLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = EXERCISES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container style={{ maxWidth: 600, marginTop: 32 }}>
      <h2 className="mb-4">Biblioteka ćwiczeń</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Szukaj ćwiczenia..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </InputGroup>
      <ListGroup>
        {filtered.length === 0 ? (
          <ListGroup.Item>Brak wyników.</ListGroup.Item>
        ) : (
          filtered.map(ex => (
            <ListGroup.Item key={ex.id}>
              <div style={{ fontWeight: 'bold' }}>{ex.name}</div>
              <div style={{ fontSize: 13, color: '#555' }}>{ex.description}</div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default ExerciseLibrary;
