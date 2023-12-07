/**
 * React component for controlling form submission.
 *
 * Summary:
 * The SubmitController component manages the submission of the invoice form.
 * It includes buttons for discarding changes and saving/sending the invoice.
 * The component receives form state, a save function, and a function to close the form as props.
 *
 * @component
 * @param {Object} formstate - State object for managing form state.
 * @param {Function} handleSave - Function to handle form submission.
 * @param {Function} setOpenForm - Function to close the form.
 * @returns {JSX.Element} - Rendered SubmitController component.
 */
import Button from "../../shared/Button/Button";
import { StyledSubmitController } from "./SubmitControllerStyles";

const SubmitController = ({ formstate, handleSave, setOpenForm }) => {
  return (
    <StyledSubmitController $isEdited={false}>
      <Button
        $small
        type="button"
        $secondary
        onClick={() => setOpenForm(false)}
        disabled={formstate.isSubmitting}
      >
        Discard
      </Button>

      <Button
        form="invoice-form"
        type={"submit"}
        $small
        $primary
        onClick={(event) => handleSave(event)}
        disabled={formstate.isSubmitting}
      >
        Save '& Send'
      </Button>
    </StyledSubmitController>
  );
};

export default SubmitController;
