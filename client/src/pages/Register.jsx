import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">
          ✓
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Organize your day. Achieve more.
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

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
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;