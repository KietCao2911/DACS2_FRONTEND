import React from "react";
import { Checkbox, Radio } from "antd";
import "./colorOptions.scss";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const ColorOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const items = [
    {
      label: "Đỏ",
      value: "ff0000",
    },
    {
      label: "Hồng",
      value: "pink",
    },
    {
      label: "Vàng",
      value: "yellow",
    },
  ];
  let checkedItems = searchParams.get("color");
  const handleCheckBox = (e) => {
    setSearchParams({
      sort: searchParams.get("sort") || "",
      size: searchParams.getAll("size") || "",
      color: e.target.value,
    });
  };
  const handleDefaultChecked = (e) => {
    let status = checkedItems.find((x) => x == e.target.value);
    console.log({ e });
    if (status) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Radio.Group
      defaultValue={checkedItems}
      onChange={handleCheckBox}
      options={items}
    >
      {" "}
    </Radio.Group>
  );
};

export default ColorOptions;
