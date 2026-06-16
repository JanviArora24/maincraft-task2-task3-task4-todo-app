import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!task) return;

    await axios.post("http://localhost:5000/add", {
      task,
    });

    setTask("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    getTasks();
  };

  const editTask = (id, text) => {
    setEditId(id);
    setTask(text);
  };

  const updateTask = async () => {
    await axios.put(`http://localhost:5000/update/${editId}`, {
      task,
    });

    setTask("");
    setEditId(null);
    getTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(`http://localhost:5000/toggle/${id}`);
    getTasks();
  };

  return (
    <div className="container">

      <div className="todo-box">

        <h1> Todo App</h1>

        <div className="input-section">

          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          {editId ? (
            <button className="update-btn" onClick={updateTask}>
              Update
            </button>
          ) : (
            <button className="add-btn" onClick={addTask}>
              Add
            </button>
          )}

        </div>

        {tasks.map((item) => (
          <div className="task-card" key={item._id}>

            <h3
              className={
                item.completed ? "completed" : ""
              }
            >
              {item.task}
            </h3>

            <div className="buttons">

              <button
                className="mark-btn"
                onClick={() => toggleTask(item._id)}
              >
                {item.completed ? "Unmark" : "Mark"}
              </button>

              <button
                className="edit-btn"
                onClick={() =>
                  editTask(item._id, item.task)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(item._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;