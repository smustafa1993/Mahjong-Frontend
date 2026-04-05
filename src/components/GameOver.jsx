import React, { useState, useEffect } from 'react';

export default function GameOver({ gameState, onRestart, onExit, onSubmitScore }) {
  if (!gameState || !gameState.isGameOver) return null;

  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasSavedLocally, setHasSavedLocally] = useState(false);

  useEffect(() => {
    if (gameState && gameState.isGameOver && !hasSavedLocally) {
      const history = JSON.parse(localStorage.getItem('personalScores') || '[]');
      history.push(gameState.score);
      localStorage.setItem('personalScores', JSON.stringify(history.slice(-20))); // Keep last 20
      setHasSavedLocally(true);
    }
  }, [gameState, hasSavedLocally]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && !submitted) {
      onSubmitScore(name.trim(), gameState.score);
      setSubmitted(true);
    }
  };

  const handleExit = () => {
    setSubmitted(false);
    setHasSavedLocally(false);
    setName('');
    onExit();
  };

  const handleRestart = () => {
    setSubmitted(false);
    setHasSavedLocally(false);
    setName('');
    onRestart();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 30, 0.9)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel animate-slide-up" style={{ padding: '48px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-red)', marginBottom: '16px' }}>Game Over</h2>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {gameState.gameOverReason}
        </p>

        <div style={{ margin: '32px 0' }}>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Final Score</div>
          <div style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--accent-jade)', lineHeight: 1 }}>
            {gameState.score}
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Save your score to the Leaderboard</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.1)', color: 'white'
                }}
                maxLength={15}
                required
              />
              <button type="submit" className="btn btn-success" style={{ padding: '8px 16px' }}>Submit</button>
            </div>
          </form>
        ) : (
          <div style={{ marginBottom: '32px', color: 'var(--accent-green)', fontWeight: 'bold' }}>
            Score Submitted!
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-outline" onClick={handleExit}>Return to Menu</button>
          <button className="btn btn-primary" onClick={handleRestart}>Play Again</button>
        </div>
      </div>
    </div>
  );
}
