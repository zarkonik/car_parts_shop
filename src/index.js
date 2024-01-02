import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/Context";
import Register from "./pages/register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import PartsShow from "./components/partsShow/PartsShow";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import ChooseGroup from "./pages/chooseGroup/ChooseGroup";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Cart from "./pages/cart/Cart";
import Homepage from "./pages/homepage/Homepage";
import Account from "./pages/account/Account";
import FullMagacine from "./pages/fullMagacine/Fullmagacine";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/parts",
        element: <PartsShow />,
      },
      {
        path: "/account/:tab",
        element: <Account />,
      },
      {
        path: "/choose-category/:catid/",
        element: <ChooseGroup />,
      },
      {
        path: "/choose-category-name/:catid/",
        element: <ChooseGroup />,
      },
      {
        path: "/choose-category-name/:catid/all",
        element: <FullMagacine />,
      },
      {
        path: "/choose-subcategory/:catid/",
        element: <ChooseGroup />,
      },
      {
        path: "/choose-subcategory-name/:catid/",
        element: <ChooseGroup />,
      },
      {
        path: "/products/:gid",
        element: <Products />,
      },
      {
        path: "/products-name/:gname",
        element: <Products />,
      },
      {
        path: "/product/:pid",
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
