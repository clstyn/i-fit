// src/components/Slider.js
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import "./slider.css";

const Slider = ({ picArray, setActivePic }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (picArray && picArray.length > 0) {
      setActivePic(picArray[1]);
    }
  }, [picArray, setActivePic]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    if (picArray && picArray.length > 0) {
      setActivePic(picArray[swiper.activeIndex]);
    }
  };

  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      initialSlide={1}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 250,
        modifier: 1.5,
        slideShadows: true,
      }}
      modules={[EffectCoverflow]}
      className="mySwiper"
      onSlideChange={handleSlideChange}
    >
      {picArray && picArray.length > 0 ? (
        picArray.map((item, index) => (
          <SwiperSlide key={index} className="slide">
            <img
              src={item.url}
              alt={item.exercise}
              style={{ borderRadius: "10px" }}
            />
          </SwiperSlide>
        ))
      ) : (
        <div>
          <SwiperSlide className="slide bg-landingPic1 bg-cover"></SwiperSlide>
          <SwiperSlide className="slide bg-landingPic2 bg-cover"></SwiperSlide>
          <SwiperSlide className="slide bg-landingPic3 bg-cover"></SwiperSlide>
        </div>
      )}
    </Swiper>
  );
};

export default Slider;
