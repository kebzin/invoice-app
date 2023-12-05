import React, { useContext } from "react";
import { Backdrop, Link, StyledFormController } from "./FormControllerStyles";
import Form from "../Form/FormControlls/Form";
import { AppContexProvider } from "../../Provider/GlobalContex";
const FormControlls = () => {
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
        <Form isEdited={false} />
      </StyledFormController>
    </Backdrop>
  );
};

export default FormControlls;
