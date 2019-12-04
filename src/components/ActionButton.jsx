import React from "react";
import PropTypes from "prop-types";

import { Button } from "@material-ui/core";

const ActionButton = props => {
  return <Button variant={props.variant || "contained"} {...props}></Button>;
};

ActionButton.propTypes = {};

export default ActionButton;
