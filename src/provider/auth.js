import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [userLogin, setUserLogin] = useState(undefined);

  return (
    <AuthContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
