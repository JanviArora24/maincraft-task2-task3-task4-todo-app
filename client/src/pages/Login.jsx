import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/todo");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">
          ✓
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue managing your tasks.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}

          <Link to="/register">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;