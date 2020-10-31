import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import "./AccountInfo.css";
import CompanyInfo2 from "./CompanyInfo2";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { config } from "../../authConfig";

const CompanyInfo = (props) => {
  const [firstStep, setFirstStep] = useState(true);
  let history = useHistory();

  const initialValues = {
    companyName: "",
    industryType: "",
    companyEmail: "",
    phoneNumber: "",
    companyAddress: "",
    city: "",
    state: "AL",
    mailingAddress: "",
    cityMailingAddress: "",
    stateMailingAddress: "AL",
    checkAddress: false,
    orgRepresentative: "",
    organizationType: "",
    companyWebsite: "",
    companyMission: "",
    companyDescription: "",
    uploadImage: "",
  };

  const getAddress = (val) => {
    return `${val.companyAddress}, ${val.city}, ${val.state}`;
  };

  const getMailingAddress = (val) => {
    return `${val.mailingAddress}, ${val.cityMailingAddress}, ${val.stateMailingAddress}`;
  };

  const onSubmit = (values) => {
    const data = {
      company_name: values.companyName,
      company_phone_no: values.phoneNumber,
      industry_type: values.industryType,
      representative_name: values.orgRepresentative,
      company_representative_type: 1,
      company_type: 1,
      company_address: getAddress(values),
      mailing_address: values.checkAddress
        ? getAddress(values)
        : getMailingAddress(values),
      company_website: values.companyWebsite,
      company_mission: values.companyMission,
      company_description: values.companyDescription,
      username: localStorage.getItem("email_id"),
    };

    axios
      .post(
        "http://18.213.74.196:8000/api/company_profile/create",
        data
        //config
      )
      .then((res) => {
        localStorage.setItem("slug", res.data.slug);
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const validateFirst = (values) => {
    let errors = {};
    if (!values.companyName) {
      errors.companyName = "Required";
    }
    if (!values.industryType) {
      errors.industryType = "Required";
    }
    if (!values.companyEmail) {
      errors.companyEmail = "Required";
    }
    // else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.companyEmail)) {
    //   errors.companyEmail = 'Invalid Email Format'
    // }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const nextStep = () => {
    let errors = validateFirst(formik.values);
    //console.log(errors);
    if (Object.keys(errors).length === 0) {
      //console.log("no errors found");
      setFirstStep(false);
      //console.log(errors);
    } else {
      console.log("errors found");
      console.log(errors);
    }
  };

  const goBack = () => {
    setFirstStep(true);
  };

  const copyCompanyAddress = (e) => {
    if (e.target.value) {
      formik.values.checkAddress = true;
      formik.values.cityMailingAddress = formik.values.city;
      formik.values.stateMailingAddress = formik.values.state;
    }
  };
  return (
    <div>
      <div className="buttons-container">
        <button className="button-red" onClick={onSubmit} type="button">
          Button
        </button>
      </div>
      <div className="form-container">
        <form>
          <div className="form-header">
            <h2 className="form-title">Company Account Information</h2>
            <hr style={{ height: "8px", background: "rgb(0,0,0)" }}></hr>
          </div>
          {firstStep === true ? (
            <div>
              <Grid
                container
                direction="row"
                justify="center"
                className="form-grid"
              >
                {/* left part f */}
                <Grid
                  container
                  id="left"
                  item
                  xs={6}
                  direction="column"
                  spacing={2}
                >
                  <Grid item>
                    <label htmlFor="companyName">Company name:</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="input-long"
                      onChange={formik.handleChange}
                      value={formik.values.companyName}
                      placeholder="Company name"
                    />
                  </Grid>
                  <Grid item>
                    <label htmlFor="industryType">Industry type:</label>
                    <input
                      type="text"
                      id="industryType"
                      name="industryType"
                      className="input-long"
                      onChange={formik.handleChange}
                      value={formik.values.industryType}
                      placeholder="Industry type"
                    />
                  </Grid>
                  <Grid item>
                    <label htmlFor="companyEmail">Company Email</label>
                    <input
                      type="text"
                      id="companyEmail"
                      name="companyEmail"
                      className="input-long"
                      onChange={formik.handleChange}
                      value={formik.values.companyEmail}
                      placeholder="user@example.com"
                    />
                  </Grid>
                  <Grid item>
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="input-short"
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      placeholder="(###)-###-####"
                    />
                  </Grid>
                </Grid>

                {/* right part of form */}
                <Grid
                  container
                  id="right"
                  item
                  xs={6}
                  direction="column"
                  spacing={2}
                >
                  <Grid item>
                    <label htmlFor="companyAddress">Company Address:</label>
                    <input
                      type="text"
                      id="companyAddress"
                      name="companyAddress"
                      className="input-long"
                      onChange={formik.handleChange}
                      placeholder="ex: 123 Street"
                    />
                  </Grid>
                  <Grid item container direction="row" spacing={3}>
                    <Grid item>
                      <label htmlFor="city">City:</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="input-short2"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        placeholder="ex: Houston"
                      />
                    </Grid>
                    <Grid item>
                      <label htmlFor="state">State:</label>
                      <select
                        name="state"
                        className="input-short2"
                        id="state"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                      >
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>
                      </select>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <label htmlFor="mailingAddress">Mailing address</label>
                    <input
                      type="text"
                      id="mailingAddress"
                      name="mailingAddress"
                      className="input-long"
                      onChange={formik.handleChange}
                      value={formik.values.mailingAddress}
                      placeholder="ex) 123 Street"
                    />
                    <div className="checkbox-container">
                      <input
                        id="checkAddress"
                        name="checkAddress"
                        className="checkbox-input"
                        type="checkbox"
                        onClick={copyCompanyAddress}
                      />
                      <label htmlFor="checkAddress" className="checkbox-label">
                        Mailing address same as company address
                      </label>
                    </div>
                  </Grid>
                  <Grid item container direction="row" spacing={3}>
                    <Grid item>
                      <label htmlFor="cityMailingAddress">City:</label>
                      <input
                        type="text"
                        id="cityMailingAddress"
                        name="cityMailingAddress"
                        className="input-short2"
                        onChange={formik.handleChange}
                        placeholder="ex: Houston"
                      />
                    </Grid>
                    <Grid item>
                      <label htmlFor="stateMailingAddress">State:</label>
                      <select
                        className="input-short2"
                        name="stateMailingAddress"
                        id="stateMailingAddress"
                        onChange={formik.handleChange}
                      >
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>
                      </select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div className="buttons-container">
                <button className="button-red" onClick={nextStep} type="button">
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <CompanyInfo2 formik={formik} goBack={goBack}></CompanyInfo2>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
