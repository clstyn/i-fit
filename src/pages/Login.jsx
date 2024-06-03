import React, { useState } from "react";

const Login = () => {
    return (
        <div className="font-poppins text-c-birdong min-h-screen flex">
            <div className="w-1/2 bg-cover bg-center bg-login">
            </div>

            <div className="w-1/2 bg-cover bg-center bg-base-hijau relative">
                <div className="absolute top-5 right-1/2 transform translate-x-1/2">
                    <h1 className="font-kaushan text-4xl">I-Fit</h1>
                </div>

                <div className="flex items-center justify-center h-full">
                    <div className="p-8 max-w-md w-full">
                        <div>
                            <p className="font-bold text-xl">Selamat datang kembali</p>
                            <p className="text-md mb-4">Isi data berikut untuk masuk</p>
                            <form>
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
                                <div className="mb-6">
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
                                <div className="text-right mb-4">
                                    <a className="italic text-sm hover:underline" href="/forgotPassword">Lupa password?</a>
                                </div>
                                <div className="flex items-center justify-between my-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-c-orentua hover:bg-c-orenmuda text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <p className="text-center text-md mb-4">Belum punya akun? <a className="underline font-bold" href="/register">Register disini</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default Login;