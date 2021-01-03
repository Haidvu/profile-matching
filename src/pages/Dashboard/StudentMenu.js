import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import StarsIcon from "@material-ui/icons/Stars";
import { Link, useRouteMatch } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
    fontFamily: "Lato",
  },
}));

const StudentMenu = () => {
  const classes = useStyles();
  let { url } = useRouteMatch();

  const options = [
    { text: "Profile", url: `${url}`, icon: <AccountCircleRoundedIcon /> },
    { text: "My Projects", url: `${url}/projects`, icon: <StarsIcon /> },
    {
      text: "Search",
      url: `${url}/search`,
      icon: <SearchRoundedIcon />,
    },
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

export default StudentMenu;
