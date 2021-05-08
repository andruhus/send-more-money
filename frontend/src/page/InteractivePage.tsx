import React, { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { QuestionTaskResponse } from "../dto/response/QuestionTaskResponse";
import { WordQuizInput } from "../component/WordQuizInput";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const InteractivePage = (): ReactElement => {
  const classes = useStyles();
  const { questionId } = useParams();
  // ToDo get task by `questionId`
  const task: QuestionTaskResponse = {
    addition1: "send",
    addition2: "more",
    sum: "money",
  };

  const [answer, setAnswer] = useState(
    Object.fromEntries(
      Array.from(new Set(task.addition1 + task.addition2 + task.sum)).map(
        (it) => [it, null] as [string, number | null]
      )
    )
  );
  const setNumber = (char: string, value: string) => {
    if (value !== "" && (+value < 0 || +value > 10)) return;
    answer[char] = value === "" ? null : +value;
    setAnswer({ ...answer });
  };

  return (
    <>
      <NavBar />
      <div>ToDo get task by id: {questionId}</div>
      <div className={classes.root}>
        <WordQuizInput
          word={task.addition1}
          maxCharacters={task.sum.length}
          setNumber={setNumber}
          answer={answer}
        />
        <WordQuizInput
          word={task.addition2}
          maxCharacters={task.sum.length}
          setNumber={setNumber}
          answer={answer}
        />
        <WordQuizInput
          word={task.sum}
          maxCharacters={task.sum.length}
          setNumber={setNumber}
          answer={answer}
        />
      </div>
    </>
  );
};
