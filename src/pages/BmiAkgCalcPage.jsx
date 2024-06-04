import React, { useState } from "react";
import "../index.css";
import { Man, Woman, KeyboardArrowDown } from "@mui/icons-material";
import InputNum from "../components/InputNum";
import BasicButton from "../components/BasicButton";
import Navbar from "../components/Navbar";

const BmiAkgCalculator = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (value) => {
    setSelectedGender(value);
  };

  const options = [
    "Sangat jarang berolahraga",
    "Jarang olahraga (1-3 kali per minggu)",
    "Cukup olahraga (3-5 kali per minggu)",
    "Sering olahraga (6-7 kali per minggu)",
    "Sangat sering olahraga (2 kali dalam sehari)",
  ];

  const handleSelect = (option) => {
    setSelectedActivity(option);
    setIsOpen(false);
  };

  return (
    <div>
      <header className="bg-gray-200 h-20 flex items-center justify-between px-8">
        <Navbar></Navbar>
      </header>
      <body>
        <div className="h-44 flex items-center justify-center">
          <p className="text-c-birdong text-8xl font-kaushan">
            Kalkulator BMI & AKG
          </p>
        </div>
        <div className="flex gap-x-20 justify-center">
          <div className="bg-white custom-shadow rounded-[20px] p-6 m-4 w-2/5 space-y-6">
            <div>
              <p className="text-c-birdong text-2xl text-center font-poppins font-medium">
                Jenis Kelamin
              </p>
              <div className="flex justify-center">
                <label className="inline-flex items-center mr-6 cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="male"
                    class="hidden"
                    checked={selectedGender === "male"}
                    onChange={() => handleOptionChange("male")}
                  />
                  <Man
                    className={
                      selectedGender === "male"
                        ? "text-c-hijautua"
                        : "text-c-hijaumuda"
                    }
                    style={{ fontSize: "80px" }}
                  ></Man>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="female"
                    class="hidden"
                    checked={selectedGender === "female"}
                    onChange={() => handleOptionChange("female")}
                  />
                  <Woman
                    className={
                      selectedGender === "female"
                        ? "text-c-hijautua"
                        : "text-c-hijaumuda"
                    }
                    style={{ fontSize: "80px" }}
                  ></Woman>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <div class="flex-none w-2/3">
                <p className="text-c-birdong text-2xl font-poppins font-medium">
                  Berat Badan (kg)
                </p>
              </div>
              <div class="flex-none w-1/3 ">
                <InputNum></InputNum>
              </div>
            </div>
            <div className="flex justify-center">
              <div class="flex-none w-2/3">
                <p className="text-c-birdong text-2xl font-poppins font-medium">
                  Tinggi Badan (cm)
                </p>
              </div>
              <div class="flex-none w-1/3 justify-items-end">
                <InputNum></InputNum>
              </div>
            </div>
            <div className="flex justify-center">
              <div class="flex-none w-2/3">
                <p className="text-c-birdong text-2xl font-poppins font-medium">
                  Usia (tahun)
                </p>
              </div>
              <div class="flex-auto w-1/3 content-end">
                <InputNum></InputNum>
              </div>
            </div>
            <div className="space-y-2 mb-16">
              <p className="text-c-birdong text-2xl font-poppins font-medium">
                Tingkat Aktivitas
              </p>
              <div className="relative w-full">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full bg-c-hijautua text-xl font-poppins font-semibold text-white py-2 px-4 rounded-md flex justify-between items-center"
                >
                  {selectedActivity || "Pilih tingkat aktivitas"}
                  <KeyboardArrowDown className="text-white" />
                </button>
                {isOpen && (
                  <ul className="absolute z-10 w-full bg-c-hijautua text-white rounded-[20px] mt-1 text-xl font-poppins text-white">
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="py-2 px-4 hover:bg-c-birdong cursor-pointer"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="h-56"></div>
            </div>
            <BasicButton text={"Hitung"}></BasicButton>
          </div>
          <div className="bg-white custom-shadow rounded-[20px] p-6 m-4 w-2/5 gap">
            <p className="text-c-birdong text-5xl text-center font-poppins font-bold">
              Hasil
            </p>
            <div className="needle-container">
              <p className="ind1 text-c-birdong text-xs text-center font-poppins font-normal">
                18.5
              </p>
              <p className="ind2 text-c-birdong text-xs text-center font-poppins font-normal">
                25.0
              </p>
              <p className="ind3 text-c-birdong text-xs text-center font-poppins font-normal">
                30.0
              </p>
              <div className="needle" style={{ "--score": 50 }}>
                {/* Teks persentase */}
              </div>
              <div className="result w-28 h-36 space-y-1">
                <p className="text-c-birdong text-base text-center font-poppins font-bold">
                  BMI
                </p>
                <p className="text-c-birdong text-4xl text-center font-poppins font-bold">
                  24.1
                </p>
                <p className="text-c-birdong text-xl text-center font-poppins font-normal">
                  Normal
                </p>
              </div>
            </div>
            <div className="akg flex flex-col items-center space-y-2">
              <p className="text-c-birdong text-xl text-center font-poppins font-bold">
                Angka Kecukupan Gizi (AKG)
              </p>
              <div className="bg-c-hijautua text-white text-xl text-center font-poppins font-semibold rounded-[15px] p-3 w-auto">
                2126.07 Kalori
              </div>
              <div className="flex flex-row w-2/5 gap-x-2">
                <div>
                  <p className="text-c-birdong text-base text-start font-poppins font-normal">
                    Karbohidrat
                  </p>
                  <p className="text-c-birdong text-base text-start font-poppins font-normal">
                    Lemak
                  </p>
                  <p className="text-c-birdong text-base text-start font-poppins font-normal">
                    Protein
                  </p>
                </div>
                <div className="w-auto">
                  <p className="text-c-birdong text-base text-start font-poppins font-normal">
                    :
                  </p>
                  <p className="text-c-birdong text-base text-start font-poppins font-normal">
                    :
                  </p>
                  <p className="text-c-birdong text-base text-start font-poppins font-normal">
                    :
                  </p>
                </div>
                <div className="flex-auto">
                  <p className="text-c-birdong text-base text-end font-poppins font-normal">
                    345.49 gr
                  </p>
                  <p className="text-c-birdong text-base text-end font-poppins font-normal">
                    79.73 gr
                  </p>
                  <p className="text-c-birdong text-base text-end font-poppins font-normal">
                    47.25 gr
                  </p>
                </div>
              </div>
            </div>
            <BasicButton text={"Cek Rekomendasi"}></BasicButton>
          </div>
        </div>
      </body>
    </div>
  );
};

export default BmiAkgCalculator;
