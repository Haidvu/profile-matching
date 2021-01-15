import React, { useEffect, useState, useContext } from "react";
import CompanyDashboard from "../../assets/CompanyDashboard.jpg";
import AvatarImage from "../../assets/image.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import classNames from "classnames";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import axios from "axios";
import { getConfig } from "../../authConfig";

import { Link, useRouteMatch } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
  },
  profileLogo: {
    backgroundRepeat: "no-repeat",
    position: "relative",
    objectPosition: "20% 30%",
    width: "100vw",
    height: "15vw",
    maxWidth: "100%",
    zIndex: 1,
    objectFit: "cover",
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
    color: theme.palette.secondary.main,
  },
  download: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
  },
  skills: {
    position: "relative",
    border: "1px solid #A6A6A6",
    borderRadius: "50%",
    color: "#5B5B5B",
    padding: "2%",
    width: "5%",
  },
  skillsContainer: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  sectionHeader: {
    fontWeight: "bold",
    color: "#606060",
  },
  sectionContent: {
    color: "#5B5B5B",
    display: "inline",
  },
  profileImage: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    position: "absolute",
    top: "15%",
    right: "4%",
    zIndex: 1,
    objectFit: "contain",
  },

  breadcrumbs: {
    padding: "10px",
  },
  column: {
    flexBasis: "33.33%",
    padding: "15px",
  },
  companyProjectCards: {
    paddingLeft: "70px",
    paddingRight: "70px",
    paddingTop: "20px",
    [theme.breakpoints.down("xm")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "10px",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
    },
  },
  root: {
    flexGrow: 1,
  },

  cardText: {
    fontSize: "13px",
  },
  cardHeader: {
    fontSize: "20px",
  },
  chips: {
    margin: "5px",
  },
  deadline: {
    padding: "5px",
  },
  cardContent: {
    padding: "8px",
  },
  addProject: {
    "&:hover": {
      backgroundColor: "#C8102E",
    },
    margin: theme.spacing(2),
  },
  delete: {
    "&:hover": {
      backgroundColor: "#C8102E",
      color: "#ffffff",
    },
    margin: theme.spacing(2),
    fontSize: "0.8125rem !important",
  },

  media: {
    height: 140,
  },
  spinner: {
    width: "30%",
    height: "30%",
  },
  cardAction: {
    justifyContent: "flex-end",
  },
  projectAdd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));

export default function CompanyProject() {
  const classes = useStyles();

  const [companyProjects, setCompanyProjects] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { data } = useContext(DataContext);

  const { profile } = data;

  const id = profile.id;

  let { url } = useRouteMatch();

  const createProject = () => {
    let path = `project/create`;
    history.push(path);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "http://18.213.74.196:8000/api/company_project/list_by_company",
        {
          username_id: parseInt(id),
        },
        getConfig()
      )
      .then((res) => {
        setIsLoading(false);
        setCompanyProjects(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [id]);

  return (
    <div className="root">
      <img
        alt="profile background"
        className={classes.profileLogo}
        src={CompanyDashboard}></img>

      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link style={{ textDecoration: "none", color: "#000" }} to="/">
          Home
        </Link>
        <Link style={{ textDecoration: "none", color: "#000" }} to="/dashboard">
          Profile
        </Link>
        <Typography style={{ color: "#c8102e" }}>My Projects</Typography>
      </Breadcrumbs>
      <div className={classes.projectAdd}>
        <Button
          onClick={createProject}
          size="medium"
          variant="outlined"
          style={{
            backgroundColor: "#C8102E",
            color: "#FFFFFF",
            margin: "20px",
          }}>
          <AddIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          ADD NEW PROJECT
        </Button>
      </div>

      {isLoading ? (
        <div>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item md={4}>
              <LinearProgress color="secondary" />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.companyProjectCards}>
          <Grid container spacing={3}>
            {companyProjects.map((project, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <Card className={classes.root}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={{
                      pathname: `${url}/${project.project_id}`,
                    }}>
                    <CardActionArea className={classes.cardActionArea}>
                      <CardMedia
                        component="img"
                        alt="Project Photo"
                        height="80"
                        image={AvatarImage}
                        title="Project Photo"
                        className={classes.media}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography
                        style={{wordBreak: 'break-all' }}
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.cardHeader}>
                          {project.project_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          className={classes.deadline}>
                          Deadline: {project.project_deadline.substring(0, 10)}
                        </Typography>
                        {project.project_tech.length > 0 ? (
                          <>
                            {project.project_tech
                              .split(",")
                              .map((skill, index) => (
                                <Chip
                                  label={skill}
                                  className={classes.chips}
                                  key={index}
                                />
                              ))}
                          </>
                        ) : null}
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions className={classes.cardAction}>
                    <Button size="small" color="primary">
                      {project.is_published === true ? (
                        <>
                          <VisibilityIcon />
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.deadline}>
                            PUBLIC
                          </Typography>
                        </>
                      ) : (
                        <>
                          <VisibilityOffIcon />
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.deadline}>
                            DRAFT
                          </Typography>
                        </>
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
