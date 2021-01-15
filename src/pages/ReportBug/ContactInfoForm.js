import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: "#FFFFFF",
    background: "rgba(200,16,46,1)",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "white",
      backgroundColor: "#b0102a",
    },
  },
  backButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: "#FFFFFF",
    background: "#3d3d3d",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "white",
      backgroundColor: "#292929",
    },
  },
  buttons: {
    display: "flex",
    marginTop: 20,
    justifyContent: "flex-end",
  },
}));

// Destructuring props
const SecondStep = ({
  handleBack,
  handleNext,
  handleChange,
  values: { first_name, last_name, contact_email, contact_phone },
  formErrors,
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    first_name.length > 0 &&
    !formErrors.firstName &&
    last_name.length > 0 &&
    !formErrors.lastName &&
    contact_email.length > 0 &&
    !formErrors.email &&
    contact_phone.length > 0 &&
    !formErrors.phone;

  const classes = useStyles();
  return (
    <>
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={2} noValidate>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  placeholder="Your first name"
                  margin="normal"
                  value={first_name || ""}
                  onChange={handleChange}
                  error={!!formErrors.first_name}
                  helperText={formErrors.first_name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  placeholder="Your last name"
                  margin="normal"
                  value={last_name || ""}
                  onChange={handleChange}
                  error={!!formErrors.last_name}
                  helperText={formErrors.last_name}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="contact_email"
                  placeholder="Your email address"
                  type="email"
                  value={contact_email || ""}
                  onChange={handleChange}
                  margin="normal"
                  error={!!formErrors.contact_email}
                  helperText={formErrors.contact_email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="contact_phone"
                  placeholder="Your phone number"
                  type="phone"
                  value={contact_phone || ""}
                  onChange={handleChange}
                  margin="normal"
                  error={!!formErrors.contact_phone}
                  helperText={formErrors.contact_phone}
                  required
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant="contained"
                disabled={!isValid}
                onClick={isValid ? handleNext : null}
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    </>
  );
};

export default SecondStep;
