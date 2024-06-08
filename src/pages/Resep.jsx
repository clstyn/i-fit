import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ControlPoint,
  LocalFireDepartmentOutlined,
  TimerOutlined,
  Favorite,
  FavoriteOutlined,
} from "@mui/icons-material";
import Dummy from "../assets/recipe-dummy.png";

const Resep = () => {
  return (
    <div className="font-poppins text-c-birdong pb-10">
      <Navbar />

      <div className="h-[216px] w-full pb-20">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-5xl lg:text-7xl mt-32">Resep Kreatif</h1>
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
          <div className="rounded-full border-2 border-c-orentua text-c-orentua">
            <p className="p-2">Semua</p>
          </div>
          <div className="rounded-full border-2 border-c-orentua text-c-orentua">
            <p className="p-2">Camilan</p>
          </div>
          <div className="rounded-full border-2 border-c-orentua text-c-orentua">
            <p className="p-2">Hidangan Utama</p>
          </div>
          <div className="rounded-full border-2 border-c-orentua text-c-orentua">
            <p className="p-2">Sarapan</p>
          </div>
          <div className="rounded-full border-2 border-c-orentua text-c-orentua">
            <p className="p-2">Disukai</p>
          </div>
          <div className="rounded-full border-2 border-c-orentua text-c-orentua">
            <p className="p-2">Menu Saya</p>
          </div>
        </div>

        <input
          className="focus:outline-none rounded-2xl border-4 border-c-orentua p-2 w-full lg:w-1/4"
          placeholder="Cari resep..."
        />
      </div>

      <div className="w-5/6 mx-auto my-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CardResep />
        <CardResep />
        <CardResep />
        <CardResep />
        <CardResep />
        <CardResep />
      </div>

    </div>
  );
};

const CardResep = () => {
  return (
    <div className="rounded-2xl shadow flex flex-col">
      <img
        src={Dummy}
        alt=""
        className="w-full h-full object-cover rounded-t-2xl"
      />
      <div className="relative h-1/4 bg-white rounded-b-2xl px-4 py-2">
        <p className="text-md">Siti Nur Khodijah</p>
        <p className="text-xl font-semibold mt-2">SUP LABU</p>

        <div className="flex justify-between text-c-birdong/70">
          <p className="text-md">
            <span className="text-c-orentua mr-1">
              <LocalFireDepartmentOutlined className="inline w-6 h-6"></LocalFireDepartmentOutlined>
            </span>
            350 kalori
          </p>
          <p className="text-md">
            <span className="text-c-orentua mr-1">
              <TimerOutlined className="inline w-6 h-6"></TimerOutlined>
            </span>
            15 menit
          </p>
          <p className="text-md">
            <span className="text-c-orentua mr-1">
              <Favorite className="inline w-6 h-6"></Favorite>
            </span>
            245
          </p>
        </div>
        <div className="absolute -top-8 right-4 p-6 bg-white w-16 h-16 rounded-full text-red-600 shadow-lg flex items-center justify-center right-0">
          <FavoriteOutlined
            style={{
              fontSize: "32px",
            }}
          ></FavoriteOutlined>
        </div>
      </div>
    </div>
  );
};

export default Resep;
