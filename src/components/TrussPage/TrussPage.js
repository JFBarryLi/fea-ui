import React from 'react';
import styled from 'styled-components';
import NavBar from 'components/NavBar';
import ThreeCore from 'components/ThreeCore';
import TrussConfigCard from 'components/TrussConfigCard';

const TrussPageContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

const TrussPage = () => (
  <TrussPageContainer>
    <NavBar />
    <ThreeCore />
    <TrussConfigCard />
  </TrussPageContainer>
);

export default TrussPage;
