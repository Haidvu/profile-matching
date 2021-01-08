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

// import { getConfig } from "../../authConfig";

import Alert from "@material-ui/lab/Alert";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPasswordTwo() {
  const classes = useStyles();

  //takes in the input from the user
  const [resetInput, setResetInput] = useState({
    code: "",
    password: "",
    confirm_password: "",
  });

  //splits the reset code for the Uid
  const getSplitUid = (code) => {
    if (code !== "") {
      const res = code.split("/");
      return res[0];
    }
    return null;
  };

  //split the reset code for the token
  const getSplitToken = (code) => {
    if (code !== "") {
      const res = code.split("/");
      return res[1];
    }
    return null;
  };

  //error can occur if user inputs wrong ResetCode or, new passwords don't match
  const [error, setError] = useState("");

  let history = useHistory();

  const resetPassword = (e) => {
    //error is password & confirm_password do not match
    if (resetInput.password !== resetInput.confirm_password) {
      setError("Passwords do not match. Try again");
    } else {
      setError("");

      const data = {
        token: getSplitToken(resetInput.code),
        uidb64: getSplitUid(resetInput.code),
        password: resetInput.password,
        confirm_password: resetInput.confirm_password,
      };

      console.log(data);
      axios
        .patch(
          "http://18.213.74.196:8000/api/user_accounts/password_reset_complete",
          data
        )
        .then((res) => {
          if (res.data.error) {
            setError(res.data.error);
          } else {
            console.log(res.data);
            history.push("/login");
          }
        })
        .catch((err) => {
          setError("Error! Unable to reset password");
          console.log(err);
        });
      e.preventDefault();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Password
        </Typography>
        <form className={classes.form} onSubmit={resetPassword}>
          <Typography>
            Enter the unique code given on the reset email to create a new
            password
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="token"
            label="Reset Code"
            name="reset code"
            autoComplete="token"
            autoFocus
            onChange={(e) => {
              setResetInput({ ...resetInput, code: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            autoComplete="newPassword"
            autoFocus
            onChange={(e) => {
              setResetInput({ ...resetInput, password: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="confirmPassword"
            autoFocus
            onChange={(e) => {
              setResetInput({
                ...resetInput,
                confirm_password: e.target.value,
              });
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
            RESET PASSWORD
          </Button>
          {error ? (
            <Alert variant="filled" severity="error">
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
