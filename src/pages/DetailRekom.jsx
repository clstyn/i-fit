import { useState, useCallback, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { NavigateBefore } from "@mui/icons-material";

const DetailRekom = () => {
  const [item, setItem] = useState({});
  const { type, id } = useParams();
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AppContext);

  const fetchDetailRecipe = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://i-fit-be.vercel.app/${type}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (type === "diet") {
          setItem(response.data.diet);
        } else if (type === "olahraga") {
          setItem(response.data.olahraga);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetailRecipe();
  }, [fetchDetailRecipe]);

  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row w-5/6 mx-auto mt-48 gap-12 mb-10">
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between">
            <div className="text-xl flex items-center gap-2">
              <Link
                to="/rekomendasi"
                className="flex items-center cursor-pointer"
              >
                <NavigateBefore style={{ fontSize: "32px" }}></NavigateBefore>
                <p className="hidden lg:flex">K E M B A L I</p>
              </Link>
            </div>
            <h1 className="font-semibold text-4xl">
              {type === "diet" ? item.jenis_diet : item.exercise}
            </h1>
          </div>
          <p className="mt-8 text-xl indent-5 lg:indent-0 text-justify lg:text-right">
            {type === "diet" ? item.diet_desc : item.desc}
          </p>
          {/* <div className="flex justify-center w-full mt-8">
            <ArrowDropDownCircle
              className="cursor-pointer text-c-hijautua"
              style={{ fontSize: "36px" }}
            ></ArrowDropDownCircle>
          </div> */}
        </div>
        <div className="w-full lg:w-1/2 h-[335px] rounded-lg bg-gray-500">
          <img
            src={item.url}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>

      <div id="reference" className="bg-detail-rekom bg-cover py-24 ">
        {/*<div className="flex flex-col w-5/6 mx-auto items-center justify-center">
          <h1 className="mt-24 mb-12 font-kaushan text-4xl lg:text-5xl">
            Referensi
          </h1>
          <ul className="text-xl md:text-2xl lg:text-3xl">
            {item.refs.map((ref) => (
              <li className="my-4">
                <Circle className="mr-8" style={{ fontSize: "32px" }}></Circle>
                <a href={ref} target="_blank" rel="noreferrer">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>*/}
      </div>
    </div>
  );
};

export default DetailRekom;
