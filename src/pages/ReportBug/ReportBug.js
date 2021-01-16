import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FirstStep from "./IssueForm";
import SecondStep from "./ContactInfoForm";
import ReviewSubmission from "./ReviewSubmissionForm";
import Success from "./Success";
import formValidation from "./formValidation";


export default function ReportBug() {
  // Step titles
  const labels = ["Issue Summary", "Contact Info", "Review Submission"];

  const initialValues = {
    first_name: "",
    last_name: "",
    contact_email: "",
    contact_phone: "",
    issue_summary: "",
  };

  const fieldsValidation = {
    first_name: {
      error: "",
      validate: "text",
      minLength: 2,
      maxLength: 25,
    },
    last_name: {
      error: "",
      validate: "text",
      minLength: 2,
      maxLength: 25,
    },
    contact_email: {
      error: "",
      validate: "contact_email",
      maxLength: 50,
    },
    contact_phone: {
      error: "",
      validate: "contact_phone",
      maxLength: 15,
    },
    issue_summary: {
      error: "",
      validate: "",
      maxLength: 750,
    },
  };

  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set values
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // set errors
    const error = formValidation(name, value, fieldsValidation) || "";

    setFormErrors({
      [name]: error,
    });
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      case 2:
        return (
          <ReviewSubmission
            handleNext={handleNext}
            handleBack={handleBack}
            values={formValues}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {activeStep === labels.length ? (
        // Last Component
        <Success values={formValues} />
      ) : (
        <>
          <Box style={{ margin: "30px 0 50px" }}>
            <Typography variant="h4" align="center">
              Report a Bug Form
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              style={{ margin: "10px 0" }}
            >
              Your feedback is greatly appreciated!
            </Typography>
          </Box>
          <Stepper
            activeStep={activeStep}
            style={{ margin: "30px 0 15px" }}
            alternativeLabel
          >
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep)}
        </>
      )}
    </>
  );
};


