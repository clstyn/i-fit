import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/slider/Slider";
import { ArrowDropDownCircle } from "@mui/icons-material";
import CalIcon from "../assets/icon-kalori.png";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";

const Rekomendasi = () => {
  const { token, isLogged } = useContext(AppContext);
  const [diets, setDiets] = useState([]);

  const [foods, setFoods] = useState([]);

  const [olahraga, setOlahraga] = useState([]);

  useEffect(() => {
    // Fetch recommendations
    console.log("ini masuk useEffect");
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://i-fit-be.vercel.app/recommend`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response data:", response.data);
        if (response.status === 200) {
          setDiets(response.data.diets);
          setFoods(response.data.foods);
          setOlahraga(response.data.olahraga);
          toast.success("berhasil");
        }
      } catch (error) {
        toast.error("There was an error fetching the recommendations!", error);
      }
    };

    fetchRecommendations();

    // Cleanup function
    return () => {
      setDiets([]);
      setFoods([]);
      setOlahraga([]);
    };
  }, [token]);

  return (
    <div className="font-poppins text-c-birdong bg-header-rekom bg-cover min-h-screen">
      <Navbar />

      <div className="h-[216px] w-full pb-20">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-5xl lg:text-7xl mt-32">
            Hasil Rekomendasi
          </h1>
        </div>
      </div>

      <div className="bg-white/80 rounded-xl shadow-lg w-5/6 mx-auto p-12">
        <h2 className="text-center font-semibold text-3xl lg:text-4xl pb-5">
          Jenis Diet
        </h2>
        <div className="flex lg:flex-row flex-col gap-6">
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

      <div
        id="olahraga"
        className="flex flex-col lg:flex-row gap-5 w-5/6 mx-auto my-20 justify-around"
      >
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <h2 className="text-xl lg:text-3xl font-semibold">Olahraga</h2>
          <p className="text-4xl lg:text-6xl font-kaushan text-center">
            Forearm Plank
          </p>
          <button className="font-semibold text-md lg:text-xl text-white bg-gradient-to-br from-[#FEB38E] to-c-orenmuda mt-4 rounded-full p-3 lg:p-4 w-fit">
            Baca Selengkapnya
          </button>
        </div>
        <div className="w-full lg:w-1/2">
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
        <h2 className="font-kaushan text-4xl lg:text-6xl text-center">
          Makanan
        </h2>
        <div className="grid min-h-fit grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-5/6 mx-auto gap-4 mt-12">
          {foods.map((food) => (
            <CardFood key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardDiet = ({ diet }) => {
  const getFirstSentence = (text) => {
    const firstPeriodIndex = text.indexOf(".");
    return firstPeriodIndex !== -1
      ? text.substring(0, firstPeriodIndex + 1)
      : text;
  };
  return (
    <div className="rounded-lg border border-c-birdong/50 p-8 flex flex-col w-1/3 h-[300px]">
      <div className="flex flex-col h-full">
        <p className="font-semibold text-2xl lg:text-3xl text-start">
          {diet.jenis_diet}
        </p>
        <p className="my-4 text-start">{getFirstSentence(diet.diet_desc)}</p>
        <div className="grow content-end">
          <button className="font-semibold text-md lg:text-xl rounded-full shadow bg-gradient-to-br from-[#AED9DA] to-c-hijaumedium text-white py-2 px-4 w-fit self-center">
            Selengkapnya
          </button>
        </div>
      </div>
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
