@echo off
echo ============================================
echo    Compliance Analysis Tool - Quick Share
echo ============================================
echo.

REM Check if ngrok is installed
where ngrok >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] ngrok is not installed.
    echo.
    echo Please install ngrok first:
    echo   npm install -g ngrok
    echo.
    echo Or visit: https://ngrok.com/download
    pause
    exit /b 1
)

echo [+] Starting local server...
start /b node server.js

REM Wait for server to start
timeout /t 2 /nobreak >nul

echo.
echo [+] Creating public tunnel...
echo.
ngrok http 3000

echo.
echo [+] Stopping server...
taskkill /F /IM node.exe >nul 2>nul
echo [+] Server stopped.
pause
