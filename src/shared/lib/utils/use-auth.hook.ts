import useAuthStore from "../stores/auth-store.hook";
import { useNavigate, useLocation } from "react-router-dom";
import { IUser } from "@shared/constants";
import { removeSlash } from "./string-actions";
import { useMemo } from "react";

export const useAuth = () => {
  const store = useAuthStore();
  const navigate = useNavigate();
  const location = removeSlash(useLocation().pathname);

  const addUser = (value: IUser) => {
    // console.log('Set user in local storage after calling hook', value)
    localStorage.setItem("user", JSON.stringify(value));
    store.setUser(value);
  };

  const userName = useMemo(() => {
    const email = store?.authUser?.email;
    const name = email ? email.slice(0, email.indexOf("@")) : "";
    return name;
  }, [store]);

  const checkUser = () => {
    const value = localStorage.getItem("user");
    if (value) {
      const formattedUser = JSON.parse(value);
      addUser(formattedUser);

      if (location == "login") {
        navigate("/app");
      }
    } else {
      navigate("/login");
    }
  };

  const login = (value: IUser) => {
    addUser(value);
    navigate("/app");
  };

  const logout = () => {
    store.setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return { login, logout, checkUser, addUser, userName };
};
