#!/usr/bin/env bash
set -e

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║   PHISHING SIMULATOR - SETUP SCRIPT       ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# ---- Backend ----
echo "[1/2] Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "  .env created. Add your GOOGLE_API_KEY to backend/.env"
else
  echo "  .env already exists."
fi

npm install
echo "  Backend dependencies installed."
cd ..

# ---- Frontend ----
echo ""
echo "[2/2] Setting up frontend..."
cd frontend
npm install
echo "  Frontend dependencies installed."
cd ..

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║           SETUP COMPLETE!                  ║"
echo "╠════════════════════════════════════════════╣"
echo "║                                            ║"
echo "║  BEFORE RUNNING:                           ║"
echo "║  1. Edit backend/.env                      ║"
echo "║  2. Set GOOGLE_API_KEY=your_key_here       ║"
echo "║  3. Set GEMINI_MODEL=gemini-2.0-flash-exp  ║"
echo "║                                            ║"
echo "║  TO RUN:                                   ║"
echo "║  Terminal 1: cd backend && npm run dev     ║"
echo "║  Terminal 2: cd frontend && npm run dev    ║"
echo "║                                            ║"
echo "║  Open: http://localhost:5173               ║"
echo "╚════════════════════════════════════════════╝"
echo ""
