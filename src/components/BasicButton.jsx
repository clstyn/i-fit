import React, { useState } from "react";

function BasicButton({ text, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    background: isHovered
      ? "linear-gradient(to right, #DF622C, #F8905B)"
      : "linear-gradient(to right, #F8905B, #DF622C)",
    borderRadius: "20px",
    color: "white",
    transition: "background 0.3s",
  };

  return (
    <button
      type="submit"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-2 px-4 text-white font-poppins lg:text-xl text-md font-semibold w-full lg:h-16 h-10"
      style={buttonStyle}
    >
      {text}
    </button>
  );
}

export default BasicButton;
