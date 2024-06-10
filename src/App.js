import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Landing from "./pages/Landing";
import BmiAkgCalculator from "./pages/BmiAkgCalcPage";
import Profile from "./pages/Profile";
import Rekomendasi from "./pages/Rekomendasi";
import Kalori from "./pages/Kalori";
import DetailRekom from "./pages/DetailRekom";
import Checkin from "./pages/Checkin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverAccount from "./pages/RecoverAccount";
import Resep from "./pages/Resep";
import AddResep from "./pages/AddResep";
import DetailResep from "./pages/DetailResep";
import EditResep from "./pages/EditResep";

import { AppProvider } from "./context/appContext";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      offset: 20,
      easing: "ease",
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />{" "}
            <Route path="/profile" element={<Profile />} />{" "}
            <Route path="/kalkulatorBMIAKG" element={<BmiAkgCalculator />} />{" "}
            <Route path="/rekomendasi" element={<Rekomendasi />} />{" "}
            <Route path="/detail/:type/:id" element={<DetailRekom />} />{" "}
            <Route path="/check-in" element={<Checkin />} />{" "}
            <Route path="/kalori" element={<Kalori />} />{" "}
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/register" element={<Register />} />{" "}
            <Route path="/forgotPassword" element={<ForgotPassword />} />{" "}
            <Route path="/recoverAccount" element={<RecoverAccount />} />{" "}
            <Route path="/resep" element={<Resep />} />{" "}
            <Route path="/tambah-resep" element={<AddResep />} />{" "}
            <Route path="/detail-resep/:id" element={<DetailResep />} />{" "}
            <Route path="/edit-resep/:id" element={<EditResep />} />{" "}
          </Routes>{" "}
        </Router>{" "}
      </AppProvider>{" "}
    </>
  );
}

export default App;
