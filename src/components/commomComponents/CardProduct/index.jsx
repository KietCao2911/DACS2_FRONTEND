import React from "react";
import { Card } from "antd";
import "./CardProduct.scss";
import { Link } from "react-router-dom";
import glamorous from "glamorous";
import glamor from "glamor";
import MyButton from "../Button";
import { useState } from "react";
const DivCard = glamorous.div({
  " &::before": {
    backgroundColor: "red",
  },
});

const CardProduct = ({ value = {} }) => {
  const { maSanPham, tenSanPham, giaBanDisplay, boSuuTap, slug, chiTietSoLuong ,color} =
  value;
  const [img,setImg]  = useState(color[0]||null);
  console.log({img})
  const handleHover=(index)=>
{
  setImg(color[index])
}
  return (
      <DivCard
        className={"Card"}
        css={{
          " &::before": {
            backgroundColor: "#" + img?.idMaumau||'fff',
          },
        }}
      >
        <div className="ImgBox">
          <img
            src={
              img?.hinhAnhInfo[0]?.url||null 
            }
            alt=""
          />
        </div>
        <div className="ContentBx" data-content={maSanPham}>
          <div className="Size">
            <h3>Size: </h3>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className="Color">
            <h3>Color: </h3>
            {color&&color?.map((cl,index) => (
              <span onMouseEnter={()=>handleHover(index)} style={{backgroundColor:"#"+cl.idMaumau}}></span>
            ))}
          </div>
          <div className="Price">{giaBanDisplay}</div>
              <Link to={`/san-pham/${slug.trim()}/${maSanPham}`} className="btnOrder">
                <button>Xem chi tiết</button>
              </Link>
        </div>
      </DivCard>

  );
};

export default CardProduct;
