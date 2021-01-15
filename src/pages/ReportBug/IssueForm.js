import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function IssueForm({ reportDetails, setReportDetails }) {
  const issue_summary = reportDetails;

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
            inputProps={{ maxLength: 750 }}
            name="issueSummary"
            value={issue_summary}
            onChange={setReportDetails}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
