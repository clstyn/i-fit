import React, { createContext, useReducer, useCallback } from "react";

const token = JSON.parse(localStorage.getItem("token")) || null;

const initialState = {
  isLogged: !!token,
  token: token,
  userId: localStorage.getItem("userId") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload,
        isLogged: true,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        isLogged: false,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (val) => {
    dispatch({ type: "LOGIN", payload: val });
  };

  const logout = (val) => {
    dispatch({ type: "LOGOUT", payload: val });
  };

  const setGlobalUser = useCallback((val) => {
    dispatch({ type: "SET_USER", payload: val });
  }, []);

  return (
    <AppContext.Provider value={{ ...state, login, logout, setGlobalUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
