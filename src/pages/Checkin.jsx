import Navbar from "../components/Navbar";
import Coin from "../assets/coin.png";

const Checkin = () => {
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
                <p>376</p>
              </div>
            </div>

            <div className="rounded-lg bg-white/50 shadow-md p-8 flex flex-col gap-2">
              <p className="text-center font-semibold text-3xl">April 2024</p>
              <p className="text-center font-kaushan text-8xl">25</p>
              <div className="flex justify-between items-center mt-8 w-full">
                <div className="flex gap-2">
                  <img src={Coin} alt="coin" className="w-8 h-8" />
                  <p className="font-medium text-xl">+ 25</p>
                </div>
                <button className="bg-c-hijautua rounded-full p-4 text-white font-bold">
                  Check In
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <div className="flex flex-col gap-12">
              <div className="rounded-lg bg-white/50 shadow-md p-4 flex flex-col gap-2">
                <div className="flex w-full">
                  <div className="bg-c-hijaumedium rounded-l-lg text-white font-semibold w-1/2 text-center p-2 text-xl">
                    Tantangan
                  </div>
                  <div className="bg-gray-400  rounded-r-lg text-white font-semibold w-1/2 text-center p-2 text-xl">
                    Hadiah
                  </div>
                </div>
                <p className="font-medium text-xl my-3">
                  Lakukan tantangan harian untuk mendapatkan lebih banyak poin!
                </p>
                <div className="h-[480px] overflow-y-auto">
                  <Card />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="grid grid-cols-3 w-full border border-c-birdong/50 rounded-xl p-6">
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

export default Checkin;
