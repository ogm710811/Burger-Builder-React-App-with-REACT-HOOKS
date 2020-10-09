import React, { useEffect, useState } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return (props) => {
    const [errorMessage, setErrorMessage] = useState(null)

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (req) => {
        setErrorMessage(null)
        return req;
      }
    );
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        setErrorMessage(error.message)
      }
    );

    useEffect(() => {
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      }
    }, [requestInterceptor, responseInterceptor])

    const errorModalHandler = () => {
      setErrorMessage(null)
    };

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
