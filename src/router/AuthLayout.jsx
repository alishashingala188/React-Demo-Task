import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome to Auth</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
