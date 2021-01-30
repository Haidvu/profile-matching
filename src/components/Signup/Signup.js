import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  agree: {
    background: "#C8102E",
    color: "#FFFFFF",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#FFFFFF",
      backgroundColor: "#C8102E",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    role_id: "0",
    password1: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let history = useHistory();
  const signUp = (e) => {
    const len = signUpInfo.email.length;
    const domain = signUpInfo.email.substring(len - 6); //must be @uh.edu

    if (signUpInfo.role_id === "") {
      setError("Please select an account type");
    } else if (signUpInfo.role_id === "0" && domain !== "uh.edu") {
      setError('You must use a "username@uh.edu email" for a student account');
    } else {
      setError("");
      axios
        .post("http://52.173.242.147:8000/api/user_accounts/signup", signUpInfo)
        .then((res) => {
          if (res.data.error) {
            setError(res.data.error);
          } else {
            //authenticate again after the user is created
            const email = signUpInfo.email;
            const password = signUpInfo.password1;
            axios.post("/token/", { email, password }).then((res) => {
              localStorage.setItem("token", res.data.access);
              localStorage.setItem("role_id", res.data.role_id);
              localStorage.setItem("email_id", res.data.email_id);
              history.push("/accountInfo");
            });
          }
        })
        .catch((err) => console.log(err));
    }
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
          Student Sign up
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            direction="row"
            alignItems="flex-start"
          >
            <Grid item>
              <Link variant="body2" onClick={handleClickOpen}>
                Company Account?
              </Link>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Creating a Company Account?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    For company accounts, we please ask that you contact Dr.
                    Nouhad Rizk to request an account. You may also request an
                    account by emailing consultingclinicservices@gmail.com
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    className={classes.agree}
                    autoFocus
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
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
