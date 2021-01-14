import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import {
  Typography,
  Grid,
  Chip,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { getConfig } from '../../authConfig';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import ShortTextRoundedIcon from "@material-ui/icons/ShortTextRounded";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
/* Speed Dial Material UI */
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  profileLogo: {
    backgroundRepeat: "no-repeat",
    position: "absolute",
    objectPosition: "20% 30%",

    height: "15vw",
    maxWidth: "100%",
    zIndex: 0,
    objectFit: "cover",
    opacity: "50%",
    right: "0px"

  },
  studentName: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  gridList: {
    width: "100%"
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
    padding: '10px',
    backgroundColor: "white",
  },
  card: {
    width: "280px",
    height: "100%",
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

  imageDiv: {

    position: "relative",
    display: "flex",
    textAlign: "center",
    height: "200px",
    alignItems: 'center',

  },
  divProjectName: {
    alignItems: "flex-end",
    zIndex: 2,
    position: "absolute",
    left: "0px",
    width: "100%",
  },

  companyInfo: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: "wrap"
  },
  companyIcon: {
    margin: "10px"
  },
  projectInfo: {
    margin: "20px"
  },
  companyInfoContainer: {
    padding: "20px"
  },
  projectBody: {
    padding: "20px"
  },
  bottomSpace: {
    paddingBottom: "10px"
  },
  chips: {
    margin: "5px",
  },

  /* Speed Dial */
  speedDial: {
    position: 'absolute',

    right: theme.spacing(2),
  },
  speedDialButton: {
    "MuiButtonBase-root": {
      backgroundColor: "#c8102e"
    }
  },
  "MuiSpeedDialAction-staticTooltipLabel": {
    width: "140px"
  },
  description: {
    display: "inline-block",
    wordBreak: "break-word"
  }

}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const actions = [
  { icon: <SaveIcon />, name: 'Save Project' },
];

export default function ProjectsListTemplate({ match }) {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data } = useContext(DataContext);
  const { profile } = data;

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const handleCloseSaveSucess = () => {
    setSaveSuccess(false)
  }
  const handleCloseSaveFailed = () => {
    setSaveFailed(false)
  }

  const saveProject = () => {
    setOpen(false);
    const data = {
      student_id: profile.student_id,
      project_id: match.params.project,
      student_preference_for_project: "0"
    };
    axios
      .post(
        "http://18.213.74.196:8000/api/student_select_project/create",
        data,
        getConfig()
      )
      .then((res) => {
        setSaveSuccess(true);
      })
      .catch((err) => {
        setSaveFailed(true);
      });
  };

  // Initial Info
  const [profileInfo, setCompanyInfo] = useState({});

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);

    axios.get("http://18.213.74.196:8000/api/company_project/" + match.params.project,

      getConfig()).then(res => {


        setIsLoading(false);

        setCompanyInfo({
          project_name: res.data.project_name,
          project_description: res.data.project_description,
          project_type: res.data.project_type,
          project_deadline: res.data.project_deadline,
          project_tech: res.data.project_tech ? res.data.project_tech.split(',').map((skill, index) => {
            return { label: skill, value: index }
          }): null,
          company_name: res.data.company_name,
          company_website: res.data.company_website,
          company_contact_email: res.data.company_contact_email,
          date_added: res.data.date_added
        })

      })
      .catch(err => {
        console.log(err.response.data)
      });


  }, [match.params.project])

  return (
    <>

      <div className={classes.imageDiv}>

        <div className={classes.divProjectName}>
          <Typography variant="h4">Project</Typography>
          <Typography variant="h5">{profileInfo.project_name}</Typography>
        </div>
      </div>


      {isLoading ? (
        <LinearProgress
          color="secondary"
          style={{ margin: "20px" }}
        ></LinearProgress>
      ) : (
          <Grid container className={classes.gridRoot}>

            <Grid container className={classes.gridRoot}>
              <Grid item xs={11}>
                <Grid container className={classes.companyInfoContainer}>
                  <Grid item xs={12} sm={12} md={4} className={classes.companyInfo}>
                    <BusinessRoundedIcon className={classes.companyIcon} />

                    {profileInfo.company_name}
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} className={classes.companyInfo}>
                    <LanguageRoundedIcon className={classes.companyIcon} />

                    {profileInfo.company_website}
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} className={classes.companyInfo}>
                    <ShortTextRoundedIcon className={classes.companyIcon} />

                    {profileInfo.company_contact_email}
                  </Grid>
                </Grid>

                <Grid container className={classes.projectBody}>
                  <Grid item xs={12} className={classes.companyInfo}>
                    <Typography variant="h6" display="inline" className={classes.bottomSpace}> Description: </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.companyInfo}>
                    <Typography className={classes.description}  style={{whiteSpace: 'pre-line'}}>
                      {profileInfo.project_description}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.projectInfo}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Typography display="inline" className={classes.bottomSpace}> Type: </Typography>
                    <Typography variant="body2" display="inline">
                      {profileInfo.project_type}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Typography display="inline" className={classes.bottomSpace}> Deadline: </Typography>
                    <Typography variant="body2" display="inline">
                      {profileInfo.project_deadline}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Typography display="inline" className={classes.bottomSpace}> Date Added: </Typography>
                    <Typography variant="body2" display="inline">
                      {profileInfo.date_added}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.projectInfo}>
                  <Grid item xs={12}>        
                    {(profileInfo.project_tech) ?
                      (profileInfo.project_tech.map((skill, index) =>
                        <Chip component={'span'} label={skill.label} className={classes.chips} key={index} />
                      )) :
                      (
                        <Chip
                          label="No technology specified for this project"
                          component={'span'}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>


                <SpeedDial
                  ariaLabel="SpeedDial tooltip example"
                  className={classes.speedDial}
                  icon={<SpeedDialIcon />}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  open={open}
                  direction="down"
                  FabProps={{ color: "secondary" }}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      tooltipOpen
                      onClick={saveProject}

                    />
                  ))}
                </SpeedDial>
              </Grid>
            </Grid>

          </Grid>
        )
      }

      <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleCloseSaveSucess}>
        <Alert onClose={handleCloseSaveSucess} severity="success">
          Project {profileInfo.project_name} was saved with no preference! Please go to "My Projects" to change the preference of this project.
        </Alert>
      </Snackbar>
      <Snackbar open={saveFailed} autoHideDuration={6000} onClose={handleCloseSaveFailed}>
        <Alert onClose={handleCloseSaveFailed} severity="error">
          This project was saved. Please go to "My Projects" to change the preference of this project or to view your preferences.
        </Alert>
      </Snackbar>
    </>
  );
}


