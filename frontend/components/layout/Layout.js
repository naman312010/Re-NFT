import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
import "./layout.module.css";
function SiteLayout({ children }) {
  const router = useRouter();
  const activeNav = router.pathname == "/mint" ? "2" : "1";
  const crumb =
    router.pathname == "/mint" ? "Mint NFT" : "Minted NFT Catalogue";
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[activeNav]}>
          <Menu.Item key="1">
            <Link href="/">
              <a>{`${"Home"}`}</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/mint">
              <a>{`${"Mint-NFT"}`}</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            style={{ position: "absolute", right: "4rem", top: "0" }}
          >
            <Link href="/user" passHref>
              <Avatar size="md" icon={<UserOutlined />} />
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0", marginBottom: "30px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{crumb}</Breadcrumb.Item>
          {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div className="site-layout-content" style={{ minHeight: "80vh" }}>
          {children}
        </div>
      </Content>
      <Footer
        style={{ position: "sticky", bottom: "0px", textAlign: "center" }}
      >
        {"Re-NFT"}
      </Footer>
    </Layout>
  );
}

export default SiteLayout;
