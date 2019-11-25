import React from "react";
import PropTypes from "prop-types";

import { useMediaQuery } from "@material-ui/core";
import NavBar from "containers/NavBar";
import MobileNavBar from "containers/NavBarMobile";

const MainPageLayout = ({ children }) => {
  const isMobile = useMediaQuery("screen and (max-width: 600px)");

  return (
    <main>
      <header>{isMobile === true ? <MobileNavBar /> : <NavBar />}</header>
      <div>{children}</div>
    </main>
  );
};

MainPageLayout.propTypes = {};

export default MainPageLayout;
