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
import { fetchGetQTY } from "~/redux/slices/ChiTietSoLuong/CtslAPI";
const SizeRadio = ({ label, value, onChange ,disable}) => {
  const { product } = useSelector((state) => state.SanPham);
  const {QtyRemain} = product
  const dispatch = useDispatch();
  const handleSelected = async()=>
  {
      try {
        const res = await fetchGetQTY(product.maSanPham,product.colorSelected,value)
        dispatch(sizeSelected({size:value,color:product.colorSelected,Qty:res}))

      } catch (error) {
        
      }
  }
  return (
   <>
    <div className={`SizeRadio ${disable?"disable":""}`}>
      {disable&&<span className="disableMess">Tạm hết hàng</span>}
      <input
      disabled={disable}
        id={value}
        type={"radio"}
        name={"checkboxGroup"}
        value={value}
        onChange={() =>handleSelected() }
        checked={product.sizeSelected?.idSize == value ? true : false}
      />
      <label htmlFor={value}>{label || 35}
      
      </label>
      
    </div>
   
   </>
  );
};
const SizeSelect = ({ items, setSize }) => {
  const change = (e) => {
    console.log({ test: e.target.value });
  };
  const { product } = useSelector((state) => state.SanPham);
  const {QtyRemain} = product
  return (
    <Row gutter={[10,10]}>
      {items.sizeDetails?.map((item) => {
        {
          console.log({ item });
        }
        return (
          <Col key={uuidv4()} span={6}>
            {" "}
            <SizeRadio key={uuidv4()} label={item.sizeLabel} value={item.idSize} disable={item.soLuongTon>0?false:true}/>
          </Col>
        );
      })}
       {QtyRemain<10&&QtyRemain>0?<small style={{color:"red"}}><b>Chỉ còn {QtyRemain} trong kho.</b></small>:QtyRemain<=0?<small style={{color:"red"}}><b>Sản phẩm vừa hết hàng.</b></small>:null}
    </Row>
  );
};

export default SizeSelect;
