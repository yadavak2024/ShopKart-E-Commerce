# 🛒 ShopKart – E-Commerce Web Application

A full-stack e-commerce web application built with **React.js, Node.js, Express.js, MongoDB, and REST APIs**.

## 🚀 Live Demo

**Frontend:** https://shop-kart-e-commerce-one.vercel.app

**Backend API:** https://shopkart-e-commerce-fi3e.onrender.com

> The backend is hosted on Render and the React frontend is deployed on Vercel.

## ✨ Features

- 🛍️ Product listing from MongoDB
- 🔎 Product search
- 🗂️ Category filtering
- 🛒 Add and remove products from cart
- ➕➖ Cart quantity controls
- 💳 Checkout form
- 📦 Order creation through REST API
- 🗄️ MongoDB product and order models using Mongoose
- 📱 Responsive user interface
- ⚡ React + Vite frontend

## 🧰 Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- CSS

### Backend
- Node.js
- Express.js
- REST API
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Vercel – Frontend
- Render – Backend

## 📁 Project Structure

```text
ShopKart-E-Commerce/
├── client/                 # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
```

### Orders

```text
POST   /api/orders
```

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/yadavak2024/ShopKart-E-Commerce.git
cd ShopKart-E-Commerce
```

### 2. Start the backend

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Add your MongoDB connection string to `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Backend will run at:

```text
http://localhost:5000
```

### 3. Start the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

For local development, set the frontend API URL in `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Frontend will run at:

```text
http://localhost:5173
```

## 🌱 Seed Products

To add sample products to MongoDB:

```bash
cd server
node seed.js
```

## 🔐 Environment Variables

Never commit real credentials or secrets to GitHub.

Example variables:

```env
# server/.env
MONGO_URI=your_mongodb_connection_string
PORT=5000

# client/.env
VITE_API_URL=http://localhost:5000/api
```

## 📌 Deployment

The project is configured as a separate frontend and backend deployment:

- **Frontend:** Vercel (`client` directory)
- **Backend:** Render (`server` directory)
- **Database:** MongoDB Atlas

The production frontend uses the `VITE_API_URL` environment variable to communicate with the deployed REST API.

## 👨‍💻 Author

**Aman Yadav**

GitHub: https://github.com/yadavak2024

---

⭐ If you find this project useful, consider giving the repository a star!
