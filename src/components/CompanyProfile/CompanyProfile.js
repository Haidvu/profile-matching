import React from "react";
import { AppBar, Typography } from '@material-ui/core'
import ShortTextIcon from '@material-ui/icons/ShortText';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  porfileRoot: {
    flexDirection: 'column'
  },
  profileLabel: {
  
  },
  labelDescription: {
    
  }
})

const classes = useStyles();

const CompanyProfile = () => {
  return(
    <div className={classes.porfileRoot}>
      <div className={classes.profileItem}>
        <ShortTextIcon></ShortTextIcon>
        <Typography>Company Mission</Typography>
      </div>
      <div className={classes.profileItem}>
        <ShortTextIcon></ShortTextIcon>
      </div>
    </div>
  )
};

export default CompanyProfile;
