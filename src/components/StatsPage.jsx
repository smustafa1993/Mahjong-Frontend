// src/components/StatsPage.jsx
import React, { useEffect, useState } from 'react';

export default function StatsPage({ onBack }) {
  const [chartUrl, setChartUrl] = useState('');
  const [personalScores, setPersonalScores] = useState([]);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('personalScores') || '[]');
    setPersonalScores(scores);

    if (scores.length > 0) {
      // Configuration for QuickChart API (Chart.js syntax)
      const chartConfig = {
        type: 'line',
        data: {
          labels: scores.map((_, i) => `Game ${i + 1}`),
          datasets: [{
            label: 'Net Score Progression',
            data: scores,
            borderColor: '#10b981', // Jade Green
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderWidth: 3,
            fill: true,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#10b981',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#f8fafc',
                font: { size: 14, family: "'Outfit', sans-serif" }
              }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(255,255,255,0.05)' },
              ticks: { color: '#94a3b8', font: { size: 12 } }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8', font: { size: 12 } }
            }
          }
        }
      };

      // URL encode the config block
      const encodedConfig = encodeURIComponent(JSON.stringify(chartConfig));
      // QuickChart base URL - requesting a dark background explicitly
      setChartUrl(`https://quickchart.io/chart?w=600&h=350&bkg=transparent&c=${encodedConfig}`);
    }
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }} className="animate-slide-up">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          ← Back to Lobby
        </button>
        <h2 style={{ flex: 1, fontSize: '2.5rem', color: 'var(--text-primary)', margin: 0, paddingRight: '100px' }}>
          Personal Stats
        </h2>
      </div>

      <div className="glass-panel" style={{ padding: '40px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {personalScores.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            No games played yet. Hit the tables!
          </div>
        ) : (
          <>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
              Your Performance Graph
            </h3>
            {chartUrl && (
              <img 
                src={chartUrl} 
                alt="Scores Graph" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }} 
              />
            )}
            <div style={{ marginTop: '24px', display: 'flex', gap: '32px', color: 'var(--text-secondary)' }}>
               <div>Games Played: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{personalScores.length}</span></div>
               <div>Best Score: <span style={{ color: 'var(--accent-jade)', fontWeight: 'bold' }}>{Math.max(...personalScores)}</span></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
