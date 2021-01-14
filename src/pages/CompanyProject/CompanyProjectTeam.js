import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Button,
  LinearProgress,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontSize: "10px",
  },
  formControl: {
    disply: "block",
    minWidth: theme.spacing(10 * 2),
  },
}));

const CompanyProjectTeam = ({ id }) => {
  //const Id = profile.id;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [showEditFields, setShowEditFields] = useState({});
  const [teamMembers, setTeamMembers] = useState({});
  const [teamMembersDelta, setTeamMembersDelta] = useState({});

  const getSavedStudents = useCallback(() => {
    //useCallback allows function to be created only first render.
    //Get all saved profiles
    let team = {};
    let showEditFieldsTemp = {};
    axios
      .get(
        `http://18.213.74.196:8000/api/project_select_student/all`,
        getConfig()
      )
      .then((res) => {
        const savedMembers = res.data.filter((item) => {
          return parseInt(item.project_id) === parseInt(id);
        });
        savedMembers.forEach((member) => {
          team[member.student_db_id] = member;
          showEditFieldsTemp[member.student_db_id] = false;
        });
        setTeamMembers(team);
        setTeamMembersDelta(team);
        setShowEditFields(showEditFieldsTemp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTeamMembers, setTeamMembersDelta, setShowEditFields, setLoading, id]);

  useEffect(() => {
    getSavedStudents();
  }, [getSavedStudents]);

  const handleSave = (member) => {
    axios
      .put(
        `http://18.213.74.196:8000/api/project_select_student/${member.id}/update`,
        {
          student_db_id: member.student_db_id,
          project_preference_for_student:
            teamMembersDelta[member.student_db_id]
              .project_preference_for_student,
        },
        getConfig()
      )
      .then((res) => {
        setTeamMembers({
          ...teamMembers,
          [member.student_db_id]: {
            id: res.data.id,
            project_id: member.project_id,
            student_db_id: res.data.student_db_id,
            student_name: member.student_name,
            project_preference_for_student:
              res.data.project_preference_for_student,
          },
        });
        setShowEditFields({
          ...showEditFields,
          [res.data.student_db_id]: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showFields = (member) => {
    setShowEditFields({
      ...showEditFields,
      [member.student_db_id]: true,
    });
  };

  const handleChange = (e, member) => {
    setTeamMembersDelta({
      ...teamMembersDelta,
      [member.student_db_id]: {
        ...teamMembersDelta[member.student_db_id],
        project_preference_for_student: e.target.value,
      },
    });
  };

  const handleDelete = (member) => {
    axios
      .delete(
        `http://18.213.74.196:8000/api/project_select_student/${member.id}/delete`,
        getConfig()
      )
      .then((res) => {
        getSavedStudents();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = (member) => {
    setShowEditFields({
      ...showEditFields,
      [member.student_db_id]: false,
    });
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container direction="row" spacing={1}>
          {Object.keys(teamMembers).length > 0 ? (
            <>
              {Object.entries(teamMembers).map(([id, member]) => (
                <Grid item container key={id} alignItems="center" spacing={1}>
                  <Grid item xs={2} md={1}>
                    <Avatar />
                  </Grid>
                  <Grid item xs={5} md={3}>
                    <Link
                      to={{
                        pathname: `/dashboard/search/${member.student_db_id}`,
                      }}
                      style={{ textDecoration: "none" }}>
                      <Typography>{member.student_name}</Typography>
                    </Link>
                  </Grid>
                  {showEditFields[member.student_db_id] ? (
                    <>
                      <Grid item xs={5} md={3}>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Preference</InputLabel>
                          <Select
                            label="experience"
                            name={member.project_id}
                            className={classes.preference}
                            onChange={(e) => handleChange(e, member)}>
                            <MenuItem value={1}>Low</MenuItem>
                            <MenuItem value={2}>Medium</MenuItem>
                            <MenuItem value={3}>High</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="secondary"
                          // disabled={
                          //   saveStudent.project_id !== project.project_id
                          // }
                          onClick={() => handleSave(member)}>
                          Save
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="secondary"
                          // disabled={
                          //   saveStudent.project_id !== project.project_id
                          // }
                          onClick={() => handleCancel(member)}>
                          Cancel
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={5} md={3}>
                        <Typography>{`Preference: ${
                          member.project_preference_for_student === 1
                            ? "Low"
                            : member.project_preference_for_student === 2
                            ? "Medium"
                            : "High"
                        }`}</Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="secondary"
                          // disabled={
                          //   saveStudent.project_id !== project.project_id
                          // }
                          onClick={() => showFields(member)}>
                          Update
                        </Button>
                      </Grid>
                    </>
                  )}

                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        handleDelete(member);
                      }}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </>
          ) : (
            <Container>
              <Typography style={{ fontStyle: "italic" }}>
                No Team members Added yet.
              </Typography>
            </Container>
          )}
        </Grid>
      )}
    </>
  );
};

export default CompanyProjectTeam;
