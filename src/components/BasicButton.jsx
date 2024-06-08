import React from "react";

function BasicButton({ text, onClick }) {
  const buttonStyle = {
    background: "linear-gradient(to right, #F8905B, #DF622C)",
    borderRadius: "20px",
    color: "white",
  };

  return (
    <button
      type="submit"
      onClick={onClick}
      className="py-2 px-4 text-white font-poppins lg:text-xl text-md font-semibold w-full lg:h-16 h-10"
      style={buttonStyle}
    >
      {text}
    </button>
  );
}

export default BasicButton;
