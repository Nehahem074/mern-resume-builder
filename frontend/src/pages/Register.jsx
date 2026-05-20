import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      navigate("/dashboard");

    } catch (error) {

     

    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-[400px"
      >

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;