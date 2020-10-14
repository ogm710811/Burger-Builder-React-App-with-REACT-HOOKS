import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import authStyles from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as authActions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Redirect } from "react-router-dom";

const auth = () => {
  /*** IMPORTANT !!! */
    // Getting rid off connect mapStateToProps && mapDispatchToProps
    // we can use useDispatch nad useSelector hooks that come with React-Redux v > 7
  const {loading, hasCatchError, errorMessage, isUserLoggedIn} = useSelector((state) => {
      return state.authenticationReducer
    })
  const {hasBurgerBuilderOrderInProcess} = useSelector((state) => state.burgerBuilderReducer)
  const dispatch = useDispatch();
  const onAuthLogin = (formData) => dispatch(authActions.authLoginInit(formData));
  const [loginForm, setLoginForm] = useState({
    username: {
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
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        name: "password",
        placeholder: "Password",
      },
      value: "",
      validationRules: {
        required: true,
        minLength: 6,
      },
      isValid: false,
      isTouched: false,
      validationErrorMessage: "please, enter your password",
    },
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const authHandler = (event) => {
    event.preventDefault();
    let formData = {};
    for (let formElement in loginForm) {
      formData[formElement] = loginForm[formElement].value;
    }
    formData = {
      ...formData,
      isSignUp,
    };
    onAuthLogin(formData);
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
    if (validationRules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(formElementValue) && isValid;
    }

    return isValid;
  }

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedLoginForm = {
      ...loginForm,
    };
    // making a deeper copy to avoid mutation on the inner object
    const updatedElementForm = {
      ...updatedLoginForm[inputIdentifier],
      value: event.target.value,
      isTouched: true,
      isValid: checkValidationRules(
        event.target.value,
        updatedLoginForm[inputIdentifier].validationRules
      ),
    };

    updatedLoginForm[inputIdentifier] = updatedElementForm;
    let isFormValid = true;
    for (let elementForm in updatedLoginForm) {
      isFormValid = updatedLoginForm[elementForm].isValid && isFormValid;
    }
    setLoginForm(updatedLoginForm)
    setIsFormValid(isFormValid)
  };

  const switchToSignUpHandler = () => {
    setIsSignUp(!isSignUp)
  };

  let formElementsArray = [];
  for (let keyElement in loginForm) {
    formElementsArray.push({
      id: keyElement,
      config: loginForm[keyElement],
    });
  }

  let errorMessageToDisplay = hasCatchError ? (
    <p
      style={{
        whiteSpace: "pre",
        textAlign: "center",
        color: "red",
        fontWeight: "bold",
      }}
    >
      {errorMessage.response.data.error.message}
    </p>
  ) : null;

  let signUpMessage = !isSignUp ? (
    <p
      style={{
        whiteSpace: "pre",
        textAlign: "center",
        color: "green",
        fontWeight: "bold",
      }}
    >
      Not a Customer?{"\n"}Please, switch to Sign Up.
    </p>
  ) : null;

  let redirectAfterLogIn = null;
  if (
    isUserLoggedIn &&
    !hasBurgerBuilderOrderInProcess
  ) {
    redirectAfterLogIn = <Redirect to="/"/>;
  } else if (
    isUserLoggedIn &&
    hasBurgerBuilderOrderInProcess
  ) {
    redirectAfterLogIn = <Redirect to="/checkout"/>;
  }

  let form = loading ? (
    <div>
      <Spinner/>
    </div>
  ) : (
    <Aux>
      <div className={authStyles.Auth}>
        {redirectAfterLogIn}
        {errorMessageToDisplay}
        <form onSubmit={authHandler}>
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
              onChange={(event) =>
                inputChangeHandler(event, formElement.id)
              }
            />
          ))}
          <Button btnType="Success" disabled={!isFormValid}>
            {isSignUp ? "SIGN UP" : "LOG IN"}
          </Button>
        </form>
        {signUpMessage}
        <Button btnType="Danger" clicked={switchToSignUpHandler}>
          SWITCH TO {!isSignUp ? "SIGN UP" : "LOG IN"}
        </Button>
      </div>
    </Aux>
  );

  return form;
}

export default auth;
