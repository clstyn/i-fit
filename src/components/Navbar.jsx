import { AccountCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-24 bg-white px-12 w-screen font-poppins text-c-birdong fixed top-0 left-0 z-50">
      <div className="flex items-center h-full w-full justify-between">
        <div className="text-3xl font-kaushan">I-Fit</div>
        <div className="flex gap-8 text-2xl font-medium">
          <Link to={"/"}>
            <p>Home</p>
          </Link>
          <Link to={"/kalkulatorBMIAKG"}>
            <p>BMI/AKG</p>
          </Link>
          <Link to={"/kalori"}>
            <p>Kalori</p>
          </Link>
          <Link to={"/"}>
            <p>Resep</p>
          </Link>
          <Link to={"/check-in"}>
            <p>CheckIn</p>
          </Link>
        </div>
        <div>
          <Link to={"/profile"}>
            <AccountCircleOutlined
              className="text-c-orentua"
              style={{ fontSize: "32px" }}
            ></AccountCircleOutlined>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
