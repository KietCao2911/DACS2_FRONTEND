import React from "react";
import { Table, Form, Image, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import BSTSlice, { fetchAllBST } from "~/redux/slices/BoSuuTap";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { BASE_URL } from "~/const/index";

const columns = () => {
  return [
    {
      title: "Tên Bộ sưu tập",
      dataIndex: "tenBoSuuTap",
      key: uuidv4(),
    },
    {
      title: "Hình ảnh",
      dataIndex: "Img",
      key: uuidv4(),
      render: (_, e) => {
        return e.img == null ? (
          <p>Hãy cập nhật ảnh</p>
        ) : (
          <Image width={200} src={`${BASE_URL}res/BstImgs/${e.img}`} />
        );
      },
    },
    {
      title: "Hành động",
      key: uuidv4(),
      render: (_, value) => {
        return (
          <>
            {" "}
            <Button>
              <Link
                to={`/admin/trang-quan-tri-bo-suu-tap/chi-tiet/${value.id}`}
              >
                Chi tiết
              </Link>
            </Button>
            <Button>
              <Link
                to={`/admin/trang-quan-tri-bo-suu-tap/chinh-sua/${value.id}`}
              >
                Chỉnh sửa
              </Link>
            </Button>
            <Button type="primary" danger>
              Xóa
            </Button>
          </>
        );
      },
    },
  ];
};
const QuanTriBST = () => {
  document.title = "Quản lý  bộ sưu tập";
  const dispatch = useDispatch();
  const { boSuuTaps, boSuuTap, loading } = useSelector(
    (state) => state.BoSuuTap
  );
  console.log({ boSuuTaps, boSuuTap, loading });
  useEffect(() => {
    dispatch(fetchAllBST({}));
  }, []);
  return (
    <>
      <Button type="primary">Thêm bộ sưu tập</Button>
      <Table
        loading={loading}
        key={uuidv4()}
        rowKey={uuidv4()}
        columns={columns()}
        dataSource={boSuuTaps}
      ></Table>
    </>
  );
};

export default QuanTriBST;
