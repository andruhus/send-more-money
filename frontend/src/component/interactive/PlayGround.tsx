import React, { ReactElement } from "react";
import { QuestionTaskResponse } from "../../dto/response/QuestionTaskResponse";
import { WordQuizInput } from "./WordQuizInput";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

interface Props {
  task: QuestionTaskResponse;
  answer: Map<string, number | null>;
  setNumber: (char: string, value: string) => void;
  isSubmitClicked: boolean;
}

export const PlayGround = (props: Props): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <WordQuizInput
        word={props.task.addition1}
        maxCharacters={props.task.sum.length}
        answer={props.answer}
        setNumber={props.setNumber}
        isSubmitClicked={props.isSubmitClicked}
      />
      <WordQuizInput
        word={props.task.addition2}
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
