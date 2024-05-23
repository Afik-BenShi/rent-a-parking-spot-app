import React, { createContext, useState } from "react";

// Create the refresh context with default values
export const RefreshContext = createContext({
  refresh: false, 
  setRefresh: () => {},
  updatedTitle: "", 
  setUpdatedTitle: () => {},
  updatedDescription: "",
  setUpdatedDescription: () => {},
});

export const RefreshContextProvider = ({ children }) => {

  const [refresh, setRefresh] = useState(false);
  //const [updatedTitle, setUpdatedTitle] = useState("");
  //const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedItem, setUpdatedItem] = useState({
    id: "",
    title: "",
    description: "",
  });

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh,
      //updatedTitle, setUpdatedTitle, updatedDescription, setUpdatedDescription
      updatedItem, setUpdatedItem
    }}>
      {children}
    </RefreshContext.Provider>
  );
};

// // Create the context to update the edited details
// export const UpdateEditedDetailsContext = createContext({
//   title: "", 
//   setTitle: () => {},
//   description: "",
//   setDescription: () => {},
// });

// export const UpdateEditedDetailsContextProvider = ({ children }) => {

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   return (
//     <RefreshContext.Provider value={{ title, setTitle, description, setDescription}}>
//       {children}
//     </RefreshContext.Provider>
//   );
// };
