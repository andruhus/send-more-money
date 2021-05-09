import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { QuestionTaskResponse } from "../dto/response/QuestionTaskResponse";
import { PlayGround } from "../component/interactive/PlayGround";
import { Answer } from "../component/interactive/Answer";

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
        <div className={classes.playGround}>
          <PlayGround
            task={task}
            answer={answer}
            setNumber={setNumber}
            isSubmitClicked={true}
          />
        </div>
        <div className={classes.answer}>
          <Answer
            task={task}
            answer={answer}
            setNumber={setNumber}
            isSubmitClicked={true}
          />
        </div>
      </div>
    </>
  );
};
