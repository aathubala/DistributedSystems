import {
  HomeOutlined,
  SecurityScanOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  BookOutlined
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Carousel, Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CarouselView from "./BuyerSubComponents/Carousel";
import Products from "./BuyerSubComponents/Products";
import Shop from "./BuyerSubComponents/Shop";
import "./styles/Dashboard.css";
import Api from "./Cart/api";
import EnrolledCourse from "./BuyerSubComponents/EnrolledCourse";
import CourseContents from "./BuyerSubComponents/CourseContents";


const { Header, Content, Footer } = Layout;

const BuyerDashboard = () => {
  const location = useLocation();
  const history = useNavigate();
  const { pathname } = location;
  const date = new Date();
  const hrs = date.getHours();

  const url = window.location.href;

  const lastValue = url.match(/[^/]+$/)[0];

  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...Api.values()]);
  });

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    localStorage.setItem("authToken", null);
    history("/");
  };

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          selectedKeys={
            pathname ===
              `/buyer-dashboard/${localStorage.getItem("username")}/products`
              ? ["1"]
              : pathname ===
                `/buyer-dashboard/${localStorage.getItem("username")}/shop`
                ? ["2"]
                : pathname ===
                  `/buyer-dashboard/${localStorage.getItem("username")}/courses`
                  ? ["3"]
                : pathname === 
                `/buyer-dashboard/${localStorage.getItem("username")}/courses/${lastValue}`
                  ? ["3"]
                  : ["0"]
          }
        >
          <Menu.Item
            key="0"
            onClick={() =>
              history(`/buyer-dashboard/${localStorage.getItem("username")}`)
            }
          >
            <HomeOutlined /> Home
          </Menu.Item>
          <Menu.Item
            key="1"
            onClick={() =>
              history(
                `/buyer-dashboard/${localStorage.getItem("username")}/products`
              )
            }
          >
            <SecurityScanOutlined /> Courses
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() =>
              history(
                `/buyer-dashboard/${localStorage.getItem("username")}/shop`
              )
            }
          >
            <ShopOutlined /> Entroll
          </Menu.Item>

          <Menu.Item
            key="3"
            onClick={() =>
              history(`/buyer-dashboard/${localStorage.getItem("username")}/courses`)
            }
          >
            <BookOutlined />Enrolled Courses
          </Menu.Item>

        </Menu>

        <div style={{ float: "right" }}>
          <ShoppingCartOutlined /> Entrolled {data?.length === 0 ? 0 : data?.length}
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>{greet}</Breadcrumb.Item>
          <Breadcrumb.Item>{localStorage.getItem("username")}</Breadcrumb.Item>
          <br />
          <Breadcrumb.Item>
            <Button onClick={() => logoutHandler()}>Sign Out</Button>
          </Breadcrumb.Item>
        </Breadcrumb>
        {pathname ===
          `/buyer-dashboard/${localStorage.getItem("username")}` && (
            <CarouselView />
          )}
        {pathname ===
          `/buyer-dashboard/${localStorage.getItem("username")}/products` && (
            <Products />
          )}
        {pathname ===
          `/buyer-dashboard/${localStorage.getItem("username")}/shop` && (
            <Shop />
          )}
        {pathname ===
          `/buyer-dashboard/${localStorage.getItem("username")}/courses` && (
            <EnrolledCourse />
          )}
        {pathname ===
          `/buyer-dashboard/${localStorage.getItem("username")}/courses/${lastValue}` && (
            <CourseContents />
          )}

      </Content>
      <Footer style={{ textAlign: "center" }}>
        Copyright © {date.getFullYear()} E-Study Online Learning Platform
      </Footer>
    </Layout>
  );
};

export default BuyerDashboard;
