import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Image, Form } from 'react-bootstrap';
import { SKILLS } from '../data/skills';
import { useSelector } from 'react-redux';
import { selectAthletes } from '../redux/athleteSlice';
import { useTranslation } from 'react-i18next';

interface Params {
  id: string;
}

type ProgressMap = { [athleteId: string]: number[] };

const storageKey = (skillId: number) => `skills_progress_${skillId}`;

const SkillsDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const skillId = parseInt(id, 10);
  const skill = SKILLS.find(s => s.id === skillId);

  const athletes = useSelector(selectAthletes) as any[];
  const { t } = useTranslation();

  const [progress, setProgress] = useState<ProgressMap>({});
  const [messages, setMessages] = useState<Array<{ from: string; text: string }>>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // load progress from localStorage
    const raw = localStorage.getItem(storageKey(skillId));
    if (raw) {
      try {
        setProgress(JSON.parse(raw));
      } catch {
        setProgress({});
      }
    }
  }, [skillId]);

  useEffect(() => {
    // initialize empty progress for athletes if missing
    if (athletes && athletes.length > 0) {
      setProgress(prev => {
        const next = { ...prev };
        athletes.forEach(a => {
          if (!next[a.id]) next[a.id] = [];
        });
        return next;
      });
    }
  }, [athletes]);

  if (!skill) {
    return (
      <Container className="p-4">
        <Card>
          <Card.Body>
            <Card.Title>{t('skillNotFound')}</Card.Title>
            <Button variant="primary" onClick={() => history.push('/skills-library')}>{t('backToSkills')}</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const toggleLevel = (athleteId: string, level: number) => {
    setProgress(prev => {
      const athleteLevels = new Set(prev[athleteId] || []);
      if (athleteLevels.has(level)) athleteLevels.delete(level);
      else athleteLevels.add(level);
      const next = { ...prev, [athleteId]: Array.from(athleteLevels).sort() };
      localStorage.setItem(storageKey(skillId), JSON.stringify(next));
      return next;
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { from: 'You', text: userMsg }]);
    setInput('');
    // Fake Guard response
    setTimeout(() => {
      const reply = `Guard: For ${skill.name}, focus on repetitions and gradually increase difficulty. Try level 1 drills first.`;
      setMessages(m => [...m, { from: 'Guard', text: reply }]);
    }, 700);
  };

  return (
    <Container className="p-4">
      <Card className="shadow-sm">
        <Card.Header>
          <h4 className="mb-0">{skill.name}</h4>
          <small className="text-muted">{skill.details || skill.description}</small>
        </Card.Header>
        <Card.Body>
          <Row>
            {[1, 2, 3].map(level => (
              <Col md={4} key={level} className="mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <h6 className="fw-bold">{t('level')} {level}</h6>
                    <Image src={`https://via.placeholder.com/300x160?text=Level+${level}`} fluid rounded className="mb-3" />
                    <p className="text-muted">Visual material for level {level} (exercise diagrams / images / video placeholder).</p>

                    <div>
                      <strong>{t('markAcquiredBy')}</strong>
                      {athletes && athletes.length > 0 ? (
                        athletes.map(a => {
                          const acquired = (progress[a.id] || []).includes(level);
                          return (
                            <Form.Check
                              key={a.id}
                              type="checkbox"
                              id={`chk-${a.id}-l${level}`}
                              label={a.name}
                              checked={acquired}
                              onChange={() => toggleLevel(a.id, level)}
                              className="mt-2"
                            />
                          );
                        })
                      ) : (
                        <div className="text-muted">{t('noPlayersAvailable')}</div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-3 d-flex justify-content-between">
            <div>
              <Button variant="secondary" onClick={() => history.push('/skills-library')} className="me-2">{t('backToSkills')}</Button>
            </div>
          </div>

          {/* Ask the Guard chat */}
          <div className="mt-4">
            <h5>{t('askTheGuard')}</h5>
            <Card className="mb-2" style={{ maxHeight: 200, overflowY: 'auto' }}>
              <Card.Body>
                {messages.length === 0 ? (
                  <div className="text-muted">{t('askQuestion')}</div>
                ) : (
                  messages.map((m, idx) => (
                    <div key={idx} className={`mb-2 ${m.from === 'Guard' ? 'text-primary' : ''}`}>
                      <small className="text-muted">{m.from}:</small>
                      <div>{m.text}</div>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>

            <Form.Control
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder={t('askQuestion')}
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SkillsDetail;
