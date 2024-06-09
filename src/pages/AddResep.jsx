import { useState } from "react";
import Navbar from "../components/Navbar";
import HeaderImg from "../assets/add-resep-header.png";
import {
  AddAPhoto,
  Add,
  ArrowDropUp,
  ArrowDropDown,
  Close,
} from "@mui/icons-material";

const AddResep = () => {
  const [bahanCount, setBahanCount] = useState(1);
  const [langkahCount, setLangkahCount] = useState(1);
  const [bahan, setBahan] = useState([
    {
      id: 1,
      group: "Adonan",
    },
  ]);
  const [langkah, setLangkah] = useState([
    {
      id: 1,
      text: "Cut the pumpkin. Cut the skin off and scrape seeds out. Cut into chunks.",
    },
    {
      id: 2,
      text: "Cut the pumpkin. Cut the skin off and scrape seeds out. Cut into chunks.",
    },
    {
      id: 3,
      text: "Cut the pumpkin. Cut the skin off and scrape seeds out. Cut into chunks.",
    },
  ]);

  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />
      <div className="h-[576px] w-full">
        <img
          src={HeaderImg}
          alt="placeholder"
          className="w-full h-full object-cover"
        />
        <div className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-md lg:text-xl w-fit p-3 lg:p-4 text-white mx-auto -translate-y-[50%]">
          <span>
            <AddAPhoto
              className="inline mr-2"
              style={{
                fontSize: "28px",
              }}
            ></AddAPhoto>
          </span>
          Tambahkan Foto Makanan
        </div>
      </div>

      <div className="flex w-5/6 mx-auto flex-col gap-5 text-md lg:text-xl font-semibold my-12">
        <div className="flex flex-col gap-2">
          <p>Judul Masakan</p>
          <input
            type="text"
            className="border-2 border-c-hijautua rounded-lg p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Deskripsi</p>
          <textarea
            name="desc"
            id="desc"
            className="border-2 border-c-hijautua rounded-lg p-4"
          ></textarea>
        </div>

        <div className="flex flex-col lg:flex-row w-full justify-between">
          <div className="flex items-center justify-start gap-4">
            <p>Porsi</p>
            <div className="flex flex-col items-center justify-center">
              <ArrowDropUp
                style={{
                  fontSize: "56px",
                }}
              ></ArrowDropUp>
              <div className="bg-c-hijautua rounded-lg px-4 py-2 text-white">
                0
              </div>
              <ArrowDropDown
                style={{
                  fontSize: "56px",
                }}
              ></ArrowDropDown>
            </div>
            <p className="font-normal">orang</p>
          </div>
          <div className="flex items-center justify-start gap-4">
            <p>Lama Memasak</p>
            <div className="flex flex-col items-center justify-center">
              <ArrowDropUp
                style={{
                  fontSize: "56px",
                }}
              ></ArrowDropUp>
              <div className="bg-c-hijautua rounded-lg px-4 py-2 text-white">
                0
              </div>
              <ArrowDropDown
                style={{
                  fontSize: "56px",
                }}
              ></ArrowDropDown>
            </div>
            <p className="font-normal">menit</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Bahan - bahan</p>

          {bahanCount > 0 ? (
            bahan.length === bahanCount - 1 ? (
              <>
                {bahan.map((bhn, idx) => (
                  <InputBahan nomor={idx + 1} key={idx} value={bhn} />
                ))}
                <InputBahan nomor={bahanCount} />
              </>
            ) : (
              <InputBahan nomor={1} />
            )
          ) : null}

          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-md lg:text-xl w-fit p-3 text-white">
              <span>
                <Add
                  className="inline mr-2"
                  style={{
                    fontSize: "28px",
                  }}
                ></Add>
              </span>
              Bahan
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Langkah - langkah</p>

          {langkahCount > 0 ? (
            langkah.length === langkahCount - 1 ? (
              <>
                {bahan.map((bhn, idx) => (
                  <InputLangkah nomor={idx + 1} key={idx} value={bhn} />
                ))}
                <InputLangkah nomor={langkahCount} />
              </>
            ) : (
              <InputLangkah nomor={1} />
            )
          ) : null}

          <div className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-md lg:text-xl w-fit p-3 text-white">
            <span>
              <Add
                className="inline mr-2"
                style={{
                  fontSize: "28px",
                }}
              ></Add>
            </span>
            Langkah
          </div>
        </div>

        <button className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-xl w-full py-3 lg:py-6 text-white shadow-xl mt-8">
          Unggah Resep
        </button>
      </div>
    </div>
  );
};

const InputBahan = (nomor, value) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-5/6 font-normal items-center">
      <div className="flex flex-col lg:flex-row gap-4 w-full items-center">
        <input
          className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-xl w-full lg:w-1/2"
          placeholder="Nama Bahan"
        />
        <div className="flex gap-4 w-full lg:w-1/2 items-center">
          <input
            className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-xl w-full lg:w-1/2"
            placeholder="Satuan"
          />
          <input
            className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-xl w-full lg:w-1/2"
            placeholder="Kalori"
          />
          <Close className="text-c-hijautua" style={{ fontSize: "40px" }}></Close>
        </div>
      </div>
    </div>  
  );
};

const InputLangkah = ({ nomor, value }) => {
  return (
    <div className="flex gap-4 w-full lg:w-5/6 items-center font-normal">
      <div className="w-7 h-7 rounded-full bg-c-orentua text-white text-lg lg:text-2xl flex items-center justify-center">
        {nomor}
      </div>
      <input
        className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-lg w-full"
        placeholder="Masukkan langkah pembuatan..."
      />
      <Close className="text-c-hijautua" style={{ fontSize: "40px" }}></Close>
    </div>
  );
};

export default AddResep;
