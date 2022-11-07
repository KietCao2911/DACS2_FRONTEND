import React from "react";
import "./Button.scss";
const MyButton = ({ children, ...props }) => {
  const { Icon } = props;
  return (
    <button className="MyButton" {...props}>
      <div className="Icon">{Icon}</div>
      <div className="Content">{children}</div>
    </button>
  );
};

export default MyButton;
