import React, { useState, useContext } from "react";
import { Icon } from "@iconify-icon/react";
import InputNum from "../components/InputNum";
import BasicButton from "../components/BasicButton";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import axios from "axios";

const BmiAkgCalculator = () => {
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("-");
  const [akg, setAkg] = useState(0);
  const [karbohidrat, setKarbohidrat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [lemak, setLemak] = useState(0);
  const { token, isLogged } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

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

  const activityMultipliers = {
    "Sangat jarang berolahraga": 1.2,
    "Jarang olahraga (1-3 kali per minggu)": 1.375,
    "Cukup olahraga (3-5 kali per minggu)": 1.55,
    "Sering olahraga (6-7 kali per minggu)": 1.725,
    "Sangat sering olahraga (2 kali dalam sehari)": 1.9,
  };

  const handleSelect = (option) => {
    setSelectedActivity(option);
    setIsOpen(false);
  };

  const handleCalculate = () => {
    if (!weight || !height || !age || !selectedActivity) {
      toast.error("Semua field harus diisi!");
      setBmi(0);
      setBmiCategory("-");
      setAkg(0);
      setKarbohidrat(0);
      setProtein(0);
      setLemak(0);
      return;
    }

    if (weight > 0 && height > 0) {
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

    const bmr =
      selectedGender === "male"
        ? 66 + 13.75 * weight + 5.003 * height - 6.755 * age
        : 655 + 9.563 * weight + 1.85 * height - 4.676 * age;
    const maintenanceCalories = bmr * activityMultipliers[selectedActivity];

    const proteinCalorie = (0.15 * maintenanceCalories) / 4;
    const lemakCalorie = (0.2 * maintenanceCalories) / 9;
    const karbohidratCalorie = (0.65 * maintenanceCalories) / 4;

    setAkg(maintenanceCalories.toFixed(2));
    setKarbohidrat(karbohidratCalorie.toFixed(2));
    setProtein(proteinCalorie.toFixed(2));
    setLemak(lemakCalorie.toFixed(2));
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

  const handleSave = async (e) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://i-fit-be.vercel.app/user/save-bmi-akg",
        {
          bmiVal: bmi,
          bmiCat: bmiCategory,
          akg: akg,
          weight: weight,
          height: height,
          age: age,
          gender: selectedGender,
          activityLevel: selectedActivity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Berhasil disimpan");
      } else {
        toast.error(response.data.message || "Gagal menyimpan");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
      console.error("Error response:", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins text-c-birdong min-h-screen">
      <Navbar />

      <div className="h-[216px] w-full pb-20">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="font-kaushan text-5xl mx-16 lg:text-7xl mt-32 text-center">
            Kalkulator BMI & AKG
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-x-20 justify-center items-center">
        <div className="lg:h-[750px] flex flex-col bg-white custom-shadow rounded-xl p-10 m-4 w-3/4 lg:w-2/5 gap-5">
          <div>
            <p className="text-c-birdong text-xl lg:text-2xl text-center font-poppins font-medium">
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
          <div className="flex flex-col lg:flex-row justify-center gap-3">
            <div class="flex-none lg:w-3/5 w-full">
              <p className="text-c-birdong text-center lg:text-left text-xl lg:text-2xl font-poppins font-medium">
                Berat Badan (kg)
              </p>
            </div>
            <div class="flex items-center justify-center lg:w-2/5 w-full">
              <InputNum
                value={weight}
                onChange={(value) => setWeight(value)}
              ></InputNum>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-3">
            <div class="flex-none lg:w-3/5 w-full">
              <p className="text-c-birdong text-center lg:text-left text-xl lg:text-2xl font-poppins font-medium">
                Tinggi Badan (cm)
              </p>
            </div>
            <div class="flex items-center justify-center lg:justify-end lg:w-2/5 w-full ">
              <InputNum
                value={height}
                onChange={(value) => setHeight(value)}
              ></InputNum>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-3">
            <div class="flex-none lg:w-3/5 w-full">
              <p className="text-c-birdong text-center lg:text-left text-xl lg:text-2xl font-poppins font-medium">
                Usia (tahun)
              </p>
            </div>
            <div class="flex items-center justify-center lg:justify-end lg:w-2/5 w-full">
              <InputNum
                value={age}
                onChange={(value) => setAge(value)}
              ></InputNum>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-c-birdong text-center lg:text-left text-xl lg:text-2xl font-poppins font-medium">
              Tingkat Aktivitas
            </p>
            <div className="relative w-full">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-c-hijautua lg:text-xl text-md font-poppins font-semibold text-white py-2 px-4 rounded-md flex justify-between items-center"
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
                <ul className="absolute z-10 w-full bg-c-hijautua text-white rounded-md mt-1 lg:text-xl text-md font-poppins text-white">
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
          </div>
          <div className="grow content-end">
            <div className="flex flex-col">
              <BasicButton text={"Hitung"} onClick={handleCalculate} />
            </div>
          </div>
        </div>
        <div className="lg:h-[750px] flex flex-col bg-white custom-shadow rounded-xl p-10 m-4 w-3/4 lg:w-2/5 gap-6">
          <p className="text-c-birdong text-xl lg:text-2xl text-center font-poppins font-bold">
            Hasil
          </p>
          <div
            className={`indicator-container w-[100%] h-[40%] ${getBgImageClass()} pt-11 lg:pt-24`}
          >
            <div className="flex items-end justify-center gap-6 lg:gap-20">
              <p className="ind1 text-c-birdong text-[10px] lg:text-xs text-center font-poppins font-normal pt-5 lg:pt-10">
                18.5
              </p>
              <p className="ind2 text-c-birdong text-[10px] lg:text-xs text-center font-poppins font-normal pb-5 lg:pb-10">
                25.0
              </p>
              <p className="ind3 text-c-birdong text-[10px] lg:text-xs text-center font-poppins font-normal pt-5 lg:pt-10">
                30.0
              </p>
            </div>
            <div className="result bg-transparent lg:mb-10">
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
          <div className="akg flex flex-col items-center gap-2">
            <p className="text-c-birdong text-xl lg:text-2xl text-center font-poppins font-bold">
              Angka Kecukupan Gizi (AKG)
            </p>
            <div className="bg-c-hijautua text-white text-md lg:text-xl text-center font-poppins font-semibold rounded-[15px] px-2 py-1 lg:p-3 w-auto">
              {akg} Kalori
            </div>
            <div className="flex lg:flex-row w-full lg:w-1/2 lg:gap-x-2">
              <div>
                <p className="text-c-birdong text-base text-start font-poppins font-normal text-md lg:text-xl">
                  Karbohidrat
                </p>
                <p className="text-c-birdong text-base text-start font-poppins font-normal text-md lg:text-xl">
                  Lemak
                </p>
                <p className="text-c-birdong text-base text-start font-poppins font-normal text-md lg:text-xl">
                  Protein
                </p>
              </div>
              <div className="w-auto">
                <p className="text-md lg:text-xl text-c-birdong text-base text-start font-poppins font-normal">
                  :
                </p>
                <p className="text-md lg:text-xl text-c-birdong text-base text-start font-poppins font-normal">
                  :
                </p>
                <p className="text-md lg:text-xl text-c-birdong text-base text-start font-poppins font-normal">
                  :
                </p>
              </div>
              <div className="flex-auto">
                <p className="text-md lg:text-xl text-c-birdong text-base text-end font-poppins font-normal">
                  {karbohidrat} gr
                </p>
                <p className="text-md lg:text-xl text-c-birdong text-base text-end font-poppins font-normal">
                  {protein} gr
                </p>
                <p className="text-md lg:text-xl text-c-birdong text-base text-end font-poppins font-normal">
                  {lemak} gr
                </p>
              </div>
            </div>
          </div>
          <div className="grow content-end">
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <BasicButton
                text={loading ? "Loading..." : "Simpan"}
                onClick={() => {
                  if (isLogged === false) {
                    toast.error("Anda harus login terlebih dahulu");
                    return;
                  } else if (akg === 0 && bmi === 0) {
                    toast.error("Lakukan perhitungan terlebih dahulu");
                    return;
                  }
                  handleSave();
                }}
              ></BasicButton>
              <BasicButton text={"Cek Rekomendasi"}></BasicButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiAkgCalculator;
