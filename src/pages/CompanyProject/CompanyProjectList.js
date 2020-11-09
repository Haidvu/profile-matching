import React from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import AvatarImage from "../../assets/AvatarImage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Box, Avatar, List, ListItem, Divider, ListItemText, ListItemIcon, IconButton, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';


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
    padding: "70px",
    // width: "100%"

  },
  root: {
    flexGrow: 1,
  },
  cardActionArea: {
    height: "245px",
    //overflow: "hidden"
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
  }
}));

export default function CompanyProject() {

  const classes = useStyles();

  // Here will be the submit function to create the project
  // and the axios integration

  

  return (
    <div className="root">
      <img alt="profile background" className={classes.profileLogo} src={ProfileLogo}></img>
      <Avatar alt="profile image" src={AvatarImage} className={classes.profileImage} />
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" href="/" /*onClick={handleClick}*/>
          Home
        </Link>
        <Link color="inherit" href="/dashboard" /*onClick={handleClick}*/>
          Profile
        </Link>
        <Typography color="textPrimary">My Projects</Typography>
      </Breadcrumbs>

      <div className={classes.companyProjectCards}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea className={classes.cardActionArea}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="80"
                  image={AvatarImage}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardHeader}>
                    Project 1
                    </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standar...
                    </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                    Deadline: Sept 31, 2022
                   </Typography>
                  <Chip label="React" className={classes.chips} />
                  <Chip label="Django" className={classes.chips} />
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
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea className={classes.cardActionArea}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="80"
                  image={AvatarImage}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardHeader}>
                    Project 1
                    </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standar...
                    </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                    Deadline: Sept 31, 2022
                   </Typography>
                  <Chip label="React" className={classes.chips} />
                  <Chip label="Django" className={classes.chips} />
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
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea className={classes.cardActionArea}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="80"
                  image={AvatarImage}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardHeader}>
                    Project 1
                    </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standar...
                    </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                    Deadline: Sept 31, 2022
                   </Typography>
                  <Chip label="React" className={classes.chips} />
                  <Chip label="Django" className={classes.chips} />
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
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea className={classes.cardActionArea}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="80"
                  image={AvatarImage}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardHeader}>
                    Project 1
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standar...
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                    Deadline: Sept 31, 2022
                   </Typography>
                  <Chip label="React" className={classes.chips} />
                  <Chip label="Django" className={classes.chips} />
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
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea className={classes.cardActionArea}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="80"
                  image={AvatarImage}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardHeader}>
                    Project 1
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standar...
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                    Deadline: Sept 31, 2022
                   </Typography>
                  <Chip label="React" className={classes.chips} />
                  <Chip label="Django" className={classes.chips} />
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
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea className={classes.cardActionArea}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="80"
                  image={AvatarImage}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardHeader}>
                    Project 1
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standar...
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.deadline}>
                    Deadline: Sept 31, 2022
                   </Typography>
                  <Chip label="React" className={classes.chips} />
                  <Chip label="Django" className={classes.chips} />
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
        </Grid>
      </div>

    </div>
  );
};



