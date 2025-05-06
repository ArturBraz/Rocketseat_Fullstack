import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";

//components
import { Loading } from "../components/Loading";
//routes
import { AuthRoutes } from "./AuthRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import ManagerRoutes from "./ManagerRoutes";

export function Routes() {
  const { session,isLoading } = useAuth();
  // console.log("session no Routes:", session);

  function RenderRoute() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;

      case "manager":
        return <ManagerRoutes />;

      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <RenderRoute />
    </BrowserRouter>
  );
}
