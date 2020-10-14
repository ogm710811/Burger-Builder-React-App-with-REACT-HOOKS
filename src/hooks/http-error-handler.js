import { useEffect, useState } from "react";

export default axiosInstance => {
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

  return [errorMessage, errorModalHandler]
}
