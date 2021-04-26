import React from 'react';
import styled from 'styled-components';
import NavBar from 'components/NavBar';
import ThreeCore from 'components/ThreeCore';
import NodeGroup from 'components/ThreeCore/NodeGroup';
import TubeGroup from 'components/ThreeCore/TubeGroup';
import PointLoadGroup from 'components/ThreeCore/PointLoadGroup';
import { StrucConfigCard, StrucColorScale } from 'components/StrucComponents';

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
      <PointLoadGroup />
    </ThreeCore>
    <StrucConfigCard />
    <StrucColorScale />
  </TrussPageContainer>
);

export default TrussPage;
