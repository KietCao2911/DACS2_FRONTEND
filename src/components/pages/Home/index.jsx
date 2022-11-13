import React from "react";
import BSTSlider from "./components/BSTSlider";
import NewRelease from "./components/NewReleaseSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Space } from "antd";
document.title = "Trang chính";

const Home = () => {
  return (
    <div>
      <BSTSlider />
      <div className="headingPage">VỪA CẬP NHẬT</div>
      <NewRelease />
    </div>
  );
};

export default Home;
