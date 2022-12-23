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
import { Badge, Card, Modal } from "antd";
import { Link } from "react-router-dom";
import MyButton from "~/components/commomComponents/Button";
import ModalCustom from "~/components/commomComponents/ModalCustom";
import InputText from "~/components/commomComponents/InputText";
import SearchResult from "./components/SearchResult";
function HeaderMainHome() {
  const [searchDrawer, setSearchDrawer] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const { totalQty } = useSelector((state) => state.GioHang);

  const handleOpenSearchDrawer = () => {
    setSearchDrawer(true);
  };
  const handleOpenMenuDrawer = () => {
    setMenuMobileOpen(true);
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
          <Link to={"/"}><img src={shoesLogo} alt="" /></Link>
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
               
            <SearchOutlined className="searchIcon"  onClick={()=>setSearchModal(true)}/>
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
            <SearchResult setVisible={setSearchModal} visible={searchModal}></SearchResult>
    </div>
  );
}

export default HeaderMainHome;
