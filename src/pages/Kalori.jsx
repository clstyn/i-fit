import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { Search } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import PaginationControls from "../components/Pagination";

const Kalori = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalFoods, setTotalFoods] = useState(0);

  const fetchFoods = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://i-fit-be.vercel.app/food?page=${currPage}&search=${searchQuery}`
      );
      setFoodsData(response.data.foods || response.data.results);
      setTotalPages(response.data.totalPages);
      setTotalFoods(response.data.totalFoods || response.data.totalResults);
    } catch (error) {
      toast.error("Gagal mendapatkan data kalori");
    }
  }, [currPage, searchQuery]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleAddFood = (food) => {
    if (!selectedFood.find((item) => item.name === food.name)) {
      setSelectedFood([...selectedFood, { ...food, portion: 1 }]);
    }
  };

  const handleRemoveFood = (food) => {
    setSelectedFood(selectedFood.filter((item) => item.name !== food.name));
  };

  const handleportionChange = (index, newportion) => {
    const newSelectedFood = [...selectedFood];
    newSelectedFood[index].portion = newportion;
    setSelectedFood(newSelectedFood);
  };

  // const filteredFoodData = foodData.filter((item) =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const totalItems = filteredFoodData.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const startIdx = (currPage - 1) * itemsPerPage;
  // const endIdx = startIdx + itemsPerPage;
  // const paginatedFoodData = filteredFoodData.slice(startIdx, endIdx);

  // const totalBerat = selectedFood.reduce(
  //   (sum, item) => sum + item.berat * item.portion,
  //   0
  // );

  const totalportion = selectedFood.reduce(
    (sum, item) => sum + item.portion,
    0
  );
  const totalKalori = selectedFood.reduce(
    (sum, item) => sum + item.calories * item.portion,
    0
  );

  const handleSearchQueryChange = debounce((query) => {
    console.log(query);
    setSearchQuery(query);
    setCurrPage(1);
  }, 500);

  return (
    <div className="font-poppins text-c-birdong bg-header-kalori bg-cover min-h-screen">
      <Navbar />

      <div className="h-[276px] w-full">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-5xl lg:text-7xl mt-32">
            Kalkulator Kalori
          </h1>
        </div>
      </div>

      <form
        className="max-w-xl lg:mx-auto mx-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium sr-only"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg focus:border-c-orentua focus:outline-none"
            placeholder="Cari makanan..."
            onChange={(e) => handleSearchQueryChange(e.target.value)}
          />
          <div className="text-white absolute end-2.5 bottom-2.5 bg-c-orenmuda focus:ring-4 focus:outline-none focus:ring-c-orentua font-medium rounded-lg text-sm px-4 py-2">
            <Search style={{ fontSize: "18px" }}></Search>
          </div>
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
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                portion
              </th>
              <th scope="col" className="px-6 py-3">
                Kalori (kal)
              </th>
            </tr>
          </thead>
          <tbody>
            {foodsData.map((row, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-right text-c-orenmuda">
                  <button onClick={() => handleAddFood(row)}>Tambah</button>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {row.name}
                </th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">{row.portion}</td>
                <td className="px-6 py-4">{row.calories}</td>
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
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                portion
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
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {row.name}
                </th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={row.portion}
                    onChange={(e) =>
                      handleportionChange(index, parseInt(e.target.value))
                    }
                    className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-c-orentua"
                    min="1"
                  />
                </td>
                <td className="px-6 py-4">{row.calories * row.portion}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-c-orentua bg-white">
              <td className="px-6 py-3"></td>
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">{totalportion}</td>
              <td className="px-6 py-3">{totalKalori}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Kalori;
