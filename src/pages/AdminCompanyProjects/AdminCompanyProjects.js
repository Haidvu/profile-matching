import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminCompanyProjectsTable from "../../components/AdminCompanyProjectsTable/AdminCompanyProjectsTable"
import {Grid, Select, MenuItem, Typography, Button,createMuiTheme,responsiveFontSizes, MuiThemeProvider } from "@material-ui/core/";
import { getConfig } from "../../authConfig";
import { makeStyles } from "@material-ui/core/styles";

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
  selectSearch: {
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
export default function AdminCompanyProjects() {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  const classes = useStyles();
    // takes in the user input
  const [searchInput, setSearchInput] = useState({
      company_name: "Company Name",
  });
  const [projectsList, setProjectsList] = useState([]);
  // this is for the normal Search
  const handleClickSearch = () => {
    let data = {
      company_name: searchInput.company_name === "Company Name" ? "" : searchInput.company_name,
    };
    localStorage.setItem("search_history", JSON.stringify(data));
    axios
      .post("/company_project/admin_search_company_name", data, getConfig())
      .then((res) => {
        setProjectsList(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };

  const [companyNameList, setCompanyNameList] = useState([]);
  useEffect(() => {
    axios
      .get("/company_profile/list_company_name", getConfig())
      .then((res) => {
        const data = res.data.map((compName) => {
          return { label: compName.company_name };
        });
        setCompanyNameList(data);
      })
      .catch((err) => {
        console.log(err);
      });
    //Restore seach to same data when going back.
    let data = {};
    if (JSON.parse(localStorage.getItem("search_history"))) {
      data = JSON.parse(localStorage.getItem("search_history"));
      axios
        .post("/company_project/admin_search_company_name", data, getConfig())
        .then((res) => {
          setProjectsList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }, []);

  const setModifiedProject = (modifiedProject) => {
    setProjectsList(
      projectsList.map((project) =>
        project.project_id === modifiedProject.project_id
          ? modifiedProject
          : project
      )
    );
  };
  return (
    <div>
        <div className={classes.reportBackground}>
            <MuiThemeProvider theme={theme}>
                <Typography className={classes.header}>Company Projects</Typography>
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
                        className={classes.selectSearch}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={searchInput.company_name}
                        onChange={(e) => {
                            setSearchInput({
                                ...searchInput,
                                company_name: e.target.value,
                            });
                        }}
                        label="Company Name"
                        >
                        <MenuItem value={"Company Name"}>
                            <em>Company Name</em>
                        </MenuItem>
                        {(companyNameList).map((companyName) => (
                        <MenuItem value={companyName.label}>{companyName.label}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item className={classes.childGrid}>       
                    <Button
                        variant="contained"
                        className={classes.searchButton}
                        onClick={handleClickSearch}
                        onKeyPress={handleKeypress}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
        <div>
            <Grid>
                <AdminCompanyProjectsTable projectsList={projectsList} setModifiedProject={setModifiedProject} />
            </Grid>
        </div>
    </div>
    )
}
