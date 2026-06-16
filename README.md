# 📝 MERN Todo App

A modern Todo List application built using the MERN stack. Users can add, update, delete, mark, and unmark tasks with data stored in MongoDB Atlas.

---

## 🚀 Features

* ✅ Add new tasks
* ✏️ Update existing tasks
* 🗑️ Delete tasks
* ✔️ Mark tasks as completed
* ❌ Unmark completed tasks
* 💾 Store data in MongoDB Atlas
* 🔄 Real-time updates
* 🎨 Beautiful and responsive UI

---

## 📸 Screenshot

> Save your application screenshot inside:

```text
screenshots/app.png
```

Then GitHub will display it automatically:

```md
![Todo App](./screenshots/app.png)
```

![Todo App](./screenshots/app.png)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

---

## 📂 Project Structure

```text
maincraft-task2-todo-app
│
├── client
│
├── server
│   ├── models
│   │     Task.js
│   ├── .env
│   └── server.js
│
├── screenshots
│     app.png
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/JanviArora24/maincraft-task2-todo-app.git
```

---

### Backend Setup

```bash
cd server
npm install
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Add Task

```http
POST /add
```

### Get All Tasks

```http
GET /tasks
```

### Update Task

```http
PUT /update/:id
```

### Delete Task

```http
DELETE /delete/:id
```

### Toggle Complete/Incomplete

```http
PUT /toggle/:id
```

---

## 📌 Future Improvements

* Search tasks
* Filter completed tasks
* Dark mode
* Priority levels
* Due dates
* User authentication

---

## 👩‍💻 Author

**Janvi Arora**

GitHub:
https://github.com/JanviArora24

---

⭐ If you like this project, please give it a star!
