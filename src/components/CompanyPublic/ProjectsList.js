import React from "react";
import {
  Typography,
  Grid,
  Chip,
  Button,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  studentName: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  subheader: {
    color: theme.palette.text.primary,
  },
  skillsRoot: {
    alignItems: "center",
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom:theme.spacing(1)
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
    backgroundColor: "white",
  },
  card: {
    width: "280px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
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
  buttonContainer: {
    justifyContent: "center",
  },
  loader: {
    position: "relative",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const ProjectsList = ({ loading, projects, noProjectsFound }) => {
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <LinearProgress
          color="secondary"
          style={{ margin: "20px" }}
        ></LinearProgress>
      ) : noProjectsFound ? (
        <Grid style={{ margin: "20px" }}>
         <Alert severity="info">
          No Projects Found!
        </Alert>
        </Grid>
      ) : (
        <Grid container justify={"center"}>
          {projects.map((project) => (
            <Grid item key={project.project_id} style={{ margin: "15px" }}>
              <Card className={classes.card}>
                <CardHeader
                  classes={{
                    root: classes.cardHeader,
                    title: classes.studentName,
                    subheader: classes.subheader,
                  }}
                  avatar={<Avatar className={classes.avatar}></Avatar>}
                  title={project.project_name}
                ></CardHeader>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.fieldTitle}>
                    Project Deadline
                  </Typography>
                  <Typography className={classes.fieldValue}>
                    {project.project_deadline}
                  </Typography>
                </CardContent>
                <CardContent
                  className={`${classes.cardContent} ${classes.noPaddingTop}`}
                >
                  <Typography className={classes.fieldTitle}>
                    Project Type
                  </Typography>
                  <Typography className={classes.fieldValue}>
                    {project.project_type ? project.project_type : "none"}
                  </Typography>
                </CardContent>
                <CardContent
                  className={`${classes.cardContent} ${classes.noPaddingTop}`}
                >
                  <Typography
                    variant="subtitle2"
                    className={classes.fieldTitle}
                  >
                    Project Tech
                  </Typography>

                  <div className={classes.skillsRoot}>
                    {project.project_tech !== "" && project.project_tech.length>0 ? (
                      project.project_tech.split(",").map((skill, index) => (
                        <>
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
                        </>
                      ))
                    ) : (
                      <Chip
                        label={"none"}
                        classes={{
                          root: classes.chip,
                          label: classes.chipLabel,
                        }}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </div>
                </CardContent>
                <Divider></Divider>
                <CardContent>
                  <Link
                    to={{
                      pathname: `projects/${project.project_id}`,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      color="secondary"
                      size="small"
                      variant="contained"
                      className={classes.button}
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProjectsList;
