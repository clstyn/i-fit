/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-hijaumuda": "#B0FFE9",
        "c-hijaumedium": "#4CC2C4",
        "c-hijautua": "#4C9D8C",
        "c-orenmuda": "#F8905B",
        "c-orentua": "#DF622C",
        "c-birdong": "#022249",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kaushan: ["Kaushan Script", "cursive"],
      },
      backgroundImage: (theme) => ({
        "header-profile": "url('/src/assets/bg-profile.png')",
        "oren-linear": "url('/src/assets/orenlinear.png')",
        "hijau-linear": "url('/src/assets/hijaulinear.png')",
        // untuk gambar background taruh di sini
      }),
    },
  },
  plugins: [],
};
