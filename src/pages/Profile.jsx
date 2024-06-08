import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import DummyPp from "../assets/pp-dummy.png";
import PaginationControls from "../components/Pagination";

const Profile = () => {
  const { logout, userId, isLogged, token } = useContext(AppContext);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingChangePass, setLoadingChangePass] = useState(false);
  const [user, setUser] = useState({});

  const [editForm, setEditForm] = useState({
    fullname: "",
    username: "",
  });

  const [changePassForm, setChangePassForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [bmis, setBmis] = useState([
    {
      id: 1,
      bmi: 24.1,
      category: "Normal",
      date: "24 April 2024",
    },
    {
      id: 2,
      bmi: 22.2,
      category: "Normal",
      date: "2 April 2024",
    },
    {
      id: 3,
      bmi: 18.3,
      category: "Underweight",
      date: "1 Januari 2024",
    },
  ]);

  const [akgs, setAkgs] = useState([
    {
      id: 1,
      akg: 1116,
      date: "24 April 2024",
    },
    {
      id: 2,
      akg: 1900,
      date: "2 April 2024",
    },
    {
      id: 3,
      akg: 1560,
      date: "1 Januari 2024",
    },
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://i-fit-be.vercel.app/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUser(data.user);
        setEditForm({
          username: data.user.username,
          fullname: data.user.fullname,
        });
        setLoadingData(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

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

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Ayam Betutu khas Bali versi diet",
      desc: "Hai semuanya kali ini saya akan membagikan resep ayam betutu khas bali yang terkenal, tetapi dengan menggunakan minyak sedikit...",
      author: {
        name: "Siti Nur Khodijah",
        profilePic: "src/assets/pp-dummy.png",
      },
    },
    {
      id: 2,
      title: "Ayam Betutu khas Bali versi diet",
      desc: "Hai semuanya kali ini saya akan membagikan resep ayam betutu khas bali yang terkenal, tetapi dengan menggunakan minyak sedikit...",
      author: {
        name: "Siti Nur Khodijah",
        profilePic: "src/assets/pp-dummy.png",
      },
    },
    {
      id: 3,
      title: "Ayam Betutu khas Bali versi diet",
      desc: "Hai semuanya kali ini saya akan membagikan resep ayam betutu khas bali yang terkenal, tetapi dengan menggunakan minyak sedikit...",
      author: {
        name: "Siti Nur Khodijah",
        profilePic: "src/assets/pp-dummy.png",
      },
    },
  ]);

  const handleLogout = () => {
    localStorage.clear();
    logout(userId);
    toast.success("Anda keluar");
  };

  if (!isLogged) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="font-poppins">
      <Navbar />

      <div className="h-[376px] w-full bg-header-profile bg-cover">
        <div className="bg-white rounded-2xl h-64 w-5/6 mx-auto translate-y-40 drop-shadow-md px-12 py-6 flex justify-between items-center">
          <img src={DummyPp} alt="Profile" className="rounded-full h-48" />
          <div className="flex flex-col gap-8 items-end">
            <p className="text-4xl font-semibold">
              {loadingData ? "Loading data.." : user.fullname}
            </p>
            <p className="text-[28px] font-medium opacity-70">
              Bergabung sejak {user.joined}
            </p>
          </div>
        </div>
      </div>

      <div className="w-5/6 mx-auto grid grid-cols-3 gap-16 my-24">
        <div>
          <div className="sticky top-28 flex flex-col gap-12">
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
                placeholder={user.email}
                name="email"
              />
              <button
                disabled={loadingEdit}
                className="bg-c-hijautua rounded-full p-4 text-white font-bold mt-4 w-fit mx-auto"
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
                className="bg-c-hijaumedium rounded-full p-4 text-white font-bold mt-4 w-fit mx-auto"
              >
                {loadingChangePass ? "Loading..." : "Ubah Kata Sandi"}
              </button>
            </form>

            <button
              onClick={handleLogout}
              type="button"
              className="w-full bg-c-orentua rounded-lg text-center text-white text-xl font-semibold p-4"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-20">
          <div className="w-full">
            <h3 className="font-semibold text-2xl">Riwayat BMI Terakhir</h3>
            <div className="grid grid-cols-3 gap-4 h-40 mt-4">
              {user?.bmis?.length > 0 ? (
                user.bmis.map((bmi) => (
                  <div key={bmi.id} className="flex flex-col shadow rounded-lg">
                    <div className="bg-gradient-to-br from-c-orentua to-white rounded-t-lg text-center text-white text-4xl font-semibold py-8">
                      {bmi.bmi}
                    </div>
                    <div className="font-medium text-birdong pl-4 mt-2">
                      {bmi.category}
                    </div>
                    <div className="text-xs text-birdong opacity-70 pl-4">
                      {bmi.date}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">Belum ada data</p>
              )}
            </div>
          </div>

          <div className="w-full">
            <h3 className="font-semibold text-2xl">
              Riwayat AKG Terakhir <span className="font-normal">(kal)</span>
            </h3>
            <div className="grid grid-cols-3 gap-4 h-40 mt-4">
              {user?.akgs?.length > 0 ? (
                user.akgs.map((akg) => (
                  <div key={akg.id} className="flex flex-col shadow rounded-lg">
                    <div className="bg-gradient-to-br from-c-hijautua to-white rounded-t-lg text-center text-white text-4xl font-semibold py-8">
                      {akg.akg}
                    </div>
                    <div className="text-xs text-birdong opacity-70 pl-4 mt-2">
                      {akg.date}
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

            {posts.map((post) => (
              <CardPostingan key={post.id} post={post} />
            ))}

            <PaginationControls
              currPage={1}
              totalPages={5}
              handlePagination={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardPostingan = ({ post }) => {
  return (
    <div className="rounded-xl border border-c-hijautua/75 p-6 flex my-4">
      <div>
        <p className="text-xl font-medium">{post.title}</p>
        <p className="my-4">{post.desc}</p>
        <div className="flex gap-4">
          <img src={post.author.profilePic} alt="Profile" />
          <p className="text-lg">{post.author.name}</p>
        </div>
      </div>
      <div className="w-1/3 rounded-lg bg-gray-500"></div>
    </div>
  );
};

export default Profile;
