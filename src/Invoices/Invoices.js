/**
 * React component for displaying a list of invoices.
 *
 * Summary:
 * The Invoices component renders a list of invoices, including their details.
 * It includes a button to create a new invoice and utilizes various styled components.
 * The component also uses context to access invoice data.
 *
 * @component
 * @returns {JSX.Element} - Rendered Invoices component.
 */
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { useContext } from "react";
import { Container, Header, Info, Title, Text } from "./InvoicesStyles";
import List from "./List/List";
import { AppContexProvider } from "../Provider/GlobalContex";
import Button from "../Components/shared/Button/Button";

const Invoices = () => {
  // Convert price to currency format
  const convertToCurrency = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GMD",
    }).format(price);
  };

  const { invoice, setOpenForm } = useContext(AppContexProvider);

  // Calculate total price
  const calculateTotal = (index) => {
    const currentItem = invoice[index];

    // Calculate the total price based on item quantity and price
    const total = currentItem.items.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.price),
      0
    );
    return total;
  };

  return (
    <Container>
      <Header>
        <Info>
          <Title>Invoices</Title>
          <Text>There are {invoice.length} total invoices</Text>
        </Info>

        {/* Button to show invoice modal */}
        <Button type="button" $newInvoice onClick={() => setOpenForm(true)}>
          New Invoice
        </Button>
      </Header>

      {/* Map over the invoices and render the invoice list */}
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
