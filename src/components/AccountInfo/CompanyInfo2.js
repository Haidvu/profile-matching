import React from "react"
import { useState } from "react"
import { Grid } from "@material-ui/core"
import "./AccountInfo.css"

const  CompanyInfo2 =  (props) => {
    const [companyProfile, setCompanyProfile] = useState({
      profileImage: '',
      orgRepresentative: '',
      orgType: '',
      companyMission: '',
      companyDescription: ''
    })

    return (
      <div>
        <div className= "form-container">
        <form>
          <div className="form-header">
              <h2 className="form-title">Company Account Information</h2>
              <hr style={{height: '4px', background:'rgb(0,0,0)'}}></hr>
          </div>
          <Grid container direction="row" justify="center" className="form-grid">
            {/* left part of form */}
            <Grid container item xs={4} direction="column" spacing={2}>
                <Grid item>
                    <label>Company Logo</label>
                    <img />
                </Grid>
            </Grid>
  
            {/* middle part of form */}
            <Grid container item xs={4} direction="column" spacing={2}>
             
              
            </Grid>
            {/* Right part */}
            <Grid container item xs = {4} direction = "column" spacing = {2}>
  
            </Grid>
          </Grid>
          <div className="buttons-container">
            <button className="button-grey" onClick={props.goBack}>Go back</button>
            <button className="button-red">Submit</button>
          </div>
        </form>
        </div>
      </div>);
  }

export default CompanyInfo2;