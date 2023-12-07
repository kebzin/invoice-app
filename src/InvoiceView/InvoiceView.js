import Status from "../Components/shared/Status/Status";
import Button from "../Components/shared/Button/Button";
import {
  StyledInvoiceView,
  Container,
  Controller,
  Text,
  ButtonWrapper,
} from "./InvoiceViewStyles";
import backArow from "../assets/images/left.png";
import { useContext } from "react";
import { AppContexProvider } from "../Provider/GlobalContex";
import { Link, useParams } from "react-router-dom";
import InvoiceInfo from "../Components/InvoiceInfo/InvoiceInfo";

const InvoiceView = () => {
  const { invoice, handleItemDelete, setInvoice, editInvoice } =
    useContext(AppContexProvider);

  // get the id from the params
  const { id } = useParams();

  // get the invoice from contex state base on index
  const InvoiceDataById = invoice[id];

  // handle make as paid:
  const handleMarkAsPaid = (id) => {
    let newState = [...invoice];
    newState[id].status = "paid";
    setInvoice([newState]);
  };

  <Button $primary onClick={() => handleMarkAsPaid(id)}>
    Mark as Paid
  </Button>;

  return (
    <StyledInvoiceView>
      <Container>
        <Link
          referrerPolicy="no-referrer"
          to="/"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <img src={backArow} alt="back arrow" width={30} height={30} />
        </Link>
        <Controller initial="hidden" animate="visible" exit="exit">
          <Text>Status</Text>
          <Status currStatus={"pending"} />

          <ButtonWrapper>
            <Button $secondary onClick={() => editInvoice(id)}>
              Edit
            </Button>

            <Button $delete onClick={() => handleItemDelete(id)}>
              Delete
            </Button>

            <Button $primary>Mark as Paid</Button>
          </ButtonWrapper>
        </Controller>

        <InvoiceInfo invoice={InvoiceDataById} id={id} />
      </Container>
    </StyledInvoiceView>
  );
};

export default InvoiceView;
