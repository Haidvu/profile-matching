import React, { useState, useEffect } from "react";
import "./StudentInfo.css";
import {
  Grid,
  Typography,
  Container,
  Chip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import studentImage from "../../assets/StudentImagePlaceholder.png";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { getConfig } from "../../authConfig";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(7),
    // flexWrap: "wrap",
    // listStyle: "none",
    // padding: theme.spacing(0.5),
    // margin: 0,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(6),
    justifyContent: "center",
  },
  formControl: {
    width: "100%",
  },
  checkLabel: {
    color: theme.palette.secondary,
  },
  submit: {
    marginTop: theme.spacing(4),
  },
  // icon: {
  //   objectFit: "contain",
  //   position: "relative",
  //   width:g "5px",
  //   color: theme.palette.secondary.main,
  // },
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    boxShadow: "none",
  },
  resumeName: {
    fontSize: "15px",
  },
  skillRoot: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
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

function StudentInfo() {
  const classes = useStyles();
  let history = useHistory();

  const [updateFailed, setUpdateFailed] = useState(false);
  const handleCloseUpdateFailed = () => {
    setUpdateFailed(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [alert, setAlert] = useState("");
  const [studentFirst, setStudentFirst] = useState({
    first_name: "",
    last_name: "",
    contact_email: "",
    zipcode: "",
    student_description: "",
    username: parseInt(localStorage.getItem("email_id")),
  });
  const [errorsFirst, setErrorsFirst] = useState({});

  const handleChangeFirst = (e) => {
    setStudentFirst({
      ...studentFirst,
      [e.target.name]: e.target.value,
    });
  };

  // const [image, setImage] = useState("");
  // const [resume, setResume] = useState("");
  const [skills, setSkills] = useState([]);
  const [tempSkill, setTempSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [mySkills, setMySkills] = useState([]);

  const getSkills = async () => {
    const response = await axios.get(`/skill/`, getConfig());
    setSkills(response.data);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const handleSubmit = () => {
    validate();
    if (mySkills.length === 0) {
      setAlert("Please enter at least one skill with experience");
      setUpdateFailed(true);
    } else {
      setUpdateFailed(false);
      setAlert("");
    }
  };

  const validate = () => {
    setErrorsFirst({
      first_name: studentFirst.first_name === "" ? "Required" : null,
      last_name: studentFirst.last_name === "" ? "Required" : null,
      phoneNumber: studentFirst.phoneNumber === "" ? "Required" : null,
      contact_email: studentFirst.contact_email === "" ? "Required" : null,
      zipcode: studentFirst.zipcode === "" ? "Required" : null,
      student_description: studentFirst.student_description === "" ? "Required" : null
    });
  };

  function replaceSkillIdWithName(student_id) {
    let returnArray = [];
    for (let i = 0; i < mySkills.length; i++) {
      for (let j = 0; j < skills.length; j++) {
        if (mySkills[i].skill_name === skills[j].skill_name) {
          returnArray.push({
            student_db_id: student_id,
            skill_id: parseInt(skills[j].id),
            experience_level: parseInt(mySkills[i].experience_level),
          });
        }
      }
    }
    return returnArray;
  }

  useEffect(() => {
    if (Object.entries(errorsFirst).length !== 0) {
      let errors = false;
      Object.keys(errorsFirst).forEach((key) => {
        if (errorsFirst[key] !== null) {
          errors = true;
        }
      });
      if (!errors) {
        const data = {
          full_name: studentFirst.first_name + " " + studentFirst.last_name,
          student_contact_email: studentFirst.contact_email,
          student_zip: studentFirst.zipcode,
          student_description: studentFirst.student_description,
          username: parseInt(localStorage.getItem("email_id")),
        };
        axios
          .post("/student_profile/create", data, getConfig())
          .then((res) => {
            localStorage.setItem("slug", res.data.slug);
            const student_db_id = res.data.student_db_id;
            axios
              .post(
                "/student_skill/add",
                replaceSkillIdWithName(student_db_id),
                getConfig()
              )
              .then((res) => {
                history.push("/dashboard");
              });
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsFirst]);

  const addSkill = () => {
    if (tempSkill && experience) {
      let unique = true;
      for (let i = 0; i < mySkills.length; i++) {
        if (mySkills[i].skill_name === tempSkill) {
          unique = false;
          setAlert(`${tempSkill} already exists`);
          setUpdateFailed(true);
          break;
        }
      }
      if (unique) {
        setMySkills([
          ...mySkills,
          {
            skill_name: tempSkill,
            experience_level: experience,
          },
        ]);
        setUpdateFailed(false);
        setAlert("");
      }
    }
  };

  const handleDelete = (skillTodelete) => () => {
    setMySkills((mySkills) =>
      mySkills.filter(
        (mySkill) => mySkill.skill_name !== skillTodelete.skill_name
      )
    );
  };

  const handleSkillChange = (e) => {
    setTempSkill(e.target.value);
  };
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  return (
    <Container component="main" maxwidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Student Account Information
        </Typography>
        <form className={classes.form}>
            <>
              <Grid
                container
                id="master"
                direction="row"
                justify="space-between"
                spacing={2}
                alignItems="flex-start"
              >
                {/* column 1 ----------------------------------------------*/}
                <Grid
                  container
                  id="first-left"
                  item
                  xs={12}
                  md={6}
                  spacing={3}
                  direction="column"
                >
                  {/* Left Grid */}
                  <Grid item>
                    <TextField
                      error={
                        errorsFirst.first_name && studentFirst.first_name === ""
                      }
                      variant="outlined"
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      onChange={handleChangeFirst}
                      fullWidth
                      value={studentFirst.first_name}
                      required={true}
                      inputProps={{ maxLength: 25 }}
                    />
                    {errorsFirst.first_name &&
                    studentFirst.first_name === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.first_name &&
                          studentFirst.first_name === ""
                        }
                      >
                        {errorsFirst.first_name}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <TextField
                      error={
                        errorsFirst.last_name && studentFirst.last_name === ""
                      }
                      variant="outlined"
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      onChange={handleChangeFirst}
                      value={studentFirst.last_name}
                      fullWidth
                      required={true}
                      inputProps={{ maxLength: 24 }}
                    />
                    {errorsFirst.last_name && studentFirst.last_name === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.last_name && studentFirst.last_name === ""
                        }
                      >
                        {errorsFirst.last_name}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <TextField
                      error={
                        errorsFirst.zipcode && studentFirst.zipcode === ""
                      }
                      variant="outlined"
                      fullWidth
                      required={true}
                      id="zipcode"
                      label="Zipcode"
                      name="zipcode"
                      onChange={handleChangeFirst}
                      value={studentFirst.zipcode}
                      inputProps={{ maxLength: 5 }}
                    />
                    {errorsFirst.zipcode && studentFirst.zipcode === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.zipcode && studentFirst.zipcode === ""
                        }
                      >
                        {errorsFirst.zipcode}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
                {/* column 2 ----------------------------------------------*/}
                <Grid
                  container
                  id="first-right"
                  item
                  xs={12}
                  md={6}
                  spacing={3}
                  direction="column"
                >
                  <Grid item>
                    <TextField
                      error={
                        errorsFirst.contact_email &&
                        studentFirst.contact_email === ""
                      }
                      variant="outlined"
                      id="contact_email"
                      label="Contact Email"
                      name="contact_email"
                      onChange={handleChangeFirst}
                      value={studentFirst.contact_email}
                      fullWidth
                      required={true}
                      inputProps={{ maxLength: 50 }}
                    />
                    {errorsFirst.contact_email &&
                    studentFirst.contact_email === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.contact_email &&
                          studentFirst.contact_email === ""
                        }
                      >
                        {errorsFirst.contact_email}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <TextField
                      error={
                        errorsFirst.student_description &&
                        studentFirst.student_description === ""
                      }
                      helperText={`${studentFirst.student_description.length}/500`}
                      variant="outlined"
                      multiline
                      rows={5}
                      required={true}
                      fullWidth
                      id="student_description"
                      label="Description"
                      name="student_description"
                      onChange={handleChangeFirst}
                      value={studentFirst.student_description}
                      inputProps={{ maxLength: 500 }}
                    />
                     {errorsFirst.student_description &&
                    studentFirst.student_description === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.student_description &&
                          studentFirst.student_description === ""
                        }
                      >
                        {errorsFirst.student_description}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
                {/* bottom skills ----------------------------------------------*/}
                <Grid container item direction="column" spacing={3}>
                    {mySkills.length > 0 ? (
                      <Grid item>
                        <Typography>My Skills: </Typography>
                        <ul className={classes.skillRoot}>
                          {mySkills.map((skill, index) => {
                            return (
                              <li key={index}>
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
                                          deleteIcon:
                                            classes.intermediateDeleteIcon,
                                        }
                                      : {
                                          root: classes.expertChip,
                                          deleteIcon: classes.expertDeleteIcon,
                                        }
                                  }
                                  label={skill.skill_name}
                                  onDelete={handleDelete(skill)}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Typography>No skills Added</Typography>
                      </Grid>
                    )}
                    <Grid item container xs spacing={2}>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Skills</InputLabel>
                          <Select
                            label="Skill"
                            id="tempskill"
                            onChange={handleSkillChange}
                            value={tempSkill}
                          >
                            type={"search"}
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
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Experience</InputLabel>
                          <Select
                            label="experience"
                            id="experience"
                            onChange={handleExperienceChange}
                            value={experience}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Beginner</MenuItem>
                            <MenuItem value={2}>Novice</MenuItem>
                            <MenuItem value={3}>Expert</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={addSkill}
                        disabled={tempSkill === "" || experience === ""}
                      >
                        Add Skill
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                 {/* <Grid item>
                      <label htmlFor="upload-resume">
                        <input
                          style={{ display: "none" }}
                          id="upload-resume"
                          name="upload-resume"
                          type="file"
                          onChange={(e) => {
                            setResume(e.target.files[0].name);
                          }}
                        />
                        <Button
                          className="upload_resume_button"
                          variant="contained"
                          component="span">
                          Upload Resume
                        </Button>
                        <br />
                        <p className={classes.resumeName}> {resume}</p>
                      </label>
                    </Grid> */}
               {/*<Grid container item xs={6} direction="column" spacing={2}>
                  <Grid item xs={12}>
                      <img className="logo-image" src={studentImage} alt="Logo" />
                    </Grid>
                    <Grid item>
                      <label htmlFor="upload-image">
                        <input
                          style={{ display: "none" }}
                          id="upload-image"
                          name="upload-image"
                          type="file"
                          onChange={(e) => {
                            setImage(e.target.files[0].name);
                          }}
                        />
                        <Button
                          className="upload_resume_button"
                          variant="contained"
                          component="span">
                          Upload Image
                        </Button>
                      </label>
                    </Grid> 
                  </Grid>*/}
              {/* Bottom Buttons */}
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    size="large"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </>
          <Snackbar
            open={updateFailed}
            autoHideDuration={6000}
            onClose={handleCloseUpdateFailed}
          >
            <Alert onClose={handleCloseUpdateFailed} severity="error">
              {alert}
            </Alert>
          </Snackbar>
        </form>
      </div>
    </Container>
  );
}

export default StudentInfo;
