import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Jerel from "../../assets/Jerel.jpeg";
import Mayoor from "../../assets/Mayoor.jpeg";
import Muhammad from "../../assets/Muhammad.jpeg";
import Elisa from "../../assets/Elisa.jpeg";
import Hai from "../../assets/Hai.jpeg";
import Thanh from "../../assets/Thanh.jpeg";

const useStyles = makeStyles((theme) => ({
  main: {
    background: "#f5f5f5",
  },
  root: {
    display: "flex",
    width: "95vw",
    margin: theme.spacing(3),
    // background: "#f5f5f5",
    background: "#FFFFFF",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0.6em",
    marginTop: theme.spacing(10),
    color: "#C8102E",
    letterSpacing: "2px",
    fontSize: "50px",
    fontWeight: "800",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    minHeight: 256,
    minWidth: 256,
  },
  icon: {
    height: "50%",
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div>
        <NavBar />
      </div>
      <div>
        <Typography className={classes.title}>ABOUT THE DEVELOPERS</Typography>
      </div>
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
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
                  <Link href="https://www.linkedin.com/in/jerellopez/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={Jerel}
                title="Jerel Lopez"
              />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
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
                  <Link href="https://www.linkedin.com/in/mayoor-shardha/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={Mayoor}
                title="Mayoor Shardha"
              />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
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
                  <Link href="https://www.linkedin.com/in/muhammad-u/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={Muhammad}
                title="Muhammad Usman"
              />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
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
                  <Link href="https://www.linkedin.com/in/sai-patibandla-8b6b1715a/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://avatars2.githubusercontent.com/u/15235080?s=400&v=4"
                title="Sai Patibandla"
              />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
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
                  <Link href="https://www.linkedin.com/in/elisa-martinez-fuentes/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={Elisa}
                title="Elisa Martinez"
              />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
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
                  <Link href="https://www.linkedin.com/in/haidvu/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia className={classes.cover} image={Hai} title="Hai Vu" />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
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
                  <Link href="https://www.linkedin.com/in/thanhtanle/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={Thanh}
                title="Thanh Le"
              />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    Lejing Huang
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    BS Computer Science
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    CS Undergrad at University of Houston.
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Fun Fact:
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Project Task: Backend
                  </Typography>
                  <Link href="https://www.linkedin.com/in/lejing-huang-248467176/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://avatars1.githubusercontent.com/u/60712503?s=400&v=4"
                title="Lejing Huang"
              />
            </Card>
          </Grid>
          <Footer />
        </Grid>
      </div>
    </div>
  );
}
