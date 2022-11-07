import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import Image from "rc-image";
import * as Api from "~/redux/slices/BoSuuTap";
import "swiper/css/pagination";
import { useEffect } from "react";
import { BASE_URL } from "~/const";
import { Link } from "react-router-dom";
import { Button } from "antd";
const BSTSlider = () => {
  const { boSuuTaps } = useSelector((state) => state.BoSuuTap);
  console.log(boSuuTaps);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Api.fetchAllBST({}));
  }, []);

  return (
    <Swiper
      // loop={true}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      // spaceBetween={30}
      // pagination={{
      //   clickable: true,
      // }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {boSuuTaps.map((item) => {
        return (
          <SwiperSlide>
            <Link to={"notcontent"}>
              {" "}
              <img
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                src={`${BASE_URL}wwwroot/res/BstImgs/${item.img}`}
              />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default BSTSlider;
