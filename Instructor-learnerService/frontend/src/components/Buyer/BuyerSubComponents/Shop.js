import { DeleteOutlined } from "@ant-design/icons";
import { List, Divider, Empty, Button, notification, message } from "antd";
import { useEffect, useState } from "react";
import Api from "../Cart/api";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { deleteFromCart } from "../../../actions/cartAction";
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../../actions/orderActions';


const Shop = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setData([...Api.values()]);
  });

  let total = 0;

  data.filter((el) => (total += Number(el?.price)));

  const deleteHandler = (value) => {
    try {
      dispatch(deleteFromCart(value))
      Api.delete(value?._id);
    } catch (error) {
      alert(error);
    }
  };

  async function handleToken(token, addresses) {
    const email = localStorage.getItem("email");
    dispatch(placeOrder(token, total))
    await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout", //third party payment gateway
      { token }
    );
    await axios.post("/api/auth/payment", { email, total });

    notification.info({
      message: "Notification",
      description: "Success! Check email for details",
      placement: "top",
    });
    setTimeout(() => window.location.reload(), 3000);
  }

  return (
    <>
      <Divider orientation="left">Your Cart</Divider>
      <center>
        <List style={{ width: "50%" }}>
          {data.length === 0 ? (
            <Empty />
          ) : (
            data.map((value) => (
              <>
                <List.Item>
                  <div>
                    <p>Course Name : {value?.itemName}</p>
                    <p>Price : Rs. {value?.price}.00</p>
                    <img
                      src={"/uploads/" + value?.photo}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div>
                    <Button
                      style={{ background: "red", color: "white" }}
                      onClick={() => deleteHandler(value)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </List.Item>
                <Divider />
              </>
            ))
          )}
        </List>
      </center>
      <Divider orientation="right">Sub Total = Rs. {total}.00</Divider>
      <center>
        {total !== 0 && (
          <StripeCheckout
            stripeKey="pk_test_GlFtmasU7tmBohUIk7vMbEnf00NA3VYaa0"
            token={handleToken}
            amount={(Number(total) / 370) * 100}
            name="E- Learning Education Platform"
            billingAddress
            shippingAddress
          />
        )}
      </center>
    </>
  );
};

export default Shop;
