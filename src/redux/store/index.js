import { configureStore } from "@reduxjs/toolkit";
import DanhMucSlice from "../slices/DanhMuc";
import BSTSlice from "../slices/BoSuuTap";
import SanPhamSlice from "../slices/SanPham";
import KichCoSlice from "../slices/KichCoSlice";
import GioHangSlice from "../slices/GioHang/GioHangSlice";
import XacThucSlice from "../slices/XacThuc";
import GhnSlice from "../slices/GHNAPI/GhnSlice";
import ThanhToanSlice from "../slices/ThanhToanSlice";
import HoaDonSlice from "../slices/HoaDon/HoaDonSlice";
import MauSacSlice from "../slices/MauSacSlice";
export const store = configureStore({
  reducer: {
    DanhMuc: DanhMucSlice.reducer,
    BoSuuTap: BSTSlice.reducer,
    SanPham: SanPhamSlice.reducer,
    KichCo: KichCoSlice.reducer,
    GioHang: GioHangSlice.reducer,
    XacThuc: XacThucSlice.reducer,
    GiaoHangNhanh : GhnSlice.reducer,
    ThanhToan :ThanhToanSlice.reducer,
    HoaDon:HoaDonSlice.reducer,
    MauSac:MauSacSlice.reducer
  },
});
