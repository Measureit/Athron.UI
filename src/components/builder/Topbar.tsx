import React from 'react';

type ToolbarItem = {
  type: 'player' | 'ball' | 'goal' | 'cone' | 'whistle' | 'arrow';
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
    label: 'Pachołek',
    icon: <span style={{fontWeight:'bold'}}>▲</span>,
    color: '#ff9800',
  },
];

const DraggableToolbarItem: React.FC<{ item: ToolbarItem }> = ({ item }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("elementType", item.type);
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        width: 28,
        height: 28,
        background: item.color,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
        cursor: 'grab',
        border: item.border,
        color: item.type === 'ball' ? '#333' : '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
        transition: 'transform 0.1s',
        overflow: 'hidden',
        padding: 0,
      }}
      title={item.label}
    >
      {item.icon}
    </div>
  );
};

const Topbar: React.FC = () => (
  <div style={{
    width: '100%',
    background: 'linear-gradient(90deg, #f8f9fa 80%, #e3eafc 100%)',
    borderBottom: '1px solid #ddd',
    padding: '0.5rem 1rem',
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    minHeight: 56,
  }}>
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {TOOLBAR_ITEMS.map(item => (
        <div key={item.type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
          <DraggableToolbarItem item={item} />
          <span style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{item.label}</span>
        </div>
      ))}
    </div>
    {/* Możesz dodać inne narzędzia, np. cofnij, powtórz, zapisz */}
  </div>
);

export default Topbar;
