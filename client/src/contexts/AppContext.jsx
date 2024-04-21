import { useContext, useReducer, createContext, useEffect } from "react";
import { setAccessTokenAction } from "../actionCreators";

import AppReducer from "../reducers/AppReducer";

export const AppContext = createContext(null);

const initialState = {
  categories: [],
  authUser: {
    avatar: "",
    accessToken: null,
    isAuthenticating: false,
  },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    getAccessTokenFromLocalStorage();
  }, []);

  const storeAccessToken = (token) => {
    // store it in the localstorage
    localStorage.setItem("accessToken", token);
    dispatch(setAccessTokenAction(token));
  };

  const getAccessTokenFromLocalStorage = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    dispatch(setAccessTokenAction(token));
  };

  const methods = { storeAccessToken, getAccessTokenFromLocalStorage };
  return (
    <AppContext.Provider value={{ ...state, ...methods }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);
export default useApp;
