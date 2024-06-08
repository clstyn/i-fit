import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("contoh@gmail.com");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://i-fit-be.vercel.app/auth/forgot-password",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        toast.success(response.data.message);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-poppins text-c-birdong min-h-screen flex flex-col lg:flex-row">
      <Navbar />
      <div className="lg:w-1/2 bg-cover bg-center bg-forgot hidden lg:block"></div>

      <div className="w-full lg:w-1/2 bg-cover bg-center bg-base-hijau relative">
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-10 max-w-md w-full">
            <div>
              <p className="font-bold text-xl">Lupa password ?</p>
              <p className="text-md mb-4">
                Setelah tombol diklik, maka email akan dikirimkan untuk
                memulihkan password dari akun berikut.
              </p>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-blue-500 text-sm">{success}</p>}
              <form onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                  />
                </div>
                <div className="flex items-center justify-between my-4">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-c-orentua hover:bg-c-orenmuda text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isLoading ? "Loading..." : "Kirim Email"}
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

export default ForgotPassword;
