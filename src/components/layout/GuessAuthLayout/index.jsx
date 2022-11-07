import React from "react";
import "./GuessAuthLayout.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const GuessAuthLayout = ({ children }) => {
  const { user } = useSelector((state) => state.XacThuc);
  let navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length > 0 && user?.role == 0) {
      navigate("/");
    }
  }, [user.role]);
  return (
    <div className="GuessAuthLayout">
      <div className="mainAuthLayout">
        <h1>Chào mừng đến với SHOP</h1>
        {children}
      </div>
    </div>
  );
};

export default GuessAuthLayout;
