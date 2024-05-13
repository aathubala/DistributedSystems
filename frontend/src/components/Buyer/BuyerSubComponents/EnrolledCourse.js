import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders, updateuserrefundrequestAction } from "../../../Actions/orderActions";
import { Link } from "react-router-dom";
import '../styles/enrolledC.css'
export default function EnrolledCourse() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders } = orderState;

  function updateOrderDelivery(orderId, val) {
    const updateOrderStatus = {
      Status: val,
    };
    dispatch(updateuserrefundrequestAction(updateOrderStatus, orderId));
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Orders</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
        {orders.map((order) => (
          <div key={order._id} className="col">
            <Link to={`/buyer-dashboard/${localStorage.getItem("username")}/courses/${order.courses[0]._id}`} className="card-link">
              <div className="card shadow-sm clickable-card">
                <div className="d-flex justify-content-center">
                  <img src={order.courses[0].photo} className="card-img-top" alt={order.courses[0].itemName}/>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">{order.itemName}</h5>
                  <p className="card-text">Description: {order.desc}</p>
                  <p className="card-text">Amount: {order.price} LKR</p>
                  <p className="card-text">Date: {order.createdAt.substring(0, 10)}</p>
                  <p className="card-text">Order ID: {order._id}</p>
                  {order.Status ? (
                    order.isSuccessfull ? (
                      <span className="badge bg-success">Refund Successful</span>
                    ) : (
                      <span className="badge bg-warning">Cancellation Processing</span>
                    )
                  ) : (
                    <button
                      onClick={() => updateOrderDelivery(order._id, true)}
                      className="btn btn-danger mt-2 d-block mx-auto"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
