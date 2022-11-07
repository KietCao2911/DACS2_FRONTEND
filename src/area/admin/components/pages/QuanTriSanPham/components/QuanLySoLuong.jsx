import React from "react";
import { useState, useEffect } from "react";
import { Select, Input, InputNumber, Form, Button, notification } from "antd";
import { Get, Post, Delete, Put } from "~/axiosRequest/request";
import { v4 as uuidv4 } from "uuid";
import { type } from "@testing-library/user-event/dist/type";
const { Option } = Select;
const {} = Input;
const Item = ({
  sizeOptions = [],
  colorOptions = [],
  virtualId,
  valueInit,
  item,
  setItem,
  maSanPham,
}) => {
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(0);
  const [init, setInit] = useState(valueInit || {});
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState({
    btnSua: false,
    btnXoa: false,
    btnThem: false,
  });
  console.log({ init });
  const handleCancel = (_id) => {
    let obj = item.find((x) => x.virtualId == virtualId);
    let index = item.indexOf(obj);
    if (index != -1) {
      item.splice(index, 1);
      setItem([...item]);
    }
  };
  const handleAdd = async () => {
    try {
      setLoading({ ...loading, btnThem: true });
      const res = await Post("/api/SoLuongDetail?maSP=" + maSanPham, {
        maMau: color,
        maSanPham,
        _idSize: size,
        soLuong: qty,
      });
      let obj = item.find((x) => x.virtualId == virtualId);
      let index = item.indexOf(obj);
      if (index != -1) {
        item[index] = res;
        item[index]._idMau = res.maMau.trim();
        item[index]._idSize = res._idSize;
        item[index].qty = res.soluong;
        item[index]._id = res._id;
        setItem([...item]);
        notification.open({
          type: "success",
          message: "Thêm thành công!",
        });
        setLoading({ ...loading, btnThem: false });
      }
    } catch (err) {
      setLoading({ ...loading, btnThem: false });
      notification.open({
        type: "error",
        message: "Đã xảy ra lỗi!",
      });
    }
  };
  const handleRemove = async () => {
    try {
      setLoading({ ...loading, btnXoa: true });
      const res = await Delete("/api/SoLuongDetail?id=" + init._id);
      let obj = item.find((x) => x._id == init._id);
      let index = item.indexOf(obj);
      if (index > -1) {
        item.splice(index, 1);
        setItem([...item]);
        notification.open({
          type: "success",
          message: "Xóa thành công!",
        });
        setLoading({ ...loading, btnXoa: false });
      }
    } catch (err) {
      setLoading({ ...loading, btnXoa: false });
      console.log(err);
      notification.open({
        type: "error",
        message: "Xóa thất bại!",
      });
    }
  };
  const handleUpdate = async () => {
    try {
      setLoading({ ...loading, btnSua: true });
      const res = await Put("/api/SoLuongDetail/" + init._id, {
        maMau: init._idMau,
        _idSize: init._idSize,
        Soluong: qty,
        maSanPham,
      });

      notification.open({
        message: "Cập nhật thành công!",
        type: "success",
      });
      setLoading({ ...loading, btnSua: false });
    } catch (err) {
      setLoading({ ...loading, btnSua: false });
      notification.open({
        message: "Cập nhật thất bại",
        type: "error",
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        // padding: "1rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Form.Item
        label={"Kích thước"}
        rules={[
          {
            required: true,
            message: "Phải chọn trường này",
          },
        ]}
      >
        <Select
          defaultValue={init?.sizeDetail?.sizeId || null}
          onChange={(e) => setSize(e)}
          // defaultValue={init._idSize || null}
          rules={[
            {
              required: true,
              message: "Phải chọn trường này",
            },
          ]}
        >
          <Option value={null}> Chọn kích thước </Option>
          {sizeOptions.length > 0 &&
            sizeOptions.map((item, index) => {
              return (
                <Option key={uuidv4()} value={item.value}>
                  {" "}
                  {item.label}{" "}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        label={"Màu sắc"}
        rules={[
          {
            required: true,
            message: "Phải nhập trường này",
          },
        ]}
      >
        <Select
          value={init?._idMau?.trim() || color?.trim()}
          defaultValue={init?._idMau?.trim() || null}
          onChange={(e) => setColor(e)}
        >
          <Option value={null}> Chọn màu sắc </Option>
          {colorOptions.length > 0 &&
            colorOptions.map((item, index) => {
              return (
                <Option key={uuidv4()} value={item.maMau.trim()}>
                  {" "}
                  {item.tenMau}{" "}
                  <div
                    style={{
                      position: "absolute",
                      right: 5,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: `#${item.maMau.trim()}`,
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                </Option>
              );
            })}
        </Select>
      </Form.Item>

      <Form.Item label="Số lượng">
        <InputNumber
          onChange={(e) => {
            setQty(e);
            setDisable(false);
          }}
          value={qty || init.qty}
          min={0}
          style={{ border: "1px solid black" }}
          required
        />
      </Form.Item>
      {init._idMau == null || init._idSize == "" ? (
        <>
          {" "}
          <Button type="primary" onClick={handleAdd} loading={loading.btnThem}>
            Xác nhận
          </Button>
          <Button type="ghost" onClick={handleCancel}>
            hủy
          </Button>
        </>
      ) : (
        <>
          {" "}
          <Button
            type="primary"
            onClick={handleUpdate}
            disabled={disable}
            loading={loading.btnSua}
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleRemove}
            loading={loading.btnXoa}
          >
            Xóa
          </Button>
        </>
      )}
    </div>
  );
};

const QuanLySoLuong = ({ init = [], maSanPham }) => {
  const [item, setItem] = useState([]);
  const [sizesOptions, setSizesOptions] = useState([]);
  const [colorsOptions, setColorsOptions] = useState([]);
  useEffect(() => {
    const Fetch = async () => {
      const sizes = await Get("/api/Sizes");
      const colors = await Get("/api/MauSac");
      setColorsOptions(colors);
      setSizesOptions(sizes);
    };
    setItem([...init]);
    Fetch();
  }, []);
  const handleAddField = () => {
    setItem([...item, { virtualId: uuidv4() }]);
  };
  return (
    <>
      <Button type="primary" onClick={handleAddField}>
        Thêm
      </Button>
      {item.map((value, index) => {
        return (
          <div
            key={uuidv4()}
            style={{ display: "flex", alignItems: "center", margin: ".5rem" }}
          >
            <Item
              colorOptions={colorsOptions}
              sizeOptions={sizesOptions}
              setItem={setItem}
              maSanPham={maSanPham}
              valueInit={value}
              item={item}
              virtualId={value.virtualId}
            />
          </div>
        );
      })}
    </>
  );
};

export default QuanLySoLuong;
