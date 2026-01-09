# Task Tracker Application

A full-stack task management application built with:

- **Backend:** Express.js, MongoDB, JWT Authentication
- **Frontend:** React.js *(planned separately)*

---

## Features

- 🔐 User Signup & Login with JWT-based authentication
- 🔒 Authorization middleware for protected routes
- ✅ Task CRUD (Create, Read, Update, Delete)
- 📁 Limit of **4 projects per user**
- 🔑 Secure password hashing using `bcrypt`
- 🔄 Refresh Token functionality *(bonus)*
- ⚙️ Clean and modular **MVC architecture**
- 🧰 Custom `ApiError` class for error handling
- 📦 Environment variable configuration with `dotenv`

---

##  Technologies Used

**Backend:**

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcrypt.js
- dotenv

**Frontend (Planned):**

- React.js
- Axios
- React Router
- Bootstrap

**Tools:**

- Postman (API testing)

---

## ⚙️ Setup Instructions

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/task-handler.git
```

---

### 📡 Backend Setup

```bash
cd task-handler/backend
npm install
```

#### Create a `.env` file in `/backend` with the following:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
```

#### ▶️ Start the Backend Server

```bash
npm run dev
```

> Runs the server on `http://localhost:5000`

---

### 🎨 Frontend Setup

```bash
cd ../frontend
npm install
```

#### 📄 Create a `.env` file in `/frontend`:

```
REACT_APP_BASE_URL=http://localhost:5000
```

#### ▶️ Start the Frontend

```bash
npm start
```

> Runs the frontend at `http://localhost:3000`

---

## 📂 Project Structure

```
task-handler/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## 📬 Contact

For any queries or suggestions, feel free to reach out via mail : **amandsvv400@gmail.com** or pull requests.
