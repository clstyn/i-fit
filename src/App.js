import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import BmiAkgCalculator from "./pages/BmiAkgCalcPage";
import Profile from "./pages/Profile";
import Rekomendasi from "./pages/Rekomendasi";
import DetailRekom from "./pages/DetailRekom";
import Checkin from "./pages/Checkin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kalkulatorBMIAKG" element={<BmiAkgCalculator />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/detail" element={<DetailRekom />} />
        <Route path="/check-in" element={<Checkin />} />
      </Routes>
    </Router>
  );
}

export default App;
