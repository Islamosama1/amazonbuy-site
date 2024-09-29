import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectUser = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) {
    if (userInfo.isVerified) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" replace={true} />;
    }
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectUser;
