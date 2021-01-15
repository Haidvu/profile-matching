import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import classNames from "classnames";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getConfig } from "../../authConfig";
import { DataContext } from "../../contexts/dataContext";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  addDiv: {
    height: "0px",
    paddingTop: "40px",
  },
  projectAdd: {
    "&:hover": {
      backgroundColor: "#C8102E",
    },
    margin: theme.spacing(1),
  },
  addNewTitle: {
    fontWeight: "bold",
  },
  projectDate: {
    display: "flex",
    flexWrap: "wrap",
  },
  projectRole: {
    marginTop: "5",
  },
  selectTech: {
    marginTop: "5px",
    marginBottom: "5px",
    fontSize: "16px"
  },
}));

export default function StudentProjectAdd({ projects, setProjects, skills }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { data } = useContext(DataContext);
  const { profile } = data;
  const [updateFailed, setUpdateFailed] = useState(false);
  const handleCloseUpdateFailed = () => {
    setUpdateFailed(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [alert,setAlert] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const animatedComponents = makeAnimated();

  const options = skills.map((skill) => {
    return {
      label: skill.skill_name,
      value: skill.id,
    };
  });

  const [studentInput, setStudentInput] = useState({
    //This is the data
    project_description: "",
    project_name: "",
    project_link: "",
    project_tech: "",
    project_start_date: "",
    project_end_date: "",
    project_in_progress: false,
    project_role: "",
  });

  const validate = () => {
    if (studentInput.project_name === "") {
      setAlert("Please enter a name for the project");
      setUpdateFailed(true);
      return false;
    } else if (studentInput.project_role === "") {
      setAlert("Please enter a role for the project");
      setUpdateFailed(true);
      return false;
    } else if (studentInput.project_description === "") {
      setAlert("Please enter a description for the project");
      setUpdateFailed(true);
      return false;
    } else if (studentInput.project_start_date === "") {
      setAlert("Please enter a start date for the project");
      setUpdateFailed(true);
      return false;
    } else if (!studentInput.project_in_progress) {
      if (studentInput.project_end_date === "" || !studentInput.project_end_date) {
        setAlert(
          'Please enter an end date for the project or select "project in progress"'
        );
        setUpdateFailed(true);
        return false;
      } else if (
        studentInput.project_start_date > studentInput.project_end_date
      ) {
        setAlert("Project end date cannot be before project start date");
        setUpdateFailed(true);
        return false;
      }
    }
    setAlert("");
    setUpdateFailed(false);
    return true;
  };

  const resetAllFields = () => {
    studentInput.project_name = "";
    studentInput.project_description = "";
    studentInput.project_link = "";
    studentInput.project_tech = "";
    studentInput.project_start_date = "";
    studentInput.project_end_date = "";
    studentInput.project_in_progress = false;
    studentInput.project_role = "";
  };

  const handleSave = () => {
    if (validate()) {
      const data = {
        student_id: profile.student_id,
        project_name: studentInput.project_name,
        project_description: studentInput.project_description,
        project_link: studentInput.project_link,
        project_tech: studentInput.project_tech,
        project_start_date: studentInput.project_start_date,
        project_end_date: studentInput.project_in_progress
          ? null
          : studentInput.project_end_date,
        project_in_progress: studentInput.project_in_progress,
        project_role: studentInput.project_role,
      };
      axios
        .post(
          "http://18.213.74.196:8000/api/student_project/create",
          data,
          getConfig()
        )
        .then((res) => {
          const newProject = {
            project_id: res.data.project_id,
            project_name: res.data.project_name,
            project_description: res.data.project_description,
            project_link: res.data.project_link,
            project_tech: res.data.project_tech,
            project_start_date: res.data.project_start_date,
            project_end_date: res.data.project_end_date,
            project_in_progress: res.data.project_in_progress,
            project_role: res.data.project_role,
          };
          setProjects([...projects, newProject]);
          resetAllFields();
        })
        .catch((err) => {
          console.log(err);
        });

      setOpen(false);
    }
  };
  return (
    <div>
      <div className={classes.root}>
        <div
          className={classes.addDiv}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleClickOpen}
            size="medium"
            variant="outlined"
            className={classes.projectAdd}
            style={{
              backgroundColor: "#C8102E",
              color: "#FFFFFF",
              margin: "20px",
            }}
          >
            <AddIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            ADD NEW PROJECT
          </Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ADD NEW PROJECT</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="project_name"
            label="Project Name"
            fullWidth
            required
            variant="outlined"
            name="project_name"
            helperText={` Please enter an unique project name. ${studentInput.project_name.length}/200`}
            inputProps={{ maxLength: 200 }}
            value={studentInput.project_name || ""}
            onChange={(e) => {
              setStudentInput({
                ...studentInput,
                project_name: e.target.value,
              });
            }}
          />
          <TextField
            className={classes.projectRole}
            autoFocus
            margin="dense"
            id="project_role"
            label="Project Role"
            fullWidth
            variant="outlined"
            name="project_role"
            inputProps={{ maxLength: 50 }}
            helperText={`${studentInput.project_role.length}/50`}
            value={studentInput.project_role || ""}
            onChange={(e) => {
              setStudentInput({
                ...studentInput,
                project_role: e.target.value,
              });
            }}
          />
          <Select
            className={classes.selectTech}
            AutoSize={true}
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            placeholder="Project Tech"
            isSearchable
            options={options}
            onChange={(e) => {
              var skillsSeparatedByCommas = "";
              if (e !== null) {
                skillsSeparatedByCommas = Array.prototype.map
                  .call(e, (s) => s.label)
                  .toString(); // "A,B,C"
                if (skillsSeparatedByCommas.length > 0)
                  skillsSeparatedByCommas = skillsSeparatedByCommas.substring(
                    0,
                    skillsSeparatedByCommas.length
                  );
              }
              setStudentInput({
                ...studentInput,
                project_tech: skillsSeparatedByCommas,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="filled-multiline-static"
            multiline
            rows={4}
            helperText={`Project Description. ${studentInput.project_description.length}/500`}
            required
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 500 }}
            name="project_description"
            value={studentInput.project_description || ""}
            onChange={(e) => {
              setStudentInput({
                ...studentInput,
                project_description: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            id="outlined-static"
            helperText={`Student Project Link. ${studentInput.project_link.length}/200`}
            fullWidth
            variant="outlined"
            name="project_link"
            inputProps={{ maxLength: 200 }}
            value={studentInput.project_link || ""}
            onChange={(e) => {
              setStudentInput({
                ...studentInput,
                project_link: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            id="date"
            type="date"
            className={classes.projectDate}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
            helperText="Start Date"
            name="project_start_date"
            value={studentInput.project_start_date || ""}
            onChange={(e) => {
              setStudentInput({
                ...studentInput,
                project_start_date: e.target.value,
              });
            }}
          />

          {!studentInput.project_in_progress ? (
            <TextField
              margin="dense"
              id="date"
              type="date"
              className={classes.projectDate}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              helperText="End Date"
              name="project_end_date"
              required
              value={studentInput.project_end_date || ""}
              onChange={(e) => {
                setStudentInput({
                  ...studentInput,
                  project_end_date: e.target.value,
                });
              }}
            />
          ) : null}
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    checked={studentInput.project_in_progress}
                    style={{ color: "#C8102E" }}
                    onChange={(e) => {
                      setStudentInput({
                        ...studentInput,
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
        <Snackbar
          open={updateFailed}
          autoHideDuration={6000}
          onClose={handleCloseUpdateFailed}>
          <Alert onClose={handleCloseUpdateFailed} severity="error">
            {alert}
          </Alert>
        </Snackbar>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
            className={classes.projectAdd}
          >
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
