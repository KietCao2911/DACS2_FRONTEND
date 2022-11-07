import React from "react";
import "./ColorChecked.scss";
import { Col, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
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
const ColorComponent = ({ items, setSize }) => {
  const dispatch = useDispatch();
  return (
    <>
        <Row gutter={10}>
          {items &&
            items?.map((item) => {
              {
                console.log({ item });
              }
              return (
                <Col key={uuidv4()} span={4}>
                  {" "}
                  <Item
                    value={item.idmau.trim()}
                    onChange={(e) => dispatch(getImgs(item.idmau))}
                  />
                </Col>
              );
            })}
        </Row>
    </>
  );
};

export default ColorComponent;
