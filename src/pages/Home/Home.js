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
  },
  title: {
    position: "absolute",
    top: "25%",
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
    top: "40%",
    left: "50%",
    fontFamily: "Lato",
    transform: "translate(-50%, -50%)",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "larger",
    color: "white",
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
          Apply for jobs using FutureStart. Get in touch with 1000's of
          companies. Take the next step for your future
        </Grid>
      </Grid>
    </div>
  );
}
export default Home;
