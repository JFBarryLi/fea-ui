import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';

import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import { selectStruc, selectStrucLoading, fetchStruc } from 'slices/struc';
import { nodesUpdated } from 'slices/nodes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  simulate: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const StrucSimulate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStruc = useSelector(selectStruc);
  const strucLoading = useSelector(selectStrucLoading) === 'loading';

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    dispatch(fetchStruc(currentStruc))
      .then(unwrapResult)
      .then(originalPromiseResult => {
        const nodes = originalPromiseResult.nodalCoords;
        dispatch(nodesUpdated(nodes));
        const message = 'Success';
        enqueueSnackbar(message, {
          variant: 'success',
          preventDuplicate: true,
        });
      })
      .catch(rejectedValueOrSerializedError => {
        const message = typeof(rejectedValueOrSerializedError) === 'string' ? rejectedValueOrSerializedError : rejectedValueOrSerializedError.errorMessage + ' - ' + rejectedValueOrSerializedError.detail;
        enqueueSnackbar(message, {
          variant: 'error',
          preventDuplicate: true,
          persist: true,
        });
      });
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          className={classes.simulate}
          size="medium"
          onClick={handleClick}
          disabled={strucLoading}
        >
          SIMULATE
        </Button>
        {strucLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

export default StrucSimulate;
