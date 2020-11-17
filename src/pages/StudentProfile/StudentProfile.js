import React, { useState, useContext, useEffect, useRef } from "react";
import StudentProject from "../../components/StudentProject/StudentProject";
import StudentProjectAdd from "../../components/StudentProject/StudentProjectAdd";
import StudentProjectScroll from "../../components/StudentProject/StudentProjectScroll";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import makeAnimated from "react-select/animated";
import {
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Avatar,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  CircularProgress,
  Typography,
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
  Chip,
  Select,
  FormHelperText,
} from "@material-ui/core";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import StarsIcon from "@material-ui/icons/Stars";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import { DataContext } from "../../contexts/dataContext";
import { getConfig } from "../../authConfig";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import StudentsList from "../../components/StudentPublic/StudentsList";

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
  skills: {
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    color: "#5B5B5B",
    padding: "1%",
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
  select: {
    width: "30vh",
    fontSize: "small",
  },
  myProjects: {
    fontWeight: "bold",
    color: "#606060",
    padding: "0 auto",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  skillRoot: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    "& > * ": {
      margin: theme.spacing(0.5),
    },
  },
  beginnerChip: {
    margin: theme.spacing(0.5),
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
  },
  intermediateChip: {
    margin: theme.spacing(0.5),
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
  },
  expertChip: {
    margin: theme.spacing(0.5),
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
  },
  beginnerDeleteIcon: {
    fill: theme.palette.text.main,
  },
  intermediateDeleteIcon: {
    fill: theme.palette.warning.main,
  },
  expertDeleteIcon: {
    fill: theme.palette.success.main,
  },
}));

export default function StudentProfile() {
  //options of skills that will be sent to the select statement
  //this is the animated component for the react-select library
  const animatedComponents = makeAnimated();

  //this is the for the stylings of the page
  const classes = useStyles();
  //initially get the data from DataContext
  const { data, dispatch } = useContext(DataContext);
  const { profile } = data;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  //This is when user selects from the select component
  const [skillName, setSkillName] = useState("");
  const [experience, setExperience] = useState("");
  //This is for list of skills from database
  const [skills, setSkills] = useState();
  const [projects, setProjects] = useState();

  //this is the original data retrieved from the api
  const [studentInfo, setStudentInfo] = useState({
    //This is the data from api
    student_id: null,
    full_name: null,
    date_of_birth: null,
    graduation_date: null,
    major: null,
    degree: null,
    student_skills: [],
    student_description: null,
  });
  //this is the booleans for opening or closing edit fields
  const [studentEdit, showStudentEdit] = useState({
    //This tells whether to show input fields.
    studentEditBool: false,
  });
  //this is the copy of the original data that will be manipulated
  const [studentInput, setStudentInput] = useState({
    //This is the data
    student_id: null,
    full_name: null,
    date_of_birth: null,
    graduation_date: null,
    major: null,
    degree: null,
    student_skills: [],
    student_description: null,
  });

  const [errors, setErrors] = useState({
    student_description: null,
    student_skills: null,
  });

  const firstRender = useRef(true);

  const getSkillsRepo = async () => {
    const response = await axios.get(
      `http://18.213.74.196:8000/api/skill`,
      getConfig()
    );
    setSkills(response.data);
  };

  const getStudentProjects = async () => {
    const response = await axios.post(
      `http://18.213.74.196:8000/api/student_project/list_by_student`,
      {
        student_id: profile.student_id,
      },
      getConfig()
    );
    console.log(response);
    setProjects(response.data);
  };

  useEffect(() => {
    getSkillsRepo();
    getStudentProjects();
    setStudentInfo({
      student_id: profile.student_id,
      full_name: profile.full_name,
      date_of_birth: profile.date_of_birth,
      graduation_date: profile.graduation_date,
      major: profile.major,
      degree: profile.degree,
      student_skills: profile.student_skills,
      student_description: profile.student_description,
    });
    setStudentInput({
      student_id: profile.student_id,
      full_name: profile.full_name,
      date_of_birth: profile.date_of_birth,
      graduation_date: profile.graduation_date,
      major: profile.major,
      degree: profile.degree,
      student_skills: profile.student_skills,
      student_description: profile.student_description,
    });
  }, [profile]);

  //opening the edit field
  const handleOpenEdit = (key) => {
    showStudentEdit({
      ...studentEdit,
      [key]: true,
    });
  };
  //closing the edit field
  const handleCloseEdit = (key) => {
    showStudentEdit({
      ...studentEdit,
      [key]: false,
    });
  };

  //selecting a skill
  const handleSkillChange = (e) => {
    setSkillName(e.target.value);
  };

  //selecting experience
  const handleExpChange = (e) => {
    setExperience(e.target.value);
  };

  //adding skill to list
  const addSkill = () => {
    if (skillName && experience) {
      let unique = true;
      for (let i = 0; i < studentInput.student_skills.length; i++) {
        if (studentInput.student_skills[i].skill_name === skillName) {
          unique = false;
          alert(`${skillName} already exists`);
          break;
        }
      }
      if (unique) {
        setStudentInput((prevStudentInput) => {
          return {
            ...prevStudentInput,
            student_skills: [
              ...prevStudentInput.student_skills,
              {
                skill_name: skillName,
                experience_level: experience,
              },
            ],
          };
        });
      }
    }
  };

  //deleting a skill
  const deleteSkill = (skllToDelete) => {
    setStudentInput((prevStudentInput) => {
      return {
        ...prevStudentInput,
        student_skills: prevStudentInput.student_skills.filter(
          (skill) => skill.skill_name !== skllToDelete.skill_name
        ),
      };
    });
  };

  const validate = () => {
    let errors = {};
    if (studentInput.student_description === "") {
      errors.student_description = "Required";
    } else if (studentInput.student_description.length > 500) {
      errors.student_description = "Max length of 500 characters reached";
    } else {
      errors.student_description = null;
    }

    if (studentInput.student_skills.length <= 0) {
      errors.student_skills = "At least one skill is required";
    } else {
      errors.student_skills = null;
    }
    return errors;
  };

  //saving the edited data
  const handleSave = () => {
    setErrors(validate());
  };

  const updateProfile = async () => {
    axios
      .post("http://18.213.74.196:8000/api/token/", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("slug", res.data.slug);
        let slug = localStorage.getItem("slug");
        axios
          .put(
            `http://18.213.74.196:8000/api/student_profile/${slug}/update`,
            {
              username: localStorage.getItem("email_id"),
              full_name: studentInput.full_name,
              date_of_birth: studentInput.date_of_birth,
              graduation_date: studentInput.graduation_date,
              student_skills: studentInput.student_skills,
              major: studentInput.major,
              degree: studentInput.degree,
              student_description: studentInput.student_description,
            },
            getConfig()
          )
          .then((res) => {
            dispatch({ type: "UPDATE_PROFILE", payload: res.data });
            handleCloseEdit("studentEditBool");
            setDialogOpen(false);
            axios
              .post("http://18.213.74.196:8000/api/token/", {
                email: email,
                password: password,
              })
              .then((res) => {
                localStorage.setItem("slug", res.data.slug);
                setEmail("");
                setPassword("");
              });
          });
      })
      .catch((err) => {
        setAuthError(
          err.response.data.detail +
            ". Make sure your email and password is correct."
        );
      });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (Object.entries(errors).length !== 0) {
        let errorExists = false;
        Object.keys(errors).forEach((key) => {
          if (errors[key] !== null) {
            errorExists = true;
          }
        });
        if (!errorExists) {
          setDialogOpen(true);
        }
      }
    }
  }, [errors]);

  //not saving the edited data if the user does not want to change
  const handleCancel = () => {
    setStudentInput(studentInfo);
    handleCloseEdit("studentEditBool");
  };

  const handleDialogClose = () => {
    setEmail("");
    setPassword("");
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    updateProfile();
  };

  return (
    <>
      <div>
        <img
          alt="profile background"
          className={classes.profileLogo}
          src={ProfileLogo}></img>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FormatListBulletedTwoToneIcon />
            </ListItemIcon>
            {studentEdit.studentEditBool === false ? (
              <div
                className={classes.flexRow}
                style={{ justifyContent: "space-between" }}>
                <div className={classes.flexColumn}>
                  <Typography className={classes.sectionHeader}>
                    Student Description
                  </Typography>
                  <Typography className={classes.sectionContent}>
                    {studentInfo.student_description}
                  </Typography>
                </div>

                {/* <ListItemText
                  primary={
                    <Box component={"span"} className={classes.sectionHeader}>
                      Student Description
                    </Box>
                  }
                  secondary={
                    <Box
                      component="span"
                      variant="body2"
                      className={`${classes.inline} ${classes.sectionContent}`}
                      color="textPrimary">
                      {studentInfo.student_description}
                    </Box>
                  }
                /> */}
                <IconButton
                  style={{ float: "right" }}
                  className={classes.icon}
                  onClick={() => {
                    handleOpenEdit("studentEditBool");
                  }}>
                  <EditTwoToneIcon />
                </IconButton>
              </div>
            ) : (
              <>
                <FormControl
                  error={errors.student_description && studentInput === ""}>
                  <Typography className={classes.sectionHeader}>
                    Student Description
                  </Typography>
                  <Input
                    multiline
                    value={studentInput.student_description}
                    name="student_description"
                    onChange={(e) => {
                      setStudentInput({
                        ...studentInput,
                        student_description: e.target.value,
                      });
                    }}></Input>
                  {errors.student_description &&
                  studentInput.student_description === "" ? (
                    <FormHelperText>
                      {errors.student_description}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <IconButton
                  className={classes.icon}
                  onClick={() => {
                    handleCancel();
                  }}>
                  <ClearRoundedIcon />
                </IconButton>
                <IconButton
                  className={classes.icon}
                  onClick={() => {
                    handleSave();
                  }}>
                  <CheckRoundedIcon style={{ color: "green" }} />
                </IconButton>
              </>
            )}
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolRoundedIcon />
            </ListItemIcon>
            {studentEdit.studentEditBool === false ? (
              <div className={classes.flexColumn}>
                <Typography className={classes.sectionHeader}>
                  Academic
                </Typography>
                <Typography
                  className={
                    classes.sectionContent
                  }>{`Graduation Date: ${studentInfo.graduation_date}`}</Typography>
                <Typography
                  className={
                    classes.sectionContent
                  }>{`${studentInfo.degree} ${studentInfo.major}`}</Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.sectionHeader}>
                  Academic
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControl>
                      <Typography>Graduation Date</Typography>
                      <TextField
                        type="date"
                        name="graduation_date"
                        onChange={(e) => {
                          setStudentInput({
                            ...studentInput,
                            graduation_date: e.target.value,
                          });
                        }}
                        value={studentInput.graduation_date}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <Typography>Degree</Typography>
                      <select
                        name="degree"
                        value={studentInput.select}
                        className={classes.degree}
                        onChange={(e) => {
                          setStudentInput({
                            ...studentInput,
                            degree: e.target.value,
                          });
                        }}>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <Typography>Major</Typography>
                      <select
                        name="major"
                        className={classes.select}
                        value={studentInput.major}
                        onChange={(e) => {
                          setStudentInput({
                            ...studentInput,
                            major: e.target.value,
                          });
                        }}>
                        <optgroup label="Gerald D. Hines College of Architecture and Design">
                          <option value="Architecture">Architecture</option>
                          <option value="Environmental Design">
                            Environmental Design
                          </option>
                          <option value="Industrial Design">
                            Industrial Design
                          </option>
                          <option value="Interior Architecture">
                            Interior Architecture
                          </option>
                        </optgroup>
                        <optgroup label="Kathrine G. McGovern College of the Arts">
                          <option value="Applied Music">Applied Music</option>
                          <option value="Art">Art</option>
                          <option value="Art History">Art History</option>
                          <option value="Dance">Dance</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Music">Music</option>
                          <option value="Painting">Painting</option>
                          <option value="Photography">
                            Photography/Digital Media
                          </option>
                          <option value="Sculpture">Sculpture</option>
                          <option value="Theatre">Theatre</option>
                        </optgroup>
                        <optgroup label="C. T. Bauer College of Business">
                          <option value="Accounting">Accounting</option>
                          <option value="Entrepreneurship">
                            Entrepreneurship
                          </option>
                          <option value="Finance">Finance</option>
                          <option value="Management">Management</option>
                          <option value="Management Information Systems">
                            Management Information Systems
                          </option>
                          <option value="Marketing">Marketing</option>
                          <option value="Suppy Chain Management">
                            Suppy Chain Management
                          </option>
                        </optgroup>
                        <optgroup label="College of Education">
                          <option value="Health">Health</option>
                          <option value="Human Development and Family Studies">
                            Human Development and Family Studies
                          </option>
                          <option value="Teaching and Learning">
                            Teaching and Learning
                          </option>
                        </optgroup>
                        <optgroup label="Cullen College of Engineering">
                          <option value="Biomedical Engineering">
                            Biomedical Engineering
                          </option>

                          <option value="Chemical Engineering">
                            Chemical Engineering
                          </option>

                          <option value="Civil Engineering">
                            Civil Engineering
                          </option>

                          <option value="Computer Engineering">
                            Computer Engineering
                          </option>

                          <option value="Computer Engineering and Analytics">
                            Computer Engineering and Analytics
                          </option>
                          <option value="Construction Engineering">
                            Construction Engineering
                          </option>
                          <option value="Electrical Engineering">
                            Electrical Engineering
                          </option>
                          <option value="Industrial Engineering">
                            Industrial Engineering
                          </option>
                          <option value="Mechanical Engineering">
                            Mechanical Engineering
                          </option>
                          <option value="Petroleum Engineering">
                            Petroleum Engineering
                          </option>
                          <option value="Systems Engineering">
                            Systems Engineering
                          </option>
                        </optgroup>
                        <optgroup label="Conrad N. Hilton College of Hotel and Restaurant Management">
                          <option value="Hotel and Restaurant Management">
                            Hotel and Restaurant Management
                          </option>
                        </optgroup>
                        <optgroup label="College of Liberal Arts and Social Sciences">
                          <option value="African American Studies">
                            African American Studies
                          </option>
                          <option value="American_Sign_Language_Interpreting">
                            American Sign Language Interpreting
                          </option>
                          <option value="Anthropology">Anthropology</option>
                          <option value="Chinese Studies">
                            Chinese Studies
                          </option>
                          <option value="Communication Sciences and Disorders">
                            Communication Sciences and Disorders
                          </option>
                          <option value="Communication_Studies">
                            Communication Studies
                          </option>
                          <option value="Economics">Economics</option>
                          <option value="English">English</option>
                          <option value="Exercise Science">
                            Exercise Science
                          </option>
                          <option value="Fitness and Sports">
                            Fitness and Sports
                          </option>

                          <option value="French">French</option>
                          <option value="Health Communication">
                            Health Communication
                          </option>
                          <option value="History">History</option>
                          <option value="Human Nutrition and Foods">
                            Human Nutrition and Foods
                          </option>
                          <option value="Journalism">Journalism</option>
                          <option value="Liberal Studies">
                            Liberal Studies
                          </option>
                          <option value="Media Production">
                            Media Production
                          </option>
                          <option value="Philosophy">Philosophy</option>
                          <option value="Political Science">
                            Political Science
                          </option>
                          <option value="Psychology">Psychology</option>
                          <option value="Religious Studies">
                            Religious Studies
                          </option>
                          <option value="Sociology">Sociology</option>
                          <option value="Spanish">Spanish</option>
                          <option value="Sports Administration">
                            Sports Administration
                          </option>
                          <option value="Strategic Communication">
                            Strategic Communication
                          </option>

                          <option value="Women’s, Gender, and Sexuality Studies">
                            Women’s, Gender, and Sexuality Studies
                          </option>
                          <option value="World Cultures and Literatures">
                            World Cultures and Literatures
                          </option>
                        </optgroup>
                        <optgroup label="College of Natural Sciences and Mathematics">
                          <option value="Biochemical and Biophysical Sciences">
                            Biochemical and Biophysical Sciences
                          </option>
                          <option value="Biology">Biology</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Computer Science">
                            Computer Science
                          </option>
                          <option value="Earth_Science">Earth Science</option>
                          <option value="Environmental Sciences">
                            Environmental Sciences
                          </option>
                          <option value="Geology">Geology</option>
                          <option value="Geophysics">Geophysics</option>
                          <option value="Honors Biomedical Sciences">
                            Honors Biomedical Sciences
                          </option>
                          <option value="Mathematical Biology">
                            Mathematical Biology
                          </option>
                          <option value="Mathematics">Mathematics</option>

                          <option value="Physics">Physics</option>
                        </optgroup>
                        <optgroup label="College of Nursing">
                          <option value="Pre-Nursing">Pre-Nursing</option>
                          <option value="Nursing, BSN (RN-BSN)">
                            Nursing, BSN (RN-BSN)
                          </option>
                          <option value="Nursing, BSN (Second_Degree)">
                            Nursing, BSN (Second Degree)
                          </option>
                        </optgroup>
                        <optgroup label="College of Technology">
                          <option value="Biotechnology">Biotechnology</option>

                          <option value="Computer Engineering Technology">
                            Computer Engineering Technology
                          </option>
                          <option value="Computer Information Systems">
                            Computer Information Systems
                          </option>
                          <option value="Construction Management">
                            Construction Management
                          </option>
                          <option value="Digital Media">Digital Media</option>
                          <option value="Electrical Power Engineering Technology">
                            Electrical Power Engineering Technology
                          </option>
                          <option value="Human Resources Development">
                            Human Resources Development
                          </option>
                          <option value="Mechanical Engineering Technology">
                            Mechanical Engineering Technology
                          </option>
                          <option value="Retailing and_Consumer Science">
                            Retailing and Consumer Science{" "}
                          </option>
                          <option value="Supply Chain and Logistics Technology">
                            Supply Chain and Logistics Technology
                          </option>
                          <option value="Technology Leadership and Innovation Management">
                            Technology Leadership and Innovation Management{" "}
                          </option>
                        </optgroup>
                        <optgroup label="Pre-Professional Tracks">
                          <option value="Pre-Dentistry">Pre-Dentistry</option>
                          <option value="Pre-Law">Pre-Law</option>
                          <option value="Pre-Medicine">Pre-Medicine</option>
                          <option value="Pre-Optometry">Pre-Optometry</option>
                          <option value="Pre-Pharmacy">Pre-Pharmacy</option>
                          <option value="Pre-Physical Therapy">
                            Pre-Physical Therapy
                          </option>
                          <option value="Pre-Veterinary Medicine">
                            Pre-Veterinary Medicine
                          </option>
                        </optgroup>
                      </select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            )}
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            {studentEdit.studentEditBool === false ? (
              <div className={classes.flexColumn}>
                <Typography className={classes.sectionHeader}>
                  Skills
                </Typography>
                <ul className={classes.skillRoot}>
                  {studentInfo.student_skills.map((skill) => {
                    return (
                      <li key={skill.skill_name}>
                        <Chip
                          variant="outlined"
                          classes={
                            skill.experience_level === 1
                              ? {
                                  root: classes.beginnerChip,
                                  deleteIcon: classes.beginnerDeleteIcon,
                                }
                              : skill.experience_level === 2
                              ? {
                                  root: classes.intermediateChip,
                                  deleteIcon: classes.intermediateDeleteIcon,
                                }
                              : {
                                  root: classes.expertChip,
                                  deleteIcon: classes.expertDeleteIcon,
                                }
                          }
                          label={skill.skill_name}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div>
                <Typography className={classes.sectionHeader}>
                  Skills
                </Typography>
                <ul className={classes.skillRoot}>
                  {studentInput.student_skills.map((skill) => {
                    return (
                      <li key={skill.skill_name}>
                        <Chip
                          variant="outlined"
                          classes={
                            skill.experience_level === 1
                              ? {
                                  root: classes.beginnerChip,
                                  deleteIcon: classes.beginnerDeleteIcon,
                                }
                              : skill.experience_level === 2
                              ? {
                                  root: classes.intermediateChip,
                                  deleteIcon: classes.intermediateDeleteIcon,
                                }
                              : {
                                  root: classes.expertChip,
                                  deleteIcon: classes.expertDeleteIcon,
                                }
                          }
                          label={skill.skill_name}
                          onDelete={() => deleteSkill(skill)}
                        />
                      </li>
                    );
                  })}
                </ul>
                {errors.student_skills &&
                studentInput.student_skills.length === 0 ? (
                  <FormHelperText
                    error={
                      errors.student_skills &&
                      studentInput.student_skills.length === 0
                    }>
                    {errors.student_skills}
                  </FormHelperText>
                ) : null}

                <Grid container spacing={2}>
                  <Grid item>
                    <Box>
                      <Typography>Skill</Typography>
                      <FormControl>
                        <Select
                          onChange={handleSkillChange}
                          className={classes.select}
                          value={skillName}
                          /*onChange={(e)=>{setStudentInput({...studentInput,student_skilltemp:e})}}*/
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {skills.map((skill) => (
                            <MenuItem key={skill.id} value={skill.skill_name}>
                              {skill.skill_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <Typography>Experience</Typography>
                      <Select
                        value={experience}
                        className={classes.select}
                        onChange={handleExpChange}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Beginner</MenuItem>
                        <MenuItem value={2}>Novice</MenuItem>
                        <MenuItem value={3}>Expert</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={addSkill}
                      disabled={skillName === "" || experience === ""}>
                      Add Skill
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <HorizontalSplitIcon />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <Typography className={classes.sectionHeader}>
                  My Projects
                </Typography>
              </Grid>
            </Grid>
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
        <Grid container justify="flex-end">
          <StudentProjectAdd skills={skills} />
        </Grid>

        {projects && skills ? (
          <StudentProject
            projects={projects}
            setProjects={setProjects}
            skills={skills}
          />
        ) : null}
        <StudentProjectScroll showBelow={250} />
      </div>
    </>
  );
}
