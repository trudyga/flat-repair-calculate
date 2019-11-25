import React from "react";

import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const Nav = styled.div`
  display: flex;
`;

const Logo = styled.h1`
  display: inline-block;
  min-width: 300px;

  font-family: "Titillium Web", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 37px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
  margin: 0;
  padding: 0;
  margin-left: 22px;
`;

const Items = styled.ul`
  display: flex;
  list-style-type: none;

  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;

  color: #000000;

  margin-top: 32px;
  margin-bottom: 32px;
`;

const Item = styled.li`
  margin-right: 25px;
`;

const Link = styled(RouterLink)`
  text-decoration: none;
`;

const NavBar = props => {
  return (
    <Nav>
      <Logo>Dream House</Logo>

      <Items>
        <Item>
          <Link to="/main">Головна</Link>
        </Item>
        <Item>
          <Link to="/calculation">Розрахунок Вартості</Link>
        </Item>
        <Item>
          <Link to="/my-account">Кабінет користувача</Link>
        </Item>
      </Items>
    </Nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
