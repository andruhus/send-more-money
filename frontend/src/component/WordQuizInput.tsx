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
  maxCharacters: number;
  setNumber: (char: string, value: string) => void;
  answer: any;
};

export const WordQuizInput = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.word}>
      {[
        ...Array(props.maxCharacters - props.word.length).fill(""),
        ...props.word.split(""),
      ].map((it) => (
        <TextField
          id={it}
          key={it}
          className={classes.cell}
          type={"number"}
          variant={it ? "outlined" : "standard"}
          label={it}
          value={props.answer[it] || ""}
          disabled={!it}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          onChange={(event) =>
            props.setNumber(event.target.id, event.target.value)
          }
        />
      ))}
    </div>
  );
};
