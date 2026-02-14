import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SearchBar from './search/SearchBar';
import { SKILLS, Skill } from '../data/skills';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SkillsLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const { t } = useTranslation();

  const filtered = SKILLS.filter((s: Skill) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const openDetail = (id: number) => {
    history.push(`/skills/${id}`);
  };

  // Build ordered list of pair keys from filtered skills
  const pairKeys: string[] = [];
  filtered.forEach(s => {
    if (s.pair) {
      if (!pairKeys.includes(s.pair)) pairKeys.push(s.pair);
    }
  });

  // Paired rows
  const pairedRows = pairKeys.map(key => {
    const attack = filtered.find(s => s.pair === key && s.category === 'attack');
    const defense = filtered.find(s => s.pair === key && s.category === 'defense');
    return { key, attack, defense };
  });

  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0" style={{ background: '#f8f9fa' }}>
      <div className="px-4 pt-4">
        <h2 className="mb-4">Skills Library</h2>
        <SearchBar value={search} onChange={setSearch} placeholder="Search skills..." />
      </div>

      <div className="px-4 pb-4 flex-grow-1" style={{ minHeight: 0 }}>
        {/* Column headers with descriptions */}
        <Row className="mb-3">
          <Col md={6}>
            <h5 className="mb-2 text-success">{t('attack')}</h5>
            <p className="text-muted">{t('attackDescription')}</p>
          </Col>
          <Col md={6}>
            <h5 className="mb-2 text-danger">{t('defense')}</h5>
            <p className="text-muted">{t('defenseDescription')}</p>
          </Col>
        </Row>

        {pairedRows.length === 0 && (
          <Card className="text-center"><Card.Body>{t('noResults')}</Card.Body></Card>
        )}

        {pairedRows.map(row => (
          <Row className="mb-3" key={row.key}>
            <Col md={6} className="mb-2">
              {row.attack ? (
                <Card className="h-100 shadow-sm" role="button" onClick={() => openDetail(row.attack!.id)} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title>{row.attack.name}</Card.Title>
                    <Card.Text style={{ fontSize: 14, color: '#555' }}>{row.attack.description}</Card.Text>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="h-100 border-dashed text-center"><Card.Body>No attack equivalent</Card.Body></Card>
              )}
            </Col>

            <Col md={6} className="mb-2">
              {row.defense ? (
                <Card className="h-100 shadow-sm" role="button" onClick={() => openDetail(row.defense!.id)} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title className="text-danger">{row.defense.name}</Card.Title>
                    <Card.Text style={{ fontSize: 14, color: '#555' }}>{row.defense.description}</Card.Text>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="h-100 border-dashed text-center"><Card.Body>No defense equivalent</Card.Body></Card>
              )}
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default SkillsLibrary;
