// src/components/HistoryReel.jsx
import React from 'react';
import MahjongTile from './MahjongTile.jsx';

export default function HistoryReel({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '16px', marginTop: '24px', opacity: 0.5 }}>
        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>No history yet. Place a bet to start the reel.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '16px', marginTop: '24px' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>History (Last {history.length})</h3>
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {history.map((record, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: 'max-content' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {record.hand.map((tile, j) => (
                <MahjongTile key={j} tile={tile} size="small" index={0} />
              ))}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
              Value: {record.totalValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
