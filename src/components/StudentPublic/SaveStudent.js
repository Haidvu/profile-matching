import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Container,
  DialogActions,
  Button,
  LinearProgress,
  Grid,
  Typography,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import { DataContext } from "../../contexts/dataContext";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontSize: "10px",
  },
  formControl: {
    disply: "block",
    minWidth: theme.spacing(10 * 2),
  },
}));

const SaveStudent = ({ studentId }) => {
  const { data } = useContext(DataContext);
  const { profile } = data;
  const Id = profile.id;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [companyProjects, setCompanyProjects] = useState([]);
  const [saveStudent, setSaveStudnet] = useState({
    student_db_id: null,
    project_id: null,
    project_preference_for_student: null,
  });

  const getCompanyProjects = async () => {
    console.log(Id);
    try {
      const response = await axios.post(
        `http://18.213.74.196:8000/api/company_project/list_by_company`,

        {
          username_id: parseInt(Id),
        },
        getConfig()
      );
      console.log(response);
      setCompanyProjects(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCompanyProjects();
  }, []);

  const saveStudentToProject = async () => {
    try {
      const response = axios.post(
        "http://18.213.74.196:8000/api/project_select_student/create",
        saveStudent,
        getConfig()
      );
      setSaveStudnet({
        student_db_id: null,
        project_id: null,
        project_preference_for_student: null,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = () => {
    console.log("Clicked save");
    if (saveStudent.student_db_id) {
      saveStudentToProject();
    } else {
      alert("Peference is required");
    }
  };

  const handleChange = (e) => {
    setSaveStudnet({
      student_db_id: parseInt(studentId),
      project_id: parseInt(e.target.name),
      project_preference_for_student: parseInt(e.target.value),
    });
  };

  return (
    <>
      {companyProjects.length > 0 ? (
        <>
          <div>
            <Container>
              <Typography>Save Profile to the following Projects</Typography>
              <Grid container>
                {companyProjects.map((project, index) => (
                  <Grid container key={index} spacing={2} alignItems="center">
                    <Grid item>
                      <Typography>{project.project_name}</Typography>
                    </Grid>
                    <Grid item>
                      <FormControl className={classes.formControl}>
                        <InputLabel>Preference</InputLabel>
                        <Select
                          label="experience"
                          id="experience"
                          name={project.project_id}
                          className={classes.preference}
                          onChange={handleChange}
                          value={saveStudent.project_preference_for_student}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>Highest</MenuItem>
                          <MenuItem value={2}>Intermediate</MenuItem>
                          <MenuItem value={3}>Lowest</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleSave}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SaveStudent;
