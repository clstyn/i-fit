import { useCallback, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import { AppContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import {
  ControlPoint,
  LocalFireDepartmentOutlined,
  TimerOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

const Resep = () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState("all");
  const { token, isLogged } = useContext(AppContext);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      if (mode === "all") {
        const response = await axios.get(
          `https://i-fit-be.vercel.app/post?tag=${selectedTag}&search=${searchQuery}`
        );
        if (response.status === 200) {
          setRecipes(response.data.recipes);
        }
      }

      if (mode === "my") {
        const response = await axios.get(
          `https://i-fit-be.vercel.app/post/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setRecipes(response.data.recipes);
        }
      }

      if (mode === "liked") {
        const response = await axios.get(
          `https://i-fit-be.vercel.app/post/liked`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setRecipes(response.data.recipes);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedTag, searchQuery, mode, token]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  return (
    <div className="font-poppins text-c-birdong pb-10">
      <Navbar />

      <div className="h-[216px] w-full pb-20">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-5xl lg:text-7xl mt-32">
            Resep Kreatif
          </h1>
        </div>
      </div>

      <Link
        to={"/tambah-resep"}
        className="z-50 fixed right-10 bottom-10 text-c-orentua cursor-pointer hover:scale-105"
      >
        <ControlPoint style={{ fontSize: "78px" }}></ControlPoint>
      </Link>

      <div className="w-5/6 mx-auto flex flex-col lg:flex-row justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-md">
          <div
            onClick={() => {
              setSelectedTag("");
              setMode("all");
            }}
            className={`rounded-full border-2 border-c-orentua ${
              selectedTag === "" && mode === "all"
                ? "bg-c-orentua text-white"
                : "text-c-orentua"
            }`}
          >
            <p className="p-2">Semua</p>
          </div>
          <div
            onClick={() => {
              setSelectedTag("minuman");
              setMode("all");
            }}
            className={`rounded-full border-2 border-c-orentua ${
              selectedTag === "minuman"
                ? "bg-c-orentua text-white"
                : "text-c-orentua"
            }`}
          >
            <p className="p-2">Minuman</p>
          </div>
          <div
            onClick={() => {
              setSelectedTag("hidangan");
              setMode("all");
            }}
            className={`rounded-full border-2 border-c-orentua ${
              selectedTag === "hidangan"
                ? "bg-c-orentua text-white"
                : "text-c-orentua"
            }`}
          >
            <p className="p-2">Hidangan Utama</p>
          </div>
          <div
            onClick={() => {
              setSelectedTag("camilan");
              setMode("all");
            }}
            className={`rounded-full border-2 border-c-orentua ${
              selectedTag === "camilan"
                ? "bg-c-orentua text-white"
                : "text-c-orentua"
            }`}
          >
            <p className="p-2">Camilan</p>
          </div>
          <div
            onClick={() => {
              if (isLogged === false) {
                toast.error("Anda harus login terlebih dahulu");
                return;
              }
              setSelectedTag("");
              setMode("liked");
            }}
            className={`rounded-full border-2 border-c-orentua ${
              mode === "liked" ? "bg-c-orentua text-white" : "text-c-orentua"
            }`}
          >
            <p className="p-2">Disukai</p>
          </div>
          <div
            onClick={() => {
              if (isLogged === false) {
                toast.error("Anda harus login terlebih dahulu");
                return;
              }
              setSelectedTag("");
              setMode("my");
            }}
            className={`rounded-full border-2 border-c-orentua ${
              mode === "my" ? "bg-c-orentua text-white" : "text-c-orentua"
            }`}
          >
            <p className="p-2">Menu Saya</p>
          </div>
        </div>

        <input
          onChange={(e) => handleChange(e.target.value)}
          className="focus:outline-none rounded-2xl border-2 border-c-orentua p-2 w-full lg:w-1/4"
          placeholder="Cari resep..."
        />
      </div>

      <div className="w-5/6 mx-auto my-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!loading ? (
          recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <CardResep key={index} recipe={recipe} />
            ))
          ) : (
            <p className="text-center py-4 text-md">Tidak ada data</p>
          )
        ) : (
          <p className="text-center py-4 text-md">Memuat data...</p>
        )}
      </div>
    </div>
  );
};

const CardResep = ({ recipe }) => {
  const calories = recipe.bahan.reduce((acc, curr) => {
    return acc + curr.kalori;
  }, 0);

  return (
    <div className="rounded-2xl shadow flex flex-col">
      <img
        src={recipe.picUrl}
        alt=""
        className="w-full h-full object-cover rounded-t-2xl"
      />
      <div className="relative min-h-fit bg-white rounded-b-2xl px-4 py-2">
        <p className="text-sm">{recipe.author.username}</p>
        <Link
          to={`/detail-resep/${recipe._id}`}
          className="text-md font-semibold mt-2"
        >
          {recipe.title}
        </Link>

        <div className="flex justify-between text-c-birdong/70">
          <p className="text-sm">
            <span className="text-c-orentua mr-1">
              <LocalFireDepartmentOutlined className="inline w-6 h-6"></LocalFireDepartmentOutlined>
            </span>
            {calories} kalori
          </p>
          <p className="text-sm">
            <span className="text-c-orentua mr-1">
              <TimerOutlined className="inline w-6 h-6"></TimerOutlined>
            </span>
            {recipe.cookmin} menit
          </p>
          <p className="text-sm">
            <span className="text-c-orentua mr-1">
              <Favorite className="inline w-6 h-6"></Favorite>
            </span>
            {recipe.like.length}
          </p>
        </div>
        <div className="absolute -top-8 right-4 p-6 bg-white w-16 h-16 rounded-full text-red-600 shadow-lg flex items-center justify-center right-0">
          <FavoriteBorder
            style={{
              fontSize: "32px",
            }}
          ></FavoriteBorder>
        </div>
      </div>
    </div>
  );
};

export default Resep;
