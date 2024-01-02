import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const getFromLocalStorage = (text) => {
  let item = localStorage.getItem(text);
  if (item) {
    return (item = JSON.parse(localStorage.getItem(text)));
  } else return null;
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const [cart, setCart] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(
    getFromLocalStorage("vehicle")
  );
  const [openToast, setOpenToast] = useState(false);

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  useEffect(() => {
    const getCart = async () => {
      const { data } = await axios.get(
        `${baseURL}/Cart/GetProductsFromCart/${user.id}`
      );
      setCart(data);
    };
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      getCart();
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (selectedVehicle) {
      localStorage.setItem("vehicle", JSON.stringify(selectedVehicle));
    } else {
      localStorage.removeItem("vehicle");
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (openToast) {
      setInterval(() => {
        setOpenToast(false);
      }, 6000);
    }
    return () => clearInterval();
  }, [openToast]);

  const values = {
    user,
    setUser,
    cart,
    setCart,
    openToast,
    setOpenToast,
    selectedVehicle,
    setSelectedVehicle,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
