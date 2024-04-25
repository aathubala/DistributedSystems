import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuyerDashboard from "./components/Buyer/Dashboard";
import FarmerDashboard from "./components/Farmer/Dashboard";

// Login Register Reset Imports Goes Here

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ResetPassword from "./components/Register/ResetPassword";
import PageNotFound from "./components/routes/PageNotFound";
import PrivateRoute from "./components/routes/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
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

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
