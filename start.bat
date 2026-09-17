@echo off
title IHG Enterprise Platform - One Click Launcher
color 0A
echo =====================================================================
echo   INTERNATIONAL HOSPITALITY GROUP (IHG) ENTERPRISE PLATFORM
echo   Hotel Operations, Fine Dining POS, KDS, and Food Delivery
echo =====================================================================
echo.
echo [1/3] Checking Node.js environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js (v18 or higher) from https://nodejs.org/
    pause
    exit /b 1
)

echo [2/3] Starting Backend Server (Port 5000) and Frontend Client (Port 3000)...
echo.
echo Application will open in your default browser at http://localhost:3000
echo.
echo Press Ctrl+C in this window anytime to stop the platform.
echo =====================================================================
echo.

start "" "http://localhost:3000"
npm start
pause
