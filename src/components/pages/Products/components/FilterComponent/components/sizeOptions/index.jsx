import { Select, Checkbox, Radio, Menu } from "antd";
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
  {
    label: "40",
    value: "99",
  },
];
const SizeOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const size = searchParams.get("size");
  const color = searchParams.get("color") || null;

  const handleChange = (e) => {
    setSearchParams({
      color,
      size:e.target.value,
    });
  };
  return (
    <Menu mode="inline">
      <Menu.SubMenu title="Kích cỡ">
      <Radio.Group
      defaultValue={size}
      onChange={handleChange}
    >
      <Radio value={8}>36</Radio>
      <Radio value={9}>37</Radio>
      <Radio value={1}>38</Radio>
      <Radio value={2}>39</Radio>
      <Radio value={3}>40</Radio>
      <Radio value={4}>41</Radio>
      <Radio value={5}>42</Radio>
      <Radio value={6}>43</Radio>
      <Radio value={7}>44</Radio>
      <Radio value={10}>S</Radio>
      <Radio value={11}>M</Radio>
      <Radio value={16}>L</Radio>
      <Radio value={12}>XS</Radio>
      <Radio value={13}>XL</Radio>
      <Radio value={14}>2XL</Radio>
      <Radio value={15}>3XL</Radio>
    </Radio.Group>
      </Menu.SubMenu>
    </Menu>
  );
};

export default SizeOptions;
