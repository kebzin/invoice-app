// import { useGlobalContext } from "../App/context";
// import Filter from "./Filter/Filter";
// import List from "./List/List";
import { useContext } from "react";
import Button from "../Components/shared/Button/Button";

import { Container, Header, Info, Title, Text } from "./InvoicesStyles";
import List from "./List/List";
import { AppContexProvider } from "../Provider/GlobalContex";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const Invoices = () => {
  const { invoice, setInvoice, windowWidth, setOpenForm } =
    useContext(AppContexProvider);
  // states
  return (
    <Container>
      <Header>
        <Info>
          <Title>Invoices</Title>
          <Text>There are 8 total invoices</Text>
        </Info>

        {/* button to show invoice modal */}
        <Button type="button" $newInvoice onClick={() => setOpenForm(true)}>
          New {"Invoice"}
        </Button>
      </Header>

      {/* map over the invoice and render the invoice list */}

      {invoice.length === 0 ? (
        <ErrorMessage />
      ) : (
        invoice.map((item, index) => (
          <List
            clientName={"kebba waiga"}
            status={"pending"}
            total={"200"}
            id={"2323"}
            createdAt={"2 days ago"}
          />
        ))
      )}
    </Container>
  );
};

export default Invoices;
