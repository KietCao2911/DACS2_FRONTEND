import React from "react";
import { Card } from "antd";
import "./CardProduct.scss";
import { Link } from "react-router-dom";
import glamorous from "glamorous";
import glamor from "glamor";
import MyButton from "../Button";
const DivCard = glamorous.div({
  " &::before": {
    backgroundColor: "red",
  },
});

const CardProduct = ({ value = {} }) => {
  console.log({ value });
  const { maSanPham, tenSanPham, giaBanDisplay, boSuuTap, slug, img, color } =
    value;
  return (
    <Link to={`/san-pham/${slug.trim()}/${maSanPham}`}>
      <DivCard
        className={"Card"}
        css={{
          " &::before": {
            backgroundColor: "#" + color[0]?.value,
          },
        }}
      >
        <div className="ImgBox">
          <img
            src={
              `https://localhost:44328/wwwroot/res/SanPhamRes/Imgs/${maSanPham.trim()}/${color[0]?.idMaumau.trim()}/${
                color[0]?.hinhAnhInfo[0]?.name
              }` || null
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
            {color?.map((cl) => (
              <span>{cl.label}</span>
            ))}
          </div>
          <div className="Price">199999VND</div>
          <a href="#">
            <div className="btn">BUY NOW</div>
          </a>
        </div>
      </DivCard>
    </Link>
  );
};

export default CardProduct;
