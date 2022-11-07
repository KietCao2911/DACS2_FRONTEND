import { Select, Checkbox, Radio } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
const options = [
  {
    label: "34",
    value: "1",
  },
  {
    label: "35",
    value: "2",
  },
];
const SizeOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const size = searchParams.get("size");

  const handleChange = (e) => {
    searchParams.append("size", e);
    let newQuery = [];
    setSearchParams({
      sort: searchParams.get("sort"),
      size: e.target.value,
      color: searchParams.getAll("color"),
    });
  };
  return (
    <Radio.Group
      defaultValue={size}
      options={options}
      onChange={handleChange}
    ></Radio.Group>
  );
};

export default SizeOptions;
