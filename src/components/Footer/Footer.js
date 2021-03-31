import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "white", fontWeight: "bold" }}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.uh.edu/">
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
    width: "100%",
    flex: "1 0 auto",
  },

  footer: {
    padding: "1.5em",
    marginTop: "auto",
    backgroundColor: "#C8102E",
  },
  footerText: {
    color: "#FFFFFF",
    marginTop: theme.spacing(1),
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
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={3} md={3}>
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
          <Grid item xs={12} sm={3} md={3}>
            <Link
              to="/report-bug"
              href="/report-bug"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" className={classes.footerText}>
                Report an Issue
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Link
              to="/privacy-policy"
              href="/privacy-policy"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" className={classes.footerText}>
                Privacy Policy
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} md={3} className={classes.footerText}>
            <Copyright />
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
