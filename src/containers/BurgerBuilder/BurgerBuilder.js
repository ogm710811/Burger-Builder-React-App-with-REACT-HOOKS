import React, { useCallback, useEffect, useState } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import BurgerView from "../../components/Burger/BurgerView/BurgerView";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import BurgerOrderSummary from "../../components/Burger/BurgerOrderSummary/BurgerOrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import axiosOrdersInstance from "../../axios/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";

const burgerBuilder = ({ history }) => {
  const {
    ingredients,
    totalPrice,
    ingredientsLoading,
    hasCatchError,
  } = useSelector((state) => state.burgerBuilderReducer);
  const isUserLoggedIn = useSelector(
    (state) => state.authenticationReducer.idToken !== null
  );
  const [isOrderNowButtonClicked, setIsOrderNowButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const onIngredientsAdded = (ingredientName) =>
    dispatch(burgerBuilderActions.addIngredient(ingredientName));
  const onIngredientsRemoved = (ingredientName) =>
    dispatch(burgerBuilderActions.removeIngredient(ingredientName));
  const onLoadIngredients = useCallback(
    () => dispatch(burgerBuilderActions.loadIngredientsInit()),
    []
  );

  useEffect(() => {
    onLoadIngredients();
  }, [onLoadIngredients]);

  const orderNowHandler = () => {
    if (isUserLoggedIn) {
      setIsOrderNowButtonClicked(true);
    } else {
      history.push("/login");
    }
  };

  const orderCancelHandler = () => {
    setIsOrderNowButtonClicked(false);
  };

  const orderContinueCheckout = () => {
    history.push({
      pathname: "/checkout",
    });
  };

  const buttonOrderNowHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, ingredientValue) => {
        return sum + ingredientValue;
      }, 0);
    return sum > 0;
  };

  const disabledIngredientsInfo = {
    ...ingredients,
  };
  for (let key in disabledIngredientsInfo) {
    disabledIngredientsInfo[key] = disabledIngredientsInfo[key] <= 0;
  }

  let burgerOrderSummary = null;
  let burgerBuilder = hasCatchError ? (
    <Aux>
      <p
        style={{
          whiteSpace: "pre",
          textAlign: "center",
          color: "red",
          fontWeight: "bold",
        }}
      >
        There was an error loading ingredients ... {"\n"}Please, try again !!
      </p>
    </Aux>
  ) : (
    <Spinner />
  );

  if (ingredients) {
    burgerBuilder = (
      <Aux>
        <BurgerView ingredients={ingredients} />
        <BurgerControls
          ingredientAdded={onIngredientsAdded}
          ingredientRemoved={onIngredientsRemoved}
          disabledLessButton={disabledIngredientsInfo}
          totalPrice={totalPrice}
          canOrderNow={buttonOrderNowHandler(ingredients)}
          buttonClicked={orderNowHandler}
          isUserLoggedIn={isUserLoggedIn}
        />
      </Aux>
    );

    burgerOrderSummary = (
      <BurgerOrderSummary
        ingredients={ingredients}
        totalPrice={totalPrice}
        clickedCancel={orderCancelHandler}
        clickedContinue={orderContinueCheckout}
      />
    );
  }

  if (ingredientsLoading) {
    burgerOrderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal
        displayModal={isOrderNowButtonClicked}
        closeModal={orderCancelHandler}
        hasSpinner={ingredientsLoading}
      >
        {burgerOrderSummary}
      </Modal>
      {burgerBuilder}
    </Aux>
  );
};

export default withErrorHandler(burgerBuilder, axiosOrdersInstance);
