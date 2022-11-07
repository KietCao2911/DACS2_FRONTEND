import React from "react";
import { Button, Select, Upload, message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import * as SanPhamApi from "~/redux/slices/SanPham/SanPhamApi";
const { Option } = Select;

const ItemUpload = (obj) => {
  const { fileList, MaSP, MaMau } = obj;
  const [imgs, setImgs] = useState([]);
  const [progress, setProgress] = useState(0);
  const uploadImage = async (options) => {
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
      const res = await SanPhamApi.Uploads(MaSP, "fff", fmData, config);
      // fieldValue({
      //   img: res.img,
      // });
      setImgs([
        ...imgs,
        {
          uid: res.img,
          name: res.img,
          status: "done",
          // custom error message to show
          url: `https://localhost:44328/wwwroot/res/SanPhamRes/Imgs/${MaSP}/${`fff`}/${
            res.img
          }`,
        },
      ]);
      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      // setFileInit([
      //   {
      //     uid: "1",
      //     name: "1",
      //     status: "error",
      //     // custom error message to show
      //     url: "#",
      //   },
      // ]);
      const error = new Error("Some error");
      onError({ err });
    }
  };
  useEffect(() => {
    if (fileList?.length > 0) {
      setImgs(fileList);
    }
  }, [fileList]);
  return (
    <div style={{ display: "flex" }}>
      <Select>
        <Option>dasd</Option>
      </Select>
      <Upload
        fileList={imgs}
        listType="picture-card"
        customRequest={uploadImage}
      >
        {imgs.length > 5 ? null : <Button>Upload</Button>}
      </Upload>
      <Button>DELETE</Button>
    </div>
  );
};

export default ItemUpload;
