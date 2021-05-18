import React, { ReactElement } from "react";
import { WordQuizInput } from "./WordQuizInput";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { QuestionResponse } from "../../dto/response/QuestionResponse";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    ...theme.typography.h5,
    marginLeft: "50px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "25px",
    },
  },
}));

interface Props {
  task: QuestionResponse;
  answer: Map<string, { value: number | null; errorMessage: string }>;
  setNumber: (char: string, value: string) => void;
  isSubmitClicked: boolean;
}

export const PlayGround = (props: Props): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Try to solve</Typography>
      <WordQuizInput
        word={props.task.add1}
        maxCharacters={props.task.sum.length}
        answer={props.answer}
        setNumber={props.setNumber}
        isSubmitClicked={props.isSubmitClicked}
      />
      <WordQuizInput
        word={props.task.add2}
        maxCharacters={props.task.sum.length}
        answer={props.answer}
        setNumber={props.setNumber}
        isSubmitClicked={props.isSubmitClicked}
      />
      <WordQuizInput
        word={props.task.sum}
        maxCharacters={props.task.sum.length}
        answer={props.answer}
        setNumber={props.setNumber}
        isSubmitClicked={props.isSubmitClicked}
      />
    </div>
  );
};
