import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/appContext";
import PopupImage from "../components/PopupImage"; // Komponen popup untuk menampilkan gambar lebih besar
import { Icon } from "@iconify-icon/react";
import { Favorite, FavoriteBorder, Edit, Delete } from "@mui/icons-material";

const RecipeDetail = () => {
  const { user, token, isLogged } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [calories, setCalories] = useState(0);
  const [recipe, setRecipe] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLike = async () => {
    if (!isLogged) {
      toast.error("Anda harus login terlebih dahulu");
      return;
    }

    try {
      const res = await axios.post(
        `https://i-fit-be.vercel.app/post/${id}/handlelike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Apakah Anda ingin menghapus resep ini?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://i-fit-be.vercel.app/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
      }
      navigate("/resep");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDetailRecipe = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://i-fit-be.vercel.app/post/${id}`
      );
      if (response.status === 200) {
        console.log(response.data.recipe);
        setRecipe(response.data.recipe);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetailRecipe();
  }, [fetchDetailRecipe]);

  useEffect(() => {
    const totalCal = recipe?.bahan.reduce((acc, curr) => {
      return acc + curr.kalori;
    }, 0);
    setCalories(totalCal);
  }, [recipe]);

  if (loading) {
    return (
      <div className="font-poppins text-c-birdong pb-10">
        <Navbar />
        <div className="relative h-96 bg-c-hijautua bg-center flex justify-center items-center cursor-pointer">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="relative text-white text-4xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="font-poppins text-c-birdong pb-10">
        <Navbar />
        <div className="relative h-96 bg-c-hijautua bg-center flex justify-center items-center cursor-pointer">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="relative text-white text-4xl font-bold">
            Resep tidak ditemukan
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins text-c-birdong pb-10">
      <Navbar />

      <div
        className="relative h-96 bg-cover bg-center flex justify-center items-center cursor-pointer"
        style={{ backgroundImage: `url(${recipe.picUrl})` }}
        onClick={handleImageClick}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-white text-4xl font-bold">
          {recipe.title}
        </h1>
      </div>
      {isPopupOpen && (
        <PopupImage imageUrl={recipe.picUrl} onClose={handleClosePopup} />
      )}
      <div className="container mx-auto p-10">
        <div className="flex mb-2 lg:mb-4 gap-4">
          <button
            onClick={handleLike}
            className="text-green-600 border-2 border-green-600 rounded-full p-2 font-medium"
          >
            {isLogged ? (
              recipe.like.includes(user._id) ? (
                <Favorite className="mr-2"></Favorite>
              ) : (
                <FavoriteBorder className="mr-2"></FavoriteBorder>
              )
            ) : (
              <FavoriteBorder className="mr-2"></FavoriteBorder>
            )}
            Like
          </button>
          {isLogged && recipe.author === user._id && (
            <>
              <Link
                to={`/edit-resep/${id}`}
                className="text-yellow-600 border-2 border-yellow-600 rounded-full p-2 font-medium"
              >
                <Edit className="mr-2"></Edit>
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 border-2 border-red-600 rounded-full p-2 font-medium"
              >
                <Delete className="mr-2"></Delete>
                Hapus
              </button>
            </>
          )}
        </div>
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
                {recipe.cookmin}
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
                {calories}
              </p>
            </div>
          </div>
        </div>
        <p className="indent-5 text-justify font-poppins font-normal text-c-birdong text-xl mb-10">
          {recipe.desc}
        </p>
        <div className="container-bahan">
          <h2 className="text-2xl font-bold mb-4 font-poppins text-c-birdong">
            Bahan-bahan
          </h2>
          <ul className="mb-8 lg:w-1/2">
            {recipe.bahan.map((bhn, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 mb-2 bg-c-hijautua bg-opacity-50 rounded-xl border border-c-hijautua"
              >
                <div className="w-full flex space-x-4 text-c-birdong font-poppins font-normal text-xl items-center">
                  <span className="w-1/3 text-left">{bhn.nama}</span>
                  <span className="w-1/3 text-center">{bhn.satuan}</span>
                  <span className="w-1/3 text-right">{bhn.kalori} kalori</span>
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
            {recipe.langkah.map((lkh, index) => (
              <li key={index} className="mb-4 relative pl-12">
                <div className="flex gap-x-4 items-center">
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-c-hijautua bg-opacity-50 border border-c-hijautua">
                    {index + 1}
                  </span>
                  <div className="w-full p-4 rounded-lg border border-c-hijautua">
                    {lkh.text}
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
