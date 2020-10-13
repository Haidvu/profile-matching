import React from "react"
import { useState } from "react"
import { Grid } from "@material-ui/core"
import "./AccountInfo.css"
import logo from '../../assets/LogoPlaceholder.jpg'

const  CompanyInfo2 =  (props) => {
    const [companyProfile, setCompanyProfile] = useState({
      profileImage: '',
      orgRepresentative: '',
      orgType: '',
      companyWebsite: '',
      companyMission: '',
      companyDescription: ''
    })

    const handleSubmit = () => {

    }

    const handleChange = (e) => {
        setCompanyProfile({
        ...companyProfile, [e.target.name]: e.target.value
        });
    }

    return (
      <div>
        <div className= "form-container">
        <form>
          <div className="form-header">
              <h2 className="form-title">Company Account Information</h2>
              <hr style={{height: '8px', background:'rgb(0,0,0)'}}></hr>
          </div>
          <Grid container direction="row" className="form-grid2">
            {/* left part of form */}
            <Grid container item xs={4} direction="column" className="grid-left">
                <Grid item >
                    <label>Company Logo</label>
                </Grid >
                <Grid item>
                    <img className="logo-image" src={logo} alt="Logo"/>
                </Grid>
                <Grid item>
                    <button className="button-red upload-button">Upload Image</button>
                </Grid>

            </Grid>
  
            {/* middle part of form */}
            <Grid container xs={4} item direction="column" spacing={2}>
                <Grid item>
                    <label>Organization Representative</label>
                    <input type="text" id="orgRepresentative" name="orgRepresentative" className="input-short2" placeholder="..." onChange={handleChange}/>
                </Grid >
                <Grid item>
                    <label>Organization Type</label>
                    <input type="text" id="orgType" name="orgType" className="input-short2" placeholder="..."/>
                </Grid >
                <Grid item>
                    <label>Company Website</label>
                    <input type="text" id="companyWebsite" name="companyWebsite" className="input-short" placeholder="www.example.com"/>
                </Grid >
                <Grid item>
                    <label>Company Mission</label>
                    <textarea id="companyMission" name="companyMission" className="input-textarea" defaultValue="random"/>
                </Grid >
            </Grid>
            {/* Right part */}
            <Grid container item xs={4} direction = "column" spacing = {2}>
            <Grid item>
                    <label>Company Description</label>
                    <textarea id="companyDescription" name="companyDescription" className="input-textarea" defaultValue="random"/>
                </Grid >
            </Grid>
          </Grid>
          <div className="buttons-container">
            <button className="button-grey" onClick={props.goBack}>Go back</button>
            <button className="button-red" onCLick={handleSubmit}>Submit</button>
          </div>
        </form>
        </div>
      </div>);
  }

export default CompanyInfo2;