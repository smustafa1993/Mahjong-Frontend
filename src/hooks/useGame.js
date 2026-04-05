// src/hooks/useGame.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useGame() {
  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startGame = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/api/game/start`);
      if (res.data.success) {
        setGameState(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const placeBet = useCallback(async (betDirection) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/api/game/bet`, { bet: betDirection });
      if (res.data.success) {
        // Includes isWin, oldHandValue, newHandValue, gameState
        setGameState(res.data.data.gameState);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetGame = useCallback(() => {
    setGameState(null);
    setError(null);
  }, []);

  const submitScore = useCallback(async (name, score) => {
    try {
      await axios.post(`${API_BASE}/api/auth/submit`, { name, score });
    } catch (err) {
      console.error("Failed to submit score", err);
    }
  }, []);

  return {
    gameState,
    isLoading,
    error,
    startGame,
    placeBet,
    resetGame,
    submitScore,
  };
}
