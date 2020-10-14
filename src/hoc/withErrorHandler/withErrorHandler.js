import React from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return (props) => {
    const [errorMessage, errorModalHandler] = useHttpErrorHandler(axiosInstance)
    return (
      <Aux>
        <Modal
          displayModal={errorMessage}
          closeModal={errorModalHandler}
        >
          {errorMessage}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
