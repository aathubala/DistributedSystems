import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  DatePicker,
} from "antd";

import {
  FileDoneOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateItem = () => {
  const [loader, setLoader] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const postedBy = localStorage.getItem("username");
  const [photo, setPhoto] = useState("");

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  const onChangeDate = (e) => {
    setDate(e._d);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  const itemHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = new FormData();
    formData.append("itemId", itemId);
    formData.append("itemName", itemName);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("date", date);
    formData.append("photo", photo);
    formData.append("postedBy", postedBy);

    try {
      await axios.post(
        //use axios API
        "/item/create",

        formData,

        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Submitted the course details 😘",
          placement,
        });
        form.resetFields();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error,
        placement,
      });
      setError(true);
      form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={() => itemHandler("top")}
          encType="multipart/form-data"
        >
          <center>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <h1>Create Course</h1>
          </center>
          <Form.Item
            name="Item Id"
            label="Course Id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your course id"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter item Id ex: ITEM001">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={10}
              onChange={(e) => setItemId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="Item Name"
            label="Course Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your course name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your item name">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="Description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your description"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your description">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={200}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="Date"
            label="Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker onChange={onChangeDate} />
          </Form.Item>
          <Form.Item
            name="Price"
            label="Price"
            rules={[
              {
                required: true,
              },
              { max: 12 },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="enter your price"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={[
                <Tooltip title="Enter your price ex: Rs. 500">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>,
              ]}
              showCount
              maxLength={12}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Course"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input type={"file"} name="photo" onChange={handlePhoto} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              {loading ? (
                <>
                  <Spin /> Planning in Progess...
                </>
              ) : (
                "Submit"
              )}
            </Button>{" "}
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default CreateItem;
