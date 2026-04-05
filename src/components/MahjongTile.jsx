// src/components/MahjongTile.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function MahjongTile({ tile, size = 'normal', index = 0 }) {
  const isSmall = size === 'small';
  
  // Tactical color themes based on type
  let colorTheme = '#1f2937'; // Deep tone for standard suits
  if (tile.type === 'WIND') colorTheme = 'var(--accent-jade)';
  if (tile.type === 'DRAGON') {
    if (tile.templateId.includes('RED')) colorTheme = 'var(--accent-crimson)';
    else if (tile.templateId.includes('GREEN')) colorTheme = 'var(--accent-teal)';
    else colorTheme = '#64748b'; // White Dragon
  }

  // Fluid levitation variants
  const variants = {
    hidden: { opacity: 0, y: -40, rotateX: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        delay: index * 0.08, 
        type: 'spring', 
        stiffness: 100,
        damping: 12
      } 
    },
    hover: {
      y: -8,
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{
        background: 'var(--tile-gradient)', // Ivory bone texture
        color: '#1a202c',
        borderRadius: isSmall ? '6px' : '12px',
        padding: isSmall ? '8px 4px' : '18px 12px',
        minWidth: isSmall ? '44px' : '88px',
        minHeight: isSmall ? '62px' : '124px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--tile-shadow)',
        position: 'relative',
        cursor: 'default'
      }}
    >
      {/* Show the original base value above the name */}
      <div style={{ fontSize: isSmall ? '0.5rem' : '0.65rem', color: '#94a3b8', letterSpacing: '1px', textAlign: 'center' }}>
        BASE: {tile.baseValue}
      </div>
      
      {/* Primary Tile Face - using Serif font */}
      <div className="tile-text" style={{ fontSize: isSmall ? '0.9rem' : '1.4rem', fontWeight: '800', color: colorTheme, textAlign: 'center' }}>
        {tile.type === 'NUMBER' ? tile.baseValue : tile.name.split(' ')[0]}
      </div>
      
      {/* Dynamic Value Badge for Special Tiles */}
      {tile.isSpecial && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          background: 'var(--accent-jade)', // Solid Jade green background
          color: '#ffffff', // Crisp white text
          border: '2px solid #ffffff', // White border so it pops
          borderRadius: '50%',
          width: isSmall ? '24px' : '32px',
          height: isSmall ? '24px' : '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isSmall ? '0.85rem' : '1.05rem',
          fontWeight: '900',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}>
          {tile.currentValue ?? tile.valueSnapshot ?? tile.baseValue}
        </div>
      )}

      {tile.type === 'NUMBER' && (
        <div style={{ fontSize: isSmall ? '0.6rem' : '0.75rem', color: '#64748b', letterSpacing: '1px', fontWeight: 'bold' }}>
          {tile.suit.substring(0, 3)}
        </div>
      )}

      {/* Glossy overlay reflection */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
        borderRadius: isSmall ? '6px 6px 0 0' : '12px 12px 0 0',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
