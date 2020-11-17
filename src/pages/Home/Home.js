import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../assets/HomePageBackground.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  text: {
    position: "relative",
    paddingTop: "200px",
  },
  title_1: {
    color: "black",
  },
  title_2: {
    color: "rgba(200,16,46,1)",
  },
  content: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "900",
    color: "white",
    textShadow: "1px 1px 5px #C8102E",
  },
}));

function Home() {
  const classes = useStyles();
  const theme = createMuiTheme();
  const background = {
    imageUrl: {
      backgroundImage: `url(${Background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
    },
  };
  theme.typography.h3 = {
    fontSize: "1.4rem",
    "@media (min-width:400px)": {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  return (
    <div>
      <React.Fragment>
        <Grid
          style={background.imageUrl}
          item
          xs={12}
          className={classes.root}
          component="main">
          <Navbar />
          <div className={classes.text}>
            <Grid item xs={12}>
              <Typography
                className={classes.title_1}
                display="inline"
                variant="h2">
                Welcome to
              </Typography>
              <Typography
                className={classes.title_2}
                display="inline"
                variant="h2">
                &nbsp;FutureStart
              </Typography>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Typography className={classes.content} xs={6} variant="h5">
                Apply for jobs using FutureStart. Get in touch with 1000's of
              </Typography>
              <Typography className={classes.content} xs={6} variant="h5">
                companies. Take the next step for your future
              </Typography>
            </Grid>
          </div>
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Home;
