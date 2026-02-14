import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface SaveExerciseModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (meta: { name: string; description: string; author: string }) => void;
}

const SaveExerciseModal: React.FC<SaveExerciseModalProps> = ({ show, onHide, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, description, author });
      setName('');
      setDescription('');
      setAuthor('');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Zapisz ćwiczenie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nazwa ćwiczenia</Form.Label>
            <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder="Podania w trójkącie" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Opis</Form.Label>
            <Form.Control value={description} onChange={e => setDescription(e.target.value)} as="textarea" rows={2} placeholder="Opis ćwiczenia..." />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control value={author} onChange={e => setAuthor(e.target.value)} placeholder="Jan Kowalski" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Anuluj</Button>
        <Button variant="primary" onClick={handleSave}>Zapisz</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveExerciseModal;
