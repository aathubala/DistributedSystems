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
import { useParams } from "react-router-dom";
import moment from "moment";

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

const EditItem = () => {
  const [loader, setLoader] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState("");

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  const { id } = useParams();

  const onChangeDate = (e) => {
    setDate(e._d);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    (async () =>
      await axios.get(`/item/get/${id}`).then((res) => {
        form.setFieldsValue({
          itemName: res?.data?.itemName,
          itemId: res?.data?.itemId,
          desc: res?.data?.desc,
          price: res?.data?.price,
          postedBy: res?.data?.postedBy,
        });
        setItemId(res?.data?.itemId);
        setItemName(res?.data?.itemName);
        setDesc(res?.data?.desc);
        setPrice(res?.data?.price);
        setPhoto(res?.data?.photo);
        setDate(res?.data?.date);
        setLoader(!loader);
      }))();
  }, []);

  const updateItemHandler = async (placement) => {
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
    formData.append("photo", photo);

    try {
      await axios.put(
        //use axios API
        `/item/update/${id}`,

        formData,

        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated the item details 😘",
          placement,
        });
        form.resetFields();
        window.location.reload();
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
          onFinish={() => updateItemHandler("top")}
          encType="multipart/form-data"
        >
          <center>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <h1>Edit Item</h1>
          </center>
          <Form.Item
            name="itemId"
            label="Item Id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your item id"
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
            name="itemName"
            label="Item Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your item name"
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
            name="desc"
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

          <Form.Item name="date" label="Date">
            <DatePicker
              onChange={onChangeDate}
              defaultValue={moment(Date(date))}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
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
            label="Image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input type={"file"} name="photo" onChange={handlePhoto} />
          </Form.Item>
          <Form.Item label="current photo">
            <img
              src={"/uploads/" + photo}
              style={{ width: "100px", height: "100px" }}
            />
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

export default EditItem;
