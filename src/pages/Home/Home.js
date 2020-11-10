import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../assets/HomePageBackground.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    textAlign: "center",
  },
  img: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    maskImage: "linear-gradient(to bottom, transparent 2%, black 75%)",
    filter: "brightness(60%)",
  },
  title: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "lato",
    fontWeight: "800",
    fontSize: "xxx-large",
    fontStyle: "normal",
    lineHeight: "115px",
  },

  title_1: {
    color: "black",
    display: "inline-grid",
  },

  title_2: {
    color: "rgba(200,16,46,1)",
  },

  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontFamily: "Lato",
    transform: "translate(-50%, -50%)",
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: "larger",
    color: "white",
    textShadow: '1px 1px 5px #C8102E',
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container component="main">
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <img alt="background" className={classes.img} src={Background}></img>
        <Grid item xs={12} md={6} className={classes.title}>
          <Grid item>
            <span className={classes.title_1}>Welcome to </span>
            <span className={classes.title_2}> FutureStart</span>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.content}>
          <h3>Apply for jobs using FutureStart. Get in touch with 1000's of
          companies. Take the next step for your future</h3>

        </Grid>
      </Grid>
    </div>
  );
}
export default Home;
