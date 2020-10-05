import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  const blue = "#0356fc";
  const white = "#FFFFFF";
  const black = "#000000";

  return {
    root: {
      backgroundColor: "red",
    },
    headerX: {
      backgroundColor: white,
    },
    title: {
      color: black,
      flexGrow: 1,
    },
    authButton: {
      backgroundColor: white,
      color: blue,
      borderColor: blue,
      "&:hover": {
        backgroundColor: blue,
        color: white,
      },
    },
    authForm: {
      display: "flex",
      flexDirection: "column",
      width: "25%",
      margin: "50px auto",
      border: `1px solid ${black}`,
      borderRadius: "5px",
      padding: "50px 20px",
      "&>*": {
        margin: "10px 0px",
      },
    },
    link: {
      textDecoration: "none",
      color: blue,
    },
    textField: {
      borderColor: "red",
    },
  };
});

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.headerX}>
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          CareerSquare
        </Typography>
        <Link to="/signup" className={classes.link}>
          <Button variant="outlined" className={classes.authButton}>
            Sign Up
          </Button>
        </Link>
        <Link to="/login" className={classes.link}>
          <Button variant="outlined" className={classes.authButton}>
            LogIn
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
