import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PaginationControls from "../components/Pagination";

const Kalori = () => {
  const foodData = [
    { namaMakanan: "Abon sapi", berat: 50, porsi: 1, kalori: 158 },
    { namaMakanan: "Dendeng balado", berat: 40, porsi: 1, kalori: 337 },
    { namaMakanan: "Nasi putih", berat: 150, porsi: 1, kalori: 230 },
    { namaMakanan: "Ayam goreng", berat: 100, porsi: 1, kalori: 350 },
    // Tambahkan lebih banyak data makanan jika diperlukan
  ];

  const [selectedFood, setSelectedFood] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 2; // Jumlah item per halaman

  const handleAddFood = (food) => {
    if (!selectedFood.find(item => item.namaMakanan === food.namaMakanan)) {
      setSelectedFood([...selectedFood, { ...food, porsi: 1 }]);
    }
  };

  const handleRemoveFood = (food) => {
    setSelectedFood(selectedFood.filter(item => item.namaMakanan !== food.namaMakanan));
  };

  const handlePorsiChange = (index, newPorsi) => {
    const newSelectedFood = [...selectedFood];
    newSelectedFood[index].porsi = newPorsi;
    setSelectedFood(newSelectedFood);
  };

  const filteredFoodData = foodData.filter(item =>
    item.namaMakanan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredFoodData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedFoodData = filteredFoodData.slice(startIdx, endIdx);

  const totalBerat = selectedFood.reduce((sum, item) => sum + item.berat * item.porsi, 0);
  const totalPorsi = selectedFood.reduce((sum, item) => sum + item.porsi, 0);
  const totalKalori = selectedFood.reduce((sum, item) => sum + item.kalori * item.porsi, 0);

  return (
    <div className="font-poppins text-c-birdong bg-header-kalori bg-cover min-h-screen">
      <Navbar />

      <div className="h-[216px] w-full pb-20">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-5xl lg:text-7xl mt-32">Kalkulator Kalori</h1>
        </div>
      </div>

      <form className="max-w-xl lg:mx-auto mx-10" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg focus:border-c-orentua focus:outline-none"
            placeholder="Cari makanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-c-orentua hover:bg-c-orenmuda focus:ring-4 focus:outline-none focus:ring-c-orentua font-medium rounded-lg text-sm px-4 py-2"
          >
            Cari
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md rounded-lg m-10 lg:m-20 mb-5">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white uppercase bg-c-hijautua">
            <tr>              
              <th scope="col" className="px-6 py-3"></th>
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
            </tr>
          </thead>
          <tbody>
            {paginatedFoodData.map((row, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-right text-c-orenmuda">
                  <button onClick={() => handleAddFood(row)}>Tambah</button>
                </td>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {row.namaMakanan}
                </th>
                <td className="px-6 py-4">{row.berat}</td>
                <td className="px-6 py-4">{row.porsi}</td>
                <td className="px-6 py-4">{row.kalori}</td>                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls
        currPage={currPage}
        totalPages={totalPages}
        handlePagination={(newPage) => setCurrPage(newPage)}
      />

      <div className="relative overflow-x-auto shadow-md rounded-lg m-10 lg:m-20 mb-5">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white uppercase bg-c-hijautua">
            <tr>              
              <th scope="col" className="px-6 py-3"></th>
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
            </tr>
          </thead>
          <tbody>
            {selectedFood.map((row, index) => (              
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-right text-c-orenmuda">
                  <button onClick={() => handleRemoveFood(row)}>Hapus</button>
                </td>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {row.namaMakanan}
                </th>
                <td className="px-6 py-4">{row.berat * row.porsi}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={row.porsi}
                    onChange={(e) => handlePorsiChange(index, parseInt(e.target.value))}
                    className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-c-orentua"
                    min="1"
                  />
                </td>
                <td className="px-6 py-4">{row.kalori * row.porsi}</td>                
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-c-orentua bg-white">              
              <td className="px-6 py-3"></td>
              <th scope="row" className="px-6 py-3 text-base">Total</th>
              <td className="px-6 py-3">{totalBerat}</td>
              <td className="px-6 py-3">{totalPorsi}</td>
              <td className="px-6 py-3">{totalKalori}</td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  );
};

export default Kalori;
