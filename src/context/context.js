import React, { createContext, useState } from "react";

export const RefreshContext = createContext({
  refresh: false, 
  setRefresh: () => {},
});

export const RefreshContextProvider = ({ children }) => {

  const [refresh, setRefresh] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    id: "",
    title: "",
    description: "",
  });

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh,
      updatedItem, setUpdatedItem
    }}>
      {children}
    </RefreshContext.Provider>
  );
};