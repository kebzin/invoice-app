import React, { createContext, useState } from "react";

export const AppContexProvider = createContext(null);

const GlobalContex = ({ children }) => {
  const [invoice, setInvoice] = useState([]);
  const [windowWidth, setwindowWidth] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  return (
    <AppContexProvider.Provider
      value={{
        invoice,
        windowWidth,
        openForm,
        setOpenForm,
        setwindowWidth,
        setInvoice,
      }}
    >
      {children}
    </AppContexProvider.Provider>
  );
};

export default GlobalContex;
