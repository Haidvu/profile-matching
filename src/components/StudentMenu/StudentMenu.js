import React from "react";
import {Route, Link } from "react-router-dom";
import ProtectedRoute from "../ProtecteRoute/ProtecteRoute";
import { makeStyles } from "@material-ui/core/styles";
import {Drawer,AppBar,CssBaseline,Toolbar,Typography,List,ListItem,ListItemIcon,ListItemText, Divider} from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import StarsIcon from '@material-ui/icons/Stars';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import StudentProfile from '../StudentProfile/StudentProfile';
import StudentProject from '../StudentProject/StudentProject';
import Home from "./../../pages/Home/Home";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "rgba(200,16,46,1)"
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerContainer: {
        overflow: 'auto',
      },
      content: {
        flexGrow: 1,
      },
      Logout:{
        objectFit: "contain",       
      },
      rightToolbar: {
        marginLeft: "auto",
        objectFit: "contain",  
        margin: theme.spacing(0.5) 
      },
      link:{
        textDecoration: 'none',
        color:"black",
        fontFamily:"Lato"
      }
     
}));

export default function StudentMenu() {
    const classes = useStyles();
    const MenuOptions = [
      {text:'Profile', url:'/profile', icon:<AccountCircleRoundedIcon/>},
      {text:'My Projects', url:'/projects', icon:<BusinessRoundedIcon/>},
      {text:'My Companies', url:'/companies', icon:<StarsIcon/>},
      {text:'Search', url:'/search', icon:<SearchRoundedIcon/>},
      {text:'Logout', url:'/', icon:<ExitToAppRoundedIcon/>}];

   return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            | Future Start |
          </Typography>
          <AccountCircleRoundedIcon color="inherit" className={classes.rightToolbar}/>
          <Typography variant="h8" p={2}>
            Student Name
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {MenuOptions.map((item, index) => (
              <Link to={item.url} className={classes.link} key={item.text}>
                <ListItem key={item.text}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider/>
        </div>
      </Drawer>
        <main className={classes.content}>
        <Toolbar />
        <ProtectedRoute path="/profile" component={StudentProfile} />
        <ProtectedRoute path="/projects" component={StudentProject} />
      </main>
    </div>
    );
}
