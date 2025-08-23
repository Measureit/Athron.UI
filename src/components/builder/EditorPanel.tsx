import React from 'react';

interface EditorPanelProps {
  value: string;
  onChange: (val: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ value, onChange }) => (
  <textarea
    className="form-control"
    style={{ width: '100%', height: '100%', minHeight: 500, fontFamily: 'monospace', fontSize: 16 }}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

export default EditorPanel;
