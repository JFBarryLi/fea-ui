import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import { selectStruc, fetchStruc } from 'slices/struc';

const useStyles = makeStyles((theme) => ({
  simulate: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
}));

const StrucSimulate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStruc = useSelector(selectStruc);
  const handleClick = () => dispatch(fetchStruc(currentStruc));

  return (
    <Button
      className={classes.simulate}
      size="medium"
      onClick={handleClick}
    >
      SIMULATE
    </Button>
  );
}

export default StrucSimulate;
