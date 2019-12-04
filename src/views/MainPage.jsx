import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: -1;

  background-image: url("images/main.png");
  background-size: cover;
`;

const MainPage = props => {
  return <Background />;
};

MainPage.propTypes = {};

export default MainPage;
