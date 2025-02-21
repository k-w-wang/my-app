import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./globals.css";
import NavMenu from "@/components/NavMenu";
import { Suspense } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
              <NavMenu />
            </Header>
            <Content style={{ padding: "0 48px" }} className="flex-1 flex">
              <div
                style={{
                  padding: 24,
                  flex: 1,
                }}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  {children}
                </Suspense>
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
