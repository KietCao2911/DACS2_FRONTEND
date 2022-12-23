import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import * as request from "~/axiosRequest/request";
import { useEffect, useState } from "react";
import CardProduct from "~/components/commomComponents/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/SanPham";
import { Skeleton } from "antd";
import { v4 } from "uuid";
const NewRelease = () => {
  const dispatch = useDispatch();
  const { productsLatest } = useSelector((state) => state.SanPham);
  return (
    <div>
      <Swiper
        breakpoints={{
          // when window width is >= 640px

          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1600: {
            width: 1600,
            slidesPerView: 3,
          },
        }}
        style={{ padding: "1rem" }}
        pagination={{
          clickable: true,
        }}
        spaceBetween={10}
        modules={[Pagination]}
        className="mySwiper"
      >
        {productsLatest.length>0?productsLatest?.map((item) => {
          return (
            <SwiperSlide key={v4()}>
              <CardProduct value={item}></CardProduct>
            </SwiperSlide>
          );
        }):<Skeleton active={true}></Skeleton>}
        
      </Swiper>
    </div>
  );
};

export default NewRelease;
