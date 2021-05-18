import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { PlayGround } from "../component/interactive/PlayGround";
import { Answer } from "../component/interactive/Answer";
import { Button, Typography } from "@material-ui/core";
import {
  useGetAllQuestionInfoById,
  usePostLike,
  usePostTryQuestion,
} from "../api/QuestionsApi";
import {
  Language,
  DoneOutline,
  FavoriteBorder,
  Favorite,
} from "@material-ui/icons";

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
  info: {
    display: "flex",
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
    display: "flex",
    alignItems: "center",
  },
  playGround: {
    flexGrow: 2,
  },
  answer: {
    flexGrow: 1,
  },
}));

type AnswerData = { value: number | null; errorMessage: string };
type AnswerMap = Map<string, AnswerData>;

export const InteractivePage = (): ReactElement => {
  const classes = useStyles();
  const { questionId } = useParams();
  const [loadTask, task] = useGetAllQuestionInfoById(questionId);
  const [answer, setAnswer] = useState<AnswerMap>();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [setLikeId, postLike, isLikeLoad] = usePostLike();
  const [setTryId, postTry, isTryLoad] = usePostTryQuestion();

  useEffect(() => {
    if (!task) return;
    const data = (task.add1 + task.add2 + task.sum)
      .split("")
      .reduce(
        (map, o) => map.set(o, { value: null, errorMessage: "Required" }),
        new Map<string, AnswerData>()
      );
    setAnswer(data);
  }, [task]);

  useEffect(() => {
    setTryId(questionId);
    postTry({});
  }, []);

  useEffect(() => {
    if (isLikeLoad !== false) return;
    loadTask();
  }, [isLikeLoad]);

  useEffect(() => {
    if (isTryLoad !== false) return;
    loadTask();
  }, [isTryLoad]);

  const getErrorMessage = (char: string, newAnswer: AnswerMap) => {
    let value: number | null = newAnswer.get(char)!.value;
    if (![...Array.from(new Array(10).keys()), null].includes(value)) {
      return "Not possible";
    }
    if (
      value === 0 &&
      (task?.add1.indexOf(char) === 0 ||
        task?.add2.indexOf(char) === 0 ||
        task?.sum.indexOf(char) === 0)
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
    if (!answer) return;
    answer.get(char)!.value = value === "" ? null : +value;
    Array.from(answer.keys()).forEach((key) => {
      answer.get(key)!.errorMessage = getErrorMessage(key, answer);
    });
    setAnswer(new Map(answer));
  };

  const handleLiked = () => {
    if (!task) return;
    setLiked(true);
    setLikeId(task.id);
    postLike({});
  };

  if (!answer)
    return (
      <>
        <NavBar />
        <Typography variant={"h4"}>Loading...</Typography>
      </>
    );

  return (
    <>
      <NavBar />
      {task ? (
        <>
          <Typography className={classes.title}>
            <div>
              {`${task.add1} + ${task.add2} = ${task.sum}`.toUpperCase()}
            </div>
            <div className={classes.info}>
              <div
                style={{
                  marginLeft: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Language style={{ color: "blue" }} />
                <div>{task.triedCount}</div>
              </div>
              <div
                style={{
                  marginLeft: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DoneOutline style={{ color: "green" }} />
                <div>{task.solvedCount}</div>
              </div>
              <div
                style={{
                  marginLeft: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isLiked ? (
                  <Favorite style={{ color: "red" }} />
                ) : (
                  <FavoriteBorder
                    onClick={handleLiked}
                    style={{ color: "red" }}
                  />
                )}
                <div>{task.likeCount}</div>
              </div>
            </div>
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
          <Button onClick={() => setSubmitClicked(true)}>Submit</Button>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};
