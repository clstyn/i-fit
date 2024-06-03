import React, { useState } from "react";
import { Add, Remove } from "@mui/icons-material";

function InputNum() {
  const [value, setValue] = useState("");

  const handleIncrement = () => {
    setValue((prevValue) =>
      prevValue === "" ? 1 : parseInt(prevValue, 10) + 1
    );
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      const newValue = prevValue === "" ? 0 : parseInt(prevValue, 10) - 1;
      return newValue < 0 ? 0 : newValue;
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value === "" ? "" : Math.max(0, parseInt(value, 10)));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrement}
        className="w-6 h-6 text-c-hijautua rounded-full border border-c-hijautua flex items-center justify-center"
      >
        <Remove />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-32 h-9 text-center bg-c-hijautua text-white text-xl font-poppins font-semibold rounded-md placeholder-white placeholder-opacity-50"
        min="0"
        placeholder="0"
      />
      <button
        onClick={handleIncrement}
        className="w-6 h-6 text-c-hijautua rounded-full border border-c-hijautua flex items-center justify-center"
      >
        <Add></Add>
      </button>
    </div>
  );
}

export default InputNum;
