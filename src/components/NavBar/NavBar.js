import React from 'react';
import logo from 'assets/logos/full_logo.svg';
import styled from 'styled-components';

const Bar = styled.div`
  display: block;
  width: 100%;
  height: 49px;
  border-bottom: 1px solid #e9ecef;
`;

const Logo = styled.img`
  left: 24px;
  top: 5px;
  position: absolute;
  width: 90px;
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
