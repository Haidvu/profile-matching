import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import "./AccountInfo.css";
import CompanyInfo2 from "./CompanyInfo2";

const CompanyInfo = (props) => {
  const [companyAccount, setCompanyAccount] = useState({
    companyName: "",
    industryType: "",
    companyEmail: "",
    phoneNumber: "",
    companyAddress: "",
    city: "",
    state: "",
    mailingAddress: "",
    cityMailingAddress: "",
    stateMailingAddress: "",
    organizationRepresentative: "",
    organizationType: "",
    compantWebsite: "",
    companyMission: "",
    companyDescription: "",
    uploadImage: "",
    checkAddress: false,
  });

  const [firstStep, setFirstStep] = useState(true);

  const handleChange = (e) => {
    setCompanyAccount({
      ...companyAccount,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setFirstStep(false);
    console.log(companyAccount);
  };

  const goBack = () => {
    setFirstStep(true);
  };

  const copyCompanyAddress = (e) => {
    if (e.target.value) {
      setCompanyAccount({
        ...companyAccount,
        checkAddress: true,
        mailingAddress: companyAccount.companyAddress,
        cityMailingAddress: companyAccount.city,
        stateMailingAddress: companyAccount.state,
      });
    }
  };
  if (firstStep) {
    return (
      <div>
        <div className="form-container">
          <form>
            <div className="form-header">
              <h2 className="form-title">Company Account Information</h2>
              <hr style={{ height: "8px", background: "rgb(0,0,0)" }}></hr>
            </div>
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
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="industryType">Industry type:</label>
                  <input
                    type="text"
                    id="industryType"
                    name="industryName"
                    className="input-long"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                      placeholder="ex: Houston"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <label htmlFor="state">State:</label>
                    <select
                      name="state"
                      className="input-short2"
                      id="state"
                      onChange={handleChange}
                    >
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
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
                    onChange={handleChange}
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
                      onChange={handleChange}
                      placeholder="ex: Houston"
                    />
                  </Grid>
                  <Grid item>
                    <label htmlFor="stateMailingAddress">State:</label>
                    <select
                      className="input-short2"
                      name="stateMailingAddress"
                      id="stateMailingAddress"
                      onChange={handleChange}
                    >
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className="buttons-container">
              <button className="button-red" onClick={nextStep}>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <CompanyInfo2
        goBack={goBack}
        companyAccount={companyAccount}
      ></CompanyInfo2>
    );
  }
};

export default CompanyInfo;
