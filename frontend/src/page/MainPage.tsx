import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import {
  aboutAsRouting,
  interactiveRouting,
  puzzleListRouting,
} from "../constant/routes";

const useStyles = makeStyles((theme: Theme) => ({
  linkList: {
    display: "flex",
  },
}));

export const MainPage = (): ReactElement => {
  const classes = useStyles();
  const navLinks = [
    { title: "Puzzle List", path: puzzleListRouting },
    { title: "Interactive", path: interactiveRouting },
    { title: "About Us", path: aboutAsRouting },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge={"start"} color={"inherit"}>
          <Home fontSize={"large"} />
        </IconButton>
        <List className={classes.linkList}>
          {navLinks.map((link) => (
            <NavLink to={link.path}>
              <ListItem>
                <ListItemText primary={link.title} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};
