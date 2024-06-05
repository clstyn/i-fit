import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bmiInd from "../assets/bmiInd.png";
import PicKalori from "../assets/pic-kalori.png";
import PicRecommend from "../assets/pic-recommend.png";
import BasicButton from "../components/BasicButton";

const features = [
  {
    title: "Ketahui BMI dan AKG Anda",
    description:
      "Hitung Body Mass Index(BMI) dan Angka Kecukupan Gizi(AKG) Anda untuk mengetahui kondisi tubuh Anda sehingga dapat menjaga tubuh dengan baik.",
    imageUrl: bmiInd,
    link: "/kalkulatorBMIAKG",
    btnText: "Kalkulator BMI & AKG",
  },
  {
    title: "Hitung Kalori Makanan yang Dimakan",
    description:
      "Pantau jumlah kalori yang masuk ketubuh Anda berdasarkan makanan yang Anda Makan.",
    imageUrl: PicKalori,
    link: "/kalori",
    btnText: "Kalkulator Kalori",
  },
  {
    title: "Dapatkan Rekomendasi",
    description:
      "Berdasarkan BMI dan AKG yang sudah dihitung, dapatkan rekomendasi program diet, olahraga, dan makanan yang sesuai.",
    imageUrl: PicRecommend,
    link: "/rekomendasi",
    btnText: "Rekomendasi",
  },
  {
    title: "Dapatkan Resep Kreatif",
    description:
      "Berbagi resep kreatif dalam forum untuk menghindari kejenuhan menu makan.",
    imageUrl: "https://via.placeholder.com/250",
    link: "/resep",
    btnText: "Resep Kreatif",
  },
  {
    title: "Check-In Setiap Hari",
    description:
      "Jangan sampai terlewat melakukan check-in harian untuk mendapatkan banyak voucher jajan makanan sehat.",
    imageUrl: "https://via.placeholder.com/250",
    link: "/check-in",
    btnText: "Check-In Harian",
  },
];

const Landing = () => {
  return (
    <div>
      <header className="h-24">
        <Navbar />
      </header>
      <div className="bg-cover bg-center h-screen text-white flex flex-col items-start bg-bg-landing">
        <h1 className="text-7xl font-kaushan text-c-birdong mt-52 mx-28">
          I-Fit
        </h1>
        <p className="text-4xl text-c-birdong font-poppins font-bold mx-28 mb-6">
          Tubuhmu Nomor Satu
        </p>
        <p className="w-[632px] text-xl text-c-birdong font-poppins font-normal mx-28">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="py-16 flex flex-col items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center my-8 max-w-6xl w-full ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            }`}
          >
            <img
              src={feature.imageUrl}
              alt={feature.title}
              className="w-auto h-auto object-cover"
            />
            <div
              className={`md:w-3/4 md:px-8 text-center mt-4 md:mt-0 ${
                index % 2 === 0 ? "md:text-left" : "md:text-right"
              }`}
            >
              <h2 className="text-4xl font-poppins font-bold text-c-birdong mb-2">
                {feature.title}
              </h2>
              <div
                className={`w-[450px] ${
                  index % 2 === 0 ? "ml-0 mr-auto" : "ml-auto mr-0"
                }`}
              >
                <p
                  className={`text-c-birdong font-poppins font-normal mb-4 ${
                    index % 2 === 0 ? "ml-0 mr-auto" : "ml-auto mr-0"
                  }`}
                >
                  {feature.description}
                </p>
              </div>

              <div
                className={`w-2/5 ${
                  index % 2 === 0 ? "ml-0 mr-auto" : "ml-auto mr-0"
                }`}
              >
                <Link to={`${feature.link}`}>
                  <BasicButton text={feature.btnText}></BasicButton>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
