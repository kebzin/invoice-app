import {
  StyledErrorMessage,
  Illustration,
  Title,
  Text,
  Bold,
} from "./ErrorMessageStyles";
import { AppContexProvider } from "../../Provider/GlobalContex";
import { useContext } from "react";

const ErrorMessage = () => {
  const { windowWidth } = useContext(AppContexProvider);
  const isDesktop = windowWidth >= 768;

  return (
    <StyledErrorMessage initial="hidden" animate="visible" exit="exit">
      <Illustration />
      <Title>There is nothing here</Title>
      <Text>
        Create an invoice by clicking the{" "}
        <Bold>New {isDesktop && "Invoice"}</Bold> button and get started
      </Text>
    </StyledErrorMessage>
  );
};

export default ErrorMessage;
