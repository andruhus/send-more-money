import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { homeRouting, interactiveRouting } from "../constant/routes";

const useStyles = makeStyles(() => ({
  root: {
    color: "orange",
  },
}));

export const PuzzleListPage = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      List page
      <br />
      <Button onClick={() => history.push(homeRouting)}>Home</Button>
      <br />
      <Button onClick={() => history.push(interactiveRouting)}>
        Interactive
      </Button>
    </div>
  );
};
