import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { QuestionTaskResponse } from "../dto/response/QuestionTaskResponse";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  word: {
    color: "blue",
    display: "flex",
    justifyContent: "flex-end",
  },
  cell: {
    flexGrow: 1,
    maxWidth: "56px",
    maxHeight: "56px",
    margin: "5.6px",
  },
}));

export const InteractivePage = (): ReactElement => {
  const classes = useStyles();
  const { questionId } = useParams();
  const task: QuestionTaskResponse = {
    addition1: "send",
    addition2: "more",
    sum: "money",
  };

  return (
    <>
      <NavBar />
      <div>ToDo get task by id: {questionId}</div>
      <div className={classes.word}>
        {task.addition1.split("").map((it) => (
          <TextField className={classes.cell} label={it} variant="outlined" />
        ))}
      </div>
      <div className={classes.word}>
        {task.addition2.split("").map((it) => (
          <TextField className={classes.cell} label={it} variant="outlined" />
        ))}
      </div>
      <div className={classes.word}>
        {task.sum.split("").map((it) => (
          <TextField className={classes.cell} label={it} variant="outlined" />
        ))}
      </div>
    </>
  );
};
