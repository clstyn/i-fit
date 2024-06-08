import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PopupImage from "../components/PopupImage"; // Komponen popup untuk menampilkan gambar lebih besar
import Food from "../assets/food-pic.png";
import { Icon } from "@iconify-icon/react";

const recipe = {
  imageUrl: Food,
  title: "Nama Resep",
  portion: "5",
  time: "15 menit",
  totalcalories: "350",
  desc: "Hai semuanya kali ini saya akan membagikan resep ayam betutu khas bali yang terkenal, tetapi dengan menggunakan minyak sedikit dan pastinya sehat.",
  ingredients: [
    { name: "Bawang Putih", amount: "2 siung", calories: "10" },
    { name: "Daging Ayam", amount: "200 gram", calories: "250" },
    { name: "Minyak Goreng", amount: "2 sdm", calories: "120" },
  ],
  steps: ["ini langkah 1", "ini langkah 2", "ini langkah 3"],
};

const RecipeDetail = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="font-poppins text-c-birdong pb-10">
      <Navbar />

      <div
        className="relative h-96 bg-cover bg-center flex justify-center items-center cursor-pointer"
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
        onClick={handleImageClick}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-white text-4xl font-bold">
          {recipe.title}
        </h1>
      </div>
      {isPopupOpen && (
        <PopupImage imageUrl={recipe.imageUrl} onClose={handleClosePopup} />
      )}
      <div className="container mx-auto p-10">
        <div className="flex flex-col lg:flex-row gap-x-4">
          <div className="w-auto h-14 bg-c-hijautua bg-opacity-50 p-4 mb-4 rounded-xl border border-c-hijautua">
            <div className="flex gap-x-4">
              <Icon
                icon="material-symbols:groups"
                className="text-c-birdong"
                width={"full"}
                height={"auto"}
              />
              <p className="font-poppins font-bold text-xl text-c-birdong">
                {recipe.portion}
              </p>
              <p className="font-poppins font-bold text-xl text-c-birdong">
                Porsi
              </p>              
            </div>
          </div>
          <div className="w-auto h-14 bg-c-hijautua bg-opacity-50 p-4 mb-4 rounded-xl border border-c-hijautua">
            <div className="flex gap-x-4">
              <Icon
                icon="material-symbols:timer-outline-rounded"
                className="text-c-birdong"
                width={"full"}
                height={"auto"}
              />
              <p className="font-poppins font-bold text-xl text-c-birdong">
                {recipe.time}
              </p>
            </div>
          </div>
          <div className="w-auto h-14 bg-c-hijautua bg-opacity-50 p-4 mb-4 rounded-xl border border-c-hijautua">
            <div className="flex gap-x-4">
              <Icon
                icon="material-symbols:mode-heat-outline-rounded"
                className="text-c-birdong"
                width={"full"}
                height={"auto"}
              />
              <p className="font-poppins font-bold text-xl text-c-birdong">
                Estimasi Kalori:
              </p>
              <p className="font-poppins font-bold text-xl text-c-birdong">
                {recipe.totalcalories}
              </p>
            </div>
          </div>
        </div>
        <p className="indent-5  text-justify font-poppins font-normal text-c-birdong text-xl mb-10">
          {recipe.desc}
        </p>
        <div className="container-bahan">
          <h2 className="text-2xl font-bold mb-4 font-poppins text-c-birdong">
            Bahan-bahan
          </h2>
          <ul className="mb-8 lg:w-1/2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 mb-2 bg-c-hijautua bg-opacity-50 rounded-xl border border-c-hijautua"
              >
                <div className="w-full flex space-x-4 text-c-birdong font-poppins font-normal text-xl items-center">
                  <span className="w-1/3 text-left">{ingredient.name}</span>
                  <span className="w-1/3 text-center">{ingredient.amount}</span>
                  <span className="w-1/3 text-right">{ingredient.calories} kalori</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="container langkah">
          <h2 className="text-2xl font-bold mb-4 font-poppins text-c-birdong">
            Langkah-langkah
          </h2>
          <ul>
            {recipe.steps.map((step, index) => (
              <li key={index} className="mb-4 relative pl-12">
                <div className="flex gap-x-4 items-center">
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-c-hijautua bg-opacity-50 border border-c-hijautua">
                    {index + 1}
                  </span>
                  <div className="w-full p-4 rounded-lg border border-c-hijautua">
                    {step}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
