<div align="center">

![BookWorm Banner](![website banner](image.png))

  <!-- Replace the URL above with your actual banner image URL -->

# BookWorm

### Your Personal Literary Companion & Reading Tracker

  <p>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js_16-Black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://react.dev">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://nodejs.org">
      <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    </a>
    <a href="https://expressjs.com">
      <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    </a>
    <a href="https://www.mongodb.com">
      <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
    <a href="https://next-auth.js.org">
      <img src="https://img.shields.io/badge/NextAuth.js-Black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextAuth" />
    </a>
  </p>

  <br />

[**View Live Demo**](https://bookworm-demo.vercel.app/)

_(Note: Live link is a placeholder)_

</div>

---

## Project Overview

**BookWorm** is a full-stack reading tracking application designed for book lovers. It serves as a digital library where users can discover new titles, track their reading journey across custom shelves (Want to Read, Currently Reading, Read), and engage with a community through reviews. It features a robust admin dashboard for content management and moderation.

## Key Features

### Admin Side

- **Manage Books:** Full CRUD capabilities to add, edit, and remove books from the catalog.
- **Manage Genres:** Organize books into categories with a dedicated genre manager.
- **Moderate Reviews:** Review user submissions with an approval/rejection system to maintain community standards.
- **Manage Tutorials:** Curate educational YouTube content for users.

### User Side

- **Browse Books:** Discover books with real-time search (Title/Author) and Genre filtering.
- **Personal Library:** Organize books into shelves:
  - **Want to Read** 
  - **Currently Reading**  (Track progress by page number)
  - **Read** 
- **Rate & Review:** Share thoughts with the community (Reviews require admin approval).
- **Authentication:** Secure login/registration with role-based access control (Admin vs. User).

## Tech Stack

| Area               | Technologies                                                                                                           |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | Next.js 16 (App Router), React, Tailwind CSS, HeroUI, Framer Motion, Axios, Lucide React, Sonner (Toast Notifications) |
| **Backend**        | Node.js, Express.js, MongoDB (Native Driver), CORS, Dotenv                                                             |
| **Authentication** | NextAuth.js (Custom Credentials Provider), JWT, Bcrypt                                                                 |
| **Tools**          | Vercel (Deployment), ImgBB (Image Hosting)                                                                             |

## Installation Guide

Follow these steps to run BookWorm locally.

### Prerequisites

- Node.js installed
- MongoDB connection string

### 1. Clone the Repository

```bash
git clone https://github.com/AtikHasan16/BookWorm.git
cd BookWorm
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=2000
DB_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
# Development mode with Nodemon
nodemon index.js

# Or standard start
node index.js
```

> [!IMPORTANT]
> The server must be running on **Port 2000** for the frontend to connect correctly.

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:2000/api
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Start the Next.js development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to browse the app!

##  API Endpoints

A quick look at the core API structure:

| Method    | Endpoint                   | Description                                     |
| :-------- | :------------------------- | :---------------------------------------------- |
| **POST**  | `/api/users`               | Register a new user                             |
| **GET**   | `/api/books`               | Fetch all books (supports `?search` & `?genre`) |
| **GET**   | `/api/books/:id`           | Fetch single book details                       |
| **POST**  | `/api/shelves`             | Add/Update book in user shelf                   |
| **GET**   | `/api/shelves/:userId`     | Get user's library shelves                      |
| **POST**  | `/api/reviews`             | Submit a review (Pending status)                |
| **PATCH** | `/api/reviews/:id/approve` | Approve a user review (Admin)                   |

## Screenshots

|                            Dashboard View                             |                           Book Details                            |
| :-------------------------------------------------------------------: | :---------------------------------------------------------------: |
| ![Dashboard](https://via.placeholder.com/400x200?text=Dashboard+View) | ![Details](https://via.placeholder.com/400x200?text=Book+Details) |

|                          Mobile View                           |                          Admin Panel                           |
| :------------------------------------------------------------: | :------------------------------------------------------------: |
| ![Mobile](https://via.placeholder.com/200x400?text=Mobile+App) | ![Admin](https://via.placeholder.com/400x200?text=Admin+Panel) |

---

<div align="center">
  <p>Built with MD Atik Hasan</p>
</div>
