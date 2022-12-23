import React from "react";
import "./ColorChecked.scss";
import { Col, Row } from "antd";
import { v4 as uuidv4, v4 } from "uuid";
import { getImgs } from "~/redux/slices/SanPham";
import { useDispatch, useSelector } from "react-redux";
const Item = ({ value, checked = false, onChange }) => {
  console.log({ value });
  const { product } = useSelector((state) => state.SanPham);
  return (
    <>
      <div className="ColorChecked">
        <input
          id={value}
          checked={product.colorSelected == value ? true : false}
          type={"radio"}
          name={"ColorCheckbox"}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={value} style={{ backgroundColor: "#" + value }}></label>
      </div>
    </>
  );
};
const ColorComponent = ({ items }) => {
  const dispatch = useDispatch();
  return (
    <>
        <Row gutter={12} >
          {items &&
            items?.map((item) => {
              {
                console.log({ item });
              }
              return (
              <Col key={v4()}  span={3}>  <Item
              value={item.idMaumau.trim()}
              onChange={(e) => dispatch(getImgs(item.idMaumau.trim()))}
            /></Col>
              );
            })}
        </Row>
    </>
  );
};

export default ColorComponent;
