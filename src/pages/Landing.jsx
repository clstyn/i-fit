import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slider from "../components/slider/Slider";
import image1 from "../assets/pic2.png";
import image2 from "../assets/bg-recover.jpeg";
import image3 from "../assets/wo.jpg";
import bmiInd from "../assets/bmiInd.png";
import PicKalori from "../assets/pic-kalori.png";
import PicRecommend from "../assets/pic-recommend.png";
import PicRecipe from "../assets/resep.png";
import CheckInHere from "../assets/cekin.png";
import BasicButton from "../components/BasicButton";
import { AppContext } from "../context/appContext";

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
    title: "Hitung Kalori Makanan",
    description:
      "Pantau jumlah kalori yang masuk ketubuh Anda berdasarkan makanan yang Anda Makan.",
    imageUrl: PicKalori,
    link: "/kalori",
    btnText: "Kalkulator Kalori",
  },
  {
    title: "Dapatkan Rekomendasi",
    description:
      "Berdasarkan BMI dan AKG yang sudah dihitung, dapatkan rekomendasi program diet, olahraga, dan makanan yang sesuai",
    imageUrl: PicRecommend,
    link: "/kalkulatorBMIAKG",
    btnText: "Rekomendasi",
  },
  {
    title: "Dapatkan Resep Kreatif",
    description:
      "Berbagi resep kreatif dalam forum untuk menghindari kejenuhan menu makan.",
    imageUrl: PicRecipe,
    link: "/resep",
    btnText: "Resep Kreatif",
  },
  {
    title: "Check-In Setiap Hari",
    description:
      "Jangan sampai terlewat melakukan check-in harian untuk mendapatkan banyak voucher jajan makanan sehat.",
    imageUrl: CheckInHere,
    link: "/check-in",
    btnText: "Check-In Harian",
  },
];

const Landing = () => {
  const { isLogged } = useContext(AppContext);
  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-5 w-full min-h-screen mx-auto py-10 lg:pt-48 justify-around bg-cover bg-center bg-bg-landing">
        <div>
          <h1 className="text-5xl lg:text-7xl font-kaushan text-c-birdong mt-24 lg:mt-0 mx-10 lg:mx-28">
            I-Fit
          </h1>
          <p className="text-2xl lg:text-4xl text-c-birdong font-bold mx-10 lg:mx-28 mb-6">
            Tubuhmu Nomor Satu
          </p>
          <p className="w-3/4 text-md lg:text-xl text-c-birdong font-normal mx-10 lg:mx-28">
            I-Fit siap untuk mendampingi kalian dalam menjalankan gaya hidup
            sehat. Fitur–fitur yang tersedia di I-Fit dapat membantu kamu dalam
            memahami diet dan olahraga yang sesuai dengan kebutuhanmu.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <Slider image1={image1} image2={image2} image3={image3} />
        </div>
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
              className="w-3/4 h-3/4 lg:w-auto lg:h-auto object-cover"
            />
            <div
              className={`md:w-3/4 md:px-8 text-center mt-4 md:mt-0 ${
                index % 2 === 0 ? "md:text-left" : "md:text-right"
              }`}
            >
              <h2 className="text-xl lg:text-4xl font-bold text-c-birdong mb-2">
                {feature.title}
              </h2>
              <div
                className={`w-full px-10 lg:px-0 ${
                  index % 2 === 0 ? "ml-0 mr-auto" : "ml-auto mr-0"
                }`}
              >
                <p
                  className={`text-md lg:text-xl text-c-birdong font-normal mb-4 ${
                    index % 2 === 0 ? "ml-0 mr-auto" : "ml-auto mr-0"
                  }`}
                >
                  {feature.description}
                </p>
              </div>

              <div
                className={`max-w-fit mx-auto ${
                  index % 2 === 0 ? "lg:ml-0 lg:mr-auto" : "lg:ml-auto lg:mr-0"
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
