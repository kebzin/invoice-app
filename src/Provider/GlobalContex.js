/* Summary:
 * The GlobalContext component provides a context for managing global state in the application.
 * It includes state variables for invoices, window width, form visibility, and editing status.
 * The component also handles actions such as deleting items, editing invoices, and fetching data from local storage.
 *
 * @component
 * @param {Object} children - Child components to be wrapped by the context provider.
 * @returns {JSX.Element} - Rendered GlobalContext component.
 */
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContexProvider = createContext(null);

const GlobalContex = ({ children }) => {
  const [invoice, setInvoice] = useState([]);
  const [windowWidth, setwindowWidth] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [isEditting, setEditting] = useState(false);
  const Navigation = useNavigate();
  const [editIndex, setEditIndex] = useState();

  // handle invoice delete
  const handleItemDelete = (itemId) => {
    // delete item from InvoiceData array fro the localstorage
    try {
      const newItemsArray = JSON.parse(localStorage.getItem("invoiceData"));
      if (!newItemsArray) return;
      newItemsArray.splice(itemId, 1);
      setInvoice(newItemsArray);
      localStorage.setItem("invoiceData", JSON.stringify(newItemsArray));
      window.location.reload();
      // after deleting navigate one step back
      Navigation(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const editInvoice = (id) => {
    setEditIndex(id);
    setEditting(true);
    setOpenForm(true);
  };

  /**
   * Fetch the invoiceData from local storage
   *
   * "When fetching data from an API, you can directly retrieve the information within the invoice component. This means you don't need the additional logic of retrieving the data from local storage."
   */
  useEffect(() => {
    const invoiceData = localStorage.getItem("invoiceData");
    if (invoiceData) {
      setInvoice(JSON.parse(invoiceData));
    }
  }, []);

  /**
   * Listen for window resize and call handleResize function
   */
  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Assign window width value to a windowWidth state.
   */
  return (
    <AppContexProvider.Provider
      value={{
        invoice,
        windowWidth,
        openForm,
        isEditting,
        setEditting,
        setOpenForm,
        setwindowWidth,
        setInvoice,
        handleItemDelete,
        editInvoice,
        setEditIndex,
        editIndex,
      }}
    >
      {children}
    </AppContexProvider.Provider>
  );
};

export default GlobalContex;
