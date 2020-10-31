import React from "react";
import { useState } from 'react';
import { Grid, Typography, Container, TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, Divider, Button, RadioGroup, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(7)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(6),
    justifyContent: 'center'
  },
  formControl: {
    width: "100%"
  },
  checkLabel: {
    color: theme.palette.secondary
  },
  submit: {
    marginTop: theme.spacing(4),
  },

}));

const CompanyInfo = () => {
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO','MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]
  const industryTypes = [
    'Agriculture Services',
    'Architecture/Design',
    'Arts/Education',
    'Business/Finance/Consulting',
    'Construction/RealEstate',
    'Engineering/Manufacturing',
    'Education Services',
    'Food Service/Hospitality/Tourism',
    'GOvernment/Non-Profites',
    'Healthcare/Life-Science',
    'Information Technology',
    'Legal',
    'Media/Marketing/Communications',
    'Religious Organizations',
    'Retail/Trade/Fashion',
    'Sports/Recreation',
    'Utilities/Energy/Environment',
    'UH Faculty/Staff',
    'University Career Services',
    'Univrsity Education Support Program (VESP)',
    'Transportation/Logistics'
  ]

  const history = useHistory();
  const classes = useStyles();
  const [firstStep, setFirstStep] = useState(true)
  const [disable, setDisable] = useState(false);
  const initialValues = {
    name: '',
    industryType: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    mailingAddress: '',
    city2: '',
    state2: '',
    checkedAddress: null,
    companyRep: '',
    companyType: '',
    website: '',
    mission: '',
    description: '',
    isSolo: null,
  }

  const getAddress = (values) => {
    return `${values.address}, ${values.city}, ${values.state}`
  }

  const getMailingAddress = (values) => {
    return `${values.mailingAddress}, ${values.city2}, ${values.state2}`
  }

  const onSubmit = (values) => {
    const data = {
      company_name: values.name,
      company_phone_no: values.phoneNumber,
      industry_type: values.industryType,
      representative_name: values.companyRep,
      company_representative_type: values.isSolo,
      company_type: values.companyType,
      company_address: getAddress(values),
      mailing_address: values.checkedAddress
        ? getAddress(values)
        : getMailingAddress(values),
      company_website: values.website,
      company_mission: values.mission,
      company_description: values.description,
      username: localStorage.getItem("email_id"),
    };
    console.log(data);

    axios
      .post(
        "http://18.213.74.196:8000/api/company_profile/create",
        data,
      )
      .then((res) => {
        localStorage.setItem("slug", res.data.slug);
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  const nextStep = () => {
    setFirstStep(false);
  }

  const goBack = () => {
    setFirstStep(true);
  };

  const checkMailingAddress = () => {
    if(formik.values.checkedAddress) {
      setDisable(!disable);
    }
    else {
      setDisable(!disable);
    }
  }
  
  return(
    <Container component="main" maxwidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Company Account Information
        </Typography>
        <Divider/>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          { firstStep === true ? (<>
          <Grid container id="master" direction="row" justify="space-between" spacing={2} alignItems="flex-start">
            {/* Left Grid */}
            <Grid container id="first-left" item xs={6} spacing={3} direction="column">
              <Grid item>     
                <TextField variant="outlined" fullWidth  id="name" label="Company Name"  name="name" onChange={formik.handleChange} value={formik.values.name}/>
              </Grid>
              <Grid item>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Industry Type</InputLabel>
                    <Select label="Industry Type" value={formik.values.industryType} onChange={formik.handleChange} name="industryType">
                      {industryTypes.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item>
                  <TextField variant="outlined" fullWidth id="phoneNumber" label="Phone Number" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber} />
              </Grid>
              <Grid item>
                  <Typography>Is this a one person company?</Typography>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <RadioGroup aria-label="Are you single member company" name="isSolo" value={formik.values.isSolo} onChange={formik.handleChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Yes (1)"/>
                        <FormControlLabel value="0" control={<Radio />} label="No (>=2)"/>
                    </RadioGroup>
                  </FormControl>
              </Grid>
            </Grid>

            {/* COLUMN2------------------------------------- */}
            <Grid container id="first-right" item xs={6} spacing={3} direction="column">
              <Grid item>
                  <TextField variant="outlined" fullWidth id="address" label="Company Address" name="address" onChange={formik.handleChange} value={formik.values.address}/>
              </Grid>
              <Grid container id="address-container-1" item direction="row" spacing={10}>
                <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth id="city" label="City" name="city" onChange={formik.handleChange} value={formik.values.city}/>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>ST</InputLabel>
                    <Select label="State" value={formik.values.state} onChange={formik.handleChange} name="state">
                      {states.map((state) => (
                          <MenuItem key={state} value={state}>{state}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item>
                <TextField variant="outlined" fullWidth id="mailingAddress" label="Mailing Address" name="mailingAddress" disabled={disable} onChange={formik.handleChange} value={formik.values.mailingAddress}/>
                <FormControlLabel className={classes.checkLabel} value="true" control={<Checkbox name="checkedAddress" color="secondary" onClick={checkMailingAddress} onChange={formik.handleChange}/>} label="Mailing address same as company Address" labelPlacement="end"/>
              </Grid>
              <Grid container id="address-container-2" item direction="row" spacing={10}>
                <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth id="city2" label="City" name="city2" disabled={disable} onChange={formik.handleChange} value={formik.values.city2}/>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="outlined" className={classes.formControl} disabled={disable}>
                    <InputLabel>ST</InputLabel>
                    <Select label="State" name="state2" id="state2" value={formik.values.state2} onChange={formik.handleChange} name="state2">
                      {states.map((state) => (
                          <MenuItem key={state} value={state}>{state}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Bottom Buttons */}
          <Grid container id="first-continer-buttons" justify="flex-end">
              <Grid item>
                <Button variant="contained" color="secondary" className={classes.submit} onClick={nextStep} size="large">Continue</Button>
              </Grid>
          </Grid>
          </>) : (
          <>
          <Grid container direction="row" spacing={2} justify="space-between" alignItems="flex-start">
            {/* Left part of form */}
            <Grid container id="second-left" item xs={6} item direction="column" spacing={3}>
                <Grid item>
                  <TextField variant="outlined"  fullWidth id="companyRep" label="Organization Representative" name="companyRep" onChange={formik.handleChange} value={formik.values.companyRep}/>
                </Grid >
                <Grid item xs={4}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Organization Type</InputLabel>
                    <Select label="Organization Type" name="companyType" id="companyType" onChange={formik.handleChange} value={formik.values.companyType}>
                          <MenuItem value="1">Private</MenuItem>
                          <MenuItem value="2">Non-Profit</MenuItem>
                          <MenuItem value="0">Social Business</MenuItem>
                    </Select>
                  </FormControl>
                </Grid >
                <Grid item>
                  <TextField variant="outlined"  fullWidth id="website" label="Company Website" name="website" placeholder="wwww.example.com" onChange={formik.handleChange} value={formik.values.website}/>
                </Grid >
            </Grid>

            {/* Right part */}
            <Grid container id="second-right" item xs={6} direction="column" spacing={3}>
              <Grid item>
                <TextField variant="outlined" multiline rows={5}  fullWidth id="mission" label="Company Mission" name="mission" onChange={formik.handleChange} value={formik.values.mission}/>
              </Grid >
              <Grid item>
                <TextField variant="outlined" multiline rows={5}  fullWidth id="description" label="Company Description" name="description" onChange={formik.handleChange} value={formik.values.description}/>
              </Grid>
            </Grid>
          </Grid>

          <Grid container id="buttons-container" justify="flex-end" spacing={3}>
              <Grid item>
                <Button variant="outlined" color="secondary" className={classes.submit} onClick={goBack} size="large">Go Back</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" className={classes.submit} size="large" type="submit">Submit</Button>
              </Grid>
          </Grid>
        </>)}
        </form>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        <pre>{JSON.stringify(disable, null, 2)}</pre>
      </div>
    </Container> )
  };

export default CompanyInfo;
