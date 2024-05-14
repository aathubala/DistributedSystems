import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrders,
  updateuserrefundrequestAction,
} from "../../../actions/orderActions";
import Swal from 'sweetalert2';


let orderId;

export default function Ordersscreen() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders } = orderstate;

  console.log("orders:",orders)

  //update isDeliverd orders
  const [orderStatus, updateorderStatus] = useState("");

  function updateOrderDelivery(orderId, val) {
    const updateorderStatus = {
      Status: val,
    };
    console.log(orderId, val);
    dispatch(updateuserrefundrequestAction(updateorderStatus, orderId));
  }

  // Function to check if the enrollment date is over 3 days
  const isRefundable = (createdAt) => {
    const enrollmentDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInDays = Math.ceil(
      (currentDate - enrollmentDate) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays <= 3;
  };

  // Function to handle refund request
  const handleRefundRequest = (orderId) => {
    if (!isRefundable(orderId.createdAt)) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Request Refund',
        text: 'Refund request cannot be made as enrollment date is over 3 days.',
        showConfirmButton: true,
      });
    } else {
      dispatch(updateuserrefundrequestAction({ Status: true }, orderId));
    }
  };


  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2 style={{ fontSize: "35px" }}>My Courses</h2>
      <br />
      <div className="row justify-content-center">
        {orders &&
          orders.map((order) => {
            return (
              <div className="box col-md-8 m-2 p-1  p-3 mb-5 shadow-lg">
                <div className="flex-container">
                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Items</h2>
                    <hr />
                    {order.courses.map((item) => {
                      return (
                        <div>
                          <p>
                            {item.itemName}
                            {item.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Description</h2>
                    <hr />
                    <p>{order.desc}</p>
                  </div>

                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Course Info</h2>
                    <hr />
                    <p>Amount : {order.price} LKR </p>
                    <p>date : {order.createdAt.substring(0, 10)}</p>
                    {/* <p>Transaction Id : {order.transactionId}</p> */}
                    <p>Id : {order._id}</p>
                  </div>
                </div>
                {order.Status ? (
                  order.isSuccessfull ? (
                    <span className="badge bg-success">Refund Successfull</span>
                  ) : (
                    <span className="badge bg-warning">
                      Cancellation Processing
                    </span>
                  )
                ) : (
                  <button
                  disabled={!isRefundable(order.createdAt)}
                  onClick={() => handleRefundRequest(order)}
                  className="btn"
                  role="button"
                >
                  Request Refund
                </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}