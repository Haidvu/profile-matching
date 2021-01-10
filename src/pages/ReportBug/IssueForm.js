import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function IssueForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Summary of Issue:
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <TextField
            autoFocus
            margin="dense"
            id="filled-multiline-static"
            multiline
            rows={12}
            required
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 1000 }}
            name="issueSummary"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
