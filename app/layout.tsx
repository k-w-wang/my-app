import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      key: "home",
      label: <Link href="/home">Home</Link>,
    },
    {
      key: "pdfpreview",
      label: <Link href="/pdfpreview">PDF预览</Link>,
    },
    {
      key: "pdfpreviewv2",
      label: <Link href="/pdfpreviewv2">PDF预览优化</Link>,
    },
    {
      key: "splittext",
      label: <Link href="/splittext">文本分段</Link>,
    },
    {
      key: "streamoutput",
      label: <Link href="/streamoutput">Markdown渲染</Link>,
    },
    {
      key: "flattotree",
      label: <Link href="/flattotree">数组转树</Link>,
    },
    {
      key: "treetoflat",
      label: <Link href="/treetoflat">数组转树</Link>,
    },
    {
      key: "throttle",
      label: <Link href="/throttle">节流</Link>,
    },
    {
      key: "debounce",
      label: <Link href="/debounce">防抖</Link>,
    },
    {
      key: "chat",
      label: <Link href="/chat">对话</Link>,
    },
  ];
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
