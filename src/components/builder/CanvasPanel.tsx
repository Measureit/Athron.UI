import React, { useRef } from 'react';
import { BuilderElement } from './elements';
import { elementsToText } from './parser';

interface CanvasPanelProps {
  elements: BuilderElement[];
  setElements: (els: BuilderElement[]) => void;
}


const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;

const CanvasPanel: React.FC<CanvasPanelProps> = ({ elements, setElements }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Obsługa upuszczania nowego elementu z Topbar
  const handleDropNew = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType") as BuilderElement["type"];
    if (!type) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const canvasW = canvasRef.current?.offsetWidth || CANVAS_WIDTH;
    const canvasH = canvasRef.current?.offsetHeight || CANVAS_HEIGHT;
    let xPx = rect ? e.clientX - rect.left : 0;
    let yPx = rect ? e.clientY - rect.top : 0;
    // Element sizes in px
    let elemW = 24, elemH = 24;
    if (type === 'ball') { elemW = 20; elemH = 20; }
    else if (type === 'goal') { elemW = canvasW * 0.10; elemH = canvasH * 0.04; }
    else if (type === 'cone') { elemW = 18; elemH = 18; }
    else if (type === 'pitch') { elemW = canvasW * 0.33; elemH = canvasH * 0.24; }
    // Center under cursor
    xPx -= elemW / 2;
    yPx -= elemH / 2;
    // Zamiana na procenty
    const x = Math.max(0, Math.min(100, (xPx / canvasW) * 100));
    const y = Math.max(0, Math.min(100, (yPx / canvasH) * 100));
    let newElement: BuilderElement | null = null;
    if (type === 'player') {
      const nextId = 1 + elements.filter(e => e.type === 'player').length;
      newElement = { type: 'player', id: nextId, x, y };
    } else if (type === 'ball') {
      newElement = { type: 'ball', x, y };
    } else if (type === 'goal') {
      newElement = { type: 'goal', x, y, width: 10, height: 4 };
    } else if (type === 'cone') {
      newElement = { type: 'cone', x, y };
    } else if (type === 'pitch') {
      newElement = { type: 'pitch', x, y, width: 33, height: 24 };
    }
    if (newElement) {
      setElements([...elements, newElement]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  // Drag & drop przesuwanie elementów na canvasie
  const [draggedIdx, setDraggedIdx] = React.useState<number | null>(null);

  const handleDragStart = (idx: number, e: React.DragEvent<HTMLDivElement>) => {
    setDraggedIdx(idx);
    // Przekazujemy indeks elementu
    e.dataTransfer.setData('elementIdx', idx.toString());
  };

  const handleDropOnCanvas = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const idxStr = e.dataTransfer.getData('elementIdx');
    if (!idxStr) return;
    const idx = parseInt(idxStr, 10);
    const rect = canvasRef.current?.getBoundingClientRect();
    const canvasW = canvasRef.current?.offsetWidth || CANVAS_WIDTH;
    const canvasH = canvasRef.current?.offsetHeight || CANVAS_HEIGHT;
    let xPx = rect ? e.clientX - rect.left : 0;
    let yPx = rect ? e.clientY - rect.top : 0;
    // Get element size
    const el = elements[idx];
    let elemW = 24, elemH = 24;
    if (el.type === 'ball') { elemW = 20; elemH = 20; }
    else if (el.type === 'goal') { elemW = canvasW * 0.10; elemH = canvasH * 0.04; }
    else if (el.type === 'cone') { elemW = 18; elemH = 18; }
    else if (el.type === 'pitch') { elemW = canvasW * 0.33; elemH = canvasH * 0.24; }
    xPx -= elemW / 2;
    yPx -= elemH / 2;
    const x = Math.max(0, Math.min(100, (xPx / canvasW) * 100));
    const y = Math.max(0, Math.min(100, (yPx / canvasH) * 100));
    const updated = elements.map((el, i) => {
      if (i !== idx) return el;
      if ('x' in el && 'y' in el) {
        return { ...el, x, y };
      }
      return el;
    });
    setElements(updated);
    setDraggedIdx(null);
  };

  const handleDragOverCanvas = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      ref={canvasRef}
      style={{ width: '100%', height: CANVAS_HEIGHT, position: 'relative', background: '#e9ecef', border: '1px solid #ccc' }}
      onDrop={e => {
        if (e.dataTransfer.getData('elementType')) {
          handleDropNew(e);
        } else {
          handleDropOnCanvas(e);
        }
      }}
      onDragOver={e => {
        e.preventDefault();
      }}
    >
  {/* Tło boiska usunięte, boisko pojawia się tylko jako element jeśli dodane */}
      {/* Elementy na boisku */}
      {elements.map((el, idx) => {
        switch (el.type) {
          case 'pitch': {
            const left = `${el.x}%`;
            const top = `${el.y}%`;
            const width = `${el.width || 33}%`;
            const height = `${el.height || 24}%`;
            return (
              <svg
                key={idx}
                width="100%"
                height="100%"
                style={{ position: 'absolute', left, top, width, height, zIndex: 1 }}
              >
                <rect x={2} y={2} width="96%" height="92%" rx={16} fill="#4caf50" stroke="#fff" strokeWidth={3} />
                <line x1="50%" y1={2} x2="50%" y2="92%" stroke="#fff" strokeWidth={2} />
                <circle cx="50%" cy="48%" r="18%" fill="none" stroke="#fff" strokeWidth={2} />
              </svg>
            );
          }
          case 'player': {
            const left = `${el.x}%`;
            const top = `${el.y}%`;
            return (
              <div
                key={idx}
                style={{ position: 'absolute', left, top, width: 24, height: 24, borderRadius: '50%', background: '#1976d2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 14, cursor: 'grab', overflow: 'hidden', padding: 0, zIndex: 1 }}
                draggable
                onDragStart={e => handleDragStart(idx, e)}
              >{el.id}</div>
            );
          }
          case 'ball': {
            const left = `${el.x}%`;
            const top = `${el.y}%`;
            return (
              <div
                key={idx}
                style={{ position: 'absolute', left, top, width: 20, height: 20, borderRadius: '50%', background: '#fff', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'grab', overflow: 'hidden', padding: 0, zIndex: 1 }}
                draggable
                onDragStart={e => handleDragStart(idx, e)}
              >⚽</div>
            );
          }
          case 'goal': {
            const left = `${el.x}%`;
            const top = `${el.y}%`;
            const width = `${el.width}%`;
            const height = `${el.height}%`;
            return (
              <div
                key={idx}
                style={{ position: 'absolute', left, top, width, height, border: '3px solid #43a047', borderRadius: 4, cursor: 'grab', overflow: 'hidden', padding: 0, zIndex: 1 }}
                draggable
                onDragStart={e => handleDragStart(idx, e)}
              ></div>
            );
          }
          case 'cone': {
            const left = `${el.x}%`;
            const top = `${el.y}%`;
            return (
              <div
                key={idx}
                style={{ position: 'absolute', left, top, width: 18, height: 18, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', overflow: 'hidden', padding: 0, zIndex: 1 }}
                draggable
                onDragStart={e => handleDragStart(idx, e)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 14,14 2,14" fill="#ff9800" stroke="#d2691e" strokeWidth="1" /></svg>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
};

const DraggableElement: React.FC<{ type: 'player' | 'ball' | 'goal' }> = ({ type }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("elementType", type);
  };
  let style: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
    cursor: "grab",
    boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
  };
  let content = null;
  if (type === 'player') {
    style = { ...style, background: '#007bff', color: '#fff' };
    content = 'P';
  } else if (type === 'ball') {
    style = { ...style, background: '#fff', border: '2px solid #333', color: '#333' };
    content = '⚽';
  } else if (type === 'goal') {
    style = { ...style, background: '#28a745', color: '#fff' };
    content = 'G';
  }
  return (
    <div draggable onDragStart={handleDragStart} style={style}>{content}</div>
  );
};

export default CanvasPanel;
