import { createContext, useState } from "react";

 export const authContext = createContext({});
// children defines app. we will wrap with this provider

 export const Authprovider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  const removeToken = () => {
    localStorage.clear("token");
    setToken(null);
  };
  return (
    <authContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </authContext.Provider>
  );
    
};


