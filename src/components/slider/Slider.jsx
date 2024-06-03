// src/components/Slider.js

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import "./slider.css";

const Slider = () => {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
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
      <SwiperSlide className="slide" style={{ background: "lightblue" }}>
        1
      </SwiperSlide>
      <SwiperSlide className="slide" style={{ background: "coral" }}>
        2
      </SwiperSlide>
      <SwiperSlide className="slide" style={{ background: "chartreuse" }}>
        3
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
