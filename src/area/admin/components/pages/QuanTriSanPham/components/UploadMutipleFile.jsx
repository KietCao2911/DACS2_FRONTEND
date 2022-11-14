import React, { useEffect, useState } from "react";
import { Post, Delete } from "~/area/admin/components/api/SanPham";
import { Upload, Button } from "antd";
import { UploadOutlined,InboxOutlined } from "@ant-design/icons";
import ItemUpload from "~/components/commomComponents/ItemImgsUpload";
import ModalCustom from "~/components/commomComponents/ModalCustom";
import InputText from "~/components/commomComponents/InputText";
import { SelectInput } from "~/components/commomComponents/SelectInput";
import { useDispatch,useSelector } from "react-redux";
import MauSacSlice,{fetchALLColors} from "~/redux/slices/MauSacSlice";
import SanPhamSlice,{UploadFile} from "~/redux/slices/SanPham";
const {Dragger} =Upload
function UploadMutipleFile(props) {
  const { res, MaSP } = props;
  const [openModal,setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const {colors} = useSelector(state=>state.MauSac)
  console.log({res})
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
    try {
      fmData.append("file", file);
      const res = await dispatch(UploadFile({maSP:"SP02",maMau:'fff',body:fmData,config}))
      onSuccess("Ok");
    } catch (err) {
      const error = new Error("Some error");
      onError({ err });
    }
  };
  useEffect(()=>
  {
    dispatch(fetchALLColors())
  },[])
  return (
  <>
    <Button onClick={()=>setOpenModal(true)} >Upload</Button>
    <ModalCustom visiable={openModal} onCancel={()=>setOpenModal(false)}>
    <strong>Cập nhật ảnh sản phẩm</strong>
      <InputText label="Mã sản phẩm"/>
      <SelectInput>
       {colors.map((item)=><option key={item.maMau} value={item.maMau}>{item.tenMau}</option>)}
      </SelectInput>
      <Dragger  fileList={res[0]?.hinhAnhInfo||[]} customRequest={uploadImage}>
      <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
      </Dragger>
    </ModalCustom>
    </>
  );
}

export default UploadMutipleFile;
