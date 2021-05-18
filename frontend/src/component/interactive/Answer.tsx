import React, { ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { CharacterQuizInput } from "./CharacterQuizInput";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { QuestionResponse } from "../../dto/response/QuestionResponse";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    ...theme.typography.h5,
    [theme.breakpoints.down("xs")]: {
      marginTop: "25px",
      marginLeft: "50px",
    },
  },
  answerWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "50px",
    },
  },
  answerItem: {
    display: "flex",
  },
  answerText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "10px",
  },
}));

type Props = {
  task: QuestionResponse;
  answer: Map<string, { value: number | null; errorMessage: string }>;
  setNumber: (char: string, value: string) => void;
  isSubmitClicked: boolean;
};

export const Answer = (props: Props): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Your Answer:</Typography>
      <div className={classes.answerWrapper}>
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};
