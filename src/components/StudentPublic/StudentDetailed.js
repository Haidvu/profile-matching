import React, { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  Typography,
  Grid,
  Chip,
  ListItemText,
  LinearProgress,
  Dialog,
} from "@material-ui/core";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import clsx from "clsx";
import WebRoundedIcon from "@material-ui/icons/WebRounded";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import StarsIcon from "@material-ui/icons/Stars";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import SaveStudent from "./SaveStudent";
import PersonIcon from "@material-ui/icons/Person";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SaveIcon from "@material-ui/icons/Save";
import StudentDashboard from "../../assets/StudentDashboard.jpg";

const useStyles = makeStyles((theme) => ({
  dialogInput: {
    paddingBottom: theme.spacing(2),
  },
  loginAlert: {
    marginBottom: theme.spacing(2),
  },
  inline: {
    display: "inline",
  },
  dialogConfirm: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  profileLogo: {
    backgroundRepeat: "no-repeat",
    position: "relative",
    objectPosition: "20% 30%",
    width: "100vw",
    height: "15vw",
    maxWidth: "100%",
    zIndex: 1,
    objectFit: "cover",
  },
  root: {
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  skills: {
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    color: "#5B5B5B",
    padding: "1%",
    width: "20px",
  },
  skillsContainer: {
    "& > *": {
      marginRight: theme.spacing(1),
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
  select: {
    width: "30vh",
    fontSize: "small",
  },
  myProjects: {
    fontWeight: "bold",
    color: "#606060",
    padding: "0 auto",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  skillRoot: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    "& > * ": {
      margin: theme.spacing(0.5),
    },
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
  right: {
    position: "static",
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
  projectsContainer: {
    marginLeft: theme.spacing(0),
  },
  projectTitle: {
    textTransform: "uppercase",
  },
  speedDial: {
    position: "absolute",
    right: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  verticalElementTitle: {
    margin: 0,
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  projectLabels: {
    marginRight: theme.spacing(1),
  },
  chips: {
    marginTop: theme.spacing(1),
    color: "#FFFFFF",
    background: "#C8102E",
    margin: theme.spacing(0.3),
  },
  projectDescLabel: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  projectDesc: {
    marginBottom: theme.spacing(5),
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 1),
  },
  projectLink: {
    marginBottom: theme.spacing(1),
  },
  link: {
    color: "0000EE",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  projectDate: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
  },
  projectTimeline: {
    marginLeft: theme.spacing(1),
  },
}));

const actions = [{ icon: <SaveIcon />, name: "Save Student" }];

const StudentDetailed = ({ match }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();
  const [studentProjects, setStudentProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getStudent = useCallback(() => {
    const student = axios.get(
      `/student_profile/id/${match.params.id}`,
      getConfig()
    );
    const studentProjects = axios.post(
      `/student_project/list_by_student`,
      {
        student_db_id: match.params.id,
      },
      getConfig()
    );
    axios.all([student, studentProjects]).then(
      axios.spread((...responses) => {
        const studentRes = responses[0];
        const studentProjectRes = responses[1];
        setStudent(studentRes.data);
        setStudentProjects(studentProjectRes.data);
        setLoading(false);
      })
    );
  }, [match.params.id]);

  useEffect(() => {
    getStudent();
  }, [getStudent]);

  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
         <img
          alt="profile background"
          className={classes.profileLogo}
          src={StudentDashboard}
        ></img>
          <Grid container>
            <List className={classes.root}>
              <ListItem>
                <ListItemIcon edge="start">
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>
                  <div
                    className={classes.flexRow}
                    style={{ justifyContent: "space-between" }}>
                    <div className={classes.flexColumn}>
                      <Typography className={classes.sectionHeader}>
                        Name
                      </Typography>
                      <Typography className={classes.sectionContent}>
                        {student.full_name}
                      </Typography>
                    </div>
                  </div>
                </ListItemText>
              </ListItem>

              <Divider variant="inset" component="li" />

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
                        Bio
                      </Typography>
                      <Typography className={classes.sectionContent}>
                        {student.student_description}
                      </Typography>
                    </div>
                  </div>
                </ListItemText>
              </ListItem>

              <Divider variant="inset" component="li" />

              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <StarsIcon />
                </ListItemIcon>
                <div className={classes.flexColumn}>
                  <Typography className={classes.sectionHeader}>
                    Skills
                  </Typography>
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
                                  }
                                : skill.experience_level === 2
                                ? {
                                    root: classes.intermediateChip,
                                  }
                                : {
                                    root: classes.expertChip,
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
            </List>
          </Grid>

          <Grid item>
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              className={classes.speedDial}
              icon={<SpeedDialIcon />}
              onClose={() => {
                setOpen(false);
              }}
              onOpen={() => {
                setOpen(true);
              }}
              open={open}
              direction="down"
              FabProps={{ color: "secondary" }}>
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={() => setDialogOpen(true)}
                />
              ))}
            </SpeedDial>
          </Grid>

          <Grid item container>
            {studentProjects.length > 0 ? (
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
                  <Grid item xs={12}>
                  <VerticalTimeline layout={"1-column-left"}>
                      {studentProjects.map((project, index) => (
                        <VerticalTimelineElement
                          className={classes.IconStyle}
                          iconStyle={{ background: "#C8102E", color: "#fff" }}
                          contentArrowStyle={{
                            borderRight: "7px solid #C8102E",
                          }}
                          key={index}
                          icon={<WebRoundedIcon />}
                        >
                          <div className={classes.verticalElementTitle}>
                            <h3 className={classes.projectLabels}>
                              Project Name:
                            </h3>
                            <h3 style={{ color: "rgb(200, 16, 46)" }}>
                              "{project.project_name}"
                            </h3>
                          </div>
                          <div className={classes.verticalElementTitle}>
                            <h3 className={classes.projectLabels}>
                              Project Role:
                            </h3>
                            <h3 style={{ color: "rgb(200, 16, 46)" }}>
                              {project.project_role}
                            </h3>
                          </div>
                          <div className={classes.verticalElementTitle}>
                            {project.project_tech !== "" ? (
                              project.project_tech
                                .split(",")
                                .map((skill, index) => (
                                  <Chip
                                    label={skill}
                                    className={classes.chips}
                                    key={index}
                                  />
                                ))
                            ) : (
                              <Chip label="None" className={classes.chips} />
                            )}
                          </div>
                          <div className={classes.projectDescLabel}>
                            <h3>Project Description:</h3>
                            <p
                              className={classes.projectDesc}
                              style={{ fontWeight: "lighter" }}
                            >
                              * {project.project_description}{" "}
                              {project.student_id}
                            </p>
                          </div>

                          <div className={clsx(classes.column, classes.helper)}>
                            <Typography
                              variant="caption"
                              className={classes.projectLink}
                            >
                              Project Source Link
                            </Typography>
                            <br />
                            <a
                              href={
                                project.project_tech.includes("https://")
                                  ? `${project.project_link}`
                                  : `https://${project.project_link}`
                              }
                              className={classes.link}
                              target="_blank"
                            >
                              {project.project_link}
                            </a>
                          </div>
                          <div className={classes.projectDate}>
                            <h5>Project Timeline:</h5>
                            <h5 className={classes.projectTimeline}>
                              {project.project_start_date} -{" "}
                              {project.project_in_progress
                                ? "present"
                                : project.project_end_date}
                            </h5>
                          </div>
                        </VerticalTimelineElement>
                      ))}
                    </VerticalTimeline>
                  </Grid>
                </Grid>
              </ListItem>
            ) : null}
          </Grid>
        </>
      )}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}>
        <SaveStudent studentId={match.params.id}></SaveStudent>
      </Dialog>
    </>
  );
};

export default StudentDetailed;
