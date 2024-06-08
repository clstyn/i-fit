import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Coin from "../assets/coin.png";
import { AppContext } from "../context/appContext";
import { toast } from "react-toastify";

const getTodayMonthYear = () => {
  const today = new Date();
  const month = today.toLocaleString("id-ID", { month: "long" });
  const year = today.getFullYear();
  return `${month} ${year}`;
};

const getTodayDate = () => {
  const today = new Date();
  return today.getDate();
};

const Checkin = () => {
  const { token, isLogged, user } = useContext(AppContext);
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [loadingPrize, setLoadingPrize] = useState(false);
  const [loadingChallenge, setLoadingChallenge] = useState(false);
  const [checkinAllowed, setCheckinAllowed] = useState(true);
  const [prizes, setPrizes] = useState([]);
  const [mode, setMode] = useState("tantangan");

  useEffect(() => {
    const now = new Date();
    const lastCheckin = new Date(user?.latestCheckin);
    if (now - lastCheckin < 24 * 60 * 60 * 1000) {
      setCheckinAllowed(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPrizes();
  }, []);

  useEffect(() => {
    console.log(prizes);
  }, prizes);

  const dailyCheckin = async (e) => {
    e.preventDefault();
    console.log(token);
    setLoadingDaily(true);
    try {
      const response = await axios.post(
        "https://i-fit-be.vercel.app/user/daily-checkin",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Check-in harian berhasil");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Check-in gagal");
    } finally {
      setLoadingDaily(false);
    }
  };

  if (!isLogged) {
    return <Navigate to={"/login"} />;
  }

  const fetchPrizes = async () => {
    try {
      const response = await axios.get("https://i-fit-be.vercel.app/prizes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrizes(response.data.prize);
    } catch (error) {
      console.log(error);
    }
  };

  const redeemPrize = async (prizeId) => {
    setLoadingPrize(true);
    try {
      const response = await axios.post(
        `https://i-fit-be.vercel.app/user/redeem/${prizeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menukarkan poin");
    } finally {
      setLoadingPrize(false);
    }
  };

  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />
      <div className="h-[376px] w-full bg-header-profile bg-cover">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-7xl">Check-In Harian</h1>
        </div>
      </div>

      <div className="w-5/6 mx-auto grid grid-cols-3 gap-16 my-12 -translate-y-24">
        <div>
          <div className="flex flex-col gap-12">
            <div className="rounded-lg bg-white/50 shadow-md p-4 flex flex-col gap-2">
              <div className="bg-c-hijaumedium rounded-lg text-white font-semibold w-full text-center p-2 mx-auto text-xl">
                Poin Saya
              </div>
              <div className="mt-4 font-semibold w-full flex gap-4 items-center justify-center text-3xl">
                <img src={Coin} alt="coin" className="w-8" />
                <p>{user?.point}</p>
              </div>
            </div>

            <div className="rounded-lg bg-white/50 shadow-md p-8 flex flex-col gap-2">
              <p className="text-center font-semibold text-3xl">
                {getTodayMonthYear()}
              </p>
              <p className="text-center font-kaushan text-8xl">
                {getTodayDate()}
              </p>
              <div className="flex justify-between items-center mt-8 w-full">
                <div className="flex gap-2">
                  <img src={Coin} alt="coin" className="w-8 h-8" />
                  <p className="font-medium text-xl">+ 25</p>
                </div>

                <button
                  disabled={loadingDaily || !checkinAllowed}
                  onClick={dailyCheckin}
                  className={`rounded-full p-4 text-white font-bold ${
                    checkinAllowed
                      ? "bg-c-hijautua"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  {loadingDaily ? "Loading..." : "Check In"}
                </button>
              </div>
              {checkinAllowed ? null : (
                <p className="text-red-500">Anda sudah check-in hari ini</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <div className="flex flex-col gap-12">
              <div className="rounded-lg bg-white/50 shadow-md p-4 flex flex-col gap-2">
                <div className="flex w-full">
                  <div
                    onClick={() => setMode("tantangan")}
                    className={`${
                      mode === "tantangan" ? "bg-c-hijaumedium " : "bg-gray-400"
                    } rounded-l-lg text-white font-semibold w-1/2 text-center p-2 text-xl cursor-pointer`}
                  >
                    Tantangan
                  </div>
                  <div
                    onClick={() => setMode("hadiah")}
                    className={`${
                      mode !== "tantangan" ? "bg-c-hijaumedium " : "bg-gray-400"
                    } rounded-r-lg text-white font-semibold w-1/2 text-center p-2 text-xl cursor-pointer`}
                  >
                    Hadiah
                  </div>
                </div>
                <p className="font-medium text-xl my-3">
                  {mode === "tantangan"
                    ? "Lakukan tantangan harian untuk mendapatkan lebih banyak poin!"
                    : "Tukar poin dengan voucher menarik!"}
                </p>
                <div className="h-[480px] overflow-y-auto">
                  {mode === "tantangan"
                    ? null
                    : prizes.map((prize) => (
                        <CardPrize
                          prize={prize}
                          key={prize.id}
                          redeemPrize={redeemPrize}
                          loading={loadingPrize}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardChallenge = ({ item }) => {
  return (
    <div className="grid grid-cols-3 w-full border border-c-birdong/50 rounded-xl p-6 my-2">
      <div className="flex flex-col place-self-start">
        <p className="text-2xl font-medium">Goblet Squats</p>
        <p className="text-lg opacity-70">25 kali</p>
      </div>
      <div className="flex gap-2 place-self-center">
        <img src={Coin} alt="coin" className="w-8 h-8" />
        <p className="font-medium text-xl">+ 25</p>
      </div>
      <button className="bg-gradient-to-br from-[#8BCEC0] to-c-hijautua rounded-full text-white text-xl font-medium w-fit py-2 px-4 place-self-end">
        Lakukan
      </button>
    </div>
  );
};

const CardPrize = ({ prize, redeemPrize, loading }) => {
  return (
    <div className="grid grid-cols-3 w-full border border-c-birdong/50 rounded-xl p-6 mb-4">
      <div className="flex flex-col place-self-start">
        <p className="text-2xl font-medium">{prize.nominal}</p>
        <p className="text-lg opacity-70">{prize.boothname}</p>
      </div>
      <div className="flex gap-2 place-self-center">
        <img src={Coin} alt="coin" className="w-8 h-8" />
        <p className="font-medium text-xl">+ {prize.pointNeeded}</p>
      </div>
      <button
        disabled={loading}
        onClick={() => redeemPrize(prize._id)}
        className="bg-gradient-to-br from-[#F8A27D] to-c-orentua rounded-full text-white text-xl font-medium w-fit py-2 px-4 place-self-end"
      >
        {loading ? "Loading..." : "Tukar"}
      </button>
    </div>
  );
};

export default Checkin;
