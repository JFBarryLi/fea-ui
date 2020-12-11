import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
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
    maxWidth: 400,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

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
        <StrucBoundaryTable />
      </Accordion>
    </div>
  );
}

export default StrucConfigAccordion;
