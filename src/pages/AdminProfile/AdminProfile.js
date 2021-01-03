import React, { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Select, MenuItem, Typography, Button,createMuiTheme,responsiveFontSizes, MuiThemeProvider } from "@material-ui/core/";
import AdminTable from "../../components/AdminTable/AdminTable";

const useStyles = makeStyles((theme) => ({
    reportBackground: {
        backgroundColor: "rgba(200,16,46,1)",
        margin: "10px",
        borderRadius: "5px",
        flex: "column",
    },
    header: {
        textAlign: "center",
        fontSize: "50px",
        fontWeight: "400",
        color: "white",
        fontFamily: "Helvetica",
        marginBottom: theme.spacing(1.5),
    },
    preferenceSearch: {
        backgroundColor:"white",
        borderRadius:"10px",
        width:280,
        objectFit: "contain",
        height: 40,
        padding:"10px"
    },
    searchButton: {
        backgroundColor: "#324CE7",
        color: "white",
        "&:hover": {
          backgroundColor: "#a60d27",
          color: "white",
        },
    },
    childGrid:{
        marginLeft:theme.spacing(2)
    }
}))

export default function AdminProfile() {

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);
    const classes = useStyles();

    const [reportInput,setReportInput] = useState({     
        project_preference_for_student:0,
        student_preference_for_project:0,
        company_name:"Company Name"
    })

    function ReplacePreferences(matchingList){
        const preferences = {0:"No Preference", 1: "Low", 2: "Medium", 3:"High"};
        for(let i=0;i<matchingList.length;i++){
          let studentPreference = matchingList[i].student_preference_for_project;
          let companyPreference = matchingList[i].project_preference_for_student;
          matchingList[i].project_preference_for_student = preferences[companyPreference];
          matchingList[i].student_preference_for_project = preferences[studentPreference];
        }
        return matchingList;
    }
    
    const [loading, setLoading] = useState(false);
    const [matchingList, setMatchingList] = useState([]);

    //api for select Company Name
    const [companyNameList, setCompanyNameList] = useState([]);
    useEffect(() => {
        axios
        .get(
            "http://18.213.74.196:8000/api/company_profile/list_company_name",
            getConfig()
        )
        .then((res) => {
            setCompanyNameList(res.data);    
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    const handleClick = () =>{
    setLoading(true);
    const data = {
        company_name : reportInput.company_name === "Company Name" ? "" : reportInput.company_name,
        project_preference_for_student: reportInput.project_preference_for_student,
        student_preference_for_project: reportInput.student_preference_for_project
    }
    axios
      .post(
        "http://18.213.74.196:8000/api/project_select_student/admin_matching",
        data,
        getConfig()
      )
      .then((res) => {
        setLoading(false);
        setMatchingList(ReplacePreferences(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    }
    return (
    <div>
        <div className={classes.reportBackground}>
            <MuiThemeProvider theme={theme}>
                <Typography className={classes.header}>Matching Report</Typography>
            </MuiThemeProvider>
            <Grid
            container
            id="master"
            direction="row"
            className={classes.parentGrid}
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}>
                <Grid item className={classes.childGrid}>
                    <Select
                        className={classes.preferenceSearch}
                        value={reportInput.student_preference_for_project}
                        onChange={(e) => {
                            setReportInput({
                                ...reportInput,
                                student_preference_for_project: e.target.value,
                            });
                        }}
                        label="Student Preference For Project"
                        >
                        <MenuItem value={0}>
                            <em>Student Preference For Project</em>
                        </MenuItem>
                        <MenuItem value={1}>Low</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>High</MenuItem>
                    </Select>
                </Grid>
                <Grid item className={classes.childGrid}>
                    <Select
                        className={classes.preferenceSearch}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={reportInput.project_preference_for_student}
                        onChange={(e) => {
                            setReportInput({
                                ...reportInput,
                                project_preference_for_student: e.target.value,
                            });
                        }}
                        label="Company Preference For Student"
                        >
                        <MenuItem value={0}>
                            <em>Company Preference For Student</em>
                        </MenuItem>
                        <MenuItem value={1}>Low</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>High</MenuItem>
                    </Select>
                </Grid>
                <Grid item className={classes.childGrid}>
                    <Select
                        className={classes.preferenceSearch}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={reportInput.company_name}
                        onChange={(e) => {
                            setReportInput({
                                ...reportInput,
                                company_name: e.target.value,
                            });
                        }}
                        label="Company Name"
                        >
                        <MenuItem value={"Company Name"}>
                            <em>Company Name</em>
                        </MenuItem>
                        {(companyNameList).map((companyName) => (
                        <MenuItem value={companyName.company_name}>{companyName.company_name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item className={classes.childGrid}>       
                    <Button
                        variant="contained"
                        className={classes.searchButton}
                        onClick={handleClick}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
        <div>
            <Grid>
                <AdminTable loading={loading} matchingList={matchingList} />
            </Grid>
        </div>
    </div>
    )
}