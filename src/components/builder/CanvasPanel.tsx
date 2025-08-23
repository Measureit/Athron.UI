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
    const x = rect ? e.clientX - rect.left - 15 : 0;
    const y = rect ? e.clientY - rect.top - 15 : 0;
    let newElement: BuilderElement | null = null;
    if (type === 'player') {
      const nextId = 1 + elements.filter(e => e.type === 'player').length;
      newElement = { type: 'player', id: nextId, x: Math.max(0, Math.min(x, CANVAS_WIDTH - 30)), y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 30)) };
    } else if (type === 'ball') {
      newElement = { type: 'ball', x: Math.max(0, Math.min(x, CANVAS_WIDTH - 20)), y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 20)) };
    } else if (type === 'goal') {
      newElement = { type: 'goal', x: Math.max(0, Math.min(x, CANVAS_WIDTH - 60)), y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 20)), width: 60, height: 20 };
    } else if (type === 'cone') {
      newElement = { type: 'cone', x: Math.max(0, Math.min(x, CANVAS_WIDTH - 24)), y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 24)) };
    } else if (type === 'whistle') {
      newElement = { type: 'whistle', x: Math.max(0, Math.min(x, CANVAS_WIDTH - 24)), y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 24)) };
    } else if (type === 'arrow') {
      newElement = { type: 'arrow', x: Math.max(0, Math.min(x, CANVAS_WIDTH - 40)), y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 24)), length: 40 };
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
    const x = rect ? e.clientX - rect.left : 0;
    const y = rect ? e.clientY - rect.top : 0;
    const updated = elements.map((el, i) => {
      if (i !== idx) return el;
      if ('x' in el && 'y' in el) {
        if (el.type === 'player') {
          return { ...el, x: Math.max(0, Math.min(x - 15, CANVAS_WIDTH - 30)), y: Math.max(0, Math.min(y - 15, CANVAS_HEIGHT - 30)) };
        }
        if (el.type === 'ball') {
          return { ...el, x: Math.max(0, Math.min(x - 10, CANVAS_WIDTH - 20)), y: Math.max(0, Math.min(y - 10, CANVAS_HEIGHT - 20)) };
        }
        if (el.type === 'goal') {
          return { ...el, x: Math.max(0, Math.min(x - 30, CANVAS_WIDTH - 60)), y: Math.max(0, Math.min(y - 10, CANVAS_HEIGHT - 20)) };
        }
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
        // Jeśli przeciągamy nowy element z Topbar
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
      {elements.map((el, idx) => {
        if (el.type === 'player') {
          return <div
            key={idx}
            style={{ position: 'absolute', left: el.x, top: el.y, width: 24, height: 24, borderRadius: '50%', background: '#1976d2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 14, cursor: 'grab', overflow: 'hidden', padding: 0 }}
            draggable
            onDragStart={e => handleDragStart(idx, e)}
          >{el.id}</div>;
        }
        if (el.type === 'ball') {
          return <div
            key={idx}
            style={{ position: 'absolute', left: el.x, top: el.y, width: 20, height: 20, borderRadius: '50%', background: '#fff', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'grab', overflow: 'hidden', padding: 0 }}
            draggable
            onDragStart={e => handleDragStart(idx, e)}
          >⚽</div>;
        }
        if (el.type === 'goal') {
          return <div
            key={idx}
            style={{ position: 'absolute', left: el.x, top: el.y, width: el.width, height: el.height, border: '3px solid #43a047', borderRadius: 4, cursor: 'grab', overflow: 'hidden', padding: 0 }}
            draggable
            onDragStart={e => handleDragStart(idx, e)}
          ></div>;
        }
        if (el.type === 'cone') {
          return <div
            key={idx}
            style={{ position: 'absolute', left: el.x, top: el.y, width: 18, height: 18, background: '#ff9800', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 13, borderRadius: '30%', cursor: 'grab', overflow: 'hidden', padding: 0 }}
            draggable
            onDragStart={e => handleDragStart(idx, e)}
          >▲</div>;
        }
        if (el.type === 'whistle') {
          return <div
            key={idx}
            style={{ position: 'absolute', left: el.x, top: el.y, width: 18, height: 18, background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 13, borderRadius: '50%', cursor: 'grab', overflow: 'hidden', padding: 0 }}
            draggable
            onDragStart={e => handleDragStart(idx, e)}
          >🎵</div>;
        }
        if (el.type === 'arrow') {
          return <div
            key={idx}
            style={{ position: 'absolute', left: el.x, top: el.y, width: el.length || 30, height: 18, background: 'transparent', color: '#607d8b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 16, cursor: 'grab', overflow: 'hidden', padding: 0 }}
            draggable
            onDragStart={e => handleDragStart(idx, e)}
          >→</div>;
        }
        return null;
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
