import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/slider/Slider";
import { ArrowDropDownCircle } from "@mui/icons-material";
import CalIcon from "../assets/icon-kalori.png";

const Rekomendasi = () => {
  const [diets, setDiets] = useState([
    {
      id: 1,
      title: "Diet Mediterania",
      description:
        "Terinspirasi pola makan suku Mediterania yang mengutamakan pangan berbasis tumbuhan.",
    },
    {
      id: 2,
      title: "Diet DASH",
      description:
        "Terinspirasi pola makan suku Mediterania yang mengutamakan pangan berbasis tumbuhan.",
    },
    {
      id: 3,
      title: "Diet Mayo",
      description:
        "Terinspirasi pola makan suku Mediterania yang mengutamakan pangan berbasis tumbuhan.",
    },
  ]);

  const [foods, setFoods] = useState([
    {
      id: 1,
      title: "Brokoli",
      kalori: 34,
      picUrl: "src/assets/brokoli.png",
    },
    {
      id: 2,
      title: "Brokoli",
      kalori: 34,
      picUrl: "src/assets/brokoli.png",
    },
    {
      id: 3,
      title: "Brokoli",
      kalori: 34,
      picUrl: "src/assets/brokoli.png",
    },
    {
      id: 4,
      title: "Brokoli",
      kalori: 34,
      picUrl: "src/assets/brokoli.png",
    },
    {
      id: 5,
      title: "Brokoli",
      kalori: 34,
      picUrl: "src/assets/brokoli.png",
    },
    {
      id: 6,
      title: "Brokoli",
      kalori: 34,
      picUrl: "src/assets/brokoli.png",
    },
  ]);

  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />

      <div className="h-[376px] w-full bg-header-rekom bg-cover">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-7xl">Hasil Rekomendasi</h1>
        </div>
      </div>

      <div className="bg-white/70 rounded-xl shadow-lg -translate-y-20 w-5/6 mx-auto p-12">
        <h2 className="text-center font-semibold text-4xl">Jenis Diet</h2>
        <div className="grid grid-cols-3 gap-8 mt-8">
          {diets.map((diet) => (
            <CardDiet key={diet.id} diet={diet} />
          ))}
        </div>
      </div>

      <div
        className="flex mx-auto mt-8 animate-bounce w-fit"
        onClick={() => {
          document.getElementById("olahraga").scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        <ArrowDropDownCircle
          className="cursor-pointer text-c-hijautua"
          style={{ fontSize: "40px" }}
        ></ArrowDropDownCircle>
      </div>

      <div id="olahraga" className="flex w-5/6 mx-auto my-20 justify-around">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Olahraga</h2>
          <p className="text-6xl font-kaushan">Forearm Plank</p>
          <button className="font-semibold text-xl text-white bg-gradient-to-br from-[#FEB38E] to-c-orenmuda mt-4 rounded-full p-4 w-fit">
            Baca Selengkapnya
          </button>
        </div>
        <div className="w-1/2">
          <Slider />
        </div>
      </div>

      <div
        className="flex mx-auto mt-8 animate-bounce w-fit"
        onClick={() => {
          document.getElementById("makanan").scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <ArrowDropDownCircle
          className="cursor-pointer text-c-orentua"
          style={{ fontSize: "36px" }}
        ></ArrowDropDownCircle>
      </div>

      <div id="makanan" className="bg-makanan-rekom bg-cover pt-40 py-24">
        <h2 className="font-kaushan text-6xl text-center">Makanan</h2>
        <div className="grid h-[560px] grid-cols-3 grid-row-3 w-5/6 mx-auto gap-4 mt-12">
          {foods.map((food) => (
            <CardFood key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardDiet = ({ diet }) => {
  return (
    <div className="rounded-lg border border-c-birdong/50 p-8 flex flex-col">
      <p className="font-semibold text-4xl">{diet.title}</p>

      <p className="my-4">{diet.description}</p>

      <button className="font-semibold text-xl rounded-full shadow bg-gradient-to-br from-[#AED9DA] to-c-hijaumedium text-white py-2 px-4 w-fit self-end">
        Selengkapnya
      </button>
    </div>
  );
};

const CardFood = ({ food }) => {
  return (
    <div
      className="rounded-lg border border-c-birdong/50 p-8 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${food.picUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="font-semibold text-2xl">{food.title}</p>

      <div className="flex gap-2 items-center">
        <img src={CalIcon} alt="icon" className="w-5 h-5" />
        <p className="my-4 font-medium">{food.kalori} kal</p>
      </div>
    </div>
  );
};
export default Rekomendasi;