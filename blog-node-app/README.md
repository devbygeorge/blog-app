# Blog Node App

A Node.js-powered blog application that provides features such as user authentication, blog creation, comment management, and profile updates. This app uses **Express.js** for the backend and is deployed on **Vercel**.

## 🚀 Live Demo

Check out the live application:  
👉 [Blog Node App](https://blog-node-app-eight.vercel.app/)

---

## 📂 Project Structure

```
blog-node-app/
├── index.js               # Main entry point of the application
├── routes/                # API route handlers
│   ├── auth.js            # Authentication routes (login, register)
│   ├── blog.js            # Blog CRUD routes
│   ├── comment.js         # Comment management routes
│   └── profile.js         # User profile routes
├── models/                # MongoDB models (e.g., User, Blog, Comment)
├── middlewares/           # Express middleware (e.g., auth middleware)
├── .env                   # Environment variables (ignored by Git)
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## 🛠 Features

- **User Authentication**: Register, login, and secure authentication using JWT.
- **Blog Management**: Create, edit, delete, and retrieve blogs.
- **Comments**: Add, edit, and retrieve comments on blogs.
- **User Profiles**: View and edit user profiles.
- **MongoDB Integration**: All data is stored securely in MongoDB.

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devbygeorge/blog-app.git
   cd blog-node-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| POST   | `/register` | Register a new user    |
| POST   | `/login`    | Login an existing user |

### Blog Routes (`/api/blogs`)

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | `/`      | Get all blogs       |
| POST   | `/`      | Create a new blog   |
| GET    | `/:id`   | Get a blog by ID    |
| PUT    | `/:id`   | Edit a blog by ID   |

### Comment Routes (`/api/comments`)

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| POST   | `/`             | Add a new comment           |
| PUT    | `/:id`          | Edit a comment by ID        |
| GET    | `/blog/:blogId` | Get all comments for a blog |

### Profile Routes (`/api/profile`)

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| GET    | `/`         | Retrieve user profile |
| PUT    | `/`         | Edit user profile     |
| PUT    | `/password` | Change user password  |

---

## 🖥️ Deployment

This project is deployed on **Vercel**. Visit the live app here:  
👉 [Blog Node App](https://blog-node-app-eight.vercel.app/)

### Deploy on Vercel Yourself

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy the app:
   ```bash
   vercel
   ```

---

## 🧪 Testing

1. Use tools like **Postman** or **Insomnia** to test API endpoints.
2. Ensure your `.env` file is correctly configured for local testing.

---

## 🛡️ Security Notes

- Never expose your `JWT_SECRET` or `MONGODB_URI` in public repositories.
- Use HTTPS for production deployments to secure data in transit.