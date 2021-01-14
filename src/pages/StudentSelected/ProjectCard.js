import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
  Menu,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../../authConfig";

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
    flexWrap: "wrap"
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    height: "100%",
    margin: theme.spacing(1),
    position: "relative",
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
  selectLable: {
    marginBottom: theme.spacing(1),
  },
  loading: {
    marginTop: theme.spacing(3),
  },
  projectMenu: {
    position: "absolute",
    right: theme.spacing(-1),
    top: theme.spacing(0.5),
  },
}));

const ProjectCard = ({ project, setModifiedProject, removeProject }) => {
  const classes = useStyles();

  const [changePreferenceOpen, setPreferenceChangeOpen] = useState(false);
  const [removeProjectOpen, setRemoveProjectOpen] = useState(false);
  const [preference, setPreference] = useState();
  const [changingPreference, setChangingPeference] = useState(false);
  const [removingProject, setRemovingProject] = useState(false);

  useEffect(() => setPreference(project.student_preference_for_project), [
    project.student_preference_for_project,
  ]);

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };

  const confirmPeferenceChange = () => {
    setChangingPeference(true);
    axios
      .put(
        `http://18.213.74.196:8000/api/student_select_project/${project.selection_id}/update`,
        {
          project_id: project.project_id,
          student_preference_for_project: preference,
        },
        getConfig()
      )
      .then((res) => {
        setModifiedProject({
          ...project,
          student_preference_for_project: preference,
        });
        setChangingPeference(false);
        setPreferenceChangeOpen(false);
      });
  };

  const confirmRemoveProject = () => {
    setRemovingProject(true);
    axios
      .delete(
        `http://18.213.74.196:8000/api/student_select_project/${project.selection_id}/delete`,
        getConfig()
      )
      .then((res) => {
        removeProject(project.project_id);
        setRemovingProject(false);
        setRemoveProjectOpen(false);
      });
  };

  // stuff for menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const projectMenu = (
    <div className={classes.projectMenu}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClickMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setPreferenceChangeOpen(true);
          }}
        >
          change preference
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setRemoveProjectOpen(true);
          }}
        >
          remove project
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <Grid item key={project.project_id}>
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
        {projectMenu}
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
          <Typography className={classes.fieldTitle}>Project Type</Typography>
          <Typography className={classes.fieldValue}>
            {project.project_type ? project.project_type : "Not Specified"}
          </Typography>
        </CardContent>
        <CardContent
          className={`${classes.cardContent} ${classes.noPaddingTop}`}
        >
          <Typography variant="subtitle2" className={classes.fieldTitle}>
            Project Tech
          </Typography>

          <div className={classes.skillsRoot}>
            {project.project_tech !== "" && project.project_tech ? (
              project.project_tech.split(",").map((skill, index) => (
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
              ))
            ) : (
                <Chip
                  label={"Any"}
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

      {/* modal for changing preference */}
      <div>
        <Dialog
          open={changePreferenceOpen}
          onClose={() => setPreferenceChangeOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <InputLabel className={classes.selectLable} id="changePreference">
              Select your preference for <strong>{project.project_name}</strong>
            </InputLabel>
            {changingPreference ? (
              <LinearProgress className={classes.loading} />
            ) : (
                <Select
                  labelId="changePreference"
                  value={preference}
                  onChange={handlePreferenceChange}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                </Select>
              )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => confirmPeferenceChange()}
              color="primary"
              disabled={changingPreference}
            >
              Confirm
            </Button>
            <Button
              onClick={() =>{setPreferenceChangeOpen(false); setPreference(project.student_preference_for_project)}}
              color="primary"
              disabled={changingPreference}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* modal for removing the project */}
      <div>
        <Dialog
          open={removeProjectOpen}
          onClose={() => setRemoveProjectOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <InputLabel className={classes.selectLable} id="removeProject">
              Do you wanna remove <strong>{project.project_name}</strong> from
              selected projects?
            </InputLabel>
            {removingProject ? (
              <LinearProgress className={classes.loading} />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => confirmRemoveProject()}
              color="primary"
              disabled={removingProject}
            >
              Yes
            </Button>
            <Button
              onClick={() => setRemoveProjectOpen(false)}
              color="primary"
              disabled={removingProject}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Grid>
  );
};

export default ProjectCard;
