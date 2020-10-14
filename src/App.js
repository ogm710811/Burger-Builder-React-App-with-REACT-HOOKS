import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Authentication/Logout";
import * as authActions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("./containers/Authentication/Auth");
});

const app = () => {
  const isUserLoggedIn = useSelector(
    (state) => state.authenticationReducer.idToken !== null
  );
  const dispatch = useDispatch();
  const onAuthCheckSession = () => dispatch(authActions.authCheckSession());
  useEffect(() => {
    onAuthCheckSession();
  }, [onAuthCheckSession]);

  const routes = !isUserLoggedIn ? (
    <Switch>
      <Route path="/login" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      {/*<Route path="/login" render={(props) => <Auth {... props}/>}/>*/}
      <Route path="/logout" component={Logout} />
      <Route path="/checkout" render={(props) => <Checkout {...props} />} />
      <Route path="/orders" render={(props) => <Orders {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<span>Loading ...</span>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default app;
