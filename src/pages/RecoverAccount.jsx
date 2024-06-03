import React, { useState } from "react";

const RecoverAccount = () => {
    return (
        <div className="font-poppins text-c-birdong min-h-screen flex">
            <div className="w-1/2 bg-cover bg-center bg-recover">
            </div>

            <div className="w-1/2 bg-cover bg-center bg-base-hijau relative">
                <div className="absolute top-5 right-1/2 transform translate-x-1/2">
                    <h1 className="font-kaushan text-4xl">I-Fit</h1>
                </div>

                <div className="flex items-center justify-center h-full">
                    <div className="p-8 max-w-md w-full">
                        <div>
                            <p className="font-bold text-xl">Pemulihan akun</p>
                            <p className="text-md mb-4">Isi data berikut untuk ganti password</p>
                            <form>
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
                                        Ganti
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default RecoverAccount;