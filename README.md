# GymLoop - Modern Gym Management System

A full-stack gym management system built with Next.js, MongoDB, and TailwindCSS. Features include member management, gym check-ins, credit system, and admin dashboard.

## 🚀 Features

-   **Authentication & Authorization**

    -   Secure login system with NextAuth.js
    -   Role-based access control (Admin, Staff, Members)
    -   Protected routes and API endpoints

-   **Member Management**

    -   Member profiles and registration
    -   Credit-based check-in system
    -   Check-in history tracking
    -   Real-time credit balance

-   **Admin Dashboard**

    -   User credit management
    -   Check-in statistics and monitoring
    -   Recent check-in history
    -   User activity tracking

-   **Gym Management**
    -   District-based gym search
    -   Gym details and amenities
    -   Operating hours
    -   Check-in validation

## 🛠 Tech Stack

-   **Frontend**

    -   Next.js 15
    -   React 19
    -   TailwindCSS
    -   shadcn/ui components
    -   Framer Motion for animations

-   **Backend**

    -   Next.js API routes
    -   MongoDB with Mongoose
    -   NextAuth.js for authentication
    -   bcryptjs for password hashing

-   **Development**
    -   ESLint for code linting
    -   Turbopack for fast development
    -   PostCSS for CSS processing

## 🏗 Getting Started

1. **Clone the repository**

    ```bash
    git clone <URL_HERE>
    cd gym_loop
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with:

    ```
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    ```

4. **Run development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

-   `npm run dev` - Start development server with Turbopack

## Ignore for now

-   `npm run build` - Build for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint

## 🔒 Security

-   Passwords are hashed using bcryptjs
-   Protected API routes
-   CSRF protection
-   Rate limiting on authentication endpoints
-   Secure session management

## 📦 Project Structure

```
gym_loop/
├── components/     # Reusable UI components
├── lib/           # Utility functions and configurations
├── models/        # MongoDB models
├── pages/         # Next.js pages and API routes
├── public/        # Static assets
└── styles/        # Global styles and Tailwind config
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

-   [Next.js Documentation](https://nextjs.org/docs)
-   [MongoDB Documentation](https://docs.mongodb.com)
-   [TailwindCSS Documentation](https://tailwindcss.com/docs)
-   [shadcn/ui Documentation](https://ui.shadcn.com)
