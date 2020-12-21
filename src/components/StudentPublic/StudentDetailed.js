import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemSecondaryAction,
  Divider,
  ListItemIcon,
  IconButton,
  Button,
  Typography,
  Input,
  FormControl,
  MenuItem,
  Grid,
  Chip,
  Select,
  FormHelperText,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import StarsIcon from "@material-ui/icons/Stars";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
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
        <List className={classes.root}>
          <ListItem>
            <ListItemIcon edge="start">
              <FormatListBulletedTwoToneIcon />
            </ListItemIcon>
            <ListItemText>
              <div
                className={classes.flexRow}
                style={{ justifyContent: "space-between" }}>
                <div className={classes.flexColumn}>
                  <Typography className={classes.sectionHeader}>
                    Student Description
                  </Typography>
                  <Typography className={classes.sectionContent}>
                    {student.student_description}
                  </Typography>
                </div>
                <IconButton edge="end" className={classes.icon}>
                  <EditTwoToneIcon />
                </IconButton>
              </div>
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolRoundedIcon />
            </ListItemIcon>
            <div className={classes.flexColumn}>
              <Typography className={classes.sectionHeader}>
                Academic
              </Typography>
              <Typography
                className={
                  classes.sectionContent
                }>{`Graduation Date: ${student.graduation_date}`}</Typography>
              <Typography
                className={
                  classes.sectionContent
                }>{`Degree: ${student.degree}`}</Typography>
              <Typography className={classes.sectionContent}>
                {" "}
                {`Major: ${student.major}`}
              </Typography>
            </div>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            <div className={classes.flexColumn}>
              <Typography className={classes.sectionHeader}>Skills</Typography>
              <ul className={classes.skillRoot}>
                {student.student_skills.map((skill) => {
                  return (
                    <li key={skill.skill_name}>
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
                                deleteIcon: classes.intermediateDeleteIcon,
                              }
                            : {
                                root: classes.expertChip,
                                deleteIcon: classes.expertDeleteIcon,
                              }
                        }
                        label={skill.skill_name}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <HorizontalSplitIcon />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <Typography className={classes.sectionHeader}>
                  My Projects
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      )}
      {modal ? <SaveStudentModal modal={modal} setModal={setModal} /> : null}
    </>
  );
};

export default StudentDetailed;
