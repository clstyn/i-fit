import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://i-fit-be.vercel.app/auth/signup",
        {
          fullName: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }
      );

      if (response.data.success) {
        setSuccess(
          "Registration successful! Please check your email to verify your account."
        );
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again later."
      );
    }
  };
  return (
    <div className="font-poppins text-c-birdong min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-cover bg-center bg-register hidden lg:block"></div>

      <div className="w-full lg:w-1/2 bg-cover bg-center bg-base-hijau relative">
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 max-w-md w-full">
            <div>
              <p className="font-bold text-xl">Selamat datang</p>
              <p className="text-md mb-4">
                Isi data berikut untuk membuat akun
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                  />
                </div>
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
                <div className="mb-4">
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
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirm Password"
                  />
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm">{confirmPasswordError}</p>
                )}
                <div className="flex items-center justify-between my-4">
                  <button
                    type="submit"
                    className="w-full bg-c-orentua hover:bg-c-orenmuda text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </button>
                </div>
              </form>
              <p className="text-center text-md mb-4">
                Sudah punya akun?{" "}
                <a className="underline font-bold" href="/login">
                  Login disini
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
