@echo off
echo.
echo ╔════════════════════════════════════════════╗
echo ║   PHISHING SIMULATOR - SETUP SCRIPT       ║
echo ╚════════════════════════════════════════════╝
echo.

REM ---- Backend Setup ----
echo [1/4] Setting up backend...
cd backend
if not exist ".env" (
    copy .env.example .env
    echo  .env file created from template.
    echo  ^> IMPORTANT: Add your GOOGLE_API_KEY to backend/.env
) else (
    echo  .env already exists, skipping.
)
call npm install
if %errorlevel% neq 0 (
    echo  ERROR: Backend npm install failed.
    exit /b 1
)
echo  Backend dependencies installed.
cd ..

REM ---- Frontend Setup ----
echo.
echo [2/4] Setting up frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo  ERROR: Frontend npm install failed.
    exit /b 1
)
echo  Frontend dependencies installed.
cd ..

echo.
echo ╔════════════════════════════════════════════╗
echo ║           SETUP COMPLETE!                  ║
echo ╠════════════════════════════════════════════╣
echo ║                                            ║
echo ║  BEFORE RUNNING:                           ║
echo ║  1. Edit backend/.env                      ║
echo ║  2. Set GOOGLE_API_KEY=your_key_here       ║
echo ║  3. Set GEMINI_MODEL=gemini-2.0-flash-exp  ║
echo ║                                            ║
echo ║  TO RUN:                                   ║
echo ║  Terminal 1: cd backend && npm run dev     ║
echo ║  Terminal 2: cd frontend && npm run dev    ║
echo ║                                            ║
echo ║  Open: http://localhost:5173               ║
echo ╚════════════════════════════════════════════╝
echo.
pause
