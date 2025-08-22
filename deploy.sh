#!/bin/bash

# GitHub Pages Deployment Script for D3 Training App
# Make sure to update the repository URL with your GitHub username

echo "🚀 Starting GitHub Pages deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - D3 Training App with authentication"
    
    echo "🔗 Please set your GitHub repository URL:"
    echo "git remote add origin https://github.com/YOURUSERNAME/d3-training-session-app.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
    echo "Then run this script again!"
    exit 1
fi

# Build and deploy
echo "🔨 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📤 Deploying to GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🌐 Your app should be available at: https://YOURUSERNAME.github.io/d3-training-session-app"
        echo "⏱️  It may take a few minutes for changes to appear."
    else
        echo "❌ Deployment failed. Check the error messages above."
    fi
else
    echo "❌ Build failed. Please fix the errors and try again."
fi
