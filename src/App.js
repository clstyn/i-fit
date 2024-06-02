import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import BmiAkgCalculator from "./pages/BmiAkgCalcPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kalkulatorBMIAKG" element={<BmiAkgCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
