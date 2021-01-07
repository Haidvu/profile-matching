import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import axios from "axios";

import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword({ setValidEmail }) {
  const classes = useStyles();

  //takes in user email input
  const [emailInput, setEmailInput] = useState({
    email: "",
  });

  const [error, setError] = useState("");

  //handleClick when user clicks on RequestResetCode button
  const handleClickResetRequest = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://18.213.74.196:8000/api/user_accounts/request_reset_email",
        emailInput
      )
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setEmailInput(res.data);
          console.log(res.data);
          setValidEmail(true);
        }
      })
      .catch((err) => {
        setError(
          "Oops! Be sure to enter an existing email registered on FutureStart. Try again"
        );
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot your password?
        </Typography>
        <form className={classes.form} noValidate>
          <Typography>
            Enter your e-mail address and we'll send you a code to reset your
            password
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmailInput({ ...emailInput, email: e.target.value });
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleClickResetRequest}
          >
            Request Reset Code
          </Button>
          {error ? (
            <Alert
              className={classes.loginAlert}
              variant="filled"
              severity="error"
            >
              {error}
            </Alert>
          ) : null}
          <Grid container>
            <Grid item>
              <Link to="/login" href="login" variant="body2">
                {"Remember your password? Try signing in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
