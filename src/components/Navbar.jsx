import { AccountCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-24 bg-white px-12 w-screen font-poppins text-c-birdong fixed top-0 left-0 z-50">
      <div className="flex items-center h-full w-full justify-between">
        <div className="text-4xl font-kaushan">I-Fit</div>
        <div className="flex gap-8 text-3xl font-medium">
          <Link to={"/"}>
            <p>Home</p>
          </Link>
          <Link to={"/"}>
            <p>BMI/AKG</p>
          </Link>
          <Link to={"/"}>
            <p>Kalori</p>
          </Link>
          <Link to={"/"}>
            <p>Resep</p>
          </Link>
          <Link to={"/"}>
            <p>CheckIn</p>
          </Link>
        </div>
        <div>
          <AccountCircleOutlined
            className="text-c-orentua"
            style={{ fontSize: "38px" }}
          ></AccountCircleOutlined>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
