import React from "react";
import PropTypes from "prop-types";

import { useLocation, Redirect } from "react-router-dom";

const RegisteredGuard = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    localStorage.setItem("redirect", location.pathname);

    return <Redirect to="/my-account" />;
  }

  return children;
};

RegisteredGuard.propTypes = {
  children: PropTypes.element.isRequired
};

export default RegisteredGuard;
