import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { getConfig } from "../../authConfig";
import { DataContext } from "../../contexts/dataContext";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    margin: theme.spacing(1, "auto"),
    backgroundColor: "white",
  },
  selectionCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
    backgroundColor: "#fafafa",
  },
  cardTitle: {
    margin: theme.spacing(1),
  },
  cardMessgae: {
    margin: theme.spacing(1),
    color: "grey",
  },
}));

const StudentSelected = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const { data } = useContext(DataContext);

  const matchProjects = (selections, allProjects) => {
    return selections.map((selection) => {
      const match = allProjects.find(
        (project) => project.project_id === selection.project_id
      );
      return {
        ...match,
        selection_id: selection.id,
        student_preference_for_project:
          selection.student_preference_for_project,
      };
    });
  };

  useEffect(() => {
    axios
      .get(
        "http://18.213.74.196:8000/api/student_select_project/all",
        getConfig()
      )
      .then((res) => {
        const studentSelection = res.data.filter(
          (selection) => selection.student_id === data.profile.student_id
        );
        const param = {
          company_name: "",
          industry_type: "",
          project_name: "",
          project_type: [],
          project_tech: [],
          keywords: [],
        };

        axios
          .post(
            "http://18.213.74.196:8000/api/company_project/search",
            param,
            getConfig()
          )
          .then((res) => {
            console.log(res.data)
            setSelectedProjects(matchProjects(studentSelection, res.data));
            setLoading(false);
          });

        // This technique would work if we have separate way of gettting company info
        // axios
        //   .all(
        //     studentSelection.map((selection) =>
        //       axios.get(
        //         `http://18.213.74.196:8000/api/company_project/${selection.project_id}`,
        //         getConfig()
        //       )
        //     )
        //   )
        //   .then((responses) => {
        //     responses.map((res, index) => {
        //       const project = res.data;
        //       const selection = studentSelection[index]; //has the same length and indices as projects

        //       console.log(project, selection);
        //     });
        //   });
      });
  }, [data.profile.student_id]);

  //used to change preference from project card (child) component
  const setModifiedProject = (modifiedProject) => {
    setSelectedProjects(
      selectedProjects.map((project) =>
        project.project_id === modifiedProject.project_id
          ? modifiedProject
          : project
      )
    );
  };

  //used to remove project from project card (child) component
  const removeProject = (project_id) => {
    setSelectedProjects(
      selectedProjects.filter((project) => project.project_id !== project_id)
    );
  };

  //returns projects by preference if none found returns no project
  const getProjects = (preference) => {
    const projects = selectedProjects
      .filter(
        (project) => project.student_preference_for_project === preference
      )
      .map((project) => (
        <ProjectCard
          project={project}
          setModifiedProject={setModifiedProject}
          removeProject={removeProject}
        />
      ));
    return projects.length ? (
      projects
    ) : (
      <div align="center">
        <Typography className={classes.cardMessgae}>
          No projects under this category
        </Typography>
        <ErrorOutlineIcon className={classes.cardMessgae} fontSize="large" />
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <LinearProgress
          color="secondary"
          style={{ margin: "20px" }}></LinearProgress>
      ) : (
        <Grid container className={classes.gridRoot}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.selectionCard}>
              <CardContent>
                <Typography
                  align="center"
                  variant="h5"
                  className={classes.cardTitle}>
                  No Preference
                </Typography>
                <Divider></Divider>
                <br></br>
                {getProjects(0)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.selectionCard}>
              <CardContent>
                <Typography
                  align="center"
                  variant="h5"
                  className={classes.cardTitle}>
                  Low Preference
                </Typography>
                <Divider></Divider>
                <br></br>
                {getProjects(1)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.selectionCard}>
              <CardContent>
                <Typography
                  align="center"
                  variant="h5"
                  className={classes.cardTitle}>
                  Medium Preference
                </Typography>
                <Divider></Divider>
                <br></br>
                {getProjects(2)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.selectionCard}>
              <CardContent>
                <Typography
                  align="center"
                  variant="h5"
                  className={classes.cardTitle}>
                  High Preference
                </Typography>
                <Divider></Divider>
                <br></br>
                {getProjects(3)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default StudentSelected;
