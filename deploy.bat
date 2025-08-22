@echo off
REM GitHub Pages Deployment Script for D3 Training App
REM Make sure to update the repository URL with your GitHub username

echo 🚀 Starting GitHub Pages deployment...

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - D3 Training App with authentication"
    
    echo 🔗 Please set your GitHub repository URL:
    echo git remote add origin https://github.com/YOURUSERNAME/d3-training-session-app.git
    echo git branch -M main
    echo git push -u origin main
    echo.
    echo Then run this script again!
    pause
    exit /b 1
)

REM Build and deploy
echo 🔨 Building the application...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📤 Deploying to GitHub Pages...
    call npm run deploy
    
    if %errorlevel% equ 0 (
        echo 🎉 Deployment successful!
        echo 🌐 Your app should be available at: https://YOURUSERNAME.github.io/d3-training-session-app
        echo ⏱️  It may take a few minutes for changes to appear.
    ) else (
        echo ❌ Deployment failed. Check the error messages above.
    )
) else (
    echo ❌ Build failed. Please fix the errors and try again.
)

pause
