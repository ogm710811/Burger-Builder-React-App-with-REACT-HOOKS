import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import OrderCheckoutSummary from "../../components/Order/OrderCheckoutSummary/OrderCheckoutSummary";
import ContactData from "./ContactData/ContactData";

const checkout = ({history, match}) => {
  const {ingredients} = useSelector(state => state.burgerBuilderReducer)
  const checkoutCancelledHandler = () => {
    history.push("/");
  };

  const checkoutContinueHandler = () => {
    history.replace("/checkout/contact-data");
  };

  let orderCheckoutSummary = <Redirect to="/"/>;
  if (ingredients) {
    orderCheckoutSummary = (
      <div>
        <OrderCheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinue={checkoutContinueHandler}
          ingredients={ingredients}
        />
        <Route
          path={match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return orderCheckoutSummary;

}

export default checkout;
