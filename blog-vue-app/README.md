### README

# Blog Vue App

This is a simple blogging application built with **Vue 3**, **Pinia**, and **Vite**. The app allows users to view blogs, filter them by date, and view detailed blog pages.

### 🚀 Live Demo
Check out the live application here: [Blog Vue App](https://blog-vue-app-beta.vercel.app/)

### 🛠 Features
- **View Blogs**: Browse a list of blogs with titles, descriptions, authors, and publication dates.
- **Blog Details**: View detailed information for a single blog.
- **Date Filter**: Filter blogs by publication date.

### 📋 Pending Features
The following features are not yet implemented:
- Password recovery
- Profile picture upload
- Blog add/edit functionality
- Comment add/edit functionality

### 💻 Tech Stack
- **Vue 3** with `<script setup>`
- **Pinia** for state management
- **Vite** for fast development
- **Axios** for API requests

### 🔧 How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/devbygeorge/blog-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-vue-app
   ```
3. Create a `.env` file in the root of the project with the following example configuration:
   ```env
   VITE_BACKEND_URL=https://your-backend-api-url.com
   ```
   Replace `https://your-backend-api-url.com` with the actual backend API URL.

4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open the app in your browser at `http://localhost:5173`.