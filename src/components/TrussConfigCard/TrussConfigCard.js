import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TrussConfigAccordion from 'components/TrussConfigAccordion';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '60%',
    maxHeight: '80%',
    margin: '1em',
    zIndex: 1000,
    position: 'absolute',
    top: 50,
    overflow: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const TrussConfigCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        <Button
          size="medium"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          CONFIGURE
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TrussConfigAccordion />
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <Button size="medium">SIMULATE</Button>
      </CardActions>
    </Card>
  );
}

export default TrussConfigCard;
