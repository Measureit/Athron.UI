import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
// import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit, placeholder }) => {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <Form className="d-flex justify-content-center mb-4" onSubmit={e => { e.preventDefault(); onSubmit && onSubmit(); }}>
      <InputGroup style={{ maxWidth: 500, width: '100%' }}>
        <FormControl
          type="search"
          placeholder={placeholder || 'Szukaj ćwiczenia...'}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ borderRadius: '24px 0 0 24px', boxShadow: focused ? '0 0 0 2px #1976d2' : undefined, fontSize: 18, paddingLeft: 20, height: 44 }}
        />
        <Button variant="primary" type="submit" style={{ borderRadius: '0 24px 24px 0', height: 44, width: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Fallback SVG search icon if FaSearch fails */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="2" />
            <line x1="15" y1="15" x2="19" y2="19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
