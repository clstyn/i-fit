import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PaginationControls from "../components/Pagination";

const Kalori = () => {
  const foodData = [
    { namaMakanan: "Abon sapi", berat: 50, porsi: 1, kalori: 158 },
    { namaMakanan: "Dendeng balado", berat: 40, porsi: 1, kalori: 337 },
    { namaMakanan: "Nasi putih", berat: 150, porsi: 1, kalori: 230 },
    { namaMakanan: "Ayam goreng", berat: 100, porsi: 1, kalori: 350 },
  ];

  const selectedFood = [
    { namaMakanan: "Abon sapi", berat: 50, porsi: 1, kalori: 158 },
  ];

  return (
    <div className="font-poppins text-c-birdong bg-header-kalori bg-cover min-h-screen">
      <Navbar />

      <div className="h-[276px] w-full">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-7xl mt-32">Kalkulator Kalori</h1>
        </div>
      </div>

      <form className="max-w-xl mx-auto">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg focus:border-c-orentua focus:outline-none"
            placeholder="Cari makanan..."
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-c-orentua hover:bg-c-orenmuda focus:ring-4 focus:outline-none focus:ring-c-orentua font-medium rounded-lg text-sm px-4 py-2"
          >
            Cari
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-16 mb-5">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white uppercase bg-c-hijautua">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Makanan
              </th>
              <th scope="col" className="px-6 py-3">
                Berat (gram)
              </th>
              <th scope="col" className="px-6 py-3">
                Porsi
              </th>
              <th scope="col" className="px-6 py-3">
                Kalori (kal)
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {foodData.map((row, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {row.namaMakanan}
                </th>
                <td className="px-6 py-4">{row.berat}</td>
                <td className="px-6 py-4">{row.porsi}</td>
                <td className="px-6 py-4">{row.kalori}</td>
                <td className="px-6 py-4 text-right text-c-orenmuda">
                  {/* Add button or logic to handle selection */}
                  <button>Tambah</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
      </div>
      <PaginationControls
        currPage={1}
        totalPages={5}
        handlePagination={() => {}}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-16 mb-5">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white uppercase bg-c-hijautua">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Makanan
              </th>
              <th scope="col" className="px-6 py-3">
                Berat (gram)
              </th>
              <th scope="col" className="px-6 py-3">
                Porsi
              </th>
              <th scope="col" className="px-6 py-3">
                Kalori (kal)
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {selectedFood.map((row, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {row.namaMakanan}
                </th>
                <td className="px-6 py-4">{row.berat}</td>
                <td className="px-6 py-4">{row.porsi}</td>
                <td className="px-6 py-4">{row.kalori}</td>
                <td className="px-6 py-4 text-right text-c-orenmuda">
                  {/* Remove button or logic to handle deselection */}
                  <button>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr class="font-semibold text-c-orentua">
              <th scope="row" class="px-6 py-3 text-base">Total</th>
              <td class="px-6 py-3">115</td>
              <td class="px-6 py-3">2</td>
              <td class="px-6 py-3">526</td>
              <td class="px-6 py-3"></td>
            </tr>
          </tfoot>
        </table>        
      </div>

    </div>
  );
};

export default Kalori;
