import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Card,
  CardMedia,
  GridList,
  Paper,
  Tooltip,
  IconButton,
  ModalManager,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import IconPython from "react-devicon/python/original";
import profileImage from "../../assets/StudentImagePlaceholder.png";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SaveStudentModal from "./SaveStudentModal";

const useStyles = makeStyles((theme) => ({
  right: {
    position: "static",
  },
  root: {
    padding: theme.spacing(5),
  },
  skillsRoot: {
    display: "flex",
    padding: theme.spacing(0.5),
    alignItems: "center",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  profileImage: {
    width: theme.spacing(10),
  },
  test: {
    backgroundColor: "none",
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  name: {
    textAlign: "left",
    fontWeight: "bold",
  },
  degree: {
    textAlign: "left",
    fontSize: "small",
  },
  skillsContainer: {
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  capsLightLabel: {
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
  },
  projectDetails: {
    fontSize: "0.8rem",
  },
  starIcon: {
    float: "right",
  },
  projectContainer: {
    marginBottom: theme.spacing(5),
  },
  projectTitle: {
    textTransform: "uppercase",
  },
}));

const StudentDetailed = ({ match }) => {
  const classes = useStyles();
  // console.log("students: " + students);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();
  const [studentProjects, setStudentProjects] = useState([]);
  const [modal, setModal] = useState(false);

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

  const getStudentProjects = async () => {
    try {
      const response = await axios.post(
        `http://18.213.74.196:8000/api/student_project/list_by_student`,

        {
          username_id: match.params.id,
        },
        getConfig()
      );
      setStudentProjects(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const openSaveStudent = () => {
    console.log("cliked star");
    setModal(true);
  };

  //http://18.213.74.196:8000/api/student_project/list_by_student

  useEffect(() => {
    getStudent();
    getStudentProjects();
    // console.log(students[id]);
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} direction="column" className={classes.root}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <img className={classes.profileImage} src={profileImage} />
            </Grid>
            <Grid item container direction="column" spacing={1} xs={3}>
              <Grid item>
                <Typography className={classes.name}>
                  {student.full_name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.degree}>
                  {`${student.degree} - ${student.major}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.starIcon}>
              <Tooltip title="Save Student to Project">
                <IconButton onClick={openSaveStudent}>
                  <StarBorderIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={classes.capsLightLabel}>
              Description
            </Typography>
            <Typography>{student.student_description}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.capsLightLabel}>Skills</Typography>
            <div className={classes.skillsContainer}>
              {student.student_skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill.skill_name}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              ))}
            </div>
          </Grid>
          <Grid item>
            <Typography className={classes.capsLightLabel}>Projects</Typography>
            {studentProjects.map((project) => (
              <Grid
                item
                container
                key={project.project_id}
                direction="column"
                className={classes.projectContainer}>
                <Grid item container column="row">
                  <Grid item xs={9}>
                    <Typography className={classes.projectTitle}>
                      {project.project_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      className={
                        classes.projectDetails
                      }>{`${project.project_start_date} - ${project.project_end_date}`}</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography className={classes.projectDetails}>
                    {project.project_description}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      {modal ? <SaveStudentModal modal={modal} setModal={setModal} /> : null}
    </>
  );
};

export default StudentDetailed;
