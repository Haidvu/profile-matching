import React from "react";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UHLogo from "../../assets/UHLogo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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

  return (
    <div>
      <React.Fragment>
        <AppBar className={classes.AppBar} position="fixed">
          <Toolbar>
            <Grid item xs={10}>
              <img alt="uh logo" className={classes.logo} src={UHLogo} />
            </Grid>
            <Grid item>
              <AccountCircleIcon />
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="inherit"
                className={classes.Login}
                href="/login">
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
