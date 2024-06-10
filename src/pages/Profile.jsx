import { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AppContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import DummyPp from "../assets/pp-dummy.png";
import BasicButton from "../components/BasicButton";
import { Edit, HourglassBottom } from "@mui/icons-material";

const Profile = () => {
  const { logout, userId, isLogged, token, setGlobalUser } =
    useContext(AppContext);
  const [loadingData, setLoadingData] = useState(true);
  const [myrecipe, setMyrecipe] = useState([]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingChangePass, setLoadingChangePass] = useState(false);
  const [loadingEditFoto, setLoadingEditFoto] = useState(false);
  const [user, setUser] = useState({});
  const [imgFile, setImgFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [editForm, setEditForm] = useState({
    fullname: "",
    username: "",
  });

  const [changePassForm, setChangePassForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchData = useCallback(async () => {
    console.log("fetching data");
    try {
      const userResponse = await fetch(
        "https://i-fit-be.vercel.app/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await userResponse.json();
      setUser(userData.user);
      setEditForm({
        username: userData.user.username,
        fullname: userData.user.fullname,
      });
      localStorage.setItem("user", JSON.stringify(userData.user));
      setGlobalUser(userData.user);
      setLoadingData(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengambil data");
    }
  }, [token, setGlobalUser]);

  const fetchMyRecipe = useCallback(async () => {
    console.log("fetching resep");
    const recipeResponse = await axios.get(
      `https://i-fit-be.vercel.app/post/my`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (recipeResponse.status === 200) {
      setMyrecipe(recipeResponse.data.recipes);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
    fetchMyRecipe();
  }, [fetchData, fetchMyRecipe]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setChangePassForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (
      changePassForm.confirmPassword &&
      changePassForm.newPassword !== changePassForm.confirmPassword
    ) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [changePassForm.newPassword, changePassForm.confirmPassword]);

  const handleEditSave = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      const response = await axios.post(
        "https://i-fit-be.vercel.app/auth/update-account",
        {
          fullname: editForm.fullname,
          username: editForm.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Data berhasil diubah");
      }
    } catch (err) {
      toast.error("Gagal mengubah data");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleChangePassSave = async (e) => {
    e.preventDefault();
    setLoadingChangePass(true);

    try {
      if (changePassForm.newPassword !== changePassForm.confirmPassword) {
        confirmPasswordError("Konfirmasi kata sandi baru tidak sama");
        return;
      }
      console.log(token);

      const response = await axios.post(
        "https://i-fit-be.vercel.app/auth/change-password",
        {
          oldPassword: changePassForm.oldPassword,
          newPassword: changePassForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Kata sandi berhasil diubah");
        setChangePassForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengubah kata sandi");
    } finally {
      setLoadingChangePass(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    logout(userId);
    toast.success("Anda keluar");
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      setImgFile(file);
      setLoadingEditFoto(true);
      try {
        const storageRef = ref(storage, `profilePics/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        const response = await axios.post(
          "https://i-fit-be.vercel.app/auth/changepic",
          { imageUrl: url },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Foto berhasil diubah");
          fetchData();
        }
      } catch (err) {
        toast.error("Gagal mengubah foto");
      } finally {
        setLoadingEditFoto(false);
      }
    }
  };

  if (!isLogged) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="font-poppins">
      <Navbar />

      <div className="h-[316px] w-full bg-header-profile bg-cover">
        <div className="bg-white rounded-2xl min-h-fit w-5/6 mx-auto translate-y-36 drop-shadow-md px-12 py-6 flex flex-col lg:flex-row justify-between items-center">
          <div className="relative">
            <img
              src={user?.picUrl || DummyPp}
              alt="Profile"
              className="rounded-full h-48"
            />
            <label
              htmlFor="ppInput"
              className="absolute right-0 top-0 bg-gradient-to-br from-[#F8905B] to-c-orentua rounded-full font-medium lg:text-md w-fit p-1.5 lg:p-2.5 text-white mx-auto cursor-pointer"
            >
              {loadingEditFoto ? (
                <HourglassBottom className="animate-spin"></HourglassBottom>
              ) : (
                <Edit></Edit>
              )}
            </label>
          </div>
          <input
            disabled={loadingEditFoto}
            type="file"
            id="ppInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="flex flex-col gap-3 items-center lg:items-end">
            <p className="text-2xl lg:text-3xl lg:text-4xl font-semibold">
              {loadingData ? "Loading data.." : user.fullname}
            </p>
            <p className="text-xl text-center lg:text-right font-medium opacity-70">
              Bergabung sejak {user?.joined}
            </p>
          </div>
        </div>
      </div>

      <div className="w-5/6 mx-auto flex flex-col lg:flex-row gap-16 my-24">
        <div>
          <div className="lg:sticky pt-32 lg:pt-0 top-28 flex flex-col gap-12">
            <form
              onSubmit={handleEditSave}
              className="rounded-lg shadow-md p-8 flex flex-col gap-2"
            >
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                value={editForm.fullname}
                onChange={handleEditChange}
                name="fullname"
              />
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="username"
                value={editForm.username}
                onChange={handleEditChange}
                name="username"
              />
              <input
                disabled
                className="px-2 py-1 border-b border-c-birdong"
                type="email"
                placeholder={user?.email}
                name="email"
              />
              <button
                disabled={loadingEdit}
                className="bg-c-hijautua rounded-full p-3 lg:p-4 text-white font-semibold mt-4 w-fit mx-auto"
              >
                {loadingEdit ? "Loading..." : "Ubah Data"}
              </button>
            </form>

            <form
              onSubmit={handleChangePassSave}
              className="rounded-lg shadow-md p-8 flex flex-col gap-2"
            >
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                placeholder="Kata sandi lama"
                value={changePassForm.oldPassword}
                onChange={handlePassChange}
                name="oldPassword"
              />
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                placeholder="Kata sandi baru"
                value={changePassForm.newPassword}
                onChange={handlePassChange}
                name="newPassword"
              />
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                value={changePassForm.confirmPassword}
                onChange={handlePassChange}
                placeholder="Konfirmasi kata sandi baru"
                name="confirmPassword"
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              )}
              <button
                disabled={loadingChangePass}
                className="bg-c-hijaumedium rounded-full p-3 lg:p-4 text-white font-semibold mt-4 w-fit mx-auto"
              >
                {loadingChangePass ? "Loading..." : "Ubah Kata Sandi"}
              </button>
            </form>

            <BasicButton
              onClick={handleLogout}
              text="Logout"
              type="button"
              className="w-full bg-c-orentua rounded-lg text-center text-white text-xl font-semibold p-4"
            />
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-20 lg:w-full">
          <div className="w-full">
            <h3 className="font-semibold text-xl lg:text-2xl">
              Riwayat BMI Terakhir
            </h3>
            <div className="grid grid-cols-3 gap-4 h-40 mt-4">
              {user?.bmis?.length > 0 ? (
                user.bmis.map((bmi) => (
                  <div
                    key={bmi._id}
                    className="flex flex-col shadow rounded-lg"
                  >
                    <div className="bg-gradient-to-br from-c-orentua to-white rounded-t-lg text-center text-white text-2xl lg:text-4xl font-semibold py-8">
                      {bmi.value}
                    </div>
                    <div className="font-medium text-md lg:text-xl text-birdong pl-4 mt-2">
                      {bmi.category}
                    </div>
                    <div className="text-xs text-birdong opacity-70 pl-4">
                      {formatDate(bmi.date)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">Belum ada data</p>
              )}
            </div>
          </div>

          <div className="w-full">
            <h3 className="font-semibold text-xl lg:text-2xl">
              Riwayat AKG Terakhir <span className="font-normal">(kal)</span>
            </h3>
            <div className="grid grid-cols-3 gap-4 h-40 mt-4">
              {user?.akgs?.length > 0 ? (
                user.akgs.map((akg) => (
                  <div
                    key={akg._id}
                    className="flex flex-col shadow rounded-lg"
                  >
                    <div className="bg-gradient-to-br from-c-hijautua to-white rounded-t-lg text-center text-white text-2xl lg:text-4xl font-semibold py-8">
                      {akg.value}
                    </div>
                    <div className="text-xs text-birdong opacity-70 pl-4 mt-2">
                      {formatDate(akg.date)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">Belum ada data</p>
              )}
            </div>
          </div>

          <div className="w-full">
            <h3 className="font-semibold text-2xl">Postingan Saya</h3>

            {myrecipe.map((post) => (
              <CardPostingan
                key={post.id}
                post={post}
                pic={user.picUrl}
                name={user.fullname}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CardPostingan = ({ post, pic, name }) => {
  return (
    <div className="rounded-xl border border-c-hijautua/75 p-6 flex flex-col lg:flex-row my-4 gap-4">
      <div className="flex-1 content-center">
        <p className="text-xl font-medium">{post.title}</p>
        <p className="my-4">{post.desc}</p>
        <div className="flex gap-4 items-center">
          <img src={pic} alt="Profile" className="w-10 h-10 rounded-full" />
          <p className="text-lg">{name}</p>
        </div>
      </div>
      <div className="w-full lg:w-1/3 h-48 rounded-lg bg-gray-500">
        <img
          src={post.picUrl}
          alt="post"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // Get the full month name
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default Profile;
