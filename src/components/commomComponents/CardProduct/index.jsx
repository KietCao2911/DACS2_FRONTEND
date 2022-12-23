import React from "react";
import { Card } from "antd";
import "./CardProduct.scss";
import { Link } from "react-router-dom";
import glamorous from "glamorous";
import glamor from "glamor";
import MyButton from "../Button";
import { useState } from "react";
import convertVND from "~/components/utils/ConvertVND";
import { v4 } from "uuid";

const CardProduct = ({ value = {} }) => {
  const { maSanPham, tenSanPham, giaBan,giamGia, boSuuTap,key, slug, chiTietSoLuong ,color,giaDaGiam} =
  value;
  const [img,setImg]  = useState(color&&color[0]||null);
  const handleHover=(index)=>
{
  setImg(color[index])
}
  return (
     <div className="Card">
      <Link to={`/san-pham/${slug?.trim()}`}>
        {giamGia>0&&<span className="band" data={convertVND(giaBan/((100-giamGia)/100))}></span>}
        <div className="ImgBox">
          <img
            src={
              img?.hinhAnhInfo[0]?.url||"" 
            }
            alt=""
          />
        </div>
        <div className="ContentBx" data-content={maSanPham}>
          <div className="Color">
            {color?color&&color?.map((cl,index) => (
              <span key={v4()} onMouseEnter={()=>handleHover(index)} style={{backgroundColor:"#"+cl?.idMaumau||"fff"}}></span>
            )):null}
          </div>
          <div className="tenSanPham">{tenSanPham}</div>
          <div className="Price">{convertVND(giaBan)}  </div>

              {/* <Link to={`/san-pham/${slug?.trim()}`} className="btnOrder">
                <MyButton>Xem chi tiết</MyButton>
              </Link> */}
        </div>
        </Link>
     </div>
  );
};

export default CardProduct;
