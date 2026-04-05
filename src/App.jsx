// src/App.jsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';
import StatsPage from './components/StatsPage.jsx';
import { useGame } from './hooks/useGame.js';

function App() {
  const { gameState, isLoading, error, startGame, placeBet, resetGame, submitScore } = useGame();
  
  // Custom router state
  const [currentView, setCurrentView] = useState('LOBBY');

  const handleStartGame = () => {
    setCurrentView('GAME');
    startGame();
  };

  const handleExitGame = () => {
    setCurrentView('LOBBY');
    resetGame();
  };

  const handleOpenStats = () => {
    setCurrentView('STATS');
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--accent-crimson)' }}>
        <h2>Error connecting to Game Server</h2>
        <p>{error}</p>
        <button className="btn btn-outline" onClick={handleExitGame} style={{ marginTop: '16px' }}>Retry</button>
      </div>
    );
  }

  // Effect-like intercept: if game over triggers without pressing exit, the view is still GAME but GameOver overlay handles it.
  return (
    <>
      {currentView === 'LOBBY' && (
        <LandingPage 
          onStartGame={handleStartGame} 
          onViewStats={handleOpenStats}
          isLoading={isLoading} 
        />
      )}
      
      {currentView === 'STATS' && (
        <StatsPage onBack={() => setCurrentView('LOBBY')} />
      )}

      {currentView === 'GAME' && gameState && (
        <GameBoard 
          gameState={gameState} 
          onBet={placeBet} 
          onExit={handleExitGame}
        />
      )}

      {/* GameOver overlay pops over GAME view naturally */}
      <GameOver 
        gameState={gameState} 
        onRestart={handleStartGame}
        onExit={handleExitGame}
        onSubmitScore={submitScore}
      />
    </>
  );
}

export default App;
