import React, { useState } from 'react';
import Topbar from './Topbar';
import SaveExerciseModal from './SaveExerciseModal';
import CanvasPanel from './CanvasPanel';
import EditorPanel from './EditorPanel';
import { parseTextToElements, elementsToText } from './parser';
import { BuilderElement } from './elements';

const Builder: React.FC = () => {
  const [elements, setElements] = useState<BuilderElement[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [text, setText] = useState('');
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const MIN_EDITOR = 200;
const MIN_CANVAS = 200;
const MIN_META = 48;
const MAX_META = 300;
const [editorWidth, setEditorWidth] = useState(400);
const [draggingEditor, setDraggingEditor] = useState(false);
const [metaHeight, setMetaHeight] = useState(120);
const [draggingMeta, setDraggingMeta] = useState(false);
const SPLITTER_HEIGHT = 8;

// Vertical splitter (editor)
const handleEditorMouseDown = () => setDraggingEditor(true);
const handleEditorMouseUp = () => setDraggingEditor(false);
const handleEditorMouseMove = (e: MouseEvent) => {
  if (draggingEditor) {
    const newWidth = Math.max(MIN_EDITOR, Math.min(window.innerWidth - MIN_CANVAS, window.innerWidth - e.clientX));
    setEditorWidth(newWidth);
  }
};
React.useEffect(() => {
  if (draggingEditor) {
    window.addEventListener('mousemove', handleEditorMouseMove);
    window.addEventListener('mouseup', handleEditorMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleEditorMouseMove);
      window.removeEventListener('mouseup', handleEditorMouseUp);
    };
  }
}, [draggingEditor]);

// Horizontal splitter (meta)
React.useEffect(() => {
  function handleMetaMove(e: MouseEvent) {
    if (draggingMeta) {
      const y = e.clientY;
      // Get top of canvas area
      const canvasTop = document.getElementById('canvas-area')?.getBoundingClientRect().top || 0;
      const newHeight = Math.max(MIN_META, Math.min(MAX_META, window.innerHeight - y));
      setMetaHeight(newHeight);
    }
  }
  function handleMetaUp() { setDraggingMeta(false); }
  if (draggingMeta) {
    window.addEventListener('mousemove', handleMetaMove);
    window.addEventListener('mouseup', handleMetaUp);
    return () => {
      window.removeEventListener('mousemove', handleMetaMove);
      window.removeEventListener('mouseup', handleMetaUp);
    };
  }
}, [draggingMeta]);

  // Synchronizacja: grafika -> tekst
  React.useEffect(() => {
    setText(elementsToText(elements));
  }, [elements]);

  // Synchronizacja: tekst -> grafika (tylko na żądanie, nie automatycznie)
  // Jeśli chcesz zsynchronizować tekst z grafiką, wywołaj ręcznie


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      <Topbar onSaveExercise={() => setShowSaveModal(true)} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0, width: '100%' }}>
        {/* Left side: canvas + metadata form (split horizontally) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
          {/* Canvas area */}
          <div id="canvas-area" style={{ height: `calc(100% - ${metaHeight + SPLITTER_HEIGHT}px)`, minHeight: 100, borderRight: '1px solid #ddd', background: '#fff', position: 'relative' }}>
            <CanvasPanel elements={elements} setElements={setElements} />
          </div>
          {/* Horizontal splitter */}
          <div style={{ height: SPLITTER_HEIGHT, cursor: 'row-resize', background: '#eee', width: '100%' }}
            onMouseDown={() => setDraggingMeta(true)}
          />
          {/* Metadata form */}
          <div style={{ height: metaHeight, minHeight: MIN_META, background: '#f8f9fa', borderTop: '1px solid #eee', padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Tytuł ćwiczenia..."
              value={exerciseTitle}
              onChange={e => setExerciseTitle(e.target.value)}
              style={{ fontSize: 22, fontWeight: 'bold', maxWidth: 600 }}
            />
            <textarea
              className="form-control"
              placeholder="Opis ćwiczenia..."
              value={exerciseDescription}
              onChange={e => setExerciseDescription(e.target.value)}
              style={{ fontSize: 16, minHeight: 48, maxWidth: 600 }}
            />
          </div>
        </div>
        {/* Vertical splitter */}
        <div style={{ width: 8, cursor: 'col-resize', background: draggingEditor ? '#1976d2' : '#eee', zIndex: 10 }}
          onMouseDown={handleEditorMouseDown}
        />
        {/* Right side: code editor */}
        <div
          style={{ width: editorWidth, minWidth: MIN_EDITOR, maxWidth: window.innerWidth - MIN_CANVAS, padding: 16, background: '#f8f9fa', paddingTop: 0, position: 'relative', transition: draggingEditor ? 'none' : 'width 0.2s' }}
        >
          <EditorPanel value={text} onChange={setText} />
        </div>
      </div>
      <SaveExerciseModal
        show={showSaveModal}
        onHide={() => setShowSaveModal(false)}
        onSave={meta => {
          setShowSaveModal(false);
          // Serialize builder state and metadata
          const exercise = {
            id: Date.now().toString(),
            name: exerciseTitle || meta.name,
            description: exerciseDescription || meta.description,
            author: meta.author,
            createdAt: new Date().toISOString(),
            version: 1,
            builderCode: JSON.stringify(elements),
          };
          // Save to localStorage (MVP)
          const prev = JSON.parse(localStorage.getItem('athron_exercises') || '[]');
          localStorage.setItem('athron_exercises', JSON.stringify([exercise, ...prev]));
        }}
      />
    </div>
  );
}
export default Builder;
