# 🚀 My Todo API

A powerful REST API for managing your todos, built with Node.js, Express, and MongoDB.

## ✨ Features

- 🔐 JWT Authentication
- 📝 CRUD operations for todos
- 🎯 User-specific todos
- 🛡️ Input validation with Zod
- 📦 MongoDB with Mongoose

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/OmarJ9/my_todo_api.git
cd my_todo_api
```

2. Create a .env file:

```bash
PORT=3000
MONGODB_URL=mongodb://root:example@localhost:27017
JWT_ACCESS_TOKEN_SECRET=your_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
```

4. Build mongodb image:

```bash

docker-compose up -d

```

5. Install dependencies

```bash
npm install
```

6. Start the server

```bash
npm run dev
```
