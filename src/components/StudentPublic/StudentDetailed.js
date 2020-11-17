import React, { useEffect, useState } from "react";
import { Typography, Grid, Chip, CircularProgress } from "@material-ui/core";
import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import IconPython from "react-devicon/python/original";

// const useStyles = makeStyles((theme) => ({
//   right: {
//     position: "static",
//   },
//   root: {
//     margin: theme.spacing(1),
//     padding: theme.spacing(1),
//   },
//   skillsRoot: {
//     display: "flex",
//     padding: theme.spacing(0.5),
//     alignItems: "center",
//   },
//   chip: {
//     margin: theme.spacing(0.5),
//   },
// }));

const StudentDetailed = ({ match }) => {
  // console.log("students: " + students);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();

  const getStudent = async () => {
    try {
      const response = await axios.get(
        `http://18.213.74.196:8000/api/student_profile/id/${match.params.id}`,
        getConfig()
      );
      console.log(response);
      setStudent(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStudent();
    // console.log(students[id]);
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid item>
            <Typography>{student.full_name}</Typography>
            <Typography>{student.major}</Typography>
            <Typography>{student.degree}</Typography>
            <Typography>{student.graduation_date}</Typography>
            <Typography>{student.student_description}</Typography>
            <div>
              {student.student_skills.map((skill, index) => (
                <Chip
                  icon={<IconPython />}
                  key={index}
                  label={skill.skill_name}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              ))}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default StudentDetailed;
