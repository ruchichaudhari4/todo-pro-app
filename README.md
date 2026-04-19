# 🚀 Todo Pro App

A modern full-stack Todo Application built with **MERN Stack (MongoDB, Express, React, Node.js)** featuring authentication, dark/light mode, edit modal, and a clean professional UI.

---

## 🌟 Features

### 🧠 Task Management
- ✅ Add Tasks  
- 🗑️ Delete Tasks  
- ✏️ Edit Tasks (Modal UI)  
- ✔️ Mark Complete / Incomplete  
- 🔍 Search Tasks  
- 📅 Due Date Selection  
- 🎯 Priority Levels (Low, Medium, High with colors)  

---

### 🔐 Authentication
- 🔑 Login System (JWT based)  
- 📝 Signup / Register  
- 🚪 Logout functionality  
- 🔒 Secure password hashing (bcrypt)  

---

### 🎨 UI / UX
- 🌙 Dark Mode  
- ☀️ Light Mode  
- ✨ Smooth Animations  
- 💎 Clean Card UI  
- 🧊 Glassmorphism Effects  
- 📱 Fully Responsive Design  

---

### 📊 Extras
- 📊 Live Task Counter  
- 🔔 Toast Notifications  
- ⚡ Fast API Integration  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Axios  
- CSS (Custom UI + Animations)

### Backend
- Node.js  
- Express.js  
- JWT Authentication  

### Database
- MongoDB Atlas  

---

## 📂 Project Structure
## 📂 Project Structure


todo-app/
│
├── backend/
│ ├── models/
│ │ ├── Task.js
│ │ └── User.js
│ ├── routes/
│ │ ├── taskRoutes.js
│ │ └── authRoutes.js
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ └── components/
│ ├── public/
│
└── README.md

---

## 📸 Screenshots

### 🟢 Main UI
![Main UI](./frontend/public/screenshots/main.png)

### ✏️ Edit Modal
![Edit](./frontend/public/screenshots/edit.png)

### 🔐 Login Page
![Login](./frontend/public/screenshots/login.png)

### 📝 Signup Page
![Signup](./frontend/public/screenshots/signup.png)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Rahul-ghanchi/todo-pro-app.git
cd todo-pro-app
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key

Run backend:

node server.js
3️⃣ Frontend Setup
cd frontend
npm install
npm start
🌐 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
📌 Task Routes
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Add task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
🚀 Future Improvements:-
🔔 Email Notifications
📅 Calendar Integration
📊 Productivity Dashboard
🌍 Deployment (Vercel + Render)
📱 Mobile App Version
👨‍💻 Author

Himani Chuadhari

⭐ Support

If you like this project, give it a ⭐ on GitHub!
