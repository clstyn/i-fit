import React, { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import Navbar from "../components/Navbar";

const Login = () => {
  const { login, isLogged } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://i-fit-be.vercel.app/auth/signin",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("userId", response.data.user.id);
        login(response.data.user.id);
        toast.success(response.data.message);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLogged) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <div className="font-poppins text-c-birdong min-h-screen flex flex-col lg:flex-row">
      <Navbar />
      <div className="lg:w-1/2 bg-cover bg-center bg-login hidden lg:block"></div>

      <div className="w-full lg:w-1/2 bg-cover bg-center bg-base-hijau relative">
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-10 max-w-md w-full">
            <div>
              <p className="font-bold text-xl">Selamat datang kembali</p>
              <p className="text-md mb-4">Isi data berikut untuk masuk</p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-blue-500 mb-4">{success}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                </div>
                <div className="text-right mb-4">
                  <Link
                    className="italic text-sm hover:underline"
                    to="/forgotPassword"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="flex items-center justify-between my-4">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-c-orentua hover:bg-c-orenmuda text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
              <p className="text-center text-md mb-4">
                Belum punya akun?{" "}
                <Link className="underline font-bold" to="/register">
                  Register disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
