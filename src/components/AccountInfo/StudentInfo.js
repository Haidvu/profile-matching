import React, { useState } from "react";
import { useFormik } from 'formik'
import './StudentInfo.css';
import DatePicker from 'react-date-picker';
import { Grid, Typography, Paper, Input, Box, Container, Chip, List, ListItem, ListItemText, ListItemIcon, TextField, Select, MenuItem, IconButton, InputLabel, FormControl, FormControlLabel, Checkbox, Divider, Button } from '@material-ui/core';
import studentImage from '../../assets/StudentImagePlaceholder.png'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import makeAnimated from 'react-select/animated';
import AvatarImage from "../../assets/AvatarImage.jpg";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../../authConfig";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(7),
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,

    },
    form: {
        width: "100%",
        marginTop: theme.spacing(6),
        justifyContent: 'center'
    },
    formControl: {
        width: "100%"
    },
    checkLabel: {
        color: theme.palette.secondary
    },
    submit: {
        marginTop: theme.spacing(4),
    },
    datepicker: {
        zIndex: "1000"
    },
    icon: {
        objectFit: "contain",
        position: "relative",
        width: "5%",
        color: theme.palette.secondary.main
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        boxShadow: "none"
    },
    resumeName: {
        fontSize: "15px"
    }
}));

/*for now */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function StudentInfo() {

    const classes = useStyles();

    let history = useHistory();

    const [firstStep, setFirstStep] = useState(true)

    const initialValues = {
        firstName: '',
        lastName: '',
        studentEmail: '',
        dateOfBirth: '',
        studentId: '',
        graduationDate: '',
        major: '',
        degree: 'BS',
        degreeType: 'undergrad',
        imageUrl: '',
        skills: [],
        resumeUrl: '',
        description: '',
    }

    const [valueDateOfBirth, setDateOfBirth] = useState(new Date());
    const [valueGraduationDate, setGraduationDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [resume, setResume] = useState("");

    // const onSubmit = (values) => {};
    // data and axios will go here
    // Change the _ on the major to a space
    // Change the dates
    const onSubmit = (values) => {

        const data = {

            student_id: parseInt(values.studentId),
            full_name: values.firstName + " " + values.lastName,
            date_of_birth: values.dateOfBirth.toJSON().substring(0, 10),
            graduation_date: values.graduationDate.toJSON().substring(0, 10),
            major: values.major,
            degree: values.degree + " " + values.degreeType,
            student_skill: "Test",
            student_description: values.description,
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
                history.push("/dashboard");
            })
            .catch((err) => console.log(err.response.data));
    };

    const validate = values => {

        let errors = {}

        if (!values.firstName) {
            errors.firstName = 'Required'
        }

        if (!values.lastName) {
            errors.lastName = 'Required'
        }

        if (!values.studentEmail) {
            errors.studentEmail = 'Required'
        }

        if (!values.dateOfBirth || values.dateOfBirth === null) {
            errors.dateOfBirth = 'Required'
        }

        if (!values.studentId) {
            errors.studentId = 'Required'
        }

        if (!values.graduationDate || values.graduationDate === null) {
            errors.graduationDate = 'Required'
        }

        if (!values.major) {
            errors.major = 'Required'
        }

        if (!values.degree) {
            errors.degree = 'Required'
        }

        if (!values.degreeType) {
            errors.degreeType = 'Required'
        }

        if (!values.skills) {
            errors.skills = 'Required'
        }

        if (!values.resumeUrl) {
            errors.resumeUrl = 'Required'
        }

        if (!values.description) {
            errors.description = 'Required'
        }


        return errors
    }

    const formik = useFormik({
        initialValues,
        validate,
    })

    const nextStep = () => {
        setFirstStep(false);
    }

    const goBack = () => {
        setFirstStep(true);
    };



    const options = [{ label: 'C++', value: 0 }, { label: 'Java', value: 1 }, { label: 'C#', value: 2 }, { label: 'React', value: 3 }]

    const [skills, setSkills] = React.useState([]);

    return (<Container component="main" maxwidth="xs">
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Student Account Information
            </Typography>
            <Divider variant="inset" />
            <form className={classes.form} onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formik.values)
            }}>
                {firstStep === true ? (<>
                    <Grid container id="master" direction="row" justify="space-between" spacing={2} alignItems="flex-start">
                        {/* Left Grid */}
                        <Grid container item xs={6} spacing={3} direction="column">
                            <Grid item>
                                <TextField variant="outlined" fullWidth id="firstName" label="First Name" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} />
                            </Grid>
                            <Grid item>
                                <TextField variant="outlined" fullWidth id="lastName" label="Last Name" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} />
                            </Grid>

                            <Grid item>
                                <TextField variant="outlined" fullWidth id="studentEmail" label="Student Email" type="email" name="studentEmail" onChange={formik.handleChange} value={formik.values.studentEmail} />

                            </Grid>

                            <Grid item>
                                <Typography component="p">
                                    Date of Birth
                                </Typography>
                                <DatePicker
                                    calendarAriaLabel="Toggle calendar"
                                    clearAriaLabel="Clear value"
                                    dayAriaLabel="Day"
                                    monthAriaLabel="Month"
                                    nativeInputAriaLabel="Date"
                                    onChange={(valueDateOfBirth) => {
                                        setDateOfBirth(valueDateOfBirth);
                                        formik.values.dateOfBirth = valueDateOfBirth;
                                    }}
                                    value={valueDateOfBirth}
                                    yearAriaLabel="Year"
                                />

                            </Grid>
                        </Grid>


                        <Grid container item xs={6} spacing={3} direction="column">

                            <Grid item xs={6}>
                                <TextField variant="outlined" fullWidth id="studentId" label="Student ID" name="studentId" onChange={formik.handleChange} value={formik.values.studentId} />
                            </Grid>
                            <Grid item>
                                <Typography component="p">
                                    Graduation Date
                                </Typography>
                                <DatePicker
                                    calendarAriaLabel="Toggle calendar"
                                    clearAriaLabel="Clear value"
                                    dayAriaLabel="Day"
                                    monthAriaLabel="Month"
                                    nativeInputAriaLabel="Date"
                                    onChange={(valueGraduationDate) => {
                                        setGraduationDate(valueGraduationDate);
                                        formik.values.graduationDate = valueGraduationDate;
                                    }}
                                    value={valueGraduationDate}
                                    yearAriaLabel="Year"
                                    className={classes.datepicker}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel>Major</InputLabel>
                                    <Select native label="Major" name="major" id="major" value={formik.values.major} onChange={formik.handleChange}>
                                        <optgroup label="Gerald D. Hines College of Architecture and Design">
                                            <option value="Architecture">Architecture</option>
                                            <option value="Environmental Design">Environmental Design</option>
                                            <option value="Industrial Design">Industrial Design</option>
                                            <option value="Interior Architecture">Interior Architecture</option>
                                        </optgroup>
                                        <optgroup label="Kathrine G. McGovern College of the Arts">
                                            <option value="Applied Music">Applied Music</option>
                                            <option value="Art">Art</option>
                                            <option value="Art History">Art History</option>
                                            <option value="Dance">Dance</option>
                                            <option value="Graphic Design">Graphic Design</option>
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
                                            <option value="Management Information Systems">Management Information Systems</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Suppy Chain Management">Suppy Chain Management</option>
                                        </optgroup>
                                        <optgroup label="College of Education">
                                            <option value="Health">Health</option>
                                            <option value="Human Development and Family Studies">Human Development and Family Studies</option>
                                            <option value="Teaching and Learning">Teaching and Learning</option>
                                        </optgroup>
                                        <optgroup label="Cullen College of Engineering">

                                            <option value="Biomedical Engineering">Biomedical Engineering</option>

                                            <option value="Chemical Engineering">Chemical Engineering</option>

                                            <option value="Civil Engineering">Civil Engineering</option>

                                            <option value="Computer Engineering">Computer Engineering</option>

                                            <option value="Computer Engineering and Analytics">Computer Engineering and Analytics</option>
                                            <option value="Construction Engineering">Construction Engineering</option>
                                            <option value="Electrical Engineering">Electrical Engineering</option>
                                            <option value="Industrial Engineering">Industrial Engineering</option>
                                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                                            <option value="Petroleum Engineering">Petroleum Engineering</option>
                                            <option value="Systems Engineering">Systems Engineering</option>
                                        </optgroup>
                                        <optgroup label="Conrad N. Hilton College of Hotel and Restaurant Management">

                                            <option value="Hotel and Restaurant Management">Hotel and Restaurant Management</option>
                                        </optgroup>
                                        <optgroup label="College of Liberal Arts and Social Sciences">

                                            <option value="African American Studies">African American Studies</option>
                                            <option value="American Sign Language Interpreting">American Sign Language Interpreting</option>
                                            <option value="Anthropology">Anthropology</option>
                                            <option value="Chinese Studies">Chinese Studies</option>
                                            <option value="Communication Sciences and Disorders">Communication Sciences and Disorders</option>
                                            <option value="Communication Studies">Communication Studies</option>
                                            <option value="Economics">Economics</option>
                                            <option value="English">English</option>
                                            <option value="Exercise Science">Exercise Science</option>
                                            <option value="Fitness and Sports">Fitness and Sports</option>

                                            <option value="French">French</option>
                                            <option value="Health Communication">Health Communication</option>
                                            <option value="History">History</option>
                                            <option value="Human Nutrition and Foods">Human Nutrition and Foods</option>
                                            <option value="Journalism">Journalism</option>
                                            <option value="Liberal Studies">Liberal Studies</option>
                                            <option value="Media Production">Media Production</option>
                                            <option value="Philosophy">Philosophy</option>
                                            <option value="Political Science">Political Science</option>
                                            <option value="Psychology">Psychology</option>
                                            <option value="Religious Studies">Religious Studies</option>
                                            <option value="Sociology">Sociology</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Sports Administration">Sports Administration</option>
                                            <option value="Strategic Communication">Strategic Communication</option>

                                            <option value="Women’s,_Gender,_and_Sexuality_Studies">Women’s, Gender, and Sexuality Studies</option>
                                            <option value="World Cultures and Literatures">World Cultures and Literatures</option>
                                        </optgroup>
                                        <optgroup label="College of Natural Sciences and Mathematics">

                                            <option value="Biochemical and Biophysical Sciences">Biochemical and Biophysical Sciences</option>
                                            <option value="Biology">Biology</option>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Earth Science">Earth Science</option>
                                            <option value="Environmental Sciences">Environmental Sciences</option>
                                            <option value="Geology">Geology</option>
                                            <option value="Geophysics">Geophysics</option>
                                            <option value="Honors Biomedical Sciences">Honors Biomedical Sciences</option>
                                            <option value="Mathematical Biology">Mathematical Biology</option>
                                            <option value="Mathematics">Mathematics</option>

                                            <option value="Physics">Physics</option>
                                        </optgroup>
                                        <optgroup label="College of Nursing">

                                            <option value="Pre-Nursing">Pre-Nursing</option>
                                            <option value="Nursing, BSN (RN-BSN)">Nursing, BSN (RN-BSN)</option>
                                            <option value="Nursing, BSN (Second_Degree)">Nursing, BSN (Second Degree)</option>
                                        </optgroup>
                                        <optgroup label="College of Technology">

                                            <option value="Biotechnology">Biotechnology</option>

                                            <option value="Computer Engineering Technology">Computer Engineering Technology</option>
                                            <option value="Computer Information Systems">Computer Information Systems</option>
                                            <option value="Construction Management">Construction Management</option>
                                            <option value="Digital Media">Digital Media</option>
                                            <option value="Electrical Power Engineering Technology">Electrical Power Engineering Technology</option>
                                            <option value="Human Resources Development">Human Resources Development</option>
                                            <option value="Mechanical Engineering Technology">Mechanical Engineering Technology</option>
                                            <option value="Retailing and Consumer Science">Retailing and Consumer Science </option>
                                            <option value="Supply Chain and Logistics Technology">Supply Chain and Logistics Technology</option>
                                            <option value="Technology Leadership and Innovation Management ">Technology Leadership and Innovation Management </option>
                                        </optgroup>
                                        <optgroup label="Pre-Professional Tracks">

                                            <option value="Pre-Dentistry">Pre-Dentistry</option>
                                            <option value="Pre-Law">Pre-Law</option>
                                            <option value="Pre-Medicine">Pre-Medicine</option>
                                            <option value="Pre-Optometry">Pre-Optometry</option>
                                            <option value="Pre-Pharmacy">Pre-Pharmacy</option>
                                            <option value="Pre-Physical Therapy">Pre-Physical Therapy</option>
                                            <option value="Pre-Veterinary Medicine">Pre-Veterinary Medicine</option>
                                        </optgroup>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Degree</InputLabel>
                                        <Select native label="Degree" name="degree" id="degree" value={formik.values.degree} onChange={formik.handleChange}>
                                            <option value="B.A.">B.A.</option>
                                            <option value="B.S.">B.S.</option>
                                            <option value="B.F.A.">B.F.A.</option>
                                            <option value="B.A.S.">B.A.S.</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Degree type</InputLabel>
                                        <Select native label="Degree Type" name="degreeType" id="degreeType" value={formik.values.degreeType} onChange={formik.handleChange}>
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Graduate">Graduate</option>

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Bottom Buttons */}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button variant="contained" color="secondary" className={classes.submit} onClick={nextStep} size="large">Continue</Button>
                        </Grid>
                    </Grid>
               

                </>) : (
                        <>
                            <Grid container direction="row" spacing={2} justify="space-between" alignItems="flex-start">

                                <Grid container item xs={6} item direction="column" spacing={2}>
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
                                                    formik.resumeUrl = e.target.files[0].name
                                                }}
                                            />
                                            <Button className="upload_resume_button" variant="contained" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </Grid>
                                </Grid>
                                {/* Right part */}
                                <Grid container item xs={6} direction="column" spacing={3}>
                                    <Grid item>

                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-mutiple-chip-label">Skills</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-chip-label"
                                                id="demo-mutiple-chip"
                                                multiple
                                                value={formik.values.skills}
                                                onChange={(event) => {
                                                    setSkills(event.target.value);
                                                    formik.values.skills = event.target.value;
                                                }}
                                                value={skills}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {options.map((data) => (
                                                    <MenuItem key={data.value} value={data.label}>
                                                        {data.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <label htmlFor="upload-resume">
                                            <input
                                                style={{ display: "none" }}
                                                id="upload-resume"
                                                name="upload-resume"
                                                type="file"
                                                onChange={(e) => {
                                                    formik.resumeUrl = e.target.files[0].name

                                                    setResume(formik.resumeUrl)
                                                }}
                                            />
                                            <Button className="upload_resume_button" variant="contained" component="span">
                                                Upload Resume
                        </Button>
                                            <br />
                                            <p className={classes.resumeName}> {resume}</p>
                                        </label>
                                    </Grid>
                                    <Grid item>
                                        <TextField variant="outlined" multiline rows={5} fullWidth id="description" label="Description" name="description" onChange={formik.handleChange} value={formik.values.description} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justify="flex-end" spacing={3}>
                                <Grid item>
                                    <Button variant="outlined" color="secondary" className={classes.submit} onClick={goBack} size="large">Go Back</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" className={classes.submit} size="large" type="submit">Submit</Button>
                                </Grid>
                            </Grid>
                        </>)}
            </form>
        </div>
    </Container>)
};

export default StudentInfo;
