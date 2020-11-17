import React, { useEffect, useState, useContext } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import axios from "axios";
import { getConfig } from "../../authConfig";
import WebRoundedIcon from "@material-ui/icons/WebRounded";
import { DataContext } from "../../contexts/dataContext";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/Warning";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@material-ui/core";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
  verticalElementTitle: {
    margin: 0,
  },
  verticalElementSubtitle: {
    margin: 0,
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(2, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  delete: {
    color: "black",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#FFFFFF",
      backgroundColor: "#C8102E",
    },
  },
  dialogDelete: {
    display: "flex",
    justifyContent: "center",
  },
  edit: {
    color: "#C8102E",
  },
}));

//Skills denotes to all the skills in the database
function StudentProject({ projects, setProjects, skills }) {
  const options = skills.map((skill) => {
    return {
      label: skill.skill_name,
      value: skill.id,
    };
  });

  console.log(options);

  const classes = useStyles();
  const history = useHistory();

  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = (project) => {
    setOpenEdit(true);
    console.log(project);
    setCurrentProject(project);
    setCurrentProjectSkills(
      project.project_tech.split(",").map((skill, index) => {
        return {
          label: skill,
          value: index,
        };
      })
    );
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    project_description: "",
    project_end_date: "",
    project_id: null,
    project_link: "",
    project_name: "",
    project_role: "",
    project_start_date: "",
    project_tech: "",
  });
  const [currentProjectSkills, setCurrentProjectSkills] = useState([
    { label: "", value: null },
  ]);

  console.log(projects);

  const handleClickOpenDelete = (project) => {
    setOpenDelete(true);
  };

  const handleCurrentProjectChange = (e) => {
    setCurrentProject({
      ...currentProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        "http://18.213.74.196:8000/api/student_project/" + id + "/delete",

        getConfig()
      )
      .then((res) => {
        const studentProjectsCurrent = projects.filter(
          (project) => id !== project.project_id
        );
        setProjects(studentProjectsCurrent);
      })
      .catch((err) => console.log(err.response.message));
    setOpenDelete(false);
  };

  const handleSave = (id) => {
    let project_id = id;
    axios
      .put(
        `http://18.213.74.196:8000/api/student _project/${project_id}/update`,
        {
          student_id: 1234567,
          project_name: currentProject.project_name,
          project_description: "test des",
          project_link: "no link",
          project_tech: "tech test",
          project_start_date: "2020-10-24",
          project_end_date: null,
          project_in_progress: true,
          project_role: "frontend",
        },
        getConfig()
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*useEffect(() => {
    console.log(getConfig())
    axios.post("http://18.213.74.196:8000/api/student_project/list_by_student",
    
      {
        student_id: 210515
      }
    ,getConfig()).then(res => {
        console.log(res.data)
        setProjects(res.data)
        dispatch({action: 'SET_PROJECTS', payload: res.data})

      })
      .catch(err => {
        console.log(err)
      })
    }, [dispatch])*/

  return (
    <div>
      <VerticalTimeline layout={"1-column-left"}>
        {projects.map((project, index) => (
          <VerticalTimelineElement
            className={classes.IconStyle}
            iconStyle={{ background: "#C8102E", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #C8102E" }}
            // date={project.project_start_date}
            key={index}
            icon={<WebRoundedIcon />}>
            <h3 className={classes.verticalElementTitle}>
              {project.project_name}{" "}
            </h3>
            <h4 className={classes.verticalElementSubtitle}>
              {project.project_role}
            </h4>
            {project.project_tech.split(",").map((skill, index) => (
              <Chip label={skill} className={classes.chips} key={index} />
            ))}

            <p>{project.project_description}</p>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                View source link
                <br />
                <a href={`${project.project_link}`} className={classes.link}>
                  {project.project_link}
                </a>
              </Typography>
            </div>
            <div>
              <Typography>
                <h5>
                  Date: {project.project_start_date} -{" "}
                  {project.project_end_date}
                </h5>
                {/* <h5>End: {project.project_end_date}</h5> */}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <IconButton
                onClick={() => {
                  handleClickOpenEdit(project);
                }}
                fontSize="small"
                className={classes.edit}>
                <EditIcon />
              </IconButton>

              {/* EDIT PROJECT MODAL BELOW */}

              <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="form-dialog-title">
                <DialogTitle
                  classes={classes.addNewTitle}
                  id="form-dialog-title">
                  EDIT {currentProject.project_name}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="project_name"
                    label="Project Name"
                    name="project_name"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={currentProject.project_name}
                    onChange={handleCurrentProjectChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="project_role"
                    label="Project Role"
                    type="email"
                    name="project_role"
                    fullWidth
                    variant="outlined"
                    value={currentProject.project_role}
                    onChange={handleCurrentProjectChange}
                  />
                  <Select
                    AutoSize={true}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    name="project_skills"
                    value={currentProjectSkills}
                    isMulti
                    isSearchable
                    onChange={(e) => {
                      setCurrentProjectSkills(e);
                    }}
                    options={options}
                  />

                  <TextField
                    margin="dense"
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={currentProject.project_description}
                    fullWidth
                    inputProps={{ maxLength: 350 }}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-static"
                    helperText="Source Link"
                    value={currentProject.project_link}
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    margin="dense"
                    id="start_date"
                    type="date"
                    value={currentProject.project_start_date}
                    className={classes.projectDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    helperText="Start Date"
                  />
                  <TextField
                    margin="dense"
                    id="end_date"
                    type="date"
                    value={currentProject.project_end_date}
                    className={classes.projectDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    helperText="End Date"
                  />
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="end"
                        control={<Checkbox style={{ color: "#C8102E" }} />}
                        label={
                          <Typography style={{ fontSize: 15 }}>
                            Check if project "In Progress"
                          </Typography>
                        }
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button
                    onClick={handleCloseEdit}
                    style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleSave(project.project_id);
                    }}
                    style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
                    className={classes.projectAdd}>
                    Add Project
                  </Button>
                </DialogActions>
              </Dialog>

              {/* END OF EDIT PROJECT MODAL */}

              {/* ----------------
          THIS IS DELETE BUTTON BELOW
          ---------------- */}
              <IconButton
                onClick={handleClickOpenDelete}
                aria-label="delete"
                fontSize="small"
                className={classes.delete}>
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle
                  id="alert-dialog-title"
                  className={classes.dialogDelete}>
                  <WarningIcon />
                  {"WARNING!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You are about to delete a project. Project will be removed
                    permanently and action cannot be undone. Do you wish to
                    continue?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseDelete}
                    style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(project.project_id);
                    }}
                    style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
                    className={classes.projectAdd}>
                    DELETE
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default StudentProject;
