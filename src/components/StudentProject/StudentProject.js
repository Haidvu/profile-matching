import React, { useState, useContext } from "react";
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
  delete: {
    color: "black",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#FFFFFF",
      backgroundColor: "#C8102E",
    },
    margin: theme.spacing(0),
  },
  dialogDelete: {
    display: "flex",
    justifyContent: "center",
  },
  edit: {
    color: "#C8102E",
    margin: theme.spacing(0),
  },
  skillsContainer: {
    display: "flex",
    "& > *": {
      marginRight: theme.spacing(1),
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

//Skills denotes to all the skills in the database
function StudentProject({ projects, setProjects, skills }) {
  const options = skills.map((skill) => {
    return {
      label: skill.skill_name,
      value: skill.id,
    };
  });

  const { data } = useContext(DataContext);
  const { profile } = data;

  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [currentProject, setCurrentProject] = useState({
    student_id: profile.student_id,
    project_description: "",
    project_end_date: "",
    project_id: null,
    project_link: "",
    project_name: "",
    project_role: "",
    project_start_date: "",
    project_tech: [],
    project_in_progress: false,
  });
  const [projectToDelete, setProjectToDelete] = useState({});

  const handleClickOpenDelete = (project) => {
    setOpenDelete(true);
    setProjectToDelete(project);
  };

  const handleCurrentProjectChange = (e) => {
    setCurrentProject({
      ...currentProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpenEdit = (project) => {
    setOpenEdit(true);
    setCurrentProject({
        student_id: profile.student_id,
        project_description: project.project_description,
        project_end_date: project.project_end_date,
        project_id: project.project_id,
        project_link: project.project_link,
        project_name: project.project_name,
        project_role: project.project_role,
        project_start_date: project.project_start_date,
        project_tech: project.project_tech.split(",").map((skill, index) => {
          return {
            label: skill,
            value: index,
          };
        }) ,
      project_in_progress: project.project_in_progress,
      });
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
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

  const validate = () => {
    if (currentProject.project_name === "") {
      alert("Please enter a name for the project");
      return false;
    } else if (currentProject.project_role === "") {
      alert("Please enter a role for the project");
      return false;
    } else if (currentProject.project_description === "") {
      alert("Please enter a description for the project");
      return false;
    } else if (currentProject.project_start_date === "") {
      alert("Please enter a start date for the project");
      return false;
    } else if (!currentProject.project_in_progress) {
      if (currentProject.project_end_date === "") {
        alert(
          'Please enter an end date for the project or select "projet in progress"'
        );
        return false;
      } else if (
        currentProject.project_start_date > currentProject.project_end_date
      ) {
        alert("Project end date cannot be before project start date");
        return false;
      }
    }
    return true;
  };

  const handleSave = (id) => {
    if (validate()) {
      var project_id = id;

      var skillsSeparatedByCommas="";
      skillsSeparatedByCommas+= currentProject.project_tech.map ((tech) => {return tech.label;});
      skillsSeparatedByCommas = (skillsSeparatedByCommas.length > 0) ? skillsSeparatedByCommas.substring(0,skillsSeparatedByCommas.length) : "";
      
      axios
        .put(
          `http://18.213.74.196:8000/api/student_project/${project_id}/update`,
          {
            student_id: profile.student_id,
            project_name: currentProject.project_name,
            project_description: currentProject.project_description,
            project_link: currentProject.project_link,
            project_tech: skillsSeparatedByCommas,
            project_start_date: currentProject.project_start_date,
            project_end_date: currentProject.project_in_progress
              ? null
              : currentProject.project_end_date,
            project_in_progress: currentProject.project_in_progress,
            project_role: currentProject.project_role,
          },
          getConfig()
        )
        .then((res) => {
          let updated_projects = projects.map((item) => {
            let updatedItem = { ...item };
            if (project_id === item.project_id) {
              updatedItem.project_id = item.project_id;
              updatedItem.project_name = res.data.project_name;
              updatedItem.project_description = res.data.project_description;
              updatedItem.project_link = res.data.project_link;
              updatedItem.project_tech = res.data.project_tech;
              updatedItem.project_start_date = res.data.project_start_date;
              updatedItem.project_end_date = res.data.project_end_date;
              updatedItem.project_in_progress = res.data.project_in_progress;
              updatedItem.project_role = res.data.project_role;
            }
            return updatedItem;
          });
          setProjects(updated_projects);
          handleCloseEdit();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <VerticalTimeline layout={"1-column-left"}>
        {projects.map((project, index) => (
          <VerticalTimelineElement
            className={classes.IconStyle}
            iconStyle={{ background: "#C8102E", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #C8102E" }}
            key={index}
            icon={<WebRoundedIcon />}
          >
            <div className={classes.verticalElementTitle}>
              <h3 className={classes.projectLabels}>Project Name:</h3>
              <h3 style={{ color: "rgb(200, 16, 46)" }}>
                "{project.project_name}"
              </h3>
            </div>
            <div className={classes.verticalElementTitle}>
              <h3 className={classes.projectLabels}>Project Role:</h3>
              <h3 style={{ color: "rgb(200, 16, 46)" }}>
                {project.project_role}
              </h3>
            </div>
            <div className={classes.verticalElementTitle}>
              {project.project_tech!=="" ? 
              (project.project_tech.split(",").map((skill, index) => (
                <Chip label={skill} className={classes.chips} key={index} />
              ))):
              (<Chip label="None" className={classes.chips}/>)
              }
            </div>
            <div className={classes.projectDescLabel}>
              <h3>Project Description:</h3>
              <p
                className={classes.projectDesc}
                style={{ fontWeight: "lighter" }}
              >
                * {project.project_description} {project.student_id}
              </p>
            </div>

            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption" className={classes.projectLink}>
                Project Source Link
              </Typography>
              <br />
              <a href={ project.project_tech.includes("https://") ? `${project.project_link}` : `https://${project.project_link}`} className={classes.link} target="_blank">
                {project.project_link}
              </a>
            </div>
            <div className={classes.projectDate}>
              {/* <h5 style={{ fontWeight: "lighter", color: "#333333" }}>
                Timeline: {project.project_start_date} -{" "}
                {project.project_in_progress
                  ? "present"
                  : project.project_end_date}
              </h5> */}
              <h5>Project Timeline:</h5>
              <h5 className={classes.projectTimeline}>
                {project.project_start_date} -{" "}
                {project.project_in_progress
                  ? "present"
                  : project.project_end_date}
              </h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  handleClickOpenEdit(project);
                }}
                fontSize="small"
                className={classes.edit}
              >
                <EditIcon />
              </IconButton>

              {/* EDIT PROJECT MODAL BELOW */}

              <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  classes={classes.addNewTitle}
                  id="form-dialog-title"
                >
                  EDIT {currentProject.project_name}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="project_name"
                    label="Project Name"
                    name="project_name"
                    type="string"
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
                    type="string"
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
                    value={options.filter(el => {
                        return currentProject.project_tech.some(f => {
                          return f.label === el.label
                        })
                      })}
                    isMulti
                    isSearchable
                    onChange={(e) => {
                        e = e ? e : [];
                        setCurrentProject({ ...currentProject, project_tech: e }) 
                    }}
                    options={options}
                  />

                  <TextField
                    margin="dense"
                    id="outlined-multiline-static"
                    multiline
                    label="Project Description"
                    rows={4}
                    variant="outlined"
                    value={currentProject.project_description}
                    fullWidth
                    name="project_description"
                    type="string"
                    inputProps={{ maxLength: 350 }}
                    onChange={handleCurrentProjectChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-static"
                    placeholder="www.website.com"
                    label="Source Link"
                    value={currentProject.project_link}
                    name="project_link"
                    type="string"
                    fullWidth
                    variant="outlined"
                    onChange={handleCurrentProjectChange}
                  />
                  <TextField
                    margin="dense"
                    id="start_date"
                    type="date"
                    name="project_start_date"
                    value={currentProject.project_start_date}
                    className={classes.projectDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    helperText="Start Date"
                    onChange={handleCurrentProjectChange}
                  />
                  {currentProject.project_in_progress ? null : (
                    <TextField
                      margin="dense"
                      id="end_date"
                      type="date"
                      name="project_end_date"
                      value={currentProject.project_end_date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className={classes.projectDate}
                      variant="outlined"
                      helperText="End Date"
                      onChange={handleCurrentProjectChange}
                    />
                  )}
                  <br />
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            checked={currentProject.project_in_progress}
                            style={{ color: "#C8102E" }}
                            onChange={(e) => {
                              setCurrentProject({
                                ...currentProject,
                                project_in_progress: e.target.checked,
                              });
                            }}
                          />
                        }
                        label={
                          <Typography style={{ fontSize: 15 }}>
                            Check if project "In Progress"
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button
                    onClick={handleCloseEdit}
                    style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleSave(currentProject.project_id);
                    }}
                    style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
                    className={classes.projectAdd}
                  >
                    SAVE
                  </Button>
                </DialogActions>
              </Dialog>

              {/* END OF EDIT PROJECT MODAL */}

              {/* ----------------
          THIS IS DELETE BUTTON BELOW
          ---------------- */}
              <IconButton
                onClick={() => {
                  handleClickOpenDelete(project);
                }}
                aria-label="delete"
                fontSize="small"
                className={classes.delete}
              >
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  id="alert-dialog-title"
                  className={classes.dialogDelete}
                >
                  <WarningIcon />
                  {"WARNING!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You are about to delete {projectToDelete.project_name}{" "}
                    project. Project will be removed permanently and action
                    cannot be undone. Do you wish to continue?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseDelete}
                    style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(projectToDelete.project_id);
                    }}
                    style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
                    className={classes.projectAdd}
                  >
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