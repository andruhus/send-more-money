import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  word: {
    color: "blue",
    display: "flex",
    justifyContent: "flex-end",
  },
  cell: {
    flexGrow: 1,
    maxWidth: "56px",
    maxHeight: "56px",
    margin: "5.6px",
    "& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& div:before": {
      borderBottomStyle: "none!important",
    },
  },
}));

type Props = {
  word: string;
};

export const WordQuizInput = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.word}>
      {props.word.split("").map((it) => (
        <TextField
          key={it}
          className={classes.cell}
          type={"number"}
          variant={it === " " ? "standard" : "outlined"}
          label={it}
          disabled={it === " "}
        />
      ))}
    </div>
  );
};
