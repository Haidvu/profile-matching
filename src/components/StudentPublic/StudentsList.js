import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Chip,
  ButtonBase,
  Button,
  Card,
  Link,
  CardActionArea,
  Tabs,
  Tab,
  Box,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import StudentDetailed from "./StudentDetailed";
import { Route, useRouteMatch, useHistory, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0px 1px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)`,
    borderRadius: theme.spacing(0.5),
    "&:hover": {
      cursor: "pointer",
    },
  },
  studentName: {
    fontWeight: "bold",
    fontSize: "1.3rem",
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
    fontSize: "1rem",
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
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const StudentsList = () => {
  let { path } = useRouteMatch();
  let history = useHistory();
  const [studentsList, setStudentsList] = useState();
  const [singleStudent, setSingleStudnet] = useState();
  const classes = useStyles();
  //   const formatGraduationDate = (date) => {
  //     const dateElements = date.split("-");
  //     const date = dateElements[dateElements.length - 1];
  //   };

  useEffect(() => {
    axios
      .get(`http://18.213.74.196:8000/api/student_profile/`, getConfig())
      .then((res) => {
        console.log(res.data);
        // let data = res.data;
        res.data.forEach((student) => {
          student.student_skill = student.student_skill.split(" ");
        });
        setStudentsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid container spacing={4} className={classes.gridRoot}>
      {studentsList
        ? studentsList.map((student, index) => (
            <Grid item key={index}>
              <Card className={classes.card}>
                <CardHeader
                  classes={{
                    root: classes.cardHeader,
                    title: classes.studentName,
                    subheader: classes.subheader,
                  }}
                  avatar={<Avatar className={classes.largeAvatar}></Avatar>}
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
                  <div className={classes.skillsRoot}>
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
                  </div>
                </CardContent>
                <Divider></Divider>
                <CardContent>
                  <Link to={`${path}/${index}`}>
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
              <Switch>
                <Route
                  exact
                  path={`${path}/:userId`}
                  component={() => (
                    <StudentDetailed studentsList={studentsList} />
                  )}
                />
              </Switch>
            </Grid>
          ))
        : null}
      {/* <pre>{JSON.stringify(studentsList, null, 2)}</pre> */}
      {/* {singleStudent ? <StudentDetailed student={singleStudent} /> : null} */}
    </Grid>
  );
};

export default StudentsList;
