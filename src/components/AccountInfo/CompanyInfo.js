import React, { useEffect } from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../../authConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(7),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(6),
    justifyContent: "center",
  },
  formControl: {
    width: "100%",
  },
  checkLabel: {
    color: theme.palette.secondary,
  },
  submit: {
    marginTop: theme.spacing(4),
  },
}));

const CompanyInfo = () => {
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  const industryTypes = [
    "Agriculture Services",
    "Architecture/Design",
    "Arts/Education",
    "Business/Finance/Consulting",
    "Construction/RealEstate",
    "Engineering/Manufacturing",
    "Education Services",
    "Food Service",
    "Hospitality",
    "Tourism",
    "GOvernment/Non-Profites",
    "Healthcare/Life-Science",
    "Information Technology",
    "Legal",
    "Marketing",
    "Media/Communications",
    "Religious Organizations",
    "Retail/Trade/Fashion",
    "Sports/Recreation",
    "Utilities/Energy/Environment",
    "UH Faculty/Staff",
    "Transportation/Logistics",
  ];

  let history = useHistory();

  const classes = useStyles();
  const [firstStep, setFirstStep] = useState(true);
  const [disable, setDisable] = useState(false);

  const [companyFirst, setCompanyFirst] = useState({
    name: "",
    industryType: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    mailingAddress: "",
    city2: "",
    state2: "",
    checkedAddress: false,
    isSolo: "",
  });

  const [errorsFirst, setErrorsFirst] = useState({});
  const [errorsSecond, setErrorsSecond] = useState({});

  const [companySecond, setCompanySecond] = useState({
    companyRep: "",
    companyType: "",
    website: "",
    mission: "",
    description: "",
  });

  const handleChangeFirst = (e) => {
    setCompanyFirst({
      ...companyFirst,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSecond = (e) => {
    setCompanySecond({
      ...companySecond,
      [e.target.name]: e.target.value,
    });
  };

  const checkMailingAddress = () => {
    if (companyFirst.checkedAddress === true) {
      setCompanyFirst({
        ...companyFirst,
        checkedAddress: false,
      });
      setDisable(!disable);
    } else {
      setCompanyFirst({
        ...companyFirst,
        checkedAddress: true,
      });
      setDisable(!disable);
    }
  };

  const getAddress = (values) => {
    if (values.address && values.city && values.state) {
      return `${values.address}|${values.city}|${values.state}`;
    }
    return "";
  };

  const getMailingAddress = (values) => {
    if (values.mailingAddress && values.city2 && values.state2) {
      return `${values.mailingAddress}|${values.city2}|${values.state2}`;
    }
    return "";
  };

  const nextStep = () => {
    setErrorsFirst({
      name: companyFirst.name === "" ? "Required" : null,
      industryType: companyFirst.industryType === "" ? "Required" : null,
      phoneNumber: companyFirst.phoneNumber === "" ? "Required" : null,
      address: companyFirst.address === "" ? "Required" : null,
      city: companyFirst.city === "" ? "Required" : null,
      state: companyFirst.state === "" ? "Required" : null,
      mailingAddress: companyFirst.checkedAddress
        ? null
        : companyFirst.mailingAddress === ""
        ? "Required"
        : null,
      city2: companyFirst.checkedAddress
        ? null
        : companyFirst.city2 === ""
        ? "Required"
        : null,
      state2: companyFirst.checkedAddress
        ? null
        : companyFirst.state2 === ""
        ? "Required"
        : null,
      isSolo: companyFirst.isSolo === "" ? "Please select one" : null,
    });
  };

  const handleSubmit = () => {
    setErrorsSecond({
      companyRep: companySecond.companyRep === "" ? "Required" : null,
      companyType: companySecond.companyType === "" ? "Required" : null,
      website: companySecond.website === "" ? "Required" : null,
      mission: companySecond.mission === "" ? "Required" : null,
      description: companySecond.description === "" ? "Required" : null,
    });
  };

  useEffect(() => {
    if (Object.entries(errorsFirst).length !== 0) {
      let errorExists = false;
      Object.keys(errorsFirst).forEach((key) => {
        if (errorsFirst[key] !== null) {
          errorExists = true;
        }
      });
      if (errorExists) {
        setFirstStep(true);
      } else {
        setFirstStep(false);
      }
    }
  }, [errorsFirst]);

  useEffect(() => {
    if (Object.entries(errorsSecond).length !== 0) {
      let errorExists = false;
      Object.keys(errorsSecond).forEach((key) => {
        if (errorsSecond[key] !== null) {
          errorExists = true;
        }
      });
      if (!errorExists) {
        const data = {
          company_name: companyFirst.name,
          company_phone_no: companyFirst.phoneNumber,
          industry_type: companyFirst.industryType,
          representative_name: companySecond.companyRep,
          company_representative_type: parseInt(companyFirst.isSolo),
          company_type: parseInt(companySecond.companyType),
          company_address: getAddress(companyFirst),
          mailing_address: companyFirst.checkedAddress
            ? getAddress(companyFirst)
            : getMailingAddress(companyFirst),
          company_website: companySecond.website,
          company_mission: companySecond.mission,
          company_description: companySecond.description,
          username: localStorage.getItem("email_id"),
        };
        axios
          .post(
            "http://18.213.74.196:8000/api/company_profile/create",
            data,
            getConfig()
          )
          .then((res) => {
            localStorage.setItem("slug", res.data.slug);
            history.push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsSecond]);

  const goBack = () => {
    setFirstStep(true);
  };

  return (
    <Container component="main" maxwidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Company Account Information
        </Typography>
        <Divider />
        <form className={classes.form} onSubmit={handleSubmit}>
          {firstStep === true ? (
            <>
              <Grid
                container
                id="master"
                direction="row"
                justify="space-between"
                spacing={2}
                alignItems="flex-start"
              >
                {/* Left Grid */}
                <Grid
                  container
                  id="first-left"
                  item
                  xs={12}
                  md={6}
                  spacing={3}
                  direction="column"
                >
                  <Grid item>
                    <TextField
                      error={errorsFirst.name && companyFirst.name === ""}
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Company Name"
                      name="name"
                      onChange={handleChangeFirst}
                      value={companyFirst.name}
                      inputProps={{ maxLength: 50 }}
                    />
                    {errorsFirst.name && companyFirst.name === "" ? (
                      <FormHelperText
                        error={errorsFirst.name && companyFirst.name === ""}
                      >
                        {errorsFirst.name}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <FormControl
                      error={
                        errorsFirst.industryType &&
                        companyFirst.industryType === ""
                      }
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel>Industry Type</InputLabel>
                      <Select
                        label="Industry Type"
                        value={companyFirst.industryType}
                        onChange={handleChangeFirst}
                        name="industryType"
                      >
                        {industryTypes.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      {errorsFirst.industryType &&
                      companyFirst.industryType === "" ? (
                        <FormHelperText>
                          {errorsFirst.industryType}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={
                        (errorsFirst.phoneNumber &&
                          companyFirst.phoneNumber === "") ||
                        errorsFirst.phoneNumber === "Enter valid Phone Number"
                      }
                      variant="outlined"
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      onChange={handleChangeFirst}
                      value={companyFirst.phoneNumber}
                      inputProps={{ maxLength: 10 }}
                    />
                    {errorsFirst.phoneNumber &&
                    companyFirst.phoneNumber === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.phoneNumber &&
                          companyFirst.phoneNumber === ""
                        }
                      >
                        {errorsFirst.phoneNumber}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <Typography>Is this a one person company?</Typography>
                    <FormControl
                      error={errorsFirst.isSolo && companyFirst.isSolo === ""}
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <RadioGroup
                        aria-label="Are you single member company"
                        name="isSolo"
                        value={companyFirst.isSolo}
                        onChange={handleChangeFirst}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="Yes (1)"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="No (>=2)"
                        />
                      </RadioGroup>
                      {errorsFirst.isSolo && companyFirst.isSolo === "" ? (
                        <FormHelperText>{errorsFirst.isSolo}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>

                {/* COLUMN2------------------------------------- */}
                <Grid
                  container
                  id="first-right"
                  item
                  xs={12}
                  md={6}
                  spacing={3}
                  direction="column"
                >
                  <Grid item>
                    <TextField
                      error={errorsFirst.address && companyFirst.address === ""}
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Company Address"
                      name="address"
                      onChange={handleChangeFirst}
                      value={companyFirst.address}
                      inputProps={{ maxLength: 40 }}
                    />
                    {errorsFirst.address && companyFirst.address === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.address && companyFirst.address === ""
                        }
                      >
                        {errorsFirst.address}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid
                    container
                    id="address-container-1"
                    item
                    direction="row"
                    spacing={10}
                  >
                    <Grid item xs={7}>
                      <TextField
                        error={errorsFirst.city && companyFirst.city === ""}
                        variant="outlined"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        onChange={handleChangeFirst}
                        value={companyFirst.city}
                        inputProps={{ maxLength: 20 }}
                      />
                      {errorsFirst.city && companyFirst.city === "" ? (
                        <FormHelperText
                          error={errorsFirst.city && companyFirst.city === ""}
                        >
                          {errorsFirst.address}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl
                        error={errorsFirst.state && companyFirst.state === ""}
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel>ST</InputLabel>
                        <Select
                          label="State"
                          value={companySecond.state}
                          onChange={handleChangeFirst}
                          defaultValue=""
                          name="state"
                        >
                          {states.map((state) => (
                            <MenuItem value={state} key={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                        {errorsFirst.state && companyFirst.state === "" ? (
                          <FormHelperText>{errorsFirst.state}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      className={classes.checkLabel}
                      value={!disable}
                      control={
                        <Checkbox
                          name="checkedAddress"
                          color="secondary"
                          onChange={checkMailingAddress}
                          checked={companyFirst.checkedAddress}
                        />
                      }
                      label="Mailing address same as company Address"
                      labelPlacement="end"
                    />
                    <TextField
                      error={
                        errorsFirst.mailingAddress &&
                        !companyFirst.checkedAddress &&
                        companyFirst.mailingAddress === ""
                      }
                      variant="outlined"
                      fullWidth
                      id="mailingAddress"
                      label="Mailing Address"
                      name="mailingAddress"
                      disabled={disable}
                      onChange={handleChangeFirst}
                      value={companyFirst.mailingAddress}
                      inputProps={{ maxLength: 40 }}
                    />
                    {errorsFirst.mailingAddress &&
                    !companyFirst.checkedAddress &&
                    companyFirst.mailingAddress === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.mailingAddress &&
                          !companyFirst.checkedAddress &&
                          companyFirst.mailingAddress === ""
                        }
                      >
                        {errorsFirst.mailingAddress}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid
                    container
                    id="address-container-2"
                    item
                    direction="row"
                    spacing={10}
                  >
                    <Grid item xs={7}>
                      <TextField
                        error={
                          errorsFirst.city2 &&
                          !companyFirst.checkedAddress &&
                          companyFirst.city2 === ""
                        }
                        variant="outlined"
                        fullWidth
                        id="city2"
                        label="City"
                        name="city2"
                        disabled={disable}
                        onChange={handleChangeFirst}
                        value={companyFirst.city2}
                        inputProps={{ maxLength: 20 }}
                      />
                      {errorsFirst.city2 &&
                      !companyFirst.checkedAddress &&
                      companyFirst.city2 === "" ? (
                        <FormHelperText
                          error={
                            errorsFirst.city2 &&
                            !companyFirst.city2 &&
                            companyFirst.city2 === ""
                          }
                        >
                          {errorsFirst.city2}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl
                        error={
                          errorsFirst.state2 &&
                          companyFirst.state2 === "" &&
                          !companyFirst.checkedAddress
                        }
                        variant="outlined"
                        className={classes.formControl}
                        disabled={disable}
                      >
                        <InputLabel>ST</InputLabel>
                        <Select
                          label="State"
                          name="state2"
                          id="state2"
                          value={companyFirst.state2}
                          onChange={handleChangeFirst}
                        >
                          {states.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                        {errorsFirst.state2 &&
                        companyFirst.state2 === "" &&
                        !companyFirst.checkedAddress ? (
                          <FormHelperText>{errorsFirst.state2}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Bottom Buttons */}
              <Grid container id="first-continer-buttons" justify="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={nextStep}
                    size="large"
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                direction="row"
                spacing={2}
                justify="space-between"
                alignItems="flex-start"
              >
                {/* Left part of form */}
                <Grid
                  container
                  item
                  id="second-left"
                  xs={12}
                  md={6}
                  direction="column"
                  spacing={3}
                >
                  <Grid item>
                    <TextField
                      error={
                        errorsSecond.companyRep &&
                        companySecond.companyRep === ""
                      }
                      variant="outlined"
                      fullWidth
                      id="companyRep"
                      label="Organization Representative"
                      name="companyRep"
                      onChange={handleChangeSecond}
                      value={companySecond.companyRep}
                      inputProps={{ maxLength: 50 }}
                    />
                    {errorsSecond.companyRep &&
                    companySecond.companyRep === "" ? (
                      <FormHelperText
                        error={
                          errorsSecond.companyRep &&
                          companySecond.companyRep === ""
                        }
                      >
                        {errorsSecond.companyRep}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl
                      error={
                        errorsSecond.companyType &&
                        companySecond.companyType === ""
                      }
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel>Comapany Type</InputLabel>
                      <Select
                        label="Company Type"
                        name="companyType"
                        id="companyType"
                        onChange={handleChangeSecond}
                        value={companySecond.companyType}
                      >
                        <MenuItem value="1">Private</MenuItem>
                        <MenuItem value="2">Non-Profit</MenuItem>
                        <MenuItem value="0">Social Business</MenuItem>
                      </Select>
                      {errorsSecond.companyRep &&
                      companySecond.companyRep === "" ? (
                        <FormHelperText>
                          {errorsSecond.companyRep}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={
                        errorsSecond.website && companySecond.website === ""
                      }
                      variant="outlined"
                      fullWidth
                      id="website"
                      label="Company Website"
                      name="website"
                      placeholder="wwww.example.com"
                      onChange={handleChangeSecond}
                      value={companySecond.website}
                      inputProps={{ maxLength: 50 }}
                    />
                    {errorsSecond.webiste && companySecond.website === "" ? (
                      <FormHelperText
                        error={
                          errorsSecond.website && companySecond.website === ""
                        }
                      >
                        {errorsSecond.website}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>

                {/* Right part */}
                <Grid
                  container
                  item
                  id="second-right"
                  xs={12}
                  md={6}
                  direction="column"
                  spacing={3}
                >
                  <Grid item>
                    <TextField
                      error={
                        errorsSecond.mission && companySecond.mission === ""
                      }
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                      id="mission"
                      label="Company Mission"
                      name="mission"
                      onChange={handleChangeSecond}
                      value={companySecond.mission}
                      inputProps={{ maxLength: 225 }}
                    />
                    {errorsSecond.mission && companySecond.mission === "" ? (
                      <FormHelperText
                        error={
                          errorsSecond.mission && companySecond.mission === ""
                        }
                      >
                        {errorsSecond.mission}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <TextField
                      error={
                        errorsSecond.description &&
                        companySecond.description === ""
                      }
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                      id="description"
                      label="Company Description"
                      name="description"
                      onChange={handleChangeSecond}
                      value={companySecond.description}
                      inputProps={{ maxLength: 500 }}
                    />
                    {errorsSecond.description &&
                    companySecond.description === "" ? (
                      <FormHelperText
                        error={
                          errorsSecond.description &&
                          companySecond.description === ""
                        }
                      >
                        {errorsSecond.description}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                id="buttons-container"
                justify="flex-end"
                spacing={3}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.submit}
                    onClick={goBack}
                    size="large"
                  >
                    Go Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    size="large"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </form>
      </div>
    </Container>
  );
};

export default CompanyInfo;
