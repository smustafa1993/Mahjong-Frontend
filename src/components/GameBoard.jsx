// src/components/GameBoard.jsx
import React from 'react';
import MahjongTile from './MahjongTile.jsx';
import HistoryReel from './HistoryReel.jsx';

export default function GameBoard({ gameState, onBet, onExit }) {
  if (!gameState) return null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }} className="animate-slide-up">
      
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <button onClick={onExit} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '10px 20px' }}>
          ← Leave Table
        </button>
        
        {/* Modern Score Display */}
        <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '12px 32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>Net Score</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-jade)', lineHeight: '1' }}>{gameState.score}</div>
        </div>

        {/* Deck Management HUD */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px', marginBottom: '6px' }}>
            <span>Draw Pile:</span> <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{gameState.drawPileCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px' }}>
            <span>Discard:</span> <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{gameState.discardPileCount}</span>
          </div>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="glass-panel" style={{ padding: '56px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle background glow behind tiles */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '60%', background: 'var(--accent-jade)', opacity: 0.05, filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

        <h3 style={{ marginBottom: '40px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>Current Drawn Hand</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', minHeight: '160px', position: 'relative', zIndex: 1 }}>
          {gameState.currentHand.map((tile, i) => (
            <MahjongTile key={tile.id} tile={tile} index={i} />
          ))}
        </div>

        <div style={{ marginTop: '48px', fontSize: '1.1rem', position: 'relative', zIndex: 1 }}>
          <span style={{ color: 'var(--text-secondary)', marginRight: '16px', letterSpacing: '1px' }}>TOTAL VALUE:</span> 
          <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-primary)', verticalAlign: 'middle', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>{gameState.currentHandValue}</span>
        </div>

        {/* Betting Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '56px', position: 'relative', zIndex: 1 }}>
          <button 
            className="btn btn-danger" 
            style={{ fontSize: '1.25rem', padding: '18px 48px', minWidth: '200px' }}
            onClick={() => onBet('lower')}
          >
            Bet Lower ↓
          </button>
          <button 
            className="btn btn-success" 
            style={{ fontSize: '1.25rem', padding: '18px 48px', minWidth: '200px' }}
            onClick={() => onBet('higher')}
          >
            Bet Higher ↑
          </button>
        </div>
      </div>

      <HistoryReel history={gameState.history} />
    </div>
  );
}
