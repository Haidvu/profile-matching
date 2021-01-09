import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
  IconButton,
  Hidden,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import StudentRoutes from "./StudentRoutes";
import StudentMenu from "./StudentMenu";
import CompanyRoutes from "./CompanyRoutes";
import CompanyMenu from "./CompanyMenu";
import axios from "axios";
import AdminRoutes from "./AdminRoutes";
import AdminMenu from "./AdminMenu";
import { useHistory } from "react-router-dom";
import { getConfig } from "../../authConfig";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
    background: "rgba(200,16,46,1)",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
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
  toolbar: theme.mixins.toolbar,
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
  let history = useHistory();
  const [loading, setLoading] = useState(true);

  const slug = localStorage.getItem("slug");
  const role_id = localStorage.getItem("role_id");

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    if (slug) {
      let url;
      if (role_id === "0") {
        url = `http://18.213.74.196:8000/api/student_profile/${slug}`;
      } else if (role_id === "1") {
        url = `http://18.213.74.196:8000/api/company_profile/${slug}`;
      } else if (role_id === "2") {
        url = `http://18.213.74.196:8000/api/website_admin_profile/1`;
      }
      axios
        .get(url, getConfig())
        .then((res) => {
          dispatch({ type: "SET_PROFILE", payload: res.data });
          setLoading(false);
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
  }, [dispatch, role_id, slug]);

  const userOptions = () => {
    switch (role_id) {
      case "0":
        return {
          name: data.profile.full_name ? data.profile.full_name : null,
          menu: <StudentMenu />,
          routes: <StudentRoutes />,
        };
      case "1":
        return {
          name: data.profile.company_name ? data.profile.company_name : null,
          menu: <CompanyMenu />,
          routes: <CompanyRoutes />,
        };
      case "2":
        return {
          name: data.profile.admin_first_name
            ? data.profile.admin_last_name
            : null,
          menu: <AdminMenu />,
          routes: <AdminRoutes />,
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
    <>
      {loading ? null : (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
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
          <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}>
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
                </div>
                <Divider />
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open>
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
            </Hidden>
          </nav>
          <main className={classes.content}>
            <Toolbar />
            {userOptions() ? userOptions().routes : null}
          </main>
        </div>
      )}
    </>
  );
}
