@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "PORT=5000"
set "DATABASE_URL=file:./data/political-compass.db"

echo.
echo ========================================
echo   Ideologos - clearing port %PORT%
echo ========================================
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
  echo Stopping process on port %PORT% ^(PID %%a^)
  taskkill /F /PID %%a >nul 2>&1
)

timeout /t 1 /nobreak >nul

echo.
echo Starting development server...
echo Open http://localhost:%PORT%
echo Press Ctrl+C to stop.
echo.

call npm run dev

if errorlevel 1 (
  echo.
  echo Server exited with an error.
  pause
)

endlocal
