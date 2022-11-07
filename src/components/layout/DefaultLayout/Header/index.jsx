import React, { useState } from "react";
import UserHeader from "./components/UserHeader";
import "./HeaderMainHome.scss";
import MenuComponent from "./components/Menu";
import SearchDrawer from "./components/SearchDrawer";
import { BarsOutlined } from "@ant-design/icons";
import shoesLogo from "~/assets/shoesLogo.png";
import MenuMobile from "./components/MenuMobile";
import GioHangSlice from "~/redux/slices/GioHang/GioHangSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Card } from "antd";
import { Link } from "react-router-dom";
function HeaderMainHome() {
  const [searchValue, setSearchValue] = useState("");
  const [searchDrawer, setSearchDrawer] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const { totalQty } = useSelector((state) => state.GioHang);

  const handleClearTextSearch = () => {
    setSearchValue("");
  };
  const handleOpenSearchDrawer = () => {
    setSearchDrawer(true);
  };
  const handleOpenMenuDrawer = () => {
    setMenuMobileOpen(true);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div
      className="MainHeader"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchDrawer
        SearchDrawer={searchDrawer}
        setSearchDrawer={setSearchDrawer}
      />
      <MenuMobile
        menuMobileOpen={menuMobileOpen}
        setMenuMobileOpen={setMenuMobileOpen}
      />
      {/* <div className="UserHeader">
        <UserHeader />
      </div> */}
      <div className="SubHeader">
        <div className="MenuIconMobile">
          <BarsOutlined onClick={handleOpenMenuDrawer} />
        </div>
        <div className="Logo">
          <img src={shoesLogo} alt="" />
        </div>
        <div className="Menu">
          <MenuComponent />
        </div>
        <div className="Actions">
          <div className="SearchContainer__mobile">
            <SearchOutlined
              className={"iconSearch__mobile"}
              onClick={handleOpenSearchDrawer}
            />
          </div>
          <div className="Search_Container">
            <div className="content">
              <input
                type="text"
                className="SearchInput"
                placeholder="Tìm kiếm"
                value={searchValue}
                onChange={handleSearch}
              />
              {searchValue == "" && <SearchOutlined className="searchIcon" />}
              {searchValue && (
                <CloseOutlined
                  className="closeIcon"
                  onClick={handleClearTextSearch}
                />
              )}
            </div>
            {/* <div className="SearchResult">
              <h3>SẢN PHẨM</h3>
              <CustomSpin />
            </div> */}
          </div>
          <div className="Cart_Container">
            <Badge count={totalQty}>
              <Link to="/gio-hang">
                {" "}
                <ShoppingCartOutlined className="cartIcon" />
              </Link>
            </Badge>
          </div>
          <div className="UserInfo">
            <UserHeader />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMainHome;
