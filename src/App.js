import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { adminRoute } from "~/area/admin/components/routes";
import { publicRoute, privateRoute } from "~/components/routes";
import { DefaultLayout, AdminLayout } from "~/components/layout";
import { Suspense, useEffect, useLayoutEffect } from "react";
import CustomSpin from "~/components/CustomSpin";
import SwiperCore, { Autoplay } from "swiper";
import XacThucSlice, * as XacThucAPi from "./redux/slices/XacThuc";
import { useDispatch, useSelector } from "react-redux";

function App() {
  SwiperCore.use([Autoplay]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.XacThuc);
  console.log({ role: user.role });
  useLayoutEffect(() => {
    dispatch(XacThucAPi.fetchGetCurrentUser());
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<h1>404 Not Fount</h1>} path={"*"}></Route>
          {adminRoute.map((route, index) => {
            const Page = route.element;

            return (
              <Route
                key={index}
                element={
                  // user.role == "1" ? (
                  //   <AdminLayout>
                  //     <Suspense fallback={<CustomSpin />}>
                  //       <Page />
                  //     </Suspense>
                  //   </AdminLayout>
                  // ) : (
                  //   <h1>KHONG DU QUYEN TRUY CAP</h1>
                  // )
                  <AdminLayout>
                    <Suspense fallback={<CustomSpin />}>
                      <Page />
                    </Suspense>
                  </AdminLayout>
                }
                path={route.path}
              ></Route>
            );
          })}
          {publicRoute.map((route, index) => {
            const Page = route.element;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                element={
                  <Layout>
                    <Page />

                  </Layout>
                }
                path={route.path}
              ></Route>
            );
          })}
          {privateRoute.map((route, index) => {
            const Page = route.element;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                element={
                  user?.role == 0 ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <h1>404</h1>
                  )
                }
                path={route.path}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
