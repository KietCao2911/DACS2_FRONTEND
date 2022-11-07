import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import * as request from "~/axiosRequest/request";
import { useEffect, useState } from "react";
import CardProduct from "~/components/commomComponents/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/SanPham";
const NewRelease = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.SanPham);
  console.log({ products });
  useEffect(() => {
    dispatch(Api.fetchGetLatestProducts());
  }, []);
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
            slidesPerView: 4,
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
        {products?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <CardProduct value={item}></CardProduct>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default NewRelease;
