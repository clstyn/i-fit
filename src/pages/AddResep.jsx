import { useEffect, useState } from "react";
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
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    portion: 0,
    picUrl: "",
    cookmin: 0,
    bahan: [],
    langkah: [],
    tag: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeNumber = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const [bahanCount, setBahanCount] = useState(1);
  const [langkahCount, setLangkahCount] = useState(1);

  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />
      <div className="h-[576px] w-full">
        <img
          src={HeaderImg}
          alt="placeholder"
          className="w-full h-full object-cover"
        />
        <div className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-xl w-fit p-4 text-white mx-auto -translate-y-[50%]">
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

      <div className="flex w-5/6 mx-auto flex-col gap-8 text-xl font-semibold my-12">
        <div className="flex flex-col gap-2">
          <p>Judul Masakan</p>
          <input
            type="text"
            value={formData.title}
            name="title"
            id="title"
            onChange={handleChangeText}
            className="border-2 border-c-hijautua rounded-lg p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Deskripsi</p>
          <textarea
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChangeText}
            className="border-2 border-c-hijautua rounded-lg p-4"
          ></textarea>
        </div>

        <div className="flex flex-col lg:flex-row w-full justify-between">
          <div className="flex items-center justify-center gap-4">
            <p>Porsi</p>
            <div className="flex flex-col items-center justify-center">
              <ArrowDropUp
                onClick={() =>
                  setFormData({ ...formData, portion: formData.portion + 1 })
                }
                style={{
                  fontSize: "56px",
                }}
              ></ArrowDropUp>
              <input
                value={formData.portion}
                onChange={handleChangeNumber}
                name="portion"
                type="number"
                className="bg-c-hijautua rounded-lg p-2 text-white w-16"
              />

              <ArrowDropDown
                onClick={() =>
                  setFormData({ ...formData, portion: formData.portion - 1 })
                }
                style={{
                  fontSize: "56px",
                }}
              ></ArrowDropDown>
            </div>
            <p className="font-normal">orang</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p>Lama Memasak</p>
            <div className="flex flex-col items-center justify-center">
              <ArrowDropUp
                onClick={() =>
                  setFormData({ ...formData, cookmin: formData.cookmin + 1 })
                }
                style={{
                  fontSize: "56px",
                }}
              ></ArrowDropUp>
              <input
                value={formData.cookmin}
                onChange={handleChangeNumber}
                name="cookmin"
                type="number"
                className="bg-c-hijautua rounded-lg p-2 text-white w-16"
              />

              <ArrowDropDown
                onClick={() =>
                  setFormData({ ...formData, cookmin: formData.cookmin - 1 })
                }
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
            formData.bahan.length === bahanCount - 1 ? (
              <>
                {formData.bahan.map((bhn, idx) => (
                  <InputBahan nomor={idx + 1} key={idx} value={bhn} />
                ))}
                <InputBahan nomor={bahanCount} />
              </>
            ) : (
              <InputBahan nomor={1} />
            )
          ) : null}

          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-xl w-fit p-3 text-white">
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
            formData.langkah.length === langkahCount - 1 ? (
              <>
                {formData.langkah.map((bhn, idx) => (
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

        <button className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-xl w-full py-6 text-white shadow-xl mt-8">
          Unggah Resep
        </button>
      </div>
    </div>
  );
};

const InputBahan = (nomor, value) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-5/6 font-regular items-center">
      <div className="flex flex-col lg:flex-row gap-4 w-full items-center">
        <input
          className="rounded-lg border-2 border-c-hijautua p-4 text-xl w-full lg:w-1/2"
          placeholder="Nama Bahan"
        />
        <div className="flex gap-4 w-full lg:w-1/2 items-center">
          <input
            className="rounded-lg border-2 border-c-hijautua p-4 text-xl w-full lg:w-1/2"
            placeholder="Satuan"
          />
          <input
            className="rounded-lg border-2 border-c-hijautua p-4 text-xl w-full lg:w-1/2"
            placeholder="Kalori"
          />
          <Close
            className="text-c-hijautua"
            style={{ fontSize: "40px" }}
          ></Close>
        </div>
      </div>
    </div>
  );
};

const InputLangkah = ({ nomor, value }) => {
  return (
    <div className="flex gap-4 w-full lg:w-5/6 items-center font-normal">
      <div className="w-7 h-7 rounded-full bg-c-orentua text-white text-2xl flex items-center justify-center">
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
