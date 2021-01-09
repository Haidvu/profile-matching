import React from "react";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UHLogo from "../../assets/UHLogo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo: {
    objectFit: "contain",
    width: "70px",
    float: "left",
    height: "70px",
  },
  AppBar: {
    background: "rgba(200,16,46,1)",
    display: "flex",
    width: "98%",
    borderRadius: "10px",
    margin: "10px 10px 10px 10px",
  },
  Login: {
    objectFit: "contain",
  },
  SignUp: {
    objectFit: "contain",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  //Check if token exists
  const isLoggedIn = () => {
    if (localStorage.getItem("token") && localStorage.getItem("slug")) {
      axios
        .post("http://18.213.74.196:8000/api/token/refresh/", {
          refresh: localStorage.getItem("refresh"),
        })
        .then((res) => {
          //Got new access token.
          localStorage.setItem("token", res.data.access);
          setTimeout(isLoggedIn, 17900 * 1000);
          history.push("/dashboard");
        })
        .catch((err) => {
          history.push("/login");
        });
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      <React.Fragment>
        <AppBar className={classes.AppBar} position="fixed">
          <Toolbar>
            <Grid item xs={11}>
              <img alt="uh logo" className={classes.logo} src={UHLogo} />
            </Grid>
            <Grid item>
              <AccountCircleIcon />
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="inherit"
                onClick={isLoggedIn}
                className={classes.Login}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="inherit"
                className={classes.SignUp}
                href="/signup">
                Sign Up
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
}
