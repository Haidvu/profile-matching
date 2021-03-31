import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Nouhad from "../../assets/Nouhad.jpg";
import Jerel from "../../assets/JerelPic.PNG";
import Mayoor from "../../assets/Mayoor.jpeg";
import Muhammad from "../../assets/Muhammad.jpeg";
import Elisa from "../../assets/Elisa.jpeg";
import Hai from "../../assets/Hai.jpeg";
import Thanh from "../../assets/Thanh.jpeg";
import Lejing from "../../assets/Lejing.jpeg";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({

  title: {
    paddingTop: "0.6em",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
    color: "#C8102E",
    fontWeight: "800",
  },
  root: {
    maxWidth: "100%",
    height: "100%"

  },
}));

export default function MediaControlCard() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <NavBar />
          </Grid>
          <Grid item>
            <Typography className={classes.title} variant="h3">
              ABOUT THE DEVELOPERS
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={1} direction="row">

        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Nouhad"
                height="450"
                image={Nouhad}
                title="Nouhad"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Professor Nouhad Rizk
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Instructional Professor and Director of Undergraduates
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  University of Houston
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Entrepreneur
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/nouhad-j-rizk-50427325/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF RIZK */}

        {/* START OF MAYOOR  */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="450"
                image={Mayoor}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Mayoor Shardha
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Senior, BS Computer Science (May 2021)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Minor: Management Information System (MIS)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Fun Fact: I want to do skydiving even though I am scared of
                  heights!
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Frontend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/mayoor-shardha/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF MAYOOR */}

        {/* START OF JEREL */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="450"
                image={Jerel}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Jerel Lopez
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Senior, BS Computer Science (May 2021)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Minor: Mathematics
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Fun Fact: I like to work on cars as a hobby
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Frontend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/jerellopez/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF JEREL */}

        {/* START OF Muhammad */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image={Muhammad}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Muhammad Usman
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Sophomore, BS Computer Science (May 2023)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Minor: Finance
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Fun Fact: I like potatoes (very much)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Frontend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/muhammad-u/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF Muhammad */}

        {/* START OF Sai */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image="https://avatars2.githubusercontent.com/u/15235080?s=400&v=4"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Sai Patibandla
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Senior, BS Computer Science (Dec 2021)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Minor: Biology
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Fun Fact: I like doing art
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Frontend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/sai-patibandla-8b6b1715a/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF Sai */}

        {/* START OF Elisa */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image={Elisa}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Elisa Martinez
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Junior, BS Computer Science and Mathematics (May 2022)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  CS Undergrad at University of Houston.
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Fun Fact: My favorite fictional character is Sherlock Holmes
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Frontend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/elisa-martinez-fuentes/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF Elisa */}

        {/* START OF Hai */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image={Hai}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Hai Vu
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Junior, BS Computer Science (May 2022)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Minor: Mathematics
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Fun Fact: I'm an amateur carpenter
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Backend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/haidvu/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF Hai */}

        {/* START OF Thanh */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image={Thanh}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Thanh Le
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Senior, BS Computer Science (May 2021)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Minor: Mathematics
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Backend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/thanhtanle/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF Thanh */}

        {/* START OF Lejing */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="500"
                image={Lejing}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  Lejing Huang
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Junior, BS Computer Information Systems (May 2022)
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Minor: Computer Science
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Project Task: Backend
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="https://www.linkedin.com/in/lejing-huang-248467176/">
                <LinkedInIcon className={classes.icon} />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        {/* END OF Lejing */}
      </Grid>
      <div>
        <Grid>
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
