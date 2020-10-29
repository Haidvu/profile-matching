import React from "react";
import { Grid } from "@material-ui/core";
import "./AccountInfo.css";
import logo from "../../assets/LogoPlaceholder.jpg";

const CompanyInfo2 = (props) => {
  const { formik } = props;

  return (
    <>
      <Grid container direction="row" className="form-grid2">
        {/* left part of form */}
        <Grid container item xs={4} direction="column" className="grid-left">
          <Grid item>
            <label>Company Logo</label>
          </Grid>
          <Grid item>
            <img className="logo-image" src={logo} alt="Logo" />
          </Grid>
          <Grid item>
            <button className="button-red upload-button">Upload Image</button>
          </Grid>
        </Grid>

        {/* middle part of form */}
        <Grid container xs={4} item direction="column" spacing={2}>
          <Grid item>
            <label>Organization Type</label>
            <input
              type="text"
              id="orgRepresentative"
              name="orgRepresentative"
              className="input-short2"
              placeholder="..."
              onChange={formik.handleChange}
              value={formik.values.orgRepresentative}
            />
          </Grid>
          <Grid item>
            <label>Organization Type</label>
            <input
              type="text"
              id="orgType"
              name="organizationType"
              className="input-short2"
              placeholder="..."
              onChange={formik.handleChange}
              value={formik.values.organizationType}
            />
          </Grid>
          <Grid item>
            <label>Company Website</label>
            <input
              type="text"
              id="companyWebsite"
              name="companyWebsite"
              className="input-short"
              placeholder="www.example.com"
              onChange={formik.handleChange}
              value={formik.values.companyWebsite}
            />
          </Grid>
          <Grid item>
            <label>Company Mission</label>
            <textarea
              id="companyMission"
              name="companyMission"
              className="input-textarea"
              onChange={formik.handleChange}
              value={formik.values.companyMission}
            />
          </Grid>
        </Grid>
        {/* Right part */}
        <Grid container item xs={4} direction="column" spacing={2}>
          <Grid item>
            <label>Company Description</label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              className="input-textarea"
              onChange={formik.handleChange}
              value={formik.values.companyName.companyDescription}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="buttons-container">
        <button className="button-grey" onClick={props.goBack}>
          Go back
        </button>
        <button
          className="button-red"
          onClick={props.formik.handleSubmit}
          type="submit"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CompanyInfo2;
