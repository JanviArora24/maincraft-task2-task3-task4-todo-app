import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/tasks",
        config
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/add",
        {
          task,
        },
        config
      );

      setTask("");
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/delete/${id}`,
        config
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (id, text) => {
    setEditId(id);
    setTask(text);
  };

  const updateTask = async () => {
    if (!task.trim()) return;

    try {
      await axios.put(
        `http://localhost:5000/update/${editId}`,
        {
          task,
        },
        config
      );

      setTask("");
      setEditId(null);

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/toggle/${id}`,
        {},
        config
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="todo-box">

        <div className="todo-header">
          <div>
            <h1>Todo App</h1>

            <p className="todo-subtitle">
              Organize your tasks and stay productive.
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editId ? updateTask() : addTask();
              }
            }}
          />

          {editId ? (
            <button
              className="update-btn"
              onClick={updateTask}
            >
              Update
            </button>
          ) : (
            <button
              className="add-btn"
              onClick={addTask}
            >
              Add
            </button>
          )}
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>

            <p>
              Add your first task and start organizing
              your day.
            </p>
          </div>
        ) : (
          tasks.map((item) => (
            <div
              className="task-card"
              key={item._id}
            >
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
                  onClick={() =>
                    toggleTask(item._id)
                  }
                >
                  {item.completed
                    ? "Unmark"
                    : "Mark"}
                </button>

                <button
                  className="edit-btn"
                  onClick={() =>
                    editTask(
                      item._id,
                      item.task
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(item._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Todo;