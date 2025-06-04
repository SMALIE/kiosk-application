#!/bin/bash

# Kiosk Application Setup Script
# This script helps you set up the development environment

echo "🚀 Setting up Kiosk Application..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

echo "✅ Docker detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm run install:all

# Copy environment files
echo ""
echo "⚙️  Setting up environment files..."

if [ ! -f "client/.env" ]; then
    cp client/.env.example client/.env
    echo "✅ Created client/.env from example"
else
    echo "⚠️  client/.env already exists, skipping..."
fi

if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    echo "✅ Created server/.env from example"
else
    echo "⚠️  server/.env already exists, skipping..."
fi

# Start Docker database
echo ""
echo "🐳 Starting PostgreSQL database..."
npm run docker:up

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in client/.env and server/.env"
echo "2. Run 'npm run dev' to start both client and server"
echo "3. Visit http://localhost:1337/admin to set up Strapi admin"
echo ""
echo "For more information, check the README.md file."
