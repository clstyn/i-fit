// src/components/Slider.js

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import "./slider.css";

const Slider = ({ image1, image2, image3 }) => {
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
    >
      <SwiperSlide className="slide">
        <img
          src={image1}
          alt="Slide 1"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <img
          src={image2}
          alt="Slide 2"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <img
          src={image3}
          alt="Slide 3"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
