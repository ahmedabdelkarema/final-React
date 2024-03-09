import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export let UserConext = createContext();
export function UserConextProvider({ children }) {
  let [userToken, setToken] = useState(null);
  let [data, setData] = useState(null);
  useEffect(() => {
    if (userToken != null) {
      data = jwtDecode(userToken);
      console.log(data);
    }
  }, []);
  return (
    <UserConext.Provider value={{ data, userToken, setToken }}>
      {children}
    </UserConext.Provider>
  );
}