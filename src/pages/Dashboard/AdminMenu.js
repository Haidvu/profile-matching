import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import { Link, useRouteMatch } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
    fontFamily: "Lato",
  },
}));

const AdminMenu = () => {
  const classes = useStyles();
  let { url } = useRouteMatch();

  const options = [
    { text: "Report", url: `${url}`, icon: <AssessmentRoundedIcon /> },
    {
      text: "My Map",
      url: `${url}/Maps`,
      icon: <ExploreRoundedIcon />,
    },
    {
      text:"Company Projects",
      url: `${url}/CompanyProjects`,
      icon:<BusinessRoundedIcon />
    }
  ];
  return (
    <div>
      {options.map((item, index) => (
        <Link to={item.url} className={classes.link} key={item.text}>
          <ListItem key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        </Link>
      ))}
    </div>
  );
};

export default AdminMenu;
