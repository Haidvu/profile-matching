import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  myProjects: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center,'
  },
  projectAdd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center,',
    color: theme.palette.getContrastText('#C8102E'),
    backgroundColor: '#C8102E',
    '&:hover': {
      backgroundColor: '#C8102E',
    },
    margin: theme.spacing(2),
    
  }
}));

export default function DetailedAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.myProjects}>
        <Button size="medium" variant="contained" className={classes.projectAdd}>
          <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          ADD NEW PROJECT
        </Button>
      </div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Oct 2019</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Project Name</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Project Role</Typography>
          </div>
        </AccordionSummary>
        <AccordionSummary>
          <div>
            <Typography>
              Project Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="#React" onDelete={() => {}} />
            <Chip label="#Django" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Visit website:
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                https:www.myprojectlink.com
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Dec 2019</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Project Name2</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Project Role2</Typography>
          </div>
        </AccordionSummary>
        <AccordionSummary>
          <div>
            <Typography>
              Project Description2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="#React" onDelete={() => {}} />
            <Chip label="#Django" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Visit website:
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                https:www.myprojectlink2.com
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Jan 2020</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Project Name3</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Project Role3</Typography>
          </div>
        </AccordionSummary>
        <AccordionSummary>
          <div>
            <Typography>
              Project Description3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="#React" onDelete={() => {}} />
            <Chip label="#Django" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Visit website:
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                https:www.myprojectlink3.com
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}