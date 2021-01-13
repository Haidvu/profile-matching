import React, { useEffect, useState, useContext, useCallback } from "react";
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  formControl: {
    disply: "block",
    minWidth: theme.spacing(8 * 2),
  },
  saveProfileContainer: {
    padding: theme.spacing(2),
  },
  containerTitle: {
    fontWeight: "bold",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SaveStudent = ({ studentId }) => {
  const { data } = useContext(DataContext);
  const { profile } = data;
  const Id = profile.id;
  const classes = useStyles();
  const [companyProjectsToShow, setCompanyProjectsToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveStudent, setSaveStudent] = useState({
    student_db_id: null,
    project_id: null,
    project_preference_for_student: null,
  });
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailed, setAddFailed] = useState(false);
  const [nameProjectToSave, setNameProjectToSave] = useState("");

  const handleCloseAddSucess = () => {
    setAddSuccess(false);
  };
  const handleCloseAddFailed = () => {
    setAddFailed(false);
  };

  const getCompanyProjects = useCallback(() => {
    //get all projects of this company.
    const companyProjects = axios.post(
      "http://18.213.74.196:8000/api/company_project/list_by_company",
      { username_id: parseInt(Id) },
      getConfig()
    );
    //get all saved projects
    const savedProjects = axios.get(
      "http://18.213.74.196:8000/api/project_select_student/all",
      getConfig()
    );
    axios
      .all([companyProjects, savedProjects])
      .then(
        axios.spread((...responses) => {
          const companyProjectsRes = responses[0];
          const savedProjectsRes = responses[1];

          const sp = savedProjectsRes.data.filter((item) => {
            return parseInt(item.student_db_id) === parseInt(studentId);
          });
          let projectsToShow = [];

          companyProjectsRes.data.forEach((project) => {
            if (
              !sp.some((element) => element.project_id === project.project_id)
            ) {
              projectsToShow.push(project);
            }
          });

          setCompanyProjectsToShow(projectsToShow);
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [setCompanyProjectsToShow, setLoading, Id, studentId]);

  useEffect(() => {
    getCompanyProjects();
  }, [getCompanyProjects]);

  const handleSave = () => {
    if (saveStudent.student_db_id) {
      axios
        .post(
          "http://18.213.74.196:8000/api/project_select_student/create",
          saveStudent,
          getConfig()
        )
        .then(() => {
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
          setAddSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setAddFailed(true);
        });
    } else {
      alert("Peference is required");
    }
  };

  const handleChange = (e, projectName) => {
    setSaveStudent({
      student_db_id: parseInt(studentId),
      project_id: parseInt(e.target.name),
      project_preference_for_student: parseInt(e.target.value),
    });
    setNameProjectToSave(projectName)
  };

  return (
    <>
      {loading ? null : (
        <Grid direction="row" className={classes.saveProfileContainer}>
          {companyProjectsToShow.length > 0 ? (
            <>
              <Typography className={classes.containerTitle}>
                Save Profile to the following Projects
              </Typography>
              <>
                {companyProjectsToShow.map((project, index) => (
                  <Grid container key={index} alignItems="center" spacing={1}>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                      <Typography style={{ wordBreak: 'break-all' }}>{project.project_name}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>Preference</InputLabel>
                        <Select
                          label="experience"
                          id={project.project_name}
                          name={project.project_id}
                          className={classes.preference}
                          onChange={(e) => { return ( handleChange(e, project.project_name) ) }}>
                          <MenuItem value={3}>Highest</MenuItem>
                          <MenuItem value={2}>Intermediate</MenuItem>
                          <MenuItem value={1}>Lowest</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2} lg={2}>
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
              </>
            </>
          ) : (
              <Container>
                <Typography style={{ fontStyle: "italic" }}>
                  No Projects to Add to For this Profile
              </Typography>
              </Container>
            )}
          <Snackbar
            open={addSuccess}
            autoHideDuration={6000}
            onClose={handleCloseAddSucess}>
            <Alert onClose={handleCloseAddSucess} severity="success">
              This student was saved to project {nameProjectToSave}! Please check this student in the 'My Projects/My Team' tab 
              </Alert>
          </Snackbar>
          <Snackbar
            open={addFailed}
            autoHideDuration={6000}
            onClose={handleCloseAddFailed}>
            <Alert onClose={handleCloseAddFailed} severity="error">
              There was a problem when saving this student to {nameProjectToSave}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
};

export default SaveStudent;
