import React from 'react';
import logo from 'assets/logos/logo-inverted.svg';
import styled from 'styled-components';

const Bar = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  background-color: #005082;
`;

const Logo = styled.img`
  left: 24px;
  top: 5px;
  position: absolute;
  width: 100px;
  cursor: pointer;
`;

const NavBar = () => (
  <div>
    <Bar />
    <nav>
      <a href="/">
        <Logo src={logo} alt='Logo' />
      </a>
    </nav>
  </div>
);

export default NavBar;
