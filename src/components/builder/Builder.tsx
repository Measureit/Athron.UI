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

  // Synchronizacja: tekst -> grafika
  React.useEffect(() => {
    setElements(parseTextToElements(text));
  }, [text]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1, minHeight: 0, paddingTop: 8, boxSizing: 'border-box', width: '100%' }}>
        <div style={{ flex: 1, borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
          <CanvasPanel elements={elements} setElements={setElements} />
        </div>
        <div style={{ flexBasis: 400, maxWidth: 500, minWidth: 300, padding: 16, background: '#f8f9fa', paddingTop: 0 }}>
          <EditorPanel value={text} onChange={setText} />
        </div>
      </div>
    </div>
  );
};

export default Builder;
