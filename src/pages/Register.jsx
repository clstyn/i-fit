import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
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
      setConfirmPasswordError("Password tidak sama");
    } else {
      setConfirmPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password tidak sama");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://i-fit-be.vercel.app/auth/signup",
        {
          fullname: formData.fullname,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Berhasil membuat akun");
      } else {
        toast.error(response.data.message || "Registrasi akun gagal");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Terjadi kesalahan. Ulangi beberapa saat lagi"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-poppins text-c-birdong min-h-screen flex flex-col lg:flex-row">
      <Navbar />
      <div className="lg:w-1/2 bg-cover bg-center bg-register hidden lg:block"></div>

      <div className="w-full lg:w-1/2 bg-cover bg-center bg-base-hijau relative">
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-10 mt-20 max-w-md w-full">
            <div>
              <p className="font-bold text-xl">Selamat datang</p>
              <p className="text-md mb-4">
                Isi data berikut untuk membuat akun
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="fullname"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    required
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
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
                <div className="flex flex-col mb-6 gap-1">
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
                  <div className="h-6">
                    {confirmPasswordError && (
                      <p className="text-red-500 text-xs">
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between my-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-c-orentua hover:bg-c-orenmuda text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {loading ? "Loading..." : "Register"}
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
