import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import ProtectedRoute from "./ProtectedRoute";

const appRoutes = [
  {
    title: "login",
    component: Login,
    url: "/login",
  },
  {
    title: "register",
    component: Register,
    url: "/register",
  },
  {
    title: "product",
    component: (props) => <ProtectedRoute element={Products} {...props} />,
    url: "/product",
  },
  {
    title: "cart",
    component: (props) => <ProtectedRoute element={Cart} {...props} />,
    url: "/cart",
  },
];

export default appRoutes;
