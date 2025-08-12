import { createBrowserRouter } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Themes from "./Pages/Themes";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "themes",
        element: <Themes />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "cart",
        element: <Cart />
      }
    ]
  }
]);

export default router;
