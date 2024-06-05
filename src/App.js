import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />{" "}
        <Route path="/profile" element={<Profile />} />{" "}
        <Route path="/kalkulatorBMIAKG" element={<BmiAkgCalculator />} />{" "}
        <Route path="/rekomendasi" element={<Rekomendasi />} />{" "}
        <Route path="/detail" element={<DetailRekom />} />{" "}
        <Route path="/check-in" element={<Checkin />} />{" "}
        <Route path="/kalori" element={<Kalori />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/forgotPassword" element={<ForgotPassword />} />{" "}
        <Route path="/recoverAccount" element={<RecoverAccount />} />{" "}
        <Route path="/resep" element={<Resep />} />{" "}
        <Route path="/tambah-resep" element={<AddResep />} />{" "}
        <Route path="/detail-resep" element={<DetailResep />} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
