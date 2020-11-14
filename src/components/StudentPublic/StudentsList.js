import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Grid,
  Chip,
  Button,
  Card,
  Link,
  CardHeader,
  CardContent,
  Avatar,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  studentName: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  subheader: {
    color: theme.palette.text.primary,
  },
  skillsRoot: {
    display: "flex",
    alignItems: "center",
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  chipLabel: {
    color: theme.palette.text.primary,
  },
  qualification: {
    textTransform: "uppercase",
  },
  actionArea: {
    padding: theme.spacing(1),
    "&:focus": {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  fieldTitle: {
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
    fontSize: "0.7rem",
    letterSpacing: "0.05rem",
  },
  fieldValue: {
    fontSize: "0.7rem",
  },
  cardHeader: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardContent: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  gridRoot: {
    margin: theme.spacing(2),
  },
  card: {
    width: "280px",
  },
  button: {
    width: "100%",
  },
  noPaddingTop: {
    paddingTop: "0",
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  spinner: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const StudentsList = () => {
  let location = useLocation();
  console.log(`${location.pathname}/`);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [studentsList, setStudentsList] = useState();
  const { data, dispatch } = useContext(DataContext);
  //   const formatGraduationDate = (date) => {
  //     const dateElements = date.split("-");
  //     const date = dateElements[dateElements.length - 1];
  //   };
  const getStudents = async () => {
    try {
      const response = await axios.get(
        `http://18.213.74.196:8000/api/student_profile/`,
        getConfig()
      );
      // response.data.forEach((student) => {
      //   student.student_skill = student.student_skill.split(" ");
      // });
      dispatch({ type: "SET_STUDENTS", payload: response.data });
      setStudentsList(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" className={classes.spinner} />
      ) : (
        <Grid container spacing={4} className={classes.gridRoot}>
          {studentsList
            ? studentsList.map((student) => (
                <Grid item key={student.username_id}>
                  <Card className={classes.card}>
                    <CardHeader
                      classes={{
                        root: classes.cardHeader,
                        title: classes.studentName,
                        subheader: classes.subheader,
                      }}
                      avatar={<Avatar className={classes.avatar}></Avatar>}
                      title={student.full_name}
                      subheader={`${student.degree} - ${student.major}`}></CardHeader>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.fieldTitle}>
                        Graduation Date
                      </Typography>
                      <Typography className={classes.fieldValue}>
                        {student.graduation_date}
                      </Typography>
                    </CardContent>
                    <CardContent
                      className={`${classes.cardContent} ${classes.noPaddingTop}`}>
                      <Typography className={classes.fieldTitle}>
                        Description
                      </Typography>
                      <Typography className={classes.fieldValue}>
                        {student.student_description}
                      </Typography>
                    </CardContent>
                    <CardContent
                      className={`${classes.cardContent} ${classes.noPaddingTop}`}>
                      <Typography
                        variant="subtitle2"
                        className={classes.fieldTitle}>
                        Skills
                      </Typography>
                      {/* <div className={classes.skillsRoot}>
                        {student.student_skill.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            classes={{
                              root: classes.chip,
                              label: classes.chipLabel,
                            }}
                            color="primary"
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </div> */}
                    </CardContent>
                    <Divider></Divider>
                    <CardContent>
                      <Link
                        to={`${location.pathname}/${student.username_id}`}
                        style={{ textDecoration: "none" }}>
                        <Button
                          color="secondary"
                          size="small"
                          variant="contained"
                          className={classes.button}>
                          View Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : null}
          {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}
          {/* {singleStudent ? <StudentDetailed student={singleStudent} /> : null} */}
        </Grid>
      )}
    </>
  );
};

export default StudentsList;
