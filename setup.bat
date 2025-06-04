@echo off
REM Kiosk Application Setup Script for Windows
REM This script helps you set up the development environment

echo 🚀 Setting up Kiosk Application...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ and try again.
    exit /b 1
)

echo ✅ Node.js detected
for /f "tokens=1 delims=v" %%i in ('node --version') do set NODE_VERSION=%%i

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker and try again.
    exit /b 1
)

echo ✅ Docker detected

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm run install:all

REM Copy environment files
echo.
echo ⚙️  Setting up environment files...

if not exist "client\.env" (
    copy "client\.env.example" "client\.env"
    echo ✅ Created client/.env from example
) else (
    echo ⚠️  client/.env already exists, skipping...
)

if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
    echo ✅ Created server/.env from example
) else (
    echo ⚠️  server/.env already exists, skipping...
)

REM Start Docker database
echo.
echo 🐳 Starting PostgreSQL database...
call npm run docker:up

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update environment variables in client/.env and server/.env
echo 2. Run 'npm run dev' to start both client and server
echo 3. Visit http://localhost:1337/admin to set up Strapi admin
echo.
echo For more information, check the README.md file.

pause
