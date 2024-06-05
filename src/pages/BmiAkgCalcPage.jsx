import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import InputNum from "../components/InputNum";
import BasicButton from "../components/BasicButton";
import Navbar from "../components/Navbar";

const BmiAkgCalculator = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("-");

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

  const handleCalculate = () => {
    console.log("Button clicked!");
    console.log(weight, height);
    if (weight > 0 && height > 0) {
      console.log("Msuk");
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(1));

      if (bmiValue < 18.5) {
        setBmiCategory("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiCategory("Normal");
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setBmiCategory("Overweight");
      } else {
        setBmiCategory("Obese");
      }
    }
  };

  const getBgImageClass = () => {
    switch (bmiCategory) {
      case "Underweight":
        return "bg-bmi-under";
      case "Normal":
        return "bg-bmi-normal";
      case "Overweight":
        return "bg-bmi-over";
      case "Obese":
        return "bg-bmi-obese";
      default:
        return "bg-bmi";
    }
  };

  return (
    <div>
      <header className="bg-gray-200 h-20 flex items-center justify-between px-8">
        <Navbar></Navbar>
      </header>
      <body>
        <div className="h-44 flex items-center justify-center">
          <p className="text-c-birdong text-7xl font-kaushan">
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
                  <Icon
                    icon="material-symbols:man"
                    className={
                      selectedGender === "male"
                        ? "text-c-hijautua"
                        : "text-c-hijaumuda"
                    }
                    width={"full"}
                    height={80}
                  />
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
                  <Icon
                    icon="material-symbols:woman"
                    className={
                      selectedGender === "female"
                        ? "text-c-hijautua"
                        : "text-c-hijaumuda"
                    }
                    width={"full"}
                    height={80}
                  />
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
                <InputNum
                  value={weight}
                  onChange={(value) => setWeight(value)}
                ></InputNum>
              </div>
            </div>
            <div className="flex justify-center">
              <div class="flex-none w-2/3">
                <p className="text-c-birdong text-2xl font-poppins font-medium">
                  Tinggi Badan (cm)
                </p>
              </div>
              <div class="flex-none w-1/3 justify-items-end">
                <InputNum
                  value={height}
                  onChange={(value) => setHeight(value)}
                ></InputNum>
              </div>
            </div>
            <div className="flex justify-center">
              <div class="flex-none w-2/3">
                <p className="text-c-birdong text-2xl font-poppins font-medium">
                  Usia (tahun)
                </p>
              </div>
              <div class="flex-auto w-1/3 content-end">
                <InputNum
                  value={age}
                  onChange={(value) => setAge(value)}
                ></InputNum>
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
                  <Icon
                    icon="material-symbols:keyboard-arrow-down"
                    className="text-white"
                    width={25}
                    height={25}
                  />
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
            <BasicButton
              text={"Hitung"}
              onClick={handleCalculate}
            ></BasicButton>
          </div>
          <div className="bg-white custom-shadow rounded-[20px] p-6 m-4 w-2/5 gap">
            <p className="text-c-birdong text-5xl text-center font-poppins font-bold">
              Hasil
            </p>
            <div className={`needle-container ${getBgImageClass()}`}>
              <p className="ind1 text-c-birdong text-xs text-center font-poppins font-normal">
                18.5
              </p>
              <p className="ind2 text-c-birdong text-xs text-center font-poppins font-normal">
                25.0
              </p>
              <p className="ind3 text-c-birdong text-xs text-center font-poppins font-normal">
                30.0
              </p>
              <div className="result w-28 h-36 space-y-1">
                <p className="text-c-birdong text-base text-center font-poppins font-bold">
                  BMI
                </p>
                <p className="text-c-birdong text-4xl text-center font-poppins font-bold">
                  {bmi}
                </p>
                <p className="text-c-birdong text-xl text-center font-poppins font-normal">
                  {bmiCategory}
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
