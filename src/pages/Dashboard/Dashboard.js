import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import StudentRoutes from "./StudentRoutes";
import StudentMenu from "./StudentMenu";
import CompanyRoutes from "./CompanyRoutes";
import CompanyMenu from "./CompanyMenu";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "rgba(200,16,46,1)",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
  },
  Logout: {
    objectFit: "contain",
  },
  rightToolbar: {
    marginLeft: "auto",
    objectFit: "contain",
    margin: theme.spacing(0.5),
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontFamily: "Lato",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const { data } = useContext(DataContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">| Future Start |</Typography>
          <AccountCircleRoundedIcon
            color="inherit"
            className={classes.rightToolbar}
          />
          <Typography p={2}>Name</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {data.userType === "student" ? <StudentMenu /> : <CompanyMenu />}

            <Link to="/" className={classes.link}>
              <ListItem>
                <ListItemIcon>
                  <ExitToAppRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {data.userType === "student" ? <StudentRoutes /> : <CompanyRoutes />}
      </main>
    </div>
  );
}
