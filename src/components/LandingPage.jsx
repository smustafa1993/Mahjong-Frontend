// src/components/LandingPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LandingPage({ onStartGame, onViewStats, isLoading }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Note: this is a mock endpoint backed by memory
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${API_BASE}/api/auth/leaderboard`)
      .then(res => {
        if (res.data.success) setLeaderboard(res.data.data);
      })
      .catch(err => console.error("Could not fetch leaderboard", err));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }} className="animate-slide-up">
      <div style={{ marginBottom: '64px' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '800', 
          marginBottom: '16px',
          background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Mahjong Betting
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          Evaluate the dynamic scaling of your tile registry and predict the value of the next draw.
        </p>
      </div>

      <div style={{ marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <button 
          className="btn btn-primary" 
          style={{ fontSize: '1.25rem', padding: '20px 64px', minWidth: '240px' }}
          onClick={onStartGame}
          disabled={isLoading}
        >
          {isLoading ? 'Shuffling Deck...' : 'ENTER TABLE'}
        </button>
        <button 
          className="btn btn-outline" 
          style={{ fontSize: '1rem', padding: '12px 48px', minWidth: '240px' }}
          onClick={onViewStats}
        >
          VIEW MY STATS
        </button>
      </div>

      {leaderboard.length > 0 && (
        <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto', padding: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>Top Winners</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaderboard.map((player, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '16px 24px', 
                  background: index === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                  border: index === 0 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  color: index === 0 ? 'var(--accent-jade)' : 'var(--text-primary)'
                }}
              >
                <div style={{ fontWeight: index === 0 ? '800' : '600' }}>
                  <span style={{ opacity: 0.5, marginRight: '16px' }}>0{index + 1}</span>
                  {player.name}
                </div>
                <div style={{ fontWeight: '800' }}>{player.score}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
