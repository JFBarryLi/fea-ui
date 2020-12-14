import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StrucNodalTable from '../StrucNodalTable';
import StrucConnectivityTable from '../StrucConnectivityTable';
import StrucMaterialTable from '../StrucMaterialTable';
import StrucLoadTable from '../StrucLoadTable';
import StrucBoundaryTable from '../StrucBoundaryTable';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
}));

const Accordion = withStyles({
  root: {
    width: 200,
    '&$expanded': {
      width: '100%',
      maxWidth: 400,
    },
  },
  expanded: {},
})(MuiAccordion);

const StrucConfigAccordion = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Geometry</Typography>
        </AccordionSummary>
        <Divider />
        <StrucNodalTable />
        <StrucConnectivityTable />
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Material</Typography>
        </AccordionSummary>
        <Divider />
        <StrucMaterialTable />
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Load</Typography>
        </AccordionSummary>
        <Divider />
        <StrucLoadTable />
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Boundary Condition</Typography>
        </AccordionSummary>
        <Divider />
        <StrucBoundaryTable />
      </Accordion>
    </div>
  );
}

export default StrucConfigAccordion;
