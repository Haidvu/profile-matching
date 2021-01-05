import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
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
  const [companyProjectsToShow, setCompanyProjectsToShow] = useState([]);
  const [saveStudent, setSaveStudent] = useState({
    student_db_id: null,
    project_id: null,
    project_preference_for_student: null,
  });

  const getCompanyProjects = async () => {
    try {
      const companyProjectsResponse = await axios.post(
        `http://18.213.74.196:8000/api/company_project/list_by_company`,

        {
          username_id: parseInt(Id),
        },
        getConfig()
      );
      const savedProjectsResponse = await axios.get(
        `http://18.213.74.196:8000/api/project_select_student/all`,
        getConfig()
      );
      const sp = savedProjectsResponse.data.filter((item) => {
        return item.student_db_id === studentId;
      });
     
      let projectsToShow = [];
      companyProjectsResponse.data.forEach((project) => {
        if (!sp.some((element) => element.project_id === project.project_id)) {
          projectsToShow.push(project);
        }
      });
      setCompanyProjectsToShow(projectsToShow);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCompanyProjects();
  }, []);

  const saveStudentToProject = async () => {
    try {
      axios.post(
        "http://18.213.74.196:8000/api/project_select_student/create",
        saveStudent,
        getConfig()
      );
      setCompanyProjectsToShow([
        ...companyProjectsToShow.filter((project) => {
          return project.project_id !== saveStudent.project_id;
        }),
      ]);
      setSaveStudent({
        student_db_id: null,
        project_id: null,
        project_preference_for_student: null,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = () => {
    if (saveStudent.student_db_id) {
      saveStudentToProject();
    } else {
      alert("Peference is required");
    }
  };

  const handleChange = (e) => {
    setSaveStudent({
      student_db_id: parseInt(studentId),
      project_id: parseInt(e.target.name),
      project_preference_for_student: parseInt(e.target.value),
    });
  };

  return (
    <Grid direction="row">
      <Grid item container>
        {companyProjectsToShow.length > 0 ? (
          <>
            <Container>
              <Typography>Save Profile to the following Projects</Typography>
              <Grid container>
                {companyProjectsToShow.map((project, index) => (
                  <Grid container key={index} alignItems="center">
                    <Grid item xs={2}>
                      <Typography>{project.project_name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>Preference</InputLabel>
                        <Select
                          label="experience"
                          id={project.project_name}
                          name={project.project_id}
                          className={classes.preference}
                          onChange={handleChange}>
                          <MenuItem value={1}>Highest</MenuItem>
                          <MenuItem value={2}>Intermediate</MenuItem>
                          <MenuItem value={3}>Lowest</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleSave}
                        disabled={
                          saveStudent.project_id !== project.project_id
                        }>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </>
        ) : (
          <Container>
            <Typography style={{ fontStyle: "italic" }}>
              No Projects to Add to For this Profile
            </Typography>
          </Container>
        )}
      </Grid>
    </Grid>
  );
};

export default SaveStudent;