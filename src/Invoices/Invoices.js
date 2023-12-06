//
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { useContext } from "react";
import { Container, Header, Info, Title, Text } from "./InvoicesStyles";
import List from "./List/List";
import { AppContexProvider } from "../Provider/GlobalContex";
import Button from "../Components/shared/Button/Button";

const Invoices = () => {
  // convert pricer to currency format
  const convertToCurrency = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GMD",
    }).format(price);
  };

  const { invoice, setOpenForm } = useContext(AppContexProvider);
  // calculate total price
  const calculateTotal = (index) => {
    const currentItem = invoice[index];
    // calculate the total price based on item quantity and price
    const total = currentItem.items.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.price),
      0
    );
    return total;
  };
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

      {invoice?.length === 0 ? (
        <ErrorMessage />
      ) : (
        invoice?.map((item, index) => (
          <List
            key={index}
            index={index}
            clientName={item.clientName}
            status={item.status}
            total={convertToCurrency(calculateTotal(index))}
            id={"2323"}
            createdAt={item.createAt}
          />
        ))
      )}
    </Container>
  );
};

export default Invoices;
