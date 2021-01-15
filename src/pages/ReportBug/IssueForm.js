import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
  buttons: {
    display: "flex",
    marginTop: 20,
    justifyContent: "flex-end",
  },
}));


// Destructuring props
const FirstStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { issue_summary },
  formErrors,
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    issue_summary.length > 0 &&
    !formErrors.issue_summary;

const classes = useStyles();
  return (
    <>
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Summary of Issue:
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="filled-multiline-static"
                  multiline
                  rows={12}
                  required
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 1000 }}
                  name="issue_summary"
                  placeholder="Please enter your issue *"
                  value={issue_summary || ""}
                  onChange={handleChange}
                  error={!!formErrors.issue_summary}
                  helperText={formErrors.issue_summary}
                />
              </Grid>
            </Grid>
            <div
              // style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
              className={classes.buttons}
            >
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

export default FirstStep;
