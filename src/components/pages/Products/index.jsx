import React from "react";
import { Table, Button, Row, Col, Empty } from "antd";
import "./TrangSanPham.scss";
import Filter from "./components/FilterComponent";
import CardProduct from "~/components/commomComponents/CardProduct";
import * as Api from "~/redux/slices/SanPham";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CustomSpin from "~/components/CustomSpin";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    responsive: ["lg"],
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    responsive: ["lg"],
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    responsive: ["lg", "xs"],
  },
];

const TrangSanPham = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const { products, loading } = useSelector((state) => state.SanPham);
  const { tableLoading } = loading;
  const sort = searchParams.get("sort") || null;
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;
  // useEffect(() => {
  //   dispatch(
  //     Api.fetchGetAllProducts({
  //       id: slug,
  //       query: {
  //         sort,
  //         size,
  //         color,
  //       },
  //     })
  //   );
  // }, [slug]);
  return (
    <div className="TrangSanPham PageContainer">
      {tableLoading && <CustomSpin />}
      <div className="Filter">
        <Filter />
        <Row gutter={[20,20]} align="middle">
          {products.length > 0 ? (
            products.map((item) => {
              return (
                <Col
                  key={item.maSanPham}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  xl={{ span: 6 }}
                >
                  <CardProduct value={item} />
                </Col>
              );
            })
          ) : (
            <Empty
              style={{ margin: "auto auto" }}
              description="Hi???n kh??ng c?? s???n ph???m n??o"
            ></Empty>
          )}
        </Row>
        ;
      </div>
    </div>
  );
};

export default TrangSanPham;
