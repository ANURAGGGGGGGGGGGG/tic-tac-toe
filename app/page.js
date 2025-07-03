'use client'

import React, { useState, useEffect } from "react";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Symbol, setPlayer1Symbol] = useState('X');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const winnerInfo = calculateWinner(board);
    if (winnerInfo) {
      setWinner(winnerInfo.winner);
      setWinningSquares(winnerInfo.line);
      setIsDraw(false);
      setScore(prev => ({
        ...prev,
        [winnerInfo.winner]: prev[winnerInfo.winner] + 1,
      }));
    } else if (board.every(cell => cell !== null)) {
      setIsDraw(true);
      setWinner(null);
      setWinningSquares([]);
    } else {
      setWinner(null);
      setWinningSquares([]);
      setIsDraw(false);
    }
  }, [board]);

  function startGame() {
    if (player1Name.trim() && player2Name.trim()) {
      setAnimating(true);
      setTimeout(() => {
        setGameStarted(true);
        setBoard(Array(9).fill(null));
        setWinner(null);
        setWinningSquares([]);
        setIsDraw(false);
        setXIsNext(true);
        setAnimating(false);
      }, 800);
    }
  }

  function resetToSetup() {
    setAnimating(true);
    setTimeout(() => {
      setGameStarted(false);
      setPlayer1Name('');
      setPlayer2Name('');
      setPlayer1Symbol('X');
      setBoard(Array(9).fill(null));
      setWinner(null);
      setWinningSquares([]);
      setIsDraw(false);
      setXIsNext(true);
      setScore({ X: 0, O: 0 });
      setAnimating(false);
    }, 800);
  }

  function calculateWinner(squares) {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  function handleClick(index) {
    if (board[index] || winner || animating) return;
    
    setAnimating(true);
    setTimeout(() => {
      const newBoard = [...board];
      newBoard[index] = xIsNext ? "X" : "O";
      setBoard(newBoard);
      setXIsNext(!xIsNext);
      setAnimating(false);
    }, 300);
  }

  function getCurrentPlayer() {
    return xIsNext ? 
      { name: player1Name, symbol: player1Symbol } : 
      { name: player2Name, symbol: player1Symbol === 'X' ? 'O' : 'X' };
  }

  function getWinnerInfo() {
    return winner ? 
      { name: winner === player1Symbol ? player1Name : player2Name, symbol: winner } : 
      null;
  }

  function restartGame() {
    setAnimating(true);
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setWinner(null);
      setWinningSquares([]);
      setIsDraw(false);
      setXIsNext(true);
      setAnimating(false);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex flex-col items-center justify-center p-4">
      {/* Game Container */}
      <div className={`w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Tic Tac Toe</h1>
          <p className="text-purple-200 mt-2">Classic game with a modern twist</p>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          {!gameStarted ? (
            <PlayerSetup 
              player1Name={player1Name}
              setPlayer1Name={setPlayer1Name}
              player2Name={player2Name}
              setPlayer2Name={setPlayer2Name}
              player1Symbol={player1Symbol}
              setPlayer1Symbol={setPlayer1Symbol}
              startGame={startGame}
            />
          ) : (
            <GameBoard 
              board={board}
              winner={winner}
              winningSquares={winningSquares}
              isDraw={isDraw}
              player1Name={player1Name}
              player2Name={player2Name}
              player1Symbol={player1Symbol}
              handleClick={handleClick}
              restartGame={restartGame}
              resetToSetup={resetToSetup}
              getCurrentPlayer={getCurrentPlayer}
              getWinnerInfo={getWinnerInfo}
              score={score}
            />
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-purple-200 text-sm">
        <p>Created with ❤️ using React | Classic Tic Tac Toe</p>
      </div>
    </div>
  );
}

function PlayerSetup({ 
  player1Name, 
  setPlayer1Name, 
  player2Name, 
  setPlayer2Name, 
  player1Symbol, 
  setPlayer1Symbol,
  startGame
}) {
  const player2Symbol = player1Symbol === 'X' ? 'O' : 'X';
  
  return (
    <div className="animate-fadeIn">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Player Setup</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player 1 Card */}
          <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-5 rounded-xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-purple-200">Player 1</h3>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${player1Symbol === 'X' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                {player1Symbol}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Name:
              </label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full px-4 py-2 bg-purple-900/50 text-white rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Symbol:
              </label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setPlayer1Symbol('X')}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${
                    player1Symbol === 'X' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
                  }`}
                >
                  X
                </button>
                <button 
                  onClick={() => setPlayer1Symbol('O')}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${
                    player1Symbol === 'O' 
                      ? 'bg-yellow-500 text-gray-900' 
                      : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
                  }`}
                >
                  O
                </button>
              </div>
            </div>
          </div>
          
          {/* Player 2 Card */}
          <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-5 rounded-xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-purple-200">Player 2</h3>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${player2Symbol === 'X' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                {player2Symbol}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Name:
              </label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="w-full px-4 py-2 bg-purple-900/50 text-white rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Symbol:
              </label>
              <div className="flex gap-4">
                <button 
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
                    player2Symbol === 'X' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-purple-800/50 text-purple-300'
                  }`}
                >
                  X
                </button>
                <button 
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
                    player2Symbol === 'O' 
                      ? 'bg-yellow-500 text-gray-900' 
                      : 'bg-purple-800/50 text-purple-300'
                  }`}
                >
                  O
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Start Button */}
      <button
        onClick={startGame}
        disabled={!player1Name.trim() || !player2Name.trim()}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
      >
        Start Game
      </button>
    </div>
  );
}

function GameBoard({
  board,
  winner,
  winningSquares,
  isDraw,
  player1Name,
  player2Name,
  player1Symbol,
  handleClick,
  restartGame,
  resetToSetup,
  getCurrentPlayer,
  getWinnerInfo,
  score
}) {
  const currentPlayer = getCurrentPlayer();
  const winnerInfo = getWinnerInfo();
  const player2Symbol = player1Symbol === 'X' ? 'O' : 'X';
  
  return (
    <div className="animate-fadeIn">
      {/* Players Info */}
    <div className="flex justify-between mb-6">
  <div className={`p-3 rounded-lg flex-1 mr-2 transition-all ${
    currentPlayer.symbol === player1Symbol 
      ? 'bg-purple-700/50 border-2 border-purple-500' 
      : 'bg-gray-800/50'
  }`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold mr-3">
          {player1Symbol}
        </div>
        <div>
          <p className="text-sm text-purple-300">Player 1</p>
          <p className="font-bold text-white">{player1Name}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xl font-bold text-white">{score[player1Symbol]}</span>
      </div>
    </div>
  </div>
  
  <div className="text-white flex items-center justify-center px-4">
    <span className="text-2xl font-bold">VS</span>
  </div>
  
  <div className={`p-3 rounded-lg flex-1 ml-2 transition-all ${
    currentPlayer.symbol === player2Symbol 
      ? 'bg-purple-700/50 border-2 border-purple-500' 
      : 'bg-gray-800/50'
  }`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-lg font-bold mr-3">
          {player2Symbol}
        </div>
        <div>
          <p className="text-sm text-purple-300">Player 2</p>
          <p className="font-bold text-white">{player2Name}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xl font-bold text-white">{score[player2Symbol]}</span>
      </div>
    </div>
  </div>
</div>
      
      {/* Game Status */}
      <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 p-4 rounded-xl mb-6 text-center border border-purple-500/30">
        {winner ? (
          <div className="animate-bounce">
            <div className="text-2xl font-bold text-green-400 flex items-center justify-center">
              <span className="mr-2">🎉</span>
              {winnerInfo.name} wins!
              <span className="ml-2">🎉</span>
            </div>
            <p className="text-purple-200 mt-1">with symbol '{winnerInfo.symbol}'</p>
          </div>
        ) : isDraw ? (
          <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center">
            <span className="mr-2">🤝</span>
            It's a draw!
            <span className="ml-2">🤝</span>
          </div>
        ) : (
          <div>
            <p className="text-purple-200">Current Turn</p>
            <div className="flex items-center justify-center mt-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mr-3 ${
                currentPlayer.symbol === 'X' ? 'bg-blue-500' : 'bg-yellow-500'
              }`}>
                {currentPlayer.symbol}
              </div>
              <h2 className="text-2xl font-bold text-white">{currentPlayer.name}</h2>
            </div>
          </div>
        )}
      </div>
      
      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 mb-8 bg-gradient-to-br from-purple-700/30 to-indigo-700/30 p-4 rounded-xl border border-purple-500/30">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={cell || winner || isDraw}
            className={`aspect-square flex items-center justify-center text-5xl font-bold rounded-xl transition-all duration-300 transform hover:scale-95 ${
              winningSquares.includes(index)
                ? 'bg-gradient-to-br from-green-500/80 to-emerald-500/80 animate-pulse'
                : 'bg-gray-800/50 hover:bg-purple-700/50'
            } ${cell === 'X' ? 'text-blue-400' : 'text-yellow-400'}`}
          >
            {cell}
          </button>
        ))}
      </div>
      
      {/* Game Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={restartGame}
          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md"
        >
          New Round
        </button>
        <button
          onClick={resetToSetup}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md"
        >
          New Players
        </button>
      </div>
    </div>
  );
}