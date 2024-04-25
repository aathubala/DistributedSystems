import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Layout,
  Divider,
  Spin,
  notification,
  Select,
} from "antd";
import "../Login/Login.scss";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";

const { Header } = Layout;
const { Option } = Select;

const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);
  const [type, setType] = useState("");

  const onChangeType = (type) => {
    setType(type);
  };

  const history = useNavigate();

  const registerHandler = async () => {
    //register handler method

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      //method for cheking the password an confirm password
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      await axios.post(
        "/api/auth/register",
        { username, email, password, type },
        config
      );

      await axios.post(
        "/api/auth/notifyuser",
        { email, username, password, type },
        config
      );
      setTimeout(() => {
        notification.info({
          message: `You are successfully registered.`,
          description: "You can access to the system using your credentials.",
          placement: "top",
        });
        setLoading(false);
        history("/"); // after 5seconds it will redirect to the login
      }, 5000); //5s
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
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
              </center>
              <div className="text-block">Registration Form</div>
              <Form onFinish={registerHandler}>
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
                <label className="label">User Type</label>
                <br />
                <Form.Item name={"user type"} rules={[{ required: true }]}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select a user type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={onChangeType}
                  >
                    <Option value="Farmer">Instructor</Option>
                    <Option value="Buyer">Learner</Option>
                  </Select>
                </Form.Item>
                <label className="label">Email</label>
                <Input
                  label={"USERNAME"}
                  name={"email"}
                  size={"large"}
                  placeholder={"e.g john@example.com"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type={"email"}
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
                <label className="label">Re-Password</label>
                <Input.Password
                  label={"RE-PASSWORD"}
                  name={"repassword"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br /> <br /> <br />
                {/* <a className="forget-text">Forgot password?</a> */}
                <Link to="/" style={{ float: "left" }}>
                  Already have an account
                </Link>
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "yellow" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    {loading ? (
                      <Button
                        label={"REGISTER"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin />}
                      >
                        &nbsp;Registering...
                      </Button>
                    ) : (
                      <Button
                        label={"REGISTER"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        icon={<LoginOutlined />}
                        disabled={loading}
                      >
                        REGISTER
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

export default Register;
