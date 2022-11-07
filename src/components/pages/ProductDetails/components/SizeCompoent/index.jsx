import { Col, Row } from "antd";
import React from "react";
import "./SizeSelect.scss";
import { v4 as uuidv4 } from "uuid";
import KichCoSlice, {
  checkedSize,
  fetchALLSize,
  fillSizes,
} from "~/redux/slices/KichCoSlice";
import SanPhamSlice, { sizeSelected } from "~/redux/slices/SanPham";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
const SizeRadio = ({ label, value, onChange }) => {
  const { product } = useSelector((state) => state.SanPham);
  const dispatch = useDispatch();
  return (
    <div className="SizeRadio">
      <input
        id={value}
        type={"radio"}
        name={"checkboxGroup"}
        value={value}
        onChange={() => dispatch(sizeSelected({size:value,color:product.colorSelected}))}
        checked={product.sizeSelected?.idSize == value ? true : false}
      />
      <label htmlFor={value}>{label || 35}</label>
    </div>
  );
};
const SizeSelect = ({ items, setSize }) => {
  const change = (e) => {
    console.log({ test: e.target.value });
  };
  return (
    <Row gutter={0}>
      {items.sizeDetails?.map((item) => {
        {
          console.log({ item });
        }
        return (
          <Col key={uuidv4()} span={6}>
            {" "}
            <SizeRadio label={item.sizeLabel} value={item.idSize} />
          </Col>
        );
      })}
    </Row>
  );
};

export default SizeSelect;
