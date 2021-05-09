import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
  cell: {
    flexGrow: 1,
    maxWidth: "56px",
    maxHeight: "56px",
    margin: "5.6px",
    "& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

type Props = {
  char: string;
  setNumber: (key: string, value: string) => void;
  answer: Map<string, number | null>;
};

export const CharacterQuizInput = (props: Props) => {
  const classes = useStyles();
  const [isError, setError] = useState(false);
  const correctNumbers = Array.from(new Array(10).keys());

  useEffect(() => {
    const newValue = props.answer.get(props.char) || null;
    if (
      Array.from(props.answer.values())
        .filter((it) => it !== null)
        .filter((it) => it === newValue).length > 1
    ) {
      setError(true);
      return;
    }
    if (![...correctNumbers, null].includes(newValue)) {
      setError(true);
      return;
    }
    setError(false);
  }, [props.answer]);
  return (
    <TextField
      className={classes.cell}
      type={"number"}
      variant={"outlined"}
      label={props.char}
      value={props.answer.get(props.char) || ""}
      error={isError}
      onChange={(event) => props.setNumber(props.char, event.target.value)}
    />
  );
};
