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
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router-dom";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import ShortTextRoundedIcon from "@material-ui/icons/ShortTextRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";

import CompanyProjectTemplate from "../../assets/CompanyProjectTemplate.svg";


/* Speed Dial Material UI */

import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
  "MuiSpeedDialAction-staticTooltipLabel":{
    width: "140px"
  }

}));

const actions = [
  { icon: <SaveIcon />, name: 'Save Project' },
  { icon: <ShareIcon />, name: 'Share' }
];

const ProjectsListTemplate = ({ loading, project, company }) => {
  let { url } = useRouteMatch();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const profileInfo = {
    company_name: "Company Test",
    company_website: "hello.com",
    company_contact_email: "geourge@curious.com",
    project_id: 3,
    project_name: "Build a Website",
    project_description: "Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi cons",
    project_type: "Backend",
    project_tech: "Java,C++,Python",
    project_deadline: "2020-12-30",
    date_added: "2020-12-20"
  }

  return (
    <>

      <div className={classes.imageDiv}>

        <div className={classes.divProjectName}>
          <Typography variant="h4">Project</Typography>
          <Typography variant="h5">Project Name Really Long Project Name Really Long Project Name Really Long Project Name Really Long</Typography>
        </div>
      </div>


      {loading ? (
        <LinearProgress
          color="secondary"
          style={{ margin: "20px" }}
        ></LinearProgress>
      ) : (
          <Grid container className={classes.gridRoot}>

            <Grid container className={classes.gridRoot}>
              <Grid item xs={11}>
                <Grid container className={classes.companyInfoContainer}>
                  <Grid item xs={12} sm={12} md={3} className={classes.companyInfo}>
                    <BusinessRoundedIcon className={classes.companyIcon} />
                  
                    {profileInfo.company_name}
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} className={classes.companyInfo}>
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
                    <Typography variant="body1">
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
                    {profileInfo.project_tech.split(',').map((skill, index) =>
                      <Chip label={skill} className={classes.chips} key={index} />
                    )}

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
                  FabProps={{ color: "secondary"}}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      tooltipOpen
                      onClick={handleClose}
                 
                    />
                  ))}
                </SpeedDial>
              </Grid>
            </Grid>

          </Grid>
        )}
    </>
  );
};

export default ProjectsListTemplate;
