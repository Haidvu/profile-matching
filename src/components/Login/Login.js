import React from "react";
import { useFormik } from 'formik'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import './Login.css';
// import Background from './../../assets/LoginBackground.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Login () {

    const classes = useStyles();

    
    return (<Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to ='/Signup' href="Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );

    
    // return (
    //     <div className="login_page">
    //         <div className="login_container">
    //             <form onSubmit={formik.handleSubmit}>
    //                 <div className="form-control">
    //                     <h4>Username:</h4>
    //                     <input class="login_input" type="text"
    //                     id="username"
    //                     name="username"
    //                     placeholder="enter username"
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                     value={formik.values.username} />
    //                     { formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
    //                 </div>

    //                 <div className="form-control">
    //                     <h4>Password:</h4>
    //                     <input class="login_input" type="text"
    //                     id="password"
    //                     name="password"
    //                     placeholder="enter password"
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                     value={formik.values.password} />
    //                     { formik.touched.password && formik.errors.pasasword ? <div className="error">{formik.errors.password}</div> : null}
    //                 </div>

    //                 <button className="button-right button-red">Login</button>
    //             </form>
    //         </div>
    //     </div>
    // )
  }
export default Login;