import React, { useEffect, useState, useContext } from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/image.jpg";
import Spinner from "../../assets/Spinner.gif";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Box, Avatar, List, ListItem, Divider, ListItemText, ListItemIcon, IconButton, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import Link from '@material-ui/core/Link';

import DeleteIcon from '@material-ui/icons/Delete';

import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import axios from 'axios';
import { getConfig } from '../../authConfig';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import { useHistory } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";

import CompanyProjectTemplate from "../CompanyProject/CompanyProjectTemplate";
import { render } from "@testing-library/react";

// A list of projects and some description is needed here

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%"
  },
  profileLogo: {
    backgroundRepeat: "no-repeat",
    position: "relative",
    objectPosition: "20% 30%",
    width: "100vw",
    height: "15vw",
    maxWidth: "100%",
    zIndex: 1,
    objectFit: "cover"
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
    color: theme.palette.secondary.main
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
    width: "5%"
  },
  skillsContainer: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  sectionHeader: {
    fontWeight: "bold",
    color: "#606060",
  },
  sectionContent: {
    color: "#5B5B5B",
    display: 'inline',
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
    padding: "10px"
  },
  column: {
    flexBasis: '33.33%',
    padding: "15px"
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
    fontSize: "13px"
  },
  cardHeader: {
    fontSize: "20px"
  },
  chips: {
    margin: "5px"
  },
  deadline: {
    padding: "5px"
  },
  cardContent: {
    padding: "8px"
  },
  addProject: {
    '&:hover': {
      backgroundColor: '#C8102E',
    },
    margin: theme.spacing(2)
  },
  delete: {
    '&:hover': {
      backgroundColor: '#C8102E',
      color: '#ffffff'
    },
    margin: theme.spacing(2),
    fontSize: '0.8125rem !important'
  },

  media: {
    height: 140
  },
  spinner: {
    width: '30%',
    height: '30%'
  }
}));

export default function CompanyProject() {

  const classes = useStyles();

  const [companyProjects, setCompanyProjects] = useState([])

  const [isLoading, setIsLoading] = useState(false);

  const [deleted, setDelete] = useState(false);



  const history = useHistory();


  const { data } = useContext(DataContext);

  const { profile } = data;

  const id = profile.id;

  let { url } = useRouteMatch();

  const createProject = () => {
    let path = `project/create`;
    history.push(path);
  }

  const handleDelete = (id) => {
    axios
      .delete(
        "http://18.213.74.196:8000/api/company_project/" + id + "/delete",

        getConfig()
      )
      .then((res) => {

        const deletedProject = companyProjects.filter(project => id !== project.project_id)
        setCompanyProjects(deletedProject)

      })
      .catch((err) => console.log(err.response.message));

  }

  useEffect(() => {

    console.log(id)

    setIsLoading(true);

    axios.post("http://18.213.74.196:8000/api/company_project/list_by_company",

      {
        username_id: parseInt(id) // 	company@eli.eli | Company 1 Eli | 49
      }
      , getConfig()).then(res => {
        console.log(res.data)
        setIsLoading(false);
        setCompanyProjects(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })


  }, [id])

  // Here will be the submit function to create the project
  // and the axios integration

  console.log(companyProjects)

  return (
    <div className="root">
      <img alt="profile background" className={classes.profileLogo} src={ProfileLogo}></img>



      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link style={{ textDecoration: 'none' }} color="inherit" to="/" /*onClick={handleClick}*/>
          Home
        </Link>
        <Link style={{ textDecoration: 'none' }} color="inherit" to="/dashboard" /*onClick={handleClick}*/>
          Profile
        </Link>
        <Typography color="textPrimary">My Projects</Typography>
      </Breadcrumbs>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
        <Button variant="contained" component="span" className={classes.addProject} onClick={createProject}>
          Add Project
       </Button>
      </div>

      {isLoading ? (
        <div>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item md={4}>
              <Avatar src={Spinner} className={classes.spinner} />
            </Grid>
          </Grid>
        </div>
      ) : (
          <div className={classes.companyProjectCards}>
            <Grid container spacing={3}>

              {companyProjects.map((project, index) =>

                <Grid item xs={12} md={4} key={index}>

                  <Card className={classes.root}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={{
                      pathname: `${url}/${project.project_id}`
                    }} >
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
                          <Typography gutterBottom variant="h5" component="h2" className={classes.cardHeader}>
                            {project.project_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                            Deadline:  {project.project_deadline.substring(0, 10)}
                          </Typography>
                          {project.project_tech.split(',').map((skill, index) =>
                            <Chip label={skill} className={classes.chips} key={index} />
                          )}



                        </CardContent>
                      </CardActionArea>

                    </Link>
                    <CardActions>
                      <Button size="small" color="primary" >
                        {project.is_published === true ?
                          (<>
                          <VisibilityIcon />
                          <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                              PUBLIC
                        </Typography>
                          </>) : (<>
                          <VisibilityOffIcon />
                          <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                              DRAFT
                          </Typography>
                          </>)}
                      </Button>

                      <Button size="small" variant="contained" className={classes.delete} onClick={() => { handleDelete(project.project_id) }}>
                        <DeleteIcon />
                   DELETE PROJECT

                </Button>
                    </CardActions>
                  </Card>

                </Grid>



              )}
            </Grid>
          </div>
        )}

    </div>

  );
};