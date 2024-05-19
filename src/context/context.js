import React, { createContext, useState } from "react";

// Create the refresh context with default values
export const RefreshContext = createContext({
  refresh: false, 
  setRefresh: () => {},
  title: "", 
  setTitle: () => {},
  description: "",
  setDescription: () => {},
});

export const RefreshContextProvider = ({ children }) => {

  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh,
      title, setTitle, description, setDescription
    }}>
      {children}
    </RefreshContext.Provider>
  );
};

// Create the context to update the edited details
export const UpdateEditedDetailsContext = createContext({
  title: "", 
  setTitle: () => {},
  description: "",
  setDescription: () => {},
});

export const UpdateEditedDetailsContextProvider = ({ children }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <RefreshContext.Provider value={{ title, setTitle, description, setDescription}}>
      {children}
    </RefreshContext.Provider>
  );
};