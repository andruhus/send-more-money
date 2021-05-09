import React, { ReactElement, useEffect, useState } from "react";
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

  const [answer, setAnswer] = useState(new Map<string, number | null>());
  useEffect(() => {
    const data = (task.addition1 + task.addition2 + task.sum)
      .split("")
      .reduce((map, o) => map.set(o, null), new Map<string, number | null>());
    setAnswer(data);
  }, [task.addition1, task.addition2, task.sum]);

  const setNumber = (char: string, value: string) => {
    answer.set(char, value === "" ? null : +value);
    setAnswer(new Map(answer));
  };

  return (
    <>
      <NavBar />
      <div>ToDo get task by id: {questionId}</div>
      <div className={classes.root}>
        <WordQuizInput
          word={task.addition1}
          maxCharacters={task.sum.length}
          answer={answer}
          setNumber={setNumber}
          isSubmitClicked={false}
        />
        <WordQuizInput
          word={task.addition2}
          maxCharacters={task.sum.length}
          answer={answer}
          setNumber={setNumber}
          isSubmitClicked={true}
        />
        <WordQuizInput
          word={task.sum}
          maxCharacters={task.sum.length}
          answer={answer}
          setNumber={setNumber}
          isSubmitClicked={false}
        />
      </div>
    </>
  );
};
