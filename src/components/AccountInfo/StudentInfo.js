import React, { useState } from "react";
import { useFormik } from "formik";
import "./StudentInfo.css";
import DatePicker from "react-date-picker";
import { Grid, Button, TextField } from "@material-ui/core";
import studentImage from "../../assets/StudentImagePlaceholder.png";

const initialValues = {
  firstName: "",
  lastName: "",
  studentEmail: "",
  dateOfBirth: "",
  studentId: "",
  graduationDate: "",
  major: "",
  degree: "",
  degreeType: "",
  imageUrl: "",
  skills: "",
  resumeUrl: "",
  description: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  }

  if (!values.studentEmail) {
    errors.studentEmail = "Required";
  }

  if (!values.dateOfBirth || values.dateOfBirth === null) {
    errors.dateOfBirth = "Required";
  }

  if (!values.studentId) {
    errors.studentId = "Required";
  }

  if (!values.graduationDate || values.graduationDate === null) {
    errors.graduationDate = "Required";
  }

  if (!values.major) {
    errors.major = "Required";
  }

  if (!values.degree) {
    errors.degree = "Required";
  }

  if (!values.degreeType) {
    errors.degreeType = "Required";
  }

  if (!values.skills) {
    errors.skills = "Required";
  }

  if (!values.resumeUrl) {
    errors.resumeUrl = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  return errors;
};

function NextClickButton(props) {
  return (
    <button
      className="button-left button-red"
      onClick={props.onClick}
      type="submit"
    >
      {props.name}
    </button>
  );
}

function BackClickButton(props) {
  return (
    <button className="button-left button-white" onClick={props.onClick}>
      {props.name}
    </button>
  );
}
const onSubmit = (values) => {
  console.log("Form data", values);
};

function StudentInfo() {
  const [valueDateOfBirth, setDateOfBirth] = useState(new Date());
  const [valueGraduationDate, setGraduationDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [resume, setResume] = useState("");

  // const [skills, setSkill] = useState([]); // This is not done

  const formik = useFormik({
    initialValues,
    validate,
  });

  let buttonNext = (
    <NextClickButton
      name={"Continue"}
      onClick={() => {
        if (currentPage === 1) {
          //Check for errors
          //console.log(formik.errors);
          //console.log("clicked");
          //console.log(currentPage);

          if (
            formik.touched.firstName &&
            formik.touched.lastName &&
            formik.touched.studentEmail &&
            formik.touched.studentId
          ) {
            setCurrentPage(2);
          }
        } else if (currentPage === 2) {
          // Check for errors in this page
        }
      }}
    />
  );

  let buttonBack = (
    <BackClickButton
      name={"Go Back"}
      onClick={() => {
        if (currentPage === 2) {
          setCurrentPage(1);
        }
      }}
    />
  );

  if (currentPage === 1) {
    return (
      <div className="form_student_info">
        <div className="form_container_studentinfo">
          <h1>Student Account Information</h1>
          <hr className="separator" />

          <form>
            <div className="row">
              <div className="column">
                <div className="form-control">
                  <h4>First Name:</h4>
                  <input
                    className="form_input"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="enter your first name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    required
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error">{formik.errors.firstName}</div>
                  ) : null}
                </div>

                <div className="form-control">
                  <h4>Last Name:</h4>
                  <input
                    className="form_input"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="enter your last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    required
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error">{formik.errors.lastName}</div>
                  ) : null}
                </div>

                <div className="form-control">
                  <h4>Student Email:</h4>
                  <input
                    className="form_input"
                    type="email"
                    id="studentEmail"
                    name="studentEmail"
                    placeholder="enter your student email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.studentEmail}
                    required
                  />
                  {formik.touched.studentEmail && formik.errors.studentEmail ? (
                    <div className="error">{formik.errors.studentEmail}</div>
                  ) : null}
                </div>

                <div className="form-control">
                  <h4>Date Of Birth:</h4>
                  <div className="date-picker">
                    <DatePicker
                      calendarAriaLabel="Toggle calendar"
                      clearAriaLabel="Clear value"
                      dayAriaLabel="Day"
                      monthAriaLabel="Month"
                      nativeInputAriaLabel="Date"
                      onChange={(valueDateOfBirth) => {
                        setDateOfBirth(valueDateOfBirth);
                        formik.values.dateOfBirth = valueDateOfBirth;
                        console.log(valueDateOfBirth);
                      }}
                      value={valueDateOfBirth}
                      yearAriaLabel="Year"
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                      <div className="error">{formik.errors.dateOfBirth}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="form-control">
                  <h4>Student ID:</h4>
                  <input
                    className="form_input"
                    type="text"
                    id="studentId"
                    name="studentId"
                    placeholder="enter your student ID"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.studentId}
                    required
                  />
                  {formik.touched.studentId && formik.errors.studentId ? (
                    <div className="error">{formik.errors.studentId}</div>
                  ) : null}
                </div>

                <div className="form-control">
                  <h4>Graduation Date:</h4>

                  <div className="date-picker">
                    <DatePicker
                      calendarAriaLabel="Toggle calendar"
                      clearAriaLabel="Clear value"
                      dayAriaLabel="Day"
                      monthAriaLabel="Month"
                      nativeInputAriaLabel="Date"
                      onChange={(valueGraduationDate) => {
                        setGraduationDate(valueGraduationDate);
                        formik.values.graduationDate = valueGraduationDate;
                        console.log(valueGraduationDate);
                      }}
                      value={valueGraduationDate}
                      yearAriaLabel="Year"
                    />
                    {formik.touched.graduationDate &&
                    formik.errors.graduationDate ? (
                      <div className="error">
                        {formik.errors.graduationDate}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="form-control">
                  <h4>Major:</h4>

                  <select
                    name="major"
                    className="list_of_all_majors form_input"
                    id="major"
                    onBlur={formik.handleBlur}
                    value={formik.values.major}
                    onChange={formik.handleChange}
                  >
                    <optgroup label="Gerald D. Hines College of Architecture and Design">
                      <option value="Architecture">Architecture</option>
                      <option value="Environmental_Design">
                        Environmental Design
                      </option>
                      <option value="Industrial_Design">
                        Industrial Design
                      </option>
                      <option value="Interior_Architecture">
                        Interior Architecture
                      </option>
                    </optgroup>
                    <optgroup label="Kathrine G. McGovern College of the Arts">
                      <option value="Applied_Music">Applied Music</option>
                      <option value="Art">Art</option>
                      <option value="Art_History">Art History</option>
                      <option value="Dance">Dance</option>
                      <option value="Graphic_Design">Graphic Design</option>
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
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="Finance">Finance</option>
                      <option value="Management">Management</option>
                      <option value="Management_Information_Systems">
                        Management Information Systems
                      </option>
                      <option value="Marketing">Marketing</option>
                      <option value="Suppy_Chain_Management">
                        Suppy Chain Management
                      </option>
                    </optgroup>
                    <optgroup label="College of Education">
                      <option value="Health">Health</option>
                      <option value="Human_Development_and_Family_Studies">
                        Human Development and Family Studies
                      </option>
                      <option value="Teaching_and_Learning">
                        Teaching and Learning
                      </option>
                    </optgroup>
                    <optgroup label="Cullen College of Engineering">
                      <option value="Biomedical_Engineering">
                        Biomedical Engineering
                      </option>

                      <option value="Chemical_Engineering">
                        Chemical Engineering
                      </option>

                      <option value="Civil_Engineering">
                        Civil Engineering
                      </option>

                      <option value="Computer_Engineering">
                        Computer Engineering
                      </option>

                      <option value="Computer_Engineering_and_Analytics">
                        Computer Engineering and Analytics
                      </option>
                      <option value="Construction_Engineering">
                        Construction Engineering
                      </option>
                      <option value="Electrical_Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Industrial_Engineering">
                        Industrial Engineering
                      </option>
                      <option value="Mechanical_Engineering">
                        Mechanical Engineering
                      </option>
                      <option value="Petroleum_Engineering">
                        Petroleum Engineering
                      </option>
                      <option value="Systems_Engineering">
                        Systems Engineering
                      </option>
                    </optgroup>
                    <optgroup label="Conrad N. Hilton College of Hotel and Restaurant Management">
                      <option value="Hotel_and_Restaurant_Management">
                        Hotel and Restaurant Management
                      </option>
                    </optgroup>
                    <optgroup label="College of Liberal Arts and Social Sciences">
                      <option value="African_American_Studies">
                        African American Studies
                      </option>
                      <option value="American_Sign_Language_Interpreting">
                        American Sign Language Interpreting
                      </option>
                      <option value="Anthropology">Anthropology</option>
                      <option value="Chinese_Studies">Chinese Studies</option>
                      <option value="Communication_Sciences_and_Disorders">
                        Communication Sciences and Disorders
                      </option>
                      <option value="Communication_Studies">
                        Communication Studies
                      </option>
                      <option value="Economics">Economics</option>
                      <option value="English">English</option>
                      <option value="Exercise_Science">Exercise Science</option>
                      <option value="Fitness_and_Sports">
                        Fitness and Sports
                      </option>

                      <option value="French">French</option>
                      <option value="Health_Communication">
                        Health Communication
                      </option>
                      <option value="History">History</option>
                      <option value="Human_Nutrition_and_Foods">
                        Human Nutrition and Foods
                      </option>
                      <option value="Journalism">Journalism</option>
                      <option value="Liberal_Studies">Liberal Studies</option>
                      <option value="Media_Production">Media Production</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="Political Science">
                        Political Science
                      </option>
                      <option value="Psychology">Psychology</option>
                      <option value="Religious_Studies">
                        Religious Studies
                      </option>
                      <option value="Sociology">Sociology</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Sports_Administration">
                        Sports Administration
                      </option>
                      <option value="Strategic_Communication">
                        Strategic Communication
                      </option>

                      <option value="Women’s,_Gender,_and_Sexuality_Studies">
                        Women’s, Gender, and Sexuality Studies
                      </option>
                      <option value="World_Cultures_and_Literatures">
                        World Cultures and Literatures
                      </option>
                    </optgroup>
                    <optgroup label="College of Natural Sciences and Mathematics">
                      <option value="Biochemical_and_Biophysical_Sciences">
                        Biochemical and Biophysical Sciences
                      </option>
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Computer_Science">Computer Science</option>
                      <option value="Earth_Science">Earth Science</option>
                      <option value="Environmental_Sciences">
                        Environmental Sciences
                      </option>
                      <option value="Geology">Geology</option>
                      <option value="Geophysics">Geophysics</option>
                      <option value="Honors_Biomedical_Sciences">
                        Honors Biomedical Sciences
                      </option>
                      <option value="Mathematical_Biology">
                        Mathematical Biology
                      </option>
                      <option value="Mathematics">Mathematics</option>

                      <option value="Physics">Physics</option>
                    </optgroup>
                    <optgroup label="College of Nursing">
                      <option value="Pre-Nursing">Pre-Nursing</option>
                      <option value="Nursing,_BSN_(RN-BSN)">
                        Nursing, BSN (RN-BSN)
                      </option>
                      <option value="Nursing,_BSN_(Second_Degree)">
                        Nursing, BSN (Second Degree)
                      </option>
                    </optgroup>
                    <optgroup label="College of Technology">
                      <option value="Biotechnology">Biotechnology</option>

                      <option value="Computer_Engineering_Technology">
                        Computer Engineering Technology
                      </option>
                      <option value="Computer_Information_Systems">
                        Computer Information Systems
                      </option>
                      <option value="Construction_Management">
                        Construction Management
                      </option>
                      <option value="Digital_Media">Digital Media</option>
                      <option value="Electrical_Power_Engineering_Technology">
                        Electrical Power Engineering Technology
                      </option>
                      <option value="Human_Resources_Development">
                        Human Resources Development
                      </option>
                      <option value="Mechanical_Engineering_Technology">
                        Mechanical Engineering Technology
                      </option>
                      <option value="Retailing_and_Consumer_Science">
                        Retailing and Consumer Science{" "}
                      </option>
                      <option value="Supply_Chain_and_Logistics_Technology">
                        Supply Chain and Logistics Technology
                      </option>
                      <option value="Technology_Leadership_and_Innovation_Management ">
                        Technology Leadership and Innovation Management{" "}
                      </option>
                    </optgroup>
                    <optgroup label="Pre-Professional Tracks">
                      <option value="Pre-Dentistry">Pre-Dentistry</option>
                      <option value="Pre-Law">Pre-Law</option>
                      <option value="Pre-Medicine">Pre-Medicine</option>
                      <option value="Pre-Optometry">Pre-Optometry</option>
                      <option value="Pre-Pharmacy">Pre-Pharmacy</option>
                      <option value="Pre-Physical_Therapy">
                        Pre-Physical Therapy
                      </option>
                      <option value="Pre-Veterinary_Medicine">
                        Pre-Veterinary Medicine
                      </option>
                    </optgroup>
                  </select>
                </div>

                <div className="row">
                  <div className="column-small">
                    <div className="form-control">
                      <h4>Degree:</h4>

                      <select
                        name="degree"
                        className="list_of_all_degrees form_input"
                        id="degree"
                        onBlur={formik.handleBlur}
                        value={formik.values.degree}
                        onChange={formik.handleChange}
                      >
                        <option value="BA">B.A.</option>
                        <option value="BS">B.S.</option>
                        <option value="BFA">B.F.A.</option>
                        <option value="BAS">B.A.S.</option>
                      </select>
                    </div>
                  </div>
                  <div className="column-small">
                    <div className="form-control">
                      <h4>Degree Type:</h4>

                      <select
                        name="degreeType"
                        className="list_of_all_degrees_type form_input"
                        id="degreeType"
                        onBlur={formik.handleBlur}
                        value={formik.values.degreeType}
                        onChange={formik.handleChange}
                      >
                        <option value="undergrad">Undergraduate</option>
                        <option value="grad">Graduate</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-nav">
              {buttonBack}
              {buttonNext}
            </div>
          </form>
        </div>
      </div>
    );
  } else if (currentPage === 2) {
    return (
      <div className="form_student_info">
        <div className="form_container_studentinfo">
          <h1>Student Profile</h1>
          <hr className="separator" />

          <form>
            <Grid container direction="row" className="form-grid">
              <Grid
                container
                item
                xs={4}
                direction="column"
                alignitems="center"
              >
                <Grid item>
                  <label>Student Image</label>
                </Grid>
                <Grid item>
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
                        formik.resumeUrl = e.target.files[0].name;
                      }}
                    />
                    <Button
                      className="upload_resume_button"
                      variant="contained"
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={6}
                direction="column"
                alignitems="center"
              >
                <Grid item>
                  <div className="form-control">
                    <h4>Skills</h4>

                    <select
                      name="degree"
                      className="list_of_all_degrees form_input"
                      id="degree"
                      onBlur={formik.handleBlur}
                      value={formik.values.degree}
                      onChange={formik.handleChange}
                    >
                      <option value="java">java</option>
                      <option value="c++">c++</option>
                      <option value="python">python</option>
                      <option value="c#">c#</option>
                    </select>
                  </div>
                </Grid>
                <Grid item>
                  <h4>Resume:</h4>
                  <label htmlFor="upload-resume">
                    <input
                      style={{ display: "none" }}
                      id="upload-resume"
                      name="upload-resume"
                      type="file"
                      onChange={(e) => {
                        formik.resumeUrl = e.target.files[0].name;

                        setResume(formik.resumeUrl);
                      }}
                    />
                    <Button
                      className="upload_resume_button"
                      variant="contained"
                      component="span"
                    >
                      Upload Resume
                    </Button>
                    <span className="resumeName"> {resume}</span>
                  </label>
                </Grid>
                <Grid item>
                  <h4>Description:</h4>
                  <TextField
                    className="description"
                    id="outlined-textarea"
                    label="Tell us about you"
                    multiline
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <div className="button-nav">
              {buttonBack}
              <button
                className="button-left button-red"
                onClick={onSubmit(formik.values)}
                type="submit"
              >
                {"Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default StudentInfo;
