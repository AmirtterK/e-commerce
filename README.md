# Handla - E-commerce Platform

A modern e-commerce application with secure authentication and shopping cart functionality.

## ✨ Features

- User authentication (Email/Password + Google OAuth)
- Product browsing with ratings and reviews
- Shopping cart management
- Order summary and checkout
- Responsive design

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Clerk** - Authentication
- **MongoDB Atlas** - Database

## 🚀 Setup

1. **Environment variables** (`.env.local`)
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   MONGODB_URI=mongodb+srv://...
   ```

2. **Configure Clerk**
   - Create app at [dashboard.clerk.com](https://dashboard.clerk.com)
   - Enable Email/Password and Google OAuth
   - Add `http://localhost:3000` to allowed origins

3. **Configure MongoDB Atlas**
   - Create cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
   - Get connection string
   - Whitelist IP address
