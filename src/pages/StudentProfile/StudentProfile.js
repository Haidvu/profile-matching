import React from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {Box,Button,Avatar,List,ListItem, Divider, ListItemText, ListItemIcon,IconButton } from "@material-ui/core";
import FormatListBulletedTwoToneIcon from '@material-ui/icons/FormatListBulletedTwoTone';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import StarsIcon from '@material-ui/icons/Stars';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

const useStyles = makeStyles((theme) => ({
  profileLogo:{
    backgroundRepeat: "no-repeat",
    position:"relative",
    objectPosition:"20% 30%",
    width: "100vw",
    height: "15vw",
    maxWidth: "100%",
    zIndex:1,
    objectFit:"cover"
  },
  icon:{
    objectFit: "contain",
    position:"relative",
    width:"5%",
    color:theme.palette.secondary.main
  },
  download:{
    objectFit: "contain",
    position:"relative",
    width:"5%",
  },
  skills:{
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    font:"Lato",
    fontWeight:"normal",
    color:"#5B5B5B",
    width:"5%",
  },
  skillsContainer:{
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  sectionHeader:{
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "bold",
    color:"#606060",
  },
  sectionContent:{
    color:"#5B5B5B",
    display: 'inline',
    fontFamily: "Lato"
  },
  profileImage: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    position: "absolute",
    top: "15%",
    right: "4%",
    zIndex:1,
    objectFit:"contain",
  },

}));

export default function StudentProfile (){
  const classes = useStyles();
  return (
    <div>
      <div>
        <img alt="profile background" className={classes.profileLogo} src={ProfileLogo}></img>
        <Avatar alt="profile image" src={AvatarImage} className={classes.profileImage}/>
      </div>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <FormatListBulletedTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary={
                <Box component={'span'} className={classes.sectionHeader}>
                  Student Description
                </Box>
            }
            secondary={
                <Box
                  component={'span'}
                  variant="body2"
                  className={classes.sectionContent}
                  color="textPrimary"
                >
                  Here student description will go
                </Box>
            }
          />
          <IconButton className={classes.icon}>
            <EditTwoToneIcon/>
          </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <SchoolRoundedIcon/>
          </ListItemIcon>
          <ListItemText
             primary={
                <Box component={'span'} className={classes.sectionHeader}>
                  Academic
                </Box>
            }
            secondary={
              <React.Fragment>
                    <Box
                      component={'span'}
                      variant="body2"
                      color="textPrimary"
                      className={classes.sectionContent}
                    >
                      Graduation Date: {" Graduation date will go here"}
                    </Box>
                    <Box
                      variant="body2"
                      color="textPrimary"
                      style={{color:"#5B5B5B"}}
                    >
                      Bachelor's (BS) {" Major will go here"}
                    </Box>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <DescriptionRoundedIcon/>
          </ListItemIcon>
          <ListItemText
             primary={
                <Box component={'span'} className={classes.sectionHeader}>
                  Resume
                </Box>
            }
            secondary={
                <Box
                  component={'span'}
                  variant="body2"
                  className={classes.sectionContent}
                  style={{textDecoration:"underline"}}
                  color="textPrimary"
                >
                Document: Resume.pdf
                </Box>
            }
          />
          <IconButton className={classes.download}>
            <GetAppRoundedIcon/>
          </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <StarsIcon/>
          </ListItemIcon>
          <ListItemText
            primary={
                <Box component={'span'} className={classes.sectionHeader}>
                  Skills
                </Box>
            }
            secondary={
                <Box
                  component={'span'}
                  variant="body2"
                  className={classes.sectionContent}
                  color="textPrimary"
                >
                  <div className={classes.skillsContainer}>
                    <Button size="small" variant="outlined" className={classes.skills}>
                      C++
                    </Button>
                    <Button size="small" variant="outlined" className={classes.skills}>
                      Java
                    </Button>
                  </div>
                </Box>

            }
          />
        </ListItem>
      </List>
    </div>
  );
};

