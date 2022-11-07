import React from "react";
import ActionSideBar from "~/components/layout/AdminLayout/ActionSideBar";
import MyHeader from "~/components/layout/AdminLayout/Header";
import "./AdminLayout.scss";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
const AdminLayout = ({ children }) => {
  return (
    <Layout>
      <Sider
        width={280}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <ActionSideBar />
      </Sider>
      <Layout className="Admin_Body">
        <Header className="Header">
          <MyHeader />
        </Header>
        <Content> {children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
