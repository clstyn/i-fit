/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-hijaumuda": "#2bb3ca",
        "c-hijaumedium": "#deeb74",
        "c-hijautua": "#1c4c74",
        "c-orenmuda": "#5ba487",
        "c-orentua": "#f95223",
        "c-birdong": "#f95223",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kaushan: ["Kaushan Script", "cursive"],
      },
    },
  },
  plugins: [],
};
