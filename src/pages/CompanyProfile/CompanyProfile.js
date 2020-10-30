import React, { useContext, useState } from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {  Typography,
  TextField,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
  Input,
  Select,
  MenuItem
} from "@material-ui/core";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ShortTextRoundedIcon from '@material-ui/icons/ShortTextRounded';
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import StarsIcon from "@material-ui/icons/Stars";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

import { DataContext } from '../../contexts/dataContext'

const industryTypes = [
    'Agriculture Services',
    'Architecture/Design',
    'Arts/Education',
    'Business/Finance/Consulting',
    'Construction/RealEstate',
    'Engineering/Manufacturing',
    'Education Services',
    'Food Service/Hospitality/Tourism',
    'Government/Non-Profites',
    'Healthcare/Life-Science',
    'Information Technology',
    'Legal',
    'Media/Marketing/Communications',
    'Religious Organizations',
    'Retail/Trade/Fashion',
    'Sports/Recreation',
    'Utilities/Energy/Environment',
    'UH Faculty/Staff',
    'University Career Services',
    'Univrsity Education Support Program (VESP)',
    'Transportation/Logistics'
]

const useStyles = makeStyles((theme) => ({
  profileLogo: {
    objectFit: "contain",
    display: "flex",
    position: "relative",
  },
  inline: {
    display: "inline",
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
    color: "#f50057",
  },
  download: {
    objectFit: "contain",
    position: "relative",
    width: "5%",
  },
  skills: {
    textAlign: "center",
    borderRadius: 200,
    backgroundColor: "#FFFFFF",
  },
  formInput: {
      width: '50%'
  }
}));
export default function CompanyProfile() {
  const classes = useStyles();

  const [profileInfo, setProfileInfo] = useState({ //This is the data
        companyMission: '',
        companyDescription: '',
        companyType: '',
        companyWebsite: '',
        companyRep: '',
        orgType: '',
        industryType: ''
  })

  const [profileInput, showProfileInput] = useState({ //This tells whether to show input fields. 
      companyMission: false,
      companyDescription: false,
      companyType: false,
      companyWebsite: false,
      companyRep: false,
      orgType: false,
      industryType: false
  });

  const handleOpenEdit = (name) => {
     showProfileInput({
         ...profileInput,
         [name]: true
        });
  }

  const handleCloseEdit = (name) => {
    showProfileInput({
        ...profileInput,
        [name]: false
       });
  }

  const handleSave = (name) => { //Make api call to save data. 
      handleCloseEdit(name);
  }

  return (
    <div>
      <img
        alt="profile logo"
        className={classes.profileLogo}
        src={ProfileLogo}
      ></img>
      <List>
      <ListItem alignItems="flex-start">
          <ListItemIcon>
            <ShortTextRoundedIcon fontSize="large"/>
          </ListItemIcon>
          <ListItemText
            primary="Company Mission"
            secondary={
                <React.Fragment>
                    { profileInput.companyMission === false ? (<Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Company Mission Info
                    </Typography>): (
                        <Input className={classes.formInput}></Input>
                    )}
                </React.Fragment>
                }
            />
            { profileInput.companyMission === false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('companyMission')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCloseEdit('companyMission')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('companyMission')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <ShortTextRoundedIcon fontSize="large"/>
          </ListItemIcon>
          <ListItemText
            primary="Company Description"
            secondary={
                <React.Fragment>
                    { profileInput.companyDescription === false ? (<Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Company Description Info
                    </Typography>): (
                        <Input className={classes.formInput}></Input>
                    )}
                </React.Fragment>
                }
            />
            { profileInput.companyDescription === false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('companyDescription')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCloseEdit('companyDescription')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('companyDescription')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <PersonRoundedIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Organization Represntative"
            secondary={
                <React.Fragment>
                    { profileInput.companyRep === false ? (<Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Name of person who created account
                    </Typography>): (
                        <Input className={classes.formInput}></Input>
                    )}
                </React.Fragment>
                }
            />
            { profileInput.companyRep === false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('companyRep')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCloseEdit('companyRep')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('companyRep')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>

        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <LanguageRoundedIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Website"
            secondary={
                <React.Fragment>
                    { profileInput.companyWebsite === false ? (<Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        wwww.example.com
                    </Typography>): (
                        <Input className={classes.formInput}></Input>
                    )}
                </React.Fragment>
                }
            />
            { profileInput.companyWebsite === false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('companyWebsite')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCloseEdit('companyWebsite')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('companyWebsite')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <LanguageRoundedIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Organization Type"
            secondary={
                <React.Fragment>
                    { profileInput.companyType === false ? (<Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Organization Type
                    </Typography>): (
                        <Input className={classes.formInput}></Input>
                    )}
                </React.Fragment>
                }
            />
            { profileInput.companyType=== false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('companyType')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCloseEdit('companyType')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('companyType')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <WorkRoundedIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Industry Type"
            secondary={
                <React.Fragment>
                    { profileInput.industryType === false ? (<Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Organization Type
                    </Typography>) : (
                        <Select className={classes.formInput}>
                            {industryTypes.map((industryType) => (
                                <MenuItem key={industryType} value={industryType}>{industryType}</MenuItem>
                            ))}
                        </Select>
                    )}
                </React.Fragment>
                }
            />
            { profileInput.industryType=== false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('industryType')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCloseEdit('industryType')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('industryType')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>
      </List>
    </div>
  );
}
