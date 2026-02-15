# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm run install-all
```

This will install dependencies for the root, server, and client.

## Step 2: Setup Environment Variables

Create a file `server/.env` with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

**Important**: 
- If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
- Change `JWT_SECRET` to a strong random string in production

## Step 3: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start it manually:
mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud) - no local installation needed!

## Step 4: Run the Application

```bash
npm run dev
```

This starts both the backend (port 5000) and frontend (port 3000).

## Step 5: Access the Application

Open your browser and go to: `http://localhost:3000`

1. Click "Register" to create a new account
2. Login with your credentials
3. Start adding transactions!

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `server/.env`
- For local MongoDB, ensure it's running on port 27017

### Port Already in Use
- Backend uses port 5000 - change it in `server/.env` if needed
- Frontend uses port 3000 - React will prompt to use another port if 3000 is taken

### Module Not Found Errors
- Run `npm run install-all` again
- Make sure you're in the project root directory

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check the API endpoints in the README
- Customize the categories in `server/models/Transaction.js`
