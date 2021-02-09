import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "white", fontWeight: "bold" }}>
      {"Copyright © "}
      <Link color="inherit" href="http://scmatch.cs.uh.edu/">
        UHCS Consulting Clinic
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // minHeight: "60vh",
    width: "100%",
    flex: "1 0 auto",
  },
  rootGrid: {
    flexGrow: 1,
  },
  footer: {
    padding: "1em",
    marginTop: "auto",
    backgroundColor: "#C8102E",
  },
  footerRelated: {
    color: "#FFFFFF",
  },
  footerText: {
    color: "#FFFFFF",
  },
  image: {
    width: "50%",
    float: "left",
    objectFit: "contain",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={4}
          className={classes.rootGrid}
        >
          <Grid item xs={3}>
            <img
              className={classes.image}
              alt=""
              src="https://uh.edu/marcom/_images/brand/logo-uh-primary-black.svg"
            ></img>
          </Grid>
          <Grid item xs={2}>
            <Link
              to="/developers"
              href="/developers"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" className={classes.footerText}>
                About the Developers
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link
              to="/report-bug"
              href="/report-bug"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" className={classes.footerRelated}>
                Report an Issue
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link
              to="/privacy-policy"
              href="/privacy-policy"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" className={classes.footerRelated}>
                Privacy Policy
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Copyright />
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
