import React, { useState, useEffect, useContext } from "react";
import CompanyDashboard from "../../assets/CompanyDashboard.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  RadioGroup,
  Radio,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import ShortTextRoundedIcon from "@material-ui/icons/ShortTextRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

import { DataContext } from "../../contexts/dataContext";
import { getConfig } from "../../authConfig";
import axios from "axios";

const industryTypes = [
  "Agriculture Services",
  "Architecture/Design",
  "Arts/Education",
  "Business/Finance/Consulting",
  "Construction/RealEstate",
  "Engineering/Manufacturing",
  "Education Services",
  "Food Service",
  "Hospitality",
  "Tourism",
  "GOvernment/Non-Profites",
  "Healthcare/Life-Science",
  "Information Technology",
  "Legal",
  "Marketing",
  "Media/Communications",
  "Religious Organizations",
  "Retail/Trade/Fashion",
  "Sports/Recreation",
  "Utilities/Energy/Environment",
  "UH Faculty/Staff",
  "Transportation/Logistics",
];

const useStyles = makeStyles((theme) => ({
  profileLogo: {
    backgroundRepeat: "no-repeat",
    objectPosition: "20% 30%",
    width: "100vw",
    height: "15vw",
    maxWidth: "100%",
    zIndex: 1,
    objectFit: "cover",
  },
  inline: {
    display: "inline",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    color: "#f50057",
  },
  skills: {
    textAlign: "center",
    borderRadius: 200,
    backgroundColor: "#FFFFFF",
  },
  fullWidth: {
    width: "100%",
  },
  quarterWidth: {
    width: "25%",
  },
  formInput: {
    width: "100%",
  },
  formInput2: {
    width: "20%",
    marginRight: "30px",
  },
  dialogInput: {
    paddingBottom: theme.spacing(2),
  },
  loginAlert: {
    marginBottom: theme.spacing(2),
  },
  dialogConfirm: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  inputLabel: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
}));
export default function CompanyProfile() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  //initially get the data from DataContext

  const { data, dispatch } = useContext(DataContext);
  const { profile } = data;

  const [profileInfo, setProfileInfo] = useState({
    //This is the data you get from api.
    name: null,
    companyMission: null,
    companyDescription: null,
    companyType: null,
    companyWebsite: null,
    companyRep: null,
    industryType: null,
    phoneNumber: null,
    streetAddress: null,
    city: null,
    state: null,
    zip:null,
    streetAddress2: null,
    city2: null,
    state2: null,
    contact_email:null,
    isSolo: null,
  });

  const getStreetAddress = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[0];
    }
    return null;
  };

  const getCity = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[1];
    }
    return null;
  };

  const getState = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[2];
    }
    return null;
  };

  const getCompanyAddress = () => {
    if (profileInfo.streetAddress && profileInfo.city && profileInfo.state) {
      return `${profileInfo.streetAddress}|${profileInfo.city}|${profileInfo.state}`;
    }
    return "";
  };

  const getMailingAddress = () => {
    if (profileInfo.streetAddress2 && profileInfo.city2 && profileInfo.state2) {
      return `${profileInfo.streetAddress2}|${profileInfo.city2}|${profileInfo.state2}`;
    }
    return "";
  };

  const slug = localStorage.getItem("slug");

  const getProfile = async () => {
    if (slug) {
      try {
        const url = `http://18.213.74.196:8000/api/company_profile/${slug}`;
        const res = await axios.get(url, getConfig());
        dispatch({ type: "SET_PROFILE", payload: res.data }); //Set the data in dataContext
        setProfileInfo({
          //Set data locally, in case use change, he changes this.
          name: res.data.company_name,
          companyMission: res.data.company_mission,
          companyDescription: res.data.company_description,
          companyType: res.data.company_type,
          companyWebsite: res.data.company_website,
          companyRep: res.data.representative_name,
          industryType: res.data.industry_type,
          phoneNumber: res.data.company_phone_no,
          streetAddress: getStreetAddress(res.data.company_address),
          city: getCity(res.data.company_address),
          state: getState(res.data.company_address),
          zip:res.data.company_zip,
          streetAddress2: getStreetAddress(res.data.mailing_address),
          city2: getCity(res.data.mailing_address),
          state2: getState(res.data.mailing_address),
          isSolo: res.data.company_representative_type,
          contact_email:res.data.company_contact_email
        });
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [showEditFields, setShowEditFields] = useState(false);

  const handleOpenEdit = () => {
    setShowEditFields(!showEditFields);
  };

  const handleChange = (e) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setProfileInfo({
      name: profile.company_name,
      companyMission: profile.company_mission,
      companyDescription: profile.company_description,
      companyType: profile.company_type,
      companyWebsite: profile.company_website,
      companyRep: profile.representative_name,
      industryType: profile.industry_type,
      phoneNumber: profile.company_phone_no,
      zip: profile.company_zip,
      streetAddress: getStreetAddress(profile.company_address),
      city: getCity(profile.company_address),
      state: getState(profile.company_address),
      streetAddress2: getStreetAddress(profile.mailing_address),
      city2: getCity(profile.mailing_address),
      state2: getState(profile.mailing_address),
      isSolo: profile.company_representative_type,
      contact_email: profile.contact_email
    });
    setShowEditFields(!showEditFields);
  };

  const handleSave = () => {
    setDialogOpen(true);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDialogClose = () => {
    setEmail("");
    setPassword("");
    setDialogOpen(false);
  };

  const [authError, setAuthError] = useState("");
  const [updateErrors, setUpdateErrors] = useState({
    company_phone_no: "",
    company_name: "",
    industry_type: "",
    representative_name: "",
    company_representative_type: "",
    company_type: "",
    company_address: "",
    mailing_address: "",
    company_mission: "",
    company_zip:"",
    company_description: "",
    company_contact_email: ""
  });

  const handleConfirm = () => {
    axios
      .post("http://18.213.74.196:8000/api/token/", {
        email: email,
        password: password,
      })
      .then((res) => {
        //first remove local storage
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("role_id", res.data.role_id);
        localStorage.setItem("email_id", res.data.email_id);
        localStorage.setItem("slug", res.data.slug);
        let slug = res.data.slug;
        setLoading(true);

        let address = `${profileInfo.streetAddress}, ${profileInfo.city}, ${profileInfo.state} ${profileInfo.zip} `;
        let token ="pk.eyJ1Ijoicm9oaXRzaGFyZGhhIiwiYSI6ImNrajIxcWVxaTIyZWgycXF0NWwxMG9wMTMifQ.NuOk3LeRP5b5Gvtso3MFrg";
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`,getConfig())
        .then((response)=>{  
          axios
            .put(
              `http://18.213.74.196:8000/api/company_profile/${slug}/update`,
              {
                username: localStorage.getItem("email_id"),
                company_name: profileInfo.name,
                company_phone_no: profileInfo.phoneNumber,
                industry_type: profileInfo.industryType,
                representative_name: profileInfo.companyRep,
                company_representative_type: profileInfo.isSolo,
                company_type: profileInfo.companyType,
                company_address: getCompanyAddress(),
                mailing_address: getMailingAddress(),
                company_zip: profileInfo.zip,
                company_website: profileInfo.companyWebsite,
                company_mission: profileInfo.companyMission,
                company_description: profileInfo.companyDescription,
                company_contact_email: profileInfo.contact_email,
                company_latitude:response.data.features[0].geometry.coordinates[1],
                company_longitude:response.data.features[0].geometry.coordinates[0],
              },
              getConfig()
            )
            .then((res) => {
              dispatch({ type: "UPDATE_PROFILE", payload: res.data });
              setDialogOpen(false);
              setShowEditFields(false);
              axios
                .post("http://18.213.74.196:8000/api/token/", {
                  email: email,
                  password: password,
                })
                .then((res) => {
                  localStorage.setItem("token", res.data.access);
                  localStorage.setItem("role_id", res.data.role_id);
                  localStorage.setItem("email_id", res.data.email_id);
                  localStorage.setItem("slug", res.data.slug);
                  setEmail(null);
                  setPassword(null);
                  setLoading(false);
                });
            })
        })
          .catch((err) => {
            setUpdateErrors({ ...updateErrors, ...err.response.data });
            setDialogOpen(false);
          });
      })
      .catch((err) => {
        setAuthError(
          err.response.data.detail +
            ". Make sure your email and password is correct."
        );
      });
  };

  return (
    <div>
      {loading && !data.profile ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <div className={classes.profileHeader}>
            <img
              alt="profile logo"
              className={classes.profileLogo}
              src={CompanyDashboard}
            ></img>
          </div>
          <form>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <BusinessRoundedIcon fontSize="large" />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Company Name"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.name}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Company Name</Typography>
                    <TextField
                      className={classes.formInput}
                      value={profileInfo.name}
                      onChange={handleChange}
                      placeholder={profileInfo.name}
                      name="name"
                      inputProps={{ maxLength: 50 }}
                      error={updateErrors.company_name !== ""}
                    ></TextField>
                    {updateErrors.company_name ? (
                      <Typography color="error">
                        {updateErrors.company_name}
                      </Typography>
                    ) : null}
                  </div>
                )}
                 {showEditFields === false ? (
                <IconButton
                    edge="end"
                    className={classes.icon}
                    onClick={handleOpenEdit}
                  >
                    <EditTwoToneIcon />
                </IconButton>
                ):null}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <ShortTextRoundedIcon fontSize="large" />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Company Mission"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.companyMission}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Company Mission</Typography>
                    <TextField
                      className={classes.formInput}
                      value={profileInfo.companyMission}
                      onChange={handleChange}
                      placeholder={profileInfo.companyMission}
                      name="companyMission"
                      inputProps={{ maxLength: 225 }}
                      error={updateErrors.company_mission !== ""}
                    ></TextField>
                    {updateErrors.company_mission ? (
                      <Typography>{updateErrors.company_mission}</Typography>
                    ) : null}
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <ShortTextRoundedIcon fontSize="large" />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Company Description"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.companyDescription}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Company Description</Typography>
                    <TextField
                      className={classes.formInput}
                      value={profileInfo.companyDescription}
                      onChange={handleChange}
                      name="companyDescription"
                      inputProps={{ maxLength: 500 }}
                      error={updateErrors.company_description !== ""}
                    ></TextField>
                    {updateErrors.company_description ? (
                      <Typography color="error">
                        {updateErrors.company_description}
                      </Typography>
                    ) : null}
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <PersonRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Company Representative"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.companyRep}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Company Representative</Typography>
                    <TextField
                      className={classes.formInput}
                      value={profileInfo.companyRep}
                      onChange={handleChange}
                      name="companyRep"
                      inputProps={{ maxLength: 50 }}
                      error={updateErrors.representative_name !== ""}
                    ></TextField>
                    {updateErrors.representative_name ? (
                      <Typography color="error">
                        {updateErrors.representative_name}
                      </Typography>
                    ) : null}
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <LanguageRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Website"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.companyWebsite}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Company Website</Typography>
                    <TextField
                      className={classes.formInput}
                      value={profileInfo.companyWebsite}
                      onChange={handleChange}
                      name="companyWebsite"
                      inputProps={{ maxLength: 50 }}
                    ></TextField>
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <ShortTextRoundedIcon fontSize="large" />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Contact Email"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.contact_email}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Contact Email</Typography>
                    <TextField
                      className={classes.formInput}
                      value={profileInfo.contact_email}
                      onChange={handleChange}
                      placeholder={profileInfo.contact_email}
                      name="contact_email"
                      inputProps={{ maxLength: 50 }}
                      error={updateErrors.company_contact_email !== ""}
                    ></TextField>
                    {updateErrors.company_contact_email ? (
                      <Typography color="error">
                        {updateErrors.company_contact_email}
                      </Typography>
                    ) : null}
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <BusinessRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Company Type"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.companyType === 0
                            ? "Social Business"
                            : profileInfo.companyType === 1
                            ? "Private"
                            : "Non-Profit"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Company Type</Typography>
                    <Select
                      value={profileInfo.companyType}
                      name="companyType"
                      className={classes.formInput}
                      onChange={handleChange}
                    >
                      <MenuItem value="1">Private</MenuItem>
                      <MenuItem value="2">Non-Profit</MenuItem>
                      <MenuItem value="0">Social Business</MenuItem>
                    </Select>
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <WorkRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Industry Type"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.industryType}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Industry Type</Typography>
                    <Select
                      className={classes.formInput}
                      value={profileInfo.industryType}
                      onChange={handleChange}
                      name="industryType"
                      component="span"
                    >
                      {industryTypes.map((industryType) => (
                        <MenuItem key={industryType} value={industryType}>
                          {industryType}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <PhoneRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Phone Number"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.phoneNumber}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Phone Number</Typography>
                    <TextField
                      className={classes.formInput}
                      value={profileInfo.phoneNumber}
                      onChange={handleChange}
                      name="phoneNumber"
                      inputProps={{ maxLength: 10 }}
                      error={updateErrors.company_phone_no !== ""}
                    ></TextField>
                    {updateErrors.company_phone_no ? (
                      <Typography color="error">
                        {updateErrors.company_phone_no}
                      </Typography>
                    ) : null}
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <PeopleRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="One Person Company"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {profileInfo.isSolo === 1 ? "Yes" : "No"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <div className={classes.fullWidth}>
                    <Typography>Are you a single member company</Typography>
                    <RadioGroup
                      aria-label="Are you one person company"
                      name="isSolo"
                      value={profileInfo.isSolo}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Yes (1)"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="No (>=2)"
                      />
                    </RadioGroup>
                  </div>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <LocationOnRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Company Address"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {`${profileInfo.streetAddress},  ${profileInfo.city}, ${profileInfo.state}, ${profileInfo.zip}`}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <>
                    <Grid container xs={12} md={6} spacing={2}>
                      <Grid item>
                        <Typography>Company Address</Typography>
                        <TextField
                          className={classes.fullWidth}
                          value={profileInfo.streetAddress}
                          onChange={handleChange}
                          name="streetAddress"
                          inputProps={{ maxLength: 40 }}
                          placeholder="Street Address"
                        ></TextField>
                        {profileInfo.streetAddress === "" ? (
                          <Typography color="error">
                            {updateErrors.company_address}
                          </Typography>
                        ) : null}
                      </Grid>
                      <Grid item>
                        <Typography>City</Typography>
                        <TextField
                          className={classes.fullWidth}
                          value={profileInfo.city}
                          onChange={handleChange}
                          inputProps={{ maxLength: 20 }}
                          name="city"
                        ></TextField>
                        {profileInfo.city === "" ? (
                          <Typography color="error">
                            {updateErrors.company_address}
                          </Typography>
                        ) : null}
                      </Grid>
                      <Grid item>
                        <Typography>State</Typography>
                        <Select
                          className={classes.fullWidth}
                          label="State"
                          value={profileInfo.state}
                          onChange={handleChange}
                          name="state"
                          placeholder="state"
                        >
                          {states.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item>
                        <Typography>Zipcode</Typography>
                        <TextField
                          className={classes.fullWidth}
                          value={profileInfo.zip}
                          onChange={handleChange}
                          inputProps={{ maxLength: 5 }}
                          name="zip"
                        ></TextField>
                        {profileInfo.zip === "" ? (
                          <Typography color="error">
                            {updateErrors.company_zip}
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </>
                )}
              </ListItem>
              {!showEditFields ? (
                <Divider variant="inset" component="li" />
              ) : null}
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <LocationOnRoundedIcon />
                </ListItemIcon>
                {showEditFields === false ? (
                  <ListItemText
                    primary="Mailing Address"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {`${profileInfo.streetAddress2},  ${profileInfo.city2}, ${profileInfo.state2}`}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                ) : (
                  <>
                    <Grid container xs={12} md={6} spacing={2}>
                      <Grid item>
                        <Typography>Mailing Address</Typography>
                        <TextField
                          className={classes.fullWidth}
                          value={profileInfo.streetAddress2}
                          onChange={handleChange}
                          name="streetAddress2"
                          inputProps={{ maxLength: 40 }}
                          placeholder="Street Address"
                        ></TextField>
                        {profileInfo.streetAddress2 === "" ? (
                          <Typography color="error">
                            {updateErrors.mailing_address}
                          </Typography>
                        ) : null}
                      </Grid>
                      <Grid item>
                        <Typography>City</Typography>
                        <TextField
                          className={classes.fullWidth}
                          value={profileInfo.city2}
                          onChange={handleChange}
                          inputProps={{ maxLength: 20 }}
                          name="city2"
                        ></TextField>
                        {profileInfo.city2 === "" ? (
                          <Typography color="error">
                            {updateErrors.mailing_address}
                          </Typography>
                        ) : null}
                      </Grid>
                      <Grid item>
                        <Typography>State</Typography>
                        <Select
                          className={classes.fullWidth}
                          label="State"
                          value={profileInfo.state2}
                          onChange={handleChange}
                          name="state2"
                        >
                          {states.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </>
                )}
              </ListItem>
              {showEditFields ? (
                <ListItem>
                  <Grid
                    container
                    id="buttons-container"
                    justify="flex-end"
                    spacing={4}
                  >
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              ) : null}
            </List>
          </form>
        </>
      )}

      <Dialog
        onClose={handleDialogClose}
        open={dialogOpen}
        className={classes.dialog}
      >
        <DialogTitle>Enter Email and Password to Confirm</DialogTitle>
        {authError ? (
          <Alert
            className={classes.loginAlert}
            variant="filled"
            severity="error"
          >
            {authError}
          </Alert>
        ) : null}
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={classes.dialogInput}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            label="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            className={classes.dialogInput}
          />
        </DialogContent>
        <DialogActions className={classes.dialogConfirm}>
          <Button
            onClick={handleConfirm}
            color="secondary"
            variant="outlined"
            className={classes.dialogConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
