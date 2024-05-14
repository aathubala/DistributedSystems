import { React, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuyerDashboard from "./components/Buyer/Dashboard";
import FarmerDashboard from "./components/Farmer/Dashboard";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./components/Navbar";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Profilescreen from "./screens/user/Profilescreen";
import Footer from "./components/Footer";
import AdminProfilescreen from "./screens/AdminProfilescreen";
import Adminloginscreen from "./screens/Adiminloginscreen";
import { useSelector } from "react-redux";
import Notificationmanagementscreen from "./screens/Notificationmanagementscreen";
import Errorscreen from "./screens/Errorscreen";
import Customermanagementscreen from "./screens/Customermanagementscreen";
import Detailsscreen from "./screens/user/Detailsscreen";
import Ordermanagementscreen from "./screens/Ordermanagementscreen";
import SelectionFN from "./screens/SelectionFN";
import SelectionUserAndCareer from "./screens/SelectionUserAndCareer";
import FinanceManagerScreen from "./screens/FinanceManagerScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SalesScreen from "./screens/SalesScreen";
import RefundRequestScreen from "./screens/RefundRequestScreen";

// Login Register Reset Imports Goes Here

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ResetPassword from "./components/Register/ResetPassword";
import PageNotFound from "./components/routes/PageNotFound";
import PrivateRoute from "./components/routes/PrivateRoute";
import CourseContent from "./components/Farmer/FarmerSubComponents/CourseContent";

const App = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8070/getUsers')
      .then(users => setUsers(users.data))
      .catch(err => console.log(err))
  }, [])

  const adminloginstate = useSelector((state) => state.adminloginReducer);
  const { currentAdmin } = adminloginstate;

  return (

    <>



      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" exact element={<Adminloginscreen />} />
          <Route
            path="/passwordreset/:resetToken"
            element={<ResetPassword />}
          />

          {/* Private Routes Goes Here */}
          <Route
            path="/farmer-dashboard/:username"
            element={
              <PrivateRoute>
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/farmer-dashboard/:username/create"
            element={
              <PrivateRoute>
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/farmer-dashboard/:username/view"
            element={
              <PrivateRoute>
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/farmer-dashboard/:username/edit/:id"
            element={
              <PrivateRoute>
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/farmer-dashboard/:username/table"
            element={
              <PrivateRoute>
                <FarmerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={`/farmer-dashboard/:username/edit/courseContent/:courseID`}
            element={
              <PrivateRoute>
                <CourseContent />
              </PrivateRoute>
            }
          />

          {/* Buyer */}
          <Route
            path="/buyer-dashboard/:username"
            element={
              <PrivateRoute>
                <BuyerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/buyer-dashboard/:username/products"
            element={
              <PrivateRoute>
                <BuyerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/buyer-dashboard/:username/shop"
            element={
              <PrivateRoute>
                <BuyerDashboard />
              </PrivateRoute>
            }
          />

<Route
            path="/buyer-dashboard/:username/courses"
            element={
              <PrivateRoute>
                <BuyerDashboard />
              </PrivateRoute>}
          />
          <Route
            path="/buyer-dashboard/:username/courses/:courseID"
            element={
              <PrivateRoute>
                <BuyerDashboard />
              </PrivateRoute>}
          />

{currentAdmin ? (
            <Route
              path="admin/notifications"
              exact
              element={<Notificationmanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/orders"
              exact
              element={<Ordermanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/notifications"
              exact
              element={<Notificationmanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route path="admin/selectionfn" exact element={<SelectionFN />} />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/selectionUC"
              exact
              element={<SelectionUserAndCareer />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/customers"
              exact
              element={<Customermanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}


          {currentAdmin ? (
            <Route
              path="admin/financemanager"
              exact
              element={<FinanceManagerScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/financemanager/history"
              exact
              element={<HistoryScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/financemanager/sales"
              exact
              element={<SalesScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/financemanager/requests"
              exact
              element={<RefundRequestScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          <Route path="/orders" exact element={<Ordersscreen />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/admin" exact element={<AdminProfilescreen />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
