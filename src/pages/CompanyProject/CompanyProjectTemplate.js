import React, { useEffect, useState, useContext } from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import Spinner from "../../assets/Spinner.gif";

import { makeStyles } from "@material-ui/core/styles";
import { Input, FormControl, Checkbox, FormControlLabel, FormGroup, InputLabel, MenuItem, Grid, TextField, Box, Avatar, List, ListItem, Divider, ListItemText, ListItemIcon, IconButton, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import makeAnimated from 'react-select/animated';
import Chip from '@material-ui/core/Chip';


import axios from 'axios';
import { getConfig } from '../../authConfig';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';

import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import LaptopRoundedIcon from '@material-ui/icons/LaptopRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

import Select from 'react-select';

import { useHistory } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";


// A list of projects and some description is needed here

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
  },
  formControl: {
    width: "100%"
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

  // Elisa's styles
  breadcrumbs: {
    padding: "10px",
  },
  column: {
    flexBasis: "33.33%",
    padding: "15px",
  },
  companyProjectCards: {
    padding: "70px",
    // width: "100%"
  },
  root: {
    flexGrow: 1,
  },
  cardActionArea: {
    height: "230px",
    //overflow: "hidden"
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
    marginTop: "7px",

  },
  selectProjectType: {
    width: "30%",
    zIndex: 1000,
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",

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
        <Box >
          <Typography component={'span'}>{children}</Typography>
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

// Ask how to pass data here


// End of Asking



export default function CompanyProject({ match }) {

  // data Context

  const { data } = useContext(DataContext);

  const { profile } = data;

  const id = profile.id;


  const classes = useStyles();

  const animatedComponents = makeAnimated();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const projectType = [
    {
      value: '1',
      label: 'Cloud Development',
    },
    {
      value: '2',
      label: 'Frontend',
    },
    {
      value: '3',
      label: 'Backend',
    },
    {
      value: '4',
      label: 'Mobile Development',
    },
    {
      value: '5',
      label: 'Data Management',
    }
  ];

  //options of skills that will be sent to the select statement
  const options = [
    { label: "C++", value: 0 },
    { label: "Java", value: 1 },
    { label: "C#", value: 2 },
    { label: "React", value: 3 },
  ];

  //If project is a valid project show, if not then 404

  const [companyProjects, setCompanyProjects] = useState([]);

  const companyProject = companyProjects;

  const [isLoading, setIsLoading] = useState(false);



  //const currentProject = companyProjects.find((proj) => { return(proj.project_name===match.params.project)})


  // Initial Info
  const [companyInfo, setCompanyInfo] = useState({});


  // Skills Array

  const [skills, setSkills] = useState({});

  const [companyEdit, showCompanyEdit] = useState({ //This tells whether to show input fields. 
    project_description: false,
    project_name: false,
    project_type: false,
    project_deadline: false,
    project_tech: false,

    company_project_image: false,
    company_project_skill: false,
    company_project_team_capacity: false,
    company_project_students_selected: false,
  });

  const [companyInput, setCompanyInput] = useState({});

  //opening the edit field
  const handleOpenEdit = (key) => {

    showCompanyEdit({
      ...companyEdit,
      [key]: true,
    });

  }
  //closing the edit field
  const handleCloseEdit = (key) => {
    showCompanyEdit({
      ...companyEdit,
      [key]: false,
    });
  };
  //saving the edited data
  const handleSave = (key) => { //Make api call to save data here. 
    setCompanyInfo(companyInput)
    handleCloseEdit(key);
    console.log('Everything', companyInput);

    var skillsSeparatedByCommas = Array.prototype.map.call(companyInput.project_tech, s => s.label).toString(); // "A,B,C"

    const data = {
      project_name: companyInput.project_name,
      project_description: companyInput.project_description,
      project_type: companyInput.project_type,
      project_deadline: companyInput.project_deadline,
      project_tech: skillsSeparatedByCommas,
      is_published: companyInput.is_published,
      username: id
    };

    console.log("data to send", data);

    axios
      .put(
        "http://18.213.74.196:8000/api/company_project/" + match.params.project + "/update",
        data,
        getConfig()
      )
      .then((res) => {

      })
      .catch((err) => console.log(err.response.message));




  }
  //not saving the edited data if the user does not want to change
  const handleCancel = (key) => {
    setCompanyInput(companyInfo);
    handleCloseEdit(key);

  }

  useEffect(() => {
    setIsLoading(true);

    axios.get("http://18.213.74.196:8000/api/company_project/" + match.params.project,

      getConfig()).then(res => {

        setIsLoading(false);
        setCompanyInfo({
          project_name: res.data.project_name,
          project_description: res.data.project_description,
          project_type: res.data.project_type,
          project_deadline: res.data.project_deadline,
          project_tech: res.data.project_tech.split(',').map((skill, index) => {
            return { label: skill, value: index }
          }),
          is_published: res.data.is_published
        })
        setCompanyInput({
          project_name: res.data.project_name,
          project_description: res.data.project_description,
          project_type: res.data.project_type,
          project_deadline: res.data.project_deadline,
          project_tech: res.data.project_tech.split(',').map((skill, index) => {
            return { label: skill, value: index }
          }),
          is_published: res.data.is_published
        })

      })
      .catch(err => {
        console.log(err.response.data)
      });

    axios.get("http://18.213.74.196:8000/api/skill/",
      getConfig()).then(res => {

        const data = res.data.map((skill) => {
          return { label: skill.skill_name, value: skill.id }
        })

        setSkills(data)

      })
      .catch(err => {
        console.log(err.response.data)
      });

  }, [])

  return (
    <div className="root">

      <img alt="profile background" className={classes.profileLogo} src={ProfileLogo}></img>



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
        <Typography component={'span'} color="textPrimary">{companyInfo.project_name}</Typography>
      </Breadcrumbs>


      {isLoading ? (<>
        <div>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item md={4}>
              <Avatar src={Spinner} className={classes.spinner} />
            </Grid>
          </Grid>
        </div>
      </>) : (<>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            /*  indicatorColor="primary"
              textColor="primary"*/
            centered
            classes={{
              root: classes.customTabRoot,
              indicator: classes.customTabIndicator
            }}
            className={classes.tabs}
          >
            <Tab label="DESCRIPTION" icon={<StarsRoundedIcon />} {...a11yProps(0)} />
            <Tab label="DETAILS" icon={<WorkOutlineOutlinedIcon />} {...a11yProps(1)} />
            <Tab label="MY TEAM" icon={<AccountCircleRoundedIcon {...a11yProps(2)} />} />
            <Tab label="INFORMATION" icon={<HelpRoundedIcon />} {...a11yProps(3)} />

          </Tabs>
          <TabPanel className={classes.tabsPanel} value={value} index={0}>
            <List>





              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <BusinessCenterRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Project Name</Box>
                  }
                  secondary={
                    companyEdit.project_name === false ? (<Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary"
                    >
                      {companyInfo.project_name}
                    </Box>) : (
                        <TextField className={classes.textForm} multiline={true} name="project_name" onChange={(e) => { setCompanyInput({ ...companyInput, project_name: e.target.value }) }} value={companyInput.project_name} />
                      )}
                />
                {companyEdit.project_name === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('project_name') }}><EditTwoToneIcon /></IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('project_name') }}><ClearRoundedIcon /></IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('project_name') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
                </>)}
              </ListItem>





              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <SubjectRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Description</Box>
                  }
                  secondary={
                    companyEdit.project_description === false ? (<Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary"
                    >
                      {companyInfo.project_description}
                    </Box>) : (
                        <TextField className={classes.textForm} multiline={true} name="project_description" onChange={(e) => { setCompanyInput({ ...companyInput, project_description: e.target.value }) }} value={companyInput.project_description} />
                      )}
                />
                {companyEdit.project_description === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('project_description') }}><EditTwoToneIcon /></IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('project_description') }}><ClearRoundedIcon /></IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('project_description') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
                </>)}
              </ListItem>
              <Divider variant="inset" component="li" />        

              <ListItem alignItems="flex-start">
                <FormControl component="fieldset" style={{ width: '100%', paddingRight: '10px', paddingLeft: '10px' }}>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                     
                      control={<Checkbox checked={companyInput.is_published} value={companyInput.is_published} style={{ color: '#C8102E' }} onChange={(e) => {console.log('checked from db?', companyInput.is_published); console.log('checked?', e.target.checked); setCompanyInput({ ...companyInput, is_published: e.target.checked }); }} />}
                      label={<Typography style={{ fontSize: 15 }}>Check if you want to publish this project</Typography>}


                    />
                  </FormGroup>
                </FormControl>
              </ListItem>

            </List>
          </TabPanel>
          <TabPanel className={classes.tabsPanel} value={value} index={1}>
            <List>
              <ListItem alignItems="flex-start" /* Work on the upload part */>
                <ListItemIcon>
                  <ImageRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Cover Photo</Box>
                  }
                  secondary={
                    companyEdit.project_name === false ? (<Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary"
                    >
                      {companyInfo.project_name}
                    </Box>) : (
                        <TextField className={classes.textForm} multiline={true} name="project_name" onChange={(e) => { setCompanyInput({ ...companyInput, project_name: e.target.value }) }} value={companyInput.project_name} />
                      )}
                />
                {companyEdit.project_name === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('project_name') }}><EditTwoToneIcon /></IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('project_name') }}><ClearRoundedIcon /></IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('project_name') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
                </>)}
              </ListItem>

              <Divider variant="inset" component="li" />



              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <BusinessCenterRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Project Type</Box>
                  }
                  secondary={
                    companyEdit.project_type === false ? (<Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary"
                    >
                      {companyInfo.project_type}
                    </Box>) : (<>
                      <Select
                        className={classes.selectProjectType}
                        closeMenuOnSelect={true}
                        options={projectType}

                        name="project_type"
                        onChange={(e) => { setCompanyInput({ ...companyInput, project_type: e.label }) }}

                      />


                    </>)}
                />
                {companyEdit.project_type === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('project_type') }}><EditTwoToneIcon /></IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('project_type') }}><ClearRoundedIcon /></IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('project_type') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
                </>)}

              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <DateRangeRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Deadline</Box>
                  }
                  secondary={
                    companyEdit.project_deadline === false ? (<Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary"
                    >
                      {companyInfo.project_deadline}
                    </Box>) : (
                        <TextField type="date" name="project_deadline" onChange={(e) => { setCompanyInput({ ...companyInput, project_deadline: e.target.value }) }} value={companyInput.project_deadline} />
                      )}
                />
                {companyEdit.project_deadline === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('project_deadline') }}><EditTwoToneIcon /></IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('project_deadline') }}><ClearRoundedIcon /></IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('project_deadline') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
                </>)}
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <LaptopRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Skills</Box>
                  }
                />

                {companyEdit.project_tech === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('project_tech') }}>
                    <EditTwoToneIcon />
                  </IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('project_tech') }}>
                    <ClearRoundedIcon />
                  </IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('project_tech') }}>
                    <CheckRoundedIcon style={{ color: 'green' }} />
                  </IconButton>
                </>)}
              </ListItem>
              <ListItem alignItems="flex-start">
                {

                  companyEdit.project_tech === false ? (<Box
                    component="div"
                    variant="body2"
                    className={`${classes.inline} ${classes.sectionContent}`}
                    color="textPrimary"
                  >

                    { Object.keys(companyInput).length ?
                      (companyInput.project_tech.map((skill, index) =>
                        <Chip component={'span'} label={skill.label} className={classes.chips} key={index} />
                      )) : (<></>)
                    }

                  </Box>) : (

                      <Select
                        className={classes.selectCompanySkills}
                        fullWidth
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti
                        isSearchable
                        value={companyInput.project_tech}
                        options={skills}
                        onChange={(e) => {

                          console.log(e)
                          companyInput.project_tech.push(e)

                          setCompanyInput({ ...companyInput, project_tech: e })
                        }}
                      />



                    )}
              </ListItem>






            </List>
          </TabPanel>
          <TabPanel className={classes.tabsPanel} value={value} index={2}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <AccountCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Team Capacity</Box>
                  }
                  secondary={
                    companyEdit.company_project_team_capacity === false ? (<Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary"
                    >
                      {companyInfo.company_project_team_capacity}
                    </Box>) : (
                        <TextField className={classes.textForm} multiline={true} name="company_project_team_capacity" onChange={(e) => { setCompanyInput({ ...companyInput, company_project_team_capacity: e.target.value }) }} value={companyInput.company_project_team_capacity} />
                      )}
                />
                {companyEdit.company_project_team_capacity === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('company_project_team_capacity') }}><EditTwoToneIcon /></IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('company_project_team_capacity') }}><ClearRoundedIcon /></IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('company_project_team_capacity') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
                </>)}
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component={'span'} className={classes.sectionHeader}>Student(s) Selected</Box>
                  }
                  secondary={
                    companyEdit.company_project_team_capacity === false ? (<Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary"
                    >
                      {companyInfo.company_project_team_capacity}
                    </Box>) : (
                        <TextField className={classes.textForm} multiline={true} name="company_project_team_capacity" onChange={(e) => { setCompanyInput({ ...companyInput, company_project_team_capacity: e.target.value }) }} value={companyInput.company_project_team_capacity} />
                      )}
                />
                {companyEdit.company_project_team_capacity === false ? (
                  <IconButton className={classes.icon} onClick={() => { handleOpenEdit('company_project_team_capacity') }}><EditTwoToneIcon /></IconButton>
                ) : (<>
                  <IconButton className={classes.icon} onClick={() => { handleCancel('company_project_team_capacity') }}><ClearRoundedIcon /></IconButton>
                  <IconButton className={classes.icon} onClick={() => { handleSave('company_project_team_capacity') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
                </>)}
              </ListItem>
            </List>
          </TabPanel>
          <TabPanel className={classes.tabsPanel} value={value} index={3}>
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
          </TabPanel>
        </div>
      </>)}

    </div>
  );
}
