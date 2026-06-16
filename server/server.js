const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ADD TASK
app.post("/add", async (req, res) => {

    const newTask = new Task({
        task: req.body.task
    });

    await newTask.save();

    res.json({
        message: "Task Added Successfully"
    });

});


// GET ALL TASKS
app.get("/tasks", async (req, res) => {

    const tasks = await Task.find();

    res.json(tasks);

});


// DELETE TASK
app.delete("/delete/:id", async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
        message: "Task Deleted"
    });

});


// UPDATE TASK
app.put("/update/:id", async (req, res) => {

    await Task.findByIdAndUpdate(
        req.params.id,
        {
            task: req.body.task
        }
    );

    res.json({
        message: "Task Updated"
    });

});


// MARK COMPLETE / INCOMPLETE
app.put("/toggle/:id", async (req, res) => {

    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;

    await task.save();

    res.json(task);

});


app.listen(5000, () => {

    console.log("Server Running");

});