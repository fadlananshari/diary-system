import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/Api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <input type="text" name="name" placeholder="Nama" onChange={handleChange} className="p-2 border rounded w-full" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded w-full" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border rounded w-full" required />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
