import { Drawer, Menu } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MenuMobile = ({ menuMobileOpen, setMenuMobileOpen }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.DanhMuc);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(
      items?.menu?.map((item) => {
        return getItem(
          <Link to={`/${item.info.slug}`}>{item.info.tenDanhMuc}</Link>,
          item.info.id,
          null,
          item.children.map((item2) => {
            console.log({ item2 });
            return getItem(
              <Link to={`/${item2.info.slug}`}>{item2.info.tenDanhMuc}</Link>,
              item2.info.id,
              null,
              item2.children.map((item3) => {
                return getItem(
                  <Link to={`/${item3.info.slug}`}>
                    {item3.info.tenDanhMuc}
                  </Link>,
                  item3.id
                );
              })
            );
          })
        );
      })
    );
  }, [items]);

  return (
    <Drawer
      visible={menuMobileOpen}
      onClose={() => setMenuMobileOpen(false)}
      placement="left"
      className="MenuMobile"
    >
      <Menu items={data || []} mode={"inline"} />
    </Drawer>
  );
};

export default MenuMobile;
