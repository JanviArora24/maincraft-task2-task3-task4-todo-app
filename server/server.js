const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(
            req.user.userId
        ).select("-password");

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ADD TASK
app.post("/add", authMiddleware, async (req, res) => {
    try {
        const newTask = new Task({
            task: req.body.task,
            user: req.user.userId
        });

        await newTask.save();

        res.status(201).json({
            message: "Task Added Successfully",
            task: newTask
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// GET LOGGED-IN USER TASKS
app.get("/tasks", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.userId
        });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE TASK
app.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task Deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE TASK
app.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            {
                task: req.body.task
            },
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task Updated",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// MARK COMPLETE / INCOMPLETE
app.put("/toggle/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.completed = !task.completed;

        await task.save();

        res.json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


app.listen(5000, () => {

    console.log("Server Running");

});