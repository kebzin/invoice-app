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
import { useContext, useState } from "react";
import SubmitController from "../SubmitController/SubmitController";
import { AppContexProvider } from "../../../Provider/GlobalContex";
import Modal from "../../Modal/Modal";

const Form = ({ isEdited }) => {
  // hooks
  const { invoice, setInvoice, setOpenForm } = useContext(AppContexProvider);
  // states
  const [clientName, setclientName] = useState("");
  const [clientPhone, setclientPhone] = useState("");
  const [description, setdescription] = useState("");
  const [modal, setModal] = useState(false);
  const [formstate, setFormstate] = useState({
    isSubmitting: false,
    isError: { status: false, message: "" },
  });

  const [itemarray, setItemarray] = useState([
    { name: "", quantity: "", price: "", total: "" },
  ]);

  // functions

  // handle invoice data save to the global state
  const handleSave = (event) => {
    event.preventDefault();
    setFormstate({ ...formstate, isSubmitting: true });

    // creating a timestamp
    const displayOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    // creating a time stamp
    const timestamp = new Date().getTime();
    let date = new Date(timestamp).toLocaleDateString("en-US", displayOptions);

    try {
      const newData = {
        clientName: clientName,
        clientPhone: clientPhone,
        description: description,
        status: "pending",
        items: itemarray,
        createAt: date,
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

      // add  to the InvoiceData array in my contex store
      setInvoice([...invoice, newData]);

      // handle save to database

      // make an API call to save the data to the database
      // await fetch("https://api.example.com/invoices", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newData),
      // });

      setFormstate({ ...formstate, isSubmitting: false });

      // reset the form fields
      setclientName("");
      setclientPhone("");
      setdescription("");
      setItemarray([{ name: "", quantity: "", price: "", total: "" }]);

      //

      setModal(true);
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

  // handle update

  return (
    <>
      {<Title>New Invoice</Title>}

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
            <Label htmlFor="description">Project Description (optional)</Label>
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
            <Error>"formstate.isError.message"</Error>
          </ErrorsWrapper>
        )}
      </StyledForm>
      <SubmitController
        formstate={formstate}
        handleSave={handleSave}
        setOpenForm={setOpenForm}
      />
      {modal && (
        <Modal
          close={() => setModal(false)}
          buttonTitle="ok"
          headheaderTitle="Record added"
          message="New  Invoice saved successfully!"
        />
      )}
    </>
  );
};

export default Form;
