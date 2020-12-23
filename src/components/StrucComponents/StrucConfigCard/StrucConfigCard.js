import React from 'react';
import ConfigCard from 'components/ConfigCard';
import StrucConfigAccordion from '../StrucConfigAccordion';
import StrucSimulate from '../StrucSimulate';

const StrucConfigCard = () => {
  return (
    <ConfigCard
      accordion={<StrucConfigAccordion />}
      button={<StrucSimulate />}
    />
  );
}

export default StrucConfigCard;
