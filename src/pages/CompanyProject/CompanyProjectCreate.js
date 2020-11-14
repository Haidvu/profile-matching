import React, { useEffect, useState } from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ListItem,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";

import axios from "axios";
import { getConfig } from "../../authConfig";

import { useHistory } from "react-router-dom";

import Select from "react-select";
import makeAnimated from "react-select/animated";

// A list of projects and some description is needed here

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
  },
  profileLogo: {
    backgroundRepeat: "no-repeat",
    position: "relative",
    objectPosition: "20% 30%",
    width: "100vw",
    height: "15vw",
    maxWidth: "100%",
    zIndex: 1,
    objectFit: "cover",
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
    color: theme.palette.secondary.main,
  },
  download: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
  },
  skills: {
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    color: "#5B5B5B",
    padding: "2%",
    width: "5%",
  },
  skillsContainer: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  sectionHeader: {
    fontWeight: "bold",
    color: "#606060",
  },
  sectionContent: {
    color: "#5B5B5B",
    display: "inline",
  },
  profileImage: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    position: "absolute",
    top: "15%",
    right: "4%",
    zIndex: 1,
    objectFit: "contain",
  },

  breadcrumbs: {
    padding: "10px",
  },
  column: {
    flexBasis: "33.33%",
    padding: "15px",
  },
  companyProjectCards: {
    paddingLeft: "70px",
    paddingRight: "70px",
    paddingTop: "20px",

    // width: "100%"
  },
  root: {
    flexGrow: 1,
  },

  cardText: {
    fontSize: "13px",
  },
  cardHeader: {
    fontSize: "20px",
  },
  chips: {
    margin: "5px",
  },
  deadline: {
    padding: "5px",
  },
  cardContent: {
    padding: "8px",
  },
  addProject: {
    "&:hover": {
      backgroundColor: "#C8102E",
    },
    margin: theme.spacing(2),
  },

  media: {
    height: 140,
  },
  selectProjectType: {
    width: "30%",
    zIndex: 1000,
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
  selectCompanySkills: {
    width: "100%",
    padding: "10px",
    zIndex: 1,
  },
  addCompanyProjectFields: {
    padding: "10px",
  },
}));

export default function CompanyProjectCreate() {
  const classes = useStyles();

  // const [companyProjects, setCompanyProjects] = useState([]);

  const history = useHistory();

  const animatedComponents = makeAnimated();

  const projectType = [
    {
      value: "1",
      label: "Cloud Development",
    },
    {
      value: "2",
      label: "Frontend",
    },
    {
      value: "3",
      label: "Backend",
    },
    {
      value: "4",
      label: "Mobile Development",
    },
    {
      value: "5",
      label: "Data Management",
    },
  ];

  const options = [
    {
      value: "1",
      label: "Angular",
    },
    {
      value: "2",
      label: ".NET",
    },
    {
      value: "3",
      label: "Python",
    },
    {
      value: "4",
      label: "React",
    },
    {
      value: "5",
      label: "C++",
    },
    {
      value: "6",
      label: "Python",
    },
    {
      value: "7",
      label: "JavaScript",
    },
    {
      value: "8",
      label: "Flash",
    },
    {
      value: "9",
      label: "Selenium",
    },
  ];

  const [companyInput, setCompanyInput] = useState({
    //This is the data
    project_description: "",
    project_name: "",
    project_type: "",
    project_tech: "",
    project_deadline: "",

    /*  company_project_team_capacity: '10',
    company_project_students_selected: [{ label: 'C++', value: 0 }, { label: 'Java', value: 1 }]*/
  });

  const handleSave = (key) => {
    //Make api call to save data here.
    setCompanyInput(companyInput);
    saveToDB(companyInput);

    //  handleCloseEdit(key);
  };

  const saveToDB = (values) => {
    const data = {
      project_description: values.project_description,
      project_name: values.project_name,
      project_type: values.project_type,
      project_tech: values.project_tech,
      project_deadline: "2020-10-24T02:30:48Z",
      username: 49,
    };

    axios
      .post(
        "http://18.213.74.196:8000/api/company_project/create",
        data,
        getConfig()
      )
      .then((res) => {
        localStorage.setItem("slug", res.data.slug);
        history.push("/dashboard/projects");
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    console.log(getConfig());
    axios
      .post(
        "http://18.213.74.196:8000/api/company_project/list_by_company",

        {
          username_id: 49, // 	company@eli.eli | Company 1 Eli | 49
        },
        getConfig()
      )
      .then((res) => {
        console.log(res.data);
        // setCompanyProjects(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  // Here will be the submit function to create the project
  // and the axios integration

  return (
    <div className="root">
      <img
        alt="profile background"
        className={classes.profileLogo}
        src={ProfileLogo}></img>

      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" href="/" /*onClick={handleClick}*/>
          Home
        </Link>
        <Link color="inherit" href="/dashboard" /*onClick={handleClick}*/>
          Profile
        </Link>
        <Link
          color="inherit"
          href="/dashboard/projects" /*onClick={handleClick}*/
        >
          My Projects
        </Link>
        <Typography color="textPrimary">Add New Project</Typography>
      </Breadcrumbs>

      <div>
        <Grid container>
          <TextField
            className={classes.addCompanyProjectFields}
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            fullWidth
            variant="outlined"
            name="project_name"
            onChange={(e) => {
              setCompanyInput({
                ...companyInput,
                project_name: e.target.value,
              });
            }}
            value={companyInput.project_name || ""}
          />
          <TextField
            className={classes.addCompanyProjectFields}
            autoFocus
            margin="dense"
            id="outlined-multiline-static"
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 350 }}
            name="project_description"
            onChange={(e) => {
              setCompanyInput({
                ...companyInput,
                project_description: e.target.value,
              });
            }}
          />

          <Select
            className={classes.selectProjectType}
            closeMenuOnSelect={true}
            options={projectType}
            name="project_type"
            onChange={(e) => {
              setCompanyInput({ ...companyInput, project_type: e.label });
            }}
          />

          <Select
            className={classes.selectCompanySkills}
            fullWidth
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            isSearchable
            options={options}
            onChange={(e) => {
              var skillsSeparatedByCommas = Array.prototype.map
                .call(e, (s) => s.label)
                .toString(); // "A,B,C"

              setCompanyInput({
                ...companyInput,
                project_tech: skillsSeparatedByCommas,
              });
            }}
          />
          <TextField
            className={classes.addCompanyProjectFields}
            margin="dense"
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            label="Deadline"
            onChange={(e) => {
              setCompanyInput({
                ...companyInput,
                project_deadline: e.target.value,
              });
            }}
          />
          <FormControl
            component="fieldset"
            style={{
              width: "100%",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                control={<Checkbox style={{ color: "#C8102E" }} />}
                label={
                  <Typography style={{ fontSize: 15 }}>
                    Check if you want to publish this project
                  </Typography>
                }
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <ListItem>
          <Grid container id="buttons-container" justify="flex-end" spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </div>
    </div>
  );
}
