import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1000,
    position: 'absolute',
    bottom: '1em',
    right: '1em',
    display: 'flex',
  },
  contentLeft: {
    padding: '8px',
    "&:last-child": {
      paddingBottom: 0,
    },
    backgroundColor: '#000839',
    color: '#FFFFFF',
  },
  contentRight: {
    padding: '8px',
    "&:last-child": {
      paddingBottom: 0,
    },
    color: '#000839',
  },
}));

const ObjectCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentLeft}>
        node1
      </CardContent>
      <CardContent className={classes.contentRight}>
        x: 1 y: 2 z: 3
      </CardContent>
    </Card>
  );
}

export default ObjectCard;
