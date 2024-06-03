import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Kalori = () => {
  return (
    <div className="font-poppins text-c-birdong bg-header-kalori bg-cover min-h-screen">
      <Navbar />

      <div className="h-[276px] w-full">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-7xl mt-32">Kalkulator Kalori</h1>       
        </div>
      </div>

      <form class="max-w-xl mx-auto">   
        <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search</label>
        <div class="relative">
          <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg focus:border-c-orentua focus:outline-none" placeholder="Cari makanan..." />
          <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-c-orentua hover:bg-c-orenmuda focus:ring-4 focus:outline-none focus:ring-c-orentua font-medium rounded-lg text-sm px-4 py-2">Cari</button>
        </div>
      </form>

    </div>
  );
};

export default Kalori;