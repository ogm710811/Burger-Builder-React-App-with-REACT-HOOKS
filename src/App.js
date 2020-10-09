import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

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

const app = ({isUserLoggedIn, onAuthCheckSession}) => {
  useEffect(() => {
    onAuthCheckSession();
  }, [])

  const routes = !isUserLoggedIn ? (
    <Switch>
      <Route path="/login" render={() => <Auth />}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  ) : (
    <Switch>
      <Route path="/login" render={() => <Auth />}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/checkout" render={() => <Checkout />}/>
      <Route path="/orders" render={() => <Orders />}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<span>Loading ...</span>}>{routes}</Suspense>
      </Layout>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.authenticationReducer.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckSession: () => dispatch(authActions.authCheckSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
