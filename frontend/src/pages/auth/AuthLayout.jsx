import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AuthLayout({ children, forAdmin = false }) {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      toast.warning("Not authorized!");
      navigate("/login");
    }
    if (forAdmin && !userInfo.isAdmin) {
      toast.error("Admin access required!");
      return navigate("/");
    }
  }, [userInfo, navigate, forAdmin]);

  if (!userInfo || (forAdmin && !userInfo.isAdmin)) return null;

  return <>{children}</>;
}

export default AuthLayout;
