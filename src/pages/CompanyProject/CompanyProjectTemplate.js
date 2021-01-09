import React, { useEffect, useState, useContext } from "react";
import CompanyDashboard from "../../assets/CompanyDashboard.jpg";
import Spinner from "../../assets/Spinner.gif";

import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Box,
  Avatar,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { useHistory } from "react-router-dom";

import makeAnimated from "react-select/animated";
import Chip from "@material-ui/core/Chip";

import axios from "axios";
import { getConfig } from "../../authConfig";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
// import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

import BusinessCenterRoundedIcon from "@material-ui/icons/BusinessCenterRounded";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";
import LaptopRoundedIcon from "@material-ui/icons/LaptopRounded";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";

import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Select from "react-select";
import { DataContext } from "../../contexts/dataContext";

import CompanyProjectTeam from "./CompanyProjectTeam";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
  },
  formControl: {
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
    color: "rgba(0, 0, 0, 0.87)",
    border: "none",
    cursor: "default",
    height: "32px",
    display: "inline-flex",
    outline: "0",
    padding: "0",
    fontSize: "0.8125rem",
    boxSizing: "border-box",
    transition:
      "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    alignItems: "center",
    whiteSpace: "nowrap",
    borderRadius: "16px",
    verticalAlign: "middle",
    justifyContent: "center",
    textDecoration: "none",
    backgroundColor: "#e0e0e0",
    position: "relative",
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
    padding: "70px",
  },
  root: {
    flexGrow: 1,
  },
  cardActionArea: {
    height: "230px",
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
  customTabRoot: {
    color: "#C8102E",
    backgroundColor: "white",
  },
  customTabIndicator: {
    backgroundColor: "#C8102E",
  },
  tabs: {
    marginTop: "15px",
    marginRight: "15px",
    marginLeft: "15px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.down("xm")]: {
      maxWidth: "100%",
      width: "100%",
    },
  },
  active_tab: {
    color: "#C8102E",
  },
  default_tab: {
    color: "#000000",
  },
  textForm: {
    width: "100%",
  },
  tabsPanel: {
    backgroundColor: "#ffffff",
    marginRight: "15px",
    marginLeft: "15px",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "10px",
  },
  selectProjectType: {
    width: "100%",
    zIndex: 1000,
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
  error: {
    paddingLeft: "10px",
    paddingRight: "10px",
    fontSize: "15px",
  },
  selectCompanySkills: {
    width: "100%",
    padding: "10px",
    zIndex: 100,
  },
  tabsItem: {},
  iconList: {
    textAlign: "right",
  },
  divider: {
    listStyle: "none",
    margin: "10px",
  },
  information: {
    margin: "10px",
  },
  iconListGrid: {
    textAlign: "center",
  },
  deleteButton: {
    marginRight: theme.spacing(2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CompanyProject({ match }) {
  let history = useHistory();
  const { data } = useContext(DataContext);

  const { profile } = data;

  const id = profile.id;

  const classes = useStyles();

  const animatedComponents = makeAnimated();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //api for select ProjectType
  const [projectType, setProjectType] = useState({});
  useEffect(() => {
    axios
      .get(
        "http://18.213.74.196:8000/api/company_project/list_project_type",
        getConfig()
      )
      .then((res) => {
        const data = res.data.map((projType) => {
          return { label: projType.project_type };
        });

        setProjectType(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);

  // Initial Info
  const [projectInfo, setProjectInfo] = useState({});

  // Skills Array
  const [skills, setSkills] = useState({});

  const [projectEdit, showProjectEdit] = useState({
    project_description: false,
    project_name: false,
    project_type: false,
    project_deadline: false,
    project_tech: false,
    is_published: false,

    company_project_image: false,
    company_project_skill: false,
    company_project_team_capacity: false,
    company_project_students_selected: false,
  });

  const [projectInput, setProjectInput] = useState({});

  const [updateErrors, setUpdateErrors] = useState({
    project_description: null,
    project_name: null,
    project_type: null,
    project_tech: null,
    project_deadline: null,
  });

  //opening the edit field
  const handleOpenEdit = (key) => {
    showProjectEdit({
      ...projectEdit,
      [key]: true,
    });
  };
  //closing the edit field
  const handleCloseEdit = (key) => {
    showProjectEdit({
      ...projectEdit,
      [key]: false,
    });
  };

  const handleCloseUpdateSucess = () => {
    setUpdateSuccess(false);
  };
  const handleCloseUpdateFailed = () => {
    setUpdateFailed(false);
  };

  //Dialog to confirm the delete operation.
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    axios
      .delete(
        "http://18.213.74.196:8000/api/company_project/" +
          match.params.project +
          "/delete",
        getConfig()
      )
      .then((res) => {
        history.goBack();
      })
      .catch((err) => console.log(err.response.message));
    setOpenDeleteDialog(false);
  };

  //saving the edited data
  const handleSave = (key) => {
    //Make api call to save data here.
    setProjectInfo(projectInput);
    handleCloseEdit(key);

    const data = {
      project_name: projectInput.project_name,
      project_description: projectInput.project_description,
      project_type: projectInput.project_type,
      project_deadline: projectInput.project_deadline,
      project_tech: projectInput.project_tech
        ? Array.prototype.map
            .call(projectInput.project_tech, (s) => s.label)
            .toString()
        : "",
      is_published: projectInput.is_published,
      username: id,
    };

    axios
      .put(
        "http://18.213.74.196:8000/api/company_project/" +
          match.params.project +
          "/update",
        data,
        getConfig()
      )
      .then((res) => {
        setUpdateErrors({});
        showProjectEdit({
          ...projectEdit,
          [key]: false,
        });
        setUpdateSuccess(true);
      })
      .catch((err) => {
        setUpdateErrors(err.response.data);
        setUpdateFailed(true);
      });
  };

  //not saving the edited data if the user does not want to change
  const handleCancel = (key) => {
    setProjectInput(projectInfo);
    handleCloseEdit(key);
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        "http://18.213.74.196:8000/api/company_project/" + match.params.project,

        getConfig()
      )
      .then((res) => {
        setIsLoading(false);

        setProjectInfo({
          project_name: res.data.project_name,
          project_description: res.data.project_description,
          project_type: res.data.project_type,
          project_deadline: res.data.project_deadline,
          project_tech: res.data.project_tech.split(",").map((skill, index) => {
            return { label: skill, value: index };
          }),
          is_published: res.data.is_published,
        });
        setProjectInput({
          project_name: res.data.project_name,
          project_description: res.data.project_description,
          project_type: res.data.project_type,
          project_deadline: res.data.project_deadline,
          project_tech: res.data.project_tech.split(",").map((skill, index) => {
            return { label: skill, value: index };
          }),
          is_published: res.data.is_published,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .get("http://18.213.74.196:8000/api/skill/", getConfig())
      .then((res) => {
        const data = res.data.map((skill) => {
          return {
            label: skill.skill_name,
            value: skill.id,
          };
        });

        setSkills(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [match.params.id, match.params.project]);

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
        <Typography
          component={"span"}
          style={{ color: "#c8102e" }}
          color="textPrimary">
          {projectInfo.project_name}
        </Typography>
      </Breadcrumbs>

      {isLoading ? (
        <>
          <div>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="row">
              <Grid item md={4}>
                <Avatar src={Spinner} className={classes.spinner} />
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <>
          <Grid container justify="flex-end">
            <Button
              className={classes.deleteButton}
              variant="contained"
              onClick={handleOpenDeleteDialog}
              color="secondary">
              <DeleteIcon />
              Delete
            </Button>
          </Grid>
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              classes={{
                root: classes.customTabRoot,
                indicator: classes.customTabIndicator,
              }}
              className={classes.tabs}>
              <Tab
                className={classes.tabsItem}
                label="DESCRIPTION"
                icon={<StarsRoundedIcon />}
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tabsItem}
                label="DETAILS"
                icon={<WorkOutlineOutlinedIcon />}
                {...a11yProps(1)}
              />
              <Tab
                className={classes.tabsItem}
                label="MY TEAM"
                icon={<AccountCircleRoundedIcon {...a11yProps(2)} />}
              />
              {/* <Tab className={classes.tabsItem} label="INFORMATION" icon={<HelpRoundedIcon />} {...a11yProps(3)} /> */}
            </Tabs>
            <TabPanel className={classes.tabsPanel} value={value} index={0}>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={1} className={classes.iconList}>
                  <BusinessCenterRoundedIcon />
                </Grid>
                <Grid item xs={9}>
                  <Box component={"span"} className={classes.sectionHeader}>
                    Project Name
                  </Box>
                  {projectEdit.project_name === false ? (
                    <Box
                      component="div"
                      variant="body2"
                      className={classes.information}
                      color="textPrimary">
                      {projectInfo.project_name}

                      {updateErrors.project_name ? (
                        <Typography className={classes.error} color="error">
                          {updateErrors.project_name} Project not saved. Please
                          fix all errors before saving.
                        </Typography>
                      ) : null}
                    </Box>
                  ) : (
                    <TextField
                      className={`${classes.textForm} ${classes.information}`}
                      multiline={true}
                      name="project_name"
                      inputProps={{
                        maxLength: 100,
                      }}
                      helperText={`${projectInput.project_name.length}/100`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSave("project_name");
                        }
                      }}
                      onChange={(e) => {
                        setProjectInput({
                          ...projectInput,
                          project_name: e.target.value,
                        });
                      }}
                      value={projectInput.project_name}
                    />
                  )}
                </Grid>
                <Grid item xs={2} className={classes.iconListGrid}>
                  {projectEdit.project_name === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("project_name");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleCancel("project_name");
                            }}>
                            <ClearRoundedIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleSave("project_name");
                            }}>
                            <CheckRoundedIcon style={{ color: "green" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Divider
                variant="inset"
                component="li"
                className={classes.divider}
              />

              <Grid container direction="row" spacing={3}>
                <Grid item xs={1} className={classes.iconList}>
                  <SubjectRoundedIcon />
                </Grid>
                <Grid item xs={9}>
                  <Box component={"span"} className={classes.sectionHeader}>
                    Description
                  </Box>
                  {projectEdit.project_description === false ? (
                    <Box
                      component="div"
                      variant="body2"
                      className={classes.information}
                      color="textPrimary">
                      {projectInfo.project_description}

                      {updateErrors.project_description ? (
                        <Typography className={classes.error} color="error">
                          {updateErrors.project_description} Project not saved.
                          Please fix all errors before saving.
                        </Typography>
                      ) : null}
                    </Box>
                  ) : (
                    <TextField
                      className={`${classes.textForm} ${classes.information}`}
                      multiline={true}
                      name="project_description"
                      inputProps={{
                        maxLength: 500,
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSave("project_description");
                        }
                      }}
                      helperText={`${projectInput.project_description.length}/500`}
                      onChange={(e) => {
                        setProjectInput({
                          ...projectInput,
                          project_description: e.target.value,
                        });
                      }}
                      value={projectInput.project_description}
                    />
                  )}
                </Grid>
                <Grid item xs={2} className={classes.iconListGrid}>
                  {projectEdit.project_description === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("project_description");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleCancel("project_description");
                            }}>
                            <ClearRoundedIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleSave("project_description");
                            }}>
                            <CheckRoundedIcon style={{ color: "green" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Divider
                variant="inset"
                component="li"
                className={classes.divider}
              />

              <Grid container direction="row" spacing={3}>
                <Grid item xs={1} className={classes.iconList}>
                  {projectInfo.is_published === true ? (
                    <>
                      <VisibilityIcon />
                    </>
                  ) : (
                    <>
                      <VisibilityOffIcon />
                    </>
                  )}
                </Grid>
                <Grid item xs={9}>
                  <Box component={"span"} className={classes.sectionHeader}>
                    Visibility
                  </Box>
                  {projectEdit.is_published === false ? (
                    <Box
                      component="div"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary">
                      {projectInfo.is_published === true ? (
                        <>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                            className={classes.information}>
                            PUBLIC
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                            className={classes.deadline}>
                            DRAFT
                          </Typography>
                        </>
                      )}
                    </Box>
                  ) : (
                    <FormControl
                      component="fieldset"
                      style={{
                        width: "100%",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={projectInput.is_published || false}
                              value={projectInfo.is_published}
                              style={{ color: "#C8102E" }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleSave("is_published");
                                }
                              }}
                              onChange={(e) => {
                                setProjectInput({
                                  ...projectInput,
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
                  )}
                </Grid>
                <Grid item xs={2} className={classes.iconListGrid}>
                  {projectEdit.is_published === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("is_published");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleCancel("is_published");
                            }}>
                            <ClearRoundedIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleSave("is_published");
                            }}>
                            <CheckRoundedIcon style={{ color: "green" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel className={classes.tabsPanel} value={value} index={1}>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={1} className={classes.iconList}>
                  <BusinessCenterRoundedIcon />
                </Grid>
                <Grid item xs={9}>
                  <Box component={"span"} className={classes.sectionHeader}>
                    Project Type
                  </Box>
                  {projectEdit.project_type === false ? (
                    <Box
                      component="div"
                      variant="body2"
                      className={classes.information}
                      color="textPrimary">
                      {projectInfo.project_type}
                    </Box>
                  ) : (
                    <>
                      <Select
                        className={`${classes.selectProjectType} ${classes.information}`}
                        closeMenuOnSelect={true}
                        options={projectType}
                        value={{
                          label: projectInput.project_type,
                          value: projectInput.project_type,
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSave("project_type");
                          }
                        }}
                        name="project_type"
                        onChange={(e) => {
                          setProjectInput({
                            ...projectInput,
                            project_type: e.label,
                          });
                        }}
                      />
                    </>
                  )}
                </Grid>
                <Grid item xs={2} className={classes.iconListGrid}>
                  {projectEdit.project_type === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("project_type");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleCancel("project_type");
                            }}>
                            <ClearRoundedIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleSave("project_type");
                            }}>
                            <CheckRoundedIcon style={{ color: "green" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Divider
                variant="inset"
                component="li"
                className={classes.divider}
              />

              <Grid container direction="row" spacing={3}>
                <Grid item xs={1} className={classes.iconList}>
                  <DateRangeRoundedIcon />
                </Grid>
                <Grid item xs={9}>
                  <Box component={"span"} className={classes.sectionHeader}>
                    Deadline
                  </Box>
                  {projectEdit.project_deadline === false ? (
                    <Box
                      component="div"
                      variant="body2"
                      className={classes.information}
                      color="textPrimary">
                      {projectInfo.project_deadline}
                    </Box>
                  ) : (
                    <TextField
                      className={`${classes.textForm} ${classes.information}`}
                      type="date"
                      name="project_deadline"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSave("project_deadline");
                        }
                      }}
                      onChange={(e) => {
                        setProjectInput({
                          ...projectInput,
                          project_deadline: e.target.value,
                        });
                      }}
                      value={projectInput.project_deadline}
                    />
                  )}
                </Grid>
                <Grid item xs={2} className={classes.iconListGrid}>
                  {projectEdit.project_deadline === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("project_deadline");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleCancel("project_deadline");
                            }}>
                            <ClearRoundedIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleSave("project_deadline");
                            }}>
                            <CheckRoundedIcon style={{ color: "green" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Divider
                variant="inset"
                component="li"
                className={classes.divider}
              />

              <Grid container direction="row" spacing={3}>
                <Grid item xs={1} className={classes.iconList}>
                  <LaptopRoundedIcon />
                </Grid>
                <Grid item xs={9}>
                  <Box component={"span"} className={classes.sectionHeader}>
                    Skills
                  </Box>
                  {
                    <>
                      {projectEdit.project_tech === false ? (
                        <Box
                          component="div"
                          variant="body2"
                          className={classes.information}
                          color="textPrimary">
                          {Object.keys(projectInput).length &&
                          projectInput.project_tech ? (
                            projectInput.project_tech.map((skill, index) => (
                              <Chip
                                component={"span"}
                                label={skill.label}
                                className={classes.chips}
                                key={index}
                              />
                            ))
                          ) : (
                            <></>
                          )}
                        </Box>
                      ) : (
                        <Select
                          className={classes.selectCompanySkills}
                          fullWidth
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          isMulti
                          isSearchable
                          // If filtering by object, the default value has to be the same object as the options, not a copy
                          value={skills.filter((el) => {
                            return projectInput.project_tech.some((f) => {
                              return f.label === el.label;
                            });
                          })}
                          options={skills}
                          onChange={(e) => {
                            e = e ? e : [];

                            setProjectInput({
                              ...projectInput,
                              project_tech: e,
                            });
                          }}
                        />
                      )}

                      {updateErrors.project_tech ? (
                        <Typography className={classes.error} color="error">
                          {updateErrors.project_tech} Project "
                          {projectInfo.project_name}" not saved. Please fix all
                          errors before saving.
                        </Typography>
                      ) : null}
                    </>
                  }
                </Grid>
                <Grid item xs={2} className={classes.iconListGrid}>
                  {projectEdit.project_tech === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("project_tech");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleCancel("project_tech");
                            }}>
                            <ClearRoundedIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            className={classes.icon}
                            onClick={() => {
                              handleSave("project_tech");
                            }}>
                            <CheckRoundedIcon style={{ color: "green" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel className={classes.tabsPanel} value={value} index={2}>
              <List>
                {/* Comment out team capacity for now */}
                {/* <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <AccountCircleRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box component={"span"} className={classes.sectionHeader}>
                        Team Capacity
                      </Box>
                    }
                    secondary={
                      projectEdit.company_project_team_capacity === false ? (
                        <Box
                          component="span"
                          variant="body2"
                          className={`${classes.inline} ${classes.sectionContent}`}
                          color="textPrimary">
                          {projectInfo.company_project_team_capacity}
                        </Box>
                      ) : (
                        <TextField
                          className={classes.textForm}
                          multiline={true}
                          name="company_project_team_capacity"
                          onChange={(e) => {
                            setProjectInput({
                              ...projectInput,
                              company_project_team_capacity: e.target.value,
                            });
                          }}
                          value={projectInput.company_project_team_capacity}
                        />
                      )
                    }
                  />
                  {projectEdit.company_project_team_capacity === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("company_project_team_capacity");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleCancel("company_project_team_capacity");
                        }}>
                        <ClearRoundedIcon />
                      </IconButton>
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleSave("company_project_team_capacity");
                        }}>
                        <CheckRoundedIcon style={{ color: "green" }} />
                      </IconButton>
                    </>
                  )}
                </ListItem> */}
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box component={"span"} className={classes.sectionHeader}>
                        Student(s) Selected
                      </Box>
                    }
                    // secondary={
                    //   projectEdit.company_project_team_capacity === false ? (
                    //     <Box
                    //       component="span"
                    //       variant="body2"
                    //       className={`${classes.inline} ${classes.sectionContent}`}
                    //       color="textPrimary">
                    //       {projectInfo.company_project_team_capacity}
                    //     </Box>
                    //   ) : (
                    //     <TextField
                    //       className={classes.textForm}
                    //       multiline={true}
                    //       name="company_project_team_capacity"
                    //       onChange={(e) => {
                    //         setProjectInput({
                    //           ...projectInput,
                    //           company_project_team_capacity: e.target.value,
                    //         });
                    //       }}
                    //       value={projectInput.company_project_team_capacity}
                    //     />
                    //   )
                    // }
                  />
                  {/* {projectEdit.company_project_team_capacity === false ? (
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        handleOpenEdit("company_project_team_capacity");
                      }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleCancel("company_project_team_capacity");
                        }}>
                        <ClearRoundedIcon />
                      </IconButton>
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleSave("company_project_team_capacity");
                        }}>
                        <CheckRoundedIcon style={{ color: "green" }} />
                      </IconButton>
                    </>
                  )} */}
                </ListItem>
                <ListItem alignItems="flex-start">
                  <CompanyProjectTeam id={match.params.project} />
                </ListItem>
              </List>
            </TabPanel>
            {/* <TabPanel className={classes.tabsPanel} value={value} index={3}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <SubjectRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Information</Box>
                  }
                  secondary={
                    <Box component={'span'}>
                      <span>1. Being responsible with the student(s) <br />
                            2. Provide specific requirements <br />
                            3. Follow up with the student every week <br />
                            4. ...
                      </span>
                    </Box>
                  }
                />
              </ListItem> 
            </List>
          </TabPanel>*/}
          </div>
          <Dialog
            onClose={handleCloseDeleteDialog}
            open={openDeleteDialog}
            className={classes.dialog}>
            <DialogTitle>
              Are you sure you want to delete the project:{" "}
              {projectInfo.project_name}?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                This project will be permanently removed
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogConfirm}>
              <Button
                onClick={handleDelete}
                color="primary"
                variant="outlined"
                className={classes.dialogConfirm}>
                DELETE
              </Button>
              <Button
                onClick={handleCloseDeleteDialog}
                color="secondary"
                variant="outlined"
                className={classes.dialogConfirm}>
                CANCEL
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      <Snackbar
        open={updateSuccess}
        autoHideDuration={6000}
        onClose={handleCloseUpdateSucess}>
        <Alert onClose={handleCloseUpdateSucess} severity="success">
          Project {projectInfo.project_name} was saved!
        </Alert>
      </Snackbar>
      <Snackbar
        open={updateFailed}
        autoHideDuration={6000}
        onClose={handleCloseUpdateFailed}>
        <Alert onClose={handleCloseUpdateFailed} severity="error">
          There was a problem when saving the project. Please fix all errors
          before saving.
        </Alert>
      </Snackbar>
    </div>
  );
}
