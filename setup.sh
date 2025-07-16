#!/bin/bash

echo "🚀 Setting up E-commerce Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp env.example .env
    echo "⚠️  Please edit backend/.env with your database credentials and JWT secret"
fi

cd ..

# Create assets directory
echo "📁 Creating assets directory..."
mkdir -p frontend/assets

echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit backend/.env with your database credentials"
echo "2. Run: mysql -u root -p < database/setup.sql"
echo "3. Add product images to frontend/assets/"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Open frontend/index.html in your browser"
echo ""
echo "🎉 Happy coding!" 