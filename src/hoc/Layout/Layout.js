import React, { Component, useState } from "react";

import layoutStyles from "./Layout.css";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const layout = ({isUserLoggedIn, children}) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const showSideDrawerHandler = () => {
    setShowSideDrawer(false)
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  };

  return (
    <Aux>
      <Toolbar
        isUserLoggedIn={isUserLoggedIn}
        sideDrawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isUserLoggedIn={isUserLoggedIn}
        showBackdrop={showSideDrawer}
        clicked={showSideDrawerHandler}
      />
      <main className={layoutStyles.Content}>{children}</main>
    </Aux>
  );

}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.authenticationReducer.idToken !== null,
  };
};

export default connect(mapStateToProps)(layout);
