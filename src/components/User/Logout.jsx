import { useEffect } from "react";
import { signOutAsync } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/" replace={true}></Navigate>}</>;
}

export default Logout;
