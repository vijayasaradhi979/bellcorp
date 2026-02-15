# Deployment Guide - Free Services

This guide will help you deploy your Expense Tracker application using free hosting services.

## Deployment Architecture

- **Frontend**: Vercel (React app)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas (Free tier)

---

## Step 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (choose FREE tier)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
5. Whitelist your IP:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for now) or add specific IPs
6. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend to Render

1. **Prepare your code:**
   - Make sure `server/package.json` has a "start" script
   - Your code is already set up correctly

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Deploy on Render:**
   - Go to [Render](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: expense-tracker-api (or any name)
     - **Environment**: Node
     - **Root Directory**: `server` (IMPORTANT: Set this to "server")
     - **Build Command**: `npm install` (leave empty or use this)
     - **Start Command**: `npm start`
   - Add Environment Variables:
     ```
     PORT=10000
     MONGODB_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=your-random-secret-key-here
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend.vercel.app
     ```
     (Replace `your-frontend.vercel.app` with your actual Vercel URL after deploying frontend)
   - Click "Create Web Service"
   - Wait for deployment (takes 2-3 minutes)
   - Copy your backend URL (e.g., `https://expense-tracker-api.onrender.com`)

**Note**: Render free tier spins down after 15 minutes of inactivity. First request may take 30-60 seconds.

---

## Step 3: Update Frontend for Production

1. **Update API base URL:**
   - Create `client/src/config.js`:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   export default API_BASE_URL;
   ```

2. **Update axios calls:**
   - In `client/src/context/AuthContext.js` and other files, replace `/api/` with `${API_BASE_URL}/api/`
   - Or better: Update axios default baseURL

Let me create the config file for you.

---

## Step 4: Deploy Frontend to Vercel

1. **Update axios configuration:**
   - We'll create a config file that uses environment variables

2. **Push updated code to GitHub**

3. **Deploy on Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `client`
     - **Build Command**: `npm run build` (type this without backticks)
     - **Output Directory**: `build`
   - Add Environment Variable:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

---

## Alternative: Deploy Frontend to Netlify

1. Go to [Netlify](https://www.netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Connect repository
5. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`
6. Add Environment Variable:
   - `REACT_APP_API_URL` = your Render backend URL
7. Click "Deploy site"

---

## Environment Variables Summary

### Backend (Render):
```
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense-tracker
JWT_SECRET=your-secret-key-min-32-characters
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel/Netlify):
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## Post-Deployment Checklist

- [ ] Test registration/login
- [ ] Test creating transactions
- [ ] Test editing/deleting transactions
- [ ] Test search and filters
- [ ] Check CORS settings (should work automatically with Render)
- [ ] Update CORS in backend if needed (Render URL should be allowed)

---

## Troubleshooting

### Backend Issues:
- **Slow first request**: Normal on Render free tier (cold start)
- **CORS errors**: Add your frontend URL to CORS in `server/index.js`
- **Database connection**: Check MongoDB Atlas IP whitelist

### Frontend Issues:
- **API calls failing**: Check `REACT_APP_API_URL` environment variable
- **Build errors**: Check Node version compatibility

### CORS:
CORS is already configured in `server/index.js` to use the `FRONTEND_URL` environment variable. Make sure to set it in Render after you deploy your frontend.

---

## Cost Summary

- **MongoDB Atlas**: Free (512MB storage)
- **Render**: Free (spins down after inactivity)
- **Vercel**: Free (unlimited for personal projects)
- **Total**: $0/month

---

## Quick Deploy Commands

```bash
# 1. Initialize git (if not done)
git init
git add .
git commit -m "Ready for deployment"

# 2. Push to GitHub
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main

# Then follow the web interface steps above
```

---

## Support

If you encounter issues:
1. Check Render logs (in dashboard)
2. Check Vercel/Netlify build logs
3. Check MongoDB Atlas connection status
4. Verify all environment variables are set correctly
