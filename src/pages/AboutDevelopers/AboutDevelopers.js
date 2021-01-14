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
          {/* <NavBar /> */}
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
                  <Link href="https://www.linkedin.com/in/jerellopez/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://avatars2.githubusercontent.com/u/58873590?s=460&v=4"
                title="Live from space album cover"
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
                  <Link href="https://www.linkedin.com/in/mayoor-shardha/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://media-exp1.licdn.com/dms/image/C4E03AQEtZYGpiDU7YQ/profile-displayphoto-shrink_400_400/0/1600906402673?e=1616025600&v=beta&t=6ysFxodU0jybsP3sXd6vgdd93cbIWUlCkhzdMpvkPIA"
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
                    CS Undergrad at University of Houston.
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Fun Fact:
                  </Typography>
                  <Link href="https://www.linkedin.com/in/haidvu/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://media-exp1.licdn.com/dms/image/C4E03AQE31aoPM2imkQ/profile-displayphoto-shrink_400_400/0/1595704770154?e=1616025600&v=beta&t=YOJpoU8sh0p0mA3HfEBHcu3RPS6lrJMMZJcFA3s_wLI"
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
                  <Link href="https://www.linkedin.com/in/muhammad-u/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://media-exp1.licdn.com/dms/image/C4E03AQFWhWvfUXUbVQ/profile-displayphoto-shrink_400_400/0/1598304352545?e=1616025600&v=beta&t=_KnbKmIPtP3-5BVp7m8Sg4Yf8Qm7_ReMMy1cQ6c8hGw"
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
                    BS Computer Science
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    CS Undergrad at University of Houston.
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Fun Fact:
                  </Typography>
                  <Link href="https://www.linkedin.com/in/sai-patibandla-8b6b1715a/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://avatars2.githubusercontent.com/u/15235080?s=400&v=4"
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
                  <Link href="https://www.linkedin.com/in/elisa-martinez-fuentes/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://media-exp1.licdn.com/dms/image/C4E03AQGV5rhrl7tHYA/profile-displayphoto-shrink_400_400/0/1553719191230?e=1616025600&v=beta&t=SvhGj059AXGJkC-PD9n4VpwzkYUg2OY1jc7M7Vk1Tac"
              />
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
                    Fun Fact:
                  </Typography>
                  <Link href="https://www.linkedin.com/in/thanhtanle/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://media-exp1.licdn.com/dms/image/C4E03AQEu83drkqqoFw/profile-displayphoto-shrink_400_400/0/1597455837340?e=1616025600&v=beta&t=ruvWomJEmRqXI7_a4vsbcPlN_AgWu4LV69N4t7jVSPQ"
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
                  <Link href="https://www.linkedin.com/in/lejing-huang-248467176/">
                    <LinkedInIcon className={classes.icon} />
                  </Link>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://avatars1.githubusercontent.com/u/60712503?s=400&v=4"
              />
            </Card>
          </Grid>
          <Footer />
        </Grid>
      </div>
    </div>
  );
}
