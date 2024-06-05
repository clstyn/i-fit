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
        "header-rekom": "url('/src/assets/bg-rekom1.png')",
        "header-kalori": "url('/src/assets/bg-kalori.png')",
        "makanan-rekom": "url('/src/assets/bg-rekom2.png')",
        "detail-rekom": "url('/src/assets/bg-detailrekom.png')",
        "base-hijau": "url('/src/assets/bg-linear-hijau.png')",
        login: "url('/src/assets/bg-login.jpeg')",
        register: "url('/src/assets/bg-register.jpeg')",
        forgot: "url('/src/assets/bg-forgot.jpeg')",
        recover: "url('/src/assets/bg-recover.jpeg')",
        bmi: "url('/src//assets/bmi.png')",
        "bmi-under": "url('/src/assets/bmi-under.png')",
        "bmi-normal": "url('/src/assets/bmi-normal.png')",
        "bmi-over": "url('/src/assets/bmi-over.png')",
        "bmi-obese": "url('/src/assets/bmi-obese.png')",
        "bg-landing": "url('/src/assets/bg-landing.png')",
        // untuk gambar background taruh di sini
      }),
    },
  },
  plugins: [],
};
