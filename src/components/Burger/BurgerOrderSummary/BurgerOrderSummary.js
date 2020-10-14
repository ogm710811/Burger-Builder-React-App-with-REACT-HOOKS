import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const burgerOrderSummary = ({clickedCancel, clickedContinue, ingredients, totalPrice}) => {
  const ingredientSummary = Object.keys(ingredients).map(
    (ingredientKey) => {
      return ingredients[ingredientKey] > 0 ? (
        <li key={ingredientKey}>
          <span style={{textTransform: "capitalize"}}>{ingredientKey}</span>
          : {ingredients[ingredientKey]}
        </li>
      ) : null;
    }
  );
  return (
    <Aux>
      <h3>Your Order Details</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={clickedCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={clickedContinue}>
        Checkout
      </Button>
    </Aux>
  );

}

export default burgerOrderSummary;
