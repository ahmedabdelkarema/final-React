import { createContext, useState } from "react";
import axios from "axios";
export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let [item, setItem] = useState();
  function getUserCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  function addCart(prodcutId) {
    let body = {
      productId: prodcutId,
    };
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart", body, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  function removeCart(id) {
    let option = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      option
    );
  }
  function clareCart(id) {
    let option = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, option);
  }
  function updateCart(id, count) {
    let option = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    let body = {
      count: count,
    };
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      body,
      option
    );
  }
  function CheckOutPayemebt(id, data) {
    let option = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    let body = {
      shippingAddress: data,
    };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      body,
      option
    );
  }
  return (
    <CartContext.Provider
      value={{
        CheckOutPayemebt,
        updateCart,
        clareCart,
        removeCart,
        getUserCart,
        addCart,
        item,
        setItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
