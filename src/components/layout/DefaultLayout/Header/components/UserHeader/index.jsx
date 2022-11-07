import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "~/components/commomComponents/Button";
const UserHeader = () => {
  const { user } = useSelector((state) => state.XacThuc);
  console.log(user == false);
  return (
    <div className="UserHeader">
      {Object.keys(user).length > 0 ? (
        <Link to="/me" className="User">
          <MyButton> Người dùng : {user.userName}</MyButton>
        </Link>
      ) : (
        <Link to="/dang-nhap" className="NonUser">
          <MyButton>Đăng nhập</MyButton>
        </Link>
      )}
    </div>
  );
};

export default UserHeader;
