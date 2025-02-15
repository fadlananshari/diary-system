import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(form);
    localStorage.setItem("token", response.data.token);
    navigate("/diaries");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded w-full" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border rounded w-full" required />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
