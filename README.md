[README.md](https://github.com/user-attachments/files/26490533/README.md)
# Mahjong Hand Betting Game

A modern, full-stack predictive betting web application based on the foundational mechanics of standard Mahjong sets. Test your ability to analyze discard piles, factor in dynamic power-scaling of special tiles, and predict whether your next drawn hand will be higher or lower than the current value.

## ⚡ Quick Start (Live Demo)
Play the live deployed application instantly by opening the following link:
https://mahjong-frontend.vercel.app/

---

## 🛠️ Technologies Used

### Frontend (Client-Side)
*   **Core:** React.js bootstrapped with **Vite** for rapid hot-module reloading and optimized static compilation.
*   **State Management:** Custom React Hooks (`useGame.js`) combined with natively integrated `useEffect` and `useState`.
*   **Styling:** Modern Vanilla **CSS3** utilizing deep variable abstraction, Flexbox, and Glassmorphism techniques.
*   **API Client:** Axios for robust Promise-based asynchronous HTTP requests.

### Backend (Server-Side)
*   **Core / Runtime:** Node.js powered by **Express.js** for lightweight routing and middleware integration.
*   **Security / Utility:** `cors` for cross-origin compliance with Vercel, and `uuid` for generating absolute unique tile tracking tags.
*   **Persistence:** In-memory tracking decoupled via Singleton patterns for ultra-fast, stateless scaling.

---

## 🏗️ Architectural Roadmap

To demonstrate the structural foundations of the application, the codebase is strictly separated into modular, scalable layers.

### 1. Controllers & Routes (Express API)
*   `POST /api/game/start`: Boots `deckManager` and resets global registry constraints.
*   `POST /api/game/bet`: Ingests threshold prediction (`higher`/`lower`), evaluates math via `gameLogic` against drawn arrays, and applies scaling modifiers.
*   `GET /api/auth/leaderboard`: Returns isolated memory arrays containing top overarching global scores.

### 2. Core Logic Modules (Node Engine)
*   `gameLogic.js`: The heart of the math engine. Validates bet vectors, resolves win conditions, and flags "Game Over" events via strict thresholds.
*   `registry.js`: A specialized Singleton "Template Mapping" ledger. Separates active tile values from their raw structural blueprints to allow global, universal power scaling.
*   `deck.js`: Manages standard 136-tile card counting, active arrays, and triggers the automated "Reshuffle Trap" upon deck depletion.

### 3. Custom React Hooks (Client)
*   `useGame.js`: Encapsulates all backend Axios network chatter via `useCallback`. Exposes clean interaction variables (`gameState`, `isLoading`, `error`) globally so the UI components can remain strictly presentational.

---

## 💻 Local Setup Instructions

This project is separated into a decoupled Frontend (React/Vite) and Backend (Node/Express) if you wish to run it locally.

### Backend Setup (The Engine)
1. Open a terminal and navigate to the backend directory.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Boot the Express server on port 5000:
   ```bash
   npm run dev
   ```
   *The backend will now actively manage the deck states and the dynamic tile registry at `http://localhost:5000`.*

### Frontend Setup (The Interface)
1. Open a separate terminal and navigate to the frontend directory.
2. Install the necessary React environment dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the provided `localhost` link in your browser to begin the game locally.

---

## 🤖 Development Disclosure (Hand-Written vs. AI Assisted)

To build a premium, full-scale gaming experience within the required timeframe, an AI Coding Assistant was utilized strictly as an accelerator for aesthetics and boilerplate workflows, allowing the core architectural logic to remain entirely handwritten and uniquely constructed.

### Hand-Written & Conceived (The Technical Core)
- **The Core Game Engine (`gameLogic.js`)**: All probability math, betting thresholds, and win/loss resolution rules were hand-designed to ensure strategic viability.
- **The Dynamic Registry (`registry.js`)**: The unique "Template vs Instance" scalable architecture that tracks dynamic values completely independent of the physical tiles was custom-built. 
- **The State Hooks (`useGame.js`)**: The frontend state management cycles to intercept and route Game Over conditions and the History API trackers.
- **Stats Integration (`StatsPage.jsx`)**: The data-piping mechanisms to connect LocalStorage arrays into external REST charting APIs.

### AI-Enhanced & Assisted (Aesthetics & Repetition)
- **Visual Design & CSS Overhaul (`index.css`)**: AI was heavily utilized to design the premium styling and aesthetic theme. The complex CSS gradient rules, the Jade Green/Charcoal casino palette, and the repetitive DOM structure to build the "Glassmorphism" UI were entirely AI generated.
- **Routing & Boilerplate (`gameRoutes.js` / `authRoutes.js`)**: Tedious, repetitive structural tasks like creating Express router paths, wiring up generic controller catches, and configuring standard HTTP compliance were accelerated using AI generation. 
- **HTML DOM Structuring**: The rote construction of HTML mapping and grid/flexbox layouts across the various React component files.
- **Code Comments**: Code has been run through AI to fix the existing comments and add more for clarity and code understanding.
