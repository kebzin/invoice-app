import Button from "../shared/Button/Button";
import { Container, Title, Text, CtaGroup } from "./ModalStyles";

const ModalStatus = ({ buttonTitle, headheaderTitle, message, close }) => {
  return (
    <Container>
      <Title>{headheaderTitle}</Title>
      <Text>{message}</Text>
      <CtaGroup>
        <Button type="button" $secondary onClick={close}>
          Cancel
        </Button>
        <Button
          type="button"
          $primary
          // onClick={() => markInvoiceAsPaid()}
        >
          {buttonTitle}
        </Button>
      </CtaGroup>
    </Container>
  );
};

export default ModalStatus;
