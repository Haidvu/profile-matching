import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import axios from "axios";

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
  grid: {
    display: "inline-block",
    overflow: "auto",
  },
}));

// Destructure props
const Confirm = ({ handleNext, handleBack, values }) => {
  const {
    first_name,
    last_name,
    contact_email,
    contact_phone,
    issue_summary,
  } = values;

  const handleSubmit = () => {
    axios
      .post("http://18.213.74.196:8000/api/issue_report/create", values)
      .then((res) => {
        console.log(values);
        handleNext();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();
  return (
    <>
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <List disablePadding>
                  <ListItem>
                    <ListItemText
                      primary="Issue Summary"
                      secondary={issue_summary}
                      className={classes.grid}
                    />
                  </ListItem>

                  <Divider />
                  <ListItem>
                    <ListItemText primary="First Name" secondary={first_name} />
                  </ListItem>

                  <Divider />

                  <ListItem>
                    <ListItemText primary="Last Name" secondary={last_name} />
                  </ListItem>

                  <Divider />

                  <ListItem>
                    <ListItemText
                      primary="Email Address"
                      secondary={contact_email}
                    />
                  </ListItem>

                  <Divider />

                  <ListItem>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        contact_phone.length > 0
                          ? contact_phone
                          : "Not Provided"
                      }
                    />
                  </ListItem>
                </List>

                <div className={classes.buttons}>
                  <Button
                    className={classes.backButton}
                    variant="contained"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Confirm & Continue
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    </>
  );
};

export default Confirm;
