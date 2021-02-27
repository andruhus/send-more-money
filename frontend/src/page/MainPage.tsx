import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const MainPage = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <div className={classes.root}>
        Welcome to Puzzle pet project by It-Ad community
      </div>
    </>
  );
};
