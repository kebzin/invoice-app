import { useContext } from "react";
import {
  StyledSummary,
  Container,
  Head,
  Heading,
  Item,
  ItemName,
  ItemQty,
  ItemPrice,
  ItemTotal,
} from "./SummaryStyles";
import { AppContexProvider } from "../../../Provider/GlobalContex";

const Summary = ({ invoice }) => {
  const { windowWidth } = useContext(AppContexProvider);
  const isDesktop = windowWidth >= 768;

  return (
    <StyledSummary>
      <Container>
        {isDesktop && (
          <Head>
            <Heading>Item Name</Heading>
            <Heading $jsCenter>QTY.</Heading>
            <Heading $jsEnd>Price</Heading>
            <Heading $jsEnd>Total</Heading>
          </Head>
        )}
        {invoice?.items?.map((item, index) => (
          <Item key={index}>
            <ItemName>{item?.name}</ItemName>
            <ItemQty>
              {item?.quantity} {!isDesktop && ` GMD ${item?.price}`}
            </ItemQty>
            {isDesktop && <ItemPrice>{`GMD ${item?.price}`}</ItemPrice>}
            <ItemTotal>{`GMD ${
              Number(item?.quantity) * Number(item?.price)
            }`}</ItemTotal>
          </Item>
        ))}
      </Container>
    </StyledSummary>
  );
};

export default Summary;
