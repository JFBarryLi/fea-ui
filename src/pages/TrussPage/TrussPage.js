import React from 'react';
import styled from 'styled-components';
import NavBar from 'components/NavBar';
import ThreeCore from 'components/ThreeCore';
import NodeGroup from 'components/ThreeCore/NodeGroup';
import TubeGroup from 'components/ThreeCore/TubeGroup';
import StrucConfigCard from 'components/StrucConfigCard';

const TrussPageContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

const TrussPage = () => (
  <TrussPageContainer>
    <NavBar />
    <ThreeCore>
      <NodeGroup />
      <TubeGroup />
    </ThreeCore>
    <StrucConfigCard />
  </TrussPageContainer>
);

export default TrussPage;
