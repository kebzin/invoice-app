import ModalStatus from "./ModalStatus";
import { StyledModal } from "./ModalStyles";

const Modal = ({ buttonTitle, headheaderTitle, message, close }) => {
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
      />
    </StyledModal>
  );
};

export default Modal;
