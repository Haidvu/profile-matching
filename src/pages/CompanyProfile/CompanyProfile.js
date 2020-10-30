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
  MenuItem,
  FormControl
} from "@material-ui/core";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ShortTextRoundedIcon from '@material-ui/icons/ShortTextRounded';
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
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
    maxHeight: '250px'
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

  const [profileInfo, setProfileInfo] = useState({ //This is the data you get from api. 
        companyMission: 'This is the company mission',
        companyDescription: 'This is company Description',
        companyType: 'Public',
        companyWebsite: 'www.example.com',
        companyRep: 'John Doe',
        industryType: 'Information Technology',
        phoneNumber: '123-456-7890'
  })

  const [profileInput, showProfileInput] = useState({ //This tells whether to show input fields. 
      companyMission: false,
      companyDescription: false,
      companyType: false,
      companyWebsite: false,
      companyRep: false,
      industryType: false,
      phoneNumber: false,
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

  const handleChange = (e) => {
      setProfileInfo({
          ...profileInfo,
          [e.target.name]: e.target.value
      })
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
                        {profileInfo.companyMission}
                    </Typography>): (
                        <Input className={classes.formInput} value={profileInfo.companyMission} onChange={handleChange} placeholder={profileInfo.companyMission} name="companyMission"></Input>
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
                        {profileInfo.companyDescription}
                    </Typography>): (
                        <Input className={classes.formInput} value={profileInfo.companyDescription} onChange={handleChange} name="companyDescription"></Input>
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
                        {profileInfo.companyRep}
                    </Typography>): (
                        <Input className={classes.formInput} value={profileInfo.companyRep} onChange={handleChange} name="companyRep"></Input>
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
                        {profileInfo.companyWebsite}
                    </Typography>): (
                        <Input className={classes.formInput} value={profileInfo.companyWebsite} onChange={handleChange} name="companyWebsite"></Input>
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
                        {profileInfo.companyType}
                    </Typography>): (
                        <Select value={profileInfo.companyType} name="companyType" className={classes.formInput} onChange={handleChange}>
                            <MenuItem value="Public">Public</MenuItem>
                            <MenuItem value="Private">Private</MenuItem>
                        </Select>
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
                        {profileInfo.industryType}
                    </Typography>) : (
                        <Select className={classes.formInput} value={profileInfo.industryType} onChange={handleChange} name="industryType">
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
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <PhoneRoundedIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Phone Number"
            secondary={
                <React.Fragment>
                    { profileInput.phoneNumber === false ? (<Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {profileInfo.phoneNumber}
                    </Typography>): (
                        <Input className={classes.formInput} value={profileInfo.phoneNumber} onChange={handleChange} name="phoneNumber"></Input>
                    )}
                </React.Fragment>
                }
            />
            { profileInput.phoneNumber=== false ? (
                <IconButton className={classes.icon} onClick={() => {handleOpenEdit('phoneNumber')}}>
                    <EditTwoToneIcon/>
                </IconButton>
            ) : (<>
            <IconButton className={classes.icon} onClick={() => {handleCloseEdit('phoneNumber')}}>
                <ClearRoundedIcon/>
            </IconButton>
            <IconButton className={classes.icon} onClick={() => {handleSave('phoneNumber')}}>
                <CheckRoundedIcon style={{ color: 'green'}}/>
            </IconButton>
            </>)}
        </ListItem>
      </List>
      {/* <pre>{JSON.stringify(profileInfo, null, 2)}</pre> */}
    </div>
  );
}
