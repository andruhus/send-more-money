import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";

const useStyles = makeStyles(() => ({
  root: {
    color: "blue",
  },
}));

export const InteractivePage = (): ReactElement => {
  const classes = useStyles();
  const { questionId } = useParams();

  return (
    <>
      <NavBar />
      <div className={classes.root}>Interactive page to task #{questionId}</div>
    </>
  );
};
