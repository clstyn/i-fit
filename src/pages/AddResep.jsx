import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/Navbar";
import HeaderImg from "../assets/add-resep-header.png";

import {
  AddAPhoto,
  Add,
  ArrowDropUp,
  ArrowDropDown,
  Close,
} from "@mui/icons-material";
import { AppContext } from "../context/appContext";
import { toast } from "react-toastify";

const AddResep = () => {
  const { token, isLogged } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
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

  const [bahan, setBahan] = useState({
    id: 0,
    nama: "",
    satuan: "",
    kalori: 0,
  });

  const [langkah, setLangkah] = useState({
    id: 0,
    text: "",
  });

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(langkah);
  }, [langkah]);

  const handleChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeNumber = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleChangeInputBahan = (e) => {
    const { name, value } = e.target;
    setBahan((prevBahan) => ({
      ...prevBahan,
      id: bahanRowShowed,
      [name]: name === "kalori" ? parseInt(value, 10) : value,
    }));
  };

  const handleChangeInputLangkah = (e) => {
    const { name, value } = e.target;
    setLangkah((prevLkh) => ({
      ...prevLkh,
      id: langkahRowShowed,
      [name]: value,
    }));
  };

  const handleAddLangkah = (value) => {
    if (langkah.id === 0) {
      toast.error("Isikan langkah terlebih dahulu");
      return;
    }

    setFormData((prevState) => {
      let newLangkah = JSON.parse(JSON.stringify(prevState.langkah));
      newLangkah.push(langkah);
      return { ...prevState, langkah: newLangkah };
    });
    setLangkah({
      id: 0,
      text: "",
    });
    setLangkahRowShowed(langkahRowShowed + 1);
  };

  const handleRemoveLangkah = (id) => {
    setFormData((prevState) => {
      let newLangkah = JSON.parse(JSON.stringify(prevState.langkah));
      newLangkah = newLangkah.filter((lkh) => lkh.id !== id);
      return { ...prevState, langkah: newLangkah };
    });
    setLangkahRowShowed(langkahRowShowed - 1);
  };

  const handleAddBahan = (value) => {
    if (bahan.id === 0) {
      toast.error("Isikan bahan terlebih dahulu");
      return;
    }

    if (bahan.nama === "" || bahan.satuan === "" || bahan.kalori === 0) {
      toast.error("Isikan semua kolom");
      return;
    }

    if (bahan.kalori < 0) {
      toast.error("Kalori tidak boleh negatif");
      return;
    }

    setFormData((prevState) => {
      let newBahan = JSON.parse(JSON.stringify(prevState.bahan));
      newBahan.push(bahan);
      return { ...prevState, bahan: newBahan };
    });
    setBahan({
      id: 0,
      nama: "",
      satuan: "",
      kalori: 0,
    });
    setBahanRowShowed(bahanRowShowed + 1);
  };

  const handleRemoveBahan = (id) => {
    setFormData((prevState) => {
      let newBahan = JSON.parse(JSON.stringify(prevState.bahan));
      newBahan = newBahan.filter((bhn) => bhn.id !== id);
      return { ...prevState, bahan: newBahan };
    });
    setBahanRowShowed(bahanRowShowed - 1);
  };

  const [bahanRowShowed, setBahanRowShowed] = useState(1);
  const [langkahRowShowed, setLangkahRowShowed] = useState(1);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.desc === "" ||
      formData.bahan.length === 0 ||
      formData.langkah.length === 0 ||
      formData.portion === 0 ||
      formData.cookmin === 0
    ) {
      toast.error("Isikan semua data dengan benar");
      return;
    }

    if (formData.portion < 0 || formData.cookmin < 0) {
      toast.error("Porsi dan waktu tidak boleh negatif");
      return;
    }

    setLoading(true);
    try {
      if (!imageFile) {
        toast.error("Harus menambahkan gambar");
        return;
      }

      const storageRef = ref(storage, `recipeImg/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);

      const updatedFormData = {
        ...formData,
        picUrl: url,
      };

      const response = await axios.post(
        "https://i-fit-be.vercel.app/post/",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      navigate("/resep");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLogged) {
    toast.error("Anda perlu masuk");
    return <Navigate to="/login" />;
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />
      <div className="h-[576px] w-full relative">
        <img
          src={image || HeaderImg}
          alt="placeholder"
          className="w-full h-full object-cover"
        />
        <div className="w-full flex items-center justify-center">
          <label
            htmlFor="imageInput"
            className="bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-md lg:text-xl w-fit p-3 lg:p-4 text-white mx-auto -translate-y-[50%] cursor-pointer"
          >
            <span>
              <AddAPhoto
                className="inline mr-2"
                style={{
                  fontSize: "28px",
                }}
              />
            </span>
            Tambahkan Foto Makanan
          </label>
        </div>

        <input
          type="file"
          id="imageInput"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex w-5/6 mx-auto flex-col gap-5 text-md lg:text-xl font-semibold my-12">
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
          <div className="flex items-center justify-start gap-4">
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
          <div className="flex items-center justify-start gap-4">
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

        <div>
          <p>Tandai</p>
          <div className="flex gap-2 md:gap-6 mb-4">
            <label className="mt-2">
              <input
                type="radio"
                name="tag"
                value="minuman"
                checked={formData.tag === "minuman"}
                onChange={handleChangeText}
                className="mr-2"
              />
              Minuman
            </label>
            <label className="mt-2">
              <input
                type="radio"
                name="tag"
                value="camilan"
                checked={formData.tag === "camilan"}
                onChange={handleChangeText}
                className="mr-2"
              />
              Camilan
            </label>
            <label className="mt-2">
              <input
                type="radio"
                name="tag"
                value="hidangan"
                checked={formData.tag === "hidangan"}
                onChange={handleChangeText}
                className="mr-2"
              />
              Hidangan
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Bahan - bahan</p>

          {bahanRowShowed > 0 && (
            <>
              {formData.bahan.map((bhn, idx) => (
                <InputBahan
                  nomor={idx + 1}
                  key={bhn.id}
                  value={bhn}
                  handleChange={handleChangeInputBahan}
                  handleRemove={() => handleRemoveBahan(bhn.id)}
                />
              ))}
              <p className="text-xs font-normal">
                Klik "Tambahkan" untuk menyimpan data bahan.
              </p>
              <InputBahan
                nomor={bahanRowShowed}
                value={bahan}
                handleChange={handleChangeInputBahan}
              />
            </>
          )}
          <div
            onClick={handleAddBahan}
            className="cursor-pointer bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-md lg:text-xl w-fit p-3 text-white"
          >
            <span>
              <Add
                className="inline mr-2"
                style={{
                  fontSize: "28px",
                }}
              ></Add>
            </span>
            Tambahkan
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Langkah - langkah</p>

          {langkahRowShowed > 0 && (
            <>
              {formData.langkah.map((lkh, idx) => (
                <InputLangkah
                  nomor={idx + 1}
                  key={lkh.id}
                  value={lkh}
                  handleChange={handleChangeInputLangkah}
                  handleRemove={() => handleRemoveLangkah(lkh.id)}
                />
              ))}
              <p className="text-xs font-normal">
                Klik "Tambahkan" untuk menyimpan data langkah.
              </p>
              <InputLangkah
                nomor={langkahRowShowed}
                value={langkah}
                handleChange={handleChangeInputLangkah}
              />
            </>
          )}

          <div
            onClick={handleAddLangkah}
            className="cursor-pointer bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-md lg:text-xl w-fit p-3 text-white"
          >
            <span>
              <Add
                className="inline mr-2"
                style={{
                  fontSize: "28px",
                }}
              ></Add>
            </span>
            Tambahkan
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className={`${
            loading && "cursor-not-allowed"
          } bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-2xl font-semibold text-xl w-full py-3 lg:py-6 text-white shadow-xl mt-8`}
        >
          {loading ? "Loading..." : "Unggah Resep"}
        </button>
      </div>
    </div>
  );
};

const InputBahan = ({ nomor, value, handleChange, handleRemove }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-5/6 font-normal items-center">
      <div className="flex flex-col lg:flex-row gap-4 w-full items-center">
        <input
          type="text"
          className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-xl w-full lg:w-1/2"
          placeholder="Nama Bahan"
          name="nama"
          onChange={handleChange}
          value={value.nama}
        />
        <div className="flex gap-4 w-full lg:w-1/2 items-center">
          <input
            type="text"
            className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-xl w-full lg:w-1/2"
            placeholder="Satuan"
            name="satuan"
            onChange={handleChange}
            value={value.satuan}
          />
          <input
            type="number"
            className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-xl w-full lg:w-1/2"
            placeholder="Kalori"
            name="kalori"
            onChange={handleChange}
            value={value.kalori}
          />
          {!!handleRemove && (
            <Close
              onClick={handleRemove}
              className="text-c-hijautua"
              style={{ fontSize: "40px" }}
            ></Close>
          )}
        </div>
      </div>
    </div>
  );
};

const InputLangkah = ({ nomor, value, handleChange, handleRemove }) => {
  return (
    <div className="flex gap-4 w-full lg:w-5/6 items-center font-normal">
      <div className="w-7 h-7 rounded-full bg-c-orentua text-white text-lg lg:text-2xl flex items-center justify-center">
        {nomor}
      </div>
      <input
        value={value.text}
        name="text"
        onChange={handleChange}
        className="rounded-lg border-2 border-c-hijautua p-4 text-md lg:text-lg w-full"
        placeholder="Masukkan langkah pembuatan..."
      />{" "}
      {!!handleRemove && (
        <Close
          onClick={handleRemove}
          className="text-c-hijautua"
          style={{ fontSize: "40px" }}
        ></Close>
      )}
    </div>
  );
};

export default AddResep;
