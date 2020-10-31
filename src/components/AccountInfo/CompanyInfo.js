import React from "react";
import { useState } from 'react';
import { Grid, Typography, Container, TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useFormik, Form, Formik } from 'formik'

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
    checkedAddress: [],
    orgRepresentative: '',
    orgType: '',
    website: '',
    companyMission: '',
    companyDescription: '',
  }

  const validate = (values) => {}

  const onSubmit = (values) => {
    console.log("Clicked Submit");
    console.log(values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  const nextStep = () => {
    console.log(formik.values);
    setFirstStep(false);
  }

  const goBack = () => {
    setFirstStep(true);
  };

  const copyAddress = () => {
    if(formik.values.checkedAddress[0] == 'on') {
      setDisable(!disable);
    }
    else {
      console.log("off")
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
        <form className={classes.form}>
          { firstStep === true ? (<>
          <Grid container id="master" direction="row" justify="space-between" spacing={2} alignItems="flex-start">
            {/* Left Grid */}
            <Grid container item xs={6} spacing={3} direction="column">
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
            </Grid>

            {/* COLUMN2------------------------------------- */}
            <Grid container item xs={6} spacing={3} direction="column">
              <Grid item>
                  <TextField variant="outlined" fullWidth id="address" label="Company Address" name="address" onChange={formik.handleChange} value={formik.values.address}/>
              </Grid>
              <Grid container item direction="row" spacing={10}>
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
                <FormControlLabel className={classes.checkLabel} value="on" control={<Checkbox name="checkedAddress" color="secondary" onClick={copyAddress} onChange={formik.handleChange}/>} label="Mailing address same as company Address" labelPlacement="end"/>
              </Grid>
              <Grid container item direction="row" spacing={10}>
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
          <Grid container justify="flex-end">
              <Grid item>
                <Button variant="contained" color="secondary" className={classes.submit} onClick={nextStep} size="large">Continue</Button>
              </Grid>
          </Grid>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
          <pre>{JSON.stringify(disable, null, 2)}</pre>
          </>) : (
          <>
          <Grid container direction="row" spacing={2} justify="space-between" alignItems="flex-start">
            {/* left part of form  */} 
            {/* <Grid container item xs={4} irection="column" className="grid-left"
            >
              <Grid item>
                <label>Company Logo</label>
              </Grid>
              <Grid item>
                <img className="logo-image" src={logo} alt="Logo" />
              </Grid>
              <Grid item>
                <button className="button-red upload-button">
                  Upload Image
                </button>
              </Grid>
            </Grid> */}

            {/* middle part of form */}
            <Grid container item xs={6} item direction="column" spacing={3}>
                <Grid item>
                  <TextField variant="outlined"  fullWidth id="orgRep" label="Organization Representative" name="orgRep"/>
                </Grid >
                <Grid item xs={4}>
                  <FormControl variant="outlined" className={classes.formControl} disabled={disable} >
                    <InputLabel>ST</InputLabel>
                    <Select label="Organization Type" name="orgType" id="orgType">
                          <MenuItem key="Private" value="Private">Private</MenuItem>
                          <MenuItem key="nonProfit" value="nonProfit">Non-Profit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid >
                <Grid item>
                  <TextField variant="outlined"  fullWidth id="website" label="Company Website" name="website" placeholder="wwww.example.com"/>
                </Grid >
            </Grid>
            {/* Right part */}
            <Grid container item xs={6} direction="column" spacing={3}>
              <Grid item>
                <TextField variant="outlined" multiline rows={5}  fullWidth id="companyMission" label="Company Mission" name="companyMission"/>
              </Grid >
              <Grid item>
              <TextField variant="outlined" multiline rows={5}  fullWidth id="companyDescription" label="Company Description" name="companyDescription"/>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" spacing={3}>
              <Grid item>
                <Button variant="outlined" color="secondary" className={classes.submit} onClick={goBack} size="large">Go Back</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" className={classes.submit} size="large" type="submit">Submit</Button>
              </Grid>
          </Grid>
        </>)}
        </form>
      </div>
    </Container> )
  };

export default CompanyInfo;
