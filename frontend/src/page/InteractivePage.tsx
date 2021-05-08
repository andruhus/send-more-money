import React, { ReactElement } from "react";
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
  const task: QuestionTaskResponse = {
    // ToDo calculate number of spaces
    addition1: " send",
    addition2: " more",
    sum: "money",
  };

  return (
    <>
      <NavBar />
      <div>ToDo get task by id: {questionId}</div>
      <div className={classes.root}>
        <WordQuizInput word={task.addition1} />
        <WordQuizInput word={task.addition2} />
        <WordQuizInput word={task.sum} />
      </div>
    </>
  );
};
