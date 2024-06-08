import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import DummyPp from "../assets/pp-dummy.png";
import PaginationControls from "../components/Pagination";

const Profile = () => {
  const { logout, userId, isLogged } = useContext(AppContext);
  const [user, setUser] = useState({
    name: "Siti Nur Khodijah",
    joined: "April 2024",
    username: "sisitiiii_",
    email: "siti@gmail.com",
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
            <p className="text-4xl font-semibold">{user.name}</p>
            <p className="text-[28px] font-medium opacity-70">
              Bergabung sejak {user.joined}
            </p>
          </div>
        </div>
      </div>

      <div className="w-5/6 mx-auto grid grid-cols-3 gap-16 my-24">
        <div>
          <div className="sticky top-28 flex flex-col gap-12">
            <form className="rounded-lg shadow-md p-8 flex flex-col gap-2">
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                value={user.name}
                name="name"
              />
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="username"
                value={user.username}
                name="username"
              />
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="email"
                value={user.email}
                name="email"
              />
              <button className="bg-c-hijautua rounded-full p-4 text-white font-bold mt-4 w-fit mx-auto">
                Ubah Profil
              </button>
            </form>

            <form className="rounded-lg shadow-md p-8 flex flex-col gap-2">
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                placeholder="Kata sandi lama"
                name="oldpass"
              />
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                placeholder="Kata sandi baru"
                name="newpass"
              />
              <input
                className="px-2 py-1 border-b border-c-birdong"
                type="text"
                placeholder="Konfirmasi kata sandi baru"
                name="comfirmpass"
              />
              <button className="bg-c-hijaumedium rounded-full p-4 text-white font-bold mt-4 w-fit mx-auto">
                Ubah Kata Sandi
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
              {bmis.map((bmi) => (
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
              ))}
            </div>
          </div>

          <div className="w-full">
            <h3 className="font-semibold text-2xl">
              Riwayat AKG Terakhir <span className="font-normal">(kal)</span>
            </h3>
            <div className="grid grid-cols-3 gap-4 h-40 mt-4">
              {akgs.map((akg) => (
                <div key={akg.id} className="flex flex-col shadow rounded-lg">
                  <div className="bg-gradient-to-br from-c-hijautua to-white rounded-t-lg text-center text-white text-4xl font-semibold py-8">
                    {akg.akg}
                  </div>
                  <div className="text-xs text-birdong opacity-70 pl-4 mt-2">
                    {akg.date}
                  </div>
                </div>
              ))}
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
