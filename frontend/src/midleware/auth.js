import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to={"/login"}
        replace={true}
      ></Navigate>
    );
  }
  return children;
};

export const Seller = ({ children }) => {
    const user = jwtDecode(localStorage.getItem("token"));
    
    if (user.user.role === "seller") {
      return children;
    }
    return (
      <Navigate
        to={"/login"}
        replace={true}
      ></Navigate>
    );
  };
  