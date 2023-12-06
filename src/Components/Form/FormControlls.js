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
        {/* {windowWidth >= 768 && (
          <Link to="/" onClick={{}}>
            Go back
          </Link>
        )} */}

        {/*  */}
        <Form isEditting={isEditting} />
      </StyledFormController>
    </Backdrop>
  );
};

export default FormControlls;
