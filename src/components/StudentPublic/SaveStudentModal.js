import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Container,
  DialogActions,
  Button,
  CircularProgress,
  Grid,
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
  },
}));

const SaveStudentModal = ({ modal, setModal }) => {
  const { data } = useContext(DataContext);
  const { profile } = data;
  const Id = profile.id;
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [companyProjects, setCompanyProjects] = useState([]);

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

  const saveProfileToProject = () => {
    console.log("saved profile");
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleSave = () => {
    console.log("Clicked save");
    setModal(false);
  };

  return (
    <Dialog
      open={modal}
      onClose={() => {
        setModal(false);
      }}>
      <DialogTitle>Add Student to the following Projects</DialogTitle>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container>
            {companyProjects.map((project, index) => (
              <Grid item xs={12} key={index}>
                <FormControlLabel
                  className={classes.formControl}
                  control={
                    <Checkbox
                      name="saveProfile"
                      color="secondary"
                      onChange={saveProfileToProject}
                    />
                  }
                  label={project.project_name}
                  labelPlacement="end"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveStudentModal;
