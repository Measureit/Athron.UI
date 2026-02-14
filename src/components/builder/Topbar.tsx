import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

type ToolbarItem = {
  type: 'player' | 'ball' | 'goal' | 'cone' | 'whistle' | 'arrow' | 'pitch';
  label: string;
  icon: React.ReactNode;
  color: string;
  border?: string;
};



const TOOLBAR_ITEMS: ToolbarItem[] = [
  {
    type: 'player',
    label: 'Zawodnik',
    icon: <span style={{fontWeight:'bold'}}>P</span>,
    color: '#1976d2',
  },
  {
    type: 'ball',
    label: 'Piłka',
    icon: <span>⚽</span>,
    color: '#fff',
    border: '2px solid #333',
  },
  {
    type: 'goal',
    label: 'Bramka',
    icon: <span style={{fontWeight:'bold'}}>G</span>,
    color: '#43a047',
  },
  {
    type: 'cone',
    label: 'Stożek',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}><polygon points="8,2 14,14 2,14" fill="#ff9800" stroke="#d2691e" strokeWidth="1" /></svg>,
    color: 'transparent',
  },
];

// Usunięto duplikat starego komponentu DraggableToolbarItem
const DraggableToolbarItem: React.FC<{ item: ToolbarItem }> = ({ item }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("elementType", item.type);
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 8,
        cursor: 'grab',
        border: item.border,
        background: item.color !== 'transparent' ? item.color : undefined,
        color: item.type === 'ball' ? '#333' : '#fff',
        padding: 0,
      }}
      title={item.label}
    >
      {item.icon}
    </div>
  );
};
interface TopbarProps {
  onSaveExercise?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onSaveExercise }) => {
  return (
    <div style={{ padding: '8px 16px', background: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <ButtonGroup aria-label="Toolbar">
        {TOOLBAR_ITEMS.map(item => (
          <DraggableToolbarItem key={item.type} item={item} />
        ))}
      </ButtonGroup>
      <button className="btn btn-success ms-3" onClick={onSaveExercise}>
        Zapisz ćwiczenie
      </button>
    </div>
  );
};

export default Topbar;
