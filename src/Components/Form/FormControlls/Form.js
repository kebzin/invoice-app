/**
 * React component for creating or editing an invoice form.
 *
 * Summary:
 * This Form component allows users to create new invoices or edit existing ones.
 * It imports styled components, a List component, and a SubmitController component for managing form submission.
 * The component uses context, state, and various hooks to manage its functionality.
 * It includes functions for saving and updating invoice data, as well as rendering the form and its inputs.
 *
 * @component
 * @param {boolean} isEditing - Flag indicating whether the form is in edit mode.
 * @returns {JSX.Element} - Rendered Form component.
 */
import { useContext, useState, useEffect } from "react";
import {
  Title,
  StyledForm,
  Fieldset,
  Legend,
  InputWrapper,
  Label,
  Input,
  ErrorsWrapper,
  Error,
} from "./FormStyles";
import List from "../List/List";
import SubmitController from "../SubmitController/SubmitController";
import { AppContexProvider } from "../../../Provider/GlobalContex";
import dateToString from "../../../utilities/dateToString";

const Form = ({ isEditting }) => {
  const { invoice, setInvoice, setOpenForm, setEditting, editIndex } =
    useContext(AppContexProvider);
  const [clientName, setclientName] = useState("");
  const [clientPhone, setclientPhone] = useState("");
  const [description, setdescription] = useState("");
  const [formstate, setFormstate] = useState({
    isSubmitting: false,
    isError: { status: false, message: "" },
  });
  const [itemarray, setItemarray] = useState([
    { name: "", quantity: "", price: "", total: "" },
  ]);

  useEffect(() => {
    if (!isEditting) {
      return;
    }

    const InvoiceToUpdate = invoice[editIndex];
    setclientName(InvoiceToUpdate?.clientName);
    setclientPhone(InvoiceToUpdate?.clientPhone);
    setdescription(InvoiceToUpdate?.description);
    setItemarray(InvoiceToUpdate?.items);
  }, [isEditting, editIndex, invoice]);

  // functions
  // handle invoice data save to the global state
  const handleSave = (event) => {
    event.preventDefault();
    setFormstate({ ...formstate, isSubmitting: true });

    // creating a time stamp
    const timestamp = new Date().getTime();

    try {
      const newData = {
        clientName: clientName,
        clientPhone: clientPhone,
        description: description,
        status: "pending",
        items: itemarray,
        createAt: dateToString(timestamp),
      };

      // check if all the fields are empty
      const areFieldsEmpty =
        clientName === "" &&
        clientPhone === "" &&
        itemarray.map(
          (item) =>
            item.name === "" && item.price === "" && item.quantity === ""
        );

      if (areFieldsEmpty) {
        return alert("All the field are required");
      }

      // add  to the existing invoiceData array in the localstorage
      localStorage.setItem(
        "invoiceData",
        JSON.stringify([...invoice, newData])
      );

      setInvoice([...invoice, newData]);

      // handle save to database

      // make an API call to save the data to the database
      // await fetch("https://api.example.com/invoices", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newData),
      // });

      setFormstate({ ...formstate, isSubmitting: false });
      setOpenForm(false);

      // incase if error happen and we recetify the error the error state should be false to prevent any confusion
      setFormstate({ isError: false });
    } catch (error) {
      console.log(error.message);
      setFormstate({
        ...formstate,
        isError: { status: true, message: error.message },
      });
    } finally {
      // this will alway set the loding indicator to stop loading when something went wrong
      setFormstate({ ...formstate, isSubmitting: false });
    }
  };

  // handle invoice update
  const onUpdate = async (event) => {
    event.preventDefault();
    const InvoiceToUpdate = invoice[editIndex];
    try {
      setFormstate({ ...formstate, isSubmitting: true });
      const newData = {
        clientName: clientName,
        clientPhone: clientPhone,
        description: description,
        status: InvoiceToUpdate?.status,
        items: itemarray,
        createAt: InvoiceToUpdate?.createAt,
      };

      // update  invoiceData in the localstorage base on the editIndex
      localStorage.setItem(
        "invoiceData",
        JSON.stringify([
          ...invoice.slice(0, editIndex),
          newData,
          ...invoice.slice(editIndex + 1),
        ])
      );
      // refresh the page to see the effect

      window.location.reload();

      // write your logic to  make an API call to modefied the data in the database
      //await axios.put(`${API_URL}/invoices/${InvoiceToUpdate._id}`, newData);

      // incase if error happen and we recetify the error the error state should be false to prevent any confusion
      setFormstate({ isError: false });
      setEditting(false);
      setOpenForm(false);
    } catch (error) {
      console.log(error);
      setFormstate({
        ...formstate,
        isError: { status: true, message: error.message },
      });
    } finally {
      // this will alway set the loding indicator to stop loading when something went wrong
      setFormstate({ ...formstate, isSubmitting: false });
    }
  };

  return (
    <>
      {<Title> {isEditting ? "Update Invoice" : "New Invoice"}</Title>}

      <StyledForm id="invoice-form">
        <Fieldset>
          <Legend>Bill to</Legend>
          <InputWrapper>
            <Label htmlFor="street">Client's Name</Label>
            <Input
              required={true}
              disabled={formstate.isSubmitting}
              type="text"
              name="clientName"
              onChange={(text) => {
                const value = text.target.value;
                setclientName(value);
              }}
              value={clientName}
            />
          </InputWrapper>

          {/* phone number */}

          <InputWrapper>
            <Label htmlFor="clientEmail">Client's Phone number</Label>
            <Input
              required={true}
              disabled={formstate.isSubmitting}
              type="text"
              placeholder="+220 2494543"
              name="clientPhone"
              onChange={(text) => {
                const value = text.target.value;
                setclientPhone(value);
              }}
              value={clientPhone}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="description">product Description (optional)</Label>
            <Input
              disabled={formstate.isSubmitting}
              type="text"
              placeholder="Description of the product"
              name="description"
              onChange={(text) => setdescription(text.target.value)}
              value={description}
            />
          </InputWrapper>
        </Fieldset>
        <List
          items={itemarray}
          setItemarray={setItemarray}
          formstate={formstate}
        />

        {formstate.isError.status && (
          <ErrorsWrapper>
            <Error>{formstate.isError.message}</Error>
          </ErrorsWrapper>
        )}
      </StyledForm>
      <SubmitController
        formstate={formstate}
        handleSave={isEditting ? onUpdate : handleSave}
        setOpenForm={setOpenForm}
      />
    </>
  );
};

export default Form;
