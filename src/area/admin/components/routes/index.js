import QuanTriDanhMuc from "~/area/admin/components/pages/QuanTriDanhMuc";
import QuanTriSanPham from "~/area/admin/components/pages/QuanTriSanPham";
// import CapNhatSanPham from "../pages/QuanTriSanPham/components/CapNhatSanPham";
import SuaDanhMuc from "../pages/QuanTriDanhMuc/components/SuaDanhMuc";
import QuanTriBST from "../pages/QuanTriBoSuuTap";
import { lazy } from "react";
const HomeAdmin = lazy(() => import("~/area/admin/components/pages/HomeAdmin"));
const SuaBoSuuTap = lazy(() =>
  import("../pages/QuanTriBoSuuTap/components/SuaBoSuuTap")
);
const SanPhamBoSuuTap = lazy(() =>
  import("../pages/QuanTriBoSuuTap/components/SanPhamBoSuuTap")
);
const CapNhatSanPham = lazy(() =>
  import("../pages/QuanTriSanPham/components/CapNhatSanPham")
);
export const adminRoute = [
  {
    path: "/admin",
    element: HomeAdmin,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-san-pham",
    element: QuanTriSanPham,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-san-pham/chinh-sua/:maSP",
    element: CapNhatSanPham,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-danh-muc",
    element: QuanTriDanhMuc,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-danh-muc/chinh-sua/:maDM",
    element: SuaDanhMuc,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-bo-suu-tap",
    element: QuanTriBST,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-bo-suu-tap/chinh-sua/:maBST",
    element: SuaBoSuuTap,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-bo-suu-tap/chi-tiet/:maBST",
    element: SanPhamBoSuuTap,
    layout: "admin",
  },
];
