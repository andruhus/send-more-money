import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { homeRouting, puzzleListRouting } from "../constant/routes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "static",
  },
  homeLink: {
    edge: "start",
    color: "inherit",
  },
  linkList: {
    display: "flex",
  },
  navLink: {
    ...theme.typography.h5,
    color: "white",
    textDecoration: "none",
  },
}));

export const NavBar = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const navLinks = [{ title: "Puzzle List", path: puzzleListRouting }];

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton
          onClick={() => history.push(homeRouting)}
          className={classes.homeLink}
        >
          <Home fontSize={"large"} />
        </IconButton>
        <List className={classes.linkList}>
          {navLinks.map((link, index) => (
            <NavLink to={link.path} className={classes.navLink} key={index}>
              <ListItem>
                <Typography className={classes.navLink}>
                  {link.title}
                </Typography>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};
