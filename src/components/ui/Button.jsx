import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  // Note: Using inline styles for simplicity since we aren't using Tailwind fully yet, 
  // but mapping 'variant' to our CSS variables.

  const variants = {
    primary: {
      background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-tertiary))', // Cyan -> Purple
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 20px rgba(0, 212, 255, 0.4)'
    },
    outline: {
      background: 'transparent',
      color: '#fff',
      border: '1px solid var(--border-subtle)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      border: 'none',
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? {
        scale: 1.05,
        y: -2,
        boxShadow: "0 0 25px rgba(0, 212, 255, 0.6)"
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={{ ...variants[variant] }}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
