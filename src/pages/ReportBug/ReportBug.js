import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import IssueForm from "./IssueForm";
import ContactInfoForm from "./ContactInfoForm";
import ReviewSubmissionForm from "./ReviewSubmissionForm";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
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
}));



export default function Checkout() {
  const classes = useStyles();

  const steps = ["Summary", "Contact Info", "Review your submission"];

  const props = { reportDetails, setReportDetails, setActiveStep }


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <IssueForm {...props} />;
      case 1:
        return <ContactInfoForm {...props} />;
      case 2:
        return <ReviewSubmissionForm {...props} />;
      default:
        throw new Error("Unknown step");
    }
  } 

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [reportDetails, setReportDetails] = useState({
    first_name: "",
    last_name: "",
    contact_email: "",
    contact_phone: "",
    issue_summary: "",
  });

  const handleChange = (e) => {
    setReportDetails({
      ...reportDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickSubmitIssue = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://18.213.74.196:8000/api/issue_report/create",
        reportDetails
        )
        .then((res) => {
          setReportDetails(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* appbar can go here */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Report an issue
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your submission
                </Typography>
                <Typography variant="subtitle1">
                  Your issue has been received. We greatly appreciate any reports for issues & bugs and your submission will be sent to the development team.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button handleBack={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    handleNext={handleNext}
                    onClick={handleClickSubmitIssue}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Submit Issue" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>

    </React.Fragment>
  );
}
