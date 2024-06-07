import React, { useState } from "react";

const Register = () => {
  return (
    <div className="font-poppins text-c-birdong min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-cover bg-center bg-register hidden lg:block">
      </div>

      <div className="w-full lg:w-1/2 bg-cover bg-center bg-base-hijau relative">
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 max-w-md w-full">
            <div>
              <p className="font-bold text-xl">Selamat datang</p>
              <p className="text-md mb-4">Isi data berikut untuk membuat akun</p>
              <form>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Nama Lengkap</label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                  <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                  <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                  <input
                    required
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="flex items-center justify-between my-4">
                  <button
                    type="submit"
                    className="w-full bg-c-orentua hover:bg-c-orenmuda text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </button>
                </div>
              </form>
              <p className="text-center text-md mb-4">Sudah punya akun? <a className="underline font-bold" href="/login">Login disini</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
