import React, { createContext, useReducer } from "react";

const token = JSON.parse(localStorage.getItem("token")) || null;

const initialState = {
  isLogged: !!token,
  userId: localStorage.getItem("userId") || null,
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

  return (
    <AppContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
