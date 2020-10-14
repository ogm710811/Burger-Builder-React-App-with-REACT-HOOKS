import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../../components/UI/Button/Button";
import contactDataStyles from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as contactDataActions from "../../../store/actions";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axiosOrdersInstance from "../../../axios/axios-orders";

const contactData = () => {
  const { ingredients, totalPrice } = useSelector(
    (state) => state.burgerBuilderReducer
  );
  const { orderSubmitting, orderSubmitted } = useSelector(
    (state) => state.contactDataReducer
  );
  const { idToken, userId } = useSelector(
    (state) => state.authenticationReducer
  );
  const dispatch = useDispatch();
  const onCreateNewOrder = (order, idToken) => {
    const orderData = {
      order,
      idToken,
    };
    dispatch(contactDataActions.createNewOrderInit(orderData));
  };

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        name: "name",
        placeholder: "Enter your name",
      },
      value: "",
      validationRules: {
        required: true,
      },
      isValid: false,
      isTouched: false,
      validationErrorMessage: "name is required",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        name: "email",
        placeholder: "Enter your email address",
      },
      value: "",
      validationRules: {
        required: true,
        isEmail: true,
      },
      isValid: false,
      isTouched: false,
      validationErrorMessage: "email address is required",
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        name: "street",
        placeholder: "Street",
      },
      value: "",
      validationRules: {
        required: true,
      },
      isValid: false,
      isTouched: false,
      validationErrorMessage: "street is required",
    },
    zip: {
      elementType: "input",
      elementConfig: {
        type: "text",
        name: "zip",
        placeholder: "Zip Code",
      },
      value: "",
      validationRules: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      isValid: false,
      isTouched: false,
      validationErrorMessage:
        "zip code is required and max length 5 characters",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "store delivery", displayValue: "Store Delivery" },
          { value: "store pick up", displayValue: "Store Pick Up" },
        ],
      },
      value: "store delivery",
      validationRules: {},
      isValid: true,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElement in orderForm) {
      formData[formElement] = orderForm[formElement].value;
    }
    const order = {
      ingredients: ingredients,
      totalPrice: totalPrice,
      orderData: formData,
      userId: userId,
    };
    onCreateNewOrder(order, idToken);
  };

  const checkValidationRules = (formElementValue, validationRules) => {
    if (!validationRules) return;
    let isValid = true;
    if (validationRules.required) {
      isValid = formElementValue.trim() !== "" && isValid;
    }
    if (validationRules.minLength) {
      isValid = formElementValue.length >= validationRules.minLength && isValid;
    }
    if (validationRules.maxLength) {
      isValid = formElementValue.length <= validationRules.minLength && isValid;
    }
    if (validationRules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(formElementValue) && isValid;
    }
    if (validationRules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(formElementValue) && isValid;
    }

    return isValid;
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    // making a deeper copy to avoid mutation on the inner object
    const updatedElementForm = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedElementForm.value = event.target.value;
    updatedElementForm.isTouched = true;
    updatedElementForm.isValid = checkValidationRules(
      updatedElementForm.value,
      updatedElementForm.validationRules
    );
    updatedOrderForm[inputIdentifier] = updatedElementForm;
    let isFormValid = true;
    for (let elementForm in updatedOrderForm) {
      isFormValid = updatedOrderForm[elementForm].isValid && isFormValid;
    }
    setOrderForm(updatedOrderForm);
    setIsFormValid(isFormValid);
  };

  let formElementsArray = [];
  for (let keyElement in orderForm) {
    formElementsArray.push({
      id: keyElement,
      config: orderForm[keyElement],
    });
  }
  let form = <Spinner />;
  if (!orderSubmitting && !orderSubmitted) {
    form = (
      <div className={contactDataStyles.ContactData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={orderHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.isValid}
              touched={formElement.config.isTouched}
              errorMessage={formElement.config.validationErrorMessage}
              shouldValidate={formElement.config.validationRules}
              onChange={(event) => inputChangeHandler(event, formElement.id)}
            />
          ))}
          <Button btnType="Success" disabled={!isFormValid}>
            ORDER
          </Button>
        </form>
      </div>
    );
  } else if (!orderSubmitting && orderSubmitted) {
    form = <Redirect to="/" />;
  }

  return form;
};

export default withErrorHandler(contactData, axiosOrdersInstance);
