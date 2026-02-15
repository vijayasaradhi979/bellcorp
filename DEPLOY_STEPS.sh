#!/bin/bash

# Deployment Steps - Copy and paste these commands one by one

echo "Step 1: Initialize Git (if not already done)"
echo "Run: git init"

echo ""
echo "Step 2: Add all files"
echo "Run: git add ."

echo ""
echo "Step 3: Commit files"
echo "Run: git commit -m 'Initial commit for deployment'"

echo ""
echo "Step 4: Add remote repository (replace with your GitHub repo URL)"
echo "Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"

echo ""
echo "Step 5: Push to GitHub"
echo "Run: git push -u origin main"

echo ""
echo "If you get an error about branch name, try:"
echo "git branch -M main"
echo "git push -u origin main"
