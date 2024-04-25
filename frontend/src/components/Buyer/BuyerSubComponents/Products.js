import React, { useState, useEffect } from "react";
import { Skeleton, Card, Spin, notification, Input } from "antd";
import { InboxOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import Api from "../Cart/api";

const { Meta } = Card;

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      await axios.get("/item/").then((res) => {
        setData(res.data);
        setLoading(true);
      });
    })();
  }, []);

  const addToCart = (value) => {
    try {
      Api.set(value?._id, value);
      notification.info({
        message: `Notification`,
        description: `${value?.itemName} added to entrollment process`,
        placement: "top",
      });
    } catch (error) {
      alert(error);
    }
  };

  const filteredData = data.filter(
    (el) => el?.itemName.toLowerCase().indexOf(query.toLowerCase()) >= 0
  );

  return (
    <>
      {loading === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          <center>
            <Input
              type={"text"}
              placeholder="Search Here..."
              onChange={(e) => setQuery(e.target.value)}
            />
            {filteredData.length === 0 ? (
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
              filteredData.map((value, index) => (
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
                        <div
                          style={{ color: "green" }}
                          onClick={() => addToCart(value)}
                        >
                          <ShoppingCartOutlined />
                          <br />
                          <span>Add To Cart</span>
                        </div>,
                      ],
                    ]}
                  >
                    <Skeleton loading={!loading} avatar active>
                      <Meta title={`Item ${index + 1}`} />
                    </Skeleton>
                    <span>Item Id : {value?.itemId}</span>
                    <br />
                    <span>Item Name : {value?.itemName}</span>
                    <br />
                    <span>Description : {value?.desc}</span>
                    <br />
                    <span>Price : Rs. {value?.price}</span>
                    <br />
                    <span>
                      Date : {moment(value?.date).format("DD/MM/YYYY")}
                    </span>
                    <br />
                    <span>Posted By : {value?.postedBy}</span>
                  </Card>
                </div>
              ))
            )}
          </center>
        </>
      )}
    </>
  );
};

export default Products;
