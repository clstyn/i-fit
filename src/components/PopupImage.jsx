import React from "react";

const PopupImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <img src={imageUrl} alt="Popup" className="max-w-full max-h-full" />
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PopupImage;
