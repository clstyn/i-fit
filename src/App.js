import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BmiAkgCalculator from "./pages/BmiAkgCalcPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/kalkulatorBMIAKG" element={<BmiAkgCalculator />} />{" "}
      </Routes>{" "}
    </Router>
    // <div className="App">
    //   <p className="text-c-hijautua text-5xl font-kaushan">Hello I-Fit</p>
    //   <p className="text-c-hijautua text-5xl font-poppins">Hellaw I-Fit</p>
    // </div>
  );
}

export default App;
