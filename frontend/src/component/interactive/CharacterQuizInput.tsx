import { makeStyles } from "@material-ui/core/styles";
import { TextField, Tooltip } from "@material-ui/core";
import React from "react";

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
  answer: Map<string, { value: number | null; errorMessage: string }>;
  isSubmitClicked: boolean;
};

export const CharacterQuizInput = (props: Props) => {
  const classes = useStyles();
  const value = props.answer.get(props.char) || {
    value: null,
    errorMessage: "",
  };

  return (
    <Tooltip title={value.errorMessage}>
      <TextField
        className={classes.cell}
        type={"number"}
        variant={"outlined"}
        label={props.char}
        value={value.value === null ? "" : value.value}
        onChange={(event) => props.setNumber(props.char, event.target.value)}
        error={
          (value.value === null && props.isSubmitClicked) ||
          (value.value !== null && !!value.errorMessage)
        }
      />
    </Tooltip>
  );
};
