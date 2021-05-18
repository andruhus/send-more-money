import React, { ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { PlayGround } from "../component/interactive/PlayGround";
import { Answer } from "../component/interactive/Answer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from "@material-ui/core";
import {
  useGetAllQuestionInfoById,
  usePostLike,
  usePostTryQuestion,
  usePostTrySolve,
} from "../api/QuestionsApi";
import {
  DoneOutline,
  Favorite,
  FavoriteBorder,
  Language,
} from "@material-ui/icons";
import { puzzleListRouting } from "../constant/routes";

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
  const history = useHistory();
  const { questionId } = useParams();
  const [loadTask, task] = useGetAllQuestionInfoById(questionId);
  const [answer, setAnswer] = useState<AnswerMap>();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [setLikeId, postLike, isLikeLoad] = usePostLike();
  const [setTryId, postTry, isTryLoad] = usePostTryQuestion();
  const [, postSolve, isSolveLoad, isErrorInSolve] = usePostTrySolve(
    questionId
  );
  const [isOpenError, setOpenError] = useState(false);
  const [isOpenCongrat, setOpenCongrat] = useState(false);

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

  useEffect(() => {
    if (isErrorInSolve.isLoading !== false) return;
    if (isErrorInSolve.error === undefined) {
      setOpenCongrat(true);
    } else {
      setOpenError(true);
    }
  }, [isSolveLoad, isErrorInSolve]);

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

  const onSubmit = () => {
    setSubmitClicked(true);
    if (
      Array.from(answer.keys()).filter((it) => {
        return answer.get(it)?.errorMessage !== "";
      }).length === 0
    ) {
      const request = Array.from(answer.keys()).map((key) => ({
        char: key,
        value: answer.get(key)!.value!,
      }));
      postSolve({ data: request });
    }
  };

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
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={isSolveLoad}
          >
            Submit
          </Button>
          <Dialog open={isOpenError} onClose={() => setOpenError(false)}>
            <DialogTitle>Mistake</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You have some mistake in your solution
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenError(false)}
                color="primary"
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={isOpenCongrat}
            autoHideDuration={2000}
            onClose={() => {
              setOpenCongrat(false);
              history.goBack();
            }}
          >
            <Alert
              onClose={() => {
                setOpenCongrat(false);
                history.goBack();
              }}
              severity="success"
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};
function Alert(props: AlertProps) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}
