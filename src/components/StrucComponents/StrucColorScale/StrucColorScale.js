import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ColorScale from 'components/ColorScale';

import { selectMinMaxStress } from 'slices/stress';

const ScaleContainer = styled.div`
  position: absolute;
  z-index: 100;
  margin: 1em;
  right: 0;
  top: 25%;
  height: 250px;
`;

const StrucColorScale = () => {
  const { min, max } = useSelector(selectMinMaxStress);
  const anyStress = min !== max;
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
