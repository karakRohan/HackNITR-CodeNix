// Restricts access for authenticated users
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const authToken = useSelector((state) => state.auth.token);

  return authToken === null ? children : <Navigate to="/" />;
};

export default OpenRoute;

