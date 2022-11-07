import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./MePage.scss"
import AccountPage from "./pages/AccountPage";
import NewPage from "./pages/NewsPage";
import OrderPage from "./pages/OrderPage";
import { useRef } from "react";
import { useEffect } from "react";

const MePage = () => {
  const [itemsNav,setItemsNav]= useState([true,false,false])
  return <div className="MePage PageContainer">
      <div className="HeaderNavAccount">
        <div className="infomation">
          <div className="name">CHÀO MỪNG 0325560344 TRỞ LẠI</div>
          <div className="level">LEVEL DIMOND</div>
        </div>
        <div className="nav">
          <Link   to="" >Tin tức</Link>
          <Link to="don-hang"  >Đơn hàng</Link>
          <Link to="tai-khoan">Tài khoản</Link>
        </div>
      </div>

    <div className="Content">
    <Outlet/>
    </div>

    <Routes>
      <Route path="" element={<NewPage/>}></Route>
      <Route path="don-hang" element={<OrderPage/>}></Route>
      <Route path="tai-khoan" element={<AccountPage/>}></Route>
    </Routes>
  </div>;
};

export default MePage;
