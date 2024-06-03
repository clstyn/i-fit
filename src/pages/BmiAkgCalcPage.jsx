import React, { useState } from "react";
import "../index.css";
import { Man, Woman } from "@mui/icons-material";
import InputNum from "../components/InputNum";

const BmiAkgCalculator = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <div>
      <header className="bg-gray-200 h-20 flex items-center justify-between px-8">
        <h1>Navbar</h1>
      </header>
      <body>
        <div className="h-44 flex items-center justify-center">
          <p className="text-c-birdong text-8xl font-kaushan">
            Kalkulator BMI & AKG
          </p>
        </div>
        <div className="flex gap-x-20 justify-center">
          <div className="bg-white custom-shadow rounded-lg p-6 m-4 w-2/5">
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
                  checked={selectedOption === "male"}
                  onChange={() => handleOptionChange("male")}
                />
                <Man
                  className={
                    selectedOption === "male"
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
                  checked={selectedOption === "female"}
                  onChange={() => handleOptionChange("female")}
                />
                <Woman
                  className={
                    selectedOption === "female"
                      ? "text-c-hijautua"
                      : "text-c-hijaumuda"
                  }
                  style={{ fontSize: "80px" }}
                ></Woman>
              </label>
            </div>
            <InputNum></InputNum>
          </div>
          <div className="bg-white custom-shadow rounded-lg p-6 m-4 w-2/5">
            {/* Konten kotak kedua */}
          </div>
        </div>
      </body>
      <div>
        <h2>BMI Calculator</h2>
        <div>
          <label htmlFor="weight">Weight (kg): </label>
          <input type="number" id="weight" />
        </div>
        <div>
          <label htmlFor="height">Height (cm): </label>
          <input type="number" id="height" />
        </div>
        <button>Calculate BMI</button>
        {<p>Your BMI is:</p>}
      </div>
    </div>
  );
};

export default BmiAkgCalculator;
