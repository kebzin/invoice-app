import { useState } from "react";
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
