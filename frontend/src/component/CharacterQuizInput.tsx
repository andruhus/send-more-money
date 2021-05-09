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
  isSubmitClicked: boolean;
  isZeroPossible: boolean;
};

export const CharacterQuizInput = (props: Props) => {
  const classes = useStyles();
  const [value, setValue] = useState<number | null>(null);
  const [isError, setError] = useState(false);
  const correctNumbers = Array.from(new Array(10).keys());

  useEffect(() => {
    const undefinedNewVal = props.answer.get(props.char);
    const newValue = undefinedNewVal === undefined ? null : undefinedNewVal;
    setValue(newValue);
    if (
      Array.from(props.answer.values())
        .filter((it) => it !== null)
        .filter((it) => it === newValue).length > 1
    ) {
      setError(true);
      return;
    }
    if (props.isSubmitClicked) {
      if (![...correctNumbers].includes(newValue === null ? -1 : newValue)) {
        setError(true);
        return;
      }
    } else {
      if (![...correctNumbers, null].includes(newValue)) {
        setError(true);
        return;
      }
    }
    if (!props.isZeroPossible && newValue === 0) {
      setError(true);
      return;
    }
    setError(false);
  }, [props.char, props.answer, props.isSubmitClicked, correctNumbers]);
  return (
    <TextField
      className={classes.cell}
      type={"number"}
      variant={"outlined"}
      label={props.char}
      value={value === null ? "" : value}
      error={isError}
      onChange={(event) => props.setNumber(props.char, event.target.value)}
    />
  );
};
