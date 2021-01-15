import React from "react";
import {
  Typography,
  Grid,
  Chip,
  Button,
  Card,
  Link,
  CardHeader,
  CardContent,
  Avatar,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  studentName: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  subheader: {
    color: theme.palette.text.primary,
  },
  skillsRoot: {
    display: "flex",
    alignItems: "center",
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chipLabel: {
    color: theme.palette.text.primary,
  },
  qualification: {
    textTransform: "uppercase",
  },
  actionArea: {
    padding: theme.spacing(1),
    "&:focus": {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  fieldTitle: {
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
    fontSize: "0.7rem",
    letterSpacing: "0.05rem",
  },
  fieldValue: {
    fontSize: "0.7rem",
  },
  cardHeader: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardContent: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  gridRoot: {
    margin: theme.spacing(2),
  },
  card: {
    width: "280px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
  },
  noPaddingTop: {
    paddingTop: "0",
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  spinner: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  loader: {
    position: "relative",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const StudentsList = ({ loading, studentsList }) => {
  let { url } = useRouteMatch();
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <LinearProgress
          color="secondary"
          style={{ margin: "20px" }}></LinearProgress>
      ) : (
        <Grid container justify={"center"}>
          {studentsList.map((student) => (
            <Grid item key={student.username_id} style={{ margin: "15px" }}>
              <Card className={classes.card}>
                <div>
                  <CardHeader
                    classes={{
                      root: classes.cardHeader,
                      title: classes.studentName,
                      subheader: classes.subheader,
                    }}
                    avatar={<Avatar className={classes.avatar}></Avatar>}
                    title={student.full_name}
                    subheader={`${student.degree} - ${student.major}`}></CardHeader>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.fieldTitle}>
                      Graduation Date
                    </Typography>
                    <Typography className={classes.fieldValue}>
                      {student.graduation_date}
                    </Typography>
                  </CardContent>
                  <CardContent
                    className={`${classes.cardContent} ${classes.noPaddingTop}`}>
                    <Typography className={classes.fieldTitle} >
                      Description
                    </Typography>
                    <Typography className={classes.fieldValue} style={{wordBreak: 'break-all' }}>
                      {student.student_description}
                    </Typography>
                  </CardContent>

                  <CardContent
                    className={`${classes.cardContent} ${classes.noPaddingTop}`}>
                    <Typography
                      variant="subtitle2"
                      className={classes.fieldTitle}>
                      Skills
                    </Typography>
                    <div className={classes.skillsRoot} style={{ flexWrap: "wrap"}}>
                      {student.student_skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill.skill_name}
                          classes={{
                            root: classes.chip,
                            label: classes.chipLabel,
                          }}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </div>
                  </CardContent>
                </div>
                <div>
                  <Divider></Divider>
                  <CardContent>
                    <Link
                      href={`${url}/${student.student_db_id}`}
                      style={{ textDecoration: "none" }}>
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                        className={classes.button}>
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default StudentsList;
