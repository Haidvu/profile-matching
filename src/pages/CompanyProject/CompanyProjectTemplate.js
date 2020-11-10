import React, { useState } from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Box, Avatar, List, ListItem, Divider, ListItemText, ListItemIcon, IconButton, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import makeAnimated from 'react-select/animated';


import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

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


// A list of projects and some description is needed here

const useStyles = makeStyles((theme) => ({
  main: {
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
    objectFit: "cover"
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
    color: theme.palette.secondary.main
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
    transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  sectionHeader: {
    fontWeight: "bold",
    color: "#606060",
  },
  sectionContent: {
    color: "#5B5B5B",
    display: 'inline',
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
    padding: "10px"
  },
  column: {
    flexBasis: '33.33%',
    padding: "15px"
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
    fontSize: "13px"
  },
  cardHeader: {
    fontSize: "20px"
  },
  chips: {
    margin: "5px"
  },
  deadline: {
    padding: "5px"
  },
  customTabRoot: {
    color: "#C8102E",
    backgroundColor: "white"
  },
  customTabIndicator: {

    backgroundColor: "#C8102E"
  },
  tabs: {
    marginTop: "15px",
    marginRight: "15px",
    marginLeft: "15px",

    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  active_tab: {
    color: "#C8102E",
  },
  default_tab: {
    color: "#000000",
  },
  textForm: {
    width: "100%"
  },
  tabsPanel: {
    backgroundColor: "#ffffff",
    marginRight: "15px",
    marginLeft: "15px",
    marginTop: "7px",

  }


}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}




export default function CompanyProject() {

  const classes = useStyles();

  const animatedComponents = makeAnimated();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //options of skills that will be sent to the select statement
  const options = [{ label: 'C++', value: 0 }, { label: 'Java', value: 1 }, { label: 'C#', value: 2 }, { label: 'React', value: 3 }]

  // Initial Info
  const [companyInfo, setCompanyInfo] = useState({ //This is the data
    company_project_description: 'Company project description will go here',
    company_project_name: 'Project 1',
    company_project_image: { AvatarImage },
    company_project_skill: [{ label: 'C++', value: 0 }, { label: 'Java', value: 1 }],
    company_project_deadline: 'Dec 15, 2022',
    company_project_team_capacity: '10',
    company_project_students_selected: [{ label: 'C++', value: 0 }, { label: 'Java', value: 1 }]
  })

  const [companyEdit, showCompanyEdit] = useState({ //This tells whether to show input fields. 
    company_project_description: false,
    company_project_name: false,
    company_project_image: false,
    company_project_skill: false,
    company_project_deadline: false,
    company_project_team_capacity: false,
    company_project_students_selected: false,
  });

  const [companyInput, setCompanyInput] = useState({ //This is the data
    company_project_description: 'Company project description will go here',
    company_project_name: 'Project 1',
    company_project_image: { AvatarImage },
    company_project_skill: [{ label: 'C++', value: 0 }, { label: 'Java', value: 1 }],
    company_project_deadline: 'Dec 15, 2022',
    company_project_team_capacity: '10',
    company_project_students_selected: [{ label: 'C++', value: 0 }, { label: 'Java', value: 1 }]
  })

  //opening the edit field
  const handleOpenEdit = (key) => {
    showCompanyEdit({
      ...companyEdit,
      [key]: true
    });
  }
  //closing the edit field
  const handleCloseEdit = (key) => {
    showCompanyEdit({
      ...companyEdit,
      [key]: false
    });
  }
  //saving the edited data
  const handleSave = (key) => { //Make api call to save data here. 
    setCompanyInfo(companyInput)
    //console.log(companyInput);
    handleCloseEdit(key);
  }
  //not saving the edited data if the user does not want to change
  const handleCancel = (key) => {
    setCompanyInput(companyInfo)
    handleCloseEdit(key);
  }



  return (
    <div className="root">
      <img alt="profile background" className={classes.profileLogo} src={ProfileLogo}></img>
      <Avatar alt="profile image" src={AvatarImage} className={classes.profileImage} />


      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" href="/" /*onClick={handleClick}*/>
          Home
      </Link>
        <Link color="inherit" href="/dashboard" /*onClick={handleClick}*/>
          Profile
      </Link>
        <Link color="inherit" href="/dashboard/projects" /*onClick={handleClick}*/>
          My Projects
      </Link>
        <Typography color="textPrimary">Projects 1</Typography>
      </Breadcrumbs>

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
                companyEdit.company_project_name === false ? (<Box
                  component="span"
                  variant="body2"
                  className={`${classes.inline} ${classes.sectionContent}`}
                  color="textPrimary"
                >
                  {companyInfo.company_project_name}
                </Box>) : (
                    <TextField className={classes.textForm} multiline={true} name="company_project_name" onChange={(e) => { setCompanyInput({ ...companyInput, company_project_name: e.target.value }) }} value={companyInput.company_project_name} />
                  )}
            />
            {companyEdit.company_project_name === false ? (
              <IconButton className={classes.icon} onClick={() => { handleOpenEdit('company_project_name') }}><EditTwoToneIcon /></IconButton>
            ) : (<>
              <IconButton className={classes.icon} onClick={() => { handleCancel('company_project_name') }}><ClearRoundedIcon /></IconButton>
              <IconButton className={classes.icon} onClick={() => { handleSave('company_project_name') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
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
                companyEdit.company_project_description === false ? (<Box
                  component="span"
                  variant="body2"
                  className={`${classes.inline} ${classes.sectionContent}`}
                  color="textPrimary"
                >
                  {companyInfo.company_project_description}
                </Box>) : (
                    <TextField className={classes.textForm} multiline={true} name="company_project_description" onChange={(e) => { setCompanyInput({ ...companyInput, company_project_description: e.target.value }) }} value={companyInput.company_project_description} />
                  )}
            />
            {companyEdit.company_project_description === false ? (
              <IconButton className={classes.icon} onClick={() => { handleOpenEdit('company_project_description') }}><EditTwoToneIcon /></IconButton>
            ) : (<>
              <IconButton className={classes.icon} onClick={() => { handleCancel('company_project_description') }}><ClearRoundedIcon /></IconButton>
              <IconButton className={classes.icon} onClick={() => { handleSave('company_project_description') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
            </>)}
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
                companyEdit.company_project_name === false ? (<Box
                  component="span"
                  variant="body2"
                  className={`${classes.inline} ${classes.sectionContent}`}
                  color="textPrimary"
                >
                  {companyInfo.company_project_name}
                </Box>) : (
                    <TextField className={classes.textForm} multiline={true} name="company_project_name" onChange={(e) => { setCompanyInput({ ...companyInput, company_project_name: e.target.value }) }} value={companyInput.company_project_name} />
                  )}
            />
            {companyEdit.company_project_name === false ? (
              <IconButton className={classes.icon} onClick={() => { handleOpenEdit('company_project_name') }}><EditTwoToneIcon /></IconButton>
            ) : (<>
              <IconButton className={classes.icon} onClick={() => { handleCancel('company_project_name') }}><ClearRoundedIcon /></IconButton>
              <IconButton className={classes.icon} onClick={() => { handleSave('company_project_name') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
            </>)}
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LaptopRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box component={'span'} className={classes.sectionHeader}>Skills</Box>
              }
              secondary={
                <Box
                  component={'span'}
                  variant="body2"
                  className={classes.sectionContent}
                  color="textPrimary"
                >
                  {companyEdit.company_project_skill === false ? (<Box
                    component="span"
                    variant="body2"
                    className={`${classes.skillsContainer}`}
                    color="textPrimary"
                  >
                    {companyInfo.company_project_skill.map((skill, index) => (
                      <Button key={skill.value} className={classes.skills} value={skill.name}>{skill.label}</Button>
                    ))}
                  </Box>) : (<Box>
                    <Select
                      AutoSize={true}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      defaultValue={companyInfo.company_project_skill}
                      isMulti
                      isSearchable
                      onChange={(e) => { setCompanyInput({ ...companyInput, company_project_skill: e }) }}
                      options={options}
                    />
                  </Box>)}
                </Box>
              }
            />
            {companyEdit.company_project_skill === false ? (
              <IconButton className={classes.icon} onClick={() => { handleOpenEdit('company_project_skill') }}>
                <EditTwoToneIcon />
              </IconButton>
            ) : (<>
              <IconButton className={classes.icon} onClick={() => { handleCancel('company_project_skill') }}>
                <ClearRoundedIcon />
              </IconButton>
              <IconButton className={classes.icon} onClick={() => { handleSave('company_project_skill') }}>
                <CheckRoundedIcon style={{ color: 'green' }} />
              </IconButton>
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
                companyEdit.company_project_deadline === false ? (<Box
                  component="span"
                  variant="body2"
                  className={`${classes.inline} ${classes.sectionContent}`}
                  color="textPrimary"
                >
                  {companyInfo.company_project_deadline}
                </Box>) : (
                    <TextField type="date" name="company_project_deadline" onChange={(e) => { setCompanyInput({ ...companyInput, company_project_deadline: e.target.value }) }} value={companyInput.company_project_deadline} />
                  )}
            />
            {companyEdit.company_project_deadline === false ? (
              <IconButton className={classes.icon} onClick={() => { handleOpenEdit('company_project_deadline') }}><EditTwoToneIcon /></IconButton>
            ) : (<>
              <IconButton className={classes.icon} onClick={() => { handleCancel('company_project_deadline') }}><ClearRoundedIcon /></IconButton>
              <IconButton className={classes.icon} onClick={() => { handleSave('company_project_deadline') }}><CheckRoundedIcon style={{ color: 'green' }} /></IconButton>
            </>)}
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
                  <div>1. Being responsible with the student(s) <br />
                            2. Provide specific requirements <br />
                            3. Follow up with the student every week <br />
                            4. ...
                                 </div>
                </Box>

              }
            />

          </ListItem>
        </List>
      </TabPanel>


    </div>
  );
};



