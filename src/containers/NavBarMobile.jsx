import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = styled.h1`
  display: inline-block;

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
`;

const NavBarMobile = () => {
  return (
    <div>
      <Logo>Dream House</Logo>

      <ul>
        <li>
          <Link to="/main">Головна</Link>
        </li>
        <li>
          <Link to="/calculation">Розрахунок Вартості</Link>
        </li>
        <li>
          <Link to="/my-account">Кабінет користувача</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBarMobile;
