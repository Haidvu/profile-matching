import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Button,
  LinearProgress,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { getConfig } from "../../authConfig";
import { Link } from "react-router-dom";

import { DataGrid } from '@material-ui/data-grid';
import StarIcon from "@material-ui/icons/Star";
import { styled } from '@material-ui/core/styles';
import Chip from "@material-ui/core/Chip";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontSize: "10px",
  },
  formControl: {
    disply: "block",
    minWidth: theme.spacing(15),
    margin: "5px"

  },
  button: {
    margin: "5px"
  },
  dataGrid: {
    '& > div': { height: "fit-content !important" },
    '& .MuiDataGrid-cell': { maxHeight: "none !important", flexWrap: "wrap" },
    '& .MuiDataGrid-row': { maxHeight: "none !important" },
    '& .MuiDataGrid-viewport': { maxHeight: "none !important" },
    '& .MuiDataGrid-window': { overflowY: "auto !important" },
    '& .actions': { display: "flex", justifyContent: "space-evenly" },
  },
  chips: {
    margin: "5px",
  },
  accordionContainer:{
    boxShadow: "none",
    width: "100%",
    background: "none"
  },
  accordionDetails:{
    flexWrap: "wrap"
  },
  heading:{
    color: "#0000008a"
  }
}));

const MyDataGrid = styled(DataGrid)`
  .container {
    height: 500px !important
  }
  .cell{
    max-width: none !important
  }
`;

const CompanyProjectTeam = ({ id }) => {
  //const Id = profile.id;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [showEditFields, setShowEditFields] = useState({});
  const [teamMembers, setTeamMembers] = useState({});
  const [teamMembersDelta, setTeamMembersDelta] = useState({});

  const getSavedStudents = useCallback(() => {
    //useCallback allows function to be created only first render.
    //Get all saved profiles
    let team = {};
    let showEditFieldsTemp = {};
    setLoading(true);
    axios
      .get(
        `http://18.213.74.196:8000/api/project_select_student/all`,
        getConfig()
      )
      .then((res) => {
        console.log(res.data)
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
        console.log(err.response.data);
      });

  }, [setTeamMembers, setTeamMembersDelta, setShowEditFields, setLoading, id]);

  useEffect(() => {
    getSavedStudents();

  }, [getSavedStudents]);

  const handleSave = (id, student_db_id, student_name, project_id, student_skills) => {
    axios
      .put(
        `http://18.213.74.196:8000/api/project_select_student/${id}/update`,
        {
          student_db_id: student_db_id,
          project_preference_for_student:
            teamMembersDelta[student_db_id]
              .project_preference_for_student,
        },
        getConfig()
      )
      .then((res) => {

        console.log('update skill', student_skills)

        setTeamMembers({
          ...teamMembers,
          [student_db_id]: {
            id: res.data.id,
            project_id: project_id,
            student_db_id: res.data.student_db_id,
            student_name: student_name,
            student_skills: student_skills,
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

  const showFields = (student_db_id) => {
    setShowEditFields({
      ...showEditFields,
      [student_db_id]: true,
    });
  };

  const handleChange = (e, student_db_id) => {
    setTeamMembersDelta({
      ...teamMembersDelta,
      [student_db_id]: {
        ...teamMembersDelta[student_db_id],
        project_preference_for_student: e.target.value,
      },
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://18.213.74.196:8000/api/project_select_student/${id}/delete`,
        getConfig()
      )
      .then((res) => {
        // you set and clean the state here, not call axios again
        /* getSavedStudents();*/

        const filterObject = (obj, filter, filterValue) =>
          Object.keys(obj).reduce((acc, val) =>
          (obj[val][filter] === filterValue ? acc : {
            ...acc,
            [val]: obj[val]
          }
          ), {});

        setTeamMembers(filterObject(teamMembers, "id", id));

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = (student_db_id) => {
    setShowEditFields({
      ...showEditFields,
      [student_db_id]: false,
    });
  };

  const showStars = (num) => {
    if (num === 0) {
      return (
        <>
          <span>No Proference</span>
        </>
      );
    } else if (num === 1) {
      return (
        <>
          <StarIcon style={{ color: '#ffb400' }} />
          <StarIcon style={{ color: '#0000008a' }} />
          <StarIcon style={{ color: '#0000008a' }} />
        </>
      );
    } else if (num === 2) {
      return (
        <>
          <StarIcon style={{ color: '#ffb400' }} />
          <StarIcon style={{ color: '#ffb400' }} />
          <StarIcon style={{ color: '#0000008a' }} />
        </>
      );
    } else if (num === 3) {
      return (
        <>
          <StarIcon style={{ color: '#ffb400' }} />
          <StarIcon style={{ color: '#ffb400' }} />
          <StarIcon style={{ color: '#ffb400' }} />
        </>
      );
    }
  };

  const columns = [

    {
      field: "icon", headerName: "Avatar", width: 130,
      renderCell: (params) => {
        return <Avatar />;
      },
      sortable: false,
      disableColumnMenu: false
    },
    {
      field: "student_name",
      headerName: "Student Name",
      width: 260,
      renderCell: (params) => {
        return (
          <Link
            to={{
              pathname: `/dashboard/search/${params.row.student_db_id}`,
            }}
            style={{ textDecoration: "none" }}>
            <Typography>{params.row.student_name}</Typography>
          </Link>
        )
      }
    },
    {
      field: "preference",
      headerName: "Preference",
      width: 130,
      renderCell: (params) => {
        return showStars(params.row.project_preference_for_student);
      },
      sortComparator: (v1, v2, param1, param2) => param1.row.project_preference_for_student - param2.row.project_preference_for_student,
    },
    {
      field: "student_skills",
      headerName: "Student Skills",
      sortable: false,
      width: 330,
      renderCell: (params) => {
        return (
          <>

            <Accordion className={classes.accordionContainer}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Click here to see the skills</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>

              {Object.keys(params.row.student_skills).length &&
              params.row.student_skills ? (
                params.row.student_skills.map((skill, index) => (
                  <Chip
                    label={skill}
                    className={classes.chips}
                    key={index}
                  />
                ))
              ) : (
                <>
                <Typography className={classes.heading}>None</Typography>
                </>
              )}
              </AccordionDetails>
            </Accordion>
          </>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 500,
      cellClassName: "actions",
      sortable: false,
      align: 'right',
      renderCell: (params) => {
        return (
          <>
            {showEditFields[params.row.student_db_id] ? (
              <>
                <Grid item xs={5} md={3}>
                  <FormControl className={classes.formControl}>

                    <Select
                      label="experience"
                      name={params.row.project_id}
                      className={classes.preference}
                      onChange={(e) => handleChange(e, params.row.student_db_id)}>
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
                    className={classes.button}

                    // disabled={
                    //   saveStudent.project_id !== project.project_id
                    // }
                    onClick={() => handleSave(params.row.id, params.row.student_db_id, params.row.student_name, params.row.project_id, params.row.student_skills)}>
                    Save
                        </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}

                    // disabled={
                    //   saveStudent.project_id !== project.project_id
                    // }
                    onClick={() => handleCancel(params.row.student_db_id)}>
                    Cancel
                        </Button>
                </Grid>
              </>
            ) : (
                <>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      // disabled={
                      //   saveStudent.project_id !== project.project_id
                      // }
                      onClick={() => showFields(params.row.student_db_id)}>
                      Update
                        </Button>
                  </Grid>
                </>
              )}

            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  handleDelete(params.row.id);
                }}>
                Delete
                    </Button>
            </Grid>
          </>
        )
      }
    }

  ];

  const rows = Object.entries(teamMembers).map(([id, member]) => {

    return ({
      id: member.id,
      project_id: member.project_id,
      project_preference_for_student: member.project_preference_for_student,
      student_db_id: member.student_db_id,
      student_name: member.student_name,
      student_skills: member.student_skills
    })
  })

  return (
    <>

      {loading ? (
        <div>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item md={4}>
              <LinearProgress color="secondary" />
            </Grid>
          </Grid>
        </div>
      ) : (
          <Grid container direction="row" spacing={1}>
            {Object.keys(teamMembers).length > 0 ? (
              <>
                <div style={{ height: "600px", width: "100%" }} className={classes.dataGrid} >
                  <MyDataGrid


                    autoPageSize={true}
                    rows={rows}
                    columns={columns}


                  />
                </div>
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
