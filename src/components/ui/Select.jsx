import React, { useState, useRef, useEffect } from 'react';

export default function Select({ 
  id, 
  name, 
  value, 
  onChange, 
  onBlur, 
  options, 
  placeholder = "Select...",
  className = "",
  error
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue, name } });
    setIsOpen(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className="input-group" style={{ position: 'relative' }} ref={selectRef}>
      <div
        className={`input-field ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
          background: 'rgba(0, 0, 0, 0.3)',
        }}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={onBlur}
      >
        <span style={{ color: selectedOption ? '#fff' : 'var(--text-muted)' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span style={{ 
          color: 'var(--text-muted)', 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          fontSize: '0.8rem'
        }}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            background: 'rgba(0, 8, 16, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: value === option.value ? '600' : '400',
                background: value === option.value 
                  ? 'rgba(0, 212, 255, 0.25)' 
                  : 'transparent',
                transition: 'background 0.2s, font-weight 0.2s',
                borderLeft: value === option.value 
                  ? '3px solid var(--accent-primary)' 
                  : '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (value !== option.value) {
                  e.target.style.background = 'rgba(0, 212, 255, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option.value) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <span className="error-msg">{error.message}</span>}
    </div>
  );
}

