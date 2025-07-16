# E-commerce Application

A Flipkart-inspired e-commerce application built with Node.js, Express, MySQL, and vanilla JavaScript.

## Project Structure

```
ecommerce/
├── backend/                 # Backend API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Authentication middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── app.js             # Main server file
│   └── package.json       # Backend dependencies
├── frontend/              # Frontend application
│   ├── assets/           # Product images and static files
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── products.html     # Products page
│   └── cart.html         # Shopping cart page
├── database/             # Database setup files
│   └── setup.sql         # Database schema and sample data
└── package.json          # Root package.json
```

## Features

- **User Authentication**: Register, login, and role-based access
- **Product Management**: Browse, search, and manage products
- **Shopping Cart**: Add, update, and remove items
- **Order Management**: Create and track orders
- **Admin Panel**: Product management for administrators
- **Responsive Design**: Mobile-friendly interface

## Issues Fixed

### 1. Password Security
- **Issue**: Passwords were being stored as plain text or hardcoded hashed passwords
- **Fix**: Implemented proper password hashing using bcryptjs with salt rounds
- **Files Modified**: 
  - `backend/modules/user.js` - Added password hashing in create method
  - `backend/modules/user.js` - Added password comparison method
  - `database/setup.sql` - Removed hardcoded hashed password

### 2. Missing User Model
- **Issue**: `authController.js` was trying to import a non-existent user model
- **Fix**: Created proper User model with database operations
- **Files Modified**:
  - `backend/models/user.js` - Created User model with password hashing
  - `backend/controllers/authController.js` - Fixed import path

### 3. Database Schema Inconsistencies
- **Issue**: Mismatch between database schema and application code
- **Fix**: Updated schema to match application requirements
- **Files Modified**:
  - `database/setup.sql` - Fixed cart table structure
  - `backend/modules/product.js` - Updated field names
  - `backend/modules/order.js` - Fixed column names
  - `backend/controllers/productController.js` - Updated parameter names

### 4. Import Path Issues
- **Issue**: Inconsistent module import paths
- **Fix**: Standardized all imports to use `../modules/` path
- **Files Modified**:
  - `backend/controllers/authController.js`
  - `backend/controllers/productController.js`
  - `backend/controllers/cartController.js`
  - `backend/controllers/orderController.js`
  - `backend/middlewares/auth.js`

### 5. Missing Environment Configuration
- **Issue**: No environment variable setup for JWT secrets
- **Fix**: Created environment example file
- **Files Created**:
  - `backend/env.example` - Environment variables template

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

3. **Set up database**:
   ```bash
   mysql -u root -p < ../database/setup.sql
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Add product images**:
   - Download product images and place them in `frontend/assets/`
   - Required images: `smartphone.jpg`, `laptop.jpg`, `headphones.jpg`, `smartwatch.jpg`, `speaker.jpg`

2. **Open in browser**:
   - Navigate to `frontend/index.html`
   - Or serve with a local server: `python -m http.server 8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

## Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Admin and customer roles
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries

## Deployment

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with Node.js buildpack

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Update connection string in environment variables
3. Update database configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 