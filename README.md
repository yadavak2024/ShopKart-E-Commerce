# E-Commerce Web Application

Full-stack e-commerce project using:
- React.js (Vite)
- Node.js
- Express.js
- MongoDB + Mongoose
- REST API

## Features
- Product listing
- Search and category filtering
- Add/remove products from cart
- Quantity controls
- Checkout form
- Order creation through REST API
- MongoDB product and order models
- Responsive UI

## Run locally

### 1. Backend
```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Set `MONGO_URI` in `.env`.

### 2. Frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

If MongoDB is not running locally, use a MongoDB Atlas connection string.
