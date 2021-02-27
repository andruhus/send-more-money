import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";

const useStyles = makeStyles(() => ({
  root: {
    color: "blue",
  },
}));

export const InteractivePage = (): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className={classes.root}>Interactive page</div>
    </>
  );
};
