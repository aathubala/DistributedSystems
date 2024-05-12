import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrders,
  updateuserrefundrequestAction,
} from "../../../Actions/orderActions";

export default function OrdersScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders } = orderstate;

  const updateOrderDelivery = (orderId, val) => {
    const updateorderStatus = {
      Status: val,
    };
    dispatch(updateuserrefundrequestAction(updateorderStatus, orderId));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "35px", marginBottom: "20px" }}>My Courses</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {orders &&
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                margin: "10px",
                padding: "20px",
                maxWidth: "400px",
              }}
            >
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Order ID: {order._id}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {order.courses.map((item, index) => (
                  <div
                    key={index}
                    style={{ margin: "10px", display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={"/uploads/" + item.photo}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "8px",
                        marginRight: "20px",
                      }}
                      alt="Course"
                    />
                    <div style={{ flexGrow: 1 }}>
                      <p style={{ fontSize: "16px", marginBottom: "5px" }}>{item.itemName}</p>
                      <p style={{ fontSize: "14px", marginBottom: "5px" }}>Price: {item.price}</p>
                      {item.enrolled ? (
                        <button
                          style={{
                            cursor: "pointer",
                            padding: "8px 16px",
                            borderRadius: "5px",
                            backgroundColor: "#f44336",
                            color: "white",
                            marginRight: "10px",
                          }}
                          onClick={() => {/* Handle cancel enrollment */}}
                        >
                          Cancel Enrollment
                        </button>
                      ) : (
                        <button
                          style={{
                            cursor: "pointer",
                            padding: "8px 16px",
                            borderRadius: "5px",
                            backgroundColor: "#4caf50",
                            color: "white",
                            marginRight: "10px",
                          }}
                          onClick={() => {/* Handle enrollment */}}
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {order.Status ? (
                  order.isSuccessfull ? (
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        backgroundColor: "#4caf50",
                        color: "white",
                      }}
                    >
                      Refund Successful
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        backgroundColor: "#ff9800",
                        color: "white",
                      }}
                    >
                      Cancellation Processing
                    </span>
                  )
                ) : (
                  <button
                    style={{
                      cursor: "pointer",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      backgroundColor: "#ff9800",
                      color: "white",
                    }}
                    onClick={() => updateOrderDelivery(order._id, true)}
                    role="button"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
