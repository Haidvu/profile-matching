import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginTop: "8rem",
    textAlign: "center",
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Button variant="contained" href="/">
        Go back to Home
      </Button>
    </div>
  );
};

export default NotFound;
