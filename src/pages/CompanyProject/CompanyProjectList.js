import React, { useEffect, useState } from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import axios from "axios";
import { getConfig } from "../../authConfig";

import { useHistory } from "react-router-dom";

// A list of projects and some description is needed here

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

    // width: "100%"
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

  media: {
    height: 140,
  },
}));

export default function CompanyProject() {
  const classes = useStyles();

  const [companyProjects, setCompanyProjects] = useState([]);

  const history = useHistory();

  const createProject = () => {
    let path = `projects/create`;
    history.push(path);
  };

  useEffect(() => {
    console.log(getConfig());
    axios
      .post(
        "http://18.213.74.196:8000/api/company_project/list_by_company",

        {
          username_id: 49, // 	company@eli.eli | Company 1 Eli | 49
        },
        getConfig()
      )
      .then((res) => {
        console.log(res.data);
        setCompanyProjects(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  // Here will be the submit function to create the project
  // and the axios integration

  return (
    <div className="root">
      <img
        alt="profile background"
        className={classes.profileLogo}
        src={ProfileLogo}></img>

      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" href="/" /*onClick={handleClick}*/>
          Home
        </Link>
        <Link color="inherit" href="/dashboard" /*onClick={handleClick}*/>
          Profile
        </Link>
        <Typography color="textPrimary">My Projects</Typography>
      </Breadcrumbs>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
        <Button
          variant="contained"
          component="span"
          className={classes.addProject}
          onClick={createProject}>
          Add Project
        </Button>
      </div>

      <div className={classes.companyProjectCards}>
        <Grid container spacing={3}>
          {companyProjects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className={classes.root}>
                <CardActionArea className={classes.cardActionArea}>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="80"
                    image={AvatarImage}
                    title="Contemplative Reptile"
                    className={classes.media}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography
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
                    {project.project_tech.split(",").map((skill, index) => (
                      <Chip
                        label={skill}
                        className={classes.chips}
                        key={index}
                      />
                    ))}
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button size="small" color="primary">
                    VIEW
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
