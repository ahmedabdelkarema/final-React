import React, { Children, useContext, useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "../src/Componet/Home/Home";
import About from "./Componet/About/About";
import Cart from "./Componet/Cart/Cart";
import Layout from "./Componet/Layout/Layout";
import Login from "./Componet/Login/Login";
import Product from "./Componet/Product/Product";
import ProductDetails from "./Componet/ProductDetails/ProductDetails";
import Notfound from "./Componet/Notfound/Notfound";
import Register from "./Componet/Register/Register";
import Logout from "./Componet/Logout/Logout";
import ForgetPassword from "./Componet/Forgetpassord/ForgetPassword";
import GuradRouting from "./Componet/ProdectedRouting/GuradRouting";
import {
  UserConext,
  UserConextProvider,
} from "./Componet/userContext/userContext";
import ResetPassword from "./Componet/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CartContext } from "./Componet/userContext/cartContext";
import Allorder from "./Componet/Allorder/Allorder";
import Checkout from "./Componet/Checkout/Checkout";
import WishList from "./Componet/WishList/WishList";
import Categories from "./Componet/Categories/Categories";
import Brands from "./Componet/Brands/Brands";

export default function App() {
  let { setItem, getUserCart } = useContext(CartContext);
  let QueryClientt = new QueryClient();
  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: (
            <GuradRouting>
              {" "}
              <Home />
            </GuradRouting>
          ),
        },
        { path: "about", element: <About /> },
        {
          path: "categories",
          element: (
            <GuradRouting>
              <Categories />{" "}
            </GuradRouting>
          ),
        },
        {
          path: "brand",
          element: (
            <GuradRouting>
              <Brands />{" "}
            </GuradRouting>
          ),
        },
        {
          path: "checkout/:id",
          element: (
            <GuradRouting>
              <Checkout />{" "}
            </GuradRouting>
          ),
        },
        {
          path: "/allorder",
          element: (
            <GuradRouting>
              <Allorder />{" "}
            </GuradRouting>
          ),
        },
        {
          path: "/cart",
          element: (
            <GuradRouting>
              <Cart />{" "}
            </GuradRouting>
          ),
        },
        { path: "forgetbassord", element: <ForgetPassword /> },
        { path: "/ResetPassword", element: <ResetPassword /> },
        {
          path: "product",
          element: (
            <GuradRouting>
              <Product />
            </GuradRouting>
          ),
        },
        {
          path: "wishList",
          element: (
            <GuradRouting>
              <WishList />
            </GuradRouting>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <GuradRouting>
              <ProductDetails />
            </GuradRouting>
          ),
        },
        { path: "/login", element: <Login /> },
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "logout", element: <Logout /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  let { setToken } = useContext(UserConext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"));
      getUserData();
    }
  }, []);

  async function getUserData() {
    let req = await getUserCart().catch((err) => {});
    console.log(req);
    if (req?.data?.status == "success") {
      setItem(req.data.numOfCartItems);
    }
  }
  return (
    <>
      <QueryClientProvider client={QueryClientt}>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>

        <UserConextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </UserConextProvider>
      </QueryClientProvider>
    </>
  );
}
