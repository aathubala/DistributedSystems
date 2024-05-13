import React, { useState, useEffect } from "react";
import { Skeleton, Card, Spin, Button, Modal, notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ViewItems = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await axios.get("/item/accepted").then((res) => {
        setData(res.data);
        setLoading(true);
      });
    })();
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/item/delete/${id}`);
      notification.info({
        message: `Notification`,
        description: "Successfully Deleted the course details 😘",
        placement: "top",
      });
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error,
        placement: "top",
      });
    }
  };

  return (
    <>
      {loading === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          <center>
            {data.length === 0 ? (
              <>
                <center>
                  <span style={{ fontSize: "30px" }}>
                    <InboxOutlined width={100} />
                    <br />
                    No Items
                  </span>
                </center>
              </>
            ) : (
              data.map((value, index) => (
                <div
                  key={value._id}
                  style={{ display: "inline-block", marginRight: "50px" }}
                >
                  <Card
                    style={{ width: 300, marginTop: 16 }}
                    cover={
                      <img alt="example" src={"/uploads/" + value?.photo} />
                    }
                    actions={[
                      [
                        <>
                          {localStorage.getItem("username") ===
                            value?.postedBy && (
                            <Link
                              to={`/farmer-dashboard/${localStorage.getItem(
                                "username"
                              )}/edit/${value?._id}`}
                            >
                              <div style={{ color: "green" }}>
                                <CheckCircleOutlined />
                                <br />
                                <span>Edit</span>
                              </div>
                            </Link>
                          )}
                        </>,
                      ],
                      [
                        <>
                          {localStorage.getItem("username") ===
                            value?.postedBy && (
                            <div
                              style={{ color: "red" }}
                              onClick={() => showModal()}
                            >
                              {" "}
                              <CloseCircleOutlined />
                              <br />
                              <span>Delete</span>
                            </div>
                          )}
                        </>,
                      ],
                    ]}
                  >
                    <Skeleton loading={!loading} avatar active>
                      <Meta title={`Item ${index + 1}`} />
                    </Skeleton>
                    <span>Course Id : {value?.itemId}</span>
                    <br />
                    <span>Course Name : {value?.itemName}</span>
                    <br />
                    <span>Description : {value?.desc}</span>
                    <br />
                    <span>Price : Rs. {value?.price}</span>
                    <br />
                    <span>
                      Date : {moment(value?.date).format("DD/MM/YYYY")}
                    </span>
                    <br />
                    <span>Instructor : {value?.postedBy}</span>
                  </Card>
                  <Modal
                    visible={visible}
                    title={"Are you sure to delete ?"}
                    onCancel={handleCancel}
                    footer={false}
                  >
                    <center>
                      <Button
                        type="primary"
                        htmlType="submit"
                        color="green"
                        onClick={() => {
                          deleteHandler(value._id);
                          setVisible(false);
                        }}
                      >
                        Delete
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button htmlType="button" onClick={handleCancel}>
                        Return
                      </Button>
                    </center>
                  </Modal>
                </div>
              ))
            )}
          </center>
        </>
      )}
    </>
  );
};

export default ViewItems;
