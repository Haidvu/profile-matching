import React, { useEffect, useState, useContext } from "react";
import CompanyDashboard from "../../assets/CompanyDashboard.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ListItem,
  FormHelperText,
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

import { DataContext } from "../../contexts/dataContext";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
  },
  profileLogo: {
    backgroundRepeat: "no-repeat",
    objectPosition: "10% 20%",
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
    width: "100%",
    zIndex: 1000,
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
  selectCompanySkills: {
    width: "100%",
    padding: "10px",
    zIndex: 100,
  },
  addCompanyProjectFields: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  error: {
    paddingLeft: "10px",
    paddingRight: "10px",
    fontSize: "15px",
  },
  labelAsterisk: {
    color: theme.palette.secondary.main,
  },
}));

export default function CompanyProjectCreate() {
  const classes = useStyles();

  const history = useHistory();

  const animatedComponents = makeAnimated();

  //api for select ProjectType
  const [projectType, setProjectType] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://18.213.74.196:8000/api/company_project/list_project_type",
        getConfig()
      )
      .then((res) => {
        
        const data = res.data.project_type.map((item, index) => {
          return { 
            label: item,
            value: index,
           };
        });

        setProjectType(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { data } = useContext(DataContext);
  const { profile } = data;

  const [companyInput, setCompanyInput] = useState({
    project_description: "",
    project_name: "",
    project_type: "",
    project_tech: "",
    project_deadline: "",
    is_published: false,
  });

  const [skills, setSkills] = useState({});

  const handleSave = (key) => {
    saveToDB(companyInput);
  };

  const [updateErrors, setUpdateErrors] = useState({
    project_description: null,
    project_name: null,
    project_type: null,
    project_tech: null,
    project_deadline: null,
  });

  const saveToDB = (values) => {
    const data = {
      project_description: values.project_description,
      project_name: values.project_name,
      project_type: values.project_type,
      project_tech: values.project_tech ? values.project_tech : "",
      project_deadline: values.project_deadline,
      is_published: values.is_published,
      username: profile.id,
    };

    axios
      .post(
        "http://18.213.74.196:8000/api/company_project/create",
        data,
        getConfig()
      )
      .then((res) => {
        history.push("/dashboard/projects");
      })
      .catch((err) => {
        setUpdateErrors(err.response.data);
      });
  };

  useEffect(() => {
    axios
      .get("http://18.213.74.196:8000/api/skill/", getConfig())
      .then((res) => {
        const data = res.data.map((skill) => {
          return { label: skill.skill_name, value: skill.id };
        });

        setSkills(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="root">
      <img
        alt="profile background"
        className={classes.profileLogo}
        src={CompanyDashboard}></img>

      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/dashboard">
          Profile
        </Link>
        <Link color="inherit" href="/dashboard/projects">
          My Projects
        </Link>
        <Typography style={{ color: "#c8102e" }}>Add New Project</Typography>
      </Breadcrumbs>

      <div>
        <Grid container>
          <Typography className={classes.addCompanyProjectFields}>
            <span className={classes.labelAsterisk}>*</span> - Required Fields
          </Typography>
          <TextField
            className={classes.addCompanyProjectFields}
            autoFocus
            required
            inputProps={{
              maxLength: 100,
            }}
            helperText={`${companyInput.project_name.length}/100`}
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
            InputLabelProps={{
              classes: {
                asterisk: classes.labelAsterisk,
              },
            }}
            value={companyInput.project_name || ""}
          />
          {updateErrors.project_name ? (
            <Typography className={classes.error} color="error">
              {updateErrors.project_name}
            </Typography>
          ) : null}

          <TextField
            className={classes.addCompanyProjectFields}
            autoFocus
            required
            inputProps={{
              maxLength: 3500,
            }}
            helperText={`${companyInput.project_description.length}/3500`}
            margin="dense"
            id="outlined-multiline-static"
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            fullWidth
            name="project_description"
            InputLabelProps={{
              classes: {
                asterisk: classes.labelAsterisk,
              },
            }}
            onChange={(e) => {
              setCompanyInput({
                ...companyInput,
                project_description: e.target.value,
              });
            }}
          />
          {updateErrors.project_description ? (
            <Typography className={classes.error} color="error">
              {updateErrors.project_description}
            </Typography>
          ) : null}

          <FormControl required className={classes.selectProjectType}>
            <FormHelperText>
              Project Type<span className={classes.labelAsterisk}>*</span>
            </FormHelperText>
            <Select
              //className={classes.selectProjectType}
              closeMenuOnSelect={true}
              label="Project Type"
              name="projectType"
              onChange={(e) => {
                setCompanyInput({ ...companyInput, project_type: e.label });
              }}
              {...console.log(projectType)}
              options={projectType}
            />
             
            {updateErrors.project_type ? (
              <Typography className={classes.error} color="error">
                {updateErrors.project_type}
              </Typography>
            ) : null}
          </FormControl>
          <FormControl required className={classes.selectCompanySkills}>
            <FormHelperText>
              Skills<span className={classes.labelAsterisk}>*</span>
            </FormHelperText>
            <Select
              //className={classes.selectCompanySkills}
              fullWidth
              closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti
              isSearchable
              options={skills}
              onChange={(e) => {
                e = e ? e : [];

                var skillsSeparatedByCommas = Array.prototype.map
                  .call(e, (s) => s.label)
                  .toString();

                setCompanyInput({
                  ...companyInput,
                  project_tech: skillsSeparatedByCommas,
                });
              }}
            />
            {updateErrors.project_tech ? (
              <Typography className={classes.error} color="error">
                {updateErrors.project_tech}
              </Typography>
            ) : null}
          </FormControl>

          <TextField
            className={classes.addCompanyProjectFields}
            required
            margin="dense"
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: classes.labelAsterisk,
              },
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
          {updateErrors.project_deadline ? (
            <Typography className={classes.error} color="error">
              {updateErrors.project_deadline}
            </Typography>
          ) : null}

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
                control={
                  <Checkbox
                    style={{ color: "#C8102E" }}
                    onChange={(e) => {
                      setCompanyInput({
                        ...companyInput,
                        is_published: e.target.checked,
                      });
                    }}
                  />
                }
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
