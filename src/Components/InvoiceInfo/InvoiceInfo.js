import {
  StyledInvoiceInfo,
  Container,
  Key,
  Uid,
  Hashtag,
  CreatedDate,
  ClientInfo,
  Heading,
  Text,
  ClientAddress,
  Total,
  TotalHeading,
  TotalText,
} from "../InvoiceInfo/InvoiceInfoStyles";
import Summary from "./Summary/Summary";

// convert to currencey

const InvoiceInfo = ({ invoice, id }) => {
  const convertToCurrency = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GMD",
    }).format(price);
  };

  // calculating the total of item
  const calculateTotal = () => {
    const total = invoice?.items.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.price),
      0
    );
    return total;
  };

  return (
    <StyledInvoiceInfo initial="hidden" animate="visible" exit="exit">
      <Container>
        <Key>
          <Uid>
            <Hashtag>#</Hashtag>
            {0}
          </Uid>
          <Heading>{invoice?.description}</Heading>
        </Key>

        <CreatedDate>
          <Heading>Invoice Date</Heading>
          <Text>{invoice?.createAt}</Text>
        </CreatedDate>
        <ClientInfo>
          <Heading>Bill to</Heading>
          <Text>{invoice?.clientName}</Text>
          <Text>{invoice?.clientPhone}</Text>
          <ClientAddress></ClientAddress>
        </ClientInfo>
      </Container>
      <Summary invoice={invoice} />
      <Total>
        <TotalHeading>Totla Amount</TotalHeading>
        <TotalText> {convertToCurrency(calculateTotal())}</TotalText>
      </Total>
    </StyledInvoiceInfo>
  );
};

export default InvoiceInfo;
