import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  cell: {
    flexGrow: 1,
    maxWidth: "56px",
    maxHeight: "56px",
    margin: "5.6px",
    "& div:before": {
      borderBottomStyle: "none!important",
    },
  },
}));

export const EmptyCharacterQuizInput = () => {
  const classes = useStyles();

  return <TextField className={classes.cell} disabled />;
};
