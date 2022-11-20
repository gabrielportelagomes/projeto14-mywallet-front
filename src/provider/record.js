import { createContext, useContext, useState } from "react";

const RecordContext = createContext({});

export const RecordProvider = (props) => {
  const [editRecord, setEditRecord] = useState(undefined);

  return (
    <RecordContext.Provider value={{ editRecord, setEditRecord }}>
      {props.children}
    </RecordContext.Provider>
  );
};

export const useAuth = () => useContext(RecordContext);
