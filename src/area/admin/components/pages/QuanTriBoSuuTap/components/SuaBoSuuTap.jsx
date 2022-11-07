import React, { useState } from "react";
import { Button, Form, notification, Upload, message, Input } from "antd";
import * as request from "~/axiosRequest/request";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BSTSlice, * as Api from "~/redux/slices/BoSuuTap";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },

  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const SuaBoSuuTap = () => {
  document.title = "Quản lý  bộ sưu tập - chỉnh sửa";
  const dispatch = useDispatch();
  const { maBST } = useParams();
  const { boSuuTap, boSuuTaps, loading } = useSelector(
    (state) => state.BoSuuTap
  );
  const [progress, setProgress] = useState(0);
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      tenBoSuuTap: boSuuTap.tenBoSuuTap,
      id: maBST,
    });
  }, [boSuuTap.tenBoSuuTap]);

  useEffect(() => {
    dispatch(Api.fetchByIdBST({ id: maBST }));
  }, []);
  const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    try {
      dispatch(Api.fetchUploadImgBST({ id: maBST, body: fmData, config }));
    } catch (err) {
      console.log({ err });
    }
  };
  const handleRemove = (e) => {
    const fileName = e.uid;
    const id = maBST;
    dispatch(Api.fetchRemoveImgBST({ id, fileName }));
  };
  const handleUpdate = (e) => {
    dispatch(Api.fetchPutBST({ id: maBST, body: e }));
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item hidden></Form.Item>
        <Form.Item label={"Tên bộ sưu tập"} name="tenBoSuuTap">
          <Input placeholder="Tên bộ sưu tập"></Input>
        </Form.Item>
        <Form.Item label={"Hình ảnh"}>
          <Upload
            accept="image/*"
            customRequest={uploadImage}
            listType="picture-card"
            fileList={boSuuTap.img}
            onRemove={handleRemove}
            className="image-upload-grid"
          >
            UPLOAD
          </Upload>
        </Form.Item>
        <Button htmlType="submit">Xác nhận</Button>
      </Form>
    </div>
  );
};

export default SuaBoSuuTap;
