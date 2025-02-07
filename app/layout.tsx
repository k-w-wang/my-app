import { AntdRegistry } from "@ant-design/nextjs-registry";
import {  Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";
import "./globals.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [{
    key: 'home',
    label: <Link href="/home">Home</Link>,
  }]
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <AntdRegistry>
          <Layout className="!min-h-screen flex !bg-white">
            <Header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="demo-logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
              />
            </Header>
            <Content style={{ padding: "0 48px" }} className="flex-1 flex">
              <div
                style={{
                  padding: 24,
                  flex: 1,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
