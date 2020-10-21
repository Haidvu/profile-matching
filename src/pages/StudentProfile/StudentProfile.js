import React from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import StarsIcon from "@material-ui/icons/Stars";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

const useStyles = makeStyles((theme) => ({
  profileLogo: {
    objectFit: "contain",
    display: "flex",
    position: "relative",
  },
  inline: {
    display: "inline",
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
    color: "#f50057",
  },
  download: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
  },
  skills: {
    textAlign: "center",
    borderRadius: 200,
    backgroundColor: "#FFFFFF",
  },
}));
export default function StudentProfile() {
  const classes = useStyles();
  return (
    <div>
      <img
        alt="profile logo"
        className={classes.profileLogo}
        src={ProfileLogo}
      ></img>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <FormatListBulletedTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Student Description"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Here student description will go
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton className={classes.icon}>
            <EditTwoToneIcon />
          </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <SchoolRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Academic"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  Graduation Date: {" Graduation date will go here"}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Bachelor's (BS) {" Major will go here"}
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton className={classes.icon}>
            <EditTwoToneIcon />
          </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <DescriptionRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Resume"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  style={{ textDecoration: "underline" }}
                  color="textPrimary"
                >
                  Document: Resume.pdf
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton className={classes.download}>
            <GetAppRoundedIcon />
          </IconButton>
          <IconButton className={classes.icon}>
            <EditTwoToneIcon />
          </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <StarsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Skills"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <TextField label="Outlined" className={classes.skills} />
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton className={classes.icon}>
            <EditTwoToneIcon />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}
