import React from "react";

import modalStyles from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = ({children, closeModal, displayModal, hasSpinner}) => {
  /*** IMPORTANT */
  // shouldComponentUpdate doesn't work on functional component.

  /*** HOW TO OPTIMIZE PERFORMANCE ??? */
  // On functional components we can use React.memo to optimize performance and only
  // update the component when the props change.

  /*** HOW TO CHECK IF SOME COMPONENT PROPS CHANGED ??? */
  // To check if certain component props changed you can do it with React.memo as well.
  // Passing a second argument as a comparison function to check if previous and next props
  // are equal or not.

  // Previously on shouldComponentUpdate(nextProps, nextState) we checked whether we want to
  // continue with the update or not and we only wanted to continue when props are not equal.
  // With the React.memo function we now need to return if they are equal.
  // So I'm checking for equality and of course instead of or, we now need an and sign.

  /****
   shouldComponentUpdate(nextProps, nextState)
   {
      !!! only if displayModal changes the modal and his children will update
      this way the app doesn't renderer the modal and its children unnecessary !!!
      Because we don't need to check all modal properties we don't use pure component
      return (
        nextProps.displayModal !== this.props.displayModal ||
        nextProps.children !== this.props.children
      );
    }
   */
  const styleClasses = !hasSpinner
    ? modalStyles.Modal
    : modalStyles.Spinner;

  return (
    <Aux>
      <Backdrop
        showBackdrop={displayModal}
        clicked={closeModal}
      />
      <div
        className={styleClasses}
        style={{
          transform: displayModal
            ? "translateY(0)"
            : "translateY(-100vh)",
          opacity: displayModal ? "1" : "0",
        }}
      >
        {children}
      </div>
    </Aux>
  );
}

export default React.memo(modal, (prevProps, nextProps) => {
    return (
      nextProps.displayModal === prevProps.displayModal &&
      nextProps.children === prevProps.children
    )
  }
);
