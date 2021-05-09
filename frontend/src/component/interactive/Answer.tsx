import React, { ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { CharacterQuizInput } from "./CharacterQuizInput";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { QuestionTaskResponse } from "../../dto/response/QuestionTaskResponse";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  answerItem: {
    display: "flex",

    [theme.breakpoints.down("xs")]: {
      marginLeft: "50px",
      justifyContent: "flex-start",
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
    },
  },
  answerText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "10px",
  },
}));
type Props = {
  task: QuestionTaskResponse;
  answer: Map<string, number | null>;
  setNumber: (char: string, value: string) => void;
  isSubmitClicked: boolean;
};

export const Answer = (props: Props): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {Array.from(props.answer.keys()).map((key, index) => (
        <div key={index} className={classes.answerItem}>
          <Typography className={classes.answerText}>
            {key.toUpperCase()}
          </Typography>
          <CharacterQuizInput
            answer={props.answer}
            char={key}
            setNumber={props.setNumber}
            isSubmitClicked={props.isSubmitClicked}
            isZeroPossible={
              props.task.addition1.indexOf(key) !== 0 &&
              props.task.addition2.indexOf(key) !== 0 &&
              props.task.sum.indexOf(key) !== 0
            }
          />
        </div>
      ))}
    </div>
  );
};
