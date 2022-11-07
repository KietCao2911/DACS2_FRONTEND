import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"
const FooterMainHome = () => {
  return   <div className="Footer">
      <div className="FooterPc">
        <div className="ProductsInfo">
          <ul>
            <span>SẢN PHẨM</span>
            <Link to="/">GIÀY NAM</Link>
            <Link to="/">GIÀY NỮ</Link >
            <Link to="/">TRẺ EM</Link >
            <Link to="/">THỂ THAO</Link >
          </ul>
        </div>
        <div className="InfoShop">
        <ul>
            <span>VỀ CỬA HÀNG</span>
            <Link to="/">GIÀY NAM</Link>
            <Link to="/">GIÀY NỮ</Link >
            <Link to="/">TRẺ EM</Link >
            <Link to="/">THỂ THAO</Link >
          </ul>
        </div>
        <div className="Support">
        <ul>
            <span>HỖ TRỢ</span>
            <Link to="/">GIÀY NAM</Link>
            <Link to="/">GIÀY NỮ</Link >
            <Link to="/">TRẺ EM</Link >
            <Link to="/">THỂ THAO</Link >
          </ul>
        </div>
        <div className="Contact"><ul>
          <span>LIÊN HỆ</span>
        <Link to="/">GIÀY NAM</Link>
            <Link to="/">GIÀY NỮ</Link >
            <Link to="/">TRẺ EM</Link >
            <Link to="/">THỂ THAO</Link >
          </ul></div>
      </div>
  </div>;
};

export default FooterMainHome;
