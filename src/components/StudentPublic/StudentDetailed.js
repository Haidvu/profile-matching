import React, { useEffect, useState, useContext } from "react";
import { Paper, Typography, Grid, Button, Chip } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import { DataContext } from "../../contexts/dataContext";

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

const StudentDetailed = ({ match }) => {
  // console.log("students: " + students);
  const { data, dispatch } = useContext(DataContext);
  useEffect(() => {
    console.log(match);
    console.log(match.params.id);
    console.log(data);
    axios
      .get(
        `http://18.213.74.196:8000/api/student_profile/${match.params.id}`,
        getConfig()
      )
      .then((res) => {
        console.log(res.data);
        // let data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(students[id]);
  }, []);
  return <p>Student Detailed</p>;
};

export default StudentDetailed;
