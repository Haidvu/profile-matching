import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Button, Chip } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";

const useStyles = makeStyles((theme) => ({
  right: {
    position: "static",
  },
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  skillsRoot: {
    display: "flex",
    padding: theme.spacing(0.5),
    alignItems: "center",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const StudentDetailed = ({ studentsList, match }) => {
  const classes = useStyles();
  const {
    params: { userId },
  } = match;

  useEffect(() => {
    console.log("Detailed view: " + studentsList);
  }, []);
  return (
    <>
      <Grid item xs={8} className={classes.right}>
        <Paper className={classes.root}>
          <Typography>Student's Profile</Typography>
          <Typography variant="h6">{studentsList[userId].full_name}</Typography>
          {/* <Typography variant="subtitle2">{`${student.degree} ${student.major}`}</Typography>
          <Typography variant="subtitle2">{`Graduation Date: ${student.graduation_date}`}</Typography>
          <div className={classes.skillsRoot}>
            <Typography variant="subtitle2">Skills</Typography>
            {student.student_skill.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                className={classes.chip}
                color="secondary"
                size="small"
                variant="outlined"
              />
            ))}
          </div> */}
          <Button variant="outlined" color="secondary">
            Add Student to Project
          </Button>
        </Paper>
        {/* <pre>{JSON.stringify(studentsList, null, 2)}</pre> */}
      </Grid>
    </>
  );
};

export default StudentDetailed;
