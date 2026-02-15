# Bellcorp Personal Expense Tracker

A secure, scalable web application for managing daily finances. Users can securely log in, record transactions, and explore their financial history using advanced search and filtering tools.

## Features

- User authentication with email/password and JWT tokens
- Full transaction management (add, edit, delete, view)
- Dashboard with expense summaries and category breakdowns
- Transaction explorer with search, filters, and pagination
- Responsive dark theme UI

## Tech Stack

- Frontend: React.js with React Router
- Backend: Node.js/Express
- Database: MongoDB with Mongoose
- Authentication: JWT tokens

## Project Structure

```
bellcorp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── auth/      # Login/Register components
│   │   │   ├── dashboard/ # Dashboard components
│   │   │   └── explorer/  # Transaction list items
│   │   ├── context/       # AuthContext
│   │   ├── pages/         # Full page views
│   │   ├── styles/        # CSS files
│   │   └── utils/         # Helper functions
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── package.json
└── package.json          # Root package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install all dependencies**:
   ```bash
   npm run install-all
   ```

2. **Setup environment variables**:
   - Copy `server/.env.example` to `server/.env`
   - Update the values in `server/.env`:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/expense-tracker
     JWT_SECRET=your-secret-key-change-this-in-production
     NODE_ENV=development
     ```

3. **Start MongoDB** (if using local MongoDB):
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas and update the `MONGODB_URI` in `.env`

4. **Run the application**:
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 5000) and frontend (port 3000).

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

5. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`
   - Register a new account or login with existing credentials

## API Endpoints

**Authentication:**
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login

**Transactions:**
- GET /api/transactions - Get transactions (paginated)
- GET /api/transactions/:id - Get single transaction
- POST /api/transactions - Create transaction
- PUT /api/transactions/:id - Update transaction
- DELETE /api/transactions/:id - Delete transaction
- GET /api/transactions/stats/summary - Get summary stats

## Transaction Schema

```javascript
{
  id: "unique_id",
  userId: "user_id",
  title: "Transaction Title",
  amount: 54.20,
  category: "Food",
  date: "2023-10-25",
  notes: "Optional notes"
}
```

## Categories

- Food
- Rent
- Transport
- Entertainment
- Utilities
- Shopping
- Healthcare
- Education
- Other

## Features

- Protected routes require authentication
- Dashboard shows total expenses and category breakdowns
- Transaction explorer with search, filters, and infinite scroll
- Full CRUD operations for transactions

## Development

### Adding New Features

1. **Backend**: Add routes in `server/routes/`
2. **Frontend**: Add components in `client/src/components/`
3. **Styling**: Add CSS in `client/src/styles/`

### Database

The application uses MongoDB. Make sure MongoDB is running before starting the server.

## Deployment

### Backend Deployment
- Deploy to services like Heroku, Railway, or Render
- Set environment variables in your hosting platform
- Update CORS settings if needed

### Frontend Deployment
- Build the React app: `cd client && npm run build`
- Deploy to Vercel, Netlify, or Firebase Hosting
- Update API endpoints to point to your deployed backend

## License

ISC

## Notes

- Ensure MongoDB is running before starting the server
- Change JWT_SECRET in production
- Use environment variables for sensitive data
- The app uses JWT tokens stored in localStorage for authentication
