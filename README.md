# Tic Tac Toe Game

A modern and interactive Tic Tac Toe game built with React and Tailwind CSS.

## Features

- **Player Customization**: Enter player names and choose symbols (X or O)
- **Score Tracking**: Win counter for both players
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animations**: Smooth transitions and winning animations
- **Win Highlighting**: Winning combinations are highlighted
- **Draw Detection**: Automatically detects tied games

## Technologies Used

- React (with hooks)
- Tailwind CSS
- HTML5
- CSS3

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/tic-tac-toe.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:3000`

## How to Play

1. Enter player names and choose symbols
2. Click "Start Game"
3. Players take turns clicking on the grid
4. First player to get 3 in a row wins!
5. Use "New Round" to restart or "New Players" to reset

## Project Structure

```
src/
  ├── app/               # Main application component
  ├── components/        # Reusable components
  │   ├── GameBoard.js   # Game board component
  │   └── PlayerSetup.js # Player setup component
  └── utils/             # Utility functions
```