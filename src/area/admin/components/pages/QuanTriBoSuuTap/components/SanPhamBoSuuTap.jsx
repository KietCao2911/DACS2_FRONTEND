import React from "react";
import { Table, Space, Button } from "antd";
import { useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/BoSuuTap";
import { useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const columns = ({ dispatch }) => {
  const handleDelete = (maSP) => {
    console.log({ maSP });
    dispatch(Api.fetchRemoveProductsFormBST({ id: maSP }));
  };
  return [
    {
      title: "Mã Sản Phẩm",
      dataIndex: "maSanPham",
      key: "maSanPham",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
    },
    {
      title: "Giá bán",
      dataIndex: "giaBanDisplay",
      key: "giaBanDisplay",
      // sorter: (a, b) => a.giaBan - b.giaBan,
      // sortDirections: ["descend"],
    },
    {
      title: "Số lượng nhập",
      dataIndex: "soLuongNhap",
      key: "soLuongNhap",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "soLuongTon",
      key: "soLuongTon",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={"/admin/trang-quan-tri-san-pham/chinh-sua/" + record.maSanPham}
          >
            <Button icon={<EditOutlined />} type="primary">
              Sửa
            </Button>
          </Link>

          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => handleDelete(record.maSanPham.trim())}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
};
const SanPhamBoSuuTap = () => {
  document.title = "Quản lý  bộ sưu tập - chi tiết";
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.BoSuuTap);
  const { maBST } = useParams();
  useEffect(() => {
    dispatch(Api.fetchGetProductByBST({ id: maBST }));
  }, []);
  return (
    <Table
      tableLayout="auto"
      loading={loading}
      rowKey={uuidv4()}
      columns={columns({ dispatch })}
      dataSource={products}
    ></Table>
  );
};
export default SanPhamBoSuuTap;
