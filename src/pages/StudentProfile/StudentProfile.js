import React, {useState} from "react";
import StudentProject from "../../components/StudentProject/StudentProject";
import StudentProjectTimeline from "../../components/StudentProject/StudentProjectTimeline";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {TextField,Box,Avatar,List,ListItem, Divider, ListItemText, ListItemIcon,IconButton, Button } from "@material-ui/core";
import FormatListBulletedTwoToneIcon from '@material-ui/icons/FormatListBulletedTwoTone';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import StarsIcon from '@material-ui/icons/Stars';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';

const useStyles = makeStyles((theme) => ({
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
  download:{
    objectFit: "contain",
    position:"relative",
    width:"5%",
  },
  skills:{
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    color:"#5B5B5B",
    padding:"2%",
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
  myProjects: {
    fontWeight: "bold",
    color:"#606060",
    padding: '0 auto',
  }
}));

export default function StudentProfile (){
 //this is the animated component for the react-select library
  const animatedComponents = makeAnimated();
 //this is the for the stylings of the page
  const classes = useStyles();
  //options of skills that will be sent to the select statement
  const options = [{label:'C++', value:0}, {label:'Java', value:1}, {label:'C#', value:2}]
  //this is the original data retrieved from the api
  const [studentInfo, setStudentInfo] = useState({ //This is the data
    student_description: 'Here student description will go',
    studentGraduationDate: '2020-10-20',
    major:'CS',
    studentResume: 'Resume',
    student_skill: [{label:'C++', value:0}, {label:'Java', value:1}]
  })
  //this is the booleans for opening or closing edit fields
  const [studentEdit, showStudentEdit] = useState({ //This tells whether to show input fields. 
    student_description: false,
    studentAcademic:false,
    studentResume:false,
    student_skill:false
  });
  //this is the copy of the original data that will be manipulated
  const [studentInput, setStudentInput] = useState({ //This is the data
    student_description: 'Here student description will go',
    studentGraduationDate: '2020-10-20',
    major:'CS',
    studentResume: 'Resume',
    student_skill: [{label:'C++', value:0}, {label:'Java', value:1}]
  })
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
  const handleSave = (key) => { //Make api call to save data. 
    setStudentInfo(studentInput)
    handleCloseEdit(key);
  }
  //not saving the edited data if the user does not want to change
  const handleCancel = (key) =>{
    setStudentInput(studentInfo)
    handleCloseEdit(key);
  }

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
              studentEdit.student_description === false ? (<Box
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
          { studentEdit.student_description === false ? (
              <IconButton className={classes.icon} onClick={() => {handleOpenEdit('student_description')}}><EditTwoToneIcon/></IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCancel('student_description')}}><ClearRoundedIcon/></IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('student_description')}}><CheckRoundedIcon style={{ color: 'green'}}/></IconButton>
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
                      Graduation Date : 
                    </Box>{ 
                    studentEdit.studentAcademic === false ? (<Box
                    component={'span'}
                    variant="body2"
                    className={`${classes.inline} ${classes.sectionContent}`}
                    color="textPrimary"
                  >
                      {studentInfo.studentGraduationDate}
                  </Box>): (
                      <TextField type="date" name="studentGraduationDate" onChange={(e)=>{setStudentInput({...studentInput,studentGraduationDate:e.target.value})}} value={studentInput.studentGraduationDate} />
                  )}
                     <br/>
                    <Box
                      component={'span'}
                      variant="body2"
                      color="textPrimary"
                      className={classes.sectionContent}
                    >
                      Bachelor's (BS) : 
                    </Box>
                    {studentEdit.studentAcademic === false ? (<Box
                    component="span"
                    variant="body2"
                    className={`${classes.sectionContent}`}
                    color="textPrimary"
                  >
                      {studentInfo.major}
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
            { studentEdit.studentAcademic === false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('studentAcademic')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCancel('studentAcademic')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('studentAcademic')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <DescriptionRoundedIcon/>
          </ListItemIcon>
          <ListItemText
             primary={
                <Box component={'span'} className={classes.sectionHeader}>
                  Resume
                </Box>
            }
            secondary={
                <Box
                  component={'span'}
                  variant="body2"
                  className={classes.sectionContent}
                  style={{textDecoration:"underline"}}
                  color="textPrimary"
                >
                Document:{studentInfo.studentResume}
                </Box>
            }
          />
          <IconButton className={classes.download}>
            <GetAppRoundedIcon/>
          </IconButton>
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
                {studentEdit.student_skill === false ? (<Box
                  component="span"
                  variant="body2"
                  className={`${classes.skillsContainer}`}
                  color="textPrimary"
                >
                  {studentInfo.student_skill.map((skill, index) => (
                    <Button key={skill.value} className={classes.skills} value={skill.name}>{skill.label}</Button>
                  ))}
                </Box>): (<Box>
                  <Select
                      AutoSize={true}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      defaultValue={studentInfo.student_skill}
                      isMulti
                      isSearchable
                      onChange={(e)=>{setStudentInput({...studentInput,student_skill:e})}}
                      options={options}
                    />
                </Box>)}
              </Box>
            }
          />
            { studentEdit.student_skill === false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('student_skill')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCancel('student_skill')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('student_skill')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
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
      <StudentProject />
      <StudentProjectTimeline />
    </div>
  );
};

