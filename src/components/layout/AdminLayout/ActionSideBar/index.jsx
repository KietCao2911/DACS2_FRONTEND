import React from "react";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function ActionSideBar() {
  function getItem(label, key, children, icon) {
    return {
      key,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <Link to={"/admin"}>Trang chính</Link>,
      "main",
      null,
      <DownOutlined />
    ),
    getItem("Quản lý sản phẩm", "sub1", [
      getItem(
        <Link to={"/admin/trang-quan-tri-san-pham"}> Sản phẩm</Link>,
        "1",
        null,
        <DownOutlined />
      ),
      getItem(
        <Link to={"/admin/trang-quan-tri-danh-muc"}> Danh mục</Link>,
        "2"
      ),
      getItem(
        <Link to={"/admin/trang-quan-tri-bo-suu-tap"}>Bộ sưu tập</Link>,
        "3"
      ),
    ]),
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
  ];
  return (
    <Menu
      style={{
        minHeight: "100vh",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      }}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="light"
      items={items}
    />
  );
}

export default ActionSideBar;
