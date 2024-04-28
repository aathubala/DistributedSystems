import { useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  PullRequestOutlined,
  AuditOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CreateItem from "./FarmerSubComponents/CreateItem";
import ViewItems from "./FarmerSubComponents/ViewItems";
import EditItem from "./FarmerSubComponents/EditItem";
import Table from "./FarmerSubComponents/Table";

const { Header, Content, Footer, Sider } = Layout;

const SupervisorDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();

  const { username, id } = useParams();

  const location = useLocation();
  const { pathname } = location;

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.setItem("authToken", null);
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    history("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <center>
          <HomeOutlined
            style={{ color: "white", marginTop: "50px", cursor: "pointer" }}
          />
        </center>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          selectedKeys={
            pathname ===
              `/farmer-dashboard/${localStorage.getItem("username")}/view` ||
            pathname ===
              `/farmer-dashboard/${localStorage.getItem("username")}/edit/${id}`
              ? ["1"]
              : ["0"]
          }
        >

          <Menu.Item
            key="0"
            icon={<PullRequestOutlined />}
            onClick={() => {
              history(
                `/farmer-dashboard/${localStorage.getItem("username")}/create`
              );
            }}
          >
            Add Course
          </Menu.Item>

          <Menu.Item
            key="1"
            icon={<AuditOutlined />}
            onClick={() => {
              history(
                `/farmer-dashboard/${localStorage.getItem("username")}/view`
              );
            }}
          >
            View Courses
          </Menu.Item>

          <Menu.Item
            //key="1"
            icon={<AuditOutlined />}
            onClick={() => {
              history(
                `/farmer-dashboard/${localStorage.getItem("username")}/table`
              );
            }}
          >
            Table
          </Menu.Item>
        </Menu>

        <br />
        <br />
        {collapsed === false ? (
          <center>
            <Button icon={<LogoutOutlined />} onClick={logoutHandler}>
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <LogoutOutlined
              style={{ color: "white" }}
              onClick={logoutHandler}
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1
            id="header"
            style={{ fontFamily: "serif", fontSize: "20px" }}
          ></h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>{username}</Breadcrumb.Item>
          </Breadcrumb>
          {(pathname ===
            `/farmer-dashboard/${localStorage.getItem("username")}/create` ||
            pathname ===
              `/farmer-dashboard/${localStorage.getItem("username")}`) && (
            <CreateItem />
          )}
          {pathname ===
            `/farmer-dashboard/${localStorage.getItem("username")}/view` && (
            <ViewItems />
          )}
          {pathname ===
            `/farmer-dashboard/${localStorage.getItem(
              "username"
            )}/edit/${id}` && <EditItem />}

          {pathname ===
            `/farmer-dashboard/${localStorage.getItem("username")}/table` && (
            <Table />
          )}

        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} E-Study Online Learning
          Platform
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SupervisorDashboard;
