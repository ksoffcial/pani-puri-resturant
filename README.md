Here is a **professional GitHub-level README.md** with **badges, screenshots section, API docs, and clean formatting**. You can copy-paste it directly into your GitHub README.md.

---

# 🥟 Pani Puri Shop – MERN Stack Application

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Express](https://img.shields.io/badge/Backend-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-Learning-lightgrey)

A full-stack **Pani Puri Shop Web Application** built using the **MERN stack**. It includes secure authentication, role-based authorization, REST APIs, and a modern animated UI.

This project demonstrates **real-world full-stack development practices**, including middleware authentication, database management, and professional deployment.

---

## 🌐 Live Demo

* 🔗 Frontend (Vercel): [https://pani-puri-resturant.vercel.app/)


---

## 📸 Screenshots

Add screenshots in a `/screenshots` folder and link them like below:

```
screenshots/
 ├── home.png
 ├── login.png
 ├── dashboard.png
```

Example:

```
![Home](screenshots/home.png)
![Login](screenshots/login.png)
```

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* DaisyUI
* Framer Motion
* GSAP
* Lucide React Icons
* Zod validation
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JWT Authentication
* bcrypt Password Hashing
* User Middleware
* Admin Middleware

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## ✨ Features

### User

* Register and login
* Secure password encryption
* JWT authentication
* Form validation
* Responsive modern UI
* Smooth animations

### Admin

* Admin authentication
* Protected routes
* Manage shop data securely

### System

* RESTful API
* Middleware-based authorization
* MongoDB database integration
* Separate frontend and backend deployment

---

## 📁 Project Structure

```
pani-puri-shop
│
├── backend
│   ├── controllers
│   ├── middleware
│   │    ├── userMiddleware.js
│   │    └── adminMiddleware.js
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── main.jsx
│
└── README.md
```

---

## ⚙️ Installation

### Clone repository

```
git clone https://github.com/yourusername/pani-puri-shop.git
cd pani-puri-shop
```

---

### Backend setup

```
cd backend
npm install
npm run dev
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

### Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication System

**Flow:**

1. User registers
2. Password hashed using bcrypt
3. User logs in
4. JWT token generated
5. Token verified using middleware
6. Protected routes accessible

---

## 📡 API Documentation

### Auth APIs

#### Register User

```
POST /api/auth/register
```

Body:

```
{
  "name": "Kishan",
  "email": "user@email.com",
  "password": "123456"
}
```

---

#### Login User

```
POST /api/auth/login
```

---

### Protected User Route

```
GET /api/user/profile
```

Requires JWT token

---

### Admin Route

```
GET /api/admin/dashboard
```

Requires Admin Token

---

## 🎨 UI Features

* Modern responsive design
* Tailwind + DaisyUI components
* Smooth animations with GSAP
* Page transitions using Framer Motion
* Clean UX

---

## 🚀 Deployment

Frontend deployed on **Vercel**

Backend deployed on **Render**

Build commands:

Frontend

```
npm run build
```

Backend

```
npm install
npm start
```

---

## 🧠 Learning Outcomes

* Full MERN stack development
* Authentication and authorization
* REST API design
* MongoDB database integration
* Secure password handling
* Professional deployment workflow

---

## 👤 Author

**Kishan**

GitHub: [https://github.com/ksoffcial)

---

## 📄 License

This project is for **learning and portfolio purposes**.

---


