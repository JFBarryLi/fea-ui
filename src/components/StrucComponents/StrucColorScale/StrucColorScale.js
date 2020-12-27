import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ColorScale from 'components/ColorScale';

import { selectStress } from 'slices/stress';

const ScaleContainer = styled.div`
  position: absolute;
  z-index: 1000;
  margin: 1em;
  right: 0;
  top: 25%;
  height: 250px;
`;

const StrucColorScale = () => {
  const stresses = useSelector(selectStress);
  const anyStress = stresses.length > 0;
  const min = stresses.reduce((min, o) => o.vm < min ? o.vm : min, 0);
  const max = stresses.reduce((max, o) => o.vm > max ? o.vm : max, 0);
  const data = {'min': min, 'max': max}

  return (
    <div>
      {
        anyStress &&
        <ScaleContainer>
          <ColorScale data={data} />
        </ScaleContainer>
      }
    </div>
  );
}

export default StrucColorScale;
