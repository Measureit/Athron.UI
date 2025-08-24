import React, { useState } from 'react';
import Topbar from './Topbar';
import CanvasPanel from './CanvasPanel';
import EditorPanel from './EditorPanel';
import { parseTextToElements, elementsToText } from './parser';
import { BuilderElement } from './elements';

const Builder: React.FC = () => {
  const [elements, setElements] = useState<BuilderElement[]>([]);
  const [text, setText] = useState('');

  // Synchronizacja: grafika -> tekst
  React.useEffect(() => {
    setText(elementsToText(elements));
  }, [elements]);

  // Synchronizacja: tekst -> grafika (tylko na żądanie, nie automatycznie)
  // Jeśli chcesz zsynchronizować tekst z grafiką, wywołaj ręcznie

  // Splitter logic
  const MIN_EDITOR = 200;
  const MIN_CANVAS = 200;
  const [editorWidth, setEditorWidth] = useState(400);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const newWidth = Math.max(MIN_EDITOR, Math.min(window.innerWidth - MIN_CANVAS, window.innerWidth - e.clientX));
      setEditorWidth(newWidth);
    }
  };
  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1, minHeight: 0, paddingTop: 8, boxSizing: 'border-box', width: '100%', position: 'relative' }}>
        <div style={{ flex: 1, borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
          <CanvasPanel elements={elements} setElements={setElements} />
        </div>
        <div
          style={{
            width: editorWidth,
            minWidth: MIN_EDITOR,
            maxWidth: window.innerWidth - MIN_CANVAS,
            padding: 16,
            background: '#f8f9fa',
            paddingTop: 0,
            position: 'relative',
            transition: dragging ? 'none' : 'width 0.2s',
          }}
        >
          <EditorPanel value={text} onChange={setText} />
        </div>
        <div
          style={{
            width: 8,
            cursor: 'col-resize',
            background: dragging ? '#1976d2' : '#eee',
            zIndex: 10,
            position: 'absolute',
            right: editorWidth,
            top: 0,
            bottom: 0,
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default Builder;
