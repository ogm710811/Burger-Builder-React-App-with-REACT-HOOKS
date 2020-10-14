import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import * as authenticationActions from "../../store/actions";

const logout = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authenticationActions.authLogout());
  useEffect(() => {
    onLogout()
  }, [onLogout])
  return <Redirect to="/"/>;
}

export default logout;
