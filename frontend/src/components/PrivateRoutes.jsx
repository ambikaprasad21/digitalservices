import { Navigate, Outlet, replace } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

function PrivateRoutes() {
  const { user } = useLogin();
  if (user) return <Outlet />;
  return <Navigate to={"/admin/login"} replace />;
}

export default PrivateRoutes;
