import React, { useState } from "react";
import "./Filter.scss";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Menu } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import SizeOptions from "./components/sizeOptions";
import ColorOptions from "./components/colorsOptions";
import * as request from "~/axiosRequest/request";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SanPhamSlice, * as Api from "~/redux/slices/SanPham";
import MyButton from "~/components/commomComponents/Button";
import MyCollapse from "~/components/commomComponents/Collapse";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Sắp xếp theo", uuidv4(), null, [
    getItem(
      <Link to={"?sort=price-low-to-hight"}> Giá thấp đến giá cao </Link>,
      uuidv4()
    ),
    getItem(
      <Link to={"?sort=price-hight-to-low"}> Giá cao đến giá thấp </Link>,
      uuidv4()
    ),
    getItem(<Link to={"?sort=date-newest"}> Mới nhất </Link>, uuidv4()),
    getItem(<Link to={"?sort=date-oldest"}> Cũ nhất </Link>, uuidv4()),
    getItem(<Link to={"?sale=true"}> Đang giảm giá </Link>, uuidv4()),
  ]),
];
const Filter = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.SanPham);
  console.log({slug})

  useEffect(() => {
    const sort = searchParams.get("sort") || null;
    const size = searchParams.get("size") || null;
    const color = searchParams.get("color") || null;
    const sale = searchParams.get("sale") || null;
    dispatch(
      Api.fetchGetAllProducts({
        id: slug,
        params: {
          sort,
          size,
          color,
          sale,
        },
      })
    );
  }, [searchParams,slug]);
  return (
    <div className="Filter">
      <MyButton style={{border:"unset",borderRadius:"unset",maxWidth:"25rem"}}onClick={() => setOpenDrawer(true)}>
        Lọc & Sắp xếp <FilterOutlined />
      </MyButton>
      <Drawer
        placement="left"
        visible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <h3>LỌC VÀ SẮP XẾP</h3>
        <Menu items={items} mode="inline"></Menu>
        <ColorOptions />
        <SizeOptions />
      </Drawer>
    </div>
  );
};

export default Filter;
