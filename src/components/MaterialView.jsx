import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Container = styled.div`
  background: lightgray;
`;

const Name = styled.h2`
  font-size: 20px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const ColorList = styled.div`
  display: flex;
`;
const Color = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: ${props => props.color};
`;

const MaterialView = ({ id, name, cost, description, colorList }) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Description>{description}</Description>
      <ColorList>
        {colorList.map(color => (
          <Color key={color} color={color} />
        ))}
      </ColorList>
    </Container>
  );
};

MaterialView.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  colorList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MaterialView;
