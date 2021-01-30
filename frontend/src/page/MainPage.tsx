import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { listRouting } from "../constant/routes";

const useStyles = makeStyles(() => ({
  root: {
    color: "green",
  },
}));

export const MainPage = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Home page
      <br />
      <Button onClick={() => history.push(listRouting)}>List</Button>
    </div>
  );
};
