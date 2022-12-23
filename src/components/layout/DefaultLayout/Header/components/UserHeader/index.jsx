import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "~/components/commomComponents/Button";
import {UserOutlined} from "@ant-design/icons"
const UserHeader = () => {
  const { user } = useSelector((state) => state.XacThuc);
  console.log(user == false);
  return (
    <div className="UserHeader">
      {Object.keys(user).length > 0 ? (
        <Link to="/me" className="User">
          <MyButton style={{border:"unset"}} icon={<UserOutlined/>}> Người dùng : {user.nameDisplay||user.userName}</MyButton>
        </Link>
      ) : (
        <Link to="/dang-nhap" className="NonUser">
          <MyButton style={{border:"unset"}} icon={<UserOutlined/>}>Đăng nhập</MyButton>
        </Link>
      )}
    </div>
  );
};

export default UserHeader;
