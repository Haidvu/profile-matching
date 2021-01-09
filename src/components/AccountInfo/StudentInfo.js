import React, { useState, useEffect } from "react";
import "./StudentInfo.css";
import DatePicker from "react-date-picker";
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
  const [alert,setAlert] = useState("");

  const [firstStep, setFirstStep] = useState(true);
  const [studentFirst, setStudentFirst] = useState({
    first_name: "",
    last_name: "",
    student_id: "",
    date_of_birth: "",
    graduation_date: "",
    major: "Architecture",
    degree: "Undergraduate",
    contact_email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipcode:"",
    username: parseInt(localStorage.getItem("email_id")),
  });
  const [errorsFirst, setErrorsFirst] = useState({});
  const [errorsSecond, setErrorsSecond] = useState({});

  const [studentSecond, setStudentSecond] = useState({
    student_description: "",
  });

  const handleChangeFirst = (e) => {
    setStudentFirst({
      ...studentFirst,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSecond = (e) => {
    setStudentSecond({
      ...studentSecond,
      [e.target.name]: e.target.value,
    });
  };
  const [valueDateOfBirth, setDateOfBirth] = useState(new Date());
  const valueTodaysDate = new Date();
  const [valueGraduationDate, setGraduationDate] = useState(new Date());
  // const [image, setImage] = useState("");
  // const [resume, setResume] = useState("");
  const [skills, setSkills] = useState();
  const [tempSkill, setTempSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [mySkills, setMySkills] = useState([]);

  const getSkills = async () => {
    const response = await axios.get(
      `http://18.213.74.196:8000/api/skill/`,
      getConfig()
    );
    setSkills(response.data);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const handleSubmit = () => {
    if (mySkills.length === 0) {
      setAlert("Please enter at least one skill with experience");
      setUpdateFailed(true);
    } else {
      setUpdateFailed(false);
      setAlert("");
      setErrorsSecond({
        student_description:
          studentSecond.student_description === "" ? "Required" : null,
      });
    }
  };

  function validateStudentId(studentID) {
    if (studentID === "") {
      return "Required";
    }if (!parseInt(studentID) || studentID.length < 7) {
     setAlert("Please enter valid PeopleSoft ID!");
     setUpdateFailed(true);
    }else{
      setUpdateFailed(false);
      setAlert("")
    }
    return null;
  }

  const getAddress = (values) => {
    if (values.address && values.city && values.state) {
      return `${values.address}|${values.city}|${values.state}`;
    }
    return "";
  };

  const nextStep = () => {
    studentFirst.date_of_birth = valueDateOfBirth.toJSON().substring(0, 10);
    studentFirst.graduation_date = valueGraduationDate
      .toJSON()
      .substring(0, 10);
    setErrorsFirst({
      first_name: studentFirst.first_name === "" ? "Required" : null,
      last_name: studentFirst.last_name === "" ? "Required" : null,
      student_id: validateStudentId(studentFirst.student_id),
      phoneNumber: studentFirst.phoneNumber === "" ? "Required" : null,
      contact_email: studentFirst.contact_email === "" ? "Required" : null,
      address: studentFirst.address === "" ? "Required" : null,
      city: studentFirst.city === "" ? "Required" : null,
      state: studentFirst.state === "" ? "Required" : null,
      zipcode: studentFirst.zipcode === "" ? "Required" : null,
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
      if (errors) {
        setFirstStep(true);
      } else {
        setFirstStep(false);
      }
    }
  }, [errorsFirst]);

  const goBack = () => {
    setFirstStep(true);
  };

  useEffect(() => {
    if (Object.entries(errorsSecond).length !== 0) {
      let errors = false;
      Object.keys(errorsSecond).forEach((key) => {
        if (errorsSecond[key] !== null) {
          errors = true;
        }
      });
      if (!errors) {
        const data = {
          student_id: studentFirst.student_id,
          full_name: studentFirst.first_name + " " + studentFirst.last_name,
          date_of_birth: studentFirst.date_of_birth,
          student_contact_email:studentFirst.contact_email,
          student_phone_no: studentFirst.phoneNumber,
          graduation_date: studentFirst.graduation_date,
          major: studentFirst.major,
          degree: studentFirst.degree,
          student_address: getAddress(studentFirst),
          student_zip: studentFirst.zipcode,
          student_description: studentSecond.student_description,
          username: parseInt(localStorage.getItem("email_id")),
        };
        axios
          .post(
            "http://18.213.74.196:8000/api/student_profile/create",
            data,
            getConfig()
          )
          .then((res) => {
            localStorage.setItem("slug", res.data.slug);
            const student_db_id = res.data.student_db_id;
            axios
              .post(
                "http://18.213.74.196:8000/api/student_skill/add",
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
  }, [errorsSecond]);

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
          {firstStep === true ? (
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
                        errorsFirst.phoneNumber && studentFirst.phoneNumber === ""
                      }
                      variant="outlined"
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      onChange={handleChangeFirst}
                      value={studentFirst.phoneNumber}
                      fullWidth
                      required={true}
                      inputProps={{ maxLength: 11 }}
                    />
                    {errorsFirst.phoneNumber && studentFirst.phoneNumber === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.phoneNumber && studentFirst.phoneNumber === ""
                        }
                      >
                        {errorsFirst.phoneNumber}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <TextField
                      error={errorsFirst.address && studentFirst.address === ""}
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Street Address"
                      name="address"
                      onChange={handleChangeFirst}
                      value={studentFirst.address}
                      inputProps={{ maxLength: 40 }}
                    />
                    {errorsFirst.address && studentFirst.address === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.address && studentFirst.address === ""
                        }
                      >
                        {errorsFirst.address}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                      <TextField
                        error={errorsFirst.city && studentFirst.city === ""}
                        variant="outlined"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        onChange={handleChangeFirst}
                        value={studentFirst.city}
                        inputProps={{ maxLength: 20 }}
                      />
                      {errorsFirst.city && studentFirst.city === "" ? (
                        <FormHelperText
                          error={errorsFirst.city && studentFirst.city === ""}
                        >
                          {errorsFirst.address}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                  <Grid
                    container
                    xs={12}
                    id="address-container-1"
                    item
                    direction="row"
                    spacing={2}
                    >
                    <Grid item>
                      <FormControl
                        error={errorsFirst.state && studentFirst.state === ""}
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel>ST</InputLabel>
                        <Select
                          label="State"
                          value={studentFirst.state}
                          onChange={handleChangeFirst}
                          defaultValue=""
                          name="state"
                        >
                          {states.map((state) => (
                            <MenuItem value={state} key={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                        {errorsFirst.state && studentFirst.state === "" ? (
                          <FormHelperText>{errorsFirst.state}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <TextField
                        error={errorsFirst.zipcode && studentFirst.zipcode === ""}
                        variant="outlined"
                        fullWidth
                        id="zipcode"
                        label="Zipcode"
                        name="zipcode"
                        onChange={handleChangeFirst}
                        value={studentFirst.zipcode}
                        inputProps={{ maxLength: 5 }}
                      />
                      {errorsFirst.zipcode && studentFirst.zipcode === "" ? (
                        <FormHelperText
                          error={errorsFirst.zipcode && studentFirst.zipcode === ""}
                        >
                          {errorsFirst.zipcode}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                  </Grid>
              </Grid>
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
                        errorsFirst.student_id && studentFirst.student_id === ""
                      }
                      inputProps={{ maxLength: 7 }}
                      variant="outlined"
                      id="student_id"
                      label="PeopleSoft ID"
                      name="student_id"
                      onChange={handleChangeFirst}
                      value={studentFirst.student_id}
                      required={true}
                      fullWidth
                    />
                    {errorsFirst.student_id &&
                    studentFirst.student_id === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.student_id &&
                          studentFirst.student_id === ""
                        }
                      >
                        {errorsFirst.student_id}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <TextField
                      error={
                        errorsFirst.contact_email && studentFirst.contact_email === ""
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
                    {errorsFirst.contact_email && studentFirst.contact_email === "" ? (
                      <FormHelperText
                        error={
                          errorsFirst.contact_email && studentFirst.contact_email === ""
                        }
                      >
                        {errorsFirst.contact_email}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <Typography component="p">Graduation Date</Typography>
                    <DatePicker
                      calendarAriaLabel="Toggle calendar"
                      clearAriaLabel="Clear value"
                      dayAriaLabel="Day"
                      monthAriaLabel="Month"
                      nativeInputAriaLabel="Date"
                      onChange={(valueGraduationDate) => {
                        setGraduationDate(valueGraduationDate);
                      }}
                      value={valueGraduationDate}
                      yearAriaLabel="Year"
                      defaultValue={valueGraduationDate}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel>Major</InputLabel>
                      <Select
                        native
                        label="Major"
                        name="major"
                        id="major"
                        value={studentFirst.major}
                        onChange={handleChangeFirst}
                      >
                        type={"search"}
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
                          <option value="American Sign Language Interpreting">
                            American Sign Language Interpreting
                          </option>
                          <option value="Anthropology">Anthropology</option>
                          <option value="Chinese Studies">
                            Chinese Studies
                          </option>
                          <option value="Communication Sciences and Disorders">
                            Communication Sciences and Disorders
                          </option>
                          <option value="Communication Studies">
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

                          <option value="Women’s,_Gender,_and_Sexuality_Studies">
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
                          <option value="Earth Science">Earth Science</option>
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
                          <option value="Retailing and Consumer Science">
                            Retailing and Consumer Science{" "}
                          </option>
                          <option value="Supply Chain and Logistics Technology">
                            Supply Chain and Logistics Technology
                          </option>
                          <option value="Technology Leadership and Innovation Management ">
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
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel>Degree type</InputLabel>
                        <Select
                          native
                          label="Degree Type"
                          name="degree"
                          id="degree"
                          value={studentFirst.degree}
                          onChange={handleChangeFirst}
                        >
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Graduate">Graduate</option>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography component="p">Date of Birth</Typography>
                    <DatePicker
                      calendarAriaLabel="Toggle calendar"
                      clearAriaLabel="Clear value"
                      dayAriaLabel="Day"
                      monthAriaLabel="Month"
                      nativeInputAriaLabel="Date"
                      onChange={(valueDateOfBirth) => {
                        setDateOfBirth(valueDateOfBirth);
                      }}
                      value={valueDateOfBirth}
                      yearAriaLabel="Year"
                      defaultValue={valueDateOfBirth}
                      maxDate={valueTodaysDate}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Bottom Buttons */}
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={nextStep}
                    size="large"
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                direction="row"
                spacing={2}
                justify="space-between"
                alignItems="flex-start"
              >
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
                {/* Right part */}
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
                    <Typography>No skills Added</Typography>
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
                  <Grid item>
                    <TextField
                      error={
                        errorsSecond.student_description &&
                        studentSecond.student_description === ""
                      }
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                      id="student_description"
                      label="Description"
                      name="student_description"
                      onChange={handleChangeSecond}
                      value={studentSecond.student_description}
                      inputProps={{ maxLength: 500 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="flex-end" spacing={3}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.submit}
                    onClick={goBack}
                    size="large"
                  >
                    Go Back
                  </Button>
                </Grid>
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
          )}
          <Snackbar
          open={updateFailed}
          autoHideDuration={6000}
          onClose={handleCloseUpdateFailed}>
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
