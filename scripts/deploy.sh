#!/bin/bash

# ResumeShala Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚀 ResumeShala Deployment Script"
echo "================================"

# Check if environment is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/deploy.sh [local|docker|vercel|production]"
    exit 1
fi

ENVIRONMENT=$1

case $ENVIRONMENT in
    "local")
        echo "📦 Setting up local development environment..."
        
        # Check if .env.local exists
        if [ ! -f ".env.local" ]; then
            echo "⚠️  .env.local not found. Creating from example..."
            cp .env.example .env.local
            echo "✅ Please update .env.local with your actual values"
        fi
        
        # Install dependencies
        echo "📥 Installing dependencies..."
        npm install
        
        # Check MongoDB connection
        echo "🔍 Checking MongoDB connection..."
        # Add MongoDB connection check here
        
        # Seed templates (optional)
        read -p "Do you want to seed sample templates? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "🌱 Seeding templates..."
            npm run seed:templates
        fi
        
        # Start development server
        echo "🏃 Starting development server..."
        npm run dev
        ;;
        
    "docker")
        echo "🐳 Building and running Docker container..."
        
        # Build Docker image
        echo "🔨 Building Docker image..."
        docker build -t resume-shala .
        
        # Run container
        echo "🏃 Starting Docker container..."
        docker run -p 3000:3000 --env-file .env.local resume-shala
        ;;
        
    "vercel")
        echo "▲ Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "📥 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        # Build application
        echo "🔨 Building application..."
        npm run build
        
        # Deploy to Vercel
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        ;;
        
    "production")
        echo "🏭 Production deployment..."
        
        # Install production dependencies
        echo "📥 Installing production dependencies..."
        npm ci --only=production
        
        # Build application
        echo "🔨 Building application..."
        npm run build
        
        # Start production server
        echo "🏃 Starting production server..."
        npm start
        ;;
        
    *)
        echo "❌ Unknown environment: $ENVIRONMENT"
        echo "Available environments: local, docker, vercel, production"
        exit 1
        ;;
esac

echo "✅ Deployment completed successfully!"
