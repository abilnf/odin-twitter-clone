import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/firebase";

const UserContext = createContext();

function UserContextProvider(props) {
  return (
    <UserContext.Provider value={props.user}>
      {props.children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserContextProvider, useUserContext };
