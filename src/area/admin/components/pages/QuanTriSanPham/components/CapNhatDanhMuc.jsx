import React from "react";
import { useState, useEffect } from "react";
import * as DanhMucApi from "~/redux/slices/DanhMuc/DanhMucApi";
import * as DanhMucApiThunk from "~/redux/slices/DanhMuc/index";
import { Button, Form, Input, Select, Modal } from "antd";
import MyButton from "~/components/commomComponents/Button";
const { Option } = Select;
const CapNhatDanhMuc = ({ defaultValue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [catName, setCatName] = useState("");
  const [form] = Form.useForm();
  console.log({ defaultValue });
  const [Muc0, setMuc0] = useState({
    state: false,
    Id: null,
    items: [],
  });

  const [Muc1, setMuc1] = useState({
    state: false,
    Id: null,
    items: [],
  });
  const [Muc2, setMuc2] = useState({
    state: false,
    Id: null,
    items: [],
  });
  const Muc0Change = (e) => {
    form.setFieldsValue({ Muc1: null, Muc2: null });
    setMuc0({ ...Muc0, state: true, Id: e });
    const FetchCatLevel0 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc1({ ...Muc1, items: res, Id: e });
    };
    if (e != null) {
      FetchCatLevel0();
    }
  };
  const Muc1Change = (e) => {
    console.log({ MUC1CHANGE: e });
    setMuc1({ ...Muc1, state: true, Id: e });
    const FetchCatLevel1 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc2({ ...Muc2, items: res, Id: e });
    };
    form.setFieldsValue({ Muc2: null });
    if (e != null) {
      FetchCatLevel1();
    }
  };
  const Muc2Change = (e) => {
    const FetchCatLevel2 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc2({ ...Muc2, items: res, Id: e });
    };
    if (e != null) {
      FetchCatLevel2();
    }
  };
  useEffect(() => {
    const FetchCatLevel0 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(0);
      setMuc0({ ...Muc0, Id: 0, items: res });
    };
    FetchCatLevel0();
    if (defaultValue?.length > 0) {
      const FetchCatLevel1 = async () => {
        const res = await DanhMucApi.GetCategoryByParentId(
          defaultValue[0].idDanhMuc
        );
        setMuc1({
          state: true,
          Id: defaultValue[0].parentId,
          items: res,
        });
      };
      const FetchCatLevel2 = async () => {
        const res = await DanhMucApi.GetCategoryByParentId(
          defaultValue[1].idDanhMuc
        );
        setMuc2({
          state: true,
          Id: defaultValue[1].parentId,
          items: res,
        });
      };
      FetchCatLevel1();
      FetchCatLevel2();
    }
  }, [defaultValue]);
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Cập nhật danh mục</Button>
      <Modal visible={openModal} onCancel={() => setOpenModal(false)}>
        <Form
          form={form}
          initialValues={{
            Muc0:
              null || (defaultValue?.length > 0 && defaultValue[0]?.idDanhMuc),
            Muc1:
              null || (defaultValue?.length > 0 && defaultValue[1]?.idDanhMuc),
            Muc2:
              null || (defaultValue?.length > 0 && defaultValue[2]?.idDanhMuc),
          }}
        >
          <Form.Item label="Mức 0" name={"Muc0"}>
            <Select onChange={Muc0Change}>
              <Option value={null}>--Đây là danh mục gốc--</Option>
              {Muc0.items?.map((item) => (
                <Option value={item.id}>--{item.tenDanhMuc}--</Option>
              ))}
            </Select>
          </Form.Item>
          {Muc0.Id != null && (
            <Form.Item label="Mức 1" name={"Muc1"}>
              <Select onChange={Muc1Change}>
                <Option value={null}>--Đây là danh mục gốc--</Option>
                {Muc1.items?.map((item) => (
                  <Option value={item.id}>--{item.tenDanhMuc}--</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {Muc1.Id != null && (
            <Form.Item label="Mức 2" name={"Muc2"}>
              <Select onChange={Muc2Change}>
                <Option value={null}>--Đây là danh mục gốc--</Option>
                {Muc2.items?.map((item) => (
                  <Option value={item.id}>--{item.tenDanhMuc}--</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <MyButton onClick={() => console.log({ Muc0, Muc1, Muc2 })}>
            GỬI
          </MyButton>
          <MyButton
            onClick={() =>
              form.setFieldsValue({ Muc0: null, Muc1: null, Muc2: null })
            }
          >
            RESET
          </MyButton>
        </Form>
      </Modal>
    </>
  );
};

export default CapNhatDanhMuc;
