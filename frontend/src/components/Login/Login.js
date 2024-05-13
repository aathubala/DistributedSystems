import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Layout, Divider, Spin } from "antd";
import "./Login.scss";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import PasswordResetRequest from "../Register/PasswordResetRequest";

const { Header } = Layout;

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  const loginHandler = async (e) => {
    //handler method for login

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { username, password },
        config
      );
      console.log("user:", JSON.stringify(data));
      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("type", data?.type);
      localStorage.setItem("user",JSON.stringify(data.data));
      localStorage.setItem("userId", data._id);
      

      setTimeout(() => {
        // set a 5seconds timeout for authentication

        if (data.type === "Farmer")
          history(`/farmer-dashboard/${data.username}`);
        else history(`/buyer-dashboard/${data.username}`);

        setLoading(false);
        window.location.reload();
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <center>
            <h1 id="header" style={{ fontFamily: "serif", fontSize: "50px" }}>
              E-Study Online Learning Platform{" "}
            </h1>

            <Divider />
          </center>
        </Header>
      </Layout>

      <div
        className="login-page"
        style={{
          backgroundImage: "url('https://media.istockphoto.com/id/499924122/photo/e-learning-concept-with-a-teacher-presenting-online-education-program.jpg?s=1024x1024&w=is&k=20&c=iNG1o7RsHYZmXtICAbTdGeJZXjSr-EgOOm7crGPdtco=')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <center>
                {error && (
                  <span style={{ color: "white", background: "orange" }}>
                    {error}
                  </span>
                )}
                {available && (
                  <span style={{ color: "white", background: "red" }}>
                    {available}
                  </span>
                )}
              </center>
              <div className="text-block">
                Log in to your account if you already have an account
              </div>
              <Form onFinish={loginHandler}>
                <label className="label">Username</label>
                <Input
                  label={"USERNAME"}
                  name={"username"}
                  size={"large"}
                  placeholder={"e.g John Doe"}
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="label">Password</label>
                <Input.Password
                  label={"PASSWORD"}
                  name={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br /> <br /> <br />
                {/* <a className="forget-text">Forgot password?</a> */}
                <Link
                  to="/register"
                  className="forget-text"
                  style={{ float: "left", color: "white" }}
                >
                  Create an account
                </Link>
                <PasswordResetRequest />
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "yellow" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    {loading ? (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin />}
                      >
                        &nbsp;Authenticating...
                      </Button>
                    ) : (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        icon={<LoginOutlined />}
                        disabled={loading}
                      >
                        SUBMIT
                      </Button>
                    )}
                  </center>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
