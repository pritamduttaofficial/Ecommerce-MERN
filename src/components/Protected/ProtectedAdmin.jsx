import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const user = useSelector((state) => state.auth.loggedInUser);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default ProtectedAdmin;
