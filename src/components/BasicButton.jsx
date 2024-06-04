import React from "react";

function BasicButton({ text, onClick }) {
  const buttonStyle = {
    background: "linear-gradient(to right, #F8905B, #DF622C)",
    borderRadius: "20px",
    color: "white",
  };

  return (
    <button
      onClick={onClick}
      className="py-2 px-4 text-white font-poppins text-xl font-semibold w-full h-16"
      style={buttonStyle}
    >
      {text}
    </button>
  );
}

export default BasicButton;
