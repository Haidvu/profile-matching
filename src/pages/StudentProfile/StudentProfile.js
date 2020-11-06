import React, {useState,useContext, useEffect} from "react";
import StudentProject from "../../components/StudentProject/StudentProject";
import StudentProjectTimeline from "../../components/StudentProject/StudentProjectTimeline";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {TextField,Box,Dialog,DialogTitle, DialogActions,DialogContent,Avatar,List,ListItem, Divider, ListItemText, ListItemIcon,IconButton, Button } from "@material-ui/core";
import FormatListBulletedTwoToneIcon from '@material-ui/icons/FormatListBulletedTwoTone';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import StarsIcon from '@material-ui/icons/Stars';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import { DataContext } from "../../contexts/dataContext";
import { getConfig } from "../../authConfig";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  dialogInput: {
    paddingBottom: theme.spacing(2),
  },
  loginAlert: {
    marginBottom: theme.spacing(2),
  },
  dialogConfirm: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  profileLogo:{
    backgroundRepeat: "no-repeat",
    position:"relative",
    objectPosition:"20% 30%",
    width: "100vw",
    height: "15vw",
    maxWidth: "100%",
    zIndex:1,
    objectFit:"cover"
  },
  icon:{
    objectFit: "contain",
    position:"relative",
    width:"5%",
    color:theme.palette.secondary.main
  },
  skills:{
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    color:"#5B5B5B",
    padding:"1%",
    width:"5%"
  },
  skillsContainer:{
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  sectionHeader:{
    fontWeight: "bold",
    color:"#606060",
  },
  sectionContent:{
    color:"#5B5B5B",
    display: 'inline',
  },
  profileImage: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    position: "absolute",
    top: "15%",
    right: "4%",
    zIndex:1,
    objectFit:"contain",
  },
  major:{
    width:"30vh",
    fontSize:"small",
    background:"white",
  },
  degree:{
    width:"30vh",
    fontSize:"small",
    background:"white",
  },
  myProjects: {
    fontWeight: "bold",
    color:"#606060",
    padding: '0 auto',
  }
}));

export default function StudentProfile (){
  //initially get the data from DataContext
  const { data, dispatch } = useContext(DataContext);
  const { profile } = data;
 //this is the animated component for the react-select library
  const animatedComponents = makeAnimated();
 //this is the for the stylings of the page
  const classes = useStyles();
  //options of skills that will be sent to the select statement
  const options = [{label:'C++', value:0}, {label:'Java', value:1}, {label:'C#', value:2}]
  const list = [{label:'C++', value:0}, {label:'Java', value:1}]
  //this is the original data retrieved from the api
  const [studentInfo, setStudentInfo] = useState({ //This is the data from api
    student_id: null,
    full_name: null,
    date_of_birth: null,
    graduation_date: null,
    major: null,
    degree: null,
    student_skill: null,
    student_description: null,
  })
  //this is the booleans for opening or closing edit fields
  const [studentEdit, showStudentEdit] = useState({ //This tells whether to show input fields. 
    studentEditBool: false,
  });
  //this is the copy of the original data that will be manipulated
  const [studentInput, setStudentInput] = useState({ //This is the data
    student_id: null,
    full_name: null,
    date_of_birth: null,
    graduation_date: null,
    major: null,
    degree: null,
    student_skill: null,
    student_description: null,
  })
  useEffect(() => {
    if (Object.entries(profile).length !== 0) {
      //continue only if after you fetch the data.
      setStudentInfo(profile);
      setStudentInput(profile);
    }
  }, [profile]);

  //opening the edit field
  const handleOpenEdit = (key) => {
  showStudentEdit({
      ...studentEdit,
      [key]: true
      });
  }
  //closing the edit field
  const handleCloseEdit = (key) => {
  showStudentEdit({
      ...studentEdit,
      [key]: false
    });
  }
  //saving the edited data
  const handleSave = () => { //Make api call to save data. 
    setStudentInfo(studentInput)
    handleCloseEdit("studentEditBool");
    setDialogOpen(true);
  }
  //not saving the edited data if the user does not want to change
  const handleCancel = () =>{
    setStudentInput(studentInfo)
    handleCloseEdit("studentEditBool");
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleDialogClose = () => {
    setEmail("");
    setPassword("");
    setDialogOpen(false);
  };

  const [authError, setAuthError] = useState("");

  const handleConfirm = () => {
    axios
      .post("http://18.213.74.196:8000/api/token/", {
        email: email,
        password: password,
      })
      .then((res) => {
        //first remove local storage
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("role_id", res.data.role_id);
        localStorage.setItem("email_id", res.data.email_id);
        localStorage.setItem("slug", res.data.slug);
        let slug = res.data.slug;
        axios
          .put(
            `http://18.213.74.196:8000/api/student_profile/${slug}/update`,
            {
              username: localStorage.getItem("email_id"),
              full_name: studentInfo.full_name,
              date_of_birth: studentInfo.date_of_birth,
              graduation_date: studentInfo.graduation_date,
              major: studentInfo.major,
              degree: studentInfo.degree,
              student_skill: studentInfo.student_skill,
              student_description: studentInfo.student_description,
            },
            getConfig()
          )
          .then((res) => {
            dispatch({ type: "UPDATE_PROFILE", payload: res.data });
            console.log("Update Successful");
            axios
            .post("http://18.213.74.196:8000/api/token/", {
              email: email,
              password: password,
            })
            .then((res)=>{
              console.log("Login Again Successful");
              localStorage.setItem("token", res.data.access);
              localStorage.setItem("role_id", res.data.role_id);
              localStorage.setItem("email_id", res.data.email_id);
              localStorage.setItem("slug", res.data.slug);
              setEmail(null);
              setPassword(null);
            })
            setDialogOpen(false);
            showStudentEdit(false);
            handleCloseEdit("studentEditBool");
          })
          .catch((err) => {
            setDialogOpen(false);
          });
      })
      .catch((err) => {
        setAuthError(
          err.response.data.detail +
            ". Make sure your email and password is correct."
        );
      });
  };

  return (
    <div>
      <img alt="profile background" className={classes.profileLogo} src={ProfileLogo}></img>
      <Avatar alt="profile image" src={AvatarImage} className={classes.profileImage}/>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <FormatListBulletedTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box component={'span'} className={classes.sectionHeader}>Student Description</Box>
            }
            secondary={ 
              studentEdit.studentEditBool === false ? (<Box
              component="span"
              variant="body2"
              className={`${classes.inline} ${classes.sectionContent}`}
              color="textPrimary"
            >
              {studentInfo.student_description}
            </Box>): (
              <TextField multiline={true} name="student_description" onChange={(e)=>{setStudentInput({...studentInput,student_description:e.target.value})}} value={studentInput.student_description} />
            )}
          />
          { studentEdit.studentEditBool === false ? (
              <IconButton className={classes.icon} onClick={() => {handleOpenEdit('studentEditBool')}}><EditTwoToneIcon/></IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCancel()}}><ClearRoundedIcon/></IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave()}}><CheckRoundedIcon style={{ color: 'green'}}/></IconButton>
            </>)}
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <SchoolRoundedIcon/>
          </ListItemIcon>
          <ListItemText
             primary={
                <Box component={'span'} className={classes.sectionHeader}>Academic</Box>
            }
            secondary={
              <React.Fragment>
                    <Box
                      component={'span'}
                      variant="body2"
                      color="textPrimary"
                      className={classes.sectionContent}
                    >
                      Graduation Date : &nbsp;
                    </Box>{ 
                    studentEdit.studentEditBool === false ? (<Box
                    component={'span'}
                    variant="body2"
                    className={`${classes.inline} ${classes.sectionContent}`}
                    color="textPrimary"
                  >
                    {studentInfo.graduation_date}
                  </Box>): (
                      <TextField type="date" name="graduation_date" onChange={(e)=>{setStudentInput({...studentInput,graduation_date:e.target.value})}} value={studentInput.graduation_date} />
                  )}
                     <br/>
                    {studentEdit.studentEditBool === false ?
                    (<Box
                      component={'span'}
                      variant="body2"
                      color="textPrimary"
                      className={classes.sectionContent}
                    > 
                    {studentInfo.degree} :
                    </Box>): (
                     <select name="degree" className={classes.degree} value={studentInput.degree} onChange={(e)=>{setStudentInput({...studentInput,degree:e.target.value})}}>
                       <option value="Bachelor">Bachelor</option>
                       <option value="Master">Master</option>
                     </select>
                    )}
                    {studentEdit.studentEditBool === false ? (<Box
                    component="span"
                    variant="body2"
                    className={`${classes.sectionContent}`}
                    color="textPrimary"
                  > {studentInfo.major}
                  </Box>): (
                  <select name="major" className={classes.major} value={studentInput.major} onChange={(e)=>{setStudentInput({...studentInput,major:e.target.value})}}>  
                      <optgroup label="Gerald D. Hines College of Architecture and Design">
                        <option value="Architecture">Architecture</option>
                        <option value="Environmental_Design">Environmental Design</option>
                        <option value="Industrial_Design">Industrial Design</option>
                        <option value="Interior_Architecture">Interior Architecture</option>
                      </optgroup>
                      <optgroup label="Kathrine G. McGovern College of the Arts">
                        <option value="Applied_Music">Applied Music</option>
                        <option value="Art">Art</option>
                        <option value="Art_History">Art History</option>
                        <option value="Dance">Dance</option>
                        <option value="Graphic_Design">Graphic Design</option>
                        <option value="Music">Music</option>
                        <option value="Painting">Painting</option>
                        <option value="Photography">Photography/Digital Media</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Theatre">Theatre</option>
                    </optgroup>
                      <optgroup label="C. T. Bauer College of Business">
                        <option value="Accounting">Accounting</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                        <option value="Finance">Finance</option>
                        <option value="Management">Management</option>
                        <option value="Management_Information_Systems">Management Information Systems</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Suppy_Chain_Management">Suppy Chain Management</option>
                    </optgroup>
                      <optgroup label="College of Education">
                          <option value="Health">Health</option>
                          <option value="Human_Development_and_Family_Studies">Human Development and Family Studies</option>
                          <option value="Teaching_and_Learning">Teaching and Learning</option>
                      </optgroup>
                      <optgroup label="Cullen College of Engineering">
                        <option value="Biomedical_Engineering">Biomedical Engineering</option>

                        <option value="Chemical_Engineering">Chemical Engineering</option>

                        <option value="Civil_Engineering">Civil Engineering</option>

                        <option value="Computer_Engineering">Computer Engineering</option>

                        <option value="Computer_Engineering_and_Analytics">Computer Engineering and Analytics</option>
                        <option value="Construction_Engineering">Construction Engineering</option>
                        <option value="Electrical_Engineering">Electrical Engineering</option>
                        <option value="Industrial_Engineering">Industrial Engineering</option>
                        <option value="Mechanical_Engineering">Mechanical Engineering</option>
                        <option value="Petroleum_Engineering">Petroleum Engineering</option>
                        <option value="Systems_Engineering">Systems Engineering</option>
                    </optgroup>
                      <optgroup label="Conrad N. Hilton College of Hotel and Restaurant Management">

                        <option value="Hotel_and_Restaurant_Management">Hotel and Restaurant Management</option>
                    </optgroup>
                      <optgroup label="College of Liberal Arts and Social Sciences">

                        <option value="African_American_Studies">African American Studies</option>
                        <option value="American_Sign_Language_Interpreting">American Sign Language Interpreting</option>
                        <option value="Anthropology">Anthropology</option>
                        <option value="Chinese_Studies">Chinese Studies</option>
                        <option value="Communication_Sciences_and_Disorders">Communication Sciences and Disorders</option>
                        <option value="Communication_Studies">Communication Studies</option>
                        <option value="Economics">Economics</option>
                        <option value="English">English</option>
                        <option value="Exercise_Science">Exercise Science</option>
                        <option value="Fitness_and_Sports">Fitness and Sports</option>

                        <option value="French">French</option>
                        <option value="Health_Communication">Health Communication</option>
                        <option value="History">History</option>
                        <option value="Human_Nutrition_and_Foods">Human Nutrition and Foods</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Liberal_Studies">Liberal Studies</option>
                        <option value="Media_Production">Media Production</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Political Science">Political Science</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Religious_Studies">Religious Studies</option>
                        <option value="Sociology">Sociology</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Sports_Administration">Sports Administration</option>
                        <option value="Strategic_Communication">Strategic Communication</option>

                        <option value="Women’s,_Gender,_and_Sexuality_Studies">Women’s, Gender, and Sexuality Studies</option>
                        <option value="World_Cultures_and_Literatures">World Cultures and Literatures</option>
                    </optgroup>
                      <optgroup label="College of Natural Sciences and Mathematics">

                        <option value="Biochemical_and_Biophysical_Sciences">Biochemical and Biophysical Sciences</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Computer_Science">Computer Science</option>
                        <option value="Earth_Science">Earth Science</option>
                        <option value="Environmental_Sciences">Environmental Sciences</option>
                        <option value="Geology">Geology</option>
                        <option value="Geophysics">Geophysics</option>
                        <option value="Honors_Biomedical_Sciences">Honors Biomedical Sciences</option>
                        <option value="Mathematical_Biology">Mathematical Biology</option>
                        <option value="Mathematics">Mathematics</option>

                        <option value="Physics">Physics</option>
                    </optgroup>
                      <optgroup label="College of Nursing">

                        <option value="Pre-Nursing">Pre-Nursing</option>
                        <option value="Nursing,_BSN_(RN-BSN)">Nursing, BSN (RN-BSN)</option>
                        <option value="Nursing,_BSN_(Second_Degree)">Nursing, BSN (Second Degree)</option>
                    </optgroup>
                      <optgroup label="College of Technology">

                        <option value="Biotechnology">Biotechnology</option>
                      
                        <option value="Computer_Engineering_Technology">Computer Engineering Technology</option>
                        <option value="Computer_Information_Systems">Computer Information Systems</option>
                        <option value="Construction_Management">Construction Management</option>
                        <option value="Digital_Media">Digital Media</option>
                        <option value="Electrical_Power_Engineering_Technology">Electrical Power Engineering Technology</option>
                        <option value="Human_Resources_Development">Human Resources Development</option>
                        <option value="Mechanical_Engineering_Technology">Mechanical Engineering Technology</option>
                        <option value="Retailing_and_Consumer_Science">Retailing and Consumer Science </option>
                        <option value="Supply_Chain_and_Logistics_Technology">Supply Chain and Logistics Technology</option>
                        <option value="Technology_Leadership_and_Innovation_Management ">Technology Leadership and Innovation Management </option>
                    </optgroup>
                      <optgroup label="Pre-Professional Tracks">
                        
                          <option value="Pre-Dentistry">Pre-Dentistry</option>
                          <option value="Pre-Law">Pre-Law</option>
                          <option value="Pre-Medicine">Pre-Medicine</option>
                          <option value="Pre-Optometry">Pre-Optometry</option>
                          <option value="Pre-Pharmacy">Pre-Pharmacy</option>
                          <option value="Pre-Physical_Therapy">Pre-Physical Therapy</option>
                          <option value="Pre-Veterinary_Medicine">Pre-Veterinary Medicine</option>
                      </optgroup>
                  </select>
                  )}
              </React.Fragment>
            }
          />            
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <StarsIcon/>
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
                {studentEdit.studentEditBool === false ? (<Box
                  component="span"
                  variant="body2"
                  className={`${classes.skillsContainer}`}
                  color="textPrimary"
                >
                  {list.map((skill, index) => (
                    <Button key={skill.value} className={classes.skills} value={skill.name}>{skill.label}</Button>
                  ))}
                </Box>): (<Box>
                  <Select
                      AutoSize={true}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      defaultValue={list}
                      isMulti
                      isSearchable
                      /*onChange={(e)=>{setStudentInput({...studentInput,student_skilltemp:e})}}*/
                      options={options}
                    />
                </Box>)}
              </Box>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
              <ListItemIcon>
                <HorizontalSplitIcon />
              </ListItemIcon>
              <ListItemText primary={
              <Box component={'span'} className={classes.myProjects}>My Projects</Box>
            }>
              </ListItemText>
        </ListItem>
      </List>
      <Dialog
        onClose={handleDialogClose}
        open={dialogOpen}
        className={classes.dialog}>
        <DialogTitle>Enter Email and Password to Confirm</DialogTitle>
        {authError ? (
          <Alert
            className={classes.loginAlert}
            variant="filled"
            severity="error">
            {authError}
          </Alert>
        ) : null}
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={classes.dialogInput}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            label="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            className={classes.dialogInput}
          />
        </DialogContent>
        <DialogActions className={classes.dialogConfirm}>
          <Button
            onClick={handleConfirm}
            color="secondary"
            variant="outlined"
            className={classes.dialogConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <StudentProject />
      <StudentProjectTimeline />
    </div>
  );
};

