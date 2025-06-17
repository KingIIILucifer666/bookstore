# 📚 MahiGaming Full-Stack Bookstore App

A full-stack online bookstore application built with **React**, **Express**, **MongoDB**, and **Nx Monorepo**, fully **Dockerized** for easy local development and deployment.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 📚 **Book Management** (CRUD)
- ⭐ **Favorites List** (Add/Remove/View favorites)
- 🐳 **Docker Compose** setup for MongoDB, Client, and Server
- 🏗️ **Nx Monorepo** structure with shared libs and components

---

## 📁 Folder Structure

```
bookstore/
├── apps/
│   ├── client/         → React frontend app
│   └── server/         → Express backend API
├── libs/               → Shared utils and types
├── shared-components/  → Reusable UI components
├── docker/             → Docker & docker-compose files
├── .nx/                → Nx config/cache
```

---

## 🧪 Tech Stack

- **Frontend:** React 18, Tailwind CSS, React Router, Context API
- **Backend:** Express, Mongoose, JWT Auth
- **Database:** MongoDB
- **Tooling:** Nx, Docker, TypeScript, Vite, ESLint/Prettier

---

## 🧰 Setup Instructions

### 📦 Local Development (Nx Dev Mode)

```bash
# Install dependencies
npm install

# Start frontend and backend
nx serve client
nx serve server
```

### 🐳 Docker Setup

```bash
cd docker
docker-compose build --no-cache
docker-compose up
```

Server → http://localhost:5000  
Client → http://localhost:4200  
MongoDB → mongodb://mongo:27017/bookstore

---

## 🔑 Environment Variables

Create a `.env` file in the root or server folder:

```env
MONGO_URI=mongodb://mongo:27017/bookstore
JWT_SECRET=yourSecretKey
```

---

## 🖼️ Frontend Overview

- **Global State:** Managed using `React Context API` for authentication state.
- **Token Handling:** JWT token is stored in `localStorage` and synced in state.
- **Routing:** `React Router` handles navigation and protected routes.
- **Styling:** Tailwind CSS is used for modern responsive UI.
- **Pages:** Includes Login, Register, Book List, Book Details, and Favorites (protected).
- **Protected UI:** Conditionally renders UI based on auth state.
- **Axios Setup:** Centralized Axios instance can be configured with interceptors for JWT.

---

## 📡 API Endpoints

### 🔐 Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### 👤 User Routes

- `GET /api/user/:id`
- `PUT /api/user/:id`
- `DELETE /api/user/:id`

### 📚 Book Routes

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

### ⭐ Favorites Routes (Protected)

- `GET /api/favorites`
- `POST /api/favorites/:bookId`
- `DELETE /api/favorites/:bookId`

---

## 🧠 Design Decisions

- 🔄 **Separation of Concerns**  
  Favorites are stored in a separate collection (`favorites`) to allow better indexing, easier scalability, and cleaner relational design.

- 🧱 **Monorepo via Nx**  
  Streamlines builds, enforces boundaries between apps/libs, and scales efficiently with shared dependencies.

- 🐋 **Docker First**  
  Enables consistent local environments across machines with full-stack setup.

---

## 🏁 Final Notes

This project showcases a scalable, modular, and production-grade setup for a full-stack application.

> Last updated: June 17, 2025

---

Feel free to customize, extend features, or add UI polish!
# 📚 MahiGaming Full-Stack Bookstore App

A full-stack online bookstore application built with **React**, **Express**, **MongoDB**, and **Nx Monorepo**, fully **Dockerized** for easy local development and deployment.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 📚 **Book Management** (CRUD)
- ⭐ **Favorites List** (Add/Remove/View favorites)
- 🐳 **Docker Compose** setup for MongoDB, Client, and Server
- 🏗️ **Nx Monorepo** structure with shared libs and components

---

## 📁 Folder Structure

```
bookstore/
├── apps/
│   ├── client/         → React frontend app
│   └── server/         → Express backend API
├── libs/               → Shared utils and types
├── shared-components/  → Reusable UI components
├── docker/             → Docker & docker-compose files
├── .nx/                → Nx config/cache
```

---

## 🧪 Tech Stack

- **Frontend:** React 18, Tailwind CSS, React Router, Context API
- **Backend:** Express, Mongoose, JWT Auth
- **Database:** MongoDB
- **Tooling:** Nx, Docker, TypeScript, Vite, ESLint/Prettier

---

## 🧰 Setup Instructions

### 📦 Local Development (Nx Dev Mode)

```bash
# Install dependencies
npm install

# Start frontend and backend
nx serve client
nx serve server
```

### 🐳 Docker Setup

```bash
cd docker
docker-compose build --no-cache
docker-compose up
```

Server → http://localhost:5000  
Client → http://localhost:4200  
MongoDB → mongodb://mongo:27017/bookstore

---

## 🔑 Environment Variables

Create a `.env` file in the root or server folder:

```env
MONGO_URI=mongodb://mongo:27017/bookstore
JWT_SECRET=yourSecretKey
```

---

## 🖼️ Frontend Overview

- **Global State:** Managed using `React Context API` for authentication state.
- **Token Handling:** JWT token is stored in `localStorage` and synced in state.
- **Routing:** `React Router` handles navigation and protected routes.
- **Styling:** Tailwind CSS is used for modern responsive UI.
- **Pages:** Includes Login, Register, Book List, Book Details, and Favorites (protected).
- **Protected UI:** Conditionally renders UI based on auth state.
- **Axios Setup:** Centralized Axios instance can be configured with interceptors for JWT.

---

## 📡 API Endpoints

### 🔐 Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### 👤 User Routes

- `GET /api/user/:id`
- `PUT /api/user/:id`
- `DELETE /api/user/:id`

### 📚 Book Routes

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

### ⭐ Favorites Routes (Protected)

- `GET /api/favorites`
- `POST /api/favorites/:bookId`
- `DELETE /api/favorites/:bookId`

---

## 🧠 Design Decisions

- 🔄 **Separation of Concerns**  
  Favorites are stored in a separate collection (`favorites`) to allow better indexing, easier scalability, and cleaner relational design.

- 🧱 **Monorepo via Nx**  
  Streamlines builds, enforces boundaries between apps/libs, and scales efficiently with shared dependencies.

- 🐋 **Docker First**  
  Enables consistent local environments across machines with full-stack setup.

---

## 🏁 Final Notes

This project showcases a scalable, modular, and production-grade setup for a full-stack application.

> Last updated: June 17, 2025

---

Feel free to customize, extend features, or add UI polish!
