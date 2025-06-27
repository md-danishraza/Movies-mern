import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AuthLayout({ children }) {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      toast.warning("Not authorized!");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return <>{children}</>;
}

export default AuthLayout;
