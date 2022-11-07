import React from "react";
import "./ResultCard.scss";
import { Card } from "antd";
import { Link } from "react-router-dom";
const ResultCard = () => {
  return (
    <Card style={{ margin: "1rem 0" }}>
      <Link to={"/"} className="ResultCard">
        <img
          src="https://assets.adidas.com/images/w_600,f_auto,q_auto/e1e5fedf4a884de68b80ae83013560d6_9366/Giay_Superstar_trang_GW2045_01_standard.jpg"
          className="ResultCardImg"
        />
        <div className="ResultCardInfo">
          <div className="InfoCategory">eqwe</div>
          <div className="InfoName">weq</div>
          <div className="InfoPrice">
            500 <del>1000</del>{" "}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ResultCard;
