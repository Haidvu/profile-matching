import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../assets/HomePageBackground.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  text: {
    position: "relative",
    paddingTop: "200px",
  },
  title_1: {
    color: "black",
    letterSpacing: "1px"
  },
  title_2: {
    color: "rgba(200,16,46,1)",
    letterSpacing: "1px"
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
  const background = {
    imageUrl: {
      backgroundImage: `url(${Background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%"
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
                variant="h3">
                Welcome to
              </Typography>
              <Typography
                className={classes.title_2}
                display="inline"
                variant="h3">
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
          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Home;
