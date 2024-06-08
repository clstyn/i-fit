import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  NavigateBefore,
  ArrowDropDownCircle,
  Circle,
} from "@mui/icons-material";

const DetailRekom = () => {
  const [item, setItem] = useState({
    id: 1,
    title: "Judul Diet",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum tincidunt est ac finibus. Etiam convallis felis purus, eu dictum urna malesuada quis. Etiam facilisis imperdiet venenatis. Aliquam accumsan enim quis orci fringilla ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed blandit ultricies massa. Aliquam erat volutpat. Vivamus mi metus, interdum eu lacus vel, ultricies scelerisque arcu. Nulla molestie eleifend semper. Maecenas tempor mi at accumsan gravida.",
    refs: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
  });

  return (
    <div className="font-poppins text-c-birdong">
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row w-5/6 mx-auto mt-48 gap-12">
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between">
            <div className="text-xl flex items-center gap-2">
              <NavigateBefore style={{ fontSize: "32px" }}></NavigateBefore>
              <p className="hidden lg:flex">K E M B A L I</p>
            </div>
            <h1 className="font-semibold text-4xl">{item.title}</h1>
          </div>
          <p className="mt-8 text-xl indent-5 lg:indent-0 text-justify lg:text-right">{item.desc}</p>
          <div className="flex justify-center w-full mt-8">
            <ArrowDropDownCircle
              className="cursor-pointer text-c-hijautua"
              style={{ fontSize: "36px" }}
            ></ArrowDropDownCircle>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-[335px] rounded-lg bg-gray-500"></div>
      </div>

      <div id="reference" className="bg-detail-rekom bg-cover py-24 ">
        <div className="flex flex-col w-5/6 mx-auto items-center justify-center">
          <h1 className="mt-24 mb-12 font-kaushan text-4xl lg:text-5xl">Referensi</h1>
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
        </div>
      </div>
    </div>
  );
};

export default DetailRekom;
