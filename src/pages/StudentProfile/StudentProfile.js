import React, { useState, useContext, useEffect, useRef } from "react";
import StudentProject from "../../components/StudentProject/StudentProject";
import StudentProjectAdd from "../../components/StudentProject/StudentProjectAdd";
import StudentProjectScroll from "../../components/StudentProject/StudentProjectScroll";
import StudentDashboard from "../../assets/StudentDashboard.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  IconButton,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Grid,
  Chip,
  Select,
  FormHelperText,
  ListItemText,
} from "@material-ui/core";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import StarsIcon from "@material-ui/icons/Stars";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import ContactsRoundedIcon from "@material-ui/icons/ContactsRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import { DataContext } from "../../contexts/dataContext";
import { getConfig } from "../../authConfig";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  dialogInput: {
    paddingBottom: theme.spacing(2),
  },
  loginAlert: {
    marginBottom: theme.spacing(2),
  },
  inline: {
    display: "inline",
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
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  skills: {
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    color: "#5B5B5B",
    padding: "1%",
    width: "20px",
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
  // profileImage: {
  //   width: theme.spacing(20),
  //   height: theme.spacing(20),
  //   position: "absolute",
  //   top: "15%",
  //   right: "4%",
  //   zIndex: 1,
  //   objectFit: "contain",
  // },
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
  fullWidth: {
    width: "100%",
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
  labelAsterisk: {
    color: theme.palette.secondary.main,
  },
}));

export default function StudentProfile() {
  //this is the for the stylings of the page
  const classes = useStyles();
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
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
  const [skills, setSkills] = useState(null);
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
    contact_email: null,
    phoneNumber: null,
    streetAddress: null,
    city: null,
    state: null,
    zipcode: null,
  });
  const [alert, setAlert] = useState("");
  const [updateFailed, setUpdateFailed] = useState(false);
  const handleCloseUpdateFailed = () => {
    setUpdateFailed(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const getStreetAddress = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[0];
    }
    return null;
  };

  const getCity = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[1];
    }
    return null;
  };

  const getState = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[2];
    }
    return null;
  };

  const getStudentAddress = () => {
    if (studentInput.streetAddress && studentInput.city && studentInput.state) {
      return `${studentInput.streetAddress}|${studentInput.city}|${studentInput.state}`;
    }
    return "";
  };

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
    contact_email: null,
    phoneNumber: null,
    streetAddress: null,
    city: null,
    state: null,
    zipcode: null,
  });

  const [errors, setErrors] = useState({
    student_description: null,
    student_skills: null,
    contact_email: null,
    phoneNumber: null,
  });

  const firstRender = useRef(true);

  const getSkillsRepo = async () => {
    const response = await axios.get(
      `http://18.213.74.196:8000/api/skill/`,
      getConfig()
    );
    setSkills(response.data);
  };
  const getStudentProjects = async () => {
    const response = await axios.post(
      `http://18.213.74.196:8000/api/student_project/list_by_student`,
      {
        username_id: parseInt(localStorage.getItem("email_id")),
      },
      getConfig()
    );
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
      contact_email: profile.student_contact_email,
      phoneNumber: profile.student_phone_no,
      streetAddress: getStreetAddress(profile.student_address),
      city: getCity(profile.student_address),
      state: getState(profile.student_address),
      zipcode: profile.student_zip,
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
      contact_email: profile.student_contact_email,
      phoneNumber: profile.student_phone_no,
      streetAddress: getStreetAddress(profile.student_address),
      city: getCity(profile.student_address),
      state: getState(profile.student_address),
      zipcode: profile.student_zip,
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
          setAlert(`${skillName} already exists`);
          setUpdateFailed(true);
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
        setUpdateFailed(false);
        setAlert("");
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
    if (studentInput.contact_email === "") {
      errors.contact_email = "Required";
    } else {
      errors.contact_email = null;
    }
    if (
      studentInput.phoneNumber === "" ||
      studentInput.phoneNumber.length < 10
    ) {
      errors.phoneNumber = "Required";
    } else {
      errors.phoneNumber = null;
    }
    if (studentInput.streetAddress === "") {
      errors.streetAddress = "Required";
    } else {
      errors.streetAddress = null;
    }
    if (studentInput.city === "") {
      errors.city = "Required";
    } else {
      errors.city = null;
    }
    if (studentInput.state === "") {
      errors.state = "Required";
    } else {
      errors.state = null;
    }
    if (studentInput.zipcode === "" || studentInput.zipcode.length < 5) {
      errors.zipcode = "Required";
    } else {
      errors.zipcode = null;
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
              student_contact_email: studentInput.contact_email,
              student_phone_no: studentInput.phoneNumber,
              student_address: getStudentAddress(),
              student_zip: studentInput.zipcode,
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
    setAuthError("");
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
          src={StudentDashboard}></img>
        <>
          {studentEdit.studentEditBool === false ? (
            <Grid container justify="flex-end" style={{ paddingRight: "20px" }}>
              <IconButton
                edge="end"
                className={classes.icon}
                onClick={() => {
                  handleOpenEdit("studentEditBool");
                }}>
                <EditTwoToneIcon />
              </IconButton>
            </Grid>
          ) : (
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <Typography>
                <span className={classes.labelAsterisk}>*</span> - Required
                Fields
              </Typography>
              <div>
                <IconButton
                  edge="end"
                  className={classes.icon}
                  onClick={() => {
                    handleCancel();
                  }}>
                  <ClearRoundedIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  className={classes.icon}
                  onClick={() => {
                    handleSave();
                  }}>
                  <CheckRoundedIcon style={{ color: "green" }} />
                </IconButton>
              </div>
            </Grid>
          )}
        </>
        <List className={classes.root}>
          <ListItem>
            <ListItemIcon edge="start">
              <FormatListBulletedTwoToneIcon />
            </ListItemIcon>
            <ListItemText>
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
                </div>
              ) : (
                <div>
                  <div>
                    <FormControl
                      className={classes.fullWidth}
                      error={errors.student_description && studentInput === ""}>
                      <Typography className={classes.sectionHeader}>
                        Student Description
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
                      <TextField
                        multiline
                        helperText={`${studentInput.student_description.length}/500`}
                        value={studentInput.student_description}
                        name="student_description"
                        inputProps={{ maxLength: 500 }}
                        fullWidth
                        onChange={(e) => {
                          setStudentInput({
                            ...studentInput,
                            student_description: e.target.value,
                          });
                        }}></TextField>
                      {errors.student_description &&
                      studentInput.student_description === "" ? (
                        <FormHelperText>
                          {errors.student_description}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                </div>
              )}
            </ListItemText>
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
                  }>{`Degree: ${studentInfo.degree}`}</Typography>
                <Typography className={classes.sectionContent}>
                  {" "}
                  {`Major: ${studentInfo.major}`}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.sectionHeader}>
                  Academic
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControl>
                      <Typography>
                        Graduation Date
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
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
                      <Typography>
                        Degree
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
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
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <Typography>
                        Major
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
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
              <ContactsRoundedIcon />
            </ListItemIcon>
            {studentEdit.studentEditBool === false ? (
              <div className={classes.flexColumn}>
                <Typography className={classes.sectionHeader}>
                  Contact
                </Typography>
                <Typography className={classes.sectionContent}>
                  {`Contact Email: ${studentInfo.contact_email}`}
                </Typography>
                <Typography className={classes.sectionContent}>
                  {`Phone Number: ${studentInfo.phoneNumber}`}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.sectionHeader}>
                  Contact
                  {studentEdit.studentEditBool ? (
                    <span className={classes.labelAsterisk}> *</span>
                  ) : null}
                </Typography>
                <Grid container spacing={4}>
                  <Grid item>
                    <FormControl
                      error={errors.contact_email && studentInput === ""}>
                      <Typography>
                        Contact Email
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
                      <TextField
                        type="string"
                        name="contact_email"
                        onChange={(e) => {
                          setStudentInput({
                            ...studentInput,
                            contact_email: e.target.value,
                          });
                        }}
                        value={studentInput.contact_email}
                        required={true}
                        inputProps={{ maxLength: 50 }}
                      />
                      {errors.contact_email &&
                      studentInput.contact_email === "" ? (
                        <FormHelperText>{errors.contact_email}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      error={errors.phoneNumber && studentInput === ""}>
                      <Typography>
                        Phone Number
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
                      <TextField
                        type="string"
                        name="phoneNumber"
                        onChange={(e) => {
                          setStudentInput({
                            ...studentInput,
                            phoneNumber: e.target.value,
                          });
                        }}
                        value={studentInput.phoneNumber}
                        required={true}
                        inputProps={{ maxLength: 11 }}
                      />
                      {errors.phoneNumber && studentInput.phoneNumber === "" ? (
                        <FormHelperText>{errors.phoneNumber}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            )}
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LocationOnRoundedIcon />
            </ListItemIcon>
            {studentEdit.studentEditBool === false ? (
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography className={classes.sectionHeader}>
                      Address
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {`${studentInfo.streetAddress},  ${studentInfo.city}, ${studentInfo.state} ${studentInfo.zipcode}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={2}>
                  <Grid container id="first-left" item xs={12} direction="row">
                    <Grid item lg={3} xs={12} md={6}>
                      <FormControl
                        error={errors.streetAddress && studentInput === ""}>
                        <Typography>
                          Street Address
                          {studentEdit.studentEditBool ? (
                            <span className={classes.labelAsterisk}> *</span>
                          ) : null}
                        </Typography>
                        <TextField
                          value={studentInput.streetAddress}
                          onChange={(e) => {
                            setStudentInput({
                              ...studentInput,
                              streetAddress: e.target.value,
                            });
                          }}
                          name="streetAddress"
                          inputProps={{ maxLength: 40 }}
                          placeholder="Street Address"
                        />
                        {errors.streetAddress &&
                        studentInput.streetAddress === "" ? (
                          <FormHelperText>
                            {errors.streetAddress}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item lg={3} xs={12} md={6}>
                      <FormControl error={errors.city && studentInput === ""}>
                        <Typography>
                          City
                          {studentEdit.studentEditBool ? (
                            <span className={classes.labelAsterisk}> *</span>
                          ) : null}
                        </Typography>
                        <TextField
                          value={studentInput.city}
                          onChange={(e) => {
                            setStudentInput({
                              ...studentInput,
                              city: e.target.value,
                            });
                          }}
                          inputProps={{ maxLength: 20 }}
                          name="city"
                        />
                        {errors.city && studentInput.city === "" ? (
                          <FormHelperText>{errors.city}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container id="first-left" item xs={12} direction="row">
                    <Grid item lg={3} xs={12} md={6}>
                      <FormControl error={errors.state && studentInput === ""}>
                        <Typography>
                          State
                          {studentEdit.studentEditBool ? (
                            <span className={classes.labelAsterisk}> *</span>
                          ) : null}
                        </Typography>
                        <Select
                          label="State"
                          value={studentInput.state}
                          onChange={(e) => {
                            setStudentInput({
                              ...studentInput,
                              state: e.target.value,
                            });
                          }}
                          name="state"
                          placeholder="state">
                          {states.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.state && studentInput.state === "" ? (
                          <FormHelperText>{errors.state}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item lg={3} xs={12} md={6}>
                      <FormControl
                        error={errors.zipcode && studentInput === ""}>
                        <Typography>
                          Zipcode
                          {studentEdit.studentEditBool ? (
                            <span className={classes.labelAsterisk}> *</span>
                          ) : null}
                        </Typography>
                        <TextField
                          value={studentInput.zipcode}
                          onChange={(e) => {
                            setStudentInput({
                              ...studentInput,
                              zipcode: e.target.value,
                            });
                          }}
                          inputProps={{ maxLength: 5 }}
                          name="zipcode"
                        />
                        {errors.zipcode && studentInput.zipcode === "" ? (
                          <FormHelperText>{errors.zipcode}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </>
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
                      <Typography>
                        Skill
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
                      <FormControl>
                        <Select
                          onChange={handleSkillChange}
                          className={classes.select}
                          value={skillName}>
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
                      <Typography>
                        Experience
                        {studentEdit.studentEditBool ? (
                          <span className={classes.labelAsterisk}> *</span>
                        ) : null}
                      </Typography>
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
        {projects && skills ? (
          <>
            <Grid container justify="flex-end">
              <StudentProjectAdd
                skills={skills}
                setProjects={setProjects}
                projects={projects}
              />
            </Grid>
            <StudentProject
              projects={projects}
              setProjects={setProjects}
              skills={skills}
            />
          </>
        ) : null}
        <StudentProjectScroll showBelow={250} />
      </div>
      <Snackbar
        open={updateFailed}
        autoHideDuration={6000}
        onClose={handleCloseUpdateFailed}>
        <Alert onClose={handleCloseUpdateFailed} severity="error">
          {alert}
        </Alert>
      </Snackbar>
    </>
  );
}
