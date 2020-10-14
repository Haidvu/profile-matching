import React from "react";

import { useFormik } from 'formik'
import { Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core/'
import './Signup.css';


const initialValues = {
  username: "",
  password: "",
  confirmpassword: "",
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

const validate = (values) => {
  //values.name values.email values.channel
  //errors.name errors.email erors.channel
  let errors = {};

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  if (!values.confirmpassword) {
    errors.confirmpassword = "Required";
  }

  return errors;
};

function Signup() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log("Visited fields", formik.touched);

  return (
    <div className="form_login">
                <div className="form_container">
                    <h1>Create an account</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-control'>
                            <h4>Username:</h4>
                            <input class="form_input" type="text" 
                            id="username" 
                            name="username"
                            placeholder="enter username" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            value={formik.values.username} /> 
                            { formik.touched.username && formik.errors.username ? <div className='error'>{formik.errors.username}</div> : null}
                        </div>


                        <div className='form-control'>
                            <h4>Password:</h4>
                            <input class="form_input" type="password" 
                            id="password" 
                            name="password"
                            placeholder="enter password"  
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}  
                            value={formik.values.password}/> 
                            {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                        </div>

                        <div className='form-control'>
                            <h4>Confirm password:</h4>
                            <input class="form_input" type="password" 
                            id="confirmpassword" 
                            name="confirmpassword"
                            placeholder="re-type password" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            value={formik.values.confirmpassword}/> 
                            {formik.touched.confirmpassword && formik.errors.confirmpassword ? <div className='error'>{formik.errors.confirmpassword}</div> : null}
                        </div>

                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Choose account type</FormLabel>
                                <RadioGroup aria-label="account_type" name="account_type" row>
                                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                    <FormControlLabel value="Company" control={<Radio />} label="Company" />
                                </RadioGroup>
                                </FormControl>
                        </div>

                        <Button variant="contained" color="secondary">Signup</Button>
                </form>
            </div>
        </div>
  )
}

export default Signup;
