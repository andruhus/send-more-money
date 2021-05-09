import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { QuestionTaskResponse } from "../dto/response/QuestionTaskResponse";
import { PlayGround } from "../component/interactive/PlayGround";
import { Answer } from "../component/interactive/Answer";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    maxWidth: "1000px",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  title: {
    ...theme.typography.h5,
    margin: "25px",
  },
  playGround: {
    flexGrow: 2,
  },
  answer: {
    flexGrow: 1,
  },
}));

export const InteractivePage = (): ReactElement => {
  const classes = useStyles();
  const { questionId } = useParams();
  // ToDo get task by `questionId`
  // ToDo if `questionId` not exist - redirect to 404 page
  const task: QuestionTaskResponse = {
    addition1: "send",
    addition2: "more",
    sum: "money",
  };
  const [answer, setAnswer] = useState(
    new Map<string, { value: number | null; errorMessage: string }>()
  );
  const submitClicked = true;

  const correctNumbers = [...Array.from(new Array(10).keys()), null];

  useEffect(() => {
    const data = (task.addition1 + task.addition2 + task.sum)
      .split("")
      .reduce(
        (map, o) => map.set(o, { value: null, errorMessage: "Required" }),
        new Map<string, { value: number | null; errorMessage: string }>()
      );
    setAnswer(data);
  }, [task.addition1, task.addition2, task.sum]);

  const getErrorMessage = (
    char: string,
    newAnswer: Map<string, { value: number | null; errorMessage: string }>
  ): string => {
    let value: number | null = newAnswer.get(char)!.value;
    if (!correctNumbers.includes(value)) {
      return "Not possible";
    }
    if (
      value === 0 &&
      (task.addition1.indexOf(char) === 0 ||
        task.addition2.indexOf(char) === 0 ||
        task.sum.indexOf(char) === 0)
    ) {
      return "Not possible 0";
    }
    if (
      Array.from(newAnswer.values())
        .filter((it) => it.value !== null)
        .filter((it) => it.value === value).length > 1
    ) {
      return "Duplication";
    }
    if (submitClicked && value === null) {
      return "Required";
    }
    return "";
  };

  const setNumber = (char: string, value: string) => {
    answer.get(char)!.value = value === "" ? null : +value;

    Array.from(answer.keys()).forEach((key) => {
      answer.get(key)!.errorMessage = getErrorMessage(key, answer);
    });
    setAnswer(new Map(answer));
  };

  return (
    <>
      <NavBar />
      <Typography className={classes.title}>
        ToDo get task by id: {questionId}
      </Typography>
      <div className={classes.root}>
        <div className={classes.playGround}>
          <PlayGround
            task={task}
            answer={answer}
            setNumber={setNumber}
            isSubmitClicked={submitClicked}
          />
        </div>
        <div className={classes.answer}>
          <Answer
            task={task}
            answer={answer}
            setNumber={setNumber}
            isSubmitClicked={submitClicked}
          />
        </div>
      </div>
    </>
  );
};
