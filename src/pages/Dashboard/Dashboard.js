import React, { useContext, useEffect } from "react";
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
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getConfig } from "../../authConfig";

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
  const { data, dispatch } = useContext(DataContext);
  const classes = useStyles();
  const slug = localStorage.getItem("slug");
  const role_id = localStorage.getItem("role_id");
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("slug");
    localStorage.removeItem("role_id");
    localStorage.removeItem("email_id");
    history.push("/login");
  };

  useEffect(() => {
    if (slug) {
      const url =
        role_id === "0"
          ? `http://18.213.74.196:8000/api/student_profile/${slug}`
          : `http://18.213.74.196:8000/api/company_profile/${slug}`;

      axios
        .get(url, getConfig())
        .then((res) => {
          dispatch({ type: "SET_PROFILE", payload: res.data });
        })
        .catch((err) => {
          // to prevent user from changing their roles
          // would keep commented while in developement
          // console.log(err.response);
          // if (err.response.status === 404) {
          //   logout();
          // }
        });
    }
  }, [role_id, slug, dispatch]);

  const userOptions = () => {
    switch (role_id) {
      case "0":
        return {
          name: data.profile.full_name,
          menu: <StudentMenu />,
          routes: <StudentRoutes />,
        };
      case "1":
        return {
          name: data.profile.company_name,
          menu: <CompanyMenu />,
          routes: <CompanyRoutes />,
        };
      default: {
        logout();
        return null;
      }
    }
  };

  //TODO
  //logs out if no profile found 404

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
          <Typography p={2}>{`Welcome! ${
            userOptions() ? userOptions().name : ""
          }`}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {userOptions() ? userOptions().menu : null}

            <Link to="/login" className={classes.link}>
              <ListItem onClick={logout}>
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
        {userOptions() ? userOptions().routes : null}
      </main>
    </div>
  );
}
