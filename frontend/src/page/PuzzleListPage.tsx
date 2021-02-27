import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { Button } from "@material-ui/core";
import { interactiveRouting } from "../constant/routes";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    color: "orange",
  },
}));

export const PuzzleListPage = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className={classes.root}>List page</div>
      <Button onClick={() => history.push(interactiveRouting)}>
        To interactive page
      </Button>
    </>
  );
};
