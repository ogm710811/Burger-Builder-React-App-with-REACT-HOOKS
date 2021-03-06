import React from "react";
import PropTypes from "prop-types";
import ingredientStyles from "./BurgerIngredient.css";

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={ingredientStyles.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={ingredientStyles.BreadTop}>
          <div className={ingredientStyles.Seeds1}></div>
          <div className={ingredientStyles.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={ingredientStyles.Meat}></div>;
      break;
    case "cheese":
      ingredient = <div className={ingredientStyles.Cheese}></div>;
      break;
    case "salad":
      ingredient = <div className={ingredientStyles.Salad}></div>;
      break;
    case "bacon":
      ingredient = <div className={ingredientStyles.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;

}

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
