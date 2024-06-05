import React from "react";
import { Add, Remove } from "@mui/icons-material";

function InputNum({ value, onChange }) {
  const handleIncrement = () => {
    const newValue = value === "" ? 1 : parseInt(value, 10) + 1;
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = value === "" ? 0 : parseInt(value, 10) - 1;
    onChange(newValue);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="flex flex-row-reverse items-center gap-x-2">
      <button
        onClick={handleIncrement}
        className="w-6 h-6 text-c-hijautua rounded-full border border-c-hijautua flex items-center justify-center"
      >
        <Add></Add>
      </button>

      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-28 h-9 text-center bg-c-hijautua text-white text-xl font-poppins font-semibold rounded-md placeholder-white placeholder-opacity-50"
        min="0"
        placeholder="0"
      />
      <button
        onClick={handleDecrement}
        className="w-6 h-6 text-c-hijautua rounded-full border border-c-hijautua flex items-center justify-center"
      >
        <Remove />
      </button>
    </div>
  );
}

export default InputNum;
