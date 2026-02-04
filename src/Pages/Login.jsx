import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        id: uuidv4(),
        name: username,
        role
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <select
          className="w-full border p-2 mb-4 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
