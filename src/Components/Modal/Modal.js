import ModalStatus from "./ModalStatus";
import { StyledModal } from "./ModalStyles";

const Modal = ({
  buttonTitle,
  headheaderTitle,
  message,
  close,
  HandleInvoiceAction,
}) => {
  return (
    <StyledModal
      aria-modal
      aria-label="Confirmation"
      tabIndex={-1}
      role="dialog"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ModalStatus
        close={close}
        buttonTitle={buttonTitle}
        headheaderTitle={headheaderTitle}
        message={message}
        HandleInvoiceAction={HandleInvoiceAction}
      />
    </StyledModal>
  );
};

export default Modal;
