import React, { useEffect, useState } from "react";
import { Post, Delete } from "~/area/admin/components/api/SanPham";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ItemUpload from "~/components/commomComponents/ItemImgsUpload";
function UploadMutipleFile(props) {
  const { res, MaSP } = props;
  console.log({ res });
  return (
    <div>
      <ItemUpload
        fileList={res?.length > 0 ? res[0].hinhAnhInfo : null}
        MaSP={MaSP}
      />
    </div>
  );
}

export default UploadMutipleFile;
