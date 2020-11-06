import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    role_id: "",
    password1: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  let history = useHistory();
  const signUp = (e) => {
    setError("");
    axios
      .post("http://18.213.74.196:8000/api/user_accounts/signup", signUpInfo)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          //authenticate again after the user is created
          const email = signUpInfo.email;
          const password = signUpInfo.password1;
          axios
            .post("http://18.213.74.196:8000/api/token/", { email, password })
            .then((res) => {
              localStorage.setItem("token", res.data.access);
              localStorage.setItem("role_id", res.data.role_id);
              localStorage.setItem("email_id", res.data.email_id);
              history.push("/accountInfo");
            });
        }
      })
      .catch((err) => console.log(err));

    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      {error ? (
        <Alert className={classes.alert} variant="filled" severity="error">
          {error}
        </Alert>
      ) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={signUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Choose account type</FormLabel>
                <RadioGroup
                  className={classes.radio}
                  aria-label="account_type"
                  name="role_id"
                  row
                  color="secondary"
                  onChange={handleChange}>
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Company"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
