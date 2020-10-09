import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = (props) => {
  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Sample
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Navbar;
