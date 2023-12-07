// This is a functional component that renders a backdrop and a form controller.
// It receives a prop 'isEditting' to determine if the form is in edit mode or not.
// It also renders a Form component inside the controller.

import React from "react";
import { Backdrop, StyledFormController } from "./FormControllerStyles";
import Form from "../Form/FormControlls/Form";

const FormControlls = ({ isEditting }) => {
  return (
    <Backdrop>
      <StyledFormController
        aria-modal
        aria-label="Invoice form"
        tabIndex={-1}
        role="dialog"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Form isEditting={isEditting} />
      </StyledFormController>
    </Backdrop>
  );
};

export default FormControlls;
